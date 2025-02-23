from pymongo import MongoClient
from User import User
from TemperatureRecord import TemperatureRecord
from HumidityRecord import HumidityRecord
from MoistureRecord import MoistureRecord
from PumpRecord import PumpRecord

uri = "mongodb://localhost:27017" #! CHANGE THIS TO YOUR MONGODB URI

def main():
    client = MongoClient(uri)
    db = client.sharn
    
    user_collection = db.users
    user = User("testuser@gmail.com", "admin")
    result = user_collection.insert_one(user.__dict__)
    
    temperature_record_collection = db.temperature_records
    temperature_records = [
        TemperatureRecord(result.inserted_id, 25.0),
        TemperatureRecord(result.inserted_id, 26.0),
    ]
    temperature_record_collection.insert_many([record.__dict__ for record in temperature_records])
    
    moisture_record_collection = db.moisture_records
    moisture_records = [
        MoistureRecord(result.inserted_id, 5),
        MoistureRecord(result.inserted_id, 6),
        MoistureRecord(result.inserted_id, 7),
        MoistureRecord(result.inserted_id, 8),
    ]
    moisture_record_collection.insert_many([record.__dict__ for record in moisture_records])
    
    humidity_record_collection = db.humidity_records
    humidity_records = [
        HumidityRecord(result.inserted_id, 5),
        HumidityRecord(result.inserted_id, 6),
        HumidityRecord(result.inserted_id, 7),
        HumidityRecord(result.inserted_id, 8),
    ]
    humidity_record_collection.insert_many([record.__dict__ for record in humidity_records])

    pump_record_collection = db.pump_records
    pump_records = [
        PumpRecord(result.inserted_id, True),
        PumpRecord(result.inserted_id, False),
        PumpRecord(result.inserted_id, True),
        PumpRecord(result.inserted_id, False),
    ]
    pump_record_collection.insert_many([record.__dict__ for record in pump_records])

if __name__ == "__main__":
    main()