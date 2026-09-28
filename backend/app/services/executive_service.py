from datetime import datetime, timezone
from typing import List, Dict, Any
from app.schemas.executive import StateScoreResponse, DimensionScore, PriorityAlert, FlagshipSchemeSummary
from app.services.seed_data import TN_38_DISTRICTS, FLAGSHIP_SCHEMES, PRIORITY_ALERTS_FEED


async def get_state_scorecard() -> StateScoreResponse:
    # Calculate state score from the average of 38 districts
    avg_score = round(sum(d["score"] for d in TN_38_DISTRICTS) / len(TN_38_DISTRICTS), 1)

    dimensions = {
        "economic_health": DimensionScore(
            score=91.4,
            status="EXCELLENT",
            metric_summary_en="Commercial Tax & Registration revenue running at 104.2% of target.",
            metric_summary_ta="வணிக வரி மற்றும் பதிவுத்துறை வருவாய் இலக்கில் 104.2% எட்டியுள்ளது."
        ),
        "public_health": DimensionScore(
            score=87.2,
            status="GOOD",
            metric_summary_en="98.5% Primary Health Center attendance. Drug stockout rate at 1.8%.",
            metric_summary_ta="ஆரம்ப சுகாதார நிலையங்களில் 98.5% வருகை பதிவு. மருந்து பற்றாக்குறை 1.8% மட்டுமே."
        ),
        "law_and_order": DimensionScore(
            score=89.0,
            status="EXCELLENT",
            metric_summary_en="Crime index within control limits. High-speed highway patrol response 8.4 mins.",
            metric_summary_ta="சட்டம் ஒழுங்கு சீராக உள்ளது. நெடுஞ்சாலை ரோந்து அவசர உதவி நேரம் 8.4 நிமிடங்கள்."
        ),
        "scheme_delivery": DimensionScore(
            score=97.5,
            status="EXCELLENT",
            metric_summary_en="Flagship direct benefit transfers (KMUT & Breakfast) at 99.8% saturation.",
            metric_summary_ta="மகளிர் உரிமை மற்றும் காலை உணவுத் திட்டம் 99.8% பயனாளிகளை சென்றடைந்துள்ளது."
        ),
        "water_and_agriculture": DimensionScore(
            score=84.8,
            status="ATTENTION",
            metric_summary_en="Mettur Dam storage at 68.4 ft. Kuruvai harvest 85% completed in Delta.",
            metric_summary_ta="மேட்டூர் அணை நீர் இருப்பு 68.4 அடி. டெல்டா பகுதியில் 85% குறுவை அறுவடை நிறைவு."
        )
    }

    return StateScoreResponse(
        state_score=avg_score,
        delta_last_week="+0.8",
        recorded_at=datetime.now(timezone.utc),
        dimensions=dimensions
    )


async def get_priority_alerts() -> List[PriorityAlert]:
    alerts = []
    for item in PRIORITY_ALERTS_FEED:
        alerts.append(
            PriorityAlert(
                id=item["id"],
                district_code=item["district_code"],
                district_name_en=item["district_name_en"],
                district_name_ta=item["district_name_ta"],
                title_en=item["title_en"],
                title_ta=item["title_ta"],
                description_en=item["description_en"],
                description_ta=item["description_ta"],
                severity=item["severity"],
                domain=item["domain"],
                action_recommended_en=item["action_recommended_en"],
                action_recommended_ta=item["action_recommended_ta"],
                timestamp=datetime.now(timezone.utc)
            )
        )
    return alerts


async def get_flagship_schemes() -> List[FlagshipSchemeSummary]:
    schemes = []
    for s in FLAGSHIP_SCHEMES:
        schemes.append(
            FlagshipSchemeSummary(
                code=s["code"],
                name_en=s["name_en"],
                name_ta=s["name_ta"],
                budget_cr=s["budget_cr"],
                beneficiaries_count=s["active"],
                saturation_percent=s["disbursement_pct"],
                status=s["status"]
            )
        )
    return schemes
