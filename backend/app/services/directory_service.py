from typing import List, Optional
from app.schemas.calendar import OfficerDirectoryItem, DirectorySearchFilter, DirectorySearchResponse


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
        availability_status="AVAILABLE"
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
        availability_status="AVAILABLE"
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
        availability_status="AVAILABLE"
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
        availability_status="AVAILABLE"
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
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-min-06",
        name_en="Thiru Udhayanidhi Stalin",
        name_ta="திரு உதயநிதி ஸ்டாலின்",
        designation_en="Hon'ble Deputy Chief Minister, Youth Welfare & Special Programme Implementation",
        designation_ta="மாண்புமிகு துணை முதலமைச்சர், இளைஞர் நலன் மற்றும் சிறப்புத் திட்ட செயலாக்கத் துறை",
        role_tier="MINISTER",
        department_en="Special Programme Implementation & Youth Welfare",
        department_ta="சிறப்பு திட்ட செயலாக்கம் & இளைஞர் நலன்",
        district_en="Statewide / Chennai",
        district_ta="மாநிலம் முழுவதும் / சென்னை",
        constituency="Chepauk-Thiruvallikeni",
        official_email="deputym@tn.gov.in",
        cug_phone="+91 44 2567 1199",
        office_address="Deputy CM Chamber, Secretariat, Fort St. George, Chennai",
        current_schemes=["Kalaignar Magalir Urimai Thittam (KMUT)", "Chief Minister's Breakfast Scheme", "Naan Mudhalvan Skill Revolution", "Pudhumai Penn & Tamil Pudhalvan"],
        current_projects=["Statewide Flagship Schemes Monitoring Dashboard", "Khelo India Sports City", "Youth Empowerment Centers"],
        availability_status="AVAILABLE"
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
        availability_status="AVAILABLE"
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
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-sec-03",
        name_en="Rajesh Lakhoni, IAS",
        name_ta="ராஜேஷ் லக்கானி, இ.ஆ.ப.",
        designation_en="Chairman & Managing Director (CMD), TANGEDCO & TANTRANSCO",
        designation_ta="தலைவர் மற்றும் மேலாண்மை இயக்குநர், மின்வாரியம் (TANGEDCO)",
        role_tier="PRINCIPAL_SECRETARY",
        department_en="Energy & Power Infrastructure",
        department_ta="ஆற்றல் மற்றும் மின்கட்டமைப்பு துறை",
        district_en="Statewide (Chennai)",
        district_ta="மாநிலம் முழுவதும் (சென்னை)",
        constituency=None,
        official_email="cmd@tnebnet.org",
        cug_phone="+91 44 2852 0131",
        office_address="NPKRR Maaligai, 144 Anna Salai, Chennai - 600002",
        current_schemes=["Solar Rooftop Subsidy Scheme", "Uninterrupted 24x7 Industrial Power Grid"],
        current_projects=["Hosur SIPCOT 400kV Dedicated Transmission Substation", "Ennore SEZ Supercritical Thermal Plant", "Kudankulam Green Energy Corridor"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-sec-04",
        name_en="P. Senthilkumar, IAS",
        name_ta="பி. செந்தில்குமார், இ.ஆ.ப.",
        designation_en="Principal Secretary to Government, Health & Family Welfare",
        designation_ta="முதன்மைச் செயலாளர், மக்கள் நல்வாழ்வுத் துறை",
        role_tier="PRINCIPAL_SECRETARY",
        department_en="Health & Family Welfare",
        department_ta="மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
        district_en="Statewide (Secretariat)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம்)",
        constituency=None,
        official_email="hfwsec@tn.gov.in",
        cug_phone="+91 44 2567 1875",
        office_address="Health Department, 4th Floor, Secretariat, Fort St. George, Chennai",
        current_schemes=["Makkalai Thedi Maruthuvam (MTM)", "Innuyir Kaappom (Road Safety Trauma Care)"],
        current_projects=["TNMSC Central Drug Warehouse Real-Time Tracking", "Madurai Government Rajaji Hospital Mother & Child Super Specialty Wing"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-sec-05",
        name_en="Sandip Saxena, IAS",
        name_ta="சந்தீப் சக்சேனா, இ.ஆ.ப.",
        designation_en="Additional Chief Secretary to Government, Water Resources Department",
        designation_ta="கூடுதல் தலைமைச் செயலாளர், நீர்வளத்துறை",
        role_tier="PRINCIPAL_SECRETARY",
        department_en="Water Resources Department",
        department_ta="நீர்வளத்துறை",
        district_en="Statewide (Secretariat)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம்)",
        constituency=None,
        official_email="wrdsec@tn.gov.in",
        cug_phone="+91 44 2567 1650",
        office_address="Water Resources Dept, Main Secretariat Building, Chennai",
        current_schemes=["Cauvery Delta Water Regulation", "Dam Rehabilitation & Improvement Project (DRIP)"],
        current_projects=["Thamirabarani-Karumeniyar River Linking (₹872 Cr)", "Cauvery-Vaigai-Gundar River Interlink Phase 1", "Mettur Dam Flood Inflow Real-Time SCADA"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-sec-06",
        name_en="P. Amudha, IAS",
        name_ta="பி. அமுதா, இ.ஆ.ப.",
        designation_en="Principal Secretary to Government, Revenue & Disaster Management",
        designation_ta="முதன்மைச் செயலாளர், வருவாய் மற்றும் பேரிடர் மேலாண்மை துறை",
        role_tier="PRINCIPAL_SECRETARY",
        department_en="Revenue & Disaster Management",
        department_ta="வருவாய் & பேரிடர் மேலாண்மை துறை",
        district_en="Statewide (Secretariat)",
        district_ta="மாநிலம் முழுவதும் (தலைமைச் செயலகம்)",
        constituency=None,
        official_email="revsec@tn.gov.in",
        cug_phone="+91 44 2567 1720",
        office_address="Revenue Administration, Ezhilagam, Chepauk, Chennai - 600005",
        current_schemes=["Digital Patta Passbook Mission", "State Disaster Response Fund (SDRF)", "Mobile e-Adangal System"],
        current_projects=["Monsoon Cyclone Preparedness Command Room", "Land Survey Drone Mapping Across 38 Districts", "VAO Online Service Delivery SLA"],
        availability_status="AVAILABLE"
    ),

    # 3. LEGISLATIVE ASSEMBLY MEMBERS (MLAs)
    OfficerDirectoryItem(
        id="dir-mla-01",
        name_en="Thiru Durai Chandrasekaran",
        name_ta="திரு துரை சந்திரசேகரன்",
        designation_en="Member of Legislative Assembly (MLA) - Thiruvaiyaru",
        designation_ta="சட்டமன்ற உறுப்பினர் (திருவையாறு)",
        role_tier="MLA",
        department_en="Legislative Assembly / Delta Agro Federation",
        department_ta="சட்டமன்றம் / டெல்டா விவசாயிகள் கூட்டமைப்பு",
        district_en="Thanjavur",
        district_ta="தஞ்சாவூர்",
        constituency="Thiruvaiyaru",
        official_email="mla.thiruvaiyaru@tnassembly.gov.in",
        cug_phone="+91 94433 12091",
        office_address="MLA Constituency Office, South Street, Thiruvaiyaru, Thanjavur - 613204",
        current_schemes=["Cauvery Delta Kuruvai Cultivation Subsidy", "DAP & Urea Fertilizer Direct Distribution"],
        current_projects=["Vennar Sub-Basin Tail-End Canal Desilting", "Kallanai Dam Feeder Channel Modernization"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-mla-02",
        name_en="Thiru K. Shanmugam",
        name_ta="திரு கே. சண்முகம்",
        designation_en="Member of Legislative Assembly (MLA) - Coimbatore South",
        designation_ta="சட்டமன்ற உறுப்பினர் (கோவை தெற்கு)",
        role_tier="MLA",
        department_en="Legislative Assembly / MSME & Urban Infra",
        department_ta="சட்டமன்றம் / சிறு-குறு தொழில் & நகர்ப்புற உள்கட்டமைப்பு",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        constituency="Coimbatore South",
        official_email="mla.cbesouth@tnassembly.gov.in",
        cug_phone="+91 98430 44321",
        office_address="MLA Office, Town Hall Complex, Coimbatore - 641001",
        current_schemes=["MSME Power Tariff Subsidy", "Singara Coimbatore 2.0 Smart Roads"],
        current_projects=["Western Ring Road Land Acquisition Coordination", "Noyyal River Ecological Rejuvenation", "Coimbatore Metro Rail Corridor Phase 1"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-mla-03",
        name_en="Thiru P. Moorthy",
        name_ta="திரு பி. மூர்த்தி",
        designation_en="Member of Legislative Assembly (MLA) - Madurai East",
        designation_ta="சட்டமன்ற உறுப்பினர் (மதுரை கிழக்கு)",
        role_tier="MLA",
        department_en="Legislative Assembly & Commercial Taxes",
        department_ta="சட்டமன்றம் & வணிகவரித் துறை",
        district_en="Madurai",
        district_ta="மதுரை",
        constituency="Madurai East",
        official_email="mla.mdu.east@tnassembly.gov.in",
        cug_phone="+91 94431 87654",
        office_address="MLA Constituency Office, Othakadai, Madurai - 625107",
        current_schemes=["Registration & Stamp Duty Modernization", "Madurai Heritage Tourism Circuit"],
        current_projects=["Madurai AIIMS Connecting Roadway", "Vaigai Riverfront Beautification Project", "ELCOT IT Park Vadapalanji Expansion"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-mla-04",
        name_en="Thiru Y. Prakash",
        name_ta="திரு ஒய். பிரகாஷ்",
        designation_en="Member of Legislative Assembly (MLA) - Hosur",
        designation_ta="சட்டமன்ற உறுப்பினர் (ஓசூர்)",
        role_tier="MLA",
        department_en="Legislative Assembly & EV Hub Development",
        department_ta="சட்டமன்றம் & மின்வாகன தொழில்துறை",
        district_en="Krishnagiri",
        district_ta="கிருஷ்ணகிரி",
        constituency="Hosur",
        official_email="mla.hosur@tnassembly.gov.in",
        cug_phone="+91 98940 12345",
        office_address="MLA Office, Bagalur Road, Hosur - 635109",
        current_schemes=["Hosur International Airport Land Survey", "Industrial Housing Scheme for Auto Ancillary Workers"],
        current_projects=["SIPCOT Krishnagiri Semiconductor Fab Corridor", "Hosur Outer Ring Road Phase 2", "400kV Substation Power Evacuation"],
        availability_status="AVAILABLE"
    ),

    # 4. GROUP 1 OFFICERS (COLLECTORS, SPS, PROJECT DIRECTORS)
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
        availability_status="AVAILABLE"
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
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-grp1-03",
        name_en="Dr. M. Sangeetha, IAS",
        name_ta="முனைவர் எம். சங்கீதா, இ.ஆ.ப.",
        designation_en="District Collector & District Magistrate, Madurai",
        designation_ta="மாவட்ட ஆட்சித்தலைவர், மதுரை",
        role_tier="GROUP_1",
        department_en="Revenue Administration & Public Welfare",
        department_ta="வருவாய் மற்றும் பொது நலத்துறை",
        district_en="Madurai",
        district_ta="மதுரை",
        constituency=None,
        official_email="collr-mdu@nic.in",
        cug_phone="+91 452 2531110",
        office_address="District Collectorate, Madurai - 625020",
        current_schemes=["Chief Minister's Breakfast Scheme", "Kalaignar Magalir Urimai Thittam", "Madurai Heritage Restoration Scheme"],
        current_projects=["Madurai GRH Anti-D Globulin Drug Inventory Streamlining", "Kalaignar Centenary Library Corridor", "Madurai Metro Project DPR Execution"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-grp1-04",
        name_en="Shankar Jiwal, IPS",
        name_ta="சங்கர் ஜிவால், இ.கா.ப.",
        designation_en="Director General of Police (DGP) & Head of Police Force, Tamil Nadu",
        designation_ta="காவல்துறை தலைமை இயக்குநர் (டி.ஜி.பி), தமிழ்நாடு",
        role_tier="GROUP_1",
        department_en="Home & Tamil Nadu Police Headquarters",
        department_ta="உள்துறை மற்றும் மாநில காவல்துறை தலைமையகம்",
        district_en="Statewide (Headquarters: Chennai)",
        district_ta="மாநிலம் முழுவதும் (சென்னை)",
        constituency=None,
        official_email="dgp@tncctns.gov.in",
        cug_phone="+91 44 2844 7777",
        office_address="DGP Headquarters, Dr. Radhakrishnan Salai, Mylapore, Chennai - 600004",
        current_schemes=["Statewide POCSO Conviction Acceleration", "Women & Children Safety Cells (Kaavalan SOS)", "Coastal Security Grid Alert"],
        current_projects=["Special Task Force Western Ghats Security", "Automated Fingerprint & AI Face Recognition System", "VIP & Executive Z+ Protocol Coordination"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-grp1-05",
        name_en="Deepak Jacob, IAS",
        name_ta="தீபக் ஜேக்கப், இ.ஆ.ப.",
        designation_en="District Collector & District Magistrate, Thanjavur",
        designation_ta="மாவட்ட ஆட்சித்தலைவர், தஞ்சாவூர்",
        role_tier="GROUP_1",
        department_en="Revenue & Delta Irrigation Command",
        department_ta="வருவாய் மற்றும் டெல்டா பாசன மேலாண்மை",
        district_en="Thanjavur",
        district_ta="தஞ்சாவூர்",
        constituency=None,
        official_email="collr-tnj@nic.in",
        cug_phone="+91 4362 230101",
        office_address="District Collectorate, Court Road, Thanjavur - 613001",
        current_schemes=["Special Kuruvai Cultivation Package", "Direct Paddy Procurement Centers (DPC) Automation"],
        current_projects=["Vennar & Grand Anicut Canal Desilting (100% Target)", "Thanjavur Smart City Phase 2", "Paddy Storage Modern Silos (₹120 Cr)"],
        availability_status="AVAILABLE"
    ),

    # 5. GROUP 2 OFFICERS (TAHSILDARS, BDOS, MUNICIPAL COMMISSIONERS)
    OfficerDirectoryItem(
        id="dir-grp2-01",
        name_en="M. Shanmugasundaram",
        name_ta="மு. சண்முகசுந்தரம்",
        designation_en="Tahsildar (Group 2), Coimbatore North Taluk",
        designation_ta="வட்டாட்சியர் (குரூப் 2), கோவை வடக்கு வட்டம்",
        role_tier="GROUP_2",
        department_en="Revenue Administration & Land Records",
        department_ta="வருவாய் நிர்வாகம் மற்றும் நில அளவை",
        district_en="Coimbatore",
        district_ta="கோயம்புத்தூர்",
        constituency="Coimbatore North",
        official_email="tah.cbenorth@tn.gov.in",
        cug_phone="+91 98422 55102",
        office_address="Taluk Office, Balasundaram Road, Coimbatore - 641018",
        current_schemes=["Digital Patta Transfer within 7 Days SLA", "Old Age Pension (OAP) Doorstep Sanction", "Kalaignar Magalir Urimai Thittam Verification"],
        current_projects=["Western Ring Road Land Compensation Scrutiny", "e-Adangal Digital Crop Ingestion 100% Saturation"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-grp2-02",
        name_en="S. Selvaraj",
        name_ta="எஸ். செல்வராஜ்",
        designation_en="Block Development Officer (BDO), Thiruvaiyaru Block",
        designation_ta="வட்டார வளர்ச்சி அலுவலர் (பி.டி.ஓ), திருவையாறு",
        role_tier="GROUP_2",
        department_en="Rural Development & Panchayat Raj",
        department_ta="ஊரக வளர்ச்சி மற்றும் ஊராட்சித் துறை",
        district_en="Thanjavur",
        district_ta="தஞ்சாவூர்",
        constituency="Thiruvaiyaru",
        official_email="bdo.thiruvaiyaru@tn.gov.in",
        cug_phone="+91 94421 88310",
        office_address="Panchayat Union Office, Thiruvaiyaru, Thanjavur - 613204",
        current_schemes=["All Village Anna Marumalarchi Thittam (AVAMT)", "MGNREGS Tail-End Desilting Work", "Jal Jeevan Rural Tap Connections"],
        current_projects=["Village Panchayat Solar Street Lighting", "Cauvery Delta Rural Road Connectivity"],
        availability_status="AVAILABLE"
    ),

    # 6. GROUP 3 & 4 OFFICERS (VAOS, REVENUE INSPECTORS)
    OfficerDirectoryItem(
        id="dir-grp3-01",
        name_en="R. Soundararajan",
        name_ta="ஆர். சௌந்தரராஜன்",
        designation_en="Village Administrative Officer (VAO - Group 4) & State VAO Association General Secretary",
        designation_ta="கிராம நிர்வாக அலுவலர் (வி.ஏ.ஓ - குரூப் 4) & மாநில பொதுச் செயலாளர்",
        role_tier="GROUP_3_4",
        department_en="Revenue Administration (Grassroots Field Division)",
        department_ta="வருவாய் நிர்வாகம் (கிராமக் களப்பிரிவு)",
        district_en="Thanjavur",
        district_ta="தஞ்சாவூர்",
        constituency="Thiruvaiyaru",
        official_email="vao.kandiyur@tn.gov.in",
        cug_phone="+91 97890 44211",
        office_address="Village Administrative Office, Kandiyur Village, Thanjavur - 613202",
        current_schemes=["Mobile Voice-First e-Adangal System", "Crop Damage Compensation Assessment", "Pattadar Grievance Redressal"],
        current_projects=["100% Crop Digitization Pilot in Delta", "Real-Time Fertilizer Requirement Geo-Tagging"],
        availability_status="AVAILABLE"
    ),
    OfficerDirectoryItem(
        id="dir-grp3-02",
        name_en="K. Meenakshi Sundaram",
        name_ta="கே. மீனாட்சி சுந்தரம்",
        designation_en="Revenue Inspector (RI - Group 3), Hosur Firka",
        designation_ta="வருவாய் ஆய்வாளர் (ஆர்.ஐ - குரூப் 3), ஓசூர் பிர்கா",
        role_tier="GROUP_3_4",
        department_en="Revenue Administration & Industrial Land Verification",
        department_ta="வருவாய் நிர்வாகம் & தொழில் நில சரிபார்ப்பு",
        district_en="Krishnagiri",
        district_ta="கிருஷ்ணகிரி",
        constituency="Hosur",
        official_email="ri.hosur@tn.gov.in",
        cug_phone="+91 94870 19283",
        office_address="Firka Office, Collectorate Annexe, Hosur - 635109",
        current_schemes=["SIPCOT Fast-Track Mutation Verification", "Encroachment Clearance Drive"],
        current_projects=["Semiconductor Fab Peripheral Survey", "Hosur EV Corridor Encroachment-Free Zone Verification"],
        availability_status="AVAILABLE"
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
                f"{' '.join(item.current_schemes)} {' '.join(item.current_projects)}"
            ).lower()

            # Check if all tokens or keywords match
            query_tokens = [t for t in q.split() if len(t) > 2]
            if query_tokens and not any(token in text_corpus for token in query_tokens):
                continue

        matches.append(item)

    return DirectorySearchResponse(
        total_matches=len(matches),
        officers=matches,
        query_interpreted=f"Filter criteria applied: Tier=[{tier}], Dept=[{dept or 'ANY'}], Dist=[{dist or 'ANY'}], Scheme=[{scheme or 'ANY'}], Proj=[{proj or 'ANY'}], Query=[{q or 'NONE'}]"
    )
