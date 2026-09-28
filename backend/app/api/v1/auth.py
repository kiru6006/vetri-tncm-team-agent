from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user_claims
from app.schemas.auth import LoginRequest, TokenResponse, UserResponse
from app.services.auth_service import authenticate_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=TokenResponse)
async def login(login_data: LoginRequest, request: Request, db: AsyncSession = Depends(get_db)):
    ip = request.client.host if request.client else "127.0.0.1"
    try:
        token_resp = await authenticate_user(db, login_data, ip_address=ip)
        return token_resp
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"}
        )


@router.get("/me")
async def get_current_user_info(claims: dict = Depends(get_current_user_claims)):
    return {
        "user_id": claims.get("sub"),
        "role": claims.get("role"),
        "district": claims.get("district"),
        "authenticated": True
    }
