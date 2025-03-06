class DeviceData:
    temperature: float
    humidity: float
    moisture: float
    pumpPower: float
    
    def __init__(self, temperature: float, humidity: float, moisture: float, pumpPower: float):
        self.temperature = temperature
        self.humidity = humidity
        self.moisture = moisture
        self.pumpPower = pumpPower