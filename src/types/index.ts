// ===========================
// MLearn Core Type Definitions
// ===========================

export type Stage = "foundations" | "core-ml" | "deep-learning" | "research";

export type ReadingMode =
  | "overview"
  | "deep-dive"
  | "math-heavy"
  | "implementation";

export type InteractionType =
  | "slider"
  | "2d-graph"
  | "3d-scene"
  | "proof-stepper"
  | "concept-graph"
  | "matrix-input";

export type ProblemType =
  | "multiple-choice"
  | "derivation"
  | "proof"
  | "computation"
  | "conceptual";

export type AnnotationType =
  | "insight"
  | "clarification"
  | "connection"
  | "warning"
  | "historical";

export type SectionType =
  | "introduction"
  | "background"
  | "method"
  | "math"
  | "experiments"
  | "results"
  | "discussion";

export type Difficulty = "accessible" | "moderate" | "advanced";
export type ProblemDifficulty = "beginner" | "intermediate" | "advanced";

// --- Core Interfaces ---

export interface Interaction {
  id: string;
  type: InteractionType;
  description: string;
  ahaMoment: string;
  config: Record<string, unknown>;
}

export interface Problem {
  id: string;
  type: ProblemType;
  statement: string;
  hints: string[];
  solution: string;
  difficulty: ProblemDifficulty;
  relatedConcepts: string[];
}

export interface RelatedConcept {
  id: string;
  relationship: string;
}

export interface ConceptNode {
  id: string;
  title: string;
  slug: string;
  stage: Stage;
  prerequisites: string[];
  content: {
    intuition: string;
    mathematics: string;
    connections: RelatedConcept[];
  };
  interactions: Interaction[];
  problems: Problem[];
  ahaMoment: string;
}

// --- Paper Types ---

export interface PaperSection {
  id: string;
  title: string;
  order: number;
  type: SectionType;
  content: string;
  originalExcerpt?: string;
  mathematics?: string;
  visibleIn: ReadingMode[];
  interactions?: Interaction[];
  difficulty: Difficulty;
}

export interface Annotation {
  id: string;
  sectionId: string;
  type: AnnotationType;
  content: string;
  relatedConcepts?: string[];
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  arxivId?: string;
  originalPdfUrl?: string;
  abstract: string;
  keyContribution: string;
  sections: PaperSection[];
  readingModes: ReadingMode[];
  annotations: Annotation[];
  prerequisites: string[];
}

// --- Learning Path ---

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  stage: Stage;
  concepts: string[];
  estimatedHours: number;
}

// --- Modular Learning ---

// Chapter depth tiers: 1=Foundation, 2=Applied, 3=Advanced
export type ChapterTier = 1 | 2 | 3;

export interface ChapterLevel {
  tier: ChapterTier;
  title: string; // "Foundation" | "Applied" | "Advanced"
  cost: number; // coin cost to unlock (tier 1 = 0)
  content: {
    intro: string[];
    keyIdeas: string[];
    equations?: string[];
    references?: string[];
    ahaInsights?: string[]; // 💡 distinctive "aha moment" callouts
    equationSteps?: EquationStep[]; // step-by-step derivation viewer
    quiz?: QuizQuestion[]; // tier-specific quiz questions
  };
  playground?: PlaygroundConfig; // interactive widget for this tier
  codeContent?: CodeBlock; // code implementation of the same concept
}

export interface CodeBlock {
  language: string; // "python" | "typescript" | etc.
  code: string;
  description?: string; // brief code explanation
}

// --- Playground Types ---

export type PlaygroundType = "slider" | "equation" | "graph" | "code" | "widget";

export interface SliderParam {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

export interface PlaygroundConfig {
  type: PlaygroundType;
  // Slider mode (Foundation): drag to change values, see graph update
  sliders?: SliderParam[];
  // Equation mode (Advanced): edit equation string, see graph redraw
  equation?: string; // initial equation, e.g. "a * x^2 + b * x + c"
  // Graph: function expression to visualize
  graphFn?: string; // e.g. "sin(x * freq)" — uses mathjs syntax
  // Code: editable code snippet
  code?: string;
  // X-axis range for graph
  xRange?: [number, number];
  yRange?: [number, number];
  // Widget mode: render interactive widget by ID
  widgetId?: string;
}

export interface EquationStep {
  latex: string;
  explanation: string;
}

// --- Quiz Types ---

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// --- Review Tracking ---

export interface ReviewRecord {
  chapterId: string;
  lastReviewed: string; // ISO date
  nextReview: string; // ISO date — computed from spaced repetition
  streak: number; // consecutive correct reviews
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  prerequisites?: string[]; // chapter IDs that should be completed first
  levels: ChapterLevel[]; // always 3 tiers
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  project?: ProjectConfig; // unlockable mini-project after completing all chapters
}

export interface ProjectConfig {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  objectives: string[];
  starterCode?: string;
  estimatedTime: string; // e.g. "2 hours"
}

export interface Module {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

// --- Progress ---

export interface ConceptProgress {
  conceptId: string;
  completed: boolean;
  lastVisited: string;
  problemsAttempted: number;
  problemsSolved: number;
}

export interface UserProgress {
  concepts: Record<string, ConceptProgress>;
  bookmarks: string[];
}
