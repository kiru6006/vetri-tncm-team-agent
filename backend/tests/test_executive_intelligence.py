"""
Unit & Integration Tests for Phase 4 Executive Intelligence Platform.
Tests Knowledge Graph, Officer Intelligence Dossier, Department & Scheme Diagnostics,
Meeting Prep Engine, and Decision Support.
"""

import pytest
from app.services.executive_intelligence_service import executive_intel_service


def test_knowledge_graph():
    graph = executive_intel_service.get_knowledge_graph("off-cm-stalin")
    assert graph is not None
    assert graph.total_connected_entities >= 10
    assert len(graph.nodes) >= 10
    assert len(graph.edges) >= 5
    node_types = {n.type for n in graph.nodes}
    assert "OFFICIAL" in node_types
    assert "DEPARTMENT" in node_types
    assert "SCHEME" in node_types
    assert "DISTRICT" in node_types


def test_officer_executive_intelligence():
    intel = executive_intel_service.get_officer_executive_intelligence("off-sp-slm-kirubakaran")
    assert intel is not None
    assert "Kirubakaran" in intel.name_en
    assert intel.cadre == "IPS"
    assert intel.department_kpi_score > 90.0
    assert intel.domain_statistics.get("pocso_trial_velocity_score") is not None
    assert len(intel.recommended_discussion_topics) >= 2


def test_department_intelligence():
    dept_intel = executive_intel_service.get_department_intelligence("dept-health-01")
    assert dept_intel is not None
    assert "Health" in dept_intel.name_en
    assert dept_intel.budget_utilization_pct > 90.0
    assert len(dept_intel.top_governance_risks) >= 1
    assert len(dept_intel.ai_recommendations) >= 1


def test_scheme_intelligence():
    sch_intel = executive_intel_service.get_scheme_intelligence("sch-kmut-01")
    assert sch_intel is not None
    assert "Magalir Urimai" in sch_intel.name_en
    assert sch_intel.total_beneficiaries > 10000000
    assert len(sch_intel.audit_findings) >= 1
    assert sch_intel.predicted_completion_date is not None


def test_ai_meeting_preparation():
    prep = executive_intel_service.prepare_meeting("off-sp-slm-kirubakaran", "Salem Water & Law Review")
    assert prep is not None
    assert "Kirubakaran" in prep.prepared_for
    assert len(prep.recommended_questions_for_cm) >= 2
    assert len(prep.decision_options_for_cm) >= 1
    assert len(prep.meeting_agenda) >= 3


def test_decision_support_focus_today():
    resp = executive_intel_service.resolve_decision_support("FOCUS_TODAY")
    assert resp.query_intent == "EXECUTIVE_DAILY_FOCUS"
    assert len(resp.action_items) >= 2
    assert resp.action_items[0].priority == "CRITICAL"


def test_decision_support_flood_preparedness():
    resp = executive_intel_service.resolve_decision_support("FLOOD_PREPAREDNESS")
    assert resp.query_intent == "FLOOD_PREPAREDNESS_MEETING"
    assert len(resp.ranked_entities) >= 2


def test_decision_support_cabinet_briefing():
    resp = executive_intel_service.resolve_decision_support("CABINET_BRIEFING")
    assert resp.query_intent == "CABINET_BRIEFING_PREP"
    assert len(resp.action_items) >= 1
