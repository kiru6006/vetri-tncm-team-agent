# VETTRI TN AI OS — Backend Architecture & Service Engineering

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Tech Stack:** Python 3.12/3.13 + FastAPI + SQLAlchemy 2 (Async) + Pydantic v2  
> **Data & Broker:** PostgreSQL 16 + pgvector + Redis 7 + NATS  
> **Version:** 1.0.0

---

## 1. Backend Design Philosophy

1. **Async-First Execution:** 100% non-blocking I/O using Python `asyncio`, asyncpg, and httpx connection pooling.
2. **Strict Domain-Driven Boundaries:** Layered architecture separating Routing (`/api/v1`), Schemas (`/schemas`), Business Domain Services (`/services`), ORM Repositories (`/models`), and Core Security (`/core`).
3. **Pydantic v2 Validation:** Rust-backed validation ensuring sub-microsecond schema validation on all inbound and outbound payloads.
4. **Resilient Middleware Pipeline:**
   - Distributed Tracing (OpenTelemetry correlation IDs)
   - Real-time Audit Logger (SHA-256 chained)
   - Token-bucket Rate Limiter per IP/User
   - Security Header Interceptor (CSP, HSTS, X-Frame-Options)

---

## 2. Core Service Modules & Endpoints

### 2.1 Executive Services (`/api/v1/executive`)
- `GET /state-score`: Returns composite 0-100 State Health Index, broken down by domain (Economy, Health, Safety, Infrastructure, Grievance).
- `GET /priority-alerts`: Aggregated high-severity alerts from all 38 districts requiring Chief Minister or Chief Secretary attention.
- `GET /budget-burn`: Real-time state-wide budget allocation vs. verified departmental expenditure.

### 2.2 District & Geospatial Services (`/api/v1/districts`)
- `GET /`: List all 38 districts with summary indicators and current Collector in charge.
- `GET /{district_code}`: Full telemetry payload including taluk rankings, pending grievance backlog, and hospital drug stocks.
- `GET /{district_code}/geojson`: High-precision polygon boundary geometry for GIS map rendering.

### 2.3 AI Copilot & Streaming WebSocket (`/api/v1/copilot`)
- `POST /chat`: Initiates LangGraph agent conversation.
- `WS /stream`: Bidirectional WebSocket streaming LLM tokens, step-by-step reasoning nodes, tool execution traces, and UI chart directives in real-time.
