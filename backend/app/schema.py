from pydantic import BaseModel

class RecommendationRequest(BaseModel):
    category : str
    budget : int
    priority :str
    preference : str
    deal : str