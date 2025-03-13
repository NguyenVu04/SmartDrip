from MQTTManager import MQTTManager
import threading
from DeviceData import DeviceData
from GardenInfo import GardenInfo
from MongoConnection import MongoConnection
from ai_model import utils
import time
from NotificationManager import NotificationManager

#! TODO: change to 60 * 5
SLEEP_TIME = 5 # seconds
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
        if (deviceData.pumpLastRecord - gardenInfo.getCropStart() > SLEEP_TIME):
            self.notificationManager.send_message("Pump has lost connection", gardenInfo.getUserId())
            return False
        
        if (deviceData.temperatureLastRecord - gardenInfo.getCropStart() > SLEEP_TIME):
            self.notificationManager.send_message("Temperature sensor has lost connection", gardenInfo.getUserId())
            return False
        
        if (deviceData.humidityLastRecord - gardenInfo.getCropStart() > SLEEP_TIME):
            self.notificationManager.send_message("Humidity sensor has lost connection", gardenInfo.getUserId())
            return False
        
        if (deviceData.moistureLastRecord - gardenInfo.getCropStart() > SLEEP_TIME):
            self.notificationManager.send_message("Moisture sensor has lost connection", gardenInfo.getUserId())
            return False
        
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
        while not self.stopEvent.is_set():
            for userId, connection in self.mqttManager.getConnections().items():
                gardenInfo = GardenInfo.from_dict(DB.find_one({"userId": userId}))
                deviceData = connection.getDeviceData()
                if self.getResult(deviceData, gardenInfo):
                    connection.activatePump()
                    self.notificationManager.send_message("Pump is activated", userId)
                else:
                    connection.deactivatePump()
                    self.notificationManager.send_message("Pump is deactivated", userId)
            time.sleep(SLEEP_TIME)     
            
    def stop(self):
        self.stopEvent.set()
        self.mainThread.join()        