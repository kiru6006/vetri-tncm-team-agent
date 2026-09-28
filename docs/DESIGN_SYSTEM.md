# VETTRI TN AI OS — Executive Design System

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Design Philosophy:** Executive, Data-Dense, Glassmorphic, Accessible (WCAG 2.1 AA)  
> **Inspirations:** Palantir Gotham, Apple Pro Systems, Bloomberg Terminal, Formula 1 Race Control  
> **Version:** 1.0.0

---

## 1. Color Tokens & Palette

### 1.1 Executive Obsidian (Dark Mode — Default)
```css
:root[data-theme="dark"] {
  --bg-primary: #07090e;          /* Deep Obsidian Void */
  --bg-secondary: #0d121f;        /* Raised Surface */
  --bg-tertiary: #131b2e;         /* Floating Card Surface */
  --border-subtle: #1e293b;       /* 1px clean separation */
  --border-active: #3b82f6;       /* Focus / Active state */
  
  --text-primary: #f8fafc;        /* High-contrast crisp white */
  --text-secondary: #94a3b8;      /* Muted administrative metadata */
  --text-tertiary: #64748b;       /* Timestamps & minor legends */
  
  --brand-tn-gold: #eab308;       /* Tamil Nadu State Gold */
  --brand-tn-maroon: #881337;     /* State Emblem Maroon */
  --brand-cyan: #06b6d4;          /* Telemetry & Copilot accents */
  
  --status-healthy: #10b981;      /* Emerald Green (>90% target) */
  --status-warning: #f59e0b;      /* Amber Alert (70-89% target) */
  --status-critical: #ef4444;     /* Crimson Urgent (<70% target) */
}
```

---

## 2. Typography & Bilingual Type Hierarchy

- **English Typography:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`.
- **Tamil Typography (*தமிழ் எழுத்துருக்கள்*):** `Noto Sans Tamil`, `Anek Tamil`, `Latha`.
- **Monospace (Telemetry & Numbers):** `JetBrains Mono`, `Fira Code`.

```css
/* Typography Scale */
.text-display-lg { font-size: 2.25rem; line-height: 2.5rem; font-weight: 700; letter-spacing: -0.02em; }
.text-heading-1  { font-size: 1.5rem;  line-height: 2.0rem; font-weight: 600; letter-spacing: -0.01em; }
.text-metric-val { font-family: 'JetBrains Mono', monospace; font-size: 1.75rem; font-weight: 700; }
.text-body-sm    { font-size: 0.875rem; line-height: 1.25rem; font-weight: 400; }
```

---

## 3. Glassmorphism & Elevation System

- **Glass Card Primitive:**
```css
.executive-glass-card {
  background: rgba(13, 18, 31, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
  border-radius: 0.75rem;
}
```
