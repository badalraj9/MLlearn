import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "lagrange-multipliers",
  title: "Lagrange Multipliers",
  description: "Optimizing with equality constraints.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Lagrange multipliers solve optimization problems with equality constraints by turning them into unconstrained problems.",
          "At the optimum, the gradient of the objective is parallel to the gradient of the constraint. This geometric fact leads to a simple system of equations.",
          "The Lagrangian formalism generalizes to multiple constraints and is the basis for KKT conditions in convex optimization.",
        ],
        keyIdeas: [
          "Constraints restrict the feasible set to a manifold",
          "Optimality requires gradients to be linearly dependent",
          "Lagrange multipliers measure sensitivity to constraints",
          "Multiple constraints introduce one multiplier per constraint",
          "Second-order conditions classify minima and maxima",
          "KKT extends the method to inequality constraints",
        ],
        equations: [
          "\\[ \\nabla f(x) = \\lambda \\nabla g(x) \\]",
          "\\[ \\mathcal{L}(x, \\lambda) = f(x) + \\lambda (g(x) - c) \\]",
          "\\[ \\nabla_x \\mathcal{L}(x, \\lambda) = 0, \\quad g(x)=c \\]",
        ],
        references: [
          "Stewart - Calculus: Early Transcendentals, Ch. 14",
          "Bertsekas - Nonlinear Programming, Ch. 3",
          "Boyd and Vandenberghe - Convex Optimization, Ch. 5",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The Lagrange multiplier value tells you how much the optimal objective would change if you relaxed the constraint slightly.",
          "In quadratic programs, the Lagrangian leads to closed-form solutions and gives the dual problem, which can be easier to solve.",
          "For ML, constrained formulations appear in max-margin methods, norm constraints, and probability simplex constraints.",
        ],
        keyIdeas: [
          "Multipliers are shadow prices in constrained problems",
          "Dual problems provide lower bounds on the primal objective",
          "Strong duality holds for convex problems with Slater conditions",
          "KKT conditions are necessary and sufficient for convex problems",
          "Equality constraints can be handled by parameterization or Lagrange",
          "Lagrangian introduces saddle-point structure",
        ],
        equations: [
          "\\[ \\frac{d f^*}{d c} = -\\lambda^* \\]",
          "\\[ g(\\lambda) = \\inf_x \\mathcal{L}(x, \\lambda) \\]",
          "\\[ \\max_{\\lambda} g(\\lambda) \\le \\min_x f(x) \\]",
        ],
        references: [
          "Boyd and Vandenberghe - Convex Optimization, Ch. 5-6",
          "Bertsekas - Nonlinear Programming, Ch. 4",
          "Nocedal and Wright - Numerical Optimization, Ch. 12",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The method extends to equality and inequality constraints via KKT conditions, which characterize optimality in convex programs.",
          "Augmented Lagrangians improve numerical stability by adding a penalty term, enabling efficient constrained optimization without strict feasibility at each step.",
          "In large-scale ML, primal-dual methods and ADMM solve constrained problems by alternating updates on variables and multipliers.",
        ],
        keyIdeas: [
          "Complementary slackness links constraints to multipliers",
          "Augmented Lagrangian blends penalty and dual methods",
          "ADMM decomposes problems into simpler subproblems",
          "Dual variables can be interpreted as forces enforcing constraints",
          "Saddle-point problems require careful optimization dynamics",
          "Constraint qualifications ensure KKT validity",
        ],
        equations: [
          "\\[ \\nabla f(x^*) + \\sum_i \\lambda_i^* \\nabla g_i(x^*) = 0 \\]",
          "\\[ \\lambda_i^* g_i(x^*) = 0, \\quad \\lambda_i^* \\ge 0, \\quad g_i(x^*) \\le 0 \\]",
          "\\[ \\mathcal{L}_\\rho(x, \\lambda) = f(x) + \\sum_i \\lambda_i g_i(x) + \\frac{\\rho}{2} \\sum_i g_i(x)^2 \\]",
        ],
        references: [
          "Rockafellar - Lagrange Multipliers and Optimality",
          "Boyd et al. - Distributed Optimization and Statistical Learning via ADMM",
          "Bertsekas - Nonlinear Programming, Ch. 4",
        ],
      },
    },
  ],
};

export default chapter;
