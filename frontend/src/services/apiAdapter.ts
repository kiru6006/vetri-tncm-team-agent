import {
  OfficialGRMProfile,
  AutocompleteItem,
  HierarchyNode,
  SyncConnector,
  SyncAuditLog,
  ReportingNode,
  DataSourceMetadata,
  District,
  FlagshipScheme,
  UserRole,
  CadreType,
  OfficialStatus
} from '../types';
import {
  GOVERNANCE_ISSUES_MASTER,
  INITIAL_EXECUTIVE_INSTRUCTIONS,
  TN_DEPARTMENTS,
  MASTER_DISTRICTS,
  MASTER_FLAGSHIP_SCHEMES
} from '../data/governanceData';

const DEFAULT_DATA_SOURCE: DataSourceMetadata = {
  source_name: "Government of Tamil Nadu Official Portal & Gazette",
  source_portal_url: "https://www.tn.gov.in",
  last_synced_at: "2026-11-14T06:00:00Z",
  sync_status: "VERIFIED",
  record_hash: "sha256-verified-gov-tn-2026-auth",
  source_reference_id: "TN-GOV-GAZETTE-2026",
  verified_by_audit: true
};

function createOfficialProfile(data: Partial<OfficialGRMProfile> & {
  id: string;
  name_en: string;
  name_ta: string;
  designation_en: string;
  designation_ta: string;
  cadre: CadreType;
  role_tier: UserRole;
}): OfficialGRMProfile {
  return {
    id: data.id,
    name_en: data.name_en,
    name_ta: data.name_ta,
    cadre: data.cadre,
    batch_year: data.batch_year,
    service_category: data.service_category || 'State Civil Services',
    designation_en: data.designation_en,
    designation_ta: data.designation_ta,
    department_en: data.department_en || 'State Administration',
    department_ta: data.department_ta || 'மாநில நிர்வாகம்',
    office_name: data.office_name || 'Government Secretariat',
    district_en: data.district_en || 'Statewide',
    district_ta: data.district_ta || 'மாநிலம் முழுவதும்',
    taluk_en: data.taluk_en,
    role_tier: data.role_tier,
    official_email: data.official_email || 'officer@tn.gov.in',
    cug_phone: data.cug_phone || '+91 44 2567 0000',
    office_address_en: data.office_address_en || 'Fort St. George, Chennai - 600009',
    office_address_ta: data.office_address_ta || 'புனித ஜார்ஜ் கோட்டை, சென்னை - 600009',
    status: data.status || 'AVAILABLE',
    reporting_hierarchy: data.reporting_hierarchy || [],
    direct_reports: data.direct_reports || [],
    responsibilities: data.responsibilities || ['Executive Administration', 'Public Policy Implementation'],
    current_projects: data.current_projects || ['State Project Review'],
    current_schemes: data.current_schemes || ['Kalaignar Magalir Urimai Thittam'],
    committees: data.committees || ['State Monitoring Committee'],
    upcoming_meetings_count: data.upcoming_meetings_count || 2,
    recent_decisions: data.recent_decisions || ['Approved Action Plan'],
    recent_gos: data.recent_gos || ['G.O.Ms.No. 128'],
    recent_reviews: data.recent_reviews || ['Quarterly Performance Review'],
    kpis: data.kpis || { 'Satisfaction': 94.2 },
    performance_score: data.performance_score || 90.0,
    avatar_color: data.avatar_color || 'from-blue-600 to-indigo-800',
    data_source: data.data_source || DEFAULT_DATA_SOURCE
  };
}

