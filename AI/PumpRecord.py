from Record import Record

class PumpRecord(Record):
    isOn: bool
    
    def __init__(self, isOn: bool):
        super().__init__()
        self.isOn = isOn
        
    def isOn(self) -> bool:
        return self.isOn