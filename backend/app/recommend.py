from fastapi import APIRouter, HTTPException
from app.schema import RecommendationRequest, RecommendationResponse
from app.ai_service import get_ai_recommendation

router = APIRouter()


@router.post("/recommend", response_model=RecommendationResponse)
def recommend(data: RecommendationRequest):
    result = get_ai_recommendation(data.model_dump())
    if not result.get("products"):
        raise HTTPException(status_code=500, detail="AI failed to generate recommendations")
    return result