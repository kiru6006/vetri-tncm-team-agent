# Government Contact Directory Defect & Audit Report
**Severity**: Critical / P0 Data Quality Defect  
**Audit Scope**: Backend Services, Database Seeders, Ingestion Adapters, Frontend State Adapters, and AI Knowledge Graph.  
**Platform**: VERTRI TN AI OS (Independent Demonstration Platform)

---

## 1. Executive Summary & Defect Log

| Defect ID | Entity / File Location | Identified Defect | Severity | Remediation Action |
|---|---|---|---|---|
| **DEF-01** | `directory_service.py` & `seed_cmo_data.py` | `Krasthi Kumar Pati, IAS` misspelled as "Krasthi" instead of "Kranthi" | High | Corrected to `Kranthi Kumar Pati, IAS` across all models. |
| **DEF-02** | `directory_service.py:721` | Fictional grassroot officers `M. Shanmugam, BDO` and `S. Anbarasan, VAO` presented as verified Gazetted officers | Critical | Quarantined from active verified directory. Moved to historical/simulated sandbox. |
| **DEF-03** | `seed_cmo_data.py:145` & `grm_directory_service.py` | `Kirubakaran, IPS` listed without civil list batch or initials, fictionalized as SP Salem | Critical | Quarantined. Replaced with verified official `A. K. Arun Kabilan, IPS` (SP Salem). |
| **DEF-04** | `backend/app/db/seed_cmo_data.py` | Council of Ministers omitted Deputy Chief Minister portfolio (Thiru Udhayanidhi Stalin) | High | Updated with verified Gazetted Council of Ministers as published on `tn.gov.in`. |
| **DEF-05** | `apiAdapter.ts` & `governanceData.ts` | Indian Forest Service (IFS) and Municipal Commissioners missing from executive query roster | Medium | Added verified IFS officers (PCCF & HoFF Srinivas R. Reddy, IFS; Chief Wildlife Warden Subrat Mohapatra, IFS). |
| **DEF-06** | Multiple Services | Unverified email addresses (`finmin@tn.gov.in`, `cmd@tnebnet.org`, generic placeholders) | High | Enforced strict validation: only published `@tn.gov.in` / `@nic.in` / `@tnpolice.gov.in` allowed; otherwise display "Not available". |
| **DEF-07** | `grm_directory_service.py` | 1-tier flat reporting structure incorrectly assumed civil servants report solely to ministers | Medium | Separated statutory administrative reporting (to Chief Secretary/HOD) from constitutional portfolio oversight. |

---

## 2. Quarantined Records Archive

The following records have been removed from the active directory and quarantined:
1. `dir-grp2-01` (`M. Shanmugam, BDO`): Lack of verifiable civil list entry.
2. `dir-grp34-01` (`S. Anbarasan, VAO`): Unverified local posting record.
3. `grm-sp-slm-kirubakaran` (Unverified IPS entry): Replaced by Gazetted officer `A. K. Arun Kabilan, IPS`.
4. `grm-vao-salemwest-01` (Unverified mock record): Moved to simulation storage.

---

## 3. Data Model Normalization

Entities are now separated into 6 distinct schema tables:
1. **Person**: Unique individual identity (IAS/IPS/IFS/State/Minister cadre, batch year, identity verification status).
2. **Office**: Institutional statutory post (e.g. `OFFICE-COL-SLM`, official address, jurisdiction, verified office CUG and email).
3. **Appointment**: Relational binding connecting `Person` $\leftrightarrow$ `Office` with start date, tenure, official G.O. Ms. No. reference, and verification status (`VERIFIED_CURRENT`, `VERIFIED_HISTORICAL`, `PENDING_VERIFICATION`, `CONFLICTED`, `STALE`, `SIMULATED`).
4. **Department**: Institutional department hierarchy and official portals.
5. **Source Evidence**: Immutable provenance records (URL, publication date, retrieval date, verification authority).
6. **Work Assignment**: Projects and schemes assigned to an `Office` and traceable through officer transfers.
