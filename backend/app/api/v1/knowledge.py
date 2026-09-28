from typing import Optional
from fastapi import APIRouter, Depends, Query
from app.core.security import get_current_user_claims
from app.schemas.knowledge import OmniSearchResponse, GovernmentOrderDocument
from app.services.knowledge_service import execute_omni_search, KNOWLEDGE_DOCUMENTS_VAULT

router = APIRouter(tags=["Enterprise Knowledge Hub & Omni Search"])


@router.get("/search/omni", response_model=OmniSearchResponse)
async def search_omni(
    q: str = Query(..., min_length=1),
    doc_type: Optional[str] = Query("ALL"),
    claims: dict = Depends(get_current_user_claims)
):
    return await execute_omni_search(q, doc_type)


@router.get("/knowledge/documents", response_model=list[GovernmentOrderDocument])
async def list_knowledge_documents(
    doc_type: Optional[str] = Query("ALL"),
    claims: dict = Depends(get_current_user_claims)
):
    if doc_type and doc_type != "ALL":
        return [d for d in KNOWLEDGE_DOCUMENTS_VAULT if d.doc_type == doc_type]
    return KNOWLEDGE_DOCUMENTS_VAULT
