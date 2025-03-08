from datetime import datetime

class Notification:
    _id: int
    timestamp: int
    content: str
    userId: str
    seen: bool
    
    def __init__(self, content: str, userId: str, seen: bool = False):
        self.content = content
        self.userId = userId
        self.timestamp = int(datetime.now().timestamp())
        self.seen = seen
        
    @classmethod
    def from_dict(cls, attributes: dict):
        return cls(
            content=attributes.get('content'),
            userId=attributes.get('userId'),
            seen=True
        )
        
    def getId(self):
        return self._id
    
    def getContent(self):
        return self.content
    
    def getTimestamp(self):
        return self.timestamp
    
    def isSeen(self):
        return self.seen