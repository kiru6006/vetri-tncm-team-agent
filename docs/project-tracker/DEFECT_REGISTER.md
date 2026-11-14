# Master Defect Register
**System:** VERTRI TN AI OS | **Version:** 2.0.0 | **Timestamp:** 2026-11-14T05:47:19Z

| Defect ID | Severity | Category | Status | Title | Target Release |
|---|---|---|---|---|---|
| `DEF-DIR-01` | **P0** | `GOV-06` | `VERIFIED_FIXED` | Legacy Fictional and Unverified Officials in Directory Dataset | v2.0.0 |
| `DEF-ROUT-01` | **P1** | `GOV-17` | `OPEN` | Sidebar and Catalog Routes Without Explicit View Handlers | v2.1.0 |
| `DEF-SEC-01` | **P1** | `GOV-19` | `OPEN` | Persona Switching Operates Without Production Authentication | v2.2.0 |
| `DEF-CONST-01` | **P2** | `GOV-05` | `OPEN` | Constituencies Route Renders District Heatmap Instead of 234 MLA Scorecards | v2.1.0 |
| `DEF-PROJ-01` | **P2** | `GOV-07` | `OPEN` | Infrastructure Projects View Lacks Interactive Gantt Timeline | v2.1.0 |
| `DEF-MIN-01` | **P2** | `GOV-02` | `OPEN` | Ministries View Lacks Dedicated Hierarchical Portfolio Breakdown | v2.1.0 |
| `DEF-DEPT-01` | **P2** | `GOV-03` | `OPEN` | Subordinate Directorates Roll Up Directly into Secretariat Cards | v2.1.0 |
| `DEF-KNOW-01` | **P2** | `GOV-15` | `OPEN` | Knowledge Hub Substring Search Fallback When Backend Vector RAG Offline | v2.2.0 |
| `DEF-NOTIF-01` | **P2** | `GOV-16` | `OPEN` | Web Push Notifications Require Service Worker Registration | v2.2.0 |

## Defect Detail Profiles

### `DEF-DIR-01`: Legacy Fictional and Unverified Officials in Directory Dataset
- **Severity**: **P0** | **Status**: `VERIFIED_FIXED` | **Category**: `GOV-06`
- **Description**: Fictional or unverified records (e.g. M. Shanmugam, S. Anbarasan, Kirubakaran IPS) were present in directory data.
- **Reproduction Steps**: Query directory for non-existent civil service batch appointments.
- **Impact Assessment**: Data integrity risk and potential misinformation in official communications.
- **Remediation Plan**: Quarantined unverified records into quarantinedOfficials dataset and populated verified 34 Ministers, 38 Collectors, and official police leadership.
- **Target Release**: `v2.0.0`

