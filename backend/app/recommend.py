import logging
from fastapi import APIRouter, HTTPException
from app.schema import RecommendationRequest, RecommendationResponse
from app.ai_service import get_ai_recommendation

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/recommend", response_model=RecommendationResponse)
def recommend(data: RecommendationRequest):
    try:
        safe_category = data.category.encode('ascii', 'backslashreplace').decode('ascii')
        logger.info("Recommendation request: category=%s, budget=%d", safe_category, data.budget)
        result = get_ai_recommendation(data.model_dump())
        if not result.get("products"):
            raise HTTPException(status_code=500, detail="AI failed to generate recommendations")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Unexpected error in recommend endpoint: %s", e)
        raise HTTPException(status_code=500, detail="Internal server error")