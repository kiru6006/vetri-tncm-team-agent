# VETTRI TN AI OS — OpenAPI Specification & API Contract

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **API Standard:** OpenAPI 3.1.0 / JSON REST + WebSocket / SSE  
> **Base URL:** `https://api.vettri.tn.gov.in/api/v1`  
> **Version:** 1.0.0

---

## 1. Authentication & Security Headers

All requests (except `/auth/login` and `/health`) require a valid Bearer JWT:

```http
Authorization: Bearer <jwt_access_token>
X-Request-ID: req_uuid4_tracing_id
X-Language-Pref: ta | en
```

---

## 2. Core Endpoint Specifications

### 2.1 Authentication (`/auth`)

#### `POST /auth/login`
- **Request Body:**
```json
{
  "email": "collector.cbe@tn.gov.in",
  "password": "SecurePassword#2026",
  "mfa_code": "489201"
}
```
- **Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "name_en": "K. Senthil Kumar, IAS",
    "name_ta": "கே. செந்தில் குமார், இ.ஆ.ப.",
    "role": "DISTRICT_COLLECTOR",
    "assigned_district": "CBE",
    "department": null
  }
}
```

---

### 2.2 State Health Index (`/executive/state-score`)

#### `GET /executive/state-score`
- **Response (200 OK):**
```json
{
  "state_score": 88.4,
  "delta_last_week": "+1.2",
  "recorded_at": "2026-09-28T14:30:00Z",
  "dimensions": {
    "economic_health": {
      "score": 91.2,
      "status": "EXCELLENT",
      "metric_summary": "Commercial Tax collection at 104% of monthly target."
    },
    "public_health": {
      "score": 86.5,
      "status": "GOOD",
      "metric_summary": "98.2% PHC doctor attendance; 3 drug stockouts flagged."
    },
    "law_and_order": {
      "score": 89.0,
      "status": "EXCELLENT",
      "metric_summary": "Zero critical communal incidents; 94% CCTV uptime."
    },
    "scheme_delivery": {
      "score": 85.8,
      "status": "GOOD",
      "metric_summary": "Magalir Urimai Thittam disbursement 99.8% complete."
    },
    "infrastructure_velocity": {
      "score": 83.5,
      "status": "ATTENTION",
      "metric_summary": "4 highway bypass projects delayed >30 days."
    }
  }
}
```

---

### 2.3 AI Copilot Execution (`/copilot/chat`)

#### `POST /copilot/chat`
- **Request Body:**
```json
{
  "query": "காவிரி டெல்டா மாவட்டங்களில் குறுவை சாகுபடி நிலை என்ன?",
  "language": "ta",
  "session_id": "sess_8912",
  "include_charts": true
}
```
- **Response (200 OK):**
```json
{
  "response_ta": "காவிரி டெல்டா மாவட்டங்களில் (தஞ்சாவூர், திருவாரூர், நாகப்பட்டினம்) குறுவை சாகுபடி தற்போது 3.85 லட்சம் ஏக்கரில் நிறைவடைந்துள்ளது. மேட்டூர் அணை நீர் இருப்பு 68.4 அடியாக உள்ளதால், பாசன நீர் தேவைகள் திட்டமிட்டபடி பூர்த்தி செய்யப்படுகின்றன. இருப்பினும், திருவாரூர் மாவட்டத்தில் 12% உரக் கிடங்குகளில் டி.ஏ.பி (DAP) உரம் கையிருப்பு குறைவாக உள்ளது.",
  "response_en": "In the Cauvery Delta districts (Thanjavur, Tiruvarur, Nagapattinam), Kuruvai cultivation has been completed across 3.85 lakh acres. Mettur reservoir storage stands at 68.4 ft, meeting irrigation schedules. However, a 12% DAP fertilizer deficit is detected in Tiruvarur district storage points.",
  "citations": [
    {
      "source": "WRD Reservoir Telemetry",
      "ref": "METTUR_STORAGE_20260928",
      "date": "2026-09-28"
    },
    {
      "source": "Agri Dept Portal",
      "ref": "KURUVAI_ACREAGE_REPORT_WK39",
      "date": "2026-09-27"
    }
  ],
  "recommended_actions": [
    {
      "action_code": "DISPATCH_FERTILIZER_TIRUVARUR",
      "description_en": "Authorize TANFED emergency dispatch of 450 MT DAP to Tiruvarur.",
      "priority": "HIGH"
    }
  ]
}
```
