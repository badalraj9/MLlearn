import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "convex-functions",
  title: "Convex Functions",
  description:
    "Functions with a single global minimum and the geometry of optimization landscapes.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A convex function is shaped like a bowl—it curves upward everywhere, with a single lowest point at the bottom. If you drop a ball anywhere on the surface of a convex function, it will always roll down to the same global minimum. This is fundamentally different from non-convex functions, which can have many valleys and local minima where a ball might get trapped. The word 'convex' comes from Latin meaning 'arched' or 'vaulted.'",
          "The defining property is beautifully simple: for any two points on the graph, the line segment connecting them lies above or on the graph. Imagine stretching a rubber band between any two points on the curve—the rubber band never dips below the curve. This is the 'bowl shape' captured mathematically. Functions like x², eˣ, and -log(x) are convex; functions like x³, sin(x), and 1/x (for x>0) are not.",
          "Convex functions are the 'easy' problems in optimization. When minimizing a convex function, any local minimum is automatically the global minimum—there are no false valleys to trap you. This is why linear regression, logistic regression, and support vector machines are tractable: their loss functions are convex. Neural networks are hard precisely because their loss landscapes are non-convex, with countless local minima, saddle points, and flat regions.",
        ],
        keyIdeas: [
          "Convex functions are bowl-shaped: they curve upward everywhere",
          "Any local minimum of a convex function is also the global minimum",
          "The line segment between any two points stays above the graph",
          "Convex optimization problems have unique, findable solutions",
          "Many ML loss functions (squared error, logistic loss) are convex",
        ],
        equations: [
          "\\[ f(\\lambda x + (1-\\lambda)y) \\leq \\lambda f(x) + (1-\\lambda) f(y) \\quad \\forall \\lambda \\in [0,1] \\]",
          "\\[ \\text{Jensen's Inequality: } f(\\mathbb{E}[X]) \\leq \\mathbb{E}[f(X)] \\]",
        ],
        references: [
          "3Blue1Brown - Optimization landscapes",
          "StatQuest - Logistic Regression",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "For differentiable functions, convexity has a first-order characterization: f(y) ≥ f(x) + ∇f(x)ᵀ(y-x) for all x, y. Geometrically, the function lies above its tangent hyperplanes everywhere. This is equivalent to the definition and often easier to verify. A twice-differentiable function is convex if and only if its Hessian ∇²f(x) is positive semidefinite for all x—all eigenvalues are non-negative.",
          "Key operations preserve convexity. The sum of convex functions is convex. The maximum of convex functions is convex. Composition with affine functions f(Ax+b) is convex if f is convex. These rules let us build complex convex functions from simple ones: regularized logistic loss L(θ) = Σlog(1+exp(-yᵢθᵀxᵢ)) + λ‖θ‖² is convex because logistic loss and L2 regularization are both convex.",
          "Convex optimization algorithms exploit this structure. Gradient descent on convex functions converges at rate O(1/t) or O(1/t²) with accelerated methods. Strong convexity—a stricter condition where ∇²f(x) ≥ μI for some μ > 0—guarantees linear convergence: the error decreases by a constant factor each iteration. Adding strong convexity (via L2 regularization) is a common trick to speed up convergence.",
          "Implementation tips: many optimization libraries (CVXPY, Convex.jl) let you declare problems in natural form and automatically verify convexity. For custom gradient descent, check that loss decreases monotonically—if it oscillates, your problem may be non-convex or your step size too large. Line search and trust region methods adapt step sizes automatically for convex problems.",
        ],
        keyIdeas: [
          "First-order condition: function lies above all tangent planes",
          "Second-order condition: Hessian is positive semidefinite everywhere",
          "Sums, maxima, and affine compositions preserve convexity",
          "Strong convexity (Hessian ≥ μI) guarantees linear convergence rates",
          "L2 regularization adds strong convexity to any smooth loss",
          "CVXPY and similar tools verify convexity automatically",
        ],
        equations: [
          "\\[ f(y) \\geq f(x) + \\nabla f(x)^T(y - x) \\quad \\text{(First-order condition)} \\]",
          "\\[ \\nabla^2 f(x) \\succeq 0 \\quad \\text{(Hessian PSD)} \\]",
          "\\[ f(x) - \\frac{\\mu}{2}\\|x\\|^2 \\text{ is convex} \\iff f \\text{ is } \\mu\\text{-strongly convex} \\]",
          "\\[ \\|x_{t+1} - x^*\\|^2 \\leq \\left(1 - \\frac{\\mu}{L}\\right)\\|x_t - x^*\\|^2 \\quad \\text{(Linear convergence)} \\]",
        ],
        references: [
          "Boyd & Vandenberghe - Convex Optimization, Chapters 3-4",
          "Nesterov - Introductory Lectures on Convex Optimization",
          "Rockafellar - Convex Analysis",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The convex conjugate f*(y) = sup_x {yᵀx - f(x)} transforms convex functions into a dual representation. This Legendre-Fenchel transform is its own inverse for closed convex functions: f** = f. Conjugate pairs reveal deep structure: the conjugate of ½‖x‖² is ½‖y‖²; the conjugate of log(1+eˣ) is y log y + (1-y) log(1-y). Duality theory uses conjugates to derive dual optimization problems and prove strong duality via Slater's condition.",
          "Subgradients extend derivatives to non-smooth convex functions. For convex f, g ∈ ∂f(x) means f(y) ≥ f(x) + gᵀ(y-x) for all y—a subgradient is any supporting hyperplane. Non-differentiable points have multiple subgradients; the subdifferential ∂f(x) is the set of all of them. Subgradient methods converge at rate O(1/√t), slower than gradient descent, but proximal methods achieve O(1/t) even for non-smooth problems.",
          "Proximal operators enable optimization of composite objectives f(x) + g(x) where f is smooth and g is 'simple' but possibly non-smooth (like L1 regularization). The proximal operator prox_g(v) = argmin_x {g(x) + ½‖x-v‖²} can often be computed in closed form: for L1, it's the soft-thresholding operator. Proximal gradient descent and FISTA (accelerated) achieve convergence rates matching smooth optimization while handling non-smooth regularizers.",
          "Condition number κ = L/μ (ratio of smoothness to strong convexity parameters) determines convergence speed—higher κ means slower convergence. Preconditioning, Newton's method, and quasi-Newton methods (L-BFGS) effectively reduce κ by approximating local curvature. Interior point methods achieve log(1/ε) iteration complexity for ε-accurate solutions by transforming constrained problems into unconstrained barrier problems.",
          "Statistical learning theory connects convexity to generalization. For convex losses in the supervised learning setting, Rademacher complexity bounds uniform convergence, and stability-based bounds show that strongly convex objectives yield stable algorithms that generalize. The convexity of the loss landscape directly impacts both optimization speed and generalization guarantees—non-convex neural networks lack these theoretical guarantees, explaining why theory lags practice in deep learning.",
        ],
        keyIdeas: [
          "Convex conjugate f*(y) = sup_x {yᵀx - f(x)} enables duality theory",
          "Subgradients extend derivatives to non-smooth convex functions",
          "Proximal methods handle composite objectives with non-smooth regularizers",
          "Condition number κ = L/μ controls convergence rate; preconditioning reduces it",
          "Interior point methods achieve logarithmic convergence via barrier functions",
          "Strong convexity implies algorithmic stability and generalization bounds",
        ],
        equations: [
          "\\[ f^*(y) = \\sup_x \\{ y^T x - f(x) \\} \\quad \\text{(Convex conjugate)} \\]",
          "\\[ \\partial f(x) = \\{ g : f(y) \\geq f(x) + g^T(y-x), \\forall y \\} \\quad \\text{(Subdifferential)} \\]",
          "\\[ \\text{prox}_g(v) = \\arg\\min_x \\left\\{ g(x) + \\frac{1}{2}\\|x - v\\|^2 \\right\\} \\]",
          "\\[ \\text{FISTA: } x_{k+1} = \\text{prox}_{\\eta g}(y_k - \\eta \\nabla f(y_k)) \\quad O(1/k^2) \\text{ rate} \\]",
        ],
        references: [
          "Boyd & Vandenberghe - Convex Optimization, Chapter 5 (Duality)",
          "Parikh & Boyd - Proximal Algorithms",
          "Boucheron et al. - Theory of Classification: A Survey of Some Recent Advances",
          "Hardt et al. - Train Faster, Generalize Better (Stability and SGD)",
        ],
      },
    },
  ],
};

export default chapter;
