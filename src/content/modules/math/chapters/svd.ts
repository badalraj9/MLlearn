import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "svd",
  title: "SVD",
  description: "Singular Value Decomposition and its applications.",
  prerequisites: ["vector-spaces", "linear-transformations", "matrix-decomposition"],
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The singular value decomposition says any matrix can be understood as three geometric operations in sequence: rotate, stretch, rotate. That is why SVD is one of the clearest ways to understand what a matrix really does.",
          "A matrix maps the unit sphere into an ellipsoid. The right singular vectors tell you which input directions are special, the singular values tell you how much those directions are stretched, and the left singular vectors tell you where they land in output space.",
          "The theorem works for rectangular matrices too, which is why it appears in least squares, PCA, compression, denoising, and numerical linear algebra.",
        ],
        keyIdeas: [
          "Every matrix A can be factorized as U Sigma V^T.",
          "Columns of V are important input directions.",
          "Columns of U are the corresponding output directions.",
          "Singular values measure how strongly the matrix stretches each direction.",
          "Rapidly decaying singular values indicate approximate low-rank structure.",
        ],
        equations: [
          "\\[ A = U \\Sigma V^T \\]",
          "\\[ A^T A = V \\Sigma^2 V^T \\]",
          "\\[ A A^T = U \\Sigma^2 U^T \\]",
        ],
        ahaInsights: [
          "SVD is not just a factorization trick. It is the coordinate system in which the matrix becomes easiest to understand.",
          "A matrix can look complicated in standard coordinates while being almost diagonal in its singular-vector basis.",
        ],
        equationSteps: [
          {
            latex: "\\[ A^T A v_i = \\sigma_i^2 v_i \\]",
            explanation: "Start with A^T A. Its eigenvectors define the special input directions because it is symmetric and positive semidefinite.",
          },
          {
            latex: "\\[ u_i = \\frac{A v_i}{\\sigma_i} \\]",
            explanation: "Map each right singular vector through A and normalize it. This gives the corresponding left singular vector.",
          },
          {
            latex: "\\[ A v_i = \\sigma_i u_i \\]",
            explanation: "This is the core geometric relation: the matrix sends each special input direction to a stretched output direction.",
          },
          {
            latex: "\\[ A = U \\Sigma V^T \\]",
            explanation: "Collect all singular vectors and singular values into matrices to obtain the full factorization.",
          },
        ],
        quiz: [
          {
            id: "svd-foundation-1",
            question: "What do the singular values measure?",
            options: [
              "How much the matrix stretches special directions",
              "The determinant of the matrix",
              "The angle between columns of U",
              "The bias term of the transformation",
            ],
            correctIndex: 0,
            explanation: "Each singular value is the stretch factor along a singular-vector direction.",
          },
          {
            id: "svd-foundation-2",
            question: "Why is SVD more general than eigendecomposition?",
            options: [
              "It works for rectangular matrices",
              "It requires fewer computations in every case",
              "It only uses real numbers",
              "It avoids orthogonality entirely",
            ],
            correctIndex: 0,
            explanation: "Eigen decomposition is mainly for square matrices, while SVD works for any m by n matrix.",
          },
        ],
        references: [
          "Strang - Introduction to Linear Algebra, Chapter 7",
          "Trefethen and Bau - Numerical Linear Algebra",
        ],
      },
      playground: {
        type: "slider",
        graphFn: "min(abs(a), 3) + min(abs(b), 3) * x / 5",
        sliders: [
          { id: "a", label: "Top singular value", min: 0.1, max: 3, step: 0.1, default: 2 },
          { id: "b", label: "Second singular value", min: 0, max: 3, step: 0.1, default: 0.7 },
        ],
        xRange: [-5, 5],
        yRange: [-5, 5],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In practice, SVD is the workhorse behind low-rank approximation. If a matrix contains signal plus noise, the top singular values often capture the meaningful structure and the small singular values mostly capture noise or redundancy.",
          "That is why SVD powers PCA, latent semantic analysis, collaborative filtering, and image compression. Keeping only the top k singular directions gives the best rank-k approximation in a precise sense.",
          "SVD also gives the numerically stable route to least squares and pseudoinverses. When a matrix is ill-conditioned, normal equations can magnify error, but the singular values make the instability visible immediately.",
        ],
        keyIdeas: [
          "Truncated SVD is the best low-rank approximation under common norms.",
          "The pseudoinverse is built by inverting nonzero singular values.",
          "Condition number is controlled by the ratio of largest to smallest singular value.",
          "PCA directions are singular vectors of centered data.",
          "Low-rank structure often means the data has hidden redundancy.",
        ],
        equations: [
          "\\[ A_k = U_k \\Sigma_k V_k^T \\]",
          "\\[ A^+ = V \\Sigma^+ U^T \\]",
          "\\[ \\kappa(A) = \\frac{\\sigma_{max}}{\\sigma_{min}} \\]",
        ],
        ahaInsights: [
          "Compression by SVD is not arbitrary. It is optimal among all rank-k linear approximations.",
          "Small singular values are the coordinates where numerical errors get amplified the most.",
        ],
        quiz: [
          {
            id: "svd-applied-1",
            question: "What happens when you keep only the top k singular values?",
            options: [
              "You get the best rank-k approximation of the matrix",
              "You compute its eigendecomposition",
              "You guarantee exact reconstruction",
              "You remove all numerical instability",
            ],
            correctIndex: 0,
            explanation: "The Eckart-Young theorem says truncated SVD is optimal among rank-k approximations.",
          },
        ],
        references: [
          "Golub and Van Loan - Matrix Computations",
          "Jolliffe - Principal Component Analysis",
          "Hansen - Rank-Deficient and Discrete Ill-Posed Problems",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The advanced theory of SVD explains why it is so central in modern ML: it controls approximation error, numerical stability, subspace recovery, and convex relaxations for low-rank structure.",
          "The Eckart-Young-Mirsky theorem proves that truncated SVD is optimal in both spectral and Frobenius norm. That single theorem justifies much of low-rank compression and denoising.",
          "At scale, exact SVD can be expensive, so randomized SVD and sketching methods approximate the dominant singular subspaces efficiently. This matters for large embeddings, covariance matrices, and representation learning pipelines.",
        ],
        keyIdeas: [
          "Eckart-Young-Mirsky gives exact optimality guarantees for truncation.",
          "Perturbation theory explains how singular vectors move under noise.",
          "Randomized SVD trades exactness for major speed gains on large matrices.",
          "Nuclear norm methods use singular values as a convex proxy for rank.",
        ],
        equations: [
          "\\[ A_k = \\arg\\min_{\\operatorname{rank}(B) \\le k} \\|A - B\\|_F \\]",
          "\\[ \\|A - A_k\\|_2 = \\sigma_{k+1} \\]",
          "\\[ \\min_B \\|A - B\\|_F^2 + \\lambda \\|B\\|_* \\]",
        ],
        quiz: [
          {
            id: "svd-advanced-1",
            question: "What quantity equals the spectral-norm error of the best rank-k approximation?",
            options: [
              "The next singular value sigma_{k+1}",
              "The trace of Sigma",
              "The determinant of A",
              "The kth right singular vector",
            ],
            correctIndex: 0,
            explanation: "The spectral error of the optimal rank-k approximation is exactly the next singular value.",
          },
        ],
        references: [
          "Eckart and Young (1936) - The Approximation of One Matrix by Another of Lower Rank",
          "Halko, Martinsson, Tropp (2011) - Finding Structure with Randomness",
          "Stewart and Sun - Matrix Perturbation Theory",
        ],
      },
    },
  ],
};

export default chapter;
