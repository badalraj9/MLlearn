import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "gradient-jacobian",
  title: "Gradient & Jacobian",
  description:
    "First-order derivative structures for scalar and vector functions.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The gradient is a vector that points in the direction of steepest ascent of a scalar function. If you're standing on a hillside, the gradient tells you which way is 'straight uphill'—the direction where the height increases fastest. Walk in the direction of the gradient to go up; walk opposite to go down. The length of the gradient tells you how steep the hill is at your current location.",
          "For a function f(x, y), the gradient is ∇f = [∂f/∂x, ∂f/∂y]—a vector of partial derivatives. Each component tells you how fast the function changes when you wiggle that particular input while holding others fixed. If ∂f/∂x = 2, then increasing x by a small amount increases f by about twice that amount. The gradient collects all these individual sensitivities into a single vector.",
          "The Jacobian generalizes this idea to vector-valued functions. If your function outputs a vector instead of a scalar—like a neural network layer that takes n inputs and produces m outputs—the Jacobian is a matrix where row i, column j contains ∂output_i/∂input_j. It's essentially the 'gradient' for each output component, stacked as rows. For scalar outputs (m=1), the Jacobian is just the gradient written as a row vector.",
        ],
        keyIdeas: [
          "The gradient points toward steepest increase; its magnitude is the slope",
          "Gradient descent moves OPPOSITE to the gradient to minimize loss",
          "Each gradient component shows sensitivity to one input variable",
          "The Jacobian is the matrix of all partial derivatives for vector-valued functions",
          "Jacobian row i = gradient of output_i with respect to all inputs",
        ],
        equations: [
          "\\[ \\nabla f = \\left[ \\frac{\\partial f}{\\partial x_1}, \\frac{\\partial f}{\\partial x_2}, \\ldots, \\frac{\\partial f}{\\partial x_n} \\right] \\]",
          "\\[ J = \\begin{bmatrix} \\frac{\\partial f_1}{\\partial x_1} & \\cdots & \\frac{\\partial f_1}{\\partial x_n} \\\\\\ \\vdots & \\ddots & \\vdots \\\\\\ \\frac{\\partial f_m}{\\partial x_1} & \\cdots & \\frac{\\partial f_m}{\\partial x_n} \\end{bmatrix} \\]",
        ],
        references: [
          "3Blue1Brown - Gradient (Essence of Calculus)",
          "Khan Academy - Multivariable Calculus",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Formally, for f: ℝⁿ → ℝ, the gradient ∇f(x) ∈ ℝⁿ is defined as the vector of partial derivatives. It is the unique vector such that the directional derivative in any direction u is Dᵤf = ∇f · u = ‖∇f‖ ‖u‖ cos θ, where θ is the angle between ∇f and u. This dot product form shows that the maximum directional derivative occurs when u points in the gradient direction—confirming that ∇f points along steepest ascent.",
          "The Jacobian matrix J ∈ ℝᵐˣⁿ for f: ℝⁿ → ℝᵐ has entries Jᵢⱼ = ∂fᵢ/∂xⱼ. When m=1, the Jacobian reduces to the gradient (as a row vector). For a composition y = f(g(x)), the chain rule states that J_{f∘g} = J_f · J_g—matrix multiplication. This is why backpropagation involves transposed Jacobians: gradients flow backward through transposed weight matrices.",
          "In deep learning, backpropagation computes vector-Jacobian products (VJPs) efficiently—never materializing the full Jacobian matrix. Given upstream gradient ∂L/∂y and Jacobian J = ∂y/∂x, the VJP computes ∂L/∂x = Jᵀ(∂L/∂y). For a linear layer y = Wx, the Jacobian is W itself, so ∂L/∂x = Wᵀ(∂L/∂y). This transposition is why weight matrices appear transposed in backward passes.",
          "Common pitfall: confusing row vs column conventions. In mathematics, gradients are typically column vectors; Jacobians have gradient rows. In PyTorch, gradients are stored as same-shape tensors. The key insight: reverse-mode autodiff (backprop) computes VJPs, which is efficient when outputs ≪ inputs—exactly the case for neural networks with scalar loss and millions of parameters.",
        ],
        keyIdeas: [
          "Directional derivative: Dᵤf = ∇f · u is maximized when u aligns with ∇f",
          "Jacobian of composition = matrix product: J_{f∘g} = J_f · J_g",
          "VJP (reverse mode) is efficient when outputs ≪ inputs—standard in neural networks",
          "JVP (forward mode) is efficient when inputs ≪ outputs",
          "Backprop never materializes full Jacobians—only VJPs or JVPs",
          "Linear layer: ∂L/∂x = Wᵀ(∂L/∂y); weight transpose in backward pass",
        ],
        equations: [
          "\\[ D_u f(x) = \\nabla f(x) \\cdot u = \\|\\nabla f(x)\\| \\cos\\theta \\]",
          "\\[ J_{f \\circ g} = J_f \\cdot J_g \\quad \\text{(Chain rule for Jacobians)} \\]",
          "\\[ \\frac{\\partial L}{\\partial x} = J^T \\frac{\\partial L}{\\partial y} \\quad \\text{(VJP form)} \\]",
          "\\[ \\text{Linear layer: } \\frac{\\partial L}{\\partial W} = \\frac{\\partial L}{\\partial y} x^T, \\quad \\frac{\\partial L}{\\partial x} = W^T \\frac{\\partial L}{\\partial y} \\]",
        ],
        references: [
          "Boyd & Vandenberghe - Convex Optimization, Appendix A",
          "PyTorch Docs - Autograd Mechanics",
          "Baydin et al. - Automatic Differentiation in Machine Learning (JMLR 2018)",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The Jacobian plays a central role in normalizing flows, where the change of variables formula requires computing log|det(J)|—typically O(n³). Architectures like RealNVP and Glow design transformations with triangular Jacobians, reducing determinant computation to O(n) by making the determinant the product of diagonal entries. This enables high-dimensional density estimation with tractable likelihoods.",
          "In neural ODE frameworks, the instantaneous change of variables relates to the trace of the Jacobian: d/dt log p(z(t)) = -tr(∂f/∂z). Hutchinson's trace estimator approximates this without computing the full Jacobian: tr(J) ≈ vᵀJv for random v with E[vvᵀ] = I. This makes ODE-based generative models tractable for high dimensions.",
          "The Fisher Information Matrix (FIM) is the expected outer product of the gradient of log-likelihood: F = E[∇ log p(x|θ) ∇ log p(x|θ)ᵀ]. It defines a Riemannian metric on parameter space, measuring how sensitive the distribution is to parameter changes. Natural gradient descent uses F⁻¹ as a preconditioner: θ ← θ - αF⁻¹∇L, following the steepest descent in the natural geometry of probability distributions.",
          "Jacobian regularization penalizes ‖J‖_F to make functions less sensitive to input perturbations, improving adversarial robustness. The spectral norm ‖J‖₂ bounds the Lipschitz constant: if ‖J(x)‖₂ ≤ K for all x, then ‖f(x) - f(y)‖ ≤ K‖x - y‖. Spectral normalization enforces this constraint, stabilizing GAN training by bounding discriminator gradients.",
          "Implicit differentiation avoids materializing Jacobians in optimization loops. If x* = argmin_x g(x, θ) depends on parameters θ, then ∂x*/∂θ satisfies the implicit function theorem: (∂²g/∂x²) · (∂x*/∂θ) = -∂²g/∂x∂θ. This enables backpropagation through optimization (meta-learning), equilibrium models, and hyperparameter tuning with constant memory—no need to store the unrolled optimization trajectory.",
        ],
        keyIdeas: [
          "Normalizing flows need efficient Jacobian determinant: triangular J gives O(n)",
          "Neural ODEs use Hutchinson's trace estimator for tractable density computation",
          "Fisher Information Matrix = expected ∇log p · ∇log pᵀ; natural gradient uses F⁻¹",
          "Jacobian spectral norm bounds Lipschitz constant; spectral normalization stabilizes GANs",
          "Implicit differentiation provides gradients through fixed points without unrolling",
          "Jacobian-free Newton-Krylov methods solve large systems without forming Jacobians",
        ],
        equations: [
          "\\[ \\log p(x) = \\log p(z) + \\log \\left| \\det \\frac{\\partial f^{-1}}{\\partial x} \\right| \\quad \\text{(Change of variables)} \\]",
          "\\[ F = \\mathbb{E}\\left[ \\nabla_\\theta \\log p(x|\\theta) \\, \\nabla_\\theta \\log p(x|\\theta)^\\top \\right] \\]",
          "\\[ \\text{Natural gradient: } \\theta_{k+1} = \\theta_k - \\alpha F^{-1} \\nabla L(\\theta_k) \\]",
          "\\[ \\text{Implicit: } \\left(\\frac{\\partial^2 g}{\\partial x^2}\\right) \\frac{\\partial x^*}{\\partial \\theta} = -\\frac{\\partial^2 g}{\\partial x \\partial \\theta} \\]",
        ],
        references: [
          "arXiv:1505.05770 - Variational Inference with Normalizing Flows",
          "arXiv:1806.07366 - Neural Ordinary Differential Equations",
          "Amari - Natural Gradient Works Efficiently in Learning",
          "arXiv:1909.01377 - Deep Equilibrium Models",
        ],
      },
    },
  ],
};

export default chapter;
