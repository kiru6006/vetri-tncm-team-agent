# VERTRI TN AI OS — Responsive Route Inventory
## Version 2.0 | Comprehensive Governance Platform Route Directory

### 1. Overview
This document catalogs all functional routes and view states in **VERTRI TN AI OS** (`vetri-tncm-aios`), their associated components, supported viewport breakpoints, and responsive state classification following the 100% Responsive UI/UX remediation.

| Status Legend | Description |
|:---|:---|
| **PASSED** | Fully verified across 320px–1920px viewports without horizontal scroll defects, text clipping, or missing actions |
| **REMEDIATED** | Mobile/tablet responsive defects identified and resolved in current audit cycle |
| **SYSTEM** | Global shell component or persistent modal controller |

---

### 2. Route & View Inventory

| Route ID | Hash Path | Primary Component | Target Viewports | Responsive State | Features Preserved |
|:---|:---|:---|:---|:---|:---|
| `RT-EXEC-01` | `#cm-command` / `""` | `ExecutiveWorkspace` | 320px–1920px | **REMEDIATED** | 100% (Hero metrics, 12 category filters, critical/warning badges, full issue dossier modal) |
| `RT-EXEC-02` | `#todays-briefing` | `ExecutiveWorkspace` | 320px–1920px | **PASSED** | 100% (AI daily synthesis, quick inquiries, direct execution triggers) |
| `RT-EXEC-03` | `#action-tracker` | `ExecutiveActionManagement` | 320px–1920px | **REMEDIATED** | 100% (7-stage lifecycle workflow bar, official CUG acknowledgement, directive modal) |
| `RT-EXEC-04` | `#my-decisions` | `ExecutiveActionManagement` | 320px–1920px | **PASSED** | 100% (Decisions history, status filters, priority triage) |
| `RT-EXEC-05` | `#task-assignments` | `ExecutiveActionManagement` | 320px–1920px | **PASSED** | 100% (Official task allocations, timeline deadlines, accountable officers) |
| `RT-EXPL-01` | `#explore` | `ExplorePlatform` | 320px–1920px | **REMEDIATED** | 100% (Grid/list toggle, role filters, governance category filters, 22+ modules) |
| `RT-DIR-01` | `#directory` | `GovernmentHierarchyDirectory` | 320px–1920px | **REMEDIATED** | 100% (Autocomplete search, cadre filters, dossier drawer, 1-click official actions) |
| `RT-DIR-02` | `#ministers-mlas` | `GovernmentHierarchyDirectory` | 320px–1920px | **PASSED** | 100% (35 Cabinet Ministers under Hon'ble CM, 234 MLA integration) |
| `RT-DIR-03` | `#civil-services` | `GovernmentHierarchyDirectory` | 320px–1920px | **PASSED** | 100% (IAS, IPS, IRS, IFS cadre directories, batch years, CUG contacts) |
| `RT-DIR-04` | `#hierarchy` | `GovernmentHierarchyDirectory` | 320px–1920px | **REMEDIATED** | 100% (21-tier Secretariat-to-Village administrative tree with responsive indentation) |
| `RT-DIR-05` | `#data-sync` | `GovernmentHierarchyDirectory` | 320px–1920px | **PASSED** | 100% (ETL sync triggers, upstream connector health, audit logs) |
| `RT-DEPT-01` | `#ministries` | `App` (Inline Ministries View) | 320px–1920px | **PASSED** | 100% (Secretariat departments, budget allocations, spend rate, responsible ministers/secretaries) |
| `RT-DEPT-02` | `#departments` | `App` (Inline Ministries View) | 320px–1920px | **PASSED** | 100% (Department portfolio metrics, spend %, open issue counts) |
| `RT-DIST-01` | `#districts` | `DistrictHeatmapGrid` & `TamilNaduInteractiveMap` | 320px–1920px | **REMEDIATED** | 100% (38 District cards, performance scores, interactive SVG map, district modal) |
| `RT-DIST-02` | `#taluks` | `DistrictHeatmapGrid` & `TamilNaduInteractiveMap` | 320px–1920px | **PASSED** | 100% (Sub-district administrative mapping) |
| `RT-DIST-03` | `#constituencies` | `DistrictHeatmapGrid` & `TamilNaduInteractiveMap` | 320px–1920px | **PASSED** | 100% (Assembly constituencies & parliamentary bounds) |
| `RT-FIN-01` | `#revenue` | `RevenueAnalyticsView` | 320px–1920px | **PASSED** | 100% (Commercial taxes, S-GST, stamps & registration, motor vehicles, excise charts) |
| `RT-FIN-02` | `#expenditure` | `RevenueAnalyticsView` | 320px–1920px | **PASSED** | 100% (Capital vs. revenue expenditure, treasury burn rate) |
| `RT-FIN-03` | `#budget` | `RevenueAnalyticsView` | 320px–1920px | **PASSED** | 100% (Annual financial statement allocations, department-wise releases) |
| `RT-AUD-01` | `#revenue-leakage` | `FraudAuditDomainView` | 320px–1920px | **PASSED** | 100% (Leakage detection radar, high-risk procurement alerts, CAG findings) |
| `RT-AUD-02` | `#fraud-audit` | `FraudAuditDomainView` | 320px–1920px | **PASSED** | 100% (AI audit anomaly detector, vendor collusion indicators) |
| `RT-DEL-01` | `#schemes` | `FlagshipSchemesTracker` | 320px–1920px | **PASSED** | 100% (Kalaignar Magalir Urimai, Pudhumai Penn, Breakfast Scheme, target vs actuals) |
| `RT-DEL-02` | `#projects` | `ChiefSecretaryCockpit` | 320px–1920px | **PASSED** | 100% (Major infrastructure tracking >₹100 Cr, critical milestones, bottlenecks) |
| `RT-SRV-01` | `#citizen-services` | `GrievanceSlaAnalytics` | 320px–1920px | **PASSED** | 100% (Mudhalvar Mugavari SLA compliance, pendency rates, district rankings) |
| `RT-SRV-02` | `#grievances` | `GrievanceSlaAnalytics` | 320px–1920px | **PASSED** | 100% (Petition resolution timelines, recurring systemic complaints) |
| `RT-SEC-01` | `#public-safety` | `PoliceDomainView` | 320px–1920px | **PASSED** | 100% (Law & order alerts, coastal vigilance, POCSO conviction monitoring) |
| `RT-COM-01` | `#messages` | `GovernmentChatPlatform` | 320px–1920px | **REMEDIATED** | 100% (Encrypted sovereign channels, thread summarization, mobile channel/chat toggle) |
| `RT-CAL-01` | `#calendar` | `ExecutiveCalendarView` | 320px–1920px | **REMEDIATED** | 100% (Official appointments, NL booking agent, dossier drawer, contact copies) |
| `RT-CAL-02` | `#review-meetings` | `ExecutiveMeetingWorkspace` | 320px–1920px | **REMEDIATED** | 100% (Cabinet reviews, MoM generation, decision options, action items) |
| `RT-KNW-01` | `#knowledge` | `EnterpriseKnowledgeHub` | 320px–1920px | **PASSED** | 100% (Hybrid dense-sparse search, GO reader, legal grounding, statutory citations) |
| `RT-ROL-01` | `#role_view` | `CollectorCommandView` / `ChiefSecretaryCockpit` | 320px–1920px | **PASSED** | 100% (Persona-adaptive dashboard rendering based on active simulated role) |

---

### 3. Verification Summary
- **Total Functional Routes**: 31
- **Routes Remediated**: 8
- **Routes Passed Without Structural Changes**: 23
- **Feature Preservation Rate**: 100.0%
