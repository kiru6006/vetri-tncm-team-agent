from datetime import datetime, timezone
from typing import List, Dict, Any
from pydantic import BaseModel


class RevenueMonthData(BaseModel):
    month: str
    commercial_tax_cr: float
    stamp_duty_cr: float
    excise_cr: float
    target_total_cr: float
    actual_total_cr: float


class RevenueAnalyticsResponse(BaseModel):
    fiscal_year: str
    total_target_cr: float
    total_collected_cr: float
    overall_achievement_pct: float
    growth_yoy_pct: float
    monthly_data: List[RevenueMonthData]
    top_revenue_districts: List[Dict[str, Any]]
    leakage_alerts: List[Dict[str, Any]]


class GrievanceCategorySummary(BaseModel):
    category_en: str
    category_ta: str
    total_received: int
    resolved_count: int
    pending_count: int
    avg_resolution_days: float
    sla_compliance_pct: float


class GrievanceAnalyticsResponse(BaseModel):
    total_petitions: int
    resolved_petitions: int
    resolution_rate_pct: float
    pending_over_30_days: int
    avg_turnaround_days: float
    categories: List[GrievanceCategorySummary]
    top_performing_districts: List[str]
    critical_backlog_districts: List[str]


class StalledProject(BaseModel):
    id: str
    name_en: str
    name_ta: str
    department_en: str
    department_ta: str
    district_code: str
    district_name_en: str
    estimated_cost_cr: float
    spent_to_date_cr: float
    sanctioned_date: str
    scheduled_completion: str
    delay_days: int
    bottleneck_reason_en: str
    bottleneck_reason_ta: str
    contractor_name: str
    action_required_en: str
    action_required_ta: str
