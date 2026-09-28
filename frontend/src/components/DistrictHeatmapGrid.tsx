import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { District } from '../types';
import { Search, MapPin, Users, TrendingUp, AlertCircle, ChevronRight, Filter } from 'lucide-react';

interface Props {
  districts: District[];
  onSelectDistrict: (district: District) => void;
}

export const DistrictHeatmapGrid: React.FC<Props> = ({ districts, onSelectDistrict }) => {
  const { language } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState<string>('ALL');

  const filtered = districts.filter((d) => {
    const matchesSearch =
      d.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.nameTa.includes(searchTerm) ||
      d.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = zoneFilter === 'ALL' || d.zone.toUpperCase() === zoneFilter.toUpperCase();
    return matchesSearch && matchesZone;
  });

  const zones = ['ALL', 'NORTH', 'SOUTH', 'WEST', 'CENTRAL'];

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/90 shadow-xl space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            {language === 'ta' ? '38 மாவட்டங்கள் நேரலை செயல்திறன்' : '38-District Live Telemetry'}
          </h2>
          <span className="text-xs text-slate-400 font-mono">({filtered.length} Districts)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zone Filter */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs">
            {zones.map((z) => (
              <button
                key={z}
                onClick={() => setZoneFilter(z)}
                className={`px-2 py-1 rounded-md transition-all font-semibold text-[11px] ${
                  zoneFilter === z
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {z}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={language === 'ta' ? 'மாவட்டத்தைத் தேடு...' : 'Search district...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-44"
            />
          </div>
        </div>
      </div>

      {/* 38 Districts Responsive Card Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[440px] overflow-y-auto pr-1">
        {filtered.map((d) => {
          const isHealthy = d.performanceScore >= 88;
          const isAttention = d.performanceScore >= 84 && d.performanceScore < 88;
          return (
            <div
              key={d.code}
              onClick={() => onSelectDistrict(d)}
              className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 glass-card-hover ${
                isHealthy
                  ? 'border-emerald-900/40 bg-emerald-950/10 hover:border-emerald-500/80'
                  : isAttention
                  ? 'border-cyan-900/40 bg-cyan-950/10 hover:border-cyan-500/80'
                  : 'border-rose-900/40 bg-rose-950/10 hover:border-rose-500/80'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {d.code}
                </span>
                <span
                  className={`text-xs font-mono font-extrabold ${
                    isHealthy ? 'text-emerald-400' : isAttention ? 'text-cyan-400' : 'text-rose-400'
                  }`}
                >
                  {d.performanceScore.toFixed(1)}
                </span>
              </div>

              <div className="text-xs font-bold text-slate-100 truncate mb-0.5">
                {language === 'ta' ? d.nameTa : d.nameEn}
              </div>

              <div className="text-[10px] text-slate-400 truncate mb-2">
                {d.zone} Zone • {d.collectorName.split(',')[0]}
              </div>

              <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-800/80 text-slate-400 font-medium">
                <span>Grievances</span>
                <span
                  className={`font-mono font-bold ${
                    d.pendingGrievances > 30 ? 'text-rose-400' : 'text-slate-200'
                  }`}
                >
                  {d.pendingGrievances}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
