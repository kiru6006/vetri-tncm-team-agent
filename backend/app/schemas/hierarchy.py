from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class HierarchyNode(BaseModel):
    id: str
    name_en: str
    name_ta: str
    designation_en: str
    designation_ta: str
    tier_level: int
    tier_role: str
    department_code: Optional[str] = None
    department_en: Optional[str] = None
    department_ta: Optional[str] = None
    district_code: Optional[str] = None
    district_name_en: Optional[str] = None
    cug_phone: str
    official_email: str
    office_address: str
    pending_approvals_count: int = 0
    kpi_score: float = 90.0
    active_projects_count: int = 0
    active_schemes_count: int = 0
    subordinates_count: int = 0
    children: List['HierarchyNode'] = []


HierarchyNode.model_rebuild()


class OfficerDossier(BaseModel):
    id: str
    name_en: str
    name_ta: str
    designation_en: str
    designation_ta: str
    tier_role: str
    cadre: str
    batch_year: Optional[int] = None
    department_en: str
    department_ta: str
    district_en: Optional[str] = None
    district_ta: Optional[str] = None
    taluk_en: Optional[str] = None
    office_address: str
    cug_phone: str
    official_email: str
    reports_to_name: Optional[str] = None
    reports_to_designation: Optional[str] = None
    responsibilities: List[str]
    current_schemes: List[str]
    current_projects: List[str]
    current_committees: List[str]
    calendar_availability: str  # AVAILABLE, IN_MEETING, FIELD_VISIT
    pending_approvals_count: int
    performance_kpi_score: float
    recent_decisions: List[str]


class DirectorySearchResponse(BaseModel):
    query_interpreted: str
    total_results: int
    officers: List[OfficerDossier]
