from MQTTManager import MQTTManager
import threading
from DeviceData import DeviceData
from GardenInfo import GardenInfo
import random
from MongoConnection import MongoConnection
import time

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
        return random.choice([True, False])
        
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