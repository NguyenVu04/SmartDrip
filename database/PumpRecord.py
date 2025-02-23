from datetime import datetime

class PumpRecord:
    user_id: str
    on: bool
    timestamp: datetime
    
    def __init__(self, user_id: str, on: float, timestamp: datetime = None):
        self.user_id = user_id
        self.on = on
        self.timestamp = timestamp if timestamp is not None else datetime.now()
        
    def __str__(self):
        return f"User ID: {self.user_id}, on: {self.on}, Timestamp: {self.timestamp}"