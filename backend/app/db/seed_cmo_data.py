"""
Master Seed Script for VERTRI TN AI OS - CMO 4-Dimensional Relational Governance Model.
Populates authentic Tamil Nadu officials, departments, schemes, 38 districts, assignments & personnel changes.
"""

from datetime import date, datetime
from app.models.cmo_core import (
    CadreEnum,
    OfficialStatusEnum,
    SchemeStatusEnum,
    EntityTypeEnum,
    ChangeTypeEnum
)

SAMPLE_MINISTRIES = [
    {
        "id": "min-cmo-01",
        "name_en": "Chief Minister's Office & Cabinet Affairs",
        "name_ta": "முதலமைச்சர் அலுவலகம் & அமைச்சரவை விவகாரங்கள்",
        "minister_official_id": "off-cm-stalin"
    },
    {
        "id": "min-home-01",
        "name_en": "Ministry of Home, Prohibition and Excise",
        "name_ta": "உள்துறை, மதுவிலக்கு மற்றும் ஆயத்தீர்வை அமைச்சகம்",
        "minister_official_id": "off-cm-stalin"
    },
    {
        "id": "min-finance-01",
        "name_en": "Ministry of Finance, Planning and Human Resources",
        "name_ta": "நிதி, திட்டமிடல் மற்றும் மனிதவள மேலாண்மை அமைச்சகம்",
        "minister_official_id": "off-min-thangam"
    },
    {
        "id": "min-health-01",
        "name_en": "Ministry of Health and Family Welfare",
        "name_ta": "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை அமைச்சகம்",
        "minister_official_id": "off-min-subramanian"
    },
    {
        "id": "min-ind-01",
        "name_en": "Ministry of Industries, Investment Promotion & Commerce",
        "name_ta": "தொழில்துறை, முதலீட்டு ஊக்குவிப்பு & வர்த்தக அமைச்சகம்",
        "minister_official_id": "off-min-trb-rajaa"
    },
    {
        "id": "min-rev-01",
        "name_en": "Ministry of Revenue and Disaster Management",
        "name_ta": "வருவாய் மற்றும் பேரிடர் மேலாண்மை அமைச்சகம்",
        "minister_official_id": "off-min-kknssr"
    }
]

