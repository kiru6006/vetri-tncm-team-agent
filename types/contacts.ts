import { z } from 'zod';

export const VerificationStatus = z.enum([
  'VERIFIED_CURRENT',
  'VERIFIED_HISTORICAL',
  'PENDING_VERIFICATION',
  'CONFLICTED',
  'STALE',
  'NOT_PUBLICLY_AVAILABLE',
]);

export type VerificationStatus = z.infer<typeof VerificationStatus>;

export const Category = z.enum([
  'MINISTER',
  'CHIEF_SECRETARY',
  'SECRETARIAT',
  'IAS',
  'IPS',
  'IFOS',
  'IRS',
  'COLLECTOR',
  'DRO',
  'SP',
  'DGP',
  'DEPT_HEAD',
  'MUNICIPAL_COMMISSIONER',
  'OTHER',
]);

export type Category = z.infer<typeof Category>;

export const ContactRecord = z.object({
  contact_id: z.string(),
  category: Category,
  full_name: z.string().nullable(),
  designation: z.string(),
  service: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  portfolio: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  office_name: z.string().optional().nullable(),
  office_email: z.string().nullable(),
  office_phone: z.string().nullable(),
  office_address: z.string().optional().nullable(),
  appointment_date: z.string().optional().nullable(),
  source_url: z.string().url(),
  source_title: z.string(),
  source_date: z.string().optional().nullable(),
  verified_on: z.string(),
  verification_status: VerificationStatus,
  notes: z.string().optional().nullable(),
  mobile: z.string().nullable().optional(),
});

export type ContactRecord = z.infer<typeof ContactRecord>;

export const SourceRecord = z.object({
  source_id: z.string(),
  url: z.string().url(),
  title: z.string(),
  authority: z.string(),
  last_checked: z.string(),
  notes: z.string().optional().nullable(),
});

export type SourceRecord = z.infer<typeof SourceRecord>;

export type UserRole = 'CM' | 'PS' | 'SECRETARY' | 'ANALYST' | 'READONLY';

export interface UserSession {
  user_id: string;
  name: string;
  role: UserRole;
  department?: string;
}
