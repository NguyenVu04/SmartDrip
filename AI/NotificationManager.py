from fastapi import WebSocket, WebSocketDisconnect
from Notification import Notification
from MongoConnection import MongoConnection
import asyncio

DB = MongoConnection().connect().notifications

class NotificationManager:
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, userId: str):
        await websocket.accept()
        if userId not in self.active_connections:
            self.active_connections[userId] = []
        self.active_connections[userId].append(websocket)
            
    async def disconnect(self, userId: str, websocket: WebSocket):
        if userId in self.active_connections:
            self.active_connections[userId].remove(websocket)
            if len(self.active_connections.get(userId, [])) == 0:
                self.active_connections.pop(userId)
            
    def send_message(self, message: str, userId: str):
        notification = Notification(message, userId)
        tasks = []
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        tasks.append(loop.create_task(self.send_task(notification, userId, self.active_connections.get(userId, []))))
                
        loop.run_until_complete(asyncio.gather(*tasks))
        
    async def send_task(self, notification: Notification, userId: str, connections: list[WebSocket]):
        for connection in connections:
            try:
                await connection.send_text(notification.json())
                notification.setSeen()
            except Exception:
                await self.disconnect(userId, connection)
                
        DB.insert_one(notification.__dict__())