import React, { useState, useEffect } from 'react';
import { ExecutiveHeader } from './components/ExecutiveHeader';
import { ExecutiveWorkspace } from './components/ExecutiveWorkspace';
import { StateScoreGauge } from './components/StateScoreGauge';
import { PriorityAlertsTicker } from './components/PriorityAlertsTicker';
import { DistrictHeatmapGrid } from './components/DistrictHeatmapGrid';
import { FlagshipSchemesTracker } from './components/FlagshipSchemesTracker';
import { TamilNaduInteractiveMap } from './components/TamilNaduInteractiveMap';
import { RevenueAnalyticsView } from './components/RevenueAnalyticsView';
import { GrievanceSlaAnalytics } from './components/GrievanceSlaAnalytics';
import { ChiefSecretaryCockpit } from './components/ChiefSecretaryCockpit';
import { CollectorCommandView } from './components/CollectorCommandView';
import { HealthDomainView } from './components/HealthDomainView';
import { PoliceDomainView } from './components/PoliceDomainView';
import { WaterAgriDomainView } from './components/WaterAgriDomainView';
import { FraudAuditDomainView } from './components/FraudAuditDomainView';
import { GovernmentHierarchyDirectory } from './components/GovernmentHierarchyDirectory';
import { GovernmentChatPlatform } from './components/GovernmentChatPlatform';
import { ExecutiveMeetingWorkspace } from './components/ExecutiveMeetingWorkspace';
import { CopilotDrawer } from './components/CopilotDrawer';
import { useAuthStore } from './stores/authStore';
import {
  StateScorecard,
  PriorityAlert,
  District,
  FlagshipScheme,
  ActionRecommendation,
  ExecutiveBriefing,
  MyActionsToday,
  ActionItemTriage
} from './types';
import {
  Sparkles,
  LayoutDashboard,
  MapPin,
  IndianRupee,
  MessageSquare,
  Shield,
  Building2,
  FileCheck2,
  X,
  HeartPulse,
  Radio,
  Droplets,
  ShieldAlert,
  Briefcase,
  Layers,
  MessagesSquare,
  Calendar
} from 'lucide-react';

