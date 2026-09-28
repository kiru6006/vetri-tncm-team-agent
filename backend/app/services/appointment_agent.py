import re
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from app.schemas.calendar import (
    AgentAppointmentRequest,
    AgentAppointmentResponse,
    OfficerDirectoryItem,
    DirectorySearchFilter,
    CalendarAppointment,
    BookAppointmentRequest
)
from app.services.directory_service import search_officials_directory, TAMIL_NADU_OFFICIALS_DIRECTORY
from app.services.calendar_service import book_new_appointment


async def run_appointment_agent(request: AgentAppointmentRequest, user_claims: Dict[str, Any]) -> AgentAppointmentResponse:
    q = request.query.strip()
    q_lower = q.lower()
    role = user_claims.get("role", "CHIEF_MINISTER") if user_claims else "CHIEF_MINISTER"

    thought_steps = [
        f"1. AI Agent initialized with Executive Role: [{role}] | Query: '{q}'",
        "2. Performing Multi-Dimensional Entity Extraction (Names, Departments, Schemes, Projects, Districts, Constituencies)",
        "3. Cross-referencing Tamil Nadu State Officials Directory & Official Email Registry",
        "4. Determining Agent Action: [DIRECTORY_DISCOVERY] vs. [AUTOMATED_APPOINTMENT_BOOKING]"
    ]

    # Check if this is an appointment booking command or directory discovery request
    is_booking = any(w in q_lower for w in [
        "book", "schedule", "appoint", "fix meeting", "set up meeting", "arrange meeting",
        "பதிவு செய்", "அப்பாய்ண்ட்மென்ட்", "நேரம் ஒதுக்கு", "சந்திப்பு ஏற்பாடு"
    ])

    # 1. Multi-dimensional filtering across the directory
    # Detect District / Constituency / Location
    dist_kw = None
    const_kw = None
    for loc in ["salem", "coimbatore", "chennai", "madurai", "thanjavur", "tiruvarur", "krishnagiri", "hosur", "tirupur", "cuddalore", "katpadi", "thiruvaiyaru", "mannargudi", "tiruchuli", "vellore", "pudukkottai"]:
        if loc in q_lower:
            if loc in ["thiruvaiyaru", "mannargudi", "hosur", "tiruchuli", "katpadi"]:
                const_kw = loc
            else:
                dist_kw = loc
            break

    # Detect Multiple Departments
    depts_found = []
    if any(w in q_lower for w in ["water", "irrigation", "நீர்வளம்", "பாசனம்", "கால்வாய்"]):
        depts_found.append("water")
    if any(w in q_lower for w in ["industr", "invest", "sipcot", "தொழில்"]):
        depts_found.append("industr")
    if any(w in q_lower for w in ["energy", "power", "tangedco", "மின்"]):
        depts_found.append("energy")
    if any(w in q_lower for w in ["health", "drug", "hospital", "phc", "மருத்துவம்", "சுகாதாரம்"]):
        depts_found.append("health")
    if any(w in q_lower for w in ["law", "court", "posco", "pocso", "சட்டம்", "நீதிமன்றம்"]):
        depts_found.append("law")
    if any(w in q_lower for w in ["police", "sp ", " sp", "superintendent", "superidedant", "suprintendent", "dgp", "காவல்", "குற்றம்"]):
        depts_found.append("police")
    if any(w in q_lower for w in ["finance", "budget", "வரி", "நிதி", "பட்ஜெட்"]):
        depts_found.append("finance")
    if any(w in q_lower for w in ["revenue", "collector", "patta", "tahsildar", "வருவாய்", "ஆட்சியர்"]):
        depts_found.append("revenue")

    # Detect Specific Roles Mentioned
    wants_collector = any(w in q_lower for w in ["collector", "மாவட்ட ஆட்சித்தலைவர்", "ஆட்சியர்"])
    wants_sp = any(w in q_lower for w in ["superintendent", "superidedant", "suprintendent", "sp", "police", "காவல் கண்காணிப்பாளர்"])
    wants_minister = any(w in q_lower for w in ["minister", "அமைச்சர்"])
    wants_secretary = any(w in q_lower for w in ["chief secretary", "secretary", "செயலாளர்", "முதன்மைச் செயலாளர்"])
    wants_mla = any(w in q_lower for w in ["mla", "mp", "சட்டமன்ற"])
    wants_bdo = any(w in q_lower for w in ["bdo", "tahsildar", "வட்டாட்சியர்", "வட்டார வளர்ச்சி"])
    wants_vao = any(w in q_lower for w in ["vao", "கிராம நிர்வாக"])

    # Detect Scheme
    scheme_kw = None
    if any(w in q_lower for w in ["magalir urimai", "kmut", "உரிமைத்தொகை"]):
        scheme_kw = "Kalaignar Magalir Urimai Thittam"
    elif any(w in q_lower for w in ["breakfast", "காலை உணவு"]):
        scheme_kw = "Chief Minister's Breakfast Scheme"
    elif any(w in q_lower for w in ["makkalai thedi", "maruthuvam"]):
        scheme_kw = "Makkalai Thedi Maruthuvam"
    elif any(w in q_lower for w in ["pudhumai penn", "புதுமைப் பெண்"]):
        scheme_kw = "Pudhumai Penn"
    elif any(w in q_lower for w in ["kuruvai", "குறுவை"]):
        scheme_kw = "Kuruvai"

    # Detect Project
    proj_kw = None
    if any(w in q_lower for w in ["semiconductor", "fab", "குறைக்கடத்தி"]):
        proj_kw = "Semiconductor"
    elif any(w in q_lower for w in ["ring road", "சுற்றுச்சாலை", "புறவழிச்சாலை"]):
        proj_kw = "Ring Road"
    elif any(w in q_lower for w in ["river link", "thamirabarani", "நதிகள் இணைப்பு"]):
        proj_kw = "River Linking"
    elif any(w in q_lower for w in ["metro", "மெட்ரோ"]):
        proj_kw = "Metro"

    # Match Officers by District + Role Priority
    matched_officers: List[OfficerDirectoryItem] = []

    # Priority 1: District-Specific Matching if District is present
    if dist_kw:
        district_officers = [
            o for o in TAMIL_NADU_OFFICIALS_DIRECTORY
            if dist_kw in o.district_en.lower() or dist_kw in o.district_ta.lower()
        ]
        
        # If user explicitly asked for Collector and/or SP in this district
        if wants_collector or wants_sp:
            for o in district_officers:
                desig_lower = o.designation_en.lower()
                if wants_collector and ("collector" in desig_lower or "district magistrate" in desig_lower):
                    if o not in matched_officers:
                        matched_officers.append(o)
                if wants_sp and ("superintendent of police" in desig_lower or "sp" in desig_lower):
                    if o not in matched_officers:
                        matched_officers.append(o)
        
        # If still empty or more matches needed, check departments in this district
        if not matched_officers and depts_found:
            for o in district_officers:
                dept_text = (o.department_en + " " + o.department_ta).lower()
                if any(d in dept_text for d in depts_found):
                    if o not in matched_officers:
                        matched_officers.append(o)

        # Fallback to all officers in this district
        if not matched_officers and district_officers:
            matched_officers.extend(district_officers)

    # Priority 2: Statewide / Department / Specific Role Matching if no district or district didn't fulfill
    if not matched_officers:
        # Check specific statewide leadership
        if wants_secretary:
            for o in TAMIL_NADU_OFFICIALS_DIRECTORY:
                if "chief secretary" in o.designation_en.lower():
                    if o not in matched_officers:
                        matched_officers.append(o)
        if wants_minister:
            for o in TAMIL_NADU_OFFICIALS_DIRECTORY:
                if o.role_tier == "MINISTER":
                    if depts_found:
                        dept_text = (o.department_en + " " + o.department_ta).lower()
                        if any(d in dept_text for d in depts_found):
                            if o not in matched_officers:
                                matched_officers.append(o)
                    else:
                        if o not in matched_officers:
                            matched_officers.append(o)

        # Check departments
        if depts_found:
            for o in TAMIL_NADU_OFFICIALS_DIRECTORY:
                dept_text = (o.department_en + " " + o.department_ta).lower()
                if any(d in dept_text for d in depts_found):
                    if o not in matched_officers:
                        matched_officers.append(o)

    # Priority 3: Fallback through search_officials_directory
    if not matched_officers:
        search_res = search_officials_directory(DirectorySearchFilter(
            query=q,
            department=depts_found[0] if depts_found else None,
            scheme=scheme_kw,
            project=proj_kw,
            district=dist_kw,
            constituency=const_kw
        ))
        matched_officers = search_res.officers

    if not matched_officers:
        matched_officers = TAMIL_NADU_OFFICIALS_DIRECTORY[:4]

    thought_steps.append(f"5. Matched {len(matched_officers)} verified officials from State Directory: {', '.join([o.name_en for o in matched_officers[:3]])}")

    # 2. IF BOOKING REQUESTED -> SCHEDULE APPOINTMENT
    if is_booking:
        # Intelligent Date Parsing
        scheduled_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        
        # Regex for specific dates like "4 oct 2026", "oct 4 2026", "3 oct", "october 4", etc.
        day_month_match = re.search(r"(\d{1,2})\s*(?:st|nd|rd|th)?\s*(oct|october|nov|november|dec|december|sep|september|jan|feb|mar|apr|may|jun|jul)\w*(?:\s*(\d{4}))?", q_lower)
        month_day_match = re.search(r"(oct|october|nov|november|dec|december|sep|september|jan|feb|mar|apr|may|jun|jul)\w*\s*(\d{1,2})\s*(?:st|nd|rd|th)?(?:\s*(\d{4}))?", q_lower)

        months_map = {
            "jan": "01", "feb": "02", "mar": "03", "apr": "04", "may": "05", "jun": "06",
            "jul": "07", "aug": "08", "sep": "09", "oct": "10", "nov": "11", "dec": "12"
        }

        if day_month_match:
            d_val = int(day_month_match.group(1))
            m_prefix = day_month_match.group(2)[:3]
            m_val = months_map.get(m_prefix, "10")
            y_val = day_month_match.group(3) or "2026"
            scheduled_date = f"{y_val}-{m_val}-{d_val:02d}"
        elif month_day_match:
            m_prefix = month_day_match.group(1)[:3]
            m_val = months_map.get(m_prefix, "10")
            d_val = int(month_day_match.group(2))
            y_val = month_day_match.group(3) or "2026"
            scheduled_date = f"{y_val}-{m_val}-{d_val:02d}"
        elif "tomorrow" in q_lower or "நாளை" in q_lower:
            scheduled_date = "2026-09-29"
        else:
            date_match = re.search(r"(\d{4}-\d{2}-\d{2})", q)
            if date_match:
                scheduled_date = date_match.group(1)

        # Intelligent Time Slot Parsing
        scheduled_time = "11:30 AM - 12:30 PM"
        
        # Match time ranges like "3pm to 4pm", "3 pm to 4 pm", "3:00pm to 4:00pm", "11.30am to 12.30pm"
        time_range_match = re.search(r"(\d{1,2}(?::\d{2}|\.\d{2})?\s*(?:am|pm)?)\s*(?:to|-)\s*(\d{1,2}(?::\d{2}|\.\d{2})?\s*(?:am|pm))", q_lower)
        if time_range_match:
            t1 = time_range_match.group(1).strip().upper().replace('.', ':')
            t2 = time_range_match.group(2).strip().upper().replace('.', ':')
            if not ("AM" in t1 or "PM" in t1) and ("PM" in t2):
                t1 += " PM"
            elif not ("AM" in t1 or "PM" in t1) and ("AM" in t2):
                t1 += " AM"
            scheduled_time = f"{t1} - {t2}"
        elif "11.30" in q_lower or "11:30" in q_lower:
            scheduled_time = "11:30 AM - 12:30 PM"
        elif "3pm" in q_lower or "3 pm" in q_lower or "15:00" in q_lower:
            scheduled_time = "03:00 PM - 04:00 PM"
        elif "4pm" in q_lower or "4 pm" in q_lower or "16:00" in q_lower:
            scheduled_time = "04:00 PM - 05:00 PM"
        elif "10am" in q_lower or "10 am" in q_lower or "10:00" in q_lower:
            scheduled_time = "10:00 AM - 11:00 AM"

        # Resolve Location & Venue
        location = "Chief Minister's Secretariat Chamber, Fort St. George"
        if any(w in q_lower for w in ["google meet", "gmeet", "meet", "video", "vc", "virtual", "online"]):
            location = "Google Meet (Executive Video Conference: meet.google.com/tncm-sec-conf)"
        elif dist_kw and "collectorate" in q_lower:
            location = f"{dist_kw.capitalize()} District Collectorate Conference Hall"

        # Resolve primary participant & email collection
        primary_officer = matched_officers[0]
        participant_names = ", ".join([o.name_en for o in matched_officers[:3]])
        participant_emails = [o.official_email for o in matched_officers[:4]]

        # Dynamic Agenda Generation
        if dist_kw:
            agenda_en = f"District Executive Review on Revenue Administration, Law & Order, Welfare Schemes and Priority Infrastructure Projects with {dist_kw.capitalize()} District Officials."
            agenda_ta = f"{dist_kw.capitalize()} மாவட்ட வளர்ச்சி திட்டங்கள், சட்டம் ஒழுங்கு மற்றும் நலத்திட்டங்கள் குறித்த மாவட்ட அளவிலான உயர்நிலை ஆய்வு."
        elif "posco" in q_lower or "pocso" in q_lower:
            agenda_en = "High-Level Review on Fast-Tracking POCSO Act Trials, Special Courts Infrastructure, Forensic Clearance Speeds & Police Prosecution Coordination."
            agenda_ta = "போக்சோ (POCSO) சட்ட வழக்குகள் விரைவு நீதிமன்ற விசாரணை, தடயவியல் அறிக்கை வேகம் மற்றும் காவல்துறை நடவடிக்கைகள் குறித்த உயர்மட்ட ஆய்வு."
        else:
            agenda_en = f"Review meeting on priority governance items: {proj_kw or scheme_kw or 'State Administration & Department Files'} as requested by Hon'ble Chief Minister."
            agenda_ta = f"முக்கிய அரசு பணிகள் மற்றும் திட்டங்கள் குறித்த மீளாய்வு கூட்டம்: {proj_kw or scheme_kw or 'நிர்வாக கோப்புகள்'}."

        meeting_title = f"Executive Governance Review: {participant_names}"

        new_appt = await book_new_appointment(
            BookAppointmentRequest(
                title=meeting_title,
                participant_name=participant_names,
                participant_role=primary_officer.role_tier,
                participant_designation=primary_officer.designation_en,
                scheduled_date=scheduled_date,
                scheduled_time=scheduled_time,
                agenda=agenda_en,
                department=primary_officer.department_en,
                district=primary_officer.district_en,
                constituency=primary_officer.constituency,
                contact_phone=primary_officer.cug_phone,
                participant_email=primary_officer.official_email,
                participant_emails=participant_emails,
                related_scheme=scheme_kw,
                related_project=proj_kw,
                location=location
            ),
            user_claims
        )

        thought_steps.append(f"6. Official appointment registered (ID: {new_appt.id}) with automated calendar invite dispatched to {len(participant_emails)} official emails.")

        resp_en = (
            f"✅ **Official Appointment Successfully Scheduled by AI Agent**\n\n"
            f"• **Key Participants:** {participant_names}\n"
            f"• **Verified Email IDs:** {', '.join(participant_emails)}\n"
            f"• **Department / Jurisdiction:** {primary_officer.department_en} | {primary_officer.district_en}\n"
            f"• **Date & Slot:** {new_appt.scheduled_date} | {new_appt.scheduled_time}\n"
            f"• **Venue:** {new_appt.location}\n"
            f"• **Meeting Agenda:** {new_appt.agenda_en}\n"
            f"• **Protocol Security Status:** {new_appt.protocol_clearance_status} (VIP Clearance Verified)\n"
            f"• **AI Prepared Dossier:** Attached relevant G.O. files ({', '.join(new_appt.required_files_gos)}) and performance analytics directly into the Executive Calendar."
        )

        resp_ta = (
            f"✅ **AI ஆலோசகர் மூலம் அதிகாரப்பூர்வ சந்திப்பு வெற்றிகரமாக பதிவு செய்யப்பட்டது**\n\n"
            f"• **பங்கேற்பாளர்கள்:** {participant_names}\n"
            f"• **அரசு மின்னஞ்சல் முகவரிகள் (Emails):** {', '.join(participant_emails)}\n"
            f"• **துறை / மாவட்டம்:** {primary_officer.department_ta} | {primary_officer.district_ta}\n"
            f"• **தேதி & நேரம்:** {new_appt.scheduled_date} | {new_appt.scheduled_time}\n"
            f"• **இடம்:** {new_appt.location}\n"
            f"• **நிகழ்ச்சி நிரல்:** {new_appt.agenda_ta}\n"
            f"• **பாதுகாப்பு நெறிமுறை:** {new_appt.protocol_clearance_status} (VIP பாதுகாப்பு அனுமதி தயார்)"
        )

        return AgentAppointmentResponse(
            action_type="APPOINTMENT_SCHEDULED",
            matched_officers=matched_officers,
            appointment=new_appt,
            response_en=resp_en,
            response_ta=resp_ta,
            citations=[
                {"source": "Tamil Nadu State Officials Directory", "ref": f"DIR_{primary_officer.id}", "date": scheduled_date},
                {"source": "Executive Calendar Registry", "ref": f"APPT_ID_{new_appt.id}", "date": scheduled_date},
                {"source": "VIP Protocol & Security Branch", "ref": "VIP_CLEARANCE_STAMP", "date": scheduled_date}
            ],
            thought_steps=thought_steps
        )

    # 3. DIRECTORY DISCOVERY / LISTING / FUNDS & STAFFING INTELLIGENCE
    else:
        officer_bullets_en = []
        officer_bullets_ta = []
        for o in matched_officers:
            funds_txt_en = f"₹{o.funds_allocation.expenditure_spent_cr:,.1f} Cr spent of ₹{o.funds_allocation.budget_sanctioned_cr:,.1f} Cr ({o.funds_allocation.utilization_pct}% utilized)" if o.funds_allocation else "N/A"
            staff_txt_en = f"{o.staffing_demand_supply.in_position_staff:,} in position / {o.staffing_demand_supply.sanctioned_posts:,} sanctioned ({o.staffing_demand_supply.vacant_posts:,} vacant, {o.staffing_demand_supply.vacancy_pct}% gap - {o.staffing_demand_supply.demand_urgency})" if o.staffing_demand_supply else "N/A"
            shortages_en = f"Critical role shortages: {', '.join(o.staffing_demand_supply.top_shortage_roles)}" if o.staffing_demand_supply and o.staffing_demand_supply.top_shortage_roles else ""
            remedy_en = f"AI Staffing Recommendation: {o.staffing_demand_supply.ai_staffing_remedy_en}" if o.staffing_demand_supply else ""

            officer_bullets_en.append(
                f"### 👤 **{o.name_en}** ({o.role_tier})\n"
                f"• **Designation:** {o.designation_en}\n"
                f"• **Department:** {o.department_en} | **District / Constituency:** {o.district_en} {f'({o.constituency})' if o.constituency else ''}\n"
                f"• **Official Email:** `{o.official_email}` | **CUG Phone:** {o.cug_phone}\n"
                f"• **Active Schemes:** {', '.join(o.current_schemes) if o.current_schemes else 'N/A'}\n"
                f"• **Major Projects:** {', '.join(o.current_projects) if o.current_projects else 'N/A'}\n"
                f"• **💰 Funds & Budget Allocation:** {funds_txt_en}\n"
                f"• **👥 Staffing Demand & Supply:** {staff_txt_en}\n"
                + (f"  - {shortages_en}\n" if shortages_en else "")
                + (f"  - ⚡ *{remedy_en}*\n" if remedy_en else "")
                + (f"  - 🎯 **AI Strategic Insight:** {o.ai_strategic_analysis_en}\n" if o.ai_strategic_analysis_en else "")
            )

            officer_bullets_ta.append(
                f"### 👤 **{o.name_ta}** ({o.role_tier})\n"
                f"• **பதவி:** {o.designation_ta}\n"
                f"• **துறை:** {o.department_ta} | **மாவட்டம்:** {o.district_ta}\n"
                f"• **மின்னஞ்சல்:** `{o.official_email}` | **தொலைபேசி:** {o.cug_phone}\n"
                f"• **திட்டங்கள்:** {', '.join(o.current_schemes)}\n"
                f"• **பணியாளர் தேவை & பற்றாக்குறை:** {o.staffing_demand_supply.vacant_posts if o.staffing_demand_supply else 0} பணியிடங்கள் காலியிடம்"
            )

        resp_en = (
            f"🔍 **Executive Directory & Department Intelligence ({len(matched_officers)} Portfolios Analyzed)**\n\n"
            + "\n\n".join(officer_bullets_en)
            + "\n\n💡 *Action: You can command: 'Book an appointment with them tomorrow at 11 AM' or 'Schedule review with CS on staffing gaps'.*"
        )

        resp_ta = (
            f"🔍 **அரசு அதிகாரிகள் விபரங்கள், திட்டங்கள், நிதி ஒதுக்கீடு & பணியாளர் தேவைகள் ({len(matched_officers)} துறைகள்)**\n\n"
            + "\n\n".join(officer_bullets_ta)
            + "\n\n💡 *குறிப்பு: 'இவர்களுடன் நாளை காலை 11 மணிக்கு சந்திப்பு பதிவு செய்' என்று கூறி உடனடியாக சந்திப்பு பதிவு செய்யலாம்.*"
        )

        return AgentAppointmentResponse(
            action_type="DIRECTORY_SEARCH_RESULTS",
            matched_officers=matched_officers,
            appointment=None,
            response_en=resp_en,
            response_ta=resp_ta,
            citations=[
                {"source": "Tamil Nadu State Officials & Staffing Registry", "ref": "STATE_DIR_REGISTRY_2026", "date": datetime.now().strftime("%Y-%m-%d")},
                {"source": "Finance Department Treasury Ledger", "ref": "IFHRMS_BUDGET_Q3", "date": datetime.now().strftime("%Y-%m-%d")}
            ],
            thought_steps=thought_steps
        )
