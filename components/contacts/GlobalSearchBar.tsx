import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command } from 'lucide-react';

interface GlobalSearchBarProps {
  value: string;
  onChange: (query: string) => void;
  filteredCount: number;
  totalCount: number;
  onReset: () => void;
}

export function GlobalSearchBar({
  value,
  onChange,
  filteredCount,
  totalCount,
  onReset,
}: GlobalSearchBarProps) {
  const [localQuery, setLocalQuery] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce input by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [localQuery, onChange]);

  // Sync external reset
  useEffect(() => {
    setLocalQuery(value);
  }, [value]);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full space-y-2">
      <div className="relative flex items-center w-full">
        <Search
          className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search by official name, designation, department, district, or email..."
          aria-label="Search government officials"
          className="w-full pl-10 pr-24 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
          {localQuery && (
            <button
              onClick={() => {
                setLocalQuery('');
                onChange('');
                onReset();
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-2xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            <Command className="w-3 h-3" /> K
          </kbd>
        </div>
      </div>

      {/* Result Count Status & Quick Reset */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          Showing <strong className="text-slate-800 dark:text-slate-200">{filteredCount}</strong> of{' '}
          <strong className="text-slate-800 dark:text-slate-200">{totalCount}</strong> official records
        </span>
        {(localQuery || filteredCount < totalCount) && (
          <button
            onClick={() => {
              setLocalQuery('');
              onChange('');
              onReset();
            }}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}

