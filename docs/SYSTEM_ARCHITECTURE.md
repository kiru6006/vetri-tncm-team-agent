# VETTRI TN AI OS — System Architecture & Technical Blueprint

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Classification:** Enterprise Tier-1 Government AI System Architecture  
> **Version:** 1.0.0

---

## 1. High-Level Architecture Overview

VETTRI TN AI OS is architected as an event-driven, micro-modular enterprise platform built on clean architecture, domain-driven boundaries, and multi-agent asynchronous intelligence.

```
┌────────────────────────────────────────────────────────────────────────┐
│               PRESENTATION LAYER (React 19 + TypeScript)               │
│  ┌───────────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │ Chief Minister Engine │  │ CS/Ministers Hub │  │ 38 Collector GIS │ │
│  └───────────┬───────────┘  └────────┬─────────┘  └────────┬─────────┘ │
│              └───────────────────────┼─────────────────────┘           │
│                                      ▼                                 │
│                   Bilingual UI Engine (Tamil / English)                │
└──────────────────────────────────────┬─────────────────────────────────┘
                                       │ HTTPS / WSS / SSE / gRPC
┌──────────────────────────────────────▼─────────────────────────────────┐
│               API GATEWAY & SECURITY PERIMETER (Zero-Trust)             │
│  • Traefik / NGINX Reverse Proxy    • JWT / OAuth2 / OIDC Token Verify  │
│  • Rate Limiting & DDoS Shield      • Audit Log Interceptor (Signed)    │
│  • RBAC / ABAC Decision Engine      • WAF (OWASP Top 10 Protected)      │
└──────────────────────────────────────┬─────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────┐
│                   FASTAPI ASYNC APPLICATION CORE                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │ State Scores │  │ Revenue Intel│  │ Health/Supply│  │ Law & Order │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴──────┐ │
│  │ Agri & Water │  │ Projects/Infra│ │ Grievances   │  │ Audit/Fraud │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │
│         └─────────────────┴──────────┬──────┴─────────────────┘        │
└──────────────────────────────────────┼─────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────┐
│                  LANGGRAPH MULTI-AGENT AI COGNITION                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                   SUPERVISOR AGENT (CM COPILOT)                  │  │
│  └───────────────┬──────────────────────────────────┬───────────────┘  │
│                  ▼                                  ▼                  │
│     ┌────────────────────────┐         ┌────────────────────────┐      │
│     │ Domain Specialized     │         │ Knowledge & Retrieval  │      │
│     │ Sub-Agents (18+ Agents)│         │ (Hybrid RAG + KG)      │      │
│     └────────────┬───────────┘         └────────────┬───────────┘      │
│                  └──────────────────────────────────┘                  │
│                                      │                                 │
│               Model Context Protocol (MCP) Tool Mesh                    │
└──────────────────────────────────────┼─────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────┐
│                     DATA & PERSISTENCE PLATFORM                        │
│  ┌────────────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ PostgreSQL 16          │  │ pgvector 0.7+    │  │ Redis 7.4       │ │
│  │ Relational Master Data │  │ Vector Embeddings│  │ Pub/Sub & Cache │ │
│  └────────────────────────┘  └──────────────────┘  └─────────────────┘ │
│  ┌────────────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ MinIO S3 Object Store  │  │ NATS / Temporal  │  │ Neo4j / Apache  │ │
│  │ (GOs, Images, Evidence)│  │ Async Workflows  │  │ Knowledge Graph │ │
│  └────────────────────────┘  └──────────────────┘  └─────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Layer-by-Layer Architectural Breakdown

### 2.1 Frontend Presentation Tier
- **Framework:** React 19 + TypeScript (strict mode) + Vite bundler.
- **Styling & Components:** Tailwind CSS v4, shadcn/ui primitives, Radix UI accessibility primitives.
- **State Management:** Zustand for client UI state; TanStack Query v5 for server cache and optimistic updates.
- **Visual Analytics:** Apache ECharts for high-density time-series data, MapLibre GL for geo-spatial district/taluk GIS tiles, AG Grid for high-performance tabular data, React Flow for process flows and agent reasoning graph traces.
- **Accessibility:** WCAG 2.1 Level AA compliant with full keyboard navigation and high-contrast modes.

### 2.2 Backend Application Core
- **Framework:** Python 3.12/3.13 + FastAPI with full asynchronous `asyncio` execution.
- **Data Validation & Typing:** Pydantic v2 schemas for request/response serialization and compile-time correctness.
- **ORM & Database Layer:** SQLAlchemy 2.0 async engine with Alembic migration version control.
- **Task Orchestration & Queues:** NATS JetStream / Temporal workflows for long-running batch analyses, document ingestion, and scheduled agent evaluations.

### 2.3 AI Cognitive & Agent Core
- **Agent Orchestrator:** LangGraph state graph with checkpointers (PostgreSQL/Redis) for stateful multi-turn human-in-the-loop workflows.
- **Tool Protocol:** Anthropic Model Context Protocol (MCP) servers exposing typed tools for live SQL execution, GIS queries, and external departmental API bridges.
- **Hybrid Retrieval (RAG):**
  - Dense semantic retrieval via `pgvector` (HNSW index, cosine distance, `text-embedding-3-large` / `nomic-embed-text`).
  - Sparse keyword retrieval via PostgreSQL Full-Text Search (tsvector BM25 ranking).
  - Reciprocal Rank Fusion (RRF) for optimal blending.
- **Knowledge Graph (KG):** Graph representations linking Departments $\leftrightarrow$ Schemes $\leftrightarrow$ Budgets $\leftrightarrow$ Districts $\leftrightarrow$ Officers $\leftrightarrow$ Contractors $\leftrightarrow$ Citizen Beneficiaries.

### 2.4 Data Tier & Persistence
- **Transactional Database:** PostgreSQL 16 configured with connection pooling (`pgbouncer`), strict row-level security (RLS), and schema isolation.
- **Cache & Message Broker:** Redis 7 Enterprise (Cluster mode) for API caching, session tokens, and live pub/sub alert channels.
- **Object Storage:** MinIO S3-compatible cluster for storing Government Orders (PDFs), satellite imagery, field officer evidence photos, and audio transcripts.

---

## 3. Reliability, Observability & Air-Gapped Deployments

1. **Observability Stack:**
   - **Metrics:** Prometheus + Grafana dashboards tracking p99 API latencies, token consumption, and agent reasoning duration.
   - **Distributed Tracing:** OpenTelemetry instrumentation across frontend, backend, and LangGraph spans.
   - **Logs:** Structured JSON logging shipped via Loki.
2. **Sovereign Air-Gapped Readiness:**
   - Fully decoupled LLM provider interfaces allowing hot-swapping between hosted enterprise APIs (Gemini 2.5 Pro, Claude 3.7 Sonnet) and on-premise sovereign clusters (Ollama/vLLM serving Llama 3.3 70B & DeepSeek R1 on State Data Centre GPUs).
