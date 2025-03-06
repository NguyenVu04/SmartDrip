from Record import Record

class MoistureRecord(Record):
    moisture: float
    
    def __init__(self, userId: str, moisture: float):
        super().__init__(userId)
        self.moisture = moisture
        
    def getMoisture(self):
        return self.moisture