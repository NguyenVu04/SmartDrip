import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from ai_model.Model import Net

IN_FEATURES = 5

def train(dataset_path: str):
    data = pd.read_csv(dataset_path)

    label_encoder = LabelEncoder()
    data['CropType'] = label_encoder.fit_transform(data['CropType'])

    X = data.drop('Irrigation', axis=1).values
    y = data['Irrigation'].values

    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    X_train = torch.tensor(X_train, dtype=torch.float32)
    X_test = torch.tensor(X_test, dtype=torch.float32)
    y_train = torch.tensor(y_train, dtype=torch.float32).unsqueeze(1)
    y_test = torch.tensor(y_test, dtype=torch.float32).unsqueeze(1)
    
    model = Net(IN_FEATURES)
    criterion = nn.BCELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    num_epochs = 200
    for epoch in range(num_epochs):
        model.train()
        optimizer.zero_grad()
        outputs = model(X_train)
        loss = criterion(outputs, y_train)
        loss.backward()
        optimizer.step()

        if (epoch+1) % 10 == 0:
            print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

    torch.save(model.state_dict(), 'ai_model/model.pth')

    model.eval()
    with torch.no_grad():
        y_pred = model(X_test)
        y_pred = y_pred.round()
        accuracy = (y_pred.eq(y_test).sum() / float(y_test.shape[0])).item()
        print(f'Accuracy: {accuracy:.4f}')
        
def cb_to_percentage(cb_value):
    # Example conversion formula (this is a hypothetical example)
    percentage = 100 - cb_value * 0.1  # Adjust the formula based on your calibration data
    return max(0, min(percentage, 100))  # Ensure the percentage is between 0 and 100

def predict(input):
    label_encoder = LabelEncoder()
    scaler = StandardScaler()
    
    model = Net(IN_FEATURES)
    model.load_state_dict(torch.load("ai_model/model.pth"))
    model.eval()
    
    input_df = pd.DataFrame([input])
    input_df['CropType'] = label_encoder.fit_transform(input_df['CropType'])
    
    # Convert SoilMoisture from cb to percentage
    input_df['SoilMoisture'] = input_df['SoilMoisture'].apply(cb_to_percentage)
    
    input_scaled = scaler.fit_transform(input_df)
    input_tensor = torch.tensor(input_scaled, dtype=torch.float32)
    
    with torch.no_grad():
        prediction = model(input_tensor)
        prediction = prediction.round().item()
        irrigation_needed = bool(prediction)
        return irrigation_needed