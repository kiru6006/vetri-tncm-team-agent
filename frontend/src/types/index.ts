export type Language = 'en' | 'ta';

export type UserRole = 
  | 'CHIEF_MINISTER'
  | 'CHIEF_SECRETARY'
  | 'MINISTER'
  | 'DEPARTMENT_SECRETARY'
  | 'DISTRICT_COLLECTOR'
  | 'COMMISSIONER'
  | 'TALUK_OFFICER'
  | 'ANALYST';

export interface User {
  id: string;
  email: string;
  phone: string;
  fullNameEn: string;
  fullNameTa?: string;
  role: UserRole;
  districtCode?: string;
  designation?: string;
}

export interface DimensionScore {
  score: number;
  status: 'EXCELLENT' | 'GOOD' | 'ATTENTION' | 'CRITICAL';
  metricSummaryEn: string;
  metricSummaryTa: string;
}

export interface StateScorecard {
  stateScore: number;
  deltaLastWeek: string;
  recordedAt: string;
  dimensions: {
    economic_health: DimensionScore;
    public_health: DimensionScore;
    law_and_order: DimensionScore;
    scheme_delivery: DimensionScore;
    water_and_agriculture: DimensionScore;
  };
}

export interface PriorityAlert {
  id: string;
  districtCode: string;
  districtNameEn: string;
  districtNameTa: string;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  domain: string;
  actionRecommendedEn: string;
  actionRecommendedTa: string;
  timestamp: string;
}

export interface District {
  code: string;
  nameEn: string;
  nameTa: string;
  headquartersEn: string;
  headquartersTa: string;
  zone: string;
  latitude: number;
  longitude: number;
  population: number;
  areaSqKm: number;
  performanceScore: number;
  scoreStatus: 'HEALTHY' | 'ATTENTION' | 'CRITICAL';
  collectorName: string;
  pendingGrievances: number;
  revenueAchievementPct: number;
  healthIndex: number;
  lawAndOrderIndex: number;
}

export interface FlagshipScheme {
  code: string;
  nameEn: string;
  nameTa: string;
  budgetCr: number;
  beneficiariesCount: number;
  saturationPercent: number;
  status: string;
}

export interface StalledProject {
  id: string;
  name_en: string;
  name_ta: string;
  department_en: string;
  department_ta: string;
  district_name_en: string;
  estimated_cost_cr: number;
  delay_days: number;
  bottleneck_reason_en: string;
  bottleneck_reason_ta: string;
  action_required_en: string;
  action_required_ta: string;
}

export interface Citation {
  source: string;
  ref: string;
  date: string;
  excerpt?: string;
}

export interface ActionRecommendation {
  actionCode: string;
  descriptionEn: string;
  descriptionTa: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  targetDepartment: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'agent';
  textEn: string;
  textTa: string;
  thoughtSteps?: string[];
  citations?: Citation[];
  actions?: ActionRecommendation[];
  chartDirective?: any;
  timestamp: string;
}
