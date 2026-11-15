import { District, FlagshipScheme } from '../types';

export interface DepartmentInfo {
  code: string;
  nameEn: string;
  nameTa: string;
  ministryEn: string;
  ministryTa: string;
  ministerEn: string;
  ministerTa: string;
  secretaryEn: string;
  secretaryTa: string;
  budgetCr: number;
  spendPct: number;
  openIssuesCount: number;
  activeProjectsCount: number;
  schemesCount: number;
  status: 'EXCELLENT' | 'GOOD' | 'WARNING' | 'CRITICAL';
}

export interface GovernanceIssue {
  id: string;
  titleEn: string;
  titleTa: string;
  category: 
    | 'Revenue'
    | 'Expenditure'
    | 'Procurement'
    | 'Schemes'
    | 'Infrastructure'
    | 'Health'
    | 'Education'
    | 'Police & Safety'
    | 'Agriculture'
    | 'Water'
    | 'Electricity'
    | 'Citizen Services'
    | 'Administration'
    | 'Environment'
    | 'Disaster';
  severity: 'CRITICAL' | 'WARNING' | 'ATTENTION' | 'INFO';
  district: string;
  constituency?: string;
  departmentCode: string;
  departmentEn: string;
  departmentTa: string;
  responsibleOfficial: {
    id: string;
    nameEn: string;
    nameTa: string;
    designationEn: string;
    designationTa: string;
    cadre: string;
    email: string;
    phone: string;
  };
  sourceAndEvidence: string;
  evidenceAttachments: Array<{ name: string; url?: string; type: string; date: string }>;
  financialImpactCr?: number;
  citizenImpactCount?: number;
  detectedDate: string;
  currentStatus: 'IDENTIFIED' | 'REVIEWED' | 'DIRECTED' | 'IN_PROGRESS' | 'RESOLVED' | 'VERIFIED' | 'CLOSED';
  recommendedActionEn: string;
  recommendedActionTa: string;
  targetResolutionDate: string;
  escalationLevel: 'CM_OFFICE' | 'CHIEF_SECRETARY' | 'DEPARTMENT_HEAD' | 'DISTRICT_COLLECTOR';
  actionInstructionId?: string;
}

export interface ExecutiveInstruction {
  id: string;
  issueId: string;
  issueTitle: string;
  issuingAuthority: string;
  responsibleOwner: {
    id: string;
    nameEn: string;
    designationEn: string;
    email: string;
    phone: string;
  };
  departmentEn: string;
  instructionTextEn: string;
  instructionTextTa: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  createdDate: string;
  deadline: string;
  acknowledgment: {
    acknowledged: boolean;
    acknowledgedAt?: string;
    acknowledgedBy?: string;
    comments?: string;
  };
  status: 'ISSUED' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLUTION_SUBMITTED' | 'VERIFIED' | 'CLOSED' | 'REOPENED' | 'ESCALATED';
  statusHistory: Array<{
    status: string;
    timestamp: string;
    actor: string;
    notes: string;
  }>;
  evidenceAttachments: Array<{
    name: string;
    type: string;
    timestamp: string;
    verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  }>;
  closureApproval?: {
    approvedBy: string;
    approvedAt: string;
    verificationNotes: string;
  };
  progressPct: number;
}

export interface OfficialDirectoryEntry {
  id: string;
  nameEn: string;
  nameTa: string;
  cadre: 'MINISTER' | 'IAS' | 'IPS' | 'IFS' | 'IRS' | 'TNCS' | 'ENGINEERING' | 'MEDICAL';
  batchYear?: number;
  designationEn: string;
  designationTa: string;
  roleTier: 'CHIEF_MINISTER' | 'CABINET_MINISTER' | 'CHIEF_SECRETARY' | 'PRINCIPAL_SECRETARY' | 'SECRETARY' | 'HOD' | 'DISTRICT_COLLECTOR' | 'POLICE_CHIEF' | 'FIELD_EXECUTIVE';
  departmentCode: string;
  departmentEn: string;
  districtEn: string;
  talukEn?: string;
  officeName: string;
  officeAddress: string;
  officialEmail: string;
  cugPhone: string;
  isVerified: boolean;
  verificationSource: string;
  reportsTo?: {
    id: string;
    nameEn: string;
    designationEn: string;
  };
  typedRelationships: Array<{
    type: 'REPORTS_TO' | 'PORTFOLIO_RESPONSIBILITY' | 'ADMINISTRATIVE_CONTROL' | 'FUNCTIONAL_SUPERVISION' | 'DISTRICT_JURISDICTION' | 'SCHEME_OWNERSHIP' | 'PROJECT_OWNERSHIP' | 'COMMITTEE_MEMBERSHIP' | 'COORDINATION_RESPONSIBILITY';
    targetName: string;
    targetRole: string;
  }>;
  responsibilities: string[];
  activeIssuesCount: number;
}

export interface DashboardCatalogItem {
  id: string;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  category: 'EXECUTIVE OFFICE' | 'GOVERNMENT INTELLIGENCE' | 'PERFORMANCE & FINANCE' | 'DELIVERY MONITORING' | 'PEOPLE & COLLABORATION' | 'INTELLIGENCE & KNOWLEDGE' | 'ADMINISTRATION';
  route: string;
  roles: Array<'Chief Minister' | 'Minister' | 'Principal Secretary' | 'District Collector' | 'Police' | 'Finance' | 'Department Officer' | 'Citizen' | 'All users'>;
  kpis: string[];
  aiCapabilityEn: string;
  aiCapabilityTa: string;
  dataStatus: 'LIVE_CONNECTED' | 'VERIFIED_SNAPSHOT' | 'DEMO_SIMULATED';
  iconName: string;
}

export const TN_DEPARTMENTS: DepartmentInfo[] = [
  {
    code: "FIN",
    nameEn: "Finance Department",
    nameTa: "நிதித் துறை",
    ministryEn: "Finance, Planning and Human Resources Management",
    ministryTa: "நிதி, திட்டம் மற்றும் மனிதவள மேலாண்மை",
    ministerEn: "Dr N. Marie Wilson",
    ministerTa: "மருத்துவர் என். மேரி வில்சன்",
    secretaryEn: "T. Udhayachandran, IAS",
    secretaryTa: "த. உதயசந்திரன், இ.ஆ.ப.",
    budgetCr: 300450.00,
    spendPct: 74.2,
    openIssuesCount: 4,
    activeProjectsCount: 18,
    schemesCount: 12,
    status: "EXCELLENT"
  },
  {
    code: "HIGHWAYS",
    nameEn: "Highways and Minor Ports Department",
    nameTa: "நெடுஞ்சாலைகள் மற்றும் சிறு துறைமுகங்கள் துறை",
    ministryEn: "Public Works and Highways",
    ministryTa: "பொதுப்பணி மற்றும் நெடுஞ்சாலைகள்",
    ministerEn: "Thiru Aadhav Arjuna",
    ministerTa: "திரு ஆதவ் அர்ஜுனா",
    secretaryEn: "Dr. R. Selvaraj, IAS",
    secretaryTa: "மருத்துவர் இரா. செல்வராஜ், இ.ஆ.ப.",
    budgetCr: 20081.00,
    spendPct: 68.4,
    openIssuesCount: 6,
    activeProjectsCount: 42,
    schemesCount: 8,
    status: "WARNING"
  },
  {
    code: "HLT",
    nameEn: "Health and Family Welfare Department",
    nameTa: "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
    ministryEn: "Health and Family Welfare",
    ministryTa: "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலம்",
    ministerEn: "Dr. K.G. Arunraj",
    ministerTa: "மருத்துவர் கே.ஜி. அருண்ராஜ்",
    secretaryEn: "P. Senthilkumar, IAS",
    secretaryTa: "ப. செந்தில்குமார், இ.ஆ.ப.",
    budgetCr: 20198.00,
    spendPct: 76.5,
    openIssuesCount: 3,
    activeProjectsCount: 24,
    schemesCount: 14,
    status: "GOOD"
  },
  {
    code: "WRD",
    nameEn: "Water Resources Department",
    nameTa: "நீர்வளத் துறை",
    ministryEn: "Water Resources",
    ministryTa: "நீர்வள ஆதாரங்கள்",
    ministerEn: "Thiru N. Anand",
    ministerTa: "திரு என். ஆனந்த்",
    secretaryEn: "Dr. K. Manivasan, IAS",
    secretaryTa: "மருத்துவர் க. மணிவாசன், இ.ஆ.ப.",
    budgetCr: 8338.00,
    spendPct: 62.1,
    openIssuesCount: 5,
    activeProjectsCount: 31,
    schemesCount: 9,
    status: "WARNING"
  },
  {
    code: "IND",
    nameEn: "Industries, Investment Promotion and Commerce",
    nameTa: "தொழில், முதலீட்டு ஊக்குவிப்பு மற்றும் வர்த்தகம்",
    ministryEn: "Industries",
    ministryTa: "தொழில்துறை",
    ministerEn: "Selvi S. Keerthana",
    ministerTa: "செல்வி எஸ். கீர்த்தனா",
    secretaryEn: "V. Arun Roy, IAS",
    secretaryTa: "வி. அருண் ராய், இ.ஆ.ப.",
    budgetCr: 3267.00,
    spendPct: 81.3,
    openIssuesCount: 2,
    activeProjectsCount: 56,
    schemesCount: 11,
    status: "EXCELLENT"
  },
  {
    code: "AGR",
    nameEn: "Agriculture and Farmers Welfare Department",
    nameTa: "வேளாண்மை மற்றும் உழவர் நலத்துறை",
    ministryEn: "Agriculture and Farmers Welfare",
    ministryTa: "வேளாண்மை மற்றும் உழவர் நலம்",
    ministerEn: "Thiru R. Vinoth",
    ministerTa: "திரு ஆர். வினோத்",
    secretaryEn: "Apoorva, IAS",
    secretaryTa: "அபூர்வா, இ.ஆ.ப.",
    budgetCr: 42281.00,
    spendPct: 71.9,
    openIssuesCount: 4,
    activeProjectsCount: 19,
    schemesCount: 22,
    status: "GOOD"
  },
  {
    code: "REV",
    nameEn: "Revenue and Disaster Management Department",
    nameTa: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    ministryEn: "Revenue and Disaster Management",
    ministryTa: "வருவாய் மற்றும் பேரிடர் மேலாண்மை",
    ministerEn: "Thiru K A. Sengottaiyan",
    ministerTa: "திரு கே. ஏ. செங்கோட்டையன்",
    secretaryEn: "P. Amudha, IAS",
    secretaryTa: "பி. அமுதா, இ.ஆ.ப.",
    budgetCr: 7820.00,
    spendPct: 69.8,
    openIssuesCount: 7,
    activeProjectsCount: 14,
    schemesCount: 16,
    status: "WARNING"
  },
  {
    code: "POL",
    nameEn: "Home, Prohibition and Excise Department",
    nameTa: "உள்துறை, மதுவிலக்கு மற்றும் ஆயத்தீர்வைத் துறை",
    ministryEn: "Home and Police Administration (Hon'ble CM Portfolio)",
    ministryTa: "உள்துறை மற்றும் காவல் நிர்வாகம் (மாண்புமிகு முதல்வர் பொறுப்பு)",
    ministerEn: "Hon'ble Chief Minister Thiru C. Joseph Vijay",
    ministerTa: "மாண்புமிகு முதலமைச்சர் திரு சி. ஜோசப் விஜய்",
    secretaryEn: "Dheeraj Kumar, IAS",
    secretaryTa: "தீரஜ் குமார், இ.ஆ.ப.",
    budgetCr: 12480.00,
    spendPct: 79.4,
    openIssuesCount: 3,
    activeProjectsCount: 21,
    schemesCount: 6,
    status: "GOOD"
  },
  {
    code: "EDU",
    nameEn: "School Education Department",
    nameTa: "பள்ளிக் கல்வித் துறை",
    ministryEn: "School Education",
    ministryTa: "பள்ளிக் கல்வி",
    ministerEn: "Thiru Rajmohan",
    ministerTa: "திரு ராஜ்மோகன்",
    secretaryEn: "J. Kumaragurubaran, IAS",
    secretaryTa: "ஜே. குமரகுருபரன், இ.ஆ.ப.",
    budgetCr: 44042.00,
    spendPct: 77.1,
    openIssuesCount: 4,
    activeProjectsCount: 38,
    schemesCount: 19,
    status: "GOOD"
  },
  {
    code: "ENV",
    nameEn: "Environment, Climate Change and Forests Department",
    nameTa: "சுற்றுச்சூழல், காலநிலை மாற்றம் மற்றும் வனத்துறை",
    ministryEn: "Forests and Environment",
    ministryTa: "சுற்றுச்சூழல் மற்றும் வனம்",
    ministerEn: "Dr V.K. Rajeev",
    ministerTa: "மருத்துவர் வி.கே. ராஜீவ்",
    secretaryEn: "Supriya Sahu, IAS",
    secretaryTa: "சுப்ரியா சாகு, இ.ஆ.ப.",
    budgetCr: 1245.00,
    spendPct: 73.0,
    openIssuesCount: 3,
    activeProjectsCount: 17,
    schemesCount: 10,
    status: "GOOD"
  }
];

