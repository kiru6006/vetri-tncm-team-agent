from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class TalukSummary(BaseModel):
    code: str
    name_en: str
    name_ta: str
    score: float
    pending_grievances: int


class DistrictSummary(BaseModel):
    code: str
    name_en: str
    name_ta: str
    headquarters_en: str
    headquarters_ta: str
    zone: str
    latitude: float
    longitude: float
    population: int
    area_sq_km: float
    performance_score: float
    score_status: str # HEALTHY, ATTENTION, CRITICAL
    collector_name: str
    pending_grievances: int
    revenue_achievement_pct: float
    health_index: float
    law_and_order_index: float


class DistrictDetail(DistrictSummary):
    taluks: List[TalukSummary]
    key_telemetry: Dict[str, Any]
