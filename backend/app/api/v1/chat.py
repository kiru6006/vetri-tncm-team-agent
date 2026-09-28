from typing import List, Dict, Any
from fastapi import APIRouter, Depends, Body
from app.core.security import get_current_user_claims
from app.schemas.chat import ChatRoom, ChatMessage, ChatSummaryResponse
from app.services.chat_service import get_all_chat_rooms, get_room_messages, send_chat_message, summarize_chat_room

router = APIRouter(prefix="/chat", tags=["Secure Government Collaboration & Chat"])


@router.get("/rooms", response_model=List[ChatRoom])
async def fetch_chat_rooms(claims: dict = Depends(get_current_user_claims)):
    return await get_all_chat_rooms()


@router.get("/rooms/{room_id}/messages", response_model=List[ChatMessage])
async def fetch_room_messages(room_id: str, claims: dict = Depends(get_current_user_claims)):
    return await get_room_messages(room_id)


@router.post("/rooms/{room_id}/messages", response_model=ChatMessage)
async def post_message(
    room_id: str,
    content: str = Body(..., embed=True),
    is_priority: bool = Body(False, embed=True),
    claims: dict = Depends(get_current_user_claims)
):
    return await send_chat_message(room_id, claims, content, is_priority)


@router.post("/rooms/{room_id}/summarize", response_model=ChatSummaryResponse)
async def summarize_chat(room_id: str, claims: dict = Depends(get_current_user_claims)):
    return await summarize_chat_room(room_id)
