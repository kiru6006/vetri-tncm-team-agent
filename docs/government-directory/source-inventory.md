# Tamil Nadu Government Contact Directory: Official Source Inventory

**Document Version:** 1.0.0  
**Audit Date:** 2026-11-14  
**Auditing Authority:** VERTRI TN AI OS Technical Governance Team  
**Master Entry Point:** `https://www.tn.gov.in/contact_directory.php`

---

## 1. Executive Summary

An exhaustive live discovery was performed against the Government of Tamil Nadu's official Contact Directory (`contact_directory.php`) and its underlying departmental and institutional subpages. All major leadership, legislative, executive, administrative, departmental, and public sector undertaking records have been mapped to canonical categories.

| Ref ID | Category Description | Official Source URL | Upstream Authority | Live Status | Records Discovered |
|---|---|---|---|---|---|
| **DIR-01** | Governor & Household | `https://www.tn.gov.in/governor_details.php` | Raj Bhavan / Lok Bhavan | 200 OK | 2 (Governor & Household) |
| **DIR-02** | Chief Minister & CMO | `https://www.tn.gov.in/minister_list.php` & `con_cmsc.php` | Chief Minister's Office | 200 OK | 1 (CM) + 6 CMO Staff |
| **DIR-03** | Deputy Chief Minister | `https://www.tn.gov.in/minister_list.php` | Cabinet Secretariat | 200 OK | Evaluated (N/A in current cabinet structure) |
| **DIR-04** | Council of Ministers | `https://www.tn.gov.in/minister_list.php` | Cabinet Secretariat / DIPR | 200 OK | 35 Ministers |
| **DIR-05** | CM Office Secretariat | `https://www.tn.gov.in/secret_to_govt.php` | Public (Special) Department | 200 OK | 4 Secretaries to CM + 2 Spl Officers |
| **DIR-06** | Chief Secretary & Office | `https://www.tn.gov.in/cont_cheif_secret_to_govt.php?id=Nw==` | Personnel & General Admin | 200 OK | 1 Chief Secretary + Office |
| **DIR-07** | Secretariat Departments | `https://www.tn.gov.in/cont_dir_department_list.php` | Secretariat Administration | 200 OK | 42 Departments |
| **DIR-08** | Secretaries to Government | `https://www.tn.gov.in/secret_to_govt.php` | Public (Special) Department | 200 OK | 40 Secretaries / ACS / Pr. Sec. |
| **DIR-09** | Heads of Departments (HoD) | `https://www.tn.gov.in/cont_dir_All_hod_list.php` | Line Departments | 200 OK | 242 Directorates & Commissions |
| **DIR-10** | Public Sector Undertakings | `https://www.tn.gov.in/cont_dir_All_und_tak.php` | Finance (BPE) / Line Depts | 200 OK | 172 Undertakings & Boards |
| **DIR-11** | District Collectors | `https://www.tn.gov.in/district_collector.php` | Revenue & Disaster Management | 200 OK | 38 District Collectors |
| **DIR-12** | Legislative Assembly (MLAs) | `https://assembly.tn.gov.in/17thassembly_members.php` | Tamil Nadu Legislative Assembly | 200 OK | 234 Assembly Constituencies |
| **DIR-13** | Rajya Sabha MPs | `https://rajyasabha.nic.in/Members/StateWise` | Parliament of India (Rajya Sabha) | 200 OK | 18 Rajya Sabha Members |
| **DIR-14** | Chief Justice & Judiciary | `https://www.tn.gov.in/profile_form_cj.php?id=Mjk=&back_type=Y2RfYmFjaw==` | Madras High Court | 200 OK | 1 Chief Justice |
| **DIR-15** | Vigilance Commissioner | `https://www.tn.gov.in/cont_cheif_secret_to_govt.php?id=MTA=` | HR Management Department | 200 OK | 1 Vigilance Commissioner |
| **DIR-16** | Chief Electoral Officer | `https://www.tn.gov.in/cont_cheif_secret_to_govt.php?id=MTE=` | Public (Elections) Department | 200 OK | 1 Chief Electoral Officer |
| **DIR-17** | State Guest Houses | `https://www.tn.gov.in/state_guest_houses.php?org_name=MTE2ODQy&field_cont_category_value=NA==` | Public (Protocol) Department | 200 OK | 2 (Chepauk Guest House & TN House Delhi) |
| **DIR-18** | IAS Officers (State Cadre) | `https://tnsectdemo.tn.gov.in/ias/` | Public (Special-A) Department | 200 OK | 385 Cadre List / Ret. Track |
| **DIR-19** | IPS Officers (State Cadre) | `https://eservices.tnpolice.gov.in/` | Home (Police) Department | 200 OK | State Police Cadre / Range DGs |
| **DIR-20** | Indian Forest Service (IFoS) | `https://www.forests.tn.gov.in/` | Environment & Forests Dept | 200 OK | PCCF & Field Directors |
| **DIR-21** | District Revenue Officers | District Portals (`<dist>.nic.in`) | Revenue Administration | 200 OK | 38 DROs + Municipal Commissioners |

