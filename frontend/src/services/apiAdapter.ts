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
import {
  getVerifiedOfficialProfiles,
  getVerifiedAutocomplete,
  getCalendarDirectoryOfficers,
  QUARANTINED_UNVERIFIED_RECORDS
} from '../data/verifiedGovernmentDirectory';

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

export const MASTER_OFFICIALS: OfficialGRMProfile[] = getVerifiedOfficialProfiles();

export const MASTER_HIERARCHY_TREE: HierarchyNode = {
  id: "node-cm-01",
  name_en: "Thiru C. Joseph Vijay",
  name_ta: "திரு சி. ஜோசப் விஜய்",
  designation_en: "Hon'ble Chief Minister of Tamil Nadu",
  designation_ta: "மாண்புமிகு தமிழ்நாடு முதலமைச்சர்",
  tier_level: 1,
  tier_role: "CHIEF_MINISTER",
  cug_phone: "+91 44 2567 2345",
  official_email: "cmcell@tn.gov.in",
  office_address: "CMO, 2nd Floor, Main Building, Fort St. George, Chennai - 600009",
  pending_approvals_count: 7,
  kpi_score: 98.5,
  active_projects_count: 184,
  active_schemes_count: 24,
  subordinates_count: 1350000,
  children: [
    {
      id: "node-cs-01",
      name_en: "Dr. M. Sai Kumar, IAS",
      name_ta: "முனைவர் எம். சாய் குமார், இ.ஆ.ப.",
      designation_en: "Chief Secretary to Government",
      designation_ta: "தலைமைச் செயலாளர்",
      tier_level: 2,
      tier_role: "CHIEF_SECRETARY",
      department_code: "PUBLIC",
      department_en: "Civil Secretariat Administration",
      cug_phone: "+91 44 2567 1555",
      official_email: "cs@tn.gov.in",
      office_address: "Chief Secretariat, Fort St. George, Chennai - 600009",
      pending_approvals_count: 12,
      kpi_score: 96.8,
      active_projects_count: 140,
      active_schemes_count: 35,
      subordinates_count: 850000,
      children: [
        {
          id: "node-ps-hlt",
          name_en: "Dr. J. Radhakrishnan, IAS",
          name_ta: "மருத்துவர் ஜெ. ராதாகிருஷ்ணன், இ.ஆ.ப.",
          designation_en: "Principal Secretary, Health & Family Welfare",
          designation_ta: "முதன்மைச் செயலாளர், மக்கள் நல்வாழ்வுத்துறை",
          tier_level: 3,
          tier_role: "PRINCIPAL_SECRETARY",
          department_code: "HLT",
          department_en: "Health & Family Welfare",
          cug_phone: "+91 44 2567 1875",
          official_email: "hfwsec@tn.gov.in",
          office_address: "Namakkal Kavignar Maaligai, Fort St. George, Chennai - 600009",
          pending_approvals_count: 4,
          kpi_score: 94.2,
          active_projects_count: 24,
          active_schemes_count: 14,
          subordinates_count: 125000,
          children: []
        },
        {
          id: "node-col-slm",
          name_en: "Thiru K. Elambahavath, IAS.,",
          name_ta: "கோ. இளம்பகவத், இ.ஆ.ப.",
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
          office_address: "Collectorate, Salem - 636001",
          pending_approvals_count: 5,
          kpi_score: 93.4,
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
              kpi_score: 91.2,
              active_projects_count: 3,
              active_schemes_count: 2,
              subordinates_count: 2400,
              children: []
            }
          ]
        },
        {
          id: "node-col-cbe",
          name_en: "Thiru Pavankumar G Giriyappanavar, IAS.,",
          name_ta: "பவன்குமார் ஜி கிரியப்பனவர், இ.ஆ.ப.",
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
          office_address: "District Collectorate, State Bank Road, Coimbatore - 641018",
          pending_approvals_count: 4,
          kpi_score: 94.8,
          active_projects_count: 22,
          active_schemes_count: 16,
          subordinates_count: 24000,
          children: []
        },
        {
          id: "node-col-chn",
          name_en: "Tmt S. Malathi Helen, IAS.,",
          name_ta: "எஸ். மாலதி ஹெலன், இ.ஆ.ப.",
          designation_en: "District Collector, Chennai",
          designation_ta: "மாவட்ட ஆட்சியர், சென்னை",
          tier_level: 3,
          tier_role: "DISTRICT_COLLECTOR",
          department_code: "REV",
          department_en: "Chennai District Administration",
          district_code: "CHN",
          district_name_en: "Chennai",
          cug_phone: "+91 44 2522 8025",
          official_email: "collr-chn@nic.in",
          office_address: "Singaravelar Maaligai, 62 Rajaji Salai, Chennai - 600001",
          pending_approvals_count: 6,
          kpi_score: 95.1,
          active_projects_count: 28,
          active_schemes_count: 18,
          subordinates_count: 32000,
          children: []
        },
        {
          id: "node-col-mdu",
          name_en: "Thiru Nishant Krishna, IAS.,",
          name_ta: "நிஷாந்த் கிருஷ்ணா, இ.ஆ.ப.",
          designation_en: "District Collector, Madurai",
          designation_ta: "மாவட்ட ஆட்சியர், மதுரை",
          tier_level: 3,
          tier_role: "DISTRICT_COLLECTOR",
          department_code: "REV",
          department_en: "Madurai District Administration",
          district_code: "MDU",
          district_name_en: "Madurai",
          cug_phone: "+91 452 2531110",
          official_email: "collr-mdu@nic.in",
          office_address: "District Collectorate, Madurai - 625020",
          pending_approvals_count: 3,
          kpi_score: 93.6,
          active_projects_count: 19,
          active_schemes_count: 15,
          subordinates_count: 21000,
          children: []
        }
      ]
    },
    {
      id: "node-min-fin",
      name_en: "Dr N. Marie Wilson",
      name_ta: "முனைவர் என். மேரி வில்சன்",
      designation_en: "Minister for Finance, Planning and Development",
      designation_ta: "நிதி மற்றும் திட்டமிடல் துறை அமைச்சர்",
      tier_level: 2,
      tier_role: "CABINET_MINISTER",
      department_code: "FIN",
      department_en: "Finance Department",
      cug_phone: "+91 44 2567 1122",
      official_email: "finmin@tn.gov.in",
      office_address: "Secretariat, Fort St. George, Chennai - 600009",
      pending_approvals_count: 3,
      kpi_score: 95.0,
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
          office_address: "Chepauk, Chennai - 600005",
          pending_approvals_count: 1,
          kpi_score: 93.5,
          active_projects_count: 6,
          active_schemes_count: 2,
          subordinates_count: 12000,
          children: []
        }
      ]
    },
    {
      id: "node-min-water",
      name_en: "Thiru N. Anand",
      name_ta: "திரு என். ஆனந்த்",
      designation_en: "Minister for Rural Development and Water Resources",
      designation_ta: "ஊரக வளர்ச்சி மற்றும் நீர்வளத்துறை அமைச்சர்",
      tier_level: 2,
      tier_role: "CABINET_MINISTER",
      department_code: "WRD",
      department_en: "Rural Development & Water Resources",
      cug_phone: "+91 44 2567 1100",
      official_email: "rdwrdmin@tn.gov.in",
      office_address: "Secretariat, Fort St. George, Chennai - 600009",
      pending_approvals_count: 4,
      kpi_score: 94.0,
      active_projects_count: 32,
      active_schemes_count: 14,
      subordinates_count: 65000,
      children: []
    },
    {
      id: "node-min-pwd",
      name_en: "Thiru Aadhav Arjuna",
      name_ta: "திரு ஆதவ் அர்ஜுனா",
      designation_en: "Minister for Public Works and Sports Development",
      designation_ta: "பொதுப்பணி மற்றும் விளையாட்டு மேம்பாட்டுத் துறை அமைச்சர்",
      tier_level: 2,
      tier_role: "CABINET_MINISTER",
      department_code: "PWD",
      department_en: "Public Works & Sports Development",
      cug_phone: "+91 44 2567 1133",
      official_email: "pwdmin@tn.gov.in",
      office_address: "Secretariat, Fort St. George, Chennai - 600009",
      pending_approvals_count: 5,
      kpi_score: 93.8,
      active_projects_count: 48,
      active_schemes_count: 11,
      subordinates_count: 52000,
      children: []
    },
    {
      id: "node-min-health",
      name_en: "Dr. K.G. Arunraj",
      name_ta: "மருத்துவர் கே. ஜி. அருண்ராஜ்",
      designation_en: "Minister for Health, Medical Education and Family Welfare",
      designation_ta: "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை அமைச்சர்",
      tier_level: 2,
      tier_role: "CABINET_MINISTER",
      department_code: "HLT",
      department_en: "Health & Family Welfare",
      cug_phone: "+91 44 2567 1875",
      official_email: "healthminister@tn.gov.in",
      office_address: "Secretariat, Fort St. George, Chennai - 600009",
      pending_approvals_count: 4,
      kpi_score: 95.2,
      active_projects_count: 29,
      active_schemes_count: 15,
      subordinates_count: 118000,
      children: []
    },
    {
      id: "node-min-revenue",
      name_en: "Thiru K A. Sengottaiyan",
      name_ta: "திரு கே. ஏ. செங்கோட்டையன்",
      designation_en: "Minister for Revenue and Disaster Management",
      designation_ta: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை அமைச்சர்",
      tier_level: 2,
      tier_role: "CABINET_MINISTER",
      department_code: "REV",
      department_en: "Revenue and Disaster Management",
      cug_phone: "+91 44 2567 1144",
      official_email: "revmin@tn.gov.in",
      office_address: "Secretariat, Fort St. George, Chennai - 600009",
      pending_approvals_count: 6,
      kpi_score: 94.5,
      active_projects_count: 21,
      active_schemes_count: 17,
      subordinates_count: 78000,
      children: []
    },
    {
      id: "node-min-ind",
      name_en: "Selvi S. Keerthana",
      name_ta: "செல்வி எஸ். கீர்த்தனா",
      designation_en: "Minister for Industries",
      designation_ta: "தொழில்துறை அமைச்சர்",
      tier_level: 2,
      tier_role: "CABINET_MINISTER",
      department_code: "IND",
      department_en: "Industries & Investment Promotion",
      cug_phone: "+91 44 2567 1155",
      official_email: "indmin@tn.gov.in",
      office_address: "Secretariat, Fort St. George, Chennai - 600009",
      pending_approvals_count: 2,
      kpi_score: 96.0,
      active_projects_count: 36,
      active_schemes_count: 9,
      subordinates_count: 35000,
      children: []
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

        const quarantined_matches = q ? QUARANTINED_UNVERIFIED_RECORDS.filter(
          (r) => r.raw_name.toLowerCase().includes(q) || r.cadre.toLowerCase().includes(q)
        ) : [];

        return new Response(
          JSON.stringify({
            results,
            total_matches: results.length,
            cadre_counts: {
              IAS: MASTER_OFFICIALS.filter((o) => o.cadre === 'IAS').length,
              IPS: MASTER_OFFICIALS.filter((o) => o.cadre === 'IPS').length,
              MINISTER: MASTER_OFFICIALS.filter((o) => o.cadre === 'MINISTER').length,
              IFS: MASTER_OFFICIALS.filter((o) => o.cadre === 'IFS').length,
              IRS: MASTER_OFFICIALS.filter((o) => o.cadre === 'IRS').length
            },
            quarantined_matches
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (cleanUrl.includes('/api/v1/grm/autocomplete')) {
        const urlObj = new URL(urlString, 'http://localhost');
        const q = urlObj.searchParams.get('q') || '';
        const items = getVerifiedAutocomplete(q);
        return new Response(JSON.stringify(items), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (cleanUrl.includes('/api/v1/calendar/directory/search')) {
        const urlObj = new URL(urlString, 'http://localhost');
        const q = urlObj.searchParams.get('query') || '';
        const dept = urlObj.searchParams.get('department') || '';
        const role = urlObj.searchParams.get('role_tier') || 'ALL';
        const officers = getCalendarDirectoryOfficers(q, dept, role);
        return new Response(
          JSON.stringify({
            total_matches: officers.length,
            officers,
            query_interpreted: q ? `Verified official search: ${q}` : "All verified officials",
            quarantine_audit: QUARANTINED_UNVERIFIED_RECORDS
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
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
