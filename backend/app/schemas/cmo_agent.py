from datetime import date, datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field
from app.models.cmo_core import (
    CadreEnum,
    OfficialStatusEnum,
    SchemeStatusEnum,
    EntityTypeEnum,
    ChangeTypeEnum
)


# Official Schemas
class OfficialBase(BaseModel):
    id: str
    full_name_en: str
    full_name_ta: str
    cadre: CadreEnum
    batch_year: Optional[int] = None
    current_posting: str
    department_id: Optional[str] = None
    ministry_id: Optional[str] = None
    designation_rank: str
    phone_landline: Optional[str] = None
    phone_mobile: Optional[str] = None
    official_email: str
    office_address: str
    posting_effective_date: date
    expected_retirement: Optional[date] = None
    status: OfficialStatusEnum = OfficialStatusEnum.ACTIVE
    notes: Optional[str] = None
    source_refs: List[Dict[str, Any]] = []


class OfficialCreate(OfficialBase):
    pass


class OfficialCard(BaseModel):
    id: str
    full_name_en: str
    full_name_ta: str
    cadre: str
    batch_year: Optional[int] = None
    current_posting: str
    department_name: Optional[str] = None
    ministry_name: Optional[str] = None
    phone_landline: Optional[str] = None
    phone_mobile: Optional[str] = None
    official_email: str
    office_address: str
    posting_effective_date: str
    expected_retirement: Optional[str] = None
    status: str
    notes: Optional[str] = None
    schemes_handled: List[Dict[str, Any]] = []
    district_jurisdiction: List[str] = []
    source_refs: List[Dict[str, Any]] = []


# Department Schemas
class DepartmentOverview(BaseModel):
    id: str
    name_en: str
    name_ta: str
    ministry_name: Optional[str] = None
    minister_name: Optional[str] = None
    secretary_name: Optional[str] = None
    contact_phone: Optional[str] = None
    contact_email: Optional[str] = None
    address: Optional[str] = None
    active_schemes: List[Dict[str, Any]] = []
    sub_agencies: List[str] = []
    recent_personnel_changes: List[Dict[str, Any]] = []
    source_refs: List[Dict[str, Any]] = []


# Scheme Schemas
class MilestoneItem(BaseModel):
    name: str
    due_date: str
    completed_date: Optional[str] = None
    status: str


class SchemeProgress(BaseModel):
    id: str
    name_en: str
    name_ta: str
    department_name: Optional[str] = None
    ministry_name: Optional[str] = None
    responsible_officers: List[Dict[str, Any]] = []
    budget_sanctioned_cr: float
    budget_released_cr: float
    financial_year: str
    status: str
    progress_percent: float
    milestones: List[MilestoneItem] = []
    district_coverage: List[str] = []
    district_progress: List[Dict[str, Any]] = []
    sector: Optional[str] = None
    source_refs: List[Dict[str, Any]] = []


# District Schemas
class DistrictOfficerItem(BaseModel):
    role: str
    name: str
    cadre: str
    cug_phone: Optional[str] = None
    email: Optional[str] = None


class DistrictOverview(BaseModel):
    id: str
    name_en: str
    name_ta: str
    region: str
    mp_constituencies: List[str] = []
    assembly_constituencies: List[str] = []
    deployed_officers: List[DistrictOfficerItem] = []
    active_schemes: List[Dict[str, Any]] = []
    key_indicators: Dict[str, Any] = {}
    source_refs: List[Dict[str, Any]] = []


# Contact Directory & Faceted Search
class ContactSearchParams(BaseModel):
    cadre: Optional[str] = None
    ministry: Optional[str] = None
    department: Optional[str] = None
    rank: Optional[str] = None
    district: Optional[str] = None
    keyword: Optional[str] = None
    page: int = 1
    page_size: int = 20


class ContactRecord(BaseModel):
    id: str
    name_en: str
    name_ta: str
    cadre: str
    batch_year: Optional[int] = None
    designation: str
    department: str
    district: Optional[str] = None
    phone_landline: Optional[str] = None
    phone_mobile: Optional[str] = None
    official_email: str
    office_address: str
    status: str


class ContactSearchResponse(BaseModel):
    total_count: int
    page: int
    page_size: int
    results: List[ContactRecord]


# Personnel Changes & Audit Timeline
class PersonnelTimelineParams(BaseModel):
    date_from: Optional[str] = None
    date_to: Optional[str] = None
    cadre: Optional[str] = None
    department: Optional[str] = None


class PersonnelChangeRecord(BaseModel):
    id: str
    official_id: str
    official_name: str
    cadre: str
    change_type: str
    from_role: Optional[str] = None
    to_role: str
    effective_date: str
    order_ref: str
    source_gazette_url: Optional[str] = None


# Cross-Query Schemas
class CrossQueryParams(BaseModel):
    officials: Optional[List[str]] = None
    departments: Optional[List[str]] = None
    schemes: Optional[List[str]] = None
    districts: Optional[List[str]] = None


class CrossQueryResponse(BaseModel):
    query_summary: str
    intersection_results: List[Dict[str, Any]]
    related_officials: List[Dict[str, Any]]
    related_schemes: List[Dict[str, Any]]
    related_districts: List[Dict[str, Any]]


# Tool Schemas for Claude Sonnet Tool Calling
class FindOfficialInput(BaseModel):
    query: str = Field(description="Search term such as officer name, rank, or batch")
    filters: Optional[Dict[str, Any]] = Field(default=None, description="Filters like cadre, department, district, designation")


class GetDepartmentOverviewInput(BaseModel):
    department_name_or_id: str = Field(description="Department name (e.g., 'Health', 'School Education') or ID")


class GetSchemeProgressInput(BaseModel):
    scheme_name_or_id: str = Field(description="Scheme name (e.g., 'Kalaignar Magalir Urimai Thittam', 'AMRUT') or ID")
    district: Optional[str] = Field(default=None, description="Optional district name filter")


class GetDistrictOverviewInput(BaseModel):
    district_name: str = Field(description="District name (e.g., 'Salem', 'Coimbatore', 'Kallakurichi')")


class SearchContactsInput(BaseModel):
    filters: Dict[str, Any] = Field(default_factory=dict, description="Faceted filters: cadre, ministry, department, rank, district, keyword")


class GetPersonnelChangesInput(BaseModel):
    date_from: str = Field(description="Start date in YYYY-MM-DD format")
    date_to: str = Field(description="End date in YYYY-MM-DD format")
    cadre: Optional[str] = Field(default=None, description="Cadre filter (IAS, IPS, IRS, IFS)")
    department: Optional[str] = Field(default=None, description="Department filter")


class CrossQueryInput(BaseModel):
    entities: Dict[str, Any] = Field(description="Dictionary with officials, departments, schemes, districts arrays")


class ExportContactsInput(BaseModel):
    format: str = Field(description="Export format: 'csv', 'pdf', or 'vcard'")
    filters: Dict[str, Any] = Field(default_factory=dict, description="Faceted filters for the export")


# Chat Interaction Schemas
class ChatQueryRequest(BaseModel):
    query: str
    session_id: Optional[str] = "cm-session-default"
    role_clearance: Optional[str] = "CHIEF_MINISTER"
    language: Optional[str] = "en"


class ChatQueryResponse(BaseModel):
    response_text: str
    thought_process: Optional[List[str]] = []
    tools_called: List[Dict[str, Any]] = []
    summary_card: Optional[Dict[str, Any]] = None
    structured_details: Optional[List[Dict[str, Any]]] = None
    citations: List[Dict[str, Any]] = []
    quick_actions: List[Dict[str, Any]] = []
    data_as_of: str
