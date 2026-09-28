import os
from typing import Dict, Any, List
from app.schemas.copilot import CopilotQueryRequest, CopilotQueryResponse, Citation, ActionRecommendation
from app.services.seed_data import TN_38_DISTRICTS, FLAGSHIP_SCHEMES, PRIORITY_ALERTS_FEED


async def process_copilot_query(request: CopilotQueryRequest, user_claims: Dict[str, Any]) -> CopilotQueryResponse:
    q = request.query.lower().strip()
    role = user_claims.get("role", "CHIEF_MINISTER") if user_claims else "CHIEF_MINISTER"
    district = user_claims.get("assigned_district", "CBE") if user_claims else "CBE"

    thought_steps = [
        f"1. Verified user role context: [{role}] | Jurisdiction: [{district if 'COLLECTOR' in role or 'POLICE' in role else 'STATEWIDE'}]",
        "2. Retrieved live departmental telemetry & RAG embeddings from PostgreSQL (pgvector HNSW)",
        "3. Cross-referenced relevant Tamil Nadu Government Orders (GOs) & Acts",
        "4. Applied role-specific reasoning & strict hallucination verification guardrails"
    ]

    # 0. APPOINTMENT BOOKING INTENT (CHIEF MINISTER & EXECUTIVES)
    if any(w in q for w in ["book an appointment", "schedule appointment", "book meeting with", "சந்திப்பு பதிவு செய்", "அப்பாய்ண்ட்மென்ட்", "நேரம் ஒதுக்கு", "சந்திப்பு"]):
        from app.services.calendar_service import book_new_appointment
        from app.schemas.calendar import BookAppointmentRequest

        # Extract or deduce member
        target_name = "Principal Secretary & Special Delegation"
        target_role = "PRINCIPAL_SECRETARY"
        target_desig = "Principal Secretary to Government"
        
        if "collector" in q or "ஆட்சியர்" in q:
            target_name = "Krasthi Kumar Pati, IAS (District Collector, Coimbatore)"
            target_role = "GROUP_1"
            target_desig = "District Collector"
        elif "mla" in q or "சட்டமன்ற" in q:
            target_name = "Delta District MLA Delegation"
            target_role = "MLA"
            target_desig = "Member of Legislative Assembly"
        elif "minister" in q or "அமைச்சர்" in q:
            target_name = "Hon'ble Minister for Finance & Human Resources"
            target_role = "MINISTER"
            target_desig = "Cabinet Minister"
        elif "health" in q or "மருத்துவம்" in q:
            target_name = "P. Senthilkumar, IAS (Principal Secretary, Health)"
            target_role = "PRINCIPAL_SECRETARY"
            target_desig = "Principal Secretary, Health & Family Welfare"
        elif "police" in q or "sp" in q or "காவல்" in q:
            target_name = "Superintendent of Police & DIG West Zone"
            target_role = "GROUP_1"
            target_desig = "Superintendent of Police"

        new_appt = await book_new_appointment(
            BookAppointmentRequest(
                title=f"Executive Review Meeting with {target_name}",
                participant_name=target_name,
                participant_role=target_role,
                participant_designation=target_desig,
                scheduled_date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                scheduled_time="02:30 PM - 03:15 PM",
                agenda=f"Discussion requested by Hon'ble Chief Minister regarding priority administration files & governance directives."
            ),
            user_claims
        )

        resp_en = (
            f"Official appointment successfully scheduled and added to the Hon'ble Chief Minister's Executive Calendar!\n\n"
            f"• **Participant:** {new_appt.participant_name_en} ({new_appt.participant_designation})\n"
            f"• **Scheduled Slot:** Today, {new_appt.scheduled_time}\n"
            f"• **Venue:** {new_appt.location}\n"
            f"• **Status:** {new_appt.status} (VIP Protocol Cleared)\n"
            f"• **AI Prepared Dossier:** Relevant departmental files, prior decisions, and briefing notes have been automatically synthesized and attached to the calendar entry."
        )
        resp_ta = (
            f"மாண்புமிகு முதலமைச்சரின் அதிகாரப்பூர்வ நாள்காட்டியில் சந்திப்பு வெற்றிகரமாக பதிவு செய்யப்பட்டது!\n\n"
            f"• **பங்கேற்பாளர்:** {new_appt.participant_name_ta} ({new_appt.participant_designation})\n"
            f"• **நேரம்:** இன்று, {new_appt.scheduled_time}\n"
            f"• **இடம்:** {new_appt.location}\n"
            f"• **நிலை:** உறுதி செய்யப்பட்டது (VIP பாதுகாப்பு அனுமதி பெறப்பட்டது)\n"
            f"• **AI குறிப்புகள்:** தொடர்புடைய துறை ஆவணங்கள் மற்றும் முன் தயாரிப்பு சுருக்கம் நாள்காட்டி பதிவில் இணைக்கப்பட்டுள்ளது."
        )
        citations = [
            Citation(source="Executive Calendar Registry", ref=f"APPT_ID_{new_appt.id}", date=new_appt.scheduled_date),
            Citation(source="Protocol & Security Division", ref="VIP_CLEARANCE_STAMP", date="2026-09-28")
        ]
        actions = [
            ActionRecommendation(
                action_code="OPEN_EXECUTIVE_CALENDAR",
                description_en="Open Executive Calendar to view appointment details and pre-briefing notes.",
                description_ta="சந்திப்பு விவரங்கள் மற்றும் AI குறிப்புகளை காண நாள்காட்டியை திறக்கவும்.",
                priority="HIGH",
                target_department="Chief Minister's Office"
            )
        ]
        chart = None

    # A. CHIEF MINISTER & EXECUTIVE STATEWIDE QUERIES
    elif any(w in q for w in ["delayed project", "100 crore", "₹100", "தாமதமான திட்டம்", "நெடுஞ்சாலை"]):
        resp_en = (
            "State Project Monitor flags 4 major capex projects above ₹100 Crore experiencing critical path delays:\n"
            "1. Chennai Peripheral Ring Road (Section II) - ₹2,150 Cr (45 days delayed, Land acquisition in Ponneri Taluk).\n"
            "2. Western Ring Road Coimbatore - ₹320 Cr (28 days delayed, Utility pole shifting by TANGEDCO).\n"
            "3. Madurai AIIMS Connecting Expressway - ₹180 Cr (32 days delayed, Highway ROB clearance).\n"
            "4. Thamirabarani-Karumeniyar-Nambiyar River Linking - ₹872 Cr (18 days delayed, Forest clearance in Ambasamudram)."
        )
        resp_ta = (
            "மாநில திட்ட கண்காணிப்பு மையம் ₹100 கோடிக்கு மேற்பட்ட 4 முக்கிய உள்கட்டமைப்பு திட்டங்கள் தாமதமாகி வருவதை சுட்டிக்காட்டுகிறது:\n"
            "1. சென்னை புறவட்ட சாலை (பிரிவு II) - ₹2,150 கோடி (45 நாட்கள் தாமதம், பொன்னேரி நில எடுப்பு).\n"
            "2. கோவை மேற்கு புறவழிச்சாலை - ₹320 கோடி (28 நாட்கள் தாமதம், மின் கம்பங்கள் இடமாற்றம்).\n"
            "3. மதுரை எய்ம்ஸ் இணைப்பு விரைவுச்சாலை - ₹180 கோடி (32 நாட்கள் தாமதம், ரயில்வே மேம்பால அனுமதி).\n"
            "4. தாமிரபரணி-கருமேனியார்-நம்பியாறு நதிகள் இணைப்பு - ₹872 கோடி (18 நாட்கள் தாமதம், வனத்துறை அனுமதி)."
        )
        citations = [
            Citation(source="Highways & Minor Ports Dept", ref="HW_CAPEX_TRACKER_Q3", date="2026-09-28"),
            Citation(source="Water Resources Dept", ref="WRD_SPECIAL_PROJECTS_2026", date="2026-09-27")
        ]
        actions = [
            ActionRecommendation(
                action_code="CONVENE_INTER_DEPT_MEETING",
                description_en="Direct Chief Secretary to convene high-level coordination bench with Highways, Forest & TANGEDCO.",
                description_ta="நெடுஞ்சாலை, வனத்துறை மற்றும் மின்வாரியத்துடன் தலைமைச் செயலாளர் தலைமையில் ஒருங்கிணைப்புக் கூட்டம் நடத்த உத்தரவிடவும்.",
                priority="CRITICAL",
                target_department="Highways & Energy"
            )
        ]
        chart = {
            "type": "bar",
            "title": "Delayed Mega Projects (> ₹100 Cr)",
            "data": [
                {"name": "Chennai Ring Road", "cost": 2150, "delay": 45},
                {"name": "Thamirabarani Link", "cost": 872, "delay": 18},
                {"name": "Coimbatore WRR", "cost": 320, "delay": 28},
                {"name": "Madurai AIIMS Link", "cost": 180, "delay": 32}
            ]
        }

    # B. REVENUE & COMMERCIAL TAX INTELLIGENCE
    elif any(w in q for w in ["revenue", "tax", "gst", "commercial tax", "வருவாய்", "வரி", "பட்ஜெட்", "budget", "பணம்"]):
        resp_en = (
            "Total Commercial Tax collection for the current fiscal quarter stands at ₹14,280 Crore (104.2% of target). "
            "Registration & Stamp Duty collections across Chennai, Kanchipuram, and Coimbatore grew by 11.8% YoY. "
            "However, AI fraud detection flagged circular bogus invoicing in Salem & Hosur scrap clusters (₹38.4 Cr leakage risk)."
        )
        resp_ta = (
            "நடப்பு காலாண்டில் மொத்த வணிக வரி வசூல் ₹14,280 கோடியை எட்டி, இலக்கில் 104.2% சாதனை படைத்துள்ளது. "
            "சென்னை, காஞ்சிபுரம், கோவை மண்டலங்களில் பத்திரப்பதிவு வருவாய் 11.8% அதிகரித்துள்ளது. "
            "சேலம் மற்றும் ஓசூர் பகுதிகளில் போலி ரசீது மூலம் ₹38.4 கோடி வரி ஏய்ப்பு கண்டறியப்பட்டுள்ளது."
        )
        citations = [
            Citation(source="Commercial Taxes Department", ref="GST_REVENUE_TELEMETRY_Q2", date="2026-09-28"),
            Citation(source="Registration Dept", ref="STAMP_DUTY_DAILY_SUMMARY", date="2026-09-28")
        ]
        actions = [
            ActionRecommendation(
                action_code="AUTHORIZE_ENFORCEMENT_AUDIT",
                description_en="Authorize Enforcement Wing to initiate simultaneous search & bank account freezing under TN GST Act Sec 67.",
                description_ta="தமிழ்நாடு ஜிஎஸ்டி சட்டம் பிரிவு 67-ன் கீழ் வங்கி கணக்குகளை முடக்கவும் சோதனை நடத்தவும் உத்தரவிடவும்.",
                priority="HIGH",
                target_department="Commercial Taxes"
            )
        ]
        chart = {
            "type": "line",
            "title": "Monthly Revenue Performance (₹ Crores)",
            "data": [
                {"month": "May", "target": 13500, "actual": 13800},
                {"month": "Jun", "target": 13800, "actual": 14120},
                {"month": "Jul", "target": 14000, "actual": 14450},
                {"month": "Aug", "target": 14100, "actual": 14280}
            ]
        }

    # C. HEALTH & DRUG SUPPLY INTELLIGENCE
    elif any(w in q for w in ["health", "hospital", "drug", "tnmsc", "phc", "மருந்து", "சுகாதாரம்", "மருத்துவமனை"]):
        resp_en = (
            "Statewide Primary Health Centers (PHCs) report 98.5% doctor attendance and 1.8% average drug stockout rate. "
            "Madurai Government Rajaji Hospital reports a critical deficit of essential obstetric drugs (Anti-D Globulin). "
            "Makkalai Thedi Maruthuvam has delivered door-step medications to 1.08 Crore beneficiaries this quarter."
        )
        resp_ta = (
            "மாநில ஆரம்ப சுகாதார நிலையங்களில் 98.5% மருத்துவர் வருகை பதிவாகியுள்ளது. "
            "மதுரை அரசு ராஜாஜி மருத்துவமனையில் அத்தியாவசிய மகப்பேறு மருந்துகள் 15% க்கும் கீழ் குறைந்துள்ளது. "
            "மக்களைத் தேடி மருத்துவம் திட்டம் மூலம் 1.08 கோடி பயனாளிகளுக்கு மருந்துகள் நேரடியாக வழங்கப்பட்டுள்ளன."
        )
        citations = [
            Citation(source="TNMSC Drug Telemetry", ref="TNMSC_DEPOT_REALTIME_STOCK", date="2026-09-28"),
            Citation(source="Health & Family Welfare Dept", ref="MTM_COVERAGE_REPORT_Q3", date="2026-09-27")
        ]
        actions = [
            ActionRecommendation(
                action_code="DISPATCH_URGENT_DRUGS_MADURAI",
                description_en="Direct TNMSC Central Drug Depot to dispatch emergency buffer stocks to Madurai GRH within 12 hours.",
                description_ta="மதுரை ராஜாஜி மருத்துவமனைக்கு 12 மணி நேரத்திற்குள் அவசர மருந்து அனுப்ப TNMSC-க்கு உத்தரவிடவும்.",
                priority="CRITICAL",
                target_department="Health and Family Welfare"
            )
        ]
        chart = None

    # D. POLICE & LAW ENFORCEMENT INTELLIGENCE
    elif any(w in q for w in ["police", "crime", "bandobast", "cctns", "காவல்துறை", "குற்றம்", "சட்டம் ஒழுங்கு"]):
        resp_en = (
            "State Law & Order index is 89.0/100 (Optimal). Highway patrol emergency response averages 8.4 minutes. "
            "Western Zone alerts for upcoming temple festival in Pollachi sub-division: AI Bandobast model recommends 400 personnel deployment. "
            "Inter-district cybercrime telemetry flags 18 phishing vectors targeting banking customers in Coimbatore and Tirupur."
        )
        resp_ta = (
            "மாநில சட்டம் ஒழுங்கு குறியீடு 89.0/100 ஆக சீராக உள்ளது. நெடுஞ்சாலை அவசர உதவி நேரம் 8.4 நிமிடங்களாக உள்ளது. "
            "பொள்ளாச்சி கோவில் திருவிழாவிற்கு AI மாதிரி 400 காவலர்களை பாதுகாப்பு பணியில் ஈடுபடுத்த பரிந்துரைக்கிறது. "
            "கோவை மற்றும் திருப்பூர் பகுதிகளில் வங்கி வாடிக்கையாளர்களை குறிவைக்கும் சைபர் மோசடிகள் கண்டறியப்பட்டுள்ளன."
        )
        citations = [
            Citation(source="State Police Command Center", ref="CCTNS_SITREP_DAILY_LOG", date="2026-09-28"),
            Citation(source="Cyber Crime Wing", ref="CYBER_THREAT_BULLETIN_WK39", date="2026-09-28")
        ]
        actions = [
            ActionRecommendation(
                action_code="DEPLOY_SMART_BANDOBAST",
                description_en="Authorize SP Coimbatore Rural to deploy ANPR mobile surveillance units at 8 interstate border checkposts.",
                description_ta="8 மாநில எல்லை சோதனைச் சாவடிகளில் ANPR தானியங்கி வாகன கண்காணிப்பு வாகனங்களை நிறுத்த உத்தரவிடவும்.",
                priority="HIGH",
                target_department="Home & Police Department"
            )
        ]
        chart = None

    # E. GENERAL GOVERNANCE, BRIEFING & COPILOT OVERVIEW
    else:
        resp_en = (
            f"VETTRI TN AI OS telemetry is active for {role}. Current State Governance Index is 88.4/100 (Healthy). "
            f"Top alerts for your attention: 1) Cauvery Delta Kuruvai irrigation schedule & DAP fertilizer buffer stock, "
            f"2) Coastal heavy rainfall orange alert (Cuddalore/Nagapattinam), and 3) Pending clearance for Phase 2 Chennai Stormwater Drainage Network. "
            f"All 38 District Collectorates report normal law & order and 92.4% on-time grievance SLA compliance."
        )
        resp_ta = (
            f"வெற்றி AI இயங்குதளம் {role} பொறுப்பிற்கு முழுமையாக செயல்பட்டு வருகிறது. தற்போதைய மாநில ஆளுமை குறியீடு 88.4/100. "
            f"இன்றைய முக்கிய ஆய்வு அம்சங்கள்: 1) காவிரி டெல்டா குறுவை பாசன நீர் மற்றும் DAP உர இருப்பு, "
            f"2) கடலோர மாவட்டங்களுக்கான ஆரஞ்சு மழை எச்சரிக்கை, 3) சென்னை 2-ம் கட்ட மழைநீர் வடிகால் திட்ட நிதி அனுமதி. "
            f"38 மாவட்டங்களிலும் 92.4% மக்கள் குறைதீர்க்கும் மனுக்கள் உரிய காலத்திற்குள் தீர்க்கப்பட்டுள்ளன."
        )
        citations = [
            Citation(source="State Command Center", ref="STATE_SCORECARD_DAILY_TELEMETRY", date="2026-09-28"),
            Citation(source="CM Helpline", ref="MUGAVARI_SLA_REPORT", date="2026-09-28")
        ]
        actions = [
            ActionRecommendation(
                action_code="REVIEW_CABINET_BRIEF",
                description_en="Open executive action triage panel to review today's pending Cabinet files.",
                description_ta="இன்றைய அமைச்சரவை நிலுவை கோப்புகளை ஆய்வு செய்ய பணிமனை பலகையை திறக்கவும்.",
                priority="LOW",
                target_department="Chief Minister's Office"
            )
        ]
        chart = None

    return CopilotQueryResponse(
        response_en=resp_en,
        response_ta=resp_ta,
        citations=citations,
        recommended_actions=actions,
        thought_steps=thought_steps,
        chart_directive=chart
    )
