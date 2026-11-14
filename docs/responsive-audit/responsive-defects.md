# VERTRI TN AI OS — Responsive Defects Register
## Version 2.0 | Log of Responsive Defects, Root Causes, and Applied Remediations

### 1. Defect Summary Table

| Defect ID | Severity | Component / Area | Viewports Affected | Description | Status |
|:---|:---|:---|:---|:---|:---|
| `DEF-RESP-01` | **P0 (Critical)** | `index.css` | All Viewports | `overflow-x: hidden` set globally on `body` artificially masked layout overflow defects | **RESOLVED** |
| `DEF-RESP-02` | **P0 (Critical)** | `index.html` | Mobile iOS / Android | `viewport-fit=cover` was missing from viewport meta tag, causing safe area clipping | **RESOLVED** |
| `DEF-RESP-03` | **P1 (High)** | `ExecutiveHeader.tsx` | 320px–375px | Fixed dropdown widths (`w-80` = 320px, `w-72` = 288px) caused horizontal overflow off-screen | **RESOLVED** |
| `DEF-RESP-04` | **P1 (High)** | `ExecutiveHeader.tsx` | 320px–480px | Header search bar, notifications, messages, calendar, and role buttons competed for space on narrow phones | **RESOLVED** |
| `DEF-RESP-05` | **P1 (High)** | `ExecutiveSidebar.tsx` | Mobile (<1024px) | Mobile drawer had no `document.body` scroll-lock, no `Escape` key listener, and no dedicated `X` close button | **RESOLVED** |
| `DEF-RESP-06` | **P1 (High)** | `CopilotDrawer.tsx` | Mobile (<640px) | Copilot drawer lacked a mobile backdrop and `Escape` key dismissal handler | **RESOLVED** |
| `DEF-RESP-07` | **P1 (High)** | `ExecutiveWorkspace.tsx` | 320px–360px | Hero Quick Metrics (`text-2xl` in `grid-cols-3` with `p-4`) caused text clipping on small phones | **RESOLVED** |
| `DEF-RESP-08` | **P1 (High)** | `ExecutiveWorkspace.tsx` | Mobile (<640px) | Category filter pills caused multi-row vertical expansion rather than smooth horizontal scrolling | **RESOLVED** |
| `DEF-RESP-09` | **P1 (High)** | `ExecutiveWorkspace.tsx` | Mobile (<640px) | Issue detail modal lacked `max-h-[90vh]` scroll constraint, preventing user from reaching action buttons on small screens | **RESOLVED** |
| `DEF-RESP-10` | **P1 (High)** | `GovernmentHierarchyDirectory.tsx` | Mobile (<640px) | 4-tab switcher bar wrapped awkwardly; tree node indentation (`level * 22px`) squeezed text on mobile | **RESOLVED** |
| `DEF-RESP-11` | **P1 (High)** | `GovernmentChatPlatform.tsx` | Mobile (<1024px) | Channel list and active message stream stacked vertically, forcing user to scroll through the whole channels list to see messages | **RESOLVED** |
| `DEF-RESP-12` | **P2 (Medium)** | `ExecutiveMeetingWorkspace.tsx` | Mobile (<640px) | Pre-briefing, MoM, and Action Items subtabs wrapped into multiple uneven lines | **RESOLVED** |
| `DEF-RESP-13` | **P2 (Medium)** | `ExplorePlatform.tsx` | Mobile (<640px) | Role pills and category filters expanded vertically, pushing catalog cards down | **RESOLVED** |
| `DEF-RESP-14` | **P2 (Medium)** | `App.tsx` | Mobile (<640px) | District detail modal had fixed padding without scroll container; floating Copilot FAB lacked safe-area spacing | **RESOLVED** |

---

### 2. Detailed Root Cause Analysis & Remediation Details

#### `DEF-RESP-01`: Global `overflow-x: hidden` Masking
- **Root Cause**: `frontend/src/index.css` had `overflow-x: hidden;` directly on `body`. This masked true responsive bugs and prevented natural layout containment.
- **Remediation**: Removed `overflow-x: hidden;` from `body`. Added `min-width: 320px;` and proper `.no-scrollbar` utility classes for targeted scroll areas.
- **Verification**: Verified zero horizontal page scroll across all tested viewports using native CSS flex/grid containment.