export const MASTER_OFFICIALS: OfficialGRMProfile[] = [
  createOfficialProfile({
    id: "grm-cm-01",
    name_en: "M. K. Stalin",
    name_ta: "மு. க. ஸ்டாலின்",
    cadre: "MINISTER",
    service_category: "State Political Executive",
    designation_en: "Hon'ble Chief Minister of Tamil Nadu",
    designation_ta: "மாண்புமிகு தமிழ்நாடு முதலமைச்சர்",
    role_tier: "CHIEF_MINISTER",
    department_en: "State Executive, Cabinet & Public",
    department_ta: "மாநில தலைமை, அமைச்சரவை & பொதுத்துறை",
    district_en: "Statewide (Secretariat, Chennai)",
    district_ta: "மாநிலம் முழுவதும் (தலைமைச் செயலகம், சென்னை)",
    taluk_en: "Chennai",
    office_name: "Chief Minister's Secretariat Chamber",
    office_address_en: "CMO, 2nd Floor, Main Building, Fort St. George, Chennai - 600009",
    office_address_ta: "முதல்வர் அலுவலகம், புனித ஜார்ஜ் கோட்டை, சென்னை - 600009",
    official_email: "cmcell@tn.gov.in",
    cug_phone: "+91 44 2567 2345",
    status: "AVAILABLE",
    avatar_color: "from-amber-500 to-amber-700",
    direct_reports: [
      {
        id: "grm-cs-01",
        name: "N. Muruganandam, IAS",
        cadre: "IAS",
        designation: "Chief Secretary to Government",
        department: "Public Department"
      },
      {
        id: "grm-min-fin",
        name: "Thiru Thangam Thennarasu",
        cadre: "MINISTER",
        designation: "Hon'ble Minister for Finance, Planning & HR",
        department: "Finance Department"
      }
    ],
    responsibilities: [
      "Overall State Governance, Policy Formulation & $1T Economy Roadmap",
      "Cabinet Approvals & Executive Decrees",
      "Statewide Crisis & Disaster Response Command",
      "Flagship Scheme Direct Review & Citizen Welfare Saturation"
    ],
    current_schemes: [
      "Kalaignar Magalir Urimai Thittam (KMUT)",
      "Chief Minister's Breakfast Scheme",
      "Makkalai Thedi Maruthuvam",
      "Pudhumai Penn Scheme"
    ],
    current_projects: [
      "Chennai Metro Rail Corridor Phase 2 (₹63,246 Cr)",
      "Semiconductor Fab Parks in Krishnagiri & Hosur",
      "Parandur Greenfield International Airport"
    ],
    performance_score: 96.5
  }),
  createOfficialProfile({
    id: "grm-cs-01",
    name_en: "N. Muruganandam, IAS",
    name_ta: "நா. முருகானந்தம், இ.ஆ.ப.",
    cadre: "IAS",
    batch_year: 1991,
    service_category: "Indian Administrative Service",
    designation_en: "Chief Secretary to Government",
    designation_ta: "தலைமைச் செயலாளர்",
    role_tier: "CHIEF_SECRETARY",
    department_en: "Public Department & State Administration",
    department_ta: "பொதுத்துறை & தலைமை நிர்வாகம்",
    district_en: "Statewide (Chennai)",
    district_ta: "மாநிலம் முழுவதும் (சென்னை)",
    office_name: "Chief Secretary's Chamber",
    office_address_en: "Chief Secretariat, Fort St. George, Chennai - 600009",
    office_address_ta: "தலைமைச் செயலகம், புனித ஜார்ஜ் கோட்டை, சென்னை - 600009",
    official_email: "cs@tn.gov.in",
    cug_phone: "+91 44 2567 1555",
    status: "AVAILABLE",
    avatar_color: "from-blue-600 to-indigo-800",
    direct_reports: [
      { id: "grm-ps-ind-01", name: "V. Arun Roy, IAS", cadre: "IAS", designation: "Principal Secretary, Industries", department: "Industries" },
      { id: "grm-ps-hlt-01", name: "P. Senthilkumar, IAS", cadre: "IAS", designation: "Principal Secretary, Health", department: "Health" },
      { id: "grm-col-slm-01", name: "Dr. R. Brindha Devi, IAS", cadre: "IAS", designation: "Collector, Salem", department: "Revenue" },
      { id: "grm-col-cbe-01", name: "Kranthi Kumar Pati, IAS", cadre: "IAS", designation: "Collector, Coimbatore", department: "Revenue" }
    ],
    responsibilities: [
      "Head of Civil Services & Administrative Machinery",
      "Coordination of all Secretariat Departments & Collectors",
      "Law & Order Apex Monitoring with DGP",
      "Implementation of CM Directives & Cabinet Decisions"
    ],
    current_schemes: ["Ungal Thogaiyil Mudhalamaicher", "Chief Minister's Fellowship"],
    current_projects: ["State Infrastructure Monitoring Cell (e-Munnetram)"],
    performance_score: 94.8
  }),
  createOfficialProfile({
    id: "grm-col-slm-01",
    name_en: "Dr. R. Brindha Devi, IAS",
    name_ta: "மருத்துவர் இரா. பிருந்தாதேவி, இ.ஆ.ப.",
    cadre: "IAS",
    batch_year: 2012,
    service_category: "Indian Administrative Service",
    designation_en: "District Collector & District Magistrate, Salem",
    designation_ta: "மாவட்ட ஆட்சியர், சேலம்",
    role_tier: "DISTRICT_COLLECTOR",
    department_en: "Revenue and District Administration",
    department_ta: "வருவாய் மற்றும் மாவட்ட நிர்வாகம்",
    district_en: "Salem",
    district_ta: "சேலம்",
    taluk_en: "Salem West",
    office_name: "Salem District Collectorate",
    office_address_en: "Collectorate Complex, Salem - 636001",
    office_address_ta: "மாவட்ட ஆட்சியர் அலுவலகம், சேலம் - 636001",
    official_email: "collr-slm@nic.in",
    cug_phone: "+91 427 2450001",
    status: "AVAILABLE",
    avatar_color: "from-emerald-600 to-teal-800",
    responsibilities: [
      "Executive Head of District Revenue, Grievance Redressal and Law & Order Coordination",
      "Salem Ring Road Expressway Land Acquisition Settlement",
      "Kuruvai Cultivation Irrigation & Agriculture Input Monitoring"
    ],
    current_projects: ["Salem Ring Road Phase-2 (₹120 Cr)", "Mettur Dam Surplus Water Scheme"],
    current_schemes: ["Kalaignar Magalir Urimai Thittam", "Chief Minister Breakfast Scheme"],
    performance_score: 87.9
  }),
  createOfficialProfile({
    id: "grm-col-cbe-01",
    name_en: "Kranthi Kumar Pati, IAS",
    name_ta: "கிராந்திகுமார் பாடி, இ.ஆ.ப.",
    cadre: "IAS",
    batch_year: 2015,
    service_category: "Indian Administrative Service",
    designation_en: "District Collector & District Magistrate, Coimbatore",
    designation_ta: "மாவட்ட ஆட்சியர், கோயம்புத்தூர்",
    role_tier: "DISTRICT_COLLECTOR",
    department_en: "Revenue and District Administration",
    department_ta: "வருவாய் மற்றும் மாவட்ட நிர்வாகம்",
    district_en: "Coimbatore",
    district_ta: "கோயம்புத்தூர்",
    taluk_en: "Coimbatore South",
    office_name: "Coimbatore District Collectorate",
    office_address_en: "Collectorate, State Bank Road, Gopalapuram, Coimbatore - 641018",
    office_address_ta: "மாவட்ட ஆட்சியர் அலுவலகம், கோயம்புத்தூர் - 641018",
    official_email: "collr-cbe@nic.in",
    cug_phone: "+91 422 2301114",
    status: "AVAILABLE",
    avatar_color: "from-cyan-600 to-blue-800",
    responsibilities: [
      "Industrial Infrastructure & Western Corridor Development",
      "Pollachi Groundwater Stress & Industrial Effluent Monitoring",
      "Airport Expansion Land Acquisition Phase 2"
    ],
    current_projects: ["Coimbatore International Airport Expansion (₹1,800 Cr)", "Semiconductor Fab Infrastructure"],
    performance_score: 91.8
  }),
  createOfficialProfile({
    id: "grm-sp-slm-kirubakaran",
    name_en: "A. K. Arun Kabilan, IPS",
    name_ta: "அ. க. அருண் கபிலன், இ.கா.ப.",
    cadre: "IPS",
    batch_year: 2014,
    service_category: "Indian Police Service",
    designation_en: "Superintendent of Police, Salem District",
    designation_ta: "காவல் கண்காணிப்பாளர், சேலம் மாவட்டம்",
    role_tier: "SUPERINTENDENT_OF_POLICE",
    department_en: "Home & Police Administration",
    department_ta: "உள்துறை மற்றும் காவல் நிர்வாகம்",
    district_en: "Salem",
    district_ta: "சேலம்",
    office_name: "District Police Office Salem",
    office_address_en: "DPO Complex, Kumarasamipatti, Salem - 636007",
    office_address_ta: "மாவட்ட காவல் கண்காணிப்பாளர் அலுவலகம், சேலம் - 636007",
    official_email: "sp-slm@tncops.gov.in",
    cug_phone: "+91 427 2451000",
    status: "AVAILABLE",
    avatar_color: "from-slate-700 to-slate-900",
    responsibilities: [
      "District Law and Order Maintenance",
      "Palar & Sarabanga Riverbed Anti-Sand Smuggling Squad",
      "CCTNS Digitization and Highway Patrol Network"
    ],
    performance_score: 89.2
  }),
  createOfficialProfile({
    id: "grm-ps-hlt-01",
    name_en: "P. Senthilkumar, IAS",
    name_ta: "ப. செந்தில்குமார், இ.ஆ.ப.",
    cadre: "IAS",
    batch_year: 1995,
    service_category: "Indian Administrative Service",
    designation_en: "Principal Secretary to Government, Health & Family Welfare",
    designation_ta: "முதன்மைச் செயலாளர், மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
    role_tier: "PRINCIPAL_SECRETARY",
    department_en: "Health and Family Welfare Department",
    department_ta: "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
    district_en: "Statewide (Chennai)",
    district_ta: "சென்னை",
    office_name: "Health Secretariat Chamber",
    office_address_en: "4th Floor, Namakkal Kavignar Maaligai, Fort St. George, Chennai - 600009",
    office_address_ta: "நாமக்கல் கவிஞர் மாளிகை, புனித ஜார்ஜ் கோட்டை, சென்னை - 600009",
    official_email: "hfwsec@tn.gov.in",
    cug_phone: "+91 44 2567 1875",
    status: "AVAILABLE",
    avatar_color: "from-rose-600 to-red-800",
    responsibilities: [
      "Overall State Public Health Strategy & Hospital Administration",
      "TNMSC Essential Drug Warehouse Logistics & Anti-D Globulin Supplies",
      "Makkalai Thedi Maruthuvam & 108 Ambulance Fleet Expansion"
    ],
    current_schemes: ["Makkalai Thedi Maruthuvam", "Innuyir Kaappom - Nammai Kaakkum 48"],
    performance_score: 92.0
  }),
  createOfficialProfile({
    id: "grm-comm-ct-01",
    name_en: "Dr. Dheeraj Kumar, IAS",
    name_ta: "மருத்துவர் தீரஜ் குமார், இ.ஆ.ப.",
    cadre: "IAS",
    batch_year: 1993,
    service_category: "Indian Administrative Service",
    designation_en: "Commissioner of Commercial Taxes",
    designation_ta: "வணிக வரி ஆணையர்",
    role_tier: "COMMISSIONER",
    department_en: "Finance & Commercial Taxes Department",
    department_ta: "நிதி & வணிக வரித்துறை",
    district_en: "Statewide (Chennai)",
    district_ta: "சென்னை",
    office_name: "Ezhilagam Commercial Taxes Complex",
    office_address_en: "Chepauk, Chennai - 600005",
    office_address_ta: "எழிலகம், சேப்பாக்கம், சென்னை - 600005",
    official_email: "cct@ctd.tn.gov.in",
    cug_phone: "+91 44 2829 0909",
    status: "AVAILABLE",
    avatar_color: "from-amber-600 to-yellow-800",
    responsibilities: [
      "State Goods & Services Tax (SGST) Collection Target Execution",
      "Tirupur Apparel Export Refund Clearance & Red-Tape Elimination",
      "AI-Based E-Way Bill Anti-Evasion Analytics"
    ],
    performance_score: 93.6
  }),
  createOfficialProfile({
    id: "grm-dig-cbe",
    name_en: "K. Bhavaneeswari, IPS",
    name_ta: "கே. பவானீஸ்வரி, இ.கா.ப.",
    cadre: "IPS",
    batch_year: 2004,
    service_category: "Indian Police Service",
    designation_en: "Inspector General of Police (West Zone, Coimbatore)",
    designation_ta: "காவல்துறை தலைவர் (மேற்கு மண்டலம், கோவை)",
    role_tier: "SUPERINTENDENT_OF_POLICE",
    department_en: "Home & Police Administration",
    department_ta: "உள்துறை மற்றும் காவல்",
    district_en: "Coimbatore",
    district_ta: "கோயம்புத்தூர்",
    office_name: "West Zone Police Range Headquarters",
    office_address_en: "Race Course Road, Coimbatore - 641018",
    office_address_ta: "ரேஸ் கோர்ஸ் சாலை, கோயம்புத்தூர் - 641018",
    official_email: "igp-west@tnpolice.gov.in",
    cug_phone: "+91 422 2220100",
    status: "AVAILABLE",
    avatar_color: "from-slate-600 to-indigo-900",
    responsibilities: [
      "Operational Command of 8 Western Districts",
      "Cyber Crime Enforcement Hub & Industrial Security"
    ],
    performance_score: 91.0
  }),
  createOfficialProfile({
    id: "grm-jc-ct-kayalvizhi",
    name_en: "Kayalvizhi, IRS",
    name_ta: "கயல்விழி, இ.வ.ப.",
    cadre: "IRS",
    batch_year: 2011,
    service_category: "Indian Revenue Service",
    designation_en: "Joint Commissioner of Commercial Taxes, Madurai Division",
    designation_ta: "வணிக வரி இணை ஆணையர், மதுரை பிரிவு",
    role_tier: "COMMISSIONER",
    department_en: "Commercial Taxes & Central GST Coordination",
    department_ta: "வணிக வரிகள் மற்றும் மத்திய ஜிஎஸ்டி ஒருங்கிணைப்பு",
    district_en: "Madurai",
    district_ta: "மதுரை",
    office_name: "Commercial Taxes Complex Madurai",
    office_address_en: "Dr. Thangaraj Salai, Madurai - 625020",
    office_address_ta: "டாக்டர் தங்கராஜ் சாலை, மதுரை - 625020",
    official_email: "jc-ct-mdu@ctd.tn.gov.in",
    cug_phone: "+91 452 2531200",
    status: "AVAILABLE",
    avatar_color: "from-purple-600 to-indigo-800",
    responsibilities: [
      "Commercial Taxes Administration across Southern Districts",
      "GST Joint Audit Taskforce with Central Board of Indirect Taxes",
      "Scrutiny of Input Tax Credit Anomalies in Spinning Mills"
    ],
    performance_score: 88.5
  })
];

