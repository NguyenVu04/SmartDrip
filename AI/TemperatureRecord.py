from Record import Record

class TemperatureRecord(Record):
    temperature: float

    def __init__(self, userId: str, temperature: float):
        super().__init__(userId)
        self.temperature = temperature

    def getTemperature(self):
        return self.temperature