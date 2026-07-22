from fastapi import APIRouter
from schema import RecommendationRequest
from ai_service import get_ai_recommendation

router = APIRouter()

@router.post("/recommend")
def recommend(data:RecommendationRequest):
    return get_ai_recommendation(data.model_dump())