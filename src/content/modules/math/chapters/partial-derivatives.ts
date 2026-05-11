import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "partial-derivatives",
  title: "Partial Derivatives",
  description: "Derivatives of multivariable functions with respect to one variable.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Partial derivatives measure how a multivariate function changes when you vary one variable and keep others fixed.",
          "They are the building blocks of gradients, Jacobians, and Hessians, which drive optimization in ML.",
          "Understanding partial derivatives is essential for backpropagation and sensitivity analysis.",
        ],
        keyIdeas: [
          "Hold other variables constant when differentiating",
          "Gradient collects all partial derivatives",
          "Jacobian generalizes gradients to vector outputs",
          "Mixed partials are equal under mild conditions",
          "Partial derivatives approximate local linear change",
          "Chain rule extends to multivariate functions",
        ],
        equations: [
          "\\[ \\frac{\\partial f}{\\partial x_i}(x) = \\lim_{h\\to 0} \\frac{f(x_1,\\ldots,x_i+h,\\ldots,x_n) - f(x)}{h} \\]",
          "\\[ \\nabla f(x) = \\left[ \\frac{\\partial f}{\\partial x_1}, \\ldots, \\frac{\\partial f}{\\partial x_n} \\right]^T \\]",
          "\\[ \\frac{\\partial^2 f}{\\partial x_i \\partial x_j} = \\frac{\\partial^2 f}{\\partial x_j \\partial x_i} \\]",
        ],
        references: [
          "Stewart - Calculus: Early Transcendentals, Ch. 14",
          "Apostol - Calculus, Vol. 2",
          "Marsden and Tromba - Vector Calculus",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The multivariate chain rule handles compositions of functions and is central to backpropagation in neural networks.",
          "Total derivatives capture how outputs change when all inputs vary together, not just one at a time.",
          "Higher order partial derivatives form the Hessian, which encodes curvature.",
        ],
        keyIdeas: [
          "Jacobian matrix encodes all first derivatives for vector outputs",
          "Total derivative uses the chain rule with multiple inputs",
          "Mixed partials are symmetric when f is smooth",
          "Hessian matrix controls curvature and convexity",
          "Directional derivatives generalize partial derivatives",
          "Gradient points in the direction of steepest ascent",
        ],
        equations: [
          "\\[ J_{ij} = \\frac{\\partial f_i}{\\partial x_j} \\]",
          "\\[ df = \\sum_i \\frac{\\partial f}{\\partial x_i} dx_i \\]",
          "\\[ H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j} \\]",
        ],
        references: [
          "Petersen and Pedersen - The Matrix Cookbook",
          "Boyd and Vandenberghe - Convex Optimization, App. A",
          "Nocedal and Wright - Numerical Optimization, Ch. 2",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Automatic differentiation computes partial derivatives exactly up to machine precision by applying the chain rule systematically.",
          "Reverse-mode AD scales well for scalar outputs and many inputs, which is why it powers deep learning.",
          "In constrained optimization, gradients of Lagrangians and implicit differentiation are used to compute sensitivities.",
        ],
        keyIdeas: [
          "Forward-mode AD computes directional derivatives efficiently",
          "Reverse-mode AD computes gradients with one backward pass",
          "Implicit differentiation avoids unrolling iterative processes",
          "Vector-Jacobian and Jacobian-vector products are key primitives",
          "Hessian-vector products avoid forming full Hessians",
          "Smoothness assumptions ensure mixed partial symmetry",
        ],
        equations: [
          "\\[ \\nabla_x f = \\left( \\frac{\\partial y}{\\partial x} \\right)^T \\nabla_y f \\]",
          "\\[ \\frac{d x^*}{d \\theta} = - \\left( \\frac{\\partial F}{\\partial x} \\right)^{-1} \\frac{\\partial F}{\\partial \\theta} \\]",
          "\\[ H v = \\nabla ( \\nabla f^T v ) \\]",
        ],
        references: [
          "Griewank and Walther - Evaluating Derivatives",
          "Baydin et al. (2018) - Automatic Differentiation in ML",
          "Bertsekas - Nonlinear Programming, Ch. 6",
        ],
      },
    },
  ],
};

export default chapter;
