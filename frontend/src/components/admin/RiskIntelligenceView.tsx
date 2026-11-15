import React from 'react';
import { AlertOctagon } from 'lucide-react';

const RISK_MATRIX = [
  { domain: 'Fiscal Deficit', likelihood: 'HIGH', impact: 'HIGH', score: 9, owner: 'Finance Dept', status: 'MONITORING' },
  { domain: 'Drought / Water Stress', likelihood: 'MEDIUM', impact: 'HIGH', score: 7, owner: 'WRD', status: 'ALERT' },
  { domain: 'Stalled Infrastructure Projects', likelihood: 'HIGH', impact: 'MEDIUM', score: 6, owner: 'Highways & PWD', status: 'ESCALATED' },
  { domain: 'Cybersecurity Exposure', likelihood: 'MEDIUM', impact: 'HIGH', score: 7, owner: 'IT Dept', status: 'MONITORING' },
  { domain: 'Grievance SLA Breach', likelihood: 'LOW', impact: 'MEDIUM', score: 3, owner: 'CMO Cell', status: 'NORMAL' },
];

const LIKELIHOOD_COLOR: Record<string, string> = {
  HIGH: 'text-rose-400',
  MEDIUM: 'text-amber-400',
  LOW: 'text-emerald-400',
};

export const RiskIntelligenceView: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-200">
    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-slate-700 p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
        <AlertOctagon className="w-4 h-4" />
        <span>Executive Risk Intelligence</span>
      </div>
      <h1 className="text-2xl font-extrabold text-white">State Risk Matrix</h1>
      <p className="text-xs text-slate-300 mt-1">Cross-domain governance risk assessment with early warnings and telemetry.</p>
    </div>

    <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/50">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              {['Risk Domain', 'Likelihood', 'Impact', 'Score', 'Owner', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] uppercase font-bold text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RISK_MATRIX.map((r, i) => (
              <tr key={r.domain} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/50'}`}>
                <td className="px-4 py-3 text-white font-medium">{r.domain}</td>
                <td className={`px-4 py-3 font-bold ${LIKELIHOOD_COLOR[r.likelihood]}`}>{r.likelihood}</td>
                <td className={`px-4 py-3 font-bold ${LIKELIHOOD_COLOR[r.impact]}`}>{r.impact}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${r.score >= 7 ? 'text-rose-300 bg-rose-500/10' : r.score >= 5 ? 'text-amber-300 bg-amber-500/10' : 'text-emerald-300 bg-emerald-500/10'}`}>
                    {r.score}/9
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-300">{r.owner}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.status === 'ALERT' ? 'bg-rose-500/20 text-rose-300' : r.status === 'ESCALATED' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-400'}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

