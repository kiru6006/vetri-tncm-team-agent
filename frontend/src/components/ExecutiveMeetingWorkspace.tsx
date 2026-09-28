import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Users,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronRight,
  Plus,
  Video,
  Building2,
  ArrowRight,
  Send
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { MeetingBriefingPack, MeetingActionItem } from '../types';

interface ExecutiveMeetingWorkspaceProps {
  onOpenCopilot?: (prompt: string) => void;
  onExecuteAction?: (task: MeetingActionItem) => void;
}

export const ExecutiveMeetingWorkspace: React.FC<ExecutiveMeetingWorkspaceProps> = ({
  onOpenCopilot,
  onExecuteAction
}) => {
  const { language } = useAuthStore();
  const isTa = language === 'ta';

  const [meetings, setMeetings] = useState<MeetingBriefingPack[]>([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string>('mtg-cab-01');
  const [activeTab, setActiveTab] = useState<'briefing' | 'minutes' | 'actions'>('briefing');
  const [newMeetingModal, setNewMeetingModal] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingType, setMeetingType] = useState('CABINET');

  useEffect(() => {
    fetch('/api/v1/meetings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          setMeetings(data);
          setSelectedMeetingId(data[0].meeting_id);
        }
      })
      .catch(() => {
        // Fallback seed
        setMeetings([
          {
            meeting_id: "mtg-cab-01",
            title_en: "Cabinet Review on Mega Industrial Investments & Monsoon Preparedness",
            title_ta: "மெகா தொழில் முதலீடுகள் மற்றும் பருவமழை தயார்நிலை குறித்த அமைச்சரவை ஆய்வு",
            meeting_type: "CABINET",
            scheduled_time: "Today, 11:30 AM (Secretariat Cabinet Room)",
            chairperson_name: "Hon'ble Chief Minister",
            chairperson_designation: "Chief Minister of Tamil Nadu",
            attendees: [
              {
                officer_id: "off-cm-01",
                name_en: "M. K. Stalin",
                name_ta: "மு. க. ஸ்டாலின்",
                designation: "Chief Minister",
                tier_role: "CHIEF_MINISTER",
                status: "CONFIRMED"
              },
              {
                officer_id: "off-cs-01",
                name_en: "N. Muruganandam, IAS",
                name_ta: "நா. முருகானந்தம், இ.ஆ.ப.",
                designation: "Chief Secretary",
                tier_role: "CHIEF_SECRETARY",
                status: "CONFIRMED"
              }
            ],
            agenda_items: [
              "1. Special Incentive Package for Phase 2 Semiconductor Fab (₹4,800 Cr capex)",
              "2. Monsoon Disaster Mitigation Infrastructure: Approval of ₹620 Cr emergency fund allocation",
              "3. Progress review on Chennai Metro Phase 2 underground tunneling corridor"
            ],
            ai_pre_briefing_en: "AI Pre-Briefing: 3 Global proposals awaiting SIPCOT land allotment totaling ₹4,800 Cr with 14,200 direct jobs. Monsoon preparedness across 38 districts shows 96% desilting completion.",
            ai_pre_briefing_ta: "AI முன் தயாரிப்பு சுருக்கம்: ₹4,800 கோடி முதலீட்டில் சிப்காட் நில ஒதுக்கீடு அமைச்சரவை ஒப்புதலுக்காக உள்ளது. பருவமழை தயார்நிலையில் 96% தூர்வாரும் பணிகள் முடிவடைந்துள்ளன.",
            key_risks_flagged: [
              "Power grid transmission capacity at Hosur SIPCOT needs synchronization with TANGEDCO by Q1 2027.",
              "Orange rainfall alert in coastal delta districts may coincide with early Kuruvai harvest operations."
            ],
            historical_decisions: [
              "Cabinet approved SIPCOT Mega EV Industrial Park Policy in Q1 2026."
            ],
            suggested_decision_options: [
              {
                option_code: "APPROVE_FULL_INCENTIVE",
                label_en: "Approve complete Special Incentive Package (Capital Subsidy + 15% Power Tariff offset)",
                label_ta: "முழு சிறப்பு ஊக்கத்தொகை தொகுப்பிற்கு ஒப்புதல் அளிக்கவும்",
                fiscal_impact: "₹720 Cr over 5 years",
                recommended: true
              }
            ],
            auto_generated_minutes_en: "Minutes: Cabinet unanimously approved Special Incentive Package for Semiconductor Fab in Krishnagiri and sanctioned ₹620 Cr emergency monsoon mitigation allocation under SDRF.",
            auto_generated_minutes_ta: "கூட்ட நடவடிக்கைகள்: கிருஷ்ணகிரியில் ₹4,800 கோடி குறைக்கடத்தி தொழிற்சாலைக்கான சிறப்பு சலுகை மற்றும் ₹620 கோடி அவசர பருவமழை நிதி ஒதுக்கீட்டிற்கு அமைச்சரவை ஒப்புதல் அளித்தது.",
            action_items: [
              {
                id: "act-mtg-01",
                meeting_id: "mtg-cab-01",
                task_en: "Issue Government Order (G.O. Ms) for Semiconductor Fab Special Package",
                task_ta: "குறைக்கடத்தி தொழிற்சாலை சிறப்பு சலுகைக்கான அரசாணை வெளியிடவும்",
                responsible_officer_name: "V. Arun Roy, IAS",
                responsible_officer_designation: "Secretary, Industries",
                deadline: "Today, 18:00 hrs",
                status: "IN_PROGRESS"
              }
            ]
          }
        ]);
      });
  }, []);

  const selectedMeeting = meetings.find(m => m.meeting_id === selectedMeetingId) || meetings[0];

  const handleCreateMeeting = () => {
    if (!meetingTitle.trim()) return;

    fetch('/api/v1/meetings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title_en: meetingTitle,
        title_ta: meetingTitle,
        meeting_type: meetingType,
        scheduled_time: "Today, 16:00 hrs",
        agenda_items: ["1. Review progress and address pending approvals"]
      })
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setMeetings(prev => [data, ...prev]);
          setSelectedMeetingId(data.meeting_id);
          setNewMeetingModal(false);
          setMeetingTitle('');
        }
      })
      .catch(() => {
        setNewMeetingModal(false);
      });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {isTa ? 'அமைச்சரவை & உயர்நிலை கூட்ட நுண்ணறிவு பணிமனை' : 'Executive Meeting Intelligence Workspace'}
            </h1>
            <p className="text-xs text-slate-400">
              {isTa 
                ? 'தானியங்கி AI முன் தயாரிப்பு சுருக்கம், நேரடி கூட்ட நடவடிக்கைகள் மற்றும் உடனடி பணி கண்காணிப்பு' 
                : 'Automated AI Pre-Meeting Briefings, Historical Decision Audits & Actionable Minutes (MoM) Extraction'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setNewMeetingModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          {isTa ? 'புதிய கூட்டத்தை திட்டமிடு' : 'Schedule Review Meeting'}
        </button>
      </div>

      {/* MAIN MEETING GRID: Left (Meeting List 4 Cols) / Right (Briefing Dossier 8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Meetings Schedule List */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isTa ? 'அட்டவணைப்படுத்தப்பட்ட கூட்டங்கள்' : 'Scheduled Meetings'}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">{meetings.length} Total</span>
          </div>

          <div className="space-y-2.5">
            {meetings.map(m => (
              <div
                key={m.meeting_id}
                onClick={() => setSelectedMeetingId(m.meeting_id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-150 border ${
                  selectedMeetingId === m.meeting_id
                    ? 'bg-indigo-500/15 border-indigo-500/40 text-white shadow-lg'
                    : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                    {m.meeting_type}
                  </span>
                  <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {m.scheduled_time.split('(')[0]}
                  </span>
                </div>

                <h4 className="text-sm font-bold leading-snug mb-2 line-clamp-2">
                  {isTa ? m.title_ta : m.title_en}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span className="truncate">Chair: {m.chairperson_name}</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Users className="w-3 h-3" /> {m.attendees.length} Attendees
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Meeting Dossier & Intelligence Tabs */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          
          {/* Header of Selected Meeting */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedMeeting?.meeting_type}
                </span>
                <span className="text-xs text-amber-400 font-semibold">{selectedMeeting?.scheduled_time}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">
                {isTa ? selectedMeeting?.title_ta : selectedMeeting?.title_en}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Chairperson: <span className="text-slate-200 font-semibold">{selectedMeeting?.chairperson_name}</span> ({selectedMeeting?.chairperson_designation})
              </p>
            </div>

            <button
              onClick={() => onOpenCopilot && onOpenCopilot(`Generate complete pre-meeting briefing pack and Assembly Q&A notes for ${selectedMeeting?.title_en}`)}
              className="px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              {isTa ? 'AI ஆய்வுக் குறிப்பு' : 'Copilot Meeting Dossier'}
            </button>
          </div>

          {/* Sub-Tabs: Pre-Briefing / Minutes (MoM) / Action Items */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('briefing')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'briefing'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isTa ? 'AI முன் தயாரிப்பு சுருக்கம்' : 'AI Pre-Meeting Briefing'}</span>
            </button>

            <button
              onClick={() => setActiveTab('minutes')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'minutes'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isTa ? 'கூட்ட நடவடிக்கைகள் (MoM)' : 'Minutes of Meeting (MoM)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('actions')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'actions'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>{isTa ? 'நடவடிக்கைப் பணிகள்' : 'Action Items Tracker'}</span>
            </button>
          </div>

          {/* TAB 1: PRE-MEETING BRIEFING */}
          {activeTab === 'briefing' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  AI Synthesized Executive Briefing
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {isTa ? selectedMeeting?.ai_pre_briefing_ta : selectedMeeting?.ai_pre_briefing_en}
                </p>
              </div>

              {/* Agenda Items */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Agenda Items
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {selectedMeeting?.agenda_items.map((item, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-850 border border-slate-800">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Risks & Historical Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 space-y-2">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Key Risks Flagged
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {selectedMeeting?.key_risks_flagged.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                    Historical Precedents
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {selectedMeeting?.historical_decisions.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MINUTES OF MEETING (MoM) */}
          {activeTab === 'minutes' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 animate-in fade-in duration-150">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Official AI-Generated Record of Proceedings
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {isTa ? selectedMeeting?.auto_generated_minutes_ta : selectedMeeting?.auto_generated_minutes_en || "Minutes drafting in progress after meeting conclusion."}
              </p>
            </div>
          )}

          {/* TAB 3: ACTION ITEMS TRACKER */}
          {activeTab === 'actions' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              {selectedMeeting?.action_items && selectedMeeting.action_items.length > 0 ? (
                selectedMeeting.action_items.map(act => (
                  <div key={act.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {act.status}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {isTa ? act.task_ta : act.task_en}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400">
                        Responsible: <span className="text-slate-200 font-semibold">{act.responsible_officer_name}</span> ({act.responsible_officer_designation}) • Deadline: <span className="text-amber-400 font-mono">{act.deadline}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => onExecuteAction && onExecuteAction(act)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1 transition shrink-0"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  No pending action items recorded for this session.
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* NEW MEETING MODAL */}
      {newMeetingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-indigo-500/40 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {isTa ? 'புதிய அரசு ஆய்வுக் கூட்டம் திட்டமிடுதல்' : 'Schedule Review Meeting'}
              </h3>
              <button onClick={() => setNewMeetingModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Meeting Title</label>
                <input
                  type="text"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="e.g. Special Cabinet Review on Monsoon Readiness"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Meeting Classification</label>
                <select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="CABINET">Cabinet Meeting</option>
                  <option value="COLLECTOR_REVIEW">District Collectors Review</option>
                  <option value="DEPARTMENT_REVIEW">Department Performance Review</option>
                  <option value="CRISIS_MANAGEMENT">Crisis & Disaster Response</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                onClick={() => setNewMeetingModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMeeting}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
              >
                Create & Generate AI Briefing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
