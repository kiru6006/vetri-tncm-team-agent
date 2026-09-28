from typing import Optional
from pydantic import BaseModel, EmailStr
from app.models.users import UserRole


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    mfa_code: Optional[str] = None


class UserResponse(BaseModel):
    id: str
    email: str
    phone: str
    full_name_en: str
    full_name_ta: Optional[str] = None
    role: UserRole
    is_mfa_enabled: bool
    district_code: Optional[str] = None
    designation: Optional[str] = None

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse
