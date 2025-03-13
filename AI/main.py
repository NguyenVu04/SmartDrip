from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, JSONResponse
from MQTTManager import MQTTManager
from Bot import Bot
from NotificationManager import NotificationManager
import asyncio
from Notification import Notification
from pydantic import BaseModel
from GardenInfo import GardenInfo
from MongoConnection import MongoConnection
import time

app = FastAPI()
mqttManager = MQTTManager()
notificationManager = NotificationManager()
bot = Bot(mqttManager, notificationManager)

DB_CONNECTION = MongoConnection().connect()

class MQTTConnectionModel(BaseModel):
    userId: str
    aioKey: str
    aioUsername: str
    pumpFeed: str
    temperatureFeed: str
    moistureFeed: str
    humidityFeed: str 
    
class SignupModel(BaseModel):
    aioKey: str
    aioUsername: str
    pumpFeed: str
    temperatureFeed: str
    moistureFeed: str
    humidityFeed: str
    
    firstName: str
    lastName: str
    email: str
    address: str
    phoneNumber: str
    role: str
    
    treeType: str
    numOfTree: int
    longitude: float
    latitude: float
    cropStart: int | None = int(time.time())

@app.post("/signup")
def signup(body: SignupModel):
    user = DB_CONNECTION.users.insert_one({
        "firstName": body.firstName,
        "lastName": body.lastName,
        "email": body.email,
        "address": body.address,
        "phoneNumber": body.phoneNumber,
        "role": body.role
    }).inserted_id
    
    mqttManager.addConnection(
        body.aioKey,
        body.aioUsername,
        user,
        body.pumpFeed,
        body.temperatureFeed,
        body.moistureFeed,
        body.humidityFeed
    )
    garden = GardenInfo(
        body.treeType,
        body.numOfTree,
        body.longitude,
        body.latitude,
        user
    )
    DB_CONNECTION.garden_info.insert_one(garden.__dict__())
    return JSONResponse({"status": "success", "message": "MQTT Connection added successfully"})

@app.post("/")
def write_root(body: MQTTConnectionModel):
    mqttManager.addConnection(
        body.aioKey,
        body.aioUsername,
        body.userId,
        body.pumpFeed,
        body.temperatureFeed,
        body.moistureFeed,
        body.humidityFeed
    )
    return JSONResponse({"status": "success", "message": "MQTT Connection added successfully"})

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