export const App: React.FC = () => {
  const { language, activeRole } = useAuthStore();
  const [activeTab, setActiveTab] = useState<
    'workspace' | 'hierarchy' | 'chat' | 'meetings' | 'dashboard' | 'gis' | 'revenue' | 'grievance' | 'health' | 'police' | 'water_agri' | 'fraud_audit' | 'role_view'
  >('workspace');
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const [briefing, setBriefing] = useState<ExecutiveBriefing | null>(null);
  const [actionsToday, setActionsToday] = useState<MyActionsToday | null>(null);

  useEffect(() => {
    // Fetch real-time executive briefing & actions
    fetch('http://localhost:8000/api/v1/executive/workspace/briefing')
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setBriefing(data))
      .catch(() => {
        // graceful offline mock fallback
        setBriefing({
          greeting_en: "Good Morning, Hon'ble Chief Minister",
          greeting_ta: "காலை வணக்கம், மாண்புமிகு முதலமைச்சர் அவர்களுக்கு",
          user_role: "CHIEF_MINISTER",
          briefing_date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          state_score: 88.4,
          revenue_achievement_pct: 104.2,
          budget_spend_pct: 72.8,
          top_priorities: [
            {
              id: "prio-cm-1",
              title_en: "Cauvery Delta Kuruvai Water Release & Fertilizer Stock",
              title_ta: "காவிரி டெல்டா குறுவை பாசன நீர் திறப்பு மற்றும் உர இருப்பு",
              severity: "CRITICAL",
              department: "Water Resources & Agriculture",
              district: "Thanjavur, Tiruvarur",
              metric_signal: "Mettur Inflow 18,400 cusecs; DAP deficit 12%",
              recommended_decision_en: "Authorize release of 15,000 cusecs and mandate TANFED dispatch of 450 MT DAP.",
              recommended_decision_ta: "15,000 கனஅடி நீர் திறப்பு மற்றும் 450 மெட்ரிக் டன் டிஏபி உரத்தை அனுப்ப உத்தரவிடவும்.",
              responsible_officer: "Principal Secretary, Water Resources"
            }
          ],
          weather_alerts: [
            {
              region_en: "Coastal Tamil Nadu (Cuddalore, Nagapattinam)",
              region_ta: "கடலோர தமிழகம் (கடலூர், நாகப்பட்டினம்)",
              alert_level: "ORANGE",
              description_en: "Heavy to very heavy rainfall expected in next 36 hours.",
              description_ta: "அடுத்த 36 மணி நேரத்தில் பலத்த மழை வாய்ப்பு.",
              preparedness_status: "4 SDRF Battalions on standby."
            }
          ],
          citizen_sentiment: {
            sentiment_score_pct: 81.4,
            trending_topics: [
              { topic: "Kalaignar Magalir Urimai Thittam", sentiment: "94% Positive", mentions: "14.2k" },
              { topic: "CM Breakfast Scheme", sentiment: "98% Positive", mentions: "9.8k" }
            ],
            grievance_velocity: "92.4% on-time resolution rate"
          },
          pending_approvals_count: 7,
          scheduled_meetings_today: 3,
          cabinet_agenda_highlights: ["SIPCOT Semiconductor Park Special Package", "Monsoon Disaster Mitigation Sanctions"],
          recent_gos_count: 14,
          ai_strategic_advice_en: "Focus today's Cabinet agenda on SIPCOT semiconductor allotment and monitor Mettur dam discharge for Kuruvai delta irrigation.",
          ai_strategic_advice_ta: "இன்றைய அமைச்சரவைக் கூட்டத்தில் சிப்காட் குறைக்கடத்தி நில ஒதுக்கீடு மற்றும் டெல்டா பாசனத்திற்கான மேட்டூர் அணை நீர் திறப்பை முதன்மையாகக் கண்காணிக்கவும்."
        });
      });

    fetch('http://localhost:8000/api/v1/executive/actions/today')
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setActionsToday(data))
      .catch(() => {
        setActionsToday({
          user_role: "CHIEF_MINISTER",
          total_actions_pending: 5,
          approvals_awaiting_decision_count: 1,
          delayed_projects_count: 1,
          escalated_grievances_count: 1,
          court_cases_deadline_count: 1,
          actions: [
            {
              id: "act-appr-01",
              category: "APPROVAL",
              priority: "CRITICAL",
              title_en: "Sanction of Phase 2 Chennai Stormwater Drainage Network (Kosasthalaiyar Basin)",
              title_ta: "சென்னையின் இரண்டாம் கட்ட மழைநீர் வடிகால் கட்டமைப்பு அனுமதி (கொசஸ்தலையாறு வடிநிலம்)",
              department: "Municipal Administration & Water Supply",
              financial_impact_cr: 412.50,
              delay_days: 0,
              bottleneck_en: "Awaiting final executive financial concurrence before monsoon commencement.",
              bottleneck_ta: "பருவமழை தொடங்குவதற்கு முன் நிதித்துறையின் இறுதி ஒப்புதலுக்காக காத்திருக்கிறது.",
              responsible_officer: "Principal Secretary, MAWS",
              deadline: "Today, 14:00 hrs",
              ai_recommended_action_en: "Authorize sanction with condition that work in 6 flood-prone wards completes by Oct 15.",
              ai_recommended_action_ta: "அக்டோபர் 15-க்குள் 6 முக்கிய வார்டுகளில் பணிகளை முடிக்க வேண்டும் என்ற நிபந்தனையுடன் ஒப்புதல் வழங்கலாம்."
            },
            {
              id: "act-proj-02",
              category: "DELAYED_PROJECT",
              priority: "HIGH",
              title_en: "Chennai Peripheral Ring Road (Section II - Thatchur to Tiruvallur Bypass)",
              title_ta: "சென்னை புறவட்ட சாலை (பிரிவு II - தச்சூர் முதல் திருவள்ளூர் பைபாஸ் வரை)",
              department: "Highways & Minor Ports",
              financial_impact_cr: 2150.00,
              delay_days: 45,
              bottleneck_en: "Land acquisition clearance in 2 villages in Ponneri Taluk held up due to compensation revision demand.",
              bottleneck_ta: "பொன்னேரி வட்டத்தில் 2 கிராமங்களில் இழப்பீட்டு திருத்தக் கோரிக்கையால் நில எடுப்பு தாமதம்.",
              responsible_officer: "District Collector, Tiruvallur",
              deadline: "Today, 16:30 hrs",
              ai_recommended_action_en: "Direct Collector Tiruvallur to convene Special Lok Adalat bench for immediate compensation settlement.",
              ai_recommended_action_ta: "இழப்பீட்டுத் தொகையை உடனடியாகத் தீர்க்க சிறப்பு லோக் அதாலத் அமர்வை கூட்ட திருவள்ளூர் ஆட்சியருக்கு உத்தரவிடவும்."
            }
          ]
        });
      });
  }, []);

  // Initial State Data
  const [scorecard] = useState<StateScorecard>({
    stateScore: 88.4,
    deltaLastWeek: '+0.8%',
    recordedAt: new Date().toISOString(),
    dimensions: {
      economic_health: {
        score: 91.4,
        status: 'EXCELLENT',
        metricSummaryEn: 'Commercial Tax collection at 104.2% of target.',
        metricSummaryTa: 'வணிக வரி வசூல் இலக்கில் 104.2% எட்டியுள்ளது.',
      },
      public_health: {
        score: 87.2,
        status: 'GOOD',
        metricSummaryEn: '98.5% Primary Health Center doctor attendance.',
        metricSummaryTa: 'ஆரம்ப சுகாதார நிலையங்களில் 98.5% வருகை.',
      },
      law_and_order: {
        score: 89.0,
        status: 'EXCELLENT',
        metricSummaryEn: 'Zero communal incidents; 96% CCTV uptime.',
        metricSummaryTa: 'சட்டம் ஒழுங்கு சீராக உள்ளது.',
      },
      scheme_delivery: {
        score: 97.5,
        status: 'EXCELLENT',
        metricSummaryEn: 'Magalir Urimai Thittam at 99.8% saturation.',
        metricSummaryTa: 'மகளிர் உரிமைத் திட்டம் 99.8% பயனாளிகளை சென்றடைந்தது.',
      },
      water_and_agriculture: {
        score: 84.8,
        status: 'ATTENTION',
        metricSummaryEn: 'Mettur storage at 68.4 ft; Kuruvai harvest active.',
        metricSummaryTa: 'மேட்டூர் அணை நீர் இருப்பு 68.4 அடி.',
      },
    },
  });

  const [alerts] = useState<PriorityAlert[]>([
    {
      id: 'alert-001',
      districtCode: 'TPR',
      districtNameEn: 'Tirupur',
      districtNameTa: 'திருப்பூர்',
      titleEn: 'Industrial Groundwater Stress & Tax Variance',
      titleTa: 'தொழில்துறை நிலத்தடி நீர் தட்டுப்பாடு & வரி குறைவு',
      descriptionEn:
        'Groundwater table dropped by 1.8m in Kangeyam Taluk. Monthly GST compliance fell 6.4% in dyeing clusters.',
      descriptionTa:
        'காங்கேயம் தாலுகாவில் நிலத்தடி நீர்மட்டம் 1.8 மீ குறைந்துள்ளது. சாயப்பட்டறை பகுதிகளில் ஜிஎஸ்டி 6.4% குறைந்துள்ளது.',
      severity: 'CRITICAL',
      domain: 'economy_water',
      actionRecommendedEn:
        'Authorize emergency canal water release from Amaravathi & initiate MSME tariff review.',
      actionRecommendedTa:
        'அமராவதி அணையிலிருந்து அவசர கால்வாய் நீர் திறக்க உத்தரவிடவும்.',
      timestamp: new Date().toISOString(),
    },
    {
      id: 'alert-002',
      districtCode: 'MDU',
      districtNameEn: 'Madurai',
      districtNameTa: 'மதுரை',
      titleEn: 'GRH Madurai Anti-D Globulin Stockout Alert',
      titleTa: 'மதுரை அரசு மருத்துவமனையில் மருந்து பற்றாக்குறை',
      descriptionEn:
        'Government Rajaji Hospital reports essential obstetric emergency drugs below 15% safety stock.',
      descriptionTa:
        'மதுரை அரசு ராஜாஜி மருத்துவமனையில் அத்தியாவசிய மகப்பேறு மருந்துகள் 15% க்கும் கீழ் குறைந்துள்ளது.',
      severity: 'CRITICAL',
      domain: 'health',
      actionRecommendedEn: 'Trigger TNMSC central drug depot immediate priority dispatch.',
      actionRecommendedTa: 'TNMSC மத்திய கிடங்கிலிருந்து உடனடியாக மருந்து விநியோகம் செய்க.',
      timestamp: new Date().toISOString(),
    },
    {
      id: 'alert-003',
      districtCode: 'CUD',
      districtNameEn: 'Cuddalore',
      districtNameTa: 'கடலூர்',
      titleEn: 'Coastal Heavy Rainfall Warning',
      titleTa: 'கடலோர கனமழை முன்னெச்சரிக்கை',
      descriptionEn:
        'IMD models indicate 140mm rainfall in Chidambaram block over next 18 hours.',
      descriptionTa:
        'சிதம்பரம் பகுதிகளில் அடுத்த 18 மணி நேரத்தில் 140 மிமீ கனமழை பெய்ய வாய்ப்புள்ளது.',
      severity: 'WARNING',
      domain: 'disaster',
      actionRecommendedEn: 'Pre-position 4 SDRF rescue boats and inspect cyclone shelters.',
      actionRecommendedTa: '4 மீட்பு படகுகளை தயார் நிலையில் வைக்கவும்.',
      timestamp: new Date().toISOString(),
    },
  ]);

  const [districts, setDistricts] = useState<District[]>([]);
  const [schemes, setSchemes] = useState<FlagshipScheme[]>([]);

  useEffect(() => {
    fetch('/api/v1/districts/')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.length > 0) setDistricts(data);
      })
      .catch(() => {});

    fetch('/api/v1/executive/flagship-schemes')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.length > 0) setSchemes(data);
      })
      .catch(() => {});
  }, []);

  const handleExecuteDirective = (action: ActionRecommendation) => {
    setNotification(
      language === 'ta'
        ? `அரசாணை பிறப்பிக்கப்பட்டது: ${action.descriptionTa} (இலக்கு: ${action.targetDepartment})`
        : `Executive Directive Dispatched: ${action.descriptionEn} (Target: ${action.targetDepartment})`
    );
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-amber-500/30">
      <ExecutiveHeader />

      {/* Primary Executive Navigation Tabs */}
      <nav className="w-full px-6 pt-3 bg-slate-950/70 border-b border-slate-800/80 sticky top-[57px] z-30 backdrop-blur-md">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-2 pb-2.5">
          <div className="flex items-center gap-1.5">
            {/* Core Command Tabs */}
            <button
              onClick={() => setActiveTab('workspace')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'workspace'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'அரசு பணிமனை (Workspace)' : 'AI Workspace'}</span>
            </button>

            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'hierarchy'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'நிர்வாகப் படிநிலை' : 'TN Hierarchy'}</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'chat'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MessagesSquare className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'அரசு உரையாடல் (Chat)' : 'Gov Chat'}</span>
            </button>

            <button
              onClick={() => setActiveTab('meetings')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'meetings'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'அமைச்சரவை கூட்டங்கள்' : 'Meetings Hub'}</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'தலைமைச் செயலகம்' : 'CM Cockpit'}</span>
            </button>

            <button
              onClick={() => setActiveTab('gis')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'gis'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? '38 மாவட்ட GIS' : '38-District GIS'}</span>
            </button>

            <button
              onClick={() => setActiveTab('revenue')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'revenue'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'வரி & வருவாய்' : 'Revenue Intel'}</span>
            </button>

            <button
              onClick={() => setActiveTab('grievance')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'grievance'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'மனுக்கள் (SLA)' : 'Helpline SLA'}</span>
            </button>

            {/* Departmental Intelligence Hub Tabs */}
            <div className="h-4 w-px bg-slate-800 mx-1 shrink-0" />

            <button
              onClick={() => setActiveTab('health')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'health'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-cyan-300" />
              <span>{language === 'ta' ? 'சுகாதாரம் (TNMSC)' : 'Health & Drugs'}</span>
            </button>

            <button
              onClick={() => setActiveTab('police')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'police'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-indigo-300" />
              <span>{language === 'ta' ? 'காவல்துறை (SITREP)' : 'Police SITREP'}</span>
            </button>

            <button
              onClick={() => setActiveTab('water_agri')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'water_agri'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-teal-300" />
              <span>{language === 'ta' ? 'அணைகள் & குறுவை' : 'Water & Crops'}</span>
            </button>

            <button
              onClick={() => setActiveTab('fraud_audit')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'fraud_audit'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
              <span>{language === 'ta' ? 'AI நிதி தணிக்கை' : 'Fraud Watchdog'}</span>
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1 shrink-0" />

            <button
              onClick={() => setActiveTab('role_view')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'role_view'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {activeRole === 'CHIEF_SECRETARY' ? (
                <>
                  <Shield className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{language === 'ta' ? 'தலைமைச் செயலாளர்' : 'CS Cockpit'}</span>
                </>
              ) : activeRole === 'DISTRICT_COLLECTOR' ? (
                <>
                  <Building2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{language === 'ta' ? 'மாவட்ட ஆட்சியர்' : 'Collectorate'}</span>
                </>
              ) : (
                <>
                  <Shield className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'ta' ? 'நிர்வாக மையம்' : 'Ops Command'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Action Notification Banner */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-xl glass-card border border-emerald-500/60 bg-emerald-950/80 text-emerald-200 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <FileCheck2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs font-semibold">{notification}</div>
          <button
            onClick={() => setNotification(null)}
            className="text-emerald-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Dynamic Content Views */}
      <main className="flex-1 p-6 space-y-6 max-w-[1720px] mx-auto w-full">
        {activeTab === 'workspace' && (
          <section className="animate-in fade-in duration-200">
            <ExecutiveWorkspace
              briefing={briefing}
              actionsToday={actionsToday}
              onOpenCopilot={(prompt) => {
                setCopilotOpen(true);
              }}
              onSelectAction={(action) => {
                handleExecuteDirective({
                  actionCode: `ACTION_${action.id}`,
                  descriptionEn: action.ai_recommended_action_en,
                  descriptionTa: action.ai_recommended_action_ta,
                  priority: action.priority,
                  targetDepartment: action.department
                });
              }}
            />
          </section>
        )}

        {activeTab === 'hierarchy' && (
          <section className="animate-in fade-in duration-200">
            <GovernmentHierarchyDirectory
              onSelectOfficer={(officer) => {
                setNotification(`Loaded portfolio for ${officer.name_en}`);
              }}
              onOpenCopilot={(query) => {
                setCopilotOpen(true);
              }}
            />
          </section>
        )}

        {activeTab === 'chat' && (
          <section className="animate-in fade-in duration-200">
            <GovernmentChatPlatform
              onConvertTask={(task) => {
                setNotification(`Converted to Official Government Action: "${task.substring(0, 45)}..."`);
              }}
              onOpenCopilot={(query) => {
                setCopilotOpen(true);
              }}
            />
          </section>
        )}

        {activeTab === 'meetings' && (
          <section className="animate-in fade-in duration-200">
            <ExecutiveMeetingWorkspace
              onOpenCopilot={(prompt) => {
                setCopilotOpen(true);
              }}
              onExecuteAction={(task) => {
                handleExecuteDirective({
                  actionCode: `MEETING_TASK_${task.id}`,
                  descriptionEn: task.task_en,
                  descriptionTa: task.task_ta,
                  priority: 'HIGH',
                  targetDepartment: 'Cabinet Affairs'
                });
              }}
            />
          </section>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Row: State Score Gauge & Priority Alerts */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5">
                <StateScoreGauge scorecard={scorecard} />
              </div>
              <div className="lg:col-span-7">
                <PriorityAlertsTicker
                  alerts={alerts}
                  onTriggerAction={(alert) =>
                    handleExecuteDirective({
                      actionCode: `DIRECTIVE_${alert.districtCode}`,
                      descriptionEn: alert.actionRecommendedEn,
                      descriptionTa: alert.actionRecommendedTa,
                      priority: 'HIGH',
                      targetDepartment: alert.domain,
                    })
                  }
                />
              </div>
            </section>

            {/* Middle Row: 38 Districts Matrix */}
            <section>
              <DistrictHeatmapGrid
                districts={districts}
                onSelectDistrict={(d) => setSelectedDistrict(d)}
              />
            </section>

            {/* Bottom Row: Flagship Welfare Schemes */}
            <section>
              <FlagshipSchemesTracker schemes={schemes} />
            </section>
          </div>
        )}

        {activeTab === 'gis' && (
          <section className="animate-in fade-in duration-200">
            <TamilNaduInteractiveMap
              districts={districts}
              onSelectDistrict={(d) => setSelectedDistrict(d)}
            />
          </section>
        )}

        {activeTab === 'revenue' && (
          <section className="animate-in fade-in duration-200">
            <RevenueAnalyticsView />
          </section>
        )}

        {activeTab === 'grievance' && (
          <section className="animate-in fade-in duration-200">
            <GrievanceSlaAnalytics />
          </section>
        )}

        {activeTab === 'health' && (
          <section className="animate-in fade-in duration-200">
            <HealthDomainView />
          </section>
        )}

        {activeTab === 'police' && (
          <section className="animate-in fade-in duration-200">
            <PoliceDomainView />
          </section>
        )}

        {activeTab === 'water_agri' && (
          <section className="animate-in fade-in duration-200">
            <WaterAgriDomainView />
          </section>
        )}

        {activeTab === 'fraud_audit' && (
          <section className="animate-in fade-in duration-200">
            <FraudAuditDomainView />
          </section>
        )}

        {activeTab === 'role_view' && (
          <section className="animate-in fade-in duration-200">
            {activeRole === 'DISTRICT_COLLECTOR' ? (
              <CollectorCommandView />
            ) : (
              <ChiefSecretaryCockpit />
            )}
          </section>
        )}
      </main>

      {/* District Detail Modal */}
      {selectedDistrict && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-slate-700 max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 font-mono font-bold text-amber-400 text-xs">
                  {selectedDistrict.code}
                </span>
                <h3 className="text-base font-bold text-white">
                  {language === 'ta' ? selectedDistrict.nameTa : selectedDistrict.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Collector</div>
                <div className="text-slate-100 font-semibold mt-1">{selectedDistrict.collectorName}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Health Score</div>
                <div className="text-emerald-400 font-mono font-bold text-base mt-1">
                  {selectedDistrict.performanceScore.toFixed(1)} / 100
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Revenue Target</div>
                <div className="text-slate-100 font-mono font-bold text-sm mt-1">
                  {selectedDistrict.revenueAchievementPct}% Achieved
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Pending Petitions</div>
                <div className="text-rose-400 font-mono font-bold text-sm mt-1">
                  {selectedDistrict.pendingGrievances} Overdue
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedDistrict(null);
                  setCopilotOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {language === 'ta'
                    ? `${selectedDistrict.nameTa} AI ஆய்வு`
                    : `Analyze ${selectedDistrict.nameEn} with Copilot`}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chief Minister AI Copilot FAB Button */}
      <button
        onClick={() => setCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all border border-amber-300"
      >
        <Sparkles className="w-4 h-4 fill-slate-950 animate-bounce" />
        <span>{language === 'ta' ? 'முதல்வர் AI ஆலோசகர்' : 'CM AI Copilot'}</span>
        <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping" />
      </button>

      {/* AI Copilot Drawer */}
      <CopilotDrawer
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        onExecuteDirective={handleExecuteDirective}
      />
    </div>
  );
};
