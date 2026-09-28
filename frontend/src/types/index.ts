export type Language = 'en' | 'ta';

export type UserRole = 
  | 'CHIEF_MINISTER'
  | 'DEPUTY_CHIEF_MINISTER'
  | 'CABINET_MINISTER'
  | 'MINISTER'
  | 'CHIEF_SECRETARY'
  | 'ADDITIONAL_CHIEF_SECRETARY'
  | 'PRINCIPAL_SECRETARY'
  | 'DEPARTMENT_SECRETARY'
  | 'SECRETARY'
  | 'COMMISSIONER'
  | 'MISSION_DIRECTOR'
  | 'HOD'
  | 'DISTRICT_COLLECTOR'
  | 'SUPERINTENDENT_OF_POLICE'
  | 'DISTRICT_REVENUE_OFFICER'
  | 'JOINT_COLLECTOR'
  | 'REVENUE_DIVISIONAL_OFFICER'
  | 'TAHSILDAR'
  | 'TALUK_OFFICER'
  | 'BLOCK_DEVELOPMENT_OFFICER'
  | 'MUNICIPAL_COMMISSIONER'
  | 'EXECUTIVE_OFFICER'
  | 'VILLAGE_ADMINISTRATIVE_OFFICER'
  | 'FIELD_OFFICER'
  | 'ANALYST';

export interface MorningBriefingPriority {
  id: string;
  title_en: string;
  title_ta: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  department: string;
  district?: string;
  metric_signal: string;
  recommended_decision_en: string;
  recommended_decision_ta: string;
  responsible_officer: string;
}

export interface WeatherDisasterAlert {
  region_en: string;
  region_ta: string;
  alert_level: 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN';
  description_en: string;
  description_ta: string;
  preparedness_status: string;
}

export interface CitizenSentimentSummary {
  sentiment_score_pct: number;
  trending_topics: Array<{ topic: string; sentiment: string; mentions: string }>;
  grievance_velocity: string;
}

export interface ExecutiveBriefing {
  greeting_en: string;
  greeting_ta: string;
  user_role: string;
  briefing_date: string;
  state_score: number;
  revenue_achievement_pct: number;
  budget_spend_pct: number;
  top_priorities: MorningBriefingPriority[];
  weather_alerts: WeatherDisasterAlert[];
  citizen_sentiment: CitizenSentimentSummary;
  pending_approvals_count: number;
  scheduled_meetings_today: number;
  cabinet_agenda_highlights: string[];
  recent_gos_count: number;
  ai_strategic_advice_en: string;
  ai_strategic_advice_ta: string;
}

export interface ActionItemTriage {
  id: string;
  category: 'APPROVAL' | 'DELAYED_PROJECT' | 'CITIZEN_GRIEVANCE' | 'COLLECTOR_REVIEW' | 'REVENUE_LEAKAGE' | 'COURT_CASE';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  title_en: string;
  title_ta: string;
  department: string;
  financial_impact_cr?: number;
  delay_days?: number;
  bottleneck_en: string;
  bottleneck_ta: string;
  responsible_officer: string;
  deadline: string;
  ai_recommended_action_en: string;
  ai_recommended_action_ta: string;
}

export interface MyActionsToday {
  user_role: string;
  total_actions_pending: number;
  approvals_awaiting_decision_count: number;
  delayed_projects_count: number;
  escalated_grievances_count: number;
  court_cases_deadline_count: number;
  actions: ActionItemTriage[];
}

export interface HierarchyNode {
  id: string;
  name_en: string;
  name_ta: string;
  designation_en: string;
  designation_ta: string;
  tier_level: number;
  tier_role: string;
  department_code?: string;
  department_en?: string;
  department_ta?: string;
  district_code?: string;
  district_name_en?: string;
  cug_phone: string;
  official_email: string;
  office_address: string;
  pending_approvals_count: number;
  kpi_score: number;
  active_projects_count: number;
  active_schemes_count: number;
  subordinates_count: number;
  children: HierarchyNode[];
}

