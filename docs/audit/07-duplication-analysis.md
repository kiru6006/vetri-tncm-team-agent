# 07 — Comprehensive Duplication Analysis: VETTRI TN AI OS

> [!NOTE]
> Systematically catalogs exact file copies (D1), structural code duplicates (D2), data model redundancies (D3), and service-level overlaps across the codebase.

---

## 1. Duplication Taxonomy

- **D1 (Exact File Duplicates)**: Byte-for-byte identical files located in multiple directories.
- **D2 (Structural Component Duplication)**: Parallel implementations of the same UI functionality.
- **D3 (Data Schema Duplication)**: Identical domain types declared across frontend and backend.
- **D4 (Service Simulation Overlap)**: Parallel mock generators versus live API services.

---

## 2. D1 Exact File Duplicates (24 Files / 12 Triplicate Sets)

SHA-256 analysis discovered 12 official government directory JSON files duplicated across three separate paths:
1. `frontend/src/data/canonical/`
2. `data/contacts/`
3. `data/government-directory/`

### Duplicated Datasets Table
| Dataset Name | Records | File 1 (Primary Frontend) | File 2 (Contacts Sync) | File 3 (Data Backup) |
|---|---|---|---|---|
| Ministers | 35 | `frontend/src/data/canonical/ministers.json` | `data/contacts/ministers.json` | `data/government-directory/ministers.json` |
| Collectors | 38 | `frontend/src/data/canonical/district-collectors.json` | `data/contacts/district-collectors.json` | `data/government-directory/district-collectors.json` |
| MLAs | 234 | `frontend/src/data/canonical/mlas.json` | `data/contacts/mlas.json` | `data/government-directory/mlas.json` |
| Secretariat | 43 | `frontend/src/data/canonical/secretariat.json` | `data/contacts/secretariat.json` | `data/government-directory/secretariat.json` |
| HODs | 258 | `frontend/src/data/canonical/heads-of-departments.json` | `data/contacts/heads-of-departments.json` | `data/government-directory/heads-of-departments.json` |
| Undertakings | 196 | `frontend/src/data/canonical/undertakings.json` | `data/contacts/undertakings.json` | `data/government-directory/undertakings.json` |
| Constitutional | 4 | `frontend/src/data/canonical/constitutional-officers.json` | `data/contacts/constitutional-officers.json` | `data/government-directory/constitutional-officers.json` |
| CM Office | 6 | `frontend/src/data/canonical/cm-office.json` | `data/contacts/cm-office.json` | `data/government-directory/cm-office.json` |
| Governor Staff | 2 | `frontend/src/data/canonical/governor-staff.json` | `data/contacts/governor-staff.json` | `data/government-directory/governor-staff.json` |
| Police Officers | 15 | `frontend/src/data/canonical/police-officers.json` | `data/contacts/police-officers.json` | `data/government-directory/police-officers.json` |
| Judges | 12 | `frontend/src/data/canonical/judges.json` | `data/contacts/judges.json` | `data/government-directory/judges.json` |
| Quasi Judicial | 8 | `frontend/src/data/canonical/quasi-judicial.json` | `data/contacts/quasi-judicial.json` | `data/government-directory/quasi-judicial.json` |

---

## 3. D2 & D3 Structural and Schema Duplication

1. **Directory Search UI (`DUP-D2-01`)**:
   - `frontend/src/components/GovernmentDirectoryView.tsx` (Vite SPA)
   - `components/contacts/DirectorySearch.tsx` (Next.js prototype)
   - Both implement multi-tab filtering, search bars, and official card rendering.
2. **AI Copilot Orchestrator (`DUP-D2-02`)**:
   - `backend/app/agent/orchestrator.py` (FastAPI regex simulation)
   - `agents/app/main.py` (LangGraph multi-agent supervisor)

---

## 4. Modernization Remediation Strategy

1. **Designate Single Source of Truth**: Designate `frontend/src/data/canonical/` as the master canonical data directory.
2. **Symlink or Build-Time Ingestion**: Replace duplicate files in `data/contacts/` and `data/government-directory/` with symbolic links or build-step copying.
3. **Mount LangGraph**: Eliminate regex orchestrator by mounting the LangGraph supervisor directly into FastAPI `/api/v1/copilot`.
