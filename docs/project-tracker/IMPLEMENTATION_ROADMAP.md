# VERTRI TN AI OS - Implementation Roadmap

**Architecture Strategy:** Sequential phased execution based on governance priority.  
**Baseline Date:** 2026-11-14 11:02:16 IST

---

## Phase Overview & Allocation

| Phase | Title | Focus Area | Target Effort | Linked Features |
|---|---|---|---|---|
| **Phase 0** | **Critical Corrections** | Government directory accuracy, quarantine defense, test harness | Completed | `GOV-06-01`, `GOV-06-02`, `GOV-06-03`, `GOV-21-01` |
| **Phase 1** | **Application Completeness** | Sub-departments, individual ministry portals, constituency cards | 2 Sprints | `GOV-02-01`, `GOV-03-01`, `GOV-05-01`, `GOV-07-01` |
| **Phase 2** | **Government Intelligence** | Infrastructure Gantt milestones, interactive revenue models | 2 Sprints | `GOV-07-01`, `GOV-09-01`, `GOV-09-02` |
| **Phase 3** | **Executive Action Management** | e-Sign verification, field counter-evidence mobile widgets | 2 Sprints | `GOV-10-01`, `GOV-11-01`, `GOV-12-01` |
| **Phase 4** | **AI Intelligence** | WebAssembly client vector RAG, LangGraph checkpointing | 2 Sprints | `GOV-14-01`, `GOV-15-01`, `GOV-13-02` |
| **Phase 5** | **Production Architecture** | State Data Centre VPN, OAuth2/e-Pramaan SSO, OpenTelemetry | 3 Sprints | `GOV-19-01`, `GOV-20-01`, `GOV-23-01`, `GOV-24-01` |

---

## Top 10 Next Implementation Actions

1. **[GOV-02-01] Build Dedicated Ministry Detail Drawer:** Create subordinate board tabs for all 34 ministries with historical portfolio order links.
2. **[GOV-03-01] Implement Sub-Department Directorate Hierarchy:** Separate Secretariat departments from their 140+ executive field directorates (e.g. DPH, Highways CE).
3. **[GOV-05-01] Build MLA Constituency Scorecards:** Render all 234 Assembly constituencies with sitting MLA details and local grievance resolution rates.
4. **[GOV-07-01] Add Project Milestone Gantt Visualization:** Integrate ECharts-based timeline chart in `ChiefSecretaryCockpit.tsx` to visualize critical path delays.
5. **[GOV-15-01] Precompute Client Semantic Embeddings for Top 500 G.O.s:** Enable zero-latency conceptual search in standalone GitHub Pages demo mode.
6. **[GOV-11-01] Add Digital Signature (e-Sign) Verification:** Render cryptographic verification seals for CM instructions resolved by District Collectors.
7. **[GOV-16-01] Implement Service Worker Web Push Notifications:** Surface urgent flood/disaster warnings to executive staff even when browser tab is inactive.
8. **[GOV-20-01] Configure e-Pramaan / TN SSO Identity Adapter:** Provide production-ready government single sign-on authentication interface.
9. **[GOV-24-01] Build Administrative Role Delegation Matrix:** Allow Department IT nodal officers to manage permissions and temporary charge assignments.
10. **[GOV-22-01] Integrate Automated Playwright Visual Regression Suite:** Add automated multi-viewport screenshot verification to GitHub Actions CI/CD.
