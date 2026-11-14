import React, { useState } from 'react';
import { ContactRecord, UserRole } from '@/types/contacts';
import {
  exportContactsToCsv,
  exportContactsToVCardBundle,
  exportContactsToJson,
  triggerDownload,
} from '@/lib/contacts/export';
import { Download, ChevronDown, FileSpreadsheet, FileCode, Contact } from 'lucide-react';

interface ExportMenuProps {
  contacts: ContactRecord[];
  userRole: UserRole;
}

export function ExportMenu({ contacts, userRole }: ExportMenuProps) {
  const [open, setOpen] = useState(false);

  const handleExport = (format: 'csv' | 'vcard' | 'json') => {
    setOpen(false);
    const dateStr = new Date().toISOString().slice(0, 10);

    if (format === 'csv') {
      const csv = exportContactsToCsv(contacts, userRole);
      triggerDownload(csv, `tn_officials_${dateStr}.csv`, 'text/csv');
    } else if (format === 'vcard') {
      const vcards = exportContactsToVCardBundle(contacts, userRole);
      triggerDownload(vcards, `tn_officials_${dateStr}.vcf`, 'text/vcard');
    } else if (format === 'json') {
      const json = exportContactsToJson(contacts, userRole);
      triggerDownload(json, `tn_officials_${dateStr}.json`, 'application/json');
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Download className="w-3.5 h-3.5 text-indigo-500" />
        <span>Export</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1.5 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1 z-30 text-xs text-slate-700 dark:text-slate-200 animate-in fade-in-50 duration-100"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="px-3 py-1.5 text-2xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
            Export {contacts.length} Records
          </div>

          <button
            onClick={() => handleExport('csv')}
            className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-medium block">Export Filtered CSV</span>
              <span className="text-2xs text-slate-400">Spreadsheet ready (.csv)</span>
            </div>
          </button>

          <button
            onClick={() => handleExport('vcard')}
            className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors"
          >
            <Contact className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="font-medium block">Export Filtered vCards</span>
              <span className="text-2xs text-slate-400">Address book bundle (.vcf)</span>
            </div>
          </button>

          <button
            onClick={() => handleExport('json')}
            className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors border-t border-slate-100 dark:border-slate-700"
          >
            <FileCode className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="font-medium block">Export Filtered JSON</span>
              <span className="text-2xs text-slate-400">Raw validated records (.json)</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

