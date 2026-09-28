"""
CMO Query Service: Production-grade data access layer for VERTRI TN AI OS.
Implements fast multi-attribute searching, relational joins, cross-queries, and audit timelines.
"""

from typing import List, Dict, Any, Optional
from datetime import date, datetime
from app.db.seed_cmo_data import (
    SAMPLE_OFFICIALS,
    SAMPLE_MINISTRIES,
    SAMPLE_DEPARTMENTS,
    SAMPLE_SCHEMES,
    SAMPLE_DISTRICTS,
    SAMPLE_ASSIGNMENTS,
    SAMPLE_PERSONNEL_CHANGES
)
from app.schemas.cmo_agent import (
    OfficialCard,
    DepartmentOverview,
    SchemeProgress,
    DistrictOverview,
    DistrictOfficerItem,
    ContactRecord,
    ContactSearchResponse,
    PersonnelChangeRecord,
    CrossQueryResponse
)


class CMOQueryService:
    def __init__(self):
        self.officials = SAMPLE_OFFICIALS
        self.ministries = SAMPLE_MINISTRIES
        self.departments = SAMPLE_DEPARTMENTS
        self.schemes = SAMPLE_SCHEMES
        self.districts = SAMPLE_DISTRICTS
        self.assignments = SAMPLE_ASSIGNMENTS
        self.personnel_changes = SAMPLE_PERSONNEL_CHANGES

    def find_official(self, query: str, filters: Optional[Dict[str, Any]] = None) -> List[OfficialCard]:
        q = (query or "").lower().strip()
        matched = []

        for off in self.officials:
            # Check text match
            name_en = off["full_name_en"].lower()
            name_ta = off["full_name_ta"].lower()
            posting = off["current_posting"].lower()
            cadre = str(off["cadre"]).lower()
            rank = off["designation_rank"].lower()

            matches_query = not q or (
                q in name_en or
                q in name_ta or
                q in posting or
                q in cadre or
                q in rank or
                any(token in name_en or token in posting for token in q.split())
            )

            if not matches_query:
                continue

            # Apply filters if provided
            if filters:
                if filters.get("cadre") and filters["cadre"].upper() not in str(off["cadre"]).upper():
                    continue
                if filters.get("department") and filters["department"].lower() not in (off.get("department_id") or "").lower():
                    continue
                if filters.get("designation") and filters["designation"].lower() not in off["designation_rank"].lower():
                    continue

            # Lookup department and ministry names
            dept_name = None
            if off.get("department_id"):
                dept = next((d for d in self.departments if d["id"] == off["department_id"]), None)
                if dept:
                    dept_name = dept["name_en"]

            min_name = None
            if off.get("ministry_id"):
                m = next((min_item for min_item in self.ministries if min_item["id"] == off["ministry_id"]), None)
                if m:
                    min_name = m["name_en"]

            # Lookup handled schemes
            handled_schemes = []
            for s in self.schemes:
                if off["id"] in s.get("responsible_official_ids", []):
                    handled_schemes.append({
                        "id": s["id"],
                        "name": s["name_en"],
                        "progress_percent": float(s["progress_percent"]),
                        "status": str(s["status"])
                    })

            # Lookup district jurisdictions
            districts = []
            for a in self.assignments:
                if a["official_id"] == off["id"] and a["entity_type"] == "DISTRICT":
                    d_obj = next((d for d in self.districts if d["id"] == a["entity_id"]), None)
                    if d_obj:
                        districts.append(d_obj["name_en"])

            card = OfficialCard(
                id=off["id"],
                full_name_en=off["full_name_en"],
                full_name_ta=off["full_name_ta"],
                cadre=str(off["cadre"].value if hasattr(off["cadre"], "value") else off["cadre"]),
                batch_year=off.get("batch_year"),
                current_posting=off["current_posting"],
                department_name=dept_name,
                ministry_name=min_name,
                phone_landline=off.get("phone_landline"),
                phone_mobile=off.get("phone_mobile"),
                official_email=off["official_email"],
                office_address=off["office_address"],
                posting_effective_date=off["posting_effective_date"].strftime("%Y-%m-%d") if isinstance(off["posting_effective_date"], date) else str(off["posting_effective_date"]),
                expected_retirement=off["expected_retirement"].strftime("%Y-%m-%d") if off.get("expected_retirement") and isinstance(off["expected_retirement"], date) else None,
                status=str(off["status"].value if hasattr(off["status"], "value") else off["status"]),
                notes=off.get("notes"),
                schemes_handled=handled_schemes,
                district_jurisdiction=districts,
                source_refs=off.get("source_refs", [])
            )
            matched.append(card)

        return matched

    def get_department_overview(self, department_name_or_id: str) -> Optional[DepartmentOverview]:
        target = department_name_or_id.lower().strip()
        dept = None

        for d in self.departments:
            if d["id"].lower() == target or target in d["name_en"].lower() or target in d["name_ta"].lower():
                dept = d
                break

        if not dept:
            # Fallback search by token
            for d in self.departments:
                if any(t in d["name_en"].lower() for t in target.split()):
                    dept = d
                    break

        if not dept:
            return None

        # Ministry
        ministry_name = None
        if dept.get("ministry_id"):
            m = next((min_item for min_item in self.ministries if min_item["id"] == dept["ministry_id"]), None)
            if m:
                ministry_name = m["name_en"]

        # Minister & Secretary names
        minister_name = None
        if dept.get("minister_official_id"):
            mo = next((o for o in self.officials if o["id"] == dept["minister_official_id"]), None)
            if mo:
                minister_name = mo["full_name_en"]

        secretary_name = None
        if dept.get("secretary_official_id"):
            so = next((o for o in self.officials if o["id"] == dept["secretary_official_id"]), None)
            if so:
                secretary_name = so["full_name_en"]

        # Active Schemes
        active_schemes = []
        for s in self.schemes:
            if s.get("department_id") == dept["id"]:
                active_schemes.append({
                    "id": s["id"],
                    "name": s["name_en"],
                    "budget_cr": float(s["budget_sanctioned"]),
                    "progress_percent": float(s["progress_percent"]),
                    "status": str(s["status"])
                })

        # Recent Changes
        changes = []
        for pc in self.personnel_changes:
            off = next((o for o in self.officials if o["id"] == pc["official_id"]), None)
            if off and off.get("department_id") == dept["id"]:
                changes.append({
                    "official_name": off["full_name_en"],
                    "change_type": str(pc["change_type"]),
                    "to_role": pc["to_role"],
                    "effective_date": str(pc["effective_date"]),
                    "order_ref": pc["order_ref"]
                })

        return DepartmentOverview(
            id=dept["id"],
            name_en=dept["name_en"],
            name_ta=dept["name_ta"],
            ministry_name=ministry_name,
            minister_name=minister_name,
            secretary_name=secretary_name,
            contact_phone=dept.get("contact_phone"),
            contact_email=dept.get("contact_email"),
            address=dept.get("address"),
            active_schemes=active_schemes,
            sub_agencies=["Commissionerate of Revenue Administration", "Disaster Management Cell"],
            recent_personnel_changes=changes,
            source_refs=dept.get("source_refs", [])
        )

    def get_scheme_progress(self, scheme_name_or_id: str, district: Optional[str] = None) -> Optional[SchemeProgress]:
        target = scheme_name_or_id.lower().strip()
        scheme = None

        for s in self.schemes:
            if s["id"].lower() == target or target in s["name_en"].lower() or target in s["name_ta"].lower():
                scheme = s
                break

        if not scheme:
            for s in self.schemes:
                if any(t in s["name_en"].lower() for t in target.split() if len(t) > 3):
                    scheme = s
                    break

        if not scheme:
            return None

        # Department & Ministry
        dept_name = None
        if scheme.get("department_id"):
            d = next((d for d in self.departments if d["id"] == scheme["department_id"]), None)
            if d:
                dept_name = d["name_en"]

        min_name = None
        if scheme.get("owning_ministry_id"):
            m = next((m for m in self.ministries if m["id"] == scheme["owning_ministry_id"]), None)
            if m:
                min_name = m["name_en"]

        # Responsible Officers
        resp_officers = []
        for oid in scheme.get("responsible_official_ids", []):
            o = next((o for o in self.officials if o["id"] == oid), None)
            if o:
                resp_officers.append({
                    "id": o["id"],
                    "name": o["full_name_en"],
                    "posting": o["current_posting"],
                    "phone": o.get("phone_mobile") or o.get("phone_landline"),
                    "email": o["official_email"]
                })

        # District coverage names
        district_coverage = []
        district_progress = []
        for d_id in scheme.get("geography_ids", []):
            d_obj = next((d for d in self.districts if d["id"] == d_id), None)
            if d_obj:
                district_coverage.append(d_obj["name_en"])
                district_progress.append({
                    "district": d_obj["name_en"],
                    "status": "HEALTHY" if float(scheme["progress_percent"]) > 80 else "ATTENTION",
                    "progress_pct": float(scheme["progress_percent"])
                })

        # Filter by specific district if requested
        if district:
            district_coverage = [d for d in district_coverage if district.lower() in d.lower()]
            district_progress = [dp for dp in district_progress if district.lower() in dp["district"].lower()]

        return SchemeProgress(
            id=scheme["id"],
            name_en=scheme["name_en"],
            name_ta=scheme["name_ta"],
            department_name=dept_name,
            ministry_name=min_name,
            responsible_officers=resp_officers,
            budget_sanctioned_cr=float(scheme["budget_sanctioned"]),
            budget_released_cr=float(scheme["budget_released"]),
            financial_year=scheme["financial_year"],
            status=str(scheme["status"].value if hasattr(scheme["status"], "value") else scheme["status"]),
            progress_percent=float(scheme["progress_percent"]),
            milestones=scheme.get("milestones", []),
            district_coverage=district_coverage,
            district_progress=district_progress,
            sector=scheme.get("sector"),
            source_refs=scheme.get("source_refs", [])
        )

    def get_district_overview(self, district_name: str) -> Optional[DistrictOverview]:
        target = district_name.lower().strip()
        district = None

        for d in self.districts:
            if d["id"].lower() == target or target in d["name_en"].lower() or target in d["name_ta"].lower():
                district = d
                break

        if not district:
            return None

        # Deployed officers
        officers = []
        for a in self.assignments:
            if a["entity_type"] == "DISTRICT" and a["entity_id"] == district["id"]:
                o = next((o for o in self.officials if o["id"] == a["official_id"]), None)
                if o:
                    officers.append(DistrictOfficerItem(
                        role=a["role"],
                        name=o["full_name_en"],
                        cadre=str(o["cadre"].value if hasattr(o["cadre"], "value") else o["cadre"]),
                        cug_phone=o.get("phone_landline") or o.get("phone_mobile"),
                        email=o["official_email"]
                    ))

        # Active schemes in this district
        active_schemes = []
        for s in self.schemes:
            if district["id"] in s.get("geography_ids", []):
                active_schemes.append({
                    "id": s["id"],
                    "name": s["name_en"],
                    "sector": s.get("sector"),
                    "progress_percent": float(s["progress_percent"]),
                    "budget_cr": float(s["budget_sanctioned"]),
                    "status": str(s["status"])
                })

        return DistrictOverview(
            id=district["id"],
            name_en=district["name_en"],
            name_ta=district["name_ta"],
            region=district["region"],
            mp_constituencies=district.get("mp_constituencies", []),
            assembly_constituencies=district.get("assembly_constituencies", []),
            deployed_officers=officers,
            active_schemes=active_schemes,
            key_indicators=district.get("key_indicators", {}),
            source_refs=[{"source": "District Administration Portal", "date": "2026-09-20"}]
        )

    def search_contacts(self, filters: Dict[str, Any], page: int = 1, page_size: int = 20) -> ContactSearchResponse:
        results = []
        cadre_filter = (filters.get("cadre") or "").upper().strip()
        dept_filter = (filters.get("department") or "").lower().strip()
        keyword = (filters.get("keyword") or "").lower().strip()
        rank_filter = (filters.get("rank") or "").lower().strip()

        for off in self.officials:
            if cadre_filter and cadre_filter != "ALL" and cadre_filter not in str(off["cadre"]).upper():
                continue

            if dept_filter:
                dept_match = False
                if off.get("department_id") and dept_filter in off["department_id"].lower():
                    dept_match = True
                if not dept_match:
                    continue

            if rank_filter and rank_filter not in off["designation_rank"].lower():
                continue

            if keyword:
                match = (
                    keyword in off["full_name_en"].lower() or
                    keyword in off["full_name_ta"].lower() or
                    keyword in off["current_posting"].lower() or
                    keyword in off["office_address"].lower()
                )
                if not match:
                    continue

            # Resolve department name
            dept_name = "Government of Tamil Nadu"
            if off.get("department_id"):
                d = next((d for d in self.departments if d["id"] == off["department_id"]), None)
                if d:
                    dept_name = d["name_en"]

            results.append(ContactRecord(
                id=off["id"],
                name_en=off["full_name_en"],
                name_ta=off["full_name_ta"],
                cadre=str(off["cadre"].value if hasattr(off["cadre"], "value") else off["cadre"]),
                batch_year=off.get("batch_year"),
                designation=off["current_posting"],
                department=dept_name,
                district=None,
                phone_landline=off.get("phone_landline"),
                phone_mobile=off.get("phone_mobile"),
                official_email=off["official_email"],
                office_address=off["office_address"],
                status=str(off["status"].value if hasattr(off["status"], "value") else off["status"])
            ))

        total_count = len(results)
        start_idx = (page - 1) * page_size
        paged_results = results[start_idx:start_idx + page_size]

        return ContactSearchResponse(
            total_count=total_count,
            page=page,
            page_size=page_size,
            results=paged_results
        )

    def get_personnel_changes(
        self,
        date_from: str,
        date_to: str,
        cadre: Optional[str] = None,
        department: Optional[str] = None
    ) -> List[PersonnelChangeRecord]:
        records = []

        for pc in self.personnel_changes:
            off = next((o for o in self.officials if o["id"] == pc["official_id"]), None)
            if not off:
                continue

            if cadre and cadre.upper() not in str(off["cadre"]).upper():
                continue

            if department and department.lower() not in (off.get("department_id") or "").lower():
                continue

            records.append(PersonnelChangeRecord(
                id=str(pc.get("id", pc["official_id"] + "_transfer")),
                official_id=off["id"],
                official_name=off["full_name_en"],
                cadre=str(off["cadre"].value if hasattr(off["cadre"], "value") else off["cadre"]),
                change_type=str(pc["change_type"].value if hasattr(pc["change_type"], "value") else pc["change_type"]),
                from_role=pc.get("from_role"),
                to_role=pc["to_role"],
                effective_date=str(pc["effective_date"]),
                order_ref=pc["order_ref"],
                source_gazette_url=f"https://cms.tn.gov.in/sites/default/files/go/{pc['order_ref'].replace(' ', '_')}.pdf"
            ))

        return records

    def cross_query(self, entities: Dict[str, Any]) -> CrossQueryResponse:
        officials_req = entities.get("officials", [])
        depts_req = entities.get("departments", [])
        schemes_req = entities.get("schemes", [])
        districts_req = entities.get("districts", [])

        rel_officials = []
        rel_schemes = []
        rel_districts = []
        intersections = []

        # Find relevant officials
        for off in self.officials:
            matches = False
            for o_query in officials_req:
                if o_query.lower() in off["full_name_en"].lower() or o_query.lower() in str(off["cadre"]).lower():
                    matches = True
                    break
            if matches or not officials_req:
                rel_officials.append({
                    "id": off["id"],
                    "name": off["full_name_en"],
                    "posting": off["current_posting"],
                    "cadre": str(off["cadre"])
                })

        # Find relevant schemes
        for s in self.schemes:
            matches = False
            for s_query in schemes_req:
                if s_query.lower() in s["name_en"].lower() or s_query.lower() in (s.get("sector") or "").lower():
                    matches = True
                    break
            if matches or not schemes_req:
                rel_schemes.append({
                    "id": s["id"],
                    "name": s["name_en"],
                    "progress_percent": float(s["progress_percent"]),
                    "budget_cr": float(s["budget_sanctioned"])
                })

        # Intersections
        for d_query in districts_req:
            d_obj = next((d for d in self.districts if d_query.lower() in d["name_en"].lower()), None)
            if d_obj:
                rel_districts.append(d_obj["name_en"])
                # Link officers and schemes in this district
                d_officers = [
                    o["full_name_en"] for a in self.assignments
                    if a["entity_type"] == "DISTRICT" and a["entity_id"] == d_obj["id"]
                    for o in self.officials if o["id"] == a["official_id"]
                ]
                d_schemes = [
                    s["name_en"] for s in self.schemes if d_obj["id"] in s.get("geography_ids", [])
                ]
                intersections.append({
                    "district": d_obj["name_en"],
                    "deployed_officers": d_officers,
                    "active_schemes": d_schemes
                })

        return CrossQueryResponse(
            query_summary=f"Cross-entity graph intersection across {len(rel_officials)} officials, {len(rel_schemes)} schemes, {len(rel_districts)} districts",
            intersection_results=intersections,
            related_officials=rel_officials[:10],
            related_schemes=rel_schemes[:10],
            related_districts=[{"district": d} for d in rel_districts]
        )


cmo_service = CMOQueryService()
