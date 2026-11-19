from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["System"])


# This defines the JSON fields the dashboard can expect from the API.
class HealthResponse(BaseModel):
    status: Literal["ok"]
    service: str
    version: str


# main.py adds "/api", so the dashboard calls this route at "/api/health".
@router.get("/health", response_model=HealthResponse)
def get_health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="fincred-x-api",
        version="0.1.0",
    )