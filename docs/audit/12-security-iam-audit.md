# 12 — Cybersecurity and Identity Access Management (IAM) Audit

> [!WARNING]
> CRITICAL SECURITY AUDIT: Identifies unauthenticated routes, RBAC gaps, PII exposure risks, and mitigation strategies for government-grade deployment.

---

## 1. Authentication & Endpoint Protection Audit

- **Total API Endpoints**: 56 endpoints across 14 routers.
- **Authenticated Endpoints**: 29 endpoints enforce `Depends(get_current_active_user)`.
- **Unauthenticated Endpoints (`FIND-SEC-01`)**: **27 endpoints** have no auth dependency.

### Vulnerable Unauthenticated Endpoints Table
| Module Router | Endpoint Path | Method | Operations Allowed to Anonymous Caller | Severity |
|---|---|---|---|---|
| [cmo_endpoints.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/api/v1/cmo_endpoints.py) | `/api/v1/cmo/action-items` | `POST` | Create executive action item | **P0** |
| [cmo_endpoints.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/api/v1/cmo_endpoints.py) | `/api/v1/cmo/action-items/{id}` | `PATCH` | Modify status / close action items | **P0** |
| [cmo_endpoints.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/api/v1/cmo_endpoints.py) | `/api/v1/cmo/alerts` | `POST` | Inject statewide priority alert | **P0** |
| [calendar.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/api/v1/calendar.py) | `/api/v1/calendar/book` | `POST` | Book appointments on CM calendar | **P0** |
| [grm.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/api/v1/grm.py) | `/api/v1/grm/sync/trigger` | `POST` | Trigger background sync job | **P1** |
| [audit.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/api/v1/audit.py) | `/api/v1/audit/recent` | `GET` | Read system audit log trails | **P1** |
| [copilot.py](file:///Users/apple/projects/vetri-tncm-aios/backend/app/api/v1/copilot.py) | `/api/v1/copilot/chat` | `POST` | Query executive intelligence copilot | **P1** |

---

## 2. Role-Based Access Control (RBAC) Matrix

The system models 6 core government personas. The target RBAC permission matrix:

| Persona Role | View State KPIs | Approve CM Action Items | Modify Calendar | View District Details | Access Audit Logs |
|---|:---:|:---:|:---:|:---:|:---:|
| **Chief Minister (`cm`)** | Full | Yes | Full | Full | Read |
| **Chief Secretary (`chief_secretary`)** | Full | Yes | Full | Full | Read/Write |
| **Minister (`minister`)** | Department | Portfolio Only | Self | Portfolio Only | Denied |
| **Secretary (`secretary`)** | Department | Department Only | Self | Department Only | Denied |
| **District Collector (`collector`)** | District | District Only | Self | Assigned District | Denied |
| **Public / Guest (`public`)** | Redacted | Denied | Denied | Public Stats Only | Denied |

---

## 3. PII Masking & Data Privacy Protocol

1. **Official Phone & Email Disclosure**: Personal mobile numbers and private email addresses of civil servants must never be exposed.
2. **Institutional Fallbacks**: Fall back to verified institutional desks (e.g., `cmo@tn.gov.in`, `collr-cbe@tn.gov.in`).
3. **Audit Logging**: Every access to contact details or directory export must log `{timestamp, user_id, target_official_id, action}` to an append-only audit table.
