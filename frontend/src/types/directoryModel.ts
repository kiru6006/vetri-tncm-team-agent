export type VerificationStatus = 
  | 'VERIFIED_CURRENT'
  | 'VERIFIED_HISTORICAL'
  | 'PENDING_VERIFICATION'
  | 'CONFLICTED'
  | 'STALE'
  | 'SIMULATED';

export interface Person {
  person_id: string;
  full_name: string;
  name_tamil: string;
  service: 'IAS' | 'IPS' | 'IFS' | 'IRS' | 'STATE_EXECUTIVE' | 'MINISTER' | 'MLA' | 'JUDICIARY';
  cadre: string;
  batch?: number;
  official_photo?: string;
  identity_verification_status: VerificationStatus;
}

export interface Office {
  office_id: string;
  office_title: string;
  office_title_ta: string;
  department_id: string;
  jurisdiction_id: string; // e.g. "DIST-SLM", "STATEWIDE", "SECRETARIAT"
  district?: string;
  office_email: string;
  office_phone: string;
  office_address: string;
  office_address_ta?: string;
  office_category: 'SECRETARIAT' | 'HOD_DIRECTORATE' | 'DISTRICT_COLLECTORATE' | 'POLICE_COMMISSIONERATE' | 'DISTRICT_POLICE' | 'FOREST_DIVISION' | 'LOCAL_BODY';
}

export interface Appointment {
  appointment_id: string;
  person_id: string;
  office_id: string;
  portfolio_id?: string;
  start_date: string;
  end_date?: string;
  appointment_type: 'SUBSTANTIVE' | 'ADDITIONAL_CHARGE' | 'OFFICIATING' | 'ELECTED';
  order_reference: string; // e.g. "G.O. Rt. No. 142 Public (Special.A)"
  source_url: string;
  verification_status: VerificationStatus;
}

export interface DepartmentEntity {
  department_id: string;
  official_name: string;
  official_name_ta: string;
  parent_department_id?: string;
  official_website: string;
}

export interface SourceEvidence {
  source_id: string;
  source_url: string;
  document_title: string;
  publication_date: string;
  retrieved_at: string;
  verified_at: string;
  effective_date: string;
  source_authority: string;
  confidence_status: VerificationStatus;
}

export interface WorkAssignment {
  assignment_id: string;
  responsible_office_id: string;
  assigned_person_id: string;
  project_or_scheme_id: string;
  assigned_at: string;
  due_date: string;
  status: 'ASSIGNED' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'COMPLETED' | 'ESCALATED';
}

export interface DirectorySearchResult {
  person: Person;
  office: Office;
  appointment: Appointment;
  department: DepartmentEntity;
  evidence: SourceEvidence;
  active_assignments_count: number;
}
