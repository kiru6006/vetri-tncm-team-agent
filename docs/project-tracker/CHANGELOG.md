# Changelog & Continuous Delivery History
All notable changes to the **VETTRI TN AI OS** platform are documented in this file.

## [2.0.1] — 2026-11-15
### Added
- **Reusable Common Design System Components**:
  - `StatCard`: Standardized executive KPI card with variants (`default`, `amber`, `emerald`, `cyan`, `rose`) and trend indicators.
  - `StatusBadge`: Consistent status pill component.
  - `PageHeader`: Reusable executive header with badges and responsive breadcrumbs.
  - `ModalWrapper`: Standardized modal container with backdrop blur, keyboard dismiss, and responsive sizing.
- **Dedicated Administrative & Platform Views**:
  - `#audit-logs`: `AuditLogsView` with tamper-evident audit ledger entries and cryptographic hash checks.
  - `#settings`: `SettingsView` with system configurations, AI guardrail parameters, and display options.
  - `#ai-agents`: `AIAgentsStatusView` with real-time agent telemetry, latency, and tool verification.
  - `#risk-intelligence`: `RiskIntelligenceView` with multi-dimensional risk matrix and early warning signals.
  - `#users-roles`: `UsersRolesView` with RBAC directory, role permissions, and session tracking.
- **Single Source of Truth Meetings & Calendar System**:
  - `canonicalMeetingsData.ts`: Centralized canonical meeting schedules and executive calendar appointments.
  - Deduplicated state and removed ~165 lines of inline hardcoded fallback objects across `ExecutiveMeetingWorkspace.tsx` and `ExecutiveCalendarView.tsx`.
  - Added direct interceptors in `apiAdapter.ts` for `/api/v1/meetings`, `/api/v1/calendar/appointments`, and `/api/v1/calendar/book`.

### Fixed
- **DEF-ROUT-01 (P1)**: Resolved blank screens for `#audit-logs`, `#settings`, `#ai-agents`, `#risk-intelligence`, and `#users-roles` by implementing dedicated views in `App.tsx`.
- **UI Code Duplication**: Refactored domain views (`RevenueAnalyticsView`, `HealthDomainView`, `PoliceDomainView`, `GrievanceSlaAnalytics`, `WaterAgriDomainView`) to use shared `StatCard` components.
- **Transferred Officer Stale Data**: Purged transferred collector across frontend/backend files and synchronized with official published Coimbatore District Collector **Thiru Pavankumar G Giriyappanavar, IAS.,**.

## [2.0.0] — 2026-11-14
### Added
- **Master Quality Gates & Tracking System**: Canonical JSON Schema (`tracker-schema.json`) enforcing 23 mandatory capability attributes.
- **Automated Tracker Scripts**: `validate-tracker.py`, `verify-evidence.py`, and `generate-reports.py` in `scripts/tracker/`.
- **Granular Capability Decomposition**: 108 capabilities defined across all 24 governance categories (GOV-01 to GOV-24).
- **Verified Government Directory**: 100% verified 35 Cabinet Ministers (under Hon'ble CM Thiru C. Joseph Vijay), Chief Secretary Dr. M. Sai Kumar IAS, 38 District Collectors with `@nic.in` emails, and official Police/Forest/Secretariat leadership.
- **Append-Only Verification History**: Continuous execution audit logging in `data/tracking/verification-history.json`.

### Fixed
- **DEF-DIR-01 (P0)**: Quarantined legacy unverified/fictional officials (`M. Shanmugam`, `S. Anbarasan`, `Kirubakaran IPS`) into isolated `quarantinedOfficials` store.

### Security & Governance
- Enforced mandatory advisory disclaimer across executive headers and documentation.
