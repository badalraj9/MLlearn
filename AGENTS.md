# Agent Guidelines for MLearn

This file provides coding guidelines and commands for agents working on the MLearn project.

## Project Overview

MLearn is a Mathematical Learning Environment - an interactive platform for learning ML mathematics through visualizations, proofs, and paper deconstructions. It uses React 19, TypeScript, Vite, Tailwind CSS, and Zustand for state management.

## Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Production build (tsc -b && vite build)
npm run lint             # Run ESLint on all files
npm run preview          # Preview production build locally

# Type checking (via tsc)
npx tsc --noEmit         # Type check without emitting files
```

**Note:** There are currently no test commands configured. Do not add test frameworks without consulting the user.

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode**: Enabled in `tsconfig.app.json`
- **Path aliases**: Use `@/*` to import from `src/*` (e.g., `import { Button } from "@/components/ui/Button"`)
- **Module resolution**: Bundler mode (`moduleResolution: "bundler"`)
- **Verbatim module syntax**: Use `import type` for type-only imports

### Import Conventions
```typescript
// External imports (alphabetical order)
import { useState } from "react";
import type { SomeType } from "some-package";

// Internal imports (use @ alias, alphabetical order)
import Layout from "@/components/layout/Layout";
import { useUIStore } from "@/store";

// Group order: 1) external libs, 2) internal components/hooks, 3) types, 4) utils
```

### Component Patterns
- Use functional components with explicit return types when needed
- Props interfaces should be defined above the component
- Use default exports for page components, named exports for utilities
- Keep components focused and small (under 200 lines preferred)

```typescript
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ChapterStrips.tsx`, `QuizWidget.tsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useProgressStore`)
- **Types/Interfaces**: PascalCase (e.g., `UserProgress`, `ChapterTier`)
- **Constants**: PascalCase for exports, camelCase for internals
- **Files**: camelCase for utilities, PascalCase for components

### State Management
- Use **Zustand** for global state (see `src/store/index.ts`)
- Use React's built-in `useState` and `useReducer` for local state
- Persist store data with Zustand's `persist` middleware

```typescript
interface MyState {
  value: string;
  updateValue: (val: string) => void;
}

export const useMyStore = create<MyState>((set) => ({
  value: "",
  updateValue: (val) => set({ value: val }),
}));
```

### Styling with Tailwind
- Use Tailwind utility classes exclusively (no custom CSS files)
- Use semantic class names that describe content, not appearance
- Keep custom styles in `src/styles/` for global styles only

### Error Handling
- Use try/catch for async operations with user-friendly error messages
- Display errors inline rather than console.log
- Use TypeScript's type system to prevent runtime errors

### MathJax Integration
- Wrap math content with `<MATH>` tags or use `better-react-mathjax` components
- Test that equations render correctly on page load

### Accessibility
- Use semantic HTML elements
- Include alt text for images
- Ensure keyboard navigation works for all interactive elements
- Use ARIA labels where necessary

## What NOT To Do

- Do NOT add model training code
- Do NOT add cloud compute features
- Do NOT add video content hosting
- Do NOT add code execution environments
- Do NOT add dataset management features
- Do NOT create enterprise/LMS features
- Do NOT use custom CSS when Tailwind can achieve the same result
- Do NOT add test frameworks without user approval

## Design Philosophy

- **Quality over quantity** - Every feature must deliver a genuine "aha" moment
- **Performance is UX** - 60fps on all visualizations
- **Content-first** - The platform serves the math
- **Timeless aesthetic** - Clean, academic, textbook-quality design

Avoid:
- Generic AI icons, robot brains, or circuit board motifs
- "AI" badges or glowing accents
- Dark mode by default with neon accents
- Trendy glassmorphism or overused gradients

Prefer:
- Clean white/off-white backgrounds
- Serif headings (Merriweather/Playfair)
- Mathematical notation as design elements
- Khan Academy meets a well-designed academic journal

## Key Directories

```
src/
├── components/      # React components (organized by feature)
├── content/        # JSON content files (concepts, papers, paths)
├── pages/          # Route page components
├── store/         # Zustand stores (UI, Progress, Learning)
├── types/         # TypeScript type definitions
├── styles/        # Global CSS styles
└── assets/        # Static assets (images, fonts)
```

## Important Files

- `package.json` - Dependencies and scripts
- `tsconfig.app.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules
- `vite.config.ts` - Vite bundler configuration
- `src/store/index.ts` - Zustand stores
- `src/types/` - All TypeScript definitions
- `agent.md` - Detailed project context
- `architecture.md` - System architecture details
- `plan.md` - Project roadmap

## Supabase Integration

When adding backend features:
- Use `@supabase/supabase-js` client only
- Create tables in Supabase dashboard, not in code
- No custom backend code - all logic in Supabase (RLS, triggers, functions)
- See `src/lib/supabase.ts` for client setup

## Linting Notes

- ESLint is configured with React hooks and React Refresh plugins
- No unused locals/parameters checks (disabled in tsconfig)
- Run `npm run lint` before committing
- Fix warnings as they appear

## Working on This Project

1. Run `npm run dev` to start the development server
2. Make changes and verify with hot reload
3. Run `npm run lint` to check code quality
4. Run `npm run build` to verify production build works
5. Test interactions work smoothly (target 60fps)
6. Verify math rendering displays correctly