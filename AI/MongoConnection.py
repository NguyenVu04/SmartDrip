from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

class MongoConnection:
    databaseURI: str = os.getenv("DATABASE_URI")
    name: str = os.getenv("DATABASE_NAME")
    
    def connect(self):
        return MongoClient(self.databaseURI)[self.name]