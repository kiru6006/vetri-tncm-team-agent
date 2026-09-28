import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Droplets, Sprout, TrendingUp, AlertTriangle, Layers, CheckCircle2 } from 'lucide-react';

export const WaterAgriDomainView: React.FC = () => {
  const { language } = useAuthStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/departments/water-agri')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setData(json);
      })
      .catch(() => {});
  }, []);

  const reservoirs = data?.reservoirs || [
    { dam_name_en: 'Mettur (Stanley Reservoir)', dam_name_ta: 'மேட்டூர் அணை', district: 'Salem', current_water_level_ft: 68.4, full_reservoir_level_ft: 120.0, current_storage_tmc: 31.2, max_storage_tmc: 93.4, capacity_pct: 33.4, inflow_cusecs: 12450, outflow_cusecs: 10000, status: 'COMFORTABLE' },
    { dam_name_en: 'Bhavanisagar Dam', dam_name_ta: 'பவானிசாகர் அணை', district: 'Erode', current_water_level_ft: 82.1, full_reservoir_level_ft: 105.0, current_storage_tmc: 18.4, max_storage_tmc: 32.8, capacity_pct: 56.1, inflow_cusecs: 2100, outflow_cusecs: 1800, status: 'COMFORTABLE' },
    { dam_name_en: 'Vaigai Dam', dam_name_ta: 'வைகை அணை', district: 'Theni', current_water_level_ft: 54.2, full_reservoir_level_ft: 71.0, current_storage_tmc: 2.8, max_storage_tmc: 6.1, capacity_pct: 45.9, inflow_cusecs: 850, outflow_cusecs: 600, status: 'MODERATE' },
    { dam_name_en: 'Amaravathi Dam', dam_name_ta: 'அமராவதி அணை', district: 'Tirupur', current_water_level_ft: 64.0, full_reservoir_level_ft: 90.0, current_storage_tmc: 2.1, max_storage_tmc: 4.0, capacity_pct: 52.5, inflow_cusecs: 450, outflow_cusecs: 400, status: 'COMFORTABLE' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Water & Agri KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'மேட்டூர் அணை நீர் மட்டம்' : 'Mettur Dam Storage Level'}
          </span>
          <div className="text-2xl font-bold font-mono text-cyan-400">68.4 Ft / 120 Ft</div>
          <div className="text-xs text-slate-400">Inflow: 12,450 Cusecs • Delta Discharge Active</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'குறுவை சாகுபடி பரப்பு' : 'Kuruvai Cultivation Area'}
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">3.85 Lakh Acres</div>
          <div className="text-xs text-slate-400">97.4% Target Cultivation Completed</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'நேரடி நெல் கொள்முதல் (DPC)' : 'Paddy Procurement (DPC)'}
          </span>
          <div className="text-2xl font-bold font-mono text-amber-400">18.5 Lakh MT</div>
          <div className="text-xs text-slate-400">₹4,250 Cr DBT Credited to Farmers within 48h</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'உரக் கையிருப்பு நிலை' : 'Fertilizer Buffer Stocks'}
          </span>
          <div className="text-2xl font-bold font-mono text-white">45,000 MT</div>
          <div className="text-xs text-amber-300 font-medium">Tiruvarur DAP buffer refilled today</div>
        </div>
      </div>

      {/* 15 Major Reservoir Telemetry Matrix */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ta' ? 'தமிழகத்தின் முக்கிய அணைகள் நேரலை நீர் இருப்பு' : 'Major Reservoirs Live Storage Telemetry (PWD/WRD)'}
            </h3>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">15 Connected Major Dams</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reservoirs.map((dam: any) => (
            <div key={dam.dam_name_en} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{language === 'ta' ? dam.dam_name_ta : dam.dam_name_en}</h4>
                  <div className="text-[10px] text-slate-400">{dam.district} District</div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 font-mono font-bold text-xs">
                  {dam.current_water_level_ft} Ft
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Storage: {dam.current_storage_tmc} TMC</span>
                  <span>Max: {dam.max_storage_tmc} TMC</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${dam.capacity_pct}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>Inflow: {dam.inflow_cusecs} cusecs</span>
                <span className="text-amber-300">Outflow: {dam.outflow_cusecs}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
