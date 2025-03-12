from MQTTManager import MQTTManager
import threading
from DeviceData import DeviceData
from GardenInfo import GardenInfo
import random
from MongoConnection import MongoConnection
from ai_model import Model
import time
import torch
import torch.nn as nn
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler

class Bot:
    manager: MQTTManager
    mainThread: threading.Thread
    stopEvent: threading.Event
        
    def __init__(self, manager: MQTTManager):
        self.manager = manager
        self.stopEvent = threading.Event()
        self.mainThread = threading.Thread(target=self.loop)
        self.mainThread.start()
        
    def getResult(self, deviceData: DeviceData, gardenInfo: GardenInfo) -> bool:
        model = Model.Net()
        model.load_state_dict(torch.load("ai_model/model.pth"))
        model.eval()
        input = {
            'CropType': gardenInfo.getTreeType(),
            'CropDays': 10,
            'SoilMoisture': deviceData.moisture,
            'Temperature': deviceData.temperature,
            'Humidity': deviceData.humidity
        }
        
        return Model.predict(input)
        
    def loop(self):
        while not self.stopEvent.is_set():
            for userId, connection in self.manager.getConnections().items():
                db = MongoConnection().connect().garden_info
                gardenInfo = GardenInfo.from_dict(db.find_one({"userId": userId}))
                deviceData = connection.getDeviceData()
                if self.getResult(deviceData, gardenInfo):
                    connection.activatePump()
                else:
                    connection.deactivatePump()
            time.sleep(5)     
            
    def stop(self):
        self.stopEvent.set()
        self.mainThread.join()           