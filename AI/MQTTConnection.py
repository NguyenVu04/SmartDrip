from Adafruit_IO import MQTTClient
from Pump import Pump
from TemperatureSensor import TemperatureSensor
from MoistureSensor import MoistureSensor
from HumiditySensor import HumiditySensor

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
        self.pump = Pump(pumpFeed, False, 10)#!init pump with 10 kW
        self.temperatureSensor = TemperatureSensor(temperatureFeed)
        self.moistureSensor = MoistureSensor(moistureFeed)
        self.humiditySensor = HumiditySensor(humidityFeed)
        self.aioClient = MQTTClient(self.aioUsername, self.aioKey)
        self.aioClient.on_connect = self.connected
        self.aioClient.on_message = self.message
        self.aioClient.on_subscribe = self.subscribe
        self.aioClient.disconnect = self.disconnect
        self.aioClient.connect()
        self.aioClient.loop_background()
        
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
        client.subscribe('pump')
        client.subscribe('temperature')
        client.subscribe('moisture')
        client.subscribe('humidity')
        print('Connected to Adafruit IO! Listening for feed changes...')
        
    def message(self, client: MQTTClient, feed_id: str, payload):
        print('Feed {0} received new value: {1}'.format(feed_id, payload))
        match feed_id:
            case 'temperature':
                self.temperatureSensor.setTemperature(payload)
            case 'moisture':
                self.moistureSensor.setMoisture(payload)
            case 'humidity':
                self.humiditySensor.setHumidity(payload)
            case 'pump':
                pass #!TODO: implement pump control
            
    def subscribe(self, client, userdata, mid, granted_qos):
        print('Subscribed to {0} with QoS {1}'.format(client, granted_qos))
        
    def disconnect(self):
        print('Disconnected from Adafruit IO!')
        #!TODO: implement disconnect from Adafruit IO
        