#### `DEF-RESP-02`: Missing `viewport-fit=cover`
- **Root Cause**: `frontend/index.html` viewport meta tag was `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
- **Remediation**: Updated to `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />` and introduced `.safe-top` and `.safe-bottom` CSS utility classes.
- **Verification**: Tested on iOS simulator viewports; top notch and home indicator insets render cleanly.

#### `DEF-RESP-03`: Header Dropdown Overflow on 320px–375px
- **Root Cause**: Notifications dropdown had `w-80` (320px) and Persona dropdown had `w-72` (288px) positioned with `right-0`. On a 320px screen with padding, these overlapped or pushed outside the viewport boundary.
- **Remediation**: Changed dropdown widths to `w-[calc(100vw-1.5rem)] max-w-sm sm:w-96` and `w-[calc(100vw-1.5rem)] max-w-xs sm:w-72` with dynamic anchoring (`right-[-3rem] sm:right-0`).
- **Verification**: Both dropdowns now open within the visible screen area on 320px, 360px, and 375px displays.

#### `DEF-RESP-04`: Header Control Contention on Narrow Displays
- **Root Cause**: Search bar, language toggle, persona selector, notifications, messages, and calendar buttons all competed in a 320px row.
- **Remediation**: Made Messages and Calendar shortcut buttons `hidden sm:inline-flex` (accessible 100% of the time via the Executive Sidebar), compact search input (`min-w-[110px] pl-8 pr-8 py-1.5`), and set role selector `max-w-[65px] sm:max-w-none truncate`.
- **Verification**: Search and essential controls fit cleanly on 320px without any button overlap.

#### `DEF-RESP-05`: Sidebar Mobile Overlay Management
- **Root Cause**: Opening mobile sidebar on phones allowed underlying page to scroll, lacked an `Escape` key listener, had no visible close button, and took up `w-72` (288px), which left almost no tap area for closing.
- **Remediation**: Added `w-72 max-w-[85vw]`, `useEffect` to lock `document.body.style.overflow = 'hidden'`, `Escape` key listener, and a dedicated `X` close button in the drawer brand header.
- **Verification**: Smooth opening, clear closing via backdrop tap, `X` tap, or `Escape` key, and zero background body jitter.

#### `DEF-RESP-06`: Copilot Drawer Mobile Usability
- **Root Cause**: Copilot drawer lacked a mobile backdrop on `<sm` and lacked an `Escape` key listener.
- **Remediation**: Added a dark blurred backdrop `<div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden" />` and `Escape` key event listener.
- **Verification**: Tapping outside or pressing Escape cleanly closes the Copilot drawer.

#### `DEF-RESP-07`: Hero Metrics Bar Font & Sizing on 320px
- **Root Cause**: Metric values used `text-2xl` with `p-4` inside a 3-column grid inside an already padded hero container. On 320px, total available width was ~240px (~80px per column), causing exposure `₹1,240 Cr` to clip.
- **Remediation**: Changed to `grid-cols-3 gap-1.5 sm:gap-3 p-2.5 sm:p-4`, with text sizing `text-lg sm:text-2xl font-bold font-mono`. Labels changed to `text-[9px] sm:text-[10px]`.
- **Verification**: All 3 numbers and labels fit with comfortable breathing room on 320px devices.

#### `DEF-RESP-08`: Category Tabs Wrapping Overflow
- **Root Cause**: 12 category buttons used `flex flex-wrap`, consuming 4 rows of vertical space on phones.
- **Remediation**: Changed to `flex overflow-x-auto no-scrollbar gap-1.5 pt-1 pb-1` with `shrink-0` on buttons.
- **Verification**: Single-row horizontal scroll with touch-friendly dragging on all mobile screens.

#### `DEF-RESP-09`: Workspace Issue Modal Cutoff
- **Root Cause**: Modal dialog had no max-height or internal overflow-y, causing action buttons at the bottom to be pushed off-screen on phones.
- **Remediation**: Added `max-h-[90vh] overflow-y-auto` and converted the bottom button group to `flex flex-col-reverse sm:flex-row`.
- **Verification**: Complete issue dossier, attachments, and action buttons are 100% accessible and operable on mobile.

#### `DEF-RESP-10`: Directory Subtabs & Hierarchy Tree Indentation
- **Root Cause**: Subtabs bar was a static flex row without horizontal scroll. Hierarchy tree used `level * 22 + 12px` padding left, causing deep nodes (tier 4+) to have 100px+ indent on 320px screens.
- **Remediation**: Added `overflow-x-auto no-scrollbar` to the subtabs container. Scaled tree indentation to `Math.min(level * 14 + 8, 48)px`.
- **Verification**: Deep hierarchy tree nodes remain fully readable and operable on 320px and 360px phones.

#### `DEF-RESP-11`: Chat Platform Mobile View Stacking
- **Root Cause**: Channels list (4 cols) and message stream (8 cols) rendered one after the other on mobile. Users had to scroll past all channels to see the chat window.
- **Remediation**: Introduced mobile view state toggle (`mobileView: 'channels' | 'chat'`). On mobile, clicking a channel transitions to the chat view with an `ArrowLeft` "← Back to Channels" button in the header. On desktop (`≥1024px`), both panes remain side-by-side.
- **Verification**: Native mobile chat experience on phones and tablet portrait, full split-pane experience on desktop.

#### `DEF-RESP-12` to `DEF-RESP-14`: Tab Pills & Modal Responsiveness
- **Root Cause**: Filter pills in `ExecutiveMeetingWorkspace`, `ExplorePlatform`, and modals in `App.tsx` lacked horizontal scroll styling or max-height constraints.
- **Remediation**: Added `overflow-x-auto no-scrollbar` and `shrink-0` to all pill containers; added `max-h-[90vh] overflow-y-auto` to all modals.
- **Verification**: All filters and modals operate smoothly on all screen sizes.
