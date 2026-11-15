# VERTRI TN AI OS — Master Enterprise Architecture & Feature Audit
## Document 01: Repository Baseline & Technical Environment Record
**System:** VERTRI TN AI OS  
**Evaluation Date:** 2026-11-15T13:50:00+05:30  
**Commit SHA:** `86462a9a7fd5058d4f49d5e845fc6938e6505b0f`  
**Git Branch:** `main` (Remote: `origin/main` synchronized)  
**Working Tree Status:** Clean (0 uncommitted changes)  

---

### 1. Repository Inventory & Technology Stack

| Layer | Technology | Version | Location / Config | Operational Role |
|:---|:---|:---|:---|:---|
| **Production Frontend** | React / TypeScript / Vite | React 19.0.0, Vite 6.0.0, TS 5.6.2 | [frontend/](file:///Users/apple/projects/vetri-tncm-aios/frontend/) | Primary deployed SPA dashboard |
| **Styling & Design System** | Tailwind CSS v4 | `@tailwindcss/vite` 4.0.0 | [frontend/src/index.css](file:///Users/apple/projects/vetri-tncm-aios/frontend/src/index.css) | High-density glassmorphism & responsive tokens |
| **State Management** | Zustand | 5.0.0 | [frontend/src/stores/authStore.ts](file:///Users/apple/projects/vetri-tncm-aios/frontend/src/stores/authStore.ts) | Client-side role, language, and route state |
| **Data Visualization** | Apache ECharts | `echarts` 5.5.1, `echarts-for-react` 3.0.2 | [frontend/src/components/](file:///Users/apple/projects/vetri-tncm-aios/frontend/src/components/) | Financial, revenue, and district metrics |
| **Next.js Contacts Prototype** | Next.js 14 App Router | React 19, TypeScript 5.6 | [app/contacts/](file:///Users/apple/projects/vetri-tncm-aios/app/contacts/), [components/contacts/](file:///Users/apple/projects/vetri-tncm-aios/components/contacts/) | Standalone contacts directory prototype |
| **Backend API** | FastAPI / Uvicorn | FastAPI 0.115.0+, Python 3.14 / 3.11 | [backend/app/main.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/main.py) | 14 domain routers, 56 OpenAPI endpoints |
| **Data Validation & Schemas** | Pydantic v2 | 2.9.0+ | [backend/app/schemas/](file:///Users/apple/projects/vetri-tncm-aios/backend/app/schemas/) | Strict typed request/response models |
| **Database & ORM** | SQLAlchemy / pgvector | SQLAlchemy 2.0.35, pgvector 0.3.4 | [backend/app/core/database.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/core/database.py) | PostgreSQL async database layer with in-memory fallbacks |
| **Caching & Messaging** | Redis | 7.4-alpine, redis-py 5.1.0 | [backend/app/core/redis.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/core/redis.py) | Session cache & pub/sub |
| **Object Storage** | MinIO S3 | Latest | [infra/docker/docker-compose.yml](file:///Users/apple/projects/vetri-tncm-aios/infra/docker/docker-compose.yml) | Document attachments & G.O. PDF storage |
| **AI Orchestrator** | Python / Rule-Engine / Anthropic | Custom Multi-Step Orchestrator | [backend/app/agent/orchestrator.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/agent/orchestrator.py) | 8 executive governance tools & reasoning engine |
| **Agentic Framework** | LangGraph / LangChain | LangGraph 0.2.34, LangChain 0.3.0 | [agents/app/](file:///Users/apple/projects/vetri-tncm-aios/agents/app/) | Standalone multi-agent supervisor service |
| **CI/CD Deployment** | GitHub Actions | Ubuntu Latest, Node 20, Python 3.11 | [.github/workflows/deploy.yml](file:///Users/apple/projects/vetri-tncm-aios/.github/workflows/deploy.yml) | Automated build, test, and deploy to GitHub Pages |
| **E2E Testing** | Playwright | TypeScript Spec | [tests/e2e/contacts.spec.ts](file:///Users/apple/projects/vetri-tncm-aios/tests/e2e/contacts.spec.ts) | 5 acceptance tests for contacts suite |
| **Unit & Integration Testing** | Pytest / AnyIO | Pytest 9.1.1, Python 3.14.5 | [backend/tests/](file:///Users/apple/projects/vetri-tncm-aios/backend/tests/) | 22 passing automated backend tests |

---

### 2. Measured Verification Baseline Execution

#### 2.1 Backend Pytest Execution
```bash
$ cd /Users/apple/projects/vetri-tncm-aios && PYTHONPATH=backend python3 -m pytest backend/tests/
============================= test session starts ==============================
platform darwin -- Python 3.14.5, pytest-9.1.1, pluggy-1.6.0
rootdir: /Users/apple/projects/vetri-tncm-aios
plugins: langsmith-0.14.1, anyio-4.14.1, asyncio-1.4.0

backend/tests/test_cmo_agent_tools.py ..........                         [ 45%]
backend/tests/test_executive_intelligence.py ........                    [ 81%]
backend/tests/test_ingestion.py ....                                     [100%]

======================= 22 passed, 25 warnings in 0.43s ========================
```
*Note on warnings:* Deprecation warnings originate from `datetime.datetime.utcnow()` scheduled for replacement with `datetime.datetime.now(datetime.UTC)` in Python 3.12+.

#### 2.2 Frontend TypeScript Typecheck
```bash
$ cd /Users/apple/projects/vetri-tncm-aios/frontend && npm run typecheck
> vettri-tn-ai-os-frontend@1.0.0 typecheck
> tsc -b
# Result: 0 errors, 0 warnings (Exit code: 0)
```

#### 2.3 Frontend Production Build
```bash
$ cd /Users/apple/projects/vetri-tncm-aios/frontend && npm run build
> vettri-tn-ai-os-frontend@1.0.0 build
> tsc -b && vite build

vite v6.4.3 building for production...
✓ 2179 modules transformed.
dist/index.html                            1.30 kB │ gzip:   0.65 kB
dist/assets/index-apy2VLzc.css            91.50 kB │ gzip:  13.01 kB
dist/assets/vendor-react-Bk2P8Mpe.js       4.22 kB │ gzip:   1.58 kB
dist/assets/vendor-icons-DYi82_AP.js      35.12 kB │ gzip:   8.73 kB
dist/assets/index-CnBQaRg6.js            677.99 kB │ gzip: 160.92 kB
dist/assets/vendor-charts-Ca5a-uAz.js  1,053.96 kB │ gzip: 349.07 kB
✓ built in 6.05s (Exit code: 0)
```

#### 2.4 Tracker Schema & Evidence Validation
```bash
$ cd /Users/apple/projects/vetri-tncm-aios && python3 scripts/tracker/validate-tracker.py
SUCCESS: feature-tracker.json is valid against schema.
Total verified categories: 24
Total verified capabilities: 108
Total defects logged: 9

$ python3 scripts/tracker/verify-evidence.py
Evidence Verification: Checked 202 source file references across 108 capabilities.
SUCCESS: 100% of referenced source files verified to exist on disk.
```

---

### 3. Application Route Matrix

The active client-side routing in [frontend/src/App.tsx](file:///Users/apple/projects/vetri-tncm-aios/frontend/src/App.tsx) responds to hash-based navigation:

1. `#cm-command` / `""`: Executive CM Command Center
2. `#todays-briefing`: Daily Morning Strategic Briefing
3. `#action-tracker`: 7-Stage CM Directives Execution Tracker
4. `#my-decisions`: Executive Decisions History
5. `#task-assignments`: Official Task Allocation Pipeline
6. `#explore`: 22+ Dashboards & Capabilities Catalog
7. `#directory`: Unified Government Directory (787+ records)
8. `#ministers-mlas`: Council of Ministers & 234 MLAs
9. `#civil-services`: IAS, IPS, IRS, IFS Rosters
10. `#hierarchy`: 21-Tier Secretariat-to-Village Org Tree
11. `#data-sync`: ETL Connectors & Audit Logs
12. `#ministries`: 35 Cabinet Ministries & Allocations
13. `#departments`: 42 Secretariat Departments & Budget Spend %
14. `#sub-departments`: Directorate Level Breakdown
15. `#districts`: 38 Revenue District Intelligence & Heatmaps
16. `#taluks`: Taluk & Block Governance
17. `#constituencies`: Assembly & Parliamentary Boundaries
18. `#revenue`: Commercial Taxes, S-GST & Excise Analytics
19. `#expenditure`: Capital vs. Revenue Burn Rate
20. `#budget`: Annual Budget Utilization
21. `#revenue-leakage`: Financial Leakage & Procurement Risk Radar
22. `#fraud-audit`: AI Audit Anomaly Detector & Collusion Indicators
23. `#procurement`: Tender Concentration & Delay Tracking
24. `#audit-findings`: CAG Audit Compliance Tracker
25. `#schemes`: Marquee Flagship Welfare Delivery Monitoring
26. `#projects`: Mega Infrastructure Tracking (>₹100 Cr)
27. `#infrastructure`: Public Works & Transport Portfolios
28. `#citizen-services`: Mudhalvar Mugavari SLA Compliance
29. `#grievances`: Public Petition Redressal Timelines
30. `#public-safety`: Police Law & Order Intelligence
31. `#messages`: Sovereign Encrypted Government Chat
32. `#calendar`: Executive Review Calendar & NL Booking Agent
33. `#review-meetings`: Cabinet & Collector Conference Review Workspace
34. `#knowledge`: Enterprise Knowledge Hub & G.O. RAG Search
35. `#government-orders`: Statutory Government Orders Repository
36. `#policy-library`: Policy & Scheme Acts Library
37. `#knowledge-search`: Semantic Law & Order Search
38. `#data-sources`: Upstream Gazette & Data Connectors
39. `#role_view`: Persona-Adaptive Executive Cockpit
40. Deep Links (`#copilot`, `#audit-logs`, `#ai-agents`, `#risk-intelligence`, `#users-roles`, `#settings`): Currently routed to fallback or drawer triggers.
