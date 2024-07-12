from pydantic import BaseModel, Field
from typing import Optional

class ChatRequest(BaseModel):
    message: str
    number: str

    class Config:
        json_schema_extra = {
            "example": {
                "message": "hi",
                "number": "07222222222"
            }
        }