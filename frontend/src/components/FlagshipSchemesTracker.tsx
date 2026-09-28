import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { FlagshipScheme } from '../types';
import { Layers, CheckCircle2, TrendingUp, IndianRupee } from 'lucide-react';

interface Props {
  schemes: FlagshipScheme[];
}

export const FlagshipSchemesTracker: React.FC<Props> = ({ schemes }) => {
  const { language } = useAuthStore();

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/90 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            {language === 'ta' ? 'அரசின் முக்கிய மக்கள் நலத்திட்டங்கள்' : 'Flagship Welfare Scheme Saturation'}
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {language === 'ta' ? 'நிகழ்நேர நிதி வழங்கல்' : 'Real-Time DBT Delivery'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {schemes.map((s) => (
          <div
            key={s.code}
            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xs font-bold text-slate-100 line-clamp-2">
                {language === 'ta' ? s.nameTa : s.nameEn}
              </h3>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold font-mono">
                {s.saturationPercent.toFixed(1)}%
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-mono text-slate-200">
                <IndianRupee className="w-3 h-3 text-amber-400" />
                ₹{s.budgetCr.toLocaleString()} Cr Outlay
              </span>
              <span className="font-mono text-slate-300 font-semibold">
                {(s.beneficiariesCount / 100000).toFixed(2)} Lakh Beneficiaries
              </span>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(s.saturationPercent, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
