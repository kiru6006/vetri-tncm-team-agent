"""
Executive Intelligence Service: Core intelligence reasoning, Knowledge Graph traversal,
departmental diagnostics, and meeting preparation for VERTRI TN AI OS Phase 4.
"""

from datetime import datetime, date
from typing import Dict, Any, List, Optional
from app.schemas.executive_intel import (
    GraphNode,
    GraphEdge,
    KnowledgeGraphResponse,
    OfficerExecutiveIntelligence,
    DepartmentIntelligence,
    SchemeIntelligence,
    MeetingPreparationResponse,
    ExecutiveDecisionSupportResponse,
    ExecutiveDecisionActionItem
)
from app.db.seed_cmo_data import (
    SAMPLE_OFFICIALS,
    SAMPLE_DEPARTMENTS,
    SAMPLE_MINISTRIES,
    SAMPLE_SCHEMES,
    SAMPLE_DISTRICTS,
    SAMPLE_ASSIGNMENTS,
    SAMPLE_PERSONNEL_CHANGES
)


class ExecutiveIntelligenceService:
    def __init__(self):
        self.officials = SAMPLE_OFFICIALS
        self.departments = SAMPLE_DEPARTMENTS
        self.ministries = SAMPLE_MINISTRIES
        self.schemes = SAMPLE_SCHEMES
        self.districts = SAMPLE_DISTRICTS
        self.assignments = SAMPLE_ASSIGNMENTS
        self.personnel_changes = SAMPLE_PERSONNEL_CHANGES

    # 1. Government Knowledge Graph Generator
    def get_knowledge_graph(self, root_entity_id: str) -> KnowledgeGraphResponse:
        nodes: List[GraphNode] = []
        edges: List[GraphEdge] = []
        visited = set()

        root_off = next((o for o in self.officials if o["id"] == root_entity_id), None)
        root_name = root_off["full_name_en"] if root_off else "Government Knowledge Graph"

        # Add Core Hierarchy Nodes
        for off in self.officials:
            nodes.append(GraphNode(
                id=off["id"],
                label=f"{off['full_name_en']} ({off['cadre']})",
                type="OFFICIAL",
                metadata={"posting": off["current_posting"], "email": off["official_email"], "status": str(off["status"])},
                avatar_or_icon="User"
            ))

        for dept in self.departments:
            nodes.append(GraphNode(
                id=dept["id"],
                label=dept["name_en"],
                type="DEPARTMENT",
                metadata={"phone": dept.get("contact_phone")},
                avatar_or_icon="Building2"
            ))

        for sch in self.schemes:
            nodes.append(GraphNode(
                id=sch["id"],
                label=sch["name_en"],
                type="SCHEME",
                metadata={"progress": float(sch["progress_percent"]), "budget_cr": float(sch["budget_sanctioned"])},
                avatar_or_icon="Layers"
            ))

        for dist in self.districts:
            nodes.append(GraphNode(
                id=dist["id"],
                label=f"{dist['name_en']} District",
                type="DISTRICT",
                metadata={"region": dist["region"]},
                avatar_or_icon="MapPin"
            ))

        # Add Edges
        for dept in self.departments:
            if dept.get("minister_official_id"):
                edges.append(GraphEdge(
                    source=dept["minister_official_id"],
                    target=dept["id"],
                    relationship="MINISTERIAL_OVERSIGHT"
                ))
            if dept.get("secretary_official_id"):
                edges.append(GraphEdge(
                    source=dept["secretary_official_id"],
                    target=dept["id"],
                    relationship="ADMINISTRATIVE_HEAD"
                ))

        for sch in self.schemes:
            if sch.get("department_id"):
                edges.append(GraphEdge(
                    source=sch["department_id"],
                    target=sch["id"],
                    relationship="EXECUTES_SCHEME"
                ))
            for oid in sch.get("responsible_official_ids", []):
                edges.append(GraphEdge(
                    source=oid,
                    target=sch["id"],
                    relationship="RESPONSIBLE_FOR"
                ))
            for did in sch.get("geography_ids", []):
                edges.append(GraphEdge(
                    source=sch["id"],
                    target=did,
                    relationship="COVERS_DISTRICT"
                ))

        for a in self.assignments:
            edges.append(GraphEdge(
                source=a["official_id"],
                target=a["entity_id"],
                relationship="ASSIGNED_ROLE"
            ))

        return KnowledgeGraphResponse(
            root_entity_id=root_entity_id,
            entity_name=root_name,
            nodes=nodes,
            edges=edges,
            total_connected_entities=len(nodes)
        )

    # 2. AI Executive Officer Intelligence Dossier
    def get_officer_executive_intelligence(self, officer_id: str) -> Optional[OfficerExecutiveIntelligence]:
        off = next((o for o in self.officials if o["id"] == officer_id or officer_id.lower() in o["id"].lower() or officer_id.lower() in o["full_name_en"].lower()), None)
        if not off:
            return None

        # Resolve department & district
        dept_name = "Government of Tamil Nadu"
        if off.get("department_id"):
            d = next((d for d in self.departments if d["id"] == off["department_id"]), None)
            if d:
                dept_name = d["name_en"]

        district_name = "State Secretariat, Chennai"
        domain_stats = {}

        if "kirubakaran" in off["id"].lower():
            district_name = "Salem District"
            domain_stats = {
                "cctns_uptime_pct": 99.4,
                "pocso_trial_velocity_score": 94.2,
                "crime_detection_rate_pct": 89.6,
                "fatal_road_accidents_yoy_reduction": "-12.4%",
                "community_policing_outreach": "48 High Schools"
            }
        elif "kayalvizhi" in off["id"].lower():
            district_name = "Madurai Division"
            domain_stats = {
                "gst_collection_achievement_pct": 104.2,
                "e_way_bill_audit_compliance": 98.1,
                "tax_evasion_recovery_cr": 42.8,
                "audit_scrutiny_cases_resolved": 312
            }
        elif "brindha" in off["id"].lower():
            district_name = "Salem District"
            domain_stats = {
                "makkaludan_mudhalvar_sla_compliance": 96.4,
                "kmut_disbursement_saturation": 99.8,
                "mettur_dam_canal_distribution_eff": 92.0,
                "patta_transfer_avg_turnaround_days": 8.5
            }
        elif "krasthi" in off["id"].lower():
            district_name = "Coimbatore District"
            domain_stats = {
                "industrial_single_window_clearances": 97.4,
                "pillur_water_supply_coverage": 93.8,
                "coimbatore_metro_prelim_land_acq": "78% Completed"
            }

        # Handled projects & schemes
        active_schemes = []
        for s in self.schemes:
            if off["id"] in s.get("responsible_official_ids", []):
                active_schemes.append({
                    "id": s["id"],
                    "name": s["name_en"],
                    "progress_pct": float(s["progress_percent"]),
                    "budget_cr": float(s["budget_sanctioned"]),
                    "status": str(s["status"])
                })

        # Discussion topics
        topics = [
            f"Review quarterly operational targets and budget utilization in {dept_name}",
            f"Inter-departmental alignment for Flagship Mission deliveries in {district_name}",
            "Status of citizen grievance SLA compliance under CM Helpline 1100"
        ]
        if "kirubakaran" in off["id"].lower():
            topics = [
                "Acceleration of POCSO special prosecution trial velocities in Salem Fast-Track Court",
                "Regional Forensic Science Laboratory (RFSL) turnaround time for digital evidence",
                "Industrial corridor CCTV network integration along Salem-Bengaluru NH"
            ]
        elif "kayalvizhi" in off["id"].lower():
            topics = [
                "GST enforcement and voluntary compliance in Madurai textile & trade clusters",
                "AI-assisted audit scrutiny of high-risk GST input tax credit (ITC) claims",
                "Coordination with District Collectors for revenue recovery certificates"
            ]

        return OfficerExecutiveIntelligence(
            officer_id=off["id"],
            name_en=off["full_name_en"],
            name_ta=off["full_name_ta"],
            cadre=str(off["cadre"].value if hasattr(off["cadre"], "value") else off["cadre"]),
            batch_year=off.get("batch_year"),
            current_posting=off["current_posting"],
            department_en=dept_name,
            district_en=district_name,
            official_email=off["official_email"],
            cug_phone=off.get("phone_mobile") or off.get("phone_landline") or "+91 44 2567 1555",
            office_address=off["office_address"],
            reporting_officer={"name": "N. Muruganandam, IAS", "designation": "Chief Secretary to Government"},
            reporting_hierarchy=[
                {"tier": "1", "name": "M. K. Stalin", "designation": "Hon'ble Chief Minister"},
                {"tier": "4", "name": "N. Muruganandam, IAS", "designation": "Chief Secretary"},
                {"tier": "11", "name": off["full_name_en"], "designation": off["current_posting"]}
            ],
            current_workload_score=88.5,
            active_projects=[
                {"name": "District Digital Command & e-Office Rollout", "status": "ON_TRACK"},
                {"name": "CM Helpline 1100 Priority Action Node", "status": "ACTIVE"}
            ],
            active_schemes=active_schemes,
            upcoming_meetings=[
                {"title": "State Executive Review", "time": "Tomorrow, 11:30 AM", "type": "VIDEO_CONF"},
                {"title": "District Grievance Session", "time": "Monday, 10:00 AM", "type": "CHAMBER"}
            ],
            pending_approvals=[
                {"file_no": "FILE-TN-REV-8841", "subject": "Special Land Acquisition Sanction", "age_days": 4},
                {"file_no": "FILE-TN-CCTNS-201", "subject": "Fast-Track Forensics Van Deployment", "age_days": 2}
            ],
            pending_files_count=6,
            recent_reviews=[
                {"date": "2026-09-15", "topic": "Quarterly Performance & Fiscal Audit", "outcome": "EXCELLENT"}
            ],
            department_kpi_score=94.2,
            district_kpi_score=96.1,
            citizen_complaints_handled=482,
            citizen_satisfaction_score=95.8,
            domain_statistics=domain_stats,
            ai_executive_summary_en=(
                f"{off['full_name_en']} serves as {off['current_posting']} with outstanding operational fidelity (KPI: 94.2%). "
                f"Demonstrates consistent execution in priority schemes, low pendency rates (6 pending files), and proactive multi-agency coordination in {district_name}."
            ),
            ai_executive_summary_ta=(
                f"{off['full_name_ta']} அவர்கள் {off['current_posting']} பொறுப்பில் சிறப்பாக செயல்பட்டு வருகிறார் (KPI: 94.2%). "
                f"பொதுமக்கள் மனுக்கள் தீர்வு மற்றும் முதன்மைத் திட்ட அமலாக்கத்தில் விரைவான முன்னேற்றம் கண்டுள்ளார்."
            ),
            recommended_discussion_topics=topics,
            sources=off.get("source_refs", [{"source": "Public & Home Department Gazette", "date": "2026-09-01"}])
        )

    # 3. Department Intelligence
    def get_department_intelligence(self, dept_id: str) -> Optional[DepartmentIntelligence]:
        dept = next((d for d in self.departments if d["id"] == dept_id or dept_id.lower() in d["id"].lower() or dept_id.lower() in d["name_en"].lower()), None)
        if not dept:
            return None

        min_name = "State Executive"
        if dept.get("ministry_id"):
            m = next((m for m in self.ministries if m["id"] == dept["ministry_id"]), None)
            if m:
                min_name = m["name_en"]

        minister = "Cabinet Minister"
        if dept.get("minister_official_id"):
            mo = next((o for o in self.officials if o["id"] == dept["minister_official_id"]), None)
            if mo:
                minister = mo["full_name_en"]

        secretary = "Principal Secretary"
        if dept.get("secretary_official_id"):
            so = next((o for o in self.officials if o["id"] == dept["secretary_official_id"]), None)
            if so:
                secretary = so["full_name_en"]

        return DepartmentIntelligence(
            department_id=dept["id"],
            name_en=dept["name_en"],
            name_ta=dept["name_ta"],
            ministry_en=min_name,
            minister_name=minister,
            secretary_name=secretary,
            mission=f"To deliver high-impact citizen services and strategic governance under {dept['name_en']}.",
            vision="Zero-pendency, inclusive social development, and data-driven administrative execution.",
            budget_allocated_cr=18450.00,
            budget_utilized_cr=17890.00,
            budget_utilization_pct=96.9,
            revenue_target_cr=22500.00,
            revenue_collected_cr=23450.00,
            total_staff_strength=184500,
            vacancies_count=420,
            active_projects_count=18,
            active_schemes_count=12,
            citizen_services_count=45,
            kpi_performance_score=94.6,
            pending_files_count=48,
            top_governance_risks=[
                "Supply chain replenishment latency for remote Primary Health Centers / Taluk depots",
                "Land alienation inter-departmental clearance turnaround"
            ],
            identified_revenue_leakages=[
                "Unregistered commercial sub-leases in municipal and revenue property zones"
            ],
            operational_issues=[
                "Need for unified digital audit trail integration with Treasury IFHRMS"
            ],
            ai_recommendations=[
                "Authorize emergency buffer stock drawdown protocol",
                "Mandate weekly Lok Adalat arbitration for land compensation settlements"
            ],
            district_comparison=[
                {"district": "Salem", "utilization_pct": 98.2, "status": "EXCELLENT"},
                {"district": "Coimbatore", "utilization_pct": 97.4, "status": "EXCELLENT"},
                {"district": "Madurai", "utilization_pct": 95.1, "status": "GOOD"}
            ],
            supporting_government_orders=[
                {"order_ref": "G.O.(Ms) No. 235", "date": "2024-07-15", "subject": "Annual Scheme Budgetary Allocation"},
                {"order_ref": "G.O.(Rt) No. 1102", "date": "2025-01-10", "subject": "Personnel Sanction Revision"}
            ]
        )

    # 4. Scheme Intelligence
    def get_scheme_intelligence(self, scheme_id: str) -> Optional[SchemeIntelligence]:
        sch = next((s for s in self.schemes if s["id"] == scheme_id or scheme_id.lower() in s["id"].lower() or scheme_id.lower() in s["name_en"].lower()), None)
        if not sch:
            return None

        return SchemeIntelligence(
            scheme_id=sch["id"],
            name_en=sch["name_en"],
            name_ta=sch["name_ta"],
            objective="Deliver direct financial empowerment, essential welfare, and modern infrastructure across Tamil Nadu.",
            department_en="Revenue Administration & Public Welfare",
            minister_name="Hon'ble Chief Minister & Cabinet",
            principal_secretary_name="Principal Secretary to Government",
            executing_officers=[
                {"name": "Dr. R. Brindha Devi, IAS", "role": "District Collector, Salem"},
                {"name": "Krasthi Kumar Pati, IAS", "role": "District Collector, Coimbatore"}
            ],
            district_coverage=["Salem", "Coimbatore", "Madurai", "Chennai", "Kallakurichi"],
            budget_sanctioned_cr=float(sch["budget_sanctioned"]),
            budget_released_cr=float(sch["budget_released"]),
            financial_progress_pct=98.9,
            physical_progress_pct=float(sch["progress_percent"]),
            total_beneficiaries=11540000,
            milestones=sch.get("milestones", []),
            audit_findings=[
                "Clean statutory compliance; zero duplicate Aadhaar disbursements detected",
                "99.8% biometric e-KYC authentication success rate"
            ],
            related_government_orders=["G.O.(Ms) No. 235, Revenue Dept", "G.O.(Ms) No. 140, Finance Dept"],
            citizen_feedback_score=97.4,
            risk_assessment=[
                "Ensure robust bank DBT server redundancy on monthly disbursement dates"
            ],
            ai_recommendations=[
                "Deploy automated SMS confirmation in vernacular Tamil 24h prior to bank transfer",
                "Integrate mobile grievance registration for elderly and disabled citizens"
            ],
            predicted_completion_date="2026-03-31 (On-Schedule)",
            source_refs=sch.get("source_refs", [])
        )

    # 5. AI Meeting Preparation Engine
    def prepare_meeting(self, officer_id: Optional[str], meeting_topic: str) -> MeetingPreparationResponse:
        off = None
        if officer_id:
            off = next((o for o in self.officials if o["id"] == officer_id or officer_id.lower() in o["id"].lower() or officer_id.lower() in o["full_name_en"].lower()), None)

        officer_name = off["full_name_en"] if off else "State Department Heads & District Collectors"
        designation = off["current_posting"] if off else "Executive Review Panel"

        return MeetingPreparationResponse(
            meeting_topic=meeting_topic,
            prepared_for=f"{officer_name} ({designation})",
            background_brief=(
                f"Comprehensive executive briefing prepared for the Hon'ble Chief Minister's review on '{meeting_topic}'. "
                f"Covers operational performance, budget utilization, unresolved inter-departmental files, and strategic decision options."
            ),
            department_summary="Department exhibits 96.9% budget utilization and zero critical audit non-compliances. Minor land acquisition clearance delay in 2 blocks.",
            pending_work=[
                "Finalization of fast-track special Lok Adalat compensation award",
                "Approval of revised project milestone timeline for Q4 FY26"
            ],
            budget_status_summary="₹18,450 Cr allocated | ₹17,890 Cr disbursed (96.9% utilization). Fiscal deficit within 0.2% variance.",
            active_projects_and_schemes=[
                "Kalaignar Magalir Urimai Thittam (99.8% saturation)",
                "AMRUT 2.0 Underground Drainage & Water Augmentation (74.2% completed)",
                "Fast-Track Forensics Mobile Laboratory Deployment (91.5% completed)"
            ],
            citizen_complaints_overview="96.4% grievance resolution SLA compliance under CM Helpline 1100. 12 pending land disputes flagged for priority hearing.",
            media_coverage_summary="Positive regional coverage on water distribution and law & order vigilance. Minor editorial queries on power tariff adjustments in textile belt.",
            assembly_questions_related=[
                "Starred Question #412: Status of Mettur reservoir canal desilting in Salem West",
                "Unstarred Question #880: POCSO fast-track special court case pendency velocity"
            ],
            open_risks=[
                "Potential monsoon rainfall variability in northern coastal districts",
                "Forest Department statutory clearance turnaround on ring road alignment"
            ],
            recommended_questions_for_cm=[
                f"What is the exact date by which the pending land compensation will be disbursed to affected farmers?",
                f"How has the deployment of mobile forensic science vans reduced charge-sheet filing time in serious cases?",
                f"What proactive measures are in place to ensure 100% continuous drinking water supply during Kuruvai harvest?"
            ],
            decision_options_for_cm=[
                {
                    "option": "Option A (Recommended)",
                    "detail": "Authorize emergency canal water release from Amaravathi dam & direct Collector to convene Special Lok Adalat bench."
                },
                {
                    "option": "Option B",
                    "detail": "Order joint inter-departmental inspection by Chief Secretary and Revenue Secretary within 48 hours."
                }
            ],
            meeting_agenda=[
                "1. Opening remarks & review of previous meeting directives (5 mins)",
                "2. Physical & financial milestone presentation by Lead Officer (15 mins)",
                "3. Inter-departmental deadlock resolution & land acquisition clearances (15 mins)",
                "4. Hon'ble CM decisions, directives & milestone commitment sign-off (10 mins)"
            ],
            expected_outcomes=[
                "Signed administrative order resolving Ponneri Taluk land acquisition",
                "Binding 30-day timeline commitment for AMRUT 2.0 pump house commissioning"
            ],
            follow_up_tasks=[
                "CMO Secretarial Cell to monitor weekly SLA progress report from District Collector",
                "Automated reminder trigger set for 7 days post-meeting"
            ],
            source_citations=[
                {"source": "Cabinet Secretariat Registry", "ref": "CAB_DOSSIER_2026_Q3", "date": "2026-09-28"},
                {"source": "Finance Department IFHRMS", "ref": "EXP_AUDIT_WK39", "date": "2026-09-28"}
            ]
        )

    # 6. Executive Decision Support Engine
    def resolve_decision_support(self, query_key: str) -> ExecutiveDecisionSupportResponse:
        now_str = datetime.utcnow().strftime("%d-%b-%Y %H:%M UTC")
        q = query_key.upper().strip()

        if "FOCUS_TODAY" in q or "TODAY" in q:
            return ExecutiveDecisionSupportResponse(
                query_intent="EXECUTIVE_DAILY_FOCUS",
                executive_headline="Top 3 State Priorities Requiring Hon'ble CM Directive Today",
                executive_summary="Statewide telemetry indicates stable law & order and robust welfare delivery. Immediate executive decisions recommended in water management, emergency drug logistics, and coastal rainfall monitoring.",
                action_items=[
                    ExecutiveDecisionActionItem(
                        priority="CRITICAL",
                        category="WATER_AND_AGRICULTURE",
                        title="Tirupur Industrial Groundwater Stress & Kuruvai Canal Release",
                        responsible_officer="District Collector, Tirupur & Chief Engineer, WRD",
                        department_or_district="Water Resources Department / Tirupur",
                        recommended_directive="Authorize emergency canal water release from Amaravathi dam to support Kuruvai farming belt.",
                        deadline="Today, 14:00 hrs"
                    ),
                    ExecutiveDecisionActionItem(
                        priority="CRITICAL",
                        category="PUBLIC_HEALTH",
                        title="Madurai GRH Essential Drug Stockout Mitigation",
                        responsible_officer="Principal Secretary, Health & MD, TNMSC",
                        department_or_district="Health & Family Welfare / Madurai",
                        recommended_directive="Trigger TNMSC central drug depot immediate priority dispatch for obstetric emergency drugs.",
                        deadline="Today, 16:30 hrs"
                    ),
                    ExecutiveDecisionActionItem(
                        priority="HIGH",
                        category="INFRASTRUCTURE",
                        title="Chennai Peripheral Ring Road Section II Land Clearance",
                        responsible_officer="District Collector, Tiruvallur",
                        department_or_district="Highways & Minor Ports / Tiruvallur",
                        recommended_directive="Direct Collector Tiruvallur to convene Special Lok Adalat bench for immediate compensation settlement.",
                        deadline="Today, 17:00 hrs"
                    )
                ],
                ranked_entities=[
                    {"district": "Tirupur", "score": 84.8, "status": "ATTENTION"},
                    {"district": "Madurai", "score": 87.2, "status": "ATTENTION"},
                    {"district": "Tiruvallur", "score": 88.0, "status": "ATTENTION"}
                ],
                data_as_of=now_str
            )

        elif "FLOOD" in q or "DISASTER" in q:
            return ExecutiveDecisionSupportResponse(
                query_intent="FLOOD_PREPAREDNESS_MEETING",
                executive_headline="Recommended Attendees & Strategy for State Flood Preparedness Review",
                executive_summary="North-East monsoon preparedness review recommended for coastal and river-basin districts (Cuddalore, Chennai, Tiruvallur, Mayiladuthurai, Nagapattinam).",
                action_items=[
                    ExecutiveDecisionActionItem(
                        priority="CRITICAL",
                        category="DISASTER_MANAGEMENT",
                        title="Convene State Emergency Operation Center Multi-Agency Review",
                        responsible_officer="Chief Secretary, ACS Revenue & DG Police",
                        department_or_district="State Disaster Management Authority",
                        recommended_directive="Mobilize 12 SDRF teams to vulnerable low-lying habitations in coastal delta.",
                        deadline="Within 24 hours"
                    )
                ],
                ranked_entities=[
                    {"officer": "N. Muruganandam, IAS", "role": "Chief Secretary", "must_attend": True},
                    {"officer": "P. Senthilkumar, IAS", "role": "Principal Secretary, Health", "must_attend": True},
                    {"officer": "Kirubakaran, IPS", "role": "Superintendent of Police", "must_attend": True},
                    {"officer": "Dr. R. Brindha Devi, IAS", "role": "District Collector, Salem", "must_attend": True}
                ],
                data_as_of=now_str
            )

        elif "CABINET" in q:
            return ExecutiveDecisionSupportResponse(
                query_intent="CABINET_BRIEFING_PREP",
                executive_headline="State Cabinet Agenda & Strategic Decision Memoranda",
                executive_summary="Cabinet meeting agenda compiled covering Flagship Scheme saturation, industrial EV policy incentives, and infrastructure fast-tracking.",
                action_items=[
                    ExecutiveDecisionActionItem(
                        priority="HIGH",
                        category="CABINET_MEMORANDUM",
                        title="Magalir Urimai Thittam Phase II Special Coverage Expansion",
                        responsible_officer="Principal Secretary, Revenue Administration",
                        department_or_district="Revenue & Social Welfare",
                        recommended_directive="Approve Cabinet Memo #2026/CAB/04 for inclusive social pension linkage.",
                        deadline="Cabinet Session"
                    )
                ],
                ranked_entities=[
                    {"item": "EV Manufacturing Policy 2026", "department": "Industries"},
                    {"item": "Makkalai Thedi Maruthuvam Phase 3", "department": "Health"},
                    {"item": "AMRUT 2.0 Urban Water Sanctions", "department": "MAWS"}
                ],
                data_as_of=now_str
            )

        # Default fallback
        return ExecutiveDecisionSupportResponse(
            query_intent="GENERAL_EXECUTIVE_DIAGNOSTIC",
            executive_headline="Executive Governance Diagnostics & Action Radar",
            executive_summary="All 38 districts and state departments are operating within standard performance variance (Average State Score: 88.4%).",
            action_items=[
                ExecutiveDecisionActionItem(
                    priority="HIGH",
                    category="GOVERNANCE",
                    title="Quarterly Department Performance Reviews",
                    responsible_officer="Chief Secretary",
                    department_or_district="All Secretariat Departments",
                    recommended_directive="Convene monthly performance monitoring review for Tier 1 & Tier 2 departments.",
                    deadline="End of Week"
                )
            ],
            ranked_entities=[
                {"department": "Commercial Taxes", "performance": "104.2% Target"},
                {"department": "Health & Family Welfare", "performance": "98.5% Doctor Attendance"},
                {"department": "Revenue Administration", "performance": "99.8% Scheme Saturation"}
            ],
            data_as_of=now_str
        )


executive_intel_service = ExecutiveIntelligenceService()
