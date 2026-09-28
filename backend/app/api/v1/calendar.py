from typing import List, Optional
from fastapi import APIRouter, Depends, Query, Body
from app.core.security import get_optional_user_claims
from app.schemas.calendar import CalendarAppointment, BookAppointmentRequest
from app.services.calendar_service import get_all_appointments, book_new_appointment

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
