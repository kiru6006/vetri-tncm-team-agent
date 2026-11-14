import { ContactRecord, UserRole, UserSession } from '@/types/contacts';

export function canSeeContact(
  user: UserSession | null | undefined,
  record: ContactRecord,
  field: 'email' | 'phone'
): boolean {
  if (!user) return false;

  const role: UserRole = user.role || 'READONLY';

  // 1. Full access for executive roles
  if (role === 'CM' || role === 'PS' || role === 'SECRETARY') {
    return true;
  }

  // 2. Analyst access restricted to currently verified records
  if (role === 'ANALYST') {
    return record.verification_status === 'VERIFIED_CURRENT';
  }

  // 3. READONLY role is strictly restricted from seeing emails and direct phone lines
  if (role === 'READONLY') {
    return false;
  }

  return false;
}

export async function logContactReveal(
  userId: string,
  contactId: string,
  field: 'email' | 'phone'
): Promise<void> {
  try {
    if (typeof window !== 'undefined') {
      await fetch('/api/audit/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          contact_id: contactId,
          field,
          timestamp: new Date().toISOString(),
        }),
      });
    }
  } catch (err) {
    console.warn('Audit reveal logging failure (non-blocking):', err);
  }
}

