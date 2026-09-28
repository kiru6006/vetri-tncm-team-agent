import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

export const GrievanceSlaAnalytics: React.FC = () => {
  const { language } = useAuthStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/executive/grievances-summary')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setData(json);
      })
      .catch(() => {});
  }, []);

  const categories = data?.categories || [
    { category_en: 'Drinking Water & Sanitation', category_ta: 'குடிநீர் மற்றும் துப்புரவு', total_received: 42150, resolved_count: 40890, pending_count: 1260, avg_resolution_days: 4.2, sla_compliance_pct: 97.0 },
    { category_en: 'Revenue Land Patta Transfer', category_ta: 'வருவாய்த்துறை பட்டா மாறுதல்', total_received: 38400, resolved_count: 36100, pending_count: 2300, avg_resolution_days: 8.6, sla_compliance_pct: 94.0 },
    { category_en: 'PDS Ration Card Issues', category_ta: 'ரேஷன் கார்டு சேவைகள்', total_received: 29800, resolved_count: 29200, pending_count: 600, avg_resolution_days: 2.8, sla_compliance_pct: 98.0 },
    { category_en: 'TANGEDCO Electricity Connections', category_ta: 'மின் இணைப்பு சேவைகள்', total_received: 21400, resolved_count: 20330, pending_count: 1070, avg_resolution_days: 5.1, sla_compliance_pct: 95.0 },
    { category_en: 'Rural Roads & Bridges Repair', category_ta: 'ஊரக சாலைகள் பழுது', total_received: 16500, resolved_count: 14850, pending_count: 1650, avg_resolution_days: 14.2, sla_compliance_pct: 90.0 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Grievance Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'மொத்த மனுக்கள் (முதல்வரின் முகவரி)' : 'Total CM Helpline Petitions'}
          </span>
          <div className="text-2xl font-bold font-mono text-white">1,48,250</div>
          <div className="text-xs text-slate-400">Integrated citizen helpline portal</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'தீர்க்கப்பட்ட விகிதம்' : 'Resolution Saturation Rate'}
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">95.4%</div>
          <div className="flex items-center gap-1 text-xs text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>1,41,370 Citizens Benefited</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'சராசரி தீர்வு காலம்' : 'Average Turnaround Speed'}
          </span>
          <div className="text-2xl font-bold font-mono text-cyan-400">6.2 Days</div>
          <div className="text-xs text-slate-400">Down from 18.5 days historically</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? '30 நாட்களுக்கு மேல் நிலுவை' : 'Critical Backlog (>30 Days)'}
          </span>
          <div className="text-2xl font-bold font-mono text-rose-400">184</div>
          <div className="text-xs text-rose-300 font-medium">Auto-escalated to Chief Secretary</div>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          {language === 'ta' ? 'துறை வாரியான மனுக்கள் தீர்வு நிலை' : 'Departmental Grievance SLA & Resolution Matrix'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Received</th>
                <th className="py-3 px-4">Resolved</th>
                <th className="py-3 px-4">Pending</th>
                <th className="py-3 px-4">Avg Speed</th>
                <th className="py-3 px-4">SLA Saturation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {categories.map((c: any, i: number) => (
                <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-100">
                    {language === 'ta' ? c.category_ta : c.category_en}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{c.total_received.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">{c.resolved_count.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-rose-400 font-semibold">{c.pending_count.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{c.avg_resolution_days} Days</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: `${c.sla_compliance_pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-slate-200">{c.sla_compliance_pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
