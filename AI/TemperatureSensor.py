from Device import Device
from Record import Record
from TemperatureRecord import TemperatureRecord

class TemperatureSensor(Device):
    temperature: float

    def __init__(self, feedId: str, temperature: float = 0):
        super().__init__(feedId)
        self.temperature = temperature
        
    def getTemperature(self):
        return self.temperature
    
    def setTemperature(self, temperature):
        self.temperature = float(temperature)
    
    def createRecord(self, userId: str) -> Record:
        record = TemperatureRecord(userId, self.temperature)
        self.lastRecord = record.getTimestamp()
        return record