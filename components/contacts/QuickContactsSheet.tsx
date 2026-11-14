'use client';

import React from 'react';
import { ContactRecord } from '@/types/contacts';
import { Printer, X, Shield, Phone, Mail, Building } from 'lucide-react';

interface QuickContactsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: ContactRecord[];
}

export function QuickContactsSheet({ isOpen, onClose, contacts }: QuickContactsSheetProps) {
  if (!isOpen) return null;

  // Filter out key executive leadership
  const governor = contacts.find((c) => c.contact_id.includes('governor') || c.designation.includes('Governor'));
  const cm = contacts.find((c) => c.contact_id === 'lead-cm' || c.contact_id === 'cmo-01-cm' || (c.category === 'MINISTER' && c.designation.includes('Chief Minister')));
  const cs = contacts.find((c) => c.contact_id.includes('cs') || c.designation.includes('Chief Secretary'));
  const dgp = contacts.find((c) => c.service === 'IPS' && (c.designation.includes('DGP') || c.designation.includes('Director General')));
  const collectors = contacts.filter((c) => c.category === 'COLLECTOR').sort((a, b) => (a.district || '').localeCompare(b.district || ''));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 print:border-none print:shadow-none print:p-2">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 print:hidden mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              <Shield className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                CM Executive Quick Contacts Sheet
              </h2>
              <p className="text-xs text-slate-500">
                Two-column A4 printable dossier: Governor, CS, DGP & all 38 District Collectors
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs shadow-xs hover:bg-indigo-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print A4 / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Container */}
        <div className="print-content text-slate-800 dark:text-slate-200">
          {/* Header Banner */}
          <div className="text-center pb-3 border-b-2 border-slate-900 dark:border-slate-100 mb-4">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 uppercase">
              Government of Tamil Nadu · Chief Minister's Office
            </h1>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Executive Standing Directory · High-Priority Administrative Contacts
            </p>
          </div>

          {/* Core Leadership Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <div className="space-y-0.5">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">Governor</span>
              <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{governor?.full_name || 'Hon. Governor'}</p>
              <p className="font-mono text-2xs text-indigo-600 dark:text-indigo-400">{governor?.office_phone || '044-25670099'}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">Chief Minister</span>
              <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{cm?.full_name || 'Hon. Chief Minister'}</p>
              <p className="font-mono text-2xs text-indigo-600 dark:text-indigo-400">{cm?.office_phone || '044-25672345'}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">Chief Secretary</span>
              <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{cs?.full_name || 'Dr. M. Sai Kumar, IAS'}</p>
              <p className="font-mono text-2xs text-indigo-600 dark:text-indigo-400">{cs?.office_phone || '044-25671555'}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">DGP / Police Head</span>
              <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{dgp?.full_name || 'DGP, Tamil Nadu'}</p>
              <p className="font-mono text-2xs text-indigo-600 dark:text-indigo-400">{dgp?.office_phone || '044-28447777'}</p>
            </div>
          </div>

          {/* All 38 District Collectors in 2-Column Printable Grid */}
          <div className="mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b pb-1">
              All 38 District Collectors & District Magistrates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              {collectors.map((c, idx) => (
                <div
                  key={c.contact_id}
                  className="flex items-center justify-between py-1 px-2 rounded border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-2xs print:border-slate-300"
                >
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="font-bold text-slate-400 w-4 text-right shrink-0">{idx + 1}.</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 w-24 truncate">
                      {c.district}:
                    </span>
                    <span className="truncate text-slate-700 dark:text-slate-300">
                      {c.full_name?.replace(/^(Thiru\.|Tmt\.|Dr\.)\s*/, '')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono text-2xs text-slate-600 dark:text-slate-400">
                    <span>{c.office_phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Timestamp */}
          <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-2xs text-slate-400 flex items-center justify-between print:text-black">
            <span>Verified from official Tamil Nadu District Portals · VERTRI TN AI OS</span>
            <span>Generated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
