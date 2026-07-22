from typing import Literal
from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    category: str = Field(..., min_length=1, max_length=200)
    budget: int = Field(..., gt=0, le=500000)
    priority: str = Field(..., min_length=1, max_length=100)
    preference: str = Field(..., min_length=1, max_length=100)


class ProductResponse(BaseModel):
    name: str
    price: str
    reason: str
    specs: list[str] = []
    tradeoff: str = ""
    category_tier: Literal["budget", "balanced", "powerhouse"] = "balanced"


class RecommendationResponse(BaseModel):
    products: list[ProductResponse]