export const GOVERNANCE_ISSUES_MASTER: GovernanceIssue[] = [
  {
    id: "ISSUE-SLM-HWY-01",
    titleEn: "Salem Ring Road 8-Lane Expressway Phase-2 Delay & Land Acquisition Bottleneck",
    titleTa: "சேலம் வெளிவட்டச் சாலை 8-வழி விரைவுச்சாலை கட்டம்-2 தாமதம் மற்றும் நிலம் கையகப்படுத்துதல் சிக்கல்",
    category: "Infrastructure",
    severity: "CRITICAL",
    district: "Salem",
    constituency: "Salem West & Omalur",
    departmentCode: "HIGHWAYS",
    departmentEn: "Highways and Minor Ports Department",
    departmentTa: "நெடுஞ்சாலைகள் மற்றும் சிறு துறைமுகங்கள் துறை",
    responsibleOfficial: {
      id: "grm-col-slm-01",
      nameEn: "Dr. R. Brindha Devi, IAS",
      nameTa: "மருத்துவர் இரா. பிருந்தாதேவி, இ.ஆ.ப.",
      designationEn: "District Collector, Salem",
      designationTa: "மாவட்ட ஆட்சியர், சேலம்",
      cadre: "IAS",
      email: "collr-slm@nic.in",
      phone: "+91 427 2450001"
    },
    sourceAndEvidence: "State Infrastructure Project Monitoring Portal (e-Munnetram) Milestone Alert ID #EM-SLM-8821. Survey block 41/2 pending joint patta sub-division.",
    evidenceAttachments: [
      { name: "Salem_Omalur_Land_Acquisition_Report_Oct2026.pdf", type: "PDF", date: "2026-10-18" },
      { name: "Drone_Survey_Alignment_Omalur_Bypass.mp4", type: "VIDEO", date: "2026-10-22" },
      { name: "Contractor_L1_Notice_Variation_Exposure.pdf", type: "PDF", date: "2026-10-24" }
    ],
    financialImpactCr: 120.00,
    citizenImpactCount: 185000,
    detectedDate: "2026-10-12",
    currentStatus: "DIRECTED",
    recommendedActionEn: "Direct District Collector Salem to convene special land revenue camp with DRO within 7 days, complete patta settlement, and instruct Highways Chief Engineer to mobilize road paving teams.",
    recommendedActionTa: "7 நாட்களுக்குள் சிறப்பு நில வருவாய் முகாமை நடத்தி பட்டா தீர்வை முடிக்க சேலம் மாவட்ட ஆட்சியருக்கும், பணிகளை துரிதப்படுத்த நெடுஞ்சாலை தலைமைப் பொறியாளருக்கும் உத்தரவிடவும்.",
    targetResolutionDate: "2026-11-25",
    escalationLevel: "CM_OFFICE",
    actionInstructionId: "DIR-CM-2026-SLM-001"
  },
  {
    id: "ISSUE-DELTA-AGR-02",
    titleEn: "Cauvery Delta Kuruvai Water Release & Critical DAP Fertilizer Stockout Deficit",
    titleTa: "காவிரி டெல்டா குறுவை பாசன நீர் திறப்பு மற்றும் டிஏபி உர இருப்பு பற்றாக்குறை",
    category: "Agriculture",
    severity: "CRITICAL",
    district: "Thanjavur",
    constituency: "Thiruvaiyaru, Kumbakonam, Mayiladuthurai",
    departmentCode: "AGR",
    departmentEn: "Agriculture and Farmers Welfare Department",
    departmentTa: "வேளாண்மை மற்றும் உழவர் நலத்துறை",
    responsibleOfficial: {
      id: "grm-ps-agr-01",
      nameEn: "Apoorva, IAS",
      nameTa: "அபூர்வா, இ.ஆ.ப.",
      designationEn: "Principal Secretary, Agriculture & Farmers Welfare",
      designationTa: "முதன்மைச் செயலாளர், வேளாண்மை மற்றும் உழவர் நலத்துறை",
      cadre: "IAS",
      email: "agrisec@tn.gov.in",
      phone: "+91 44 2567 1234"
    },
    sourceAndEvidence: "Water Resources Inflow Sensor at Grand Anicut + TANFED inventory telemetry indicating 450 MT DAP buffer shortage in PACCS.",
    evidenceAttachments: [
      { name: "Delta_Fertilizer_Inventory_Audit_Nov2026.pdf", type: "PDF", date: "2026-11-02" },
      { name: "Mettur_GrandAnicut_Discharge_Telemetry.csv", type: "DATA", date: "2026-11-10" }
    ],
    financialImpactCr: 65.50,
    citizenImpactCount: 220000,
    detectedDate: "2026-11-04",
    currentStatus: "IN_PROGRESS",
    recommendedActionEn: "Authorize coordinated water release of 15,000 cusecs from Mettur dam and mandate emergency railway rake dispatch of 450 MT DAP via TANFED.",
    recommendedActionTa: "மேட்டூர் அணையிலிருந்து 15,000 கனஅடி நீர் திறக்கவும் மற்றும் டான்பெட் மூலம் 450 மெட்ரிக் டன் டிஏபி உரத்தை ரயில் மூலம் அவசரமாக அனுப்ப உத்தரவிடவும்.",
    targetResolutionDate: "2026-11-18",
    escalationLevel: "CM_OFFICE",
    actionInstructionId: "DIR-CM-2026-DLT-002"
  },
  {
    id: "ISSUE-MDU-HLT-03",
    titleEn: "Govt Rajaji Hospital Madurai Obstetric Anti-D Globulin & Essential Medicine Stockout",
    titleTa: "மதுரை அரசு ராஜாஜி மருத்துவமனையில் மகப்பேறு அவசர மருந்துகள் மற்றும் மருந்து இருப்பு பற்றாக்குறை",
    category: "Health",
    severity: "CRITICAL",
    district: "Madurai",
    constituency: "Madurai Central",
    departmentCode: "HLT",
    departmentEn: "Health and Family Welfare Department",
    departmentTa: "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
    responsibleOfficial: {
      id: "grm-ps-hlt-01",
      nameEn: "P. Senthilkumar, IAS",
      nameTa: "ப. செந்தில்குமார், இ.ஆ.ப.",
      designationEn: "Principal Secretary, Health and Family Welfare",
      designationTa: "முதன்மைச் செயலாளர், மக்கள் நல்வாழ்வுத் துறை",
      cadre: "IAS",
      email: "hfwsec@tn.gov.in",
      phone: "+91 44 2567 1875"
    },
    sourceAndEvidence: "TNMSC Drug Logistics Telemetry: GRH stock dipped below 12% statutory reserve.",
    evidenceAttachments: [
      { name: "TNMSC_Depot_Logistics_Emergency_Slip.pdf", type: "PDF", date: "2026-11-08" },
      { name: "Madurai_GRH_Patient_Safety_Notice.pdf", type: "PDF", date: "2026-11-09" }
    ],
    financialImpactCr: 14.80,
    citizenImpactCount: 45000,
    detectedDate: "2026-11-07",
    currentStatus: "RESOLVED",
    recommendedActionEn: "Immediate inter-depot transit of 1,200 vials from Tirunelveli warehouse and sanction ₹50 Lakh emergency local purchase contingency.",
    recommendedActionTa: "திருநெல்வேலி கிடங்கிலிருந்து 1,200 மருந்து குப்பிகளை அவசரமாக மாற்றவும் மற்றும் ₹50 லட்சம் அவசர உள்ளூர் கொள்முதல் நிதி ஒதுக்கவும்.",
    targetResolutionDate: "2026-11-12",
    escalationLevel: "DEPARTMENT_HEAD",
    actionInstructionId: "DIR-CM-2026-MDU-003"
  },
  {
    id: "ISSUE-TPR-REV-04",
    titleEn: "Tirupur Apparel Export Cluster Commercial Tax & IGST Input Credit Refund Freeze",
    titleTa: "திருப்பூர் ஆடை ஏற்றுமதி கூட்டமைப்பு வணிக வரி & ஐஜிஎஸ்டி உள்ளீட்டு வரி திருப்பி செலுத்துதல் தாமதம்",
    category: "Revenue",
    severity: "CRITICAL",
    district: "Tirupur",
    constituency: "Tirupur South",
    departmentCode: "FIN",
    departmentEn: "Finance Department (Commercial Taxes Wing)",
    departmentTa: "நிதித் துறை (வணிக வரி பிரிவு)",
    responsibleOfficial: {
      id: "grm-comm-ct-01",
      nameEn: "Dr. Dheeraj Kumar, IAS",
      nameTa: "மருத்துவர் தீரஜ் குமார், இ.ஆ.ப.",
      designationEn: "Commissioner of Commercial Taxes",
      designationTa: "வணிக வரி ஆணையர்",
      cadre: "IAS",
      email: "cct@ctd.tn.gov.in",
      phone: "+91 44 2829 0909"
    },
    sourceAndEvidence: "Commercial Taxes Portal Anomaly Detection: ₹340 Cr verified export refunds unprocessed over 90 days.",
    evidenceAttachments: [
      { name: "Tirupur_Exporters_Association_Representation.pdf", type: "PDF", date: "2026-10-15" },
      { name: "CTD_Audit_Scrutiny_Backlog_Analysis.xlsx", type: "SPREADSHEET", date: "2026-10-28" }
    ],
    financialImpactCr: 340.00,
    citizenImpactCount: 78000,
    detectedDate: "2026-10-14",
    currentStatus: "IN_PROGRESS",
    recommendedActionEn: "Establish a 10-day dedicated fast-track refund clearance cell in Tirupur and disburse verified export tax credits directly to banking escrow.",
    recommendedActionTa: "திருப்பூரில் 10 நாட்கள் சிறப்பு வரி திருப்பி செலுத்தும் முகாமை அமைத்து சரிபார்க்கப்பட்ட தொகையை விடுவிக்க உத்தரவிடவும்.",
    targetResolutionDate: "2026-11-20",
    escalationLevel: "CHIEF_SECRETARY",
    actionInstructionId: "DIR-CM-2026-TPR-004"
  },
  {
    id: "ISSUE-CBE-WTR-05",
    titleEn: "Pollachi & Kinathukadavu Groundwater Depletion & CETP Industrial Effluent Leakage",
    titleTa: "பொள்ளாச்சி & கிணத்துக்கடவு நிலத்தடி நீர் சரிவு மற்றும் சுத்திகரிப்பு கழிவுநீர் கசிவு",
    category: "Water",
    severity: "WARNING",
    district: "Coimbatore",
    constituency: "Pollachi & Kinathukadavu",
    departmentCode: "WRD",
    departmentEn: "Water Resources & Environment",
    departmentTa: "நீர்வள ஆதாரங்கள் & சுற்றுச்சூழல்",
    responsibleOfficial: {
      id: "grm-col-cbe-01",
      nameEn: "Thiru Pavankumar G Giriyappanavar, IAS.,",
      nameTa: "பவன்குமார் ஜி கிரியப்பனவர், இ.ஆ.ப.",
      designationEn: "District Collector, Coimbatore",
      designationTa: "மாவட்ட ஆட்சியர், கோயம்புத்தூர்",
      cadre: "IAS",
      email: "collr-cbe@nic.in",
      phone: "+91 422 2301114"
    },
    sourceAndEvidence: "State Groundwater Board Telemetry Well #CB-81 recorded 2.4m plunge; TNPCB pipeline sensor flagged high TDS discharge.",
    evidenceAttachments: [
      { name: "Pollachi_Groundwater_Sensor_Chart_Oct2026.pdf", type: "PDF", date: "2026-10-25" },
      { name: "TNPCB_Effluent_Sampling_Lab_Report.pdf", type: "PDF", date: "2026-10-29" }
    ],
    financialImpactCr: 18.20,
    citizenImpactCount: 92000,
    detectedDate: "2026-10-22",
    currentStatus: "DIRECTED",
    recommendedActionEn: "Order joint spot inspection by Collector and TNPCB; issue show-cause notice to violating dye units and regulate borewell extraction.",
    recommendedActionTa: "ஆட்சியர் மற்றும் மாசுக்கட்டுப்பாட்டு வாரியம் மூலம் கூட்டு ஆய்வு நடத்தி விதிமீறும் ஆலைகளுக்கு நோட்டீஸ் அனுப்பவும்.",
    targetResolutionDate: "2026-11-28",
    escalationLevel: "DISTRICT_COLLECTOR",
    actionInstructionId: "DIR-CM-2026-CBE-005"
  },
  {
    id: "ISSUE-CUD-DIS-06",
    titleEn: "Cuddalore Coastal Storm Surge & Vulnerable Kollidam River Bund Flood Vulnerability",
    titleTa: "கடலூர் கடலோர புயல் அலை மற்றும் கொள்ளிடம் ஆற்றுக்கரை உடைப்பு அபாயம்",
    category: "Disaster",
    severity: "WARNING",
    district: "Cuddalore",
    constituency: "Chidambaram, Bhuvanagiri",
    departmentCode: "REV",
    departmentEn: "Revenue and Disaster Management Department",
    departmentTa: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    responsibleOfficial: {
      id: "grm-col-cud-01",
      nameEn: "A. Arun Thamburaj, IAS",
      nameTa: "ஆ. அருண் தம்புராஜ், இ.ஆ.ப.",
      designationEn: "District Collector, Cuddalore",
      designationTa: "மாவட்ட ஆட்சியர், கடலூர்",
      cadre: "IAS",
      email: "collr-cud@nic.in",
      phone: "+91 4142 220001"
    },
    sourceAndEvidence: "IMD Doppler Radar Alert & River Gauge Telemetry showing flood discharge at 45,000 cusecs nearing bank lip.",
    evidenceAttachments: [
      { name: "IMD_Bay_Of_Bengal_Depression_Track.png", type: "IMAGE", date: "2026-11-10" },
      { name: "Kollidam_Bund_GeoTag_Vulnerability_Map.pdf", type: "PDF", date: "2026-11-11" }
    ],
    financialImpactCr: 28.00,
    citizenImpactCount: 140000,
    detectedDate: "2026-11-09",
    currentStatus: "IN_PROGRESS",
    recommendedActionEn: "Pre-deploy 4 SDRF inflatable boats, sandbag 1.8km weakened river bunds, and activate 16 cyclone relief multipurpose shelters.",
    recommendedActionTa: "4 SDRF படகுகளை நிலைநிறுத்தவும், 1.8 கிமீ பலவீனமான கரைகளில் மணல் மூட்டைகள் அடுக்கவும், 16 நிவாரண முகாம்களை தயார் செய்யவும்.",
    targetResolutionDate: "2026-11-16",
    escalationLevel: "DISTRICT_COLLECTOR",
    actionInstructionId: "DIR-CM-2026-CUD-006"
  },
  {
    id: "ISSUE-CHE-MET-07",
    titleEn: "Chennai Metro Rail Phase-2 Sterling Road Tunnel Boring Machine Obstruction",
    titleTa: "சென்னை மெட்ரோ ரயில் கட்டம்-2 ஸ்டெர்லிங் சாலை சுரங்கப்பாதை துளையிடும் இயந்திரத் தடை",
    category: "Infrastructure",
    severity: "WARNING",
    district: "Chennai",
    constituency: "Thousand Lights, Chepauk-Thiruvallikeni",
    departmentCode: "HIGHWAYS",
    departmentEn: "Planning & Metro Rail Projects",
    departmentTa: "திட்டமிடல் மற்றும் மெட்ரோ ரயில் திட்டங்கள்",
    responsibleOfficial: {
      id: "grm-md-cmrl-01",
      nameEn: "M. A. Siddique, IAS",
      nameTa: "எம். ஏ. சித்திக், இ.ஆ.ப.",
      designationEn: "Managing Director, Chennai Metro Rail Limited",
      designationTa: "மேலாண்மை இயக்குநர், சென்னை மெட்ரோ ரயில்",
      cadre: "IAS",
      email: "md@cmrl.in",
      phone: "+91 44 2437 8000"
    },
    sourceAndEvidence: "CMRL Structural Health Monitoring: High torque halt on TBM-04 at chainage 14+320 due to unmapped British-era masonry culvert.",
    evidenceAttachments: [
      { name: "CMRL_TBM4_Torque_Displacement_Data.pdf", type: "PDF", date: "2026-10-30" },
      { name: "Sterling_Road_Ground_Penetrating_Radar.png", type: "IMAGE", date: "2026-11-01" }
    ],
    financialImpactCr: 85.00,
    citizenImpactCount: 500000,
    detectedDate: "2026-10-29",
    currentStatus: "IN_PROGRESS",
    recommendedActionEn: "Authorize specialized micro-drilling grouting bypass protocol and establish round-the-clock surface traffic diversion with Greater Chennai Police.",
    recommendedActionTa: "சென்னை மாநகர காவல்துறையுடன் இணைந்து போக்குவரத்து மாற்றுப் பாதையை ஏற்படுத்தி அவசர தரைக்கீழ் சீரமைப்பு பணிகளை மேற்கொள்ள உத்தரவிடவும்.",
    targetResolutionDate: "2026-11-30",
    escalationLevel: "CHIEF_SECRETARY",
    actionInstructionId: "DIR-CM-2026-CHE-007"
  },
  {
    id: "ISSUE-TUT-IND-08",
    titleEn: "Thoothukudi VOC Port Green Hydrogen & Ammonia Mega Park Environmental Clearance Delay",
    titleTa: "தூத்துக்குடி வ.உ.சி துறைமுக பசுமை ஹைட்ரஜன் பூங்கா சுற்றுச்சூழல் அனுமதி தாமதம்",
    category: "Environment",
    severity: "ATTENTION",
    district: "Thoothukudi",
    constituency: "Thoothukudi",
    departmentCode: "IND",
    departmentEn: "Industries, Investment Promotion and Commerce",
    departmentTa: "தொழில் மற்றும் வர்த்தகத் துறை",
    responsibleOfficial: {
      id: "grm-ps-ind-01",
      nameEn: "V. Arun Roy, IAS",
      nameTa: "வி. அருண் ராய், இ.ஆ.ப.",
      designationEn: "Principal Secretary, Industries",
      designationTa: "முதன்மைச் செயலாளர், தொழில்துறை",
      cadre: "IAS",
      email: "indsec@tn.gov.in",
      phone: "+91 44 2567 1383"
    },
    sourceAndEvidence: "SIPCOT Single Window Portal: Pending CRZ notification clearance with state coastal authority exceeding 45 days.",
    evidenceAttachments: [
      { name: "VOC_Port_Hydrogen_EIA_Draft.pdf", type: "PDF", date: "2026-09-18" },
      { name: "TNCZMA_Scrutiny_Checklist_Pending.pdf", type: "PDF", date: "2026-10-12" }
    ],
    financialImpactCr: 2400.00,
    citizenImpactCount: 35000,
    detectedDate: "2026-10-05",
    currentStatus: "IN_PROGRESS",
    recommendedActionEn: "Convene inter-ministerial coordination meeting with Environment Secretary and prioritize state coastal zone committee agenda clearance.",
    recommendedActionTa: "சுற்றுச்சூழல் செயலாளருடன் அமைச்சகங்களுக்கிடையேயான ஆய்வுக் கூட்டத்தை நடத்தி உடனடியாக அனுமதியை வழங்க உத்தரவிடவும்.",
    targetResolutionDate: "2026-11-22",
    escalationLevel: "CM_OFFICE",
    actionInstructionId: "DIR-CM-2026-TUT-008"
  },
  {
    id: "ISSUE-VLR-POL-09",
    titleEn: "Palar River Basin Illegal Sand Quarrying & Severe Water Table Drop Alert",
    titleTa: "பாலாற்றுப் படுகை சட்டவிரோத மணல் கடத்தல் மற்றும் நிலத்தடி நீர் சரிவு எச்சரிக்கை",
    category: "Police & Safety",
    severity: "CRITICAL",
    district: "Vellore",
    constituency: "Katpadi, Anaicut",
    departmentCode: "POL",
    departmentEn: "Home & Police Administration",
    departmentTa: "உள்துறை மற்றும் காவல் நிர்வாகம்",
    responsibleOfficial: {
      id: "grm-sp-vlr-01",
      nameEn: "N. Manivannan, IPS",
      nameTa: "என். மணிவண்ணன், இ.கா.ப.",
      designationEn: "Superintendent of Police, Vellore",
      designationTa: "காவல் கண்காணிப்பாளர், வேலூர்",
      cadre: "IPS",
      email: "sp-vlr@tncops.gov.in",
      phone: "+91 416 2225555"
    },
    sourceAndEvidence: "Night Drone Thermal Reconnaissance & Citizen CM Cell Petitions: 12 tipper trucks impounded at Anaicut checkpost.",
    evidenceAttachments: [
      { name: "Palar_Riverbed_Drone_Surveillance_Footage.mp4", type: "VIDEO", date: "2026-11-05" },
      { name: "FIR_Checkpost_Seizure_Register_Nov2026.pdf", type: "PDF", date: "2026-11-06" }
    ],
    financialImpactCr: 45.00,
    citizenImpactCount: 160000,
    detectedDate: "2026-11-03",
    currentStatus: "DIRECTED",
    recommendedActionEn: "Constitute joint special task force led by DSP & RDO; deploy 24/7 AI-monitored ANPR cameras at 6 river entry bottlenecks.",
    recommendedActionTa: "டிஎஸ்பி மற்றும் ஆர்டிஓ தலைமையில் சிறப்பு அதிரடிப்படை அமைத்து ஏஎன்பிஆர் கேமராக்கள் மூலம் தீவிர கண்காணிப்பு மேற்கொள்ள உத்தரவிடவும்.",
    targetResolutionDate: "2026-11-19",
    escalationLevel: "DEPARTMENT_HEAD",
    actionInstructionId: "DIR-CM-2026-VLR-009"
  },
  {
    id: "ISSUE-KAN-CIT-10",
    titleEn: "Sriperumbudur Industrial Hub Patta Transfer Application Backlog & SLA Breach",
    titleTa: "ஸ்ரீபெரும்புதூர் தொழில் மண்டல பட்டா மாறுதல் விண்ணப்பங்கள் தேக்கம் மற்றும் காலக்கெடு மீறல்",
    category: "Citizen Services",
    severity: "WARNING",
    district: "Kanchipuram",
    constituency: "Sriperumbudur",
    departmentCode: "REV",
    departmentEn: "Revenue and Disaster Management Department",
    departmentTa: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    responsibleOfficial: {
      id: "grm-col-kan-01",
      nameEn: "Kalaiselvi Mohan, IAS",
      nameTa: "கலைச்செல்வி மோகன், இ.ஆ.ப.",
      designationEn: "District Collector, Kanchipuram",
      designationTa: "மாவட்ட ஆட்சியர், காஞ்சிபுரம்",
      cadre: "IAS",
      email: "collr-kan@nic.in",
      phone: "+91 44 2723 7433"
    },
    sourceAndEvidence: "Tamil Nilam Online Portal Telemetry: 3,420 online patta change applications pending over 60 days in Sriperumbudur and Kundrathur taluks.",
    evidenceAttachments: [
      { name: "Tamil_Nilam_Kanchi_Backlog_Dashboard.pdf", type: "PDF", date: "2026-10-27" }
    ],
    financialImpactCr: 12.50,
    citizenImpactCount: 14200,
    detectedDate: "2026-10-20",
    currentStatus: "IN_PROGRESS",
    recommendedActionEn: "Conduct 5-day special settlement camp with digital patta fast-track approval workflow, deploying 12 additional survey teams.",
    recommendedActionTa: "12 கூடுதல் நில அளவை குழுக்களைக் கொண்டு 5 நாள் சிறப்பு முகாமை நடத்தி ஆன்லைன் பட்டா மாறுதலை உடனடியாக முடிக்க உத்தரவிடவும்.",
    targetResolutionDate: "2026-11-24",
    escalationLevel: "DISTRICT_COLLECTOR",
    actionInstructionId: "DIR-CM-2026-KAN-010"
  },
  {
    id: "ISSUE-ERD-ENV-11",
    titleEn: "Perundurai SIPCOT Tannery Effluent Sensors Tampering & Canal Discharge Anomaly",
    titleTa: "பெருந்துறை சிப்காட் தோல் பதனிடும் ஆலைகளில் கழிவுநீர் சென்சார் முறைகேடு",
    category: "Environment",
    severity: "CRITICAL",
    district: "Erode",
    constituency: "Perundurai",
    departmentCode: "ENV",
    departmentEn: "Environment, Climate Change and Forests",
    departmentTa: "சுற்றுச்சூழல், காலநிலை மாற்றம் மற்றும் வனத்துறை",
    responsibleOfficial: {
      id: "grm-col-erd-01",
      nameEn: "Raja Gopal Sunkara, IAS",
      nameTa: "ராஜ கோபால் சுன்கரா, இ.ஆ.ப.",
      designationEn: "District Collector, Erode",
      designationTa: "மாவட்ட ஆட்சியர், ஈரோடு",
      cadre: "IAS",
      email: "collr-erd@nic.in",
      phone: "+91 424 2260201"
    },
    sourceAndEvidence: "Online Continuous Effluent Monitoring System (OCEMS) feed freeze followed by agricultural channel COD spike to 450 mg/L.",
    evidenceAttachments: [
      { name: "TNPCB_Perundurai_Sensor_Tamper_Evidence.pdf", type: "PDF", date: "2026-11-04" },
      { name: "Water_Quality_Testing_COD_BOD_LabSheet.pdf", type: "PDF", date: "2026-11-05" }
    ],
    financialImpactCr: 22.00,
    citizenImpactCount: 68000,
    detectedDate: "2026-11-03",
    currentStatus: "DIRECTED",
    recommendedActionEn: "Immediate disconnection of electricity to 4 errant factory units, initiate legal action under Water Pollution Act, and order CETP overhaul.",
    recommendedActionTa: "விதிமீறிய 4 தொழிற்சாலைகளின் மின் இணைப்பை உடனடியாக துண்டிக்கவும், சட்ட நடவடிக்கை எடுத்து கழிவுநீர் சுத்திகரிப்பு நிலையத்தை சீரமைக்கவும்.",
    targetResolutionDate: "2026-11-17",
    escalationLevel: "CHIEF_SECRETARY",
    actionInstructionId: "DIR-CM-2026-ERD-011"
  },
  {
    id: "ISSUE-KLK-EDU-12",
    titleEn: "Kalrayan Hills Tribal Residential Schools Infrastructure & Teacher Vacancies",
    titleTa: "கல்வராயன் மலை பழங்குடியினர் உண்டு உறைவிடப் பள்ளிகள் கட்டமைப்பு & ஆசிரியர் பற்றாக்குறை",
    category: "Education",
    severity: "WARNING",
    district: "Kallakurichi",
    constituency: "Sankarapuram, Rishivandiyam",
    departmentCode: "EDU",
    departmentEn: "School Education & Tribal Welfare",
    departmentTa: "பள்ளிக் கல்வி & பழங்குடியினர் நலத்துறை",
    responsibleOfficial: {
      id: "grm-col-klk-01",
      nameEn: "M. S. Prasanth, IAS",
      nameTa: "எம். எஸ். பிரசாந்த், இ.ஆ.ப.",
      designationEn: "District Collector, Kallakurichi",
      designationTa: "மாவட்ட ஆட்சியர், கள்ளக்குறிச்சி",
      cadre: "IAS",
      email: "collr-klk@nic.in",
      phone: "+91 4151 222333"
    },
    sourceAndEvidence: "State Tribal Directorate Inspection: 14 primary schools operate with 42% teacher deficit and inadequate solar lighting.",
    evidenceAttachments: [
      { name: "Kalrayan_Hills_Education_Infrastructure_Audit.pdf", type: "PDF", date: "2026-10-19" }
    ],
    financialImpactCr: 8.40,
    citizenImpactCount: 9500,
    detectedDate: "2026-10-15",
    currentStatus: "IN_PROGRESS",
    recommendedActionEn: "Deploy 28 ad-hoc qualified teachers from district surplus pool and sanction ₹2.8 Cr from Collector's Untied Fund for solar micro-grids.",
    recommendedActionTa: "உபரி ஆசிரியர்கள் மூலம் 28 காலியிடங்களை நிரப்பவும், சோலார் மின்வசதிக்கு ₹2.8 கோடி நிதி ஒதுக்கி பணிகளை முடிக்கவும்.",
    targetResolutionDate: "2026-11-26",
    escalationLevel: "DISTRICT_COLLECTOR",
    actionInstructionId: "DIR-CM-2026-KLK-012"
  },
  {
    id: "ISSUE-NIL-SAF-13",
    titleEn: "Kotagiri - Coonoor Ghat Road Landslide Threat & Retaining Wall Tender Irregularities",
    titleTa: "கோத்தகிரி - குன்னூர் மலைப்பாதை நிலச்சரிவு அச்சுறுத்தல் மற்றும் தடுப்புச்சுவர் ஒப்பந்த தாமதம்",
    category: "Police & Safety",
    severity: "WARNING",
    district: "Nilgiris",
    constituency: "Coonoor, Udhagamandalam",
    departmentCode: "HIGHWAYS",
    departmentEn: "Highways & Disaster Preparedness",
    departmentTa: "நெடுஞ்சாலை & பேரிடர் முன்னெச்சரிக்கை",
    responsibleOfficial: {
      id: "grm-col-nil-01",
      nameEn: "M. Aruna, IAS",
      nameTa: "மு. அருணா, இ.ஆ.ப.",
      designationEn: "District Collector, Nilgiris",
      designationTa: "மாவட்ட ஆட்சியர், நீலகிரி",
      cadre: "IAS",
      email: "collr-nil@nic.in",
      phone: "+91 423 2442344"
    },
    sourceAndEvidence: "Geological Survey of India Early Warning Station #NIL-12 flagged soil pore pressure exceeding critical shear threshold.",
    evidenceAttachments: [
      { name: "GSI_Slope_Stability_Vulnerability_Map.pdf", type: "PDF", date: "2026-10-22" }
    ],
    financialImpactCr: 16.50,
    citizenImpactCount: 42000,
    detectedDate: "2026-10-18",
    currentStatus: "IN_PROGRESS",
    recommendedActionEn: "Issue emergency single-source tender for soil nailing retaining walls and ban heavy multi-axle freight vehicles on SH-15 during rains.",
    recommendedActionTa: "அவசர தடுப்புச்சுவர் பணிகளை தொடங்கவும் மற்றும் கனரக வாகனங்கள் இயக்கத்திற்கு தற்காலிக தடை விதிக்கவும்.",
    targetResolutionDate: "2026-11-21",
    escalationLevel: "DISTRICT_COLLECTOR",
    actionInstructionId: "DIR-CM-2026-NIL-013"
  },
  {
    id: "ISSUE-DGL-WTR-14",
    titleEn: "Vaigai Dam Siltation & 45,000 Acre Irrigation Canal Sluice Maintenance Overrun",
    titleTa: "வைகை அணை வண்டல் படிவு மற்றும் 45,000 ஏக்கர் பாசனக் கால்வாய் மதகு பராமரிப்பு தாமதம்",
    category: "Water",
    severity: "ATTENTION",
    district: "Dindigul",
    constituency: "Nilakottai, Andipatti",
    departmentCode: "WRD",
    departmentEn: "Water Resources Department",
    departmentTa: "நீர்வளத் துறை",
    responsibleOfficial: {
      id: "grm-ce-wrd-madurai",
      nameEn: "K. Rathnavel, Chief Engineer",
      nameTa: "கே. ரத்தினவேல், தலைமைப் பொறியாளர்",
      designationEn: "Chief Engineer, WRD Madurai Region",
      designationTa: "தலைமைப் பொறியாளர், நீர்வளத்துறை மதுரை மண்டலம்",
      cadre: "ENGINEERING",
      email: "ce-wrd-mdu@tn.gov.in",
      phone: "+91 452 2530122"
    },
    sourceAndEvidence: "Bathymetric Drone Survey 2026 indicated 28% capacity loss in dam dead storage.",
    evidenceAttachments: [
      { name: "Vaigai_Bathymetry_Survey_Volumetric_Data.pdf", type: "PDF", date: "2026-09-30" }
    ],
    financialImpactCr: 38.00,
    citizenImpactCount: 190000,
    detectedDate: "2026-10-02",
    currentStatus: "IN_PROGRESS",
    recommendedActionEn: "Mobilize 6 amphibious dredgers and complete sluice gate replacement before North-East monsoon peak storage.",
    recommendedActionTa: "6 நவீன தூர்வாரும் இயந்திரங்களை களமிறக்கி வடகிழக்கு பருவமழை தீவிரமடைவதற்குள் பணிகளை முடிக்க உத்தரவிடவும்.",
    targetResolutionDate: "2026-11-27",
    escalationLevel: "DEPARTMENT_HEAD",
    actionInstructionId: "DIR-CM-2026-DGL-014"
  },
  {
    id: "ISSUE-TNV-POW-15",
    titleEn: "Gangaikondan IT Park 110kV Power Substation Right-of-Way Transmission Clearance",
    titleTa: "கங்கைகொண்டான் தகவல் தொழில்நுட்ப பூங்கா 110kV துணை மின்நிலைய வழித்தட அனுமதி தாமதம்",
    category: "Electricity",
    severity: "ATTENTION",
    district: "Tirunelveli",
    constituency: "Tirunelveli Rural",
    departmentCode: "IND",
    departmentEn: "Energy & TANGEDCO / ELCOT",
    departmentTa: "எரிசக்தி மற்றும் எல்காட் நிறுவனம்",
    responsibleOfficial: {
      id: "grm-col-tnv-01",
      nameEn: "K. P. Karthikeyan, IAS",
      nameTa: "கா. பா. கார்த்திகேயன், இ.ஆ.ப.",
      designationEn: "District Collector, Tirunelveli",
      designationTa: "மாவட்ட ஆட்சியர், திருநெல்வேலி",
      cadre: "IAS",
      email: "collr-tnv@nic.in",
      phone: "+91 462 2500828"
    },
    sourceAndEvidence: "ELCOT Tenant Commissioning Report: 3 global GCC companies awaiting energized high-tension line feed.",
    evidenceAttachments: [
      { name: "ELCOT_Gangaikondan_GCC_Onboarding_Schedule.pdf", type: "PDF", date: "2026-10-11" }
    ],
    financialImpactCr: 55.00,
    citizenImpactCount: 12000,
    detectedDate: "2026-10-08",
    currentStatus: "RESOLVED",
    recommendedActionEn: "Direct DRO and TANGEDCO Superintending Engineer to conduct compensation hearing with land owners and finalize overhead stringing.",
    recommendedActionTa: "டிஆர்ஓ மற்றும் மின்வாரிய மேற்பார்வை பொறியாளர் மூலம் இழப்பீட்டு விசாரணையை முடித்து மின்வழித்தட பணிகளை நிறைவு செய்ய உத்தரவிடவும்.",
    targetResolutionDate: "2026-11-15",
    escalationLevel: "DISTRICT_COLLECTOR",
    actionInstructionId: "DIR-CM-2026-TNV-015"
  }
];

