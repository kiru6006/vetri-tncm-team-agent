from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_current_user_claims
from app.schemas.district import DistrictSummary, DistrictDetail, TalukSummary
from app.services.seed_data import TN_38_DISTRICTS

router = APIRouter(prefix="/districts", tags=["38 District Intelligence"])


@router.get("/", response_model=List[DistrictSummary])
async def list_districts(claims: dict = Depends(get_current_user_claims)):
    results = []
    for d in TN_38_DISTRICTS:
        score = d["score"]
        status_val = "HEALTHY" if score >= 88 else ("ATTENTION" if score >= 84 else "CRITICAL")
        results.append(
            DistrictSummary(
                code=d["code"],
                name_en=d["name_en"],
                name_ta=d["name_ta"],
                headquarters_en=d["hq_en"],
                headquarters_ta=d["hq_ta"],
                zone=d["zone"],
                latitude=float(d["lat"]),
                longitude=float(d["lng"]),
                population=d["pop"],
                area_sq_km=float(d["area"]),
                performance_score=float(score),
                score_status=status_val,
                collector_name=d["collector"],
                pending_grievances=14 if d["code"] != "TPR" else 42,
                revenue_achievement_pct=104.2 if d["code"] != "TPR" else 93.6,
                health_index=88.5 if d["code"] != "MDU" else 78.4,
                law_and_order_index=91.0 if d["code"] != "CUD" else 82.0
            )
        )
    return results


@router.get("/{district_code}", response_model=DistrictDetail)
async def get_district_detail(district_code: str, claims: dict = Depends(get_current_user_claims)):
    matched = next((d for d in TN_38_DISTRICTS if d["code"].upper() == district_code.upper()), None)
    if not matched:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="District not found")
    
    score = matched["score"]
    status_val = "HEALTHY" if score >= 88 else ("ATTENTION" if score >= 84 else "CRITICAL")

    # Sample taluks for the district
    taluks = [
        TalukSummary(code=f"{matched['code']}_T1", name_en=f"{matched['name_en']} North", name_ta=f"{matched['name_ta']} வடக்கு", score=score + 1.2, pending_grievances=4),
        TalukSummary(code=f"{matched['code']}_T2", name_en=f"{matched['name_en']} South", name_ta=f"{matched['name_ta']} தெற்கு", score=score - 0.8, pending_grievances=8),
        TalukSummary(code=f"{matched['code']}_T3", name_en=f"{matched['name_en']} Rural", name_ta=f"{matched['name_ta']} ஊரகம்", score=score - 2.1, pending_grievances=12),
    ]

    return DistrictDetail(
        code=matched["code"],
        name_en=matched["name_en"],
        name_ta=matched["name_ta"],
        headquarters_en=matched["hq_en"],
        headquarters_ta=matched["hq_ta"],
        zone=matched["zone"],
        latitude=float(matched["lat"]),
        longitude=float(matched["lng"]),
        population=matched["pop"],
        area_sq_km=float(matched["area"]),
        performance_score=float(score),
        score_status=status_val,
        collector_name=matched["collector"],
        pending_grievances=14 if matched["code"] != "TPR" else 42,
        revenue_achievement_pct=104.2 if matched["code"] != "TPR" else 93.6,
        health_index=88.5 if matched["code"] != "MDU" else 78.4,
        law_and_order_index=91.0 if matched["code"] != "CUD" else 82.0,
        taluks=taluks,
        key_telemetry={
            "drinking_water_mld": 18.5,
            "phc_doctor_attendance_pct": 98.2,
            "cctv_uptime_pct": 96.4,
            "pds_ration_stock_pct": 99.1
        }
    )
