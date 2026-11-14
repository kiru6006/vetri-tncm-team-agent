import React from 'react';
import { Category } from '@/types/contacts';

export interface CategoryTabItem {
  id: string;
  label: string;
  category?: Category | Category[];
}

export const CATEGORY_TABS: CategoryTabItem[] = [
  { id: 'all', label: 'All' },
  { id: 'ministers', label: 'Ministers', category: 'MINISTER' },
  { id: 'cs', label: 'Chief Secretary', category: 'CHIEF_SECRETARY' },
  { id: 'secretariat', label: 'Secretariat', category: 'SECRETARIAT' },
  { id: 'ias', label: 'IAS Officers', category: 'IAS' },
  { id: 'ips', label: 'IPS / DGP', category: ['IPS', 'DGP'] },
  { id: 'ifos', label: 'IFoS Forest', category: 'IFOS' },
  { id: 'collectors', label: 'Collectors', category: 'COLLECTOR' },
  { id: 'dros', label: 'DROs', category: 'DRO' },
  { id: 'sps', label: 'SPs', category: 'SP' },
  { id: 'dept_heads', label: 'Dept Heads', category: 'DEPT_HEAD' },
  { id: 'municipal', label: 'Municipal', category: 'MUNICIPAL_COMMISSIONER' },
];

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  categoryCounts: Record<string, number>;
}

export function CategoryTabs({ activeTab, onTabChange, categoryCounts }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter officials by government category"
      className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
    >
      {CATEGORY_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const count = categoryCounts[tab.id] ?? 0;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-2xs font-bold ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
