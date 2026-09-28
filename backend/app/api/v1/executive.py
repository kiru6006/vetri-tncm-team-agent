from typing import List
from fastapi import APIRouter, Depends
from app.core.security import get_current_user_claims, require_roles
from app.schemas.executive import StateScoreResponse, PriorityAlert, FlagshipSchemeSummary
from app.schemas.analytics import RevenueAnalyticsResponse, GrievanceAnalyticsResponse, StalledProject
from app.services.executive_service import get_state_scorecard, get_priority_alerts, get_flagship_schemes
from app.services.analytics_service import get_revenue_analytics, get_grievance_analytics, get_stalled_projects

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


@router.get("/revenue-analytics", response_model=RevenueAnalyticsResponse)
async def fetch_revenue_analytics(claims: dict = Depends(get_current_user_claims)):
    return await get_revenue_analytics()


@router.get("/grievances-summary", response_model=GrievanceAnalyticsResponse)
async def fetch_grievances_summary(claims: dict = Depends(get_current_user_claims)):
    return await get_grievance_analytics()


@router.get("/stalled-projects", response_model=List[StalledProject])
async def fetch_stalled_projects(claims: dict = Depends(get_current_user_claims)):
    return await get_stalled_projects()
