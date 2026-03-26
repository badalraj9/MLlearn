# Prompt: Build Missing Pages for MLearn

## Project Context

You are building a React 19 + TypeScript educational web app called **MLearn** - a Mathematical Learning Environment. The app teaches ML mathematics through an interactive book-like interface.

**Tech Stack:**
- React 19 (functional components)
- TypeScript with strict mode
- Vite
- Tailwind CSS + custom CSS tokens
- Zustand for state management
- React Router for routing
- MathJax via `better-react-mathjax`
- Supabase ready (auth integration)

---

## Design System You MUST Follow

### Colors (from `src/styles/tokens.css`)

**Light Mode (default):**
- `--bg-primary: #bf9f79` (desk background)
- `--bg-secondary: #f7f1e6` (page background)
- `--bg-tertiary: #efe3d4`
- `--text-primary: #2d2722` (ink)
- `--text-secondary: #4b433c`
- `--text-tertiary: #7a7169`
- `--accent-primary: #b46a4c` (terracotta)
- `--accent-hover: #9f5a40`
- `--accent-subtle: #f0e1d7`
- `--border: #ddcdbb`

**Dark Mode:**
- `--bg-primary: #121214`
- `--bg-secondary: #1b1b20`
- `--text-primary: #ededec`
- `--accent-primary: #60a5fa`

### Typography
- **Headings & Body:** Century Gothic, Futura, Avenir Next, Segoe UI
- **Code:** JetBrains Mono

### CSS Classes Available
Use Tailwind utilities + these custom classes:
- `.btn-primary` - Terracotta accent button
- `.btn-secondary` - Outline button
- `.card` - Content card with subtle shadow
- `.page-content` - Main content wrapper
- `.section-block` - Content section
- `.input-field` - Styled form input
- `.form-group` - Form field wrapper

---

## Existing Store Structure (Zustand)

### Progress Store (`useProgressStore`)
```typescript
interface ProgressState {
  progress: UserProgress; // { concepts: {}, bookmarks: [] }
  markConceptVisited: (conceptId: string) => void;
  markConceptCompleted: (conceptId: string) => void;
  toggleBookmark: (conceptId: string) => void;
  isBookmarked: (conceptId: string) => boolean;
}
```

### Learning Store (`useLearningStore`)
```typescript
interface LearningState {
  coins: number;
  unlockedChapterTiers: Record<string, ChapterTier[]>;
  completedChapterTiers: Record<string, ChapterTier[]>;
  reviewRecords: Record<string, ReviewRecord>;
  
  earnCoins: (amount: number) => void;
  unlockChapterTier: (chapterId: string, tier: ChapterTier, cost: number) => boolean;
  completeChapterTier: (chapterId: string, tier: ChapterTier) => void;
  isChapterTierUnlocked: (chapterId: string, tier: ChapterTier) => boolean;
  isChapterTierCompleted: (chapterId: string, tier: ChapterTier) => boolean;
  markReviewed: (chapterId: string, correct: boolean) => void;
  getChaptersDueForReview: () => ReviewRecord[];
  getCompletionStats: () => { totalChapters, completedChapters, totalTiers, completedTiers };
}
```

### UI Store (`useUIStore`)
```typescript
interface UIState {
  sidebarCollapsed: boolean;
  darkMode: boolean;
  activeReadingMode: ReadingMode;
  bindingPosition: "top" | "side";
  pageFlipMode: "top" | "side";
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setReadingMode: (mode: ReadingMode) => void;
  setBindingPosition: (position: "top" | "side") => void;
  setPageFlipMode: (mode: "top" | "side") => void;
}
```

---

## Component Pattern to Follow

**Always use this structure:**

```typescript
import { useState } from "react";
import { SomeIcon } from "lucide-react";
import { useUIStore } from "@/store";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  const darkMode = useUIStore((state) => state.darkMode);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // handler logic
  };

  return (
    <div className="page-content">
      <h1>{title}</h1>
      <button className="btn-primary" onClick={handleClick}>
        <SomeIcon size={18} />
        Action
      </button>
    </div>
  );
}
```

**Key rules:**
- Use `import type` for types
- Use `@/` path alias for internal imports
- Use `lucide-react` for icons
- Use Tailwind classes + custom CSS tokens via `var(--variable-name)`
- Default export for pages, named export for utilities

---

## Pages to Create

### 1. Sign In Page (`src/pages/SignIn.tsx`)

**Requirements:**
- Email input field
- Password input field
- "Sign In" button (btn-primary)
- "Don't have an account? Sign Up" link → `/signup`
- "Forgot password?" link
- Supabase auth integration (use `supabase.auth.signInWithPassword`)
- Error handling with inline messages
- Loading state on button

**Behavior:**
- On success: redirect to `/modules`
- Store user session in localStorage via Supabase

---

### 2. Sign Up Page (`src/pages/SignUp.tsx`)

