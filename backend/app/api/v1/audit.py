from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import require_roles
from app.models.audit import AuditLog

router = APIRouter(prefix="/audit", tags=["Security & Audit"])


@router.get("/recent")
async def list_recent_audits(
    claims: dict = Depends(require_roles(["CHIEF_MINISTER", "CHIEF_SECRETARY", "SYSTEM_ADMIN"])),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(AuditLog).order_by(AuditLog.created_at.desc()).limit(50))
    audits = result.scalars().all()
    return [
        {
            "id": str(a.id),
            "user_email": a.user_email,
            "user_role": a.user_role,
            "action": a.action,
            "resource_type": a.resource_type,
            "resource_id": a.resource_id,
            "ip_address": a.ip_address,
            "current_hash": a.current_hash,
            "created_at": a.created_at
        }
        for a in audits
    ]
