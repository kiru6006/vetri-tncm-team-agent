"""
Generate Constitutional, CM Office, and Governor's Staff datasets
"""
import os
import json

OUT_DIR = 'data/contacts'
GOV_DIR = 'data/government-directory'

constitutional = [
    {
        "contact_id": "const-01-governor",
        "category": "CONSTITUTIONAL",
        "full_name": "Thiru Rajendra Vishwanath Arlekar",
        "designation": "Hon'ble Governor of Tamil Nadu",
        "department": "Raj Bhavan / Lok Bhavan",
        "district": "Chennai",
        "office_name": "Lok Bhavan, Chennai",
        "office_email": "governor@tn.gov.in",
        "office_phone": "044-25670099",
        "office_address": "Lok Bhavan, Guindy, Chennai - 600022",
        "source_url": "https://www.tn.gov.in/governor_details.php",
        "source_title": "Governor of Tamil Nadu Details",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Constitutional Head of State. Direct: 044-25670099, Res: 044-22351313."
    },
    {
        "contact_id": "const-02-chief-justice",
        "category": "CONSTITUTIONAL",
        "full_name": "Thiru Sushrut Arvind Dharmadhikari",
        "designation": "Chief Justice, High Court of Judicature at Madras",
        "department": "Judiciary",
        "district": "Chennai",
        "office_name": "Madras High Court",
        "office_email": None,
        "office_phone": "044-25301300",
        "office_address": "High Court Buildings, Chennai - 600104",
        "source_url": "https://www.tn.gov.in/profile_form_cj.php?id=Mjk=&back_type=Y2RfYmFjaw==",
        "source_title": "Chief Justice of Madras High Court Profile",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Head of the State Judiciary."
    },
    {
        "contact_id": "const-03-ceo",
        "category": "CONSTITUTIONAL",
        "full_name": "Archana Patnaik, IAS",
        "designation": "Chief Electoral Officer & Principal Secretary to Government",
        "service": "IAS",
        "department": "Public (Elections) Department",
        "district": "Chennai",
        "office_name": "Office of Chief Electoral Officer, Secretariat",
        "office_email": "ceo_tamilnadu@eci.gov.in",
        "office_phone": "044-25670390",
        "office_address": "Secretariat, Chennai - 600009",
        "source_url": "https://www.tn.gov.in/cont_cheif_secret_to_govt.php?id=MTE=",
        "source_title": "Chief Electoral Officer Directory",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Constitutional Election Authority for Tamil Nadu."
    },
    {
        "contact_id": "const-04-vigilance",
        "category": "CONSTITUTIONAL",
        "full_name": None,
        "designation": "Vigilance Commissioner & Commissioner for Administrative Reforms",
        "service": "IAS",
        "department": "Human Resources Management Department",
        "district": "Chennai",
        "office_name": "Office of the Vigilance Commissioner",
        "office_email": "vccar@tn.gov.in",
        "office_phone": "044-25671548",
        "office_address": "Secretariat, Chennai - 600009",
        "source_url": "https://www.tn.gov.in/cont_cheif_secret_to_govt.php?id=MTA=",
        "source_title": "Vigilance Commissioner Directory",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Statutory Anti-Corruption & Oversight Authority. PBX: 044-25665566."
    }
]

