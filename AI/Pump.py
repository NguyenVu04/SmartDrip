from Device import Device
from PumpRecord import PumpRecord
from Record import Record

class Pump(Device):
    isOn: bool
    power: float

    def __init__(self, feedId, isOn: bool, power: float):
        super().__init__(feedId)
        self.isOn = isOn
        self.power = power
        
    def turnOn(self):
        self.isOn = True
        
    def turnOff(self):
        self.isOn = False
        
    def getPower(self):
        return self.power
    
    def createRecord(self) -> Record:
        return PumpRecord(self.isOn)