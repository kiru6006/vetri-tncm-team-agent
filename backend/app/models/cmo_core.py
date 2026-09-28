from datetime import datetime, date
import enum
from typing import List, Optional
from sqlalchemy import (
    Column,
    String,
    Integer,
    Numeric,
    Date,
    DateTime,
    Enum as SQLEnum,
    ForeignKey,
    Text,
    Boolean,
    JSON
)
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import relationship
from app.core.database import Base
import uuid


class CadreEnum(str, enum.Enum):
    IAS = "IAS"
    IPS = "IPS"
    IRS = "IRS"
    IFS = "IFS"
    STATE = "STATE"
    MINISTER = "MINISTER"
    MLA = "MLA"


class OfficialStatusEnum(str, enum.Enum):
    ACTIVE = "ACTIVE"
    LEAVE = "LEAVE"
    SUSPENDED = "SUSPENDED"
    TRANSFERRED = "TRANSFERRED"
    RETIRED = "RETIRED"


class SchemeStatusEnum(str, enum.Enum):
    PLANNED = "PLANNED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    DELAYED = "DELAYED"
    ON_HOLD = "ON_HOLD"


class EntityTypeEnum(str, enum.Enum):
    DEPARTMENT = "DEPARTMENT"
    SCHEME = "SCHEME"
    DISTRICT = "DISTRICT"
    COMMITTEE = "COMMITTEE"


class ChangeTypeEnum(str, enum.Enum):
    TRANSFER = "TRANSFER"
    PROMOTION = "PROMOTION"
    RETIREMENT = "RETIREMENT"
    CHARGE = "CHARGE"
    DEPUTATION = "DEPUTATION"


