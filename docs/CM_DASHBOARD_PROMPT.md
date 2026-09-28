# VETTRI TN AI OS — Chief Minister Executive Cockpit Specification

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Interface:** Chief Minister Executive Cockpit (First Screen of the State)  
> **Version:** 1.0.0

---

## 1. Cockpit Layout Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [TN State Emblem]  VETTRI TN AI OS — HON'BLE CHIEF MINISTER EXECUTIVE COCKPIT   [தமிழ்]│
├────────────────────────┬──────────────────────────────────────────┬────────────────────┤
│ STATE HEALTH INDEX     │ LIVE 38-DISTRICT GIS MAP                │ PRIORITY ACTIONS   │
│  88.4 / 100  (▲ 1.2%)  │ (Interactive MapLibre GL Choropleth)     │ [Urgent Ticker]    │
│                        │                                          │ • Tirupur Water    │
│ • Economy:    91.2     │  [Hover on District to inspect metrics]  │ • Madurai Drug Inv │
│ • Health:     86.5     │  • Green: Healthy (>85)                 │ • Cuddalore Rain   │
│ • Law & Order:89.0     │  • Amber: Attention (70-84)              │                    │
│ • Schemes:    85.8     │  • Red: Critical Deficit (<70)           │ [Issue Directive]  │
├────────────────────────┴──────────────────────────────────────────┴────────────────────┤
│ REVENUE & EXPENDITURE TELEMETRY                 FLAGSHIP SCHEME SATURATION             │
│ • Commercial Tax: ₹14,280 Cr (104% Target)     • Magalir Urimai:  1.15 Cr (99.8%)     │
│ • Stamps & Regn:  ₹2,140 Cr  (98% Target)      • Breakfast Scheme: 18.5 L (100%)      │
│ • Capex Velocity: ₹6,450 Cr  (89% Target)      • Pudhumai Penn:   4.8 L (96.4%)       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CHIEF MINISTER AI COPILOT INTERFACE (Voice & Text Multilingual Assistant)              │
│ 🎙️ [Ask anything about Tamil Nadu administration...]                [Submit Query]     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Real-Time Telemetry Cards & Widgets

1. **State Health Gauge Widget:** Dynamic calculation refreshed every 5 minutes aggregating 450+ district telemetry feeds.
2. **Interactive 38-District GIS Choropleth:** Zero-latency WebGL map displaying spatial distribution of GDP growth, water stress, or disease incidence.
3. **Executive Action Dispatcher:** One-click dispatch of directives to Ministers and Collectors with automatic SMS and WhatsApp executive notifications.
