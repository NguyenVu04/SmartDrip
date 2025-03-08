from Record import Record

class PumpRecord(Record):
    isOn: bool
    
    def __init__(self, userId: str, isOn: bool):
        super().__init__(userId)
        self.isOn = isOn
        
    def isOn(self) -> bool:
        return self.isOn
    
    def __dict__(self):
        return {
            "userId": self.userId,
            "isOn": self.isOn
        }
        
    def from_dict(self, data: dict):
        self.userId = data["userId"]
        self.isOn = data["isOn"]