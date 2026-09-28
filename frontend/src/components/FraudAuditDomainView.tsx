import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { ShieldAlert, AlertOctagon, FileSearch, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react';

export const FraudAuditDomainView: React.FC = () => {
  const { language } = useAuthStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/departments/fraud-audit')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setData(json);
      })
      .catch(() => {});
  }, []);

  const alerts = data?.alerts || [
    {
      id: 'fraud-001',
      scheme_or_tender: 'Rural Housing Scheme (Kalaignar Kanavu Illam)',
      department: 'Rural Development',
      district: 'Villupuram (VPM)',
      anomaly_type: 'DUPLICATE_DBT',
      risk_score: 0.92,
      flagged_amount_cr: 2.4,
      description_en: '14 duplicate beneficiary bank accounts flagged with identical Aadhaar hashing across 3 panchayats.',
      description_ta: '3 ஊராட்சிகளில் ஒரே ஆதார் மற்றும் வங்கி கணக்கு எண் கொண்ட 14 போலி பயனாளிகள் கண்டறியப்பட்டுள்ளனர்.',
      suggested_action_en: 'Freeze DBT payment dispatches and order biometric reverification by BDO.',
      suggested_action_ta: 'பரிவர்த்தனையை நிறுத்தி வைத்து, வட்டார வளர்ச்சி அலுவலர் மூலம் நேரடி சரிபார்ப்பு நடத்தவும்.',
    },
    {
      id: 'fraud-002',
      scheme_or_tender: 'State Highway Bridge Construction Tender',
      department: 'Highways Department',
      district: 'Salem (SLM)',
      anomaly_type: 'BID_COLLUSION',
      risk_score: 0.88,
      flagged_amount_cr: 14.5,
      description_en: '3 bidding contractor companies submitted tenders from the exact same corporate IP address within 8 minutes.',
      description_ta: '3 ஒப்பந்த நிறுவனங்கள் ஒரே இணையதள ஐபி முகவரியிலிருந்து 8 நிமிட இடைவெளியில் டெண்டர் சமர்ப்பித்துள்ளன.',
      suggested_action_en: 'Cancel tender round and initiate DVAC anti-corruption inquiry.',
      suggested_action_ta: 'டெண்டரை ரத்து செய்து லஞ்ச ஒழிப்புத்துறை விசாரணைக்கு உத்தரவிடவும்.',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Fraud Radar KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'AI தணிக்கை செய்யப்பட்ட நிதி' : 'AI Audited Outlay'}
          </span>
          <div className="text-2xl font-bold font-mono text-white">₹24,500 Cr</div>
          <div className="text-xs text-slate-400">100% Transactions Scanned by ML</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'கண்டறியப்பட்ட நிதி முரண்பாடு' : 'High-Risk Anomalies Flagged'}
          </span>
          <div className="text-2xl font-bold font-mono text-rose-400">₹16.9 Cr</div>
          <div className="text-xs text-rose-300 font-medium">2 Cases Intercepted Before Disbursement</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'தடுக்கப்பட்ட அரசு நிதி இழப்பு' : 'Cumulative Prevented Leakage'}
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">₹48.2 Cr</div>
          <div className="text-xs text-emerald-300">Direct state treasury savings</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'ஒப்பந்த சிண்டிகேட் கண்காணிப்பு' : 'Bid-Rigging Cartel Detection'}
          </span>
          <div className="text-2xl font-bold font-mono text-amber-400">Active (24/7)</div>
          <div className="text-xs text-slate-400">IP, Director & Bank Graph Linkage</div>
        </div>
      </div>

      {/* Fraud Anomaly Intervention Feed */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ta' ? 'AI தானியங்கி நிதி முறைக்கேடு கண்டறிதல் பட்டியல்' : 'Autonomous Fraud & Anomaly Interception List'}
            </h3>
          </div>
          <span className="text-[10px] text-rose-400 font-mono font-bold">
            Zero Tolerance Protocol
          </span>
        </div>

        <div className="space-y-4">
          {alerts.map((a: any) => (
            <div
              key={a.id}
              className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/60 space-y-3 hover:border-rose-500/80 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold">
                      {a.anomaly_type}
                    </span>
                    <h4 className="text-xs font-bold text-white">{a.scheme_or_tender}</h4>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {a.department} • {a.district}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Flagged Amount</div>
                    <div className="text-xs font-mono font-bold text-rose-400">₹{a.flagged_amount_cr} Cr</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-900/60 text-rose-200 text-xs font-mono font-bold">
                    {(a.risk_score * 100).toFixed(0)}% Risk Score
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {language === 'ta' ? a.description_ta : a.description_en}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-rose-900/40">
                <div className="text-[11px] text-amber-300 flex items-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'ta' ? a.suggested_action_ta : a.suggested_action_en}</span>
                </div>

                <button className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow flex items-center gap-1">
                  <span>Freeze & Order DVAC Probe</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
