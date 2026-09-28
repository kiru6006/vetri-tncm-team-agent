from typing import List
from fastapi import APIRouter, Depends
from app.core.security import get_current_user_claims, require_roles
from app.schemas.executive import StateScoreResponse, PriorityAlert, FlagshipSchemeSummary
from app.services.executive_service import get_state_scorecard, get_priority_alerts, get_flagship_schemes

router = APIRouter(prefix="/executive", tags=["Executive Command Center"])


@router.get("/state-score", response_model=StateScoreResponse)
async def fetch_state_score(claims: dict = Depends(get_current_user_claims)):
    return await get_state_scorecard()


@router.get("/priority-alerts", response_model=List[PriorityAlert])
async def fetch_priority_alerts(claims: dict = Depends(get_current_user_claims)):
    return await get_priority_alerts()


@router.get("/flagship-schemes", response_model=List[FlagshipSchemeSummary])
async def fetch_flagship_schemes(claims: dict = Depends(get_current_user_claims)):
    return await get_flagship_schemes()
