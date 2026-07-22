from pydantic import BaseModel


class RecommendationRequest(BaseModel):
    category: str
    budget: int
    priority: str
    preference: str


class ProductResponse(BaseModel):
    name: str
    price: str
    reason: str
    specs: list[str] = []
    tradeoff: str = ""
    category_tier: str = "balanced"


class RecommendationResponse(BaseModel):
    products: list[ProductResponse]