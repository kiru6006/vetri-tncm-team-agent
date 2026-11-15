import os

REPO_ROOT = "/Users/apple/projects/vetri-tncm-aios"
AUDIT_DIR = os.path.join(REPO_ROOT, "docs", "audit")

# ==============================================================================
# DOC 08: CURRENT ARCHITECTURE
# ==============================================================================
doc08_path = os.path.join(AUDIT_DIR, "08-current-architecture.md")
content_08 = f"""# 08 — Current Architecture (As-Is): VETTRI TN AI OS

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
- **Data Ingestion**: Directly bundles official directory JSON files via TypeScript static imports in [verifiedGovernmentDirectory.ts](file://{REPO_ROOT}/frontend/src/data/verifiedGovernmentDirectory.ts).

### 2.2 Backend Runtime (`backend/`)
- **Host**: Uvicorn server running on `0.0.0.0:8000`.
- **API Surface**: 14 routers in `backend/app/api/v1/` with 56 endpoints.
- **Persistence**: Local SQLite database `cmo.db`.

### 2.3 Standalone Multi-Agent Supervisor (`agents/app/`)
- Contains LangGraph supervisor with specialist sub-agents (SQLite tool, knowledge search tool).
- Currently unmounted in production FastAPI routes; FastAPI falls back to regex simulation.
"""

with open(doc08_path, "w") as f:
    f.write(content_08)
print("Wrote doc 08")

# ==============================================================================
# DOC 09: TARGET ARCHITECTURE
# ==============================================================================
doc09_path = os.path.join(AUDIT_DIR, "09-target-architecture.md")
content_09 = f"""# 09 — Target Enterprise Architecture (To-Be): VETTRI TN AI OS

> [!NOTE]
> Preserves all 108 existing capabilities while unifying data layers, securing all 56 endpoints, and mounting the LangGraph multi-agent engine.

---

## 1. Target System Architecture (To-Be)

```mermaid
graph TD
    Client[Web & Mobile Clients] --> Gateway[API Gateway / Reverse Proxy - Nginx / Envoy]
    Gateway --> AuthFilter[Zero-Trust JWT & RBAC Middleware]
    AuthFilter --> Monolith[FastAPI Enterprise Modular Monolith]

    subgraph "FastAPI Backend Core"
        Monolith --> Routers[14 Domain Routers]
        Routers --> Services[Domain Services]
        Routers --> Copilot[Copilot Router]
        Copilot --> LangGraph[LangGraph Multi-Agent Engine]
        LangGraph --> AgentTools[RAG Vector + SQL + Governance Tools]
    end

    subgraph "Persistence Layer"
        Services --> Postgres[(PostgreSQL 16 Enterprise DB)]
        AgentTools --> PGVector[(pgvector Semantic Knowledge Store)]
        Services --> Redis[(Redis Cache & Session Store)]
    end

    subgraph "Telemetry & Audit"
        Monolith --> Kafka[Immutable Audit Event Stream]
        Kafka --> AuditVault[(NIC-Compliant Audit Vault)]
    end
```

---

## 2. Key Architectural Modernization Pillars

1. **Unified Canonical Data Plane**: Single authoritative source for all 787+ administrative officials in PostgreSQL, exposed via cached GraphQL/REST endpoints.
2. **Zero-Trust IAM Enforcement**: Every endpoint protected by OAuth2 / JWT with role claims matching the 6 government personas.
3. **Integrated Agentic Copilot**: Full LangGraph supervisor mounted in `/api/v1/copilot`, offering grounded natural-language queries against real administrative telemetry.
4. **State Data Centre (SDC) Readiness**: Dockerized micro-services deployable to TNeGA / NIC Cloud with SSL, rate limiting, and automated backups.
"""

with open(doc09_path, "w") as f:
    f.write(content_09)
print("Wrote doc 09")

# ==============================================================================
# DOC 10: DATA QUALITY AUDIT
# ==============================================================================
doc10_path = os.path.join(AUDIT_DIR, "10-data-quality-audit.md")
content_10 = f"""# 10 — Government Administrative Data Quality and Provenance Audit

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
   - Any legacy placeholder names have been quarantined to `quarantinedOfficials` in [verifiedGovernmentDirectory.ts](file://{REPO_ROOT}/frontend/src/data/verifiedGovernmentDirectory.ts).
3. **Data Classification Taxonomy**:
   - `VERIFIED_OFFICIAL`: Backed by official Gazette, Government Order, or government website.
   - `NOT_PUBLICLY_AVAILABLE`: Phone or email not published in public domain (rendered as grey badge, never blank).
"""

with open(doc10_path, "w") as f:
    f.write(content_10)
print("Wrote doc 10")

# ==============================================================================
# DOC 11: AI AGENT AUDIT
# ==============================================================================
doc11_path = os.path.join(AUDIT_DIR, "11-ai-agent-audit.md")
content_11 = f"""# 11 — AI and Agentic Systems Architecture Audit: VETTRI TN AI OS

> [!NOTE]
> Audit evaluates the dual AI architectures in the repository: the active backend regex orchestrator vs the standalone LangGraph supervisor.

---

## 1. Dual AI Engine Evaluation

```mermaid
graph TD
    subgraph "Current Production (FastAPI)"
        Req[User Copilot Query] --> Regex[Regex Intent Matcher backend/app/agent/orchestrator.py]
        Regex --> Template[Hardcoded Template / Mock Telemetry]
        Template --> Resp[Simulated Markdown Response]
    end

    subgraph "Standalone Agent Engine (agents/app/)"
        Req2[User Query] --> LG[LangGraph Multi-Agent Supervisor]
        LG --> Tool1[SQLite Tool query_database]
        LG --> Tool2[Knowledge Search Tool search_knowledge]
        LG --> Tool3[Calendar Tool get_calendar_events]
        Tool1 --> Synthesis[Grounded LLM Synthesis]
        Tool2 --> Synthesis
        Tool3 --> Synthesis
        Synthesis --> Resp2[Cited Grounded Response]
    end
```

---

## 2. Evaluation Findings (`FIND-AI-01`)

1. **Decoupled Supervisor**: The LangGraph engine in `agents/app/` has real agentic capabilities with MCP tools, but is completely bypassed by [copilot.py](file://{REPO_ROOT}/backend/app/api/v1/copilot.py).
2. **Hallucination Safeguards**: The production API lacks validation guardrails; all responses are static mock strings.
3. **Remediation Plan**:
   - Mount LangGraph into [copilot.py](file://{REPO_ROOT}/backend/app/api/v1/copilot.py) under `/api/v1/copilot/chat`.
   - Provide LangGraph tools with direct access to PostgreSQL and the canonical directory.
   - Enforce grounded source citation formatting (`[Source: G.O. Ms. No. 123]`) on every model output.
"""

with open(doc11_path, "w") as f:
    f.write(content_11)
print("Wrote doc 11")
