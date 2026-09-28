from datetime import datetime, timezone
from typing import Dict, Any, List
from app.schemas.workspace import (
    ExecutiveBriefingResponse,
    MorningBriefingPriority,
    WeatherDisasterAlert,
    CitizenSentimentSummary,
    MyActionsTodayResponse,
    ActionItemTriage
)


async def generate_executive_briefing(user_claims: Dict[str, Any]) -> ExecutiveBriefingResponse:
    role = user_claims.get("role", "CHIEF_MINISTER") if user_claims else "CHIEF_MINISTER"
    user_name = user_claims.get("name_en", "Hon'ble Chief Minister") if user_claims else "Hon'ble Chief Minister"

    # Role-specific tailored briefings
    if role == "CHIEF_MINISTER":
        greeting_en = f"Good Morning, {user_name}"
        greeting_ta = "காலை வணக்கம், மாண்புமிகு முதலமைச்சர் அவர்களுக்கு"
        advice_en = "Focus today's Cabinet agenda on SIPCOT semiconductor allotment and monitor Mettur dam discharge for Kuruvai delta irrigation."
        advice_ta = "இன்றைய அமைச்சரவைக் கூட்டத்தில் சிப்காட் குறைக்கடத்தி நில ஒதுக்கீடு மற்றும் டெல்டா பாசனத்திற்கான மேட்டூர் அணை நீர் திறப்பை முதன்மையாகக் கண்காணிக்கவும்."
        priorities = [
            MorningBriefingPriority(
                id="prio-cm-1",
                title_en="Cauvery Delta Kuruvai Water Release & Fertilizer Stock",
                title_ta="காவிரி டெல்டா குறுவை பாசன நீர் திறப்பு மற்றும் உர இருப்பு",
                severity="CRITICAL",
                department="Water Resources & Agriculture",
                district="Thanjavur, Tiruvarur, Nagapattinam",
                metric_signal="Mettur Inflow 18,400 cusecs; DAP deficit in Tiruvarur by 12%",
                recommended_decision_en="Authorize special release of 15,000 cusecs and mandate TANFED emergency dispatch of 450 MT DAP fertilizer.",
                recommended_decision_ta="15,000 கனஅடி நீர் திறப்பு மற்றும் 450 மெட்ரிக் டன் டிஏபி உரத்தை அவசரமாக அனுப்ப உத்தரவிடவும்.",
                responsible_officer="Principal Secretary, Water Resources & Collectors (Delta)"
            ),
            MorningBriefingPriority(
                id="prio-cm-2",
                title_en="Cabinet Approval: Global EV & Semiconductor Subsidy Sanctions",
                title_ta="அமைச்சரவை ஒப்புதல்: சர்வதேச மின்வாகனம் மற்றும் குறைக்கடத்தி மானிய அனுமதி",
                severity="HIGH",
                department="Industries, Investment Promotion & Commerce",
                district="Hosur (Krishnagiri), Sriperumbudur (Kanchipuram)",
                metric_signal="3 Mega Investment proposals totaling ₹4,800 Cr with 14,200 direct jobs",
                recommended_decision_en="Review and sanction Special Incentive Package for Phase 2 Semiconductor Fab line.",
                recommended_decision_ta="இரண்டாம் கட்ட குறைக்கடத்தி தொழிற்சாலைக்கான சிறப்பு ஊக்கத்தொகை தொகுப்பிற்கு ஒப்புதல் அளிக்கவும்.",
                responsible_officer="Principal Secretary, Industries (SIPCOT MD)"
            ),
            MorningBriefingPriority(
                id="prio-cm-3",
                title_en="Commercial Tax Monthly Revenue Target Reconciliation",
                title_ta="வணிக வரி மாதாந்திர வருவாய் இலக்கு மறுசீராய்வு",
                severity="MEDIUM",
                department="Commercial Taxes & Registration",
                district="State-wide",
                metric_signal="GST collections at 104.2% of target, but 3 circles show 8% dip",
                recommended_decision_en="Direct Enforcement wing to audit e-way bill compliance in non-filing circles.",
                recommended_decision_ta="வரி செலுத்தாத வட்டங்களில் மின்-வழி ரசீது இணக்கத்தை தணிக்கை செய்ய அமலாக்கப் பிரிவுக்கு உத்தரவிடவும்.",
                responsible_officer="Commissioner of Commercial Taxes"
            )
        ]
    elif role == "DISTRICT_COLLECTOR":
        district = user_claims.get("assigned_district", "CBE") if user_claims else "CBE"
        greeting_en = f"Good Morning, District Collector ({district})"
        greeting_ta = f"காலை வணக்கம், மாவட்ட ஆட்சித்தலைவர் ({district})"
        advice_en = f"Prioritize Monday grievance petitions resolution and inspect stalled rural drinking water schemes in Southern taluks."
        advice_ta = f"மக்கள் குறைதீர்க்கும் நாள் மனுக்களுக்கு முன்னுரிமை அளித்து தீர்வு காணவும் மற்றும் தெற்கு தாலுகாக்களில் குடிநீர் திட்டங்களை ஆய்வு செய்யவும்."
        priorities = [
            MorningBriefingPriority(
                id="prio-col-1",
                title_en="Monday Grievance Redressal Day Petition Clearance",
                title_ta="மக்கள் குறைதீர்க்கும் நாள் மனுக்கள் தீர்வு",
                severity="HIGH",
                department="Revenue & Disaster Management",
                district=district,
                metric_signal="142 petitions pending over 30 days across 3 taluk offices",
                recommended_decision_en="Conduct spot review with Tahsildars and set 48-hour compliance mandate.",
                recommended_decision_ta="வட்டாட்சியர்களுடன் உடனடி ஆய்வு நடத்தி 48 மணி நேரத்திற்குள் தீர்வு காண உத்தரவிடவும்.",
                responsible_officer="District Revenue Officer (DRO)"
            )
        ]
    else:
        greeting_en = f"Good Morning, Officer"
        greeting_ta = "காலை வணக்கம், அரசு அலுவலர்"
        advice_en = "Review pending approvals and file dispatches scheduled for today's review."
        advice_ta = "இன்றைய ஆய்வுக்கு திட்டமிடப்பட்ட நிலுவையில் உள்ள கோப்புகள் மற்றும் ஒப்புதல்களை மதிப்பாய்வு செய்யவும்."
        priorities = [
            MorningBriefingPriority(
                id="prio-gen-1",
                title_en="Departmental Pending Files Clearance Drive",
                title_ta="துறை ரீதியான நிலுவை கோப்புகள் தீர்வு இயக்கம்",
                severity="MEDIUM",
                department="General Administration",
                district="State-wide",
                metric_signal="24 files approaching SLA threshold",
                recommended_decision_en="Clear Section notes with digital signature before 17:00 hrs.",
                recommended_decision_ta="மாலை 5 மணிக்குள் டிஜிட்டல் கையொப்பத்துடன் குறிப்புகளை முடிக்கவும்.",
                responsible_officer="Section Officer"
            )
        ]

    weather_alerts = [
        WeatherDisasterAlert(
            region_en="Coastal Tamil Nadu (Cuddalore, Nagapattinam, Mayiladuthurai)",
            region_ta="கடலோர தமிழகம் (கடலூர், நாகப்பட்டினம், மயிலாடுதுறை)",
            alert_level="ORANGE",
            description_en="IMD forecast: Heavy to very heavy rainfall expected in next 36 hours. Wind speed 45-55 kmph.",
            description_ta="வானிலை மையம்: அடுத்த 36 மணி நேரத்தில் மிக பலத்த மழை வாய்ப்பு. காற்றின் வேகம் 45-55 கி.மீ.",
            preparedness_status="4 SDRF Battalions stationed; 120 Multi-purpose Cyclone Relief Shelters operationalized."
        ),
        WeatherDisasterAlert(
            region_en="Western Ghats (Nilgiris, Coimbatore Ghats)",
            region_ta="மேற்கு தொடர்ச்சி மலை (நீலகிரி, கோவை மலைப்பகுதிகள்)",
            alert_level="YELLOW",
            description_en="Moderate rainfall with minor landslide vulnerability on Mettupalayam-Coonoor Ghat road.",
            description_ta="மேட்டுப்பாளையம்-குன்னூர் மலைப்பாதையில் லேசான மண் சரிவு அபாயம்.",
            preparedness_status="Highways earthmovers stationed at 6 vulnerable hairpin bends."
        )
    ]

    citizen_sentiment = CitizenSentimentSummary(
        sentiment_score_pct=81.4,
        trending_topics=[
            {"topic": "Kalaignar Magalir Urimai Thittam (KMUT)", "sentiment": "94% Positive", "mentions": "14.2k"},
            {"topic": "Chief Minister's Breakfast Scheme Expansion", "sentiment": "98% Positive", "mentions": "9.8k"},
            {"topic": "Delta Kuruvai Irrigation Release", "sentiment": "76% Positive", "mentions": "6.1k"},
            {"topic": "Chennai Metro Phase 2 Road Diversions", "sentiment": "62% Neutral/Concern", "mentions": "4.5k"}
        ],
        grievance_velocity="92.4% on-time resolution rate across 38 districts"
    )

    return ExecutiveBriefingResponse(
        greeting_en=greeting_en,
        greeting_ta=greeting_ta,
        user_role=role,
        briefing_date=datetime.now(timezone.utc).strftime("%A, %d %B %Y"),
        state_score=88.4,
        revenue_achievement_pct=104.2,
        budget_spend_pct=72.8,
        top_priorities=priorities,
        weather_alerts=weather_alerts,
        citizen_sentiment=citizen_sentiment,
        pending_approvals_count=7,
        scheduled_meetings_today=3,
        cabinet_agenda_highlights=[
            "SIPCOT Semiconductor Park Special Incentive Package",
            "Monsoon Disaster Mitigation Infrastructure Sanction (₹620 Cr)",
            "Tamil Nadu Global Startup Mission Expansion Phase"
        ],
        recent_gos_count=14,
        ai_strategic_advice_en=advice_en,
        ai_strategic_advice_ta=advice_ta
    )


