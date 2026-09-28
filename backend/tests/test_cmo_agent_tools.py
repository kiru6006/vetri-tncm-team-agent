"""
Unit and Integration Tests for CMO AI Agent 8 Tools and Orchestrator.
"""

import pytest
from app.agent.tools import (
    find_official,
    get_department_overview,
    get_scheme_progress,
    get_district_overview,
    search_contacts,
    get_personnel_changes,
    cross_query,
    export_contacts
)
from app.agent.orchestrator import cmo_orchestrator


def test_find_official_by_name():
    results = find_official("Kirubakaran")
    assert len(results) >= 1
    assert "Kirubakaran" in results[0]["full_name_en"]
    assert results[0]["cadre"] == "IPS"
    assert results[0]["official_email"] == "sp-slm@tncctns.gov.in"
    assert len(results[0]["source_refs"]) > 0


def test_find_official_by_cadre_filter():
    results = find_official("", filters={"cadre": "IAS"})
    assert len(results) >= 1
    for r in results:
        assert r["cadre"] == "IAS"


def test_get_department_overview():
    dept = get_department_overview("Health")
    assert dept is not None
    assert dept.get("status") != "NOT_FOUND"
    assert "Health" in dept["name_en"]
    assert dept["minister_name"] is not None


def test_get_scheme_progress():
    scheme = get_scheme_progress("Magalir Urimai")
    assert scheme is not None
    assert scheme.get("status") != "NOT_FOUND"
    assert scheme["progress_percent"] > 90.0
    assert len(scheme["milestones"]) > 0
    assert len(scheme["district_coverage"]) > 0


def test_get_district_overview():
    dist = get_district_overview("Salem")
    assert dist is not None
    assert dist.get("status") != "NOT_FOUND"
    assert dist["name_en"] == "Salem"
    assert len(dist["deployed_officers"]) >= 2
    assert len(dist["active_schemes"]) >= 1


def test_search_contacts_faceted():
    contacts = search_contacts({"cadre": "IPS"}, page=1, page_size=10)
    assert contacts["total_count"] >= 1
    assert len(contacts["results"]) >= 1
    for c in contacts["results"]:
        assert c["cadre"] == "IPS"


def test_get_personnel_changes():
    changes = get_personnel_changes("2024-01-01", "2026-09-28")
    assert len(changes) >= 1
    assert "order_ref" in changes[0]


def test_cross_query():
    cq = cross_query({"districts": ["Salem"], "schemes": ["AMRUT"]})
    assert len(cq["intersection_results"]) >= 1
    assert cq["intersection_results"][0]["district"] == "Salem"


def test_export_contacts_csv():
    exp = export_contacts("csv", {"cadre": "IAS"})
    assert exp["status"] == "GENERATED"
    assert exp["total_records"] >= 1
    assert "csv" in exp["download_url"]


def test_orchestrator_queries():
    # Test official query
    resp1 = cmo_orchestrator.execute_query("Who is Kayalvizhi IRS?")
    assert "Kayalvizhi" in resp1.response_text
    assert resp1.summary_card is not None
    assert len(resp1.citations) > 0

    # Test district query
    resp2 = cmo_orchestrator.execute_query("Show Coimbatore district overview")
    assert "Coimbatore" in resp2.response_text
    assert resp2.summary_card is not None

    # Test transfers query
    resp3 = cmo_orchestrator.execute_query("Recent transfers in civil services")
    assert "Timeline" in resp3.response_text or "Postings" in resp3.response_text
