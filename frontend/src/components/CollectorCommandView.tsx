import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { MapPin, Users, Activity, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const CollectorCommandView: React.FC = () => {
  const { language } = useAuthStore();

  const taluks = [
    { code: 'CBE_SOUTH', nameEn: 'Coimbatore South', nameTa: 'கோவை தெற்கு', score: 94.2, grievances: 4, waterMld: 28.5, phcAttendance: 99.2 },
    { code: 'POLLACHI', nameEn: 'Pollachi', nameTa: 'பொள்ளாச்சி', score: 91.8, grievances: 6, waterMld: 18.2, phcAttendance: 98.4 },
    { code: 'SULUR', nameEn: 'Sulur', nameTa: 'சூலூர்', score: 88.4, grievances: 8, waterMld: 14.1, phcAttendance: 97.5 },
    { code: 'METTUPALAYAM', nameEn: 'Mettupalayam', nameTa: 'மேட்டுப்பாளையம்', score: 86.5, grievances: 12, waterMld: 12.4, phcAttendance: 96.0 },
    { code: 'ANAIMALAI', nameEn: 'Anaimalai', nameTa: 'ஆனைமலை', score: 84.1, grievances: 14, waterMld: 9.8, phcAttendance: 95.2 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Collectorate Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-amber-950/40 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-bold text-blue-400">
            CBE
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              {language === 'ta' ? 'கோவை மாவட்ட ஆட்சியர் செயல்பாட்டு மையம்' : 'Coimbatore District Collector Command Center'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'ta' ? '5 தாலுகாக்கள் • 228 வருவாய் கிராமங்கள் • நிகழ்நேர கண்காணிப்பு' : '5 Taluks • 228 Revenue Villages • Real-time Field Telemetry'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
            District Rank #2 / 38
          </span>
        </div>
      </div>

      {/* Taluk Level Matrix */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          {language === 'ta' ? 'தாலுகா வாரியான செயல்திறன் பட்டியல்' : 'Taluk-by-Taluk Operational Scorecard'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taluks.map((t) => (
            <div
              key={t.code}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">
                  {language === 'ta' ? t.nameTa : t.nameEn}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono font-bold text-xs">
                  {t.score.toFixed(1)} / 100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800/80">
                <div>
                  <span className="text-slate-400">Pending Petitions:</span>
                  <div className="font-mono text-slate-200 font-semibold">{t.grievances}</div>
                </div>
                <div>
                  <span className="text-slate-400">Drinking Water:</span>
                  <div className="font-mono text-cyan-300 font-semibold">{t.waterMld} MLD</div>
                </div>
                <div>
                  <span className="text-slate-400">PHC Attendance:</span>
                  <div className="font-mono text-emerald-300 font-semibold">{t.phcAttendance}%</div>
                </div>
                <div>
                  <span className="text-slate-400">FPS Ration Shops:</span>
                  <div className="font-mono text-amber-300 font-semibold">100% Active</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
