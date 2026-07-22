from pydantic import BaseModel

class Recommend(BaseModel):
    category : str
    budget : int
    priority :str
    preference : str
    deal : str