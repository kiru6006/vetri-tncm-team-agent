from typing import List, Optional, Dict, Any
from app.schemas.calendar import (
    OfficerDirectoryItem,
    DirectorySearchFilter,
    DirectorySearchResponse,
    DepartmentFundMetric,
    DepartmentStaffingMetric,
    ProjectDetail,
    SchemeDetail
)


TAMIL_NADU_OFFICIALS_DIRECTORY: List[OfficerDirectoryItem] = [
    # 1. MINISTERS
    OfficerDirectoryItem(
        id="dir-min-01",
        name_en="Thiru Thangam Thennarasu",
        name_ta="திரு தங்கம் தென்னரசு",
        designation_en="Hon'ble Minister for Finance, Planning & Human Resources Management",
        designation_ta="மாண்புமிகு நிதி, மனிதவள மேலாண்மைத் துறை அமைச்சர்",
        role_tier="MINISTER",
        department_en="Finance, Planning & HR",
        department_ta="நிதி, திட்டமிடல் மற்றும் மனிதவளத் துறை",
        district_en="Statewide / Virudhunagar",
        district_ta="மாநிலம் முழுவதும் / விருதுநகர்",
        constituency="Tiruchuli",
        official_email="finmin@tn.gov.in",
        cug_phone="+91 44 2567 1122",
        office_address="Minister Chamber, Secretariat, Fort St. George, Chennai",
        current_schemes=["State Budget Allocation 2026", "Kalaignar Magalir Urimai Thittam (KMUT)", "Fiscal Discipline Framework"],
        current_projects=["State Economic Advisory Council", "Tamil Nadu Infrastructure Fund", "Public Financial Management System"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=38500.0,
            funds_released_cr=29400.0,
            expenditure_spent_cr=27850.0,
            utilization_pct=94.7,
            unspent_balance_cr=1550.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["Capital Capex expenditure on track; Treasury digital disbursements at 99.2%."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=8400,
            in_position_staff=7350,
            vacant_posts=1050,
            vacancy_pct=12.5,
            demand_urgency="MODERATE",
            top_shortage_roles=["Treasury Accounts Officers (Group 1)", "Sub-Treasury Assistants", "Audit Inspectors"],
            ai_staffing_remedy_en="Recruit 180 Accounts Officers via TNPSC Special Batch and deploy automated digital reconciliation to reduce manual accounting backlog.",
            ai_staffing_remedy_ta="டிஎன்பிஎஸ்சி மூலம் 180 கணக்கு அதிகாரிகளை நியமித்து டிஜிட்டல் சரிபார்ப்பு அமைப்பை விரிவுபடுத்தவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="IFHRMS 2.0 Unified Treasury Cloud", sanctioned_cost_cr=420.0, physical_progress_pct=92.0, financial_progress_pct=88.5, target_completion="Nov 2026"),
            ProjectDetail(name="TN Public Debt Reduction Cell", sanctioned_cost_cr=50.0, physical_progress_pct=100.0, financial_progress_pct=95.0, target_completion="Completed")
        ],
        detailed_schemes=[
            SchemeDetail(name="Kalaignar Magalir Urimai Thittam", target_beneficiaries="1.15 Crore Women", actual_covered="1.14 Crore Women", saturation_pct=99.1, annual_budget_cr=13800.0, disbursement_status="Direct Bank Transfer on 15th of Every Month")
        ],
        ai_strategic_analysis_en="Finance department maintains robust state treasury liquidity with GST collection efficiency exceeding target by 4.2%. Primary attention required on fast-tracking capex transfers to Highways and Water Resources.",
        ai_strategic_analysis_ta="நிதித்துறை வலுவான நிதி மேலாண்மையை பராமரித்து வருகிறது. ஜிஎஸ்டி வசூல் இலக்கை விட 4.2% அதிகரித்துள்ளது."
    ),

    OfficerDirectoryItem(
        id="dir-min-02",
        name_en="Thiru S. Regupathy",
        name_ta="திரு எஸ். ரகுபதி",
        designation_en="Hon'ble Minister for Law, Courts, Prisons & Prevention of Corruption",
        designation_ta="மாண்புமிகு சட்டம், நீதிமன்றங்கள், சிறைச்சாலைகள் துறை அமைச்சர்",
        role_tier="MINISTER",
        department_en="Law & Courts",
        department_ta="சட்டம் மற்றும் நீதிமன்றங்கள் துறை",
        district_en="Statewide / Pudukkottai",
        district_ta="மாநிலம் முழுவதும் / புதுக்கோட்டை",
        constituency="Tirumayam",
        official_email="lawmin@tn.gov.in",
        cug_phone="+91 44 2567 1144",
        office_address="Minister Chamber, Secretariat, Fort St. George, Chennai",
        current_schemes=["Fast Track Courts Modernization", "POCSO Special Court Infrastructure", "e-Courts Phase 3 Support"],
        current_projects=["Madurai High Court Bench Expansion", "Special POCSO Forensic Speed Trials", "Legal Aid Digital Cell"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=2450.0,
            funds_released_cr=1920.0,
            expenditure_spent_cr=1640.0,
            utilization_pct=85.4,
            unspent_balance_cr=280.0,
            fiscal_health_status="ON_TRACK",
            flagged_variance_areas=["Fast Track POCSO Court infrastructure funds require expedited civil sanctions in 6 districts."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=4600,
            in_position_staff=3620,
            vacant_posts=980,
            vacancy_pct=21.3,
            demand_urgency="CRITICAL",
            top_shortage_roles=["Special Public Prosecutors (POCSO)", "Judicial Translators", "Court Clerical Cadre"],
            ai_staffing_remedy_en="Appoint 48 contract Special Public Prosecutors for POCSO Fast-Track Courts immediately to clear 1,240 pending trials.",
            ai_staffing_remedy_ta="போக்சோ விரைவு நீதிமன்றங்களுக்கு 48 சிறப்பு அரசு வழக்கறிஞர்களை உடனடியாக நியமித்து 1,240 நிலுவை வழக்குகளை விரைந்து முடிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="POCSO Special Fast-Track Court Network", sanctioned_cost_cr=180.0, physical_progress_pct=84.0, financial_progress_pct=79.0, target_completion="Dec 2026", bottleneck_en="Forensic lab report speed coordination with Home Dept"),
            ProjectDetail(name="e-Courts Digital Video Linkage to 142 Prisons", sanctioned_cost_cr=95.0, physical_progress_pct=91.0, financial_progress_pct=86.0, target_completion="Oct 2026")
        ],
        detailed_schemes=[
            SchemeDetail(name="Free Legal Aid & Victim Compensation Fund", target_beneficiaries="25,000 Litigants", actual_covered="22,400 Litigants", saturation_pct=89.6, annual_budget_cr=65.0, disbursement_status="Active")
        ],
        ai_strategic_analysis_en="Law Ministry needs joint emergency bench with Home & DGP to reduce POCSO forensic timeline from 45 days to 14 days and fill 48 vacant Public Prosecutor chairs.",
        ai_strategic_analysis_ta="சட்டத்துறையும் காவல்துறையும் இணைந்து போக்சோ தடயவியல் அறிக்கைகளை 14 நாட்களுக்குள் பெற்றுத் தரும் விரைவு நடவடிக்கையை எடுக்க வேண்டும்."
    ),

    OfficerDirectoryItem(
        id="dir-min-03",
        name_en="Thiru Duraimurugan",
        name_ta="திரு துரைமுருகன்",
        designation_en="Hon'ble Minister for Water Resources & Mines",
        designation_ta="மாண்புமிகு நீர்வளத்துறை அமைச்சர்",
        role_tier="MINISTER",
        department_en="Water Resources",
        department_ta="நீர்வளத்துறை",
        district_en="Statewide / Vellore",
        district_ta="மாநிலம் முழுவதும் / வேலூர்",
        constituency="Katpadi",
        official_email="wrdmin@tn.gov.in",
        cug_phone="+91 44 2567 1100",
        office_address="Minister Chamber, Secretariat, Fort St. George, Chennai",
        current_schemes=["Cauvery Delta Kuruvai Special Irrigation Package", "Kudimaramathu Scheme", "Groundwater Recharge Mission"],
        current_projects=["Thamirabarani-Karumeniyar-Nambiyar River Linking", "Mettur Surplus Flood Water Canal Scheme", "Kosasthalaiyar Basin Flood Mitigation"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=9680.0,
            funds_released_cr=7850.0,
            expenditure_spent_cr=6920.0,
            utilization_pct=88.2,
            unspent_balance_cr=930.0,
            fiscal_health_status="ON_TRACK",
            flagged_variance_areas=["Desilting fund absorption completed at 96%; River link package III awaiting forest land clearance."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=14200,
            in_position_staff=11600,
            vacant_posts=2600,
            vacancy_pct=18.3,
            demand_urgency="HIGH",
            top_shortage_roles=["Assistant Executive Engineers (Hydrology)", "Dam Sluice Operators", "Canal Lascars & Field Overseers"],
            ai_staffing_remedy_en="Deploy 250 diploma apprentice engineers for delta monsoon gate regulation and hire 400 temporary field lascars.",
            ai_staffing_remedy_ta="பருவமழை கால நீர் மேலாண்மைக்காக 250 பயிற்சி பொறியாளர்கள் மற்றும் 400 தற்காலிக களப்பணியாளர்களை நியமிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Thamirabarani-Karumeniyar-Nambiyar River Linking", sanctioned_cost_cr=872.0, physical_progress_pct=82.0, financial_progress_pct=76.5, target_completion="Jan 2027", bottleneck_en="Ambasamudram forest diversion approval pending with MoEFCC"),
            ProjectDetail(name="Cauvery Delta Tail-End Canal Modernization", sanctioned_cost_cr=640.0, physical_progress_pct=94.0, financial_progress_pct=91.0, target_completion="Oct 2026")
        ],
        detailed_schemes=[
            SchemeDetail(name="Cauvery Kuruvai Special Cultivation Package", target_beneficiaries="5.8 Lakh Farmers", actual_covered="5.62 Lakh Farmers", saturation_pct=96.8, annual_budget_cr=84.0, disbursement_status="Active")
        ],
        ai_strategic_analysis_en="Mettur dam discharge of 15,000 cusecs is well synchronized. Immediate priority is clearing tail-end Vennar blockages in Tiruvarur and mobilizing emergency sluice teams.",
        ai_strategic_analysis_ta="மேட்டூர் அணையிலிருந்து 15,000 கனஅடி நீர் திறப்பு சீராக உள்ளது. திருவாரூர் கடைமடை கால்வாய்களை தொடர்ந்து கண்காணிக்க வேண்டும்."
    ),

    OfficerDirectoryItem(
        id="dir-min-04",
        name_en="Thiru Ma. Subramanian",
        name_ta="திரு மா. சுப்பிரமணியன்",
        designation_en="Hon'ble Minister for Health & Family Welfare",
        designation_ta="மாண்புமிகு மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை அமைச்சர்",
        role_tier="MINISTER",
        department_en="Health & Family Welfare",
        department_ta="மக்கள் நல்வாழ்வுத் துறை",
        district_en="Statewide / Chennai",
        district_ta="மாநிலம் முழுவதும் / சென்னை",
        constituency="Saidapet",
        official_email="healthmin@tn.gov.in",
        cug_phone="+91 44 2567 1155",
        office_address="Minister Chamber, Secretariat, Fort St. George, Chennai",
        current_schemes=["Makkalai Thedi Maruthuvam (MTM)", "Innuyir Kaappom - Nammai Kaakkum 48", "Kalaignar Comprehensive Health Insurance Scheme"],
        current_projects=["Madurai AIIMS Coordination", "TNMSC Automated Drug Warehouse Network", "District Medical Colleges Modernization"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=20180.0,
            funds_released_cr=16400.0,
            expenditure_spent_cr=15780.0,
            utilization_pct=96.2,
            unspent_balance_cr=620.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["Essential drug procurement through TNMSC at 98.4% supply rate; Madurai GRH requires Anti-D injection emergency buffer."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=42000,
            in_position_staff=34800,
            vacant_posts=7200,
            vacancy_pct=17.1,
            demand_urgency="CRITICAL",
            top_shortage_roles=["Staff Nurses (ICU/Obstetrics)", "Pharmacists (TNMSC Depots)", "Specialist Anesthetists & Radiologists"],
            ai_staffing_remedy_en="Sanction fast-track recruitment of 1,800 MRB Staff Nurses and deploy 120 emergency pharmacists across 32 District Drug Warehouses.",
            ai_staffing_remedy_ta="எம்.ஆர்.பி மூலம் 1,800 செவிலியர்கள் மற்றும் 120 மருந்தாளுநர்களை உடனடியாக நியமிக்க வேண்டும்."
        ),
        detailed_projects=[
            ProjectDetail(name="TNMSC Central Drug Inventory Automation (RFID)", sanctioned_cost_cr=145.0, physical_progress_pct=88.0, financial_progress_pct=82.0, target_completion="Nov 2026"),
            ProjectDetail(name="District Emergency Trauma Care Centers (Innuyir Kaappom)", sanctioned_cost_cr=310.0, physical_progress_pct=95.0, financial_progress_pct=93.0, target_completion="Dec 2026")
        ],
        detailed_schemes=[
            SchemeDetail(name="Makkalai Thedi Maruthuvam", target_beneficiaries="1.05 Crore Citizens", actual_covered="1.02 Crore Citizens", saturation_pct=97.1, annual_budget_cr=380.0, disbursement_status="Doorstep Drug Delivery Active")
        ],
        ai_strategic_analysis_en="Health department achieves 97.1% saturation in doorstep non-communicable disease treatment. Immediate priority is filling 7,200 medical vacancies via MRB and replenishing Madurai hospital stocks.",
        ai_strategic_analysis_ta="மக்களைத் தேடி மருத்துவம் திட்டம் 97.1% சாதனை படைத்துள்ளது. மருத்துவ பணியாளர் காலியிடங்களை விரைந்து நிரப்ப வேண்டும்."
    ),

    OfficerDirectoryItem(
        id="dir-min-05",
        name_en="Thiru T.R.B. Rajaa",
        name_ta="திரு டி.ஆர்.பி. ராஜா",
        designation_en="Hon'ble Minister for Industries, Investment Promotion & Commerce",
        designation_ta="மாண்புமிகு தொழில், முதலீட்டு ஊக்குவிப்பு மற்றும் வர்த்தகத் துறை அமைச்சர்",
        role_tier="MINISTER",
        department_en="Industries & Investment",
        department_ta="தொழில்துறை & முதலீட்டு ஊக்குவிப்பு",
        district_en="Statewide / Tiruvarur",
        district_ta="மாநிலம் முழுவதும் / திருவாரூர்",
        constituency="Mannargudi",
        official_email="indmin@tn.gov.in",
        cug_phone="+91 44 2567 1166",
        office_address="Minister Chamber, Secretariat, Fort St. George, Chennai",
        current_schemes=["Tamil Nadu Semiconductor & Advanced Electronics Policy", "EV Hub Special Incentive Package", "Guidance TN Global Connect"],
        current_projects=["SIPCOT Krishnagiri Semiconductor Fab (₹4,800 Cr)", "Coimbatore EV Aerospace Park", "Thoothukudi Green Hydrogen Hub"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=7420.0,
            funds_released_cr=6100.0,
            expenditure_spent_cr=5890.0,
            utilization_pct=96.5,
            unspent_balance_cr=210.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["SIPCOT industrial plot absorption rate at 94%; Krishnagiri 400kV power line grant sanctioned."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=3200,
            in_position_staff=2780,
            vacant_posts=420,
            vacancy_pct=13.1,
            demand_urgency="MODERATE",
            top_shortage_roles=["Land Survey & Acquisition Officers", "Industrial Estate Managers", "Single Window Compliance Officers"],
            ai_staffing_remedy_en="Depute 25 special Revenue Surveyors from Coimbatore and Dharmapuri to Krishnagiri SIPCOT for fast-track land mutation.",
            ai_staffing_remedy_ta="கிருஷ்ணகிரி சிப்காட் நில ஆவண பணிகளுக்காக 25 சிறப்பு நில அளவையர்களை நியமிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="SIPCOT Krishnagiri Semiconductor Fab Hub", sanctioned_cost_cr=4800.0, physical_progress_pct=74.0, financial_progress_pct=68.0, target_completion="Mar 2027", bottleneck_en="400kV dedicated substation line stringing with TANGEDCO"),
            ProjectDetail(name="Cheyyar Mega Non-Leather Footwear SEZ", sanctioned_cost_cr=1250.0, physical_progress_pct=91.0, financial_progress_pct=89.0, target_completion="Dec 2026")
        ],
        detailed_schemes=[
            SchemeDetail(name="Global Investment Incentive Direct Capital Subsidy", target_beneficiaries="45 Global Anchor Units", actual_covered="42 Units", saturation_pct=93.3, annual_budget_cr=850.0, disbursement_status="Performance Milestone Linked")
        ],
        ai_strategic_analysis_en="Industries ministry has attracted ₹78,000 Cr committed capex with 1.4 Lakh potential jobs. Focus today on synchronizing TANGEDCO power lines for Krishnagiri semiconductor fab.",
        ai_strategic_analysis_ta="தொழில்துறை ₹78,000 கோடி முதலீடுகளை ஈர்த்துள்ளது. கிருஷ்ணகிரி குறைக்கடத்தி மின் இணைப்பை விரைவுபடுத்த வேண்டும்."
    ),

    # 2. PRINCIPAL SECRETARIES
    OfficerDirectoryItem(
        id="dir-sec-01",
        name_en="N. Muruganandam, IAS",
        name_ta="நா. முருகானந்தம், இ.ஆ.ப.",
        designation_en="Chief Secretary to Government of Tamil Nadu",
        designation_ta="அரசு தலைமைச் செயலாளர்",
        role_tier="PRINCIPAL_SECRETARY",
        department_en="Personnel, Vigilance & Inter-Departmental Coordination",
        department_ta="தலைமை நிர்வாகம் & பொதுத்துறை",
        district_en="Statewide (Secretariat)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம்)",
        constituency=None,
        official_email="cs@tn.gov.in",
        cug_phone="+91 44 2567 1555",
        office_address="Chief Secretary Office, Main Building, Fort St. George, Chennai - 600009",
        current_schemes=["Statewide Flagship Governance Monitoring", "Civil Services e-Office SLA"],
        current_projects=["Chennai Peripheral Ring Road", "Parandur Greenfields Airport", "VETRI TN AI OS Statewide Deployment"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=125000.0,
            funds_released_cr=104000.0,
            expenditure_spent_cr=98200.0,
            utilization_pct=94.4,
            unspent_balance_cr=5800.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["Inter-departmental capex absorption monitored across 38 districts daily; zero unapproved re-appropriations."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=1350000,
            in_position_staff=1180000,
            vacant_posts=170000,
            vacancy_pct=12.6,
            demand_urgency="HIGH",
            top_shortage_roles=["School Teachers (PG/BT)", "Police Constabulary & SIs", "Health Staff Nurses", "VAOs & Surveyors"],
            ai_staffing_remedy_en="Authorize TNPSC and TRB accelerated notification calendar for 28,000 high-priority grassroots vacancies across Health, Police, and Education.",
            ai_staffing_remedy_ta="டிஎன்பிஎஸ்சி மற்றும் ஆசிரியர் தேர்வு வாரியம் மூலம் 28,000 முன்னுரிமை பணியிடங்களை விரைந்து நிரப்ப உத்தரவிடவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Chennai Peripheral Ring Road (Section II)", sanctioned_cost_cr=2150.0, physical_progress_pct=62.0, financial_progress_pct=58.0, target_completion="Dec 2027", bottleneck_en="Ponneri taluk revenue land acquisition"),
            ProjectDetail(name="VETRI TN AI OS Digital Secretariat Deployment", sanctioned_cost_cr=85.0, physical_progress_pct=96.0, financial_progress_pct=92.0, target_completion="Active Statewide")
        ],
        detailed_schemes=[
            SchemeDetail(name="All 42 Flagship Government Schemes Master Coordination", target_beneficiaries="7.2 Crore Citizens", actual_covered="7.05 Crore Citizens", saturation_pct=97.9, annual_budget_cr=64000.0, disbursement_status="Monitored via CM Dashboard")
        ],
        ai_strategic_analysis_en="Chief Secretary provides top-level administrative synergy. Inter-departmental coordination benchmark is 94.4% SLA adherence with focus on resolving highways and land acquisition bottlenecks.",
        ai_strategic_analysis_ta="தலைமைச் செயலாளர் தலைமையில் துறை ஒருங்கிணைப்பு 94.4% சிறந்து விளங்குகிறது. நில எடுப்பு சிக்கல்களுக்கு முன்னுரிமை அளிக்கப்படுகிறது."
    ),

    OfficerDirectoryItem(
        id="dir-sec-02",
        name_en="V. Arun Roy, IAS",
        name_ta="வி. அருண் ராய், இ.ஆ.ப.",
        designation_en="Principal Secretary to Government, Industries, Investment Promotion & Commerce",
        designation_ta="முதன்மைச் செயலாளர், தொழில்துறை",
        role_tier="PRINCIPAL_SECRETARY",
        department_en="Industries, Investment Promotion & Commerce",
        department_ta="தொழில் மற்றும் முதலீட்டு ஊக்குவிப்பு துறை",
        district_en="Statewide (Secretariat)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம்)",
        constituency=None,
        official_email="indsec@tn.gov.in",
        cug_phone="+91 44 2567 1822",
        office_address="Industries Dept, 3rd Floor, Namakkal Kavignar Maaligai, Secretariat, Chennai",
        current_schemes=["SIPCOT Mega Cluster Allotment Policy", "Electronics Manufacturing Subsidies"],
        current_projects=["SIPCOT Krishnagiri Semiconductor Fab (₹4,800 Cr)", "Hosur EV Corridor Phase 2", "Cheyyar Footwear Mega SEZ"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=5800.0,
            funds_released_cr=4950.0,
            expenditure_spent_cr=4820.0,
            utilization_pct=97.3,
            unspent_balance_cr=130.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["SIPCOT Infrastructure Development Fund utilized for 400kV substation & water recycling."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=1850,
            in_position_staff=1620,
            vacant_posts=230,
            vacancy_pct=12.4,
            demand_urgency="MODERATE",
            top_shortage_roles=["SIPCOT Project Officers", "Environmental Compliance Managers", "GIS Industrial Land Surveyors"],
            ai_staffing_remedy_en="Deploy contract GIS spatial planners for Hosur and Coimbatore corridors to speed up digital plot allocation.",
            ai_staffing_remedy_ta="ஓசூர் மற்றும் கோவை தொழில் பூங்காக்களுக்காக ஒப்பந்த ஜிஐஎஸ் வல்லுநர்களை நியமிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Krishnagiri Semiconductor Fab Allotment", sanctioned_cost_cr=4800.0, physical_progress_pct=74.0, financial_progress_pct=68.0, target_completion="Mar 2027")
        ],
        detailed_schemes=[
            SchemeDetail(name="Industrial Capital Subsidy Scheme", target_beneficiaries="120 Units", actual_covered="114 Units", saturation_pct=95.0, annual_budget_cr=600.0, disbursement_status="Active")
        ],
        ai_strategic_analysis_en="Industries Secretary holds 97.3% fund absorption with exceptional global investment conversion velocity.",
        ai_strategic_analysis_ta="தொழில்துறை முதன்மைச் செயலாளர் 97.3% நிதி பயன்பாட்டுடன் முதலீடுகளை விரைவுபடுத்துகிறார்."
    ),

    # 3. GROUP 1 OFFICERS (COLLECTORS & SPS)
    OfficerDirectoryItem(
        id="dir-grp1-01",
        name_en="Krasthi Kumar Pati, IAS",
        name_ta="கிராந்தி குமார் பாடி, இ.ஆ.ப.",
        designation_en="District Collector & District Magistrate, Coimbatore",
        designation_ta="மாவட்ட ஆட்சித்தலைவர், கோயம்புத்தூர்",
        role_tier="GROUP_1",
        department_en="Revenue Administration, Disaster Management & Welfare",
        department_ta="வருவாய் நிர்வாகம் மற்றும் மாவட்ட வளர்ச்சி",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        constituency=None,
        official_email="collr-cbe@nic.in",
        cug_phone="+91 422 2301114",
        office_address="District Collectorate, State Bank Road, Coimbatore - 641018",
        current_schemes=["Kalaignar Magalir Urimai Thittam (KMUT)", "Makkalai Thedi Maruthuvam", "Pudhumai Penn Scheme"],
        current_projects=["Western Ring Road Land Acquisition (485 Acres)", "Semmozhi Poonga Coimbatore (₹172 Cr)", "Avinashi Road Elevated Corridor (₹1,620 Cr)"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=3450.0,
            funds_released_cr=2980.0,
            expenditure_spent_cr=2840.0,
            utilization_pct=95.3,
            unspent_balance_cr=140.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["Western Ring Road landowner compensation disbursed at 92%; Avinashi elevated road billing on schedule."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=8900,
            in_position_staff=7450,
            vacant_posts=1450,
            vacancy_pct=16.3,
            demand_urgency="HIGH",
            top_shortage_roles=["Tahsildars & Deputy Tahsildars", "Field Surveyors (Land Records)", "Urban Municipal Sanitary Officers"],
            ai_staffing_remedy_en="Authorize Coimbatore Collectorate to hire 35 licensed private surveyors to clear land acquisition survey pendency.",
            ai_staffing_remedy_ta="நில எடுப்பு பணிகளை விரைவுபடுத்த 35 உரிமம் பெற்ற தனியார் நில அளவையர்களை தற்காலிகமாக ஈடுபடுத்தவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Coimbatore Western Ring Road (485 Acres)", sanctioned_cost_cr=320.0, physical_progress_pct=72.0, financial_progress_pct=68.0, target_completion="June 2027", bottleneck_en="Utility pole shifting by TANGEDCO on 4.2 km stretch"),
            ProjectDetail(name="Semmozhi Poonga Botanical Garden", sanctioned_cost_cr=172.0, physical_progress_pct=88.0, financial_progress_pct=84.0, target_completion="Dec 2026")
        ],
        detailed_schemes=[
            SchemeDetail(name="Kalaignar Magalir Urimai Thittam (Coimbatore)", target_beneficiaries="4.45 Lakh Women", actual_covered="4.38 Lakh Women", saturation_pct=98.4, annual_budget_cr=530.0, disbursement_status="100% On-Time")
        ],
        ai_strategic_analysis_en="Coimbatore District ranks #2 statewide in governance KPI (93.6/100). Focus on resolving TANGEDCO utility shifting for Western Ring Road.",
        ai_strategic_analysis_ta="கோவை மாவட்டம் 93.6 புள்ளிகளுடன் மாநில அளவில் 2-ம் இடம் வகிக்கிறது. மேற்கு புறவழிச்சாலை பணிகளுக்கு முன்னுரிமை அளிக்கப்படுகிறது."
    ),

    OfficerDirectoryItem(
        id="dir-grp1-02",
        name_en="K. Karthikeyan, IPS",
        name_ta="கே. கார்த்திகேயன், இ.கா.ப.",
        designation_en="Superintendent of Police (SP), Coimbatore District",
        designation_ta="காவல் கண்காணிப்பாளர், கோவை மாவட்டம்",
        role_tier="GROUP_1",
        department_en="Tamil Nadu Police (Law & Order)",
        department_ta="காவல்துறை (சட்டம் ஒழுங்கு)",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        constituency=None,
        official_email="sp-cbe@tncctns.gov.in",
        cug_phone="+91 422 2300062",
        office_address="District Police Office (DPO), State Bank Road, Coimbatore - 641018",
        current_schemes=["POCSO Fast-Track Investigation Units", "Statewide Intelligent Traffic Surveillance (CCTV 96% Uptime)", "Project Kaval Karangal"],
        current_projects=["Coimbatore Highway Safety Corridor", "Anti-Drug Special Task Force (Operation Ganja Vettai 4.0)", "Cyber Crime Fast Investigation Cell"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=380.0,
            funds_released_cr=340.0,
            expenditure_spent_cr=325.0,
            utilization_pct=95.6,
            unspent_balance_cr=15.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["CCTV highway surveillance modernizations executed within budget."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=3100,
            in_position_staff=2620,
            vacant_posts=480,
            vacancy_pct=15.5,
            demand_urgency="HIGH",
            top_shortage_roles=["Sub-Inspectors (Law & Order)", "Women Police Constables", "Cyber Crime Investigators"],
            ai_staffing_remedy_en="Depute 40 Sub-Inspectors from PRS batch and create dedicated 12-member Cyber Crime unit.",
            ai_staffing_remedy_ta="காவலர் பயிற்சி பள்ளியிலிருந்து 40 உதவி ஆய்வாளர்களை நியமித்து சைபர் கிரைம் பிரிவை வலுப்படுத்தவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Smart Highway AI Surveillance Corridor", sanctioned_cost_cr=28.0, physical_progress_pct=96.0, financial_progress_pct=94.0, target_completion="Oct 2026")
        ],
        detailed_schemes=[
            SchemeDetail(name="Project Kaval Karangal & POCSO Fast Track", target_beneficiaries="1,800 Assisted", actual_covered="1,750 Assisted", saturation_pct=97.2, annual_budget_cr=8.5, disbursement_status="Active")
        ],
        ai_strategic_analysis_en="Coimbatore Rural Police maintains zero communal incidents and 96% CCTV network uptime.",
        ai_strategic_analysis_ta="கோவை புறநகர் காவல் துறை சட்டம் ஒழுங்கை சிறப்பாக பராமரித்து வருகிறது."
    ),

    # SALEM DISTRICT COLLECTOR & SP
    OfficerDirectoryItem(
        id="dir-grp1-03",
        name_en="Dr. R. Brindha Devi, IAS",
        name_ta="மருத்துவர் ஆர். பிருந்தாதேவி, இ.ஆ.ப.",
        designation_en="District Collector & District Magistrate, Salem",
        designation_ta="மாவட்ட ஆட்சித்தலைவர், சேலம் மாவட்டம்",
        role_tier="GROUP_1",
        department_en="Revenue Administration, Welfare & District Development",
        department_ta="வருவாய் நிர்வாகம் மற்றும் மாவட்ட வளர்ச்சித் துறை",
        district_en="Salem",
        district_ta="சேலம்",
        constituency=None,
        official_email="collr-slm@nic.in",
        cug_phone="+91 427 2450001",
        office_address="District Collectorate Campus, Salem - 636001",
        current_schemes=["Kalaignar Magalir Urimai Thittam", "Chief Minister's Breakfast Scheme", "Makkalai Thedi Maruthuvam", "Pudhumai Penn"],
        current_projects=["Salem Textile & Apparel Processing Park (₹350 Cr)", "Mettur Surplus Water Lift Irrigation Scheme (₹565 Cr)", "Salem Smart City Water Distribution Network"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=2980.0,
            funds_released_cr=2650.0,
            expenditure_spent_cr=2490.0,
            utilization_pct=93.9,
            unspent_balance_cr=160.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["Mettur lift irrigation canal works billing verified; Zero fiscal leaks."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=7800,
            in_position_staff=6420,
            vacant_posts=1380,
            vacancy_pct=17.7,
            demand_urgency="HIGH",
            top_shortage_roles=["Tahsildars (Revenue)", "Surveyors (Taluk Offices)", "Child Development Project Officers (CDPO)"],
            ai_staffing_remedy_en="Depute 28 Revenue Inspectors as in-charge Tahsildars and deploy mobile e-Seva camps across Omalur and Mettur taluks.",
            ai_staffing_remedy_ta="ஓமலூர் மற்றும் மேட்டூர் வட்டங்களில் நிலுவை மனுக்களை தீர்க்க சிறப்பு வருவாய் குழுக்களை நியமிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Mettur 100 Water Bodies Surplus Lift Irrigation Scheme", sanctioned_cost_cr=565.0, physical_progress_pct=91.0, financial_progress_pct=88.0, target_completion="Nov 2026"),
            ProjectDetail(name="Salem Defense & Aerospace Manufacturing Node", sanctioned_cost_cr=420.0, physical_progress_pct=68.0, financial_progress_pct=64.0, target_completion="Aug 2027")
        ],
        detailed_schemes=[
            SchemeDetail(name="Chief Minister Breakfast Scheme (Salem)", target_beneficiaries="1.24 Lakh Students", actual_covered="1.22 Lakh Students", saturation_pct=98.3, annual_budget_cr=48.0, disbursement_status="Active across 1,420 Primary Schools")
        ],
        ai_strategic_analysis_en="Salem District demonstrates 98.3% saturation in CM Breakfast scheme. Focus on completing trial runs for Mettur 100 surplus water bodies lift scheme before November.",
        ai_strategic_analysis_ta="சேலம் மாவட்டத்தில் முதலமைச்சரின் காலை உணவுத் திட்டம் 98.3% வெற்றி பெற்றுள்ளது. மேட்டூர் உபரி நீர் திட்ட சோதனை ஓட்டத்தை நவம்பருக்குள் முடிக்க வேண்டும்."
    ),

    OfficerDirectoryItem(
        id="dir-grp1-04",
        name_en="A.K. Arun Kabilan, IPS",
        name_ta="ஏ.கே. அருண் கபிலன், இ.கா.ப.",
        designation_en="Superintendent of Police (SP), Salem District",
        designation_ta="காவல் கண்காணிப்பாளர், சேலம் மாவட்டம்",
        role_tier="GROUP_1",
        department_en="Tamil Nadu Police (Law & Order)",
        department_ta="காவல்துறை (சட்டம் ஒழுங்கு)",
        district_en="Salem",
        district_ta="சேலம்",
        constituency=None,
        official_email="sp-slm@tncctns.gov.in",
        cug_phone="+91 427 2451001",
        office_address="District Police Office (DPO), Collectorate Road, Salem - 636001",
        current_schemes=["POCSO Fast-Track Investigation Units", "Statewide Intelligent Highway Safety", "Operation Ganja Vettai 4.0"],
        current_projects=["Salem-Attur NH AI Speed & Safety Surveillance", "Salem Cyber Crime Station Modernization", "Interstate Gang Interdiction Cell"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=310.0,
            funds_released_cr=285.0,
            expenditure_spent_cr=272.0,
            utilization_pct=95.4,
            unspent_balance_cr=13.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["Highway ANPR cameras and CCTNS modernization fully operational."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=2650,
            in_position_staff=2210,
            vacant_posts=440,
            vacancy_pct=16.6,
            demand_urgency="HIGH",
            top_shortage_roles=["Sub-Inspectors (Crime Wing)", "Highway Patrol Drivers", "Forensic Data Analysts"],
            ai_staffing_remedy_en="Deploy 35 newly passed out Sub-Inspectors to Mettur, Attur and Sankari subdivisions.",
            ai_staffing_remedy_ta="மேட்டூர், ஆத்தூர், சங்ககிரி உட்கோட்டங்களுக்கு 35 புதிய உதவி ஆய்வாளர்களை நியமிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Salem NH-44 AI Highway Surveillance", sanctioned_cost_cr=22.0, physical_progress_pct=98.0, financial_progress_pct=95.0, target_completion="Completed")
        ],
        detailed_schemes=[
            SchemeDetail(name="POCSO Special Fast Track Prosecution (Salem)", target_beneficiaries="100% Case Coverage", actual_covered="96% Charge-sheeted < 60 Days", saturation_pct=96.0, annual_budget_cr=6.2, disbursement_status="Active")
        ],
        ai_strategic_analysis_en="Salem Rural Police reports 32% reduction in highway fatalities following smart AI ANPR deployment. High vigilance maintained on interstate border checkpoints.",
        ai_strategic_analysis_ta="சேலம் மாவட்டத்தில் ஏஐ கேமராக்கள் மூலம் நெடுஞ்சாலை விபத்துக்கள் 32% குறைந்துள்ளன. எல்லை சோதனை சாவடிகள் தீவிர கண்காணிப்பில் உள்ளன."
    ),

    # MADURAI DISTRICT COLLECTOR & SP
    OfficerDirectoryItem(
        id="dir-grp1-05",
        name_en="M.S. Sangeetha, IAS",
        name_ta="எம்.எஸ். சங்கீதா, இ.ஆ.ப.",
        designation_en="District Collector & District Magistrate, Madurai",
        designation_ta="மாவட்ட ஆட்சித்தலைவர், மதுரை மாவட்டம்",
        role_tier="GROUP_1",
        department_en="Revenue Administration, Heritage & District Development",
        department_ta="வருவாய் நிர்வாகம் மற்றும் பாரம்பரிய வளர்ச்சித் துறை",
        district_en="Madurai",
        district_ta="மதுரை",
        constituency=None,
        official_email="collr-mdu@nic.in",
        cug_phone="+91 452 2531110",
        office_address="District Collectorate Campus, Madurai - 625020",
        current_schemes=["Kalaignar Centenary Library Operations", "Makkalai Thedi Maruthuvam", "Madurai Heritage Corridor Scheme"],
        current_projects=["Madurai AIIMS Connecting Expressway (₹180 Cr)", "Vaigai Riverfront Beautification", "Madurai Metro Rail Phase 1 Preparatory Works"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=3120.0,
            funds_released_cr=2780.0,
            expenditure_spent_cr=2640.0,
            utilization_pct=94.9,
            unspent_balance_cr=140.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["Madurai AIIMS access road utility alignment verified."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=8200,
            in_position_staff=6950,
            vacant_posts=1250,
            vacancy_pct=15.2,
            demand_urgency="HIGH",
            top_shortage_roles=["Municipal Engineers (Water Supply)", "Taluk Revenue Officers", "Medical Officers (PHC)"],
            ai_staffing_remedy_en="Fast-track direct recruitment for Madurai Corporation engineers to manage Metro Phase 1 utility relocation.",
            ai_staffing_remedy_ta="மதுரை மெட்ரோ பணிகளுக்கான பயன்பாட்டு மாற்றங்களை மேற்கொள்ள கூடுதல் பொறியாளர்களை நியமிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Madurai AIIMS Connecting 4-Lane Expressway", sanctioned_cost_cr=180.0, physical_progress_pct=64.0, financial_progress_pct=61.0, target_completion="May 2027", bottleneck_en="Railway ROB design vetting with Southern Railway"),
            ProjectDetail(name="Vaigai Riverbank Sustainable Restoration", sanctioned_cost_cr=125.0, physical_progress_pct=85.0, financial_progress_pct=82.0, target_completion="Dec 2026")
        ],
        detailed_schemes=[
            SchemeDetail(name="Kalaignar Centenary Library Knowledge Reach", target_beneficiaries="15,000 Readers Daily", actual_covered="16,200 Readers Daily", saturation_pct=108.0, annual_budget_cr=28.0, disbursement_status="Exceeding Target")
        ],
        ai_strategic_analysis_en="Madurai Collectorate maintains 108% target in Kalaignar Centenary Library footfalls. Railway ROB coordination for AIIMS connector is top priority.",
        ai_strategic_analysis_ta="கலைஞர் நூற்றாண்டு நூலகம் இலக்கை தாண்டி செயல்படுகிறது. எய்ம்ஸ் இணைப்பு சாலை ரயில்வே அனுமதிக்கு முன்னுரிமை அளிக்க வேண்டும்."
    ),

    OfficerDirectoryItem(
        id="dir-grp1-06",
        name_en="B.K. Arvind, IPS",
        name_ta="பி.கே. அரவிந்த், இ.கா.ப.",
        designation_en="Superintendent of Police (SP), Madurai Rural",
        designation_ta="காவல் கண்காணிப்பாளர், மதுரை புறநகர்",
        role_tier="GROUP_1",
        department_en="Tamil Nadu Police (Law & Order)",
        department_ta="காவல்துறை (சட்டம் ஒழுங்கு)",
        district_en="Madurai",
        district_ta="மதுரை",
        constituency=None,
        official_email="sp-mdu@tncctns.gov.in",
        cug_phone="+91 452 2530044",
        office_address="District Police Office, Survey Club Road, Madurai - 625007",
        current_schemes=["Smart Community Policing", "POCSO Protection Wing", "Anti-Rowdy Special Cell"],
        current_projects=["Madurai Rural CCTV Grid Linkage (1,850 Cameras)", "Highway Quick Response Units"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=290.0,
            funds_released_cr=265.0,
            expenditure_spent_cr=254.0,
            utilization_pct=95.8,
            unspent_balance_cr=11.0,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["CCTV integration completed at 98%."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=2800,
            in_position_staff=2380,
            vacant_posts=420,
            vacancy_pct=15.0,
            demand_urgency="HIGH",
            top_shortage_roles=["Armed Reserve Drivers", "Station Writers & Crime SIs", "Cyber Forensics Experts"],
            ai_staffing_remedy_en="Depute 30 Armed Reserve personnel for festival bandobast in Usilampatti and Melur.",
            ai_staffing_remedy_ta="உசிலம்பட்டி மற்றும் மேலூர் பகுதி பாதுகாப்பு பணிகளுக்கு 30 ஆயுதப்படை காவலர்களை நியமிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Madurai Rural CCTV Command Network", sanctioned_cost_cr=18.0, physical_progress_pct=96.0, financial_progress_pct=93.0, target_completion="Completed")
        ],
        detailed_schemes=[
            SchemeDetail(name="Project Kaval Karangal Madurai", target_beneficiaries="1,200 Citizens", actual_covered="1,180 Citizens", saturation_pct=98.3, annual_budget_cr=4.5, disbursement_status="Active")
        ],
        ai_strategic_analysis_en="Madurai Rural law & order index is optimal at 91.2/100. Effective crime prevention through village vigilance committees.",
        ai_strategic_analysis_ta="மதுரை புறநகர் சட்டம் ஒழுங்கு 91.2 புள்ளிகளுடன் சீராக உள்ளது. கிராம கண்காணிப்பு குழுக்கள் சிறப்பாக செயல்படுகின்றன."
    ),

    # 4. GROUP 2 OFFICERS (TAHSILDARS & BDOS)
    OfficerDirectoryItem(
        id="dir-grp2-01",
        name_en="M. Shanmugam, BDO",
        name_ta="மு. சண்முகம், வட்டார வளர்ச்சி அலுவலர்",
        designation_en="Block Development Officer (BDO), Thiruvaiyaru Block",
        designation_ta="வட்டார வளர்ச்சி அலுவலர், திருவையாறு ஊராட்சி ஒன்றியம்",
        role_tier="GROUP_2",
        department_en="Rural Development & Panchayat Raj",
        department_ta="ஊரக வளர்ச்சி மற்றும் ஊராட்சித் துறை",
        district_en="Thanjavur",
        district_ta="தஞ்சாவூர்",
        constituency="Thiruvaiyaru",
        official_email="bdo-thiruvaiyaru@tn.gov.in",
        cug_phone="+91 4362 260222",
        office_address="Panchayat Union Office, Thiruvaiyaru, Thanjavur - 613204",
        current_schemes=["MGNREGS Delta Desilting Works", "Anaithu Grama Anna Marumalarchi Thittam", "Kalaignar Kanavu Illam"],
        current_projects=["Vennar Sub-Basin Desilting Package II", "Panchayat Solar Pumping Stations", "Village Drinking Water Grid"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=84.0,
            funds_released_cr=76.0,
            expenditure_spent_cr=72.5,
            utilization_pct=95.4,
            unspent_balance_cr=3.5,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["Canal desilting wages 100% disbursed via direct Aadhaar DBTs."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=240,
            in_position_staff=205,
            vacant_posts=35,
            vacancy_pct=14.5,
            demand_urgency="MODERATE",
            top_shortage_roles=["Panchayat Secretaries", "Rural Work Overseers (Civil)", "Accountants"],
            ai_staffing_remedy_en="Recruit 8 contract civil overseers to inspect desilted canal cross-sections across 34 village panchayats.",
            ai_staffing_remedy_ta="34 கிராம ஊராட்சிகளில் தூர்வாரும் பணிகளை ஆய்வு செய்ய 8 ஒப்பந்த மேற்பார்வையாளர்களை நியமிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Thiruvaiyaru Tail-End Desilting Package", sanctioned_cost_cr=12.5, physical_progress_pct=97.0, financial_progress_pct=95.0, target_completion="Completed")
        ],
        detailed_schemes=[
            SchemeDetail(name="MGNREGS Rural Desilting", target_beneficiaries="18,400 Workers", actual_covered="18,150 Workers", saturation_pct=98.6, annual_budget_cr=38.0, disbursement_status="Weekly DBT Active")
        ],
        ai_strategic_analysis_en="Thiruvaiyaru BDO has completed 97% of monsoon preparedness desilting. Tail-end irrigation discharge reaching farmer fields on schedule.",
        ai_strategic_analysis_ta="திருவையாறு ஒன்றியத்தில் 97% தூர்வாரும் பணிகள் நிறைவடைந்து விவசாயிகளுக்கு பாசன நீர் தடையின்றி கிடைக்கிறது."
    ),

    # 5. GROUP 3 & 4 OFFICERS (VAOS & FIELD OFFICERS)
    OfficerDirectoryItem(
        id="dir-grp34-01",
        name_en="S. Anbarasan, VAO",
        name_ta="எஸ். அன்பரசன், கிராம நிர்வாக அலுவலர்",
        designation_en="Village Administrative Officer (VAO), Salem West Taluk",
        designation_ta="கிராம நிர்வாக அலுவலர், சேலம் மேற்கு வட்டம்",
        role_tier="GROUP_3_4",
        department_en="Revenue Administration & Disaster Relief",
        department_ta="வருவாய்த்துறை & பேரிடர் மேலாண்மை",
        district_en="Salem",
        district_ta="சேலம்",
        constituency="Salem West",
        official_email="vao-salemwest@tn.gov.in",
        cug_phone="+91 94433 87654",
        office_address="Village Administrative Office, Suramangalam, Salem - 636005",
        current_schemes=["Patta Chitta Digital Distribution", "Pattadharar Varisu Certificate Issuance", "Kalaignar Magalir Urimai Verification"],
        current_projects=["Anywhere Anytime e-Patta Verification", "Crop Damage Survey GIS"],
        availability_status="AVAILABLE",
        funds_allocation=DepartmentFundMetric(
            budget_sanctioned_cr=1.2,
            funds_released_cr=1.2,
            expenditure_spent_cr=1.1,
            utilization_pct=91.6,
            unspent_balance_cr=0.1,
            fiscal_health_status="HEALTHY",
            flagged_variance_areas=["e-Seva digital verification kits deployed."]
        ),
        staffing_demand_supply=DepartmentStaffingMetric(
            sanctioned_posts=45,
            in_position_staff=38,
            vacant_posts=7,
            vacancy_pct=15.5,
            demand_urgency="MODERATE",
            top_shortage_roles=["Village Assistants (Thalaiyari)", "Field Survey Assistants"],
            ai_staffing_remedy_en="Appoint 4 village assistants to assist in doorstep survey verification.",
            ai_staffing_remedy_ta="வீட்டு வாசலில் கள ஆய்வு பணிகளுக்காக 4 கிராம உதவியாளர்களை நியமிக்கவும்."
        ),
        detailed_projects=[
            ProjectDetail(name="Digital e-Patta 100% Saturation Drive", sanctioned_cost_cr=0.5, physical_progress_pct=99.0, financial_progress_pct=95.0, target_completion="Completed")
        ],
        detailed_schemes=[
            SchemeDetail(name="e-Patta Online Settlement", target_beneficiaries="4,200 Landowners", actual_covered="4,120 Landowners", saturation_pct=98.0, annual_budget_cr=0.8, disbursement_status="Active")
        ],
        ai_strategic_analysis_en="Salem West VAO office has achieved 98% SLA completion rate for digital patta mutations without grievance escalations.",
        ai_strategic_analysis_ta="சேலம் மேற்கு கிராம நிர்வாக அலுவலர் பட்டா பெயர் மாற்றங்களை 98% குறித்த காலத்திற்குள் வழங்கி சாதனை படைத்துள்ளார்."
    )
]


def search_officials_directory(filters: DirectorySearchFilter) -> DirectorySearchResponse:
    q = (filters.query or "").lower().strip()
    dept = (filters.department or "").lower().strip()
    scheme = (filters.scheme or "").lower().strip()
    proj = (filters.project or "").lower().strip()
    dist = (filters.district or "").lower().strip()
    const = (filters.constituency or "").lower().strip()
    tier = (filters.role_tier or "ALL").upper().strip()

    matches: List[OfficerDirectoryItem] = []

    for item in TAMIL_NADU_OFFICIALS_DIRECTORY:
        # Tier filter
        if tier != "ALL" and item.role_tier != tier:
            continue

        # Department filter
        if dept and dept not in item.department_en.lower() and dept not in item.department_ta.lower():
            continue

        # District filter
        if dist and dist not in item.district_en.lower() and dist not in item.district_ta.lower():
            continue

        # Constituency filter
        if const and (not item.constituency or const not in item.constituency.lower()):
            continue

        # Scheme filter
        if scheme:
            scheme_matched = any(scheme in s.lower() for s in item.current_schemes)
            if not scheme_matched:
                continue

        # Project filter
        if proj:
            proj_matched = any(proj in p.lower() for p in item.current_projects)
            if not proj_matched:
                continue

        # Free-form search query across all dimensions
        if q:
            text_corpus = (
                f"{item.name_en} {item.name_ta} {item.designation_en} {item.designation_ta} "
                f"{item.department_en} {item.department_ta} {item.district_en} {item.district_ta} "
                f"{item.constituency or ''} {item.official_email} {item.cug_phone} "
                f"{' '.join(item.current_schemes)} {' '.join(item.current_projects)} "
                f"{item.ai_strategic_analysis_en or ''} "
                f"{item.staffing_demand_supply.ai_staffing_remedy_en if item.staffing_demand_supply else ''}"
            ).lower()

            query_tokens = [t for t in q.split() if len(t) > 2]
            if query_tokens and not any(token in text_corpus for token in query_tokens):
                continue

        matches.append(item)

    return DirectorySearchResponse(
        total_matches=len(matches),
        officers=matches,
        query_interpreted=f"Filter criteria applied: Tier=[{tier}], Dept=[{dept or 'ANY'}], Dist=[{dist or 'ANY'}], Scheme=[{scheme or 'ANY'}], Proj=[{proj or 'ANY'}], Query=[{q or 'NONE'}]"
    )
