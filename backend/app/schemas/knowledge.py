from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class GovernmentOrderDocument(BaseModel):
    id: str
    doc_type: str  # GO_MS, GO_4D, ACT_STATUTE, CIRCULAR, BUDGET_NOTE, AUDIT_REPORT
    go_number: str
    department_code: str
    department_en: str
    department_ta: str
    title_en: str
    title_ta: str
    issued_date: str
    signatory_officer: str
    abstract_en: str
    abstract_ta: str
    financial_sanction_cr: Optional[float] = 0.0
    relevant_districts: List[str] = []
    applicable_acts_rules: List[str] = []
    pdf_download_url: str
    relevance_score: float = 0.95


class OmniSearchResponse(BaseModel):
    query: str
    query_interpreted: str
    total_results: int
    documents: List[GovernmentOrderDocument]
    related_officers: List[Dict[str, Any]] = []
    related_schemes: List[Dict[str, Any]] = []
    ai_answer_en: Optional[str] = None
    ai_answer_ta: Optional[str] = None
