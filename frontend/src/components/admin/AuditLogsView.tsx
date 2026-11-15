import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

const MOCK_AUDIT_EVENTS = [
  { id: '1', action: 'LOGIN', user: 'cm-executive-01', role: 'CHIEF_MINISTER', resource: 'auth/login', ip: '10.0.0.1', time: '2026-11-15 09:12:34' },
  { id: '2', action: 'VIEW', user: 'cs-user-01', role: 'CHIEF_SECRETARY', resource: 'executive/state-score', ip: '10.0.0.2', time: '2026-11-15 09:14:01' },
  { id: '3', action: 'EXPORT', user: 'cm-executive-01', role: 'CHIEF_MINISTER', resource: 'cmo/export', ip: '10.0.0.1', time: '2026-11-15 09:21:55' },
  { id: '4', action: 'BOOK', user: 'cm-executive-01', role: 'CHIEF_MINISTER', resource: 'calendar/book', ip: '10.0.0.1', time: '2026-11-15 10:05:22' },
  { id: '5', action: 'QUERY', user: 'collector-cbe-01', role: 'DISTRICT_COLLECTOR', resource: 'copilot/chat', ip: '10.0.0.5', time: '2026-11-15 10:33:17' },
];

export const AuditLogsView: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-200">
    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-700 p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
        <ShieldCheck className="w-4 h-4" />
        <span>Security &amp; Compliance</span>
      </div>
      <h1 className="text-2xl font-extrabold text-white">Audit Log Trail</h1>
      <p className="text-xs text-slate-300 mt-1">Tamper-evident chronological record of all system actions and access events.</p>
    </div>
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
      <Activity className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
      <div className="text-xs text-amber-200">
        <span className="font-bold">🔒 Backend Required</span> — Live audit log streaming requires FastAPI server + PostgreSQL.
        Records shown below are representative samples. Real cryptographic audit chain enforced when backend is running.
      </div>
    </div>
    <div className="rounded-2xl border border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              {['Time', 'Action', 'User', 'Role', 'Resource', 'IP'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] uppercase font-bold text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_AUDIT_EVENTS.map((e, i) => (
              <tr key={e.id} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/50'}`}>
                <td className="px-4 py-2.5 font-mono text-slate-400">{e.time}</td>
                <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/15 text-cyan-300">{e.action}</span></td>
                <td className="px-4 py-2.5 text-slate-200 font-mono">{e.user}</td>
                <td className="px-4 py-2.5 text-amber-300 font-mono">{e.role}</td>
                <td className="px-4 py-2.5 text-slate-300">{e.resource}</td>
                <td className="px-4 py-2.5 font-mono text-slate-500">{e.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
