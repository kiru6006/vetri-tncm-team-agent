from typing import Annotated, Sequence, TypedDict, Literal, Optional, Any, Dict, List
from langchain_core.messages import BaseMessage
import operator


class StateGraphInput(TypedDict):
    query: str
    user_role: str
    district_code: Optional[str]
    language: Literal['en', 'ta']


class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    user_id: str
    user_role: str
    assigned_district: Optional[str]
    language: Literal['en', 'ta']
    intent: str
    target_domains: List[str]
    sql_records: List[Dict[str, Any]]
    rag_citations: List[Dict[str, Any]]
    response_en: str
    response_ta: str
    recommendations: List[Dict[str, Any]]
    guardrail_status: Literal['PASSED', 'FLAGGED', 'REJECTED']
