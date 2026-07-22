from fastapi import APIRouter
from schema import RecommendationRequest

router = APIRouter()

@router.post("/recommend")
def recommend(data:RecommendationRequest):
    return{
        "message": "Got request",
        "data": data
    }