from datetime import datetime

class TemperatureRecord:
    user_id: str
    temperature: float
    timestamp: datetime
    
    def __init__(self, user_id: str, temperature: float, timestamp: datetime = None):
        self.user_id = user_id
        self.temperature = temperature
        self.timestamp = timestamp if timestamp is not None else datetime.now()
        
    def __str__(self):
        return f"User ID: {self.user_id}, Temperature: {self.temperature}, Timestamp: {self.timestamp}"