export const INITIAL_EXECUTIVE_INSTRUCTIONS: ExecutiveInstruction[] = [
  {
    id: "DIR-CM-2026-SLM-001",
    issueId: "ISSUE-SLM-HWY-01",
    issueTitle: "Salem Ring Road 8-Lane Expressway Phase-2 Delay & Land Acquisition Bottleneck",
    issuingAuthority: "Hon'ble Chief Minister of Tamil Nadu",
    responsibleOwner: {
      id: "grm-col-slm-01",
      nameEn: "Dr. R. Brindha Devi, IAS",
      designationEn: "District Collector, Salem",
      email: "collr-slm@nic.in",
      phone: "+91 427 2450001"
    },
    departmentEn: "Highways and Minor Ports Department",
    instructionTextEn: "Convene special land revenue camp with DRO within 7 days, complete patta settlement in Omalur block, and instruct Highways Chief Engineer to mobilize road paving teams immediately without cost escalation.",
    instructionTextTa: "7 நாட்களுக்குள் சிறப்பு நில வருவாய் முகாமை நடத்தி ஓமலூர் பகுதியில் பட்டா தீர்வை முடிக்கவும், திட்ட மதிப்பீட்டை அதிகரிக்காமல் நெடுஞ்சாலை தலைமைப் பொறியாளருடன் இணைந்து பணிகளை துரிதப்படுத்தவும்.",
    priority: "CRITICAL",
    createdDate: "2026-11-08 10:30 IST",
    deadline: "2026-11-25",
    acknowledgment: {
      acknowledged: true,
      acknowledgedAt: "2026-11-08 12:15 IST",
      acknowledgedBy: "Dr. R. Brindha Devi, IAS (District Collector, Salem)",
      comments: "Directions received. Special camp notified for 41/2 survey block on Nov 15th with DRO and RDO presiding."
    },
    status: "IN_PROGRESS",
    statusHistory: [
      { status: "ISSUED", timestamp: "2026-11-08 10:30 IST", actor: "Chief Minister Office (CMO)", notes: "Executive direction issued directly to District Collector Salem with copy to Chief Secretary." },
      { status: "ACKNOWLEDGED", timestamp: "2026-11-08 12:15 IST", actor: "Dr. R. Brindha Devi, IAS", notes: "Acknowledged via CUG portal. Revenue teams dispatched to Omalur block." },
      { status: "IN_PROGRESS", timestamp: "2026-11-12 16:45 IST", actor: "DRO Salem", notes: "Joint survey of 28 land parcels completed. 22 owners consented for direct compensation award." }
    ],
    evidenceAttachments: [
      { name: "Omalur_Special_Revenue_Camp_Order_G.O.Ms.pdf", type: "PDF", timestamp: "2026-11-10", verificationStatus: "VERIFIED" },
      { name: "Landowners_Consent_Affidavits_Pack.zip", type: "ZIP", timestamp: "2026-11-12", verificationStatus: "PENDING" }
    ],
    progressPct: 65
  },
  {
    id: "DIR-CM-2026-DLT-002",
    issueId: "ISSUE-DELTA-AGR-02",
    issueTitle: "Cauvery Delta Kuruvai Water Release & Critical DAP Fertilizer Stockout Deficit",
    issuingAuthority: "Hon'ble Chief Minister of Tamil Nadu",
    responsibleOwner: {
      id: "grm-ps-agr-01",
      nameEn: "Apoorva, IAS",
      designationEn: "Principal Secretary, Agriculture & Farmers Welfare",
      email: "agrisec@tn.gov.in",
      phone: "+91 44 2567 1234"
    },
    departmentEn: "Agriculture and Farmers Welfare Department",
    instructionTextEn: "Authorize emergency water release of 15,000 cusecs from Mettur dam and mandate emergency railway rake dispatch of 450 MT DAP via TANFED to Thanjavur and Tiruvarur.",
    instructionTextTa: "மேட்டூர் அணையிலிருந்து 15,000 கனஅடி நீர் திறக்கவும் மற்றும் டான்பெட் மூலம் 450 மெட்ரிக் டன் டிஏபி உரத்தை தஞ்சை, திருவாரூருக்கு ரயில் மூலம் அனுப்பவும்.",
    priority: "CRITICAL",
    createdDate: "2026-11-06 09:15 IST",
    deadline: "2026-11-18",
    acknowledgment: {
      acknowledged: true,
      acknowledgedAt: "2026-11-06 10:00 IST",
      acknowledgedBy: "Apoorva, IAS (Principal Secretary)",
      comments: "Water release executed at 10:30 AM. Southern Railway confirmed rake movement from Ranipet depot."
    },
    status: "IN_PROGRESS",
    statusHistory: [
      { status: "ISSUED", timestamp: "2026-11-06 09:15 IST", actor: "CMO", notes: "Directive dispatched following morning telemetry alert." },
      { status: "ACKNOWLEDGED", timestamp: "2026-11-06 10:00 IST", actor: "Apoorva, IAS", notes: "Order communicated to Chief Engineer WRD Trichy & MD TANFED." },
      { status: "IN_PROGRESS", timestamp: "2026-11-10 14:20 IST", actor: "MD TANFED", notes: "310 MT DAP unloaded at Thanjavur junction rake point; distribution active." }
    ],
    evidenceAttachments: [
      { name: "Southern_Railway_Rake_Waybill_DAP_Thanjavur.pdf", type: "PDF", timestamp: "2026-11-09", verificationStatus: "VERIFIED" },
      { name: "GrandAnicut_Sluice_Release_Telemetry_Log.csv", type: "CSV", timestamp: "2026-11-07", verificationStatus: "VERIFIED" }
    ],
    progressPct: 80
  },
  {
    id: "DIR-CM-2026-MDU-003",
    issueId: "ISSUE-MDU-HLT-03",
    issueTitle: "Govt Rajaji Hospital Madurai Obstetric Anti-D Globulin & Essential Medicine Stockout",
    issuingAuthority: "Chief Secretary to Government",
    responsibleOwner: {
      id: "grm-ps-hlt-01",
      nameEn: "P. Senthilkumar, IAS",
      designationEn: "Principal Secretary, Health and Family Welfare",
      email: "hfwsec@tn.gov.in",
      phone: "+91 44 2567 1875"
    },
    departmentEn: "Health and Family Welfare Department",
    instructionTextEn: "Immediate inter-depot transit of 1,200 vials from Tirunelveli warehouse and sanction ₹50 Lakh emergency local purchase contingency.",
    instructionTextTa: "திருநெல்வேலி கிடங்கிலிருந்து 1,200 மருந்து குப்பிகளை அவசரமாக மாற்றவும் மற்றும் ₹50 லட்சம் அவசர நிதி ஒதுக்கவும்.",
    priority: "CRITICAL",
    createdDate: "2026-11-08 14:00 IST",
    deadline: "2026-11-12",
    acknowledgment: {
      acknowledged: true,
      acknowledgedAt: "2026-11-08 14:30 IST",
      acknowledgedBy: "P. Senthilkumar, IAS",
      comments: "TNMSC fleet dispatched at 15:00 hrs with cold-chain monitoring."
    },
    status: "CLOSED",
    statusHistory: [
      { status: "ISSUED", timestamp: "2026-11-08 14:00 IST", actor: "Chief Secretary", notes: "Issued with 48h emergency compliance window." },
      { status: "ACKNOWLEDGED", timestamp: "2026-11-08 14:30 IST", actor: "Health Secretary", notes: "MD TNMSC instructed." },
      { status: "IN_PROGRESS", timestamp: "2026-11-09 08:30 IST", actor: "GRH Dean", notes: "Refrigerated van arrived; stocks entered into e-Aushadhi portal." },
      { status: "RESOLUTION_SUBMITTED", timestamp: "2026-11-10 11:00 IST", actor: "P. Senthilkumar, IAS", notes: "1,200 vials delivered and verified in inventory." },
      { status: "VERIFIED", timestamp: "2026-11-11 15:00 IST", actor: "State Quality Auditor", notes: "Independent physical audit confirmed reserve restored to 45 days." },
      { status: "CLOSED", timestamp: "2026-11-12 09:30 IST", actor: "Chief Secretary", notes: "Resolution accepted; matter closed." }
    ],
    evidenceAttachments: [
      { name: "eAushadhi_Inventory_Restoration_Slip.pdf", type: "PDF", timestamp: "2026-11-10", verificationStatus: "VERIFIED" },
      { name: "Dean_Madurai_GRH_Delivery_Receipt.pdf", type: "PDF", timestamp: "2026-11-10", verificationStatus: "VERIFIED" }
    ],
    closureApproval: {
      approvedBy: "Dr. M. Sai Kumar, IAS (Chief Secretary)",
      approvedAt: "2026-11-12 09:30 IST",
      verificationNotes: "All 1,200 vials verified in electronic stock register. Critical patient safety buffer restored."
    },
    progressPct: 100
  }
];

