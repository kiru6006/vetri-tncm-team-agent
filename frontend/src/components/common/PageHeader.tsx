import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badgeText,
  icon: Icon,
  actions,
  gradientFrom = 'from-slate-900',
  gradientTo = 'to-slate-900',
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-r ${gradientFrom} via-slate-950 ${gradientTo} border border-slate-700 p-5 sm:p-6 shadow-xl ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {badgeText && (
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              {Icon && <Icon className="w-4 h-4" />}
              <span>{badgeText}</span>
            </div>
          )}
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-slate-300 mt-1 max-w-3xl">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};

