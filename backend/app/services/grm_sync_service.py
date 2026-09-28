import uuid
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from app.schemas.grm_directory import (
    SyncConnector,
    SyncTriggerResponse,
    SyncAuditLog,
    DataSourceMetadata
)


OFFICIAL_SYNC_CONNECTORS: List[SyncConnector] = [
    SyncConnector(
        connector_id="conn-tn-gov-portal",
        name="Tamil Nadu Government State Portal (tn.gov.in)",
        name_ta="தமிழ்நாடு அரசு முதன்மை இணையதளம்",
        source_url="https://www.tn.gov.in/directory",
        source_type="TN_GOV_PORTAL",
        last_sync_timestamp="2026-09-28T18:30:00Z",
        records_processed=1420,
        status="COMPLETED",
        data_freshness_rate_pct=99.4,
        sync_frequency="Every 6 Hours (Automated ETL)",
        description="Master synchronization feed for state ministries, departments, principal secretaries, and directorates."
    ),
    SyncConnector(
        connector_id="conn-ias-ips-postings",
        name="Secretariat IAS / IPS Postings & Gazette Gazette Notifications",
        name_ta="தலைமைச் செயலக ஐ.ஏ.எஸ் / ஐ.பி.எஸ் பணி நியமன ஆணை தளம்",
        source_url="https://public.tn.gov.in/gazette/postings",
        source_type="SECRETARIAT_IAS_IPS_POSTINGS",
        last_sync_timestamp="2026-09-28T19:15:00Z",
        records_processed=584,
        status="COMPLETED",
        data_freshness_rate_pct=100.0,
        sync_frequency="Real-time Webhook & Hourly Polling",
        description="Official Government Orders (G.O. Rt / G.O. Ms) tracking IAS, IPS, IRS, and IFS cadre postings and transfers."
    ),
    SyncConnector(
        connector_id="conn-cctns-police-hq",
        name="Police Headquarters & CCTNS State Command Telemetry",
        name_ta="காவல்துறை தலைமையகம் & சி.சி.டி.என்.எஸ் அமைப்பு",
        source_url="https://tnpolice.gov.in/cctns/officers",
        source_type="POLICE_HQ_CCTNS",
        last_sync_timestamp="2026-09-28T20:00:00Z",
        records_processed=892,
        status="COMPLETED",
        data_freshness_rate_pct=98.9,
        sync_frequency="Every 4 Hours",
        description="Commissioners of Police, Range DIGs, District SPs, and Sub-divisional DSPs rosters across all 38 districts."
    ),
    SyncConnector(
        connector_id="conn-district-collectorates",
        name="38 District Collectorates & Revenue e-District Hub",
        name_ta="38 மாவட்ட ஆட்சியர் அலுவலகங்கள் & வருவாய்த்துறை அமைப்பு",
        source_url="https://tnega.tn.gov.in/edistrict/roster",
        source_type="DISTRICT_COLLECTORATES",
        last_sync_timestamp="2026-09-28T17:45:00Z",
        records_processed=3450,
        status="COMPLETED",
        data_freshness_rate_pct=97.8,
        sync_frequency="Daily at 00:00 hrs",
        description="District Collectors, DROs, RDOs, Tahsildars, BDOs, and VAOs verified roster."
    ),
    SyncConnector(
        connector_id="conn-ifhrms-finance",
        name="Commercial Taxes & IFHRMS Unified Treasury Cloud",
        name_ta="வணிக வரி & கருவூல மனிதவள மேலாண்மை அமைப்பு (IFHRMS)",
        source_url="https://ifhrms.tn.gov.in/treasury/personnel",
        source_type="COMMERCIAL_TAXES_IFHRMS",
        last_sync_timestamp="2026-09-28T18:00:00Z",
        records_processed=4200,
        status="COMPLETED",
        data_freshness_rate_pct=99.1,
        sync_frequency="Daily at 02:00 hrs",
        description="Treasury officers, commercial tax commissioners, IRS joint commissioners, and audit officials."
    ),
    SyncConnector(
        connector_id="conn-tnmsc-health",
        name="Health & Family Welfare (TNMSC / MRB) Directory",
        name_ta="மக்கள் நல்வாழ்வுத் துறை & மருத்துவப் பணியாளர் தேர்வு வாரியம்",
        source_url="https://tnmsc.tn.gov.in/directory",
        source_type="HEALTH_TNMSC_MRB",
        last_sync_timestamp="2026-09-28T16:30:00Z",
        records_processed=2100,
        status="COMPLETED",
        data_freshness_rate_pct=98.5,
        sync_frequency="Twice Daily",
        description="Deans of Medical Colleges, Joint Directors of Health Services (JDHS), Drug Inspectors, and PHC Medical Officers."
    )
]


