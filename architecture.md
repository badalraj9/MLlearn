# MLearn - Architecture

## Design Principles

1. **Quality over quantity** - Every interactive element must deliver a genuine "aha" moment
2. **Performance is UX** - 60fps on all visualizations, instant math rendering
3. **Content-first** - The platform exists to serve the math, not the other way around
4. **Paper deconstruction is the differentiator** - Invest here
5. **Timeless aesthetic** - Clean, academic, textbook-quality design. No AI-generated looks:
   - No generic AI icons, robot brains, or circuit board motifs
   - No "AI" badges or glowing accents
   - Think: Khan Academy meets a well-designed academic journal
   - Think: serif headings, crisp typography, mathematical notation as design elements

---

## System Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           MLearn Architecture                            │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      PRESENTATION LAYER                          │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │    │
│  │  │  React App  │  │  Components │  │  Interactive Widgets   │  │    │
│  │  │  (SPA)      │  │  Library    │  │  (D3, Three.js, Sliders)│  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                      │
│                                    ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      CONTENT LAYER                              │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │    │
│  │  │  Concept    │  │  Paper      │  │  Learning Paths         │  │    │
│  │  │  Store      │  │  Store      │  │  (JSON)                │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                      │
│                                    ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      STATE MANAGEMENT                            │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │    │
│  │  │  Progress   │  │  UI State  │  │  Interaction State      │  │    │
│  │  │  (Supabase) │  │  (Zustand)  │  │  (React Context)       │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                      │
│                                    ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      BACKEND LAYER (Supabase)                    │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │    │
│  │  │  Auth       │  │  Postgres   │  │  Storage                │  │    │
│  │  │  (OAuth/    │  │  (Progress, │  │  (User content,         │  │    │
│  │  │   Email)    │  │  Bookmarks) │  │   annotations)          │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend

| Layer             | Technology            | Purpose                                 |
| ----------------- | --------------------- | --------------------------------------- |
| Framework         | React 19 + TypeScript | UI foundation                           |
| Styling           | Tailwind CSS          | Clean academic aesthetic                |
| Math Rendering    | MathJax 4             | Beautiful LaTeX equations               |
| 2D Visualizations | D3.js / Observable    | Graphs, charts, diagrams                |
| 3D Visualizations | Three.js              | Geometric intuition                     |
| Content Source    | JSON                  | Structured concept/paper data           |
| Content Rendering | MDX                   | Interactive content authoring from JSON |
| State             | Zustand               | Lightweight state management            |
| Routing           | React Router          | SPA navigation                          |

### Backend (Supabase)

| Layer    | Technology            | Purpose                          |
| -------- | --------------------- | -------------------------------- |
| Auth     | Supabase Auth         | Email/OAuth sign-in              |
| Database | Supabase Postgres     | Progress, bookmarks, annotations |
| Storage  | Supabase Storage      | User-generated content (future)  |
| Client   | @supabase/supabase-js | Frontend SDK                     |

### Build Tools

| Tool              | Purpose                   |
| ----------------- | ------------------------- |
| Vite              | Fast dev server and build |
| TypeScript        | Type safety               |
| ESLint + Prettier | Code quality              |

---

## Core Modules

### 1. Concept Node System

**Every concept must have an "aha moment"** - a specific insight that the learner gains through interaction.

```typescript
interface ConceptNode {
  id: string;
  title: string;
  slug: string;
  stage: "foundations" | "core-ml" | "deep-learning" | "research";
  prerequisites: string[];

  content: {
    intuition: string;
    mathematics: string;
    connections: RelatedConcept[];
  };

  interactions: Interaction[];
  problems: Problem[];

  // REQUIRED: What insight does this concept deliver?
  ahaMoment: string;
}
```

### 2. Paper Deconstructor

**This is the differentiator.** Papers are manually deconstructed into structured, explorable pieces — not auto-parsed.

