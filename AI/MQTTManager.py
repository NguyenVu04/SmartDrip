from MQTTConnection import MQTTConnection
from MongoConnection import MongoConnection
from DeviceData import DeviceData

#!TODO: Change the database name to the actual database name
DB_CONNECTION = MongoConnection().connect().mqtt

class MQTTManager:
    connections: dict[str, MQTTConnection] = {}

    def __init__(self):
        for connection in DB_CONNECTION.find():
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
            humidity=self.connections[userId].humiditySensor.getHumidity(),
            temperatureLastRecord=self.connections[userId].temperatureSensor.getLastRecord(),
            moistureLastRecord=self.connections[userId].moistureSensor.getLastRecord(),
            humidityLastRecord=self.connections[userId].humiditySensor.getLastRecord(),
            pumpLastRecord=self.connections[userId].pump.getLastRecord()
        )
        
    def getConnections(self):
        return self.connections