### `DEF-ROUT-01`: Sidebar and Catalog Routes Without Explicit View Handlers
- **Severity**: **P1** | **Status**: `OPEN` | **Category**: `GOV-17`
- **Description**: Navigating to certain routes (#copilot, #audit-logs, #ai-agents, #risk-intelligence, #users-roles, #settings) renders blank content without fallback or redirection.
- **Reproduction Steps**: Click 'AI Agents' or 'Audit Logs' in the navigation sidebar.
- **Impact Assessment**: User sees empty main content pane without error message or redirect.
- **Remediation Plan**: Implement explicit view handlers or route-to-modal triggers in App.tsx renderCurrentView switch block with a default fallback view.
- **Target Release**: `v2.1.0`

### `DEF-SEC-01`: Persona Switching Operates Without Production Authentication
- **Severity**: **P1** | **Status**: `OPEN` | **Category**: `GOV-19`
- **Description**: Switching executive personas is currently handled client-side without cryptographic authentication or SSO token exchange.
- **Reproduction Steps**: Select different persona from top header dropdown.
- **Impact Assessment**: Acceptable in public demonstration mode, but must be gated behind e-Pramaan SSO and signed session tokens in government intranet deployment.
- **Remediation Plan**: Integrate backend auth endpoints (/api/v1/auth/login) with OAuth2 / e-Pramaan SAML/OIDC bridge and enforce permission checks.
- **Target Release**: `v2.2.0`

### `DEF-CONST-01`: Constituencies Route Renders District Heatmap Instead of 234 MLA Scorecards
- **Severity**: **P2** | **Status**: `OPEN` | **Category**: `GOV-05`
- **Description**: Route #constituencies displays 38 revenue districts instead of individual 234 Assembly constituencies with sitting MLA details.
- **Reproduction Steps**: Select 'Constituencies' from navigation sidebar.
- **Impact Assessment**: Executive cannot drill down to specific MLA constituency development funds or local issues.
- **Remediation Plan**: Create dedicated AssemblyConstituenciesView component with 234 constituency dataset, sitting MLA roster, and local scheme allocation metrics.
- **Target Release**: `v2.1.0`

### `DEF-PROJ-01`: Infrastructure Projects View Lacks Interactive Gantt Timeline
- **Severity**: **P2** | **Status**: `OPEN` | **Category**: `GOV-07`
- **Description**: Project milestone tracking displays list and cards but lacks interactive Gantt visualization for critical path and monsoon window monitoring.
- **Reproduction Steps**: Navigate to Projects workspace and inspect milestone views.
- **Impact Assessment**: Difficult to visually pinpoint inter-departmental milestone dependencies and monsoon delivery bottlenecks.
- **Remediation Plan**: Add interactive SVG/Canvas Gantt chart component with dependency link overlays and milestone drag inspection.
- **Target Release**: `v2.1.0`

### `DEF-MIN-01`: Ministries View Lacks Dedicated Hierarchical Portfolio Breakdown
- **Severity**: **P2** | **Status**: `OPEN` | **Category**: `GOV-02`
- **Description**: Ministry cards in the directory combine portfolios into a single text block without dedicated sub-portfolio KPI drilldowns.
- **Reproduction Steps**: Navigate to Ministries and select a minister card.
- **Impact Assessment**: Limited visibility into specific departments mapped under multi-department ministerial portfolios.
- **Remediation Plan**: Implement MinistryPortfolioDetail modal breaking down portfolios into distinct departments and subordinate commissionerates.
- **Target Release**: `v2.1.0`

### `DEF-DEPT-01`: Subordinate Directorates Roll Up Directly into Secretariat Cards
- **Severity**: **P2** | **Status**: `OPEN` | **Category**: `GOV-03`
- **Description**: Departments view presents top-level Secretariat departments without separate navigable cards for commissionerates (e.g. Land Administration, Commercial Taxes).
- **Reproduction Steps**: Browse Departments catalog.
- **Impact Assessment**: HOD-level operational metrics are grouped with Secretariat policy metrics.
- **Remediation Plan**: Introduce hierarchical tree navigation in GovernmentHierarchyDirectory showing Secretariat -> Directorate -> Regional Office.
- **Target Release**: `v2.1.0`

### `DEF-KNOW-01`: Knowledge Hub Substring Search Fallback When Backend Vector RAG Offline
- **Severity**: **P2** | **Status**: `OPEN` | **Category**: `GOV-15`
- **Description**: In standalone client demo mode, Knowledge Hub uses keyword substring search rather than true vector semantic similarity.
- **Reproduction Steps**: Search Knowledge Hub with backend server terminated.
- **Impact Assessment**: Complex natural language policy queries return fewer relevant Government Orders when offline.
- **Remediation Plan**: Add lightweight client-side TF-IDF / WebAssembly semantic index fallback for zero-backend environments.
- **Target Release**: `v2.2.0`

### `DEF-NOTIF-01`: Web Push Notifications Require Service Worker Registration
- **Severity**: **P2** | **Status**: `OPEN` | **Category**: `GOV-16`
- **Description**: Notification center modal displays in-app alerts, but background Web Push requires service worker registration.
- **Reproduction Steps**: Check browser push subscription when browser window is closed.
- **Impact Assessment**: Urgent P0 emergency alerts cannot wake sleeping browser sessions.
- **Remediation Plan**: Register public/sw.js service worker with PushManager subscribe hook in main.tsx.
- **Target Release**: `v2.2.0`