export const ALL_DASHBOARDS_CATALOG: DashboardCatalogItem[] = [
  {
    id: "cm-command",
    titleEn: "CM Command Center",
    titleTa: "முதல்வர் கட்டளை மையம்",
    descriptionEn: "High-priority executive decision cockpit focusing on critical problems, responsible authorities, financial impacts, and prompt executive directions.",
    descriptionTa: "முக்கிய பிரச்சனைகள், பொறுப்பான அதிகாரிகள் மற்றும் உடனடி முதல்வர் உத்தரவுகளுக்கான தலைமை நிர்வாக தளம்.",
    category: "EXECUTIVE OFFICE",
    route: "#cm-command",
    roles: ["Chief Minister", "Chief Minister", "Principal Secretary", "All users"],
    kpis: ["38 Districts Telemetry", "15 Critical Decision Alerts", "88.4 State Performance Score"],
    aiCapabilityEn: "Executive Briefing Agent & Automated Issue Severity Triaging",
    aiCapabilityTa: "தலைமை சுருக்க முகவர் & தானியங்கி சிக்கல் தீவிரத்தன்மை மதிப்பீடு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "LayoutDashboard"
  },
  {
    id: "todays-briefing",
    titleEn: "Today's Briefing",
    titleTa: "இன்றைய தலைமைச் சுருக்கம்",
    descriptionEn: "First-hour executive intelligence covering cabinet priorities, weather/disaster alerts, citizen sentiment velocity, and revenue signals.",
    descriptionTa: "அமைச்சரவை முன்னுரிமைகள், வானிலை எச்சரிக்கைகள் மற்றும் வருவாய் சமிக்ஞைகளை உள்ளடக்கிய முதல் மணிநேர அறிக்கை.",
    category: "EXECUTIVE OFFICE",
    route: "#todays-briefing",
    roles: ["Chief Minister", "Minister", "Principal Secretary"],
    kpis: ["7 Top Priorities", "3 Weather Warnings", "78% Positive Citizen Sentiment"],
    aiCapabilityEn: "Briefing Synthesis & Anomaly Correlation",
    aiCapabilityTa: "செயற்கை நுண்ணறிவு சுருக்கம் மற்றும் முரண்பாடு தொடர்பு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "Sparkles"
  },
  {
    id: "my-decisions",
    titleEn: "My Decisions & Pending Approvals",
    titleTa: "எனது முடிவுகள் & நிலுவை ஒப்புதல்கள்",
    descriptionEn: "High-level cabinet file approvals, policy orders requiring CM sign-off, and critical inter-department escalations.",
    descriptionTa: "முதல்வர் ஒப்புதல் தேவைப்படும் உயர்நிலைக் கோப்புகள் மற்றும் அமைச்சகங்களுக்கிடையேயான முக்கிய ஒப்புதல்கள்.",
    category: "EXECUTIVE OFFICE",
    route: "#my-decisions",
    roles: ["Chief Minister", "Minister", "Principal Secretary"],
    kpis: ["7 Pending Approvals", "₹1,240 Cr Sanctions", "2 Overdue Files"],
    aiCapabilityEn: "Statutory Rule Compliance Checker & Pre-approval Risk Scoring",
    aiCapabilityTa: "சட்ட விதி இணக்க சரிபார்ப்பு மற்றும் முன்-ஒப்புதல் இடர் மதிப்பீடு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "FileCheck2"
  },
  {
    id: "action-tracker",
    titleEn: "Executive Action Tracker",
    titleTa: "முதல்வர் உத்தரவு கண்காணிப்பு தளம்",
    descriptionEn: "End-to-end lifecycle tracking for official CM directions: issuance, official acknowledgment, milestone progress, evidence audit, and closure.",
    descriptionTa: "முதல்வர் உத்தரவுகளின் முழுமையான வாழ்க்கைச் சுழற்சி கண்காணிப்பு மற்றும் தணிக்கை தளம்.",
    category: "EXECUTIVE OFFICE",
    route: "#action-tracker",
    roles: ["Chief Minister", "Minister", "Principal Secretary", "District Collector", "All users"],
    kpis: ["15 Active Directions", "92% Acknowledged on-time", "6 Resolved this week"],
    aiCapabilityEn: "Action Compliance Verification Agent & Delay Escalation Predictor",
    aiCapabilityTa: "செயல்பாட்டு இணக்க சரிபார்ப்பு முகவர் & தாமத எச்சரிக்கை கணிப்பு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "CheckCircle2"
  },
  {
    id: "copilot",
    titleEn: "AI Executive Copilot",
    titleTa: "முதல்வர் AI ஆலோசகர்",
    descriptionEn: "Natural language multi-agent intelligence assistant for querying state databases, drafting directions, analyzing district performance, and prepping reviews.",
    descriptionTa: "அரசு தரவுத்தளங்களை ஆய்வு செய்வதற்கும், உத்தரவுகளை வரைவதற்கும் உதவும் AI உதவியாளர்.",
    category: "EXECUTIVE OFFICE",
    route: "#copilot",
    roles: ["Chief Minister", "Minister", "Principal Secretary", "District Collector", "All users"],
    kpis: ["12 Specialized Sub-Agents", "4,200 Indexed Schemes & GOs", "<450ms Latency"],
    aiCapabilityEn: "LangGraph Multi-Agent Supervisor with Source-Grounded Citations",
    aiCapabilityTa: "ஆதாரங்களுடன் கூடிய பல முகவர் மேற்பார்வை AI அமைப்பு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "Bot"
  },
  {
    id: "calendar",
    titleEn: "Meetings & Calendar Workspace",
    titleTa: "கூட்டங்கள் & நாள்காட்டி அரங்கம்",
    descriptionEn: "Executive agenda planner with automated AI briefing pack generation, participant tracking, and post-meeting decision minute extraction.",
    descriptionTa: "தானியங்கி கூட்டக் குறிப்புகள் மற்றும் முடிவுகளை உருவாக்கும் நாள்காட்டி தளம்.",
    category: "EXECUTIVE OFFICE",
    route: "#calendar",
    roles: ["Chief Minister", "Minister", "Principal Secretary", "District Collector"],
    kpis: ["4 Scheduled Today", "12 Attendees Average", "100% Briefings Generated"],
    aiCapabilityEn: "Meeting Intelligence Agent & Action Item Extractor",
    aiCapabilityTa: "கூட்ட உளவுத்துறை முகவர் & முடிவு பிரித்தெடுத்தல்",
    dataStatus: "LIVE_CONNECTED",
    iconName: "Calendar"
  },
  {
    id: "ministries",
    titleEn: "Ministries & Portfolios",
    titleTa: "அமைச்சரவை & பொறுப்புகள்",
    descriptionEn: "Complete council of ministers portfolio tracking, budget allocations, departmental performance indices, and legislative commitments.",
    descriptionTa: "அமைச்சரவை இலாகாக்கள், நிதி ஒதுக்கீடுகள் மற்றும் துறைசார்ந்த செயல்பாடு கண்காணிப்பு.",
    category: "GOVERNMENT INTELLIGENCE",
    route: "#ministries",
    roles: ["Chief Minister", "Minister", "Principal Secretary", "All users"],
    kpis: ["35 Ministries", "₹3.48 Lakh Cr Budget", "140 State Cabinet Commitments"],
    aiCapabilityEn: "Portfolio Balance & Policy Alignment Analyzer",
    aiCapabilityTa: "இலாகா சமநிலை மற்றும் கொள்கை இணக்க பகுப்பாய்வு",
    dataStatus: "VERIFIED_SNAPSHOT",
    iconName: "Building2"
  },
  {
    id: "departments",
    titleEn: "Departments & Sub-Departments",
    titleTa: "அரசுத் துறைகள் & துணைத் துறைகள்",
    descriptionEn: "Secretariat administrative hierarchy, heads of departments, statutory boards, and public sector undertakings oversight.",
    descriptionTa: "தலைமைச் செயலக நிர்வாகக் கட்டமைப்பு, துறைத் தலைவர்கள் மற்றும் அரசு நிறுவனங்கள்.",
    category: "GOVERNMENT INTELLIGENCE",
    route: "#departments",
    roles: ["Chief Minister", "Principal Secretary", "Department Officer", "All users"],
    kpis: ["42 Secretariat Departments", "180+ HOD Directorates", "84 State PSUs"],
    aiCapabilityEn: "Departmental Performance Clustering & Bottleneck Profiler",
    aiCapabilityTa: "துறைசார்ந்த செயல்திறன் மற்றும் தாமத ஆய்வு",
    dataStatus: "VERIFIED_SNAPSHOT",
    iconName: "Layers"
  },
  {
    id: "districts",
    titleEn: "Districts Command & Heatmap",
    titleTa: "மாவட்டங்கள் கட்டளை & வெப்ப வரைபடம்",
    descriptionEn: "38 district geographic performance matrix, Collector reviews, regional telemetry, rainfall monitoring, and local grievance saturation.",
    descriptionTa: "38 மாவட்டங்களின் செயல்பாட்டுத் தளம், ஆட்சியர் ஆய்வுகள் மற்றும் உள்ளூர் குறைகள் தீர்வு.",
    category: "GOVERNMENT INTELLIGENCE",
    route: "#districts",
    roles: ["Chief Minister", "District Collector", "Principal Secretary", "All users"],
    kpis: ["38 Districts Monitored", "312 Taluks Covered", "88.4 Mean Health Index"],
    aiCapabilityEn: "District Composite Index AI & Regional Disparity Predictor",
    aiCapabilityTa: "மாவட்ட கூட்டு குறியீட்டு AI & பிராந்திய ஏற்றத்தாழ்வு கணிப்பு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "MapPin"
  },
  {
    id: "hierarchy",
    titleEn: "Government Hierarchy & Org Graph",
    titleTa: "அரசு படிநிலை & அமைப்பு வரைபடம்",
    descriptionEn: "Multi-branch constitutional and administrative graph detailing reporting lines, functional supervision, and cadre jurisdiction.",
    descriptionTa: "அரசியலமைப்பு மற்றும் நிர்வாக கட்டமைப்பு, தலைமை மற்றும் அதிகாரப் படிநிலைகள்.",
    category: "GOVERNMENT INTELLIGENCE",
    route: "#hierarchy",
    roles: ["Chief Minister", "Principal Secretary", "Department Officer", "All users"],
    kpis: ["1,400+ Mapped Nodes", "8 Relationship Types", "Full Cadre Categorization"],
    aiCapabilityEn: "Administrative Graph Traversal & Escalation Pathway Finder",
    aiCapabilityTa: "நிர்வாக வரைபட ஆய்வு மற்றும் பொறுப்பாளர் கண்டறிதல்",
    dataStatus: "VERIFIED_SNAPSHOT",
    iconName: "Share2"
  },
  {
    id: "revenue",
    titleEn: "Revenue Intelligence & SOTR",
    titleTa: "வருவாய் நுண்ணறிவு & மாநில சொந்த வருவாய்",
    descriptionEn: "State Own Tax Revenue (GST, Stamps & Registration, State Excise, Motor Vehicles, Commercial Taxes) vs annual budget estimates.",
    descriptionTa: "வணிக வரி, பதிவுத்துறை, கலால், மோட்டார் வாகன வரி உள்ளிட்ட மாநில சொந்த வரி வருவாய் பகுப்பாய்வு.",
    category: "PERFORMANCE & FINANCE",
    route: "#revenue",
    roles: ["Chief Minister", "Minister", "Finance", "Principal Secretary"],
    kpis: ["₹1,96,000 Cr SOTR", "104.2% Collection Pace", "+11.4% YoY Growth"],
    aiCapabilityEn: "Tax Velocity Forecaster & Revenue Leakage Detection Agent",
    aiCapabilityTa: "வரி வருவாய் முன்கணிப்பு மற்றும் கசிவு கண்டறிதல் முகவர்",
    dataStatus: "LIVE_CONNECTED",
    iconName: "IndianRupee"
  },
  {
    id: "expenditure",
    titleEn: "Expenditure & Budget Utilization",
    titleTa: "செலவினங்கள் & நிதிப் பயன்பாடு",
    descriptionEn: "Capital outlay vs revenue expenditure, department-wise burn rates, unspent treasury balances, and PFMS reconciliation.",
    descriptionTa: "மூலதன மற்றும் வருவாய் செலவுகள், கருவூல நிலுவைகள் மற்றும் துறைசார் நிதிப் பயன்பாடு.",
    category: "PERFORMANCE & FINANCE",
    route: "#expenditure",
    roles: ["Chief Minister", "Minister", "Finance", "Principal Secretary"],
    kpis: ["74.2% Budget Expended", "₹48,200 Cr Capital Outlay", "98.2% PFMS Linked"],
    aiCapabilityEn: "Fiscal Deficit Run-rate Model & Q4 Rush Prevention Alert",
    aiCapabilityTa: "நிதி பற்றாக்குறை மாதிரி மற்றும் கடைசி காலாண்டு செலவு எச்சரிக்கை",
    dataStatus: "LIVE_CONNECTED",
    iconName: "TrendingUp"
  },
  {
    id: "fraud-audit",
    titleEn: "Fraud Audit & Revenue Leakage",
    titleTa: "மோசடி தணிக்கை & வருவாய் கசிவு தடுப்பு",
    descriptionEn: "Automated anomaly flags across procurement tenders, duplicate welfare beneficiaries, billing discrepancies, and GST evasion networks.",
    descriptionTa: "ஒப்பந்த முறைகேடுகள், போலி பயனாளிகள் மற்றும் வரி ஏய்ப்பு நெட்வொர்க்குகளைக் கண்டறியும் தணிக்கைத் தளம்.",
    category: "PERFORMANCE & FINANCE",
    route: "#fraud-audit",
    roles: ["Chief Minister", "Finance", "Principal Secretary"],
    kpis: ["₹412 Cr Potential Leakage Flagged", "18 Active Audit Inquiries", "94% Model Confidence"],
    aiCapabilityEn: "Graph Pattern Anomaly Classifier & Bid-Rigging Detector",
    aiCapabilityTa: "ஒப்பந்த முறைக்கேடு மற்றும் போலி பயனாளி கண்டறிதல் AI",
    dataStatus: "LIVE_CONNECTED",
    iconName: "ShieldAlert"
  },
  {
    id: "procurement",
    titleEn: "Procurement & Tenders Intelligence",
    titleTa: "கொள்முதல் & ஒப்பந்தப் புள்ளிகள் நுண்ணறிவு",
    descriptionEn: "TNTenders e-procurement monitoring, single-bid tender alerts, repeated contractor variations, and execution time overruns.",
    descriptionTa: "மின்-ஒப்பந்த கண்காணிப்பு, ஒற்றை ஒப்பந்தப்புள்ளி எச்சரிக்கைகள் மற்றும் ஒப்பந்தக்காரர் மாறுபாடுகள்.",
    category: "PERFORMANCE & FINANCE",
    route: "#procurement",
    roles: ["Chief Minister", "Finance", "Principal Secretary", "Department Officer"],
    kpis: ["1,840 Active Tenders", "₹42,000 Cr Tender Value", "4.2% Flagged for Scrutiny"],
    aiCapabilityEn: "Tender Collusion Detection & Contractor Dependency Scoring",
    aiCapabilityTa: "ஒப்பந்த கூட்டு சதி கண்டறிதல் மற்றும் சார்பு மதிப்பீடு",
    dataStatus: "VERIFIED_SNAPSHOT",
    iconName: "Briefcase"
  },
  {
    id: "schemes",
    titleEn: "Flagship Schemes Delivery Tracker",
    titleTa: "முக்கியத் திட்டங்கள் கண்காணிப்பு",
    descriptionEn: "Saturation analytics for KMUT, CM Breakfast Scheme, Pudhumai Penn, Tamizh Pudhalvan, Makkalai Thedi Maruthuvam, and Naan Mudhalvan.",
    descriptionTa: "கலைஞர் மகளிர் உரிமைத் திட்டம், காலை உணவுத் திட்டம் உள்ளிட்ட முதன்மைத் திட்டங்களின் நேரடி கண்காணிப்பு.",
    category: "DELIVERY MONITORING",
    route: "#schemes",
    roles: ["Chief Minister", "Minister", "Principal Secretary", "District Collector", "Citizen", "All users"],
    kpis: ["1.16 Cr KMUT Beneficiaries", "18.5 Lakh Breakfast Served Daily", "99.2% Direct Benefit Transfer Success"],
    aiCapabilityEn: "Scheme Saturation Gap Predictor & Last-mile Exclusion Forecaster",
    aiCapabilityTa: "திட்ட நிறைவுத்தன்மை மற்றும் விடுபட்ட பயனாளிகள் கணிப்பு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "Award"
  },
  {
    id: "projects",
    titleEn: "Projects & Infrastructure (e-Munnetram)",
    titleTa: "திட்டங்கள் & உட்கட்டமைப்பு (மின்-முன்னேற்றம்)",
    descriptionEn: "Major state infrastructure projects (>₹50 Cr), land acquisition status, environmental clearances, and contractor milestone tracking.",
    descriptionTa: "₹50 கோடிக்கும் மேற்பட்ட முக்கிய உட்கட்டமைப்பு திட்டங்கள், நிலம் கையகப்படுத்துதல் மற்றும் முன்னேற்ற நிலை.",
    category: "DELIVERY MONITORING",
    route: "#projects",
    roles: ["Chief Minister", "Minister", "Principal Secretary", "District Collector", "All users"],
    kpis: ["184 Mega Projects", "₹1.82 Lakh Cr Combined Capex", "14 Critical Milestones this Month"],
    aiCapabilityEn: "Project Delay Root-Cause Identifier & Contractor Velocity Tracker",
    aiCapabilityTa: "திட்ட தாமத மூலக் காரணம் மற்றும் ஒப்பந்தக்காரர் வேக கண்காணிப்பு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "Hammer"
  },
  {
    id: "citizen-services",
    titleEn: "Citizen Services & Grievances (CM Helpline 1100)",
    titleTa: "மக்கள் சேவைகள் & குறைதீர்ப்பு (முதல்வர் உதவி மையம் 1100)",
    descriptionEn: "Makkaludan Mudhalvar, CM Cell petitions, e-Sevai SLA compliance, recurring grievance clusters, and citizen satisfaction ratings.",
    descriptionTa: "மக்களுடன் முதல்வர், முதல்வர் தனிப்பிரிவு மனுக்கள் மற்றும் இ-சேவை சேவை வழங்கல் தரம்.",
    category: "DELIVERY MONITORING",
    route: "#citizen-services",
    roles: ["Chief Minister", "District Collector", "Principal Secretary", "Citizen", "All users"],
    kpis: ["14,200 Monthly Petitions", "94.6% 30-Day SLA Resolution", "4.6/5 Citizen Feedback"],
    aiCapabilityEn: "Grievance Root-Cause Semantic Clustering & Red-Tape Velocity Predictor",
    aiCapabilityTa: "குறைதீர்ப்பு மூலக் காரணம் மற்றும் தீர்வு வேக கணிப்பு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "HeartHandshake"
  },
  {
    id: "public-safety",
    titleEn: "Police & Public Safety Intelligence",
    titleTa: "காவல்துறை & பொது அமைதி உளவுத்துறை",
    descriptionEn: "Crime rate trends, CCTNS integration, traffic accident hotspots, Coastal Security Group alerts, and law and order preparedness.",
    descriptionTa: "குற்றத் தடுப்பு போக்குகள், விபத்து பகுதிகள், கடலோர பாதுகாப்பு மற்றும் சட்டம் ஒழுங்கு நிலைமை.",
    category: "DELIVERY MONITORING",
    route: "#public-safety",
    roles: ["Chief Minister", "Police", "Principal Secretary"],
    kpis: ["-8.4% Heinous Crime Rate", "14,800 CCTNS Daily Incidents", "34 Rapid Patrol Zones"],
    aiCapabilityEn: "Hotspot Spatial Forecasting & Public Safety Anomaly Detection",
    aiCapabilityTa: "குற்றப் பகுதி கணிப்பு மற்றும் பொது அமைதி எச்சரிக்கை AI",
    dataStatus: "LIVE_CONNECTED",
    iconName: "Shield"
  },
  {
    id: "directory",
    titleEn: "Government Directory & Officers Roster",
    titleTa: "அரசு தொலைபேசி அடைவு & அதிகாரிகள் பட்டியல்",
    descriptionEn: "Searchable directory of ministers, IAS, IPS, IFS, IRS, collectors, SPs, and HODs with verified official emails, CUG numbers, and offices.",
    descriptionTa: "அமைச்சர்கள், இ.ஆ.ப, இ.கா.ப அதிகாரிகள் மற்றும் மாவட்ட ஆட்சியர்களின் சரிபார்க்கப்பட்ட தொடர்பு விவரங்கள்.",
    category: "PEOPLE & COLLABORATION",
    route: "#directory",
    roles: ["Chief Minister", "Minister", "Principal Secretary", "District Collector", "Police", "Department Officer", "All users"],
    kpis: ["850+ Verified Officers", "100% CUG Numbers", "Real-time Cadre Filtering"],
    aiCapabilityEn: "Semantic Contact Autocomplete & Jurisdiction Role Mapper",
    aiCapabilityTa: "தொடர்பு தன்னியக்க நிரப்புதல் மற்றும் அதிகார வரம்பு மேப்பிங்",
    dataStatus: "VERIFIED_SNAPSHOT",
    iconName: "Users"
  },
  {
    id: "messages",
    titleEn: "Executive Secure Messaging",
    titleTa: "தலைமை பாதுகாப்பான செய்தித் தளம்",
    descriptionEn: "Departmental channels, project coordination rooms, and 1-on-1 official encrypted chats linked directly to CM directions and issue cards.",
    descriptionTa: "அரசுத் துறை குழுக்கள் மற்றும் முதல்வர் உத்தரவுகளுடன் இணைக்கப்பட்ட அதிகாரப்பூர்வ தகவல் தொடர்பு தளம்.",
    category: "PEOPLE & COLLABORATION",
    route: "#messages",
    roles: ["Chief Minister", "Minister", "Principal Secretary", "District Collector", "Department Officer"],
    kpis: ["14 Active Command Rooms", "100% Audit Logged", "One-click Task Creation"],
    aiCapabilityEn: "Chat Discussion Summarization & Action Conversion Agent",
    aiCapabilityTa: "செய்தி சுருக்கம் மற்றும் பணி மாற்ற முகவர்",
    dataStatus: "LIVE_CONNECTED",
    iconName: "MessagesSquare"
  },
  {
    id: "knowledge",
    titleEn: "Knowledge Search & Government Orders (G.O.)",
    titleTa: "அரசு ஆணைகள் & கொள்கை நூலகம் (G.O.)",
    descriptionEn: "Universal semantic search across 25,000+ Tamil Nadu Government Orders, policy notes, committee reports, and state statutory rules.",
    descriptionTa: "அரசாணைகள், கொள்கை குறிப்புகள் மற்றும் சட்ட விதிகளுக்கான முழுமையான தேடல் தளம்.",
    category: "INTELLIGENCE & KNOWLEDGE",
    route: "#knowledge",
    roles: ["Chief Minister", "Minister", "Principal Secretary", "Department Officer", "Citizen", "All users"],
    kpis: ["28,400+ Digitized G.O.s", "35 Years Archive", "Bilingual Tamil/English OCR"],
    aiCapabilityEn: "Multilingual Policy Retrieval & Legal Precedent Matcher",
    aiCapabilityTa: "பல்மொழி கொள்கை மீட்டெடுப்பு மற்றும் சட்ட முன்னுதாரண பொருத்தம்",
    dataStatus: "VERIFIED_SNAPSHOT",
    iconName: "BookOpen"
  },
  {
    id: "data-sync",
    titleEn: "Data Synchronization & Connectors",
    titleTa: "தரவு ஒத்திசைவு & இணைப்பிகள்",
    descriptionEn: "ETL integration hub connecting e-Sevai, IFHRMS, e-Munnetram, CCTNS, TNMSC, and CPGRAMS with audit provenance timestamps.",
    descriptionTa: "அரசு இணையதளங்கள் மற்றும் தரவுத்தளங்களின் நிகழ்நேர தரவு ஒத்திசைவு மையம்.",
    category: "ADMINISTRATION",
    route: "#data-sync",
    roles: ["Principal Secretary", "Department Officer"],
    kpis: ["18 Core Connectors", "99.94% Uptime", "Next Sync in 14m"],
    aiCapabilityEn: "Data Pipeline Health Auditor & Schema Drift Detector",
    aiCapabilityTa: "தரவு குழாய் கண்காணிப்பு மற்றும் மாறுபாடு கண்டறிதல்",
    dataStatus: "LIVE_CONNECTED",
    iconName: "RefreshCw"
  },
  {
    id: "audit-logs",
    titleEn: "System Audit Logs & Security",
    titleTa: "கணினி தணிக்கை பதிவுகள் & பாதுகாப்பு",
    descriptionEn: "Immutable audit trail of executive directions issued, persona switches, file access logs, and administrative access controls.",
    descriptionTa: "அரசு உத்தரவுகள் மற்றும் பயனர் அணுகல் குறித்த முழுமையான தணிக்கைப் பதிவுகள்.",
    category: "ADMINISTRATION",
    route: "#audit-logs",
    roles: ["Chief Minister", "Principal Secretary"],
    kpis: ["100% Cryptographic Tamper-evident", "0 Security Breaches", "7-Year Retention"],
    aiCapabilityEn: "Privilege Escalation Monitor & Anomaly Access Flagging",
    aiCapabilityTa: "அனுமதி வரம்பு மீறல் மற்றும் முறைகேடான அணுகல் கண்காணிப்பு",
    dataStatus: "LIVE_CONNECTED",
    iconName: "Lock"
  }
];

