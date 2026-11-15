# 11 — AI and Agentic Systems Architecture Audit: VETTRI TN AI OS

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

1. **Decoupled Supervisor**: The LangGraph engine in `agents/app/` has real agentic capabilities with MCP tools, but is completely bypassed by [copilot.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/api/v1/copilot.py).
2. **Hallucination Safeguards**: The production API lacks validation guardrails; all responses are static mock strings.
3. **Remediation Plan**:
   - Mount LangGraph into [copilot.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/api/v1/copilot.py) under `/api/v1/copilot/chat`.
   - Provide LangGraph tools with direct access to PostgreSQL and the canonical directory.
   - Enforce grounded source citation formatting (`[Source: G.O. Ms. No. 123]`) on every model output.
