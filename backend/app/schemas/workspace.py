from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class MorningBriefingPriority(BaseModel):
    id: str
    title_en: str
    title_ta: str
    severity: str  # CRITICAL, HIGH, MEDIUM
    department: str
    district: Optional[str] = None
    metric_signal: str
    recommended_decision_en: str
    recommended_decision_ta: str
    responsible_officer: str


class WeatherDisasterAlert(BaseModel):
    region_en: str
    region_ta: str
    alert_level: str  # RED, ORANGE, YELLOW, GREEN
    description_en: str
    description_ta: str
    preparedness_status: str


class CitizenSentimentSummary(BaseModel):
    sentiment_score_pct: float  # e.g., 78.5% positive
    trending_topics: List[Dict[str, Any]]
    grievance_velocity: str


class ExecutiveBriefingResponse(BaseModel):
    greeting_en: str
    greeting_ta: str
    user_role: str
    briefing_date: str
    state_score: float
    revenue_achievement_pct: float
    budget_spend_pct: float
    top_priorities: List[MorningBriefingPriority]
    weather_alerts: List[WeatherDisasterAlert]
    citizen_sentiment: CitizenSentimentSummary
    pending_approvals_count: int
    scheduled_meetings_today: int
    cabinet_agenda_highlights: List[str]
    recent_gos_count: int
    ai_strategic_advice_en: str
    ai_strategic_advice_ta: str


class ActionItemTriage(BaseModel):
    id: str
    category: str  # APPROVAL, DELAYED_PROJECT, CITIZEN_GRIEVANCE, COLLECTOR_REVIEW, REVENUE_LEAKAGE, COURT_CASE
    priority: str  # CRITICAL, HIGH, MEDIUM
    title_en: str
    title_ta: str
    department: str
    financial_impact_cr: Optional[float] = 0.0
    delay_days: Optional[int] = 0
    bottleneck_en: str
    bottleneck_ta: str
    responsible_officer: str
    deadline: str
    ai_recommended_action_en: str
    ai_recommended_action_ta: str


class MyActionsTodayResponse(BaseModel):
    user_role: str
    total_actions_pending: int
    approvals_awaiting_decision_count: int
    delayed_projects_count: int
    escalated_grievances_count: int
    court_cases_deadline_count: int
    actions: List[ActionItemTriage]
