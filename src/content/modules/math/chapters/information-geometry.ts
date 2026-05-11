import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "information-geometry",
  title: "Information Geometry",
  description:
    "The geometric structure of probability distributions and statistical inference.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Information geometry asks a beautiful question: what if probability distributions were points on a curved surface? A normal distribution N(μ, σ²) is specified by two parameters, so it lives in a 2D space. But this space isn't flat like a sheet of paper—it's curved. Nearby distributions are 'close' in a meaningful sense; distant distributions are very different. This geometric view transforms statistics into geometry.",
          "The key insight is that 'distance' between distributions should measure how hard it is to tell them apart. Two normals with nearly identical means and variances are close—your data probably can't distinguish them. A normal and an exponential are far apart—completely different shapes. The natural distance measure is KL divergence: D_KL(P‖Q) tells you how much information you lose by approximating P with Q.",
          "Why does this matter? In flat Euclidean space, the shortest path between two points is a straight line. On a curved statistical manifold, the shortest path between two distributions follows a curve called a geodesic. Understanding this geometry reveals why certain optimization algorithms work better than others—the 'straight line' in parameter space might actually be a curved path in distribution space.",
        ],
        keyIdeas: [
          "Probability distributions form a curved manifold, not a flat space",
          "Each distribution is a point; parameters are coordinates on the manifold",
          "KL divergence measures 'distance' between probability distributions",
          "Geodesics are shortest paths through the space of distributions",
          "Statistical inference has intrinsic geometric structure",
        ],
        equations: [
          "\\[ D_{KL}(P \\| Q) = \\int p(x) \\log \\frac{p(x)}{q(x)} \\, dx \\]",
          "\\[ \\text{Manifold: } \\mathcal{M} = \\{p_\\theta : \\theta \\in \\Theta\\} \\]",
        ],
        references: [
          "Amari - Information Geometry for Neural Networks (YouTube)",
          "StatQuest - KL Divergence",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The Fisher Information Matrix is the metric tensor of statistical manifolds. Just as the metric tensor g_ij tells you how to measure lengths in curved space, the Fisher matrix I_ij(θ) = E[∂log p/∂θᵢ · ∂log p/∂θⱼ] tells you how to measure distances between nearby distributions. The infinitesimal squared distance is ds² = Σᵢⱼ I_ij(θ) dθᵢ dθⱼ—this is the Fisher-Rao metric.",
          "Natural gradient descent exploits this geometry for optimization. Standard gradient descent follows the steepest direction in parameter space, but this direction isn't steepest in distribution space if the manifold is curved. Natural gradient corrects for curvature: θ_{t+1} = θ_t - α I(θ)⁻¹ ∇L(θ). The Fisher matrix acts as a preconditioner, scaling steps appropriately in each direction. This leads to faster, more stable convergence.",
          "Exponential families have particularly elegant geometry. Distributions p(x|θ) = h(x) exp(η(θ)ᵀT(x) - A(θ)) have Fisher information I = ∇²A(η) in natural coordinates. The manifold is 'dually flat'—it admits two natural coordinate systems (natural and expectation parameters) that are flat in complementary senses. This duality underlies the EM algorithm and much of statistical inference.",
          "Information projection finds the distribution in a family closest to a target distribution. I-projection (minimizing D_KL(P‖Q) over Q) tends toward Q with smaller support—it's 'mode-seeking.' M-projection (minimizing D_KL(Q‖P)) averages over all of P's support—it's 'mean-seeking.' This distinction matters in variational inference: the choice of KL direction determines approximation behavior.",
        ],
        keyIdeas: [
          "Fisher Information Matrix is the Riemannian metric on statistical manifolds",
          "Fisher-Rao distance: ds² = dθᵀ I(θ) dθ measures separation between nearby distributions",
          "Natural gradient: I⁻¹∇ corrects for manifold curvature in optimization",
          "Exponential families are dually flat: natural and expectation coordinates both flat",
          "I-projection: mode-seeking; M-projection: mean-seeking",
          "Choice of KL direction in variational inference affects approximation quality",
        ],
        equations: [
          "\\[ I_{ij}(\\theta) = \\mathbb{E}\\left[\\frac{\\partial \\log p}{\\partial \\theta_i} \\frac{\\partial \\log p}{\\partial \\theta_j}\\right] = -\\mathbb{E}\\left[\\frac{\\partial^2 \\log p}{\\partial \\theta_i \\partial \\theta_j}\\right] \\]",
          "\\[ ds^2 = d\\theta^T I(\\theta) d\\theta \\quad \\text{(Fisher-Rao metric)} \\]",
          "\\[ \\tilde{\\nabla} L = I(\\theta)^{-1} \\nabla L(\\theta) \\quad \\text{(Natural gradient)} \\]",
          "\\[ \\theta_{t+1} = \\theta_t - \\alpha \\, I(\\theta_t)^{-1} \\nabla L(\\theta_t) \\]",
        ],
        references: [
          "Amari & Nagaoka - Methods of Information Geometry",
          "Amari - Natural Gradient Works Efficiently in Learning",
          "Murphy - Machine Learning: A Probabilistic Perspective, Chapter 22",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Dual connections generalize the flat geometry of exponential families. The α-connection ∇⁽ᵅ⁾ interpolates between e-connection (α=1, flat in natural parameters) and m-connection (α=-1, flat in expectation parameters). A manifold is α-flat if there exist coordinates where ∇⁽ᵅ⁾ = 0. For α ≠ 0, α-flatness and (-α)-flatness are dual. This α-geometry reveals deep structure: α-divergences correspond to α-geodesics.",
          "Geodesics in information geometry have statistical meaning. The e-geodesic connects distributions along the exponential family path: p_t(x) ∝ p₀(x)^(1-t) p₁(x)^t. The m-geodesic connects along the mixture path: p_t(x) = (1-t)p₀(x) + tp₁(x). These are 'straight lines' in their respective geometries. The Pythagorean theorem holds for certain divergence-angle relationships, enabling geometric proofs of optimality.",
          "Curvature of statistical manifolds measures the intrinsic non-Euclidean structure. For exponential families, the e-curvature and m-curvature are dual—both vanish for the family to be flat. Nonzero curvature means geodesics diverge, parallelograms don't close, and 'straight line' intuition fails. The curvature tensor relates to how Fisher information changes across the manifold, with implications for optimization trajectory analysis.",
          "Amari's information geometry of deep learning connects to the Fisher-Rao metric on weight space. The natural gradient for neural networks approximates I⁻¹∇ where I is the Fisher of the network's output distribution. K-FAC exploits layer-wise block structure. Recent work studies the neural network loss landscape through information-geometric lenses: the Fisher-Rao norm bounds generalization, and gradient descent trajectory approximates natural gradient in certain regimes.",
          "Applications extend beyond optimization. In variational inference, the natural gradient of the ELBO yields efficient updates. In reinforcement learning, natural policy gradient (TRPO, PPO) uses the Fisher of the policy distribution for stable updates. In differential privacy, the Fisher-Rao metric determines the privacy cost of parameter perturbations. Quantum information geometry extends these ideas to quantum states, with the quantum Fisher information playing the central role.",
        ],
        keyIdeas: [
          "α-connections interpolate between e-flat and m-flat geometries",
          "α-divergences are dual to (-α)-divergences; KL is the limiting case",
          "e-geodesic: exponential interpolation; m-geodesic: mixture interpolation",
          "Curvature measures deviation from Euclidean behavior; affects optimization dynamics",
          "Fisher-Rao norm bounds generalization; connects geometry to statistical learning theory",
          "Natural policy gradient (TRPO, PPO) uses policy Fisher for stable RL",
        ],
        equations: [
          "\\[ \\alpha\\text{-divergence: } D_\\alpha(P \\| Q) = \\frac{4}{1-\\alpha^2}\\left(1 - \\int p^{\\frac{1-\\alpha}{2}} q^{\\frac{1+\\alpha}{2}} dx\\right) \\]",
          "\\[ \\text{e-geodesic: } p_t(x) \\propto \\exp\\left((1-t)\\log p_0(x) + t\\log p_1(x)\\right) \\]",
          "\\[ \\text{m-geodesic: } p_t(x) = (1-t)p_0(x) + tp_1(x) \\]",
          "\\[ \\text{Fisher-Rao norm: } \\|\\theta\\|_{FR} = \\sqrt{\\theta^T I(\\theta) \\theta} \\]",
        ],
        references: [
          "Amari - Information Geometry and Its Applications",
          "Amari & Nagaoka - Methods of Information Geometry",
          "arXiv:1712.09913 - Fisher-Rao Norm and Generalization",
          "Kakade - A Natural Policy Gradient (NIPS 2001)",
        ],
      },
    },
  ],
};

export default chapter;
