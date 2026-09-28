# VETTRI TN AI OS — Containerization & Docker Deployment

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Environment:** Local Development, Staging & Single-Node Sovereign Deployments  
> **Version:** 1.0.0

---

## 1. Multi-Service Container Topology

```yaml
# infra/docker/docker-compose.yml
services:
  postgres:
    image: pgvector/pgvector:pg16
    container_name: vettri-postgres
    restart: always
    environment:
      POSTGRES_DB: vettri_db
      POSTGRES_USER: vettri_admin
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-VettriSecurePass2026}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7.4-alpine
    container_name: vettri-redis
    restart: always
    ports:
      - "6379:6379"

  minio:
    image: minio/minio:latest
    container_name: vettri-minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: vettri_minio_admin
      MINIO_ROOT_PASSWORD: ${MINIO_PASSWORD:-MinioSecurePass2026}
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - miniodata:/data

  backend:
    build:
      context: ../../backend
      dockerfile: Dockerfile
    container_name: vettri-backend
    restart: always
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql+asyncpg://vettri_admin:${POSTGRES_PASSWORD:-VettriSecurePass2026}@postgres:5432/vettri_db
      REDIS_URL: redis://redis:6379/0
      JWT_SECRET: ${JWT_SECRET:-SuperSecretVettriKey2026}
    ports:
      - "8000:8000"

  frontend:
    build:
      context: ../../frontend
      dockerfile: Dockerfile
    container_name: vettri-frontend
    restart: always
    ports:
      - "3000:80"

volumes:
  pgdata:
  miniodata:
```

---

## 2. Quickstart Execution Commands

```bash
# Clone repository and start all enterprise services
cd vetri-tncm-aios/infra/docker
docker compose up -d --build

# Verify all containers are healthy
docker compose ps
```
