# 00\_MASTER\_PROMPT.md

# VETTRI TN AI OS — Master Engineering Prompt & Development Constitution

> **VETTRI** (*வெற்றி*) — Victory in Tamil. **VETTRI TN AI OS** — AI Operating System for Governance, Intelligence & Decision Support. Government of Tamil Nadu · Confidential — Engineering Use Only

---

## Table of Contents

1. [Project Vision](#1-project-vision)  
2. [AI Generation Rules](#2-ai-generation-rules)  
3. [Coding Standards](#3-coding-standards)  
4. [Architecture Principles](#4-architecture-principles)  
5. [Repository Rules](#5-repository-rules)  
6. [Prompt Engineering Guidelines](#6-prompt-engineering-guidelines)  
7. [Development Workflow](#7-development-workflow)  
8. [Code Review Standards](#8-code-review-standards)  
9. [Enterprise Design Principles](#9-enterprise-design-principles)  
10. [Documentation Standards](#10-documentation-standards)  
11. [AI Collaboration Strategy](#11-ai-collaboration-strategy)  
12. [GitHub Workflow](#12-github-workflow)  
13. [Testing Philosophy](#13-testing-philosophy)  
14. [Definition of Done](#14-definition-of-done)  
15. [LLM Stack & Model Selection](#15-llm-stack--model-selection)  
16. [Security Constitution](#16-security-constitution)  
17. [References](#17-references)

---

## 1\. Project Vision

### 1.1 Mission Statement

VETTRI TN AI OS is the **world's first AI-native governance operating system** built for a state government. It transforms the Government of Tamil Nadu from a **report-driven administration** into a **real-time, intelligence-driven, action-oriented command system** — giving every officer from the Chief Minister to the Taluk-level staff a unified, AI-augmented view of their domain.

### 1.2 North Star

> *"Every governance problem in Tamil Nadu should be discovered, diagnosed, assigned, and resolved faster because VETTRI exists."*

### 1.3 Core Pillars

| Pillar | Description |
| :---- | :---- |
| **Intelligence** | AI-generated insights, not manual reports |
| **Accountability** | Every issue owned, tracked, verified |
| **Speed** | From problem → resolution in minimum time |
| **Evidence** | Ground-truth data, field evidence, GPS-tagged proof |
| **Prediction** | Act before problems become crises |
| **Citizen-first** | Every metric traces back to citizen impact |

### 1.4 What VETTRI Is NOT

- Not a data warehouse or BI tool  
- Not a citizen-facing portal  
- Not a replacement for existing departmental MIS  
- Not a reporting dashboard — it is an **action system**

### 1.5 Document Hierarchy

00\_MASTER\_PROMPT.md          ← This document (constitution)

01\_PRODUCT\_REQUIREMENTS.md   ← What to build

02\_SYSTEM\_ARCHITECTURE.md    ← How it fits together

03\_TECH\_STACK\_AND\_STANDARDS.md ← What to build with

04\_DATABASE\_AND\_DATA\_PLATFORM.md ← Data layer

05\_AI\_PLATFORM\_AND\_AGENTS.md ← AI brain

06\_FRONTEND\_DESIGN\_SYSTEM.md ← What it looks like

07\_BACKEND\_SERVICES.md       ← API layer

08\_DASHBOARDS\_AND\_USER\_PERSONAS.md ← Who uses what

09\_MODULE\_SPECIFICATIONS.md  ← Department modules

10\_DEVOPS\_SECURITY\_DEPLOYMENT.md ← How to ship

11\_IMPLEMENTATION\_ROADMAP.md ← When to ship

12\_SAMPLE\_DATA\_AND\_DEMO\_SCENARIOS.md ← Demo content

13\_GOVERNANCE\_TRANSFORMATION\_PLAYBOOK.md ← Strategy

---

## 2\. AI Generation Rules

All AI-assisted code generation in this project — whether via Cursor, GitHub Copilot, Claude, or direct LLM prompting — must follow these rules without exception.

### 2.1 Mandatory Preamble for Every AI Prompt

Every prompt sent to any AI system during VETTRI development must begin with this context block:

CONTEXT: VETTRI TN AI OS — Government of Tamil Nadu

ROLE: \[Your assigned role e.g. "Senior Backend Engineer"\]

MODULE: \[Module name e.g. "Revenue Intelligence"\]

TASK: \[Specific task\]

CONSTRAINTS:

  \- Language: Python 3.12+ / TypeScript 5.3+

  \- Framework: FastAPI / React 19

  \- LLM: Gemini 1.5 Flash (primary) | Groq Llama 3.1 (secondary) | Ollama (air-gapped)

  \- DB: PostgreSQL 16 \+ pgvector \+ Redis 7

  \- Style: PEP8 (Python) | Airbnb ESLint (TypeScript)

  \- Security: No hardcoded secrets. All env via .env \+ Vault.

  \- Tests: Every function needs a unit test.

  \- No placeholder text. Production-grade only.

OUTPUT FORMAT: \[code | diagram | schema | document\]

### 2.2 Code Generation Rules

| Rule | Requirement |
| :---- | :---- |
| **No stubs** | Every generated function must be fully implemented |
| **No TODOs** | If it cannot be built now, raise it as a GitHub Issue |
| **Type safety** | All Python code uses type hints. All TS uses strict mode |
| **Error handling** | Every function handles its own exceptions explicitly |
| **Logging** | Every service logs to structured JSON (structlog / Winston) |
| **Tests** | Minimum one unit test per public function |
| **Security** | No secrets in code. Input validation on every API endpoint |
| **Docstrings** | Every function/class has a docstring (Google style, Python) |
| **No global state** | All state via dependency injection or context managers |
| **Idempotency** | All background jobs must be idempotent |

### 2.3 AI Hallucination Prevention Rules

- Never ask AI to generate Tamil Nadu government statistics — use real data from `src/data/` or the database  
- Never accept AI-generated SQL without a human review and `EXPLAIN ANALYZE`  
- Never accept AI-generated security code (auth, encryption, JWT) without a security engineer sign-off  
- All AI-generated API contracts must be validated against `openapi.yaml` before use  
- AI-generated Mermaid diagrams must render without errors before committing

### 2.4 Prompt Quality Checklist

Before sending any prompt to an AI system:

- [ ] Context block included?  
- [ ] Specific module named?  
- [ ] Output format specified?  
- [ ] Constraints listed?  
- [ ] Examples provided for complex tasks?  
- [ ] Expected test cases described?

---

## 3\. Coding Standards

### 3.1 Python Standards (Backend / AI)

\# ✅ CORRECT — VETTRI standard

from \_\_future\_\_ import annotations

from dataclasses import dataclass

from typing import Optional

import structlog

log \= structlog.get\_logger(\_\_name\_\_)

@dataclass

class DepartmentRisk:

    """Represents a computed risk score for a TN government department.

    Attributes:

        dept\_id: Unique department identifier (UUID).

        score: Risk score 0–100. Higher \= more risk.

        severity: One of 'critical', 'high', 'medium', 'low'.

        reason: Human-readable AI-generated explanation.

    """

    dept\_id: str

    score: float

    severity: str

    reason: str

    def is\_critical(self) \-\> bool:

        """Return True if the department requires CM-level escalation."""

        return self.score \>= 80.0

async def compute\_department\_risk(dept\_id: str) \-\> Optional\[DepartmentRisk\]:

    """Compute an AI-driven risk score for a department.

    Args:

        dept\_id: UUID of the department record.

    Returns:

        DepartmentRisk if computation succeeds, None on failure.

    Raises:

        ValueError: If dept\_id is empty or malformed.

    """

    if not dept\_id or not dept\_id.strip():

        raise ValueError(f"dept\_id cannot be empty: {dept\_id\!r}")

    log.info("computing\_department\_risk", dept\_id=dept\_id)

    try:

        \# Implementation

        ...

    except Exception as exc:

        log.error("risk\_computation\_failed", dept\_id=dept\_id, error=str(exc))

        return None

**Key rules:**

- `from __future__ import annotations` in every file  
- `structlog` for all logging — never `print()`  
- `async/await` for all I/O (DB, HTTP, LLM calls)  
- `dataclass` or `pydantic.BaseModel` for all data structures — never raw dicts  
- `Optional[X]` over `X | None` for Python \<3.10 compatibility targets  
- Maximum function length: **50 lines**. Split if longer.  
- Maximum file length: **400 lines**. Split into modules if longer.

### 3.2 TypeScript Standards (Frontend)

// ✅ CORRECT — VETTRI standard

import type { FC } from 'react';

import { useCallback, useMemo, useState } from 'react';

interface DepartmentCardProps {

  deptId: string;

  name: string;

  riskScore: number;

  onDrill: (deptId: string) \=\> void;

}

/\*\*

 \* DepartmentCard — displays a single department's risk score

 \* and triggers the drill-down navigation on click.

 \*/

const DepartmentCard: FC\<DepartmentCardProps\> \= ({

  deptId,

  name,

  riskScore,

  onDrill,

}) \=\> {

  const \[isHovered, setIsHovered\] \= useState(false);

  const severity \= useMemo(() \=\> {

    if (riskScore \>= 80\) return 'critical';

    if (riskScore \>= 60\) return 'high';

    if (riskScore \>= 40\) return 'medium';

    return 'low';

  }, \[riskScore\]);

  const handleClick \= useCallback(() \=\> {

    onDrill(deptId);

  }, \[deptId, onDrill\]);

  return (

    \<div

      data-testid={\`dept-card-\${deptId}\`}

      className={\`dept-card dept-card--\${severity}\`}

      onClick={handleClick}

      onMouseEnter={() \=\> setIsHovered(true)}

      onMouseLeave={() \=\> setIsHovered(false)}

      role="button"

      tabIndex={0}

      aria-label={\`\${name} — Risk score \${riskScore}\`}

    \>

      \<span className="dept-card\_\_name"\>{name}\</span\>

      \<span className="dept-card\_\_score"\>{riskScore}\</span\>

    \</div\>

  );

};

export default DepartmentCard;

**Key rules:**

- `type` keyword for type-only imports  
- No `any`. Use `unknown` and narrow it.  
- `useMemo` / `useCallback` for every derived value and callback in components  
- `data-testid` on every interactive element  
- ARIA attributes on every interactive element  
- Named exports for hooks, default exports for components  
- Strict ESLint (Airbnb config extended)

### 3.3 SQL Standards

\-- ✅ CORRECT — VETTRI standard

\-- Always: explicit column list, no SELECT \*

\-- Always: table aliases, parameterized queries

\-- Always: EXPLAIN ANALYZE before merging any new query

SELECT

    d.dept\_id,

    d.name,

    d.risk\_score,

    d.updated\_at,

    m.name AS minister\_name

FROM departments d

INNER JOIN ministers m ON m.dept\_id \= d.dept\_id

WHERE

    d.status \= 'active'

    AND d.risk\_score \>= \$1  \-- parameterized, never interpolated

ORDER BY d.risk\_score DESC

LIMIT 50;

\-- ❌ NEVER — blocked in code review

SELECT \* FROM departments WHERE id \= '\${user\_input}';

### 3.4 API Response Standards

All VETTRI APIs return a consistent envelope:

{

  "success": true,

  "data": { },

  "meta": {

    "request\_id": "uuid-v4",

    "timestamp": "ISO8601",

    "version": "v1",

    "duration\_ms": 42

  },

  "error": null

}

Error response:

{

  "success": false,

  "data": null,

  "meta": { "request\_id": "uuid", "timestamp": "ISO8601" },

  "error": {

    "code": "DEPT\_NOT\_FOUND",

    "message": "Department with id 'xyz' does not exist.",

    "details": {},

    "doc\_url": "https://docs.vettri.tn.gov.in/errors/DEPT\_NOT\_FOUND"

  }

}

---

## 4\. Architecture Principles

### 4.1 The Ten Architecture Commandments

1. **API-first.** Every capability is an API before it is a UI feature.  
2. **Event-driven.** State changes publish events. Consumers react asynchronously.  
3. **Stateless services.** No service holds state in memory across requests. State lives in DB/cache.  
4. **Domain boundaries.** Revenue, Health, Police, Water — each is a bounded context with its own schema prefix.  
5. **Fail gracefully.** Every service has a circuit breaker. The CM dashboard must remain usable even if 30% of department feeds are down.  
6. **Observe everything.** Every request, event, LLM call, and background job emits OpenTelemetry spans.  
7. **Secure by default.** No endpoint is public. Every call is authenticated \+ authorized \+ rate-limited.  
8. **Idempotency first.** All writes are idempotent. Retries are safe.  
9. **Air-gap capable.** Every AI feature must have an Ollama-local fallback for sensitive/classified data.  
10. **Human in the loop.** AI recommends. Humans approve. Especially for escalations, alerts, and CM-level actions.

### 4.2 Service Decomposition

graph TD

    subgraph API\_Gateway\["API Gateway Layer"\]

        GW\[Kong API Gateway\]

    end

    subgraph Core\_Services\["Core Services"\]

        AUTH\[auth-service\]

        NOTIF\[notification-service\]

        AUDIT\[audit-service\]

        FILE\[file-service\]

        SEARCH\[search-service\]

    end

    subgraph Domain\_Services\["Domain Intelligence Services"\]

        REV\[revenue-service\]

        HEALTH\[health-service\]

        EDU\[education-service\]

        WATER\[water-service\]

        POWER\[power-service\]

        POLICE\[police-service\]

        AGRI\[agriculture-service\]

        TRANSPORT\[transport-service\]

        DISASTER\[disaster-service\]

    end

    subgraph AI\_Layer\["AI Platform"\]

        AGENT\_ORCH\[agent-orchestrator\]

        RAG\[rag-engine\]

        ALERT\_AI\[alert-predictor\]

        GRIEVANCE\_AI\[grievance-router\]

    end

    subgraph Data\_Layer\["Data Platform"\]

        PG\[(PostgreSQL 16\\n+ pgvector)\]

        REDIS\[(Redis 7)\]

        KAFKA\[Kafka / Redpanda\]

        LAKE\[MinIO Data Lake\]

    end

    GW \--\> AUTH

    GW \--\> Core\_Services

    GW \--\> Domain\_Services

    Domain\_Services \--\> AI\_Layer

    AI\_Layer \--\> Data\_Layer

    Core\_Services \--\> Data\_Layer

    Domain\_Services \--\> KAFKA

    KAFKA \--\> AI\_Layer

### 4.3 Data Flow Principle

sequenceDiagram

    participant Field as Field Officer App

    participant GW as API Gateway

    participant DS as Domain Service

    participant K as Kafka

    participant AI as AI Orchestrator

    participant DB as PostgreSQL

    participant CM as CM Dashboard

    Field-\>\>GW: POST /api/v1/incidents (JWT)

    GW-\>\>DS: Forward \+ validate

    DS-\>\>DB: Persist incident

    DS-\>\>K: Publish incident.created

    K-\>\>AI: Consume incident.created

    AI-\>\>AI: Analyze \+ score \+ predict

    AI-\>\>DB: Persist risk\_score, recommendation

    AI-\>\>K: Publish alert.generated (if critical)

    K-\>\>CM: WebSocket push → CM sees alert in \<2s

### 4.4 Architecture Decision Records (ADR) — Pre-approved

| ADR \# | Decision | Rationale |
| :---- | :---- | :---- |
| ADR-001 | PostgreSQL 16 as primary DB | pgvector support, ACID, mature, free |
| ADR-002 | Gemini 1.5 Flash as primary LLM | 1M context, free tier, Tamil language support |
| ADR-003 | Groq \+ Llama 3.1 as secondary LLM | Fastest free inference, fallback |
| ADR-004 | Ollama for air-gapped/sensitive workloads | No data leaves govt infra |
| ADR-005 | FastAPI over Django | Async-native, OpenAPI auto-gen, lighter |
| ADR-006 | React 19 \+ Vite over Next.js | No SSR needed; all data behind auth |
| ADR-007 | Kafka/Redpanda over RabbitMQ | Log-based, replay, scale |
| ADR-008 | Kong over Nginx | Plugin ecosystem, auth, rate-limiting built-in |
| ADR-009 | LangGraph over CrewAI | Stateful graph, better control flow for govt workflows |
| ADR-010 | MinIO over S3 | Self-hosted, free, S3-compatible |

---

## 5\. Repository Rules

### 5.1 Monorepo Structure

vettri-tn-ai-os/

├── .github/

│   ├── workflows/

│   │   ├── ci.yml

│   │   ├── cd-staging.yml

│   │   └── cd-production.yml

│   ├── PULL\_REQUEST\_TEMPLATE.md

│   └── ISSUE\_TEMPLATE/

├── apps/

│   ├── web/                    \# React 19 frontend (Vite)

│   ├── field-app/              \# React Native field officer app

│   └── admin/                  \# Admin panel (React 19\)

├── services/

│   ├── api-gateway/            \# Kong config

│   ├── auth-service/           \# FastAPI

│   ├── audit-service/          \# FastAPI

│   ├── notification-service/   \# FastAPI

│   ├── file-service/           \# FastAPI \+ MinIO

│   ├── search-service/         \# FastAPI \+ pgvector

│   ├── revenue-service/        \# FastAPI

│   ├── health-service/         \# FastAPI

│   ├── education-service/      \# FastAPI

│   ├── water-service/          \# FastAPI

│   ├── power-service/          \# FastAPI

│   ├── police-service/         \# FastAPI

│   ├── agriculture-service/    \# FastAPI

│   ├── transport-service/      \# FastAPI

│   └── disaster-service/       \# FastAPI

├── ai/

│   ├── agent-orchestrator/     \# LangGraph agents

│   ├── rag-engine/             \# RAG pipeline

│   ├── alert-predictor/        \# Predictive models

│   ├── grievance-router/       \# NLP router

│   └── prompts/                \# Versioned prompt library

├── data/

│   ├── migrations/             \# Alembic migrations

│   ├── seeds/                  \# Sample TN data

│   └── schemas/                \# JSON schemas \+ OpenAPI specs

├── infra/

│   ├── terraform/              \# IaC

│   ├── kubernetes/             \# Helm charts

│   ├── docker/                 \# Dockerfiles

│   └── monitoring/             \# Prometheus \+ Grafana configs

├── docs/

│   ├── 00\_MASTER\_PROMPT.md

│   ├── 01\_PRODUCT\_REQUIREMENTS.md

│   └── ...

├── scripts/

│   ├── setup.sh

│   ├── seed-db.sh

│   └── run-local.sh

├── tests/

│   ├── e2e/

│   ├── integration/

│   └── load/

├── .env.example

├── .gitignore

├── docker-compose.yml

├── docker-compose.prod.yml

├── CONTRIBUTING.md

├── SECURITY.md

└── README.md

### 5.2 Branch Protection Rules

- `main` — production. **Direct push blocked.** Requires 2 approvals \+ CI green.  
- `staging` — staging. Requires 1 approval \+ CI green.  
- `develop` — integration branch. Requires CI green.  
- Feature branches: `feat/module-short-description`  
- Bug branches: `fix/issue-number-short-description`  
- Hotfix branches: `hotfix/critical-short-description`

### 5.3 Commit Message Convention (Conventional Commits)

\<type\>(\<scope\>): \<imperative-mood description\>

\[optional body — what and why, not how\]

\[optional footer — Issue: \#123 | BREAKING CHANGE: ...\]

| Type | When to use |
| :---- | :---- |
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code change, no feature/fix |
| `perf` | Performance improvement |
| `test` | Adding/fixing tests |
| `docs` | Documentation only |
| `chore` | Build, CI, tooling |
| `security` | Security fix |
| `data` | DB migrations, seeds |

**Examples:**

feat(revenue): add GST fraud detection anomaly score endpoint

fix(auth): handle expired JWT refresh token edge case

data(migrations): add pgvector extension \+ embeddings column to dept table

security(auth): enforce rate limiting on /login to 5 req/min per IP

---

## 6\. Prompt Engineering Guidelines

### 6.1 Prompt Taxonomy for VETTRI

Every prompt in the `ai/prompts/` directory follows this taxonomy:

ai/prompts/

├── system/

│   ├── cm\_advisor.txt          \# CM-level strategic analysis

│   ├── district\_analyst.txt    \# District-level operational analysis

│   ├── grievance\_router.txt    \# Grievance triage and routing

│   └── fraud\_detector.txt      \# Revenue fraud detection

├── user/

│   ├── dept\_risk\_query.txt

│   ├── scheme\_analysis.txt

│   └── early\_warning\_query.txt

├── few\_shot/

│   ├── tamil\_grievance\_examples.json

│   ├── budget\_analysis\_examples.json

│   └── risk\_classification\_examples.json

└── templates/

    ├── base\_analysis.jinja2

    └── escalation\_report.jinja2

### 6.2 System Prompt Standard (VETTRI Base)

Every VETTRI AI agent system prompt must include:

You are VETTRI AI, an AI governance intelligence system for the Government of Tamil Nadu.

ROLE: {agent\_role}

CURRENT USER: {user\_role} — {user\_name}, {department}

CONTEXT DATE: {iso\_date}

DATA FRESHNESS: {last\_updated}

BEHAVIORAL RULES:

1\. Always cite the data source and timestamp when stating any fact or figure.

2\. Never invent statistics, department names, scheme names, or officer names.

3\. Flag uncertainty explicitly: "Based on data as of {date}, I estimate..."

4\. Prioritize citizen impact over departmental metrics.

5\. Escalation threshold: Any issue affecting \>10,000 citizens or involving ₹10 Cr+ leakage must recommend CM-level attention.

6\. Language: Respond in English. If user writes in Tamil, respond in Tamil.

7\. Structured output: Always return JSON when the calling function expects structured data.

8\. Human approval: Never autonomously send alerts to the CM. Always route through human review queue.

AVAILABLE TOOLS: {tool\_list}

DEPARTMENT CONTEXT: {dept\_context\_json}

### 6.3 Prompt Versioning

All prompts are versioned in the Git repository. Changes to prompts require:

1. A new file version: `cm_advisor_v2.txt`  
2. A/B test results before graduating to production  
3. PR with eval scores attached

### 6.4 Structured Output Enforcement

Every LLM call that feeds a dashboard widget or API response **must** use structured output mode:

\# ✅ CORRECT — Gemini structured output

from google.generativeai import GenerativeModel

from pydantic import BaseModel

class DeptRiskOutput(BaseModel):

    dept\_id: str

    risk\_level: Literal\["critical", "high", "medium", "low"\]

    score: float

    top\_issues: list\[str\]

    recommendation: str

    escalate\_to\_cm: bool

    confidence: float

model \= GenerativeModel("gemini-1.5-flash")

response \= model.generate\_content(

    prompt,

    generation\_config={"response\_mime\_type": "application/json"},

)

result \= DeptRiskOutput.model\_validate\_json(response.text)

---

## 7\. Development Workflow

### 7.1 Feature Development Lifecycle

flowchart TD

    A\[GitHub Issue created\\nwith acceptance criteria\] \--\> B\[Issue assigned in sprint\]

    B \--\> C\[Developer creates branch\\nfeat/issue-num-description\]

    C \--\> D\[Local development\\nwith docker-compose\]

    D \--\> E\[Unit tests written first\\nTDD preferred\]

    E \--\> F\[Implementation\]

    F \--\> G\[Self-review checklist\]

    G \--\> H{All checks pass?}

    H \-- No \--\> F

    H \-- Yes \--\> I\[Push branch\\nCI triggers\]

    I \--\> J{CI green?}

    J \-- No \--\> F

    J \-- Yes \--\> K\[Open Pull Request\]

    K \--\> L\[Code review ×2\]

    L \--\> M{Approved?}

    M \-- Changes requested \--\> F

    M \-- Yes \--\> N\[Merge to develop\]

    N \--\> O\[Auto-deploy to staging\]

    O \--\> P\[QA verification\]

    P \--\> Q{Pass?}

    Q \-- No \--\> F

    Q \-- Yes \--\> R\[Merge to staging → main\\nper release cycle\]

### 7.2 Local Development Setup

\# Prerequisites: Docker Desktop, Node 20+, Python 3.12+, uv

git clone git@github.com:tn-gov/vettri-tn-ai-os.git

cd vettri-tn-ai-os

\# Copy environment

cp .env.example .env

\# Edit .env — add your free API keys:

\# GEMINI\_API\_KEY=your\_key

\# GROQ\_API\_KEY=your\_key

\# (Ollama runs locally — no key needed)

\# Start all services

docker-compose up \-d

\# Database setup

./scripts/setup-db.sh

\# Seed Tamil Nadu sample data

./scripts/seed-db.sh

\# Start frontend

cd apps/web && npm install && npm run dev

\# Start a specific service

cd services/revenue-service

uv sync

uv run uvicorn main:app \--reload \--port 8001

### 7.3 Sprint Cadence

| Event | Frequency | Duration |
| :---- | :---- | :---- |
| Sprint Planning | Bi-weekly Monday | 2 hours |
| Daily Standup | Daily 9:30 AM IST | 15 min |
| Sprint Demo | Bi-weekly Friday | 1 hour |
| Sprint Retro | Bi-weekly Friday | 45 min |
| Architecture Review | Monthly | 2 hours |
| Security Review | Monthly | 1 hour |

---

## 8\. Code Review Standards

### 8.1 Reviewer Responsibilities

Every PR requires **2 approvals** for `main`, **1 approval** for `develop`. Reviewers must check:

**Functionality**

- [ ] Does it do what the issue/ticket says?  
- [ ] Are edge cases handled?  
- [ ] Is error handling complete?

**Code Quality**

- [ ] Follows VETTRI coding standards (§3)?  
- [ ] No function \> 50 lines?  
- [ ] No file \> 400 lines?  
- [ ] No hardcoded secrets, URLs, or magic numbers?  
- [ ] Type hints complete (Python) / strict types (TS)?

**Testing**

- [ ] Unit tests present for all public functions?  
- [ ] Coverage \>= 80% on changed files?  
- [ ] Edge cases tested?

**Security**

- [ ] Input validation on all API endpoints?  
- [ ] SQL queries parameterized?  
- [ ] No sensitive data in logs?  
- [ ] Auth checks in place?

**Performance**

- [ ] Any new SQL query has `EXPLAIN ANALYZE` output in PR?  
- [ ] No N+1 queries?  
- [ ] Pagination on all list endpoints?

**AI-Specific**

- [ ] LLM calls have timeout \+ fallback?  
- [ ] Structured output validated with Pydantic?  
- [ ] Prompt version pinned?  
- [ ] No PII sent to external LLM APIs (Gemini/Groq)?

### 8.2 PR Template

\#\# Summary

\<\!-- One paragraph: what and why \--\>

\#\# Type of Change

\- \[ \] feat: New feature

\- \[ \] fix: Bug fix

\- \[ \] refactor: Code improvement

\- \[ \] security: Security fix

\- \[ \] data: Migration / seed

\#\# Issue

Closes \#\[issue-number\]

\#\# Testing

\- \[ \] Unit tests added/updated

\- \[ \] Tested locally with docker-compose

\- \[ \] Staging tested (if applicable)

\#\# Screenshots / Evidence

\<\!-- Dashboard screenshot, API response, test output \--\>

\#\# Checklist

\- \[ \] Self-reviewed

\- \[ \] Coding standards followed

\- \[ \] No hardcoded secrets

\- \[ \] EXPLAIN ANALYZE attached (if new SQL)

\- \[ \] Prompt version documented (if AI change)

---

## 9\. Enterprise Design Principles

### 9.1 UX Principles for Governance Dashboards

| Principle | Implementation |
| :---- | :---- |
| **7-Second Rule** | The CM must understand the state's top risk in under 7 seconds on the dashboard |
| **Action-oriented** | Every widget answers: What is wrong? Who owns it? What action is happening? |
| **Evidence-first** | Every alert links to field evidence (photos, GPS, reports) |
| **Hierarchy-aware** | CM sees state; Minister sees department; Collector sees district. Always the right scope. |
| **Mobile-ready** | 100% functional on a phone. Field officers use mobile exclusively. |
| **Offline-first (Field App)** | Field officer app works without internet. Syncs when connected. |
| **Tamil \+ English** | Every user-facing string is bilingual. Tamil is primary for field staff. |

### 9.2 Accessibility Standards

- WCAG 2.1 AA compliance mandatory  
- Color is never the only indicator of status — always pair with text/icon  
- All interactive elements keyboard-navigable  
- Screen reader tested on NVDA \+ VoiceOver

### 9.3 Performance Budgets

| Metric | Target |
| :---- | :---- |
| CM Dashboard initial load | \< 2.5s (LCP) |
| API response (p95) | \< 300ms |
| AI recommendation latency (p95) | \< 5s |
| WebSocket alert delivery | \< 2s from event |
| Field app sync (100 records) | \< 10s on 3G |
| Dashboard widget render | \< 100ms |

---

## 10\. Documentation Standards

### 10.1 Code Documentation

**Python — Google Docstring style:**

def score\_department(dept\_data: DeptData, weights: ScoringWeights) \-\> RiskScore:

    """Compute a composite risk score for a government department.

    Uses a weighted average of budget utilization, grievance count,

    project delay rate, and AI sentiment analysis.

    Args:

        dept\_data: Current department metrics fetched from the DB.

        weights: Scoring weights from the active scoring configuration.

    Returns:

        RiskScore dataclass with score (0–100), severity, and explanation.

    Raises:

        ScoringError: If dept\_data is missing required fields.

    Example:

        \>\>\> score \= score\_department(dept\_data, default\_weights)

        \>\>\> print(score.severity)

        'high'

    """

**TypeScript — JSDoc style:**

/\*\*

 \* Formats a raw risk score (0–100) into a display-ready severity label.

 \*

 \* @param score \- Raw risk score from the backend

 \* @returns Severity label: 'critical' | 'high' | 'medium' | 'low'

 \*

 \* @example

 \* formatSeverity(85) // returns 'critical'

 \* formatSeverity(45) // returns 'medium'

 \*/

### 10.2 Architecture Diagram Rules

- All architecture diagrams in **Mermaid** inside Markdown  
- Every diagram has a title and description  
- Diagrams are kept in `docs/diagrams/` AND inline in the relevant doc  
- Updated in the same PR as the code change

### 10.3 API Documentation

- FastAPI auto-generates OpenAPI 3.1 — **always valid**  
- Every endpoint has: summary, description, request example, response example, error codes  
- API docs published at `/api/v1/docs` (Swagger) and `/api/v1/redoc`  
- Public API changelog maintained in `CHANGELOG.md`

---

## 11\. AI Collaboration Strategy

### 11.1 Human-AI Division of Responsibility

quadrantChart

    title VETTRI Human-AI Responsibility Matrix

    x-axis Low Consequence \--\> High Consequence

    y-axis AI Decides \--\> Human Decides

    AI Route Grievances: \[0.2, 0.2\]

    AI Generate Daily Digest: \[0.15, 0.25\]

    AI Flag Anomalies: \[0.3, 0.3\]

    AI Recommend Action: \[0.5, 0.6\]

    Human Approve Escalation: \[0.7, 0.8\]

    Human Approve CM Alert: \[0.85, 0.9\]

    Human Approve Policy Change: \[0.9, 0.95\]

    Human Final Decision: \[0.95, 0.98\]

### 11.2 AI Safety Rules (Non-Negotiable)

1. **No autonomous action on citizen data.** AI may read, analyze, and recommend. A human must confirm before any write operation that affects citizens.  
2. **No PII to external LLMs.** Citizens' names, Aadhaar, addresses, phone numbers must be anonymized before any Gemini/Groq API call. Ollama (local) may handle PII.  
3. **Confidence threshold gate.** AI recommendations below 70% confidence are held for human review before displaying.  
4. **Explainability mandatory.** Every AI recommendation includes a `reason` field in plain English (and Tamil where applicable).  
5. **Audit trail.** Every AI output is logged to the audit service with: model name, version, prompt hash, output, confidence, user who acted on it.  
6. **Override always possible.** Any officer can override an AI recommendation with a documented reason. The override is logged.

---

## 12\. GitHub Workflow

### 12.1 CI Pipeline (`.github/workflows/ci.yml`)

flowchart LR

    Push \--\> Lint

    Lint \--\> TypeCheck

    TypeCheck \--\> UnitTests

    UnitTests \--\> SecurityScan

    SecurityScan \--\> BuildDocker

    BuildDocker \--\> IntegrationTests

    IntegrationTests \--\> CoverageCheck

    CoverageCheck \--\> Done

**Each stage:**

| Stage | Tool | Threshold |
| :---- | :---- | :---- |
| Lint | Ruff (Python), ESLint (TS) | Zero warnings |
| Type Check | mypy (Python), tsc \--noEmit (TS) | Zero errors |
| Unit Tests | pytest / Vitest | Must pass |
| Security Scan | Bandit (Python), npm audit | No HIGH/CRITICAL |
| Build Docker | docker build | Must succeed |
| Integration Tests | pytest \+ testcontainers | Must pass |
| Coverage | Coverage.py / c8 | \>= 80% |

### 12.2 CD Pipeline

- **Staging:** Auto-deploy on merge to `staging` branch  
- **Production:** Manual trigger after staging sign-off, requires 2 approvals

---

## 13\. Testing Philosophy

### 13.1 Testing Pyramid

         /\\

        /  \\

       / E2E \\          ← 10% — Critical user journeys only

      /--------\\

     / Integration\\     ← 20% — Service-to-service contracts

    /--------------\\

   /   Unit Tests   \\   ← 70% — Every function, every edge case

  /------------------\\

### 13.2 Test Standards

**Unit Test (Python):**

import pytest

from vettri.revenue.scoring import compute\_department\_risk

@pytest.mark.asyncio

async def test\_critical\_risk\_flagged\_correctly():

    """Risk score \>=80 must return severity='critical'."""

    result \= await compute\_department\_risk("dept-revenue-001")

    assert result is not None

    assert result.score \>= 0

    assert result.severity in ("critical", "high", "medium", "low")

@pytest.mark.asyncio

async def test\_empty\_dept\_id\_raises\_value\_error():

    with pytest.raises(ValueError, match="dept\_id cannot be empty"):

        await compute\_department\_risk("")

**Unit Test (TypeScript / Vitest):**

import { describe, it, expect } from 'vitest';

import { formatSeverity } from './utils';

describe('formatSeverity', () \=\> {

  it('returns critical for score \>= 80', () \=\> {

    expect(formatSeverity(85)).toBe('critical');

    expect(formatSeverity(80)).toBe('critical');

  });

  it('returns low for score \< 40', () \=\> {

    expect(formatSeverity(0)).toBe('low');

    expect(formatSeverity(39)).toBe('low');

  });

});

### 13.3 AI Output Testing

Every AI agent has an **eval suite** in `ai/evals/`:

- Minimum 50 real-world test cases per agent  
- Automated scoring via LLM-as-judge (Gemini evaluates Groq output and vice versa)  
- Regression test runs on every prompt change  
- Eval scores tracked in `ai/evals/scores/` — must not drop \>5% between versions

---

## 14\. Definition of Done

A feature or story is **Done** only when ALL of the following are true:

### Code

- [ ] Implementation complete per acceptance criteria  
- [ ] All coding standards followed (§3)  
- [ ] No linting or type errors  
- [ ] Docstrings/JSDoc complete  
- [ ] No hardcoded secrets, magic numbers, or TODOs

### Testing

- [ ] Unit tests written and passing  
- [ ] Coverage ≥ 80% on changed files  
- [ ] Integration test (if cross-service) passing  
- [ ] AI eval scores not regressed (if AI change)  
- [ ] Manually tested in local docker-compose

### Documentation

- [ ] Relevant doc updated (API spec, module spec, ADR if applicable)  
- [ ] PR description complete with evidence  
- [ ] CHANGELOG.md updated if public API changed

### Review

- [ ] 2 approvals (main) / 1 approval (develop)  
- [ ] All review comments resolved  
- [ ] CI green

### Deployment

- [ ] Merged to develop  
- [ ] Staging deploy successful  
- [ ] Smoke test on staging passed  
- [ ] PO/QA sign-off

---

## 15\. LLM Stack & Model Selection

### 15.1 Free LLM Tier Strategy

VETTRI is built entirely on **free-tier and open-source LLMs** — no enterprise API costs.

flowchart TD

    REQ\[Incoming AI Request\] \--\> CLASSIFY{Data Classification}

    CLASSIFY \--\>|Public / non-PII| GEMINI

    CLASSIFY \--\>|Speed-critical, non-PII| GROQ

    CLASSIFY \--\>|PII / Sensitive / Air-gapped| OLLAMA

    GEMINI\[Gemini 1.5 Flash\\nGoogle AI Studio\\nFree: 1M tokens/min\\n1M context window\]

    GROQ\[Groq \+ Llama 3.1 70B\\nFree: 6,000 req/day\\nFastest inference \~300 tok/s\]

    OLLAMA\[Ollama Local\\nLlama 3.2 3B/8B\\nMistral 7B\\nno data leaves server\]

    GEMINI \--\>|Fallback| GROQ

    GROQ \--\>|Fallback| OLLAMA

### 15.2 Model Assignment by Task

| Task | Primary Model | Secondary | Air-gap |
| :---- | :---- | :---- | :---- |
| CM daily digest | Gemini 1.5 Flash | Groq Llama 3.1 70B | Llama 3.2 8B |
| Grievance routing (Tamil NLP) | Gemini 1.5 Flash | — | Ollama Mistral 7B |
| Revenue fraud detection | Gemini 1.5 Pro | Groq | — |
| Risk scoring analysis | Gemini 1.5 Flash | Groq Llama 3.1 8B | Llama 3.2 3B |
| Document summarization | Gemini 1.5 Flash | — | Ollama |
| Vector embeddings | `text-embedding-004` (Google, free) | nomic-embed-text (Ollama) | nomic-embed-text |
| Code generation (dev only) | Gemini 1.5 Pro | Groq Llama 3.1 70B | — |

### 15.3 LLM Client Abstraction

All LLM calls go through `ai/agent-orchestrator/llm_client.py` — never call Gemini/Groq directly from service code:

from vettri.ai.llm\_client import LLMClient, DataClassification

client \= LLMClient()

\# Automatically routes to correct model based on classification

response \= await client.complete(

    prompt=prompt,

    classification=DataClassification.PUBLIC,

    structured\_output=DeptRiskOutput,

    max\_tokens=1024,

)

---

## 16\. Security Constitution

### 16.1 Authentication & Authorization

- **Auth:** JWT (RS256) issued by auth-service. 15-minute access token, 7-day refresh token.  
- **Authz:** RBAC with 8 roles: `cm`, `minister`, `chief_secretary`, `secretary`, `collector`, `taluk_officer`, `dept_head`, `admin`  
- **API:** Every endpoint requires valid JWT. Kong validates at gateway — services trust forwarded identity.  
- **MFA:** Mandatory for `cm`, `minister`, `chief_secretary`, `collector` roles.

### 16.2 Data Protection

- **Encryption at rest:** AES-256 for PostgreSQL tablespace encryption  
- **Encryption in transit:** TLS 1.3 mandatory, TLS 1.2 minimum  
- **PII masking:** Citizen Aadhaar/phone masked in all logs and LLM prompts  
- **Secrets:** HashiCorp Vault for all secrets. Zero secrets in `.env` files in production.

### 16.3 Security Testing

- OWASP ZAP scan on every staging deployment  
- Dependency scan: `safety` (Python), `npm audit` (JS) — no HIGH/CRITICAL in CI  
- Penetration test before every major release

---

## 17\. References

| Document | Purpose |
| :---- | :---- |
| `01_PRODUCT_REQUIREMENTS.md` | What VETTRI must do |
| `02_SYSTEM_ARCHITECTURE.md` | System design |
| `03_TECH_STACK_AND_STANDARDS.md` | Detailed tech choices |
| `05_AI_PLATFORM_AND_AGENTS.md` | LLM/agent details |
| `10_DEVOPS_SECURITY_DEPLOYMENT.md` | Deployment & security ops |
| [Google AI Studio Free Tier](https://aistudio.google.com) | Gemini API keys |
| [Groq Cloud Free Tier](https://console.groq.com) | Groq API keys |
| [Ollama](https://ollama.ai) | Local LLM runtime |
| [LangGraph Docs](https://langchain-ai.github.io/langgraph/) | Agent framework |
| [pgvector](https://github.com/pgvector/pgvector) | Vector search |

---

*Document Version: 1.0.0 | Owner: Chief Enterprise Architect, VETTRI Program | Classification: Engineering Confidential* *Next: Generate Document 01 — `01_PRODUCT_REQUIREMENTS.md`*