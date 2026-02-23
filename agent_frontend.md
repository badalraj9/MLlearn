# MLearn - Frontend Design Specification

> **Purpose:** Complete visual and aesthetic reference for the MLearn frontend. This document is the single source of truth for how MLearn looks and feels. If in doubt, refer here.

---

## Design Identity

**One-liner:** Khan Academy meets a beautifully typeset academic journal.

### What MLearn looks like

- A clean, confident, academic platform
- Mathematical notation as a design element, not decoration
- Generous whitespace, readable typography, calm color palette
- Feels like opening a well-designed textbook on a modern screen

### What MLearn does NOT look like

- ❌ Generic AI/ML product (no robot icons, circuit boards, glowing neural nets)
- ❌ Dark mode neon cyberpunk
- ❌ Glassmorphism, overused gradients, or frosted glass cards
- ❌ Corporate dashboards with excessive charts and metrics
- ❌ Trendy startup landing pages with oversized hero sections
- ❌ "AI-generated" aesthetic — no badges, sparkles, or gradient text

---

## Typography

### Font Stack

| Role           | Font             | Fallback              | Weight   |
| -------------- | ---------------- | --------------------- | -------- |
| Headings       | Playfair Display | Georgia, serif        | 600, 700 |
| Body text      | Inter            | system-ui, sans-serif | 400, 500 |
| Math / Code    | JetBrains Mono   | monospace             | 400      |
| Math equations | MathJax (LaTeX)  | —                     | —        |

### Type Scale

| Element              | Size            | Line Height | Weight | Notes                        |
| -------------------- | --------------- | ----------- | ------ | ---------------------------- |
| Page title (h1)      | 2.5rem (40px)   | 1.2         | 700    | Playfair Display, serif      |
| Section heading (h2) | 1.75rem (28px)  | 1.3         | 600    | Playfair Display             |
| Subsection (h3)      | 1.25rem (20px)  | 1.4         | 600    | Inter, semi-bold             |
| Body text            | 1.063rem (17px) | 1.7         | 400    | Inter, optimized for reading |
| Small / caption      | 0.875rem (14px) | 1.5         | 400    | Inter                        |
| Code / math labels   | 0.9rem (14.4px) | 1.5         | 400    | JetBrains Mono               |

### Typography Rules

- Body text max width: **680px** (optimal reading measure)
- Paragraph spacing: **1.5em**
- Headings always have **significant top margin** (2-3em) to create visual sections
- Math equations get **vertical breathing room** — 1.5em padding above and below inline blocks
- Never use all-caps for headings

---

## Color Palette

### Light Mode (Default & Primary)

| Token              | Hex       | Usage                             |
| ------------------ | --------- | --------------------------------- |
| `--bg-primary`     | `#FAFAF8` | Page background (warm off-white)  |
| `--bg-secondary`   | `#F2F0EC` | Card backgrounds, sidebars        |
| `--bg-tertiary`    | `#E8E5DF` | Hover states, subtle borders      |
| `--text-primary`   | `#1A1A1A` | Headings, primary text            |
| `--text-secondary` | `#4A4A4A` | Body text                         |
| `--text-tertiary`  | `#7A7A7A` | Captions, hints, metadata         |
| `--accent-primary` | `#2563EB` | Links, active states, CTAs        |
| `--accent-hover`   | `#1D4ED8` | Link hover                        |
| `--accent-subtle`  | `#EFF6FF` | Accent backgrounds                |
| `--border`         | `#E2DFD9` | Borders, dividers                 |
| `--success`        | `#16A34A` | Correct answers, completed        |
| `--warning`        | `#D97706` | Hints, partial progress           |
| `--error`          | `#DC2626` | Incorrect answers                 |
| `--math-bg`        | `#F8F7F4` | Background behind equation blocks |

### Dark Mode (User-toggled, NOT default)

| Token              | Hex       | Usage           |
| ------------------ | --------- | --------------- |
| `--bg-primary`     | `#1A1A1E` | Page background |
| `--bg-secondary`   | `#242428` | Cards, sidebars |
| `--bg-tertiary`    | `#2E2E34` | Hover, borders  |
| `--text-primary`   | `#EDEDEC` | Headings        |
| `--text-secondary` | `#B8B8B4` | Body            |
| `--text-tertiary`  | `#787874` | Captions        |
| `--accent-primary` | `#60A5FA` | Links           |
| `--math-bg`        | `#22222A` | Equation blocks |

> **Rule:** Dark mode is optional and toggled by the user. Light mode is always the default. Dark mode should feel muted and warm — never neon.

---

## Spacing System

Use a **4px base unit** with Tailwind classes:

