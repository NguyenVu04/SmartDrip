from Device import Device
from PumpRecord import PumpRecord
from Record import Record

class Pump(Device):
    isOn: bool

    def __init__(self, feedId: str, isOn: bool = False, power: float = 0):
        super().__init__(feedId)
        self.isOn = isOn
        
    def turnOn(self):
        self.isOn = True
        
    def turnOff(self):
        self.isOn = False
    
    def createRecord(self, userId: str) -> Record:
        return PumpRecord(userId, self.isOn)