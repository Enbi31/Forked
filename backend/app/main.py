from fastapi import FastAPI
from recommend import router

app = FastAPI()
app.include_router(router)

@app.get("/")
def home():
    return {"message":"Fork is now running"}