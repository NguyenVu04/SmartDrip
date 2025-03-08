from Record import Record

class TemperatureRecord(Record):
    temperature: float

    def __init__(self, userId: str, temperature: float):
        super().__init__(userId)
        self.temperature = temperature

    def getTemperature(self):
        return self.temperature
    
    def __dict__(self):
        return {
            "userId": self.userId,
            "temperature": self.temperature
        }
        
    def from_dict(self, data: dict):
        self.userId = data["userId"]
        self.temperature = data["temperature"]