from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from app.schemas.chat import ChatRoom, ChatMessage, ChatSummaryResponse


CHAT_ROOMS_SEED: List[ChatRoom] = [
    ChatRoom(
        id="room-cab-01",
        name_en="Cabinet Executive Core",
        name_ta="அமைச்சரவை தலைமை நிர்வாகக் குழு",
        room_type="CABINET",
        department_code="EXECUTIVE",
        district_code=None,
        unread_count=2,
        last_message_snippet="Chief Secretary: Draft Cabinet Note for Semiconductor Fab Incentive ready.",
        last_message_time="10:45 AM",
        members_count=35,
        is_encrypted=True
    ),
    ChatRoom(
        id="room-coll-02",
        name_en="All 38 District Collectors Network",
        name_ta="38 மாவட்ட ஆட்சித்தலைவர்கள் வலையமைப்பு",
        room_type="ALL_COLLECTORS",
        department_code="REV",
        district_code=None,
        unread_count=5,
        last_message_snippet="CS Muruganandam: Review e-Office pendency rates and submit compliance by 17:00.",
        last_message_time="11:15 AM",
        members_count=42,
        is_encrypted=True
    ),
    ChatRoom(
        id="room-disaster-03",
        name_en="Coastal Monsoon & Flood Response Taskforce",
        name_ta="கடலோர பருவமழை & வெள்ள தடுப்பு பணிக் குழு",
        room_type="DISTRICT_DISASTER",
        department_code="REV_DISASTER",
        district_code="CUD",
        unread_count=0,
        last_message_snippet="Collector Cuddalore: 120 Multi-purpose Cyclone Shelters inspected and powered.",
        last_message_time="09:30 AM",
        members_count=18,
        is_encrypted=True
    ),
    ChatRoom(
        id="room-health-04",
        name_en="Health Dept & TNMSC Drug Supply Core",
        name_ta="மக்கள் நல்வாழ்வு & மருந்து விநியோக கட்டுப்பாட்டு அறை",
        room_type="DEPARTMENT",
        department_code="HLT",
        district_code=None,
        unread_count=1,
        last_message_snippet="PS Health: Emergency dispatch of anti-venom & ORS to delta coastal PHCs confirmed.",
        last_message_time="08:50 AM",
        members_count=24,
        is_encrypted=True
    )
]

MESSAGES_DB: Dict[str, List[ChatMessage]] = {
    "room-cab-01": [
        ChatMessage(
            id="msg-cab-01",
            room_id="room-cab-01",
            sender_id="off-cm-01",
            sender_name_en="Hon'ble Chief Minister",
            sender_name_ta="மாண்புமிகு முதலமைச்சர்",
            sender_designation="Chief Minister",
            sender_role="CHIEF_MINISTER",
            content_en="Chief Secretary, ensure all departments have prepared monsoon preparedness files for today's Cabinet review.",
            content_ta="தலைமைச் செயலாளர் அவர்களே, இன்றைய அமைச்சரவை ஆய்வுக்கு அனைத்து துறைகளும் பருவமழை தயார்நிலை கோப்புகளை தயார் செய்துள்ளதை உறுதிப்படுத்தவும்.",
            message_type="TEXT",
            is_priority=True,
            timestamp="10:30 AM"
        ),
        ChatMessage(
            id="msg-cab-02",
            room_id="room-cab-01",
            sender_id="off-cs-01",
            sender_name_en="N. Muruganandam, IAS",
            sender_name_ta="நா. முருகானந்தம், இ.ஆ.ப.",
            sender_designation="Chief Secretary",
            sender_role="CHIEF_SECRETARY",
            content_en="Respected Sir, all 38 Collectors and line departments (MAWS, PWD, TANGEDCO, Health) have submitted checklists. Draft Cabinet Note for Semiconductor Fab Incentive is also uploaded.",
            content_ta="மதிப்பிற்குரிய ஐயா, 38 மாவட்ட ஆட்சியர்கள் மற்றும் துறைகளின் சரிபார்ப்பு பட்டியல்கள் சமர்ப்பிக்கப்பட்டுள்ளன. குறைக்கடத்தி தொழிற்சாலை ஊக்குவிப்பு அமைச்சரவை குறிப்பும் பதிவேற்றப்பட்டுள்ளது.",
            message_type="TEXT",
            attachment_name="Cabinet_Note_Semiconductor_SIPCOT_2026.pdf",
            attachment_url="https://storage.vettri.tn.gov.in/cabinet/note_semi_2026.pdf",
            is_pinned=True,
            timestamp="10:45 AM"
        )
    ],
    "room-coll-02": [
        ChatMessage(
            id="msg-col-01",
            room_id="room-coll-02",
            sender_id="off-cs-01",
            sender_name_en="N. Muruganandam, IAS",
            sender_name_ta="நா. முருகானந்தம், இ.ஆ.ப.",
            sender_designation="Chief Secretary",
            sender_role="CHIEF_SECRETARY",
            content_en="All Collectors: Ensure Monday Public Grievance Day petitions received today are digitized into VETTRI by 18:00 hrs without fail.",
            content_ta="அனைத்து ஆட்சியர்களுக்கும்: இன்று பெறப்பட்ட மக்கள் குறைதீர்க்கும் மனுக்கள் மாலை 6 மணிக்குள் வெற்றி தளத்தில் பதிவேற்றம் செய்யப்பட வேண்டும்.",
            message_type="TEXT",
            is_priority=True,
            timestamp="11:15 AM"
        ),
        ChatMessage(
            id="msg-col-02",
            room_id="room-coll-02",
            sender_id="off-col-cbe-01",
            sender_name_en="Krasthi Kumar Pati, IAS",
            sender_name_ta="கிராந்தி குமார் பாடி, இ.ஆ.ப.",
            sender_designation="District Collector, Coimbatore",
            sender_role="DISTRICT_COLLECTOR",
            content_en="Coimbatore Collectorate: 184 petitions received and 100% tokenized. Taluk-wise spot triage initiated with Tahsildars.",
            content_ta="கோவை ஆட்சியரகம்: 184 மனுக்கள் பெறப்பட்டு டோக்கன் வழங்கப்பட்டது. வட்டாட்சியர்களுடன் தாலுகா வாரியான தீர்வு தொடங்கப்பட்டுள்ளது.",
            message_type="TEXT",
            timestamp="11:30 AM"
        )
    ]
}


