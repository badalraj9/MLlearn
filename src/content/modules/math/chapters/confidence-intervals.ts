import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "confidence-intervals",
  title: "Confidence Intervals",
  description:
    "Quantifying uncertainty in parameter estimates with interval bounds.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A confidence interval is a range of plausible values for an unknown parameter, constructed from observed data. When you read 'the average height is 170cm ± 5cm with 95% confidence,' the ±5cm comes from a confidence interval. It tells you not just what your estimate is, but how precise that estimate might be—wider intervals mean more uncertainty, narrower intervals mean more precision.",
          "The most common misinterpretation: a 95% confidence interval does NOT mean there's a 95% probability the true value lies inside the interval. The true value is fixed (not random), and the interval is what's random. The correct interpretation: if you repeated the same experiment infinitely many times and constructed a 95% CI each time, about 95% of those intervals would contain the true value. The confidence level describes the procedure's long-run accuracy, not any single interval.",
          "Think of it like a fishing net. You cast your net (construct an interval) hoping to catch the fish (true parameter). A 95% confidence net catches the fish 95 times out of 100 casts—but after you've made a single cast, you don't know whether the fish is in your net. You can only say your method works 95% of the time in the long run. This subtlety is why confidence intervals are frequently misunderstood even by practitioners.",
        ],
        keyIdeas: [
          "A CI gives a range of plausible values, not just a point estimate",
          "95% confidence refers to the procedure, not the probability a specific interval contains the truth",
          "Wider intervals indicate more uncertainty; narrower intervals indicate more precision",
          "The true parameter is fixed; the interval is random (it varies sample to sample)",
          "Confidence ≠ probability for a single computed interval",
        ],
        equations: [
          "\\[ \\text{CI}_{95\\%}(\\mu) = \\bar{X} \\pm 1.96 \\cdot \\frac{\\sigma}{\\sqrt{n}} \\]",
          "\\[ \\text{Margin of Error} = z_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}} \\]",
        ],
        references: [
          "StatQuest - Confidence Intervals",
          "Khan Academy - Confidence intervals and margin of error",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The standard confidence interval for a mean uses the Central Limit Theorem: X̄ ± z_{α/2}·(σ/√n), where z_{α/2} = Φ⁻¹(1-α/2) is the (1-α/2) quantile of the standard normal. For 95% confidence, z_{0.025} ≈ 1.96. When the population standard deviation σ is unknown, we substitute the sample standard deviation s and use the t-distribution with n-1 degrees of freedom: X̄ ± t_{α/2,n-1}·(s/√n). The t-distribution has heavier tails, giving wider intervals for small samples.",
          "Different parameters require different CI constructions. For proportions, the Wald interval p̂ ± z·√(p̂(1-p̂)/n) is common but performs poorly near 0 or 1—the Wilson score interval is preferred. For variance, the interval uses the chi-squared distribution: ((n-1)s²/χ²_{α/2}, (n-1)s²/χ²_{1-α/2}). For comparing two means, use Welch's t-interval which doesn't assume equal variances.",
          "Bootstrap confidence intervals offer a distribution-free alternative. The percentile method takes the α/2 and 1-α/2 quantiles of bootstrap estimates. The bias-corrected and accelerated (BCa) method adjusts for skewness and bias in the bootstrap distribution. For small samples or complex statistics (medians, ratios), bootstrap CIs often outperform parametric methods—but require thousands of resamples for stability.",
          "Sample size determination works backward from CI requirements. To achieve margin of error E with confidence level 1-α, you need n ≥ (z_{α/2}·σ/E)². Since σ is typically unknown, use a pilot estimate or conservative upper bound. For proportions, maximum variance occurs at p=0.5, so n ≥ (z_{α/2}/2E)² gives a conservative sample size. Always round up and consider power analysis for hypothesis testing contexts.",
        ],
        keyIdeas: [
          "Use t-distribution when σ is unknown: heavier tails give wider intervals",
          "Wilson score interval beats Wald for proportions near 0 or 1",
          "Bootstrap CIs work for any statistic without parametric assumptions",
          "BCa bootstrap corrects for bias and skewness in the sampling distribution",
          "Sample size: n ≥ (z·σ/E)² for margin of error E",
          "Welch's t-interval handles unequal variances when comparing two groups",
        ],
        equations: [
          "\\[ \\text{CI}_{1-\\alpha}(\\mu) = \\bar{X} \\pm t_{\\alpha/2, n-1} \\cdot \\frac{s}{\\sqrt{n}} \\]",
          "\\[ \\text{Wilson CI for } p: \\frac{\\hat{p} + \\frac{z^2}{2n} \\pm z\\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n} + \\frac{z^2}{4n^2}}}{1 + \\frac{z^2}{n}} \\]",
          "\\[ n \\geq \\left(\\frac{z_{\\alpha/2} \\cdot \\sigma}{E}\\right)^2 \\quad \\text{(Sample size for MOE } E\\text{)} \\]",
        ],
        references: [
          "Casella & Berger - Statistical Inference, Chapter 7",
          "Wasserman - All of Statistics, Chapter 6",
          "Efron & Tibshirani - An Introduction to the Bootstrap, Chapter 12",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Coverage probability is the actual probability that a CI contains the true parameter—it may differ from the nominal level due to approximations. A 95% CI with 93% actual coverage is 'undercovering' and too liberal; 97% coverage is 'overcovering' and too conservative. Calibration studies assess coverage via simulation. For discrete distributions, exact methods (Clopper-Pearson for proportions) guarantee coverage ≥ 1-α but typically overcover significantly.",
          "Profile likelihood confidence intervals provide better coverage for parameters in complex models. Instead of using asymptotic normality, the profile likelihood ratio test inverts: {θ : 2[ℓ̂ - ℓ(θ)] ≤ χ²₁,₁-α}, where ℓ̂ is the maximized log-likelihood and ℓ(θ) is the profile likelihood with θ fixed. This yields asymmetric intervals that respect parameter boundaries and have superior small-sample properties compared to Wald-type intervals.",
          "Simultaneous confidence intervals address the multiple comparison problem. When constructing k intervals, the Bonferroni correction uses 1-α/k per interval, guaranteeing family-wise coverage ≥ 1-α. The more powerful Holm procedure adjusts sequentially. For multivariate means, simultaneous confidence ellipsoids use the F-distribution. Tukey's HSD and Scheffé's method provide exact simultaneous intervals for all contrasts in ANOVA.",
          "Fieller's theorem constructs confidence intervals for ratios of parameters—a surprisingly subtle problem. If θ = μ₁/μ₂, the standard delta method fails when μ₂ is near zero. Fieller's solution solves a quadratic equation derived from the joint distribution, potentially yielding a finite interval, a semi-infinite interval, or even the entire real line when the denominator is not significantly different from zero. This arises in pharmacokinetics and dose-response modeling.",
          "Confidence distribution theory unifies inference by treating confidence intervals as extracting quantiles from a 'confidence distribution'—a sample-dependent distribution function that represents all possible confidence intervals simultaneously. This connects frequentist CIs to Bayesian posteriors: under certain conditions, the confidence distribution equals the Bayesian posterior with a non-informative prior. Bootstrap methods can be viewed as approximating the confidence distribution empirically.",
        ],
        keyIdeas: [
          "Actual coverage may differ from nominal coverage—calibration is essential",
          "Profile likelihood CIs have better small-sample properties than Wald intervals",
          "Bonferroni is conservative; Holm and Tukey provide more powerful alternatives",
          "Fieller's theorem handles ratios where standard methods fail near zero denominators",
          "Confidence distributions unify frequentist intervals and connect to Bayesian posteriors",
          "Bootstrap calibration can correct coverage errors in parametric intervals",
        ],
        equations: [
          "\\[ \\{\\theta : 2[\\ell(\\hat{\\theta}) - \\ell(\\theta)] \\leq \\chi^2_{1, 1-\\alpha}\\} \\quad \\text{(Profile Likelihood CI)} \\]",
          "\\[ \\text{Fieller: } (\\mu_1 - \\theta\\mu_2)^2 \\leq z^2_{\\alpha/2}(\\sigma_1^2 - 2\\theta\\sigma_{12} + \\theta^2\\sigma_2^2) \\]",
          "\\[ P\\left(\\bigcap_{i=1}^{k} \\theta_i \\in \\text{CI}_i\\right) \\geq 1 - \\alpha \\quad \\text{(Family-wise coverage)} \\]",
          "\\[ \\text{Bonferroni: } \\alpha_i = \\frac{\\alpha}{k} \\implies \\text{CI}_{i} \\text{ uses } z_{\\alpha/(2k)} \\]",
        ],
        references: [
          "Efron - Bootstrap Methods: Another Look at the Jackknife (1979)",
          "Fieller - Some Problems in Interval Estimation (1954)",
          "Schweder & Hjort - Confidence, Likelihood, Probability (2016)",
          "Xie & Singh - Confidence Distribution (ISR 2013)",
        ],
      },
    },
  ],
};

export default chapter;
