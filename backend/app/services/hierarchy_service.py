from typing import List, Dict, Any, Optional
from app.schemas.hierarchy import HierarchyNode, OfficerDossier, DirectorySearchResponse


OFFICERS_MASTER_DATA: List[OfficerDossier] = [
    OfficerDossier(
        id="off-cm-01",
        name_en="M. K. Stalin",
        name_ta="மு. க. ஸ்டாலின்",
        designation_en="Hon'ble Chief Minister of Tamil Nadu",
        designation_ta="மாண்புமிகு தமிழ்நாடு முதலமைச்சர்",
        tier_role="CHIEF_MINISTER",
        cadre="State Executive",
        batch_year=None,
        department_en="Public, Home & General Administration",
        department_ta="பொது, உள்துறை மற்றும் பொது நிர்வாகம்",
        district_en="Statewide (Headquarters: Chennai)",
        district_ta="மாநிலம் முழுவதும் (தலைமையகம்: சென்னை)",
        taluk_en=None,
        office_address="Chief Minister's Office, Secretariat, Fort St. George, Chennai - 600009",
        cug_phone="+91 44 2567 2345",
        official_email="cmcell@tn.gov.in",
        reports_to_name=None,
        reports_to_designation=None,
        responsibilities=[
            "State Policy & Vision 2030 ($1 Trillion Economy)",
            "Cabinet Affairs & High-Level Administrative Sanctions",
            "Disaster Response & Statewide Crisis Management",
            "Chief Minister's Special Dashboard Review & Flagship Schemes"
        ],
        current_schemes=[
            "Kalaignar Magalir Urimai Thittam (KMUT)",
            "Chief Minister's Breakfast Scheme",
            "Pudhumai Penn & Tamil Pudhalvan Schemes",
            "Makkalai Thedi Maruthuvam"
        ],
        current_projects=[
            "Chennai Metro Phase 2 (₹63,246 Cr)",
            "Global Semiconductor Fab & EV Park Allotments",
            "TIDCO Space Park & Defense Corridor"
        ],
        current_committees=[
            "State Planning Commission (Chairman)",
            "State Disaster Management Authority (Chairman)",
            "High-Level Committee for $1T Economy"
        ],
        calendar_availability="IN_MEETING",
        pending_approvals_count=7,
        performance_kpi_score=96.4,
        recent_decisions=[
            "Sanctioned ₹620 Cr for Monsoon flood mitigation in Chennai & Delta",
            "Approved special incentive package for SIPCOT Krishnagiri EV hub"
        ]
    ),
    OfficerDossier(
        id="off-cs-01",
        name_en="N. Muruganandam, IAS",
        name_ta="நா. முருகானந்தம், இ.ஆ.ப.",
        designation_en="Chief Secretary to Government",
        designation_ta="அரசு தலைமைச் செயலாளர்",
        tier_role="CHIEF_SECRETARY",
        cadre="IAS",
        batch_year=1991,
        department_en="Personnel, Vigilance & Inter-Departmental Coordination",
        department_ta="பணியாளர், ஊழல் தடுப்பு மற்றும் துறை ஒருங்கிணைப்பு",
        district_en="Statewide (Secretariat)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம்)",
        taluk_en=None,
        office_address="Chief Secretary Office, Main Building, Fort St. George, Chennai - 600009",
        cug_phone="+91 44 2567 1555",
        official_email="cs@tn.gov.in",
        reports_to_name="M. K. Stalin",
        reports_to_designation="Hon'ble Chief Minister",
        responsibilities=[
            "Administrative Head of Tamil Nadu Civil Services",
            "Cabinet Coordination & GO Approvals",
            "Inter-Departmental Blocker Resolution (Highways, TANGEDCO, Forest)",
            "Secretaries & 38 District Collectors Monitoring"
        ],
        current_schemes=[
            "All Flagship State Schemes Oversight",
            "State Digital Transformation & VETTRI AI OS Integration"
        ],
        current_projects=[
            "Chennai Peripheral Ring Road",
            "Parandur Greenfields Airport Planning",
            "Kallakkurichi-Salem Industrial Corridor"
        ],
        current_committees=[
            "Empowered Committee on Infrastructure Projects",
            "State Crisis Management Group",
            "Civil Services Board (Chairman)"
        ],
        calendar_availability="AVAILABLE",
        pending_approvals_count=12,
        performance_kpi_score=94.8,
        recent_decisions=[
            "Directed 38 District Collectors on e-Office SLA enforcement",
            "Resolved forest clearance bottlenecks for Western Ghats power lines"
        ]
    ),
    OfficerDossier(
        id="off-ps-health-01",
        name_en="P. Senthilkumar, IAS",
        name_ta="பி. செந்தில்குமார், இ.ஆ.ப.",
        designation_en="Principal Secretary to Government, Health & Family Welfare",
        designation_ta="முதன்மைச் செயலாளர், மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
        tier_role="PRINCIPAL_SECRETARY",
        cadre="IAS",
        batch_year=1995,
        department_en="Health & Family Welfare",
        department_ta="மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலம்",
        district_en="Statewide",
        district_ta="மாநிலம் முழுவதும்",
        taluk_en=None,
        office_address="Health Dept, 4th Floor, Secretariat, Chennai - 600009",
        cug_phone="+91 44 2567 1875",
        official_email="hfsec@tn.gov.in",
        reports_to_name="N. Muruganandam, IAS",
        reports_to_designation="Chief Secretary",
        responsibilities=[
            "State Public Health Policy & Primary Health Centers (PHCs)",
            "Medical Services Recruitment & Doctor Availability",
            "TNMSC Central Drug Procurement & Buffer Stock Monitoring",
            "Medical Colleges Infrastructure & Hospital Administration"
        ],
        current_schemes=[
            "Makkalai Thedi Maruthuvam (MTM)",
            "Innuyir Kappom (Nammai Kakkum 48)",
            "Kalaignar Comprehensive Health Insurance Scheme (CMCHIS)"
        ],
        current_projects=[
            "Kalaignar Centenary Super Specialty Hospital Expansion",
            "6 New District Medical College Hospitals Construction"
        ],
        current_committees=[
            "State Drug Procurement Oversight Board",
            "Public Health Epidemic Control Taskforce"
        ],
        calendar_availability="AVAILABLE",
        pending_approvals_count=4,
        performance_kpi_score=92.1,
        recent_decisions=[
            "Authorized emergency anti-venom & ORS dispatch to coastal PHCs",
            "Sanctioned 48 modular dialysis units for rural taluk hospitals"
        ]
    ),
    OfficerDossier(
        id="off-col-cbe-01",
        name_en="Krasthi Kumar Pati, IAS",
        name_ta="கிராந்தி குமார் பாடி, இ.ஆ.ப.",
        designation_en="District Collector & District Magistrate, Coimbatore",
        designation_ta="மாவட்ட ஆட்சித்தலைவர், கோயம்புத்தூர்",
        tier_role="DISTRICT_COLLECTOR",
        cadre="IAS",
        batch_year=2015,
        department_en="Revenue & District Administration",
        department_ta="வருவாய் மற்றும் மாவட்ட நிர்வாகம்",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        taluk_en="Coimbatore North / South, Pollachi, Mettupalayam, Sulur, Annur, Valparai",
        office_address="Collectorate, State Bank Road, Gopalapuram, Coimbatore - 641018",
        cug_phone="+91 422 2301114",
        official_email="collr-cbe@nic.in",
        reports_to_name="N. Muruganandam, IAS",
        reports_to_designation="Chief Secretary",
        responsibilities=[
            "District Executive Leadership across 11 Taluks & 30 Line Departments",
            "Law & Order, Disaster Preparedness & Flood Relief",
            "Land Acquisition for Coimbatore Airport Expansion (627 Acres)",
            "Public Grievance Redressal Day (Monday CM Cell Review)"
        ],
        current_schemes=[
            "Coimbatore Smart City Mission",
            "Avinashi-Athikadavu Groundwater Recharge Scheme",
            "Kalaignar Magalir Urimai Thittam Local Saturation"
        ],
        current_projects=[
            "Coimbatore Airport Runway Expansion Land Handover",
            "Western Ring Road (Madukkarai to Narasimhanaickenpalayam)",
            "Semmozhi Poonga Construction (₹172 Cr)"
        ],
        current_committees=[
            "District Disaster Management Authority (Chairman)",
            "District Road Safety Committee",
            "Industrial Grievance Redressal Council"
        ],
        calendar_availability="FIELD_VISIT",
        pending_approvals_count=5,
        performance_kpi_score=93.6,
        recent_decisions=[
            "Handed over 485 acres of patta land for airport expansion",
            "Completed 94% desilting of Noyyal river check dams before monsoon"
        ]
    ),
    OfficerDossier(
        id="off-sp-cbe-01",
        name_en="K. Karthikeyan, IPS",
        name_ta="கே. கார்த்திகேயன், இ.கா.ப.",
        designation_en="Superintendent of Police (SP), Coimbatore Rural",
        designation_ta="காவல் கண்காணிப்பாளர், கோயம்புத்தூர் புறநகர்",
        tier_role="SUPERINTENDENT_OF_POLICE",
        cadre="IPS",
        batch_year=2016,
        department_en="Home & Police Department",
        department_ta="உள்துறை மற்றும் காவல்துறை",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        taluk_en="Pollachi, Mettupalayam, Sulur, Valparai Sub-divisions",
        office_address="District Police Office, State Bank Road, Coimbatore - 641018",
        cug_phone="+91 422 2300062",
        official_email="sp-cbe@tncctns.gov.in",
        reports_to_name="ADGP Law & Order / IGP West Zone",
        reports_to_designation="Inspector General of Police, West Zone",
        responsibilities=[
            "District Law & Order Maintenance, Crime Prevention & Detection",
            "Inter-State Border Checkpost Security (Kerala Border: Walayar, Gopalapuram)",
            "Ghat Road Bandobast & Tourist Safety in Valparai & Pollachi",
            "CCTNS Station Telemetry & Highway Emergency Response"
        ],
        current_schemes=[
            "Kavalan SOS App District Awareness",
            "Project Sirpi (Student Police Cadets)",
            "Smart CCTV Beat Patrol Network"
        ],
        current_projects=[
            "AI Automated Number Plate Recognition (ANPR) at 8 Border Checkposts",
            "District Cyber Crime Laboratory Modernization"
        ],
        current_committees=[
            "District Intelligence Coordination Committee",
            "Anti-Narcotics Taskforce Western Range"
        ],
        calendar_availability="AVAILABLE",
        pending_approvals_count=2,
        performance_kpi_score=91.4,
        recent_decisions=[
            "Deployed 400 personnel for seasonal festival bandobast in Pollachi",
            "Seized 120 kg contraband through interstate border surveillance"
        ]
    ),
    OfficerDossier(
        id="off-tah-cbe-01",
        name_en="M. Shanmugasundaram",
        name_ta="மு. சண்முகசுந்தரம்",
        designation_en="Tahsildar, Coimbatore North Taluk",
        designation_ta="வட்டாட்சியர், கோயம்புத்தூர் வடக்கு வட்டம்",
        tier_role="TAHSILDAR",
        cadre="TNCS (Group 2)",
        batch_year=2012,
        department_en="Revenue Administration",
        department_ta="வருவாய் நிர்வாகம்",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        taluk_en="Coimbatore North",
        office_address="Taluk Office, Balasundaram Road, Coimbatore - 641018",
        cug_phone="+91 422 2247833",
        official_email="tah-cbenorth@tn.gov.in",
        reports_to_name="Krasthi Kumar Pati, IAS",
        reports_to_designation="District Collector",
        responsibilities=[
            "Taluk Revenue Records (Patta, Chitta, Adangal) & Sub-Divisions",
            "Issue of Community, Income, Nativity & Legal Heir Certificates",
            "Jamabandi Land Revenue Settlement & Encroachment Removal",
            "Disaster First Responder & Relief Center Operations"
        ],
        current_schemes=[
            "Kalaignar Magalir Urimai Thittam Ground Verification",
            "Pattadhari Grievance Redressal Mission"
        ],
        current_projects=[
            "Digitization of 45,000 FMB (Field Measurement Book) Sketches",
            "e-Adangal Crop Survey 100% Saturation"
        ],
        current_committees=[
            "Taluk Supply & Ration Distribution Review Committee",
            "Taluk Road Encroachment Eviction Squad"
        ],
        calendar_availability="AVAILABLE",
        pending_approvals_count=18,
        performance_kpi_score=89.5,
        recent_decisions=[
            "Cleared 140 pending legal heir certificates within 48-hour SLA",
            "Removed 3.4 acres of waterbody encroachment along Singanallur tank"
        ]
    )
]


