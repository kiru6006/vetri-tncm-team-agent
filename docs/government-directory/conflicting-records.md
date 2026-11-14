# Tamil Nadu Government Contact Directory: Conflicting Records & Reconciliation Report

**Document Version:** 1.0.0  
**Audit Date:** 2026-11-14  
**Audit Scope:** Discrepancies between legacy cached data, regional department web pages, and authoritative gazette notifications.

---

## 1. Primary Conflict Log

### Conflict 1: Council of Ministers Cabinet Reconstitution
- **Source A (Legacy/Stale):** Outdated static subpages on some departmental portals still referenced previous administration ministers (M.K. Stalin era cabinet).
- **Source B (Authoritative):** Tamil Nadu Government Gazette Extraordinary No. 256 dated 22 May 2026 (G.O. Ms. No. 345) and live `https://www.tn.gov.in/minister_list.php`.
- **Reconciliation Decision:** The Government Gazette and live `minister_list.php` are the sole authoritative sources for the 35 ministerial portfolios headed by Chief Minister Thiru C. Joseph Vijay. All stale minister references have been purged.

### Conflict 2: District Collector Postings & Rotations
- **Source A (Legacy System Data):** 38 district collectors with outdated postings from prior fiscal years.
- **Source B (Authoritative Live Portal):** `https://www.tn.gov.in/district_collector.php` updated November 2026.
- **Reconciliation Decision:** The live portal table with 38 verified collectors (e.g., Tmt. N. Mirunalini IAS in Ariyalur, Dr. M. Veerappan IAS in Chengalpattu, Tmt. S. Malathi Helen IAS in Chennai, Pavankumar G Giriyappanavar IAS in Coimbatore, Nishant Krishna IAS in Madurai, K. Elambahavath IAS in Salem) supersedes all legacy records.

### Conflict 3: Deputy Chief Minister Office
- **Source A (Legacy Discussions):** Historical office of Deputy Chief Minister.
- **Source B (Official 2026 Cabinet Gazette):** No Deputy Chief Minister portfolio is designated in the 35-member Council of Ministers.
- **Reconciliation Decision:** No active Deputy Chief Minister record is generated in the canonical directory. The category is retired from active cabinet filtering.

### Conflict 4: Secretariat Departmental Restructuring
- **Source A (Legacy):** 36 historical departments.
- **Source B (Live Portal):** 42 Secretariat departments, including modern portfolios such as Artificial Intelligence, Information Technology and Digital Services Department, and Natural Resources.
- **Reconciliation Decision:** Upstream 42 Secretariat Departments and 40 active Secretaries are fully ingested.

### Conflict 5: Chief Secretary to Government Transition
- **Source A (Legacy System Data):** Prior administration civil service postings listed earlier incumbent as Chief Secretary.
- **Source B (Authoritative Live Portal & Civil List):** `https://www.tn.gov.in/cs.php` and Public (Special.A) Department register.
- **Reconciliation Decision:** Dr. M. Sai Kumar, IAS is the verified Chief Secretary to Government of Tamil Nadu (1990 batch). All backend services, hierarchy trees, and frontend adapters have been synchronized to Dr. M. Sai Kumar, IAS as the administrative head of civil services.


