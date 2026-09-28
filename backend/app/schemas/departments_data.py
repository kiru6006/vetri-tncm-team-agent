from typing import List, Dict, Any, Optional
from pydantic import BaseModel


# 1. Health Domain Models
class DrugStockItem(BaseModel):
    drug_code: str
    name_en: str
    name_ta: str
    category: str # Critical Emergency, Antibiotic, Maternal, Chronic
    stock_status: str # HEALTHY, LOW, CRITICAL_STOCKOUT
    stock_days_remaining: int
    buffer_warehouse_dist: str


class HospitalOccupancy(BaseModel):
    hospital_name: str
    district: str
    total_beds: int
    occupied_beds: int
    occupancy_pct: float
    icu_available: int
    oxygen_status: str # NORMAL, ATTENTION


class HealthDomainResponse(BaseModel):
    phc_attendance_rate: float
    mtm_beneficiaries_served_lakhs: float
    active_drug_stockouts_count: int
    epidemic_risk_level: str # LOW, MODERATE, ELEVATED
    critical_drugs: List[DrugStockItem]
    major_hospitals: List[HospitalOccupancy]
    outbreak_alerts: List[Dict[str, Any]]


# 2. Police & Safety Domain Models
class PoliceIncident(BaseModel):
    id: str
    station_name: str
    district: str
    category: str
    severity: str
    reported_time: str
    status: str
    brief_en: str
    brief_ta: str


class PoliceDomainResponse(BaseModel):
    state_crime_index: float
    highway_patrol_avg_response_mins: float
    cctv_uptime_pct: float
    pending_cases_over_90_days: int
    sensitive_zones_count: int
    daily_sitrep_summary_en: str
    daily_sitrep_summary_ta: str
    recent_incidents: List[PoliceIncident]
    response_speed_by_zone: List[Dict[str, Any]]


# 3. Water & Agriculture Domain Models
class ReservoirTelemetry(BaseModel):
    dam_name_en: str
    dam_name_ta: str
    district: str
    current_storage_tmc: float
    max_storage_tmc: float
    capacity_pct: float
    current_water_level_ft: float
    full_reservoir_level_ft: float
    inflow_cusecs: int
    outflow_cusecs: int
    status: str # COMFORTABLE, MODERATE, DEPLETED


class CropCultivationStatus(BaseModel):
    district: str
    crop: str
    target_acres: int
    achieved_acres: int
    progress_pct: float
    fertilizer_status: str


class WaterAgriDomainResponse(BaseModel):
    state_dam_storage_pct: float
    kuruvai_coverage_acres: int
    paddy_procured_metric_tonnes: int
    fertilizer_buffer_mt: int
    reservoirs: List[ReservoirTelemetry]
    crop_progress: List[CropCultivationStatus]


# 4. Fraud Detection & Audit Watchdog Models
class FraudAnomalyAlert(BaseModel):
    id: str
    scheme_or_tender: str
    department: str
    district: str
    anomaly_type: str # DUPLICATE_DBT, BID_COLLUSION, MB_INFLATION
    risk_score: float # 0.0 to 1.0
    flagged_amount_cr: float
    description_en: str
    description_ta: str
    entities_involved: List[str]
    suggested_action_en: str
    suggested_action_ta: str


class FraudAuditDomainResponse(BaseModel):
    total_audited_transactions_cr: float
    flagged_high_risk_amount_cr: float
    active_anomaly_cases: int
    prevented_leakage_cr: float
    alerts: List[FraudAnomalyAlert]
