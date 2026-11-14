import React from 'react';
import { ContactRecord, UserRole } from '@/types/contacts';
import { VerificationBadge } from './VerificationBadge';
import { canSeeContact, logContactReveal } from '@/lib/contacts/permissions';
import { exportContactToVCard, triggerDownload } from '@/lib/contacts/export';
import {
  X,
  Phone,
  Mail,
  Building2,
  MapPin,
  ExternalLink,
  Download,
  Calendar,
  FileText,
  AlertTriangle,
  Lock,
} from 'lucide-react';

interface ContactDetailSheetProps {
  contact: ContactRecord | null;
  onClose: () => void;
  userRole: UserRole;
}

export function ContactDetailSheet({ contact, onClose, userRole }: ContactDetailSheetProps) {
  if (!contact) return null;

  const canViewEmail = canSeeContact({ user_id: 'active', name: '', role: userRole }, contact, 'email');
  const canViewPhone = canSeeContact({ user_id: 'active', name: '', role: userRole }, contact, 'phone');

  const handleExportVCard = () => {
    const vcard = exportContactToVCard(contact, userRole);
    triggerDownload(vcard, `${contact.contact_id}.vcf`, 'text/vcard');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-detail-title"
      className="fixed inset-0 z-50 bg-black/50 flex justify-end transition-opacity backdrop-blur-2xs"
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-2xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Official Directory Record
              </span>
              <h2 id="contact-detail-title" className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {contact.full_name || contact.designation}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{contact.designation}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close detail sheet"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Verification Status & Conflicts */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Data Integrity & Status:</span>
              <VerificationBadge status={contact.verification_status} notes={contact.notes} />
            </div>
            <div className="text-2xs text-slate-500 space-y-0.5">
              <p>
                <strong>Record ID:</strong> <code className="font-mono">{contact.contact_id}</code>
              </p>
              <p>
                <strong>Last Verified On:</strong> {contact.verified_on}
              </p>
            </div>

            {contact.verification_status === 'CONFLICTED' && (
              <div className="mt-2 p-2 bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 rounded-lg text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Conflict Note:</strong> {contact.notes || 'Conflicting official sources disagree on this posting.'}
                </div>
              </div>
            )}
          </div>

          {/* Core Information Details */}
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-2xs text-slate-400">
              Administrative Posting Details
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-2xs">Category</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{contact.category}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-2xs">Service Cadre</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{contact.service || 'State Service'}</span>
              </div>
            </div>

            {contact.portfolio && (
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-2xs">Ministerial Portfolio</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {contact.portfolio}
                </span>
              </div>
            )}

            {contact.department && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-2xs">Department</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{contact.department}</span>
                </div>
              </div>
            )}

            {contact.district && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-2xs">District Jurisdiction</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{contact.district}</span>
                </div>
              </div>
            )}

            {contact.office_address && (
              <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-2xs">Official Address</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 leading-normal">
                    {contact.office_address}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Official Communication Coordinates */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-2xs text-slate-400">
              Communication Channels
            </h3>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 space-y-2.5">
              {/* Phone */}
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Office Phone:
                </span>
                {!canViewPhone ? (
                  <span className="text-slate-400 italic flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Restricted for {userRole}
                  </span>
                ) : contact.office_phone ? (
                  <a
                    href={`tel:${contact.office_phone}`}
                    onClick={() => logContactReveal('ui-user', contact.contact_id, 'phone')}
                    className="font-mono font-medium text-indigo-600 hover:underline"
                  >
                    {contact.office_phone}
                  </a>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 text-2xs font-mono">
                    NOT_PUBLICLY_AVAILABLE
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Official Email:
                </span>
                {!canViewEmail ? (
                  <span className="text-slate-400 italic flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Restricted for {userRole}
                  </span>
                ) : contact.office_email ? (
                  <a
                    href={`mailto:${contact.office_email}`}
                    onClick={() => logContactReveal('ui-user', contact.contact_id, 'email')}
                    className="font-mono font-medium text-indigo-600 hover:underline"
                  >
                    {contact.office_email}
                  </a>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 text-2xs font-mono">
                    NOT_PUBLICLY_AVAILABLE
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Legal Source Metadata Table */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-2xs text-slate-400">
              Legal Source & Provenance
            </h3>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5 text-2xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Document/Title:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{contact.source_title}</span>
              </div>
              {contact.source_date && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Publication Date:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{contact.source_date}</span>
                </div>
              )}
              {contact.notes && (
                <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 block">Verification Notes:</span>
                  <span className="text-slate-700 dark:text-slate-300 italic">{contact.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <a
            href={contact.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Official Source</span>
          </a>
          <button
            onClick={handleExportVCard}
            className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export vCard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
