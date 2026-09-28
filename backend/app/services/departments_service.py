from typing import List, Dict, Any
from app.schemas.departments_data import (
    HealthDomainResponse,
    DrugStockItem,
    HospitalOccupancy,
    PoliceDomainResponse,
    PoliceIncident,
    WaterAgriDomainResponse,
    ReservoirTelemetry,
    CropCultivationStatus,
    FraudAuditDomainResponse,
    FraudAnomalyAlert,
)


async def get_health_domain_data() -> HealthDomainResponse:
    drugs = [
        DrugStockItem(
            drug_code="DRUG-014",
            name_en="Anti-D Immunoglobulin Injection (300 mcg)",
            name_ta="ஆன்டி-டி இம்யூனோகுளோபுலின் ஊசி",
            category="Maternal & Obstetric Emergency",
            stock_status="CRITICAL_STOCKOUT",
            stock_days_remaining=4,
            buffer_warehouse_dist="Madurai (GRH)",
        ),
        DrugStockItem(
            drug_code="DRUG-082",
            name_en="Injection Oxytocin (10 IU)",
            name_ta="ஆக்சிடோசின் ஊசி",
            category="Maternal Health",
            stock_status="HEALTHY",
            stock_days_remaining=45,
            buffer_warehouse_dist="Chennai Central Warehouse",
        ),
        DrugStockItem(
            drug_code="DRUG-105",
            name_en="Oral Rehydration Salts (ORS Sachets)",
            name_ta="உயிர் காக்கும் உப்பு கரைசல் பாக்கெட்டுகள்",
            category="Epidemic Care",
            stock_status="HEALTHY",
            stock_days_remaining=60,
            buffer_warehouse_dist="Tiruchirappalli Depot",
        ),
        DrugStockItem(
            drug_code="DRUG-201",
            name_en="Metformin Hydrochloride (500 mg)",
            name_ta="மெட்பார்மின் மாத்திரைகள்",
            category="Chronic (Makkalai Thedi Maruthuvam)",
            stock_status="HEALTHY",
            stock_days_remaining=52,
            buffer_warehouse_dist="Coimbatore Depot",
        ),
    ]

    hospitals = [
        HospitalOccupancy(
            hospital_name="Rajiv Gandhi Govt General Hospital (RGGGH)",
            district="Chennai",
            total_beds=2850,
            occupied_beds=2480,
            occupancy_pct=87.0,
            icu_available=42,
            oxygen_status="NORMAL",
        ),
        HospitalOccupancy(
            hospital_name="Govt Rajaji Hospital (GRH)",
            district="Madurai",
            total_beds=2400,
            occupied_beds=2190,
            occupancy_pct=91.2,
            icu_available=18,
            oxygen_status="NORMAL",
        ),
        HospitalOccupancy(
            hospital_name="Coimbatore Medical College Hospital (CMCH)",
            district="Coimbatore",
            total_beds=1800,
            occupied_beds=1530,
            occupancy_pct=85.0,
            icu_available=28,
            oxygen_status="NORMAL",
        ),
    ]

    outbreaks = [
        {
            "disease": "Dengue Fever Cluster",
            "district": "Tiruvallur (Poonamallee Block)",
            "cases_active": 34,
            "trend": "STABLE",
            "filaria_fogging_teams_deployed": 12,
        },
        {
            "disease": "Seasonal Viral Pyrexia",
            "district": "Cuddalore (Chidambaram Block)",
            "cases_active": 48,
            "trend": "WATCHLIST",
            "filaria_fogging_teams_deployed": 8,
        },
    ]

    return HealthDomainResponse(
        phc_attendance_rate=98.5,
        mtm_beneficiaries_served_lakhs=104.5,
        active_drug_stockouts_count=1,
        epidemic_risk_level="LOW",
        critical_drugs=drugs,
        major_hospitals=hospitals,
        outbreak_alerts=outbreaks,
    )