export interface OfficerDossier {
  id: string;
  name_en: string;
  name_ta: string;
  designation_en: string;
  designation_ta: string;
  tier_role: string;
  cadre: string;
  batch_year?: number;
  department_en: string;
  department_ta: string;
  district_en?: string;
  district_ta?: string;
  taluk_en?: string;
  office_address: string;
  cug_phone: string;
  official_email: string;
  reports_to_name?: string;
  reports_to_designation?: string;
  responsibilities: string[];
  current_schemes: string[];
  current_projects: string[];
  current_committees: string[];
  calendar_availability: 'AVAILABLE' | 'IN_MEETING' | 'FIELD_VISIT';
  pending_approvals_count: number;
  performance_kpi_score: number;
  recent_decisions: string[];
}

export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  sender_name_en: string;
  sender_name_ta: string;
  sender_designation: string;
  sender_role: string;
  content_en: string;
  content_ta: string;
  message_type: 'TEXT' | 'FILE' | 'VOICE_NOTE' | 'APPROVAL_REQUEST' | 'TASK_ASSIGNED';
  attachment_url?: string;
  attachment_name?: string;
  is_pinned?: boolean;
  is_priority?: boolean;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  name_en: string;
  name_ta: string;
  room_type: 'CABINET' | 'ALL_COLLECTORS' | 'DEPARTMENT' | 'DISTRICT_DISASTER' | 'DIRECT';
  department_code?: string;
  district_code?: string;
  unread_count: number;
  last_message_snippet: string;
  last_message_time: string;
  members_count: number;
  is_encrypted: boolean;
}

export interface ChatSummary {
  room_id: string;
  room_name: string;
  total_messages_analyzed: number;
  summary_en: string;
  summary_ta: string;
  key_decisions: string[];
  derived_action_items: Array<{ task: string; assignee: string; deadline: string }>;
}

export interface MeetingAttendee {
  officer_id: string;
  name_en: string;
  name_ta: string;
  designation: string;
  tier_role: string;
  status: 'CONFIRMED' | 'INVITED' | 'DECLINED';
}

export interface MeetingActionItem {
  id: string;
  meeting_id: string;
  task_en: string;
  task_ta: string;
  responsible_officer_name: string;
  responsible_officer_designation: string;
  deadline: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
}

export interface MeetingBriefingPack {
  meeting_id: string;
  title_en: string;
  title_ta: string;
  meeting_type: 'CABINET' | 'COLLECTOR_REVIEW' | 'DEPARTMENT_REVIEW' | 'CRISIS_MANAGEMENT';
  scheduled_time: string;
  chairperson_name: string;
  chairperson_designation: string;
  attendees: MeetingAttendee[];
  agenda_items: string[];
  ai_pre_briefing_en: string;
  ai_pre_briefing_ta: string;
  key_risks_flagged: string[];
  historical_decisions: string[];
  suggested_decision_options: Array<{
    option_code: string;
    label_en: string;
    label_ta: string;
    fiscal_impact: string;
    recommended: boolean;
  }>;
  auto_generated_minutes_en?: string;
  auto_generated_minutes_ta?: string;
  action_items: MeetingActionItem[];
}

export interface GovernmentOrderDocument {
  id: string;
  doc_type: 'GO_MS' | 'GO_4D' | 'ACT_STATUTE' | 'CIRCULAR' | 'BUDGET_NOTE' | 'AUDIT_REPORT';
  go_number: string;
  department_code: string;
  department_en: string;
  department_ta: string;
  title_en: string;
  title_ta: string;
  issued_date: string;
  signatory_officer: string;
  abstract_en: string;
  abstract_ta: string;
  financial_sanction_cr?: number;
  relevant_districts: string[];
  applicable_acts_rules: string[];
  pdf_download_url: string;
  relevance_score: number;
}

export interface OmniSearchResponse {
  query: string;
  query_interpreted: string;
  total_results: number;
  documents: GovernmentOrderDocument[];
  related_officers: Array<{ name: string; designation: string }>;
  related_schemes: Array<{ name: string; budget: string }>;
  ai_answer_en?: string;
  ai_answer_ta?: string;
}

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
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
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
