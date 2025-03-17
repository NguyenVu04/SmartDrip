import time
import json

class Notification:
    timestamp: int
    content: str
    userId: str
    seen: bool
    
    def __init__(self, content: str, userId: str, seen: bool = False):
        self.content = content
        self.userId = userId
        self.timestamp = int(time.time())
        self.seen = seen
        
    @classmethod
    def from_dict(cls, attributes: dict):
        return cls(
            content=attributes.get('content'),
            userId=attributes.get('userId'),
            seen=True
        )
        
    def json(self):
        return json.dumps({
            "content": self.content,
            "timestamp": self.timestamp,
        })
        
    def __dict__(self):
        return {
            "timestamp": self.timestamp,
            "content": self.content,
            "userId": self.userId,
            "seen": self.seen,
        }
        
    def getId(self):
        return self._id
    
    def getContent(self):
        return self.content
    
    def getTimestamp(self):
        return self.timestamp
    
    def isSeen(self):
        return self.seen
    
    def setSeen(self):
        self.seen = True