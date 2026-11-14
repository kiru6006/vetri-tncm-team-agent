# Tamil Nadu Government Contact Directory: Missing Contacts & Public Availability Audit

**Document Version:** 1.0.0  
**Audit Date:** 2026-11-14  
**Audit Objective:** Catalog records where specific fields are omitted upstream on government portals (`NOT_PUBLICLY_AVAILABLE`), ensuring zero unauthorized fabrication.

---

## 1. Governance Policy on Missing Data

In adherence to data privacy, cybersecurity standards, and civil servant protection:
1. **Never Fabricate:** If a public portal does not disclose an individual officer's direct mobile phone, personal email, or private residence, the field is stored as `null`.
2. **Explicit Tagging:** Records with omitted officer names or contacts are tagged with `verification_status: "NOT_PUBLICLY_AVAILABLE"`.
3. **Institutional Fallbacks:** Institutional desks (`cmo@tn.gov.in`, `cs@tn.gov.in`, `collr*@nic.in`) and Secretariat PBX lines are provided for legitimate public interaction.

---

## 2. Missing Records Inventory

### 2.1 Heads of Departments (HoD) — Index Level (242 Records)
- **Status:** `NOT_PUBLICLY_AVAILABLE` (at directory index level)
- **Reason:** Upstream page `cont_dir_All_hod_list.php` provides the institutional directory link (`detail_contact_hod.php?org_name=...`) rather than individual officer names inline.
- **Remediation:** Display institutional card with link to specific departmental subpage.

### 2.2 Public Sector Undertakings & Boards (172 Records)
- **Status:** `NOT_PUBLICLY_AVAILABLE` (at directory index level)
- **Reason:** Upstream page `cont_dir_All_und_tak.php` provides institutional organization links (`detail_contact.php?org_name=...`).
- **Remediation:** Render institutional card linking to official undertaking details.

### 2.3 Assembly Constituencies — Vacancies
- **Status:** `NOT_PUBLICLY_AVAILABLE`
- **Constituency:** AC-141 (Tiruchirappalli East)
- **Reason:** Seat vacant pending by-election / notification. Marked `full_name: null`, `verification_status: "NOT_PUBLICLY_AVAILABLE"`.

### 2.4 Ministerial Private Contact Numbers
- **Status:** Intentionally omitted (`null`).
- **Reason:** Ministerial cell phones and personal emails are classified for security and PII compliance. Public inquiries route through Secretariat PBX (`044-25665566`) or CMO desk (`044-25672345`).

