'use client';

import React, { useState, useMemo } from 'react';
import { ContactRecord, Category, UserRole } from '@/types/contacts';
import { filterContacts, ContactFilters } from '@/lib/contacts/filter';
import { useAuth } from '@/lib/contacts/useAuth';
import { GlobalSearchBar } from './GlobalSearchBar';
import { CategoryTabs, CATEGORY_TABS } from './CategoryTabs';
import { FilterSidebar, ActiveFilterState } from './FilterSidebar';
import { ContactCard } from './ContactCard';
import { ContactDetailSheet } from './ContactDetailSheet';
import { ExportMenu } from './ExportMenu';
import { DataQualityBanner } from './DataQualityBanner';
import { EmptyState } from './EmptyState';
import { Filter, UserCheck, Shield, Printer } from 'lucide-react';
import { QuickContactsSheet } from './QuickContactsSheet';

interface ContactDirectoryPageProps {
  initialContacts: ContactRecord[];
  latestVerifiedDate: string;
}

export function ContactDirectoryPage({
  initialContacts,
  latestVerifiedDate,
}: ContactDirectoryPageProps) {
  const { user, role, setRole } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [cabinetOnly, setCabinetOnly] = useState(false);
  const [groupByDistrict, setGroupByDistrict] = useState(false);
  const [quickSheetOpen, setQuickSheetOpen] = useState(false);
  const [filters, setFilters] = useState<ActiveFilterState>({
    department: [],
    district: [],
    service: [],
    status: [],
  });
  const [selectedContact, setSelectedContact] = useState<ContactRecord | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract unique filter options from datasets
  const availableDepartments = useMemo(() => {
    const set = new Set<string>();
    initialContacts.forEach((c) => {
      if (c.department) set.add(c.department);
    });
    return Array.from(set).sort();
  }, [initialContacts]);

  const availableDistricts = useMemo(() => {
    const set = new Set<string>();
    initialContacts.forEach((c) => {
      if (c.district) set.add(c.district);
    });
    return Array.from(set).sort();
  }, [initialContacts]);

  // Compute counts for each category tab
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialContacts.length };
    for (const tab of CATEGORY_TABS) {
      if (tab.id === 'all') continue;
      if (Array.isArray(tab.category)) {
        counts[tab.id] = initialContacts.filter((c) => (tab.category as Category[]).includes(c.category)).length;
      } else if (tab.category) {
        counts[tab.id] = initialContacts.filter((c) => c.category === tab.category).length;
      }
    }
    return counts;
  }, [initialContacts]);

  // Combined Filtering Pipeline
  const filteredContacts = useMemo(() => {
    // 1. Tab category filter
    let baseCategories: Category[] | undefined = undefined;
    const activeTabDef = CATEGORY_TABS.find((t) => t.id === activeTab);
    if (activeTabDef?.category) {
      baseCategories = Array.isArray(activeTabDef.category) ? activeTabDef.category : [activeTabDef.category];
    }

    const appliedFilters: ContactFilters = {
      category: baseCategories,
      department: filters.department.length > 0 ? filters.department : undefined,
      district: filters.district.length > 0 ? filters.district : undefined,
      service: filters.service.length > 0 ? filters.service : undefined,
      status: filters.status.length > 0 ? filters.status : undefined,
    };

    let result = filterContacts(initialContacts, searchQuery, appliedFilters);

    // Cabinet Only filter (Ministers tab)
    if (activeTab === 'ministers' && cabinetOnly) {
      result = result.filter((c) => {
        const des = (c.designation || '').toUpperCase();
        const notes = (c.notes || '').toUpperCase();
        return !des.includes('(FAC)') && !des.includes('I-C') && !notes.includes('(FAC)');
      });
    }

    // Group MLAs by District (MLAs tab)
    if (activeTab === 'mlas' && groupByDistrict) {
      result = [...result].sort((a, b) => {
        const da = a.district || a.portfolio || '';
        const db = b.district || b.portfolio || '';
        return da.localeCompare(db);
      });
    }

    return result;
  }, [initialContacts, searchQuery, activeTab, filters, cabinetOnly, groupByDistrict]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
    setCabinetOnly(false);
    setGroupByDistrict(false);
    setFilters({
      department: [],
      district: [],
      service: [],
      status: [],
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Top Breadcrumb & Header Bar */}
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                <Shield className="w-3 h-3" /> VERTRI TN AI OS
              </span>
              <span className="text-2xs text-slate-400">·</span>
              <span className="text-2xs font-semibold text-slate-500">Official Civil Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Government Contacts Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Verified from official Tamil Nadu Government Gazettes, NIC Who's Who, and Department Records
            </p>
          </div>

          {/* Right Header Metadata & Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* RBAC Role Switcher (For demonstration and evaluation) */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
              <label htmlFor="role-select" className="text-slate-500 font-medium text-2xs">
                Role:
              </label>
              <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer text-xs"
              >
                <option value="CM">CM (Full Access)</option>
                <option value="PS">PS (Executive)</option>
                <option value="SECRETARY">SECRETARY</option>
                <option value="ANALYST">ANALYST</option>
                <option value="READONLY">READONLY (Restricted)</option>
              </select>
            </div>

            {/* Quick Contacts Print Button */}
            <button
              onClick={() => setQuickSheetOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors shadow-2xs"
              title="Print one-page Quick Contacts Sheet for CM (A4 PDF)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>CM Quick Contacts (A4)</span>
            </button>

            <ExportMenu contacts={filteredContacts} userRole={role} />
          </div>
        </div>
      </header>

      {/* Dismissible Quality Banner */}
      <DataQualityBanner latestVerifiedDate={latestVerifiedDate} />

      {/* Global Search Bar */}
      <section className="mb-4" aria-label="Search directory">
        <GlobalSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          filteredCount={filteredContacts.length}
          totalCount={initialContacts.length}
          onReset={handleResetFilters}
        />
      </section>

      {/* Category Tabs & Mobile Filter Button */}
      <section className="mb-4 flex items-center justify-between gap-3" aria-label="Category tabs">
        <div className="flex-1 overflow-hidden">
          <CategoryTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            categoryCounts={categoryCounts}
          />
        </div>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0"
          aria-label="Open mobile filters"
        >
          <Filter className="w-3.5 h-3.5 text-indigo-500" />
          <span>Filters</span>
        </button>
      </section>

      {/* Contextual Sub-filters */}
      {activeTab === 'ministers' && (
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => setCabinetOnly(!cabinetOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              cabinetOnly
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Cabinet Only (Exclude FAC / In-Charge)</span>
            {cabinetOnly && <span className="text-2xs font-bold">✓ Active</span>}
          </button>
        </div>
      )}

      {activeTab === 'mlas' && (
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => setGroupByDistrict(!groupByDistrict)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              groupByDistrict
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Sort Constituencies by District</span>
            {groupByDistrict && <span className="text-2xs font-bold">✓ Active</span>}
          </button>
        </div>
      )}

      {/* Main Layout: Left Filter Rail + Results Grid */}
      <div className="flex items-start gap-6">
        <FilterSidebar
          availableDepartments={availableDepartments}
          availableDistricts={availableDistricts}
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          isOpenMobile={mobileFiltersOpen}
          onCloseMobile={() => setMobileFiltersOpen(false)}
        />

        {/* Results Area */}
        <main className="flex-1 w-full" aria-label="Officials directory results">
          {filteredContacts.length === 0 ? (
            <EmptyState onReset={handleResetFilters} query={searchQuery} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => (
                <ContactCard
                  key={contact.contact_id}
                  contact={contact}
                  userRole={role}
                  onOpenDetails={setSelectedContact}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Contact Record Detail Sheet */}
      <ContactDetailSheet
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        userRole={role}
      />

      {/* CM Quick Contacts Printable Sheet */}
      <QuickContactsSheet
        isOpen={quickSheetOpen}
        onClose={() => setQuickSheetOpen(false)}
        contacts={initialContacts}
      />
    </div>
  );
}

