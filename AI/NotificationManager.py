from fastapi import WebSocket, WebSocketDisconnect
from Notification import Notification
from MongoConnection import MongoConnection

DB = MongoConnection().connect().notifications

class NotificationManager:
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, userId: str):
        await websocket.accept()
        if userId not in self.active_connections:
            self.active_connections[userId] = [websocket]
        else:
            self.active_connections[userId].append(websocket)

    def disconnect(self, userId: str, websocket: WebSocket):
        self.active_connections[userId].remove(websocket)
        if len(self.active_connections[userId]) == 0:
            self.active_connections.pop(userId)
            
    async def send_message(self, message: str, userId: str):
        notification = Notification(message, userId)
        connections = self.active_connections.get(userId, [])
        for connection in connections:
            try:
                await connection.send_text(notification.json())
                notification.setSeen()
            except WebSocketDisconnect:
                self.disconnect(userId, connection)
        DB.insert_one(notification.__dict__())