| Token | Value | Common use                 |
| ----- | ----- | -------------------------- |
| `xs`  | 4px   | Inline icon gaps           |
| `sm`  | 8px   | Tight padding              |
| `md`  | 16px  | Card padding, element gaps |
| `lg`  | 24px  | Section spacing            |
| `xl`  | 32px  | Component separation       |
| `2xl` | 48px  | Major section breaks       |
| `3xl` | 64px  | Page-level vertical rhythm |

---

## Component Design Language

### Cards

- Background: `--bg-secondary`
- Border: 1px solid `--border`
- Border radius: **8px**
- Padding: **24px**
- Shadow: `0 1px 3px rgba(0,0,0,0.04)` — barely visible, just enough to lift
- Hover: shadow increases to `0 2px 8px rgba(0,0,0,0.08)`, border to `--accent-primary`
- **No gradients on cards. No glassmorphism.**

### Buttons

| Type      | Style                                                     |
| --------- | --------------------------------------------------------- |
| Primary   | `--accent-primary` bg, white text, 8px radius, 500 weight |
| Secondary | transparent bg, `--accent-primary` border, accent text    |
| Ghost     | no border, accent text, hover bg `--accent-subtle`        |

- All buttons: **40px min height**, **16px horizontal padding**
- Subtle scale on press: `transform: scale(0.98)` with 100ms transition
- No dropshadows on buttons

### Navigation / Sidebar

- Left sidebar, collapsible
- Background: `--bg-secondary`
- Active item: `--accent-subtle` background with `--accent-primary` left border (3px)
- Width: **260px** expanded, **64px** collapsed (icons only)
- Smooth collapse animation: **200ms ease-out**

### Interactive Widget Containers

- Distinct from content cards — use a subtle left border accent (3px `--accent-primary`)
- Background: `--bg-primary` (not secondary — they should feel embedded, not floating)
- Always include a small label/caption below: _"Drag to explore"_ or _"Adjust the slider"_
- Rounded corners: 8px
- Min height: **300px** for 2D, **400px** for 3D

### Math Equation Blocks

- Centered, with `--math-bg` background
- Padding: **24px vertical, 32px horizontal**
- Border radius: **6px**
- Optional: subtle left border (2px `--text-tertiary`) for important/key equations
- Inline equations: no special background, seamless with text flow

---

## Page Layouts

### Concept Page

```
┌──────────────────────────────────────────────────────┐
│  [Breadcrumb: Foundations > Linear Algebra > SVD]     │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  h1: Singular Value Decomposition                │  │
│  │  Prereqs: Eigenvalues, Matrix Multiplication     │  │
│  │  Stage badge: Foundations                          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ── Intuition ────────────────────────────────────────  │
│  Body text explaining the concept plainly...           │
│                                                        │
│  ┌─ Interactive Widget ─────────────────────────────┐  │
│  │  [3D visualization of matrix transformation]     │  │
│  │  "Drag singular values to see rotation vs stretch"│  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ── Mathematics ──────────────────────────────────────  │
│  LaTeX equations with step-by-step derivation          │
│                                                        │
│  ── Problems ─────────────────────────────────────────  │
│  Collapsible problem cards with hints and solutions    │
│                                                        │
│  ── Connections ──────────────────────────────────────  │
│  Related concept links as small cards                  │
└──────────────────────────────────────────────────────┘
```

### Paper Deconstructor Page

```
┌──────────────────────────────────────────────────────┐
│  h1: Attention Is All You Need                        │
│  Authors · Year · arXiv link                          │
│                                                        │
│  ┌─ Reading Mode Tabs ──────────────────────────────┐  │
│  │  [Overview] [Deep Dive] [Math Heavy] [Implement] │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  Key Contribution (highlighted card)                   │
│  Prerequisites (linked concept chips)                  │
│                                                        │
│  ── Section 1: Why Scale by √d? ─────────────────────  │
│  Deconstructed explanation...                          │
│  "Original paper says:" [blockquote excerpt]           │
│  [Equation block]                                      │
│  [Interactive: Slider for d_k]                         │
│  [Annotation: connection to Bahdanau 2014]             │
│                                                        │
│  ── Section 2: ... ──────────────────────────────────  │
└──────────────────────────────────────────────────────┘
```

### Concept Graph Page

- Full-width, interactive D3 force-directed graph
- Nodes: circles with concept title, colored by stage
- Edges: prerequisite relationships (directed arrows)
- Click node → navigate to concept page
- Hover → show tooltip with concept `ahaMoment`
- Zoom + pan enabled
- Stage color coding:
  - Foundations: `#2563EB` (blue)
  - Core ML: `#7C3AED` (purple)
  - Deep Learning: `#DC2626` (red)
  - Research: `#D97706` (amber)

---

## Animations & Transitions

### Principles

- Animations should feel **functional**, not decorative
- Everything should feel **responsive and immediate**
- Prefer CSS transitions over JS animations where possible

### Specs

