from abc import ABC
from datetime import datetime

class Record(ABC):
    userId: str
    timestamp: int
    def __init__(self, userId: str):
        self.userId = userId
        self.timestamp = int(datetime.now().timestamp())
        
    def getTimestamp(self) -> int:
        return self.timestamp
    
    def getUserId(self) -> str:
        return self.userId