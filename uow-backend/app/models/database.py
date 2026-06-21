"""
Database Models for Role-Based Access Control System
-----------------------------------------------------
- Users: Base user model with role (client, hospital, admin)
- ClientProfile: Extended profile for clients
- HospitalEntity: Hospital organizations
- HospitalStaff: Hospital staff members
- HospitalClient: Many-to-many relationship between hospitals and clients
- AnalysisHistory: Track all image analyses
- AdminProfile: Admin user profiles
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Text, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

Base = declarative_base()


class UserRole(str, enum.Enum):
    client = "client"
    hospital = "hospital"
    admin = "admin"


class UserStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    suspended = "suspended"


class User(Base):
    """Base user model for authentication"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    name = Column(String(255), nullable=True)
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    client_profile = relationship("ClientProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    hospital_staff = relationship("HospitalStaff", back_populates="user", uselist=False, cascade="all, delete-orphan")
    admin_profile = relationship("AdminProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    analyses = relationship("AnalysisHistory", back_populates="user", cascade="all, delete-orphan")


class ClientProfile(Base):
    """Extended profile for client users"""
    __tablename__ = "client_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)
    client_id = Column(String(100), unique=True, index=True)
    organization = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)

    # Relationship
    user = relationship("User", back_populates="client_profile")
    hospital_assignments = relationship("HospitalClient", back_populates="client", cascade="all, delete-orphan")


class HospitalEntity(Base):
    """Hospital organization entity"""
    __tablename__ = "hospital_entities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(50), unique=True, index=True)
    address = Column(Text, nullable=True)
    phone = Column(String(20), nullable=True)
    email = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    staff = relationship("HospitalStaff", back_populates="hospital", cascade="all, delete-orphan")
    clients = relationship("HospitalClient", back_populates="hospital", cascade="all, delete-orphan")


class HospitalStaff(Base):
    """Hospital staff members (users with hospital role)"""
    __tablename__ = "hospital_staff"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)
    hospital_id = Column(Integer, ForeignKey("hospital_entities.id", ondelete="CASCADE"), index=True)
    staff_id = Column(String(100), unique=True, index=True)
    department = Column(String(255), nullable=True)
    position = Column(String(100), nullable=True)
    can_manage_clients = Column(Boolean, default=True)

    # Relationships
    user = relationship("User", back_populates="hospital_staff")
    hospital = relationship("HospitalEntity", back_populates="staff")


class HospitalClient(Base):
    """Many-to-many relationship between hospitals and clients"""
    __tablename__ = "hospital_clients"

    id = Column(Integer, primary_key=True, index=True)
    hospital_id = Column(Integer, ForeignKey("hospital_entities.id", ondelete="CASCADE"), index=True)
    client_id = Column(Integer, ForeignKey("client_profiles.id", ondelete="CASCADE"), index=True)
    assigned_at = Column(DateTime, default=datetime.utcnow)
    assigned_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    is_active = Column(Boolean, default=True)
    notes = Column(Text, nullable=True)

    # Relationships
    hospital = relationship("HospitalEntity", back_populates="clients")
    client = relationship("ClientProfile", back_populates="hospital_assignments")


class AdminProfile(Base):
    """Admin user profiles"""
    __tablename__ = "admin_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)
    admin_id = Column(String(100), unique=True, index=True)
    department = Column(String(255), nullable=True)
    access_level = Column(String(50), default="full")  # full, limited

    # Relationship
    user = relationship("User", back_populates="admin_profile")


class AnalysisHistory(Base):
    """Track all image analyses"""
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)
    hospital_id = Column(Integer, ForeignKey("hospital_entities.id", ondelete="SET NULL"), nullable=True)
    image_type = Column(String(50))  # xray, ct_scan
    original_filename = Column(String(255))
    processed_filename = Column(String(255), nullable=True)
    detections = Column(Text, nullable=True)  # JSON string of detections
    created_at = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)

    # Relationship
    user = relationship("User", back_populates="analyses")