async def get_police_domain_data() -> PoliceDomainResponse:
    incidents = [
        PoliceIncident(
            id="inc-901",
            station_name="Kangeyam PS",
            district="Tirupur",
            category="Industrial Labor Dispute",
            severity="MEDIUM",
            reported_time="2 hours ago",
            status="UNDER_CONTROL",
            brief_en="Dyeing factory workers union demonstration resolved through peaceful RDO conciliation.",
            brief_ta="சாயப்பட்டறை தொழிலாளர் போராட்டம் அமைதியாக சமரச பேச்சுவார்த்தை மூலம் தீர்க்கப்பட்டது.",
        ),
        PoliceIncident(
            id="inc-902",
            station_name="Flower Bazaar PS",
            district="Chennai",
            category="Commercial Fire Safety",
            severity="LOW",
            reported_time="4 hours ago",
            status="RESOLVED",
            brief_en="Minor electrical panel spark safely contained by Fire & Rescue Services.",
            brief_ta="மின்சார கசிவு தீயணைப்புத்துறையினரால் விரைவாக அணைக்கப்பட்டது.",
        ),
    ]

    speeds = [
        {"zone": "Chennai Metro", "avg_response_mins": 6.8, "patrol_units": 180},
        {"zone": "West Zone (CBE/TPR/SLM)", "avg_response_mins": 7.4, "patrol_units": 140},
        {"zone": "South Zone (MDU/TNV/TUT)", "avg_response_mins": 8.6, "patrol_units": 165},
        {"zone": "Central Zone (TRZ/TNJ)", "avg_response_mins": 8.1, "patrol_units": 110},
    ]

    return PoliceDomainResponse(
        state_crime_index=12.4,
        highway_patrol_avg_response_mins=7.8,
        cctv_uptime_pct=96.4,
        pending_cases_over_90_days=1420,
        sensitive_zones_count=48,
        daily_sitrep_summary_en="Law & order across Tamil Nadu remains peaceful and fully secured. Zero communal incidents reported state-wide in the past 24 hours.",
        daily_sitrep_summary_ta="தமிழகம் முழுவதும் சட்டம் ஒழுங்கு சீராக உள்ளது. கடந்த 24 மணி நேரத்தில் எந்தவொரு அசம்பாவிதமும் இன்றி அமைதி நிலவுகிறது.",
        recent_incidents=incidents,
        response_speed_by_zone=speeds,
    )


async def get_water_agri_domain_data() -> WaterAgriDomainResponse:
    dams = [
        ReservoirTelemetry(
            dam_name_en="Mettur (Stanley Reservoir)",
            dam_name_ta="மேட்டூர் அணை (ஸ்டான்லி நீர்த்தேக்கம்)",
            district="Salem",
            current_storage_tmc=31.2,
            max_storage_tmc=93.4,
            capacity_pct=33.4,
            current_water_level_ft=68.4,
            full_reservoir_level_ft=120.0,
            inflow_cusecs=12450,
            outflow_cusecs=10000,
            status="COMFORTABLE",
        ),
        ReservoirTelemetry(
            dam_name_en="Bhavanisagar Dam",
            dam_name_ta="பவானிசாகர் அணை",
            district="Erode",
            current_storage_tmc=18.4,
            max_storage_tmc=32.8,
            capacity_pct=56.1,
            current_water_level_ft=82.1,
            full_reservoir_level_ft=105.0,
            inflow_cusecs=2100,
            outflow_cusecs=1800,
            status="COMFORTABLE",
        ),
        ReservoirTelemetry(
            dam_name_en="Vaigai Dam",
            dam_name_ta="வைகை அணை",
            district="Theni",
            current_storage_tmc=2.8,
            max_storage_tmc=6.1,
            capacity_pct=45.9,
            current_water_level_ft=54.2,
            full_reservoir_level_ft=71.0,
            inflow_cusecs=850,
            outflow_cusecs=600,
            status="MODERATE",
        ),
        ReservoirTelemetry(
            dam_name_en="Amaravathi Dam",
            dam_name_ta="அமராவதி அணை",
            district="Tirupur",
            current_storage_tmc=2.1,
            max_storage_tmc=4.0,
            capacity_pct=52.5,
            current_water_level_ft=64.0,
            full_reservoir_level_ft=90.0,
            inflow_cusecs=450,
            outflow_cusecs=400,
            status="COMFORTABLE",
        ),
    ]

    crops = [
        CropCultivationStatus(
            district="Thanjavur",
            crop="Kuruvai Paddy",
            target_acres=145000,
            achieved_acres=142000,
            progress_pct=97.9,
            fertilizer_status="ADEQUATE",
        ),
        CropCultivationStatus(
            district="Tiruvarur",
            crop="Kuruvai Paddy",
            target_acres=120000,
            achieved_acres=116500,
            progress_pct=97.1,
            fertilizer_status="DAP_BUFFER_LOW_12%",
        ),
        CropCultivationStatus(
            district="Nagapattinam",
            crop="Kuruvai Paddy",
            target_acres=75000,
            achieved_acres=71800,
            progress_pct=95.7,
            fertilizer_status="ADEQUATE",
        ),
    ]

    return WaterAgriDomainResponse(
        state_dam_storage_pct=48.2,
        kuruvai_coverage_acres=385000,
        paddy_procured_metric_tonnes=1850000,
        fertilizer_buffer_mt=45000,
        reservoirs=dams,
        crop_progress=crops,
    )


