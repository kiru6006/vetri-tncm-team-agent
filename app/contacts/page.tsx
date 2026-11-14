import React from 'react';
import { getAllContacts } from '@/lib/contacts/loader';
import { ContactDirectoryPage } from '@/components/contacts/ContactDirectoryPage';

export const metadata = {
  title: 'Government Contacts Directory | VERTRI TN AI OS',
  description: 'Verified official contacts directory of Tamil Nadu Government Ministers, IAS, IPS, IFoS, District Collectors, and Department Leadership.',
};

export default function ContactsPage() {
  const contacts = getAllContacts();

  const latestVerifiedDate = contacts.reduce((latest, c) => {
    if (!latest || c.verified_on > latest) return c.verified_on;
    return latest;
  }, '2026-11-14');

  return (
    <ContactDirectoryPage
      initialContacts={contacts}
      latestVerifiedDate={latestVerifiedDate}
    />
  );
}