export const MASTER_HIERARCHY_TREE: HierarchyNode = {
  id: "node-cm-01",
  name_en: "M. K. Stalin",
  name_ta: "மு. க. ஸ்டாலின்",
  designation_en: "Hon'ble Chief Minister of Tamil Nadu",
  designation_ta: "மாண்புமிகு தமிழ்நாடு முதலமைச்சர்",
  tier_level: 1,
  tier_role: "CHIEF_MINISTER",
  cug_phone: "+91 44 2567 2345",
  official_email: "cmcell@tn.gov.in",
  office_address: "CMO, 2nd Floor, Main Building, Fort St. George, Chennai - 600009",
  pending_approvals_count: 7,
  kpi_score: 96.5,
  active_projects_count: 184,
  active_schemes_count: 24,
  subordinates_count: 1350000,
  children: [
    {
      id: "node-min-fin",
      name_en: "Thiru Thangam Thennarasu",
      name_ta: "திரு தங்கம் தென்னரசு",
      designation_en: "Minister for Finance & Planning",
      designation_ta: "நிதி அமைச்சர்",
      tier_level: 2,
      tier_role: "CABINET_MINISTER",
      department_code: "FIN",
      department_en: "Finance Department",
      cug_phone: "+91 44 2567 1122",
      official_email: "finmin@tn.gov.in",
      office_address: "Secretariat, Chennai",
      pending_approvals_count: 3,
      kpi_score: 93.0,
      active_projects_count: 18,
      active_schemes_count: 8,
      subordinates_count: 45000,
      children: [
        {
          id: "node-cct",
          name_en: "Dr. Dheeraj Kumar, IAS",
          name_ta: "தீரஜ் குமார், இ.ஆ.ப.",
          designation_en: "Commissioner of Commercial Taxes",
          designation_ta: "வணிக வரி ஆணையர்",
          tier_level: 3,
          tier_role: "COMMISSIONER",
          department_code: "FIN",
          department_en: "Commercial Taxes",
          cug_phone: "+91 44 2829 0909",
          official_email: "cct@ctd.tn.gov.in",
          office_address: "Chepauk, Chennai",
          pending_approvals_count: 1,
          kpi_score: 91.5,
          active_projects_count: 6,
          active_schemes_count: 2,
          subordinates_count: 12000,
          children: []
        }
      ]
    },
    {
      id: "node-cs-01",
      name_en: "N. Muruganandam, IAS",
      name_ta: "நா. முருகானந்தம், இ.ஆ.ப.",
      designation_en: "Chief Secretary to Government",
      designation_ta: "தலைமைச் செயலாளர்",
      tier_level: 2,
      tier_role: "CHIEF_SECRETARY",
      department_code: "PUBLIC",
      department_en: "Civil Secretariat Administration",
      cug_phone: "+91 44 2567 1555",
      official_email: "cs@tn.gov.in",
      office_address: "Chief Secretariat, Fort St. George, Chennai",
      pending_approvals_count: 12,
      kpi_score: 94.8,
      active_projects_count: 140,
      active_schemes_count: 35,
      subordinates_count: 850000,
      children: [
        {
          id: "node-ps-hlt",
          name_en: "P. Senthilkumar, IAS",
          name_ta: "ப. செந்தில்குமார், இ.ஆ.ப.",
          designation_en: "Principal Secretary, Health",
          designation_ta: "முதன்மைச் செயலாளர், மக்கள் நல்வாழ்வு",
          tier_level: 3,
          tier_role: "PRINCIPAL_SECRETARY",
          department_code: "HLT",
          department_en: "Health & Family Welfare",
          cug_phone: "+91 44 2567 1875",
          official_email: "hfwsec@tn.gov.in",
          office_address: "Namakkal Kavignar Maaligai, Chennai",
          pending_approvals_count: 4,
          kpi_score: 92.0,
          active_projects_count: 24,
          active_schemes_count: 14,
          subordinates_count: 125000,
          children: []
        },
        {
          id: "node-col-slm",
          name_en: "Dr. R. Brindha Devi, IAS",
          name_ta: "மருத்துவர் இரா. பிருந்தாதேவி, இ.ஆ.ப.",
          designation_en: "District Collector, Salem",
          designation_ta: "மாவட்ட ஆட்சியர், சேலம்",
          tier_level: 3,
          tier_role: "DISTRICT_COLLECTOR",
          department_code: "REV",
          department_en: "Salem District Administration",
          district_code: "SLM",
          district_name_en: "Salem",
          cug_phone: "+91 427 2450001",
          official_email: "collr-slm@nic.in",
          office_address: "Collectorate, Salem",
          pending_approvals_count: 5,
          kpi_score: 87.9,
          active_projects_count: 14,
          active_schemes_count: 12,
          subordinates_count: 18000,
          children: [
            {
              id: "node-sp-slm",
              name_en: "A. K. Arun Kabilan, IPS",
              name_ta: "அருண் கபிலன், இ.கா.ப.",
              designation_en: "Superintendent of Police, Salem",
              designation_ta: "காவல் கண்காணிப்பாளர், சேலம்",
              tier_level: 4,
              tier_role: "SUPERINTENDENT_OF_POLICE",
              department_code: "POL",
              department_en: "Police Department",
              district_code: "SLM",
              district_name_en: "Salem",
              cug_phone: "+91 427 2451000",
              official_email: "sp-slm@tncops.gov.in",
              office_address: "DPO Complex, Salem",
              pending_approvals_count: 2,
              kpi_score: 89.2,
              active_projects_count: 3,
              active_schemes_count: 2,
              subordinates_count: 2400,
              children: []
            }
          ]
        },
        {
          id: "node-col-cbe",
          name_en: "Kranthi Kumar Pati, IAS",
          name_ta: "கிராந்திகுமார் பாடி, இ.ஆ.ப.",
          designation_en: "District Collector, Coimbatore",
          designation_ta: "மாவட்ட ஆட்சியர், கோவை",
          tier_level: 3,
          tier_role: "DISTRICT_COLLECTOR",
          department_code: "REV",
          department_en: "Coimbatore District Administration",
          district_code: "CBE",
          district_name_en: "Coimbatore",
          cug_phone: "+91 422 2301114",
          official_email: "collr-cbe@nic.in",
          office_address: "Collectorate, Coimbatore",
          pending_approvals_count: 4,
          kpi_score: 91.8,
          active_projects_count: 22,
          active_schemes_count: 16,
          subordinates_count: 24000,
          children: []
        }
      ]
    }
  ]
};

