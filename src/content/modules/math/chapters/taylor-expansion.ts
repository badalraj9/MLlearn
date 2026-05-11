import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "taylor-expansion",
  title: "Taylor Expansion",
  description: "Polynomial approximation of functions near a point.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Taylor expansion approximates a function near a point by a polynomial. It is the bridge between calculus and numerical methods.",
          "In ML, Taylor approximations explain gradient descent, Newton's method, and local model behavior.",
          "The quality of approximation depends on higher order derivatives and the remainder term.",
        ],
        keyIdeas: [
          "Local behavior can be approximated by polynomials",
          "First order term is linear, second order adds curvature",
          "Remainder term quantifies approximation error",
          "Taylor series may or may not converge globally",
          "Quadratic approximations drive Newton-type methods",
          "Smoothness controls error bounds",
        ],
        equations: [
          "\\[ f(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2}(x-a)^2 + \\cdots \\]",
          "\\[ f(x) = f(a) + \\nabla f(a)^T (x-a) + \\tfrac{1}{2}(x-a)^T H (x-a) + R_2 \\]",
          "\\[ R_n = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1} \\]",
        ],
        references: [
          "Stewart - Calculus: Early Transcendentals, Ch. 11",
          "Apostol - Calculus, Vol. 1",
          "Nocedal and Wright - Numerical Optimization, Ch. 2",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Second-order Taylor expansions give the local quadratic model used in optimization. The Hessian encodes curvature.",
          "In multivariate settings, the expansion includes cross-derivative terms, which capture interactions between variables.",
          "Remainder bounds are essential for proving convergence of optimization algorithms.",
        ],
        keyIdeas: [
          "Gradient and Hessian define local geometry",
          "Quadratic models enable trust-region methods",
          "Lipschitz Hessian yields cubic remainder bounds",
          "Cross terms appear when variables interact",
          "Series truncation is approximation, not equality",
          "Taylor expansions explain why step sizes matter",
        ],
        equations: [
          "\\[ f(x+s) = f(x) + \\nabla f(x)^T s + \\tfrac{1}{2} s^T \\nabla^2 f(x) s + O(\\|s\\|^3) \\]",
          "\\[ \\|R_2\\| \\le \\frac{L}{6} \\|s\\|^3 \\quad (\\nabla^2 f \\text{ Lipschitz}) \\]",
          "\\[ \\nabla f(x+s) \\approx \\nabla f(x) + \\nabla^2 f(x) s \\]",
        ],
        references: [
          "Nocedal and Wright - Numerical Optimization, Ch. 3",
          "Bertsekas - Nonlinear Programming, Ch. 2",
          "Boyd and Vandenberghe - Convex Optimization, Ch. 9",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Higher order expansions are used in advanced optimization, especially for cubic regularization and higher order methods.",
          "The remainder term can be controlled using smoothness and bounded derivatives, leading to complexity guarantees.",
          "In probabilistic modeling, Taylor expansions lead to Laplace approximations and saddle-point methods.",
        ],
        keyIdeas: [
          "Third order methods can improve convergence on nonconvex problems",
          "Cubic regularization stabilizes Newton steps",
          "Laplace approximation uses second order expansion of log posterior",
          "Saddle-point approximations use local curvature at optima",
          "Higher order tensors appear in multivariate expansions",
          "Series expansions connect to automatic differentiation",
        ],
        equations: [
          "\\[ m(s) = f(x) + \\nabla f(x)^T s + \\tfrac{1}{2} s^T H s + \\tfrac{\\rho}{6} \\|s\\|^3 \\]",
          "\\[ \\log p(\\theta \\mid D) \\approx \\log p(\\hat{\\theta}) - \\tfrac{1}{2}(\\theta-\\hat{\\theta})^T H (\\theta-\\hat{\\theta}) \\]",
          "\\[ f(x+s) = f(x) + \\sum_{k=1}^p \\frac{1}{k!} \\nabla^k f(x)[s^k] + R_p \\]",
        ],
        references: [
          "Nesterov and Polyak (2006) - Cubic regularization of Newton method",
          "Kass and Raftery (1995) - Bayes factors and Laplace approximations",
          "Cartis, Gould, Toint (2011) - Adaptive cubic regularization",
        ],
      },
    },
  ],
};

export default chapter;