async def get_all_chat_rooms() -> List[ChatRoom]:
    return CHAT_ROOMS_SEED


async def get_room_messages(room_id: str) -> List[ChatMessage]:
    return MESSAGES_DB.get(room_id, [])


async def send_chat_message(room_id: str, sender_claims: Dict[str, Any], content: str, is_priority: bool = False) -> ChatMessage:
    sender_name = sender_claims.get("name_en", "Executive Officer")
    sender_role = sender_claims.get("role", "ANALYST")
    
    msg = ChatMessage(
        id=f"msg-{int(datetime.now(timezone.utc).timestamp())}",
        room_id=room_id,
        sender_id=sender_claims.get("id", "user-id"),
        sender_name_en=sender_name,
        sender_name_ta=sender_claims.get("name_ta", sender_name),
        sender_designation=sender_role,
        sender_role=sender_role,
        content_en=content,
        content_ta=content,
        message_type="TEXT",
        is_priority=is_priority,
        timestamp=datetime.now(timezone.utc).strftime("%I:%M %p")
    )

    if room_id not in MESSAGES_DB:
        MESSAGES_DB[room_id] = []
    MESSAGES_DB[room_id].append(msg)
    return msg


async def summarize_chat_room(room_id: str) -> ChatSummaryResponse:
    messages = MESSAGES_DB.get(room_id, [])
    
    if room_id == "room-cab-01":
        summary_en = "Cabinet discussed statewide monsoon readiness and reviewed SIPCOT semiconductor fab incentive packages."
        summary_ta = "அமைச்சரவை மாநில மழைக்கால தயார்நிலை குறித்து விவாதித்தது மற்றும் சிப்காட் குறைக்கடத்தி மானிய தொகுப்பை ஆய்வு செய்தது."
        decisions = [
            "Mandated 100% checklist submission for storm drainage from all line departments.",
            "Prepared Cabinet clearance for ₹4,800 Cr semiconductor incentive package."
        ]
        actions = [
            {"task": "Submit drainage checklist", "assignee": "Principal Secretary, MAWS", "deadline": "Today 16:00"},
            {"task": "Prepare Fab Allotment Order", "assignee": "SIPCOT MD", "deadline": "Oct 01"}
        ]
    else:
        summary_en = "Administrative instructions issued on Monday grievance petition digitization and spot clearance."
        summary_ta = "திங்கள் குறைதீர்க்கும் மனுக்களை டிஜிட்டல் மயமாக்குதல் மற்றும் உடனடி தீர்வு காண நிர்வாக உத்தரவுகள் பிறப்பிக்கப்பட்டன."
        decisions = ["Mandated all 38 districts to digitize petitions before 18:00 hrs."]
        actions = [{"task": "Complete petition tokenization", "assignee": "All 38 District Collectors", "deadline": "Today 18:00"}]

    return ChatSummaryResponse(
        room_id=room_id,
        room_name=room_id,
        total_messages_analyzed=len(messages),
        summary_en=summary_en,
        summary_ta=summary_ta,
        key_decisions=decisions,
        derived_action_items=actions
    )
