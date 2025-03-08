from typing import Union
from fastapi import FastAPI
from MQTTManager import MQTTManager
from Bot import Bot
from MongoConnection import MongoConnection

app = FastAPI()
manager = MQTTManager()
bot = Bot(manager)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
    bot.stop()