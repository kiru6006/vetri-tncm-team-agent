import React, { useState, useEffect } from 'react';
import { ExecutiveHeader } from './components/ExecutiveHeader';
import { ExecutiveSidebar } from './components/ExecutiveSidebar';
import { ExecutiveWorkspace } from './components/ExecutiveWorkspace';
import { ExecutiveActionManagement } from './components/ExecutiveActionManagement';
import { ExplorePlatform } from './components/ExplorePlatform';
import { GovernmentHierarchyDirectory } from './components/GovernmentHierarchyDirectory';
import { GovernmentChatPlatform } from './components/GovernmentChatPlatform';
import { ExecutiveMeetingWorkspace } from './components/ExecutiveMeetingWorkspace';
import { ExecutiveCalendarView } from './components/ExecutiveCalendarView';
import { EnterpriseKnowledgeHub } from './components/EnterpriseKnowledgeHub';
import { DistrictHeatmapGrid } from './components/DistrictHeatmapGrid';
import { TamilNaduInteractiveMap } from './components/TamilNaduInteractiveMap';
import { FlagshipSchemesTracker } from './components/FlagshipSchemesTracker';
import { RevenueAnalyticsView } from './components/RevenueAnalyticsView';
import { GrievanceSlaAnalytics } from './components/GrievanceSlaAnalytics';
import { HealthDomainView } from './components/HealthDomainView';
import { PoliceDomainView } from './components/PoliceDomainView';
import { WaterAgriDomainView } from './components/WaterAgriDomainView';
import { FraudAuditDomainView } from './components/FraudAuditDomainView';
import { ChiefSecretaryCockpit } from './components/ChiefSecretaryCockpit';
import { CollectorCommandView } from './components/CollectorCommandView';
import { CopilotDrawer } from './components/CopilotDrawer';
import { useAuthStore } from './stores/authStore';
import {
  ExecutiveBriefing,
  MyActionsToday,
  ActionRecommendation,
  District,
  FlagshipScheme
} from './types';
import {
  TN_DEPARTMENTS,
  MASTER_DISTRICTS,
  MASTER_FLAGSHIP_SCHEMES
} from './data/governanceData';
import { Sparkles, X, Building2, MapPin, Layers } from 'lucide-react';

