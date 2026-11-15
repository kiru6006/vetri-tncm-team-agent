import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: LucideIcon;
  variant?: 'default' | 'amber' | 'emerald' | 'cyan' | 'rose';
  className?: string;
}

const VARIANT_STYLES = {
  default: {
    border: 'border-slate-800',
    bg: 'bg-slate-900/60',
    iconBg: 'bg-slate-800 text-slate-300',
    valueText: 'text-white'
  },
  amber: {
    border: 'border-amber-500/20',
    bg: 'bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900',
    iconBg: 'bg-amber-500/10 text-amber-400',
    valueText: 'text-amber-300'
  },
  emerald: {
    border: 'border-emerald-500/20',
    bg: 'bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
    valueText: 'text-emerald-300'
  },
  cyan: {
    border: 'border-cyan-500/20',
    bg: 'bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900',
    iconBg: 'bg-cyan-500/10 text-cyan-400',
    valueText: 'text-cyan-300'
  },
  rose: {
    border: 'border-rose-500/20',
    bg: 'bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900',
    iconBg: 'bg-rose-500/10 text-rose-400',
    valueText: 'text-rose-300'
  }
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  trend,
  icon: Icon,
  variant = 'default',
  className = ''
}) => {
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.default;

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 transition-all ${styles.border} ${styles.bg} ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-bold tracking-wider text-slate-400">{label}</span>
        {Icon && (
          <div className={`p-2 rounded-xl ${styles.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className={`mt-2 font-extrabold text-xl sm:text-2xl font-mono ${styles.valueText}`}>
        {value}
      </div>
      {(subValue || trend) && (
        <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
          {subValue && <span>{subValue}</span>}
          {trend && (
            <span className={`font-mono font-bold ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

