from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, JSONResponse
from MQTTManager import MQTTManager
from Bot import Bot
from NotificationManager import NotificationManager
import asyncio
from Notification import Notification
from pydantic import BaseModel

app = FastAPI()
mqttManager = MQTTManager()
bot = Bot(mqttManager)
notificationManager = NotificationManager()

class MQTTConnectionModel(BaseModel):
    aioKey: str
    aioUsername: str
    userId: str
    pumpFeed: str
    temperatureFeed: str
    moistureFeed: str
    humidityFeed: str
    
html = """
<!DOCTYPE html>
<html>
<head>
    <title>MQTT Connection Form</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .form-container {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .form-container h1 {
            text-align: center;
        }
        .form-container label {
            display: block;
            margin-top: 10px;
        }
        .form-container input[type="text"] {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .form-container input[type="submit"] {
            width: 100%;
            padding: 10px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .form-container input[type="submit"]:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>MQTT Connection Form</h1>
        <form action="/" method="post">
            <label for="aioKey">AIO Key:</label>
            <input type="text" id="aioKey" name="aioKey">
            <label for="aioUsername">AIO Username:</label>
            <input type="text" id="aioUsername" name="aioUsername">
            <label for="userId">User ID:</label>
            <input type="text" id="userId" name="userId">
            <label for="pumpFeed">Pump Feed:</label>
            <input type="text" id="pumpFeed" name="pumpFeed">
            <label for="temperatureFeed">Temperature Feed:</label>
            <input type="text" id="temperatureFeed" name="temperatureFeed">
            <label for="moistureFeed">Moisture Feed:</label>
            <input type="text" id="moistureFeed" name="moistureFeed">
            <label for="humidityFeed">Humidity Feed:</label>
            <input type="text" id="humidityFeed" name="humidityFeed">
            <input type="submit" value="Submit">
        </form>
    </div>
</body>
</html>
"""

@app.get("/")
def read_root():
    return HTMLResponse(html)

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