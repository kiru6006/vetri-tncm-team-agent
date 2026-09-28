from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from app.schemas.calendar import CalendarAppointment, BookAppointmentRequest


APPOINTMENTS_DATABASE: List[CalendarAppointment] = [
    CalendarAppointment(
        id="appt-cm-01",
        title_en="Quarterly Irrigation & Kuruvai Water Inflow Review with Delta MLAs",
        title_ta="டெல்டா தொகுதி சட்டமன்ற உறுப்பினர்களுடன் குறுவை பாசன நீர் மறுசீராய்வு கூட்டம்",
        appointment_type="MLA_DELEGATION",
        scheduled_date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        scheduled_time="10:00 AM - 10:45 AM",
        duration_minutes=45,
        location="Chief Minister's Secretariat Chamber, Fort St. George",
        status="CONFIRMED",
        priority="CRITICAL",
        host_name="M. K. Stalin",
        host_role="CHIEF_MINISTER",
        participant_name_en="Thiruvaiyaru & Mannargudi MLA Delegation",
        participant_name_ta="திருவையாறு & மன்னார்குடி சட்டமன்ற உறுப்பினர்கள் குழு",
        participant_designation="Members of Legislative Assembly (MLAs)",
        participant_role="MLA",
        participant_department="Water Resources & Agriculture",
        participant_district="Thanjavur & Tiruvarur",
        participant_contact="+91 94433 12091",
        participant_email="mla.delta@tn.gov.in",
        agenda_en="Request for staggered release of 15,000 cusecs from Mettur dam for tail-end delta canals in Vennar sub-basin.",
        agenda_ta="வெண்ணாறு உபவடிநிலத்தில் கடைமடை பாசன கால்வாய்களுக்கு மேட்டூரிலிருந்து 15,000 கனஅடி நீர் திறக்க கோரிக்கை.",
        ai_prepared_notes_en="Mettur reservoir storage currently at 68.4 ft (31.2 TMC). Tail-end reaches in Tiruvarur have 12% moisture deficit. Releasing 15,000 cusecs for 6 days is hydrologically sustainable.",
        ai_prepared_notes_ta="மேட்டூர் அணை நீர் இருப்பு 68.4 அடி. திருவாரூர் கடைமடை பகுதியில் 12% ஈரப்பதம் குறைவு. 6 நாட்களுக்கு 15,000 கனஅடி நீர் திறப்பு சாத்தியமானது.",
        historical_decisions_context=["Special Kuruvai Cultivation Package G.O. Ms No. 84 sanctioned in June 2026."],
        required_files_gos=["G.O. (Ms) No. 84 - WRD Delta Water Schedule"],
        protocol_clearance_status="VIP_SECURITY"
    ),
    CalendarAppointment(
        id="appt-cm-02",
        title_en="High-Level Briefing on Semiconductor Fab Land Allotment & Power Substation",
        title_ta="குறைக்கடத்தி தொழிற்சாலை நில ஒதுக்கீடு மற்றும் மின் துணை நிலையம் குறித்த உயர்மட்ட கூட்டம்",
        appointment_type="SECRETARY_BRIEFING",
        scheduled_date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        scheduled_time="11:30 AM - 12:15 PM",
        duration_minutes=45,
        location="Cabinet Room, 2nd Floor, Secretariat",
        status="CONFIRMED",
        priority="HIGH",
        host_name="M. K. Stalin",
        host_role="CHIEF_MINISTER",
        participant_name_en="V. Arun Roy, IAS & Rajesh Lakhoni, IAS",
        participant_name_ta="வி. அருண் ராய், இ.ஆ.ப. & ராஜேஷ் லக்கானி, இ.ஆ.ப.",
        participant_designation="Principal Secretary Industries & CMD TANGEDCO",
        participant_role="PRINCIPAL_SECRETARY",
        participant_department="Industries & Energy",
        participant_district="Krishnagiri (Hosur)",
        participant_contact="+91 44 2567 1822",
        participant_email="indsec@tn.gov.in",
        agenda_en="Review SIPCOT Krishnagiri 400kV dedicated transmission line timeline and Cabinet Incentive Note.",
        agenda_ta="சிப்காட் ஓசூர் 400kV பிரத்யேக மின்பாதை கால அட்டவணை மற்றும் அமைச்சரவை சலுகைக் குறிப்பு ஆய்வு.",
        ai_prepared_notes_en="₹4,800 Cr Mega Semiconductor project requires 120 MW continuous un-interrupted power. TANGEDCO substation civil work is at 74% completion.",
        ai_prepared_notes_ta="₹4,800 கோடி திட்டத்திற்கு 120 மெகாவாட் தடையற்ற மின்சாரம் தேவை. மின்வாரிய துணை நிலைய பணிகள் 74% முடிவடைந்துள்ளன.",
        historical_decisions_context=["Cabinet approved Tamil Nadu Semiconductor Policy 2024."],
        required_files_gos=["Draft Cabinet Note - SIPCOT Allotment 2026"],
        protocol_clearance_status="VERIFIED"
    ),
    CalendarAppointment(
        id="appt-cm-03",
        title_en="Review with District Collector & SP Coimbatore on Western Ring Road Land Acquisition",
        title_ta="மேற்கு புறவழிச்சாலை நில எடுப்பு தொடர்பாக கோவை மாவட்ட ஆட்சியர் & எஸ்.பி உடனான ஆய்வு",
        appointment_type="SECRETARY_BRIEFING",
        scheduled_date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        scheduled_time="03:00 PM - 03:45 PM",
        duration_minutes=45,
        location="Chief Minister's Video Conference Suite",
        status="CONFIRMED",
        priority="HIGH",
        host_name="M. K. Stalin",
        host_role="CHIEF_MINISTER",
        participant_name_en="Krasthi Kumar Pati, IAS & K. Karthikeyan, IPS",
        participant_name_ta="கிராந்தி குமார் பாடி, இ.ஆ.ப. & கே. கார்த்திகேயன், இ.கா.ப.",
        participant_designation="District Collector & SP, Coimbatore",
        participant_role="GROUP_1",
        participant_department="Revenue & Police",
        participant_district="Coimbatore",
        participant_contact="+91 422 2301114",
        participant_email="collr-cbe@nic.in",
        agenda_en="Resolving 485-acre land compensation distribution and highway widening traffic diversions.",
        agenda_ta="485 ஏக்கர் நில இழப்பீடு வழங்கல் மற்றும் சாலை விரிவாக்க போக்குவரத்து மாற்றங்கள் குறித்து ஆய்வு.",
        ai_prepared_notes_en="Special Lok Adalat bench settled 92% of landowner claims. Remaining 8% under fast-track scrutiny.",
        ai_prepared_notes_ta="சிறப்பு லோக் அதாலத் மூலம் 92% நில உரிமையாளர்களுக்கு தீர்வு காணப்பட்டுள்ளது.",
        historical_decisions_context=["Highways Section 19 notification published on June 14."],
        required_files_gos=["G.O. (Ms) No. 204 - Coimbatore WRR Sanction"],
        protocol_clearance_status="VERIFIED"
    ),
    CalendarAppointment(
        id="appt-cm-04",
        title_en="Grassroots Grievance Review with Tahsildars & VAO Association Representatives",
        title_ta="வட்டாட்சியர்கள் & கிராம நிர்வாக அலுவலர் சங்க பிரதிநிதிகளுடன் கள ஆய்வு கூட்டம்",
        appointment_type="PUBLIC_PETITION",
        scheduled_date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        scheduled_time="04:30 PM - 05:15 PM",
        duration_minutes=45,
        location="Secretariat Conference Hall 3",
        status="CONFIRMED",
        priority="MEDIUM",
        host_name="M. K. Stalin",
        host_role="CHIEF_MINISTER",
        participant_name_en="M. Shanmugasundaram & VAO State Delegates",
        participant_name_ta="மு. சண்முகசுந்தரம் & விஏஓ மாநில பிரதிநிதிகள்",
        participant_designation="Tahsildar (Group 2) & VAO Representatives (Group 4)",
        participant_role="GROUP_2",
        participant_department="Revenue Administration",
        participant_district="Coimbatore & Tiruvallur",
        participant_contact="+91 98422 55102",
        participant_email="tah.cbenorth@tn.gov.in",
        agenda_en="Review of Mobile Voice-First e-Adangal crop survey adoption and patta passbook grievance resolution SLA.",
        agenda_ta="மொபைல் குரல்வழி இ-அடங்கல் பயிர் கணக்கெடுப்பு மற்றும் பட்டா மாறுதல் தீர்வு கால அவகாசம் ஆய்வு.",
        ai_prepared_notes_en="Crop survey digitization reduced VAO paper turnaround time by 65%. 14,000 village panchayats active.",
        ai_prepared_notes_ta="பயிர் கணக்கெடுப்பு டிஜிட்டல் மயமாக்கப்பட்டதால் விஏஓ-க்களின் பணி நேரம் 65% மிச்சமாகியுள்ளது.",
        historical_decisions_context=["Government Order for digital e-Adangal roll-out issued in 2025."],
        required_files_gos=["G.O. (Ms) No. 41 - Digital Revenue Records"],
        protocol_clearance_status="STANDARD"
    )
]


