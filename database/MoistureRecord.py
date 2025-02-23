from datetime import datetime

class MoistureRecord:
    user_id: str
    moisture: float
    timestamp: datetime
    
    def __init__(self, user_id: str, moisture: float, timestamp: datetime = None):
        self.user_id = user_id
        self.moisture = moisture
        self.timestamp = timestamp if timestamp is not None else datetime.now()
        
    def __str__(self):
        return f"User ID: {self.user_id}, Moisture: {self.moisture}, Timestamp: {self.timestamp}"