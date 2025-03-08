from MQTTConnection import MQTTConnection
from MongoConnection import MongoConnection
from DeviceData import DeviceData

class MQTTManager:
    connections: dict[str, MQTTConnection] = {}

    def __init__(self):
        db = MongoConnection().connect()["mqtt"]#!TODO: Change the database name to the actual database name
        for connection in db.find():
            self.connections[connection.get('userId')] = MQTTConnection.from_dict(connection)
            
    def disconnect(self, userId: str):
        self.connections[userId].aioClient.disconnect()
        self.connections.pop(userId)
        
    def activatePump(self, userId: str):
        self.connections[userId].pump.turnOn()
        
    def deactivatePump(self, userId: str):
        self.connections[userId].pump.turnOff()
        
    def getDeviceData(self, userId: str):
        return DeviceData(
            temperature=self.connections[userId].temperatureSensor.getTemperature(),
            moisture=self.connections[userId].moistureSensor.getMoisture(),
            humidity=self.connections[userId].humiditySensor.getHumidity()
        )