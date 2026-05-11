import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "chain-rule-high-dim",
  title: "Chain Rule in High Dimensions",
  description:
    "Composing derivatives through computational graphs and automatic differentiation.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The chain rule is how we compute derivatives of functions built from other functions. In one dimension, it's simple: if y = f(g(x)), then dy/dx = f'(g(x)) · g'(x). But in neural networks, we compose millions of functions together, each with thousands of dimensions. The chain rule in high dimensions extends this intuition using matrices and vectors instead of scalar multiplication.",
          "Think of it like passing a message through a chain of people. Each person transforms the message and passes it along. If you want to know how a small change at the start affects the final output, you need to track how each transformation amplifies or shrinks changes. In high dimensions, this 'amplification' becomes a matrix—the Jacobian—and the chain rule says to multiply these matrices together.",
          "In deep learning, this is exactly what backpropagation does. Information flows forward through the network during prediction, then gradient signals flow backward during training. At each layer, we apply the chain rule: the gradient from the next layer gets multiplied by the local Jacobian. This is why training deep networks is fundamentally about the chain rule—it's the mathematical engine that makes learning possible.",
        ],
        keyIdeas: [
          "The chain rule tells us how changes propagate through composed functions",
          "In high dimensions, derivatives become matrices (Jacobians)",
          "Chain rule in high dimensions: multiply Jacobians along the path",
          "Backpropagation is just the chain rule applied to neural networks",
          "Forward pass computes outputs; backward pass computes gradients",
        ],
        equations: [
          "\\[ \\frac{\\partial z}{\\partial x} = \\frac{\\partial z}{\\partial y} \\cdot \\frac{\\partial y}{\\partial x} \\]",
          "\\[ \\text{If } z = f(g(x)), \\text{ then } \\nabla_x z = J_g^T \\nabla_y z \\]",
        ],
        references: [
          "3Blue1Brown - Neural Networks series",
          "StatQuest - Backpropagation",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Formally, for a composition y = f(g(x)) where f: ℝᵐ → ℝᵏ and g: ℝⁿ → ℝᵐ, the chain rule states that the Jacobian of the composition is the matrix product: J_{f∘g}(x) = J_f(g(x)) · J_g(x). Entry (i,j) of this matrix gives ∂yᵢ/∂xⱼ. For scalar outputs (k=1), this reduces to ∇_x y = J_g^T ∇_y y, where ∇_y y is the 'upstream gradient' and J_g^T is the transpose of the local Jacobian.",
          "In implementation, we never materialize the full Jacobian matrix—it's often too large. Instead, we compute Jacobian-vector products (JVPs) or vector-Jacobian products (VJPs). Reverse-mode autodiff (backpropagation) computes VJPs: given an upstream gradient vector v, compute J^T v without forming J. This is efficient when the output is a scalar (loss function) and we need gradients with respect to millions of parameters.",
          "Forward-mode autodiff computes JVPs: given a perturbation direction v, compute Jv. This is efficient when inputs are few and outputs are many. JAX provides both: jax.jacfwd uses forward-mode for Jacobian computation, jax.jacrev uses reverse-mode. PyTorch's autograd is reverse-only, optimized for scalar loss functions typical in deep learning.",
          "The computational graph perspective is essential for understanding framework behavior. Each operation creates a node with inputs and outputs. During the forward pass, we store intermediate values needed for the backward pass. During backprop, we traverse in reverse topological order, accumulating gradients. Memory scales with graph depth, not width—explaining why gradient checkpointing trades compute for memory by not storing all intermediates.",
        ],
        keyIdeas: [
          "Jacobian of composition = matrix product of Jacobians",
          "VJP (reverse mode) is efficient for scalar loss, many parameters",
          "JVP (forward mode) is efficient for few inputs, many outputs",
          "Never materialize full Jacobians—compute JVPs/VJPs directly",
          "Computational graphs enable automatic memory management and gradient accumulation",
          "Gradient checkpointing recomputes intermediates to save memory",
        ],
        equations: [
          "\\[ J_{f \\circ g}(x) = J_f(g(x)) \\cdot J_g(x) \\quad \\text{(Chain Rule for Jacobians)} \\]",
          "\\[ \\nabla_x L = J_g(x)^T \\nabla_y L \\quad \\text{(VJP form)} \\]",
          "\\[ \\frac{\\partial L}{\\partial W} = \\frac{\\partial L}{\\partial y} \\cdot \\frac{\\partial y}{\\partial W} = \\delta \\cdot x^T \\quad \\text{(Linear layer)} \\]",
        ],
        references: [
          "Baydin et al. - Automatic Differentiation in Machine Learning (JMLR 2018)",
          "PyTorch Docs - Autograd mechanics",
          "JAX Docs - Automatic differentiation",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The theory of automatic differentiation rests on the notion of computational graphs as directed acyclic graphs (DAGs). Each primitive operation has a known VJP rule, and composing these via the chain rule yields exact derivatives up to floating-point precision. The key insight is that reverse-mode AD computes all partial derivatives in time proportional to a single forward pass—a factor of 2-3 slowdown compared to the forward computation alone.",
          "Higher-order derivatives require composing differentiation itself. Forward-over-reverse mode computes second derivatives efficiently: use reverse-mode for the first derivative (Hessian-vector products), then forward-mode for directional derivatives. JAX's grad(grad(f)) builds nested VJPs/JVPs automatically. For full Hessians, Hessian-vector products via Pearlmutter's trick avoid O(n²) storage: Hv = ∂/∂x[∇f(x)·v] evaluated with forward-over-reverse.",
          "Custom gradient definitions (torch.autograd.Function, jax.custom_vjp) allow manual specification of VJPs when automatic derivation is inefficient or numerically unstable. The reparameterization trick in VAEs is a canonical example: sampling z ~ N(μ, σ²) becomes z = μ + σ·ε where ε ~ N(0,1), making the sampling operation differentiable. Straight-through estimators use different forward and backward passes, enabling gradients through discrete operations.",
          "Implicit differentiation provides gradients through fixed-point iterations without unrolling. If x* = f(x*, θ) is an implicit function of parameters θ, then ∂x*/∂θ satisfies the implicit function theorem: (I - ∂f/∂x)·∂x*/∂θ = ∂f/∂θ. This enables backpropagation through optimization loops, equilibrium models, and ODE solvers with constant memory—critical for neural ODEs and deep equilibrium models.",
          "Frontier challenges include: differentiable programming beyond neural networks (differentiable physics, rendering, sorting), checkpointing strategies that minimize recomputation, and distributed automatic differentiation across multiple devices. The chain rule's simplicity belies the engineering complexity of making it work at scale—handling control flow, in-place operations, and sparse gradients efficiently remains an active area of framework development.",
        ],
        keyIdeas: [
          "Reverse-mode AD computes all gradients in O(1) forward-pass time",
          "Forward-over-reverse is optimal for Hessian-vector products",
          "Custom VJPs enable gradient tricks: reparameterization, straight-through estimators",
          "Implicit differentiation provides constant-memory gradients through fixed points",
          "Neural ODEs use adjoint sensitivity analysis—chain rule in continuous time",
          "Differentiable sorting, rendering, and physics expand AD beyond traditional NNs",
        ],
        equations: [
          "\\[ \\text{VJP: } \\bar{x} = J^T \\bar{y} = \\left(\\frac{\\partial y}{\\partial x}\\right)^T \\bar{y} \\]",
          "\\[ Hv = \\frac{\\partial}{\\partial x}\\left[\\nabla f(x)^T v\\right] \\quad \\text{(Pearlmutter's trick)} \\]",
          "\\[ \\frac{\\partial x^*}{\\partial \\theta} = (I - J_x)^{-1} J_\\theta \\quad \\text{(Implicit Function Theorem)} \\]",
          "\\[ \\frac{dz}{dt} = f(z, t, \\theta) \\implies \\frac{dL}{d\\theta} = -\\int_T^0 a(t)^T \\frac{\\partial f}{\\partial \\theta} dt \\]",
        ],
        references: [
          "arXiv:1502.05767 - Automatic Differentiation in Machine Learning: A Survey",
          "arXiv:1806.07366 - Neural Ordinary Differential Equations",
          "arXiv:1909.01377 - Deep Equilibrium Models",
          "Griewank & Walther - Evaluating Derivatives: Principles of AD",
        ],
      },
    },
  ],
};

export default chapter;