| Element                  | Duration | Easing      | Notes                                  |
| ------------------------ | -------- | ----------- | -------------------------------------- |
| Page transitions         | 200ms    | ease-out    | Fade + slight upward slide (8px)       |
| Card hover               | 150ms    | ease        | Shadow + border color change           |
| Sidebar collapse         | 200ms    | ease-out    | Width transition                       |
| Button press             | 100ms    | ease        | Scale to 0.98                          |
| Widget value change      | 16ms     | —           | Must be at requestAnimationFrame speed |
| Math equation fade-in    | 300ms    | ease-in     | Subtle opacity from 0.6 → 1            |
| Tooltip show             | 150ms    | ease-out    | Fade + scale from 0.95                 |
| Reading mode tab switch  | 250ms    | ease-in-out | Content crossfade                      |
| Concept graph node hover | 100ms    | ease        | Scale to 1.1                           |
| Progress bar fill        | 500ms    | ease-out    | Smooth width animation                 |

### Rules

- **Never** use bounce or elastic easing — it feels playful, not academic
- **Never** add animation delay to critical interactions (widget sliders, graph dragging)
- Loading states: use a subtle pulse animation (opacity 0.5 → 1, 1s loop), never spinners
- Skeleton screens for content loading — match card shapes with `--bg-tertiary` rectangles

---

## Reading Mode Aesthetics (Paper Deconstructor)

Each reading mode should have a **subtle visual identity** without changing the overall design:

| Mode           | Visual Cue                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| Overview       | Default styling, shorter content, progress indicator at top                |
| Deep Dive      | Full content, section numbers visible, table of contents sidebar           |
| Math Heavy     | Equation blocks more prominent (larger padding), derivation steps numbered |
| Implementation | Code blocks styled with `--math-bg`, pseudocode in JetBrains Mono          |

Switching modes uses a **tab bar** at the top of the paper page. Active tab has a bottom border (3px `--accent-primary`). Content transitions use a 250ms crossfade.

---

## Responsive Breakpoints

| Breakpoint | Width       | Layout changes                                               |
| ---------- | ----------- | ------------------------------------------------------------ |
| Mobile     | < 640px     | Sidebar hidden, single column, equations scroll horizontally |
| Tablet     | 640-1024px  | Sidebar collapsible, concept graph simplified                |
| Desktop    | 1024-1440px | Full layout, sidebar expanded                                |
| Wide       | > 1440px    | Content centered with max-width 1200px                       |

### Mobile-specific rules

- Widgets must remain interactive (touch targets ≥ 44px)
- Math equations: horizontal scroll if overflow, never shrink font
- Concept graph: simplified view, list fallback option
- Sidebar becomes bottom nav or hamburger menu

---

## Iconography

- Use **Lucide React** icons (consistent, clean, MIT licensed)
- Icon size: **20px** default, **16px** small, **24px** large
- Icon color: always `--text-tertiary` unless active/interactive
- Active icon color: `--accent-primary`
- **Never** use filled/solid icons — always outline/stroke style
- No emoji as UI elements

---

## Accessibility Baseline

- Color contrast: WCAG AA minimum (4.5:1 for body text, 3:1 for large text)
- All interactive widgets: keyboard navigable
- Math equations: MathJax `aria-label` enabled
- Focus rings: 2px `--accent-primary` outline, 2px offset
- Skip-to-content link on every page
- Reduced motion: respect `prefers-reduced-motion`, disable all non-essential animations
- Screen reader: all widgets must have descriptive `aria-label`

---

## File Naming & CSS Organization

### Tailwind Usage

- Use Tailwind utility classes for layout, spacing, sizing
- Use CSS custom properties (the tokens above) for colors and theming
- Define tokens in `src/styles/tokens.css` and import globally
- Component-specific styles only when Tailwind can't express it

### CSS Files

| File                        | Purpose                                          |
| --------------------------- | ------------------------------------------------ |
| `src/styles/tokens.css`     | Color, spacing, typography CSS custom properties |
| `src/styles/globals.css`    | Tailwind directives, base resets, font imports   |
| `src/styles/math.css`       | MathJax overrides and equation block styling     |
| `src/styles/animations.css` | Keyframes and transition utilities               |

---

## Quick Reference: Design Decisions

| Question           | Answer                                       |
| ------------------ | -------------------------------------------- |
| Default mode?      | Light                                        |
| Serif or sans?     | Serif headings (Playfair), sans body (Inter) |
| Gradients?         | No                                           |
| Shadows?           | Minimal — 1px subtle lift only               |
| Border radius?     | 8px cards, 6px inputs, 4px small elements    |
| Primary accent?    | Blue `#2563EB`                               |
| Icon library?      | Lucide React                                 |
| Animation style?   | Functional, never decorative                 |
| Content max-width? | 680px for reading, 1200px for full layouts   |
| Font size body?    | 17px                                         |
| Math renderer?     | MathJax 4                                    |
