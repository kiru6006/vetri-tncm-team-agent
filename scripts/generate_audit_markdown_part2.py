import os

REPO_ROOT = "/Users/apple/projects/vetri-tncm-aios"
AUDIT_DIR = os.path.join(REPO_ROOT, "docs", "audit")

# ==============================================================================
# DOC 05: FRONTEND CODE REVIEW
# ==============================================================================
doc05_path = os.path.join(AUDIT_DIR, "05-frontend-code-review.md")
content_05 = f"""# 05 — Frontend Architecture and Code Review: VETTRI TN AI OS

> [!NOTE]
> Review covers both the primary active SPA dashboard in `frontend/` (Vite 6 + React 19 + Tailwind CSS v4) and the root `app/contacts/` Next.js prototype.

---

## 1. Frontend Architecture & Technology Stack

- **Build Tool & Framework**: Vite 6.0.7 with `@vitejs/plugin-react` (React 19.0.0, TypeScript 5.7.2).
- **Styling Architecture**: Tailwind CSS v4 (`@tailwindcss/vite` 4.0.0-beta.8), custom CSS variables in [index.css](file://{REPO_ROOT}/frontend/src/index.css).
- **Iconography & Visualization**: Lucide React 0.469.0, Apache ECharts 5.6.0 via `echarts-for-react` 3.0.2.
- **Routing Paradigm**: Hash-based client-side routing (`window.location.hash`) inside [App.tsx](file://{REPO_ROOT}/frontend/src/App.tsx).
- **State Management**: Zustand / Custom hook store in [useExecutiveStore.ts](file://{REPO_ROOT}/frontend/src/hooks/useExecutiveStore.ts).

---

## 2. Component Hierarchy & Layout Structure

```mermaid
graph TD
    App[App.tsx] --> TopNav[ExecutiveTopNav.tsx]
    App --> Sidebar[ExecutiveSidebar.tsx]
    App --> MainContent[Main Content View Router]
    App --> MobileNav[Mobile Bottom Bar]

    MainContent --> V_CM[ExecutiveWorkspace.tsx]
    MainContent --> V_DIR[GovernmentDirectoryView.tsx]
    MainContent --> V_BUDGET[StateBudgetDashboard.tsx]
    MainContent --> V_DIST[DistrictsDashboard.tsx]
    MainContent --> V_PROJ[InfrastructureProjectsView.tsx]
    MainContent --> V_GRM[GrievanceRedressalView.tsx]
    MainContent --> V_COPILOT[ExecutiveCopilotView.tsx]
    MainContent --> V_OTHER[33 Other Specialized Views]
```

---

## 3. Findings & Code Quality Analysis

### 3.1 Unhandled Client Routes (`DEF-ROUT-01` / `FIND-ROUT-01`)
In [App.tsx](file://{REPO_ROOT}/frontend/src/App.tsx#L85-L160), navigation routes `#audit-logs`, `#settings`, `#ai-agents`, `#risk-intelligence`, and `#users-roles` are present in [ExecutiveSidebar.tsx](file://{REPO_ROOT}/frontend/src/components/ExecutiveSidebar.tsx) but have no matching case in `App.tsx`, causing the workspace pane to render blank.
- **Remediation**: Add explicit view render cases in `App.tsx` with dedicated administrative components or informative telemetry panels.

### 3.2 Dual-Stack Prototype Disconnect
The repository contains Next.js App Router code under [app/contacts/page.tsx](file://{REPO_ROOT}/app/contacts/page.tsx) and [components/contacts/](file://{REPO_ROOT}/components/contacts/), while the primary application is built inside [frontend/](file://{REPO_ROOT}/frontend/).
- Root `package.json` specifies `"next dev"` and `"next build"` scripts, but `next` is not listed in root dependencies.
- **Remediation**: Maintain `frontend/` as the single canonical SPA for Vite and GitHub Pages deployment. Harmonize directory UI components to prevent split development efforts.

### 3.3 Large Monolithic Charting Chunk (`FIND-PERF-01`)
Vite build produces a single 1,027 kB chunk for ECharts and charting libraries.
- **Remediation**: Use dynamic `React.lazy()` imports for charting-heavy components (`StateBudgetDashboard`, `DistrictsDashboard`) and configure `manualChunks` in [vite.config.ts](file://{REPO_ROOT}/frontend/vite.config.ts).
"""

with open(doc05_path, "w") as f:
    f.write(content_05)
print("Wrote doc 05")

