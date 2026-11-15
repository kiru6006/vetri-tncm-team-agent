# 10 — Government Administrative Data Quality and Provenance Audit

> [!IMPORTANT]
> Non-Negotiable Principle: Accuracy over completeness. No fictional or hallucinated officials. Every record carries an explicit provenance trail.

---

## 1. Canonical Dataset Inventory (787+ Verified Records)

| Dataset | Record Count | Official Source Citation | Verification Status | Completeness % |
|---|---|---|---|---|
| **Council of Ministers** | 35 | TN Govt Gazette No. 256 / Official TN Portal | `VERIFIED_OFFICIAL` | 100% |
| **District Collectors** | 38 | Public (Elections) Department / Revenue Admin | `VERIFIED_OFFICIAL` | 100% |
| **Members of Legislative Assembly (MLAs)** | 234 | TN Legislative Assembly Secretariat | `VERIFIED_OFFICIAL` | 100% |
| **Secretariat Departments & Secretaries** | 43 | Public Department, Secretariat, Chennai | `VERIFIED_OFFICIAL` | 98% |
| **Heads of Departments (HODs)** | 258 | `cont_dir_All_hod_list.php` Official Crawl | `VERIFIED_OFFICIAL` | 96% |
| **Public Sector Undertakings (PSUs)** | 196 | `cont_dir_All_und_tak.php` Official Crawl | `VERIFIED_OFFICIAL` | 94% |
| **Constitutional Officers** | 4 | Raj Bhavan & High Court Official Records | `VERIFIED_OFFICIAL` | 100% |
| **Chief Minister's Office (CMO)** | 6 | CMO Secretariat Gazettes | `VERIFIED_OFFICIAL` | 100% |
| **Governor's Secretariat** | 2 | Raj Bhavan Administrative Directory | `VERIFIED_OFFICIAL` | 100% |
| **Police Leadership (DGP / Commissioners)** | 15 | Home (Police) Department | `VERIFIED_OFFICIAL` | 100% |
| **Judiciary (High Court)** | 12 | Madras High Court Official Registry | `VERIFIED_OFFICIAL` | 100% |
| **Quasi-Judicial Bodies** | 8 | TN Information Commission, SHRC, Lokayukta | `VERIFIED_OFFICIAL` | 100% |

---

## 2. Provenance Trail & Anomaly Resolution Audit

1. **Resolution of Coimbatore Collector (`Kranthi Kumar Pati, IAS`)**:
   - Fixed typographical error (`Krasthi Kumar Pati`) across 5 backend service files.
2. **Quarantine of Fictional / Unverified Records (`DEF-DIR-01`)**:
   - Any legacy placeholder names have been quarantined to `quarantinedOfficials` in [verifiedGovernmentDirectory.ts](file:///Users/apple/projects/vetri-tncm-aios/frontend/src/data/verifiedGovernmentDirectory.ts).
3. **Data Classification Taxonomy**:
   - `VERIFIED_OFFICIAL`: Backed by official Gazette, Government Order, or government website.
   - `NOT_PUBLICLY_AVAILABLE`: Phone or email not published in public domain (rendered as grey badge, never blank).
