import type { Module } from "@/types";

export const modules: Module[] = [
  {
    id: "math",
    title: "Mathematical Foundations",
    description:
      "Linear algebra, calculus, probability, and optimization essentials for ML.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "Build comfort with notation and intuition.",
        chapters: [
          {
            id: "vectors",
            title: "Vectors & Spaces",
            description: "Geometry, notation, and intuition.",
            topics: [
              {
                id: "vector-basics",
                title: "Vector Basics",
                summary: "Magnitude, direction, and coordinates.",
                assessmentPrompt:
                  "Explain vector magnitude and direction with a simple example.",
              },
              {
                id: "basis",
                title: "Bases & Span",
                summary: "How vectors build spaces.",
                assessmentPrompt:
                  "Describe what it means for vectors to span a space.",
              },
              {
                id: "linear-combo",
                title: "Linear Combinations",
                summary: "Mixing vectors to form new ones.",
                assessmentPrompt:
                  "Solve a small linear combination problem.",
              },
            ],
          },
          {
            id: "matrices",
            title: "Matrices",
            description: "Transformations and structure.",
            topics: [
              {
                id: "matrix-mult",
                title: "Matrix Multiplication",
                summary: "Composing transformations.",
                assessmentPrompt:
                  "Explain why order matters in matrix multiplication.",
              },
              {
                id: "determinant",
                title: "Determinant",
                summary: "Area/volume scaling.",
                assessmentPrompt:
                  "Interpret determinant as a geometric scaling factor.",
              },
            ],
          },
        ],
      },
      {
        id: "apprentice",
        title: "Apprentice",
        description: "Formalize core definitions and proofs.",
        chapters: [
          {
            id: "eigen",
            title: "Eigen Concepts",
            description: "Eigenvectors and eigenvalues.",
            topics: [
              {
                id: "eigen-meaning",
                title: "Eigenvectors Intuition",
                summary: "Invariant directions.",
                assessmentPrompt:
                  "Describe how eigenvectors behave under transformation.",
              },
              {
                id: "eigen-calc",
                title: "Computing Eigenvalues",
                summary: "Characteristic polynomial basics.",
                assessmentPrompt:
                  "Solve a 2x2 eigenvalue example.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ml-theory",
    title: "ML Theory",
    description: "Bias-variance, generalization, and learning dynamics.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "High-level intuition for learning.",
        chapters: [
          {
            id: "bias-variance",
            title: "Bias-Variance",
            description: "Trade-offs in modeling.",
            topics: [
              {
                id: "bias",
                title: "Understanding Bias",
                summary: "Systematic error sources.",
                assessmentPrompt:
                  "Give an example of a high-bias model.",
              },
              {
                id: "variance",
                title: "Understanding Variance",
                summary: "Sensitivity to data.",
                assessmentPrompt:
                  "Explain why high variance hurts generalization.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "algorithms",
    title: "Algorithms",
    description: "Classic ML algorithms and their math foundations.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "Start with linear models.",
        chapters: [
          {
            id: "regression",
            title: "Regression",
            description: "Least squares and gradients.",
            topics: [
              {
                id: "linear-regression",
                title: "Linear Regression",
                summary: "Fit a line to data.",
                assessmentPrompt:
                  "Derive the loss for a linear regression model.",
              },
              {
                id: "gradient-descent",
                title: "Gradient Descent",
                summary: "Optimization fundamentals.",
                assessmentPrompt:
                  "Explain why gradients indicate steepest ascent.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "research",
    title: "Research Papers",
    description: "Deconstruct papers with structured guidance.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "Learn how to read papers.",
        chapters: [
          {
            id: "reading",
            title: "Paper Reading",
            description: "Abstract to method flow.",
            topics: [
              {
                id: "paper-anatomy",
                title: "Paper Anatomy",
                summary: "What each section does.",
                assessmentPrompt:
                  "Summarize the purpose of a paper's method section.",
              },
            ],
          },
        ],
      },
    ],
  },
];
