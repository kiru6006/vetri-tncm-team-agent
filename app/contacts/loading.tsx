import React from 'react';

export default function ContactsLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="h-8 w-72 bg-slate-200 dark:bg-slate-800 rounded-lg mb-2" />
      <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded mb-8" />

      {/* Search and Tabs skeleton */}
      <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
      <div className="flex gap-2 mb-6 overflow-hidden">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0" />
        ))}
      </div>

      {/* Content grid skeleton */}
      <div className="flex gap-6">
        <div className="hidden md:block w-64 h-96 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

