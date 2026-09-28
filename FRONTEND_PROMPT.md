# VETTRI TN AI OS — Frontend Engineering Specification

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Tech Stack:** React 19 + TypeScript (Strict) + Vite + Tailwind CSS v4 + shadcn/ui  
> **Target:** Executive Desktop & Tablet Glassmorphic UI / Mobile PWA  
> **Version:** 1.0.0

---

## 1. Architectural Principles & Technology Selection

1. **Framework:** React 19 leveraging modern features (Server Components, Actions, `useOptimistic`, `useId`).
2. **State Strategy:**
   - **Server State:** TanStack Query v5 with aggressive stale-time tuning and background pre-fetching.
   - **Client UI State:** Zustand with TypeScript slice pattern.
   - **URL Routing & Search State:** TanStack Router for fully type-safe deep-linkable URLs.
3. **Data Visualization:**
   - **Apache ECharts:** For large-volume time series, multi-axis budget charts, and district comparisons.
   - **MapLibre GL:** High-frame-rate WebGL vector rendering of Tamil Nadu 38-district and taluk polygon boundaries.
   - **AG Grid Enterprise:** For dense financial ledger data with sorting, column re-ordering, and Excel export.
   - **React Flow:** For visualizing multi-agent LangGraph execution traces and fund-flow diagrams.
4. **Bilingual & Localization:**
   - `i18next` engine supporting seamless instant toggling between English and Tamil (*தமிழ்*).
   - Dynamic font loading: Inter / Roboto for English, Noto Sans Tamil / Anek Tamil for Tamil typography.

---

## 2. Executive Design Standards

- **Theme Palette:** Executive Obsidian Dark (`#0B0F19`) default with Gold/Tamil Nadu Maroon accents, plus Clean Slate Light Mode.
- **Glassmorphic Depth:** Subtle backdrop-filter blur (`backdrop-blur-md bg-slate-900/60 border border-slate-800/80`).
- **Response Latency:** Sub-16ms render loops; 0ms perceived latency using optimistic state updates.
- **Accessibility:** 100% WCAG 2.1 Level AA compliant with full ARIA landmarks and keyboard accessibility.
