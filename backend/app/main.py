from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.core.redis import get_redis_client, close_redis_connection
from app.api.v1.auth import router as auth_router
from app.api.v1.executive import router as executive_router
from app.api.v1.districts import router as districts_router
from app.api.v1.departments import router as departments_router
from app.api.v1.copilot import router as copilot_router
from app.api.v1.audit import router as audit_router
from app.api.v1.hierarchy import router as hierarchy_router
from app.api.v1.chat import router as chat_router
from app.api.v1.meetings import router as meetings_router
from app.api.v1.knowledge import router as knowledge_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Try connecting to database; gracefully proceed in standalone dev
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("Database schema initialized successfully.")
    except Exception as e:
        print(f"PostgreSQL standalone notice (operating in in-memory / service mock mode): {e}")

    try:
        await get_redis_client()
    except Exception:
        pass
    yield
    try:
        await close_redis_connection()
        await engine.dispose()
    except Exception:
        pass


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Enterprise AI Operating System for Governance, Intelligence & Decision Support — Government of Tamil Nadu",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "system": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "state": "Tamil Nadu"
    }


# Register all API v1 Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(executive_router, prefix=settings.API_V1_STR)
app.include_router(districts_router, prefix=settings.API_V1_STR)
app.include_router(departments_router, prefix=settings.API_V1_STR)
app.include_router(copilot_router, prefix=settings.API_V1_STR)
app.include_router(audit_router, prefix=settings.API_V1_STR)
app.include_router(hierarchy_router, prefix=settings.API_V1_STR)
app.include_router(chat_router, prefix=settings.API_V1_STR)
app.include_router(meetings_router, prefix=settings.API_V1_STR)
app.include_router(knowledge_router, prefix=settings.API_V1_STR)
