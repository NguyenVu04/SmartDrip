from Device import Device
from Record import Record
from MoistureRecord import MoistureRecord

class MoistureSensor(Device):
    moisture: float
    
    def __init__(self, feedId: str, moisture: float = 0):
        super().__init__(feedId)
        self.moisture = moisture
        
    def getMoisture(self):
        return self.moisture
    
    def setMoisture(self, moisture):
        self.moisture = float(moisture)
    
    def createRecord(self, userId: str) -> Record:
        record = MoistureRecord(userId, self.moisture)
        self.lastRecord = record.getTimestamp()
        return record
        