import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Shield,
  Send,
  Paperclip,
  Sparkles,
  Users,
  CheckCircle2,
  Lock,
  Pin,
  AlertCircle,
  Clock,
  ArrowRight,
  FileText
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { ChatRoom, ChatMessage, ChatSummary } from '../types';

interface GovernmentChatPlatformProps {
  onConvertTask?: (taskText: string) => void;
  onOpenCopilot?: (query: string) => void;
}

export const GovernmentChatPlatform: React.FC<GovernmentChatPlatformProps> = ({
  onConvertTask,
  onOpenCopilot
}) => {
  const { user, language } = useAuthStore();
  const isTa = language === 'ta';

  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string>('room-cab-01');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isPriorityMessage, setIsPriorityMessage] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [chatSummary, setChatSummary] = useState<ChatSummary | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    // Fetch chat channels
    fetch('http://localhost:8000/api/v1/chat/rooms')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          setRooms(data);
          setActiveRoomId(data[0].id);
        }
      })
      .catch(() => {
        // Fallback seed
        setRooms([
          {
            id: "room-cab-01",
            name_en: "Cabinet Executive Core",
            name_ta: "அமைச்சரவை தலைமை நிர்வாகக் குழு",
            room_type: "CABINET",
            unread_count: 2,
            last_message_snippet: "Chief Secretary: Draft Cabinet Note for Semiconductor Fab ready.",
            last_message_time: "10:45 AM",
            members_count: 35,
            is_encrypted: true
          },
          {
            id: "room-coll-02",
            name_en: "All 38 District Collectors Network",
            name_ta: "38 மாவட்ட ஆட்சித்தலைவர்கள் வலையமைப்பு",
            room_type: "ALL_COLLECTORS",
            unread_count: 5,
            last_message_snippet: "CS: Review e-Office pendency rates and submit compliance by 17:00.",
            last_message_time: "11:15 AM",
            members_count: 42,
            is_encrypted: true
          }
        ]);
      });
  }, []);

  useEffect(() => {
    if (!activeRoomId) return;
    // Fetch room messages
    fetch(`http://localhost:8000/api/v1/chat/rooms/${activeRoomId}/messages`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setMessages(data);
        }
      })
      .catch(() => {
        setMessages([
          {
            id: "msg-cab-01",
            room_id: "room-cab-01",
            sender_id: "off-cm-01",
            sender_name_en: "Hon'ble Chief Minister",
            sender_name_ta: "மாண்புமிகு முதலமைச்சர்",
            sender_designation: "Chief Minister",
            sender_role: "CHIEF_MINISTER",
            content_en: "Chief Secretary, ensure all departments have prepared monsoon preparedness files for today's Cabinet review.",
            content_ta: "தலைமைச் செயலாளர் அவர்களே, இன்றைய அமைச்சரவை ஆய்வுக்கு அனைத்து துறைகளும் பருவமழை தயார்நிலை கோப்புகளை தயார் செய்துள்ளதை உறுதிப்படுத்தவும்.",
            message_type: "TEXT",
            is_priority: true,
            timestamp: "10:30 AM"
          },
          {
            id: "msg-cab-02",
            room_id: "room-cab-01",
            sender_id: "off-cs-01",
            sender_name_en: "N. Muruganandam, IAS",
            sender_name_ta: "நா. முருகானந்தம், இ.ஆ.ப.",
            sender_designation: "Chief Secretary",
            sender_role: "CHIEF_SECRETARY",
            content_en: "Respected Sir, all 38 Collectors and line departments have submitted checklists. Draft Cabinet Note for Semiconductor Fab Incentive is uploaded.",
            content_ta: "மதிப்பிற்குரிய ஐயா, 38 மாவட்ட ஆட்சியர்கள் மற்றும் துறைகளின் சரிபார்ப்பு பட்டியல்கள் சமர்ப்பிக்கப்பட்டுள்ளன. குறைக்கடத்தி தொழிற்சாலை அமைச்சரவை குறிப்பும் பதிவேற்றப்பட்டுள்ளது.",
            message_type: "TEXT",
            attachment_name: "Cabinet_Note_Semiconductor_SIPCOT_2026.pdf",
            is_pinned: true,
            timestamp: "10:45 AM"
          }
        ]);
      });
  }, [activeRoomId]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      room_id: activeRoomId,
      sender_id: user?.id || 'curr-user',
      sender_name_en: user?.fullNameEn || "Executive Officer",
      sender_name_ta: user?.fullNameTa || "அரசு அலுவலர்",
      sender_designation: user?.designation || "Officer",
      sender_role: user?.role || "ANALYST",
      content_en: inputText,
      content_ta: inputText,
      message_type: "TEXT",
      is_priority: isPriorityMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsPriorityMessage(false);

    // Call backend
    fetch(`http://localhost:8000/api/v1/chat/rooms/${activeRoomId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newMsg.content_en, is_priority: newMsg.is_priority })
    }).catch(() => {});
  };

  const handleSummarizeThread = () => {
    setIsSummarizing(true);
    setSummaryModalOpen(true);
    fetch(`http://localhost:8000/api/v1/chat/rooms/${activeRoomId}/summarize`, { method: 'POST' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setChatSummary(data);
        }
      })
      .catch(() => {
        setChatSummary({
          room_id: activeRoomId,
          room_name: "Cabinet Core Channel",
          total_messages_analyzed: messages.length,
          summary_en: "Cabinet reviewed statewide monsoon preparedness and approved final incentive draft for SIPCOT semiconductor fab.",
          summary_ta: "அமைச்சரவை மாநில மழைக்கால தயார்நிலை குறித்து விவாதித்தது மற்றும் சிப்காட் குறைக்கடத்தி மானிய தொகுப்பை ஆய்வு செய்தது.",
          key_decisions: [
            "Mandated 100% storm drainage checklist submission from all line departments.",
            "Prepared Cabinet clearance for ₹4,800 Cr semiconductor package."
          ],
          derived_action_items: [
            { task: "Submit storm drainage compliance", assignee: "Principal Secretary, MAWS", deadline: "Today 16:00" },
            { task: "Prepare Fab Land Allotment Order", assignee: "SIPCOT MD", deadline: "Oct 01" }
          ]
        });
      })
      .finally(() => setIsSummarizing(false));
  };

  const activeRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                {isTa ? 'அரசு பாதுகாப்பான உரையாடல் & ஒத்துழைப்பு' : 'Secure Government Collaboration & Chat'}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                <Lock className="w-3 h-3" /> E2EE Sovereign Mesh
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isTa 
                ? 'அமைச்சரவை, 38 மாவட்ட ஆட்சியர்கள், துறை செயலாளர்கள் மற்றும் பேரிடர் படைகளுக்கான அதிகாரப்பூர்வ உரையாடல்' 
                : 'Official encrypted real-time communications for Cabinet, Collectors, Secretaries & Emergency Taskforces'}
            </p>
          </div>
        </div>

        <button
          onClick={handleSummarizeThread}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          {isTa ? 'AI உரையாடல் தொகுப்பு & பணிகள்' : 'AI Thread Summary & Actions'}
        </button>
      </div>

      {/* CHAT MAIN GRID: Left (Channels 4 Cols) / Right (Message Stream 8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Channels List */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isTa ? 'அதிகாரப்பூர்வ குழுக்கள்' : 'Official Channels'}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">{rooms.length} Active</span>
          </div>

          <div className="space-y-2">
            {rooms.map(r => (
              <div
                key={r.id}
                onClick={() => setActiveRoomId(r.id)}
                className={`p-3.5 rounded-xl cursor-pointer transition-all duration-150 border ${
                  activeRoomId === r.id
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-white shadow-lg'
                    : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold truncate">
                    {isTa ? r.name_ta : r.name_en}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{r.last_message_time}</span>
                </div>

                <p className="text-xs text-slate-400 truncate mb-2">
                  {r.last_message_snippet}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {r.members_count} officers
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">
                    {r.room_type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Active Message Stream */}
        <div className="lg:col-span-8 flex flex-col h-[650px] rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          
          {/* Active Room Bar */}
          <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                {isTa ? activeRoom?.name_ta : activeRoom?.name_en}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Restricted Official Channel • {activeRoom?.members_count} verified participants</span>
              </p>
            </div>

            <button
              onClick={() => onOpenCopilot && onOpenCopilot(`Analyze official communication thread in channel ${activeRoom?.name_en}`)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              {isTa ? 'AI கோப்புகள்' : 'Copilot Inspect'}
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl border max-w-2xl space-y-2 ${
                  msg.is_priority
                    ? 'bg-red-950/20 border-red-500/40'
                    : 'bg-slate-800/60 border-slate-700/60'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">
                      {isTa ? msg.sender_name_ta : msg.sender_name_en}
                    </span>
                    <span className="text-slate-400">({msg.sender_designation})</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    {msg.is_priority && (
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold text-[10px]">
                        PRIORITY DIRECTIVE
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {isTa ? msg.content_ta : msg.content_en}
                </p>

                {msg.attachment_name && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between text-xs text-emerald-300">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate font-mono">{msg.attachment_name}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-800 shrink-0">
                      VETTRI Verified Doc
                    </span>
                  </div>
                )}

                {/* 1-Click Convert to Task Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onConvertTask && onConvertTask(msg.content_en)}
                    className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isTa ? 'அரசு பணியாக மாற்று' : 'Convert to Official Task'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-slate-850 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isTa ? 'உரையாடல் அல்லது அதிகாரப்பூர்வ அறிவுறுத்தலை தட்டச்சு செய்க...' : 'Type an official directive, status update, or attachment inquiry...'}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 transition"
              />
              
              <button
                onClick={() => setIsPriorityMessage(!isPriorityMessage)}
                className={`px-3 py-3 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                  isPriorityMessage
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Priority</span>
              </button>

              <button
                onClick={handleSendMessage}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition shadow-lg flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* AI THREAD SUMMARY MODAL */}
      {summaryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-emerald-500/40 max-w-2xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isTa ? 'AI உரையாடல் தொகுப்பு & எடுக்கப்பட்ட முடிவுகள்' : 'AI Executive Thread Summary & Decisions'}
                </h3>
              </div>
              <button
                onClick={() => setSummaryModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {isSummarizing ? (
              <div className="py-12 text-center text-slate-400 animate-pulse">
                AI analyzing encrypted government thread messages and extracting action items...
              </div>
            ) : chatSummary ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Executive Summary
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {isTa ? chatSummary.summary_ta : chatSummary.summary_en}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Key Decisions Taken
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {chatSummary.key_decisions.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                    Derived Action Items & Tasks
                  </span>
                  <div className="space-y-2">
                    {chatSummary.derived_action_items.map((act, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800 text-xs">
                        <span className="text-white font-medium">{act.task}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">Assignee: {act.assignee}</span>
                          <span className="text-amber-400 font-mono">{act.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSummaryModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
