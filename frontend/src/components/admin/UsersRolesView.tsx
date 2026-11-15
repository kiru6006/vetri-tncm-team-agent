import React from 'react';
import { Users } from 'lucide-react';

const RBAC_MATRIX = [
  { role: 'CHIEF_MINISTER', label: 'Chief Minister', view: true, export: true, book: true, adminUsers: true, auditRead: true },
  { role: 'CHIEF_SECRETARY', label: 'Chief Secretary', view: true, export: true, book: true, adminUsers: false, auditRead: true },
  { role: 'PRINCIPAL_SECRETARY', label: 'Principal Secretary', view: true, export: true, book: false, adminUsers: false, auditRead: false },
  { role: 'DISTRICT_COLLECTOR', label: 'District Collector', view: true, export: false, book: false, adminUsers: false, auditRead: false },
  { role: 'MINISTER', label: 'Minister', view: true, export: false, book: false, adminUsers: false, auditRead: false },
];

const Check = () => <span className="text-emerald-400 font-bold">✓</span>;
const Cross = () => <span className="text-slate-600 font-bold">–</span>;

export const UsersRolesView: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-200">
    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-700 p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
        <Users className="w-4 h-4" />
        <span>Identity &amp; Access</span>
      </div>
      <h1 className="text-2xl font-extrabold text-white">Users &amp; Roles (RBAC)</h1>
      <p className="text-xs text-slate-300 mt-1">Role-Based Access Control matrix across executive and administrative tiers.</p>
    </div>

    <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/50">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] uppercase font-bold text-slate-400">Role</th>
              <th className="px-4 py-3 text-center text-[10px] uppercase font-bold text-slate-400">View Data</th>
              <th className="px-4 py-3 text-center text-[10px] uppercase font-bold text-slate-400">Export</th>
              <th className="px-4 py-3 text-center text-[10px] uppercase font-bold text-slate-400">Book Calendar</th>
              <th className="px-4 py-3 text-center text-[10px] uppercase font-bold text-slate-400">Admin Users</th>
              <th className="px-4 py-3 text-center text-[10px] uppercase font-bold text-slate-400">Audit Logs</th>
            </tr>
          </thead>
          <tbody>
            {RBAC_MATRIX.map((r, i) => (
              <tr key={r.role} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/50'}`}>
                <td className="px-4 py-3">
                  <div className="font-bold text-white">{r.label}</div>
                  <div className="font-mono text-[10px] text-slate-500">{r.role}</div>
                </td>
                <td className="px-4 py-3 text-center">{r.view ? <Check /> : <Cross />}</td>
                <td className="px-4 py-3 text-center">{r.export ? <Check /> : <Cross />}</td>
                <td className="px-4 py-3 text-center">{r.book ? <Check /> : <Cross />}</td>
                <td className="px-4 py-3 text-center">{r.adminUsers ? <Check /> : <Cross />}</td>
                <td className="px-4 py-3 text-center">{r.auditRead ? <Check /> : <Cross />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

