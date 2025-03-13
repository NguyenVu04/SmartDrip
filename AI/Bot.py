from MQTTManager import MQTTManager
import threading
from DeviceData import DeviceData
from GardenInfo import GardenInfo
from MongoConnection import MongoConnection
from ai_model import utils
import time
from NotificationManager import NotificationManager
import asyncio

#! TODO: change to 60 * 5
SLEEP_TIME = 60 * 1 # seconds
DB = MongoConnection().connect().garden_info

class Bot:
    mqttManager: MQTTManager
    mainThread: threading.Thread
    stopEvent: threading.Event
    notificationManager: NotificationManager
    
    def __init__(self, mqttManager: MQTTManager, notificationManager: NotificationManager):
        self.mqttManager = mqttManager
        self.notificationManager = notificationManager
        self.stopEvent = threading.Event()
        self.mainThread = threading.Thread(target=self.loop)
        self.mainThread.start()
        
    def getResult(self, deviceData: DeviceData, gardenInfo: GardenInfo) -> bool:
        # if (deviceData.temperatureLastRecord - gardenInfo.getCropStart() > SLEEP_TIME):
        #     asyncio.run_coroutine_threadsafe(
        #         self.notificationManager.send_message("Temperature sensor has lost connection", gardenInfo.getUserId()), 
        #         loop
        #     )
        #     print("Temperature sensor has lost connection")
        #     return False
        
        # if (deviceData.humidityLastRecord - gardenInfo.getCropStart() > SLEEP_TIME):
        #     asyncio.run_coroutine_threadsafe(
        #         self.notificationManager.send_message("Humidity sensor has lost connection", gardenInfo.getUserId()), 
        #         loop
        #     )
        #     print("Humidity sensor has lost connection")
        #     return False
        
        # if (deviceData.moistureLastRecord - gardenInfo.getCropStart() > SLEEP_TIME):
        #     asyncio.run_coroutine_threadsafe(
        #         self.notificationManager.send_message("Moisture sensor has lost connection", gardenInfo.getUserId()), 
        #         loop
        #     )
        #     print("Moisture sensor has lost connection")
        #     return False
        
        cropDays = (max(deviceData.temperatureLastRecord, deviceData.humidityLastRecord, deviceData.moistureLastRecord) - gardenInfo.getCropStart()) / 86400
        
        input = {
            'CropType': gardenInfo.getTreeType(),
            'CropDays': cropDays,
            'SoilMoisture': deviceData.moisture,
            'Temperature': deviceData.temperature,
            'Humidity': deviceData.humidity
        }
        
        return utils.predict(input)
        
    def loop(self):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        while not self.stopEvent.is_set():
            time.sleep(SLEEP_TIME)     
            for userId, connection in self.mqttManager.getConnections().items():
                gardenInfo = GardenInfo.from_dict(DB.find_one({"userId": userId}))
                deviceData = connection.getDeviceData()
                if self.getResult(deviceData, gardenInfo):
                    connection.activatePump()
                    asyncio.run_coroutine_threadsafe(
                        self.notificationManager.send_message("Pump is activated", userId), 
                        loop
                    )
                else:
                    connection.deactivatePump()
                    asyncio.run_coroutine_threadsafe(
                        self.notificationManager.send_message("Pump is deactivated", userId), 
                        loop
                    )
            
    def stop(self):
        self.stopEvent.set()
        self.mainThread.join()