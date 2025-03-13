from typing import Union
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from MQTTManager import MQTTManager
from Bot import Bot
from NotificationManager import NotificationManager
import asyncio
from Notification import Notification

app = FastAPI()
mqttManager = MQTTManager()
bot = Bot(mqttManager)
notificationManager = NotificationManager()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.websocket("/notifications/{userId}")
async def notifications(websocket: WebSocket, userId: str):
    await websocket.accept()
    try:
        while True:
            await websocket.send_text(Notification(None, userId).json())
            await asyncio.sleep(8)
    except WebSocketDisconnect:
        notificationManager.disconnect(userId)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
    bot.stop()