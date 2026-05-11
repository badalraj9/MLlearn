import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "distributions",
  title: "Distributions (Discrete & Continuous)",
  description:
    "Probability mass and density functions for modeling random outcomes.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A distribution describes how probability is spread across possible outcomes. For a coin flip, probability is concentrated equally on two points: heads and tails each get 0.5. For human heights, probability is spread smoothly across a range—the chance of being exactly 170.0000...cm is essentially zero, but the chance of being between 169cm and 171cm is meaningful. These are discrete and continuous distributions, respectively.",
          "Discrete distributions use probability mass functions (PMFs): each possible outcome gets a specific probability, and all probabilities sum to 1. A die roll has P(1) = P(2) = ... = P(6) = 1/6. The Poisson distribution models rare events with P(k) = λᵏe⁻λ/k!—useful for counting arrivals, defects, or accidents. Discrete distributions apply when outcomes are countable: categories, integers, or distinct items.",
          "Continuous distributions use probability density functions (PDFs). Instead of point probabilities, the PDF gives probability per unit length: the area under the curve between two points equals the probability of falling in that range. The normal distribution's famous bell curve is a PDF. The total area under any PDF equals 1. Key insight: for continuous distributions, P(X = x) = 0 for any specific x—only intervals have non-zero probability.",
        ],
        keyIdeas: [
          "Discrete distributions assign probability to individual outcomes (PMF)",
          "Continuous distributions assign probability density (PDF); areas give probabilities",
          "PMF values sum to 1; PDF area integrates to 1",
          "P(X = x) = 0 for continuous distributions; only intervals have positive probability",
          "The cumulative distribution function (CDF) works for both discrete and continuous",
        ],
        equations: [
          "\\[ \\text{PMF: } \\sum_{x} p(x) = 1, \\quad p(x) \\geq 0 \\]",
          "\\[ \\text{PDF: } \\int_{-\\infty}^{\\infty} f(x) \\, dx = 1, \\quad f(x) \\geq 0 \\]",
          "\\[ P(a \\leq X \\leq b) = \\int_a^b f(x) \\, dx \\]",
        ],
        references: [
          "3Blue1Brown - Probability distributions",
          "StatQuest - Probability distributions explained",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The cumulative distribution function F(x) = P(X ≤ x) unifies discrete and continuous cases. For discrete X, the CDF is a step function with jumps at each possible value. For continuous X, F(x) = ∫₋∞ˣ f(t)dt, and f(x) = F'(x) where differentiable. The CDF always exists, takes values in [0,1], and is non-decreasing. For sampling, the inverse transform method uses F⁻¹(U) where U ~ Uniform(0,1).",
          "Common distributions form a practical toolkit. Bernoulli(p) models binary outcomes; Binomial(n,p) counts successes in n trials. Poisson(λ) models rare events with mean λ. Exponential(λ) models waiting times; its memoryless property means P(X > s+t | X > s) = P(X > t). Normal(μ, σ²) is ubiquitous via the Central Limit Theorem. Beta(α,β) models probabilities on [0,1]; Gamma(α,β) models positive quantities.",
          "Expectation E[X] = Σ xp(x) for discrete or ∫ xf(x)dx for continuous gives the mean. Variance Var(X) = E[(X - E[X])²] = E[X²] - (E[X])² measures spread. The moment-generating function M(t) = E[eᵗˣ] uniquely characterizes distributions and simplifies computing moments: E[Xⁿ] = M⁽ⁿ⁾(0). The characteristic function φ(t) = E[eⁱᵗˣ] always exists and characterizes the distribution.",
          "Transformation of random variables follows the change of variables formula. If Y = g(X) with g monotonic and differentiable, then f_Y(y) = f_X(g⁻¹(y)) · |d/dy g⁻¹(y)|. For g(x) = ax + b, the distribution scales and shifts. For g(x) = x² with X ~ N(0,1), Y ~ χ²₁. Implementation tip: use scipy.stats for sampling, tfp.distributions or torch.distributions for differentiable probabilistic programming.",
        ],
        keyIdeas: [
          "CDF F(x) = P(X ≤ x) works for both discrete and continuous distributions",
          "Inverse transform sampling: X = F⁻¹(U) for U ~ Uniform(0,1)",
          "Key distributions: Bernoulli, Binomial, Poisson, Exponential, Normal, Beta, Gamma",
          "Variance formula: Var(X) = E[X²] - (E[X])² — compute both moments",
          "Change of variables: f_Y(y) = f_X(g⁻¹(y)) · |(g⁻¹)'(y)|",
          "Use scipy.stats, tfp.distributions, torch.distributions for implementations",
        ],
        equations: [
          "\\[ F(x) = P(X \\leq x), \\quad \\text{PMF: } p(x) = F(x) - F(x^-), \\quad \\text{PDF: } f(x) = F'(x) \\]",
          "\\[ \\mathbb{E}[X] = \\sum_x x \\cdot p(x) \\quad \\text{or} \\quad \\int x \\cdot f(x) \\, dx \\]",
          "\\[ \\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 \\]",
          "\\[ f_Y(y) = f_X(g^{-1}(y)) \\cdot \\left| \\frac{d}{dy} g^{-1}(y) \\right| \\quad \\text{(Change of variables)} \\]",
        ],
        references: [
          "Casella & Berger - Statistical Inference, Chapters 2-3",
          "Murphy - Machine Learning: A Probabilistic Perspective, Chapter 2",
          "Wasserman - All of Statistics, Chapter 2",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Exponential families unify many common distributions under a canonical form: p(x|θ) = h(x) exp(η(θ)ᵀT(x) - A(θ)), where η is the natural parameter, T(x) is the sufficient statistic, and A(θ) is the log-partition function ensuring normalization. The Bernoulli, Poisson, Gaussian, Gamma, Beta, and many others are exponential family members. This structure yields elegant results: A(θ) generates cumulants, ∇A(θ) = E[T(X)], and ∇²A(θ) = Cov(T(X)).",
          "Sufficient statistics capture all information about θ in the data: T(X) is sufficient for θ if p(x|θ) factorizes as g(T(x), θ)h(x). The Fisher-Neyman factorization theorem characterizes sufficiency. For exponential families, T(x) is always sufficient. Minimal sufficient statistics have the coarsest partition of the sample space; they exist and are unique up to bijection. The Rao-Blackwell theorem shows that conditioning on sufficient statistics improves estimators.",
          "Heavy-tailed distributions—where moment generating functions don't exist—require special treatment. The Pareto distribution P(X > x) ∝ x⁻ᵅ has finite mean only if α > 1, finite variance only if α > 2. Stable distributions generalize the CLT to infinite-variance cases: sums converge to distributions with power-law tails. In finance, returns often exhibit heavy tails; in ML, gradient norms can be heavy-tailed, causing optimization instability.",
          "Measure-theoretic foundations unify PMF and PDF as densities with respect to different base measures. The Radon-Nikodym derivative dP/dμ gives density. For discrete distributions, μ is counting measure; for continuous, μ is Lebesgue measure. This abstraction handles mixed discrete-continuous distributions, singular distributions (Cantor), and rigorous probability theory. The dominated convergence theorem and Fubini's theorem justify interchange of limits and integration.",
          "Information-theoretic quantities connect distributions to learning. Entropy H(X) = -E[log p(X)] measures uncertainty; cross-entropy and KL divergence D_KL(P‖Q) = E_P[log(P/Q)] measure distributional discrepancy. Maximum entropy principles select distributions matching constraints while maximizing uncertainty. In ML, minimizing cross-entropy loss equals minimizing KL divergence between empirical and model distributions.",
        ],
        keyIdeas: [
          "Exponential families: unified form with natural parameters and sufficient statistics",
          "Log-partition function A(θ) generates moments: ∇A = E[T(X)], ∇²A = Cov(T(X))",
          "Sufficient statistics capture all parameter information; Rao-Blackwell improves estimators",
          "Heavy-tailed distributions lack moment generating functions; require robust methods",
          "Radon-Nikodym derivative unifies PMF and PDF as densities w.r.t. base measures",
          "KL divergence and cross-entropy connect probability to information theory and ML loss",
        ],
        equations: [
          "\\[ p(x|\\theta) = h(x) \\exp\\left(\\eta(\\theta)^T T(x) - A(\\theta)\\right) \\quad \\text{(Exponential family)} \\]",
          "\\[ \\nabla A(\\eta) = \\mathbb{E}_\\eta[T(X)], \\quad \\nabla^2 A(\\eta) = \\text{Cov}_\\eta(T(X)) \\]",
          "\\[ D_{KL}(P \\| Q) = \\int p(x) \\log \\frac{p(x)}{q(x)} \\, dx \\geq 0 \\]",
          "\\[ H(X) = -\\mathbb{E}[\\log p(X)] = -\\sum_x p(x) \\log p(x) \\quad \\text{(Entropy)} \\]",
        ],
        references: [
          "Lehmann & Casella - Theory of Point Estimation, Chapter 1",
          "Cover & Thomas - Elements of Information Theory, Chapter 2",
          "Billingsley - Probability and Measure, Chapter 6",
          "Taleb - Statistical Consequences of Fat Tails",
        ],
      },
    },
  ],
};

export default chapter;