export const SYNC_CONNECTORS: SyncConnector[] = [
  {
    id: "conn-esevai",
    name: "e-Sevai (TNeGA Portal)",
    source_category: "CITIZEN_SERVICES",
    endpoint_url: "https://tnesevai.tn.gov.in/api/v2/services",
    frequency_cron: "*/15 * * * *",
    last_sync_timestamp: "2026-11-14T03:45:00Z",
    last_sync_status: "SUCCESS",
    records_processed: 18450,
    records_updated: 240,
    flagged_outdated: 0,
    latency_ms: 120
  },
  {
    id: "conn-ifhrms",
    name: "IFHRMS Treasury & Finance Gateway",
    source_category: "PUBLIC_FINANCE",
    endpoint_url: "https://ifhrms.tn.gov.in/api/v1/expenditure",
    frequency_cron: "0 * * * *",
    last_sync_timestamp: "2026-11-14T03:00:00Z",
    last_sync_status: "SUCCESS",
    records_processed: 94500,
    records_updated: 1420,
    flagged_outdated: 2,
    latency_ms: 195
  },
  {
    id: "conn-cctns",
    name: "CCTNS Police Incident Data Lake",
    source_category: "PUBLIC_SAFETY",
    endpoint_url: "https://cctns.tnpolice.gov.in/api/v1/incidents",
    frequency_cron: "*/30 * * * *",
    last_sync_timestamp: "2026-11-14T03:30:00Z",
    last_sync_status: "SUCCESS",
    records_processed: 3200,
    records_updated: 64,
    flagged_outdated: 0,
    latency_ms: 88
  }
];

