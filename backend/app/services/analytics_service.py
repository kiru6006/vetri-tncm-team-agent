from typing import List, Dict, Any
from app.schemas.analytics import (
    RevenueAnalyticsResponse,
    RevenueMonthData,
    GrievanceAnalyticsResponse,
    GrievanceCategorySummary,
    StalledProject
)


async def get_revenue_analytics() -> RevenueAnalyticsResponse:
    monthly = [
        RevenueMonthData(month="Apr", commercial_tax_cr=11200.0, stamp_duty_cr=1650.0, excise_cr=1050.0, target_total_cr=13500.0, actual_total_cr=13900.0),
        RevenueMonthData(month="May", commercial_tax_cr=11450.0, stamp_duty_cr=1720.0, excise_cr=1080.0, target_total_cr=13800.0, actual_total_cr=14250.0),
        RevenueMonthData(month="Jun", commercial_tax_cr=11800.0, stamp_duty_cr=1810.0, excise_cr=1120.0, target_total_cr=14200.0, actual_total_cr=14730.0),
        RevenueMonthData(month="Jul", commercial_tax_cr=11600.0, stamp_duty_cr=1790.0, excise_cr=1100.0, target_total_cr=14400.0, actual_total_cr=14490.0),
        RevenueMonthData(month="Aug", commercial_tax_cr=11950.0, stamp_duty_cr=1880.0, excise_cr=1150.0, target_total_cr=14600.0, actual_total_cr=14980.0),
        RevenueMonthData(month="Sep", commercial_tax_cr=12200.0, stamp_duty_cr=1950.0, excise_cr=1180.0, target_total_cr=14800.0, actual_total_cr=15330.0),
    ]

    total_target = sum(m.target_total_cr for m in monthly)
    total_collected = sum(m.actual_total_cr for m in monthly)

    top_districts = [
        {"district": "Chennai", "code": "CHE", "collected_cr": 28450.0, "achievement_pct": 106.2},
        {"district": "Coimbatore", "code": "CBE", "collected_cr": 14200.0, "achievement_pct": 105.1},
        {"district": "Kanchipuram", "code": "KAN", "collected_cr": 8950.0, "achievement_pct": 103.8},
        {"district": "Chengalpattu", "code": "CGL", "collected_cr": 8420.0, "achievement_pct": 104.5},
        {"district": "Salem", "code": "SLM", "collected_cr": 6120.0, "achievement_pct": 101.4},
    ]

    leakages = [
        {
            "sector": "Textile Dyeing & Wet Processing",
            "district": "Tirupur (TPR)",
            "estimated_leakage_cr": 42.5,
            "anomaly_reason": "e-Way bill generation dropped 14% while industrial power drawl remained constant."
        },
        {
            "sector": "River Sand & Minor Minerals",
            "district": "Villupuram (VPM)",
            "estimated_leakage_cr": 18.2,
            "anomaly_reason": "Discrepancy between quarry weighbridge RFID logs and transit pass tax receipts."
        }
    ]

    return RevenueAnalyticsResponse(
        fiscal_year="2026-27 (H1)",
        total_target_cr=total_target,
        total_collected_cr=total_collected,
        overall_achievement_pct=round((total_collected / total_target) * 100, 2),
        growth_yoy_pct=11.4,
        monthly_data=monthly,
        top_revenue_districts=top_districts,
        leakage_alerts=leakages
    )


async def get_grievance_analytics() -> GrievanceAnalyticsResponse:
    categories = [
        GrievanceCategorySummary(
            category_en="Drinking Water & Sanitation",
            category_ta="குடிநீர் மற்றும் துப்புரவு",
            total_received=42150,
            resolved_count=40890,
            pending_count=1260,
            avg_resolution_days=4.2,
            sla_compliance_pct=97.0
        ),
        GrievanceCategorySummary(
            category_en="Revenue Land Patta Transfer",
            category_ta="வருவாய்த்துறை பட்டா மாறுதல்",
            total_received=38400,
            resolved_count=36100,
            pending_count=2300,
            avg_resolution_days=8.6,
            sla_compliance_pct=94.0
        ),
        GrievanceCategorySummary(
            category_en="PDS Ration Card Issues",
            category_ta="ரேஷன் கார்டு சேவைகள்",
            total_received=29800,
            resolved_count=29200,
            pending_count=600,
            avg_resolution_days=2.8,
            sla_compliance_pct=98.0
        ),
        GrievanceCategorySummary(
            category_en="TANGEDCO Electricity Connections",
            category_ta="மின் இணைப்பு சேவைகள்",
            total_received=21400,
            resolved_count=20330,
            pending_count=1070,
            avg_resolution_days=5.1,
            sla_compliance_pct=95.0
        ),
        GrievanceCategorySummary(
            category_en="Rural Roads & Bridges Repair",
            category_ta="ஊரக சாலைகள் பழுது",
            total_received=16500,
            resolved_count=14850,
            pending_count=1650,
            avg_resolution_days=14.2,
            sla_compliance_pct=90.0
        )
    ]

    total_r = sum(c.total_received for c in categories)
    total_res = sum(c.resolved_count for c in categories)

    return GrievanceAnalyticsResponse(
        total_petitions=total_r,
        resolved_petitions=total_res,
        resolution_rate_pct=round((total_res / total_r) * 100, 2),
        pending_over_30_days=184,
        avg_turnaround_days=6.2,
        categories=categories,
        top_performing_districts=["Kanniyakumari (99.1%)", "Nilgiris (98.6%)", "Coimbatore (98.2%)", "Chennai (97.8%)"],
        critical_backlog_districts=["Tirupur (89.2%)", "Cuddalore (90.4%)", "Kallakurichi (91.1%)"]
    )


