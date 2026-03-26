import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "hypothesis-testing",
  title: "Hypothesis Testing",
  description:
    "Statistical framework for making decisions under uncertainty with controlled error rates.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Hypothesis testing is the scientific method's statistical engine. You start with a claim—the null hypothesis (H₀)—and ask: if this claim were true, how surprising would my data be? If the data would be very surprising under H₀, you reject H₀ in favor of an alternative hypothesis (H₁). Think of it like a trial: the null hypothesis is 'innocent until proven guilty,' and your data is the evidence.",
          "The p-value is the core concept: the probability of seeing data at least as extreme as yours, assuming the null hypothesis is true. A small p-value means your data is unlikely under H₀—evidence against the null. A p-value of 0.03 means 'if H₀ were true, data this extreme would happen only 3% of the time.' The significance level α (often 0.05) is your threshold: reject H₀ if p < α.",
          "Two types of errors lurk in every test. Type I error (false positive): rejecting H₀ when it's actually true—crying wolf when there's no wolf. Type II error (false negative): failing to reject H₀ when it's false—missing a real effect. The significance level α controls Type I error rate. Power (1 - Type II error rate) measures your ability to detect real effects. There's always a tradeoff: lower α means fewer false positives but more false negatives.",
        ],
        keyIdeas: [
          "Null hypothesis H₀: the default claim to test against",
          "p-value: probability of data this extreme if H₀ were true",
          "Significance level α: threshold for rejecting H₀ (typically 0.05)",
          "Type I error = false positive (rejecting true H₀); Type II = false negative",
          "Power = 1 - P(Type II error); ability to detect real effects",
        ],
        equations: [
          "\\[ p = P(\\text{data at least as extreme} | H_0 \\text{ true}) \\]",
          "\\[ \\alpha = P(\\text{Type I error}) = P(\\text{reject } H_0 | H_0 \\text{ true}) \\]",
          "\\[ \\text{Power} = 1 - \\beta = P(\\text{reject } H_0 | H_1 \\text{ true}) \\]",
        ],
        references: [
          "StatQuest - Hypothesis Testing",
          "Khan Academy - Significance tests",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The standard testing workflow: (1) state H₀ and H₁, (2) choose significance level α, (3) compute test statistic from data, (4) find p-value under the null distribution, (5) reject H₀ if p < α. The test statistic measures deviation from what H₀ predicts—larger values mean more evidence against H₀. The null distribution tells you what test statistics to expect if H₀ were true.",
          "Common tests arise from different null distributions. The z-test compares a sample mean to a population mean when σ is known: z = (X̄ - μ₀)/(σ/√n) ~ N(0,1) under H₀. The t-test handles unknown σ: t = (X̄ - μ₀)/(s/√n) ~ t_{n-1}. For comparing two groups, use two-sample t-test or paired t-test. Chi-square tests handle categorical data: χ² = Σ(Oᵢ - Eᵢ)²/Eᵢ for goodness-of-fit and independence.",
          "Power analysis determines sample size before collecting data. Power depends on effect size (how big the true difference is), sample size n, significance level α, and variability σ. For a two-sample t-test detecting effect size d = (μ₁ - μ₂)/σ with power 1-β at level α, you need approximately n = 2(z_{α/2} + z_β)²/d² per group. Underpowered studies (n too small) miss real effects; overpowered studies (n too large) detect trivial differences.",
          "Multiple testing requires correction. Testing k hypotheses at level α gives kα expected false positives even if all nulls are true. The Bonferroni correction uses α/k per test, guaranteeing family-wise error rate ≤ α. False Discovery Rate (FDR) control is less conservative: the Benjamini-Hochberg procedure ensures E[false discoveries / discoveries] ≤ α. For exploratory analysis with many tests, FDR is preferred over Bonferroni.",
        ],
        keyIdeas: [
          "Test statistic measures deviation from null; larger = more evidence against H₀",
          "z-test: known σ, use normal; t-test: unknown σ, use t-distribution",
          "Chi-square test: categorical data, goodness-of-fit and independence",
          "Power analysis: n ∝ 1/effect²; bigger effects need smaller samples",
          "Bonferroni: α/k per test for family-wise error control",
          "Benjamini-Hochberg: FDR control, less conservative for many tests",
        ],
        equations: [
          "\\[ t = \\frac{\\bar{X} - \\mu_0}{s / \\sqrt{n}} \\sim t_{n-1} \\quad \\text{(One-sample t-test)} \\]",
          "\\[ \\chi^2 = \\sum_{i=1}^{k} \\frac{(O_i - E_i)^2}{E_i} \\sim \\chi^2_{k-1} \\quad \\text{(Chi-square test)} \\]",
          "\\[ n \\approx \\frac{2(z_{\\alpha/2} + z_\\beta)^2}{d^2} \\quad \\text{(Sample size for two-sample t-test)} \\]",
          "\\[ \\text{Bonferroni: reject if } p_i < \\alpha / k \\]",
        ],
        references: [
          "Casella & Berger - Statistical Inference, Chapter 8",
          "Wasserman - All of Statistics, Chapter 10",
          "Benjamini & Hochberg - Controlling the False Discovery Rate (1995)",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The Neyman-Pearson lemma provides the theoretical foundation: the most powerful test at level α rejects H₀ when the likelihood ratio L(H₁)/L(H₀) exceeds a threshold. For simple hypotheses, this likelihood ratio test (LRT) is optimal. For composite hypotheses with nuisance parameters, the generalized LRT uses max likelihoods under each hypothesis: reject when max_θ₁ L(θ₁)/max_θ₀ L(θ₀) exceeds the threshold. The test statistic -2 log Λ often follows χ² asymptotically.",
          "Likelihood-based tests have three asymptotically equivalent forms. The Wald test uses parameter estimates: reject if (θ̂ - θ₀)²/Var(θ̂) > χ²_{1-α}. The score test uses the score (gradient of log-likelihood) at H₀: reject if U(θ₀)²/I(θ₀) > χ²_{1-α}. The LRT compares maximized likelihoods: reject if 2[ℓ(θ̂) - ℓ(θ₀)] > χ²_{1-α}. In finite samples, they differ; LRT is often most reliable.",
          "Bayesian hypothesis testing takes a fundamentally different approach: compute posterior probabilities or Bayes factors comparing models. The Bayes factor B₁₀ = P(data|H₁)/P(data|H₀) measures evidence for H₁ versus H₀. Unlike p-values, Bayes factors can provide evidence for H₀ (not just against it) and don't depend on hypothetical data you didn't observe. However, they require priors over parameters and are sensitive to prior choice.",
          "Sequential testing allows monitoring experiments continuously rather than at fixed sample sizes. The problem: repeated testing inflates Type I error—if you test 20 times at α=0.05, you'll likely reject by chance. Solutions include group sequential methods (pre-specified analysis times with adjusted thresholds like O'Brien-Fleming or Pocock boundaries) and alpha spending functions that allocate error budget flexibly. The Sequential Probability Ratio Test (SPRT) is optimal for simple hypotheses.",
          "Multiple testing in the age of genomics has driven FDR theory forward. The q-value (Storey) estimates the minimum FDR at which a test would be rejected. Independent Hypothesis Weighting (IHW) uses covariates to weight p-values, improving power. Modern approaches handle dependencies between tests (empirical null, Benjamini-Yekutieli correction). The replication crisis has focused attention on p-hacking and pre-registration to prevent hidden multiple testing.",
        ],
        keyIdeas: [
          "Neyman-Pearson lemma: likelihood ratio test is most powerful at fixed α",
          "Three asymptotic tests: Wald (parameter), Score (gradient), LRT (likelihood)",
          "Bayes factors compare marginal likelihoods; can support H₀ unlike p-values",
          "Sequential testing requires alpha spending or group sequential boundaries",
          "q-value estimates FDR for each test; IHW uses covariates for power",
          "Replication crisis: p-hacking, pre-registration, hidden multiple testing",
        ],
        equations: [
          "\\[ \\Lambda = \\frac{\\max_{\\theta \\in \\Theta_0} L(\\theta)}{\\max_{\\theta \\in \\Theta} L(\\theta)}, \\quad -2\\log \\Lambda \\xrightarrow{d} \\chi^2_{df} \\quad \\text{(LRT)} \\]",
          "\\[ W = \\frac{(\\hat{\\theta} - \\theta_0)^2}{\\widehat{\\text{Var}}(\\hat{\\theta})} \\xrightarrow{d} \\chi^2_1 \\quad \\text{(Wald)} \\]",
          "\\[ BF_{10} = \\frac{P(D | H_1)}{P(D | H_0)} = \\frac{\\int L(\\theta_1) p(\\theta_1) d\\theta_1}{\\int L(\\theta_0) p(\\theta_0) d\\theta_0} \\]",
          "\\[ \\text{SPRT: stop when } \\frac{P_1(D)}{P_0(D)} \\geq \\frac{1-\\beta}{\\alpha} \\text{ or } \\leq \\frac{\\beta}{1-\\alpha} \\]",
        ],
        references: [
          "Lehmann & Romano - Testing Statistical Hypotheses",
          "Efron - Large-Scale Inference: Empirical Bayes Methods (2010)",
          "Wasserstein & Lazar - The ASA Statement on p-Values (2016)",
          "Kruschke - Bayesian Estimation Supersedes the t-Test",
        ],
      },
    },
  ],
};

export default chapter;
