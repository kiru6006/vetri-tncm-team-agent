import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Boolean, DateTime, Numeric, BigInteger, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class District(Base):
    __tablename__ = "districts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code: Mapped[str] = mapped_column(String(10), unique=True, index=True, nullable=False) # e.g. CHE, CBE, MDU
    name_en: Mapped[str] = mapped_column(String(100), nullable=False)
    name_ta: Mapped[str] = mapped_column(String(100), nullable=False)
    headquarters_en: Mapped[str] = mapped_column(String(100), nullable=False)
    headquarters_ta: Mapped[str] = mapped_column(String(100), nullable=False)
    zone: Mapped[str] = mapped_column(String(50), nullable=False) # North, South, West, Central
    latitude: Mapped[float] = mapped_column(Numeric(10, 6), nullable=False)
    longitude: Mapped[float] = mapped_column(Numeric(10, 6), nullable=False)
    population: Mapped[int] = mapped_column(BigInteger, default=0)
    area_sq_km: Mapped[float] = mapped_column(Numeric(10, 2), default=0.0)
    geo_boundary: Mapped[dict] = mapped_column(JSON, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    taluks: Mapped[list["Taluk"]] = relationship("Taluk", back_populates="district", cascade="all, delete-orphan")
    metric_values: Mapped[list["DistrictMetricValue"]] = relationship("DistrictMetricValue", back_populates="district")


class Taluk(Base):
    __tablename__ = "taluks"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    district_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("districts.id", ondelete="CASCADE"), nullable=False)
    code: Mapped[str] = mapped_column(String(20), unique=True, index=True, nullable=False)
    name_en: Mapped[str] = mapped_column(String(100), nullable=False)
    name_ta: Mapped[str] = mapped_column(String(100), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    district: Mapped["District"] = relationship("District", back_populates="taluks")