async def get_fraud_audit_domain_data() -> FraudAuditDomainResponse:
    alerts = [
        FraudAnomalyAlert(
            id="fraud-001",
            scheme_or_tender="Rural Housing Scheme (Kalaignar Kanavu Illam)",
            department="Rural Development and Panchayat Raj",
            district="Villupuram (VPM)",
            anomaly_type="DUPLICATE_DBT",
            risk_score=0.92,
            flagged_amount_cr=2.4,
            description_en="14 duplicate beneficiary bank accounts flagged with identical Aadhaar hashing and IFSC nodes across 3 panchayats.",
            description_ta="3 ஊராட்சிகளில் ஒரே ஆதார் மற்றும் வங்கி கணக்கு எண் கொண்ட 14 போலி பயனாளிகள் கண்டறியப்பட்டுள்ளனர்.",
            entities_involved=["VPM_Panchayat_Block_9", "Canara_Bank_Node_48"],
            suggested_action_en="Freeze DBT payment dispatches and order physical biometric reverification by BDO.",
            suggested_action_ta="பரிவர்த்தனையை நிறுத்தி வைத்து, வட்டார வளர்ச்சி அலுவலர் மூலம் நேரடி சரிபார்ப்பு நடத்தவும்.",
        ),
        FraudAnomalyAlert(
            id="fraud-002",
            scheme_or_tender="State Highway Bridge Construction Tender",
            department="Highways Department",
            district="Salem (SLM)",
            anomaly_type="BID_COLLUSION",
            risk_score=0.88,
            flagged_amount_cr=14.5,
            description_en="3 bidding contractor companies submitted tenders from the exact same corporate IP address within 8 minutes.",
            description_ta="3 ஒப்பந்த நிறுவனங்கள் ஒரே இணையதள ஐபி முகவரியிலிருந்து 8 நிமிட இடைவெளியில் டெண்டர் சமர்ப்பித்துள்ளன.",
            entities_involved=["Apex Infra TN Pvt Ltd", "Kaveri Earthmovers", "Salem Precast Works"],
            suggested_action_en="Cancel tender round and initiate Directorate of Vigilance and Anti-Corruption (DVAC) inquiry.",
            suggested_action_ta="டெண்டரை ரத்து செய்து லஞ்ச ஒழிப்புத்துறை விசாரணைக்கு உத்தரவிடவும்.",
        ),
    ]

    return FraudAuditDomainResponse(
        total_audited_transactions_cr=24500.0,
        flagged_high_risk_amount_cr=16.9,
        active_anomaly_cases=2,
        prevented_leakage_cr=48.2,
        alerts=alerts,
    )
