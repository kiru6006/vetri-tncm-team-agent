from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class Citation(BaseModel):
    source: str
    ref: str
    date: str
    excerpt: Optional[str] = None


class ActionRecommendation(BaseModel):
    action_code: str
    description_en: str
    description_ta: str
    priority: str # HIGH, MEDIUM, LOW
    target_department: str


class CopilotQueryRequest(BaseModel):
    query: str
    language: str = "en" # en or ta
    session_id: Optional[str] = None
    district_filter: Optional[str] = None
    include_charts: bool = True


class CopilotQueryResponse(BaseModel):
    response_en: str
    response_ta: str
    citations: List[Citation] = []
    recommended_actions: List[ActionRecommendation] = []
    thought_steps: List[str] = []
    chart_directive: Optional[Dict[str, Any]] = None
