from fastapi import WebSocket, WebSocketDisconnect
from Notification import Notification
from MongoConnection import MongoConnection

DB = MongoConnection().connect().notifications

class NotificationManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, userId: str):
        await websocket.accept()
        self.active_connections[userId] = websocket

    def disconnect(self, userId: str):
        self.active_connections.pop(userId)

    async def send_message(self, message: str, userId: str):
        notification = Notification(message, userId)
        try:
            await self.active_connections[userId].send_text(message)
            notification.setSeen()
            DB.insert_one(notification.__dict__())
        except WebSocketDisconnect:
            self.disconnect(userId)
            DB.insert_one(notification.__dict__())