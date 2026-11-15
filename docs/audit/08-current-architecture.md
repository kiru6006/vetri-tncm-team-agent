# 08 — Current Architecture (As-Is): VETTRI TN AI OS

> [!NOTE]
> Formal documentation of the existing as-is architecture, component boundaries, and operational runtime.

---

## 1. High-Level System Context

```mermaid
graph TD
    User([Government Official / CM / Collector]) -->|HTTPS / Hash Navigation| SPA[Vite 6 + React 19 Frontend SPA]
    SPA -->|REST API Calls :8000| BE[FastAPI Modular Monolith]
    SPA -->|Direct Ingestion| JSON[Canonical JSON Files 787+ Records]
    
    BE -->|SQLAlchemy| DB[(SQLite Database cmo.db)]
    BE -->|Mock Regex| RegexAgent[Regex Intent Orchestrator]
    
    SubAgent[LangGraph Multi-Agent Supervisor agents/app/] -.->|Unmounted / Independent| BE
```

---

## 2. Runtime Subsystems

### 2.1 Frontend Runtime (`frontend/`)
- **Hosting**: GitHub Pages SPA deployment at `kiru6006.github.io/vetri-tncm-team-agent/`.
- **Navigation**: Hash-based router (`#cm-command`, `#directory`, `#districts`, etc.).
- **Data Ingestion**: Directly bundles official directory JSON files via TypeScript static imports in [verifiedGovernmentDirectory.ts](file:///Users/apple/projects/vetri-tncm-aios/frontend/src/data/verifiedGovernmentDirectory.ts).

### 2.2 Backend Runtime (`backend/`)
- **Host**: Uvicorn server running on `0.0.0.0:8000`.
- **API Surface**: 14 routers in `backend/app/api/v1/` with 56 endpoints.
- **Persistence**: Local SQLite database `cmo.db`.

### 2.3 Standalone Multi-Agent Supervisor (`agents/app/`)
- Contains LangGraph supervisor with specialist sub-agents (SQLite tool, knowledge search tool).
- Currently unmounted in production FastAPI routes; FastAPI falls back to regex simulation.
