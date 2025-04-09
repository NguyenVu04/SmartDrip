from joblib import load
import pandas as pd
import json

# Load the saved model
loaded_model = load("ai_model/irrigation_model.joblib")

# Load the CropType encoding mapping
with open("ai_model/crop_type_mapping.json", "r") as f:
    crop_type_mapping = json.load(f)

# Reverse the mapping for encoding
reverse_mapping = {v: k for k, v in crop_type_mapping.items()}

def predict(input_data):
    # Convert input data to DataFrame
    input_df = pd.DataFrame([input_data])
    
    # Encode the CropType column
    if "CropType" in input_df.columns:
        input_df["CropType"] = input_df["CropType"].map(reverse_mapping)
    
    # Make prediction
    prediction = loaded_model.predict(input_df)
    
    return prediction[0] == 1