```typescript
interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  arxivId?: string;
  originalPdfUrl?: string;

  abstract: string;
  keyContribution: string; // One-line summary of what this paper actually does

  sections: PaperSection[];
  readingModes: ReadingMode[];
  annotations: Annotation[];
  prerequisites: string[]; // Concept IDs the reader should know first
}

interface PaperSection {
  id: string;
  title: string;
  order: number;
  type:
    | "introduction"
    | "background"
    | "method"
    | "math"
    | "experiments"
    | "results"
    | "discussion";

  content: string; // The deconstructed explanation (not raw paper text)
  originalExcerpt?: string; // Direct quote from the paper for comparison
  mathematics?: string; // LaTeX for key equations in this section

  // Which reading modes include this section
  visibleIn: ReadingMode[];

  // Interactive elements embedded in this section
  interactions?: Interaction[];

  // Difficulty rating helps learners gauge effort
  difficulty: "accessible" | "moderate" | "advanced";
}

type ReadingMode = "overview" | "deep-dive" | "math-heavy" | "implementation";
// overview:        Key ideas only, skip proofs — 10 min read
// deep-dive:       Full deconstruction with all sections — 30-60 min
// math-heavy:      Focus on derivations and equations — for the mathematically inclined
// implementation:  Algorithm pseudocode and practical takeaways

interface Annotation {
  id: string;
  sectionId: string;
  type: "insight" | "clarification" | "connection" | "warning" | "historical";
  content: string;
  relatedConcepts?: string[]; // Links back to ConceptNode IDs
}
```

### 3. Learning Path

```typescript
interface LearningPath {
  id: string;
  title: string;
  description: string;
  stage: string;
  concepts: string[];
  estimatedHours: number;
}
```

### 4. Interaction & Problem Types

```typescript
interface Interaction {
  id: string;
  type:
    | "slider"
    | "2d-graph"
    | "3d-scene"
    | "proof-stepper"
    | "concept-graph"
    | "matrix-input";
  description: string;
  ahaMoment: string; // What insight does manipulating this deliver?
  config: Record<string, unknown>; // Widget-specific configuration
}

interface Problem {
  id: string;
  type:
    | "multiple-choice"
    | "derivation"
    | "proof"
    | "computation"
    | "conceptual";
  statement: string; // LaTeX-compatible problem text
  hints: string[]; // Progressive hints
  solution: string; // Full worked solution
  difficulty: "beginner" | "intermediate" | "advanced";
  relatedConcepts: string[]; // ConceptNode IDs
}
```

### 5. Interactive Widgets

| Widget       | Library  | Use Case              |
| ------------ | -------- | --------------------- |
| Slider       | React    | Variable manipulation |
| Graph2D      | D3.js    | 2D function plots     |
| Graph3D      | Three.js | 3D transformations    |
| ProofStepper | Custom   | Step-by-step proofs   |
| ConceptGraph | D3.js    | Knowledge map         |

---

## Data Flow

