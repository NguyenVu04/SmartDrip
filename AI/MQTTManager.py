from MQTTConnection import MQTTConnection

class MQTTManager:
    connections: dict[str, MQTTConnection] = {}
    def __init__(self):
        pass