# VETTRI TN AI OS — AI Agents Master Specification

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Component:** Multi-Agent Cognitive Engine & Decision Support System  
> **Framework:** LangGraph + MCP (Model Context Protocol) + Pydantic AI  
> **Version:** 1.0.0

---

## 1. Agent Ecosystem Overview

VETTRI operates on a **Hierarchical Multi-Agent Architecture** orchestrated by a Central Supervisor Agent (**Hon'ble Chief Minister Copilot**).

```
                               ┌────────────────────────────────┐
                               │  CHIEF MINISTER COPILOT        │
                               │  (Supervisor / Orchestrator)   │
                               └───────────────┬────────────────┘
                                               │
     ┌──────────────────┬──────────────────────┼──────────────────────┬──────────────────┐
     ▼                  ▼                      ▼                      ▼                  ▼
┌───────────────┐ ┌───────────────┐  ┌───────────────────┐  ┌───────────────────┐ ┌───────────────┐
│ Revenue Agent │ │ Health Agent  │  │ Police & Safety   │  │ Agri & Water Agent│ │ Fraud Detection│
│ (Taxes/Leaks) │ │ (Drugs/Beds)  │  │ (Law & Order/VIP) │  │ (Dams/Crops/PDS)  │ │ (Anomalies)    │
└───────────────┘ └───────────────┘  └───────────────────┘  └───────────────────┘ └───────────────┘
```

---

## 2. Core Operational Agent Roster

| Agent Name | Scope & Authority | Primary Tools & Data Sources | Target Personas |
| :--- | :--- | :--- | :--- |
| **Chief Minister Copilot** | Holistic state governance, strategic decisions, high-priority crisis mitigation | Aggregated state health metrics, cross-agent synthesis, official GO repository | Chief Minister, Chief Secretary |
| **Revenue Intelligence Agent** | GST, Commercial Taxes, Excise, Registration stamps, leakage forecasting | Commercial Tax backend DB, property registration trends, e-way bill analytics | Finance Minister, Revenue Secretary |
| **Health & Medical Agent** | Primary health centers (PHC), essential drug stocks, bed occupancy, epidemic tracking | TNMSC drug warehouse telemetry, hospital MIS, ICMR disease outbreak alerts | Health Minister, Health Secretary, DME |
| **Police & Public Safety Agent** | Crime trends, sensitive polling areas, disaster response, VIP movement | CCTNS integration, traffic analytics, weather radars (IMD) | Home Secretary, DGP, Police Commissioners |
| **Agriculture & Water Agent** | 15 Major reservoirs, groundwater indices, fertilizer stock, kuruvai crop support | PWD water level telemetry, Agri department portal, IMD rainfall feeds | Agri Minister, PWD/WRD Secretary |
| **Fraud & Anomaly Agent** | Beneficiary deduplication, ghost accounts, contractor bid collusion | Direct Benefit Transfer (DBT) logs, tender portal archives, Aadhaar audit logs | Chief Secretary, Vigilance Directorate |

---

## 3. Agent Execution Lifecycle & Safety Guardrails

Every agent in VETTRI must adhere to the **OODA Loop with Verification**:

1. **Observe:** Ingest user request, live telemetry, and context from PostgreSQL / Redis.
2. **Orient:** Classify intent, identify required permissions, check user RBAC tier.
3. **Decide:** Formulate execution plan, select appropriate MCP tools (SQL, RAG, GIS).
4. **Act:** Execute read-only tools or propose human-in-the-loop verified mutations.
5. **Verify & Explain:** Validate output against grounded facts; generate bilingual explanation (Tamil/English) with citations to specific Government Orders or SQL rows.

### Safety Guardrails (Zero-Tolerance Policy)
- **No Hallucinated Data:** Every numeric metric must cite the exact DB query and timestamp.
- **Read-Only by Default:** Agents cannot modify database records without explicit 2FA human sign-off.
- **Bilingual Fluency:** Native support for both formal Tamil (*தூய தமிழ் / நிர்வாகத் தமிழ்*) and administrative English.
