import Fuse from 'fuse.js';
import { ContactRecord, Category, VerificationStatus } from '@/types/contacts';

export interface ContactFilters {
  category?: Category[];
  ministry?: string[];
  department?: string[];
  district?: string[];
  service?: string[];
  rank?: string[];
  status?: VerificationStatus[];
}

const CATEGORY_PRIORITY: Record<Category, number> = {
  STATE_LEADERSHIP: 1,
  CHIEF_SECRETARY: 2,
  MINISTER: 3,
  MLA: 4,
  MP: 5,
  SECRETARIAT: 6,
  COLLECTOR: 7,
  HOD: 8,
  DEPT_HEAD: 9,
  UNDERTAKING: 10,
  IAS: 11,
  IPS: 12,
  DGP: 13,
  SP: 14,
  IFOS: 15,
  IRS: 16,
  DRO: 17,
  MUNICIPAL_COMMISSIONER: 18,
  OTHER: 19,
};

export function filterContacts(
  contacts: ContactRecord[],
  q: string,
  filters: ContactFilters = {}
): ContactRecord[] {
  let result = [...contacts];

  // 1. Text Search (Fuzzy with Fuse.js if q is present)
  const trimmedQuery = q.trim();
  if (trimmedQuery.length > 0) {
    const fuse = new Fuse(result, {
      keys: [
        { name: 'full_name', weight: 0.35 },
        { name: 'designation', weight: 0.25 },
        { name: 'department', weight: 0.15 },
        { name: 'district', weight: 0.15 },
        { name: 'office_email', weight: 0.10 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });

    const searchResults = fuse.search(trimmedQuery);
    result = searchResults.map((item) => item.item);
  }

  // 2. Structured Multi-Filters (AND-combined across groups, OR-combined within group)
  if (filters.category && filters.category.length > 0) {
    const allowed = new Set(filters.category);
    result = result.filter((item) => allowed.has(item.category));
  }

  if (filters.department && filters.department.length > 0) {
    const allowed = new Set(filters.department);
    result = result.filter((item) => item.department && allowed.has(item.department));
  }

  if (filters.district && filters.district.length > 0) {
    const allowed = new Set(filters.district);
    result = result.filter((item) => item.district && allowed.has(item.district));
  }

  if (filters.service && filters.service.length > 0) {
    const allowed = new Set(filters.service.map((s) => s.toUpperCase()));
    result = result.filter((item) => {
      const s = item.service ? item.service.toUpperCase() : 'STATE';
      return allowed.has(s);
    });
  }

  if (filters.status && filters.status.length > 0) {
    const allowed = new Set(filters.status);
    result = result.filter((item) => allowed.has(item.verification_status));
  }

  // 3. Sort Default: Category priority, then alphabetical by full_name (with CM first)
  result.sort((a, b) => {
    // Special case for Chief Minister
    const isACM = a.designation.toLowerCase().includes('chief minister');
    const isBCM = b.designation.toLowerCase().includes('chief minister');
    if (isACM && !isBCM) return -1;
    if (!isACM && isBCM) return 1;

    const prioA = CATEGORY_PRIORITY[a.category] ?? 99;
    const prioB = CATEGORY_PRIORITY[b.category] ?? 99;
    if (prioA !== prioB) {
      return prioA - prioB;
    }

    const nameA = a.full_name || a.designation || '';
    const nameB = b.full_name || b.designation || '';
    return nameA.localeCompare(nameB);
  });

  return result;
}

