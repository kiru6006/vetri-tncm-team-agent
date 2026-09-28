import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Activity, AlertTriangle, CheckCircle2, HeartPulse, Building2, Pill, ShieldAlert, ArrowUpRight } from 'lucide-react';

export const HealthDomainView: React.FC = () => {
  const { language } = useAuthStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/departments/health')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setData(json);
      })
      .catch(() => {});
  }, []);

  const drugs = data?.critical_drugs || [
    { drug_code: 'DRUG-014', name_en: 'Anti-D Immunoglobulin (300 mcg)', name_ta: 'ஆன்டி-டி இம்யூனோகுளோபுலின் ஊசி', category: 'Maternal Emergency', stock_status: 'CRITICAL_STOCKOUT', stock_days_remaining: 4, buffer_warehouse_dist: 'Madurai (GRH)' },
    { drug_code: 'DRUG-082', name_en: 'Injection Oxytocin (10 IU)', name_ta: 'ஆக்சிடோசின் ஊசி', category: 'Maternal Health', stock_status: 'HEALTHY', stock_days_remaining: 45, buffer_warehouse_dist: 'Chennai Central' },
    { drug_code: 'DRUG-105', name_en: 'Oral Rehydration Salts (ORS)', name_ta: 'உயிர் காக்கும் உப்பு கரைசல்', category: 'Epidemic Care', stock_status: 'HEALTHY', stock_days_remaining: 60, buffer_warehouse_dist: 'Tiruchirappalli' },
    { drug_code: 'DRUG-201', name_en: 'Metformin Hydrochloride (500mg)', name_ta: 'மெட்பார்மின் மாத்திரைகள்', category: 'Doorstep Healthcare', stock_status: 'HEALTHY', stock_days_remaining: 52, buffer_warehouse_dist: 'Coimbatore' },
  ];

  const hospitals = data?.major_hospitals || [
    { hospital_name: 'Rajiv Gandhi Govt General Hospital (RGGGH)', district: 'Chennai', total_beds: 2850, occupied_beds: 2480, occupancy_pct: 87.0, icu_available: 42 },
    { hospital_name: 'Govt Rajaji Hospital (GRH)', district: 'Madurai', total_beds: 2400, occupied_beds: 2190, occupancy_pct: 91.2, icu_available: 18 },
    { hospital_name: 'Coimbatore Medical College Hospital (CMCH)', district: 'Coimbatore', total_beds: 1800, occupied_beds: 1530, occupancy_pct: 85.0, icu_available: 28 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Health KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'ஆரம்ப சுகாதார நிலைய வருகை' : 'PHC Doctor Attendance'}
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">98.5%</div>
          <div className="text-xs text-slate-400">Biometric verified across 2,286 PHCs</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'மக்களைத் தேடி மருத்துவம்' : 'Doorstep Health (MTM)'}
          </span>
          <div className="text-2xl font-bold font-mono text-cyan-400">1.04 Cr</div>
          <div className="text-xs text-slate-400">Direct doorstep beneficiaries covered</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'TNMSC மருந்து இருப்பு எச்சரிக்கை' : 'TNMSC Drug Stockouts Flagged'}
          </span>
          <div className="text-2xl font-bold font-mono text-rose-400">1 Critical</div>
          <div className="text-xs text-rose-300 font-medium">Madurai GRH buffer below 5 days</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'தொற்றுநோய் ஆபத்து நிலை' : 'State Epidemic Risk'}
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">LOW (Green)</div>
          <div className="text-xs text-slate-400">Zero active viral outbreak clusters</div>
        </div>
      </div>

      {/* TNMSC Drug Inventory & Major Hospital ICU Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Drug Buffer Radar */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ta' ? 'TNMSC அத்தியாவசிய மருந்து கையிருப்பு ரேடார்' : 'TNMSC Essential Drug Buffer Inventory'}
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              300+ Monitored Drugs
            </span>
          </div>

          <div className="space-y-3">
            {drugs.map((d: any) => {
              const isStockout = d.stock_status === 'CRITICAL_STOCKOUT';
              return (
                <div
                  key={d.drug_code}
                  className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                    isStockout
                      ? 'bg-rose-950/30 border-rose-800/60'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {d.drug_code}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {language === 'ta' ? d.name_ta : d.name_en}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {d.category} • Depot: {d.buffer_warehouse_dist}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Buffer Remaining</div>
                      <div
                        className={`text-xs font-mono font-bold ${
                          isStockout ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {d.stock_days_remaining} Days
                      </div>
                    </div>
                    {isStockout && (
                      <button className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] transition-all flex items-center gap-1">
                        <span>Dispatch Restock</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Major Hospital Occupancy & ICU Beds */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ta' ? 'அரசு மருத்துவக் கல்லூரி படுக்கைகள்' : 'Medical College Bed Occupancy'}
              </h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">100% Oxygen Supply</span>
          </div>

          <div className="space-y-3">
            {hospitals.map((h: any) => (
              <div key={h.hospital_name} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100">{h.hospital_name}</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">{h.occupancy_pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${h.occupancy_pct}%` }} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Total Beds: {h.total_beds.toLocaleString()}</span>
                  <span className="text-emerald-300 font-semibold">{h.icu_available} ICU Beds Free</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
