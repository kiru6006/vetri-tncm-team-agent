# VERTRI TN AI OS — Design System & Responsive Tokens Review
## Version 2.0 | Design Token Architecture and Multi-Breakpoint System

### 1. Architectural Foundations
The design system for **VERTRI TN AI OS** is implemented using Tailwind CSS v4, custom CSS variables, and glassmorphic primitive classes designed for high-density governance intelligence.

---

### 2. Responsive Breakpoint Strategy

| Breakpoint | Minimum Width | Target Devices | Layout Mode | Navigation Behavior |
|:---|:---|:---|:---|:---|
| **`xs` (Base)** | `320px` | Small Android phones, iPhone SE | Single column (1-col) | Mobile Slide-over Drawer + Compact Header |
| **`sm`** | `640px` | Large phones, small phablets | 1 to 2 columns | Mobile Slide-over Drawer + Standard Header |
| **`md`** | `768px` | iPad Mini, small tablets | 2 columns | Collapsible Sidebar (w-18) or Drawer |
| **`lg`** | `1024px` | Standard iPad, iPad Air, small laptops | 2 to 3 columns | Fixed Sidebar (w-72 or w-18) |
| **`xl`** | `1280px` | Laptops and standard desktop monitors | Full 12-column grid | Persistent Sidebar (w-72) |
| **`2xl`** | `1536px` | Large desktop displays | Expanded 12-column grid | Persistent Sidebar (w-72) + Max Content 1440px |

---

### 3. Typography & Hierarchy Scale

All typography uses **Inter** for English text, **Noto Sans Tamil** for Tamil script, and **JetBrains Mono** for financial figures, GO numbers, and data points.

| Token | CSS Size | Mobile Clamp | Usage | Line Height |
|:---|:---|:---|:---|:---|
| `display-1` | `2.25rem`–`3rem` | `text-xl sm:text-2xl md:text-3xl lg:text-4xl` | Top Executive Hero Greetings | `tight` |
| `h1` | `1.5rem`–`2rem` | `text-lg sm:text-xl md:text-2xl` | Page & Dashboard Titles | `snug` |
| `h2` | `1.25rem`–`1.5rem` | `text-base sm:text-lg md:text-xl` | Card & Section Headers | `snug` |
| `h3` | `1rem`–`1.125rem` | `text-sm sm:text-base` | Issue Titles & Modal Headers | `snug` |
| `body-lg` | `0.875rem`–`1rem` | `text-xs sm:text-sm md:text-base` | Briefing & Descriptive Text | `relaxed` |
| `body-sm` | `0.75rem`–`0.8125rem` | `text-xs sm:text-sm` | Card Descriptions & Details | `normal` |
| `caption` | `0.6875rem`–`0.75rem` | `text-[10px] sm:text-[11px]` | Cadre, District, & Officer Subtext | `tight` |
| `mono-stat` | `1.125rem`–`1.5rem` | `text-lg sm:text-2xl` | Financial Exposure & KPI Numbers | `none` |

---

### 4. Spacing, Margins & Padding Tokens

| Context | Mobile (<640px) | Tablet (640px–1023px) | Desktop (≥1024px) |
|:---|:---|:---|:---|
| **App Main Container** | `p-3` | `p-4 sm:p-6` | `p-6 lg:p-8` |
| **Card Padding** | `p-3.5`–`p-4` | `p-5` | `p-6` |
| **Hero Containers** | `p-4` | `p-6` | `p-8` |
| **Modal Padding** | `p-3.5`–`p-4` | `p-6` | `p-6` |
| **Interactive Gap Scale** | `gap-1.5`–`gap-2` | `gap-3`–`gap-4` | `gap-4`–`gap-6` |

---

### 5. Color Tokens & High Contrast Accessibility

| Token Name | Hex Value / RGBA | Role | Contrast Ratio vs. `#07090e` |
|:---|:---|:---|:---|
| `bg-slate-950` | `#07090e` | Main Document Background | Base |
| `surface-glass` | `rgba(13, 18, 31, 0.85)` | Primary Card Surface | 1.3:1 (Background) |
| `text-primary` | `#f1f5f9` (Slate 100) | Primary Headings & Data | **18.2:1** (AAA) |
| `text-secondary` | `#94a3b8` (Slate 400) | Metadata & Labels | **7.5:1** (AAA) |
| `accent-gold` | `#fbbf24` (Amber 400) | Executive Badges & Highlights | **12.1:1** (AAA) |
| `status-critical` | `#f43f5e` (Rose 500) | Critical Severity & Alerts | **4.9:1** (AA) |
| `status-success` | `#10b981` (Emerald 500) | Verified & Active Status | **6.2:1** (AA) |
| `border-subtle` | `rgba(255, 255, 255, 0.12)` | Card Borders & Dividers | Visible high-precision delimiter |

---

### 6. Touch Target & Accessibility Compliance
1. **Minimum Touch Target**: All interactive buttons, tabs, and clickable rows maintain a minimum bounding box of **44 × 44 CSS pixels** on touch-enabled viewports via `.touch-target-44` and responsive padding.
2. **Safe Area Inset Handling**: iOS safe-area top and bottom padding (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`) implemented across the fixed header and floating action buttons.
3. **No Masking Hack**: Zero instances of `overflow-x: hidden` on the root body element. All horizontal layout constraints are enforced using responsive flex containers, `min-w-0`, and targeted overflow scroll utilities (`no-scrollbar`).
