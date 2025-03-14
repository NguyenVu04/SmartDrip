from pymongo import MongoClient

class MongoConnection:
    #! TODO: Change the databaseURI to the actual database URI
    databaseURI: str = "mongodb://localhost:27017/"
    name: str = "smart_drip"
    
    def connect(self):
        return MongoClient(self.databaseURI)[self.name]