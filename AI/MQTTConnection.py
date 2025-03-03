from Adafruit_IO import MQTTClient

class MQTTConnection:
    aioKey: str
    aioUsername: str
    aioClient: MQTTClient
    
    