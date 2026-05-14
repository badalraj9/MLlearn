# Continuity Log — Session 1

## Date
2026-05-13

## What Was Built

### 1. Global Background — Loss Landscape
- `src/components/widgets/LossLandscapeHero.tsx`
- Fixed full-viewport canvas behind all content (`z-index: 0`, `pointer-events: none`)
- 34x34 grid morphing through 7 neural network loss landscapes
- Autonomous morph cycle (2.5s rest + 4s transition per shape)
- Gradient descent path (precomputed, lerped during morph — stable, no flicker)
- Edge fade, cream editorial colors (valleys rgba(218,210,196,0.55) → peaks rgba(244,240,233,0.25))
- 7 floating math equations, constellation dots, axis lines
- No mouse interaction — pure atmospheric background

### 2. Authentication Page — Redesign
- `src/pages/AuthPage.tsx` (combined signin/signup)
- Replaced `src/pages/SignIn.tsx` and `src/pages/SignUp.tsx`
- Asymmetric split layout (63%/37%) — left publication cover, right archival portal
- Giant argmin ℒ(θ) watermark, ∇ℒ(θ)=0 trace, ∫ equation residue
- Vertical "ARCHIVE ACCESS" label, MS-004 accession number
- Underline inputs with research-oriented labels ("Identity / Email", "Archive Key")
- "Access Archive →" / "Register →" text CTAs
- **NOT functional** — Supabase is placeholder, sign-in mocks navigation to `/`

### 3. Bottom Nav — Translucency Fix
- Added `background: rgba(248, 247, 244, 0.82)` to `.top-nav` in `globals.css`
- Prevents nav from vanishing over the background landscape

### 4. Papers Page — arXiv Live Feed
- `src/pages/PapersPage.tsx` — two-tier layout
- **Tier 1**: Live feed of 20 latest cs.LG papers from arXiv API
  - `src/lib/arxiv.ts` — XML parser for arXiv Atom feed
  - `vite.config.ts` — dev proxy `/api/arxiv` → `export.arxiv.org`
  - Each entry shows: arXiv ID, title, authors, year, abstract (3-line clamp)
  - "arXiv →" link, "Deconstruct" button (disabled — Tier 2 not built)
  - "Load more →" pagination
- **Tier 3**: Existing authored paper bibliography ("Attention Is All You Need")
- `PaperDetailPage.tsx` — reading modes, math blocks, interactive widgets

### 5. Deleted/Deprecated
- `src/components/widgets/LossLandscape.tsx` (replaced by Hero version)
- `src/pages/SignIn.tsx` (replaced by AuthPage)
- `src/pages/SignUp.tsx` (replaced by AuthPage)

---

## What's Next (Priority Order)

### P1 — Auth Backend
Auth UI is built but non-functional. Two paths:
- **Supabase**: Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars
- **Neon DB** (preferred): User said to ditch Supabase for Neon due to India access issues.
  Needs: Neon project setup + auth provider configuration

### P2 — Tier 2: "Request Deconstruction" Pipeline
The "Deconstruct" button on arXiv papers is disabled. To enable:
1. Set up backend (Neon DB for persistence)
2. Create endpoint/supabase function that takes arXiv paper URL → fetches paper → calls LLM → stores structured result
3. Generate sections with reading modes, math blocks, annotations
4. Render AI-deconstructed papers in PaperDetailPage alongside authored ones
5. 10-paper quota per user, 7-day expiry

### P3 — Papers Page Polish
- Search/filter for arXiv feed (by keyword, category)
- Caching to avoid re-fetching on every navigation
- Remove remaining boxed UI styles from PaperDetailPage

### P4 — More Content
- More hand-authored deep dives (currently only "Attention Is All You Need")
- More chapter modules

### P5 — General Refinement
- Mobile responsiveness check
- Equation typography precision
- Derivation choreography on chapter pages

---

## Key Architecture Decisions

| Decision | Status |
|----------|--------|
| No model training code | ✓ Enforced |
| No cloud compute features | ✓ Enforced |
| No video hosting | ✓ Enforced |
| No code execution environments | ✓ Enforced |
| No dataset management | ✓ Enforced |
| Path aliases `@/` → `src/*` | ✓ Set |
| Supabase client | ✗ Placeholder — needs replacement or env vars |
| Neon DB | Planned — preferred over Supabase |
| Auth | Planned — UI ready, backend missing |

---

## Quick Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```
