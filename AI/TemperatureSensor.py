from Device import Device
from Record import Record
from TemperatureRecord import TemperatureRecord

class Temperature(Device):
    temperature: float

    def __init__(self, feedId: str, temperature: float = 0):
        super().__init__(feedId)
        self.temperature = temperature
        
    def getTemperature(self):
        return self.temperature
    
    def createRecord(self, userId: str) -> Record:
        return TemperatureRecord(userId, self.temperature)