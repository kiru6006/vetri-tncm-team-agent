from typing import List, Optional
from fastapi import APIRouter, Depends, Body
from app.core.security import get_current_user_claims
from app.schemas.meetings import MeetingBriefingPack, MeetingCreateRequest
from app.services.meeting_service import get_all_meetings, get_meeting_briefing_pack, create_new_meeting

router = APIRouter(prefix="/meetings", tags=["Executive Meeting Intelligence Workspace"])


@router.get("", response_model=List[MeetingBriefingPack])
async def fetch_meetings(claims: dict = Depends(get_current_user_claims)):
    return await get_all_meetings()


@router.get("/{meeting_id}/briefing-pack", response_model=MeetingBriefingPack)
async def fetch_meeting_pack(meeting_id: str, claims: dict = Depends(get_current_user_claims)):
    return await get_meeting_briefing_pack(meeting_id)


@router.post("/create", response_model=MeetingBriefingPack)
async def schedule_meeting(
    request: MeetingCreateRequest,
    claims: dict = Depends(get_current_user_claims)
):
    return await create_new_meeting(request, claims)
