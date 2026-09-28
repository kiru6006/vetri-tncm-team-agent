from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class CalendarAppointment(BaseModel):
    id: str
    title_en: str
    title_ta: str
    appointment_type: str  # CM_APPOINTMENT, CABINET_REVIEW, MLA_DELEGATION, SECRETARY_BRIEFING, PUBLIC_PETITION, FIELD_INSPECTION
    scheduled_date: str  # YYYY-MM-DD
    scheduled_time: str  # e.g., "10:30 AM - 11:15 AM"
    duration_minutes: int
    location: str
    status: str = "CONFIRMED"  # CONFIRMED, PENDING, COMPLETED, RESCHEDULED
    priority: str = "HIGH"  # CRITICAL, HIGH, MEDIUM, ROUTINE

    # Participant Details
    host_name: str
    host_role: str
    participant_name_en: str
    participant_name_ta: str
    participant_designation: str
    participant_role: str  # CHIEF_MINISTER, MINISTER, MLA, PRINCIPAL_SECRETARY, GROUP_1, GROUP_2, GROUP_3_4, CITIZEN
    participant_department: Optional[str] = None
    participant_district: Optional[str] = None
    participant_contact: str
    participant_email: Optional[str] = None

    # Meeting Agenda & Notes
    agenda_en: str
    agenda_ta: str
    ai_prepared_notes_en: Optional[str] = None
    ai_prepared_notes_ta: Optional[str] = None
    historical_decisions_context: List[str] = []
    required_files_gos: List[str] = []
    protocol_clearance_status: str = "VERIFIED"  # VERIFIED, VIP_SECURITY, STANDARD


class BookAppointmentRequest(BaseModel):
    title: str
    participant_name: str
    participant_role: str
    participant_designation: str
    scheduled_date: Optional[str] = None
    scheduled_time: Optional[str] = None
    agenda: str
    department: Optional[str] = None
    district: Optional[str] = None
    contact_phone: Optional[str] = None
    location: Optional[str] = "Chief Minister's Secretariat Chamber, Fort St. George"


class CalendarFilterQuery(BaseModel):
    selected_role: Optional[str] = "ALL"  # ALL, CHIEF_MINISTER, MINISTER, MLA, PRINCIPAL_SECRETARY, GROUP_1, GROUP_2, GROUP_3_4
    selected_date: Optional[str] = None
    search_query: Optional[str] = None