class Official(Base):
    __tablename__ = "officials"

    id = Column(String(64), primary_key=True, index=True)  # e.g., 'IAS-TN-2015-042'
    full_name_en = Column(String(255), nullable=False, index=True)
    full_name_ta = Column(String(255), nullable=False)
    cadre = Column(SQLEnum(CadreEnum), nullable=False, index=True)
    batch_year = Column(Integer, nullable=True, index=True)
    current_posting = Column(String(255), nullable=False, index=True)
    department_id = Column(String(64), ForeignKey("departments_core.id", ondelete="SET NULL"), nullable=True, index=True)
    ministry_id = Column(String(64), ForeignKey("ministries_core.id", ondelete="SET NULL"), nullable=True, index=True)
    designation_rank = Column(String(64), nullable=False, index=True)  # CS, ACS, PS, Secretary, Collector, SP, etc.
    phone_landline = Column(String(32), nullable=True)
    phone_mobile = Column(String(32), nullable=True)
    official_email = Column(String(128), nullable=False, unique=True, index=True)
    office_address = Column(Text, nullable=False)
    posting_effective_date = Column(Date, nullable=False, default=date.today)
    expected_retirement = Column(Date, nullable=True)
    status = Column(SQLEnum(OfficialStatusEnum), default=OfficialStatusEnum.ACTIVE, nullable=False)
    notes = Column(Text, nullable=True)
    source_refs = Column(JSONB, default=list, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    department = relationship("DepartmentCore", foreign_keys=[department_id], back_populates="officials")
    ministry = relationship("MinistryCore", foreign_keys=[ministry_id], back_populates="officials")
    assignments = relationship("Assignment", back_populates="official", cascade="all, delete-orphan")
    personnel_changes = relationship("PersonnelChange", back_populates="official", cascade="all, delete-orphan")


class MinistryCore(Base):
    __tablename__ = "ministries_core"

    id = Column(String(64), primary_key=True, index=True)
    name_en = Column(String(255), nullable=False, index=True)
    name_ta = Column(String(255), nullable=False)
    minister_official_id = Column(String(64), ForeignKey("officials.id", ondelete="SET NULL"), nullable=True)

    # Relationships
    departments = relationship("DepartmentCore", back_populates="ministry")
    officials = relationship("Official", foreign_keys=[Official.ministry_id], back_populates="ministry")


class DepartmentCore(Base):
    __tablename__ = "departments_core"

    id = Column(String(64), primary_key=True, index=True)
    name_en = Column(String(255), nullable=False, index=True)
    name_ta = Column(String(255), nullable=False)
    ministry_id = Column(String(64), ForeignKey("ministries_core.id", ondelete="SET NULL"), nullable=True, index=True)
    minister_official_id = Column(String(64), ForeignKey("officials.id", ondelete="SET NULL"), nullable=True)
    secretary_official_id = Column(String(64), ForeignKey("officials.id", ondelete="SET NULL"), nullable=True)
    parent_department_id = Column(String(64), ForeignKey("departments_core.id", ondelete="SET NULL"), nullable=True)
    contact_phone = Column(String(32), nullable=True)
    contact_email = Column(String(128), nullable=True)
    address = Column(Text, nullable=True)
    source_refs = Column(JSONB, default=list, nullable=False)

    # Relationships
    ministry = relationship("MinistryCore", back_populates="departments")
    officials = relationship("Official", foreign_keys=[Official.department_id], back_populates="department")
    schemes = relationship("SchemeCore", back_populates="department")


class SchemeCore(Base):
    __tablename__ = "schemes_core"

    id = Column(String(64), primary_key=True, index=True)
    name_en = Column(String(255), nullable=False, index=True)
    name_ta = Column(String(255), nullable=False)
    department_id = Column(String(64), ForeignKey("departments_core.id", ondelete="SET NULL"), nullable=True, index=True)
    owning_ministry_id = Column(String(64), ForeignKey("ministries_core.id", ondelete="SET NULL"), nullable=True, index=True)
    responsible_official_ids = Column(ARRAY(String(64)), default=list, nullable=False)
    budget_sanctioned = Column(Numeric(15, 2), nullable=False, default=0.00)
    budget_released = Column(Numeric(15, 2), nullable=False, default=0.00)
    financial_year = Column(String(16), nullable=False, default="2025-2026")
    status = Column(SQLEnum(SchemeStatusEnum), default=SchemeStatusEnum.IN_PROGRESS, nullable=False, index=True)
    progress_percent = Column(Numeric(5, 2), default=0.00, nullable=False)
    milestones = Column(JSONB, default=list, nullable=False)  # [{name, due_date, completed_date, status}]
    geography_ids = Column(ARRAY(String(32)), default=list, nullable=False)  # District IDs
    sector = Column(String(128), nullable=True, index=True)  # water supply, agriculture, health, education
    source_refs = Column(JSONB, default=list, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    department = relationship("DepartmentCore", back_populates="schemes")


class DistrictCore(Base):
    __tablename__ = "districts_core"

    id = Column(String(32), primary_key=True, index=True)  # e.g., 'district-salem'
    name_en = Column(String(128), nullable=False, unique=True, index=True)
    name_ta = Column(String(128), nullable=False)
    region = Column(String(64), nullable=False, index=True)  # Western, Southern, Northern, Central
    mp_constituencies = Column(ARRAY(String(128)), default=list, nullable=False)
    assembly_constituencies = Column(ARRAY(String(128)), default=list, nullable=False)
    key_indicators = Column(JSONB, default=dict, nullable=False)


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(String(64), primary_key=True, default=lambda: str(uuid.uuid4()))
    official_id = Column(String(64), ForeignKey("officials.id", ondelete="CASCADE"), nullable=False, index=True)
    entity_type = Column(SQLEnum(EntityTypeEnum), nullable=False, index=True)
    entity_id = Column(String(64), nullable=False, index=True)
    role = Column(String(128), nullable=False)
    since = Column(Date, nullable=False, default=date.today)
    until = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)

    official = relationship("Official", back_populates="assignments")


class PersonnelChange(Base):
    __tablename__ = "personnel_changes"

    id = Column(String(64), primary_key=True, default=lambda: str(uuid.uuid4()))
    official_id = Column(String(64), ForeignKey("officials.id", ondelete="CASCADE"), nullable=False, index=True)
    change_type = Column(SQLEnum(ChangeTypeEnum), nullable=False, index=True)
    from_role = Column(String(255), nullable=True)
    to_role = Column(String(255), nullable=False)
    effective_date = Column(Date, nullable=False, default=date.today, index=True)
    order_ref = Column(String(128), nullable=False, index=True)  # G.O. (Ms) No.
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    official = relationship("Official", back_populates="personnel_changes")
