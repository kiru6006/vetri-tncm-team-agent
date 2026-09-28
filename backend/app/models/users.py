import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from app.core.database import Base


class UserRole(str, enum.Enum):
    CHIEF_MINISTER = "CHIEF_MINISTER"
    CHIEF_SECRETARY = "CHIEF_SECRETARY"
    MINISTER = "MINISTER"
    DEPARTMENT_SECRETARY = "DEPARTMENT_SECRETARY"
    DISTRICT_COLLECTOR = "DISTRICT_COLLECTOR"
    COMMISSIONER = "COMMISSIONER"
    TALUK_OFFICER = "TALUK_OFFICER"
    ANALYST = "ANALYST"
    SYSTEM_ADMIN = "SYSTEM_ADMIN"


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name_en: Mapped[str] = mapped_column(String(150), nullable=False)
    full_name_ta: Mapped[str] = mapped_column(String(150), nullable=True)
    role: Mapped[UserRole] = mapped_column(SQLEnum(UserRole, name="user_role_enum"), nullable=False, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_mfa_enabled: Mapped[bool] = mapped_column(Boolean, default=False)
    mfa_secret: Mapped[str] = mapped_column(String(64), nullable=True)
    last_login_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    officer_profile: Mapped["OfficerProfile"] = relationship("OfficerProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")


class OfficerProfile(Base):
    __tablename__ = "officer_profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    designation: Mapped[str] = mapped_column(String(150), nullable=False)
    department_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    district_code: Mapped[str] = mapped_column(String(10), nullable=True) # e.g. CBE
    cadre: Mapped[str] = mapped_column(String(50), default="IAS") # IAS, IPS, IFS, DRO
    batch_year: Mapped[int] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship("User", back_populates="officer_profile")
