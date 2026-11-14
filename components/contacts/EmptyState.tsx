import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  query?: string;
}

export function EmptyState({ onReset, query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 my-4">
      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 mb-3">
        <SearchX className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
        No verified officials found
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
        {query
          ? `We couldn't find any government official or department matching "${query}". Try adjusting your search keywords or clearing active category and district filters.`
          : 'No government officials match your current active filter combination. Click below to reset all filters.'}
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="Reset all search and filters"
      >
        <RotateCcw className="w-4 h-4" aria-hidden="true" />
        <span>Reset Search & Filters</span>
      </button>
    </div>
  );
}

