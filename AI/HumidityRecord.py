from Record import Record

class HumidityRecord(Record):
    humidity: float
    
    def __init__(self, userId: str, humidity: float):
        super().__init__(userId)
        self.humidity = humidity
        
    def getHumidity(self):
        return self.humidity
    
    def __dict__(self):
        return {
            "userId": self.userId,
            "humidity": self.humidity,
            "timestamp": self.timestamp
        }
        
    def from_dict(self, data: dict):
        self.userId = data["userId"]
        self.humidity = data["humidity"]