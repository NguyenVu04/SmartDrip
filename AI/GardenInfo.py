import time
from datetime import datetime

class GardenInfo:
    treeType: str
    numOfTree: int
    userId: str
    cropStart: int
    
    def __init__(self, treeType: str, numOfTree: int, userId: str, cropStart: int = None):
        self.treeType = treeType
        self.numOfTree = numOfTree
        self.userId = userId
        if cropStart is None:
            self.cropStart = int(time.time())
        else:
            self.cropStart = cropStart
        
    def __dict__(self):
        return {
            "treeType": self.treeType,
            "numOfTree": self.numOfTree,
            "userId": self.userId,
            "cropStart": self.cropStart
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        if data is None:
            return None
        if "cropStart" not in data:
            data["cropStart"] = int(time.time())
        if "userId" not in data:
            return None
        if "treeType" not in data:
            return None
        if "numOfTree" not in data:
            data["numOfTree"] = 0
        
        return cls(
            treeType = data["treeType"],
            numOfTree = data["numOfTree"],
            userId = data["userId"],
            cropStart = data["cropStart"]
        )
        
    def getTreeType(self) -> str:
        return self.treeType
    
    def getNumOfTree(self) -> int:
        return self.numOfTree
    
    def getLongitude(self) -> float:
        return self.longitude
    
    def getLatitude(self) -> float:
        return self.latitude
    
    def getUserId(self) -> str:
        return self.userId
    
    def getCropStart(self) -> int:
        return self.cropStart
    
    def setTreeType(self, treeType: str):
        self.treeType = treeType
        
    def setNumOfTree(self, numOfTree: int):
        self.numOfTree = numOfTree
    
    def setLongitude(self, longitude: float):
        self.longitude = longitude
        
    def setLatitude(self, latitude: float):
        self.latitude = latitude
        
    def setUserId(self, userId: str):
        self.userId = userId
        
    def startCrop(self):
        self.cropStart = int(time.time())
        
    def setStartCrop(self, date_str: str, date_format: str = "%d-%m-%Y"):
        self.cropStart = datetime.strptime(date_str, date_format)