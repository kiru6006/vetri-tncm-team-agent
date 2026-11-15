import React from 'react';
import { Bot, AlertTriangle } from 'lucide-react';

const AGENTS = [
  { id: 'cmo-orchestrator', name: 'CMO Orchestrator', desc: 'Routes natural-language queries to tool agents', status: 'MOCK', model: 'regex-fallback', tools: 8 },
  { id: 'appointment-agent', name: 'Appointment Booking Agent', desc: 'Schedules CM calendar via directive parsing', status: 'MOCK', model: 'regex-fallback', tools: 3 },
  { id: 'grm-sync', name: 'GRM Sync Connector', desc: 'ETL sync from NIC/TNIFMC directory sources', status: 'STUB', model: 'N/A', tools: 2 },
  { id: 'langgraph-supervisor', name: 'LangGraph Multi-Agent Supervisor', desc: 'Orchestrates specialist sub-agents for complex queries', status: 'DECOUPLED', model: 'gemini-2.0-flash (target)', tools: 12 },
  { id: 'knowledge-agent', name: 'Knowledge Hub Agent', desc: 'Semantic search across GOs, circulars and policy docs', status: 'MOCK', model: 'regex-fallback', tools: 4 },
];

const STATUS_STYLES: Record<string, string> = {
  MOCK: 'bg-amber-500/15 text-amber-300',
  STUB: 'bg-slate-700 text-slate-400',
  DECOUPLED: 'bg-rose-500/15 text-rose-300',
  LIVE: 'bg-emerald-500/15 text-emerald-300',
};

export const AIAgentsStatusView: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-200">
    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-700 p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
        <Bot className="w-4 h-4" />
        <span>Agentic Systems</span>
      </div>
      <h1 className="text-2xl font-extrabold text-white">AI Agent Status Board</h1>
      <p className="text-xs text-slate-300 mt-1">Live status of all VETTRI AI agents, tools, and orchestration pipelines.</p>
    </div>
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
      <div className="text-xs text-amber-200">
        <span className="font-bold">MOCK MODE</span> — Agents run regex simulation on GitHub Pages demo.
        Real Gemini grounding + LangGraph orchestration targeted in Wave 2.
      </div>
    </div>
    <div className="space-y-3">
      {AGENTS.map(agent => (
        <div key={agent.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white">{agent.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_STYLES[agent.status] ?? STATUS_STYLES.STUB}`}>{agent.status}</span>
            </div>
            <p className="text-xs text-slate-400">{agent.desc}</p>
          </div>
          <div className="flex gap-4 text-xs font-mono shrink-0">
            <div className="text-center"><div className="text-slate-500 text-[10px]">Model</div><div className="text-slate-200">{agent.model}</div></div>
            <div className="text-center"><div className="text-slate-500 text-[10px]">Tools</div><div className="text-cyan-300 font-bold">{agent.tools}</div></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
