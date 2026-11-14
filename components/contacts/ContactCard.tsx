import React, { useState } from 'react';
import { ContactRecord, UserRole } from '@/types/contacts';
import { VerificationBadge } from './VerificationBadge';
import { canSeeContact, logContactReveal } from '@/lib/contacts/permissions';
import { exportContactToVCard, triggerDownload } from '@/lib/contacts/export';
import {
  Phone,
  Mail,
  Building2,
  ExternalLink,
  MoreVertical,
  Copy,
  Check,
  Lock,
  Download,
  AlertCircle,
} from 'lucide-react';

interface ContactCardProps {
  contact: ContactRecord;
  userRole: UserRole;
  onOpenDetails: (contact: ContactRecord) => void;
}

export function ContactCard({ contact, userRole, onOpenDetails }: ContactCardProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const canViewEmail = canSeeContact({ user_id: 'active', name: '', role: userRole }, contact, 'email');
  const canViewPhone = canSeeContact({ user_id: 'active', name: '', role: userRole }, contact, 'phone');

  const getServiceBadgeStyle = (service?: string | null) => {
    const s = (service || '').toUpperCase();
    if (s.includes('IAS')) return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    if (s.includes('IPS')) return 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
    if (s.includes('IFOS') || s.includes('IFS')) return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    if (s.includes('IRS')) return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'GO';
    return name
      .replace(/^(Dr\.|Thiru\.|Tmt\.|Mrs\.|Mr\.|Selvi)\s+/i, '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('');
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      logContactReveal('ui-user', contact.contact_id, 'email');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      logContactReveal('ui-user', contact.contact_id, 'phone');
    }
  };

  const handleExportVCard = () => {
    const vcard = exportContactToVCard(contact, userRole);
    triggerDownload(vcard, `${contact.contact_id}.vcf`, 'text/vcard');
  };

  return (
    <div
      tabIndex={0}
      role="article"
      aria-label={`Official Contact: ${contact.full_name || contact.designation}`}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-sm shrink-0">
            {getInitials(contact.full_name)}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
              {contact.full_name || 'Designation Only (Name Not Published)'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
              {contact.designation}
            </p>
          </div>
        </div>

        {/* Verification Status Badge */}
        <div className="shrink-0 flex items-center gap-1">
          <VerificationBadge status={contact.verification_status} notes={contact.notes} />
        </div>
      </div>

      {/* Chips Row: Service & Department/District */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
        {contact.service && (
          <span className={`px-2 py-0.5 rounded-md font-semibold border ${getServiceBadgeStyle(contact.service)}`}>
            {contact.service}
          </span>
        )}
        {contact.department && (
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium line-clamp-1 border border-slate-200 dark:border-slate-700">
            {contact.department}
          </span>
        )}
        {contact.district && (
          <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-800">
            {contact.district}
          </span>
        )}
      </div>

      {/* Communication Coordinates Row */}
      <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-3 border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
        {/* Office Phone */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            {!canViewPhone ? (
              <span className="flex items-center gap-1 text-slate-400 italic">
                <Lock className="w-3 h-3 text-slate-400" /> Restricted for {userRole}
              </span>
            ) : contact.office_phone ? (
              <a
                href={`tel:${contact.office_phone}`}
                className="hover:underline font-mono text-slate-800 dark:text-slate-200 truncate"
                onClick={() => logContactReveal('ui-user', contact.contact_id, 'phone')}
              >
                {contact.office_phone}
              </a>
            ) : (
              <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 text-2xs font-mono">
                NOT_PUBLICLY_AVAILABLE
              </span>
            )}
          </div>
          {canViewPhone && contact.office_phone && (
            <button
              onClick={() => handleCopy(contact.office_phone!, 'phone')}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              title="Copy phone"
              aria-label="Copy office phone"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Office Email */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            {!canViewEmail ? (
              <span className="flex items-center gap-1 text-slate-400 italic">
                <Lock className="w-3 h-3 text-slate-400" /> Restricted for {userRole}
              </span>
            ) : contact.office_email ? (
              <a
                href={`mailto:${contact.office_email}`}
                className="hover:underline font-mono text-slate-800 dark:text-slate-200 truncate"
                onClick={() => logContactReveal('ui-user', contact.contact_id, 'email')}
              >
                {contact.office_email}
              </a>
            ) : (
              <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 text-2xs font-mono">
                NOT_PUBLICLY_AVAILABLE
              </span>
            )}
          </div>
          {canViewEmail && contact.office_email && (
            <button
              onClick={() => handleCopy(contact.office_email!, 'email')}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              title="Copy email"
              aria-label="Copy office email"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Office Address / Name if available */}
        {contact.office_name && (
          <div className="flex items-center gap-2 text-slate-500 truncate">
            <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{contact.office_name}</span>
          </div>
        )}
      </div>

      {/* Conflict / Notes Alert if CONFLICTED */}
      {contact.verification_status === 'CONFLICTED' && (
        <div className="mb-2 p-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded text-2xs text-amber-800 dark:text-amber-200 flex items-start gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>{contact.notes || 'Conflicting official records reported.'}</span>
        </div>
      )}

      {/* Footer: Source Link, Date & Actions */}
      <div className="flex items-center justify-between text-2xs text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <a
            href={contact.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5 font-medium"
            aria-label={`Source citation for ${contact.full_name || contact.designation}: ${contact.source_title}`}
          >
            <span>Source</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <span>·</span>
          <span>Verified {contact.verified_on}</span>
        </div>

        {/* Actions Dropdown / Quick Trigger */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
            aria-label="More contact options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 bottom-full mb-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-20 text-xs text-slate-700 dark:text-slate-200"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenDetails(contact);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
              >
                <span>View Full Record Details</span>
              </button>
              {canViewEmail && contact.office_email && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleCopy(contact.office_email!, 'email');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Official Email</span>
                </button>
              )}
              {canViewPhone && contact.office_phone && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleCopy(contact.office_phone!, 'phone');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Phone Number</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleExportVCard();
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 border-t border-slate-100 dark:border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-indigo-500" />
                <span>Export vCard (.vcf)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

