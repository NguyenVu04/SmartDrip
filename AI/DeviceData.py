class DeviceData:
    temperature: float
    humidity: float
    moisture: float
    temperatureLastRecord: int
    humidityLastRecord: int
    moistureLastRecord: int
    
    def __init__(
        self, 
        temperature: float, 
        humidity: float, 
        moisture: float,
        temperatureLastRecord: int,
        humidityLastRecord: int,
        moistureLastRecord: int
    ):
        self.temperature = temperature
        self.humidity = humidity
        self.moisture = moisture
        self.temperatureLastRecord = temperatureLastRecord
        self.humidityLastRecord = humidityLastRecord
        self.moistureLastRecord = moistureLastRecord