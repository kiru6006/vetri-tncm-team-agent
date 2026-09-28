from fastapi import APIRouter, Depends
from app.core.security import get_current_user_claims
from app.schemas.departments_data import (
    HealthDomainResponse,
    PoliceDomainResponse,
    WaterAgriDomainResponse,
    FraudAuditDomainResponse,
)
from app.services.departments_service import (
    get_health_domain_data,
    get_police_domain_data,
    get_water_agri_domain_data,
    get_fraud_audit_domain_data,
)

router = APIRouter(prefix="/departments", tags=["Departmental Domain Intelligence"])


@router.get("/health", response_model=HealthDomainResponse)
async def fetch_health_intelligence(claims: dict = Depends(get_current_user_claims)):
    return await get_health_domain_data()


@router.get("/police", response_model=PoliceDomainResponse)
async def fetch_police_intelligence(claims: dict = Depends(get_current_user_claims)):
    return await get_police_domain_data()


@router.get("/water-agri", response_model=WaterAgriDomainResponse)
async def fetch_water_agri_intelligence(claims: dict = Depends(get_current_user_claims)):
    return await get_water_agri_domain_data()


@router.get("/fraud-audit", response_model=FraudAuditDomainResponse)
async def fetch_fraud_audit_intelligence(claims: dict = Depends(get_current_user_claims)):
    return await get_fraud_audit_domain_data()
