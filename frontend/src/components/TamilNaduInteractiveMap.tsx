import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { District } from '../types';
import { MapPin, ZoomIn, ZoomOut, Layers, Eye, Shield, Users, IndianRupee, AlertCircle } from 'lucide-react';

interface Props {
  districts: District[];
  onSelectDistrict: (district: District) => void;
}

export const TamilNaduInteractiveMap: React.FC<Props> = ({ districts, onSelectDistrict }) => {
  const { language } = useAuthStore();
  const [activeMetric, setActiveMetric] = useState<'score' | 'revenue' | 'grievance' | 'health'>('score');
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

  // Map coordinates normalizer for Tamil Nadu bounding box (Lat: 8.0 to 13.5 N, Lng: 76.2 to 80.4 E)
  const minLat = 8.0, maxLat = 13.5;
  const minLng = 76.2, maxLng = 80.4;

  const getDistrictColor = (d: District) => {
    if (activeMetric === 'score') {
      return d.performanceScore >= 88 ? '#10b981' : d.performanceScore >= 84 ? '#06b6d4' : '#ef4444';
    }
    if (activeMetric === 'revenue') {
      return d.revenueAchievementPct >= 102 ? '#10b981' : d.revenueAchievementPct >= 98 ? '#06b6d4' : '#ef4444';
    }
    if (activeMetric === 'grievance') {
      return d.pendingGrievances < 20 ? '#10b981' : d.pendingGrievances < 35 ? '#f59e0b' : '#ef4444';
    }
    return d.healthIndex >= 88 ? '#10b981' : d.healthIndex >= 82 ? '#06b6d4' : '#ef4444';
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/90 shadow-xl space-y-4">
      {/* Map Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            {language === 'ta' ? 'தமிழ்நாடு 38 மாவட்ட புவிசார் நுண்ணறிவு வரைபடம்' : 'Tamil Nadu 38-District GIS Spatial Intelligence'}
          </h2>
        </div>

        {/* Metric Layer Selectors */}
        <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
          <button
            onClick={() => setActiveMetric('score')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeMetric === 'score' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'ta' ? 'ஆளுமை குறியீடு' : 'State Health'}
          </button>
          <button
            onClick={() => setActiveMetric('revenue')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeMetric === 'revenue' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'ta' ? 'வரி வசூல் %' : 'Revenue %'}
          </button>
          <button
            onClick={() => setActiveMetric('grievance')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeMetric === 'grievance' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'ta' ? 'மனுக்கள் நிலுவை' : 'Grievances'}
          </button>
          <button
            onClick={() => setActiveMetric('health')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeMetric === 'health' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'ta' ? 'மருத்துவக் குறியீடு' : 'Public Health'}
          </button>
        </div>
      </div>

      {/* Map Visual & District Nodes Matrix */}
      <div className="relative w-full h-[520px] bg-slate-950/80 rounded-xl border border-slate-800/80 p-4 flex flex-col justify-between overflow-hidden">
        {/* SVG Spatial Canvas */}
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <defs>
            <linearGradient id="tnGrid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Background Spatial Grid Lines */}
          {[100, 200, 300, 400, 500, 600, 700].map((x) => (
            <line key={`x-${x}`} x1={x} y1="0" x2={x} y2="600" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
          ))}
          {[100, 200, 300, 400, 500].map((y) => (
            <line key={`y-${y}`} x1="0" y1={y} x2="800" y2={y} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
          ))}

          {/* Interactive District Geolocation Nodes */}
          {districts.map((d) => {
            const x = ((d.longitude - minLng) / (maxLng - minLng)) * 680 + 60;
            const y = (1 - (d.latitude - minLat) / (maxLat - minLat)) * 480 + 60;
            const color = getDistrictColor(d);
            const isHovered = hoveredDistrict?.code === d.code;

            return (
              <g
                key={d.code}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectDistrict(d)}
                onMouseEnter={() => setHoveredDistrict(d)}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                {/* Ripple ring for critical or active */}
                {isHovered && (
                  <circle cx={x} cy={y} r="24" fill={color} opacity="0.25" className="animate-ping" />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 14 : 9}
                  fill={color}
                  stroke="#07090e"
                  strokeWidth="2.5"
                  className="transition-all duration-300 shadow-xl drop-shadow"
                />
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize={isHovered ? "12" : "9"}
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow-md select-none font-sans"
                >
                  {language === 'ta' ? d.nameTa : d.nameEn}
                </text>
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  fill="#07090e"
                  fontSize="7"
                  fontWeight="bold"
                  className="pointer-events-none select-none font-mono"
                >
                  {d.code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hovered District Tooltip Overlay */}
        {hoveredDistrict && (
          <div className="absolute top-6 left-6 p-4 rounded-xl glass-card border border-slate-700 max-w-xs shadow-2xl animate-in fade-in space-y-2">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
              <span className="font-bold text-white text-xs">
                {language === 'ta' ? hoveredDistrict.nameTa : hoveredDistrict.nameEn} ({hoveredDistrict.code})
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                {hoveredDistrict.zone} Zone
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400">Collector:</span>
                <div className="font-medium text-slate-200 truncate">{hoveredDistrict.collectorName.split(',')[0]}</div>
              </div>
              <div>
                <span className="text-slate-400">Health Score:</span>
                <div className="font-mono font-bold text-emerald-400">{hoveredDistrict.performanceScore.toFixed(1)}/100</div>
              </div>
              <div>
                <span className="text-slate-400">Tax Revenue:</span>
                <div className="font-mono text-amber-400 font-bold">{hoveredDistrict.revenueAchievementPct}%</div>
              </div>
              <div>
                <span className="text-slate-400">Pending Petitions:</span>
                <div className="font-mono text-rose-400 font-bold">{hoveredDistrict.pendingGrievances}</div>
              </div>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-4 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Optimal / Healthy ({'>'}88)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <span>Normal / Attention (84-87)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Critical Deficit ({'<'}84)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
