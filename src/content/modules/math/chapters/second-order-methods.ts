import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "second-order-methods",
  title: "Second Order Methods",
  description: "Newton's method and curvature-aware optimization.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Second-order methods use curvature information to choose better optimization steps. They typically converge faster than first-order methods.",
          "Newton's method uses the Hessian to rescale gradients, adapting steps to the local geometry.",
          "In ML, second-order ideas appear in L-BFGS, trust-region methods, and natural gradient.",
        ],
        keyIdeas: [
          "Newton step solves a quadratic approximation",
          "Hessian captures curvature and scaling",
          "Second-order methods can converge quadratically near optima",
          "They are sensitive to nonconvexity and saddle points",
          "Computing full Hessians is expensive in high dimensions",
          "Approximations trade accuracy for scalability",
        ],
        equations: [
          "\\[ x_{k+1} = x_k - H^{-1} \\nabla f(x_k) \\]",
          "\\[ m(s) = f(x) + \\nabla f(x)^T s + \\tfrac{1}{2} s^T H s \\]",
          "\\[ H = \\nabla^2 f(x) \\]",
        ],
        references: [
          "Nocedal and Wright - Numerical Optimization, Ch. 3",
          "Bertsekas - Nonlinear Programming, Ch. 1",
          "Boyd and Vandenberghe - Convex Optimization, Ch. 9",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Quasi-Newton methods approximate the Hessian using gradient differences, achieving near-Newton performance without explicit Hessians.",
          "Trust-region methods choose steps that stay within a region where the quadratic model is accurate, improving robustness.",
          "In large-scale ML, Hessian-vector products provide curvature information without forming the full Hessian.",
        ],
        keyIdeas: [
          "BFGS and L-BFGS are standard quasi-Newton methods",
          "Trust-region methods solve a constrained quadratic subproblem",
          "Line search ensures sufficient decrease and stability",
          "Hessian-vector products can be computed via auto-diff",
          "Preconditioning improves convergence of Newton-CG",
          "Curvature information helps escape plateaus",
        ],
        equations: [
          "\\[ B_{k+1} = B_k - \\frac{B_k s s^T B_k}{s^T B_k s} + \\frac{y y^T}{y^T s} \\]",
          "\\[ \\min_{\\|s\\| \\le \\Delta} m(s) \\quad (\\text{trust region}) \\]",
          "\\[ H v = \\nabla (\\nabla f^T v) \\]",
        ],
        references: [
          "Nocedal and Wright - Numerical Optimization, Ch. 6",
          "Conn, Gould, Toint - Trust Region Methods",
          "Martens (2010) - Hessian-Free Optimization for Deep Learning",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The natural gradient rescales the gradient by the Fisher information, yielding parameter updates invariant to reparameterization.",
          "In nonconvex landscapes, second-order methods must handle saddle points where the Hessian is indefinite.",
          "Stochastic second-order methods approximate curvature using mini-batches and low-rank updates.",
        ],
        keyIdeas: [
          "Natural gradient uses information geometry",
          "Negative curvature directions can escape saddles",
          "Damped Newton adds regularization for stability",
          "Gauss-Newton and generalized Gauss-Newton use model structure",
          "Kronecker-factored approximations scale to deep nets",
          "Stochastic quasi-Newton trades variance for speed",
        ],
        equations: [
          "\\[ \\theta_{k+1} = \\theta_k - \\eta F^{-1} \\nabla \\ell(\\theta_k) \\]",
          "\\[ (H + \\lambda I) s = -\\nabla f \\]",
          "\\[ G = J^T J \\quad (\\text{Gauss-Newton}) \\]",
        ],
        references: [
          "Amari (1998) - Natural Gradient",
          "Saddles: Dauphin et al. (2014) - Identifying and attacking saddle points",
          "Martens and Grosse (2015) - K-FAC",
        ],
      },
    },
  ],
};

export default chapter;
