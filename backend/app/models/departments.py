import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Numeric, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class Ministry(Base):
    __tablename__ = "ministries"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code: Mapped[str] = mapped_column(String(20), unique=True, index=True, nullable=False) # e.g. MIN_FIN, MIN_HLT
    name_en: Mapped[str] = mapped_column(String(150), nullable=False)
    name_ta: Mapped[str] = mapped_column(String(150), nullable=False)
    minister_name_en: Mapped[str] = mapped_column(String(150), nullable=True)
    minister_name_ta: Mapped[str] = mapped_column(String(150), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    departments: Mapped[list["Department"]] = relationship("Department", back_populates="ministry", cascade="all, delete-orphan")


class Department(Base):
    __tablename__ = "departments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ministry_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("ministries.id", ondelete="RESTRICT"), nullable=False)
    code: Mapped[str] = mapped_column(String(30), unique=True, index=True, nullable=False) # e.g. DEPT_COMM_TAX
    name_en: Mapped[str] = mapped_column(String(150), nullable=False)
    name_ta: Mapped[str] = mapped_column(String(150), nullable=False)
    secretary_name_en: Mapped[str] = mapped_column(String(150), nullable=True)
    secretary_name_ta: Mapped[str] = mapped_column(String(150), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    ministry: Mapped["Ministry"] = relationship("Ministry", back_populates="departments")
    schemes: Mapped[list["Scheme"]] = relationship("Scheme", back_populates="department")
    kpis: Mapped[list["KpiMetric"]] = relationship("KpiMetric", back_populates="department")


class Scheme(Base):
    __tablename__ = "schemes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    department_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="CASCADE"), nullable=False)
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False) # e.g. SCHEME_KMUT
    name_en: Mapped[str] = mapped_column(String(200), nullable=False)
    name_ta: Mapped[str] = mapped_column(String(200), nullable=False)
    description_en: Mapped[str] = mapped_column(Text, nullable=True)
    description_ta: Mapped[str] = mapped_column(Text, nullable=True)
    budget_allocation_cr: Mapped[float] = mapped_column(Numeric(14, 2), default=0.0)
    target_beneficiaries: Mapped[int] = mapped_column(default=0)
    active_beneficiaries: Mapped[int] = mapped_column(default=0)
    disbursement_percent: Mapped[float] = mapped_column(Numeric(5, 2), default=0.0)
    launch_year: Mapped[int] = mapped_column(default=2023)
    is_flagship: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    department: Mapped["Department"] = relationship("Department", back_populates="schemes")