```
User Action
     │
     ▼
React Component
     │
     ▼
Interaction Handler
     │
     ├──► Widget State (local)
     │
     └──► Global State (Zustand)
              │
              ├──► Local Storage (offline cache)
              │
              └──► Supabase (progress, bookmarks, annotations)
```

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── math/
│   │   ├── MathJax.tsx
│   │   └── Equation.tsx
│   ├── widgets/
│   │   ├── Slider.tsx
│   │   ├── Graph2D.tsx
│   │   ├── Graph3D.tsx
│   │   └── ProofStepper.tsx
│   ├── concepts/
│   │   ├── ConceptView.tsx
│   │   ├── ConceptGraph.tsx
│   │   └── InteractionPanel.tsx
│   └── papers/
│       ├── PaperView.tsx
│       ├── PaperSection.tsx
│       └── Annotation.tsx
├── content/
│   ├── concepts/
│   ├── papers/
│   └── paths/
├── hooks/
│   ├── useProgress.ts
│   ├── useInteraction.ts
│   └── useConcept.ts
├── store/
│   └── index.ts
├── types/
│   └── index.ts
├── utils/
│   ├── math.ts
│   └── rendering.ts
└── App.tsx
```

---

## Content Format

**Source of truth: JSON files.** All concepts, papers, and learning paths are authored as structured JSON in `src/content/`. MDX is used at the rendering layer to compose JSON data with interactive React components — but the content itself lives in JSON.

### Concept JSON Structure

```json
{
  "id": "svd",
  "title": "Singular Value Decomposition",
  "slug": "singular-value-decomposition",
  "stage": "foundations",
  "prerequisites": ["eigenvalues", "matrix-multiplication"],
  "content": {
    "intuition": "SVD breaks a matrix into rotation-stretch-rotation...",
    "mathematics": "A = UΣVᵀ where U and V are orthogonal...",
    "visualizations": ["3d-rotation-stretch"]
  },
  "interactions": [
    {
      "id": "svd-3d-transform",
      "type": "3d-scene",
      "description": "Visualize matrix as geometric transformation",
      "ahaMoment": "Drag the singular values and watch how U and V rotate while Σ only stretches",
      "config": { "scene": "matrix-transform", "dimensions": 3 }
    }
  ],
  "problems": [
    {
      "id": "svd-compute-2x2",
      "type": "computation",
      "statement": "Compute the SVD of the matrix A = [[3, 0], [0, -2]]",
      "hints": ["This is a diagonal matrix — what does that simplify?"],
      "solution": "U = I, Σ = [[3, 0], [0, 2]], Vᵀ = [[1, 0], [0, -1]]",
      "difficulty": "beginner",
      "relatedConcepts": ["eigenvalues", "matrix-multiplication"]
    }
  ],
  "ahaMoment": "A matrix is just a geometric transformation - SVD shows you exactly how"
}
```

### Paper JSON Structure

```json
{
  "id": "attention-is-all-you-need",
  "title": "Attention Is All You Need",
  "authors": ["Vaswani", "Shazeer", "Parmar", "et al."],
  "year": 2017,
  "arxivId": "1706.03762",
  "keyContribution": "Replaces recurrence entirely with multi-head self-attention for sequence-to-sequence tasks",
  "prerequisites": ["attention-mechanism", "matrix-multiplication", "softmax"],
  "sections": [
    {
      "id": "attn-scaling",
      "title": "Why Scale by √d?",
      "order": 1,
      "type": "math",
      "content": "When d is large, dot products grow in magnitude, pushing softmax into saturated regions...",
      "originalExcerpt": "We suspect that for large values of d_k, the dot products grow large in magnitude...",
      "mathematics": "\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V",
      "visibleIn": ["overview", "deep-dive", "math-heavy"],
      "difficulty": "moderate",
      "interactions": [
        {
          "id": "attn-scale-slider",
          "type": "slider",
          "description": "Slide d_k and watch softmax output flatten or sharpen",
          "ahaMoment": "Without scaling, large d_k makes softmax nearly one-hot — the model can't learn",
          "config": { "param": "d_k", "range": [1, 512] }
        }
      ]
    }
  ],
  "annotations": [
    {
      "id": "attn-rnn-connection",
      "sectionId": "attn-scaling",
      "type": "connection",
      "content": "This scaling trick also appears in Bahdanau attention (2014), but there it was less critical because d was smaller.",
      "relatedConcepts": ["attention-mechanism"]
    }
  ],
  "readingModes": ["overview", "deep-dive", "math-heavy", "implementation"]
}
```

---

## External Integrations

| Service      | Purpose                    | Status   |
| ------------ | -------------------------- | -------- |
| Supabase     | Auth, Postgres DB, Storage | Required |
| arXiv API    | Paper metadata             | Future   |
| MathJax CDN  | Math rendering             | Required |
| D3.js CDN    | Visualizations             | Required |
| Three.js CDN | 3D graphics                | Required |

---

## Performance Standards

**These are requirements, not suggestions:**

- All visualizations must run at 60fps
- Math rendering must be instant (<100ms for standard equations)
- Interactions must feel responsive (<16ms response time)
- Lazy load 3D visualizations
- MathJax rendering in web workers for complex equations
- Concept graph virtualization for large datasets
- Local storage for offline progress

**The "feel" is the product.** If interactions lag or math looks ugly, the learning experience fails.
