from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class MeetingAttendee(BaseModel):
    officer_id: str
    name_en: str
    name_ta: str
    designation: str
    tier_role: str
    status: str = "CONFIRMED"  # CONFIRMED, INVITED, DECLINED


class MeetingActionItem(BaseModel):
    id: str
    meeting_id: str
    task_en: str
    task_ta: str
    responsible_officer_name: str
    responsible_officer_designation: str
    deadline: str
    status: str = "PENDING"  # PENDING, IN_PROGRESS, COMPLETED, OVERDUE
    escalation_tier: Optional[str] = None


class MeetingBriefingPack(BaseModel):
    meeting_id: str
    title_en: str
    title_ta: str
    meeting_type: str  # CABINET, COLLECTOR_REVIEW, DEPARTMENT_REVIEW, CRISIS_MANAGEMENT
    scheduled_time: str
    chairperson_name: str
    chairperson_designation: str
    attendees: List[MeetingAttendee]
    agenda_items: List[str]
    ai_pre_briefing_en: str
    ai_pre_briefing_ta: str
    key_risks_flagged: List[str]
    historical_decisions: List[str]
    suggested_decision_options: List[Dict[str, Any]]
    auto_generated_minutes_en: Optional[str] = None
    auto_generated_minutes_ta: Optional[str] = None
    action_items: List[MeetingActionItem] = []


class MeetingCreateRequest(BaseModel):
    title_en: str
    title_ta: str
    meeting_type: str
    scheduled_time: str
    agenda_items: List[str]
    suggested_departments: List[str] = []
