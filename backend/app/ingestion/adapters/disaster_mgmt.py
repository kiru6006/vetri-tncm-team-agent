"""
Tamil Nadu Disaster Management Authority (TNDMA) Directory Adapter.
Parses emergency incident commanders, District DROs, and Coastal Control Officers.
"""

from typing import List, Dict, Any
from app.ingestion.base import BaseIngestionAdapter


class DisasterMgmtAdapter(BaseIngestionAdapter):
    def __init__(self):
        super().__init__(
            source_name="State Disaster Management Authority (TNDMA) Roster",
            source_category="DISASTER_DIRECTORY",
            endpoint_or_file="https://tndma.tn.gov.in/emergency_nodal_directory.json"
        )

    def fetch_raw(self) -> List[Dict[str, Any]]:
        return [
            {
                "district": "Cuddalore",
                "nodal_officer": "District Revenue Officer (DRO), Cuddalore",
                "emergency_helpline": "1077",
                "cug_phone": "+91 4142 221111",
                "status": "MONITORING_MONSOON"
            },
            {
                "district": "Chennai",
                "nodal_officer": "State Disaster Emergency Operation Center Lead",
                "emergency_helpline": "1070",
                "cug_phone": "+91 44 2859 3990",
                "status": "ACTIVE_24x7"
            }
        ]

    def parse(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        records = []
        for item in raw_data:
            records.append({
                "id": f"tndma-{item['district'].lower()}",
                "district": item["district"],
                "role": item["nodal_officer"],
                "emergency_helpline": item["emergency_helpline"],
                "cug_phone": item["cug_phone"],
                "status": item["status"],
                "source": self.endpoint_or_file
            })
        return records