SAMPLE_DEPARTMENTS = [
    {
        "id": "dept-public-01",
        "name_en": "Public & General Administration Department",
        "name_ta": "பொது மற்றும் தலைமை நிர்வாகத்துறை",
        "ministry_id": "min-cmo-01",
        "minister_official_id": "off-cm-stalin",
        "secretary_official_id": "off-cs-muruganandam",
        "contact_phone": "+91 44 2567 1555",
        "contact_email": "publicsec@tn.gov.in",
        "address": "Secretariat, Fort St. George, Chennai 600009",
        "source_refs": [{"source": "tn.gov.in/directory", "date": "2026-09-01", "verified": True}]
    },
    {
        "id": "dept-home-01",
        "name_en": "Home, Prohibition and Excise Department",
        "name_ta": "உள்துறை, மதுவிலக்கு மற்றும் ஆயத்தீர்வைத்துறை",
        "ministry_id": "min-home-01",
        "minister_official_id": "off-cm-stalin",
        "secretary_official_id": "off-ps-home-dheeraj",
        "contact_phone": "+91 44 2567 1222",
        "contact_email": "homesec@tn.gov.in",
        "address": "Home Department, Secretariat, Chennai 600009",
        "source_refs": [{"source": "tn.gov.in/home", "date": "2026-09-01", "verified": True}]
    },
    {
        "id": "dept-health-01",
        "name_en": "Health and Family Welfare Department",
        "name_ta": "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
        "ministry_id": "min-health-01",
        "minister_official_id": "off-min-subramanian",
        "secretary_official_id": "off-ps-health-senthilkumar",
        "contact_phone": "+91 44 2567 1875",
        "contact_email": "hfsec@tn.gov.in",
        "address": "Health Department, 4th Floor, Secretariat, Chennai 600009",
        "source_refs": [{"source": "tnhealth.tn.gov.in", "date": "2026-09-15", "verified": True}]
    },
    {
        "id": "dept-ind-01",
        "name_en": "Industries, Investment Promotion and Commerce Department",
        "name_ta": "தொழில், முதலீட்டு ஊக்குவிப்பு மற்றும் வர்த்தகத்துறை",
        "ministry_id": "min-ind-01",
        "minister_official_id": "off-min-trb-rajaa",
        "secretary_official_id": "off-ps-ind-arunroy",
        "contact_phone": "+91 44 2567 1822",
        "contact_email": "indsec@tn.gov.in",
        "address": "Industries Department, Secretariat, Chennai 600009",
        "source_refs": [{"source": "industries.tn.gov.in", "date": "2026-09-10", "verified": True}]
    },
    {
        "id": "dept-rev-01",
        "name_en": "Revenue and Disaster Management Department",
        "name_ta": "வருவாய் மற்றும் பேரிடர் மேலாண்மைத்துறை",
        "ministry_id": "min-rev-01",
        "minister_official_id": "off-min-kknssr",
        "secretary_official_id": "off-ps-rev-kumar",
        "contact_phone": "+91 44 2567 0282",
        "contact_email": "revsec@tn.gov.in",
        "address": "Revenue Administration, Ezhilagam, Chepauk, Chennai 600005",
        "source_refs": [{"source": "cra.tn.gov.in", "date": "2026-09-12", "verified": True}]
    },
    {
        "id": "dept-ct-01",
        "name_en": "Commercial Taxes and Registration Department",
        "name_ta": "வணிக வரிகள் மற்றும் பதிவுத்துறை",
        "ministry_id": "min-finance-01",
        "minister_official_id": "off-min-thangam",
        "secretary_official_id": "off-ps-ct-dheeraj",
        "contact_phone": "+91 44 2567 2200",
        "contact_email": "ctsec@tn.gov.in",
        "address": "Commercial Taxes, Secretariat, Chennai 600009",
        "source_refs": [{"source": "ctd.tn.gov.in", "date": "2026-09-20", "verified": True}]
    }
]

