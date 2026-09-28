"""
Pydantic Schemas for VERTRI TN AI OS Phase 4: Executive Intelligence Platform.
Defines models for Knowledge Graph, Executive Officer Dossiers, Department Intelligence,
Scheme Intelligence, AI Meeting Preparation, and Decision Support Endpoints.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


# 1. Knowledge Graph Models
class GraphNode(BaseModel):
    id: str
    label: str
    type: str  # OFFICIAL, DEPARTMENT, SCHEME, DISTRICT, TALUK, PROJECT, BUDGET, GO, COMPLAINT
    metadata: Dict[str, Any] = {}
    avatar_or_icon: Optional[str] = None


class GraphEdge(BaseModel):
    source: str
    target: str
    relationship: str  # OVERSEES, RESPONSIBLE_FOR, LOCATED_IN, SANCTIONED_BY, GOVERNED_BY, REPORTS_TO
    weight: Optional[float] = 1.0


class KnowledgeGraphResponse(BaseModel):
    root_entity_id: str
    entity_name: str
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    total_connected_entities: int


# 2. AI Executive Officer Intelligence Dossier
class OfficerExecutiveIntelligence(BaseModel):
    officer_id: str
    name_en: str
    name_ta: str
    cadre: str
    batch_year: Optional[int] = None
    current_posting: str
    department_en: str
    district_en: str
    official_email: str
    cug_phone: str
    office_address: str
    reporting_officer: Optional[Dict[str, str]] = None
    reporting_hierarchy: List[Dict[str, str]] = []
    
    # Intelligence Dimensions
    current_workload_score: float  # e.g. 84.5%
    active_projects: List[Dict[str, Any]] = []
    active_schemes: List[Dict[str, Any]] = []
    upcoming_meetings: List[Dict[str, Any]] = []
    pending_approvals: List[Dict[str, Any]] = []
    pending_files_count: int
    recent_reviews: List[Dict[str, Any]] = []
    department_kpi_score: float
    district_kpi_score: Optional[float] = None
    citizen_complaints_handled: int
    citizen_satisfaction_score: float
    domain_statistics: Dict[str, Any] = {}  # e.g. crime stats for SP, revenue stats for IRS/Collector
    ai_executive_summary_en: str
    ai_executive_summary_ta: str
    recommended_discussion_topics: List[str] = []
    sources: List[Dict[str, Any]] = []


# 3. Department Intelligence
class DepartmentIntelligence(BaseModel):
    department_id: str
    name_en: str
    name_ta: str
    ministry_en: str
    minister_name: str
    secretary_name: str
    mission: str
    vision: str
    budget_allocated_cr: float
    budget_utilized_cr: float
    budget_utilization_pct: float
    revenue_target_cr: Optional[float] = None
    revenue_collected_cr: Optional[float] = None
    total_staff_strength: int
    vacancies_count: int
    active_projects_count: int
    active_schemes_count: int
    citizen_services_count: int
    kpi_performance_score: float
    pending_files_count: int
    top_governance_risks: List[str] = []
    identified_revenue_leakages: List[str] = []
    operational_issues: List[str] = []
    ai_recommendations: List[str] = []
    district_comparison: List[Dict[str, Any]] = []
    supporting_government_orders: List[Dict[str, str]] = []


# 4. Scheme Intelligence
class SchemeIntelligence(BaseModel):
    scheme_id: str
    name_en: str
    name_ta: str
    objective: str
    department_en: str
    minister_name: str
    principal_secretary_name: str
    executing_officers: List[Dict[str, str]] = []
    district_coverage: List[str] = []
    budget_sanctioned_cr: float
    budget_released_cr: float
    financial_progress_pct: float
    physical_progress_pct: float
    total_beneficiaries: int
    milestones: List[Dict[str, Any]] = []
    audit_findings: List[str] = []
    related_government_orders: List[str] = []
    citizen_feedback_score: float
    risk_assessment: List[str] = []
    ai_recommendations: List[str] = []
    predicted_completion_date: str
    source_refs: List[Dict[str, Any]] = []


# 5. AI Meeting Preparation Dossier
class MeetingPreparationRequest(BaseModel):
    officer_id: Optional[str] = None
    department_id: Optional[str] = None
    meeting_topic: str


class MeetingPreparationResponse(BaseModel):
    meeting_topic: str
    prepared_for: str
    background_brief: str
    department_summary: str
    pending_work: List[str] = []
    budget_status_summary: str
    active_projects_and_schemes: List[str] = []
    citizen_complaints_overview: str
    media_coverage_summary: str
    assembly_questions_related: List[str] = []
    open_risks: List[str] = []
    recommended_questions_for_cm: List[str] = []
    decision_options_for_cm: List[Dict[str, str]] = []
    meeting_agenda: List[str] = []
    expected_outcomes: List[str] = []
    follow_up_tasks: List[str] = []
    source_citations: List[Dict[str, Any]] = []


# 6. Executive Decision Support Output
class ExecutiveDecisionActionItem(BaseModel):
    priority: str  # CRITICAL, HIGH, MEDIUM
    category: str
    title: str
    responsible_officer: str
    department_or_district: str
    recommended_directive: str
    deadline: str


class ExecutiveDecisionSupportResponse(BaseModel):
    query_intent: str
    executive_headline: str
    executive_summary: str
    action_items: List[ExecutiveDecisionActionItem] = []
    ranked_entities: List[Dict[str, Any]] = []
    data_as_of: str
