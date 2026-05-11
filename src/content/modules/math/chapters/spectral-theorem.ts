import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "spectral-theorem",
  title: "Spectral Theorem",
  description: "Diagonalization of symmetric matrices.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The spectral theorem states that every real symmetric matrix can be diagonalized by an orthonormal basis of eigenvectors. This is the backbone of many ML algorithms.",
          "Diagonalization turns a matrix into independent scaling along orthogonal directions. This makes quadratic forms and optimization problems easy to analyze.",
          "For positive semidefinite matrices, all eigenvalues are nonnegative, which guarantees convexity for many objectives.",
        ],
        keyIdeas: [
          "Real symmetric matrices have real eigenvalues",
          "Eigenvectors can be chosen orthonormal",
          "A = Q Lambda Q^T with Q orthonormal",
          "Quadratic forms decompose into sums of eigenvalues",
          "PSD matrices define convex energy landscapes",
          "Spectral decomposition generalizes to normal matrices",
        ],
        equations: [
          "\\[ A = Q \\Lambda Q^T \\]",
          "\\[ x^T A x = \\sum_i \\lambda_i (q_i^T x)^2 \\]",
          "\\[ A \\succeq 0 \\iff \\lambda_i \\ge 0 \\; \\forall i \\]",
        ],
        references: [
          "Strang - Linear Algebra and Its Applications, Ch. 6",
          "Axler - Linear Algebra Done Right",
          "Horn and Johnson - Matrix Analysis",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The Rayleigh quotient gives the maximum and minimum eigenvalues as optimization problems. This links spectral theory to variational principles.",
          "Many ML methods, like PCA and spectral clustering, reduce to eigenproblems of symmetric matrices.",
          "For PSD matrices, the eigen decomposition provides a square root and inverse square root used in whitening and preconditioning.",
        ],
        keyIdeas: [
          "Rayleigh quotient bounds eigenvalues",
          "Extremal eigenvectors solve constrained optimization problems",
          "Whitening uses A^{-1/2} to remove correlations",
          "Spectral clustering uses eigenvectors of graph Laplacians",
          "Eigenvalue gaps control stability of eigenvectors",
          "Orthogonal diagonalization simplifies matrix functions",
        ],
        equations: [
          "\\[ R_A(x) = \\frac{x^T A x}{x^T x} \\]",
          "\\[ \\lambda_{\\max} = \\max_{\\|x\\|=1} x^T A x \\]",
          "\\[ A^{1/2} = Q \\Lambda^{1/2} Q^T \\]",
        ],
        references: [
          "von Luxburg - A Tutorial on Spectral Clustering",
          "Bishop - Pattern Recognition and Machine Learning, Ch. 12",
          "Horn and Johnson - Matrix Analysis, Ch. 4",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Perturbation theory studies how eigenvalues and eigenvectors change under noise. The Davis-Kahan theorem provides sharp bounds used in robust PCA.",
          "Functional calculus lets you define f(A) for symmetric A by applying f to eigenvalues. This underlies matrix exponentials and diffusion processes on graphs.",
          "In high-dimensional statistics, random matrix theory predicts eigenvalue distributions and explains spectral shrinkage techniques.",
        ],
        keyIdeas: [
          "Davis-Kahan bounds subspace rotation under perturbations",
          "Matrix functions: f(A) = Q f(Lambda) Q^T",
          "Spectral filters shape signal processing on graphs",
          "Random matrix laws describe eigenvalue spectra",
          "Eigenvalue shrinkage improves covariance estimation",
          "Spectral gap determines stability and convergence rates",
        ],
        equations: [
          "\\[ \\|\\sin \\Theta(\\hat{U}, U)\\|_2 \\le \\frac{\\|E\\|_2}{\\delta} \\]",
          "\\[ f(A) = Q f(\\Lambda) Q^T \\]",
          "\\[ A_t = e^{-tL} \\quad \\text{(graph diffusion)} \\]",
        ],
        references: [
          "Davis and Kahan (1970) - Rotation of eigenvectors",
          "Tropp - An Introduction to Matrix Concentration",
          "Vershynin - High-Dimensional Probability",
        ],
      },
    },
  ],
};

export default chapter;