async def get_all_appointments(role_filter: Optional[str] = "ALL", date_filter: Optional[str] = None) -> List[CalendarAppointment]:
    results = []
    for appt in APPOINTMENTS_DATABASE:
        if role_filter and role_filter != "ALL" and appt.participant_role != role_filter:
            continue
        if date_filter and appt.scheduled_date != date_filter:
            continue
        results.append(appt)
    return results


async def book_new_appointment(req: BookAppointmentRequest, host_claims: Dict[str, Any]) -> CalendarAppointment:
    today_str = req.scheduled_date or datetime.now(timezone.utc).strftime("%Y-%m-%d")
    time_str = req.scheduled_time or "02:00 PM - 02:45 PM"
    
    new_appt = CalendarAppointment(
        id=f"appt-gen-{int(datetime.now(timezone.utc).timestamp())}",
        title_en=req.title,
        title_ta=req.title,
        appointment_type="SECRETARY_BRIEFING" if "SECRETARY" in req.participant_role else "CM_APPOINTMENT",
        scheduled_date=today_str,
        scheduled_time=time_str,
        duration_minutes=45,
        location=req.location or "Chief Minister's Secretariat Chamber, Fort St. George",
        status="CONFIRMED",
        priority="HIGH",
        host_name=host_claims.get("name_en", "Hon'ble Chief Minister"),
        host_role=host_claims.get("role", "CHIEF_MINISTER"),
        participant_name_en=req.participant_name,
        participant_name_ta=req.participant_name,
        participant_designation=req.participant_designation,
        participant_role=req.participant_role,
        participant_department=req.department or "General Administration",
        participant_district=req.district or "Statewide",
        participant_contact=req.contact_phone or "+91 44 2567 0000",
        participant_email="official@tn.gov.in",
        agenda_en=req.agenda,
        agenda_ta=req.agenda,
        ai_prepared_notes_en=f"AI Briefing dossier auto-compiled for '{req.title}'. Verified participant credentials and pulled relevant departmental files.",
        ai_prepared_notes_ta=f"'{req.title}' சந்திப்பிற்கான AI முன் தயாரிப்பு குறிப்புகள் மற்றும் துறை ஆவணங்கள் இணைக்கப்பட்டுள்ளன.",
        historical_decisions_context=["Logged in VETTRI Executive Protocol Registry."],
        required_files_gos=["Verified e-Office File Dossier"],
        protocol_clearance_status="VERIFIED"
    )

    APPOINTMENTS_DATABASE.insert(0, new_appt)
    return new_appt