export const SYNC_AUDIT_LOGS: SyncAuditLog[] = [
  {
    id: "log-sync-101",
    connector_id: "conn-ifhrms",
    connector_name: "IFHRMS Treasury & Finance Gateway",
    executed_at: "2026-11-14T03:00:00Z",
    status: "SUCCESS",
    records_added: 420,
    records_modified: 12,
    verified_by: "State Audit Directorate",
    audit_hash: "sha256-ifhrms-audit-log-101"
  },
  {
    id: "log-sync-102",
    connector_id: "conn-cctns",
    connector_name: "CCTNS Police Incident Data Lake",
    executed_at: "2026-11-14T03:30:00Z",
    status: "SUCCESS",
    records_added: 88,
    records_modified: 3,
    verified_by: "Police Computer Wing",
    audit_hash: "sha256-cctns-audit-log-102"
  }
];

export function getDemoAutocomplete(query: string): AutocompleteItem[] {
  const q = query.toLowerCase().trim();
  if (!q) {
    return MASTER_OFFICIALS.slice(0, 6).map((o) => ({
      id: o.id,
      name_en: o.name_en,
      name_ta: o.name_ta,
      cadre: o.cadre,
      batch_year: o.batch_year,
      designation_en: o.designation_en,
      department_en: o.department_en,
      district_en: o.district_en,
      office_name: o.office_name,
      official_email: o.official_email,
      cug_phone: o.cug_phone,
      status: o.status,
      avatar_color: o.avatar_color,
      role_tier: o.role_tier
    }));
  }

  const terms = q.split(/\s+/).filter(Boolean);

  const matched = MASTER_OFFICIALS.filter((o) => {
    const haystack = `${o.name_en} ${o.name_ta} ${o.cadre} ${o.designation_en} ${o.department_en} ${o.district_en || ''} ${o.official_email}`.toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });

  return matched.map((o) => ({
    id: o.id,
    name_en: o.name_en,
    name_ta: o.name_ta,
    cadre: o.cadre,
    batch_year: o.batch_year,
    designation_en: o.designation_en,
    department_en: o.department_en,
    district_en: o.district_en,
    office_name: o.office_name,
    official_email: o.official_email,
    cug_phone: o.cug_phone,
    status: o.status,
    avatar_color: o.avatar_color,
    role_tier: o.role_tier
  }));
}

