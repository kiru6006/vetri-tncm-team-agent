# VETTRI TN AI OS — Model Context Protocol (MCP) Integration

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Standard:** Anthropic Model Context Protocol (MCP) Specification  
> **Purpose:** Secure, standardized tool invocation layer connecting LLM Agents to State Government Data Sources  
> **Version:** 1.0.0

---

## 1. MCP Architecture for State Governance

The Model Context Protocol (MCP) provides standard client-server isolation between AI Agents and critical state databases, preventing direct uncontrolled SQL execution and enforcing audit trails.

```
┌────────────────────────────────────────────────────────┐
│               LANGGRAPH AGENT COGNITIVE LAYER           │
│        (CM Copilot / Department Autonomous Workers)     │
└───────────────────────────┬────────────────────────────┘
                            │ MCP Protocol (JSON-RPC over stdio / SSE)
┌───────────────────────────▼────────────────────────────┐
│                    MCP SERVER MESH                      │
│  ┌───────────────────────┐  ┌────────────────────────┐ │
│  │ mcp-tn-telemetry      │  │ mcp-tn-gis             │ │
│  │ (PostgreSQL / KPIs)   │  │ (MapLibre / GeoJSON)   │ │
│  └───────────────────────┘  └────────────────────────┘ │
│  ┌───────────────────────┐  ┌────────────────────────┐ │
│  │ mcp-tn-rag            │  │ mcp-tnega-legacy       │ │
│  │ (pgvector Embeddings) │  │ (State Portal Bridges) │ │
│  └───────────────────────┘  └────────────────────────┘ │
└───────────────────────────┬────────────────────────────┘
                            │ Read-Only Connection Pool
┌───────────────────────────▼────────────────────────────┐
│           TAMIL NADU STATE DATA LAYER & APIS           │
└────────────────────────────────────────────────────────┘
```

---

## 2. Core MCP Tools Catalog

### 2.1 `mcp-tn-telemetry` (Governance KPIs & Real-time Metrics)
- **`get_district_kpi(district_code: str, kpi_code: str, date_range: str)`**: Fetches authenticated timeseries KPI values, target achievement %, and anomaly flags for any of the 38 districts.
- **`query_revenue_breakdown(financial_year: str, department_code: str)`**: Returns verified commercial tax, stamp duty, or excise collections with month-on-month variance.
- **`get_scheme_saturation(scheme_code: str, district_code: Optional[str])`**: Returns total sanctioned beneficiaries, actual disbursements, and pending grievance count.

### 2.2 `mcp-tn-gis` (Spatial & Geographic Intelligence)
- **`get_district_boundary(district_code: str)`**: Fetches high-precision GeoJSON boundaries for map visualization.
- **`find_facilities_in_radius(facility_type: str, lat: float, lng: float, radius_km: float)`**: Identifies Primary Health Centers, Police Stations, or Fire Stations within target distance.
- **`get_disaster_risk_zones(district_code: str, hazard_type: str)`**: Returns flood vulnerability zones, storm surge inundation models, and cyclone shelter capacities.

### 2.3 `mcp-tn-rag` (Official Government Orders & Knowledge Repository)
- **`search_government_orders(query: str, department_code: Optional[str], limit: int = 5)`**: Executes dense + sparse hybrid search across indexed Tamil Nadu Government Orders (GO Ms. / GO Rt.).
- **`get_scheme_guidelines(scheme_id: str)`**: Retrieves official eligibility criteria, document requirements, and fund allocation rules.

---

## 3. Security & Access Enforcement in MCP
- **Parameter Validation:** Strict Zod/Pydantic validation on all tool arguments.
- **SQL Sanitization:** Zero dynamic SQL string concatenation; all queries execute via prepared statements and read-only database credentials.
- **Audit Interceptor:** Every tool execution logs the requesting Agent ID, User Token, execution time, and hashed output into `audit_logs`.