export const MASTER_DISTRICTS: District[] = [
  {
    code: "CHE",
    nameEn: "Chennai",
    nameTa: "சென்னை",
    headquartersEn: "Chennai",
    headquartersTa: "சென்னை",
    zone: "North",
    latitude: 13.0827,
    longitude: 80.2707,
    population: 7088403,
    areaSqKm: 426.0,
    performanceScore: 92.4,
    scoreStatus: "HEALTHY",
    collectorName: "Rashmi Siddharth Zagade, IAS",
    pendingGrievances: 142,
    revenueAchievementPct: 106.5,
    healthIndex: 94.2,
    lawAndOrderIndex: 91.0
  },
  {
    code: "CBE",
    nameEn: "Coimbatore",
    nameTa: "கோயம்புத்தூர்",
    headquartersEn: "Coimbatore",
    headquartersTa: "கோயம்புத்தூர்",
    zone: "West",
    latitude: 11.0168,
    longitude: 76.9558,
    population: 3458045,
    areaSqKm: 4723.0,
    performanceScore: 91.8,
    scoreStatus: "HEALTHY",
    collectorName: "Thiru Pavankumar G Giriyappanavar, IAS.,",
    pendingGrievances: 88,
    revenueAchievementPct: 104.2,
    healthIndex: 92.5,
    lawAndOrderIndex: 93.1
  },
  {
    code: "MDU",
    nameEn: "Madurai",
    nameTa: "மதுரை",
    headquartersEn: "Madurai",
    headquartersTa: "மதுரை",
    zone: "South",
    latitude: 9.9252,
    longitude: 78.1198,
    population: 3038252,
    areaSqKm: 3741.0,
    performanceScore: 86.5,
    scoreStatus: "ATTENTION",
    collectorName: "M. S. Sangeetha, IAS",
    pendingGrievances: 210,
    revenueAchievementPct: 98.4,
    healthIndex: 88.0,
    lawAndOrderIndex: 86.4
  },
  {
    code: "TPR",
    nameEn: "Tirupur",
    nameTa: "திருப்பூர்",
    headquartersEn: "Tirupur",
    headquartersTa: "திருப்பூர்",
    zone: "West",
    latitude: 11.1085,
    longitude: 77.3411,
    population: 2479052,
    areaSqKm: 5186.0,
    performanceScore: 83.2,
    scoreStatus: "CRITICAL",
    collectorName: "T. Christuraj, IAS",
    pendingGrievances: 340,
    revenueAchievementPct: 93.6,
    healthIndex: 85.2,
    lawAndOrderIndex: 87.5
  },
  {
    code: "SLM",
    nameEn: "Salem",
    nameTa: "சேலம்",
    headquartersEn: "Salem",
    headquartersTa: "சேலம்",
    zone: "West",
    latitude: 11.6643,
    longitude: 78.1460,
    population: 3482056,
    areaSqKm: 5245.0,
    performanceScore: 87.9,
    scoreStatus: "ATTENTION",
    collectorName: "Dr. R. Brindha Devi, IAS",
    pendingGrievances: 195,
    revenueAchievementPct: 99.1,
    healthIndex: 89.4,
    lawAndOrderIndex: 88.0
  },
  {
    code: "TRZ",
    nameEn: "Tiruchirappalli",
    nameTa: "திருச்சிராப்பள்ளி",
    headquartersEn: "Tiruchirappalli",
    headquartersTa: "திருச்சிராப்பள்ளி",
    zone: "Central",
    latitude: 10.7905,
    longitude: 78.7047,
    population: 2722290,
    areaSqKm: 4404.0,
    performanceScore: 89.1,
    scoreStatus: "HEALTHY",
    collectorName: "M. Pradeep Kumar, IAS",
    pendingGrievances: 112,
    revenueAchievementPct: 102.3,
    healthIndex: 90.8,
    lawAndOrderIndex: 89.2
  },
  {
    code: "TNJ",
    nameEn: "Thanjavur",
    nameTa: "தஞ்சாவூர்",
    headquartersEn: "Thanjavur",
    headquartersTa: "தஞ்சாவூர்",
    zone: "Central",
    latitude: 10.7870,
    longitude: 79.1378,
    population: 2405890,
    areaSqKm: 3411.0,
    performanceScore: 88.0,
    scoreStatus: "ATTENTION",
    collectorName: "B. Priyanka Pankajam, IAS",
    pendingGrievances: 165,
    revenueAchievementPct: 97.5,
    healthIndex: 89.1,
    lawAndOrderIndex: 90.4
  },
  {
    code: "CUD",
    nameEn: "Cuddalore",
    nameTa: "கடலூர்",
    headquartersEn: "Cuddalore",
    headquartersTa: "கடலூர்",
    zone: "North",
    latitude: 11.7480,
    longitude: 79.7714,
    population: 2605914,
    areaSqKm: 3703.0,
    performanceScore: 81.5,
    scoreStatus: "CRITICAL",
    collectorName: "A. Arun Thamburaj, IAS",
    pendingGrievances: 290,
    revenueAchievementPct: 92.4,
    healthIndex: 84.0,
    lawAndOrderIndex: 85.2
  }
];

