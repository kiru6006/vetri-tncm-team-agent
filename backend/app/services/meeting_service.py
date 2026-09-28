from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from app.schemas.meetings import (
    MeetingBriefingPack,
    MeetingAttendee,
    MeetingActionItem,
    MeetingCreateRequest
)


MEETINGS_DATABASE: List[MeetingBriefingPack] = [
    MeetingBriefingPack(
        meeting_id="mtg-cab-01",
        title_en="Cabinet Review on Mega Industrial Investments & Monsoon Preparedness",
        title_ta="மெகா தொழில் முதலீடுகள் மற்றும் பருவமழை தயார்நிலை குறித்த அமைச்சரவை ஆய்வு",
        meeting_type="CABINET",
        scheduled_time="Today, 11:30 AM (Secretariat Cabinet Room)",
        chairperson_name="Hon'ble Chief Minister",
        chairperson_designation="Chief Minister of Tamil Nadu",
        attendees=[
            MeetingAttendee(
                officer_id="off-cm-01",
                name_en="M. K. Stalin",
                name_ta="மு. க. ஸ்டாலின்",
                designation="Chief Minister",
                tier_role="CHIEF_MINISTER",
                status="CONFIRMED"
            ),
            MeetingAttendee(
                officer_id="off-cs-01",
                name_en="N. Muruganandam, IAS",
                name_ta="நா. முருகானந்தம், இ.ஆ.ப.",
                designation="Chief Secretary",
                tier_role="CHIEF_SECRETARY",
                status="CONFIRMED"
            ),
            MeetingAttendee(
                officer_id="off-ps-ind-01",
                name_en="V. Arun Roy, IAS",
                name_ta="வி. அருண் ராய், இ.ஆ.ப.",
                designation="Secretary, Industries & Investment",
                tier_role="PRINCIPAL_SECRETARY",
                status="CONFIRMED"
            ),
            MeetingAttendee(
                officer_id="off-ps-rev-01",
                name_en="P. Amudha, IAS",
                name_ta="பி. அமுதா, இ.ஆ.ப.",
                designation="Principal Secretary, Revenue & Disaster",
                tier_role="PRINCIPAL_SECRETARY",
                status="CONFIRMED"
            )
        ],
        agenda_items=[
            "1. Special Incentive Package for Phase 2 Semiconductor Fab (₹4,800 Cr capex)",
            "2. Monsoon Disaster Mitigation Infrastructure: Approval of ₹620 Cr emergency fund allocation",
            "3. Progress review on Chennai Metro Phase 2 underground tunneling corridor",
            "4. Resolution of inter-departmental forest clearance for Western Ghats power lines"
        ],
        ai_pre_briefing_en=(
            "AI Pre-Briefing: 3 Global proposals (Semiconductor Fab, EV Battery Line, Green Hydrogen) are awaiting "
            "SIPCOT land allotment and 15% power tariff concessions totaling ₹4,800 Cr. Expected direct employment is 14,200. "
            "Monsoon preparedness across 38 districts shows 96% desilting completion; Cuddalore and Nagapattinam require extra SDRF battalion deployment."
        ),
        ai_pre_briefing_ta=(
            "AI முன் தயாரிப்பு சுருக்கம்: குறைக்கடத்தி தொழிற்சாலை மற்றும் மின்வாகன பேட்டரி உட்பட 3 முக்கிய திட்டங்களுக்கு ₹4,800 கோடி முதலீட்டில் "
            "சிப்காட் நில ஒதுக்கீடு மற்றும் 15% மின் கட்டண சலுகை அமைச்சரவை ஒப்புதலுக்காக உள்ளது. இதன் மூலம் 14,200 நேரடி வேலைவாய்ப்புகள் உருவாகும். "
            "பருவமழை தயார்நிலையில் 96% தூர்வாரும் பணிகள் முடிவடைந்துள்ளன; கடலூர், நாகப்பட்டினத்திற்கு கூடுதல் பேரிடர் மீட்பு படை தேவை."
        ),
        key_risks_flagged=[
            "Power grid transmission capacity at Hosur SIPCOT needs synchronization with TANGEDCO by Q1 2027.",
            "Orange rainfall alert in coastal delta districts may coincide with early Kuruvai harvest operations."
        ],
        historical_decisions=[
            "Cabinet approved SIPCOT Mega EV Industrial Park Policy in Q1 2026.",
            "Sanctioned ₹412 Cr for Kosasthalaiyar Basin drainage network in MAWS review."
        ],
        suggested_decision_options=[
            {
                "option_code": "APPROVE_FULL_INCENTIVE",
                "label_en": "Approve complete Special Incentive Package (Capital Subsidy + 15% Power Tariff offset)",
                "label_ta": "முழு சிறப்பு ஊக்கத்தொகை தொகுப்பிற்கு ஒப்புதல் அளிக்கவும்",
                "fiscal_impact": "₹720 Cr over 5 years",
                "recommended": True
            },
            {
                "option_code": "PHASED_ALLOTMENT",
                "label_en": "Sanction land allotment immediately; defer power subsidy to commercial production milestone",
                "label_ta": "நில ஒதுக்கீட்டிற்கு உடனடியாக ஒப்புதல் வழங்கி மின் சலுகையை வணிக உற்பத்திக்கு பின் பரிசீலிக்கவும்",
                "fiscal_impact": "₹380 Cr initial phase",
                "recommended": False
            }
        ],
        auto_generated_minutes_en=(
            "Minutes of Meeting: Hon'ble Chief Minister chaired the Cabinet session. "
            "1. Cabinet unanimously approved the Special Incentive Package for the ₹4,800 Cr Semiconductor Fab line in Krishnagiri. "
            "2. Sanctioned ₹620 Cr emergency monsoon mitigation allocation under SDRF. "
            "3. Chief Secretary directed to convene weekly project monitoring bench on delayed road bypasses."
        ),
        auto_generated_minutes_ta=(
            "கூட்ட நடவடிக்கைகள்: மாண்புமிகு முதலமைச்சர் தலைமையில் அமைச்சரவைக் கூட்டம் நடைபெற்றது. "
            "1. கிருஷ்ணகிரியில் ₹4,800 கோடி குறைக்கடத்தி தொழிற்சாலைக்கான சிறப்பு ஊக்கத்தொகை தொகுப்பிற்கு அமைச்சரவை ஒப்புதல் அளித்தது. "
            "2. பேரிடர் நிவாரண நிதியின் கீழ் ₹620 கோடி அவசர பருவமழை நிதி ஒதுக்கீட்டிற்கு ஒப்புதல் வழங்கப்பட்டது. "
            "3. தாமதமான சாலை திட்டங்களை வாரந்தோறும் கண்காணிக்க தலைமைச் செயலாளருக்கு உத்தரவிடப்பட்டது."
        ),
        action_items=[
            MeetingActionItem(
                id="act-mtg-01",
                meeting_id="mtg-cab-01",
                task_en="Issue Government Order (G.O. Ms) for Semiconductor Fab Special Package",
                task_ta="குறைக்கடத்தி தொழிற்சாலை சிறப்பு சலுகைக்கான அரசாணை வெளியிடவும்",
                responsible_officer_name="V. Arun Roy, IAS",
                responsible_officer_designation="Secretary, Industries",
                deadline="Today, 18:00 hrs",
                status="IN_PROGRESS"
            ),
            MeetingActionItem(
                id="act-mtg-02",
                meeting_id="mtg-cab-01",
                task_en="Station 4 SDRF Battalions in Cuddalore and Nagapattinam coastal centers",
                task_ta="கடலூர் மற்றும் நாகப்பட்டினத்தில் 4 பேரிடர் மீட்பு படைகளை நிலைநிறுத்தவும்",
                responsible_officer_name="P. Amudha, IAS",
                responsible_officer_designation="Principal Secretary, Revenue",
                deadline="Oct 01, 2026",
                status="PENDING"
            )
        ]
    ),
    MeetingBriefingPack(
        meeting_id="mtg-col-02",
        title_en="Quarterly 38-District Collectors Review on Flagship Schemes & Land Records",
        title_ta="38 மாவட்ட ஆட்சித்தலைவர்கள் காலாண்டு திட்ட ஆய்வு மற்றும் நில ஆவண மறுசீராய்வு",
        meeting_type="COLLECTOR_REVIEW",
        scheduled_time="Tomorrow, 10:00 AM (Video Conference)",
        chairperson_name="Chief Secretary to Government",
        chairperson_designation="Chief Secretary",
        attendees=[
            MeetingAttendee(
                officer_id="off-cs-01",
                name_en="N. Muruganandam, IAS",
                name_ta="நா. முருகானந்தம், இ.ஆ.ப.",
                designation="Chief Secretary",
                tier_role="CHIEF_SECRETARY",
                status="CONFIRMED"
            ),
            MeetingAttendee(
                officer_id="off-col-cbe-01",
                name_en="Krasthi Kumar Pati, IAS",
                name_ta="கிராந்தி குமார் பாடி, இ.ஆ.ப.",
                designation="Collector, Coimbatore",
                tier_role="DISTRICT_COLLECTOR",
                status="CONFIRMED"
            )
        ],
        agenda_items=[
            "1. 100% saturation review of Kalaignar Magalir Urimai Thittam across rural wards",
            "2. Patta transfer pendency clearance & digitizing 45,000 FMB sketches",
            "3. Monday Public Grievance Day 48-hour SLA compliance rate"
        ],
        ai_pre_briefing_en=(
            "AI Pre-Briefing: KMUT scheme delivery is at 99.8% statewide. Top performing districts: Coimbatore (99.9%), "
            "Madurai (99.8%). Bottom 3 districts requiring review: Ariyalur (97.4%), Perambalur (97.8%), Tenkasi (98.1%). "
            "Land Patta transfer backlog exceeds 30 days in 14 taluks."
        ),
        ai_pre_briefing_ta=(
            "AI முன் தயாரிப்பு சுருக்கம்: மகளிர் உரிமைத் திட்டம் 99.8% பயனாளிகளை சென்றடைந்துள்ளது. சிறந்த மாவட்டங்கள்: கோவை, மதுரை. "
            "கவனிக்க வேண்டிய மாவட்டங்கள்: அரியலூர், பெரம்பலூர், தென்காசி. 14 தாலுகாக்களில் பட்டா மாறுதல் நிலுவை 30 நாட்களுக்கு மேல் உள்ளது."
        ),
        key_risks_flagged=[
            "14 taluk offices report server bandwidth lag during peak e-Sevai hours."
        ],
        historical_decisions=[
            "CS mandated zero paper pendency for sub-division pattas by Q3 2026."
        ],
        suggested_decision_options=[],
        auto_generated_minutes_en=None,
        auto_generated_minutes_ta=None,
        action_items=[]
    )
]


