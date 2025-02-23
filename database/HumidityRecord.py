from datetime import datetime

class HumidityRecord:
    user_id: str
    humidity: float
    timestamp: datetime
    
    def __init__(self, user_id: str, humidity: float, timestamp: datetime = None):
        self.user_id = user_id
        self.humidity = humidity
        self.timestamp = timestamp if timestamp is not None else datetime.now()
        
    def __str__(self):
        return f"User ID: {self.user_id}, humidity: {self.humidity}, Timestamp: {self.timestamp}"