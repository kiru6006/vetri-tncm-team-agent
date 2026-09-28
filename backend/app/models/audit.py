import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, JSON, Text
from sqlalchemy.dialects.postgresql import UUID, INET
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    user_email: Mapped[str] = mapped_column(String(255), nullable=True)
    user_role: Mapped[str] = mapped_column(String(50), nullable=True)
    action: Mapped[str] = mapped_column(String(100), nullable=False, index=True) # e.g. AUTH_LOGIN, ISSUE_DIRECTIVE
    resource_type: Mapped[str] = mapped_column(String(50), nullable=False) # DISTRICT, COPILOT_QUERY, SCHEME
    resource_id: Mapped[str] = mapped_column(String(100), nullable=True)
    ip_address: Mapped[str] = mapped_column(String(45), nullable=True)
    payload: Mapped[dict] = mapped_column(JSON, nullable=True)
    previous_hash: Mapped[str] = mapped_column(String(64), nullable=True)
    current_hash: Mapped[str] = mapped_column(String(64), nullable=False) # Cryptographically chained SHA-256
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
