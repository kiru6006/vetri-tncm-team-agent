# VETTRI TN AI OS — UI Component Library Specification

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Component Stack:** React 19 + Tailwind CSS v4 + Radix Primitives + Lucide Icons + Framer Motion  
> **Version:** 1.0.0

---

## 1. Core Component Taxonomy

```
src/components/
├── ui/                     # Base Radix/shadcn primitives
│   ├── button.tsx          # High-contrast action button with loading states
│   ├── dialog.tsx          # Modal dialog with backdrop blur
│   ├── dropdown-menu.tsx   # Accessible popup selector
│   ├── badge.tsx           # Status indicators (Healthy, Warning, Critical)
│   ├── tooltip.tsx         # Contextual hint overlays
│   └── sheet.tsx           # Slide-over drawers for mobile & Copilot
├── executive/              # High-Level Decision Support Elements
│   ├── StateScoreGauge.tsx # ECharts circular gauge with animated needle
│   ├── AlertTicker.tsx     # High-priority scrolling executive ticker
│   ├── KpiCard.tsx         # Metric summary card with sparkline & delta %
│   └── ActionDrawer.tsx    # One-click executive directive dispatcher
├── maps/                   # GIS & Spatial Visualizations
│   ├── TamilNaduMap.tsx    # MapLibre GL 38-district choropleth map
│   ├── DistrictPolygon.tsx # Interactive district click & hover tooltip
│   └── HeatmapLayer.tsx    # Crime/Disease incident density layers
├── tables/                 # Heavy Data Grid
│   └── TelemetryGrid.tsx   # AG Grid wrapper with search & CSV/PDF export
└── copilot/                # AI Conversational Drawer
    ├── CopilotWindow.tsx   # Voice & text chat input with waveform visualizer
    ├── ThoughtTrace.tsx    # Collapsible LangGraph agent reasoning steps
    └── CitationPill.tsx    # Clickable Government Order citation modal
```

---

## 2. Key Component Signatures

### 2.1 `KpiCard`
```tsx
interface KpiCardProps {
  titleEn: string;
  titleTa: string;
  value: string | number;
  unit?: string;
  deltaPercent: number;
  target?: string | number;
  status: 'healthy' | 'warning' | 'critical';
  sparklineData?: number[];
  onClick?: () => void;
}
```

### 2.2 `CitationPill`
```tsx
interface CitationPillProps {
  docTitle: string;
  goNumber?: string;
  publishedDate: string;
  departmentName: string;
  documentUrl: string;
}
```
