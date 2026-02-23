# Agent Instructions

## Project Overview

MLearn is a Mathematical Learning Environment - an interactive platform for learning ML mathematics through visualizations, proofs, and paper deconstructions.

**Core Philosophy:**

- This is a content + interaction app, NOT a compute platform
- No model training, no cloud infrastructure
- Focus on mathematical intuition and understanding
- Interactive > Passive content

---

## What You Can Work On

### Frontend Development

- React components with TypeScript
- Interactive widgets (D3.js, Three.js)
- Math rendering with MathJax
- Tailwind CSS styling

### Content Creation

- Concept JSON files in `src/content/concepts/`
- Paper JSON files in `src/content/papers/`
- Learning paths in `src/content/paths/`

### Backend (Supabase)

- Auth (email/OAuth sign-in)
- Progress tracking and bookmarks (Postgres)
- User annotations (Postgres)
- Use `@supabase/supabase-js` client — no custom backend code

### Bug Fixes

- Component bugs
- Math rendering issues
- Interaction problems

---

## What You Should NOT Do

- ❌ Add model training code
- ❌ Add cloud compute features
- ❌ Add video content hosting
- ❌ Add code execution environments
- ❌ Add dataset management
- ❌ Create enterprise/LMS features

---

## Guidelines

1. **Stay on scope** - This is a math learning platform
2. **Quality over quantity** - Every feature must deliver a genuine "aha" moment
3. **Use TypeScript** - All new code should be typed
4. **Use Tailwind** - For styling, not custom CSS
5. **Test interactions** - Make sure widgets work smoothly (60fps)
6. **Check math rendering** - Verify equations display instantly and correctly
7. **Polish before moving on** - Better to have 5 perfect features than 20 half-done ones
8. **Design aesthetic** - Clean, academic, timeless. Think textbook meets modern app. Avoid the typical AI-generated look:
   - ❌ No generic AI icons, robot brains, or circuit board motifs
   - ❌ No "AI" badges or glowing accents
   - ❌ No dark mode by default with neon accents
   - ❌ No trendy glassmorphism or overused gradients
   - ✅ Think: clean white/off-white, serif headings (Merriweather/Playfair), crisp typography
   - ✅ Think: mathematical notation as design elements
   - ✅ Think: Khan Academy meets a well-designed academic journal

---

## Key Files

- `src/components/` - React components
- `src/content/` - JSON content files (source of truth for all concepts/papers)
- `src/types/` - TypeScript definitions
- `src/lib/supabase.ts` - Supabase client setup
- `plan.md` - Project plan
- `architecture.md` - Technical architecture

---

## Priority Concepts (Proof of Vision)

Build these first. They demonstrate what MLearn can do:

1. **SVD** - 3D matrix transformation (linear algebra anchor)
2. **Attention** - Why √d matters (deep learning anchor)
3. **Backpropagation** - Computational graph stepper (core ML anchor)
4. **Gradient Descent** - 3D terrain visualization (optimization anchor)
5. **Bayes' Theorem** - Prior → Posterior animation (probability anchor)

Each must deliver a genuine "aha" moment. If it doesn't, iterate until it does.

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # Lint code
npm run typecheck # Type check
```
