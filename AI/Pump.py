from Device import Device
from PumpRecord import PumpRecord
from Record import Record

class Pump(Device):
    isOn: bool

    def __init__(self, feedId: str, isOn: bool = False):
        super().__init__(feedId)
        self.isOn = isOn
        
    def turnOn(self):
        self.isOn = True
        
    def turnOff(self):
        self.isOn = False
    
    def createRecord(self, userId: str) -> Record:
        record = PumpRecord(userId, self.isOn)
        self.lastRecord = record.getTimestamp()
        return record