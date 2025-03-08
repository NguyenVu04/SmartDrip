class DeviceData:
    temperature: float
    humidity: float
    moisture: float
    
    def __init__(self, temperature: float, humidity: float, moisture: float):
        self.temperature = temperature
        self.humidity = humidity
        self.moisture = moisture