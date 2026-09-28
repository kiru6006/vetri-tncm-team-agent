import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Numeric, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class KpiMetric(Base):
    __tablename__ = "kpi_metrics"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    department_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="CASCADE"), nullable=False)
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False) # e.g. REV_GST_COLLECTION_CR
    name_en: Mapped[str] = mapped_column(String(150), nullable=False)
    name_ta: Mapped[str] = mapped_column(String(150), nullable=False)
    domain: Mapped[str] = mapped_column(String(50), nullable=False) # economy, health, safety, agriculture, infrastructure
    unit: Mapped[str] = mapped_column(String(30), nullable=False) # Crores, Percentage, Count, MLD
    target_value: Mapped[float] = mapped_column(Numeric(18, 4), default=0.0)
    warning_threshold: Mapped[float] = mapped_column(Numeric(18, 4), default=0.0)
    critical_threshold: Mapped[float] = mapped_column(Numeric(18, 4), default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    department: Mapped["Department"] = relationship("Department", back_populates="kpis")
    district_values: Mapped[list["DistrictMetricValue"]] = relationship("DistrictMetricValue", back_populates="kpi")


class DistrictMetricValue(Base):
    __tablename__ = "district_metric_values"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    kpi_metric_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("kpi_metrics.id", ondelete="CASCADE"), nullable=False)
    district_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("districts.id", ondelete="CASCADE"), nullable=False)
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
    val: Mapped[float] = mapped_column(Numeric(18, 4), nullable=False)
    target: Mapped[float] = mapped_column(Numeric(18, 4), default=0.0)
    achievement_percent: Mapped[float] = mapped_column(Numeric(6, 2), default=100.0)
    anomaly_score: Mapped[float] = mapped_column(Numeric(5, 4), default=0.0) # 0.0 to 1.0
    status: Mapped[str] = mapped_column(String(20), default="HEALTHY") # HEALTHY, WARNING, CRITICAL
    meta_info: Mapped[dict] = mapped_column(JSON, nullable=True)

    kpi: Mapped["KpiMetric"] = relationship("KpiMetric", back_populates="district_values")
    district: Mapped["District"] = relationship("District", back_populates="metric_values")
