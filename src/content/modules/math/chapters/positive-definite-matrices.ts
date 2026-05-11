import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "positive-definite-matrices",
  title: "Positive Definite Matrices",
  description: "Matrices with all positive eigenvalues and their role in optimization.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A positive definite (PD) matrix defines a quadratic form that is always positive except at zero. This guarantees convexity and stable optimization.",
          "Positive semidefinite (PSD) matrices allow zero directions and appear as covariance matrices and Gram matrices.",
          "Understanding PD matrices is essential for kernels, Gaussian distributions, and second-order methods.",
        ],
        keyIdeas: [
          "PD means x^T A x > 0 for all nonzero x",
          "PSD means x^T A x >= 0 for all x",
          "All eigenvalues are positive (or nonnegative for PSD)",
          "Cholesky factorization exists for PD matrices",
          "Covariance matrices are PSD",
          "Gram matrices from inner products are PSD",
        ],
        equations: [
          "\\[ x^T A x > 0 \\quad \\forall x \\ne 0 \\]",
          "\\[ A = R^T R \\quad (\\text{Cholesky}) \\]",
          "\\[ A \\succeq 0 \\iff \\lambda_i \\ge 0 \\]",
        ],
        references: [
          "Boyd and Vandenberghe - Convex Optimization, Ch. 2",
          "Horn and Johnson - Matrix Analysis",
          "Golub and Van Loan - Matrix Computations",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "PD matrices define norms and inner products via x^T A x. This generalizes Euclidean geometry.",
          "In optimization, PD Hessians guarantee local minima and enable Newton steps.",
          "PSD matrices enable kernel methods through the representer theorem.",
        ],
        keyIdeas: [
          "A induces a norm: \\|x\\|_A^2 = x^T A x",
          "Hessian PD implies strict convexity",
          "Eigenvalue bounds control conditioning",
          "PSD kernels correspond to valid inner products",
          "Schur complement tests PD properties of block matrices",
          "Regularization adds \\lambda I to enforce PD",
        ],
        equations: [
          "\\[ f \\text{ convex} \\iff \\nabla^2 f(x) \\succeq 0 \\]",
          "\\[ A \\succ 0 \\iff \\text{all leading principal minors} > 0 \\]",
          "\\[ K_{ij} = \\langle \\phi(x_i), \\phi(x_j) \\rangle \\]",
        ],
        references: [
          "Boyd and Vandenberghe - Convex Optimization, Ch. 4",
          "Scholkopf and Smola - Learning with Kernels",
          "Horn and Johnson - Matrix Analysis, Ch. 7",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "PSD constraints define semidefinite programs (SDPs), which generalize linear programs and appear in relaxations of hard problems.",
          "Matrix inequalities and the Loewner order provide a rich algebra for comparing PSD matrices.",
          "Spectral bounds and matrix concentration inequalities are built on PSD structure.",
        ],
        keyIdeas: [
          "SDPs optimize over PSD matrices with linear constraints",
          "Loewner order: A \\preceq B means B-A is PSD",
          "Schur complement gives equivalent PSD conditions",
          "Matrix Chernoff bounds require PSD summands",
          "PSD cones are convex but not polyhedral",
          "Kernel learning often enforces PSD via projection",
        ],
        equations: [
          "\\[ \\min_X \\; \\langle C, X \\rangle \\quad \\text{s.t.} \\; \\langle A_i, X \\rangle = b_i, \\; X \\succeq 0 \\]",
          "\\[ \\begin{pmatrix} A & B \\\\ B^T & C \\end{pmatrix} \\succeq 0 \\iff A \\succeq 0, \\; C - B^T A^{-1} B \\succeq 0 \\]",
          "\\[ 0 \\preceq A \\preceq B \\Rightarrow \\lambda_i(A) \\le \\lambda_i(B) \\]",
        ],
        references: [
          "Vandenberghe and Boyd (1996) - Semidefinite Programming",
          "Tropp - An Introduction to Matrix Concentration",
          "Bhatia - Positive Definite Matrices",
        ],
      },
    },
  ],
};

export default chapter;
