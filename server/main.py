# backend/app.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import joblib
import uvicorn
import os
import pickle
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse  
from .egg_features import extract_features_from_image

app = FastAPI()
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend")
app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(__file__)

with open(os.path.join(BASE_DIR, "egg_model.pkl"), "rb") as f:
    model = pickle.load(f)

scaler = model["scaler"]
kmeans = model["kmeans"]
feature_keys = model["feature_keys"]
cluster_to_size = model["cluster_to_size"]
cluster_to_size = {0: "Small", 1: "Medium", 2: "Large"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    arr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)

    if img is None:
        return {"error": "could not decode image"}

    feats = extract_features_from_image(img)
    X = np.array([[feats[k] for k in feature_keys]])
    X_scaled = scaler.transform(X)
    cluster = int(kmeans.predict(X_scaled)[0])
    size = cluster_to_size.get(cluster, "Unknown")
    return {"cluster": cluster, "size": size}

@app.get("/")
def serve_home():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
