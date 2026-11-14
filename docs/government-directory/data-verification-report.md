# Tamil Nadu Government Contact Directory: Data Verification Report

**Audit Date:** 2026-11-14  
**Audit Scope:** 21 Official Directory Categories  
**Source Baseline:** `https://www.tn.gov.in/contact_directory.php`  
**Total Verified Records:** 787 Canonical Directory Records (+ 44 Civil Cadre Baseline)

---

## 1. Verification Summary by Category

| Category | Target Entity | Verified Source | Record Count | Status | Notes |
|---|---|---|---|---|---|
| **STATE_LEADERSHIP** | Governor, CM, CS, CJ, Vigilance, CEO, Protocol | `governor_details.php`, `cs.php`, etc. | 8 | VERIFIED_CURRENT | Verified constitutional & administrative leadership |
| **MINISTER** | Council of Ministers | `minister_list.php` | 35 | VERIFIED_CURRENT | 35 Cabinet Ministers per G.O. Ms. No. 345 & Gazette 256 |
| **COLLECTOR** | District Collectors | `district_collector.php` | 38 | VERIFIED_CURRENT | All 38 District Collectors with phone, fax, NIC email |
| **MLA** | Members of Legislative Assembly | `17thassembly_members.php` | 234 | VERIFIED_CURRENT | 234 Assembly constituencies |
| **MP** | Rajya Sabha Members | `rajyasabha.nic.in` | 18 | VERIFIED_CURRENT | 18 Rajya Sabha seats for Tamil Nadu |
| **SECRETARIAT** | Secretaries to Government | `secret_to_govt.php` | 40 | VERIFIED_CURRENT | ACS, Principal Secretaries, Secretaries with PBX & direct |
| **HOD** | Heads of Departments | `cont_dir_All_hod_list.php` | 242 | NOT_PUBLICLY_AVAILABLE | Institutional directorates with subpage links |
| **UNDERTAKING** | PSUs, Boards, Enterprises | `cont_dir_All_und_tak.php` | 172 | NOT_PUBLICLY_AVAILABLE | Institutional state enterprises with subpage links |
| **DRO** | District Revenue Officers | District NIC Portals | 24 | VERIFIED_CURRENT | Key district administrative officers |
| **MUNICIPAL** | Municipal Commissioners | Municipal Admin Directorate | 10 | VERIFIED_CURRENT | Major city corporations |
| **IPS / IFOS / IAS**| All-India Services Cadre | Police/Forests/IAS Portals | 10 | VERIFIED_CURRENT | Cadre leadership |

---

## 2. Integrity & Quality Gates Passed

1. **Constitutional Primacy:** The Council of Ministers reflects the 35 ministerial portfolios headed by Thiru C. Joseph Vijay, aligning with official Government Gazette Extraordinary No. 256.
2. **Contact Channel Standardization:**
   - District Collector emails conform strictly to `collr<district>@nic.in`.
   - MLA emails conform to `mla<constituency>@tn.gov.in`.
   - Secretariat emails conform to `<dept>sec@tn.gov.in`.
3. **No Fabricated PII:** Where private phone numbers or individual officer names are omitted on upstream public index listings, `full_name` is set to `null` and `verification_status` is explicitly set to `NOT_PUBLICLY_AVAILABLE`.
4. **Zod Validation:** All records conform to the strict TypeScript/Zod `ContactRecord` schema.
