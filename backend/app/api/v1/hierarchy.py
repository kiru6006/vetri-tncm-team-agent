from typing import Optional
from fastapi import APIRouter, Depends, Query
from app.core.security import get_current_user_claims
from app.schemas.hierarchy import HierarchyNode, DirectorySearchResponse, OfficerDossier
from app.services.hierarchy_service import build_hierarchy_tree, search_government_directory, OFFICERS_MASTER_DATA

router = APIRouter(tags=["Government Hierarchy & Smart Directory"])


@router.get("/hierarchy/tree", response_model=HierarchyNode)
async def fetch_hierarchy_tree(
    root_level: Optional[str] = "CHIEF_MINISTER",
    depth: int = Query(4, ge=1, le=10),
    claims: dict = Depends(get_current_user_claims)
):
    return build_hierarchy_tree()


@router.get("/directory/search", response_model=DirectorySearchResponse)
async def fetch_directory_search(
    query: str = Query(..., min_length=1),
    semantic: bool = Query(True),
    claims: dict = Depends(get_current_user_claims)
):
    return await search_government_directory(query, semantic)


@router.get("/directory/officers/{officer_id}", response_model=OfficerDossier)
async def fetch_officer_dossier(
    officer_id: str,
    claims: dict = Depends(get_current_user_claims)
):
    for off in OFFICERS_MASTER_DATA:
        if off.id == officer_id:
            return off
    return OFFICERS_MASTER_DATA[0]