async def generate_my_actions_today(user_claims: Dict[str, Any]) -> MyActionsTodayResponse:
    role = user_claims.get("role", "CHIEF_MINISTER") if user_claims else "CHIEF_MINISTER"

    actions = [
        ActionItemTriage(
            id="act-appr-01",
            category="APPROVAL",
            priority="CRITICAL",
            title_en="Sanction of Phase 2 Chennai Stormwater Drainage Network (Kosasthalaiyar Basin)",
            title_ta="சென்னையின் இரண்டாம் கட்ட மழைநீர் வடிகால் கட்டமைப்பு அனுமதி (கொசஸ்தலையாறு வடிநிலம்)",
            department="Municipal Administration & Water Supply",
            financial_impact_cr=412.50,
            delay_days=0,
            bottleneck_en="Awaiting final executive financial concurrence before monsoon commencement.",
            bottleneck_ta="பருவமழை தொடங்குவதற்கு முன் நிதித்துறையின் இறுதி ஒப்புதலுக்காக காத்திருக்கிறது.",
            responsible_officer="Principal Secretary, MAWS",
            deadline="Today, 14:00 hrs",
            ai_recommended_action_en="Authorize sanction with condition that work in 6 flood-prone wards completes by Oct 15.",
            ai_recommended_action_ta="அக்டோபர் 15-க்குள் 6 முக்கிய வார்டுகளில் பணிகளை முடிக்க வேண்டும் என்ற நிபந்தனையுடன் ஒப்புதல் வழங்கலாம்."
        ),
        ActionItemTriage(
            id="act-proj-02",
            category="DELAYED_PROJECT",
            priority="HIGH",
            title_en="Chennai Peripheral Ring Road (Section II - Thatchur to Tiruvallur Bypass)",
            title_ta="சென்னை புறவட்ட சாலை (பிரிவு II - தச்சூர் முதல் திருவள்ளூர் பைபாஸ் வரை)",
            department="Highways & Minor Ports",
            financial_impact_cr=2150.00,
            delay_days=45,
            bottleneck_en="Land acquisition clearance in 2 villages in Ponneri Taluk held up due to compensation revision demand.",
            bottleneck_ta="பொன்னேரி வட்டத்தில் 2 கிராமங்களில் இழப்பீட்டு திருத்தக் கோரிக்கையால் நில எடுப்பு தாமதம்.",
            responsible_officer="District Collector, Tiruvallur & DRO",
            deadline="Today, 16:30 hrs",
            ai_recommended_action_en="Direct Collector Tiruvallur to convene Special Lok Adalat bench for immediate compensation settlement.",
            ai_recommended_action_ta="இழப்பீட்டுத் தொகையை உடனடியாகத் தீர்க்க சிறப்பு லோக் அதாலத் அமர்வை கூட்ட திருவள்ளூர் ஆட்சியருக்கு உத்தரவிடவும்."
        ),
        ActionItemTriage(
            id="act-rev-03",
            category="REVENUE_LEAKAGE",
            priority="HIGH",
            title_en="Commercial Tax Underperformance: Salem & Hosur Steel Scrap Traders",
            title_ta="வணிக வரி இழப்பு: சேலம் மற்றும் ஓசூர் இரும்பு கழிவு வியாபாரிகள்",
            department="Commercial Taxes & Registration",
            financial_impact_cr=38.40,
            delay_days=18,
            bottleneck_en="AI anomaly detection flagged circular bogus invoicing without physical goods movement.",
            bottleneck_ta="பொருட்கள் நகர்வு இன்றி போலி ரசீது தயாரித்ததை AI தொழில்நுட்பம் கண்டறிந்துள்ளது.",
            responsible_officer="Joint Commissioner (Enforcement), Salem",
            deadline="Tomorrow, 11:00 hrs",
            ai_recommended_action_en="Authorize simultaneous search and bank account freezing orders under TN GST Act Section 67.",
            ai_recommended_action_ta="தமிழ்நாடு ஜிஎஸ்டி சட்டம் பிரிவு 67-ன் கீழ் ஒரே நேரத்தில் சோதனை நடத்தவும் வங்கி கணக்குகளை முடக்கவும் உத்தரவிடவும்."
        ),
        ActionItemTriage(
            id="act-griev-04",
            category="CITIZEN_GRIEVANCE",
            priority="MEDIUM",
            title_en="Cluster Petitions: Drinking Water Pipeline Leakage in Tirunelveli Rural",
            title_ta="மனுக்கள் குவிப்பு: திருநெல்வேலி ஊரகப் பகுதியில் குடிநீர் குழாய் உடைப்பு",
            department="Rural Development & Panchayat Raj",
            financial_impact_cr=1.20,
            delay_days=12,
            bottleneck_en="18 village panchayat petitions merged into single grievance cluster for Tamirabarani water supply.",
            bottleneck_ta="தாமிரபரணி கூட்டு குடிநீர் திட்டம் தொடர்பாக 18 கிராம பஞ்சாயத்து மனுக்கள் ஒன்றாக இணைக்கப்பட்டுள்ளன.",
            responsible_officer="Project Director, DRDA Tirunelveli",
            deadline="Oct 01, 2026",
            ai_recommended_action_en="Instruct TWAD Board Executive Engineer to complete replacement of 3.2 km pipeline segment.",
            ai_recommended_action_ta="3.2 கி.மீ குழாய் மாற்றும் பணியை விரைந்து முடிக்க தமிழ்நாடு குடிநீர் வடிகால் வாரியத்திற்கு உத்தரவிடவும்."
        ),
        ActionItemTriage(
            id="act-court-05",
            category="COURT_CASE",
            priority="CRITICAL",
            title_en="Madras High Court Contempt Notice: Teachers Recruitment Board Final Key Release",
            title_ta="சென்னை உயர் நீதிமன்ற நீதிமன்ற அவமதிப்பு நோட்டீஸ்: ஆசிரியர் தேர்வு வாரிய இறுதி விடைக்குறிப்பு",
            department="School Education",
            financial_impact_cr=0.00,
            delay_days=4,
            bottleneck_en="Compliance affidavit due before Division Bench on Oct 03 regarding expert committee evaluation.",
            bottleneck_ta="நிபுணர் குழு மதிப்பீடு குறித்து அக்டோபர் 3-க்குள் சென்னை உயர் நீதிமன்றத்தில் அறிக்கை தாக்கல் செய்ய வேண்டும்.",
            responsible_officer="Member Secretary, TRB & Advocate General",
            deadline="Oct 02, 17:00 hrs",
            ai_recommended_action_en="Approve submission of Advocate General-vetted compliance affidavit and gazette notification.",
            ai_recommended_action_ta="தலைமை வழக்கறிஞர் சரிபார்த்த பதில் மனு மற்றும் அரசிதழ் அறிவிப்பை தாக்கல் செய்ய ஒப்புதல் அளிக்கவும்."
        )
    ]

    return MyActionsTodayResponse(
        user_role=role,
        total_actions_pending=len(actions),
        approvals_awaiting_decision_count=1,
        delayed_projects_count=1,
        escalated_grievances_count=1,
        court_cases_deadline_count=1,
        actions=actions
    )
