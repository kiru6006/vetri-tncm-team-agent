# VETTRI TN AI OS — Project & Monorepo Structure

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Repository Layout:** Enterprise Polyglot Monorepo  
> **Version:** 1.0.0

---

## 1. Monorepo Directory Tree

```
vetri-tncm-aios/
├── .github/
│   └── workflows/
│       ├── ci-backend.yml              # Python lint, typecheck, pytest
│       ├── ci-frontend.yml             # TypeScript lint, test, build
│       ├── ci-agents.yml               # LangGraph agent evaluation tests
│       └── deploy-production.yml       # Production CD pipeline (Helm/K8s)
├── docs/                               # Architectural and operational docs
│   ├── architecture/                   # High-level & low-level design diagrams
│   ├── api-specs/                      # OpenAPI 3.1 JSON / YAML specs
│   ├── security/                       # RBAC matrices and threat models
│   └── playbooks/                      # Disaster recovery & ops playbooks
├── infra/                              # Infrastructure as Code (IaC)
│   ├── docker/
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.agents
│   │   └── docker-compose.yml          # Full local cluster (App, DB, Redis, MinIO, NATS)
│   ├── k8s/
│   │   ├── base/                       # Kubernetes base manifests
│   │   └── overlays/
│   │       ├── dev/
│   │       ├── staging/
│   │       └── prod/                   # Production TNSDC clusters
│   └── terraform/                      # Cloud / on-prem infrastructure scripts
├── backend/                            # FastAPI Python Backend Application
│   ├── alembic/                        # Database migration scripts
│   │   └── versions/
│   ├── app/
│   │   ├── api/                        # REST & WebSocket API endpoints
│   │   │   ├── v1/
│   │   │   │   ├── auth.py             # Login, OIDC, JWT refresh, session
│   │   │   │   ├── executive.py        # CM & CS state health endpoints
│   │   │   │   ├── districts.py        # 38 district metrics & GIS geojson
│   │   │   │   ├── departments.py      # Departmental analytics & KPIs
│   │   │   │   ├── schemes.py          # Flagship scheme delivery & saturation
│   │   │   │   ├── grievances.py       # CM Helpline & petition lifecycle
│   │   │   │   ├── audit.py            # Immutable system audit logs
│   │   │   │   └── copilot.py          # Streaming AI Copilot websocket/SSE
│   │   ├── core/                       # Core configuration, security, db connection
│   │   │   ├── config.py               # Pydantic Settings management
│   │   │   ├── security.py             # JWT hashing, RBAC/ABAC guards
│   │   │   ├── database.py             # Async SQLAlchemy engine & session factory
│   │   │   ├── redis.py                # Redis client & caching decorators
│   │   │   └── events.py               # NATS / Event bus publisher
│   │   ├── models/                     # SQLAlchemy 2.0 ORM Declarative Models
│   │   │   ├── administrative.py       # State, District, Taluk, Block, Village
│   │   │   ├── users.py                # User, Role, Permission, OfficerProfile
│   │   │   ├── departments.py          # Department, Ministry, Scheme, Project
│   │   │   ├── metrics.py              # KPI, TimeSeriesMetric, Target
│   │   │   ├── grievances.py           # Grievance, Category, Resolution
│   │   │   ├── knowledge.py            # DocumentChunk, Embedding (pgvector)
│   │   │   └── audit.py                # AuditLog (immutable, hashed)
│   │   ├── schemas/                    # Pydantic v2 DTOs (Request / Response)
│   │   │   ├── auth.py
│   │   │   ├── executive.py
│   │   │   ├── district.py
│   │   │   └── copilot.py
│   │   ├── services/                   # Business Logic & Domain Services
│   │   │   ├── auth_service.py
│   │   │   ├── state_score_service.py
│   │   │   ├── anomaly_detection.py
│   │   │   └── rag_service.py
│   │   └── main.py                     # FastAPI Application Entrypoint
│   ├── pyproject.toml                  # Poetry / UV package definitions
│   └── tests/                          # Backend Pytest test suites
├── agents/                             # LangGraph Multi-Agent Cognitive Engine
│   ├── app/
│   │   ├── graphs/                     # LangGraph state graphs
│   │   │   ├── supervisor.py           # Main CM Copilot Supervisor Graph
│   │   │   ├── revenue_agent.py        # Commercial tax & revenue leak graph
│   │   │   ├── health_agent.py         # Drug stockout & hospital ops graph
│   │   │   ├── police_agent.py         # Law & order intelligence graph
│   │   │   └── fraud_agent.py          # Beneficiary fraud anomaly graph
│   │   ├── tools/                      # MCP & Custom Tool Definitions
│   │   │   ├── sql_tool.py             # Safe parameterized SQL query tool
│   │   │   ├── gis_tool.py             # Spatial query & radius search tool
│   │   │   ├── rag_tool.py             # Dense/Sparse vector hybrid search tool
│   │   │   └── tnega_bridge_tool.py    # Bridge to existing state legacy MIS
│   │   ├── prompts/                    # Versioned system prompts & templates
│   │   │   ├── en/                     # English system prompts
│   │   │   └── ta/                     # Tamil system prompts (தமிழ்)
│   │   ├── evaluation/                 # Agent benchmark & evaluation suite
│   │   └── main.py                     # Agent worker runtime & MCP server
│   └── pyproject.toml
├── frontend/                           # React 19 + TypeScript Web Application
│   ├── public/                         # Static assets, PWA manifests, icons
│   │   ├── locales/                    # i18n translation files (en/ta)
│   │   │   ├── en/
│   │   │   └── ta/
│   │   └── geojson/                    # GeoJSON boundaries for 38 TN districts
│   ├── src/
│   │   ├── assets/                     # Logos, Tamil Nadu state emblem SVG
│   │   ├── components/                 # Reusable UI Component Library
│   │   │   ├── ui/                     # shadcn/ui primitives (Button, Modal, Card...)
│   │   │   ├── executive/              # State scorecards, alert tickers, KPI cards
│   │   │   ├── maps/                   # MapLibre GL GIS overlays & choropleths
│   │   │   ├── charts/                 # Apache ECharts wrapper components
│   │   │   ├── tables/                 # AG Grid data tables with export
│   │   │   ├── copilot/                # Voice/Text AI Copilot overlay & trace viewer
│   │   │   └── layout/                 # AppShell, ExecutiveHeader, Sidebar, QuickNav
│   │   ├── features/                   # Feature-Sliced Domain Modules
│   │   │   ├── auth/                   # Login, MFA, Role selection
│   │   │   ├── cm-cockpit/             # Chief Minister Executive Cockpit
│   │   │   ├── cs-command/             # Chief Secretary Inter-Dept Command
│   │   │   ├── collector/              # 38 District Collector Portals
│   │   │   ├── revenue/                # Commercial Tax & Finance Dashboards
│   │   │   ├── health/                 # Health & Drug Inventory Portals
│   │   │   ├── police/                 # Law & Order Command View
│   │   │   └── schemes/                # Flagship Scheme Saturation Trackers
│   │   ├── hooks/                      # Custom React hooks (useCopilot, useGIS...)
│   │   ├── lib/                        # API clients, Axios/Fetch, utils, formatters
│   │   ├── stores/                     # Zustand state stores (authStore, uiStore...)
│   │   ├── types/                      # TypeScript type definitions & API contracts
│   │   ├── App.tsx                     # Top-level Router & Provider wrapper
│   │   └── main.tsx                    # React DOM entrypoint
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── 00_MASTER_PROMPT.md                 # Project Master Constitution
├── MASTER_CLAUDE_PROMPT.md             # Core prompt specification
└── README.md                           # Master Project Overview
```
