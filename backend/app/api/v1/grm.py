from typing import Optional, List
from fastapi import APIRouter, Depends, Query
from app.core.security import get_optional_user_claims
from app.schemas.grm_directory import (
    GRMSearchResponse,
    AutocompleteItem,
    OfficialGRMProfile,
    RelationshipIntelligenceQuery,
    RelationshipIntelligenceResponse,
    SyncConnector,
    SyncTriggerResponse,
    SyncAuditLog
)
from app.services.grm_directory_service import (
    search_grm_directory,
    get_grm_autocomplete,
    get_official_profile_by_id,
    analyze_relationship_intelligence
)
from app.services.grm_sync_service import (
    list_sync_connectors,
    list_sync_audit_logs,
    trigger_connector_sync
)

router = APIRouter(prefix="/grm", tags=["Enterprise Government Directory & Relationship Management (GRM)"])


@router.get("/search", response_model=GRMSearchResponse)
async def search_enterprise_directory(
    query: Optional[str] = Query(None, description="Free text or natural language search query"),
    cadre: Optional[str] = Query(None, description="Cadre filter: IAS, IPS, IRS, IFS, TNCS, MINISTER, ALL"),
    department: Optional[str] = Query(None, description="Department name or code"),
    district: Optional[str] = Query(None, description="District name"),
    role_tier: Optional[str] = Query(None, description="Role tier: CHIEF_MINISTER, CHIEF_SECRETARY, PRINCIPAL_SECRETARY, GROUP_1, GROUP_2, GROUP_3_4, ALL"),
    limit: int = Query(50, ge=1, le=200),
    claims: dict = Depends(get_optional_user_claims)
):
    return search_grm_directory(
        query=query,
        cadre=cadre,
        department=department,
        district=district,
        role_tier=role_tier,
        limit=limit
    )


@router.get("/autocomplete", response_model=List[AutocompleteItem])
async def autocomplete_officials(
    query: str = Query("", description="Type-ahead search query for instant autocomplete cards"),
    limit: int = Query(8, ge=1, le=20),
    claims: dict = Depends(get_optional_user_claims)
):
    return get_grm_autocomplete(query=query, limit=limit)


@router.get("/officers/{officer_id}", response_model=OfficialGRMProfile)
async def get_official_executive_profile(
    officer_id: str,
    claims: dict = Depends(get_optional_user_claims)
):
    profile = get_official_profile_by_id(officer_id)
    if profile:
        return profile
    return get_official_profile_by_id("grm-cm-01")


@router.post("/intelligence/recommend-participants", response_model=RelationshipIntelligenceResponse)
async def recommend_meeting_participants_and_escalation(
    req: RelationshipIntelligenceQuery,
    claims: dict = Depends(get_optional_user_claims)
):
    return analyze_relationship_intelligence(req)


@router.get("/sync/connectors", response_model=List[SyncConnector])
async def get_etl_sync_connectors(
    claims: dict = Depends(get_optional_user_claims)
):
    return list_sync_connectors()


@router.post("/sync/trigger", response_model=SyncTriggerResponse)
async def trigger_etl_sync_job(
    connector_id: Optional[str] = Query(None, description="Optional connector ID to sync specifically, or empty for all"),
    claims: dict = Depends(get_optional_user_claims)
):
    return trigger_connector_sync(connector_id, claims)


@router.get("/sync/audit-logs", response_model=List[SyncAuditLog])
async def get_etl_sync_audit_logs(
    claims: dict = Depends(get_optional_user_claims)
):
    return list_sync_audit_logs()
