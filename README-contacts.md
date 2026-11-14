# Government Contacts Directory — Operational Guide

**System:** VERTRI TN AI OS  
**Route:** `/contacts` (and alias `/directory`)  
**Standard:** Zero Fabricated Data, Explicit Source Provenance, RBAC Communication Masking

---

## 1. Overview
The **Government Contacts Directory** page provides an authoritative, source-verified search and filtering interface for the Hon'ble Chief Minister and authorized Secretariat staff. It indexes officials across:
- **Council of Ministers**
- **Chief Secretary & Secretariat Leadership**
- **IAS, IPS, IFoS, IRS Civil Services**
- **All 38 District Collectors**
- **District Revenue Officers (DROs), RDOs, and DRDA Project Directors**
- **Superintendents of Police (SPs) & Police Commissioners**
- **Heads of Departments (HODs)**
- **Municipal Corporation & Municipality Commissioners**

---

## 2. Verification Status Assignment Lifecycle

Every contact record strictly enforces one of six verified states:

| Status | Definition | Visual Indicator | Operational Guideline |
|---|---|---|---|
| `VERIFIED_CURRENT` | Verified from an official Government portal, Gazette, or NIC directory dated 2025–2026. | 🟢 Green Badge | Safe for direct executive correspondence and official dispatch. |
| `VERIFIED_HISTORICAL` | Official source confirmed, but document/portal was published prior to 2025. | 🔵 Blue Badge | Institutional line is valid, but the named official may have moved. |
| `PENDING_VERIFICATION` | Official record identified on a single preliminary source (e.g. recent reshuffle order). | ⚪ Slate Badge | Cross-check with Public Dept / Home Dept before external citation. |
| `CONFLICTED` | Two official government portals disagree on the active incumbent. | 🟡 Amber Banner | Explanatory note displayed in tooltip and detail sheet. |
| `STALE` | Record is demonstrably superseded by a subsequent transfer or restructuring order. | 🟠 Orange Badge | Requires immediate re-audit and updated government order citation. |
| `NOT_PUBLICLY_AVAILABLE` | Official portal does not publish person name, phone, or email. | ⚪ Grey Chip | Renders explicitly as "Not published" — never left blank. |

---

## 3. Role-Based Access Control (RBAC) & Communication Masking

Communication coordinates (`office_email` and `office_phone`) are strictly gated according to user clearance:

- **`CM` / `PS` / `SECRETARY`**: Full unredacted access to official emails, desk lines, and vCard export.
- **`ANALYST`**: Communication channels revealed only for `VERIFIED_CURRENT` records.
- **`READONLY`**: `office_email` and `office_phone` are completely stripped both in the UI (rendered with a lock icon: *Restricted for READONLY*) and stripped server-side in API responses (`/api/contacts`) and CSV exports.

Every user click to copy or dial an official's contact number is cryptographically logged to the non-blocking audit endpoint:
```http
POST /api/audit/reveal
Content-Type: application/json

{
  "user_id": "usr-cm-001",
  "contact_id": "collr-chengalpattu",
  "field": "phone",
  "timestamp": "2026-11-14T14:30:00Z"
}
```

---

## 4. How to Add a New Contact Record

1. Locate the appropriate category JSON file under `data/contacts/`:
   - `ministers.json`
   - `chief_secretary.json`
   - `secretariat.json`
   - `ias.json`
   - `ips.json`
   - `ifos.json`
   - `district_collectors.json`
   - `dro.json`
   - `department_heads.json`
   - `municipal.json`
   - `other.json`

2. Add a new JSON object adhering to `ContactRecord` schema:
   ```json
   {
     "contact_id": "dist-ranipet-dro-01",
     "category": "DRO",
     "full_name": "Thiru. K. Raji",
     "designation": "District Revenue Officer",
     "service": "State",
     "department": "Revenue",
     "district": "Ranipet",
     "office_email": "dro.tnrpt@nic.in",
     "office_phone": "04172-271001",
     "office_address": "Collectorate, Ranipet - 632401",
     "source_url": "https://ranipet.nic.in/about-district/whos-who/",
     "source_title": "Who's Who | Ranipet District",
     "source_date": "2026-08-11",
     "verified_on": "2026-11-14",
     "verification_status": "VERIFIED_CURRENT",
     "notes": "Verified from district Who's Who portal."
   }
   ```

3. Validate the dataset:
   ```bash
   pnpm tsc --noEmit
   ```

---

## 5. How to Refresh Stale Data

1. Run the audit crawler or inspect the official district NIC portal (`<district>.nic.in/whos-who`).
2. Update the `full_name`, `designation`, `office_phone`, or `office_email` if a transfer order has taken effect.
3. Update `verified_on` to the current ISO date (`YYYY-MM-DD`).
4. Update `source_date` to reflect the publication date on the government page.
5. If the previous official was transferred but the successor is not yet published, set `full_name: null` and assign `verification_status: "NOT_PUBLICLY_AVAILABLE"`.

---

## 6. How to Request New Fields or Schemas

To propose new attributes (e.g. `camp_office_phone`, `fax_number`, `cug_wireless_callsign`):
1. Open a schema RFC in `types/contacts.ts`.
2. Ensure optionality using `.optional().nullable()` to prevent breaking legacy records.
3. Update `lib/contacts/loader.ts` and `lib/contacts/export.ts` to include the field in CSV/vCard exports.
4. Update `ContactCard.tsx` and `ContactDetailSheet.tsx` with appropriate ARIA accessibility labels and RBAC masking rules.
