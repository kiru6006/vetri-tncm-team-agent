from typing import Dict, List, Optional
from pydantic import BaseModel
from datetime import datetime


class DimensionScore(BaseModel):
    score: float
    status: str # EXCELLENT, GOOD, ATTENTION, CRITICAL
    metric_summary_en: str
    metric_summary_ta: str


class StateScoreResponse(BaseModel):
    state_score: float
    delta_last_week: str
    recorded_at: datetime
    dimensions: Dict[str, DimensionScore]


class PriorityAlert(BaseModel):
    id: str
    district_code: str
    district_name_en: str
    district_name_ta: str
    title_en: str
    title_ta: str
    description_en: str
    description_ta: str
    severity: str # CRITICAL, WARNING, INFO
    domain: str
    action_recommended_en: str
    action_recommended_ta: str
    timestamp: datetime


class FlagshipSchemeSummary(BaseModel):
    code: str
    name_en: str
    name_ta: str
    budget_cr: float
    beneficiaries_count: int
    saturation_percent: float
    status: str
