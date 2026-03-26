import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "limits-continuity",
  title: "Limits & Continuity",
  description: "The foundation of calculus: approaching values and smooth functions.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Limits formalize the idea of approaching a value without necessarily reaching it. They are the foundation for derivatives, integrals, and convergence.",
          "Continuity means small changes in input produce small changes in output. This is the intuition behind stable models and smooth optimization landscapes.",
          "In ML, limits justify asymptotic behavior, consistency, and approximation arguments.",
        ],
        keyIdeas: [
          "The epsilon-delta definition is the precise meaning of a limit",
          "Limits obey algebraic rules for sums, products, and quotients",
          "Continuity at a point means the limit equals the function value",
          "Composition of continuous functions is continuous",
          "Discontinuities can be removable, jump, or infinite",
          "Compactness plus continuity guarantees extrema (Weierstrass)",
        ],
        equations: [
          "\\[ \\lim_{x\\to a} f(x) = L \\iff \\forall \\epsilon>0, \\exists \\delta>0: |x-a|<\\delta \\Rightarrow |f(x)-L|<\\epsilon \\]",
          "\\[ f \\text{ continuous at } a \\iff \\lim_{x\\to a} f(x) = f(a) \\]",
          "\\[ \\lim_{x\\to a} (f(x)g(x)) = \\left(\\lim_{x\\to a} f(x)\\right)\\left(\\lim_{x\\to a} g(x)\\right) \\]",
        ],
        references: [
          "Stewart - Calculus: Early Transcendentals, Ch. 2",
          "Apostol - Calculus, Vol. 1",
          "Rudin - Principles of Mathematical Analysis, Ch. 4",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Uniform continuity strengthens continuity by using a single delta for all points. This matters for proving convergence of approximations.",
          "Limits in higher dimensions depend on the path of approach. Existence requires the same limit along every path.",
          "Continuity of multivariate functions connects to gradients and Jacobians, enabling smooth optimization.",
        ],
        keyIdeas: [
          "Uniform continuity holds on compact sets for continuous functions",
          "Multivariate limits can fail if path limits differ",
          "Continuity implies boundedness on compact sets",
          "Differentiability implies continuity but not vice versa",
          "Lipschitz continuity provides quantitative stability",
          "Limit interchange requires extra conditions (dominated convergence)",
        ],
        equations: [
          "\\[ \\forall \\epsilon>0, \\exists \\delta>0: \\|x-y\\|<\\delta \\Rightarrow \\|f(x)-f(y)\\|<\\epsilon \\]",
          "\\[ \\|f(x)-f(y)\\| \\le L \\|x-y\\| \\quad (\\text{Lipschitz}) \\]",
          "\\[ \\lim_{x\\to a} f(x) = L \\iff \\forall \\{x_n\\}\\to a, f(x_n)\\to L \\]",
        ],
        references: [
          "Rudin - Principles of Mathematical Analysis, Ch. 4",
          "Apostol - Calculus, Vol. 1",
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
          "In functional analysis, continuity is studied via topological structures. Different norms can induce different notions of convergence.",
          "Weak and strong convergence distinguish whether convergence holds for all test functionals or in norm.",
          "Many ML generalization proofs rely on uniform convergence, which is a limit statement over function classes.",
        ],
        keyIdeas: [
          "Topological continuity generalizes epsilon-delta",
          "Strong convergence implies weak convergence, not vice versa",
          "Uniform convergence preserves continuity and integrability",
          "Equicontinuity plus pointwise boundedness yields compactness (Arzela-Ascoli)",
          "Dominated convergence allows swapping limits and integrals",
          "Different norms define different stability notions",
        ],
        equations: [
          "\\[ f_n \\to f \\text{ uniformly } \\iff \\sup_x |f_n(x)-f(x)| \\to 0 \\]",
          "\\[ f_n \\rightharpoonup f \\iff \\langle f_n, g \\rangle \\to \\langle f, g \\rangle \\; \\forall g \\]",
          "\\[ \\lim_{n\\to\\infty} \\int f_n = \\int \\lim_{n\\to\\infty} f_n \\quad (\\text{dominated convergence}) \\]",
        ],
        references: [
          "Royden and Fitzpatrick - Real Analysis, Ch. 4",
          "Brezis - Functional Analysis, Sobolev Spaces and PDEs",
          "Shalev-Shwartz and Ben-David - Understanding Machine Learning, Ch. 5",
        ],
      },
    },
  ],
};

export default chapter;
