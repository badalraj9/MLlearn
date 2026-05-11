import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "kkt-conditions",
  title: "KKT Conditions",
  description:
    "Necessary and sufficient conditions for constrained optimization optimality.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Constrained optimization asks: find the best solution within boundaries. You want to minimize a function, but your hands are tied—you can't go everywhere. A company wants to maximize profit subject to budget constraints. A pilot wants to minimize fuel subject to staying on course. These constraints define a feasible region, and the optimal point lies somewhere on its boundary.",
          "For equality constraints like g(x) = 0, Lagrange multipliers provide the key insight. At the optimum, the gradient of the objective function must be perpendicular to the constraint surface—otherwise you could move along the constraint and improve. This perpendicularity means ∇f = λ∇g for some scalar λ, the Lagrange multiplier. The multiplier measures sensitivity: how much the optimal value changes if you relax the constraint slightly.",
          "KKT conditions extend this idea to inequality constraints g(x) ≤ 0. Now the feasible region has an interior—if the optimum lies inside, the constraint doesn't matter and λ = 0. If it lies on the boundary, the constraint is 'active' and behaves like an equality. The magic of complementary slackness: λ · g(x) = 0, meaning either the constraint is inactive (g(x) < 0, so λ = 0) or active (g(x) = 0, λ can be nonzero).",
        ],
        keyIdeas: [
          "Constrained optimization: minimize objective within a feasible region",
          "Lagrange multipliers: at optimum, ∇f is perpendicular to constraint surface",
          "Multiplier λ measures sensitivity to constraint relaxation",
          "Inequality constraints can be inactive (interior solution) or active (boundary)",
          "Complementary slackness: constraint is either loose (λ=0) or tight (g=0)",
        ],
        equations: [
          "\\[ \\text{Lagrange: } \\nabla f(x^*) = \\lambda \\nabla g(x^*) \\quad \\text{for } g(x^*) = 0 \\]",
          "\\[ \\text{Complementary slackness: } \\lambda_i \\cdot g_i(x^*) = 0 \\]",
          "\\[ \\mathcal{L}(x, \\lambda) = f(x) + \\sum_i \\lambda_i g_i(x) \\quad \\text{(Lagrangian)} \\]",
        ],
        references: [
          "3Blue1Brown - Lagrange Multipliers",
          "Khan Academy - Constrained optimization",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The full KKT conditions for minimizing f(x) subject to gᵢ(x) ≤ 0 and hⱼ(x) = 0 comprise four parts. Stationarity: ∇f(x*) + Σλᵢ∇gᵢ(x*) + Σνⱼ∇hⱼ(x*) = 0. Primal feasibility: gᵢ(x*) ≤ 0, hⱼ(x*) = 0 for all i, j. Dual feasibility: λᵢ ≥ 0 for all i. Complementary slackness: λᵢgᵢ(x*) = 0 for all i. Together, these are necessary for optimality under constraint qualifications.",
          "Solving KKT systems is a practical skill. First, identify which constraints are active (typically a small subset). Set λᵢ = 0 for inactive constraints. Solve the stationarity and equality constraint equations simultaneously. Check that all feasibility conditions hold and λ ≥ 0 for active inequality constraints. If any check fails, try a different active set. This combinatorial aspect makes KKT systems challenging but also structured.",
          "Constraint qualifications ensure KKT conditions are necessary for optimality. The Linear Independence Constraint Qualification (LICQ) requires that gradients of active constraints be linearly independent. Slater's condition for convex problems requires existence of a strictly feasible point (gᵢ(x) < 0 for all i). Without these qualifications, a point can be optimal without satisfying KKT— pathological examples exist where the constraint surface has 'corners' or 'cusps.'",
          "Sensitivity analysis via Lagrange multipliers: the optimal value p* changes as dp*/dbᵢ ≈ -λᵢ when constraint i is perturbed by bᵢ. This makes multipliers economically meaningful—shadow prices in resource allocation, marginal costs in production. In machine learning, regularization strength is the shadow price of the capacity constraint.",
        ],
        keyIdeas: [
          "Four KKT conditions: stationarity, primal feasibility, dual feasibility, complementary slackness",
          "Active set methods: enumerate which constraints bind at the solution",
          "LICQ: active constraint gradients linearly independent; ensures KKT necessity",
          "Slater's condition: strictly feasible point exists; ensures strong duality for convex",
          "Shadow prices: λᵢ ≈ -∂p*/∂bᵢ gives sensitivity to constraint perturbation",
          "KKT are sufficient for optimality when f is convex and constraints define convex set",
        ],
        equations: [
          "\\[ \\nabla_x \\mathcal{L}(x^*, \\lambda^*, \\nu^*) = 0 \\quad \\text{(Stationarity)} \\]",
          "\\[ g_i(x^*) \\leq 0, \\quad h_j(x^*) = 0 \\quad \\text{(Primal feasibility)} \\]",
          "\\[ \\lambda_i \\geq 0 \\quad \\text{(Dual feasibility)} \\]",
          "\\[ \\lambda_i g_i(x^*) = 0 \\quad \\text{(Complementary slackness)} \\]",
          "\\[ \\frac{\\partial p^*}{\\partial b_i} = -\\lambda_i^* \\quad \\text{(Sensitivity)} \\]",
        ],
        references: [
          "Boyd & Vandenberghe - Convex Optimization, Chapter 5",
          "Nocedal & Wright - Numerical Optimization, Chapter 12",
          "Bertsekas - Nonlinear Programming, Chapter 3",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Duality theory reveals that KKT conditions are precisely the optimality conditions for both primal and dual problems. The Lagrangian L(x, λ, ν) has a dual function g(λ, ν) = inf_x L(x, λ, ν). The dual problem maximizes g subject to λ ≥ 0. Weak duality: g(λ*, ν*) ≤ p* always. Strong duality (equality) holds under Slater's condition for convex problems. At optimality, KKT conditions are exactly the conditions that x* minimizes L(x, λ*, ν*) with optimal dual variables.",
          "Second-order conditions extend KKT with curvature information. For the constrained problem, define the critical cone C at x*: directions that are tangent to active constraints and either keep the objective decreasing or maintain feasibility. The second-order necessary condition requires zᵀ∇²ₓₓL z ≥ 0 for all z in C. Sufficiency requires zᵀ∇²ₓₓL z > 0 for nonzero z in C. These conditions determine whether a KKT point is a local minimum.",
          "Interior point methods solve KKT systems without combinatorial active-set search. Barrier methods add log-barrier terms -μ Σlog(-gᵢ(x)) to the objective, keeping iterates strictly feasible. As μ → 0, the barrier-penalized optimum approaches the constrained optimum. Primal-dual methods solve modified KKT equations with barrier terms directly, achieving polynomial-time complexity for convex problems. Path-following algorithms trace the central path from interior to optimal.",
          "ADMM (Alternating Direction Method of Multipliers) exploits problem structure for distributed optimization. The augmented Lagrangian L_ρ(x, z, λ) = f(x) + g(z) + λᵀ(Ax + Bz - c) + (ρ/2)‖Ax + Bz - c‖² enables splitting: minimize over x, then z, then update λ. Each subproblem handles one objective term. Consensus ADMM solves distributed optimization where agents share a common variable, enabling federated learning and decentralized optimization.",
          "KKT conditions underpin machine learning theory. Support Vector Machines find the maximum-margin hyperplane by solving a convex QP—the KKT conditions yield the support vectors (active constraints). In optimal control, Pontryagin's maximum principle is KKT in function space. In reinforcement learning, KKT conditions characterize optimal policies in constrained MDPs. Modern deep learning implicitly solves regularized problems where KKT conditions relate gradient magnitude to regularization strength.",
        ],
        keyIdeas: [
          "KKT conditions = primal and dual optimality simultaneously; strong duality bridges them",
          "Critical cone: directions where second-order optimality must be checked",
          "Interior point methods trace central path via barrier terms; polynomial-time for convex",
          "ADMM splits problems via augmented Lagrangian; enables distributed optimization",
          "SVM support vectors are points where KKT complementary slackness binds",
          "Pontryagin's maximum principle: KKT conditions in optimal control",
        ],
        equations: [
          "\\[ g(\\lambda, \\nu) = \\inf_x L(x, \\lambda, \\nu) \\leq p^* \\quad \\text{(Weak duality)} \\]",
          "\\[ \\text{Critical cone: } C = \\{z : \\nabla g_i^T z = 0 \\text{ (active)}, \\nabla f^T z \\leq 0\\} \\]",
          "\\[ \\text{Barrier: } \\min f(x) - \\mu \\sum_i \\log(-g_i(x)) \\quad \\mu \\to 0 \\]",
          "\\[ \\text{ADMM: } x^{k+1} = \\arg\\min_x L_\\rho(x, z^k, \\lambda^k), \\quad z^{k+1} = \\arg\\min_z L_\\rho(x^{k+1}, z, \\lambda^k) \\]",
        ],
        references: [
          "Boyd & Vandenberghe - Convex Optimization, Chapter 5",
          "Nesterov & Nemirovski - Interior-Point Polynomial Algorithms",
          "Boyd et al. - Distributed Optimization and Statistical Learning via ADMM",
          "Vapnik - Statistical Learning Theory (SVM theory)",
        ],
      },
    },
  ],
};

export default chapter;
