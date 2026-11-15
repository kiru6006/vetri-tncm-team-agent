# Tamil Nadu Government Contact Directory: Category Coverage & Gap Analysis

**Document Version:** 1.0.0  
**Audit Date:** 2026-11-14  
**Context:** VETTRI TN AI OS Governance Platform  
**Audit Baseline:** Existing local datasets in `data/contacts/` vs Live Portal Records (`https://www.tn.gov.in/contact_directory.php`)

---

## 1. Category Coverage Matrix

The table below contrasts the legacy implementation against the official live Tamil Nadu government directory categories:

| ID | Category | Official Portal Source | Legacy System State | New Verified State | Coverage Status | Action Required |
|---|---|---|---|---|---|---|
| **DIR-01** | Governor & Household | `governor_details.php` | Not tracked separately | 2 records verified | **Expanded** | Add to State Leadership |
| **DIR-02** | Chief Minister & CMO | `minister_list.php` & `con_cmsc.php` | Single unverified record | Verified live record + 6 staff | **Verified** | Update with institutional channels |
| **DIR-03** | Deputy Chief Minister | `minister_list.php` | Outdated historical record | Confirmed unassigned in 2026 cabinet | **Reconciled** | Retired from active cabinet view |
| **DIR-04** | Council of Ministers | `minister_list.php` | 10 stale/mixed records | All 35 official ministers | **100% Complete** | Replace with 35 live cabinet records |
| **DIR-05** | CM Office (Secretariat) | `secret_to_govt.php` | Absent | 4 Secretaries + 2 Spl Officers | **Expanded** | Integrate into CMO section |
| **DIR-06** | Chief Secretary | `cont_cheif_secret_to_govt.php?id=Nw==` | Stale legacy officer | Live officer (Dr. M. Sai Kumar, IAS) | **Verified** | Update contact & office details |
| **DIR-07** | Secretariat Departments | `cont_dir_department_list.php` | 1 dummy department | 42 official departments | **100% Complete** | Ingest all 42 departments |
| **DIR-08** | Secretaries to Govt | `secret_to_govt.php` | 1 generic placeholder | 40 live Secretaries/ACS | **100% Complete** | Ingest all 40 verified Secretaries |
| **DIR-09** | Heads of Depts (HoD) | `cont_dir_All_hod_list.php` | 2 mock directorates | 242 official HoD institutions | **100% Complete** | Ingest all 242 HoDs |
| **DIR-10** | Govt Undertakings/PSUs | `cont_dir_All_und_tak.php` | Absent | 172 state PSUs & Boards | **100% Complete** | Create canonical Undertakings |
| **DIR-11** | District Collectors | `district_collector.php` | 38 records with outdated names | 38 live verified Collectors | **100% Complete** | Replace with live portal data |
| **DIR-12** | Legislative Assembly (MLAs)| `17thassembly_members.php` | Absent | 234 Assembly constituencies | **100% Complete** | Ingest all 234 MLA records |
| **DIR-13** | Rajya Sabha MPs | `rajyasabha.nic.in` | Absent | 18 Rajya Sabha members | **100% Complete** | Ingest all 18 RS MP records |
| **DIR-14** | Chief Justice & Judiciary | `profile_form_cj.php` | Absent | Live Chief Justice record | **Expanded** | Add to State Leadership |
| **DIR-15** | Vigilance Commissioner | `cont_cheif_secret_to_govt.php?id=MTA=`| Absent | Live ACS/Vigilance record | **Expanded** | Add to State Leadership |
| **DIR-16** | Chief Electoral Officer | `cont_cheif_secret_to_govt.php?id=MTE=`| Absent | Live CEO record (Archana Patnaik) | **Expanded** | Add to State Leadership |
| **DIR-17** | State Guest Houses | `state_guest_houses.php` | Absent | Chepauk & Delhi Houses | **Expanded** | Add to State Leadership |
| **DIR-18** | IAS Officers (State Cadre) | `tnsectdemo.tn.gov.in/ias/` | 1 record | State cadre database link | **Linked** | Official directory registry |
| **DIR-19** | IPS Officers (State Cadre) | `eservices.tnpolice.gov.in/` | 6 sample records | State police range hierarchy | **Retained & Verified** | Retained with source metadata |
| **DIR-20** | Forest Service (IFoS) | `forests.tn.gov.in/` | 3 sample records | Verified PCCF leadership | **Retained & Verified** | Retained with source metadata |
| **DIR-21** | DROs & Municipal Comm. | District Portals | 24 DROs / 10 Municipal | 38 DROs + Municipal | **Audited** | Retained with source metadata |

---

## 2. Quantitative Growth

| Metric | Legacy Implementation | Reconciled Official Implementation | Net Increase |
|---|---|---|---|
| **Total Official Categories** | 6 (narrow) | 21 (complete) | +15 categories |
| **Total Directory Records** | ~98 | **800+** | +700+ records |
| **Council of Ministers** | 10 | 35 | +25 (100% cabinet) |
| **District Collectors** | 38 (stale) | 38 (live verified) | Replaced with verified |
| **MLAs (Legislative Assembly)**| 0 | 234 | +234 |
| **Rajya Sabha MPs** | 0 | 18 | +18 |
| **Secretaries to Government** | 1 | 40 | +39 |
| **Heads of Departments** | 2 | 242 | +240 |
| **Government Undertakings** | 0 | 172 | +172 |
| **State Leadership & Statutory**| 1 | 10 | +9 |

---

## 3. Implementation Steps for Directory Engine

1. **Category Expansion in Schema:** Extend `Category` enum in `types/contacts.ts` to include `STATE_LEADERSHIP`, `MINISTER`, `MLA`, `MP`, `SECRETARIAT`, `HOD`, `UNDERTAKING`, `COLLECTOR`, `DRO`, `IAS`, `IPS`, `IFOS`, `MUNICIPAL_COMMISSIONER`, `OTHER`.
2. **Canonical Datasets Generation:** Extract data from cached official HTML into canonical JSON files under `data/government-directory/` and sync with `data/contacts/`.
3. **UI Enhancements:**
   - Add tab navigation in `CategoryTabs.tsx` supporting: Overview, State Leadership, Ministers, MLAs & MPs, Secretaries, Collectors, HoDs, Undertakings, Civil Services (IAS/IPS/IFoS), Field Officers (DRO/Municipal).
   - Add stats summary cards on Directory Overview.
   - Support institutional contact cards where `full_name` is null.

