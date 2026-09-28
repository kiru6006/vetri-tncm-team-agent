# VETTRI TN AI OS — OpenAPI Specification & API Contract
### Phase 2 Enhanced Multi-Role Enterprise Architecture

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **API Standard:** OpenAPI 3.1.0 / JSON REST + WebSocket / SSE  
> **Base URL:** `https://api.vettri.tn.gov.in/api/v1`  
> **Version:** 2.0.0

---

## 1. Authentication & Security Headers

All requests (except `/auth/login` and `/health`) require a valid Bearer JWT:

```http
Authorization: Bearer <jwt_access_token>
X-Request-ID: req_uuid4_tracing_id
X-Language-Pref: ta | en
X-User-Role: CHIEF_MINISTER | CABINET_MINISTER | DISTRICT_COLLECTOR | VAO | FIELD_OFFICER
```

---

## 2. Core Endpoint Specifications

### 2.1 Authentication & Session (`/auth`)

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
    "department": "REVENUE",
    "administrative_level": "DISTRICT",
    "reports_to": "Chief Secretary"
  }
}
```

---

### 2.2 Executive Workspace & Morning Briefing (`/executive`)

#### `GET /executive/workspace/briefing`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
```json
{
  "greeting_en": "Good Morning, Hon'ble Chief Minister",
  "greeting_ta": "காலை வணக்கம், மாண்புமிகு முதலமைச்சர் அவர்களுக்கு",
  "briefing_date": "2026-09-28",
  "state_score": 88.4,
  "top_priorities": [
    {
      "id": "prio_1",
      "title": "Mettur Dam Kuruvai Water Inflow Review",
      "severity": "CRITICAL",
      "department": "WATER_RESOURCES",
      "recommended_decision": "Authorize special delta irrigation release of 15,000 cusecs"
    },
    {
      "id": "prio_2",
      "title": "Commercial Tax Monthly Reconciliation",
      "severity": "MEDIUM",
      "department": "FINANCE",
      "recommended_decision": "Review 3 enforcement circles underperforming target by >8%"
    }
  ],
  "weather_alerts": [
    {
      "region": "Coastal Tamil Nadu (Cuddalore, Nagapattinam)",
      "alert_level": "ORANGE",
      "forecast": "Heavy rainfall expected in next 36 hours. Disaster SDRF teams on standby."
    }
  ],
  "pending_approvals_count": 7,
  "cabinet_meetings_today": 1
}
```

#### `GET /executive/actions/today`
- **Response (200 OK):**
```json
{
  "approvals_awaiting_decision": 5,
  "urgent_reviews": [
    {
      "type": "DELAYED_PROJECT",
      "title": "Chennai Peripheral Ring Road (Section II)",
      "cost_in_crores": 2150.0,
      "delayed_days": 45,
      "bottleneck": "Land acquisition clearance in Ponneri Taluk",
      "responsible_officer": "District Collector, Tiruvallur"
    }
  ],
  "escalated_complaints_count": 12,
  "schemes_underperforming": ["Rural Solar Pump Subsidy Scheme"]
}
```

---

### 2.3 Government Hierarchy & Smart Directory (`/hierarchy` & `/directory`)

#### `GET /hierarchy/tree`
- **Query Params:** `root_level=CHIEF_MINISTER&depth=3`
- **Response (200 OK):** Returns hierarchical node structure of officers, designations, and sub-departments.

#### `GET /directory/search`
- **Query Params:** `query=Principal Secretary for Health&semantic=true`
- **Response (200 OK):**
```json
{
  "query_interpreted": "Find officer leading Health and Family Welfare Department",
  "results": [
    {
      "officer_id": "off_health_ps_01",
      "name_en": "P. Senthilkumar, IAS",
      "name_ta": "பி. செந்தில்குமார், இ.ஆ.ப.",
      "designation": "Principal Secretary to Government",
      "department": "Health and Family Welfare",
      "office_location": "Secretariat, Fort St. George, Chennai",
      "cug_phone": "+91 44 2567 1875",
      "official_email": "hfsec@tn.gov.in",
      "current_schemes": ["Makkalai Thedi Maruthuvam", "Innuyir Kappom (Nammai Kakkum 48)"],
      "pending_approvals": 4
    }
  ]
}
```

---

### 2.4 Secure Government Chat & Collaboration (`/chat`)

#### `POST /chat/rooms` (Create / Join Channel)
#### `GET /chat/rooms/{room_id}/messages`
#### `POST /chat/rooms/{room_id}/summarize`
- **Response (200 OK):**
```json
{
  "room_id": "dept-health-monsoon-prep",
  "summary_en": "Secretary instructed all Joint Directors to ensure 100% buffer stock of anti-venom and ORS packets in coastal PHCs by 18:00 hrs today.",
  "action_items": [
    {
      "task": "Submit PHC stock compliance certificate",
      "assignee": "JD Health (Cuddalore)",
      "deadline": "2026-09-28T18:00:00Z"
    }
  ]
}
```

---

### 2.5 Executive Meeting Intelligence (`/meetings`)

#### `POST /meetings/create`
#### `GET /meetings/{meeting_id}/briefing-pack`
- **Response (200 OK):**
```json
{
  "meeting_id": "mtg_cab_20260928",
  "title": "Cabinet Review on Industrial Investment Proposals",
  "ai_pre_briefing": "3 Global Semiconductor & EV proposals awaiting SIPCOT land allotment subsidies totaling ₹4,800 Cr with direct employment potential of 14,200.",
  "risk_factors": ["Power transmission substation timeline needs alignment with TANGEDCO"],
  "historical_decisions": ["Cabinet approval granted for SIPCOT Hosur expansion in Q2 2026"],
  "suggested_agenda_duration_mins": 45
}
```

---

### 2.6 Multi-Role AI Copilot Execution (`/copilot/chat`)

#### `POST /copilot/chat`
- **Request Body:**
```json
{
  "query": "Show all delayed road and bridge projects above ₹100 crore and suggest mitigation actions",
  "role_context": "CHIEF_MINISTER",
  "language": "en",
  "session_id": "sess_cm_executive_981"
}
```
- **Response (200 OK):**
```json
{
  "response_en": "There are currently 4 major infrastructure projects above ₹100 Cr experiencing delays exceeding 30 days...",
  "response_ta": "தற்போது ₹100 கோடிக்கு மேல் மதிப்பிலான 4 முக்கிய உள்கட்டமைப்பு திட்டங்கள் 30 நாட்களுக்கு மேல் தாமதமாகி வருகின்றன...",
  "citations": [
    {
      "source": "Highways & Minor Ports Dept Project Tracker",
      "ref": "HW_CAPEX_MONITOR_Q3_2026",
      "date": "2026-09-28"
    }
  ],
  "agent_trace": {
    "primary_agent": "Infrastructure Project Intelligence Agent",
    "delegated_to": ["Revenue Land Acquisition Agent", "Finance Capex Agent"],
    "reasoning_time_ms": 420
  }
}
```

---

### 2.7 Unified Government Omni Search (`/search/omni`)

#### `GET /search/omni`
- **Query Params:** `q=Solar pump subsidy GO&types=GO,SCHEME,OFFICER&limit=10`
- **Response (200 OK):**
```json
{
  "query": "Solar pump subsidy GO",
  "total_hits": 3,
  "results": [
    {
      "type": "GOVERNMENT_ORDER",
      "title": "G.O. (Ms) No. 112 - Agri Engineering - 70% Solar Pump Subsidy Expansion",
      "doc_number": "GO-MS-112-AGRI-2026",
      "issued_date": "2026-04-12",
      "url": "https://storage.vettri.tn.gov.in/gos/go_ms_112_agri_2026.pdf",
      "relevance_score": 0.96
    }
  ]
}
```
