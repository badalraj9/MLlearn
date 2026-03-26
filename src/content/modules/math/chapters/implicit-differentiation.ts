import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "implicit-differentiation",
  title: "Implicit Differentiation",
  description:
    "Computing derivatives when variables are defined implicitly through equations.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Sometimes you need a derivative but can't solve your equation for y in terms of x. Consider the circle x² + y² = r². You can't just write y = f(x) because there are two values of y for each x (upper and lower half). Implicit differentiation lets you find dy/dx anyway—without ever isolating y.",
          "The trick is to differentiate both sides with respect to x, treating y as a function of x. For x² + y² = r²: the derivative of x² is 2x. The derivative of y² uses the chain rule: d(y²)/dx = 2y(dy/dx). The constant r² vanishes. You get 2x + 2y(dy/dx) = 0, which rearranges to dy/dx = -x/y. This gives the slope at any point on the circle.",
          "The method works whenever variables are related by an equation, even when solving explicitly is impossible. Treat each variable as depending on the differentiation variable, apply the chain rule everywhere that variable appears, then solve for the derivative you want. The result often has a beautiful symmetry—in our circle example, the slope at any point equals negative x-over-y, the negative reciprocal of the line from origin to that point.",
        ],
        keyIdeas: [
          "Differentiate both sides of an equation without solving for y explicitly",
          "Apply the chain rule: treat y as a function of x, so d/dx treats y as y(x)",
          "After differentiating, algebraically solve for the derivative dy/dx",
          "Works when explicit solutions are impossible or messy",
          "The result often reveals geometric structure hidden in the equation",
        ],
        equations: [
          "\\[ \\text{For } F(x, y) = 0: \\quad \\frac{dy}{dx} = -\\frac{\\partial F / \\partial x}{\\partial F / \\partial y} \\]",
          "\\[ x^2 + y^2 = r^2 \\implies 2x + 2y\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{x}{y} \\]",
        ],
        references: [
          "3Blue1Brown - Implicit Differentiation",
          "Khan Academy - Implicit differentiation",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The implicit function theorem formalizes when implicit differentiation works. For F(x, y) = 0, if ∂F/∂y ≠ 0 at a point (a, b), then locally there exists a unique function y = g(x) satisfying F(x, g(x)) = 0, and g'(x) = -(∂F/∂x)/(∂F/∂y). The condition ∂F/∂y ≠ 0 means the level curve isn't vertical—you can actually solve for y locally.",
          "For multivariate functions F(x₁, x₂, ..., xₙ, y) = 0, partial derivatives work similarly: ∂y/∂xᵢ = -(∂F/∂xᵢ)/(∂F/∂y). This generalizes to vector-valued functions: if F: ℝⁿ×ℝᵐ → ℝᵐ and the Jacobian ∂F/∂y is invertible, then there exists y(x) with Jacobian J_y = -(∂F/∂y)⁻¹(∂F/∂x). The matrix inversion makes this computationally more intensive but mechanically identical.",
          "Constrained optimization uses implicit differentiation constantly. The Lagrangian L(x, λ) = f(x) + λᵀg(x) has optimality conditions ∇ₓL = 0 and ∇_λL = 0 (i.e., g(x) = 0). Sensitivity analysis—how does the optimal x* change with problem parameters?—requires implicit differentiation through these conditions. The result is expressed using the KKT matrix.",
          "Implementation tip: when computing implicit derivatives in code, use automatic differentiation. Form the residual F(x, y) = 0, compute J = ∂F/∂y via autodiff, then solve J·(dy/dx) = -(∂F/∂x) for dy/dx. Linear system solvers (conjugate gradient for large systems, direct methods for small) avoid computing J⁻¹ explicitly. PyTorch and JAX support this pattern naturally.",
        ],
        keyIdeas: [
          "Implicit function theorem: ∂F/∂y ≠ 0 guarantees local explicit solution exists",
          "Multivariate extension: ∂y/∂xᵢ = -(∂F/∂xᵢ)/(∂F/∂y)",
          "Vector case: J_y = -(∂F/∂y)⁻¹(∂F/∂x) requires matrix inversion",
          "Sensitivity analysis in optimization uses implicit differentiation through KKT conditions",
          "In code: solve linear system J·(dy/dx) = -(∂F/∂x) instead of computing J⁻¹",
          "Autodiff frameworks compute Jacobian-vector products efficiently",
        ],
        equations: [
          "\\[ \\frac{\\partial y}{\\partial x_i} = -\\frac{\\partial F / \\partial x_i}{\\partial F / \\partial y} \\quad \\text{(Scalar case)} \\]",
          "\\[ J_y = -\\left(\\frac{\\partial F}{\\partial y}\\right)^{-1} \\frac{\\partial F}{\\partial x} \\quad \\text{(Matrix case)} \\]",
          "\\[ \\text{KKT system: } \\begin{bmatrix} \\nabla^2_{xx} L & \\nabla g \\\\\\ \\nabla g^T & 0 \\end{bmatrix} \\begin{bmatrix} dx^* \\\\\\ d\\lambda^* \\end{bmatrix} = \\begin{bmatrix} -\\nabla^2_{xp} L \\\\\\ -\\nabla_p g \\end{bmatrix} dp \\]",
          "\\[ \\text{Solve } J \\cdot v = b \\text{ for } v \\text{ instead of computing } J^{-1}b \\]",
        ],
        references: [
          "Rudin - Principles of Mathematical Analysis, Theorem 9.28",
          "Boyd & Vandenberghe - Convex Optimization, Chapter 5 (Duality)",
          "Griewank & Walther - Evaluating Derivatives, Chapter 10",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Deep equilibrium models (DEQs) define layers through fixed-point equations: z* = f(z*; θ, x). Rather than unrolling iterations until convergence, implicit differentiation computes gradients directly through the equilibrium condition. If g(z, θ) = z - f(z; θ), then z* satisfies g(z*, θ) = 0. The implicit function theorem gives ∂z*/∂θ = -(∂g/∂z)⁻¹(∂g/∂θ), computed without storing the iteration history.",
          "Neural ODEs model continuous-depth networks as dz/dt = f(z, t; θ). The adjoint method computes gradients by solving a backward ODE: da/dt = -aᵀ(∂f/∂z), where a is the adjoint state. This is implicit differentiation in disguise—the ODE solution z(T) is defined implicitly by the integral equation, and gradients follow from the adjoint ODE without storing intermediate states. Memory cost is O(1) in depth.",
          "Meta-learning and bi-level optimization involve differentiating through an inner optimization loop: outer objective L(θ) = ℓ(x*(θ), θ) where x*(θ) = argmin_x f(x, θ). The gradient ∇L involves ∂x*/∂θ, computed implicitly via optimality conditions. For x* satisfying ∇ₓf(x*, θ) = 0, the implicit derivative uses the Hessian: ∂x*/∂θ = -(∇²_{xx}f)⁻¹(∇²_{xθ}f). This avoids unrolling potentially thousands of inner iterations.",
          "Implicit layers form a general design pattern: define a layer's output as the solution to an equation, then backprop via implicit differentiation. Examples include optimization layers (differentiable QP solvers), fixed-point layers (DEQs), physical simulation layers (differentiable physics), and SDE solvers. The tradeoff: forward pass may require iterative solving, but backward pass is cheap—one linear solve versus many unrolled gradient computations.",
          "Theoretical guarantees require regularity conditions. The implicit function theorem needs the Jacobian ∂F/∂y to be invertible (or at least surjective for constrained problems). When this fails—singularities, bifurcations, constraint qualification violations—implicit derivatives may not exist or be unique. Regularization (damping, trust regions) ensures the theorem's conditions hold in practice, trading theoretical exactness for numerical stability.",
        ],
        keyIdeas: [
          "Deep equilibrium models: backprop through fixed points without storing iterations",
          "Neural ODEs use adjoint method: backward ODE for O(1) memory gradients",
          "Bi-level optimization: gradients through argmin via implicit Hessian-vector products",
          "Implicit layers: define output as equation solution, backprop via implicit differentiation",
          "Forward may need iterative solve; backward is cheap (one linear solve)",
          "Regularity conditions (∂F/∂y invertible) essential; regularization ensures robustness",
        ],
        equations: [
          "\\[ z^* = f(z^*; \\theta) \\implies \\frac{\\partial z^*}{\\partial \\theta} = -\\left(I - \\frac{\\partial f}{\\partial z}\\right)^{-1} \\frac{\\partial f}{\\partial \\theta} \\]",
          "\\[ \\frac{da}{dt} = -a^T \\frac{\\partial f}{\\partial z}, \\quad a(T) = \\frac{\\partial L}{\\partial z(T)} \\quad \\text{(Adjoint ODE)} \\]",
          "\\[ \\frac{\\partial x^*}{\\partial \\theta} = -\\left(\\nabla^2_{xx} f\\right)^{-1} \\nabla^2_{x\\theta} f \\quad \\text{(Bi-level gradient)} \\]",
          "\\[ \\text{Hessian-vector: } Hv = \\nabla_x [\\nabla f(x)^T v] \\quad \\text{without forming } H \\]",
        ],
        references: [
          "arXiv:1909.01377 - Deep Equilibrium Models (Bai et al.)",
          "arXiv:1806.07366 - Neural Ordinary Differential Equations (Chen et al.)",
          "arXiv:1905.04859 - Hypergradient for Bi-level Optimization (Franceschi et al.)",
          "Amos & Kolter - OptNet: Differentiable Optimization (ICML 2017)",
        ],
      },
    },
  ],
};

export default chapter;
