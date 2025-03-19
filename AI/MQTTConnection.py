from Adafruit_IO import MQTTClient
from Pump import Pump
from TemperatureSensor import TemperatureSensor
from MoistureSensor import MoistureSensor
from HumiditySensor import HumiditySensor
from MongoConnection import MongoConnection
from DeviceData import DeviceData
from dotenv import load_dotenv
import os

load_dotenv()

DB_CONNECTION = MongoConnection().connect()

class MQTTConnection:
    aioKey: str
    aioUsername: str
    aioClient: MQTTClient    
    pump: Pump
    temperatureSensor: TemperatureSensor
    moistureSensor: MoistureSensor
    humiditySensor: HumiditySensor
    userId: str
    
    def __init__(self, aioKey: str, aioUsername: str, userId: str, pumpFeed: str, temperatureFeed: str, moistureFeed: str, humidityFeed: str):
        self.aioKey = aioKey
        self.aioUsername = aioUsername
        self.userId = userId
        self.pump = Pump(pumpFeed, False)
        self.temperatureSensor = TemperatureSensor(temperatureFeed)
        self.moistureSensor = MoistureSensor(moistureFeed)
        self.humiditySensor = HumiditySensor(humidityFeed)
        self.aioClient = MQTTClient(self.aioUsername, self.aioKey)
        self.aioClient.on_connect = self.connected
        self.aioClient.on_message = self.message
        self.aioClient.on_subscribe = self.subscribe
        self.aioClient.connect()
        self.aioClient.loop_background()
        
    @classmethod
    def from_dict(cls, attributes: dict):
        return cls(
            aioKey=attributes.get('aioKey'),
            aioUsername=attributes.get('aioUsername'),
            userId=attributes.get('userId'),
            pumpFeed=attributes.get('pumpFeed'),
            temperatureFeed=attributes.get('temperatureFeed'),
            moistureFeed=attributes.get('moistureFeed'),
            humidityFeed=attributes.get('humidityFeed')
        )
        
    def __dict__(self):
        return {
            'userId': self.userId,
            'aioKey': self.aioKey,
            'aioUsername': self.aioUsername,
            'pumpFeed': self.pump.getFeedId(),
            'temperatureFeed': self.temperatureSensor.getFeedId(),
            'moistureFeed': self.moistureSensor.getFeedId(),
            'humidityFeed': self.humiditySensor.getFeedId()
        }    
    
    def getAIOKey(self):
        return self.aioKey
    
    def getAIOUsername(self):
        return self.aioUsername
    
    def setAIOKey(self, aioKey: str):
        self.aioKey = aioKey
        
    def setAIOUsername(self, aioUsername: str):
        self.aioUsername = aioUsername
    #!TODO: change feed ids to match the ones in Adafruit IO
    def connected(self, client: MQTTClient):
        client.subscribe('button2')
        client.subscribe('temperature')
        client.subscribe('soil_moisture')
        client.subscribe('humidity')
        print('Connected to Adafruit IO! Listening for feed changes...')
        
    def message(self, client: MQTTClient, feed_id: str, payload):
        print('Feed {0} received new value: {1}'.format(feed_id, payload))
        match feed_id:
            case 'temperature':
                self.temperatureSensor.setTemperature(payload)
                DB_CONNECTION[os.getenv("TEMPERATURE_RECORDS_COLLECTION")].insert_one(self.temperatureSensor.createRecord(self.userId).__dict__())
            case 'soil_moisture':
                self.moistureSensor.setMoisture(payload)
                DB_CONNECTION[os.getenv("MOISTURE_RECORDS_COLLECTION")].insert_one(self.moistureSensor.createRecord(self.userId).__dict__())
            case 'humidity':
                self.humiditySensor.setHumidity(payload)
                DB_CONNECTION[os.getenv("HUMIDITY_RECORDS_COLLECTION")].insert_one(self.humiditySensor.createRecord(self.userId).__dict__())
            case 'button2':
                if payload == '1':
                    self.pump.turnOn()
                elif payload == '0':
                    self.pump.turnOff()
                DB_CONNECTION[os.getenv("PUMP_RECORDS_COLLECTION")].insert_one(self.pump.createRecord(self.userId).__dict__())
            
    def subscribe(self, client, userdata, mid, granted_qos):
        print('Subscribed successfully!')
        
    def disconnect(self):
        self.aioClient.disconnect()
        
    def getDeviceData(self):
        return DeviceData(
            temperature=self.temperatureSensor.getTemperature(),
            moisture=self.moistureSensor.getMoisture(),
            humidity=self.humiditySensor.getHumidity(),
            temperatureLastRecord=self.temperatureSensor.getLastRecord(),
            moistureLastRecord=self.moistureSensor.getLastRecord(),
            humidityLastRecord=self.humiditySensor.getLastRecord(),
            pumpLastRecord=self.pump.getLastRecord()
        )
        
    def activatePump(self):
        self.aioClient.publish('button2', '1')
        
    def deactivatePump(self):
        self.aioClient.publish('button2', '0')
        