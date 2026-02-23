import type { ConceptNode } from "@/types";

export const concepts: ConceptNode[] = [
  {
    id: "svd",
    title: "Singular Value Decomposition",
    slug: "singular-value-decomposition",
    stage: "foundations",
    prerequisites: ["eigenvalues", "matrix-multiplication"],
    content: {
      intuition:
        'Every matrix, no matter how complex, is doing exactly three things: rotating, stretching, and rotating again. SVD is the decomposition that reveals these three operations explicitly.\n\nImagine you have a grid of points forming a unit circle. When you multiply by a matrix A, that circle gets transformed — it might stretch, skew, or rotate. SVD tells you the precise geometry: first rotate by V\u1d40, then stretch along the axes by Σ, then rotate again by U.\n\nThe singular values (the diagonal of Σ) tell you HOW MUCH the matrix stretches in each direction. If a singular value is near zero, that dimension is being "crushed" — this is the mathematical basis for dimensionality reduction, data compression, and understanding matrix rank.',
      mathematics:
        "For any m×n matrix A, there exist orthogonal matrices U (m×m) and V (n×n), and a diagonal matrix Σ (m×n) with non-negative entries σ₁ ≥ σ₂ ≥ ... ≥ σᵣ ≥ 0, such that:\n\nA = UΣVᵀ\n\nwhere:\n- U contains the left singular vectors (eigenvectors of AAᵀ)\n- V contains the right singular vectors (eigenvectors of AᵀA)\n- Σ contains the singular values (square roots of eigenvalues of AᵀA)\n\nThe rank of A equals the number of non-zero singular values. The best rank-k approximation of A (in Frobenius norm) is obtained by keeping only the k largest singular values.",
      connections: [
        {
          id: "eigenvalues",
          relationship:
            "SVD generalizes eigendecomposition to non-square matrices",
        },
        { id: "pca", relationship: "PCA is SVD applied to centered data" },
      ],
    },
    interactions: [
      {
        id: "svd-2d-transform",
        type: "2d-graph",
        description:
          "Watch how SVD decomposes a 2D linear transformation into rotate → stretch → rotate",
        ahaMoment:
          "See the unit circle transform step-by-step through each SVD component",
        config: { scene: "matrix-transform", dimensions: 2 },
      },
    ],
    problems: [
      {
        id: "svd-diagonal",
        type: "computation",
        statement: "Compute the SVD of A = [[3, 0], [0, -2]]",
        hints: [
          "A diagonal matrix — what does that simplify?",
          "The singular values are the absolute values of the diagonal entries.",
        ],
        solution:
          "U = I, Σ = [[3, 0], [0, 2]], Vᵀ = [[1, 0], [0, -1]]. Since A is diagonal, the singular values are |3| = 3 and |-2| = 2. The sign of -2 is absorbed into V.",
        difficulty: "beginner",
        relatedConcepts: ["eigenvalues"],
      },
      {
        id: "svd-rank1",
        type: "conceptual",
        statement:
          "If a 100×100 matrix has only 1 non-zero singular value, how many numbers do you actually need to represent it?",
        hints: [
          "A rank-1 matrix can be written as the outer product of two vectors.",
          "How many entries does each vector have?",
        ],
        solution:
          "Only 201 numbers: the singular value σ₁, plus the 100-dimensional vectors u₁ and v₁ (A = σ₁u₁v₁ᵀ). This is a compression from 10,000 to 201 entries.",
        difficulty: "intermediate",
        relatedConcepts: ["pca"],
      },
    ],
    ahaMoment:
      "A matrix is just a geometric transformation — SVD shows you exactly how",
  },
  {
    id: "gradient-descent",
    title: "Gradient Descent",
    slug: "gradient-descent",
    stage: "foundations",
    prerequisites: ["partial-derivatives"],
    content: {
      intuition:
        "Imagine you're blindfolded on a hilly landscape, and you need to find the lowest valley. Your only tool: you can feel the slope of the ground beneath your feet. Gradient descent is the strategy of always stepping downhill — in the steepest direction.\n\nThe gradient ∇f(x) points in the direction of steepest ASCENT. So to minimize, you step in the opposite direction: x_new = x_old - α·∇f(x_old), where α (the learning rate) controls how big each step is.\n\nToo large a step? You overshoot and bounce around. Too small? You'll take forever to reach the bottom. This tension — and the techniques to resolve it (momentum, adaptive learning rates) — is the heart of optimization in ML.",
      mathematics:
        "The gradient descent update rule:\n\nxₜ₊₁ = xₜ - α∇f(xₜ)\n\nwhere α > 0 is the learning rate and ∇f(xₜ) is the gradient of f at xₜ.\n\nConvergence guarantee: For a convex function with L-Lipschitz continuous gradients, with step size α = 1/L:\n\nf(xₜ) - f(x*) ≤ L·‖x₀ - x*‖² / (2t)\n\nThis is an O(1/t) convergence rate.",
      connections: [
        {
          id: "backpropagation",
          relationship:
            "Backprop computes the gradients that gradient descent uses",
        },
        {
          id: "sgd",
          relationship:
            "SGD is gradient descent with noisy gradient estimates from mini-batches",
        },
      ],
    },
    interactions: [
      {
        id: "gd-2d-contour",
        type: "2d-graph",
        description: "Watch gradient descent navigate a 2D loss landscape",
        ahaMoment:
          "Adjust the learning rate and watch: too high = diverge, too low = crawl, just right = converge",
        config: { type: "contour", learningRateRange: [0.001, 1.0] },
      },
    ],
    problems: [
      {
        id: "gd-quadratic",
        type: "computation",
        statement:
          "Apply one step of gradient descent to f(x) = x² at x₀ = 3 with α = 0.1",
        hints: [
          "What is the derivative of x²?",
          "Plug into x₁ = x₀ - α·f'(x₀)",
        ],
        solution:
          "f'(x) = 2x, so f'(3) = 6. Then x₁ = 3 - 0.1·6 = 3 - 0.6 = 2.4. We moved closer to the minimum at x=0.",
        difficulty: "beginner",
        relatedConcepts: ["partial-derivatives"],
      },
    ],
    ahaMoment:
      "The learning rate is the key — too high and you overshoot, too low and you never arrive",
  },
  {
    id: "bayes-theorem",
    title: "Bayes' Theorem",
    slug: "bayes-theorem",
    stage: "foundations",
    prerequisites: ["probability-basics"],
    content: {
      intuition:
        "Bayes' theorem is the math of updating beliefs with evidence. You start with a prior belief (how likely something was before you saw any data), observe evidence, and arrive at a posterior belief (how likely it is now).\n\nClassic example: A medical test is 99% accurate. You test positive. How worried should you be? Naively, 99% seems like bad news. But if the disease affects only 1 in 10,000 people, even with a positive test, you probably DON'T have it — because false positives vastly outnumber true positives in a rare-disease population.\n\nBayes' theorem formalizes exactly this reasoning, and it's the foundation of all probabilistic machine learning.",
      mathematics:
        "P(A|B) = P(B|A) · P(A) / P(B)\n\nwhere:\n- P(A|B) is the posterior: probability of A given we observed B\n- P(B|A) is the likelihood: probability of observing B if A is true\n- P(A) is the prior: probability of A before seeing evidence\n- P(B) is the evidence: total probability of observing B\n\nThe denominator can be expanded: P(B) = P(B|A)P(A) + P(B|¬A)P(¬A)",
      connections: [
        {
          id: "naive-bayes",
          relationship:
            "Naive Bayes classifier applies Bayes theorem with independence assumption",
        },
        {
          id: "bayesian-inference",
          relationship:
            "Bayesian inference generalizes this to continuous parameter distributions",
        },
      ],
    },
    interactions: [
      {
        id: "bayes-medical-test",
        type: "slider",
        description:
          "Adjust disease prevalence and test accuracy to see how the posterior changes",
        ahaMoment:
          "With rare diseases, even a highly accurate test gives surprising results — that's the base rate fallacy",
        config: { prevalenceRange: [0.0001, 0.1], accuracyRange: [0.8, 0.999] },
      },
    ],
    problems: [
      {
        id: "bayes-spam",
        type: "computation",
        statement:
          "An email filter knows: P(spam) = 0.3, P('free'|spam) = 0.8, P('free'|not spam) = 0.1. What's P(spam|'free')?",
        hints: [
          "Apply Bayes' theorem directly",
          "Don't forget to compute P('free') using the law of total probability",
        ],
        solution:
          "P(spam|'free') = P('free'|spam)·P(spam) / P('free') = 0.8·0.3 / (0.8·0.3 + 0.1·0.7) = 0.24 / 0.31 ≈ 0.774",
        difficulty: "beginner",
        relatedConcepts: ["probability-basics"],
      },
    ],
    ahaMoment:
      "Your prior beliefs matter as much as the evidence — that's why rare diseases trick us even with accurate tests",
  },
];

export function getConceptBySlug(slug: string): ConceptNode | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getConceptsByStage(stage: string): ConceptNode[] {
  if (stage === "all") return concepts;
  return concepts.filter((c) => c.stage === stage);
}
