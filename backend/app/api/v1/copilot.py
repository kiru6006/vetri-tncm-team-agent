from fastapi import APIRouter, Depends
from app.core.security import get_current_user_claims
from app.schemas.copilot import CopilotQueryRequest, CopilotQueryResponse
from app.services.copilot_service import process_copilot_query

router = APIRouter(prefix="/copilot", tags=["AI Copilot Engine"])


@router.post("/chat", response_model=CopilotQueryResponse)
async def chat_with_copilot(request: CopilotQueryRequest, claims: dict = Depends(get_current_user_claims)):
    return await process_copilot_query(request, claims)
