import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "central-limit-theorem",
  title: "Central Limit Theorem",
  description: "Why sums of random variables converge to normal distributions.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The Central Limit Theorem (CLT) is one of the most remarkable results in all of mathematics. It says that if you take the sum (or average) of many independent random variables, the distribution of that sum approaches a normal distribution—the familiar bell curve—regardless of what the original variables' distributions looked like. This is why the normal distribution appears everywhere in nature: heights, test scores, measurement errors, and countless other phenomena.",
          "Imagine rolling a single die. The outcome is uniform: each number 1 through 6 is equally likely. But if you roll 100 dice and take the average, something magical happens—the distribution of that average looks like a bell curve centered at 3.5. The original distribution was flat, yet the sum became normal. This convergence happens surprisingly quickly: even with just 10-30 samples, the approximation is often good enough for practical use.",
          "The key intuition is that averaging 'smooths out' irregularities. Each individual variable contributes a small amount of noise; when you add many together, their irregularities cancel while their combined effect stabilizes. The theorem tells us exactly how fast this happens: the standard deviation of the sample mean shrinks as √n, where n is the sample size. To cut your uncertainty in half, you need four times as much data.",
        ],
        keyIdeas: [
          "Sums and averages of many independent random variables approach a normal distribution",
          "The original distributions can be anything—it doesn't matter for large n",
          "The mean of the sum equals n times the original mean; the variance adds",
          "Convergence rate: standard error shrinks as 1/√n",
          "This explains why the normal distribution appears throughout nature and statistics",
        ],
        equations: [
          "\\[ \\bar{X}_n = \\frac{1}{n} \\sum_{i=1}^{n} X_i \\xrightarrow{d} \\mathcal{N}\\left(\\mu, \\frac{\\sigma^2}{n}\\right) \\]",
          "\\[ \\text{Standard Error} = \\frac{\\sigma}{\\sqrt{n}} \\]",
        ],
        references: [
          "3Blue1Brown - Central Limit Theorem",
          "StatQuest - The Normal Distribution",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Formally, let X₁, X₂, ..., Xₙ be independent and identically distributed (i.i.d.) random variables with mean μ and finite variance σ² > 0. The CLT states that the standardized sum converges in distribution: (ΣXᵢ - nμ) / (σ√n) → N(0,1) as n → ∞. Equivalently, for the sample mean: √n( X̄ₙ - μ) / σ → N(0,1). This convergence is 'in distribution,' meaning the CDF converges pointwise.",
          "The practical implication is that for sufficiently large n, we can approximate: P(a ≤ X̄ₙ ≤ b) ≈ Φ((b-μ)/(σ/√n)) - Φ((a-μ)/(σ/√n)), where Φ is the standard normal CDF. This enables confidence intervals: X̄ₙ ± z_{α/2}·σ/√n is an approximate (1-α) confidence interval for μ. When σ is unknown, we substitute the sample standard deviation s and use the t-distribution instead.",
          "The Berry-Esseen theorem quantifies convergence rate: the maximum difference between the true CDF and the normal approximation is bounded by C·E[|X-μ|³]/(σ³√n), where C < 0.4748. This means distributions with heavy tails or extreme skewness require larger samples for the CLT to 'kick in.' A common rule of thumb is n > 30, but this is arbitrary—check your data with Q-Q plots or bootstrap methods.",
          "Implementation considerations: when computing confidence intervals or p-values, the CLT approximation fails for small samples, heavily skewed data, or when the outcome is bounded near 0 or 1 (use logistic or beta regression instead). Bootstrap methods provide a more robust alternative when CLT assumptions are questionable. For proportions near 0 or 1, the Wilson score interval is superior to the normal approximation.",
        ],
        keyIdeas: [
          "CLT applies to standardized sums: subtract mean, divide by standard deviation",
          "Convergence rate depends on the third moment (skewness) via Berry-Esseen bound",
          "n > 30 is a rule of thumb, not a theorem—check with Q-Q plots",
          "Unknown σ requires t-distribution correction for small samples",
          "Bootstrap methods are more robust when CLT assumptions are questionable",
          "For proportions, Wilson score interval beats normal approximation near boundaries",
        ],
        equations: [
          "\\[ \\frac{\\sum_{i=1}^{n} X_i - n\\mu}{\\sigma\\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1) \\]",
          "\\[ \\text{CI}_{1-\\alpha}(\\mu) = \\bar{X}_n \\pm z_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}} \\]",
          "\\[ |F_n(x) - \\Phi(x)| \\leq \\frac{C \\cdot \\mathbb{E}[|X-\\mu|^3]}{\\sigma^3 \\sqrt{n}} \\]",
        ],
        references: [
          "Casella & Berger - Statistical Inference, Chapter 5",
          "Wasserman - All of Statistics, Chapter 5",
          "Efron & Tibshirani - An Introduction to the Bootstrap",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Several extensions generalize the classical CLT. Lindeberg's CLT relaxes identical distribution: for independent (not necessarily identically distributed) random variables with variances σᵢ², if the Lindeberg condition holds—each variable contributes negligibly to total variance—then the standardized sum still converges to N(0,1). Lyapunov's condition (moments of order 2+δ exist and decay appropriately) is easier to verify and implies Lindeberg's condition.",
          "The Lindeberg-Feller CLT provides the tightest conditions for triangular arrays, where the number of variables grows and their distributions may change. This framework is essential for random matrix theory, where eigenvalue distributions converge to the semicircle law (Wigner) or Marchenko-Pastur law. The martingale CLT extends convergence to dependent sequences with conditional mean zero, enabling analysis of time series and stochastic processes.",
          "Multivariate CLT states that for random vectors Xᵢ ∈ ℝᵈ with mean μ and covariance Σ, the sample mean converges: √n(X̄ₙ - μ) → N(0, Σ). This enables multivariate hypothesis testing and confidence regions. However, the convergence rate degrades with dimension—'the curse of dimensionality' means more samples are needed for high-dimensional data. Random projection methods can reduce dimension while preserving CLT validity.",
          "The Functional CLT (Donsker's theorem) strengthens convergence: the entire sample path converges to Brownian motion. If Sₖ = Σᵢ₌₁ᵏ Xᵢ, then the process W⁽ⁿ⁾(t) = S₊ₙₜ₎/σ√n converges in distribution to standard Brownian motion. This enables analysis of sequential testing, changepoint detection, and diffusion approximations in finance and queueing theory.",
          "When CLT fails: heavy-tailed distributions with infinite variance (like stable distributions with α < 2) converge to non-normal limits—their sums follow Lévy stable laws, which have heavier tails than Gaussians. For such data, robust statistics and extreme value theory are more appropriate. The generalized CLT characterizes all possible stable limits: normal (α=2), Cauchy (α=1), and Lévy (α=1/2) are special cases.",
        ],
        keyIdeas: [
          "Lindeberg's CLT allows non-identical distributions if no term dominates",
          "Multivariate CLT enables joint inference but requires more samples in high dimensions",
          "Functional CLT (Donsker) yields Brownian motion—essential for sequential analysis",
          "Infinite variance distributions converge to Lévy stable laws, not Gaussians",
          "Martingale CLT handles dependent sequences with conditional mean zero",
          "Berry-Esseen bounds depend on skewness; higher moments give tighter control",
        ],
        equations: [
          "\\[ \\text{Lindeberg: } \\frac{1}{s_n^2} \\sum_{i=1}^{n} \\mathbb{E}[X_i^2 \\cdot \\mathbf{1}_{|X_i| > \\epsilon s_n}] \\to 0 \\implies \\text{CLT holds} \\]",
          "\\[ \\sqrt{n}(\\bar{X}_n - \\mu) \\xrightarrow{d} \\mathcal{N}_d(0, \\Sigma) \\quad \\text{(Multivariate CLT)} \\]",
          "\\[ W^{(n)}(t) = \\frac{S_{\\lfloor nt \\rfloor}}{\\sigma\\sqrt{n}} \\xrightarrow{d} B(t) \\quad \\text{(Donsker)} \\]",
          "\\[ \\text{Stable}(\\alpha): \\sum_{i=1}^{n} X_i \\sim n^{1/\\alpha} X_1 \\quad \\text{for } \\alpha \\in (0, 2] \\]",
        ],
        references: [
          "Billingsley - Probability and Measure, Chapter 5",
          "Durrett - Probability: Theory and Examples, Chapter 3",
          "arXiv:1802.07529 - High-Dimensional CLT",
          "Samorodnitsky & Taqqu - Stable Non-Gaussian Random Processes",
        ],
      },
    },
  ],
};

export default chapter;
