from abc import ABC, abstractmethod
from Record import Record
import time

class Device(ABC):
    feedId: str
    lastRecord: int
    
    def __init__(self, feedId: str):
        self.feedId = feedId
        self.lastRecord = int(time.time())
        
    def getFeedId(self):
        return self.feedId
    
    def setFeedId(self, feedId: str):
        self.feedId = feedId
        
    def getLastRecord(self):
        return self.lastRecord
    
    @abstractmethod    
    def createRecord(self, userId: str) -> Record:
        pass