async def get_stalled_projects() -> List[StalledProject]:
    return [
        StalledProject(
            id="proj-001",
            name_en="Coimbatore Western Ring Road (Phase II)",
            name_ta="கோவை மேற்கு புறவழிச்சாலை (இரண்டாம் கட்டம்)",
            department_en="Highways and Minor Ports",
            department_ta="நெடுஞ்சாலை மற்றும் சிறு துறைமுகங்கள்",
            district_code="CBE",
            district_name_en="Coimbatore",
            estimated_cost_cr=480.0,
            spent_to_date_cr=310.0,
            sanctioned_date="2023-04-10",
            scheduled_completion="2025-12-31",
            delay_days=180,
            bottleneck_reason_en="Land acquisition compensation dispute across 4.2 km stretch in Perur Taluk.",
            bottleneck_reason_ta="பேரூர் தாலுகாவில் 4.2 கிமீ நில எடுப்பு இழப்பீட்டு விவகாரம் நிலுவையில் உள்ளது.",
            contractor_name="Larsen & Toubro Ltd / TN Infra Consortium",
            action_required_en="District Collector to convene special tripartite mediation on Friday with DRO.",
            action_required_ta="மாவட்ட ஆட்சியர் வெள்ளிக்கிழமை சிறப்பு முத்தரப்பு பேச்சுவார்த்தை நடத்த வேண்டும்."
        ),
        StalledProject(
            id="proj-002",
            name_en="SIPCOT Industrial Park Common Effluent Treatment Plant",
            name_ta="சிப்காட் தொழில் பூங்கா பொது கழிவுநீர் சுத்திகரிப்பு நிலையம்",
            department_en="Industries, Investment Promotion and Commerce",
            department_ta="தொழில்துறை மற்றும் முதலீட்டு மேம்பாடு",
            district_code="RPN",
            district_name_en="Ranipet",
            estimated_cost_cr=125.0,
            spent_to_date_cr=85.0,
            sanctioned_date="2023-08-15",
            scheduled_completion="2026-03-31",
            delay_days=120,
            bottleneck_reason_en="TNPCB environmental clearance clearance pending for zero-liquid discharge membrane unit.",
            bottleneck_reason_ta="மாசு கட்டுப்பாட்டு வாரிய சுற்றுச்சூழல் அனுமதி நிலுவையில் உள்ளது.",
            contractor_name="Thermax Water Technologies",
            action_required_en="Environment Secretary to grant expedited fast-track conditional clearance.",
            action_required_ta="சுற்றுச்சூழல் துறை செயலாளர் விரைவான நிபந்தனை அனுமதி வழங்க வேண்டும்."
        ),
        StalledProject(
            id="proj-003",
            name_en="Madurai AIIMS Peripheral 4-Lane Dedicated Approach Corridor",
            name_ta="மதுரை எய்ம்ஸ் 4 வழி அணுகு சாலை திட்டம்",
            department_en="Public Works Department (Buildings)",
            department_ta="பொதுப்பணித்துறை",
            district_code="MDU",
            district_name_en="Madurai",
            estimated_cost_cr=195.0,
            spent_to_date_cr=120.0,
            sanctioned_date="2023-01-20",
            scheduled_completion="2026-01-15",
            delay_days=95,
            bottleneck_reason_en="Railway overbridge (ROB) structural design approval pending with Southern Railway.",
            bottleneck_reason_ta="தெற்கு ரயில்வேயிடம் ரயில்வே மேம்பால வடிவமைப்பு ஒப்புதல் நிலுவை.",
            contractor_name="KNR Constructions Ltd",
            action_required_en="Chief Secretary to send urgent DO letter to General Manager, Southern Railway.",
            action_required_ta="தலைமைச் செயலாளர் தெற்கு ரயில்வே பொது மேலாளருக்கு அவசர கடிதம் அனுப்ப வேண்டும்."
        )
    ]
