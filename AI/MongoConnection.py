from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

class MongoConnection:
    #! TODO: Change the databaseURI to the actual database URI
    databaseURI: str = os.getenv("DATABASE_URI")
    name: str = os.getenv("DATABASE_NAME")
    
    def connect(self):
        return MongoClient(self.databaseURI)[self.name]