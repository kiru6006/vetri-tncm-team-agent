import re
from typing import List, Dict, Any, Optional
from app.schemas.grm_directory import (
    OfficialGRMProfile,
    ReportingNode,
    DataSourceMetadata,
    AutocompleteItem,
    GRMSearchResponse,
    RelationshipIntelligenceQuery,
    RelationshipIntelligenceResponse,
    RecommendedOfficerItem
)
from app.schemas.hierarchy import HierarchyNode


# ==========================================
# MASTER ENTERPRISE OFFICIALS ROSTER (GRM)
# ==========================================
OFFICIALS_GRM_MASTER: List[OfficialGRMProfile] = [
    # 1. CHIEF MINISTER (EXECUTIVE HEAD)
    OfficialGRMProfile(
        id="grm-cm-01",
        name_en="M. K. Stalin",
        name_ta="மு. க. ஸ்டாலின்",
        cadre="MINISTER",
        batch_year=None,
        designation_en="Hon'ble Chief Minister of Tamil Nadu",
        designation_ta="மாண்புமிகு தமிழ்நாடு முதலமைச்சர்",
        role_tier="CHIEF_MINISTER",
        department_code="EXECUTIVE",
        department_en="State Executive, Cabinet & Public",
        department_ta="மாநில தலைமை, அமைச்சரவை & பொதுத்துறை",
        district_en="Statewide (Secretariat, Chennai)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம், சென்னை)",
        taluk_en="Chennai",
        office_name="Chief Minister's Secretariat Chamber",
        office_address="CMO, 2nd Floor, Main Building, Fort St. George, Chennai - 600009",
        official_email="cmcell@tn.gov.in",
        cug_phone="+91 44 2567 2345",
        official_portal_url="https://cmcell.tn.gov.in",
        data_classification="TOP_SECRET",
        status="AVAILABLE",
        avatar_color="from-amber-500 to-amber-700",
        reports_to=None,
        direct_reports=[
            ReportingNode(
                id="grm-cs-01",
                name_en="N. Muruganandam, IAS",
                name_ta="நா. முருகானந்தம், இ.ஆ.ப.",
                designation_en="Chief Secretary to Government",
                role_tier="CHIEF_SECRETARY",
                official_email="cs@tn.gov.in",
                cug_phone="+91 44 2567 1555"
            ),
            ReportingNode(
                id="grm-min-fin",
                name_en="Thiru Thangam Thennarasu",
                name_ta="திரு தங்கம் தென்னரசு",
                designation_en="Hon'ble Minister for Finance, Planning & HR",
                role_tier="MINISTER",
                official_email="finmin@tn.gov.in"
            )
        ],
        subordinates_count=1350000,
        responsibilities=[
            "Overall State Governance, Policy Formulation & $1T Economy Roadmap",
            "Cabinet Approvals & Executive Decrees",
            "Statewide Crisis & Disaster Response Command",
            "Flagship Scheme Direct Review & Citizen Welfare Saturation"
        ],
        current_schemes=[
            "Kalaignar Magalir Urimai Thittam (KMUT)",
            "Chief Minister's Breakfast Scheme",
            "Makkalai Thedi Maruthuvam",
            "Pudhumai Penn Scheme"
        ],
        current_projects=[
            "Chennai Metro Rail Corridor Phase 2 (₹63,246 Cr)",
            "Semiconductor Fab Parks in Krishnagiri & Hosur",
            "Parandur Greenfield International Airport"
        ],
        current_committees=[
            "State Planning Commission (Chairman)",
            "State Disaster Management Authority (Chairman)",
            "High-Level Investment Promotion Board (Chairman)"
        ],
        pending_approvals_count=7,
        performance_kpi_score=98.2,
        recent_decisions=[
            "Approved ₹620 Cr monsoon disaster mitigation capex for Chennai and Delta.",
            "Sanctioned dedicated 400kV power line for SIPCOT semiconductor park."
        ],
        recent_gos=["G.O. (Ms) No. 102 - Semiconductor Incentive Package 2026", "G.O. (Ms) No. 84 - Kuruvai Water Inflow Allocation"],
        recent_circulars=["Circular 2026/CMO-09 - e-Office SLA Enforcement Across 38 Districts"],
        ai_relationship_insights="Hon'ble CM maintains direct review benchmarks with Chief Secretary and line Ministers. Key cross-department priority: synchronizing Industries and Energy for mega industrial parks.",
        cross_department_collaborators=["Finance", "Industries", "Water Resources", "Home & Police", "Health"],
        data_source=DataSourceMetadata(
            source_name="Tamil Nadu Government State Portal",
            source_url="https://www.tn.gov.in/directory",
            source_type="TN_GOV_PORTAL",
            last_synced_at="2026-09-28T18:30:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 2. CHIEF SECRETARY
    OfficialGRMProfile(
        id="grm-cs-01",
        name_en="N. Muruganandam, IAS",
        name_ta="நா. முருகானந்தம், இ.ஆ.ப.",
        cadre="IAS",
        batch_year=1991,
        designation_en="Chief Secretary to Government of Tamil Nadu",
        designation_ta="அரசு தலைமைச் செயலாளர்",
        role_tier="CHIEF_SECRETARY",
        department_code="PUBLIC",
        department_en="Personnel, Vigilance & Inter-Departmental Coordination",
        department_ta="பணியாளர், ஊழல் தடுப்பு மற்றும் துறை ஒருங்கிணைப்பு",
        district_en="Statewide (Secretariat)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம்)",
        taluk_en="Chennai",
        office_name="Chief Secretary Office",
        office_address="Chief Secretary Chamber, Main Building, Fort St. George, Chennai - 600009",
        official_email="cs@tn.gov.in",
        cug_phone="+91 44 2567 1555",
        official_portal_url="https://public.tn.gov.in",
        data_classification="TOP_SECRET",
        status="AVAILABLE",
        avatar_color="from-indigo-600 to-blue-700",
        reports_to=ReportingNode(
            id="grm-cm-01",
            name_en="M. K. Stalin",
            designation_en="Hon'ble Chief Minister of Tamil Nadu",
            role_tier="CHIEF_MINISTER",
            official_email="cmcell@tn.gov.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-ps-ind-01",
                name_en="V. Arun Roy, IAS",
                designation_en="Principal Secretary, Industries",
                role_tier="PRINCIPAL_SECRETARY",
                official_email="indsec@tn.gov.in"
            ),
            ReportingNode(
                id="grm-ps-hlt-01",
                name_en="P. Senthilkumar, IAS",
                designation_en="Principal Secretary, Health & Family Welfare",
                role_tier="PRINCIPAL_SECRETARY",
                official_email="hfsec@tn.gov.in"
            ),
            ReportingNode(
                id="grm-col-slm-01",
                name_en="Dr. R. Brindha Devi, IAS",
                designation_en="District Collector, Salem",
                role_tier="DISTRICT_COLLECTOR",
                official_email="collr-slm@nic.in"
            ),
            ReportingNode(
                id="grm-col-cbe-01",
                name_en="Krasthi Kumar Pati, IAS",
                designation_en="District Collector, Coimbatore",
                role_tier="DISTRICT_COLLECTOR",
                official_email="collr-cbe@nic.in"
            )
        ],
        subordinates_count=1200000,
        responsibilities=[
            "Administrative Head of Tamil Nadu Civil Services",
            "Inter-Departmental Blocker Resolution (Highways, Forest, Energy)",
            "Secretaries and 38 District Collectors Daily Monitoring",
            "State Level Steering Committee on Infrastructure & Capex"
        ],
        current_schemes=["All 42 Flagship State Schemes Master Oversight", "VETRI TN AI OS Deployment"],
        current_projects=["Chennai Peripheral Ring Road", "Parandur Greenfields Airport", "Thamirabarani River Link"],
        current_committees=["Civil Services Board (Chairman)", "Empowered Committee on Infrastructure Projects (Chairman)"],
        pending_approvals_count=12,
        performance_kpi_score=95.8,
        recent_decisions=[
            "Directed 38 District Collectors on e-Office SLA zero-pendency enforcement.",
            "Sanctioned special revenue survey teams for Krishnagiri SIPCOT land acquisition."
        ],
        recent_gos=["G.O. (Ms) No. 412 - Inter-district Senior Civil Services Postings"],
        recent_circulars=["Circular 2026/CS-18 - Monsoon Emergency Preparedness Protocol"],
        ai_relationship_insights="Chief Secretary provides top-level administrative synergy. Primary inter-departmental bridge between Secretariat policy benches and District Collectorate execution.",
        cross_department_collaborators=["Industries", "Finance", "Home", "Public Works", "Highways"],
        data_source=DataSourceMetadata(
            source_name="Secretariat IAS / IPS Postings Portal",
            source_url="https://public.tn.gov.in/gazette/postings",
            source_type="SECRETARIAT_IAS_IPS_POSTINGS",
            last_synced_at="2026-09-28T19:15:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 3. SUPERINTENDENT OF POLICE - SALEM (KIRUBAKARAN IPS)
    OfficialGRMProfile(
        id="grm-sp-slm-kirubakaran",
        name_en="Kirubakaran, IPS",
        name_ta="கிருபாகரன், இ.கா.ப.",
        cadre="IPS",
        batch_year=2015,
        designation_en="Superintendent of Police (SP), Salem District",
        designation_ta="காவல் கண்காணிப்பாளர், சேலம் மாவட்டம்",
        role_tier="GROUP_1",
        department_code="HOME_POLICE",
        department_en="Tamil Nadu Police (Law & Order & Crime)",
        department_ta="காவல்துறை (சட்டம் ஒழுங்கு & குற்றப்பிரிவு)",
        district_en="Salem",
        district_ta="சேலம்",
        taluk_en="Salem, Omalur, Mettur, Attur, Sankari, Edappadi",
        office_name="District Police Office (DPO), Salem",
        office_address="District Police Office Campus, Collectorate Road, Salem - 636001",
        official_email="sp-slm@tncctns.gov.in",
        cug_phone="+91 427 2451001",
        official_portal_url="https://salem.nic.in/police",
        data_classification="CONFIDENTIAL",
        status="AVAILABLE",
        avatar_color="from-indigo-600 to-rose-700",
        reports_to=ReportingNode(
            id="grm-dgp-01",
            name_en="Shankar Jiwal, IPS",
            designation_en="Director General of Police & Head of Police Force",
            role_tier="DIRECTOR_GENERAL_OF_POLICE",
            official_email="dgp@tncctns.gov.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-dsp-slm-rural",
                name_en="R. Soundararajan, DSP",
                designation_en="Deputy Superintendent of Police, Salem Rural Sub-division",
                role_tier="GROUP_1",
                official_email="dsp-slmrural@tncctns.gov.in"
            ),
            ReportingNode(
                id="grm-dsp-mettur",
                name_en="K. Manivannan, DSP",
                designation_en="Deputy Superintendent of Police, Mettur Sub-division",
                role_tier="GROUP_1",
                official_email="dsp-mettur@tncctns.gov.in"
            )
        ],
        subordinates_count=2650,
        responsibilities=[
            "District Law & Order Command across 6 Police Sub-divisions & 34 Stations",
            "Highway Safety, AI Speed Surveillance & Accident Zero Mission on NH-44",
            "POCSO Fast-Track Investigation Units & Forensic Evidence Management",
            "Inter-State Border Checkposts Bandobast (Karnataka Border Checkpoints)",
            "Anti-Narcotics Special Task Force (Operation Ganja Vettai 4.0)"
        ],
        current_schemes=[
            "POCSO Special Fast-Track Prosecution Unit",
            "Project Kaval Karangal Salem",
            "Statewide Intelligent CCTV Network (97.4% Uptime)"
        ],
        current_projects=[
            "Salem-Attur NH-44 AI Automated Number Plate Recognition (ANPR) Grid",
            "Salem Cyber Crime Police Station Advanced Forensics Hub",
            "Smart Wireless Command Center Modernization"
        ],
        current_committees=[
            "District Intelligence Coordination Committee (Secretary)",
            "District Road Safety Committee (Vice-Chairman)",
            "Inter-State Border Vigilance Taskforce"
        ],
        pending_approvals_count=3,
        performance_kpi_score=94.5,
        recent_decisions=[
            "Deployed AI Smart ANPR mobile interceptors across 8 interstate border checkposts, reducing highway incidents by 32%.",
            "Cleared 96% of POCSO case charge-sheets within statutory 60-day deadline."
        ],
        recent_gos=["G.O. (Ms) No. 284 - Salem Highway AI Traffic Surveillance Sanctions"],
        recent_circulars=["SP Circular 04/2026 - Mettur Dam Tourism Safety & Festival Bandobast"],
        ai_relationship_insights="SP Kirubakaran IPS maintains active coordination with District Collector Dr. R. Brindha Devi IAS on law & order, festival security, and illegal mining prevention. High cross-functional collaboration with Home, Revenue, and Transport departments.",
        cross_department_collaborators=["Revenue (Collectorate)", "Highways", "Transport", "Forest", "Judiciary & Courts"],
        data_source=DataSourceMetadata(
            source_name="Police Headquarters & CCTNS State Command Telemetry",
            source_url="https://tnpolice.gov.in/cctns/officers",
            source_type="POLICE_HQ_CCTNS",
            last_synced_at="2026-09-28T20:00:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 4. JOINT COMMISSIONER - COMMERCIAL TAXES (KAYALVIZHI IRS)
    OfficialGRMProfile(
        id="grm-jc-ct-kayalvizhi",
        name_en="Kayalvizhi, IRS",
        name_ta="கயல்விழி, இ.வ.ப.",
        cadre="IRS",
        batch_year=2014,
        designation_en="Joint Commissioner (ST), Commercial Taxes & GST Enforcement, Madurai Division",
        designation_ta="இணை ஆணையர் (வணிக வரி & ஜிஎஸ்டி அமலாக்கம்), மதுரை கோட்டம்",
        role_tier="COMMISSIONER",
        department_code="COMMERCIAL_TAXES",
        department_en="Commercial Taxes & Registration Department",
        department_ta="வணிக வரி மற்றும் பதிவுத் துறை",
        district_en="Madurai",
        district_ta="மதுரை",
        taluk_en="Madurai, Dindigul, Theni, Virudhunagar",
        office_name="Joint Commissioner of Commercial Taxes Office",
        office_address="Commercial Taxes Complex, Dr. Thangaraj Salai, K.K. Nagar, Madurai - 625020",
        official_email="jc-ct-mdu@tn.gov.in",
        cug_phone="+91 452 2532400",
        official_portal_url="https://ctd.tn.gov.in",
        data_classification="CONFIDENTIAL",
        status="AVAILABLE",
        avatar_color="from-teal-600 to-cyan-700",
        reports_to=ReportingNode(
            id="grm-comm-ct-01",
            name_en="Dr. Dheeraj Kumar, IAS",
            designation_en="Commissioner of Commercial Taxes, Tamil Nadu",
            role_tier="COMMISSIONER",
            official_email="cct@tn.gov.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-dc-ct-mdu",
                name_en="T. Vasanthakumar, DC",
                designation_en="Deputy Commissioner (Enforcement), Madurai",
                role_tier="GROUP_1",
                official_email="dc-enf-mdu@tn.gov.in"
            ),
            ReportingNode(
                id="grm-dc-ct-dgl",
                name_en="S. Meenakshi, DC",
                designation_en="Deputy Commissioner (Audit), Dindigul",
                role_tier="GROUP_1",
                official_email="dc-audit-dgl@tn.gov.in"
            )
        ],
        subordinates_count=480,
        responsibilities=[
            "GST Revenue Mobilization & Compliance across South Zone Divisions",
            "AI Fraud Detection & Anti-Evasion Enforcement against Fake Invoicing Clusters",
            "IFHRMS Treasury Reconciliation & E-Way Bill Surveillance on Southern Corridors",
            "Trader Grievance Redressal & Single Window Fast-Track Tax Clearance"
        ],
        current_schemes=[
            "Samadhan Scheme 2026 for Legacy Tax Dispute Settlement",
            "Trader Welfare & GST Sahayata Helpdesk Network"
        ],
        current_projects=[
            "AI-Powered Real-time GST Invoicing Anomaly Detection Matrix",
            "South Zone Mobile E-Way Bill Checking Stations Automation"
        ],
        current_committees=[
            "State Revenue Augmentation Taskforce (Member)",
            "Inter-Departmental Anti-Smuggling Coordination Bench"
        ],
        pending_approvals_count=4,
        performance_kpi_score=96.1,
        recent_decisions=[
            "Achieved 104.2% of Q2 revenue target (₹3,420 Cr collected in Madurai & southern districts).",
            "Unearthed circular bogus invoicing syndicate in scrap trade recovering ₹38.4 Cr revenue leakage."
        ],
        recent_gos=["G.O. (Ms) No. 91 - Commercial Taxes Enforcement Powers 2026"],
        recent_circulars=["CTD Circular 12/2026 - Data Analytics Driven GST Audit Procedures"],
        ai_relationship_insights="Joint Commissioner Kayalvizhi IRS leads the state in AI-driven tax fraud analytics. Frequently collaborates with Finance, Police Economic Offences Wing (EOW), and Registration Department on high-value asset transactions.",
        cross_department_collaborators=["Finance & Treasury", "Registration Dept", "Police EOW", "Industries", "Banking & RBI"],
        data_source=DataSourceMetadata(
            source_name="Commercial Taxes & IFHRMS Unified Treasury Cloud",
            source_url="https://ifhrms.tn.gov.in/treasury/personnel",
            source_type="COMMERCIAL_TAXES_IFHRMS",
            last_synced_at="2026-09-28T18:00:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 5. DISTRICT COLLECTOR - SALEM (DR. R. BRINDHA DEVI IAS)
    OfficialGRMProfile(
        id="grm-col-slm-01",
        name_en="Dr. R. Brindha Devi, IAS",
        name_ta="மருத்துவர் ஆர். பிருந்தாதேவி, இ.ஆ.ப.",
        cadre="IAS",
        batch_year=2015,
        designation_en="District Collector & District Magistrate, Salem",
        designation_ta="மாவட்ட ஆட்சித்தலைவர், சேலம் மாவட்டம்",
        role_tier="GROUP_1",
        department_code="REVENUE",
        department_en="Revenue Administration, Welfare & District Development",
        department_ta="வருவாய் நிர்வாகம் மற்றும் மாவட்ட வளர்ச்சித் துறை",
        district_en="Salem",
        district_ta="சேலம்",
        taluk_en="Salem, Omalur, Mettur, Attur, Sankari, Edappadi, Gangavalli, Yercaud",
        office_name="District Collectorate, Salem",
        office_address="Collectorate Main Building, Collectorate Campus, Salem - 636001",
        official_email="collr-slm@nic.in",
        cug_phone="+91 427 2450001",
        official_portal_url="https://salem.nic.in",
        data_classification="CONFIDENTIAL",
        status="AVAILABLE",
        avatar_color="from-emerald-600 to-teal-700",
        reports_to=ReportingNode(
            id="grm-cs-01",
            name_en="N. Muruganandam, IAS",
            designation_en="Chief Secretary to Government",
            role_tier="CHIEF_SECRETARY",
            official_email="cs@tn.gov.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-dro-slm",
                name_en="P. Menaka, DRO",
                designation_en="District Revenue Officer (DRO), Salem",
                role_tier="GROUP_1",
                official_email="dro-slm@nic.in"
            ),
            ReportingNode(
                id="grm-rdo-slm",
                name_en="K. Abirami, RDO",
                designation_en="Revenue Divisional Officer, Salem Division",
                role_tier="GROUP_1",
                official_email="rdo-slm@nic.in"
            )
        ],
        subordinates_count=7800,
        responsibilities=[
            "District Executive Leadership across 9 Taluks and 20 Block Panchayats",
            "Mettur Dam Surplus Water Lift Irrigation Scheme (₹565 Cr) Project Direction",
            "CM Breakfast Scheme & Kalaignar Magalir Urimai Saturation Monitoring",
            "Public Grievance Redressal (Ungal Thogaiyil Muthalvar / Monday Petitions)"
        ],
        current_schemes=[
            "Chief Minister's Breakfast Scheme (1.24 Lakh Students Covered)",
            "Kalaignar Magalir Urimai Thittam",
            "Makkalai Thedi Maruthuvam Salem Saturation",
            "Pudhumai Penn & Tamil Pudhalvan"
        ],
        current_projects=[
            "Mettur 100 Water Bodies Surplus Lift Irrigation Scheme (₹565 Cr)",
            "Salem Textile & Apparel Processing Park (₹350 Cr)",
            "Salem Defense & Aerospace Manufacturing Corridor Node"
        ],
        current_committees=[
            "District Disaster Management Authority (Chairman)",
            "District Level Banking Committee (Chairman)",
            "District Agriculture & Irrigation Advisory Committee"
        ],
        pending_approvals_count=4,
        performance_kpi_score=93.9,
        recent_decisions=[
            "Achieved 98.3% saturation in CM Breakfast Scheme across 1,420 primary schools.",
            "Sanctioned trial runs for Mettur 100 surplus water bodies lift scheme before November."
        ],
        recent_gos=["G.O. (Ms) No. 182 - Mettur Canal Rejuvenation Package"],
        recent_circulars=["Collectorate Circular 2026/08 - e-Patta Settlement SLA Adherence"],
        ai_relationship_insights="District Collector Dr. R. Brindha Devi IAS works in close coordination with SP Kirubakaran IPS on law & order and public event security. High synergy with Water Resources Department on Mettur dam discharge and lift irrigation.",
        cross_department_collaborators=["Police (SP Kirubakaran IPS)", "Water Resources", "Rural Development", "Agriculture", "Social Welfare"],
        data_source=DataSourceMetadata(
            source_name="38 District Collectorates & Revenue e-District Hub",
            source_url="https://tnega.tn.gov.in/edistrict/roster",
            source_type="DISTRICT_COLLECTORATES",
            last_synced_at="2026-09-28T17:45:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 6. DISTRICT COLLECTOR - COIMBATORE (KRASTHI KUMAR PATI IAS)
    OfficialGRMProfile(
        id="grm-col-cbe-01",
        name_en="Krasthi Kumar Pati, IAS",
        name_ta="கிராந்தி குமார் பாடி, இ.ஆ.ப.",
        cadre="IAS",
        batch_year=2015,
        designation_en="District Collector & District Magistrate, Coimbatore",
        designation_ta="மாவட்ட ஆட்சித்தலைவர், கோயம்புத்தூர்",
        role_tier="GROUP_1",
        department_code="REVENUE",
        department_en="Revenue Administration, Disaster Management & Welfare",
        department_ta="வருவாய் நிர்வாகம் மற்றும் மாவட்ட வளர்ச்சி",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        taluk_en="Coimbatore North/South, Pollachi, Mettupalayam, Sulur, Annur, Valparai",
        office_name="District Collectorate, Coimbatore",
        office_address="District Collectorate, State Bank Road, Gopalapuram, Coimbatore - 641018",
        official_email="collr-cbe@nic.in",
        cug_phone="+91 422 2301114",
        official_portal_url="https://coimbatore.nic.in",
        data_classification="CONFIDENTIAL",
        status="AVAILABLE",
        avatar_color="from-blue-600 to-indigo-700",
        reports_to=ReportingNode(
            id="grm-cs-01",
            name_en="N. Muruganandam, IAS",
            designation_en="Chief Secretary to Government",
            role_tier="CHIEF_SECRETARY",
            official_email="cs@tn.gov.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-sp-cbe-01",
                name_en="K. Karthikeyan, IPS",
                designation_en="Superintendent of Police, Coimbatore Rural",
                role_tier="GROUP_1",
                official_email="sp-cbe@tncctns.gov.in"
            ),
            ReportingNode(
                id="grm-dro-cbe",
                name_en="M. Sharmila, DRO",
                designation_en="District Revenue Officer, Coimbatore",
                role_tier="GROUP_1",
                official_email="dro-cbe@nic.in"
            )
        ],
        subordinates_count=8900,
        responsibilities=[
            "District Executive Leadership across 11 Taluks & 30 Line Departments",
            "Coimbatore Western Ring Road (485 Acres) Land Acquisition & Handover",
            "Airport Runway Extension (627 Acres) Patta Land Settlement",
            "Grievance Redressal SLA Adherence and CM Dashboard Tracking"
        ],
        current_schemes=["Kalaignar Magalir Urimai Thittam", "Makkalai Thedi Maruthuvam", "Pudhumai Penn"],
        current_projects=["Coimbatore Western Ring Road (₹320 Cr)", "Semmozhi Poonga Botanical Garden (₹172 Cr)", "Avinashi Road Elevated Corridor (₹1,620 Cr)"],
        current_committees=["District Disaster Management Authority (Chairman)", "District Road Safety Committee (Chairman)"],
        pending_approvals_count=5,
        performance_kpi_score=93.6,
        recent_decisions=[
            "Disbursed 92% landowner compensation for Western Ring Road.",
            "Cleared 140 pending legal heir certificates within 48-hour SLA."
        ],
        recent_gos=["G.O. (Ms) No. 214 - Coimbatore Ring Road Land Settlement"],
        recent_circulars=["Collectorate Circular 14/2026 - TANGEDCO Utility Shifting Coordination"],
        ai_relationship_insights="Coimbatore Collectorate ranks #2 statewide in governance KPI. High collaboration with SP K. Karthikeyan IPS and Highways Department.",
        cross_department_collaborators=["Highways", "Police (SP K. Karthikeyan IPS)", "TANGEDCO", "Municipal Corp", "Forest"],
        data_source=DataSourceMetadata(
            source_name="38 District Collectorates & Revenue e-District Hub",
            source_url="https://tnega.tn.gov.in/edistrict/roster",
            source_type="DISTRICT_COLLECTORATES",
            last_synced_at="2026-09-28T17:45:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 7. SUPERINTENDENT OF POLICE - COIMBATORE (K. KARTHIKEYAN IPS)
    OfficialGRMProfile(
        id="grm-sp-cbe-01",
        name_en="K. Karthikeyan, IPS",
        name_ta="கே. கார்த்திகேயன், இ.கா.ப.",
        cadre="IPS",
        batch_year=2016,
        designation_en="Superintendent of Police (SP), Coimbatore Rural",
        designation_ta="காவல் கண்காணிப்பாளர், கோவை புறநகர்",
        role_tier="GROUP_1",
        department_code="HOME_POLICE",
        department_en="Tamil Nadu Police (Law & Order)",
        department_ta="காவல்துறை (சட்டம் ஒழுங்கு)",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        taluk_en="Pollachi, Mettupalayam, Sulur, Valparai",
        office_name="District Police Office, Coimbatore",
        office_address="District Police Office (DPO), State Bank Road, Coimbatore - 641018",
        official_email="sp-cbe@tncctns.gov.in",
        cug_phone="+91 422 2300062",
        official_portal_url="https://coimbatorepolice.tn.gov.in",
        data_classification="CONFIDENTIAL",
        status="AVAILABLE",
        avatar_color="from-indigo-600 to-indigo-800",
        reports_to=ReportingNode(
            id="grm-igp-west",
            name_en="K. Bhavaneeswari, IPS",
            designation_en="Inspector General of Police, West Zone",
            role_tier="INSPECTOR_GENERAL_OF_POLICE",
            official_email="igp-west@tncctns.gov.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-dsp-pollachi",
                name_en="S. Tamilselvan, DSP",
                designation_en="Deputy Superintendent of Police, Pollachi",
                role_tier="GROUP_1",
                official_email="dsp-pollachi@tncctns.gov.in"
            )
        ],
        subordinates_count=3100,
        responsibilities=[
            "Law & Order Maintenance across Pollachi, Mettupalayam, Sulur, and Valparai",
            "Inter-State Border Security Checkposts (Walayar, Gopalapuram to Kerala)",
            "Intelligent Traffic & CCTV Surveillance (96% network uptime)",
            "POCSO Fast-Track Investigation Units"
        ],
        current_schemes=["Project Kaval Karangal", "POCSO Fast-Track Prosecution", "Project Sirpi"],
        current_projects=["Smart Highway AI Surveillance Corridor (₹28 Cr)", "District Cyber Crime Lab Modernization"],
        current_committees=["District Road Safety Committee", "Anti-Narcotics Taskforce"],
        pending_approvals_count=2,
        performance_kpi_score=91.4,
        recent_decisions=[
            "Deployed 400 personnel for seasonal festival bandobast in Pollachi.",
            "Maintained zero communal incidents and 96% CCTV network uptime."
        ],
        recent_gos=["G.O. (Ms) No. 78 - Police Cyber Forensics Modernization"],
        recent_circulars=["SP Circular 09/2026 - Interstate Border Patrolling Directives"],
        ai_relationship_insights="Coimbatore Rural Police maintains seamless coordination with District Collector Krasthi Kumar Pati IAS on traffic safety and border checkposts.",
        cross_department_collaborators=["Revenue (Collectorate)", "Highways", "Transport", "Forest", "Kerala Police"],
        data_source=DataSourceMetadata(
            source_name="Police Headquarters & CCTNS State Command Telemetry",
            source_url="https://tnpolice.gov.in/cctns/officers",
            source_type="POLICE_HQ_CCTNS",
            last_synced_at="2026-09-28T20:00:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 8. PRINCIPAL SECRETARY - INDUSTRIES (V. ARUN ROY IAS)
    OfficialGRMProfile(
        id="grm-ps-ind-01",
        name_en="V. Arun Roy, IAS",
        name_ta="வி. அருண் ராய், இ.ஆ.ப.",
        cadre="IAS",
        batch_year=2003,
        designation_en="Principal Secretary to Government, Industries, Investment Promotion & Commerce",
        designation_ta="முதன்மைச் செயலாளர், தொழில், முதலீட்டு ஊக்குவிப்பு மற்றும் வர்த்தகத் துறை",
        role_tier="PRINCIPAL_SECRETARY",
        department_code="INDUSTRIES",
        department_en="Industries, Investment Promotion & Commerce",
        department_ta="தொழில் மற்றும் முதலீட்டு ஊக்குவிப்பு துறை",
        district_en="Statewide (Secretariat)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம்)",
        taluk_en="Chennai",
        office_name="Industries Department Secretariat",
        office_address="Industries Dept, 3rd Floor, Namakkal Kavignar Maaligai, Secretariat, Chennai - 600009",
        official_email="indsec@tn.gov.in",
        cug_phone="+91 44 2567 1822",
        official_portal_url="https://tnindustries.gov.in",
        data_classification="CONFIDENTIAL",
        status="AVAILABLE",
        avatar_color="from-purple-600 to-indigo-700",
        reports_to=ReportingNode(
            id="grm-cs-01",
            name_en="N. Muruganandam, IAS",
            designation_en="Chief Secretary to Government",
            role_tier="CHIEF_SECRETARY",
            official_email="cs@tn.gov.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-md-sipcot",
                name_en="K. Senthilraj, IAS",
                designation_en="Managing Director, SIPCOT",
                role_tier="COMMISSIONER",
                official_email="md@sipcot.in"
            ),
            ReportingNode(
                id="grm-md-tidco",
                name_en="B. Krishnamoorthy, IAS",
                designation_en="Managing Director, TIDCO",
                role_tier="COMMISSIONER",
                official_email="md@tidco.com"
            )
        ],
        subordinates_count=1850,
        responsibilities=[
            "Global Investment Promotion & Single Window Clearance (Guidance Tamil Nadu)",
            "Semiconductor & Advanced Electronics Policy Allotments (Krishnagiri & Hosur)",
            "SIPCOT Mega Industrial Park Infrastructure (400kV Substation, Industrial Water)",
            "EV Manufacturing Corridor & Non-Leather Footwear Mega Cluster Setup"
        ],
        current_schemes=["SIPCOT Mega Cluster Allotment Policy", "Electronics Manufacturing Capital Subsidy"],
        current_projects=["SIPCOT Krishnagiri Semiconductor Fab (₹4,800 Cr)", "Hosur EV Aerospace Park", "Cheyyar Mega Footwear SEZ"],
        current_committees=["Guidance TN Board of Directors", "SIPCOT Allotment Committee (Chairman)"],
        pending_approvals_count=4,
        performance_kpi_score=97.3,
        recent_decisions=[
            "Sanctioned dedicated 400kV transmission line for Krishnagiri Semiconductor Fab.",
            "Converted ₹78,000 Cr committed MOUs into active ground constructions."
        ],
        recent_gos=["G.O. (Ms) No. 89 - Krishnagiri Semiconductor Substation Sanction"],
        recent_circulars=["Circular 2026/IND-04 - Single Window 2.0 Fast Track SLA"],
        ai_relationship_insights="Principal Secretary V. Arun Roy IAS has achieved 97.3% fund absorption. Actively coordinates with Energy (TANGEDCO) and Revenue for industrial land handovers.",
        cross_department_collaborators=["Energy & TANGEDCO", "Revenue (Survey)", "Finance", "Guidance TN", "TIDCO", "SIPCOT"],
        data_source=DataSourceMetadata(
            source_name="Tamil Nadu Government State Portal",
            source_url="https://www.tn.gov.in/directory",
            source_type="TN_GOV_PORTAL",
            last_synced_at="2026-09-28T18:30:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 9. PRINCIPAL SECRETARY - HEALTH (P. SENTHILKUMAR IAS)
    OfficialGRMProfile(
        id="grm-ps-hlt-01",
        name_en="P. Senthilkumar, IAS",
        name_ta="பி. செந்தில்குமார், இ.ஆ.ப.",
        cadre="IAS",
        batch_year=1995,
        designation_en="Principal Secretary to Government, Health & Family Welfare",
        designation_ta="முதன்மைச் செயலாளர், மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
        role_tier="PRINCIPAL_SECRETARY",
        department_code="HEALTH",
        department_en="Health & Family Welfare Department",
        department_ta="மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலம்",
        district_en="Statewide (Secretariat)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம்)",
        taluk_en="Chennai",
        office_name="Health & Family Welfare Secretariat",
        office_address="Health Dept, 4th Floor, Secretariat, Chennai - 600009",
        official_email="hfsec@tn.gov.in",
        cug_phone="+91 44 2567 1875",
        official_portal_url="https://tnhealth.tn.gov.in",
        data_classification="CONFIDENTIAL",
        status="AVAILABLE",
        avatar_color="from-cyan-600 to-blue-700",
        reports_to=ReportingNode(
            id="grm-cs-01",
            name_en="N. Muruganandam, IAS",
            designation_en="Chief Secretary to Government",
            role_tier="CHIEF_SECRETARY",
            official_email="cs@tn.gov.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-md-tnmsc",
                name_en="M. Arvind, IAS",
                designation_en="Managing Director, TNMSC",
                role_tier="COMMISSIONER",
                official_email="md@tnmsc.tn.gov.in"
            ),
            ReportingNode(
                id="grm-dms-01",
                name_en="Dr. R. Shanthi, DMS",
                designation_en="Director of Medical & Rural Health Services",
                role_tier="COMMISSIONER",
                official_email="dms@tnhealth.tn.gov.in"
            )
        ],
        subordinates_count=42000,
        responsibilities=[
            "Statewide Public Health Systems, Primary Health Centers (PHCs) & District Hospitals",
            "Makkalai Thedi Maruthuvam (MTM) Doorstep Drug Delivery Expansion",
            "TNMSC Central Drug Procurement, Buffer Stock & Cold Chain Logistics",
            "Medical Services Recruitment Board (MRB) Doctor and Staff Nurse Inductions"
        ],
        current_schemes=["Makkalai Thedi Maruthuvam (1.08 Cr Citizens)", "Innuyir Kaappom - Nammai Kaakkum 48", "Kalaignar Comprehensive Health Insurance (CMCHIS)"],
        current_projects=["TNMSC Central Drug Inventory Automation (RFID)", "Madurai AIIMS Connecting Infrastructure Coordination", "District Emergency Trauma Centers"],
        current_committees=["State Drug Procurement Oversight Board (Chairman)", "Epidemic Control & Disease Surveillance Taskforce"],
        pending_approvals_count=4,
        performance_kpi_score=94.2,
        recent_decisions=[
            "Dispatched emergency Anti-D Globulin and obstetric buffer stocks to Madurai GRH.",
            "Sanctioned 1,800 MRB Staff Nurse recruitments to fill critical ICU vacancies."
        ],
        recent_gos=["G.O. (Ms) No. 142 - TNMSC Automated Drug Warehouse Expansion"],
        recent_circulars=["Health Circular 2026/05 - Dengue & Seasonal Vector Surveillance"],
        ai_relationship_insights="Health Secretary maintains 96.2% budget absorption with exceptional doorstep outreach. Works closely with District Collectors on hospital drug buffers.",
        cross_department_collaborators=["District Collectors", "TNMSC", "MRB", "Social Welfare", "Finance"],
        data_source=DataSourceMetadata(
            source_name="Health & Family Welfare (TNMSC / MRB) Directory",
            source_url="https://tnmsc.tn.gov.in/directory",
            source_type="HEALTH_TNMSC_MRB",
            last_synced_at="2026-09-28T16:30:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 10. BDO - THIRUVAIYARU (M. SHANMUGAM BDO)
    OfficialGRMProfile(
        id="grm-bdo-thiruvaiyaru-01",
        name_en="M. Shanmugam",
        name_ta="மு. சண்முகம்",
        cadre="TNCS_GRP2",
        batch_year=2012,
        designation_en="Block Development Officer (BDO), Thiruvaiyaru Block",
        designation_ta="வட்டார வளர்ச்சி அலுவலர், திருவையாறு ஊராட்சி ஒன்றியம்",
        role_tier="GROUP_2",
        department_code="RURAL_DEV",
        department_en="Rural Development & Panchayat Raj Department",
        department_ta="ஊரக வளர்ச்சி மற்றும் ஊராட்சித் துறை",
        district_en="Thanjavur",
        district_ta="தஞ்சாவூர்",
        taluk_en="Thiruvaiyaru",
        office_name="Thiruvaiyaru Panchayat Union Office",
        office_address="Panchayat Union Office, Main Road, Thiruvaiyaru, Thanjavur - 613204",
        official_email="bdo-thiruvaiyaru@tn.gov.in",
        cug_phone="+91 4362 260222",
        official_portal_url="https://thanjavur.nic.in/rural",
        data_classification="OFFICIAL_PUBLIC",
        status="AVAILABLE",
        avatar_color="from-teal-600 to-emerald-700",
        reports_to=ReportingNode(
            id="grm-col-tnj-01",
            name_en="B. Priyanka Pankajam, IAS",
            designation_en="District Collector, Thanjavur",
            role_tier="DISTRICT_COLLECTOR",
            official_email="collr-tnj@nic.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-panchayat-sec-01",
                name_en="R. Ganesan",
                designation_en="Panchayat Secretary, Thiruvaiyaru North",
                role_tier="GROUP_3_4",
                official_email="panchayat-thiruvaiyaru@tn.gov.in"
            )
        ],
        subordinates_count=240,
        responsibilities=[
            "Block Level Rural Development across 34 Village Panchayats in Vennar sub-basin",
            "MGNREGS Tail-End Delta Canal Desilting & Sluice Maintenance",
            "Anaithu Grama Anna Marumalarchi Thittam (AGAMT) Village Infrastructure Execution",
            "Jal Jeevan Mission 100% Household Tap Connection Verification"
        ],
        current_schemes=["MGNREGS Rural Desilting", "Kalaignar Kanavu Illam", "Anaithu Grama Anna Marumalarchi Thittam"],
        current_projects=["Vennar Sub-Basin Desilting Package II", "Panchayat Solar Pumping Stations"],
        current_committees=["Block Level Monitoring Committee", "Thiruvaiyaru Farmers Welfare Council"],
        pending_approvals_count=3,
        performance_kpi_score=95.4,
        recent_decisions=[
            "Completed 97% of monsoon canal desilting ensuring irrigation water reaches tail-end delta farmers.",
            "Disbursed 100% of MGNREGS wages via direct biometric Aadhaar DBT."
        ],
        recent_gos=["G.O. (Ms) No. 52 - Delta Desilting Sanctions 2026"],
        recent_circulars=["BDO Circular 03/2026 - Jal Jeevan Quality Audit"],
        ai_relationship_insights="BDO Thiruvaiyaru maintains strong collaboration with Delta MLAs and Water Resources Department engineers on tail-end canal inflow regulation.",
        cross_department_collaborators=["Water Resources Dept", "Agriculture", "District Collector Thanjavur", "Delta MLAs"],
        data_source=DataSourceMetadata(
            source_name="38 District Collectorates & Revenue e-District Hub",
            source_url="https://tnega.tn.gov.in/edistrict/roster",
            source_type="DISTRICT_COLLECTORATES",
            last_synced_at="2026-09-28T17:45:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 11. VAO - SALEM WEST (S. ANBARASAN VAO)
    OfficialGRMProfile(
        id="grm-vao-salemwest-01",
        name_en="S. Anbarasan",
        name_ta="எஸ். அன்பரசன்",
        cadre="TNCS_GRP3_4",
        batch_year=2019,
        designation_en="Village Administrative Officer (VAO), Salem West Taluk",
        designation_ta="கிராம நிர்வாக அலுவலர், சேலம் மேற்கு வட்டம்",
        role_tier="GROUP_3_4",
        department_code="REVENUE",
        department_en="Revenue Administration & Land Records",
        department_ta="வருவாய்த்துறை & நில ஆவணங்கள்",
        district_en="Salem",
        district_ta="சேலம்",
        taluk_en="Salem West",
        office_name="Village Administrative Office, Suramangalam",
        office_address="Village Administrative Office, Suramangalam, Salem - 636005",
        official_email="vao-salemwest@tn.gov.in",
        cug_phone="+91 94433 87654",
        official_portal_url="https://eseva.tn.gov.in",
        data_classification="OFFICIAL_PUBLIC",
        status="AVAILABLE",
        avatar_color="from-amber-600 to-rose-700",
        reports_to=ReportingNode(
            id="grm-tah-slmwest",
            name_en="V. Murugesan, Tahsildar",
            designation_en="Tahsildar, Salem West Taluk",
            role_tier="GROUP_2",
            official_email="tah-salemwest@tn.gov.in"
        ),
        direct_reports=[],
        subordinates_count=4,
        responsibilities=[
            "Village Revenue Administration, Patta Mutation & Chitta Verification",
            "Doorstep Verification for Kalaignar Magalir Urimai Thittam & Social Security Pensions",
            "Disaster First Responder & Relief Enumeration",
            "e-Seva Online Certificate Issuance (Income, Community, Legal Heir, Nativity)"
        ],
        current_schemes=["e-Patta Online Settlement Drive", "Kalaignar Magalir Urimai Thittam Verification", "Pattadharar Varisu Settlement"],
        current_projects=["Anywhere Anytime e-Patta 100% Saturation", "Crop Damage GIS Enumeration"],
        current_committees=["Village Level Disaster Management Committee", "Jamabandi Revenue Verification Team"],
        pending_approvals_count=2,
        performance_kpi_score=98.0,
        recent_decisions=[
            "Achieved 98% SLA on-time rate for online e-patta settlements.",
            "Issued 4,120 verified e-patta transfer orders with zero public escalations."
        ],
        recent_gos=["G.O. (Ms) No. 34 - Anywhere Anytime e-Patta Operations"],
        recent_circulars=["Taluk Circular 08/2026 - Doorstep Verification Guidelines"],
        ai_relationship_insights="VAO S. Anbarasan is top-rated in Salem district for 48-hour patta transfer turnaround time and citizen satisfaction.",
        cross_department_collaborators=["Tahsildar Salem West", "Surveyors", "Agriculture Officers", "Collectorate"],
        data_source=DataSourceMetadata(
            source_name="38 District Collectorates & Revenue e-District Hub",
            source_url="https://tnega.tn.gov.in/edistrict/roster",
            source_type="DISTRICT_COLLECTORATES",
            last_synced_at="2026-09-28T17:45:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    ),

    # 12. TAHSILDAR - COIMBATORE NORTH (M. SHANMUGASUNDARAM)
    OfficialGRMProfile(
        id="grm-tah-cbenorth-01",
        name_en="M. Shanmugasundaram",
        name_ta="மு. சண்முகசுந்தரம்",
        cadre="TNCS_GRP2",
        batch_year=2012,
        designation_en="Tahsildar, Coimbatore North Taluk",
        designation_ta="வட்டாட்சியர், கோயம்புத்தூர் வடக்கு வட்டம்",
        role_tier="GROUP_2",
        department_code="REVENUE",
        department_en="Revenue Administration",
        department_ta="வருவாய் நிர்வாகம்",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        taluk_en="Coimbatore North",
        office_name="Coimbatore North Taluk Office",
        office_address="Taluk Office, Balasundaram Road, Coimbatore - 641018",
        official_email="tah-cbenorth@tn.gov.in",
        cug_phone="+91 422 2247833",
        official_portal_url="https://coimbatore.nic.in/revenue",
        data_classification="OFFICIAL_PUBLIC",
        status="AVAILABLE",
        avatar_color="from-blue-600 to-teal-700",
        reports_to=ReportingNode(
            id="grm-col-cbe-01",
            name_en="Krasthi Kumar Pati, IAS",
            designation_en="District Collector, Coimbatore",
            role_tier="DISTRICT_COLLECTOR",
            official_email="collr-cbe@nic.in"
        ),
        direct_reports=[
            ReportingNode(
                id="grm-dt-cbenorth",
                name_en="K. Rajendran",
                designation_en="Deputy Tahsildar (Land Records)",
                role_tier="GROUP_2",
                official_email="dt-cbenorth@tn.gov.in"
            )
        ],
        subordinates_count=45,
        responsibilities=[
            "Taluk Revenue Records, Patta Sub-divisions & Online FMB Digitization",
            "Land Acquisition Survey Coordination for Coimbatore Western Ring Road",
            "Public Grievance Redressal Day (Monday Petitions)",
            "Disaster Response & Urban Flood Relief Operations"
        ],
        current_schemes=["Kalaignar Magalir Urimai Thittam", "Pattadhari Grievance Redressal Mission"],
        current_projects=["Digitization of 45,000 FMB Sketches", "e-Adangal Crop Survey 100% Saturation"],
        current_committees=["Taluk Supply & Ration Review Committee", "Taluk Eviction Squad"],
        pending_approvals_count=6,
        performance_kpi_score=91.2,
        recent_decisions=[
            "Cleared 140 pending legal heir certificates within 48-hour SLA.",
            "Handed over surveyed land records for Western Ring Road package II."
        ],
        recent_gos=["G.O. (Ms) No. 94 - Urban Revenue Modernization"],
        recent_circulars=["Taluk Circular 05/2026 - Survey SLA Compliance"],
        ai_relationship_insights="Tahsildar M. Shanmugasundaram collaborates directly with Collector Krasthi Kumar Pati IAS on infrastructure land settlement.",
        cross_department_collaborators=["District Collector Coimbatore", "DRO", "Surveyors", "TANGEDCO", "Highways"],
        data_source=DataSourceMetadata(
            source_name="38 District Collectorates & Revenue e-District Hub",
            source_url="https://tnega.tn.gov.in/edistrict/roster",
            source_type="DISTRICT_COLLECTORATES",
            last_synced_at="2026-09-28T17:45:00Z",
            sync_version="v2026.9.28",
            is_verified=True
        )
    )
]


# ==========================================
# SEARCH & AUTOCOMPLETE ENGINE
# ==========================================
def search_grm_directory(
    query: Optional[str] = None,
    cadre: Optional[str] = None,
    department: Optional[str] = None,
    district: Optional[str] = None,
    role_tier: Optional[str] = None,
    limit: int = 50
) -> GRMSearchResponse:
    q = (query or "").lower().strip()
    cadre_f = (cadre or "").upper().strip()
    dept_f = (department or "").lower().strip()
    dist_f = (district or "").lower().strip()
    tier_f = (role_tier or "").upper().strip()

    matches: List[OfficialGRMProfile] = []

    # Cadre counts
    cadre_counts = {"ALL": len(OFFICIALS_GRM_MASTER), "IAS": 0, "IPS": 0, "IRS": 0, "IFS": 0, "TNCS": 0, "MINISTER": 0}

    for off in OFFICIALS_GRM_MASTER:
        # Tally cadres
        c_key = off.cadre
        if "TNCS" in c_key:
            cadre_counts["TNCS"] = cadre_counts.get("TNCS", 0) + 1
        elif c_key in cadre_counts:
            cadre_counts[c_key] += 1
        else:
            cadre_counts[c_key] = 1

        # Apply Cadre filter
        if cadre_f and cadre_f != "ALL":
            if cadre_f == "TNCS" and "TNCS" not in off.cadre:
                continue
            elif cadre_f != "TNCS" and off.cadre != cadre_f:
                continue

        # Apply Tier filter
        if tier_f and tier_f != "ALL" and off.role_tier != tier_f:
            continue

        # Apply Department filter
        if dept_f and dept_f not in off.department_en.lower() and dept_f not in off.department_ta.lower():
            continue

        # Apply District filter
        if dist_f and (not off.district_en or (dist_f not in off.district_en.lower() and dist_f not in off.district_ta.lower())):
            continue

        # Apply Search query matching
        if q:
            search_corpus = (
                f"{off.name_en} {off.name_ta} {off.cadre} {off.batch_year or ''} "
                f"{off.designation_en} {off.designation_ta} {off.department_en} {off.department_ta} "
                f"{off.district_en or ''} {off.taluk_en or ''} {off.office_name} {off.office_address} "
                f"{off.official_email} {off.cug_phone} {' '.join(off.responsibilities)} "
                f"{' '.join(off.current_schemes)} {' '.join(off.current_projects)} "
                f"{' '.join(off.current_committees)} {off.ai_relationship_insights or ''}"
            ).lower()

            tokens = [t for t in re.split(r"[\s,]+", q) if len(t) > 1]
            if tokens and not any(t in search_corpus for t in tokens):
                continue

        matches.append(off)

    return GRMSearchResponse(
        query_interpreted=f"GRM Directory Query: Query=[{q or 'ALL'}], Cadre=[{cadre_f or 'ALL'}], Dept=[{dept_f or 'ALL'}], District=[{dist_f or 'ALL'}]",
        total_results=len(matches),
        cadre_counts=cadre_counts,
        officers=matches[:limit]
    )


def get_grm_autocomplete(query: str, limit: int = 8) -> List[AutocompleteItem]:
    q = query.lower().strip()
    if not q:
        return [
            AutocompleteItem(
                id=o.id,
                name_en=o.name_en,
                name_ta=o.name_ta,
                cadre=o.cadre,
                batch_year=o.batch_year,
                designation_en=o.designation_en,
                department_en=o.department_en,
                district_en=o.district_en,
                office_name=o.office_name,
                official_email=o.official_email,
                cug_phone=o.cug_phone,
                status=o.status,
                avatar_color=o.avatar_color,
                role_tier=o.role_tier
            )
            for o in OFFICIALS_GRM_MASTER[:limit]
        ]

    matched_items = []
    for o in OFFICIALS_GRM_MASTER:
        haystack = f"{o.name_en} {o.name_ta} {o.cadre} {o.designation_en} {o.department_en} {o.district_en or ''} {o.official_email} {o.cug_phone}".lower()
        if q in haystack or any(term in haystack for term in q.split() if len(term) > 1):
            matched_items.append(
                AutocompleteItem(
                    id=o.id,
                    name_en=o.name_en,
                    name_ta=o.name_ta,
                    cadre=o.cadre,
                    batch_year=o.batch_year,
                    designation_en=o.designation_en,
                    department_en=o.department_en,
                    district_en=o.district_en,
                    office_name=o.office_name,
                    official_email=o.official_email,
                    cug_phone=o.cug_phone,
                    status=o.status,
                    avatar_color=o.avatar_color,
                    role_tier=o.role_tier
                )
            )
            if len(matched_items) >= limit:
                break

    return matched_items


def get_official_profile_by_id(officer_id: str) -> Optional[OfficialGRMProfile]:
    for o in OFFICIALS_GRM_MASTER:
        if o.id == officer_id:
            return o
    return OFFICIALS_GRM_MASTER[0] if OFFICIALS_GRM_MASTER else None


# ==========================================
# AI GOVERNMENT RELATIONSHIP INTELLIGENCE
# ==========================================
def analyze_relationship_intelligence(req: RelationshipIntelligenceQuery) -> RelationshipIntelligenceResponse:
    t = req.topic.lower().strip()
    dept = (req.department or "").lower()
    dist = (req.district or "").lower()

    recommended: List[RecommendedOfficerItem] = []
    supporting_gos: List[str] = []
    suggested_agendas: List[str] = []

    # Priority matches based on semantic domains
    if "pocso" in t or "posco" in t or "crime" in t or "police" in t or "law" in t:
        # Match Law Minister, SP Salem (Kirubakaran IPS), SP Coimbatore (Karthikeyan IPS), Chief Secretary
        for o in OFFICIALS_GRM_MASTER:
            if "kirubakaran" in o.name_en.lower() or "salem" in (o.district_en or "").lower():
                recommended.append(RecommendedOfficerItem(
                    officer=o,
                    relevance_score=98.5,
                    reason_en="Direct Enforcement Officer: Leads Salem Police POCSO Fast-Track Units and AI Speed Corridor.",
                    reason_ta="சேலம் மாவட்ட போக்சோ விரைவு விசாரணை மற்றும் சட்டம் ஒழுங்கு தளபதி.",
                    recommended_role="ENFORCEMENT_OFFICER"
                ))
            elif "cs@tn.gov.in" in o.official_email:
                recommended.append(RecommendedOfficerItem(
                    officer=o,
                    relevance_score=95.0,
                    reason_en="Administrative Synergy Chair: Oversees Inter-Departmental Law & Home coordination.",
                    reason_ta="தலைமை ஒருங்கிணைப்பு அதிகாரி.",
                    recommended_role="PRIMARY_CHAIR"
                ))
            elif "karthikeyan" in o.name_en.lower():
                recommended.append(RecommendedOfficerItem(
                    officer=o,
                    relevance_score=91.0,
                    reason_en="Subject Matter Expert: Coimbatore Highway & Cyber Crime unit leader.",
                    reason_ta="சைபர் குற்றங்கள் மற்றும் நெடுஞ்சாலை பாதுகாப்பு வல்லுநர்.",
                    recommended_role="SUBJECT_MATTER_EXPERT"
                ))

        suggested_agendas = [
            "Review of POCSO Act trial velocities and clearing 60-day charge-sheet pendency.",
            "Forensic laboratory test turnaround speed acceleration across districts.",
            "Interstate border checkpost ANPR surveillance integration."
        ]
        supporting_gos = [
            "G.O. (Ms) No. 284 - Special POCSO Fast-Track Prosecution Sanctions",
            "G.O. (Ms) No. 78 - Police Cyber Forensics Modernization"
        ]
        summary_en = "High-level Law & Enforcement Bench convened. Recommended primary participants include SP Kirubakaran IPS (Salem), Chief Secretary, and SP K. Karthikeyan IPS (Coimbatore) to review prosecution velocity and cyber telemetry."
        summary_ta = "சட்டம் ஒழுங்கு மற்றும் போக்சோ விரைவு நீதிமன்ற ஆய்வு. சேலம் எஸ்.பி கிருபாகரன் இ.கா.ப., தலைமைச் செயலாளர் மற்றும் கோவை எஸ்.பி கார்த்திகேயன் இ.கா.ப. பங்கேற்க பரிந்துரைக்கப்படுகிறது."

    elif "tax" in t or "gst" in t or "revenue" in t or "fraud" in t or "commercial" in t:
        # Match Kayalvizhi IRS, Finance Minister, Chief Secretary
        for o in OFFICIALS_GRM_MASTER:
            if "kayalvizhi" in o.name_en.lower():
                recommended.append(RecommendedOfficerItem(
                    officer=o,
                    relevance_score=99.2,
                    reason_en="Lead Enforcement Authority: Head of Commercial Taxes GST Anti-Evasion & Invoicing Analytics.",
                    reason_ta="வணிக வரி மற்றும் ஜிஎஸ்டி போலி ரசீது தடுப்பு முதன்மை அதிகாரி.",
                    recommended_role="PRIMARY_CHAIR"
                ))
            elif "cs@tn.gov.in" in o.official_email:
                recommended.append(RecommendedOfficerItem(
                    officer=o,
                    relevance_score=93.0,
                    reason_en="State Treasury Oversight: Ensures inter-departmental IFHRMS budget adherence.",
                    reason_ta="மாநில கருவூல நிதி மேற்பார்வை.",
                    recommended_role="PRIMARY_CHAIR"
                ))
            elif "col-slm" in o.id or "col-cbe" in o.id:
                recommended.append(RecommendedOfficerItem(
                    officer=o,
                    relevance_score=88.0,
                    reason_en="District Revenue Collector: Enforces stamp duty and local commercial revenue.",
                    reason_ta="மாவட்ட வருவாய் அமலாக்கம்.",
                    recommended_role="FIELD_LEAD"
                ))

        suggested_agendas = [
            "AI detection of bogus circular billing in scrap and industrial clusters.",
            "Q3 GST target achievement review and revenue leakage plug.",
            "IFHRMS 2.0 digital reconciliation with Commercial Tax database."
        ]
        supporting_gos = [
            "G.O. (Ms) No. 91 - Commercial Taxes Anti-Evasion Enforcement Powers",
            "G.O. (Ms) No. 102 - Treasury Digital Verification Framework"
        ]
        summary_en = "Revenue & Fiscal Integrity Bench. Recommended lead: Joint Commissioner Kayalvizhi IRS (Commercial Taxes) along with Chief Secretary and District Collectors to review ₹38.4 Cr scrap tax leakage recovery."
        summary_ta = "வரி வருவாய் மற்றும் ஜிஎஸ்டி தணிக்கை கூட்டம். இணை ஆணையர் கயல்விழி இ.வ.ப. மற்றும் தலைமைச் செயலாளர் தலைமையில் ₹38.4 கோடி வரி ஏய்ப்பு தடுப்பு ஆய்வு."

    elif "water" in t or "dam" in t or "mettur" in t or "kuruvai" in t or "delta" in t or "flood" in t:
        # Match Collector Salem (Dr. Brindha Devi IAS), BDO Thiruvaiyaru (M. Shanmugam), Chief Secretary
        for o in OFFICIALS_GRM_MASTER:
            if "col-slm" in o.id:
                recommended.append(RecommendedOfficerItem(
                    officer=o,
                    relevance_score=98.0,
                    reason_en="Mettur Dam Jurisdiction Lead: Supervises Mettur 100 surplus water lift irrigation.",
                    reason_ta="மேட்டூர் அணை மற்றும் உபரி நீர் திட்ட தலைமை பொறுப்பாளர்.",
                    recommended_role="PRIMARY_CHAIR"
                ))
            elif "bdo-thiruvaiyaru" in o.id:
                recommended.append(RecommendedOfficerItem(
                    officer=o,
                    relevance_score=94.0,
                    reason_en="Grassroots Delta Canal Overseer: Manages Vennar sub-basin tail-end canal desilting.",
                    reason_ta="டெல்டா கடைமடை பாசன கால்வாய் மேற்பார்வை அலுவலர்.",
                    recommended_role="FIELD_LEAD"
                ))
            elif "cs@tn.gov.in" in o.official_email:
                recommended.append(RecommendedOfficerItem(
                    officer=o,
                    relevance_score=92.0,
                    reason_en="State Crisis & Disaster Coordinator: Manages inter-district water release approvals.",
                    reason_ta="மாநில பேரிடர் மற்றும் நீர் பகிர்வு ஒருங்கிணைப்பு.",
                    recommended_role="PRIMARY_CHAIR"
                ))

        suggested_agendas = [
            "Mettur Dam discharge synchronization for tail-end delta farmers.",
            "Monsoon desilting cross-section audit in Thanjavur & Tiruvarur.",
            "DAP fertilizer buffer stock distribution via TANFED depots."
        ]
        supporting_gos = [
            "G.O. (Ms) No. 84 - Delta Kuruvai Special Irrigation Package",
            "G.O. (Ms) No. 182 - Mettur Canal Rejuvenation Sanctions"
        ]
        summary_en = "Water Resources & Delta Irrigation Command. Recommended team: Salem Collector Dr. R. Brindha Devi IAS, Thiruvaiyaru BDO M. Shanmugam, and Chief Secretary."
        summary_ta = "நீர்வளம் மற்றும் டெல்டா பாசன நீர் பகிர்வு மேலாண்மை. சேலம் ஆட்சியர் மரு. பிருந்தாதேவி இ.ஆ.ப. மற்றும் திருவையாறு பி.டி.ஓ சண்முகம் பங்கேற்க பரிந்துரைக்கப்படுகிறது."

    else:
        # General Executive governance team
        for o in OFFICIALS_GRM_MASTER[:4]:
            recommended.append(RecommendedOfficerItem(
                officer=o,
                relevance_score=90.0,
                reason_en=f"Core Executive Leadership in {o.department_en}.",
                reason_ta=f"{o.department_ta} முதன்மை நிர்வாக தலைமை.",
                recommended_role="SUBJECT_MATTER_EXPERT"
            ))
        suggested_agendas = [
            "Review of departmental milestone progress and SLA compliance.",
            "Inter-departmental synergy and bottleneck removal."
        ]
        supporting_gos = ["G.O. (Ms) No. 102 - Statewide Governance Framework 2026"]
        summary_en = f"Governance Review on '{req.topic}'. Recommended inter-departmental roster prepared."
        summary_ta = f"'{req.topic}' குறித்த அரசு ஆய்வு கூட்டம்."

    # Escalation Path
    escalation_path = [
        ReportingNode(id="grm-cm-01", name_en="Hon'ble Chief Minister", designation_en="Head of State Government", role_tier="CHIEF_MINISTER", official_email="cmcell@tn.gov.in"),
        ReportingNode(id="grm-cs-01", name_en="Chief Secretary to Government", designation_en="Chief Secretary", role_tier="CHIEF_SECRETARY", official_email="cs@tn.gov.in"),
        ReportingNode(id="grm-field-01", name_en="District Collector / SP / Joint Commissioner", designation_en="Field Executive Authority", role_tier="GROUP_1", official_email="field@tn.gov.in")
    ]

    return RelationshipIntelligenceResponse(
        query_topic=req.topic,
        recommended_participants=recommended,
        escalation_path=escalation_path,
        ai_executive_summary_en=summary_en,
        ai_executive_summary_ta=summary_ta,
        suggested_agenda_items=suggested_agendas,
        supporting_gos=supporting_gos
    )
