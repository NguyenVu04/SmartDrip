from abc import ABC, abstractmethod
from Record import Record

class Device(ABC):
    feedId: str
    
    def __init__(self, feedId: str):
        self.feedId = feedId
        
    def getFeedId(self):
        return self.feedId
    
    def setFeedId(self, feedId: str):
        self.feedId = feedId
    
    @abstractmethod    
    def createRecord(self, userId: str) -> Record:
        pass