export const App: React.FC = () => {
  const {
    language,
    activeRole,
    currentRoute,
    setCurrentRoute,
    sidebarCollapsed
  } = useAuthStore();
  const isTa = language === 'ta';

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState<string | undefined>();
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [districts, setDistricts] = useState<District[]>(MASTER_DISTRICTS);
  const [schemes, setSchemes] = useState<FlagshipScheme[]>(MASTER_FLAGSHIP_SCHEMES);
  const [briefing, setBriefing] = useState<ExecutiveBriefing | null>(null);
  const [actionsToday, setActionsToday] = useState<MyActionsToday | null>(null);

  // Sync hash routing on window location change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '') || 'cm-command';
      if (hash !== currentRoute) {
        setCurrentRoute(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute, setCurrentRoute]);

  // Fetch initial briefing & dynamic data
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

    fetch('/api/v1/executive/workspace/briefing')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setBriefing(data))
      .catch(() => {});
  }, []);

  const handleOpenCopilot = (prompt?: string) => {
    setCopilotQuery(prompt);
    setCopilotOpen(true);
  };

  const handleExecuteDirective = (action: ActionRecommendation) => {
    setCopilotOpen(false);
    setCurrentRoute('action-tracker');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Left Collapsible Navigation Sidebar */}
      <ExecutiveSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onOpenCopilot={handleOpenCopilot}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-18' : 'lg:ml-72'
        }`}
      >
        {/* Minimal Executive Top Header */}
        <ExecutiveHeader
          onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenCopilot={handleOpenCopilot}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-3 sm:p-6 max-w-7xl w-full mx-auto">
          {/* Executive Office Routes */}
          {(currentRoute === 'cm-command' ||
            currentRoute === '' ||
            currentRoute === 'todays-briefing') && (
            <ExecutiveWorkspace
              briefing={briefing}
              actionsToday={actionsToday}
              onOpenCopilot={handleOpenCopilot}
            />
          )}

          {(currentRoute === 'action-tracker' ||
            currentRoute === 'my-decisions' ||
            currentRoute === 'task-assignments') && (
            <ExecutiveActionManagement
              onOpenCopilot={handleOpenCopilot}
              onOpenMessage={() => setCurrentRoute('messages')}
            />
          )}

          {currentRoute === 'explore' && <ExplorePlatform />}

          {/* Government Intelligence & Directory */}
          {(currentRoute === 'directory' ||
            currentRoute === 'ministers-mlas' ||
            currentRoute === 'civil-services' ||
            currentRoute === 'hierarchy' ||
            currentRoute === 'data-sync') && (
            <GovernmentHierarchyDirectory onOpenCopilot={handleOpenCopilot} />
          )}

          {(currentRoute === 'ministries' || currentRoute === 'departments' || currentRoute === 'sub-departments') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-700 p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>State Ministries & Secretariat Departments</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white">Government Departments & Portfolio Allocations</h1>
                <p className="text-xs text-slate-300 mt-1">
                  Secretariat administrative control, budget allocations, expenditure rates, and responsible Secretaries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TN_DEPARTMENTS.map((dept) => (
                  <div key={dept.code} className="glass-card rounded-2xl border border-slate-800 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-amber-400">
                        {dept.code}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        dept.status === 'EXCELLENT' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {dept.status}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{isTa ? dept.nameTa : dept.nameEn}</h3>
                      <div className="text-xs text-slate-400 mt-0.5">Minister: <span className="text-slate-200 font-medium">{dept.ministerEn}</span></div>
                      <div className="text-xs text-slate-400">Secretary: <span className="text-slate-200 font-medium">{dept.secretaryEn}</span></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                      <div>
                        <div className="text-[10px] text-slate-400 font-sans">Budget</div>
                        <div className="text-white font-bold">₹{dept.budgetCr.toLocaleString()} Cr</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-sans">Spend %</div>
                        <div className="text-emerald-400 font-bold">{dept.spendPct}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-sans">Open Issues</div>
                        <div className="text-rose-400 font-bold">{dept.openIssuesCount}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(currentRoute === 'districts' || currentRoute === 'taluks' || currentRoute === 'constituencies') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <DistrictHeatmapGrid districts={districts} onSelectDistrict={(d) => setSelectedDistrict(d)} />
              <TamilNaduInteractiveMap districts={districts} onSelectDistrict={(d) => setSelectedDistrict(d)} />
            </div>
          )}

          {/* Performance & Finance */}
          {currentRoute === 'revenue' && <RevenueAnalyticsView />}

          {(currentRoute === 'expenditure' || currentRoute === 'budget' || currentRoute === 'cost-optimization') && (
            <RevenueAnalyticsView />
          )}

          {(currentRoute === 'revenue-leakage' ||
            currentRoute === 'fraud-audit' ||
            currentRoute === 'procurement' ||
            currentRoute === 'audit-findings') && (
            <FraudAuditDomainView />
          )}

          {/* Delivery Monitoring */}
          {currentRoute === 'schemes' && <FlagshipSchemesTracker schemes={schemes} />}

          {(currentRoute === 'projects' || currentRoute === 'infrastructure') && (
            <ChiefSecretaryCockpit />
          )}

          {(currentRoute === 'citizen-services' || currentRoute === 'grievances') && (
            <GrievanceSlaAnalytics />
          )}

          {currentRoute === 'public-safety' && <PoliceDomainView />}

          {/* People & Collaboration */}
          {currentRoute === 'messages' && (
            <GovernmentChatPlatform onOpenCopilot={handleOpenCopilot} />
          )}

          {(currentRoute === 'calendar' || currentRoute === 'review-meetings') && (
            <ExecutiveCalendarView />
          )}

          {/* Knowledge Hub */}
          {(currentRoute === 'knowledge' ||
            currentRoute === 'government-orders' ||
            currentRoute === 'policy-library' ||
            currentRoute === 'knowledge-search' ||
            currentRoute === 'data-sources') && (
            <EnterpriseKnowledgeHub onOpenCopilot={handleOpenCopilot} />
          )}

          {/* Role Views */}
          {currentRoute === 'role_view' && (
            <section className="animate-in fade-in duration-200">
              {activeRole === 'DISTRICT_COLLECTOR' ? (
                <CollectorCommandView />
              ) : (
                <ChiefSecretaryCockpit />
              )}
            </section>
          )}
        </main>
      </div>

      {/* District Detail Modal */}
      {selectedDistrict && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="glass-card rounded-2xl border border-slate-700 max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 font-mono font-bold text-amber-400 text-xs">
                  {selectedDistrict.code}
                </span>
                <h3 className="text-base font-bold text-white">
                  {isTa ? selectedDistrict.nameTa : selectedDistrict.nameEn}
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
                  handleOpenCopilot(`Analyze district ${selectedDistrict.nameEn} performance and key bottlenecks`);
                }}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isTa
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
        onClick={() => handleOpenCopilot()}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all border border-amber-300 cursor-pointer"
      >
        <Sparkles className="w-4 h-4 fill-slate-950" />
        <span>{isTa ? 'முதல்வர் AI ஆலோசகர்' : 'CM AI Copilot'}</span>
        <span className="w-2 h-2 rounded-full bg-emerald-950 animate-ping" />
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
