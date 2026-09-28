# VERTRI TN AI OS — Deployment & Operational Runbook
## Production Infrastructure, Containers, CI/CD & Observability

---

## 💻 1. Local Development Setup

### Prerequisites
- Python 3.11+ / 3.12+
- Node.js 20+ & npm
- PostgreSQL 16 with `pgvector` extension
- Redis 7.x

### Backend Setup
```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Launch Uvicorn dev server on port 8001
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev # Starts Vite on http://localhost:3000 (proxies /api to 8001)
```

### Automated Verification Tests
```bash
# Run backend unit tests
PYTHONPATH=backend python3 -m pytest backend/tests/ -v

# Run production build
cd frontend && npm run build
```

---

## 🐳 2. Docker & Docker-Compose Deployment

### `docker-compose.yml` (Multi-Service Production Topology)
```yaml
version: '3.9'

services:
  postgres:
    image: pgvector/pgvector:pg16
    container_name: vertri-tn-postgres
    restart: always
    environment:
      POSTGRES_DB: vetri_tn_aios
      POSTGRES_USER: tn_admin
      POSTGRES_PASSWORD: secure_tn_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: vertri-tn-redis
    restart: always
    ports:
      - "6379:6379"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: vertri-tn-backend
    restart: always
    environment:
      DATABASE_URL: postgresql+asyncpg://tn_admin:secure_tn_password@postgres:5432/vetri_tn_aios
      REDIS_URL: redis://redis:6379/0
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
    ports:
      - "8001:8001"
    depends_on:
      - postgres
      - redis

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: vertri-tn-frontend
    restart: always
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## ☸️ 3. Kubernetes Deployment Strategy

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vetri-backend-deployment
  namespace: vetri-tn-gov
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vetri-backend
  template:
    metadata:
      labels:
        app: vetri-backend
    spec:
      containers:
      - name: backend
        image: ghcr.io/tnega/vetri-tn-backend:latest
        ports:
        - containerPort: 8001
        resources:
          limits:
            cpu: "2"
            memory: "4Gi"
          requests:
            cpu: "500m"
            memory: "1Gi"
        livenessProbe:
          httpGet:
            path: /health
            port: 8001
          initialDelaySeconds: 15
          periodSeconds: 10
```

---

## 🔄 4. GitHub Actions CI/CD Pipeline

`.github/workflows/ci-cd.yml` automates:
1. **Lint & Formatting**: `ruff check .` & `eslint`
2. **Backend Unit Tests**: `pytest backend/tests/` with 100% pass enforcement
3. **Frontend Production Build**: `npm run build`
4. **Container Image Build & Push**: Multi-stage Docker build to GitHub Container Registry
5. **Deployment**: Zero-downtime rolling update on Kubernetes cluster.

---

## 📊 5. Observability & Audit Logging

- **Prometheus Metrics Endpoint**: `/metrics` tracking query latency, token usage, tool invocations, and cache hit ratio.
- **Audit Log Verification**: 100% of executive directives and official contact lookups are stored in `audit_logs` with SHA-256 provenance hashes.
