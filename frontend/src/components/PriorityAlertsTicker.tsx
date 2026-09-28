import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { PriorityAlert } from '../types';
import { AlertTriangle, AlertCircle, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';

interface Props {
  alerts: PriorityAlert[];
  onTriggerAction: (alert: PriorityAlert) => void;
}

export const PriorityAlertsTicker: React.FC<Props> = ({ alerts, onTriggerAction }) => {
  const { language } = useAuthStore();

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/90 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            {language === 'ta' ? 'உடனடி கவனப் பட்டியல் (AI கணிப்பு)' : 'Priority Intervention Feed (AI)'}
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold border border-rose-500/30">
          {alerts.length} {language === 'ta' ? 'எச்சரிக்கைகள்' : 'CRITICAL'}
        </span>
      </div>

      {/* Alert Feed Items */}
      <div className="space-y-3 pt-3 overflow-y-auto max-h-[380px] pr-1">
        {alerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          return (
            <div
              key={alert.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isCritical
                  ? 'bg-rose-950/20 border-rose-800/50 hover:border-rose-500/80 hover:bg-rose-950/30'
                  : 'bg-amber-950/20 border-amber-800/50 hover:border-amber-500/80 hover:bg-amber-950/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono font-bold text-amber-400 border border-slate-700">
                    {alert.districtCode}
                  </span>
                  <span className="text-xs font-bold text-slate-100">
                    {language === 'ta' ? alert.districtNameTa : alert.districtNameEn}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    isCritical ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {alert.severity}
                </span>
              </div>

              <h3 className="text-xs font-semibold text-slate-200 mb-1">
                {language === 'ta' ? alert.titleTa : alert.titleEn}
              </h3>

              <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
                {language === 'ta' ? alert.descriptionTa : alert.descriptionEn}
              </p>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <span className="text-[10px] text-cyan-400 font-medium flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட உத்தரவு:' : 'AI Recommended Action:'}
                </span>
                <button
                  onClick={() => onTriggerAction(alert)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold transition-all shadow-md active:scale-95"
                >
                  <span>{language === 'ta' ? 'உத்தரவு பிறப்பி' : 'Issue Directive'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
