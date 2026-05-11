import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "gradient-methods",
  title: "Gradient Methods",
  description:
    "First-order optimization algorithms that follow the gradient downhill.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Gradient descent is the simplest optimization algorithm: repeatedly take steps in the direction that decreases your loss the most. Since the gradient points toward steepest increase, the negative gradient points toward steepest decrease. Each iteration updates parameters by θ ← θ - α∇f(θ), where α is the step size (learning rate). It's like walking downhill in fog—you can't see the bottom, but you can always feel which way is down.",
          "The learning rate α is the most important hyperparameter. Too small, and training takes forever—imagine taking tiny baby steps down a mountain. Too large, and you overshoot the minimum, possibly bouncing around or diverging entirely. Finding the right learning rate often requires experimentation: start with values like 0.1, 0.01, 0.001 and observe the loss curve. A good learning rate shows steady decrease; too small shows almost no progress; too large shows oscillation or explosion.",
          "Stochastic gradient descent (SGD) adds a crucial twist: instead of computing the gradient on all data (which is expensive), compute it on a small random subset (minibatch). This introduces noise but enables training on massive datasets. The noise isn't just a nuisance—it can help escape shallow local minima and find better solutions. Modern deep learning essentially relies on SGD with minibatches as the foundational optimizer.",
        ],
        keyIdeas: [
          "Gradient descent: take steps opposite to the gradient to minimize loss",
          "Learning rate controls step size; too small is slow, too large diverges",
          "SGD uses minibatches instead of full data for computational efficiency",
          "Minibatch noise can help escape poor local minima",
          "The loss curve reveals whether learning rate is appropriate",
        ],
        equations: [
          "\\[ \\theta_{t+1} = \\theta_t - \\alpha \\nabla f(\\theta_t) \\quad \\text{(Gradient descent)} \\]",
          "\\[ \\theta_{t+1} = \\theta_t - \\alpha \\nabla f_{\\text{batch}}(\\theta_t) \\quad \\text{(SGD)} \\]",
        ],
        references: [
          "3Blue1Brown - Gradient Descent",
          "Andrew Ng - Machine Learning Course (Optimizer lecture)",
        ],
      },
      playground: {
        type: "widget",
        widgetId: "gradient-descent-viz",
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Convergence guarantees for gradient descent depend on problem structure. For L-smooth functions (gradient Lipschitz), gradient descent with α ≤ 1/L guarantees f(x_{t+1}) ≤ f(x_t). For μ-strongly convex functions, gradient descent achieves linear convergence: ‖x_t - x*‖ ≤ (1 - μ/L)ᵗ‖x₀ - x*‖. The ratio κ = L/μ (condition number) determines speed—ill-conditioned problems require many iterations.",
          "Momentum accelerates gradient descent by accumulating a velocity vector: v_{t+1} = βv_t - α∇f(θ_t), θ_{t+1} = θ_t + v_{t+1}. The hyperparameter β (typically 0.9) controls how much past gradients influence the current step. Momentum dampens oscillations in narrow valleys and accelerates progress along consistent descent directions. Nesterov momentum ('Nesterov accelerated gradient') computes the gradient at the anticipated next position for even faster convergence.",
          "Adaptive methods adjust learning rates per parameter based on gradient history. AdaGrad accumulates squared gradients and divides by their sum, automatically reducing learning rates for frequently-updated parameters. RMSprop improves on AdaGrad by using an exponential moving average instead of sum. Adam combines momentum with RMSprop: m_t = β₁m_{t-1} + (1-β₁)g_t (momentum), v_t = β₂v_{t-1} + (1-β₂)g_t² (RMSprop), θ_{t+1} = θ_t - α·m̂_t/√v̂_t.",
          "Practical considerations: Adam with default settings (β₁=0.9, β₂=0.999, α=0.001) is a good starting point for most problems. For best generalization, SGD with momentum and learning rate decay often outperforms Adam—Adam's adaptive learning rates can cause convergence to sharp minima. Learning rate schedules (step decay, cosine annealing, warm restarts) improve final performance by starting large and decreasing over time. Gradient clipping prevents exploding gradients in RNNs and transformers.",
        ],
        keyIdeas: [
          "L-smoothness guarantees descent with α ≤ 1/L; strong convexity gives linear convergence",
          "Momentum (β ≈ 0.9) accelerates convergence and dampens oscillations",
          "Nesterov momentum looks ahead for improved convergence rates",
          "Adam = momentum + RMSprop; good default with α=0.001, β₁=0.9, β₂=0.999",
          "SGD with momentum often generalizes better than adaptive methods",
          "Learning rate schedules: step decay, cosine annealing, warmup improve final performance",
        ],
        equations: [
          "\\[ v_t = \\beta v_{t-1} - \\alpha \\nabla f(\\theta_t), \\quad \\theta_{t+1} = \\theta_t + v_t \\quad \\text{(Momentum)} \\]",
          "\\[ m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2 \\quad \\text{(Adam)} \\]",
          "\\[ \\hat{m}_t = \\frac{m_t}{1-\\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1-\\beta_2^t}, \\quad \\theta_{t+1} = \\theta_t - \\alpha \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon} \\]",
          "\\[ \\text{Convergence rate: } f(x_t) - f(x^*) \\leq O\\left(\\frac{1}{t}\\right) \\text{ or } O\\left(\\left(1 - \\sqrt{\\frac{\\mu}{L}}\\right)^t\\right) \\]",
        ],
        references: [
          "Boyd & Vandenberghe - Convex Optimization, Chapter 9",
          "Ruder - An Overview of Gradient Descent Optimization Algorithms (arXiv:1609.04747)",
          "Kingma & Ba - Adam: A Method for Stochastic Optimization (ICLR 2015)",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Nesterov's accelerated gradient descent achieves optimal convergence rate O(1/t²) for smooth convex functions, improving on the O(1/t) rate of standard gradient descent. The key insight: use a 'lookahead' gradient evaluation at an extrapolated point. The proof technique constructs a 'estimate sequence' that converges to the optimal value, with the algorithm maintaining this sequence implicitly. For strongly convex functions, NAG achieves the optimal linear rate with improved constants.",
          "The theory of SGD convergence distinguishes between finite-sum problems (fixed dataset) and streaming settings. In the finite-sum case, variance reduction methods (SAG, SVRG, SARAH) achieve linear convergence by occasionally computing full gradients to control variance. In the streaming setting, decreasing learning rates α_t ∝ 1/√t or 1/t are necessary for convergence—the gradient noise prevents convergence with constant step size.",
          "Adaptive methods have subtle theoretical properties. Adam's convergence proof was shown to be incorrect in certain non-convex settings; AMSGrad fixes this by ensuring the learning rate doesn't increase. The 'generalization gap' between SGD and Adam remains an active research area: adaptive methods tend to find sharp minima with poor generalization, while SGD finds flat minima. Recent work on AdaBound and RAdam attempts to combine adaptive learning rates with SGD-like generalization.",
          "Distributed and federated optimization extends gradient methods to multiple machines. Synchronous SGD averages gradients across workers; asynchronous SGD updates without waiting for stragglers but introduces staleness. Local SGD (federated averaging) takes multiple local steps before synchronization, reducing communication. Compression techniques (gradient sparsification, quantization) reduce bandwidth requirements at the cost of increased noise.",
          "Second-order information can accelerate first-order methods. Quasi-Newton methods (BFGS, L-BFGS) approximate the inverse Hessian using gradient differences, achieving superlinear convergence without computing Hessians. Preconditioning with diagonal Hessian approximations (AdaGrad, K-FAC) improves conditioning. Natural gradient methods use the Fisher information matrix as preconditioner, following the steepest descent in distribution space rather than parameter space.",
        ],
        keyIdeas: [
          "Nesterov acceleration achieves optimal O(1/t²) rate for smooth convex optimization",
          "Variance reduction (SVRG, SAG) gives linear convergence for finite-sum problems",
          "Adam has convergence issues; AMSGrad fixes the monotonicity problem",
          "SGD finds flat minima; adaptive methods may find sharp minima with worse generalization",
          "Distributed SGD: synchronous vs asynchronous, local steps reduce communication",
          "Quasi-Newton methods (L-BFGS) approximate curvature for faster convergence",
        ],
        equations: [
          "\\[ y_t = \\theta_t + \\frac{t-1}{t+2}(\\theta_t - \\theta_{t-1}), \\quad \\theta_{t+1} = y_t - \\alpha \\nabla f(y_t) \\quad \\text{(NAG)} \\]",
          "\\[ \\mathbb{E}[\\|\\theta_t - \\theta^*\\|^2] \\leq O\\left(\\frac{1}{t}\\right) \\text{ for SGD with } \\alpha_t \\propto \\frac{1}{t} \\]",
          "\\[ \\text{SVRG: } \\tilde{\\theta} = \\theta_t, \\quad v_t = \\nabla f_i(\\theta_t) - \\nabla f_i(\\tilde{\\theta}) + \\nabla f(\\tilde{\\theta}) \\]",
          "\\[ \\text{K-FAC: } \\Delta \\theta \\approx -\\alpha (\\mathbb{E}[aa^T] \\otimes \\mathbb{E}[gg^T])^{-1} g \\]",
        ],
        references: [
          "Nesterov - Introductory Lectures on Convex Optimization, Chapter 2",
          "arXiv:1609.04747 - Ruder: Gradient Descent Optimization Overview",
          "arXiv:1904.09237 - On the Convergence of Adam and Beyond",
          "Bottou et al. - Optimization Methods for Large-Scale ML (SIREV 2018)",
        ],
      },
    },
  ],
};

export default chapter;
