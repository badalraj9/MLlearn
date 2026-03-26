import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "hessian",
  title: "Hessian",
  description:
    "Second-order derivatives and the curvature structure of multivariate functions.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The Hessian is to curvature what the gradient is to slope. While the gradient tells you which direction points uphill, the Hessian tells you how the slope itself is changing—a measure of curvature. For a function f(x, y), the Hessian is a 2×2 matrix of second partial derivatives, capturing how the function curves in every direction.",
          "Think of standing on a hillside. The gradient tells you which way is steepest. But the Hessian tells you more: is the hillside convex like a bowl (you'll roll to the bottom), concave like a dome (you'll roll off the sides), or shaped like a saddle (you might roll down in one direction but up in another)? The Hessian's eigenvalues reveal this shape: all positive means bowl-shaped, all negative means dome-shaped, mixed signs means saddle-shaped.",
          "At a minimum, the Hessian is positive definite—all eigenvalues positive, meaning the function curves upward in every direction. At a maximum, it's negative definite. At a saddle point, eigenvalues have mixed signs, making it unstable in some directions. This is why checking the Hessian is crucial for confirming that a critical point (where gradient = 0) is actually a minimum and not a maximum or saddle.",
        ],
        keyIdeas: [
          "The Hessian H captures second-order curvature information",
          "H_ij = ∂²f/∂xᵢ∂xⱼ: matrix of all second partial derivatives",
          "Positive definite Hessian = all eigenvalues > 0 = local minimum",
          "Negative definite = all eigenvalues < 0 = local maximum",
          "Mixed eigenvalue signs = saddle point (unstable equilibrium)",
        ],
        equations: [
          "\\[ H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j} \\]",
          "\\[ H = \\begin{bmatrix} \\frac{\\partial^2 f}{\\partial x_1^2} & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_2} & \\cdots \\\\\\ \\frac{\\partial^2 f}{\\partial x_2 \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_2^2} & \\cdots \\\\\\ \\vdots & \\vdots & \\ddots \\end{bmatrix} \\]",
        ],
        references: [
          "3Blue1Brown - Second Derivatives and Curvature",
          "Khan Academy - Second derivative test",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The Hessian is symmetric for smooth functions (Clairaut's theorem: ∂²f/∂x∂y = ∂²f/∂y∂x). This symmetry is crucial—it means the Hessian has real eigenvalues and orthogonal eigenvectors. The eigenvalue decomposition H = QΛQᵀ reveals the principal curvatures: eigenvalues give curvature magnitude along eigenvector directions. Large eigenvalues mean steep curvature (narrow valleys); small eigenvalues mean gentle curvature (flat directions).",
          "Newton's method uses the Hessian for faster convergence: θ_{t+1} = θ_t - H⁻¹∇f(θ_t). While gradient descent takes O(1/ε) iterations to reach ε-accuracy, Newton's method takes O(log log 1/ε) iterations for convex functions—quadratic convergence. The Hessian automatically adapts step sizes: large steps in flat directions (small eigenvalues → large H⁻¹), small steps in steep directions (large eigenvalues → small H⁻¹).",
          "Computing the full Hessian is expensive: O(n²) storage and O(n³) for inversion. Practical alternatives include quasi-Newton methods (BFGS, L-BFGS) that build Hessian approximations from gradient differences, and Hessian-free methods that compute Hessian-vector products H·v in O(n) time without forming H explicitly. For deep learning, even storing the Hessian is impossible for millions of parameters.",
          "Second-order conditions for optimization: ∇f = 0 and H positive semidefinite is necessary for a minimum; ∇f = 0 and H positive definite is sufficient. For constrained optimization, the Hessian of the Lagrangian projected onto the constraint manifold determines optimality. Ill-conditioned Hessians (large ratio between largest and smallest eigenvalues) cause slow convergence for gradient descent—this is why preconditioning matters.",
        ],
        keyIdeas: [
          "Hessian symmetry guarantees real eigenvalues and orthogonal eigenvectors",
          "Newton's method: θ ← θ - H⁻¹∇f achieves quadratic convergence",
          "H⁻¹ automatically scales steps: large in flat, small in steep directions",
          "L-BFGS approximates H⁻¹ from gradient history without storing H",
          "Hessian-vector products H·v computable in O(n) without forming H",
          "Condition number κ(H) = λ_max/λ_min determines convergence speed",
        ],
        equations: [
          "\\[ \\text{Newton: } \\theta_{t+1} = \\theta_t - H^{-1} \\nabla f(\\theta_t) \\]",
          "\\[ f(\\theta + \\Delta) \\approx f(\\theta) + \\nabla f(\\theta)^T \\Delta + \\frac{1}{2} \\Delta^T H \\Delta \\quad \\text{(Second-order Taylor)} \\]",
          "\\[ \\text{Convergence: Gradient } O(1/\\epsilon), \\text{ Newton } O(\\log\\log 1/\\epsilon) \\]",
          "\\[ \\text{Hessian-vector: } Hv = \\lim_{\\epsilon \\to 0} \\frac{\\nabla f(\\theta + \\epsilon v) - \\nabla f(\\theta)}{\\epsilon} \\]",
        ],
        references: [
          "Nocedal & Wright - Numerical Optimization, Chapters 3, 6",
          "Boyd & Vandenberghe - Convex Optimization, Chapter 9",
          "Martens - Deep Learning via Hessian-Free Optimization (ICML 2010)",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The Hessian's eigenvalue spectrum in deep learning reveals the loss landscape structure. Near minima, the spectrum is typically: many near-zero eigenvalues (flat directions), a bulk of small positive eigenvalues, and a few large positive eigenvalues. The large eigenvalues create narrow valleys that slow gradient descent. Dauphin et al. showed that saddle points vastly outnumber local minima in high dimensions, making Hessian eigendecomposition crucial for understanding optimization dynamics.",
          "K-FAC (Kronecker-Factored Approximate Curvature) exploits neural network structure to approximate the Fisher Information Matrix (often close to the Hessian for classification). For a layer with input activations a and gradients g, K-FAC approximates the Fisher as E[aaᵀ] ⊗ E[ggᵀ], factorizing the n²×n² matrix into two n×n matrices. This enables tractable natural gradient updates for networks with millions of parameters.",
          "Hessian-vector products enable efficient second-order information without materializing H. Pearlmutter's trick computes Hv = ∂/∂ε[∇f(θ + εv)]|_{ε=0} using a single additional forward and backward pass in O(n) time. This enables conjugate gradient methods that approximate Newton steps, power iteration for largest eigenvalue, and Lanczos methods for spectral analysis—all without O(n²) storage.",
          "The generalized Gauss-Newton matrix G = JᵀH_ℓJ (where J is the Jacobian of predictions w.r.t. parameters, H_ℓ is the loss Hessian) is always positive semidefinite and equals the Fisher Information for exponential family losses. G approximates the Hessian for small residuals and avoids negative curvature issues. Empirical studies show G often captures the 'useful' curvature while ignoring negative eigenvalues from the full Hessian.",
          "Recent research on loss landscapes connects Hessian spectra to generalization. Flat minima (small Hessian eigenvalues) correlate with better generalization—sharp minima are more sensitive to parameter perturbations. Sharpness-Aware Minimization (SAM) explicitly penalizes sharp minima by maximizing loss in a small neighborhood before taking a gradient step. This implicit regularization via curvature connects optimization geometry to statistical learning theory.",
        ],
        keyIdeas: [
          "Hessian spectra in deep networks: many flat directions, few large eigenvalues",
          "Saddle points vastly outnumber local minima in high dimensions",
          "K-FAC factorizes Fisher as E[aaᵀ] ⊗ E[ggᵀ] for tractable natural gradient",
          "Pearlmutter's trick: Hessian-vector products in O(n) via finite differences",
          "Gauss-Newton matrix G = JᵀH_ℓJ is always PSD; approximates Hessian for small residuals",
          "Flat minima (small Hessian eigenvalues) correlate with good generalization; SAM exploits this",
        ],
        equations: [
          "\\[ Hv = \\frac{\\partial}{\\partial \\epsilon} \\nabla f(\\theta + \\epsilon v) \\bigg|_{\\epsilon=0} \\quad \\text{(Pearlmutter)} \\]",
          "\\[ \\text{K-FAC: } F \\approx \\mathbb{E}[aa^T] \\otimes \\mathbb{E}[gg^T] \\]",
          "\\[ G = J^T H_\\ell J \\quad \\text{(Gauss-Newton)} \\]",
          "\\[ \\text{SAM: } \\theta_{t+1} = \\theta_t - \\alpha \\nabla f(\\theta_t + \\epsilon \\nabla f(\\theta_t) / \\|\\nabla f(\\theta_t)\\|) \\]",
        ],
        references: [
          "arXiv:1406.2572 - Dauphin et al.: Identifying and Attacking the Saddle Point Problem",
          "Martens & Grosse - Optimizing Neural Networks with Kronecker-factored Approximate Curvature",
          "Foret et al. - Sharpness-Aware Minimization (ICLR 2021)",
          "Papyan - The Full Spectrum of Deepnet Hessians at Scale (ICLR 2019)",
        ],
      },
    },
  ],
};

export default chapter;
