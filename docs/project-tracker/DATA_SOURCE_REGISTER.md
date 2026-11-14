# VERTRI TN AI OS - Data Source Register

**Registry Standard:** Official Tamil Nadu Gazette & Authoritative Government Datasets  
**Last Synchronized:** 2026-11-14 11:02:16 IST

---

## Authoritative Data Sources

| Source ID | Name | Authority | Portal URL | Cadence | Status | Verification Method |
|---|---|---|---|---|---|---|
| **SRC-TN-PORTAL-MIN** | Council of Ministers of Tamil Nadu - Official Portal | Public (Special.A) Department, Government of Tamil Nadu | [https://www.tn.gov.in/ministers_list.php](https://www.tn.gov.in/ministers_list.php) | Daily at 06:00 IST | `VERIFIED_CURRENT` | Cross-checked against Official Gazette Extraordinary notifications |
| **SRC-AGIAS-CIVIL-LIST** | Tamil Nadu IAS Cadre Civil List & Postings Registry | Public (Special.A) Department / Accountant General TN | [https://agias.tn.gov.in](https://agias.tn.gov.in) | Weekly on Monday | `VERIFIED_CURRENT` | Verified with G.O.(Rt) transfer orders through August 2024 |
| **SRC-TN-POLICE-PORTAL** | Tamil Nadu Police Leadership and District SP Postings | Home (Police.I) Department, Fort St. George, Chennai | [https://eservices.tnpolice.gov.in](https://eservices.tnpolice.gov.in) | Weekly on Monday | `VERIFIED_CURRENT` | Verified with Home Dept Police.I posting notifications |
| **SRC-TN-FOREST-PORTAL** | Tamil Nadu Forest Department Cadre Roster & HoFF Gazettes | Environment, Climate Change and Forests Department | [https://forests.tn.gov.in](https://forests.tn.gov.in) | Monthly | `VERIFIED_CURRENT` | Verified with PCCF administrative notifications |
| **SRC-DISTRICT-NIC-PORTALS** | 38 District Collectorates Directory - National Informatics Centre | Revenue Administration & Disaster Management Department | [https://www.tn.gov.in/district_view.php](https://www.tn.gov.in/district_view.php) | Daily at 06:00 IST | `VERIFIED_CURRENT` | Validated against official district NIC subdomains (*.nic.in) |

---

## Data Segregation Architecture

1. **Official Verified Datasets (`frontend/src/data/verifiedGovernmentDirectory.ts`):**
   - Contains only verified public executive appointments backed by official G.O.s or portal links.
   - Contact emails strictly limited to verified `@nic.in`, `@tn.gov.in`, `@tnpolice.gov.in`, and `@forests.tn.gov.in`.
   - Any missing or unconfirmed contact field defaults explicitly to `"Not available"`.

2. **Simulated & Quarantined Records (`QUARANTINED_UNVERIFIED_RECORDS`):**
   - Quarantined placeholder officers (`M. Shanmugam`, `S. Anbarasan`, `Kirubakaran IPS`) are isolated from the active directory.
   - Searching for quarantined entities displays an explanatory **Quarantine Defect Notice** rather than presenting them as verified civil servants.

3. **Governance Issues & Scenarios (`frontend/src/data/governanceData.ts`):**
   - Realistic cross-departmental administrative case studies designed for executive action simulation.
   - Mapped to real districts, real departments, and verified nodal officers.
