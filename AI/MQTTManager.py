from MQTTConnection import MQTTConnection
from MongoConnection import MongoConnection
from DeviceData import DeviceData
import os

DB_CONNECTION = MongoConnection().connect()[os.getenv("MQTT_COLLECTION")]

class MQTTManager:
    connections: dict[str, MQTTConnection] = {}

    def __init__(self):
        for connection in DB_CONNECTION.find():
            self.connections[connection.get('userId')] = MQTTConnection.from_dict(connection)
            
    def disconnect(self, userId: str):
        self.connections[userId].aioClient.disconnect()
        self.connections.pop(userId)
        
    def disconnectAll(self):
        for userId in self.connections.keys():
            self.connections[userId].aioClient.disconnect()
        self.connections = {}
        
    def activatePump(self, userId: str):
        self.connections[userId].pump.turnOn()
        
    def deactivatePump(self, userId: str):
        self.connections[userId].pump.turnOff()
        
    def getDeviceData(self, userId: str):
        return DeviceData(
            temperature=self.connections[userId].temperatureSensor.getTemperature(),
            moisture=self.connections[userId].moistureSensor.getMoisture(),
            humidity=self.connections[userId].humiditySensor.getHumidity(),
            temperatureLastRecord=self.connections[userId].temperatureSensor.getLastRecord(),
            moistureLastRecord=self.connections[userId].moistureSensor.getLastRecord(),
            humidityLastRecord=self.connections[userId].humiditySensor.getLastRecord(),
            pumpLastRecord=self.connections[userId].pump.getLastRecord()
        )
        
    def getConnections(self):
        return self.connections
    
    def addConnection(
        self,
        aioKey: str,
        aioUsername: str, 
        userId: str, 
        pumpFeed: str, 
        temperatureFeed: str, 
        moistureFeed: str, 
        humidityFeed: str
    ):
        if (DB_CONNECTION.find_one({"userId": userId})):
            self.removeConnection(userId)
            
        connection = MQTTConnection(
            aioKey, 
            aioUsername, 
            userId, 
            pumpFeed, 
            temperatureFeed, 
            moistureFeed, 
            humidityFeed
        )
        self.connections[userId] = connection
        DB_CONNECTION.insert_one(connection.__dict__())
        
    def removeConnection(self, userId: str):
        connection = self.connections.get(userId, None)
        if connection:
            connection.disconnect()
            self.connections.pop(userId)
        DB_CONNECTION.delete_one({"userId": userId})