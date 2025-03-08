class GardenInfo:
    treeType: str
    numOfTree: int
    longitude: float
    latitude: float
    userId: str
    pumpPower: float
    
    def __init__(self, treeType: str, numOfTree: int, longitude: float, latitude: float, userId: str, pumpPower: float):
        self.treeType = treeType
        self.numOfTree = numOfTree
        self.longitude = longitude
        self.latitude = latitude
        self.userId = userId
        self.pumpPower = pumpPower
        
    def __dict__(self):
        return {
            "treeType": self.treeType,
            "numOfTree": self.numOfTree,
            "longitude": self.longitude,
            "latitude": self.latitude,
            "userId": self.userId,
            "pumpPower": self.pumpPower
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(
            treeType = data["treeType"],
            numOfTree = data["numOfTree"],
            longitude = data["longitude"],
            latitude = data["latitude"],
            userId = data["userId"],
            pumpPower = data["pumpPower"]
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
    
    def getPumpPower(self) -> float:
        return self.pumpPower
    
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
        
    def setPumpPower(self, pumpPower: float):
        self.pumpPower = pumpPower