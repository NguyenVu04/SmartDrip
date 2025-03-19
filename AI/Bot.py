from MQTTManager import MQTTManager
import threading
from DeviceData import DeviceData
from GardenInfo import GardenInfo
from MongoConnection import MongoConnection
from ai_model import utils
import time
from NotificationManager import NotificationManager
from dotenv import load_dotenv
import os

load_dotenv()

#! TODO: change to 60 * 5
SLEEP_TIME = 30 * 1 # seconds
DB = MongoConnection().connect()[os.getenv("GARDEN_INFO_COLLECTION")]

class Bot:
    mqttManager: MQTTManager
    mainThread: threading.Thread
    stopEvent: threading.Event
    notificationManager: NotificationManager
    
    def __init__(self, mqttManager: MQTTManager, notificationManager: NotificationManager):
        self.mqttManager = mqttManager
        self.notificationManager = notificationManager
        self.stopEvent = threading.Event()
        self.mainThread = threading.Thread(target=self.loop_thread)
        self.mainThread.start()
        
    def getResult(self, deviceData: DeviceData, gardenInfo: GardenInfo) -> bool:
        current = int(time.time())
        if (current - deviceData.temperatureLastRecord > SLEEP_TIME):
            self.notificationManager.send_message("Temperature sensor has lost connection", gardenInfo.getUserId()), 
            return False
        
        if (current - deviceData.humidityLastRecord > SLEEP_TIME):
            self.notificationManager.send_message("Humidity sensor has lost connection", gardenInfo.getUserId()), 
            return False
        
        if (current - deviceData.moistureLastRecord > SLEEP_TIME):
            self.notificationManager.send_message("Moisture sensor has lost connection", gardenInfo.getUserId()), 
            return False
        
        cropDays = (current - gardenInfo.getCropStart()) / 86400
        # cropDays = 106
        
        input = {
            'CropType': gardenInfo.getTreeType(),
            'CropDays': cropDays,
            'SoilMoisture': deviceData.moisture,
            'Temperature': deviceData.temperature,
            'Humidity': deviceData.humidity
        }
        return utils.predict(input)
        
    def loop_thread(self):
        while not self.stopEvent.wait(timeout=SLEEP_TIME):
            for userId, connection in self.mqttManager.getConnections().items():
                gardenInfo = GardenInfo.from_dict(DB.find_one({"userId": userId}))
                deviceData = connection.getDeviceData()
                result = self.getResult(deviceData, gardenInfo)
                if result:
                    connection.activatePump()
                    self.notificationManager.send_message("Pump is activated", userId), 
                else:
                    connection.deactivatePump()
                    self.notificationManager.send_message("Pump is deactivated", userId), 
            
    def stop(self):
        self.stopEvent.set()
        self.mqttManager.disconnectAll()
        self.mainThread.join()