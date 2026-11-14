'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ContactsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
        Error Loading Directory Records
      </h2>
      <p className="text-sm text-slate-500 max-w-md mb-4">
        {error.message || 'An unexpected error occurred while parsing official government directory records.'}
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium text-xs hover:bg-indigo-700 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
