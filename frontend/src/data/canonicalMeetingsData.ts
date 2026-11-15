import { MeetingBriefingPack, CalendarAppointment } from '../types';

export const CANONICAL_MEETINGS: MeetingBriefingPack[] = [
  {
    meeting_id: "mtg-cab-01",
    title_en: "Cabinet Review on Mega Industrial Investments & Monsoon Preparedness",
    title_ta: "மெகா தொழில் முதலீடுகள் மற்றும் பருவமழை தயார்நிலை குறித்த அமைச்சரவை ஆய்வு",
    meeting_type: "CABINET",
    scheduled_time: "Today, 11:30 AM (Secretariat Cabinet Room)",
    chairperson_name: "Hon'ble Chief Minister",
    chairperson_designation: "Chief Minister of Tamil Nadu",
    attendees: [
      {
        officer_id: "off-cm-01",
        name_en: "Hon'ble Chief Minister",
        name_ta: "மாண்புமிகு முதலமைச்சர்",
        designation: "Chief Minister",
        tier_role: "CHIEF_MINISTER",
        status: "CONFIRMED"
      },
      {
        officer_id: "off-cs-01",
        name_en: "Dr. M. Sai Kumar, IAS",
        name_ta: "முனைவர் எம். சாய் குமார், இ.ஆ.ப.",
        designation: "Chief Secretary",
        tier_role: "CHIEF_SECRETARY",
        status: "CONFIRMED"
      },
      {
        officer_id: "off-ps-ind-01",
        name_en: "V. Arun Roy, IAS",
        name_ta: "வி. அருண் ராய், இ.ஆ.ப.",
        designation: "Secretary, Industries & Investment",
        tier_role: "PRINCIPAL_SECRETARY",
        status: "CONFIRMED"
      },
      {
        officer_id: "off-ps-rev-01",
        name_en: "P. Amudha, IAS",
        name_ta: "பி. அமுதா, இ.ஆ.ப.",
        designation: "Principal Secretary, Revenue & Disaster",
        tier_role: "PRINCIPAL_SECRETARY",
        status: "CONFIRMED"
      }
    ],
    agenda_items: [
      "1. Special Incentive Package for Phase 2 Semiconductor Fab (₹4,800 Cr capex)",
      "2. Monsoon Disaster Mitigation Infrastructure: Approval of ₹620 Cr emergency fund allocation",
      "3. Progress review on Chennai Metro Phase 2 underground tunneling corridor",
      "4. Resolution of inter-departmental forest clearance for Western Ghats power lines"
    ],
    ai_pre_briefing_en: "AI Pre-Briefing: 3 Global proposals (Semiconductor Fab, EV Battery Line, Green Hydrogen) are awaiting SIPCOT land allotment and 15% power tariff concessions totaling ₹4,800 Cr. Expected direct employment is 14,200. Monsoon preparedness across 38 districts shows 96% desilting completion; Cuddalore and Nagapattinam require extra SDRF battalion deployment.",
    ai_pre_briefing_ta: "AI முன் தயாரிப்பு சுருக்கம்: குறைக்கடத்தி தொழிற்சாலை மற்றும் மின்வாகன பேட்டரி உட்பட 3 முக்கிய திட்டங்களுக்கு ₹4,800 கோடி முதலீட்டில் சிப்காட் நில ஒதுக்கீடு மற்றும் 15% மின் கட்டண சலுகை அமைச்சரவை ஒப்புதலுக்காக உள்ளது. இதன் மூலம் 14,200 நேரடி வேலைவாய்ப்புகள் உருவாகும். பருவமழை தயார்நிலையில் 96% தூர்வாரும் பணிகள் முடிவடைந்துள்ளன; கடலூர், நாகப்பட்டினத்திற்கு கூடுதல் பேரிடர் மீட்பு படை தேவை.",
    key_risks_flagged: [
      "Power grid transmission capacity at Hosur SIPCOT needs synchronization with TANGEDCO by Q1 2027.",
      "Orange rainfall alert in coastal delta districts may coincide with early Kuruvai harvest operations."
    ],
    historical_decisions: [
      "Cabinet approved SIPCOT Mega EV Industrial Park Policy in Q1 2026.",
      "Sanctioned ₹412 Cr for Kosasthalaiyar Basin drainage network in MAWS review."
    ],
    suggested_decision_options: [
      {
        option_code: "APPROVE_FULL_INCENTIVE",
        label_en: "Approve complete Special Incentive Package (Capital Subsidy + 15% Power Tariff offset)",
        label_ta: "முழு சிறப்பு ஊக்கத்தொகை தொகுப்பிற்கு ஒப்புதல் அளிக்கவும்",
        fiscal_impact: "₹720 Cr over 5 years",
        recommended: true
      },
      {
        option_code: "PHASED_ALLOTMENT",
        label_en: "Sanction land allotment immediately; defer power subsidy to commercial production milestone",
        label_ta: "நில ஒதுக்கீட்டிற்கு உடனடியாக ஒப்புதல் வழங்கி மின் சலுகையை வணிக உற்பத்திக்கு பின் பரிசீலிக்கவும்",
        fiscal_impact: "₹380 Cr initial phase",
        recommended: false
      }
    ],
    auto_generated_minutes_en: "Minutes of Meeting: Hon'ble Chief Minister chaired the Cabinet session. 1. Cabinet unanimously approved the Special Incentive Package for the ₹4,800 Cr Semiconductor Fab line in Krishnagiri. 2. Sanctioned ₹620 Cr emergency monsoon mitigation allocation under SDRF. 3. Chief Secretary directed to convene weekly project monitoring bench on delayed road bypasses.",
    auto_generated_minutes_ta: "கூட்ட நடவடிக்கைகள்: மாண்புமிகு முதலமைச்சர் தலைமையில் அமைச்சரவைக் கூட்டம் நடைபெற்றது. 1. கிருஷ்ணகிரியில் ₹4,800 கோடி குறைக்கடத்தி தொழிற்சாலைக்கான சிறப்பு ஊக்கத்தொகை தொகுப்பிற்கு அமைச்சரவை ஒப்புதல் அளித்தது. 2. பேரிடர் நிவாரண நிதியின் கீழ் ₹620 கோடி அவசர பருவமழை நிதி ஒதுக்கீட்டிற்கு ஒப்புதல் வழங்கப்பட்டது. 3. தாமதமான சாலை திட்டங்களை வாரந்தோறும் கண்காணிக்க தலைமைச் செயலாளருக்கு உத்தரவிடப்பட்டது.",
    action_items: [
      {
        id: "act-mtg-01",
        meeting_id: "mtg-cab-01",
        task_en: "Issue Government Order (G.O. Ms) for Semiconductor Fab Special Package",
        task_ta: "குறைக்கடத்தி தொழிற்சாலை சிறப்பு சலுகைக்கான அரசாணை வெளியிடவும்",
        responsible_officer_name: "V. Arun Roy, IAS",
        responsible_officer_designation: "Secretary, Industries",
        deadline: "Today, 18:00 hrs",
        status: "IN_PROGRESS"
      },
      {
        id: "act-mtg-02",
        meeting_id: "mtg-cab-01",
        task_en: "Station 4 SDRF Battalions in Cuddalore and Nagapattinam coastal centers",
        task_ta: "கடலூர் மற்றும் நாகப்பட்டினத்தில் 4 பேரிடர் மீட்பு படைகளை நிலைநிறுத்தவும்",
        responsible_officer_name: "P. Amudha, IAS",
        responsible_officer_designation: "Principal Secretary, Revenue",
        deadline: "Oct 01, 2026",
        status: "PENDING"
      }
    ]
  },
  {
    meeting_id: "mtg-col-02",
    title_en: "Quarterly 38-District Collectors Review on Flagship Schemes & Land Records",
    title_ta: "38 மாவட்ட ஆட்சித்தலைவர்கள் காலாண்டு திட்ட ஆய்வு மற்றும் நில ஆவண மறுசீராய்வு",
    meeting_type: "COLLECTOR_REVIEW",
    scheduled_time: "Tomorrow, 10:00 AM (Video Conference)",
    chairperson_name: "Chief Secretary to Government",
    chairperson_designation: "Chief Secretary",
    attendees: [
      {
        officer_id: "off-cs-01",
        name_en: "Dr. M. Sai Kumar, IAS",
        name_ta: "முனைவர் எம். சாய் குமார், இ.ஆ.ப.",
        designation: "Chief Secretary",
        tier_role: "CHIEF_SECRETARY",
        status: "CONFIRMED"
      },
      {
        officer_id: "off-col-cbe-01",
        name_en: "Thiru Pavankumar G Giriyappanavar, IAS.,",
        name_ta: "திரு பவன்குமார் ஜி கிரியப்பனவர், இ.ஆ.ப.",
        designation: "Collector, Coimbatore",
        tier_role: "DISTRICT_COLLECTOR",
        status: "CONFIRMED"
      }
    ],
    agenda_items: [
      "1. 100% saturation review of Kalaignar Magalir Urimai Thittam across rural wards",
      "2. Patta transfer pendency clearance & digitizing 45,000 FMB sketches",
      "3. Monday Public Grievance Day 48-hour SLA compliance rate"
    ],
    ai_pre_briefing_en: "AI Pre-Briefing: KMUT scheme delivery is at 99.8% statewide. Top performing districts: Coimbatore (99.9%), Madurai (99.8%). Bottom 3 districts requiring review: Ariyalur (97.4%), Perambalur (97.8%), Tenkasi (98.1%). Land Patta transfer backlog exceeds 30 days in 14 taluks.",
    ai_pre_briefing_ta: "AI முன் தயாரிப்பு சுருக்கம்: மகளிர் உரிமைத் திட்டம் 99.8% பயனாளிகளை சென்றடைந்துள்ளது. சிறந்த மாவட்டங்கள்: கோவை, மதுரை. கவனிக்க வேண்டிய மாவட்டங்கள்: அரியலூர், பெரம்பலூர், தென்காசி. 14 தாலுகாக்களில் பட்டா மாறுதல் நிலுவை 30 நாட்களுக்கு மேல் உள்ளது.",
    key_risks_flagged: [
      "14 taluk offices report server bandwidth lag during peak e-Sevai hours."
    ],
    historical_decisions: [
      "CS mandated zero paper pendency for sub-division pattas by Q3 2026."
    ],
    suggested_decision_options: [],
    auto_generated_minutes_en: undefined,
    auto_generated_minutes_ta: undefined,
    action_items: []
  }
];

