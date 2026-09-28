"""
CMO REST API Endpoints for VERTRI TN AI OS.
Exposes the 8 tools and natural language AI query endpoint.
"""

from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Query, HTTPException, Response
from app.schemas.cmo_agent import (
    ChatQueryRequest,
    ChatQueryResponse,
    OfficialCard,
    DepartmentOverview,
    SchemeProgress,
    DistrictOverview,
    ContactSearchResponse,
    PersonnelChangeRecord,
    CrossQueryParams,
    CrossQueryResponse
)
from app.agent.orchestrator import cmo_orchestrator
from app.services.cmo_query_service import cmo_service
from app.agent.tools import export_contacts

router = APIRouter(prefix="/cmo", tags=["Chief Minister's Office AI Agent"])


@router.post("/chat", response_model=ChatQueryResponse)
async def query_cmo_agent(payload: ChatQueryRequest):
    """
    Query the CMO AI Agent with natural language queries.
    Uses tool calling and synthesizes executive response cards with source citations.
    """
    return cmo_orchestrator.execute_query(
        query=payload.query,
        session_id=payload.session_id or "cm-session-default",
        role_clearance=payload.role_clearance or "CHIEF_MINISTER",
        language=payload.language or "en"
    )


@router.get("/officials", response_model=List[OfficialCard])
async def search_officials(
    q: Optional[str] = Query(default="", description="Search query"),
    cadre: Optional[str] = Query(default=None, description="Cadre filter (IAS, IPS, IRS, IFS)"),
    department: Optional[str] = Query(default=None, description="Department filter")
):
    """
    Find officials matching query terms and filters.
    """
    filters = {}
    if cadre:
        filters["cadre"] = cadre
    if department:
        filters["department"] = department
    return cmo_service.find_official(q, filters)


@router.get("/departments/{dept_id}", response_model=DepartmentOverview)
async def get_department_overview_endpoint(dept_id: str):
    """
    Retrieve full department overview, leadership, and active schemes.
    """
    overview = cmo_service.get_department_overview(dept_id)
    if not overview:
        raise HTTPException(status_code=404, detail=f"Department '{dept_id}' not found.")
    return overview


@router.get("/schemes/{scheme_id}", response_model=SchemeProgress)
async def get_scheme_progress_endpoint(
    scheme_id: str,
    district: Optional[str] = Query(default=None, description="Filter by district")
):
    """
    Retrieve scheme execution progress, budgets, and milestones.
    """
    progress = cmo_service.get_scheme_progress(scheme_id, district)
    if not progress:
        raise HTTPException(status_code=404, detail=f"Scheme '{scheme_id}' not found.")
    return progress


@router.get("/districts/{district_name}", response_model=DistrictOverview)
async def get_district_overview_endpoint(district_name: str):
    """
    Retrieve 38-District overview, deployed Collector/SP, and active schemes.
    """
    overview = cmo_service.get_district_overview(district_name)
    if not overview:
        raise HTTPException(status_code=404, detail=f"District '{district_name}' not found.")
    return overview


@router.get("/contacts", response_model=ContactSearchResponse)
async def get_contacts_endpoint(
    cadre: Optional[str] = Query(default=None),
    department: Optional[str] = Query(default=None),
    rank: Optional[str] = Query(default=None),
    keyword: Optional[str] = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100)
):
    """
    Faceted contact directory search across 5 dimensions.
    """
    filters = {
        "cadre": cadre,
        "department": department,
        "rank": rank,
        "keyword": keyword
    }
    return cmo_service.search_contacts(filters, page, page_size)


@router.get("/personnel-changes", response_model=List[PersonnelChangeRecord])
async def get_personnel_changes_endpoint(
    date_from: Optional[str] = Query(default="2024-01-01"),
    date_to: Optional[str] = Query(default="2026-09-28"),
    cadre: Optional[str] = Query(default=None),
    department: Optional[str] = Query(default=None)
):
    """
    Retrieve official transfers, promotions, and gazette posting history.
    """
    return cmo_service.get_personnel_changes(date_from, date_to, cadre, department)


@router.post("/cross-query", response_model=CrossQueryResponse)
async def cross_query_endpoint(payload: CrossQueryParams):
    """
    Execute relational cross-query across officials, schemes, and districts.
    """
    return cmo_service.cross_query(payload.model_dump())


