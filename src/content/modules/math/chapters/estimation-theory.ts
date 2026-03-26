import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "estimation-theory",
  title: "Estimation Theory",
  description:
    "Principles and methods for inferring parameters from observed data.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Estimation theory answers a fundamental question: given data that came from some unknown process, how do we figure out what that process was? If you flip a coin 100 times and see 60 heads, what's your best guess for the coin's true probability of heads? Estimation theory provides principled methods for turning data into guesses about unknown quantities—and for understanding how good those guesses are.",
          "The key idea is that an estimator is a function that maps data to parameter estimates. The sample mean X̄ = (X₁ + ... + Xₙ)/n is an estimator for the population mean μ. Different estimators exist for the same parameter: you could estimate the center of a distribution using the mean, median, or mode. Which one is best? Estimation theory gives us criteria to compare them: bias, variance, and consistency.",
          "A good estimator should get closer to the truth as you collect more data—this is consistency. An unbiased estimator is correct on average: if you repeated the experiment infinitely many times, the average of all estimates would equal the true parameter. Low variance means your estimates cluster tightly around their expected value. The tradeoff: sometimes accepting a little bias can dramatically reduce variance, leading to better overall accuracy.",
        ],
        keyIdeas: [
          "An estimator maps data to parameter estimates",
          "Bias measures systematic error: E[estimator] - true parameter",
          "Variance measures how much estimates vary across different datasets",
          "Consistency: estimator converges to true value as data grows",
          "Bias-variance tradeoff: sometimes a biased estimator outperforms unbiased ones",
        ],
        equations: [
          "\\[ \\hat{\\theta} = g(X_1, X_2, \\ldots, X_n) \\quad \\text{(Estimator)} \\]",
          "\\[ \\text{Bias}(\\hat{\\theta}) = \\mathbb{E}[\\hat{\\theta}] - \\theta \\]",
          "\\[ \\text{MSE}(\\hat{\\theta}) = \\text{Bias}^2 + \\text{Var}(\\hat{\\theta}) \\]",
        ],
        references: [
          "StatQuest - Maximum Likelihood",
          "Khan Academy - Estimators",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Maximum Likelihood Estimation (MLE) is the workhorse of parametric inference. The likelihood L(θ) = p(X₁, ..., Xₙ|θ) measures how probable the observed data is for each parameter value. The MLE θ̂_MLE = argmax L(θ) chooses the parameter that makes the data most probable. In practice, we maximize the log-likelihood ℓ(θ) = log L(θ), which is equivalent but numerically more stable since log transforms products into sums.",
          "MLE has attractive asymptotic properties: under regularity conditions, the MLE is consistent, asymptotically normal, and asymptotically efficient—it achieves the smallest possible variance among regular estimators. The asymptotic variance equals the inverse Fisher information: Var(θ̂_MLE) ≈ 1/I(θ) for large n. This means MLEs are optimal in the limit of large samples.",
          "Method of Moments provides an alternative approach: match sample moments to population moments. To estimate parameters θ₁, θ₂, set E[X] = X̄ and E[X²] = (1/n)ΣXᵢ², then solve for θ. MoM is simpler than MLE but generally less efficient—it doesn't achieve the Cramér-Rao bound. However, MoM estimators often serve as good starting points for iterative MLE computation.",
          "Implementation considerations: MLE requires solving optimization problems—gradient ascent, Newton-Raphson, or expectation-maximization (EM) for latent variable models. Numerical issues arise when likelihoods underflow (use log-likelihood) or when parameters are near boundaries. Confidence intervals from MLE use the observed Fisher information I(θ̂) or the parametric bootstrap. Always check that the likelihood is identifiable: different parameters shouldn't give identical distributions.",
        ],
        keyIdeas: [
          "MLE maximizes L(θ) = p(data|θ), equivalently maximizes log-likelihood",
          "MLE is consistent, asymptotically normal, and asymptotically efficient",
          "Asymptotic variance = 1/Fisher information (Cramér-Rao bound)",
          "Method of Moments matches sample moments to theoretical moments",
          "EM algorithm handles MLE with latent variables iteratively",
          "Check identifiability: distinct parameters must yield distinct distributions",
        ],
        equations: [
          "\\[ \\hat{\\theta}_{MLE} = \\arg\\max_\\theta \\sum_{i=1}^n \\log p(X_i | \\theta) \\]",
          "\\[ \\sqrt{n}(\\hat{\\theta}_{MLE} - \\theta) \\xrightarrow{d} \\mathcal{N}\\left(0, I(\\theta)^{-1}\\right) \\]",
          "\\[ I(\\theta) = -\\mathbb{E}\\left[\\frac{\\partial^2 \\log p(X|\\theta)}{\\partial \\theta^2}\\right] \\quad \\text{(Fisher Information)} \\]",
          "\\[ \\text{MoM: solve } \\mathbb{E}[X^k] = \\frac{1}{n}\\sum_{i=1}^n X_i^k \\text{ for } k = 1, 2, \\ldots \\]",
        ],
        references: [
          "Casella & Berger - Statistical Inference, Chapter 7",
          "Lehmann & Casella - Theory of Point Estimation",
          "Murphy - Machine Learning: A Probabilistic Perspective, Chapter 6",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The Cramér-Rao Lower Bound (CRLB) establishes a fundamental limit: any unbiased estimator θ̂ satisfies Var(θ̂) ≥ 1/I(θ), where I(θ) is the Fisher information. For vector parameters, Var(θ̂) ≥ I(θ)⁻¹ in the positive semidefinite sense. Estimators achieving this bound are called efficient—they extract the maximum possible information from data. The MLE achieves the CRLB asymptotically, but finite-sample efficient estimators exist only in exponential families.",
          "The Rao-Blackwell theorem provides a powerful improvement principle: if T is sufficient for θ and S is any estimator, then the conditional expectation φ(T) = E[S|T] has risk no worse than S and is strictly better unless S is already a function of T. This means we should always 'Rao-Blackwellize' estimators by conditioning on sufficient statistics. The Lehmann-Scheffé theorem completes the picture: if T is complete and sufficient, E[S|T] is the unique UMVUE (uniformly minimum variance unbiased estimator).",
          "The James-Stein estimator delivers a shocking result: when estimating a multivariate normal mean θ ∈ ℝᵈ with d ≥ 3, the MLE is inadmissible—there exist estimators with strictly lower MSE for all θ. The James-Stein estimator θ̂_JS = (1 - (d-2)/‖X‖²)X shrinks toward zero and dominates the MLE. This 'Stein's paradox' shows that bias can be beneficial: accepting some bias dramatically reduces variance. Empirical Bayes and shrinkage methods generalize this insight.",
          "Minimax estimation seeks estimators minimizing worst-case risk: θ̂_minimax minimizes sup_θ R(θ, θ̂) where R is expected loss. Minimax estimators are conservative but robust. The minimax theorem connects to game theory: estimating θ is a game against nature who chooses θ to maximize your loss. For squared error in location families, the minimax estimator often equals the Bayes estimator under a least favorable prior.",
          "Robust estimation addresses the reality that models are approximations. The sample mean has unbounded influence function—a single outlier can arbitrarily corrupt the estimate. Robust alternatives like the median, trimmed mean, and M-estimators (e.g., Huber loss) bound influence. The breakdown point measures robustness: the median tolerates 50% contamination, the mean 0%. In practice, robust estimators sacrifice some efficiency under correct models for protection against model misspecification and outliers.",
        ],
        keyIdeas: [
          "Cramér-Rao bound: Var(unbiased estimator) ≥ 1/Fisher information",
          "Rao-Blackwell: conditioning on sufficient statistics improves any estimator",
          "UMVUE exists uniquely via Lehmann-Scheffé when complete sufficient statistics exist",
          "James-Stein: MLE is inadmissible for d ≥ 3 dimensions—shrinkage helps",
          "Minimax estimation minimizes worst-case risk; connects to game theory",
          "Robust estimators bound influence functions; median has 50% breakdown point",
        ],
        equations: [
          "\\[ \\text{CRLB: } \\text{Var}(\\hat{\\theta}) \\geq \\frac{1}{I(\\theta)} = \\frac{1}{-\\mathbb{E}[\\partial^2 \\log L / \\partial \\theta^2]} \\]",
          "\\[ \\text{Rao-Blackwell: } R(\\theta, \\mathbb{E}[S|T]) \\leq R(\\theta, S) \\text{ for sufficient } T \\]",
          "\\[ \\hat{\\theta}_{JS} = \\left(1 - \\frac{d-2}{\\|X\\|^2}\\right)X \\quad \\text{(James-Stein, } d \\geq 3\\text{)} \\]",
          "\\[ \\text{Influence function: } IF(x; T, F) = \\lim_{\\epsilon \\to 0} \\frac{T((1-\\epsilon)F + \\epsilon \\delta_x) - T(F)}{\\epsilon} \\]",
        ],
        references: [
          "Lehmann & Casella - Theory of Point Estimation, Chapters 2, 5, 6",
          "Efron & Morris - Stein's Paradox in Statistics (1977)",
          "Huber & Ronchetti - Robust Statistics",
          "van der Vaart - Asymptotic Statistics, Chapter 5",
        ],
      },
    },
  ],
};

export default chapter;
