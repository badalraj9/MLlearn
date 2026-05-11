import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "matrix-decomposition",
  title: "Matrix Decomposition (LU, QR)",
  description: "Factoring matrices into structured components.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Matrix decompositions break a matrix into simpler pieces that are easier to compute with or interpret.",
          "Different decompositions serve different purposes: QR for least squares, LU for solving linear systems, and Cholesky for symmetric positive definite matrices.",
          "In ML, decompositions are essential for stability, speed, and insight into structure.",
        ],
        keyIdeas: [
          "LU factorization expresses A as lower and upper triangular matrices",
          "QR factorization expresses A as orthonormal times upper triangular",
          "Cholesky is specialized for symmetric positive definite matrices",
          "Triangular systems are cheap to solve by substitution",
          "Pivoting improves numerical stability in LU",
          "Decompositions reduce computational complexity for repeated solves",
        ],
        equations: [
          "\\[ A = L U \\]",
          "\\[ A = Q R \\]",
          "\\[ A = R^T R \\quad (\\text{Cholesky}) \\]",
        ],
        references: [
          "Golub and Van Loan - Matrix Computations, Ch. 3",
          "Trefethen and Bau - Numerical Linear Algebra",
          "Strang - Linear Algebra and Its Applications",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "QR factorization solves least squares without forming A^T A, which improves numerical stability.",
          "Cholesky decomposes covariance matrices and enables efficient Gaussian computations and sampling.",
          "Householder reflections and Givens rotations are standard algorithms for stable QR factorization.",
        ],
        keyIdeas: [
          "Normal equations can be unstable; QR is preferred",
          "Cholesky provides fast solves for SPD matrices",
          "Householder reflections are stable and efficient",
          "Givens rotations are useful for sparse matrices",
          "Pivoted QR reveals numerical rank",
          "LDL^T decomposition avoids square roots",
        ],
        equations: [
          "\\[ x_{LS} = R^{-1} Q^T b \\]",
          "\\[ A = L D L^T \\]",
          "\\[ Q^T Q = I \\]",
        ],
        references: [
          "Bjork - Numerical Methods for Least Squares Problems",
          "Golub and Van Loan - Matrix Computations, Ch. 5",
          "Higham - Accuracy and Stability of Numerical Algorithms",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "For large-scale problems, iterative methods and low-rank updates replace explicit decompositions. These methods exploit sparsity and structure.",
          "Eigen and singular value decompositions are specialized spectral factorizations that power PCA, whitening, and spectral methods.",
          "Randomized decompositions trade small approximation error for huge speedups on big data.",
        ],
        keyIdeas: [
          "Sparse LU and QR reduce fill-in with ordering heuristics",
          "Low-rank updates use the Sherman-Morrison-Woodbury identity",
          "Randomized QR and SVD scale to massive matrices",
          "Block algorithms improve cache efficiency",
          "Krylov methods approximate factorizations iteratively",
          "Preconditioning uses approximate decompositions to speed convergence",
        ],
        equations: [
          "\\[ (A + U C V)^{-1} = A^{-1} - A^{-1} U (C^{-1} + V A^{-1} U)^{-1} V A^{-1} \\]",
          "\\[ A \\approx Q B \\quad (\\text{randomized range finder}) \\]",
          "\\[ A = V \\Lambda V^T \\]",
        ],
        references: [
          "Halko, Martinsson, Tropp (2011) - Randomized SVD",
          "Saad - Iterative Methods for Sparse Linear Systems",
          "Davis - Direct Methods for Sparse Linear Systems",
        ],
      },
    },
  ],
};

export default chapter;
