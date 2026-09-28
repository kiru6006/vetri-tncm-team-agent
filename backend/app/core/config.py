from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8", 
        case_sensitive=True,
        extra="allow"
    )

    ENVIRONMENT: str = "development"
    PROJECT_NAME: str = "VETTRI TN AI OS"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "vettri-super-secret-production-grade-key-tamil-nadu-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Database (PostgreSQL 16)
    DATABASE_URL: str = "postgresql+asyncpg://vettri_admin:VettriSecurePass2026@localhost:5432/vettri_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # MinIO / S3
    MINIO_ENDPOINT: str = "localhost:9000"
    MINIO_ACCESS_KEY: str = "vettri_minio_admin"
    MINIO_SECRET_KEY: str = "MinioSecurePass2026"
    MINIO_BUCKET_NAME: str = "vettri-government-orders"
    MINIO_SECURE: bool = False
    
    # LLM API Keys
    PRIMARY_LLM_PROVIDER: str = "gemini"
    GEMINI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.3:70b"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]


settings = Settings()
