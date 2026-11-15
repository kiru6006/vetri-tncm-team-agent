import React from 'react';

export type StatusVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'purple';

export interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const BADGE_STYLES: Record<StatusVariant, { bg: string; text: string; dot: string }> = {
  success: {
    bg: 'bg-emerald-500/15 border-emerald-500/30',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400'
  },
  warning: {
    bg: 'bg-amber-500/15 border-amber-500/30',
    text: 'text-amber-300',
    dot: 'bg-amber-400'
  },
  danger: {
    bg: 'bg-rose-500/15 border-rose-500/30',
    text: 'text-rose-300',
    dot: 'bg-rose-400'
  },
  info: {
    bg: 'bg-cyan-500/15 border-cyan-500/30',
    text: 'text-cyan-300',
    dot: 'bg-cyan-400'
  },
  purple: {
    bg: 'bg-purple-500/15 border-purple-500/30',
    text: 'text-purple-300',
    dot: 'bg-purple-400'
  },
  neutral: {
    bg: 'bg-slate-800 border-slate-700',
    text: 'text-slate-300',
    dot: 'bg-slate-400'
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className = ''
}) => {
  const styles = BADGE_STYLES[variant] || BADGE_STYLES.neutral;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold border uppercase tracking-wider ${sizeClasses} ${styles.bg} ${styles.text} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />}
      <span>{label}</span>
    </span>
  );
};

