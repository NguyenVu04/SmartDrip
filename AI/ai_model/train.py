# Python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
from sklearn.tree import plot_tree
from joblib import dump
import json

# Load the dataset
file_path = "dataset.csv"
data = pd.read_csv(file_path)

# Convert SoilMoisture from centibars to percentage
def convert_cb_to_percentage(cb):
    # Hypothetical formula for conversion
    return 100 - 0.1 * cb

data['SoilMoisture'] = data['SoilMoisture'].apply(convert_cb_to_percentage)

# Encode the CropType column
data['CropType'] = data['CropType'].astype('category')
crop_type_mapping = dict(enumerate(data['CropType'].cat.categories))
data['CropType'] = data['CropType'].cat.codes

# Save the CropType encoding to a JSON file
with open('crop_type_mapping.json', 'w') as f:
    json.dump(crop_type_mapping, f)

# Separate features and target
X = data[['CropType', 'CropDays', 'SoilMoisture', 'Temperature', 'Humidity']]
y = data['Irrigation']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Random Forest model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Save the trained model
dump(model, 'irrigation_model.joblib')

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy:.2f}")

# Extract a single tree from the Random Forest
single_tree = model.estimators_[0]  # Get the first tree in the forest

# Plot the tree
plt.figure(figsize=(20, 10))  # Set the figure size
plot_tree(
    single_tree,
    feature_names=X.columns,
    class_names=["No Irrigation", "Irrigation"],  # Replace with your class labels
    filled=True,
    rounded=True,
    fontsize=10
)
plt.show()