export const MASTER_FLAGSHIP_SCHEMES: FlagshipScheme[] = [
  {
    code: "SCHEME_KMUT",
    nameEn: "Kalaignar Magalir Urimai Thittam (KMUT)",
    nameTa: "கலைஞர் மகளிர் உரிமைத் திட்டம்",
    budgetCr: 13722.00,
    beneficiariesCount: 11548290,
    saturationPercent: 99.8,
    status: "EXCELLENT"
  },
  {
    code: "SCHEME_BREAKFAST",
    nameEn: "Chief Minister's Breakfast Scheme",
    nameTa: "முதலமைச்சரின் காலை உணவுத் திட்டம்",
    budgetCr: 404.00,
    beneficiariesCount: 1850000,
    saturationPercent: 100.0,
    status: "EXCELLENT"
  },
  {
    code: "SCHEME_PUDHUMAI_PENN",
    nameEn: "Pudhumai Penn Scheme (Higher Ed Assistance)",
    nameTa: "புதுமைப் பெண் திட்டம்",
    budgetCr: 370.00,
    beneficiariesCount: 482100,
    saturationPercent: 96.4,
    status: "GOOD"
  },
  {
    code: "SCHEME_TAMIZH_PUTHALVAN",
    nameEn: "Tamizh Pudhalvan Scheme (Boys Ed Assistance)",
    nameTa: "தமிழ்ப் புதல்வன் திட்டம்",
    budgetCr: 360.00,
    beneficiariesCount: 312500,
    saturationPercent: 95.2,
    status: "GOOD"
  },
  {
    code: "SCHEME_MTM",
    nameEn: "Makkalai Thedi Maruthuvam (Doorstep Healthcare)",
    nameTa: "மக்களைத் தேடி மருத்துவம்",
    budgetCr: 250.00,
    beneficiariesCount: 10450000,
    saturationPercent: 104.5,
    status: "EXCELLENT"
  },
  {
    code: "SCHEME_INN_UYIR_KAAPOM",
    nameEn: "Innuyir Kaappom - Nammai Kaakkum 48",
    nameTa: "இன்னுயிர் காப்போம் - நம்மை காக்கும் 48",
    budgetCr: 160.00,
    beneficiariesCount: 242000,
    saturationPercent: 96.8,
    status: "GOOD"
  }
];