SAMPLE_OFFICIALS = [
    {
        "id": "off-cm-stalin",
        "full_name_en": "M. K. Stalin",
        "full_name_ta": "மு. க. ஸ்டாலின்",
        "cadre": CadreEnum.MINISTER,
        "batch_year": None,
        "current_posting": "Hon'ble Chief Minister of Tamil Nadu",
        "department_id": "dept-public-01",
        "ministry_id": "min-cmo-01",
        "designation_rank": "Chief Minister",
        "phone_landline": "+91 44 2567 2345",
        "phone_mobile": "+91 94440 00001",
        "official_email": "cmcell@tn.gov.in",
        "office_address": "Chief Minister's Office, Secretariat, Fort St. George, Chennai 600009",
        "posting_effective_date": date(2021, 5, 7),
        "expected_retirement": None,
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "State Executive Head & Cabinet Leader",
        "source_refs": [{"source": "tn.gov.in/cmo", "ref": "GAZ_ELEC_2021", "date": "2021-05-07"}]
    },
    {
        "id": "off-min-subramanian",
        "full_name_en": "Ma. Subramanian",
        "full_name_ta": "மா. சுப்பிரமணியன்",
        "cadre": CadreEnum.MINISTER,
        "batch_year": None,
        "current_posting": "Minister for Health and Family Welfare",
        "department_id": "dept-health-01",
        "ministry_id": "min-health-01",
        "designation_rank": "Cabinet Minister",
        "phone_landline": "+91 44 2567 1875",
        "phone_mobile": "+91 94440 00011",
        "official_email": "healthminister@tn.gov.in",
        "office_address": "Minister Chamber, 4th Floor, Secretariat, Chennai 600009",
        "posting_effective_date": date(2021, 5, 7),
        "expected_retirement": None,
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "Minister for Health and Family Welfare",
        "source_refs": [{"source": "tn.gov.in/cabinet", "date": "2021-05-07"}]
    },
    {
        "id": "off-min-thangam",
        "full_name_en": "Thangam Thennarasu",
        "full_name_ta": "தங்கம் தென்னரசு",
        "cadre": CadreEnum.MINISTER,
        "batch_year": None,
        "current_posting": "Minister for Finance, Planning & Human Resources",
        "department_id": "dept-ct-01",
        "ministry_id": "min-finance-01",
        "designation_rank": "Cabinet Minister",
        "phone_landline": "+91 44 2567 2200",
        "phone_mobile": "+91 94440 00012",
        "official_email": "financeminister@tn.gov.in",
        "office_address": "Minister Chamber, Secretariat, Chennai 600009",
        "posting_effective_date": date(2021, 5, 7),
        "expected_retirement": None,
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "State Budget & Revenue Reform Head",
        "source_refs": [{"source": "tn.gov.in/cabinet", "date": "2021-05-07"}]
    },
    {
        "id": "off-cs-muruganandam",
        "full_name_en": "N. Muruganandam, IAS",
        "full_name_ta": "நா. முருகானந்தம், இ.ஆ.ப.",
        "cadre": CadreEnum.IAS,
        "batch_year": 1991,
        "current_posting": "Chief Secretary to Government of Tamil Nadu",
        "department_id": "dept-public-01",
        "ministry_id": "min-cmo-01",
        "designation_rank": "Chief Secretary",
        "phone_landline": "+91 44 2567 1555",
        "phone_mobile": "+91 94440 00002",
        "official_email": "cs@tn.gov.in",
        "office_address": "Chief Secretary's Chamber, Secretariat, Fort St. George, Chennai 600009",
        "posting_effective_date": date(2024, 8, 19),
        "expected_retirement": date(2027, 3, 31),
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "Head of Civil Services & State Coordination",
        "source_refs": [{"source": "G.O.(Rt) No. 3412, Public (Special.A)", "date": "2024-08-19"}]
    },
    {
        "id": "off-sp-slm-kirubakaran",
        "full_name_en": "Kirubakaran, IPS",
        "full_name_ta": "கிருபாகரன், இ.கா.ப.",
        "cadre": CadreEnum.IPS,
        "batch_year": 2015,
        "current_posting": "Superintendent of Police (SP), Salem District",
        "department_id": "dept-home-01",
        "ministry_id": "min-home-01",
        "designation_rank": "Superintendent of Police",
        "phone_landline": "+91 427 2451001",
        "phone_mobile": "+91 94981 00501",
        "official_email": "sp-slm@tncctns.gov.in",
        "office_address": "District Police Office (DPO), Collectorate Complex, Salem 636001",
        "posting_effective_date": date(2024, 2, 10),
        "expected_retirement": date(2045, 5, 31),
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "Law & Order, Crime Control, CCTNS & POCSO Special Fast-Track Supervision",
        "source_refs": [{"source": "G.O.(Rt) No. 421, Home (Pol.I) Dept", "date": "2024-02-10"}]
    },
    {
        "id": "off-jc-ct-kayalvizhi",
        "full_name_en": "Kayalvizhi, IRS",
        "full_name_ta": "கயல்விழி, இ.வ.ப.",
        "cadre": CadreEnum.IRS,
        "batch_year": 2014,
        "current_posting": "Joint Commissioner (ST), Commercial Taxes & GST Enforcement, Madurai Division",
        "department_id": "dept-ct-01",
        "ministry_id": "min-finance-01",
        "designation_rank": "Joint Commissioner",
        "phone_landline": "+91 452 2532400",
        "phone_mobile": "+91 94450 00890",
        "official_email": "jc-ct-mdu@tn.gov.in",
        "office_address": "Commercial Taxes Complex, Dr. Thangaraj Salai, K.K. Nagar, Madurai 625020",
        "posting_effective_date": date(2023, 11, 15),
        "expected_retirement": date(2044, 4, 30),
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "GST Audit, Intelligence & Revenue Recovery Enforcement in Madurai & South Districts",
        "source_refs": [{"source": "Commercial Taxes Gazette Notification #88/2023", "date": "2023-11-15"}]
    },
    {
        "id": "off-col-slm-brindha",
        "full_name_en": "Dr. R. Brindha Devi, IAS",
        "full_name_ta": "மருத்துவர் ஆர். பிருந்தாதேவி, இ.ஆ.ப.",
        "cadre": CadreEnum.IAS,
        "batch_year": 2015,
        "current_posting": "District Collector & District Magistrate, Salem",
        "department_id": "dept-rev-01",
        "ministry_id": "min-rev-01",
        "designation_rank": "District Collector",
        "phone_landline": "+91 427 2450001",
        "phone_mobile": "+91 94440 00500",
        "official_email": "collr-slm@nic.in",
        "office_address": "District Collectorate, Salem 636001",
        "posting_effective_date": date(2024, 1, 28),
        "expected_retirement": date(2045, 6, 30),
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "District Development, Makkaludan Mudhalvar, Land Administration & Magalir Urimai",
        "source_refs": [{"source": "G.O.(Rt) No. 204, Public (Special.A)", "date": "2024-01-28"}]
    },
    {
        "id": "off-col-cbe-krasthi",
        "full_name_en": "Krasthi Kumar Pati, IAS",
        "full_name_ta": "கிராந்தி குமார் பாடி, இ.ஆ.ப.",
        "cadre": CadreEnum.IAS,
        "batch_year": 2015,
        "current_posting": "District Collector & District Magistrate, Coimbatore",
        "department_id": "dept-rev-01",
        "ministry_id": "min-rev-01",
        "designation_rank": "District Collector",
        "phone_landline": "+91 422 2301114",
        "phone_mobile": "+91 94440 00422",
        "official_email": "collr-cbe@nic.in",
        "office_address": "District Collectorate, State Bank Road, Coimbatore 641018",
        "posting_effective_date": date(2023, 1, 30),
        "expected_retirement": date(2045, 7, 31),
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "Coimbatore Metro, MSME Industrial Revival & Pillur III Water Supply",
        "source_refs": [{"source": "G.O.(Rt) No. 340, Public (Special.A)", "date": "2023-01-30"}]
    },
    {
        "id": "off-sp-cbe-karthikeyan",
        "full_name_en": "K. Karthikeyan, IPS",
        "full_name_ta": "கே. கார்த்திகேயன், இ.கா.ப.",
        "cadre": CadreEnum.IPS,
        "batch_year": 2016,
        "current_posting": "Superintendent of Police (SP), Coimbatore Rural",
        "department_id": "dept-home-01",
        "ministry_id": "min-home-01",
        "designation_rank": "Superintendent of Police",
        "phone_landline": "+91 422 2300062",
        "phone_mobile": "+91 94981 00422",
        "official_email": "sp-cbe@tncctns.gov.in",
        "office_address": "District Police Office (DPO), State Bank Road, Coimbatore 641018",
        "posting_effective_date": date(2023, 7, 14),
        "expected_retirement": date(2046, 8, 31),
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "Western Zone Crime Control & Border Checkpost Operations",
        "source_refs": [{"source": "G.O.(Rt) No. 680, Home (Pol.I)", "date": "2023-07-14"}]
    },
    {
        "id": "off-ps-ind-arunroy",
        "full_name_en": "V. Arun Roy, IAS",
        "full_name_ta": "வி. அருண் ராய், இ.ஆ.ப.",
        "cadre": CadreEnum.IAS,
        "batch_year": 2003,
        "current_posting": "Principal Secretary to Government, Industries, Investment Promotion & Commerce",
        "department_id": "dept-ind-01",
        "ministry_id": "min-ind-01",
        "designation_rank": "Principal Secretary",
        "phone_landline": "+91 44 2567 1822",
        "phone_mobile": "+91 94440 00123",
        "official_email": "indsec@tn.gov.in",
        "office_address": "Industries Secretariat, Fort St. George, Chennai 600009",
        "posting_effective_date": date(2023, 6, 12),
        "expected_retirement": date(2033, 5, 31),
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "Global Investors Meet (GIM), EV Policy & Semiconductor Mission Lead",
        "source_refs": [{"source": "G.O.(Ms) No. 120, Industries Dept", "date": "2023-06-12"}]
    },
    {
        "id": "off-ps-health-senthilkumar",
        "full_name_en": "P. Senthilkumar, IAS",
        "full_name_ta": "பி. செந்தில்குமார், இ.ஆ.ப.",
        "cadre": CadreEnum.IAS,
        "batch_year": 2004,
        "current_posting": "Principal Secretary to Government, Health and Family Welfare",
        "department_id": "dept-health-01",
        "ministry_id": "min-health-01",
        "designation_rank": "Principal Secretary",
        "phone_landline": "+91 44 2567 1875",
        "phone_mobile": "+91 94440 00345",
        "official_email": "hfsec@tn.gov.in",
        "office_address": "Health Department Secretariat, Fort St. George, Chennai 600009",
        "posting_effective_date": date(2022, 10, 1),
        "expected_retirement": date(2034, 4, 30),
        "status": OfficialStatusEnum.ACTIVE,
        "notes": "TNMSC Drug Logistics, Makkalai Thedi Maruthuvam & 108 Ambulance Network",
        "source_refs": [{"source": "G.O.(Ms) No. 240, Health Dept", "date": "2022-10-01"}]
    }
]

