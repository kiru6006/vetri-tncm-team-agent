import React, { useState, useMemo } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  ExecutiveBriefing,
  MyActionsToday,
  ActionItemTriage
} from '../types';
import {
  GOVERNANCE_ISSUES_MASTER,
  GovernanceIssue,
  TN_DEPARTMENTS
} from '../data/governanceData';
import {
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Shield,
  FileText,
  Building2,
  Calendar,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  Filter,
  Search,
  ExternalLink,
  Plus,
  Flame,
  Info,
  Layers,
  IndianRupee,
  Activity
} from 'lucide-react';

interface ExecutiveWorkspaceProps {
  briefing: ExecutiveBriefing | null;
  actionsToday: MyActionsToday | null;
  onOpenCopilot: (initialPrompt?: string) => void;
  onSelectAction?: (action: ActionItemTriage) => void;
}

export const ExecutiveWorkspace: React.FC<ExecutiveWorkspaceProps> = ({
  briefing,
  actionsToday,
  onOpenCopilot,
  onSelectAction
}) => {
  const { language, setCurrentRoute } = useAuthStore();
  const isTa = language === 'ta';

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIssueDetail, setActiveIssueDetail] = useState<GovernanceIssue | null>(null);

  const CATEGORIES = [
    'ALL',
    'Infrastructure',
    'Agriculture',
    'Health',
    'Revenue',
    'Water',
    'Disaster',
    'Police & Safety',
    'Environment',
    'Citizen Services',
    'Education',
    'Electricity'
  ];

  const SEVERITIES = ['ALL', 'CRITICAL', 'WARNING', 'ATTENTION'];

  const filteredIssues = useMemo(() => {
    return GOVERNANCE_ISSUES_MASTER.filter((issue) => {
      if (selectedCategory !== 'ALL' && issue.category !== selectedCategory) return false;
      if (selectedSeverity !== 'ALL' && issue.severity !== selectedSeverity) return false;
      if (selectedDistrict !== 'ALL' && issue.district !== selectedDistrict) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          issue.titleEn.toLowerCase().includes(q) ||
          issue.titleTa.toLowerCase().includes(q) ||
          issue.district.toLowerCase().includes(q) ||
          issue.responsibleOfficial.nameEn.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedSeverity, selectedDistrict, searchQuery]);

  const criticalCount = GOVERNANCE_ISSUES_MASTER.filter((i) => i.severity === 'CRITICAL').length;
  const warningCount = GOVERNANCE_ISSUES_MASTER.filter((i) => i.severity === 'WARNING').length;
  const totalFinancialExposure = GOVERNANCE_ISSUES_MASTER.reduce(
    (acc, curr) => acc + (curr.financialImpactCr || 0),
    0
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. TOP HERO: Executive Decision Cockpit */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-700 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {isTa ? 'முதல்வர் ஆட்சி நுண்ணறிவு & கட்டளை மையம்' : 'CM Governance Intelligence & Executive Command'}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {isTa ? briefing?.greeting_ta || "வணக்கம் மாண்புமிகு முதலமைச்சர் அவர்களுக்கு" : briefing?.greeting_en || "Good Morning, Hon'ble Chief Minister"}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {isTa
                ? 'இன்று முடிவு எடுக்கப்பட வேண்டிய முக்கிய சிக்கல்கள், தொடர்புடைய துறைகள், நிதி தாக்கம் மற்றும் அதிகாரிகளுக்கான நேரடி வழிகாட்டுதல்கள்.'
                : 'Decision-first intelligence: 15 active cross-department challenges requiring executive intervention, identified authorities, and measurable closure timelines.'}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 sm:p-4 shrink-0">
            <div className="text-center">
              <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Critical</div>
              <div className="text-lg sm:text-2xl font-bold font-mono text-rose-400 mt-0.5 sm:mt-1">{criticalCount}</div>
            </div>
            <div className="text-center border-x border-slate-800 px-1.5 sm:px-3">
              <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Warnings</div>
              <div className="text-lg sm:text-2xl font-bold font-mono text-amber-400 mt-0.5 sm:mt-1">{warningCount}</div>
            </div>
            <div className="text-center">
              <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Exposure</div>
              <div className="text-lg sm:text-2xl font-bold font-mono text-emerald-400 mt-0.5 sm:mt-1">₹{totalFinancialExposure.toFixed(0)} Cr</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE QUESTIONS CALLOUT BAR */}
      <div className="glass-card rounded-2xl border border-slate-800 p-4">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          {isTa ? 'ஆட்சியர் & துறை ஆய்வுகளுக்கான முக்கிய கேள்விகள் (AI பரிந்துரை):' : 'Key Executive Inquiries for Today\'s Review:'}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => onOpenCopilot("Show top 10 unresolved issues in Salem and responsible officers")}
            className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-400/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold mb-1">
              <span>Salem Ring Road Delay</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Why is survey block 41/2 pending joint patta sub-division? Who is the accountable Collector/DRO?
            </p>
          </button>

          <button
            onClick={() => onOpenCopilot("What is the current DAP fertilizer buffer stock in Cauvery Delta?")}
            className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-400/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold mb-1">
              <span>Cauvery Delta Water & DAP</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Has Mettur discharge reached 15,000 cusecs? Has TANFED railhead dispatch reached Thanjavur?
            </p>
          </button>

          <button
            onClick={() => onOpenCopilot("Review pending export IGST refunds in Tirupur commercial taxes")}
            className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-400/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold mb-1">
              <span>Tirupur Tax Refund Camp</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Status of ₹340 Cr export refund clearance cell in Tirupur commercial tax circle.
            </p>
          </button>
        </div>
      </div>

      {/* 3. ISSUE FILTERING & COMMAND CARDS */}
      <div className="space-y-4">
        {/* Controls */}
        <div className="glass-card rounded-2xl border border-slate-800 p-4 space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isTa ? "பிரச்சனை, மாவட்டம், அதிகாரி..." : "Search issues, districts, officers..."}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto text-xs">
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
              >
                {SEVERITIES.map((s) => (
                  <option key={s} value={s}>{s === 'ALL' ? 'All Severities' : s}</option>
                ))}
              </select>

              <span className="text-[11px] font-mono text-slate-400">
                {filteredIssues.length} issues identified
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-1.5 pt-1 pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                issue.severity === 'CRITICAL'
                  ? 'bg-rose-950/20 border-rose-800/40 hover:border-rose-700'
                  : issue.severity === 'WARNING'
                  ? 'bg-amber-950/20 border-amber-800/40 hover:border-amber-700'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Header info */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-slate-300 border border-slate-800">
                      {issue.id}
                    </span>
                    <span className="text-[11px] font-bold text-slate-300">
                      {issue.district}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      issue.severity === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : issue.severity === 'WARNING'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white leading-snug">
                  {isTa ? issue.titleTa : issue.titleEn}
                </h3>

                {/* Responsible Officer */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Accountable Officer</div>
                  <div className="text-xs font-bold text-slate-200">
                    {issue.responsibleOfficial.nameEn}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {issue.responsibleOfficial.designationEn} • {issue.departmentEn}
                  </div>
                </div>

                {/* Impact */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">Financial Impact</div>
                    <div className="font-mono font-bold text-amber-400 mt-0.5">
                      {issue.financialImpactCr ? `₹${issue.financialImpactCr} Cr` : 'N/A'}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">Citizen Impact</div>
                    <div className="font-mono font-bold text-indigo-300 mt-0.5">
                      {issue.citizenImpactCount ? `${(issue.citizenImpactCount / 1000).toFixed(0)}K Citizens` : 'Statewide'}
                    </div>
                  </div>
                </div>

                {/* Recommended CM Action */}
                <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-200 leading-relaxed">
                  <span className="font-bold text-amber-400">Next CM Step: </span>
                  {isTa ? issue.recommendedActionTa : issue.recommendedActionEn}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveIssueDetail(issue)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  View Evidence
                </button>

                <button
                  onClick={() => setCurrentRoute('action-tracker')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Issue Direction</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: Full Issue Evidence & History Dossier */}
      {activeIssueDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="glass-card rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 font-mono font-bold text-amber-400 text-xs">
                  {activeIssueDetail.id}
                </span>
                <span className="text-xs text-slate-400">
                  {activeIssueDetail.district} • {activeIssueDetail.category}
                </span>
              </div>
              <button
                onClick={() => setActiveIssueDetail(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-base font-bold text-white">
                  {isTa ? activeIssueDetail.titleTa : activeIssueDetail.titleEn}
                </h3>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  {activeIssueDetail.sourceAndEvidence}
                </p>
              </div>

              {/* Responsible Official */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Accountable Officer</div>
                  <div className="text-sm font-bold text-white">{activeIssueDetail.responsibleOfficial.nameEn}</div>
                  <div className="text-slate-400">{activeIssueDetail.responsibleOfficial.designationEn}</div>
                  <div className="font-mono text-cyan-400 text-[11px] mt-0.5">
                    {activeIssueDetail.responsibleOfficial.email} • {activeIssueDetail.responsibleOfficial.phone}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-800 font-mono font-bold text-amber-400">
                  {activeIssueDetail.responsibleOfficial.cadre}
                </span>
              </div>

              {/* Evidence Attachments */}
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Evidence & Telemetry Attachments</div>
                <div className="space-y-1.5">
                  {activeIssueDetail.evidenceAttachments.map((att, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400" />
                        <span className="text-slate-200">{att.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{att.type} • {att.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="font-bold text-amber-400 mb-0.5">Recommended CM Direction:</div>
                <p className="text-slate-200 leading-relaxed">
                  {isTa ? activeIssueDetail.recommendedActionTa : activeIssueDetail.recommendedActionEn}
                </p>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setActiveIssueDetail(null);
                    onOpenCopilot(`Analyze issue ${activeIssueDetail.id}: ${activeIssueDetail.titleEn}`);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-center"
                >
                  Analyze with AI Copilot
                </button>
                <button
                  onClick={() => {
                    setActiveIssueDetail(null);
                    setCurrentRoute('action-tracker');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-center"
                >
                  Issue Executive Direction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
