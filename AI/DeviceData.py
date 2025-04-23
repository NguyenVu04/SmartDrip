class DeviceData:
    temperature: float
    humidity: float
    moisture: float
    temperatureLastRecord: int
    humidityLastRecord: int
    moistureLastRecord: int
    pumpLastRecord: int
    
    def __init__(
        self, 
        temperature: float, 
        humidity: float, 
        moisture: float,
        pump: bool,
        temperatureLastRecord: int,
        humidityLastRecord: int,
        moistureLastRecord: int,
        pumpLastRecord: int
    ):
        self.temperature = temperature
        self.humidity = humidity
        self.moisture = moisture
        self.pump = pump
        self.temperatureLastRecord = temperatureLastRecord
        self.humidityLastRecord = humidityLastRecord
        self.moistureLastRecord = moistureLastRecord
        self.pumpLastRecord = pumpLastRecord