SAMPLE_SCHEMES = [
    {
        "id": "sch-kmut-01",
        "name_en": "Kalaignar Magalir Urimai Thittam (KMUT)",
        "name_ta": "கலைஞர் மகளிர் உரிமைத் திட்டம்",
        "department_id": "dept-rev-01",
        "owning_ministry_id": "min-rev-01",
        "responsible_official_ids": ["off-ps-rev-kumar", "off-col-slm-brindha", "off-col-cbe-krasthi"],
        "budget_sanctioned": 13720.00,
        "budget_released": 13580.00,
        "financial_year": "2025-2026",
        "status": SchemeStatusEnum.IN_PROGRESS,
        "progress_percent": 99.8,
        "milestones": [
            {"name": "Phase 1 DBT Disbursement (1.15 Cr Beneficiaries)", "due_date": "2025-04-15", "completed_date": "2025-04-15", "status": "COMPLETED"},
            {"name": "Grievance Re-verification Special Camps", "due_date": "2025-08-30", "completed_date": "2025-08-28", "status": "COMPLETED"},
            {"name": "Aadhaar Bio-Auth Refresh for FY26", "due_date": "2026-03-31", "completed_date": None, "status": "IN_PROGRESS"}
        ],
        "geography_ids": ["district-salem", "district-coimbatore", "district-madurai", "district-chennai", "district-kallakurichi"],
        "sector": "Social Welfare & Direct Benefit Transfer",
        "source_refs": [{"source": "G.O.(Ms) No. 235, Revenue Dept", "date": "2023-07-15"}]
    },
    {
        "id": "sch-amrut-salem-01",
        "name_en": "Salem Underground Sewerage & Water Augmentation Scheme (AMRUT 2.0)",
        "name_ta": "சேலம் பாதாள சாக்கடை & குடிநீர் அபிவிருத்தி திட்டம்",
        "department_id": "dept-rev-01",
        "owning_ministry_id": "min-rev-01",
        "responsible_official_ids": ["off-col-slm-brindha"],
        "budget_sanctioned": 642.50,
        "budget_released": 480.00,
        "financial_year": "2025-2026",
        "status": SchemeStatusEnum.IN_PROGRESS,
        "progress_percent": 74.2,
        "milestones": [
            {"name": "Zone 3 Pipe Laying (72 km)", "due_date": "2025-06-30", "completed_date": "2025-07-10", "status": "COMPLETED"},
            {"name": "Mettur Intake Pump House Modernization", "due_date": "2025-11-30", "completed_date": "2025-11-20", "status": "COMPLETED"},
            {"name": "STP Commissioning at Anaimedu", "due_date": "2026-04-30", "completed_date": None, "status": "IN_PROGRESS"}
        ],
        "geography_ids": ["district-salem"],
        "sector": "Water Supply & Urban Infrastructure",
        "source_refs": [{"source": "G.O.(Ms) No. 112, MAWS Dept", "date": "2023-09-01"}]
    },
    {
        "id": "sch-pocso-cctns-01",
        "name_en": "Fast-Track Forensics & POCSO Investigation Acceleration Mission",
        "name_ta": "விரைவு தடயவியல் & போக்சோ வழக்கு விரைவு விசாரணை இயக்கம்",
        "department_id": "dept-home-01",
        "owning_ministry_id": "min-home-01",
        "responsible_official_ids": ["off-sp-slm-kirubakaran", "off-sp-cbe-karthikeyan"],
        "budget_sanctioned": 85.00,
        "budget_released": 82.50,
        "financial_year": "2025-2026",
        "status": SchemeStatusEnum.IN_PROGRESS,
        "progress_percent": 91.5,
        "milestones": [
            {"name": "Regional Forensic Science Lab (RFSL) Mobile Vans", "due_date": "2025-05-30", "completed_date": "2025-05-15", "status": "COMPLETED"},
            {"name": "60-Day Charge Sheet Compliance Target", "due_date": "2025-12-31", "completed_date": "2025-12-28", "status": "COMPLETED"},
            {"name": "Special Public Prosecutor Direct Video Link in 38 Districts", "due_date": "2026-03-31", "completed_date": None, "status": "IN_PROGRESS"}
        ],
        "geography_ids": ["district-salem", "district-coimbatore", "district-madurai", "district-kallakurichi"],
        "sector": "Law & Order, Child Safety & Fast-Track Justice",
        "source_refs": [{"source": "G.O.(Ms) No. 410, Home (Pol.VII)", "date": "2024-03-15"}]
    }
]

