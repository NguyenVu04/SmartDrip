from abc import ABC, abstractmethod
from datetime import time

class Record:
    timestamp: int
    
    def __init__(self):
        self.timestamp = int(time.time())
        
    def getTimestamp(self) -> int:
        return self.timestamp