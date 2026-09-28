import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CloudRain, 
  Calendar, 
  Sparkles, 
  FileText, 
  Users, 
  ShieldAlert,
  ArrowRight,
  Zap,
  Building2,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { ExecutiveBriefing, MyActionsToday, ActionItemTriage, MorningBriefingPriority } from '../types';

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
  const { user, language } = useAuthStore();
  const isTa = language === 'ta';

  // Fallback defaults if loading
  const stateScore = briefing?.state_score ?? 88.4;
  const pendingApprovals = briefing?.pending_approvals_count ?? 7;
  const meetingsCount = briefing?.scheduled_meetings_today ?? 3;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. TOP HERO: Executive Greeting & Strategic AI Direction */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/20 shadow-2xl p-6 md:p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {isTa ? 'அரசு தலைமை செயற்கை நுண்ணறிவு கட்டுப்பாட்டு மையம்' : 'Official AI Operating Cockpit • Govt of Tamil Nadu'}
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {isTa ? briefing?.greeting_ta : briefing?.greeting_en}
            </h1>

            <p className="text-sm md:text-base text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{briefing?.briefing_date}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-300 font-medium">
                {isTa ? 'மாநில ஆளுமை குறியீடு:' : 'State Performance Index:'} {stateScore} / 100
              </span>
            </p>

            {/* AI Strategic Intelligence Directive */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30 shadow-inner flex items-start gap-3">
              <BrainCircuit className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-1">
                  {isTa ? 'AI மூலோபாய ஆலோசனை (Chief Executive AI Directive)' : 'AI Strategic Intelligence Recommendation'}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {isTa ? briefing?.ai_strategic_advice_ta : briefing?.ai_strategic_advice_en}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 shrink-0">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                104%
              </div>
              <div>
                <div className="text-xs text-slate-400">{isTa ? 'வணிக வரி' : 'Commercial Tax'}</div>
                <div className="text-sm font-bold text-white">{isTa ? 'இலக்கை விட அதிகம்' : 'Above Target'}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                {pendingApprovals}
              </div>
              <div>
                <div className="text-xs text-slate-400">{isTa ? 'நிலுவை ஒப்புதல்கள்' : 'Pending Approvals'}</div>
                <div className="text-sm font-bold text-white">{isTa ? 'இன்றைய தீர்வு' : 'Awaiting Decision'}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
                {meetingsCount}
              </div>
              <div>
                <div className="text-xs text-slate-400">{isTa ? 'முக்கிய கூட்டங்கள்' : 'Meetings Today'}</div>
                <div className="text-sm font-bold text-white">{isTa ? 'அமைச்சரவை / VC' : 'Cabinet & Reviews'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CORE WORKSPACE: 2-COLUMN SPLIT (Left: My Actions Today / Right: Morning Briefing & Citizen Sentiment) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (7 Cols): My Actions Today Triage */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {isTa ? 'இன்றைய எனது நடவடிக்கைகள் (My Actions Today)' : 'My Actions Today'}
                </h2>
                <p className="text-xs text-slate-400">
                  {isTa 
                    ? `${actionsToday?.total_actions_pending ?? 5} உடனடி முடிவுகளுக்கான விவகாரங்கள் முன்னுரிமை வரிசையில்` 
                    : `${actionsToday?.total_actions_pending ?? 5} high-impact matters awaiting executive intervention`}
                </p>
              </div>
            </div>

            <button 
              onClick={() => onOpenCopilot('Summarize all pending approvals and high-priority action items for today')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isTa ? 'AI ஆய்வு' : 'AI Triage'}
            </button>
          </div>

          <div className="space-y-3.5">
            {actionsToday?.actions.map((act) => (
              <div 
                key={act.id} 
                onClick={() => onSelectAction && onSelectAction(act)}
                className="group relative rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 p-5 shadow-lg transition-all duration-200 cursor-pointer"
              >
                {/* Category & Severity Badge */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      act.priority === 'CRITICAL' 
                        ? 'bg-red-500/20 border border-red-500/40 text-red-400' 
                        : act.priority === 'HIGH'
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                        : 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                    }`}>
                      {act.priority}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {act.department}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{act.deadline}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition mb-2">
                  {isTa ? act.title_ta : act.title_en}
                </h3>

                {/* Bottleneck / Issue */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  <span className="text-slate-500 font-medium">{isTa ? 'சிக்கல்: ' : 'Bottleneck: '}</span>
                  {isTa ? act.bottleneck_ta : act.bottleneck_en}
                </p>

                {/* Financial / Impact Metric */}
                {act.financial_impact_cr && act.financial_impact_cr > 0 && (
                  <div className="inline-block mb-3 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-xs font-bold text-emerald-400">
                    {isTa ? `நிதி தாக்கம்: ₹${act.financial_impact_cr} கோடி` : `Financial Value: ₹${act.financial_impact_cr} Cr`}
                  </div>
                )}

                {/* AI Recommended Decision */}
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-200 leading-normal">
                    <span className="font-bold text-emerald-300 mr-1">
                      {isTa ? 'பரிந்துரைக்கப்பட்ட முடிவு:' : 'Recommended Action:'}
                    </span>
                    {isTa ? act.ai_recommended_action_ta : act.ai_recommended_action_en}
                  </div>
                </div>

                {/* Hover CTA */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>{isTa ? `பொறுப்பு அலுவலர்: ${act.responsible_officer}` : `Officer: ${act.responsible_officer}`}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold group-hover:translate-x-1 transition">
                    {isTa ? 'நடவடிக்கை எடு' : 'Authorize Action'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Morning Briefing Priorities, Weather & Sentiment */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* A. Morning Briefing Priorities */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {isTa ? 'இன்றைய காலை அறிக்கை' : "Today's Priorities"}
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {briefing?.top_priorities.length ?? 3} {isTa ? 'விவகாரங்கள்' : 'Items'}
              </span>
            </div>

            <div className="space-y-3">
              {briefing?.top_priorities.map((prio) => (
                <div key={prio.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">{prio.department}</span>
                    <span className="text-red-400 font-bold">{prio.severity}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    {isTa ? prio.title_ta : prio.title_en}
                  </h4>
                  <div className="text-xs text-amber-300/90 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    ⚡ {prio.metric_signal}
                  </div>
                  <p className="text-xs text-slate-300">
                    {isTa ? prio.recommended_decision_ta : prio.recommended_decision_en}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* B. Extreme Weather & Disaster Alerts */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <CloudRain className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {isTa ? 'வானிலை & பேரிடர் எச்சரிக்கைகள்' : 'Weather & Disaster Alerts'}
              </h2>
            </div>

            <div className="space-y-3">
              {briefing?.weather_alerts.map((w, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-400">{isTa ? w.region_ta : w.region_en}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                      {w.alert_level} ALERT
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isTa ? w.description_ta : w.description_en}
                  </p>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    🛡️ {w.preparedness_status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C. Citizen Sentiment & Social Voice */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {isTa ? 'மக்கள் மனநிலை & சமூக குரல்' : 'Citizen Sentiment'}
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-400">
                {briefing?.citizen_sentiment.sentiment_score_pct ?? 81.4}% Positive
              </span>
            </div>

            <div className="space-y-2">
              {briefing?.citizen_sentiment.trending_topics.map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs">
                  <span className="text-slate-200 font-medium truncate max-w-[200px]">{t.topic}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold">{t.sentiment}</span>
                    <span className="text-slate-500 text-[10px]">({t.mentions})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. QUICK COPILOT PROMPT BAR AT WORKSPACE BOTTOM */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {isTa ? 'உரையாடல் AI வழிகாட்டி எப்போதும் தயார்' : 'Chief Minister & Executive AI Copilot Ready'}
            </h4>
            <p className="text-xs text-slate-400">
              {isTa ? 'கேளுங்கள்: "இன்றைய மாவட்ட மதிப்பாய்வு தயார் செய்" அல்லது "₹100 கோடிக்கு மேற்பட்ட திட்டங்களை காட்டு"' : 'Ask: "Show delayed projects above ₹100 Cr" or "Prepare today\'s cabinet briefing notes"'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenCopilot()}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          {isTa ? 'AI உடன் உரையாடு' : 'Launch Copilot'}
        </button>
      </div>

    </div>
  );
};
