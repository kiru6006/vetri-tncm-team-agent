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
    duration_minutes: int = 45
    location: str = "Chief Minister's Secretariat Chamber, Fort St. George"
    status: str = "CONFIRMED"  # CONFIRMED, PENDING, COMPLETED, RESCHEDULED
    priority: str = "HIGH"  # CRITICAL, HIGH, MEDIUM, ROUTINE

    # Host & Participant Details
    host_name: str = "M. K. Stalin"
    host_role: str = "CHIEF_MINISTER"
    participant_name_en: str
    participant_name_ta: str
    participant_designation: str
    participant_role: str  # CHIEF_MINISTER, MINISTER, MLA, PRINCIPAL_SECRETARY, GROUP_1, GROUP_2, GROUP_3_4, CITIZEN
    participant_department: Optional[str] = None
    participant_district: Optional[str] = None
    participant_constituency: Optional[str] = None
    participant_contact: str
    participant_email: Optional[str] = None
    participant_emails: List[str] = []

    # Scheme / Project Context
    related_scheme: Optional[str] = None
    related_project: Optional[str] = None

    # Meeting Agenda & Notes
    agenda_en: str
    agenda_ta: str
    ai_prepared_notes_en: Optional[str] = None
    ai_prepared_notes_ta: Optional[str] = None
    historical_decisions_context: List[str] = []
    required_files_gos: List[str] = []
    protocol_clearance_status: str = "VERIFIED"  # VERIFIED, VIP_SECURITY, STANDARD


class DepartmentStaffingMetric(BaseModel):
    sanctioned_posts: int
    in_position_staff: int
    vacant_posts: int
    vacancy_pct: float
    demand_urgency: str  # CRITICAL, HIGH, MODERATE, STABLE
    top_shortage_roles: List[str] = []
    ai_staffing_remedy_en: str
    ai_staffing_remedy_ta: str


class DepartmentFundMetric(BaseModel):
    budget_sanctioned_cr: float
    funds_released_cr: float
    expenditure_spent_cr: float
    utilization_pct: float
    unspent_balance_cr: float
    fiscal_health_status: str  # HEALTHY, ON_TRACK, SLOW_ABSORPTION, VARIANCE_FLAG
    flagged_variance_areas: List[str] = []


class ProjectDetail(BaseModel):
    name: str
    sanctioned_cost_cr: float
    physical_progress_pct: float
    financial_progress_pct: float
    target_completion: str
    bottleneck_en: Optional[str] = None
    bottleneck_ta: Optional[str] = None


class SchemeDetail(BaseModel):
    name: str
    target_beneficiaries: str
    actual_covered: str
    saturation_pct: float
    annual_budget_cr: float
    disbursement_status: str


class OfficerDirectoryItem(BaseModel):
    id: str
    name_en: str
    name_ta: str
    designation_en: str
    designation_ta: str
    role_tier: str  # MINISTER, MLA, PRINCIPAL_SECRETARY, GROUP_1, GROUP_2, GROUP_3_4
    department_en: str
    department_ta: str
    district_en: str
    district_ta: str
    constituency: Optional[str] = None
    official_email: str
    cug_phone: str
    office_address: str
    current_schemes: List[str] = []
    current_projects: List[str] = []
    availability_status: str = "AVAILABLE"  # AVAILABLE, IN_MEETING, ON_FIELD_INSPECTION

    # Executive Intelligence & Analytics Extensions
    funds_allocation: Optional[DepartmentFundMetric] = None
    staffing_demand_supply: Optional[DepartmentStaffingMetric] = None
    detailed_projects: List[ProjectDetail] = []
    detailed_schemes: List[SchemeDetail] = []
    ai_strategic_analysis_en: Optional[str] = None
    ai_strategic_analysis_ta: Optional[str] = None


class DirectorySearchFilter(BaseModel):
    query: Optional[str] = None
    department: Optional[str] = None
    scheme: Optional[str] = None
    project: Optional[str] = None
    district: Optional[str] = None
    constituency: Optional[str] = None
    role_tier: Optional[str] = "ALL"


class DirectorySearchResponse(BaseModel):
    total_matches: int
    officers: List[OfficerDirectoryItem]
    query_interpreted: Optional[str] = None


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
    constituency: Optional[str] = None
    contact_phone: Optional[str] = None
    participant_email: Optional[str] = None
    participant_emails: List[str] = []
    related_scheme: Optional[str] = None
    related_project: Optional[str] = None
    location: Optional[str] = "Chief Minister's Secretariat Chamber, Fort St. George"


class AgentAppointmentRequest(BaseModel):
    query: str
    language: Optional[str] = "en"
    session_id: Optional[str] = "executive-session"


class AgentAppointmentResponse(BaseModel):
    action_type: str  # DIRECTORY_SEARCH_RESULTS, APPOINTMENT_SCHEDULED, GENERAL_INSIGHT
    matched_officers: List[OfficerDirectoryItem] = []
    appointment: Optional[CalendarAppointment] = None
    response_en: str
    response_ta: str
    citations: List[Dict[str, Any]] = []
    thought_steps: List[str] = []


class CalendarFilterQuery(BaseModel):
    selected_role: Optional[str] = "ALL"  # ALL, CHIEF_MINISTER, MINISTER, MLA, PRINCIPAL_SECRETARY, GROUP_1, GROUP_2, GROUP_3_4
    selected_date: Optional[str] = None
    search_query: Optional[str] = None
