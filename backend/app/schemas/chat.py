from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class ChatMember(BaseModel):
    officer_id: str
    name_en: str
    name_ta: str
    designation: str
    tier_role: str
    is_online: bool = False


class ChatMessage(BaseModel):
    id: str
    room_id: str
    sender_id: str
    sender_name_en: str
    sender_name_ta: str
    sender_designation: str
    sender_role: str
    content_en: str
    content_ta: str
    message_type: str = "TEXT"  # TEXT, FILE, VOICE_NOTE, APPROVAL_REQUEST, TASK_ASSIGNED
    attachment_url: Optional[str] = None
    attachment_name: Optional[str] = None
    is_pinned: bool = False
    is_priority: bool = False
    timestamp: str


class ChatRoom(BaseModel):
    id: str
    name_en: str
    name_ta: str
    room_type: str  # CABINET, ALL_COLLECTORS, DEPARTMENT, DISTRICT_DISASTER, DIRECT
    department_code: Optional[str] = None
    district_code: Optional[str] = None
    unread_count: int = 0
    last_message_snippet: str
    last_message_time: str
    members_count: int
    is_encrypted: bool = True


class ChatSummaryResponse(BaseModel):
    room_id: str
    room_name: str
    total_messages_analyzed: int
    summary_en: str
    summary_ta: str
    key_decisions: List[str]
    derived_action_items: List[Dict[str, Any]]
