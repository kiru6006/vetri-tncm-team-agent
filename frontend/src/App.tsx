import React, { useState, useEffect } from 'react';
import { ExecutiveHeader } from './components/ExecutiveHeader';
import { StateScoreGauge } from './components/StateScoreGauge';
import { PriorityAlertsTicker } from './components/PriorityAlertsTicker';
import { DistrictHeatmapGrid } from './components/DistrictHeatmapGrid';
import { FlagshipSchemesTracker } from './components/FlagshipSchemesTracker';
import { CopilotDrawer } from './components/CopilotDrawer';
import { useAuthStore } from './stores/authStore';
import {
  StateScorecard,
  PriorityAlert,
  District,
  FlagshipScheme,
  ActionRecommendation,
} from './types';
import {
  Sparkles,
  Layers,
  BarChart3,
  ShieldCheck,
  Zap,
  TrendingUp,
  AlertCircle,
  FileCheck2,
  X,
  IndianRupee,
} from 'lucide-react';

export const App: React.FC = () => {
  const { language, activeRole, user } = useAuthStore();
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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
    // Fetch live districts & schemes from FastAPI backend with fallback
    fetch('/api/v1/districts/')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setDistricts(data);
      })
      .catch(() => {});

    fetch('/api/v1/executive/flagship-schemes')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSchemes(data);
      })
      .catch(() => {});
  }, []);

  // Fallback data if backend is starting
  useEffect(() => {
    if (districts.length === 0) {
      setDistricts([
        { code: 'CHE', nameEn: 'Chennai', nameTa: 'சென்னை', headquartersEn: 'Chennai', headquartersTa: 'சென்னை', zone: 'North', latitude: 13.0827, longitude: 80.2707, population: 7088403, areaSqKm: 426, performanceScore: 92.4, scoreStatus: 'HEALTHY', collectorName: 'Rashmi Siddharth Zagade, IAS', pendingGrievances: 14, revenueAchievementPct: 104.2, healthIndex: 88.5, lawAndOrderIndex: 91.0 },
        { code: 'CBE', nameEn: 'Coimbatore', nameTa: 'கோயம்புத்தூர்', headquartersEn: 'Coimbatore', headquartersTa: 'கோயம்புத்தூர்', zone: 'West', latitude: 11.0168, longitude: 76.9558, population: 3458045, areaSqKm: 4723, performanceScore: 91.8, scoreStatus: 'HEALTHY', collectorName: 'Kranthi Kumar Pati, IAS', pendingGrievances: 18, revenueAchievementPct: 105.1, healthIndex: 90.2, lawAndOrderIndex: 92.4 },
        { code: 'MDU', nameEn: 'Madurai', nameTa: 'மதுரை', headquartersEn: 'Madurai', headquartersTa: 'மதுரை', zone: 'South', latitude: 9.9252, longitude: 78.1198, population: 3038252, areaSqKm: 3741, performanceScore: 86.5, scoreStatus: 'ATTENTION', collectorName: 'M. S. Sangeetha, IAS', pendingGrievances: 22, revenueAchievementPct: 98.4, healthIndex: 78.4, lawAndOrderIndex: 88.0 },
        { code: 'TPR', nameEn: 'Tirupur', nameTa: 'திருப்பூர்', headquartersEn: 'Tirupur', headquartersTa: 'திருப்பூர்', zone: 'West', latitude: 11.1085, longitude: 77.3411, population: 2479052, areaSqKm: 5186, performanceScore: 83.2, scoreStatus: 'CRITICAL', collectorName: 'T. Christuraj, IAS', pendingGrievances: 42, revenueAchievementPct: 93.6, healthIndex: 86.1, lawAndOrderIndex: 89.2 },
        { code: 'SLM', nameEn: 'Salem', nameTa: 'சேலம்', headquartersEn: 'Salem', headquartersTa: 'சேலம்', zone: 'West', latitude: 11.6643, longitude: 78.1460, population: 3482056, areaSqKm: 5245, performanceScore: 87.9, scoreStatus: 'ATTENTION', collectorName: 'R. Brindha Devi, IAS', pendingGrievances: 19, revenueAchievementPct: 101.4, healthIndex: 88.0, lawAndOrderIndex: 90.1 },
        { code: 'TRZ', nameEn: 'Tiruchirappalli', nameTa: 'திருச்சிராப்பள்ளி', headquartersEn: 'Tiruchirappalli', headquartersTa: 'திருச்சிராப்பள்ளி', zone: 'Central', latitude: 10.7905, longitude: 78.7047, population: 2722290, areaSqKm: 4404, performanceScore: 89.1, scoreStatus: 'HEALTHY', collectorName: 'M. Pradeep Kumar, IAS', pendingGrievances: 15, revenueAchievementPct: 102.8, healthIndex: 89.4, lawAndOrderIndex: 91.5 },
      ]);
    }
    if (schemes.length === 0) {
      setSchemes([
        { code: 'SCHEME_KMUT', nameEn: 'Kalaignar Magalir Urimai Thittam', nameTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்', budgetCr: 13722.0, beneficiariesCount: 11548290, saturationPercent: 99.8, status: 'EXCELLENT' },
        { code: 'SCHEME_BREAKFAST', nameEn: "Chief Minister's Breakfast Scheme", nameTa: 'முதலமைச்சரின் காலை உணவுத் திட்டம்', budgetCr: 404.0, beneficiariesCount: 1850000, saturationPercent: 100.0, status: 'EXCELLENT' },
        { code: 'SCHEME_PUDHUMAI_PENN', nameEn: 'Pudhumai Penn Scheme (Higher Ed)', nameTa: 'புதுமைப் பெண் திட்டம்', budgetCr: 370.0, beneficiariesCount: 482100, saturationPercent: 96.4, status: 'GOOD' },
        { code: 'SCHEME_MTM', nameEn: 'Makkalai Thedi Maruthuvam (Healthcare)', nameTa: 'மக்களைத் தேடி மருத்துவம்', budgetCr: 250.0, beneficiariesCount: 10450000, saturationPercent: 104.5, status: 'EXCELLENT' },
      ]);
    }
  }, [districts.length, schemes.length]);

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
      {/* Executive Header Bar */}
      <ExecutiveHeader />

      {/* Floating Action Notification Banner */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl glass-card border border-emerald-500/60 bg-emerald-950/80 text-emerald-200 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
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

      {/* Main Command Center Container */}
      <main className="flex-1 p-6 space-y-6 max-w-[1720px] mx-auto w-full">
        {/* Top Executive Row: State Health Index Gauge + AI Priority Feed */}
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
                <div className="text-slate-400 text-[10px] uppercase font-bold">Performance Score</div>
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

      {/* AI Copilot Full Sliding Drawer */}
      <CopilotDrawer
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        onExecuteDirective={handleExecuteDirective}
      />
    </div>
  );
};