---

## 2. Category Detail & Extraction Protocols

### 2.1 State Leadership (DIR-01, DIR-02, DIR-06, DIR-14, DIR-15, DIR-16, DIR-17)
- **Governor:** Thiru Rajendra Vishwanath Arlekar, Lok Bhavan, Chennai 600 022 (`044-25670099`, `044-22351313`).
- **Chief Minister:** Thiru C. Joseph Vijay, Honourable Chief Minister, Fort St. George (`cmo@tn.gov.in`, `044-25672345`).
- **Chief Secretary:** Dr. M. Sai Kumar, IAS, Chief Secretary to Government (`cs@tn.gov.in`, `044-25671555`).
- **Chief Justice:** Thiru Sushrut Arvind Dharmadhikari, Chief Justice, Madras High Court.
- **Vigilance Commissioner:** Additional Chief Secretary / Vigilance Commissioner & Commissioner for Administrative Reforms (`vccar@tn.gov.in`, `044-25671548`, PBX: `044-25665566`).
- **Chief Electoral Officer:** Archana Patnaik, IAS, Chief Electoral Officer & Principal Secretary (`044-25670390`).
- **State Guest Houses:** State Guest House Chepauk (`044-28518284`, `044-28516921`) and Tamil Nadu House New Delhi (`011-24193100`).

### 2.2 Council of Ministers (DIR-04)
- **Source:** `https://www.tn.gov.in/minister_list.php`
- **Total Portfolios:** 35 ministers.
- **Data Extracted:** Serial number, full name with honorific, official designation, assigned departments and portfolios.
- **Contact Channels:** Institutional CMO email (`cmo@tn.gov.in`) and Secretariat phone network. Individual private phones/emails are marked `NOT_PUBLICLY_AVAILABLE` to prevent PII violations and ensure security.

### 2.3 Secretariat Departments & Secretaries to Government (DIR-07, DIR-08)
- **Source:** `https://www.tn.gov.in/secret_to_govt.php` and `https://www.tn.gov.in/cont_dir_department_list.php`
- **Total Departments:** 42 departments.
- **Total Named Secretaries:** 40 Secretaries / Additional Chief Secretaries / Principal Secretaries.
- **Data Extracted:** Department name, officer name, cadre, rank, direct phone number, PBX extension, official institutional email (e.g. `agrisec@tn.gov.in`, `finsec@tn.gov.in`, `secyit@tn.gov.in`).

### 2.4 District Collectors (DIR-11)
- **Source:** `https://www.tn.gov.in/district_collector.php`
- **Total Districts:** 38 districts.
- **Data Extracted:** District name, officer name, designation, postal office address with pincode, office telephone, fax number, official NIC email (`collr<dist>@nic.in`).

### 2.5 Legislative Assembly Members (MLAs) (DIR-12)
- **Source:** `https://assembly.tn.gov.in/17thassembly_members.php`
- **Total Constituencies:** 234 Assembly constituencies.
- **Data Extracted:** Constituency number (1 to 234), constituency name, member full name, political affiliation, official assembly email (`mla<constituency>@tn.gov.in`).

### 2.6 Heads of Departments (DIR-09) & Undertakings (DIR-10)
- **HoD Source:** `https://www.tn.gov.in/cont_dir_All_hod_list.php` (242 directorates, commissionerates, boards).
- **Undertakings Source:** `https://www.tn.gov.in/cont_dir_All_und_tak.php` (172 state PSUs, corporations, apex societies).
- **Contact Pattern:** Institutional office listing with direct subpage query parameters (`detail_contact_hod.php` and `detail_contact.php`). Where named officers are omitted on index listings, records are populated institutionally with `full_name: null` and `verification_status: "NOT_PUBLICLY_AVAILABLE"` with clear provenance links.

### 2.7 Rajya Sabha MPs (DIR-13)
- **Source:** `https://rajyasabha.nic.in/Members/StateWise` linked from master directory.
- **Total Representation:** 18 Rajya Sabha seats from Tamil Nadu.
- **Data Extracted:** Member name, party, house email, constituency/state representation.

---

## 3. Data Governance & Integrity Guarantees

1. **Zero Fabrication:** If an individual email or phone number is unlisted, it is preserved as `null` with explicit `NOT_PUBLICLY_AVAILABLE` status.
2. **Provenance Traceability:** Every single entry links directly to its official source URL, title, and timestamp.
3. **Institutional Fallbacks:** Institutional emails (`cmo@tn.gov.in`, `cs@tn.gov.in`, `collr*@nic.in`, `mla*@tn.gov.in`) are strictly validated against government domains (`tn.gov.in`, `nic.in`, `sansad.in`).

