# 21 — Architecture Decision Records (ADRs): VETTRI TN AI OS

> [!NOTE]
> Captures key architectural decisions, rationale, trade-offs, and compliance considerations.

---

## ADR-001: Modular Monolith vs Microservices for Governance Dashboard
- **Status**: **ACCEPTED**
- **Context**: Evaluated whether to decompose the application into microservices or retain a modular monolith.
- **Decision**: Retain and strengthen the **Modular Monolith** architecture in FastAPI and React SPA.
- **Rationale**: The platform serves a unified executive constituency (CMO, Secretariat, District Collectors) with tight transactional consistency requirements. Microservices would introduce unnecessary network latency, distributed transaction complexity, and deployment overhead for a state governance demonstration platform.

---

## ADR-002: Vite SPA Primary Deployment vs Next.js SSR Harmonization
- **Status**: **ACCEPTED**
- **Context**: The repository contains both a fully functional Vite 6 SPA in `frontend/` and experimental Next.js files in `app/contacts/`.
- **Decision**: Designate **Vite SPA in `frontend/` as the primary production application**; retain Next.js contacts directory as a headless module or embed it into the Vite component hierarchy.
- **Rationale**: Vite SPA is already deployed and functional on GitHub Pages. Upgrading the root to full Next.js SSR would require a Node.js SSR runtime incompatible with static GitHub Pages hosting.

---

## ADR-003: Single Source of Truth for Canonical Administrative Data
- **Status**: **ACCEPTED**
- **Context**: 12 official directory JSON files are duplicated across three locations (`frontend/src/data/canonical/`, `data/contacts/`, `data/government-directory/`).
- **Decision**: Establish **`frontend/src/data/canonical/` as the single authoritative source of truth**. All other paths will use symbolic links or automated build synchronizations.
- **Rationale**: Eliminates data drift between directory views while ensuring zero-regression for existing build pipelines.

---

## ADR-004: Mount LangGraph Multi-Agent Supervisor into FastAPI Backend
- **Status**: **ACCEPTED**
- **Context**: The FastAPI backend currently uses regex string matching for Copilot queries, while `agents/app/` contains a real LangGraph multi-agent system.
- **Decision**: Mount the LangGraph supervisor directly into FastAPI `/api/v1/copilot` and deprecate regex simulation.
- **Rationale**: Provides real agentic intelligence, tool execution, and grounded citations for executive decision support.

---

## ADR-005: Zero-Trust RBAC and Session Token Model for Government Personas
- **Status**: **ACCEPTED**
- **Context**: 27 backend endpoints currently lack authentication dependencies.
- **Decision**: Enforce `Depends(get_current_active_user)` across all 56 endpoints and implement role claims matching the 6 government personas.
- **Rationale**: Ensures compliance with state cybersecurity standards and prevents unauthorized access to sensitive government data.
