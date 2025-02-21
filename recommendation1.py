import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import numpy as np

import sys
import json
import pickle

model = pickle.load(open("recommendation_1.pickle", 'rb'))

data = pd.read_csv('project_data.csv');


X = data.drop(columns=['id', 'Policy'])
y = data['Policy']
label_encoders = {}
for column in X.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    X[column] = le.fit_transform(X[column])
    label_encoders[column] = le
policy_encoder = LabelEncoder()
y_encoded = policy_encoder.fit_transform(y)

# Scale numerical features
scaler = StandardScaler()
X[['Age', 'Annual_Income']] = scaler.fit_transform(X[['Age', 'Annual_Income']])
# Function to recommend top 5 policies
def recommend_policies(user_data, model, label_encoders, scaler, policy_encoder, top_n=5):
    # Preprocess user data
    for column, le in label_encoders.items():
        user_data[column] = le.transform([user_data[column]])[0]
    user_data[['Age', 'Annual_Income']] = scaler.transform(user_data[['Age', 'Annual_Income']])

    # Predict probabilities for each policy
    probs = model.predict_proba([user_data.values.flatten()])[0]

    # Get top N policy indices
    top_n_indices = np.argsort(probs)[-top_n:][::-1]

    # Convert indices to policy names
    recommended_policies = policy_encoder.inverse_transform(top_n_indices)
    return recommended_policies

# Example user input data (replace with dynamic user input in production)
# user_input = {
#     'Gender': 'Male',
#     'Age': 76,
#     'Region_Code': 'S',
#     'Location_Type': 'Suburban',
#     'Education': 'Bachelors',
#     'Annual_Income': 100608,
#     'Vehicle_Type': 'SUV',
#     'Previously_Insured': 0,
#     'Vehicle_Age': '10-20 Years',
#     'Vehicle_Damage': 'No'
# }
user_input=json.loads(sys.argv[1])
# Convert user_input to a DataFrame for processing
user_input_df = pd.DataFrame([user_input])

# Get top 5 recommended policies
recommended_policies = recommend_policies(user_input_df, model, label_encoders, scaler, policy_encoder, top_n=5)
print("Top 5 Recommended Policies:", recommended_policies)


file_path = 'C:\insurance_3\insurance-website\models\project_data.csv'  # Update with your file path


# # Encode categorical features


# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# # Initialize and train a Random Forest model
# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X_train, y_train)

# # Evaluate the model accuracy
# y_pred = model.predict(X_test)
# accuracy = accuracy_score(y_test, y_pred)
# print(f"Model Accuracy: {accuracy:.4f}")