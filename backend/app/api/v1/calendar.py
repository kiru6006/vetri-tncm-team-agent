from typing import List, Optional
from fastapi import APIRouter, Depends, Query, Body
from app.core.security import get_optional_user_claims
from app.schemas.calendar import (
    CalendarAppointment,
    BookAppointmentRequest,
    DirectorySearchFilter,
    DirectorySearchResponse,
    AgentAppointmentRequest,
    AgentAppointmentResponse
)
from app.services.calendar_service import get_all_appointments, book_new_appointment
from app.services.directory_service import search_officials_directory
from app.services.appointment_agent import run_appointment_agent

router = APIRouter(prefix="/calendar", tags=["Chief Minister & Executive Calendar Engine"])


@router.get("/appointments", response_model=List[CalendarAppointment])
async def fetch_appointments(
    role_filter: Optional[str] = Query("ALL"),
    date_filter: Optional[str] = None,
    claims: dict = Depends(get_optional_user_claims)
):
    return await get_all_appointments(role_filter, date_filter)


@router.post("/book", response_model=CalendarAppointment)
async def book_appointment_endpoint(
    request: BookAppointmentRequest,
    claims: dict = Depends(get_optional_user_claims)
):
    return await book_new_appointment(request, claims)


@router.get("/directory/search", response_model=DirectorySearchResponse)
async def search_directory_endpoint(
    query: Optional[str] = Query(None),
    department: Optional[str] = Query(None),
    scheme: Optional[str] = Query(None),
    project: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    constituency: Optional[str] = Query(None),
    role_tier: Optional[str] = Query("ALL"),
    claims: dict = Depends(get_optional_user_claims)
):
    filters = DirectorySearchFilter(
        query=query,
        department=department,
        scheme=scheme,
        project=project,
        district=district,
        constituency=constituency,
        role_tier=role_tier
    )
    return search_officials_directory(filters)


@router.post("/agent/query", response_model=AgentAppointmentResponse)
async def agent_appointment_query_endpoint(
    request: AgentAppointmentRequest,
    claims: dict = Depends(get_optional_user_claims)
):
    return await run_appointment_agent(request, claims)