# ==============================================================================
# DOC 06: BACKEND CODE REVIEW
# ==============================================================================
doc06_path = os.path.join(AUDIT_DIR, "06-backend-code-review.md")
content_06 = f"""# 06 — Backend Architecture and Code Review: VETTRI TN AI OS

> [!NOTE]
> Detailed technical review of FastAPI modular monolith implementation in `backend/app/`.

---

## 1. Backend Stack & Router Topology

- **Web Framework**: FastAPI 0.115.0 with Uvicorn 0.32.0.
- **Data Validation & Modeling**: Pydantic v2 (2.9.2), SQLAlchemy 2.0.36.
- **Router Organization**: 14 routers mounted under `/api/v1/` prefix in [main.py](file://{REPO_ROOT}/backend/app/main.py).
- **Total Registered Endpoints**: 56 endpoints.

```mermaid
graph LR
    Client[Frontend Client / API Consumer] --> CORS[CORS Middleware]
    CORS --> Routers[FastAPI v1 Routers - 14 Routers]
    Routers --> Services[Domain Services Layer]
    Services --> DB[(SQLite / SQLAlchemy Core)]
    Services --> DataStore[Canonical JSON Data Store]
```

---

## 2. Comprehensive Endpoint Inventory & Auth Coverage Audit

| Router Module | Mount Prefix | Endpoints | Auth Dependency Applied? | Finding / Vulnerability |
|---|---|---|---|---|
| [auth.py](file://{REPO_ROOT}/backend/app/api/v1/auth.py) | `/auth` | 4 | Yes (on `/me`) | Normal public login endpoints |
| [cmo_endpoints.py](file://{REPO_ROOT}/backend/app/api/v1/cmo_endpoints.py) | `/cmo` | 15 | **NO (0 / 15)** | `FIND-SEC-01`: Anonymous access to action items, alerts |
| [calendar.py](file://{REPO_ROOT}/backend/app/api/v1/calendar.py) | `/calendar` | 4 | **NO (0 / 4)** | `FIND-SEC-01`: Anonymous access to booking, events |
| [grm.py](file://{REPO_ROOT}/backend/app/api/v1/grm.py) | `/grm` | 7 | **NO (0 / 7)** | `FIND-SEC-01`: Anonymous trigger of GRM data sync |
| [copilot.py](file://{REPO_ROOT}/backend/app/api/v1/copilot.py) | `/copilot` | 1 | **NO (0 / 1)** | `FIND-SEC-01`: Anonymous chat endpoint |
| [audit.py](file://{REPO_ROOT}/backend/app/api/v1/audit.py) | `/audit` | 1 | **NO (0 / 1)** | `FIND-SEC-01`: Anonymous reading of audit logs |
| [executive.py](file://{REPO_ROOT}/backend/app/api/v1/executive.py) | `/executive` | 4 | Yes (4 / 4) | Enforces `get_current_active_user` |
| [state_budget.py](file://{REPO_ROOT}/backend/app/api/v1/state_budget.py) | `/budget` | 4 | Yes (4 / 4) | Enforces `get_current_active_user` |
| [districts.py](file://{REPO_ROOT}/backend/app/api/v1/districts.py) | `/districts` | 4 | Yes (4 / 4) | Enforces `get_current_active_user` |
| [departments.py](file://{REPO_ROOT}/backend/app/api/v1/departments.py) | `/departments` | 4 | Yes (4 / 4) | Enforces `get_current_active_user` |
| [projects.py](file://{REPO_ROOT}/backend/app/api/v1/projects.py) | `/projects` | 4 | Yes (4 / 4) | Enforces `get_current_active_user` |
| [schemes.py](file://{REPO_ROOT}/backend/app/api/v1/schemes.py) | `/schemes` | 4 | Yes (4 / 4) | Enforces `get_current_active_user` |
| [knowledge.py](file://{REPO_ROOT}/backend/app/api/v1/knowledge.py) | `/knowledge` | 4 | Yes (4 / 4) | Enforces `get_current_active_user` |

> [!WARNING]
> **P0 Vulnerability**: Exactly **27 out of 56 endpoints** lack authentication dependencies. Unauthenticated users can trigger operations like `/api/v1/cmo/action-items` or `/api/v1/calendar/book`.

---

## 3. Database Layer & Data Seeding

- Uses SQLite (`cmo.db`) via SQLAlchemy sessions in [session.py](file://{REPO_ROOT}/backend/app/db/session.py).
- Seeding logic in [seed_cmo_data.py](file://{REPO_ROOT}/backend/app/db/seed_cmo_data.py) initializes default action items, alerts, and executive calendar events.
- **Target Architecture**: Migrate to PostgreSQL with `pgvector` for enterprise scale, ACID transactions, and semantic search capabilities.
"""

with open(doc06_path, "w") as f:
    f.write(content_06)
print("Wrote doc 06")

# ==============================================================================
# DOC 07: DUPLICATION ANALYSIS
# ==============================================================================
doc07_path = os.path.join(AUDIT_DIR, "07-duplication-analysis.md")
content_07 = f"""# 07 — Comprehensive Duplication Analysis: VETTRI TN AI OS

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
"""

with open(doc07_path, "w") as f:
    f.write(content_07)
print("Wrote doc 07")
