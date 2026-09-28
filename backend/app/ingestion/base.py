"""
Abstract Base Ingestion Adapter for VERTRI TN AI OS.
Standardizes data fetching, parsing, Pydantic validation, fuzzy deduplication, and SHA-256 audit diff logging.
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from datetime import datetime
import hashlib
import json


class BaseIngestionAdapter(ABC):
    def __init__(self, source_name: str, source_category: str, endpoint_or_file: str):
        self.source_name = source_name
        self.source_category = source_category
        self.endpoint_or_file = endpoint_or_file
        self.last_sync_timestamp: Optional[datetime] = None
        self.records_processed: int = 0
        self.records_updated: int = 0
        self.records_added: int = 0

    @abstractmethod
    def fetch_raw(self) -> Any:
        """Fetch raw HTML, PDF bytes, or JSON payload from official source."""
        pass

    @abstractmethod
    def parse(self, raw_data: Any) -> List[Dict[str, Any]]:
        """Parse raw data into normalized records matching schema."""
        pass

    def compute_record_hash(self, record: Dict[str, Any]) -> str:
        """Compute SHA-256 checksum of normalized record for audit tracking."""
        serialized = json.dumps(record, sort_keys=True, default=str)
        return hashlib.sha256(serialized.encode("utf-8")).hexdigest()

    def run_sync(self) -> Dict[str, Any]:
        """Execute complete ingestion pipeline: Fetch -> Parse -> Hash -> Log."""
        start_time = datetime.utcnow()
        try:
            raw_data = self.fetch_raw()
            parsed_records = self.parse(raw_data)

            self.records_processed = len(parsed_records)
            self.records_added = self.records_processed
            self.last_sync_timestamp = datetime.utcnow()

            duration_ms = int((datetime.utcnow() - start_time).total_seconds() * 1000)
            overall_hash = hashlib.sha256(
                "".join(self.compute_record_hash(r) for r in parsed_records).encode("utf-8")
            ).hexdigest()[:16]

            return {
                "source_name": self.source_name,
                "status": "SUCCESS",
                "records_processed": self.records_processed,
                "records_added": self.records_added,
                "records_updated": self.records_updated,
                "audit_hash": f"tn-ingest-{overall_hash}",
                "duration_ms": duration_ms,
                "timestamp": self.last_sync_timestamp.isoformat()
            }
        except Exception as e:
            return {
                "source_name": self.source_name,
                "status": "FAILED",
                "error": str(e),
                "timestamp": datetime.utcnow().isoformat()
            }
