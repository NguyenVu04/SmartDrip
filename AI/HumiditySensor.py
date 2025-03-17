from Device import Device
from Record import Record
from HumidityRecord import HumidityRecord

class HumiditySensor(Device):
    humidity: float
    
    def __init__(self, feedId: str, humidity: float = 0):
        super().__init__(feedId)
        self.humidity = humidity
        
    def getHumidity(self):
        return self.humidity
    
    def setHumidity(self, humidity):
        self.humidity = float(humidity)
    
    def createRecord(self, userId: str) -> Record:
        record = HumidityRecord(userId, self.humidity)
        self.lastRecord = record.getTimestamp()
        return record