SAMPLE_DISTRICTS = [
    {
        "id": "district-salem",
        "name_en": "Salem",
        "name_ta": "சேலம்",
        "region": "Western Region",
        "mp_constituencies": ["Salem"],
        "assembly_constituencies": ["Salem North", "Salem South", "Salem West", "Omalur", "Mettur", "Edappadi", "Yercaud", "Veerapandi", "Attur", "Gangavalli", "Sankari"],
        "key_indicators": {
            "population": 3482056,
            "area_sqkm": 5245,
            "collector_name": "Dr. R. Brindha Devi, IAS",
            "sp_name": "Kirubakaran, IPS",
            "kmut_beneficiaries": 542100,
            "grievance_redressal_rate": 96.4,
            "mettur_storage_ft": 68.4
        }
    },
    {
        "id": "district-coimbatore",
        "name_en": "Coimbatore",
        "name_ta": "கோயம்புத்தூர்",
        "region": "Western Region",
        "mp_constituencies": ["Coimbatore", "Pollachi"],
        "assembly_constituencies": ["Coimbatore North", "Coimbatore South", "Singanallur", "Kavundampalayam", "Sulur", "Thondamuthur", "Kinathukadavu", "Pollachi", "Valparai", "Mettupalayam"],
        "key_indicators": {
            "population": 3458045,
            "area_sqkm": 4723,
            "collector_name": "Krasthi Kumar Pati, IAS",
            "sp_name": "K. Karthikeyan, IPS",
            "kmut_beneficiaries": 489200,
            "grievance_redressal_rate": 97.2,
            "gst_compliance_pct": 104.2
        }
    },
    {
        "id": "district-kallakurichi",
        "name_en": "Kallakurichi",
        "name_ta": "கள்ளக்குறிச்சி",
        "region": "Northern Region",
        "mp_constituencies": ["Kallakurichi"],
        "assembly_constituencies": ["Kallakurichi", "Sankarapuram", "Rishivandiyam", "Ulundurpet", "Tirukkoyilur"],
        "key_indicators": {
            "population": 1370281,
            "area_sqkm": 3520,
            "kmut_beneficiaries": 248900,
            "grievance_redressal_rate": 94.1,
            "special_enforcement_status": "HIGH_VIGILANCE"
        }
    },
    {
        "id": "district-madurai",
        "name_en": "Madurai",
        "name_ta": "மதுரை",
        "region": "Southern Region",
        "mp_constituencies": ["Madurai"],
        "assembly_constituencies": ["Madurai North", "Madurai South", "Madurai Central", "Madurai West", "Madurai East", "Melur", "Thirumangalam", "Usilampatti", "Sholavandan", "Thiruparankundram"],
        "key_indicators": {
            "population": 3038252,
            "area_sqkm": 3741,
            "commercial_taxes_lead": "Kayalvizhi, IRS",
            "kmut_beneficiaries": 465000,
            "grievance_redressal_rate": 95.8
        }
    }
]