**Requirements:**
- Full name input
- Email input
- Password input (min 8 chars)
- Confirm password input
- "Create Account" button (btn-primary)
- "Already have an account? Sign In" link → `/signin`
- Supabase auth integration (use `supabase.auth.signUp`)
- Error handling with inline messages

**Behavior:**
- On success: redirect to `/signin` with success message, or auto-login and go to `/modules`

---

### 3. Settings Page (`src/pages/Settings.tsx`)

**Requirements:**
- **Appearance Section:**
  - Dark mode toggle (use `useUIStore.toggleDarkMode`)
  - Theme preference indicator

- **Reading Preferences:**
  - Binding position toggle: "Top" / "Side" (use `useUIStore.setBindingPosition`)
  - Page flip mode: "Top" / "Side" (use `useUIStore.setPageFlipMode`)

- **Account Section:**
  - Display current email
  - "Sign Out" button (calls Supabase `signOut`, redirects to `/`)

- **Data Section:**
  - "Reset Progress" button (with confirmation modal)
  - "Clear All Data" button (with confirmation modal)

**Use card styling for each section.**

---

### 4. Profile Page (`src/pages/Profile.tsx`)

**Requirements:**
- **User Info:**
  - Avatar placeholder (initials from email)
  - Display name or email
  - Member since date

- **Stats Cards (grid layout):**
  - Total Coins (from `useLearningStore.coins`)
  - Chapters Completed (from `getCompletionStats().completedChapters`)
  - Topics Visited (count of visited concepts)
  - Current Streak (from review records)

- **Progress Section:**
  - Visual progress bar: completedTiers / totalTiers
  - Breakdown: Foundations, Core ML, Deep Learning, Research stages

- **Recent Activity:**
  - List of recently completed chapters
  - List of bookmarks (use `useProgressStore.progress.bookmarks`)

- **Quick Actions:**
  - "Continue Learning" → `/modules`
  - "View Progress" → `/graph`

---

### 5. Polished Landing Page (`src/pages/HomePage.tsx` - redesign)

**Current state:** Too basic

**Requirements:**
- **Hero Section:**
  - Compelling headline: "Master Machine Learning Through Mathematics"
  - Subheadline explaining the platform
  - Two CTAs: "Start Learning" (primary), "View Curriculum" (secondary)

- **Features Section:**
  - 3-4 feature cards with icons:
    - "Interactive Visualizations" - D3/Three.js widgets
    - "Learn by Doing" - Hands-on exercises
    - "Paper Deconstructions" - Research paper breakdowns
    - "Track Your Progress" - Gamified learning

- **Curriculum Preview:**
  - Show the 4 tracks: Math Foundations, Core ML, Deep Learning, Research
  - Clickable → `/modules`

- **Social Proof:**
  - "Join X learners" stat (mock data ok for now)

- **Footer:**
  - Links to about, GitHub, etc.

---

## Routing Updates

Add these routes to `src/App.tsx`:

```typescript
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import SettingsPage from "@/pages/Settings";
import ProfilePage from "@/pages/Profile";

// Add routes:
<Route path="/signin" element={<SignInPage />} />
<Route path="/signup" element={<SignUpPage />} />
<Route path="/settings" element={<SettingsPage />} />
<Route path="/profile" element={<ProfilePage />} />
```

**Note:** SignIn/SignUp should NOT use the Layout (no header/sidebar). Use a clean centered card layout.

---

## File Locations

Create files at:
- `src/pages/SignIn.tsx`
- `src/pages/SignUp.tsx`
- `src/pages/Settings.tsx`
- `src/pages/Profile.tsx`

Update:
- `src/App.tsx` (add routes)
- `src/components/layout/TopNav.tsx` (add profile/settings links)

---

## Important Notes

1. **No Layout wrapper** for auth pages - they should be full-screen centered forms
2. Use **Tailwind** for all styling (no custom CSS files unless absolutely necessary)
3. Follow the **exact component pattern** shown above
4. Use **Zustand stores** for all state (no useState for global state)
5. Icons from **lucide-react** only
6. Handle **loading states** and **error states** properly
7. Use **Link** from react-router-dom for navigation
8. Use **navigate** from react-router-dom for programmatic redirects

---

## Testing Checklist

After creating files:
1. Run `npm run lint` - fix any errors
2. Run `npm run build` - ensure production build works
3. Navigate to each new page and verify:
   - Page loads without crash
   - Forms show validation errors properly
   - Buttons show loading state
   - Navigation works
   - Dark/light mode toggles work

---

## Deliverables

1. `src/pages/SignIn.tsx`
2. `src/pages/SignUp.tsx`
3. `src/pages/Settings.tsx`
4. `src/pages/Profile.tsx`
5. Updated `src/App.tsx` with new routes
6. Updated `src/components/layout/TopNav.tsx` with nav links