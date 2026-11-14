# VERTRI TN AI OS - Defect Register

**Status:** Continuously Maintained  
**Open Defects:** 10 | **P0 Defects:** 0 | **P1 Defects:** 0 | **P2 Defects:** 8 | **P3 Defects:** 2

---

## Defect Summary Table

| Defect ID | Feature ID | Severity | Description | Status | Affected Screen | Proposed Fix |
|---|---|---|---|---|---|---|
| **DEF-MIN-01** | GOV-02-01 | `P2` | No dedicated individual ministry drilldown screen exists; all ministries render as compact cards inside one page. | `OPEN` | `#ministries, #departments` | Implement dedicated MinistryDetailDrawer component with subordinate board tabs. |
| **DEF-DEPT-01** | GOV-03-01 | `P2` | Sub-departments route (#sub-departments) aliases directly to primary departments without subordinate directorate breakdown. | `OPEN` | `#sub-departments` | Create dedicated SubDepartmentDirectory listing 140+ state directorates mapped to their parent departments. |
| **DEF-CONST-01** | GOV-05-01 | `P2` | Constituency route (#constituencies) routes to District Heatmap instead of individual Assembly Constituency scorecards. | `OPEN` | `#constituencies, #taluks` | Build ConstituencyGrid component with MLA search, political party badges, and local infrastructure status. |
| **DEF-PROJ-01** | GOV-07-01 | `P2` | Infrastructure project progress lacks interactive Gantt timeline component; delay analysis relies on static percentage cards. | `OPEN` | `#projects, #infrastructure` | Add ECharts-based ProjectMilestoneTimeline component. |
| **DEF-KNOW-01** | GOV-15-01 | `P2` | Enterprise Knowledge Hub uses client-side keyword search in standalone mode; semantic vector RAG embeddings require live Python backend. | `OPEN` | `#knowledge, #knowledge-search` | Compile lightweight pre-computed semantic embedding index for top 500 G.O.s in client. |
| **DEF-NOTIF-01** | GOV-16-01 | `P3` | Notification ticker updates on page reload or periodic poll; Web Push Notifications are not registered with service worker. | `OPEN` | `ExecutiveHeader` | Register lightweight service worker supporting Web Push API. |
| **DEF-DATA-01** | GOV-19-01 | `P2` | Data synchronization connectors operate on simulated trigger in demo mode; real government REST APIs require VPN clearance. | `OPEN` | `#data-sync` | Add explicit badge: 'Simulated Sandbox Mode - Production Requires SDC VPN Tunnel'. |
| **DEF-SEC-01** | GOV-20-01 | `P2` | User persona switching is unauthenticated in demo mode; anyone can switch between Chief Minister and District Collector without password. | `OPEN` | `ExecutiveHeader` | Add visual watermark badge indicating 'Simulation Persona Switcher Active'. |
| **DEF-OBS-01** | GOV-23-01 | `P3` | No client-side telemetry or performance logging export to monitoring backends (Sentry / CloudWatch). | `OPEN` | `Global` | Implement React ErrorBoundary with local telemetry buffer. |
| **DEF-ADMIN-01** | GOV-24-01 | `P2` | Settings modal only configures language and role; no user provisioning, role permission matrix, or API token management UI. | `OPEN` | `#settings, #users-roles` | Build AdminUserManagement and PermissionMatrix tables. |

---

## Detailed Defect Specifications

### DEF-MIN-01: No dedicated individual ministry drilldown screen exists; all ministries render as compact cards inside one page.
- **Linked Feature:** `GOV-02-01`
- **Severity:** `P2`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Navigate to #ministries in sidebar. 2. Observe list of ministry cards. 3. Click card. Notice no separate deep-dive view opens.
- **Expected Result:** Clicking a ministry card should open a comprehensive portfolio view showing subordinate directorates, historical G.O.s, and gazetted milestones.
- **Actual Result:** Card renders inline without expandable deep-dive view.
- **Root Cause:** Ministry route currently uses compact inline grid in App.tsx without separate MinistryDetail modal/page component.
- **Business Impact:** CM cannot drill down into specific subordinate boards (e.g. TWAD Board under Municipal Administration) directly from Ministry view.
- **Proposed Fix:** Implement dedicated MinistryDetailDrawer component with subordinate board tabs.
- **Verification Evidence:** `frontend/src/App.tsx line 175`

---
### DEF-DEPT-01: Sub-departments route (#sub-departments) aliases directly to primary departments without subordinate directorate breakdown.
- **Linked Feature:** `GOV-03-01`
- **Severity:** `P2`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Click 'Sub-Departments' in sidebar navigation. 2. Observe identical display as 'Departments'.
- **Expected Result:** Sub-departments should list field directorates, commissionerates, and statutory boards under each Secretariat department.
- **Actual Result:** Renders parent departments list.
- **Root Cause:** Route alias in App.tsx line 161 combines ministries, departments, and sub-departments into one handler.
- **Business Impact:** Lack of visibility into third-tier executive directorates (e.g. Directorate of Public Health vs Health Secretariat).
- **Proposed Fix:** Create dedicated SubDepartmentDirectory listing 140+ state directorates mapped to their parent departments.
- **Verification Evidence:** `frontend/src/App.tsx line 161`

---
### DEF-CONST-01: Constituency route (#constituencies) routes to District Heatmap instead of individual Assembly Constituency scorecards.
- **Linked Feature:** `GOV-05-01`
- **Severity:** `P2`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Click 'Constituencies' in sidebar. 2. Observe District Heatmap loads instead of 234 MLA constituencies.
- **Expected Result:** Should render 234 Assembly constituencies with sitting MLA name, party, and local grievance resolution index.
- **Actual Result:** Renders 38 district heatmap cards.
- **Root Cause:** App.tsx line 212 groups districts, taluks, and constituencies into single DistrictHeatmapGrid renderer.
- **Business Impact:** CM cannot review MLA-specific grievance redressal rate before district review meetings.
- **Proposed Fix:** Build ConstituencyGrid component with MLA search, political party badges, and local infrastructure status.
- **Verification Evidence:** `frontend/src/App.tsx line 212`

---
### DEF-PROJ-01: Infrastructure project progress lacks interactive Gantt timeline component; delay analysis relies on static percentage cards.
- **Linked Feature:** `GOV-07-01`
- **Severity:** `P2`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Navigate to #projects. 2. Inspect project items. 3. Observe lack of milestone time-slider.
- **Expected Result:** Projects should display interactive milestone timeline with critical path delay alerts and land acquisition dependencies.
- **Actual Result:** Cards display progress percentages and textual delay descriptions.
- **Root Cause:** ChiefSecretaryCockpit component renders project cards with static progress bars rather than timeline chart.
- **Business Impact:** Delays cannot be analyzed across seasonal monsoon windows.
- **Proposed Fix:** Add ECharts-based ProjectMilestoneTimeline component.
- **Verification Evidence:** `frontend/src/components/ChiefSecretaryCockpit.tsx line 80`

---
### DEF-KNOW-01: Enterprise Knowledge Hub uses client-side keyword search in standalone mode; semantic vector RAG embeddings require live Python backend.
- **Linked Feature:** `GOV-15-01`
- **Severity:** `P2`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Open #knowledge in GitHub Pages. 2. Search for conceptual queries without exact keyword match.
- **Expected Result:** Semantic search matches concept across G.O. texts.
- **Actual Result:** Only exact substring keyword matches return results.
- **Root Cause:** Standalone client cannot host local vector index in browser without WebAssembly transformer model.
- **Business Impact:** Officials must know exact terminology (e.g. 'G.O. Ms 128' rather than 'flood compensation order').
- **Proposed Fix:** Compile lightweight pre-computed semantic embedding index for top 500 G.O.s in client.
- **Verification Evidence:** `frontend/src/components/EnterpriseKnowledgeHub.tsx`

---
### DEF-NOTIF-01: Notification ticker updates on page reload or periodic poll; Web Push Notifications are not registered with service worker.
- **Linked Feature:** `GOV-16-01`
- **Severity:** `P3`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Check browser service worker registration in DevTools. 2. Notice absence of push manager subscription.
- **Expected Result:** Critical alerts (e.g. Mettur flood alert) should trigger background browser notifications.
- **Actual Result:** Notifications only render when application tab is open.
- **Root Cause:** No service worker registered in main.tsx for Push API.
- **Business Impact:** Executive staff not actively viewing tab may miss urgent warnings.
- **Proposed Fix:** Register lightweight service worker supporting Web Push API.
- **Verification Evidence:** `frontend/src/main.tsx`

---
### DEF-DATA-01: Data synchronization connectors operate on simulated trigger in demo mode; real government REST APIs require VPN clearance.
- **Linked Feature:** `GOV-19-01`
- **Severity:** `P2`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Go to #data-sync. 2. Click 'Trigger Sync Now'. 3. Observe simulated sync progress.
- **Expected Result:** Sync should document that live endpoints require State Data Centre (SDC) network tunnel.
- **Actual Result:** Shows simulated 100% sync success without explicit connectivity banner.
- **Root Cause:** Demo interceptor returns mock success payload.
- **Business Impact:** Reviewers might assume live connection to TNeGA / e-District servers is established.
- **Proposed Fix:** Add explicit badge: 'Simulated Sandbox Mode - Production Requires SDC VPN Tunnel'.
- **Verification Evidence:** `frontend/src/components/GovernmentHierarchyDirectory.tsx`

---
### DEF-SEC-01: User persona switching is unauthenticated in demo mode; anyone can switch between Chief Minister and District Collector without password.
- **Linked Feature:** `GOV-20-01`
- **Severity:** `P2`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Click user profile in top header. 2. Select 'Chief Minister' or 'District Collector'. 3. Role switches instantly.
- **Expected Result:** Demo mode should display 'DEMO PERSONA SWITCHER - NOT FOR PRODUCTION USE' warning label.
- **Actual Result:** Switches silently.
- **Root Cause:** authStore provides instant dev switcher for demonstration convenience.
- **Business Impact:** Confusing for security auditors evaluating government access boundaries.
- **Proposed Fix:** Add visual watermark badge indicating 'Simulation Persona Switcher Active'.
- **Verification Evidence:** `frontend/src/components/ExecutiveHeader.tsx`

---
### DEF-OBS-01: No client-side telemetry or performance logging export to monitoring backends (Sentry / CloudWatch).
- **Linked Feature:** `GOV-23-01`
- **Severity:** `P3`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Trigger intentional route error. 2. Observe error only logs to browser console.
- **Expected Result:** Errors should be captured and surfaced in an executive error-rate dashboard.
- **Actual Result:** Only console.error statements exist.
- **Root Cause:** Observability focused on backend /health endpoint; frontend error boundary telemetry not configured.
- **Business Impact:** Frontend rendering issues on older mobile devices may go unnoticed.
- **Proposed Fix:** Implement React ErrorBoundary with local telemetry buffer.
- **Verification Evidence:** `frontend/src/App.tsx`

---
### DEF-ADMIN-01: Settings modal only configures language and role; no user provisioning, role permission matrix, or API token management UI.
- **Linked Feature:** `GOV-24-01`
- **Severity:** `P2`
- **Status:** `OPEN`
- **Reproduction Steps:**
  1. Click Settings in sidebar. 2. Observe only basic theme/role toggles.
- **Expected Result:** Should provide full administration panel for Department IT nodal officers.
- **Actual Result:** Limited settings dialog.
- **Root Cause:** Administration module currently focused on end-user preferences.
- **Business Impact:** Department IT nodal officers cannot configure role delegations.
- **Proposed Fix:** Build AdminUserManagement and PermissionMatrix tables.
- **Verification Evidence:** `frontend/src/components/ExecutiveSidebar.tsx`

---