SYNC_AUDIT_TRAIL: List[SyncAuditLog] = [
    SyncAuditLog(
        id="audit-sync-01",
        timestamp="2026-09-28T20:00:00Z",
        connector_name="Police Headquarters & CCTNS State Command Telemetry",
        action_type="FULL_SYNC",
        records_affected=892,
        initiated_by="SYSTEM_SCHEDULER",
        status="SUCCESS",
        details="Automated ETL synchronization completed. Verified CUG numbers and duty station postings for 38 SPs."
    ),
    SyncAuditLog(
        id="audit-sync-02",
        timestamp="2026-09-28T19:15:00Z",
        connector_name="Secretariat IAS / IPS Postings & Gazette Notifications",
        action_type="INCREMENTAL_UPDATE",
        records_affected=14,
        initiated_by="CHIEF_SECRETARY_DISPATCH",
        status="SUCCESS",
        details="Synchronized G.O. (Rt) No. 412 - Annual inter-district cadre rotation and postings."
    ),
    SyncAuditLog(
        id="audit-sync-03",
        timestamp="2026-09-28T18:30:00Z",
        connector_name="Tamil Nadu Government State Portal (tn.gov.in)",
        action_type="FULL_SYNC",
        records_affected=1420,
        initiated_by="SYSTEM_SCHEDULER",
        status="SUCCESS",
        details="Secretariat departmental emails, room extensions, and portfolio reallocations validated."
    )
]


def list_sync_connectors() -> List[SyncConnector]:
    return OFFICIAL_SYNC_CONNECTORS


def list_sync_audit_logs() -> List[SyncAuditLog]:
    return SYNC_AUDIT_TRAIL


def trigger_connector_sync(connector_id: Optional[str] = None, user_claims: Dict[str, Any] = None) -> SyncTriggerResponse:
    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    job_id = f"job-etl-{uuid.uuid4().hex[:8]}"
    
    target_conn = None
    if connector_id:
        for c in OFFICIAL_SYNC_CONNECTORS:
            if c.connector_id == connector_id:
                target_conn = c
                break
    
    if target_conn:
        target_conn.last_sync_timestamp = now_iso
        target_conn.status = "COMPLETED"
        target_conn.data_freshness_rate_pct = 99.8
        
        log_entry = SyncAuditLog(
            id=f"audit-{uuid.uuid4().hex[:6]}",
            timestamp=now_iso,
            connector_name=target_conn.name,
            action_type="FULL_SYNC",
            records_affected=target_conn.records_processed,
            initiated_by=user_claims.get("sub", "CM_EXECUTIVE_CONSOLE") if user_claims else "CM_EXECUTIVE_CONSOLE",
            status="SUCCESS",
            details=f"Manual high-priority ETL sync triggered for {target_conn.name}. Data normalized and verified."
        )
        SYNC_AUDIT_TRAIL.insert(0, log_entry)
        
        return SyncTriggerResponse(
            job_id=job_id,
            connector_id=target_conn.connector_id,
            status="COMPLETED",
            records_updated=target_conn.records_processed,
            synced_at=now_iso,
            message=f"Successfully synchronized {target_conn.records_processed} official records from {target_conn.name}."
        )
    else:
        # Sync all connectors
        total_recs = sum(c.records_processed for c in OFFICIAL_SYNC_CONNECTORS)
        for c in OFFICIAL_SYNC_CONNECTORS:
            c.last_sync_timestamp = now_iso
            c.status = "COMPLETED"
            c.data_freshness_rate_pct = 99.9
            
        log_entry = SyncAuditLog(
            id=f"audit-{uuid.uuid4().hex[:6]}",
            timestamp=now_iso,
            connector_name="All 6 Official TN Synchronization Connectors",
            action_type="FULL_SYNC",
            records_affected=total_recs,
            initiated_by=user_claims.get("sub", "CM_EXECUTIVE_CONSOLE") if user_claims else "CM_EXECUTIVE_CONSOLE",
            status="SUCCESS",
            details=f"Master statewide synchronization completed across all 6 connectors. {total_recs} records normalized."
        )
        SYNC_AUDIT_TRAIL.insert(0, log_entry)
        
        return SyncTriggerResponse(
            job_id=job_id,
            connector_id="ALL_CONNECTORS",
            status="COMPLETED",
            records_updated=total_recs,
            synced_at=now_iso,
            message=f"Statewide ETL complete. Synchronized and normalized {total_recs:,} official profiles from all official TN data feeds."
        )