async def get_all_meetings() -> List[MeetingBriefingPack]:
    return MEETINGS_DATABASE


async def get_meeting_briefing_pack(meeting_id: str) -> Optional[MeetingBriefingPack]:
    for m in MEETINGS_DATABASE:
        if m.meeting_id == meeting_id:
            return m
    return MEETINGS_DATABASE[0]


async def create_new_meeting(req: MeetingCreateRequest, organizer_claims: Dict[str, Any]) -> MeetingBriefingPack:
    organizer_name = organizer_claims.get("name_en", "Executive Officer")
    organizer_desig = organizer_claims.get("role", "CHIEF_SECRETARY")

    new_mtg = MeetingBriefingPack(
        meeting_id=f"mtg-{int(datetime.now(timezone.utc).timestamp())}",
        title_en=req.title_en,
        title_ta=req.title_ta,
        meeting_type=req.meeting_type,
        scheduled_time=req.scheduled_time,
        chairperson_name=organizer_name,
        chairperson_designation=organizer_desig,
        attendees=[
            MeetingAttendee(
                officer_id=organizer_claims.get("id", "user-id"),
                name_en=organizer_name,
                name_ta=organizer_claims.get("name_ta", organizer_name),
                designation=organizer_desig,
                tier_role=organizer_desig,
                status="CONFIRMED"
            )
        ],
        agenda_items=req.agenda_items,
        ai_pre_briefing_en=f"AI synthesized briefing dossier for '{req.title_en}'. Pulling real-time telemetry from relevant line departments.",
        ai_pre_briefing_ta=f"'{req.title_ta}' கூட்டத்திற்கான AI சுருக்கம் மற்றும் துறை ரீதியான தரவுகள் தொகுக்கப்பட்டுள்ளன.",
        key_risks_flagged=["Pending inter-departmental concurrence"],
        historical_decisions=["Previous review decisions compiled in VETTRI registry."],
        suggested_decision_options=[],
        auto_generated_minutes_en=None,
        auto_generated_minutes_ta=None,
        action_items=[]
    )

    MEETINGS_DATABASE.append(new_mtg)
    return new_mtg
