import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "linear-transformations",
  title: "Linear Transformations",
  description: "Mappings between vector spaces that preserve structure.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A linear transformation is a function that preserves addition and scaling. It models how vectors are stretched, rotated, or projected.",
          "Every linear transformation can be represented by a matrix once a basis is chosen. This connects geometry to computation.",
          "Linear maps are the backbone of neural networks, dimensionality reduction, and linear models.",
        ],
        keyIdeas: [
          "Linearity: T(ax + by) = aT(x) + bT(y)",
          "Matrix representation depends on the chosen basis",
          "Kernel (null space) captures inputs mapped to zero",
          "Image (range) captures achievable outputs",
          "Rank-nullity links input dimension to kernel and image",
          "Composition of linear maps corresponds to matrix multiplication",
        ],
        equations: [
          "\\[ T(x) = A x \\]",
          "\\[ \\text{ker}(T) = \\{x : Ax = 0\\}, \\quad \\text{im}(T) = \\{Ax : x\\} \\]",
          "\\[ \\dim(\\text{ker}(T)) + \\dim(\\text{im}(T)) = n \\]",
        ],
        references: [
          "Strang - Introduction to Linear Algebra, Ch. 3",
          "Lay - Linear Algebra and Its Applications",
          "Axler - Linear Algebra Done Right",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Change of basis transforms the matrix representation of a linear map. The underlying transformation is the same, but coordinates change.",
          "Eigenvalues and eigenvectors characterize invariant directions of linear maps, simplifying repeated application.",
          "Many ML operations are linear maps: convolution, embedding lookup, and projections are all linear transformations.",
        ],
        keyIdeas: [
          "Similarity transforms encode change of basis",
          "Diagonalizable maps are easiest to analyze",
          "Projection matrices satisfy P^2 = P",
          "Orthogonal projections minimize squared distance",
          "Linear maps can be decomposed into basis vectors",
          "Spectral properties govern stability of iteration",
        ],
        equations: [
          "\\[ [T]_B = P^{-1} A P \\]",
          "\\[ A v = \\lambda v \\]",
          "\\[ P = Q Q^T \\quad (Q \\text{ has orthonormal columns}) \\]",
        ],
        references: [
          "Strang - Introduction to Linear Algebra, Ch. 6",
          "Horn and Johnson - Matrix Analysis",
          "Boyd and Vandenberghe - Convex Optimization, Ch. 2",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Linear operators in infinite-dimensional spaces generalize matrices. This is essential for kernel methods and functional analysis.",
          "Adjoint operators generalize transpose and define notions of orthogonality and self-adjointness.",
          "Compact operators behave like finite-dimensional matrices and admit spectral decompositions, enabling kernel PCA and integral equation methods.",
        ],
        keyIdeas: [
          "Adjoint satisfies <Tx, y> = <x, T* y>",
          "Self-adjoint operators have real spectra",
          "Compact operators have discrete spectra accumulating at zero",
          "Kernels define linear maps in RKHS via integral operators",
          "Operator norms quantify stability",
          "Spectral theorem extends to bounded self-adjoint operators",
        ],
        equations: [
          "\\[ \\|T\\| = \\sup_{\\|x\\|=1} \\|Tx\\| \\]",
          "\\[ \\langle Tx, y \\rangle = \\langle x, T^* y \\rangle \\]",
          "\\[ (Tf)(x) = \\int K(x,y) f(y) \\, dy \\]",
        ],
        references: [
          "Kreyszig - Introductory Functional Analysis",
          "Riesz and Sz.-Nagy - Functional Analysis",
          "Scholkopf and Smola - Learning with Kernels",
        ],
      },
    },
  ],
};

export default chapter;
