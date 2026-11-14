import { useState, useEffect } from 'react';
import { ShieldAlert, X } from 'lucide-react';

interface DataQualityBannerProps {
  latestVerifiedDate: string;
}

export function DataQualityBanner({ latestVerifiedDate }: DataQualityBannerProps) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('vetri_quality_banner_dismissed');
      if (!isDismissed) {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('vetri_quality_banner_dismissed', 'true');
    } catch {
      // ignore in restricted environments
    }
  };

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Data Quality Notice"
      className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 px-4 py-2.5 rounded-lg mb-4 text-sm flex items-center justify-between shadow-xs transition-all"
    >
      <div className="flex items-center gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
        <span>
          <strong>Official Governance Directory Notice:</strong> This directory is verified from official Tamil Nadu Government gazettes, NIC portals, and department rosters as of{' '}
          <strong className="underline decoration-amber-400">{latestVerifiedDate || '2026-11-14'}</strong>. Contact details marked{' '}
          <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded text-xs">NOT_PUBLICLY_AVAILABLE</code> have not been released by the government.
        </span>
      </div>
      <button
        onClick={handleDismiss}
        className="p-1 rounded text-amber-700 dark:text-amber-400 hover:bg-amber-200/50 dark:hover:bg-amber-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Dismiss data quality notice"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

