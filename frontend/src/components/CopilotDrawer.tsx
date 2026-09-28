import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { CopilotMessage, ActionRecommendation } from '../types';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Bot,
  User as UserIcon,
  ChevronDown,
  ChevronRight,
  FileText,
  Zap,
  CheckCircle2,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onExecuteDirective: (action: ActionRecommendation) => void;
}

export const CopilotDrawer: React.FC<Props> = ({ isOpen, onClose, onExecuteDirective }) => {
  const { language, user } = useAuthStore();
  const [inputQuery, setInputQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'init-msg-1',
      sender: 'agent',
      textEn:
        "Vanakkam! I am the Chief Minister's AI Copilot. I monitor 38 districts, 35 ministries, and all state revenues in real time. How may I assist your administration today?",
      textTa:
        "வணக்கம்! நான் முதலமைச்சரின் தலைமை AI ஆலோசகர் (Copilot). தமிழகத்தின் 38 மாவட்டங்கள் மற்றும் அரசுத் துறைகளின் நிகழ்நேரத் தகவல்களை நான் கண்காணிக்கிறேன். இன்று தங்களுக்கு எவ்வாறு உதவலாம்?",
      thoughtSteps: [
        'Initialized secure connection to TN State Data Center',
        'Ingested real-time telemetry from 38 district feeds',
        'Verified executive authorization credentials',
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [expandedTrace, setExpandedTrace] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim() || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textEn: q,
      textTa: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          language: language,
          session_id: 'executive-session-2026',
        }),
      });

      if (!response.ok) throw new Error('Copilot response error');
      const data = await response.json();

      const botMsg: CopilotMessage = {
        id: `bot-${Date.now()}`,
        sender: 'agent',
        textEn: data.response_en,
        textTa: data.response_ta,
        thoughtSteps: data.thought_steps,
        citations: data.citations,
        actions: data.recommended_actions,
        chartDirective: data.chart_directive,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Fallback local response simulation
      setTimeout(() => {
        const fallbackMsg: CopilotMessage = {
          id: `bot-${Date.now()}`,
          sender: 'agent',
          textEn:
            'Telemetry across all 38 districts indicates stable governance metrics. The top 3 priorities today are: 1) Tirupur groundwater deficit in dyeing hubs, 2) Anti-D globulin restock at Madurai GRH, and 3) Cuddalore coastal rainfall monitoring.',
          textTa:
            '38 மாவட்டங்களிலும் அரசு நிர்வாகக் குறியீடுகள் சீராக உள்ளன. இன்றைய 3 முக்கிய கவனப் பகுதிகள்: 1) திருப்பூர் சாயப்பட்டறை நிலத்தடி நீர் தட்டுப்பாடு, 2) மதுரை அரசு மருத்துவமனை மருந்து இருப்பு, 3) கடலூர் கடலோர மழை முன்னெச்சரிக்கை.',
          citations: [
            { source: 'State Command Center', ref: 'TELEMETRY_LOG_WK39', date: '2026-09-28' },
          ],
          actions: [
            {
              actionCode: 'ISSUE_CANAL_WATER_DIRECTIVE',
              descriptionEn: 'Authorize canal release from Amaravathi dam.',
              descriptionTa: 'அமராவதி அணையிலிருந்து கால்வாய் நீர் திறக்க உத்தரவிடவும்.',
              priority: 'HIGH',
              targetDepartment: 'Water Resources Department',
            },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        setIsLoading(false);
      }, 700);
      return;
    }
    setIsLoading(false);
  };

  const sampleQueries = [
    {
      en: 'Which districts require immediate attention today?',
      ta: 'இன்று உடனடி கவனம் தேவைப்படும் மாவட்டங்கள் எவை?',
    },
    {
      en: 'What is the Kuruvai crop & Mettur storage status?',
      ta: 'மேட்டூர் அணை நீர் இருப்பு மற்றும் குறுவை சாகுபடி நிலை என்ன?',
    },
    {
      en: 'Commercial Tax revenue growth vs Q2 targets',
      ta: 'வணிக வரி வசூல் மற்றும் காலாண்டு இலக்கு நிலவரம்',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] glass-card border-l border-slate-700/80 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Copilot Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{language === 'ta' ? 'முதல்வர் AI வழிகாட்டி' : 'Chief Minister Copilot'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h2>
            <p className="text-[11px] text-cyan-400 font-medium font-mono">
              LangGraph Multi-Agent • MCP Verified
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Conversation Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[92%] p-4 rounded-2xl text-xs leading-relaxed space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-md font-medium'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
              }`}
            >
              {/* Message Content */}
              <p className="whitespace-pre-line text-[13px] leading-relaxed">
                {language === 'ta' ? msg.textTa : msg.textEn}
              </p>

              {/* Agent Thought Trace Dropdown */}
              {msg.thoughtSteps && msg.thoughtSteps.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() =>
                      setExpandedTrace(expandedTrace === msg.id ? null : msg.id)
                    }
                    className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
                  >
                    {expandedTrace === msg.id ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                    <span>{language === 'ta' ? 'AI சிந்தனைப் பதிவு' : 'Agent Reasoning Trace'}</span>
                  </button>

                  {expandedTrace === msg.id && (
                    <div className="mt-2 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-[10px] text-slate-400 space-y-1">
                      {msg.thoughtSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-cyan-500">→</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Citations Tag */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-amber-400" />
                    {language === 'ta' ? 'ஆதாரங்கள்:' : 'Sources:'}
                  </span>
                  {msg.citations.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-amber-300 font-mono"
                    >
                      {c.source} ({c.ref})
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="pt-2.5 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட நடவடிக்கை:' : 'Proposed Executive Action:'}
                  </div>
                  {msg.actions.map((act, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200"
                    >
                      <span className="text-[11px] font-medium">
                        {language === 'ta' ? act.descriptionTa : act.descriptionEn}
                      </span>
                      <button
                        onClick={() => onExecuteDirective(act)}
                        className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] ml-2 shrink-0 transition-all"
                      >
                        {language === 'ta' ? 'நிறைவேற்று' : 'Execute'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 w-fit">
            <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>{language === 'ta' ? 'AI பதிலைத் தயாரிக்கிறது...' : 'Analyzing state telemetry...'}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/60 flex gap-2 overflow-x-auto text-xs no-scrollbar">
        {sampleQueries.map((sq, i) => (
          <button
            key={i}
            onClick={() => handleSend(language === 'ta' ? sq.ta : sq.en)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] whitespace-nowrap transition-colors"
          >
            {language === 'ta' ? sq.ta : sq.en}
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`p-2.5 rounded-xl border transition-all ${
            isRecording
              ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
          }`}
          title="Voice Command (Tamil / English)"
        >
          {isRecording ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        </button>

        <input
          type="text"
          placeholder={
            language === 'ta'
              ? 'முதல்வரிடம் கேட்கவும் (தமிழ் அல்லது ஆங்கிலத்தில்)...'
              : 'Ask Chief Minister Copilot in Tamil or English...'
          }
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || isLoading}
          className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
