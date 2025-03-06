from Record import Record

class HumidityRecord(Record):
    humidity: float
    
    def __init__(self, userId: str, humidity: float):
        super().__init__(userId)
        self.humidity = humidity
        
    def getHumidity(self):
        return self.humidity