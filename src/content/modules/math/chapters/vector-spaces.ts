import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "vector-spaces",
  title: "Vector Spaces",
  description: "Foundations of linear algebra: subspaces, span, and bases.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A vector space is a set of objects that can be added and scaled, following a small set of axioms.",
          "Vector spaces generalize the idea of arrows in space to functions, polynomials, and signals.",
          "Many ML concepts like features, embeddings, and gradients live in vector spaces.",
        ],
        keyIdeas: [
          "Vector spaces are closed under addition and scalar multiplication",
          "Subspaces are vector spaces within a larger space",
          "Span is the set of all linear combinations of vectors",
          "A basis is a minimal spanning set",
          "Dimension is the size of a basis",
          "Linear independence means no vector is redundant",
        ],
        equations: [
          "\\[ \\text{span}(v_1,\\ldots,v_k) = \\left\\{ \\sum_{i=1}^k a_i v_i : a_i \\in \\mathbb{R} \\right\\} \\]",
          "\\[ v_1,\\ldots,v_k \\text{ independent } \\iff \\sum_i a_i v_i = 0 \\Rightarrow a_i = 0 \\]",
          "\\[ \\dim(V) = \\text{number of vectors in a basis} \\]",
        ],
        references: [
          "Strang - Introduction to Linear Algebra, Ch. 2",
          "Lay - Linear Algebra and Its Applications, Ch. 1",
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
          "Coordinates depend on a basis, but the vector itself is basis-invariant. This is key for interpreting representations.",
          "Direct sums and orthogonal decompositions help break spaces into simpler parts.",
          "Inner products add geometry, enabling notions like angle and projection.",
        ],
        keyIdeas: [
          "Change of basis uses an invertible matrix",
          "Orthogonal bases simplify computations",
          "Dimension counts degrees of freedom",
          "Row space, column space, and null space are subspaces",
          "Gram-Schmidt creates orthonormal bases",
          "Projections minimize distance to a subspace",
        ],
        equations: [
          "\\[ [v]_B = P^{-1} [v]_C \\]",
          "\\[ V = U \\oplus W \\quad (\\text{direct sum}) \\]",
          "\\[ v = \\sum_i \\langle v, q_i \\rangle q_i \\quad (\\text{orthonormal basis}) \\]",
        ],
        references: [
          "Strang - Introduction to Linear Algebra, Ch. 4",
          "Kreyszig - Introductory Functional Analysis",
          "Boyd and Vandenberghe - Convex Optimization, App. A",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Infinite-dimensional vector spaces appear in function approximation and kernel methods. Bases can be countable (Hilbert) or uncountable.",
          "Banach and Hilbert spaces add completeness, enabling limits of sequences and convergence of series.",
          "In ML, RKHS theory models functions as vectors with inner products defined by kernels.",
        ],
        keyIdeas: [
          "Completeness ensures Cauchy sequences converge",
          "Hilbert spaces have inner products; Banach spaces do not",
          "Orthonormal bases generalize Fourier series",
          "RKHS provides a vector space of functions with kernel inner product",
          "Dual spaces contain linear functionals",
          "Representation theorems connect function evaluation to inner products",
        ],
        equations: [
          "\\[ \\langle f, g \\rangle_{\\mathcal{H}} = \\sum_i c_i d_i \\quad (\\text{basis expansion}) \\]",
          "\\[ f(x) = \\langle f, K_x \\rangle_{\\mathcal{H}} \\quad (\\text{reproducing property}) \\]",
          "\\[ \\|f\\|_{\\mathcal{H}}^2 = \\sum_i c_i^2 \\]",
        ],
        references: [
          "Conway - A Course in Functional Analysis",
          "Berlinet and Thomas-Agnan - Reproducing Kernel Hilbert Spaces",
          "Scholkopf and Smola - Learning with Kernels",
        ],
      },
    },
  ],
};

export default chapter;