export const CANONICAL_CALENDAR_APPOINTMENTS: CalendarAppointment[] = [
  {
    id: "appt-cm-01",
    title_en: "Quarterly Irrigation & Kuruvai Water Inflow Review with Delta MLAs",
    title_ta: "டெல்டா தொகுதி சட்டமன்ற உறுப்பினர்களுடன் குறுவை பாசன நீர் மறுசீராய்வு கூட்டம்",
    appointment_type: "MLA_DELEGATION",
    scheduled_date: new Date().toISOString().split('T')[0],
    scheduled_time: "10:00 AM - 10:45 AM",
    duration_minutes: 45,
    location: "Chief Minister's Secretariat Chamber, Fort St. George",
    status: "CONFIRMED",
    priority: "CRITICAL",
    host_name: "Hon'ble Chief Minister",
    host_role: "CHIEF_MINISTER",
    participant_name_en: "Thiruvaiyaru & Mannargudi MLA Delegation",
    participant_name_ta: "திருவையாறு & மன்னார்குடி சட்டமன்ற உறுப்பினர்கள் குழு",
    participant_designation: "Members of Legislative Assembly (MLAs)",
    participant_role: "MLA",
    participant_department: "Water Resources & Agriculture",
    participant_district: "Thanjavur & Tiruvarur",
    participant_contact: "+91 94433 12091",
    participant_email: "mla.thiruvaiyaru@tnassembly.gov.in",
    participant_emails: ["mla.thiruvaiyaru@tnassembly.gov.in", "mla.mannargudi@tnassembly.gov.in"],
    agenda_en: "Request for staggered release of 15,000 cusecs from Mettur dam for tail-end delta canals in Vennar sub-basin.",
    agenda_ta: "வெண்ணாறு உபவடிநிலத்தில் கடைமடை பாசன கால்வாய்களுக்கு மேட்டூரிலிருந்து 15,000 கனஅடி நீர் திறக்க கோரிக்கை.",
    ai_prepared_notes_en: "Mettur reservoir storage at 68.4 ft (31.2 TMC). Tail-end reaches in Tiruvarur have 12% moisture deficit. Releasing 15,000 cusecs for 6 days is hydrologically sustainable.",
    ai_prepared_notes_ta: "மேட்டூர் அணை நீர் இருப்பு 68.4 அடி. திருவாரூர் கடைமடை பகுதியில் 12% ஈரப்பதம் குறைவு. 6 நாட்களுக்கு 15,000 கனஅடி நீர் திறப்பு சாத்தியமானது.",
    historical_decisions_context: ["Special Kuruvai Cultivation Package G.O. Ms No. 84 sanctioned in June 2026."],
    required_files_gos: ["G.O. (Ms) No. 84 - WRD Delta Water Schedule"],
    protocol_clearance_status: "VIP_SECURITY"
  },
  {
    id: "appt-cm-02",
    title_en: "High-Level Briefing on Semiconductor Fab Land Allotment & Power Substation",
    title_ta: "குறைக்கடத்தி தொழிற்சாலை நில ஒதுக்கீடு மற்றும் மின் துணை நிலையம் குறித்த உயர்மட்ட கூட்டம்",
    appointment_type: "SECRETARY_BRIEFING",
    scheduled_date: new Date().toISOString().split('T')[0],
    scheduled_time: "11:30 AM - 12:15 PM",
    duration_minutes: 45,
    location: "Cabinet Room, 2nd Floor, Secretariat",
    status: "CONFIRMED",
    priority: "HIGH",
    host_name: "Hon'ble Chief Minister",
    host_role: "CHIEF_MINISTER",
    participant_name_en: "V. Arun Roy, IAS & Rajesh Lakhoni, IAS",
    participant_name_ta: "வி. அருண் ராய், இ.ஆ.ப. & ராஜேஷ் லக்கானி, இ.ஆ.ப.",
    participant_designation: "Principal Secretary Industries & CMD TANGEDCO",
    participant_role: "PRINCIPAL_SECRETARY",
    participant_department: "Industries & Energy",
    participant_district: "Krishnagiri (Hosur)",
    participant_contact: "+91 44 2567 1822",
    participant_email: "indsec@tn.gov.in",
    participant_emails: ["indsec@tn.gov.in", "cmd@tnebnet.org"],
    agenda_en: "Review SIPCOT Krishnagiri 400kV dedicated transmission line timeline and Cabinet Incentive Note.",
    agenda_ta: "சிப்காட் ஓசூர் 400kV பிரத்யேக மின்பாதை கால அட்டவணை மற்றும் அமைச்சரவை சலுகைக் குறிப்பு ஆய்வு.",
    ai_prepared_notes_en: "₹4,800 Cr Mega Semiconductor project requires 120 MW continuous un-interrupted power. TANGEDCO substation civil work is at 74% completion.",
    ai_prepared_notes_ta: "₹4,800 கோடி திட்டத்திற்கு 120 மெகாவாட் தடையற்ற மின்சாரம் தேவை. மின்வாரிய துணை நிலைய பணிகள் 74% முடிவடைந்துள்ளன.",
    historical_decisions_context: ["Cabinet approved Tamil Nadu Semiconductor Policy 2024."],
    required_files_gos: ["Draft Cabinet Note - SIPCOT Allotment 2026"],
    protocol_clearance_status: "VERIFIED"
  },
  {
    id: "appt-cm-03",
    title_en: "Review with District Collector & SP Coimbatore on Western Ring Road Land Acquisition",
    title_ta: "மேற்கு புறவழிச்சாலை நில எடுப்பு தொடர்பாக கோவை மாவட்ட ஆட்சியர் & எஸ்.பி உடனான ஆய்வு",
    appointment_type: "SECRETARY_BRIEFING",
    scheduled_date: new Date().toISOString().split('T')[0],
    scheduled_time: "03:00 PM - 03:45 PM",
    duration_minutes: 45,
    location: "Chief Minister's Video Conference Suite",
    status: "CONFIRMED",
    priority: "HIGH",
    host_name: "Hon'ble Chief Minister",
    host_role: "CHIEF_MINISTER",
    participant_name_en: "Thiru Pavankumar G Giriyappanavar, IAS., & K. Karthikeyan, IPS",
    participant_name_ta: "திரு பவன்குமார் ஜி கிரியப்பனவர், இ.ஆ.ப. & கே. கார்த்திகேயன், இ.கா.ப.",
    participant_designation: "District Collector & SP, Coimbatore",
    participant_role: "GROUP_1",
    participant_department: "Revenue & Police",
    participant_district: "Coimbatore",
    participant_contact: "+91 422 2301114",
    participant_email: "collrcoi@nic.in",
    participant_emails: ["collrcoi@nic.in", "sp.cbe@tnpolice.gov.in"],
    agenda_en: "Resolving 485-acre land compensation distribution and highway widening traffic diversions.",
    agenda_ta: "485 ஏக்கர் நில இழப்பீடு வழங்கல் மற்றும் சாலை விரிவாக்க போக்குவரத்து மாற்றங்கள் குறித்து ஆய்வு.",
    ai_prepared_notes_en: "Special Lok Adalat bench settled 92% of landowner claims. Remaining 8% under fast-track scrutiny.",
    ai_prepared_notes_ta: "சிறப்பு லோக் அதாலத் மூலம் 92% நில உரிமையாளர்களுக்கு தீர்வு காணப்பட்டுள்ளது.",
    historical_decisions_context: ["Highways Section 19 notification published on June 14."],
    required_files_gos: ["G.O. (Ms) No. 204 - Coimbatore WRR Sanction"],
    protocol_clearance_status: "VERIFIED"
  },
  {
    id: "appt-cm-04",
    title_en: "Grassroots Grievance Review with Tahsildars & VAO Association Representatives",
    title_ta: "வட்டாட்சியர்கள் & கிராம நிர்வாக அலுவலர் சங்க பிரதிநிதிகளுடன் கள ஆய்வு கூட்டம்",
    appointment_type: "PUBLIC_PETITION",
    scheduled_date: new Date().toISOString().split('T')[0],
    scheduled_time: "04:30 PM - 05:15 PM",
    duration_minutes: 45,
    location: "Secretariat Conference Hall 3",
    status: "CONFIRMED",
    priority: "MEDIUM",
    host_name: "Hon'ble Chief Minister",
    host_role: "CHIEF_MINISTER",
    participant_name_en: "M. Shanmugasundaram & VAO State Delegates",
    participant_name_ta: "மு. சண்முகசுந்தரம் & விஏஓ மாநில பிரதிநிதிகள்",
    participant_designation: "Tahsildar (Group 2) & VAO Representatives (Group 4)",
    participant_role: "GROUP_2",
    participant_department: "Revenue Administration",
    participant_district: "Coimbatore & Tiruvallur",
    participant_contact: "+91 98422 55102",
    participant_email: "tah.cbenorth@tn.gov.in",
    agenda_en: "Review of Mobile Voice-First e-Adangal crop survey adoption and patta passbook grievance resolution SLA.",
    agenda_ta: "மொபைல் குரல்வழி இ-அடங்கல் பயிர் கணக்கெடுப்பு மற்றும் பட்டா மாறுதல் தீர்வு கால அவகாசம் ஆய்வு.",
    ai_prepared_notes_en: "Crop survey digitization reduced VAO paper turnaround time by 65%. 14,000 village panchayats active.",
    ai_prepared_notes_ta: "பயிர் கணக்கெடுப்பு டிஜிட்டல் மயமாக்கப்பட்டதால் விஏஓ-க்களின் பணி நேரம் 65% மிச்சமாகியுள்ளது.",
    historical_decisions_context: ["Government Order for digital e-Adangal roll-out issued in 2025."],
    required_files_gos: ["G.O. (Ms) No. 41 - Digital Revenue Records"],
    protocol_clearance_status: "STANDARD"
  }
];
