"""
Unit Tests for Data Ingestion Pipeline and Official Adapters.
"""

import pytest
from app.ingestion.adapters.tn_gov_portal import TNGovPortalAdapter
from app.ingestion.adapters.ag_ias_list import AGIASListAdapter
from app.ingestion.adapters.disaster_mgmt import DisasterMgmtAdapter
from app.ingestion.pipeline import ingestion_pipeline


def test_tn_gov_portal_adapter():
    adapter = TNGovPortalAdapter()
    result = adapter.run_sync()
    assert result["status"] == "SUCCESS"
    assert result["records_processed"] >= 3
    assert result["records_added"] >= 3
    assert "audit_hash" in result
    assert result["audit_hash"].startswith("tn-ingest-")


def test_ag_ias_list_adapter():
    adapter = AGIASListAdapter()
    result = adapter.run_sync()
    assert result["status"] == "SUCCESS"
    assert result["records_processed"] >= 4
    assert "audit_hash" in result


def test_disaster_mgmt_adapter():
    adapter = DisasterMgmtAdapter()
    result = adapter.run_sync()
    assert result["status"] == "SUCCESS"
    assert result["records_processed"] >= 2


def test_master_ingestion_pipeline():
    summary = ingestion_pipeline.run_all()
    assert summary["pipeline_status"] == "COMPLETED"
    assert summary["adapters_run"] == 3
    assert summary["total_records_processed"] >= 9
    assert len(summary["adapter_results"]) == 3
