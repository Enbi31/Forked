from fastapi import APIRouter
from app.schema import RecommendationRequest
from app.ai_service import get_ai_recommendation

router = APIRouter()

@router.post("/recommend")
def recommend(data:RecommendationRequest):
    return get_ai_recommendation(data.model_dump())