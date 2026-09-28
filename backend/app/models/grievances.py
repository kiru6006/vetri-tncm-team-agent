import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, ForeignKey, Text, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class Grievance(Base):
    __tablename__ = "grievances"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    petition_no: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    source: Mapped[str] = mapped_column(String(50), default="MUDHALVARIN_MUGAVARI") # CM Helpline
    district_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("districts.id"), nullable=False)
    taluk_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    department_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    category: Mapped[str] = mapped_column(String(100), nullable=False) # e.g. Drinking Water, Ration Card, Land Patta
    description: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="IN_PROGRESS") # RECEIVED, IN_PROGRESS, RESOLVED, ESCALATED
    sla_days_total: Mapped[int] = mapped_column(Integer, default=30)
    sla_days_remaining: Mapped[int] = mapped_column(Integer, default=30)
    sentiment_score: Mapped[float] = mapped_column(default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    resolved_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
