import React from 'react';
import { VerificationStatus } from '@/types/contacts';
import { ShieldCheck, Clock, AlertTriangle, HelpCircle, History, EyeOff } from 'lucide-react';

interface VerificationBadgeProps {
  status: VerificationStatus;
  notes?: string | null;
  className?: string;
}

export function VerificationBadge({ status, notes, className = '' }: VerificationBadgeProps) {
  let badgeConfig = {
    label: 'Verified Current',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: ShieldCheck,
  };

  switch (status) {
    case 'VERIFIED_CURRENT':
      badgeConfig = {
        label: 'Verified Current',
        bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        icon: ShieldCheck,
      };
      break;
    case 'VERIFIED_HISTORICAL':
      badgeConfig = {
        label: 'Verified Historical',
        bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        icon: History,
      };
      break;
    case 'PENDING_VERIFICATION':
      badgeConfig = {
        label: 'Pending Verification',
        bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
        icon: HelpCircle,
      };
      break;
    case 'CONFLICTED':
      badgeConfig = {
        label: 'Conflicted Sources',
        bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700',
        icon: AlertTriangle,
      };
      break;
    case 'STALE':
      badgeConfig = {
        label: 'May be outdated',
        bg: 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700',
        icon: Clock,
      };
      break;
    case 'NOT_PUBLICLY_AVAILABLE':
      badgeConfig = {
        label: 'Not Published',
        bg: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700',
        icon: EyeOff,
      };
      break;
  }

  const Icon = badgeConfig.icon;
  const tooltipText = (status === 'CONFLICTED' || status === 'STALE') && notes ? notes : badgeConfig.label;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${badgeConfig.bg} ${className}`}
      title={tooltipText}
      aria-label={`Verification status: ${badgeConfig.label}. ${notes || ''}`}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      <span>{badgeConfig.label}</span>
    </span>
  );
}