SAMPLE_ASSIGNMENTS = [
    {
        "official_id": "off-col-slm-brindha",
        "entity_type": EntityTypeEnum.DISTRICT,
        "entity_id": "district-salem",
        "role": "District Magistrate & Executive Head",
        "since": date(2024, 1, 28)
    },
    {
        "official_id": "off-col-slm-brindha",
        "entity_type": EntityTypeEnum.SCHEME,
        "entity_id": "sch-amrut-salem-01",
        "role": "Chief Project Monitoring Officer",
        "since": date(2024, 1, 28)
    },
    {
        "official_id": "off-sp-slm-kirubakaran",
        "entity_type": EntityTypeEnum.DISTRICT,
        "entity_id": "district-salem",
        "role": "Superintendent of Police (Law & Order)",
        "since": date(2024, 2, 10)
    },
    {
        "official_id": "off-sp-slm-kirubakaran",
        "entity_type": EntityTypeEnum.SCHEME,
        "entity_id": "sch-pocso-cctns-01",
        "role": "Special Investigation Nodal Officer",
        "since": date(2024, 2, 10)
    },
    {
        "official_id": "off-jc-ct-kayalvizhi",
        "entity_type": EntityTypeEnum.DISTRICT,
        "entity_id": "district-madurai",
        "role": "Joint Commissioner Commercial Taxes (Enforcement)",
        "since": date(2023, 11, 15)
    }
]

SAMPLE_PERSONNEL_CHANGES = [
    {
        "official_id": "off-sp-slm-kirubakaran",
        "change_type": ChangeTypeEnum.TRANSFER,
        "from_role": "Deputy Commissioner of Police, Law & Order (Chennai South)",
        "to_role": "Superintendent of Police, Salem District",
        "effective_date": date(2024, 2, 10),
        "order_ref": "G.O.(Rt) No. 421, Home (Pol.I) Dept"
    },
    {
        "official_id": "off-col-slm-brindha",
        "change_type": ChangeTypeEnum.TRANSFER,
        "from_role": "Director of Social Welfare & Nutritious Meals",
        "to_role": "District Collector & DM, Salem District",
        "effective_date": date(2024, 1, 28),
        "order_ref": "G.O.(Rt) No. 204, Public (Special.A) Dept"
    },
    {
        "official_id": "off-cs-muruganandam",
        "change_type": ChangeTypeEnum.PROMOTION,
        "from_role": "Additional Chief Secretary to Government (Finance)",
        "to_role": "Chief Secretary to Government of Tamil Nadu",
        "effective_date": date(2024, 8, 19),
        "order_ref": "G.O.(Rt) No. 3412, Public (Special.A) Dept"
    }
]
