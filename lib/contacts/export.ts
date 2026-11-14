import Papa from 'papaparse';
import { ContactRecord, UserRole } from '@/types/contacts';

export function exportContactsToCsv(contacts: ContactRecord[], userRole: UserRole): string {
  const isRestricted = userRole === 'READONLY';

  const rows = contacts.map((c) => ({
    contact_id: c.contact_id,
    full_name: c.full_name || 'Not published',
    designation: c.designation,
    department: c.department || '',
    district: c.district || '',
    office_email: isRestricted ? '[RESTRICTED]' : c.office_email || 'NOT_PUBLICLY_AVAILABLE',
    office_phone: isRestricted ? '[RESTRICTED]' : c.office_phone || 'NOT_PUBLICLY_AVAILABLE',
    verification_status: c.verification_status,
    verified_on: c.verified_on,
    source_url: c.source_url,
    source_title: c.source_title,
    notes: c.notes || '',
  }));

  return Papa.unparse(rows);
}

export function exportContactToVCard(contact: ContactRecord, userRole: UserRole): string {
  const isRestricted = userRole === 'READONLY';
  const name = contact.full_name || contact.designation;
  const email = isRestricted ? '' : contact.office_email || '';
  const phone = isRestricted ? '' : contact.office_phone || '';

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `UID:${contact.contact_id}`,
    `FN:${name}`,
    `TITLE:${contact.designation}`,
    contact.department ? `ORG:${contact.department};Tamil Nadu Government` : 'ORG:Tamil Nadu Government',
    email ? `EMAIL;TYPE=WORK,INTERNET:${email}` : '',
    phone ? `TEL;TYPE=WORK,VOICE:${phone}` : '',
    contact.office_address ? `ADR;TYPE=WORK:;;${contact.office_address};;;;` : '',
    `URL:${contact.source_url}`,
    `NOTE:Verified: ${contact.verified_on} (${contact.verification_status}). ${contact.notes || ''}`,
    'END:VCARD',
  ].filter(Boolean);

  return lines.join('\r\n');
}

export function exportContactsToVCardBundle(contacts: ContactRecord[], userRole: UserRole): string {
  return contacts.map((c) => exportContactToVCard(c, userRole)).join('\r\n\r\n');
}

export function exportContactsToJson(contacts: ContactRecord[], userRole: UserRole): string {
  const isRestricted = userRole === 'READONLY';

  const sanitized = contacts.map((c) => {
    if (!isRestricted) return c;
    return {
      ...c,
      office_email: '[RESTRICTED]',
      office_phone: '[RESTRICTED]',
      mobile: '[RESTRICTED]',
    };
  });

  return JSON.stringify(
    {
      exported_at: new Date().toISOString(),
      record_count: sanitized.length,
      access_level: userRole,
      data: sanitized,
    },
    null,
    2
  );
}

export function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