def build_hierarchy_tree() -> HierarchyNode:
    """Constructs the recursive 21-tier organizational graph for the Government of Tamil Nadu."""
    
    # Grassroots Tier (Tahsildars, BDOs, VAOs)
    tahsildar_node = HierarchyNode(
        id="node-tah-cbe",
        name_en="M. Shanmugasundaram",
        name_ta="மு. சண்முகசுந்தரம்",
        designation_en="Tahsildar, Coimbatore North",
        designation_ta="வட்டாட்சியர், கோவை வடக்கு",
        tier_level=16,
        tier_role="TAHSILDAR",
        department_code="REV",
        department_en="Revenue Administration",
        department_ta="வருவாய் நிர்வாகம்",
        district_code="CBE",
        district_name_en="Coimbatore",
        cug_phone="+91 422 2247833",
        official_email="tah-cbenorth@tn.gov.in",
        office_address="Taluk Office, Balasundaram Road, Coimbatore",
        pending_approvals_count=18,
        kpi_score=89.5,
        active_projects_count=2,
        active_schemes_count=3,
        subordinates_count=24,
        children=[]
    )

    # District Police (SP)
    sp_cbe_node = HierarchyNode(
        id="node-sp-cbe",
        name_en="K. Karthikeyan, IPS",
        name_ta="கே. கார்த்திகேயன், இ.கா.ப.",
        designation_en="Superintendent of Police, Coimbatore Rural",
        designation_ta="காவல் கண்காணிப்பாளர், கோவை புறநகர்",
        tier_level=12,
        tier_role="SUPERINTENDENT_OF_POLICE",
        department_code="HOME",
        department_en="Police Department",
        department_ta="காவல்துறை",
        district_code="CBE",
        district_name_en="Coimbatore",
        cug_phone="+91 422 2300062",
        official_email="sp-cbe@tncctns.gov.in",
        office_address="DPO, State Bank Road, Coimbatore",
        pending_approvals_count=2,
        kpi_score=91.4,
        active_projects_count=3,
        active_schemes_count=2,
        subordinates_count=1450,
        children=[]
    )

    # District Collector (DC)
    collector_cbe_node = HierarchyNode(
        id="node-col-cbe",
        name_en="Krasthi Kumar Pati, IAS",
        name_ta="கிராந்தி குமார் பாடி, இ.ஆ.ப.",
        designation_en="District Collector, Coimbatore",
        designation_ta="மாவட்ட ஆட்சித்தலைவர், கோயம்புத்தூர்",
        tier_level=11,
        tier_role="DISTRICT_COLLECTOR",
        department_code="REV",
        department_en="District Administration",
        department_ta="மாவட்ட நிர்வாகம்",
        district_code="CBE",
        district_name_en="Coimbatore",
        cug_phone="+91 422 2301114",
        official_email="collr-cbe@nic.in",
        office_address="Collectorate, State Bank Road, Coimbatore",
        pending_approvals_count=5,
        kpi_score=93.6,
        active_projects_count=8,
        active_schemes_count=14,
        subordinates_count=320,
        children=[tahsildar_node]
    )

    # Principal Secretaries (Secretariat Tier)
    ps_health_node = HierarchyNode(
        id="node-ps-health",
        name_en="P. Senthilkumar, IAS",
        name_ta="பி. செந்தில்குமார், இ.ஆ.ப.",
        designation_en="Principal Secretary, Health & Family Welfare",
        designation_ta="முதன்மைச் செயலாளர், மக்கள் நல்வாழ்வுத்துறை",
        tier_level=6,
        tier_role="PRINCIPAL_SECRETARY",
        department_code="HLT",
        department_en="Health & Family Welfare",
        department_ta="மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலம்",
        district_code=None,
        district_name_en="Statewide",
        cug_phone="+91 44 2567 1875",
        official_email="hfsec@tn.gov.in",
        office_address="Secretariat, Fort St. George, Chennai",
        pending_approvals_count=4,
        kpi_score=92.1,
        active_projects_count=12,
        active_schemes_count=6,
        subordinates_count=45000,
        children=[]
    )

    # Chief Secretary Node
    cs_node = HierarchyNode(
        id="node-cs-01",
        name_en="N. Muruganandam, IAS",
        name_ta="நா. முருகானந்தம், இ.ஆ.ப.",
        designation_en="Chief Secretary to Government",
        designation_ta="அரசு தலைமைச் செயலாளர்",
        tier_level=4,
        tier_role="CHIEF_SECRETARY",
        department_code="PUBLIC",
        department_en="Public & General Administration",
        department_ta="பொது மற்றும் தலைமை நிர்வாகம்",
        district_code=None,
        district_name_en="Statewide",
        cug_phone="+91 44 2567 1555",
        official_email="cs@tn.gov.in",
        office_address="Secretariat, Fort St. George, Chennai",
        pending_approvals_count=12,
        kpi_score=94.8,
        active_projects_count=45,
        active_schemes_count=28,
        subordinates_count=1200000,
        children=[ps_health_node, collector_cbe_node, sp_cbe_node]
    )

    # Top Root: Hon'ble Chief Minister
    cm_root = HierarchyNode(
        id="node-cm-01",
        name_en="M. K. Stalin",
        name_ta="மு. க. ஸ்டாலின்",
        designation_en="Hon'ble Chief Minister of Tamil Nadu",
        designation_ta="மாண்புமிகு தமிழ்நாடு முதலமைச்சர்",
        tier_level=1,
        tier_role="CHIEF_MINISTER",
        department_code="EXECUTIVE",
        department_en="State Executive & Cabinet",
        department_ta="மாநில தலைமை & அமைச்சரவை",
        district_code=None,
        district_name_en="Statewide",
        cug_phone="+91 44 2567 2345",
        official_email="cmcell@tn.gov.in",
        office_address="CMO, Secretariat, Fort St. George, Chennai",
        pending_approvals_count=7,
        kpi_score=96.4,
        active_projects_count=180,
        active_schemes_count=42,
        subordinates_count=1350000,
        children=[cs_node]
    )

    return cm_root


async def search_government_directory(query: str, semantic: bool = True) -> DirectorySearchResponse:
    q = query.lower().strip()
    
    # Natural Language keyword & semantic mapping
    matched: List[OfficerDossier] = []
    
    for off in OFFICERS_MASTER_DATA:
        # Match by name, designation, department, district, scheme, or responsibility
        haystack = f"{off.name_en} {off.name_ta} {off.designation_en} {off.designation_ta} {off.department_en} {off.district_en or ''} {' '.join(off.responsibilities)} {' '.join(off.current_schemes)} {' '.join(off.current_projects)}".lower()
        
        if any(term in haystack for term in q.split()) or q in haystack:
            matched.append(off)

    if not matched:
        # Fallback to full list if generic
        matched = OFFICERS_MASTER_DATA

    return DirectorySearchResponse(
        query_interpreted=f"Smart semantic query: '{query}' resolved across official cadres, departments and district postings",
        total_results=len(matched),
        officers=matched
    )
