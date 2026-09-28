# VETTRI TN AI OS — Development Roadmap & Implementation Plan
### Phase 2: Government Collaboration, AI Copilots & Executive Workspace

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Lifecycle:** Enterprise Delivery Model  
> **Target:** Government of Tamil Nadu  
> **Version:** 2.0.0

---

## 1. Phase 2 Implementation Timeline & Sprint Milestones

```mermaid
gantt
    title Phase 2 Enterprise Implementation Roadmap
    dateFormat  YYYY-MM-DD
    section Sprint 1
    Personalized Workspaces & Command Center (Cmd+K) :active, s1, 2026-10-01, 10d
    section Sprint 2
    21-Tier Government Hierarchy & Smart Directory  :s2, 2026-10-11, 14d
    section Sprint 3
    Secure Government Chat & Group Collaboration    :s3, 2026-10-25, 14d
    section Sprint 4
    Role-Specific AI Copilot Mesh (CM to VAO)       :s4, 2026-11-08, 14d
    section Sprint 5
    Executive Meeting Intelligence Workspace        :s5, 2026-11-22, 10d
    section Sprint 6
    Enterprise Knowledge Hub & Omni Search          :s6, 2026-12-02, 14d
```

---

## 2. Detailed Milestone Deliverables, Dependencies, Risks & Effort

| Milestone | Key Deliverables | Architecture & Reusable Components | Dependencies | Estimated Effort | Risk & Mitigation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **M2.1: Personalized Workspaces & Executive Cockpit** | • Role-tailored Dashboard (`My Tasks`, `My Approvals`, `My Meetings`, `My Briefings`)<br>• Executive Morning/Evening Briefing Engine<br>• Global `Cmd+K` Command Palette | • Reuses existing Glassmorphic Card, Badge, and metric tokens<br>• `/api/v1/executive/workspace` aggregated endpoint | User Auth & JWT Context | **2 Weeks** | **Low:** Low complexity; fully reuses frontend design tokens and backend base. |
| **M2.2: 21-Tier Hierarchy & Smart Directory** | • 21-tier recursive Org Tree visualizer<br>• Officer Profile Dossiers with real-time portfolio & contact<br>• Natural Language semantic directory search | • React Flow / Treebeard visualization<br>• PostgreSQL `pgvector` hybrid search on officer profiles | PostgreSQL 16 + pgvector | **2.5 Weeks** | **Medium:** TN government official directory size. *Mitigation:* Seed initial core Secretariat & Collectorate data with batch synchronization jobs. |
| **M2.3: Secure Government Chat & Collaboration** | • Real-time WebSocket E2EE Messaging<br>• Auto-provisioned hierarchy channels (`cabinet`, `all-collectors`, `district-disaster`)<br>• In-chat AI Summarization & 1-click Task conversion | • Redis Pub/Sub backend<br>• React Virtualized message list with audio player & document previewers | Redis 7 + WebSockets | **3 Weeks** | **Medium:** Message throughput in emergency scenarios. *Mitigation:* Redis cluster horizontal scaling with NATS backup. |
| **M2.4: Role-Specific AI Copilot Mesh** | • Parameterized LangGraph agent runtime for CM, Ministers, Secretaries, Collectors, and Field Officers<br>• Evidence citation engine & Hallucination verification | • LangGraph StateGraph + MCP Tool Mesh<br>• Gemini / Anthropic / Local sovereign LLMs (Ollama) | LangGraph + MCP Layer | **3 Weeks** | **High:** Risk of hallucinated advice. *Mitigation:* Mandatory RAG citation binding and zero-temperature tool execution. |
| **M2.5: Executive Meeting Intelligence Workspace** | • Meeting scheduler with automated participant suggestions<br>• AI Pre-Meeting Briefing Packet generator<br>• Real-time bilingual speech-to-text + Actionable Minutes (MoM) extraction | • MinIO S3 document store<br>• Background Temporal / asyncio transcription workers | MinIO S3 + Speech/LLM API | **2 Weeks** | **Medium:** Heavy background task latency. *Mitigation:* Offload transcription and MoM extraction to asynchronous Celery/Temporal workers. |
| **M2.6: Knowledge Hub & Enterprise Omni Search** | • Department Knowledge Vaults (GOs, Acts, Policies, Circulars)<br>• Unified `OmniSearch` (`/api/v1/search/omni`) combining BM25 keyword + dense vector embeddings | • PostgreSQL tsvector + pgvector HNSW index<br>• Re-ranking pipeline with Reciprocal Rank Fusion (RRF) | Document Ingestion Pipeline | **2.5 Weeks** | **Medium:** Large PDF OCR ingestion. *Mitigation:* Parallel chunking & embedding pipeline. |

---

## 3. Governance & Quality Gate Checklist
- [x] Full RBAC/ABAC isolation between state, district, taluk, and village tiers.
- [x] Complete bilingual parity across all interface components (English & தமிழ்).
- [x] WCAG 2.1 AA accessibility standards (keyboard navigation, high-contrast, screen reader friendly).
- [x] DPDP Act & Tier-1 State Data Center sovereign air-gapped readiness.
