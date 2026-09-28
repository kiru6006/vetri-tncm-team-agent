"""
CMO Agent Tools: Callable tools for Claude Sonnet & LangGraph Agent orchestration.
Adheres strictly to the 8 required tool signatures and guardrails.
"""

from typing import Dict, Any, List, Optional
from app.services.cmo_query_service import cmo_service


# 1. find_official
def find_official(query: str, filters: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    """
    Find officials matching a name, rank, cadre, department, or district.
    Returns structured official cards with full contact details and source citations.
    """
    cards = cmo_service.find_official(query, filters)
    return [c.model_dump() for c in cards]


# 2. get_department_overview
def get_department_overview(department_name_or_id: str) -> Dict[str, Any]:
    """
    Retrieve overview of a department including Minister, Secretary, active schemes,
    sub-agencies, and recent personnel changes.
    """
    overview = cmo_service.get_department_overview(department_name_or_id)
    if overview:
        return overview.model_dump()
    return {
        "status": "NOT_FOUND",
        "message": f"Department '{department_name_or_id}' not found in official records.",
        "source": "Secretariat Department Directory"
    }


# 3. get_scheme_progress
def get_scheme_progress(scheme_name_or_id: str, district: Optional[str] = None) -> Dict[str, Any]:
    """
    Retrieve progress, sanctioned budget, released funds, milestones, responsible officers,
    and district-wise progress for a government scheme.
    """
    progress = cmo_service.get_scheme_progress(scheme_name_or_id, district)
    if progress:
        return progress.model_dump()
    return {
        "status": "NOT_FOUND",
        "message": f"Scheme '{scheme_name_or_id}' not found in active government records.",
        "source": "State Planning Commission & Finance Department"
    }


# 4. get_district_overview
def get_district_overview(district_name: str) -> Dict[str, Any]:
    """
    Retrieve overview of a Tamil Nadu district: deployed officers (Collector, SP, etc.),
    active schemes, MP/MLA constituencies, and key governance indicators.
    """
    overview = cmo_service.get_district_overview(district_name)
    if overview:
        return overview.model_dump()
    return {
        "status": "NOT_FOUND",
        "message": f"District '{district_name}' not found in 38 Tamil Nadu districts.",
        "source": "Commissioner of Revenue Administration"
    }


# 5. search_contacts
def search_contacts(filters: Optional[Dict[str, Any]] = None, page: int = 1, page_size: int = 20) -> Dict[str, Any]:
    """
    Search official contact directory using faceted filters: cadre, ministry, department, rank, district, keyword.
    """
    resp = cmo_service.search_contacts(filters or {}, page, page_size)
    return resp.model_dump()


# 6. get_personnel_changes
def get_personnel_changes(date_from: str, date_to: str, cadre: Optional[str] = None, department: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Retrieve timeline of official personnel changes, transfers, promotions, and retirements with G.O. gazette citations.
    """
    records = cmo_service.get_personnel_changes(date_from, date_to, cadre, department)
    return [r.model_dump() for r in records]


# 7. cross_query
def cross_query(entities: Dict[str, Any]) -> Dict[str, Any]:
    """
    Perform cross-category intersection across officials, departments, schemes, and districts.
    """
    resp = cmo_service.cross_query(entities)
    return resp.model_dump()


# 8. export_contacts
def export_contacts(format: str, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Export filtered contacts to CSV, PDF, or vCard format.
    """
    contacts_resp = cmo_service.search_contacts(filters or {}, page=1, page_size=100)
    count = contacts_resp.total_count

    file_format = format.lower().strip()
    download_url = f"/api/v1/export/contacts.{file_format}?cadre={filters.get('cadre', 'ALL') if filters else 'ALL'}"

    return {
        "format": file_format,
        "total_records": count,
        "download_url": download_url,
        "status": "GENERATED",
        "file_name": f"tn_officials_directory_{file_format}.{file_format}",
        "message": f"Successfully compiled {count} contact records in {file_format.upper()} format."
    }


# Claude / Tool Calling Function Definitions for LLM
TOOL_DEFINITIONS = [
    {
        "name": "find_official",
        "description": "Find officials matching a name, rank, cadre, department, or district. Returns structured official cards with full contact details and source citations.",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search term (officer name, cadre, rank, or batch)"},
                "filters": {
                    "type": "object",
                    "properties": {
                        "cadre": {"type": "string", "enum": ["IAS", "IPS", "IRS", "IFS", "STATE", "MINISTER"]},
                        "department": {"type": "string"},
                        "district": {"type": "string"},
                        "designation": {"type": "string"}
                    }
                }
            },
            "required": ["query"]
        }
    },
    {
        "name": "get_department_overview",
        "description": "Retrieve overview of a department including Minister, Secretary, active schemes, and recent changes.",
        "parameters": {
            "type": "object",
            "properties": {
                "department_name_or_id": {"type": "string", "description": "Department name or ID"}
            },
            "required": ["department_name_or_id"]
        }
    },
    {
        "name": "get_scheme_progress",
        "description": "Retrieve scheme status, budget, released funds, progress %, milestones, and responsible officers.",
        "parameters": {
            "type": "object",
            "properties": {
                "scheme_name_or_id": {"type": "string", "description": "Scheme name or ID"},
                "district": {"type": "string", "description": "Optional district filter"}
            },
            "required": ["scheme_name_or_id"]
        }
    },
    {
        "name": "get_district_overview",
        "description": "Retrieve overview of a Tamil Nadu district: deployed Collector, SP, active schemes, and indicators.",
        "parameters": {
            "type": "object",
            "properties": {
                "district_name": {"type": "string", "description": "District name (e.g. 'Salem', 'Coimbatore', 'Kallakurichi')"}
            },
            "required": ["district_name"]
        }
    },
    {
        "name": "search_contacts",
        "description": "Search official contact directory using faceted filters: cadre, ministry, department, rank, district, keyword.",
        "parameters": {
            "type": "object",
            "properties": {
                "filters": {
                    "type": "object",
                    "properties": {
                        "cadre": {"type": "string"},
                        "ministry": {"type": "string"},
                        "department": {"type": "string"},
                        "rank": {"type": "string"},
                        "district": {"type": "string"},
                        "keyword": {"type": "string"}
                    }
                },
                "page": {"type": "integer", "default": 1},
                "page_size": {"type": "integer", "default": 20}
            }
        }
    },
    {
        "name": "get_personnel_changes",
        "description": "Retrieve timeline of official transfers, postings, and promotions with G.O. gazette citations.",
        "parameters": {
            "type": "object",
            "properties": {
                "date_from": {"type": "string", "description": "Start date in YYYY-MM-DD format"},
                "date_to": {"type": "string", "description": "End date in YYYY-MM-DD format"},
                "cadre": {"type": "string"},
                "department": {"type": "string"}
            },
            "required": ["date_from", "date_to"]
        }
    },
    {
        "name": "cross_query",
        "description": "Perform cross-category intersection across officials, departments, schemes, and districts.",
        "parameters": {
            "type": "object",
            "properties": {
                "entities": {
                    "type": "object",
                    "properties": {
                        "officials": {"type": "array", "items": {"type": "string"}},
                        "departments": {"type": "array", "items": {"type": "string"}},
                        "schemes": {"type": "array", "items": {"type": "string"}},
                        "districts": {"type": "array", "items": {"type": "string"}}
                    }
                }
            },
            "required": ["entities"]
        }
    },
    {
        "name": "export_contacts",
        "description": "Export filtered official contacts to CSV, PDF, or vCard format.",
        "parameters": {
            "type": "object",
            "properties": {
                "format": {"type": "string", "enum": ["csv", "pdf", "vcard"]},
                "filters": {"type": "object"}
            },
            "required": ["format"]
        }
    }
]
