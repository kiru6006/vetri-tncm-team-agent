import React, { useState } from 'react';
import { VerificationStatus } from '@/types/contacts';
import { Filter, ChevronDown, ChevronUp, RotateCcw, X } from 'lucide-react';

export interface ActiveFilterState {
  department: string[];
  district: string[];
  service: string[];
  status: VerificationStatus[];
}

interface FilterSidebarProps {
  availableDepartments: string[];
  availableDistricts: string[];
  filters: ActiveFilterState;
  onChange: (newFilters: ActiveFilterState) => void;
  onReset: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const SERVICE_OPTIONS = ['IAS', 'IPS', 'IFoS', 'State'];
const STATUS_OPTIONS: { label: string; value: VerificationStatus }[] = [
  { label: 'Verified Current', value: 'VERIFIED_CURRENT' },
  { label: 'Verified Historical', value: 'VERIFIED_HISTORICAL' },
  { label: 'Pending Verification', value: 'PENDING_VERIFICATION' },
  { label: 'Conflicted Sources', value: 'CONFLICTED' },
  { label: 'May be Outdated', value: 'STALE' },
  { label: 'Not Publicly Published', value: 'NOT_PUBLICLY_AVAILABLE' },
];

export function FilterSidebar({
  availableDepartments,
  availableDistricts,
  filters,
  onChange,
  onReset,
  isOpenMobile,
  onCloseMobile,
}: FilterSidebarProps) {
  const [deptOpen, setDeptOpen] = useState(true);
  const [distOpen, setDistOpen] = useState(true);
  const [serviceOpen, setServiceOpen] = useState(true);
  const [statusOpen, setStatusOpen] = useState(true);

  const toggleArrayItem = <T extends string>(list: T[], item: T): T[] => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  const handleCheckbox = (
    key: keyof ActiveFilterState,
    value: string
  ) => {
    if (key === 'status') {
      const next = toggleArrayItem(filters.status, value as VerificationStatus);
      onChange({ ...filters, status: next });
    } else {
      const next = toggleArrayItem(filters[key] as string[], value);
      onChange({ ...filters, [key]: next });
    }
  };

  const content = (
    <div className="space-y-4 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-2xs">
          <Filter className="w-3.5 h-3.5 text-indigo-500" />
          <span>Filter Officials</span>
        </div>
        <button
          onClick={onReset}
          className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium text-2xs"
          aria-label="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Service Cadre Filter */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <button
          onClick={() => setServiceOpen(!serviceOpen)}
          className="w-full flex items-center justify-between py-1 font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors"
        >
          <span>Service Cadre</span>
          {serviceOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {serviceOpen && (
          <div className="mt-2 space-y-1.5 pl-0.5">
            {SERVICE_OPTIONS.map((srv) => (
              <label key={srv} className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.service.includes(srv)}
                  onChange={() => handleCheckbox('service', srv)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span>{srv}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 2. Verification Status Filter */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <button
          onClick={() => setStatusOpen(!statusOpen)}
          className="w-full flex items-center justify-between py-1 font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors"
        >
          <span>Verification Status</span>
          {statusOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {statusOpen && (
          <div className="mt-2 space-y-1.5 pl-0.5">
            {STATUS_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.status.includes(opt.value)}
                  onChange={() => handleCheckbox('status', opt.value)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. District Jurisdiction Filter */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <button
          onClick={() => setDistOpen(!distOpen)}
          className="w-full flex items-center justify-between py-1 font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors"
        >
          <span>District Jurisdiction ({availableDistricts.length})</span>
          {distOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {distOpen && (
          <div className="mt-2 max-h-48 overflow-y-auto space-y-1.5 pl-0.5 scrollbar-thin">
            {availableDistricts.map((dist) => (
              <label key={dist} className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.district.includes(dist)}
                  onChange={() => handleCheckbox('district', dist)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span>{dist}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Department Filter */}
      <div className="pb-1">
        <button
          onClick={() => setDeptOpen(!deptOpen)}
          className="w-full flex items-center justify-between py-1 font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors"
        >
          <span>Department ({availableDepartments.length})</span>
          {deptOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {deptOpen && (
          <div className="mt-2 max-h-48 overflow-y-auto space-y-1.5 pl-0.5 scrollbar-thin">
            {availableDepartments.map((dept) => (
              <label key={dept} className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.department.includes(dept)}
                  onChange={() => handleCheckbox('department', dept)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span className="truncate">{dept}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Left Rail */}
      <aside
        aria-label="Filter directory records"
        className="hidden md:block w-64 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 h-fit sticky top-20 shadow-2xs"
      >
        {content}
      </aside>

      {/* Mobile Sheet / Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 flex justify-end">
          <div className="w-80 max-w-[85%] bg-white dark:bg-slate-900 h-full p-5 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-slate-100">Filter Directory</span>
                <button
                  onClick={onCloseMobile}
                  className="p-1 rounded text-slate-400 hover:text-slate-700"
                  aria-label="Close filters drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>
            <button
              onClick={onCloseMobile}
              className="mt-6 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
