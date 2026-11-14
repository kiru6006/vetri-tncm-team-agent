# VERTRI TN AI OS - Changelog

All notable changes to the VERTRI TN AI OS project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-14

### Added
- Created master development tracker files in `docs/project-tracker/` and structured source of truth in `data/tracking/feature-tracker.json`.
- Implemented normalized relational data model for Government Directory (`Person`, `Office`, `Appointment`, `DepartmentEntity`, `SourceEvidence`, `WorkAssignment`) in `frontend/src/types/directoryModel.ts`.
- Compiled authoritative registry of all 38 Tamil Nadu District Collectors with verified `@nic.in` email endpoints in `frontend/src/data/verifiedGovernmentDirectory.ts`.
- Added quarantine isolation system (`QUARANTINED_UNVERIFIED_RECORDS`) and quarantine alert banner in `GovernmentHierarchyDirectory.tsx`.
- Integrated calendar directory adapter `/api/v1/calendar/directory/search` to provide verified officer bookings in standalone demo mode.
- Designed left-side collapsible navigation sidebar (`ExecutiveSidebar.tsx`) with 8 governance responsibility categories.
- Built visual dashboard catalog (`ExplorePlatform.tsx`) accessible at `/explore` or `#explore`.
- Built executive action management system (`ExecutiveActionManagement.tsx`) supporting CM instruction lifecycle from issuance to closure.

### Fixed
- Fixed critical P0 data quality defects in Government Directory:
  - Removed and quarantined mock officers (`M. Shanmugam, BDO`, `S. Anbarasan, VAO`, `Kirubakaran, IPS`).
  - Corrected spelling error `Krasthi Kumar Pati, IAS` to `Kranthi Kumar Pati, IAS`.
  - Linked official Gazetted SP Salem: `A. K. Arun Kabilan, IPS` (`sp-slm@tnpolice.gov.in`).
- Updated backend test suites (`test_cmo_agent_tools.py` and `test_executive_intelligence.py`) to assert verified official roster names.
- Resolved TypeScript build errors and verified zero compiler errors.
- Added `404.html` SPA routing fallback in GitHub Pages deployment workflow.

### Security
- Added explicit quarantine defect warning notice to isolate unverified legacy mock records.
- Clarified system status as an independent demonstration of an AI governance operating system.
