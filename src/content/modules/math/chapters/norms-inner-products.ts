import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "norms-inner-products",
  title: "Norms & Inner Products",
  description: "Measuring length, distance, and angles in vector spaces.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Norms measure the size of vectors, while inner products measure angles and similarity. These concepts define geometry in vector spaces.",
          "Many ML algorithms depend on distances and projections, which are defined by norms and inner products.",
          "Choosing different norms changes optimization behavior and inductive bias.",
        ],
        keyIdeas: [
          "Norms satisfy positivity, homogeneity, and triangle inequality",
          "Inner products induce norms via \\|x\\| = sqrt(<x,x>)",
          "The Cauchy-Schwarz inequality bounds inner products",
          "Orthogonality means inner product equals zero",
          "Dual norms define constraint and regularization pairs",
          "Different norms produce different geometry and sparsity",
        ],
        equations: [
          "\\[ \\|x\\|_2 = \\sqrt{\\langle x, x \\rangle} \\]",
          "\\[ |\\langle x, y \\rangle| \\le \\|x\\| \\|y\\| \\]",
          "\\[ \\|x\\|_p = \\left( \\sum_i |x_i|^p \\right)^{1/p} \\]",
        ],
        references: [
          "Kreyszig - Introductory Functional Analysis",
          "Strang - Introduction to Linear Algebra, Ch. 3",
          "Boyd and Vandenberghe - Convex Optimization, Ch. 2",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Dual norms arise naturally in optimization, especially in regularization and constrained formulations.",
          "Norm equivalence in finite dimensions means all norms are topologically equivalent, though constants matter for conditioning.",
          "Inner products define projections and least squares solutions.",
        ],
        keyIdeas: [
          "Dual norm: \\|y\\|_* = max_{\\|x\\|\\le 1} x^T y",
          "Holder inequality generalizes Cauchy-Schwarz",
          "Projection onto a subspace minimizes Euclidean distance",
          "Norm equivalence bounds show all norms are comparable",
          "Operator norms measure linear map sensitivity",
          "L1 promotes sparsity; L2 promotes smoothness",
        ],
        equations: [
          "\\[ \\|y\\|_* = \\max_{\\|x\\| \\le 1} x^T y \\]",
          "\\[ \\|x\\|_p \\le n^{(1/p - 1/q)} \\|x\\|_q \\quad (p \\ge q) \\]",
          "\\[ P = Q Q^T \\quad (\\text{orthogonal projection}) \\]",
        ],
        references: [
          "Boyd and Vandenberghe - Convex Optimization, Ch. 3",
          "Bubeck - Convex Optimization: Algorithms and Complexity",
          "Kreyszig - Introductory Functional Analysis",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "In Hilbert spaces, inner products define complete normed spaces with strong geometric structure. This is the setting for kernel methods and Gaussian processes.",
          "In Banach spaces, norms exist without inner products, which affects optimization and convergence guarantees.",
          "Operator norms and spectral norms govern stability of iterative algorithms and neural networks.",
        ],
        keyIdeas: [
          "Hilbert spaces generalize Euclidean geometry",
          "Banach spaces lack inner products but allow norms",
          "Riesz representation links linear functionals to inner products",
          "Spectral norm equals largest singular value",
          "Subgradient calculus depends on chosen norm",
          "Smoothness and strong convexity are norm-dependent",
        ],
        equations: [
          "\\[ \\|A\\|_2 = \\max_{\\|x\\|_2=1} \\|Ax\\|_2 = \\sigma_{\\max}(A) \\]",
          "\\[ f(y) = \\langle y, x_f \\rangle \\quad (\\text{Riesz representation}) \\]",
          "\\[ \\mu \\|x-y\\|^2 \\le \\langle \\nabla f(x) - \\nabla f(y), x-y \\rangle \\]",
        ],
        references: [
          "Conway - A Course in Functional Analysis",
          "Pisier - The Volume of Convex Bodies and Banach Space Geometry",
          "Nesterov - Introductory Lectures on Convex Optimization",
        ],
      },
    },
  ],
};

export default chapter;
