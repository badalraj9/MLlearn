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
