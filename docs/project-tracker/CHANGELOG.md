# Changelog & Continuous Delivery History
All notable changes to the **VERTRI TN AI OS** platform are documented in this file.

## [2.0.0] — 2026-11-14
### Added
- **Master Quality Gates & Tracking System**: Canonical JSON Schema (`tracker-schema.json`) enforcing 23 mandatory capability attributes.
- **Automated Tracker Scripts**: `validate-tracker.py`, `verify-evidence.py`, and `generate-reports.py` in `scripts/tracker/`.
- **Granular Capability Decomposition**: 70+ capabilities defined across all 24 governance categories (GOV-01 to GOV-24).
- **Verified Government Directory**: 100% verified 35 Cabinet Ministers (under Hon'ble CM Thiru C. Joseph Vijay), Chief Secretary Dr. M. Sai Kumar IAS, 38 District Collectors with `@nic.in` emails, and official Police/Forest/Secretariat leadership. Single source of truth in `data/government-directory/`.
- **Append-Only Verification History**: Continuous execution audit logging in `data/tracking/verification-history.json`.

### Fixed
- **DEF-DIR-01 (P0)**: Quarantined legacy unverified/fictional officials (`M. Shanmugam`, `S. Anbarasan`, `Kirubakaran IPS`) into isolated `quarantinedOfficials` store.

### Security & Governance
- Enforced mandatory advisory disclaimer across executive headers and documentation.
- Formally logged non-critical UI routing gap (`DEF-ROUT-01`) and demo persona switcher (`DEF-SEC-01`) for scheduled resolution.
