from Record import Record

class MoistureRecord(Record):
    moisture: float
    
    def __init__(self, userId: str, moisture: float):
        super().__init__(userId)
        self.moisture = moisture
        
    def getMoisture(self):
        return self.moisture
    
    def __dict__(self):
        return {
            "userId": self.userId,
            "moisture": self.moisture
        }
        
    def from_dict(self, data: dict):
        self.userId = data["userId"]
        self.moisture = data["moisture"]