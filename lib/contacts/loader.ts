import { ContactRecord, Category } from '@/types/contacts';

import ministersData from '@/data/contacts/ministers.json';
import chiefSecretaryData from '@/data/contacts/chief_secretary.json';
import stateLeadershipData from '@/data/contacts/state_leadership.json';
import mlasData from '@/data/contacts/mlas.json';
import mpsData from '@/data/contacts/rajya_sabha_mps.json';
import secretariatData from '@/data/contacts/secretariat.json';
import iasData from '@/data/contacts/ias.json';
import ipsData from '@/data/contacts/ips.json';
import ifosData from '@/data/contacts/ifos.json';
import collectorsData from '@/data/contacts/district_collectors.json';
import droData from '@/data/contacts/dro.json';
import deptHeadsData from '@/data/contacts/department_heads.json';
import undertakingsData from '@/data/contacts/undertakings.json';
import municipalData from '@/data/contacts/municipal.json';
import otherData from '@/data/contacts/other.json';

const rawDataArrays = [
  stateLeadershipData,
  ministersData,
  mlasData,
  mpsData,
  collectorsData,
  secretariatData,
  deptHeadsData,
  undertakingsData,
  chiefSecretaryData,
  iasData,
  ipsData,
  ifosData,
  droData,
  municipalData,
  otherData,
];

// Validate all raw records with Zod ContactRecord schema
let validatedContactsCache: ContactRecord[] | null = null;
let byIdCache: Map<string, ContactRecord> | null = null;
let byCategoryCache: Map<Category, ContactRecord[]> | null = null;
let byDistrictCache: Map<string, ContactRecord[]> | null = null;
let byDepartmentCache: Map<string, ContactRecord[]> | null = null;

function initializeIndices() {
  if (validatedContactsCache) return;

  const contacts: ContactRecord[] = [];
  for (const rawArray of rawDataArrays) {
    if (Array.isArray(rawArray)) {
      for (const item of rawArray) {
        try {
          const parsed = ContactRecord.parse(item);
          contacts.push(parsed);
        } catch (err) {
          console.error(`Invalid contact record skipped [${(item as { contact_id?: string })?.contact_id}]:`, err);
        }
      }
    }
  }

  validatedContactsCache = contacts;
  byIdCache = new Map();
  byCategoryCache = new Map();
  byDistrictCache = new Map();
  byDepartmentCache = new Map();

  for (const contact of contacts) {
    byIdCache.set(contact.contact_id, contact);

    // By category
    const catList = byCategoryCache.get(contact.category) || [];
    catList.push(contact);
    byCategoryCache.set(contact.category, catList);

    // By district
    if (contact.district) {
      const distList = byDistrictCache.get(contact.district) || [];
      distList.push(contact);
      byDistrictCache.set(contact.district, distList);
    }

    // By department
    if (contact.department) {
      const deptList = byDepartmentCache.get(contact.department) || [];
      deptList.push(contact);
      byDepartmentCache.set(contact.department, deptList);
    }
  }
}

export function getAllContacts(): ContactRecord[] {
  initializeIndices();
  return validatedContactsCache || [];
}

export function getContactById(id: string): ContactRecord | undefined {
  initializeIndices();
  return byIdCache?.get(id);
}

export function getContactsByCategory(category: Category): ContactRecord[] {
  initializeIndices();
  return byCategoryCache?.get(category) || [];
}

export function getContactsByDistrict(district: string): ContactRecord[] {
  initializeIndices();
  return byDistrictCache?.get(district) || [];
}

export function getContactsByDepartment(department: string): ContactRecord[] {
  initializeIndices();
  return byDepartmentCache?.get(department) || [];
}

export function getIndices() {
  initializeIndices();
  return {
    byId: byIdCache || new Map(),
    byCategory: byCategoryCache || new Map(),
    byDistrict: byDistrictCache || new Map(),
    byDepartment: byDepartmentCache || new Map(),
  };
}