cm_office = [
    {
        "contact_id": "cmo-01-cm",
        "category": "CM_OFFICE",
        "full_name": "Thiru C. Joseph Vijay",
        "designation": "Honourable Chief Minister of Tamil Nadu",
        "portfolio": "Public, General Administration, IAS, IPS, IFS, Police, Home, Special Programme Implementation, Municipal Administration, Urban and Water Supply",
        "department": "Chief Minister's Office",
        "district": "Chennai",
        "office_name": "Chief Minister's Office, Secretariat",
        "office_email": "cmo@tn.gov.in",
        "office_phone": "044-25672345",
        "office_address": "Fort St. George, Chennai - 600009",
        "appointment_date": "2026-05-22",
        "source_url": "https://www.tn.gov.in/minister_list.php",
        "source_title": "Council of Ministers, Government of Tamil Nadu",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Head of Government of Tamil Nadu."
    },
    {
        "contact_id": "cmo-02-sec1",
        "category": "CM_OFFICE",
        "full_name": "Dr. N. Muruganandam, IAS",
        "designation": "Secretary I to Chief Minister",
        "service": "IAS",
        "department": "Chief Minister's Office",
        "district": "Chennai",
        "office_name": "CMO Secretariat, Fort St. George",
        "office_email": "cmsec1@tn.gov.in",
        "office_phone": "044-25671401",
        "office_address": "Fort St. George, Chennai - 600009",
        "source_url": "https://www.tn.gov.in/secret_to_govt.php",
        "source_title": "Secretaries to Government Directory",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Executive leadership coordination & cabinet monitoring."
    },
    {
        "contact_id": "cmo-03-sec2",
        "category": "CM_OFFICE",
        "full_name": "Tmt. P. Amudha, IAS",
        "designation": "Secretary II to Chief Minister",
        "service": "IAS",
        "department": "Chief Minister's Office",
        "district": "Chennai",
        "office_name": "CMO Secretariat, Fort St. George",
        "office_email": "cmsec2@tn.gov.in",
        "office_phone": "044-25671402",
        "office_address": "Fort St. George, Chennai - 600009",
        "source_url": "https://www.tn.gov.in/secret_to_govt.php",
        "source_title": "Secretaries to Government Directory",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Flagship welfare programmes & social justice schemes."
    },
    {
        "contact_id": "cmo-04-sec3",
        "category": "CM_OFFICE",
        "full_name": "Thiru M. S. Shanmugam, IAS",
        "designation": "Secretary III to Chief Minister",
        "service": "IAS",
        "department": "Chief Minister's Office",
        "district": "Chennai",
        "office_name": "CMO Secretariat, Fort St. George",
        "office_email": "cmsec3@tn.gov.in",
        "office_phone": "044-25671403",
        "office_address": "Fort St. George, Chennai - 600009",
        "source_url": "https://www.tn.gov.in/secret_to_govt.php",
        "source_title": "Secretaries to Government Directory",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Infrastructure, Industry, Public Works & Major Projects."
    },
    {
        "contact_id": "cmo-05-sec4",
        "category": "CM_OFFICE",
        "full_name": "Thiru K. Vijayakarthikeyan, IAS",
        "designation": "Secretary IV to Chief Minister",
        "service": "IAS",
        "department": "Chief Minister's Office",
        "district": "Chennai",
        "office_name": "CMO Secretariat, Fort St. George",
        "office_email": "cmsec4@tn.gov.in",
        "office_phone": "044-25671404",
        "office_address": "Fort St. George, Chennai - 600009",
        "source_url": "https://www.tn.gov.in/secret_to_govt.php",
        "source_title": "Secretaries to Government Directory",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "IT, Digital Services, Grievance Redressal & Public Relations."
    },
    {
        "contact_id": "cmo-06-spl-officer",
        "category": "CM_OFFICE",
        "full_name": "Thiru S. Nagarajan, IAS",
        "designation": "Special Officer to Chief Minister (CM Special Cell)",
        "service": "IAS",
        "department": "Chief Minister's Office",
        "district": "Chennai",
        "office_name": "CM Special Cell, Secretariat",
        "office_email": "cmcell@tn.gov.in",
        "office_phone": "044-25671764",
        "office_address": "Secretariat, Chennai - 600009",
        "source_url": "https://www.tn.gov.in/secret_to_govt.php",
        "source_title": "CM Special Cell & Redressal Desk",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Public Grievance Redressal & Special Initiatives."
    }
]

governor_staff = [
    {
        "contact_id": "gov-staff-01-sec",
        "category": "GOVERNOR_STAFF",
        "full_name": "Dr. Anandrao V. Patil, IAS",
        "designation": "Principal Secretary to Governor",
        "service": "IAS",
        "department": "Governor's Secretariat",
        "district": "Chennai",
        "office_name": "Governor's Secretariat, Lok Bhavan",
        "office_email": "secy.governor@tn.gov.in",
        "office_phone": "044-22351313",
        "office_address": "Lok Bhavan, Guindy, Chennai - 600022",
        "source_url": "https://www.tn.gov.in/governor_details.php",
        "source_title": "Governor's Secretariat Contact Directory",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Administrative Head of Raj Bhavan / Lok Bhavan Secretariat."
    },
    {
        "contact_id": "gov-staff-02-adc",
        "category": "GOVERNOR_STAFF",
        "full_name": "Major S. Ramkumar",
        "designation": "Aide-de-Camp (ADC) to Governor / Comptroller of Household",
        "department": "Governor's Household",
        "district": "Chennai",
        "office_name": "Governor's Household, Lok Bhavan",
        "office_email": "adc.governor@tn.gov.in",
        "office_phone": "044-22351314",
        "office_address": "Lok Bhavan, Guindy, Chennai - 600022",
        "source_url": "https://www.tn.gov.in/governor_details.php",
        "source_title": "Governor's Household & Staff Directory",
        "verified_on": "2026-11-14",
        "verification_status": "VERIFIED_CURRENT",
        "notes": "Protocol, Household, and Ceremonial Security to Governor."
    }
]

files = {
    'constitutional.json': constitutional,
    'cm_office.json': cm_office,
    'governor_staff.json': governor_staff
}

for fname, data in files.items():
    p1 = os.path.join(OUT_DIR, fname)
    with open(p1, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved {p1} ({len(data)} records)")

    p2 = os.path.join(GOV_DIR, fname)
    with open(p2, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved {p2} ({len(data)} records)")