@router.get("/export")
async def export_directory_endpoint(
    format: str = Query(default="csv", description="Format: csv, pdf, or vcard"),
    cadre: Optional[str] = Query(default="ALL")
):
    """
    Export official directory contacts into downloadable CSV, PDF, or vCard format.
    """
    result = export_contacts(format, {"cadre": cadre})

    if format.lower() == "csv":
        csv_data = "ID,Name,Cadre,Batch,Designation,Department,Phone,Email,OfficeAddress\n"
        contacts = cmo_service.search_contacts({"cadre": cadre}, page=1, page_size=100)
        for c in contacts.results:
            csv_data += f'"{c.id}","{c.name_en}","{c.cadre}","{c.batch_year or ""}","{c.designation}","{c.department}","{c.phone_mobile or c.phone_landline or ""}","{c.official_email}","{c.office_address}"\n'
        return Response(
            content=csv_data,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=tn_officials_{cadre.lower()}.csv"}
        )

    return result


# ==========================================
# PHASE 4: EXECUTIVE INTELLIGENCE PLATFORM
# ==========================================

from app.schemas.executive_intel import (
    KnowledgeGraphResponse,
    OfficerExecutiveIntelligence,
    DepartmentIntelligence,
    SchemeIntelligence,
    MeetingPreparationRequest,
    MeetingPreparationResponse,
    ExecutiveDecisionSupportResponse
)
from app.services.executive_intelligence_service import executive_intel_service


@router.get("/graph/{entity_id}", response_model=KnowledgeGraphResponse)
async def get_knowledge_graph_endpoint(entity_id: str):
    """
    Retrieve interconnected Government Knowledge Graph nodes and edges for any entity.
    """
    return executive_intel_service.get_knowledge_graph(entity_id)


@router.get("/officers/{officer_id}/intelligence", response_model=OfficerExecutiveIntelligence)
async def get_officer_intelligence_endpoint(officer_id: str):
    """
    Retrieve full executive intelligence dossier for an official (workload, projects,
    citizen complaints, crime/revenue metrics, and AI discussion topics).
    """
    intel = executive_intel_service.get_officer_executive_intelligence(officer_id)
    if not intel:
        raise HTTPException(status_code=404, detail=f"Officer '{officer_id}' intelligence dossier not found.")
    return intel


@router.get("/departments/{dept_id}/intelligence", response_model=DepartmentIntelligence)
async def get_department_intelligence_endpoint(dept_id: str):
    """
    Retrieve department intelligence diagnostic (budget utilization, revenue leakages,
    top governance risks, and operational issues).
    """
    intel = executive_intel_service.get_department_intelligence(dept_id)
    if not intel:
        raise HTTPException(status_code=404, detail=f"Department '{dept_id}' intelligence not found.")
    return intel


@router.get("/schemes/{scheme_id}/intelligence", response_model=SchemeIntelligence)
async def get_scheme_intelligence_endpoint(scheme_id: str):
    """
    Retrieve scheme intelligence (physical vs financial progress, audit findings,
    citizen feedback, and predictive completion date).
    """
    intel = executive_intel_service.get_scheme_intelligence(scheme_id)
    if not intel:
        raise HTTPException(status_code=404, detail=f"Scheme '{scheme_id}' intelligence not found.")
    return intel


@router.post("/meetings/prepare", response_model=MeetingPreparationResponse)
async def prepare_meeting_endpoint(payload: MeetingPreparationRequest):
    """
    Automatically generate an AI Pre-Meeting Briefing Strategy Dossier (agenda,
    critical questions for the Hon'ble CM, decision options, media coverage, and assembly questions).
    """
    return executive_intel_service.prepare_meeting(payload.officer_id, payload.meeting_topic)


@router.get("/decisions/{query_key}", response_model=ExecutiveDecisionSupportResponse)
async def get_executive_decision_support_endpoint(query_key: str):
    """
    Resolve high-level executive queries (e.g. FOCUS_TODAY, FLOOD_PREPAREDNESS, CABINET_BRIEFING).
    """
    return executive_intel_service.resolve_decision_support(query_key)