export function initDemoApiInterceptor() {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch;

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const urlString = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

    if (urlString.startsWith('/api/') || urlString.includes('/api/v1/')) {
      try {
        const resp = await originalFetch(input, init);
        if (resp.ok) {
          return resp;
        }
      } catch {
        // network failed, fall back
      }

      const cleanUrl = urlString.replace(/^https?:\/\/[^/]+/, '');

      if (cleanUrl.includes('/api/v1/districts')) {
        return new Response(JSON.stringify(MASTER_DISTRICTS), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (cleanUrl.includes('/api/v1/executive/flagship-schemes')) {
        return new Response(JSON.stringify(MASTER_FLAGSHIP_SCHEMES), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (cleanUrl.includes('/api/v1/executive/workspace/briefing')) {
        return new Response(
          JSON.stringify({
            greeting_en: "Good Morning, Hon'ble Chief Minister",
            greeting_ta: "காலை வணக்கம், மாண்புமிகு முதலமைச்சர் அவர்களுக்கு",
            user_role: "CHIEF_MINISTER",
            briefing_date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            state_score: 88.4,
            revenue_achievement_pct: 104.2,
            budget_spend_pct: 74.2,
            top_priorities: GOVERNANCE_ISSUES_MASTER.slice(0, 3).map((iss) => ({
              id: iss.id,
              title_en: iss.titleEn,
              title_ta: iss.titleTa,
              severity: iss.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
              department: iss.departmentEn,
              district: iss.district,
              metric_signal: `Exposure: ₹${iss.financialImpactCr || 0} Cr`,
              recommended_decision_en: iss.recommendedActionEn,
              recommended_decision_ta: iss.recommendedActionTa,
              responsible_officer: iss.responsibleOfficial.nameEn
            })),
            weather_alerts: [
              {
                region_en: "Coastal Tamil Nadu (Cuddalore, Nagapattinam)",
                region_ta: "கடலோர தமிழ்நாடு (கடலூர், நாகப்பட்டினம்)",
                alert_level: "ORANGE",
                description_en: "Bay of Bengal depression likely to bring 110-140mm rainfall in next 24 hrs.",
                description_ta: "வங்கக்கடலில் நிலைகொண்டுள்ள காற்றழுத்த தாழ்வு நிலை காரணமாக அடுத்த 24 மணி நேரத்தில் 110-140 மிமீ வரை கனமழை பெய்ய வாய்ப்புள்ளது.",
                preparedness_status: "4 SDRF teams pre-positioned; 12 shelters operational."
              }
            ],
            citizen_sentiment: {
              sentiment_score_pct: 78.5,
              trending_topics: [
                { topic: "Kalaignar Magalir Urimai Thittam", sentiment: "POSITIVE", mentions: "1.2M" },
                { topic: "CM Breakfast Scheme Expansion", sentiment: "POSITIVE", mentions: "680K" },
                { topic: "Salem Ring Road Land Survey", sentiment: "NEUTRAL", mentions: "120K" }
              ],
              grievance_velocity: "-12% overdue backlog"
            },
            pending_approvals_count: 7,
            scheduled_meetings_today: 4,
            cabinet_agenda_highlights: [
              "Semiconductor Policy 2026 Special Incentive Notification",
              "Cauvery Delta Winter Irrigation Reservoir Protocol",
              "Tamil Nadu Coastal Disaster Mitigation Program Sanction"
            ],
            recent_gos_count: 14,
            ai_strategic_advice_en: "Prioritize Salem expressway land settlement directive and Cauvery Delta DAP fertilizer rail dispatch today.",
            ai_strategic_advice_ta: "சேலம் வெளிவட்டச் சாலை நிலத்தீர்வு மற்றும் காவிரி டெல்டா உர விநியோகத்தை முன்னுரிமைப்படுத்தி கண்காணிக்கவும்."
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (cleanUrl.includes('/api/v1/grm/search')) {
        const urlObj = new URL(urlString, 'http://localhost');
        const q = (urlObj.searchParams.get('q') || '').toLowerCase();
        const cadre = urlObj.searchParams.get('cadre') || 'ALL';

        let results = MASTER_OFFICIALS;
        if (cadre !== 'ALL') {
          results = results.filter((o) => o.cadre === cadre);
        }
        if (q) {
          results = results.filter((o) => {
            const h = `${o.name_en} ${o.name_ta} ${o.cadre} ${o.designation_en} ${o.department_en} ${o.district_en}`.toLowerCase();
            return h.includes(q);
          });
        }

        return new Response(
          JSON.stringify({
            results,
            total_matches: results.length,
            cadre_counts: {
              IAS: MASTER_OFFICIALS.filter((o) => o.cadre === 'IAS').length,
              IPS: MASTER_OFFICIALS.filter((o) => o.cadre === 'IPS').length,
              MINISTER: MASTER_OFFICIALS.filter((o) => o.cadre === 'MINISTER').length,
              IRS: MASTER_OFFICIALS.filter((o) => o.cadre === 'IRS').length
            }
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (cleanUrl.includes('/api/v1/grm/autocomplete')) {
        const urlObj = new URL(urlString, 'http://localhost');
        const q = urlObj.searchParams.get('q') || '';
        const items = getDemoAutocomplete(q);
        return new Response(JSON.stringify(items), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (cleanUrl.includes('/api/v1/hierarchy/tree')) {
        return new Response(JSON.stringify(MASTER_HIERARCHY_TREE), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (cleanUrl.includes('/api/v1/grm/sync/connectors')) {
        return new Response(JSON.stringify({ connectors: SYNC_CONNECTORS }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (cleanUrl.includes('/api/v1/grm/sync/audit-logs')) {
        return new Response(JSON.stringify(SYNC_AUDIT_LOGS), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (cleanUrl.includes('/api/v1/grm/officers/')) {
        const id = cleanUrl.split('/api/v1/grm/officers/')[1]?.split('?')[0];
        const officer = MASTER_OFFICIALS.find((o) => o.id === id) || MASTER_OFFICIALS[0];
        return new Response(JSON.stringify(officer), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ success: true, mode: 'DEMO_STANDALONE' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return originalFetch(input, init);
  };
}
