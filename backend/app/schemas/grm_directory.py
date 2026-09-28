from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime


class ReportingNode(BaseModel):
    id: str
    name_en: str
    name_ta: Optional[str] = None
    designation_en: str
    designation_ta: Optional[str] = None
    role_tier: str
    official_email: str
    cug_phone: Optional[str] = None


class DataSourceMetadata(BaseModel):
    source_name: str
    source_url: str
    source_type: str  # TN_GOV_PORTAL, SECRETARIAT_IAS_IPS_POSTINGS, POLICE_HQ_CCTNS, etc.
    last_synced_at: str
    sync_version: str
    is_verified: bool = True
    verified_by: Optional[str] = "TN e-Governance Agency (TNeGA)"


class OfficialGRMProfile(BaseModel):
    id: str
    name_en: str
    name_ta: str
    cadre: str  # IAS, IPS, IRS, IFS, TNCS_GRP1, TNCS_GRP2, TNCS_GRP3_4, MINISTER, MLA, etc.
    batch_year: Optional[int] = None
    designation_en: str
    designation_ta: str
    role_tier: str
    department_code: Optional[str] = None
    department_en: str
    department_ta: str
    district_en: Optional[str] = None
    district_ta: Optional[str] = None
    taluk_en: Optional[str] = None
    office_name: str
    office_address: str
    official_email: str
    cug_phone: str
    official_portal_url: Optional[str] = None
    data_classification: str = "OFFICIAL_PUBLIC"  # TOP_SECRET, SECRET, CONFIDENTIAL, OFFICIAL_PUBLIC
    status: str = "AVAILABLE"  # AVAILABLE, IN_MEETING, ON_FIELD_INSPECTION, BUSY, ON_LEAVE
    avatar_color: str = "from-indigo-600 to-emerald-500"
    
    # Hierarchy & Relationship
    reports_to: Optional[ReportingNode] = None
    direct_reports: List[ReportingNode] = []
    subordinates_count: int = 0
    
    # Responsibilities & Mandates
    responsibilities: List[str] = []
    current_schemes: List[str] = []
    current_projects: List[str] = []
    current_committees: List[str] = []
    
    # Operational & Decisions Tracking
    pending_approvals_count: int = 0
    performance_kpi_score: float = 92.0
    recent_decisions: List[str] = []
    recent_gos: List[str] = []
    recent_circulars: List[str] = []
    
    # AI Relationship Intelligence
    ai_relationship_insights: Optional[str] = None
    cross_department_collaborators: List[str] = []
    
    # Synchronization Metadata
    data_source: Optional[DataSourceMetadata] = None


class AutocompleteItem(BaseModel):
    id: str
    name_en: str
    name_ta: str
    cadre: str
    batch_year: Optional[int] = None
    designation_en: str
    department_en: str
    district_en: Optional[str] = None
    office_name: str
    official_email: str
    cug_phone: str
    status: str
    avatar_color: str
    role_tier: str


class GRMSearchResponse(BaseModel):
    query_interpreted: str
    total_results: int
    cadre_counts: Dict[str, int]
    officers: List[OfficialGRMProfile]


class SyncConnector(BaseModel):
    connector_id: str
    name: str
    name_ta: str
    source_url: str
    source_type: str
    last_sync_timestamp: str
    records_processed: int
    status: str  # COMPLETED, IN_PROGRESS, PENDING_VERIFICATION, FLAGGED_STALE
    data_freshness_rate_pct: float
    sync_frequency: str
    description: str


class SyncTriggerResponse(BaseModel):
    job_id: str
    connector_id: str
    status: str
    records_updated: int
    synced_at: str
    message: str


class SyncAuditLog(BaseModel):
    id: str
    timestamp: str
    connector_name: str
    action_type: str  # FULL_SYNC, INCREMENTAL_UPDATE, STALE_RECORD_FLAG, MANUAL_VERIFICATION
    records_affected: int
    initiated_by: str
    status: str
    details: str


class RelationshipIntelligenceQuery(BaseModel):
    topic: str
    department: Optional[str] = None
    district: Optional[str] = None
    action_type: Optional[str] = "MEETING_PARTICIPANTS"  # MEETING_PARTICIPANTS, ISSUE_OWNER, APPROVAL_PATH, PROJECT_TEAM


class RecommendedOfficerItem(BaseModel):
    officer: OfficialGRMProfile
    relevance_score: float
    reason_en: str
    reason_ta: str
    recommended_role: str  # PRIMARY_CHAIR, SUBJECT_MATTER_EXPERT, ENFORCEMENT_OFFICER, FIELD_LEAD


class RelationshipIntelligenceResponse(BaseModel):
    query_topic: str
    recommended_participants: List[RecommendedOfficerItem]
    escalation_path: List[ReportingNode]
    ai_executive_summary_en: str
    ai_executive_summary_ta: str
    suggested_agenda_items: List[str]
    supporting_gos: List[str]
