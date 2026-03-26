import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "bayesian-inference",
  title: "Bayesian Inference",
  description:
    "Full posterior reasoning over parameters and uncertainty quantification.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Bayesian inference is the practice of using Bayes' theorem to learn about unknown quantities from data. Instead of finding a single 'best guess' for model parameters, Bayesian inference gives you a complete probability distribution over all possible values—capturing not just what's likely, but how uncertain you are. This is fundamentally different from the frequentist approach, which produces point estimates and confidence intervals.",
          "The key insight is that in the Bayesian view, uncertainty is always personal and conditional on what you know. Your prior distribution encodes your beliefs before seeing data; after observing data, Bayes' theorem updates this to a posterior distribution. As you gather more evidence, your posterior typically becomes narrower—you become more certain. But if the data is noisy or conflicting, your uncertainty remains appropriately high.",
          "Consider estimating whether a coin is fair. A frequentist might flip it 100 times, count heads, and report a point estimate like 'the coin has 52% probability of heads.' A Bayesian starts with a prior (maybe 'most coins are roughly fair'), collects the same data, and produces a posterior distribution that might peak at 52% but also shows the full range of plausible values—maybe the true rate is anywhere from 42% to 62% with 95% probability. This distribution captures uncertainty in a way a single number cannot.",
        ],
        keyIdeas: [
          "Parameters are treated as random variables with probability distributions",
          "The prior encodes beliefs before seeing data; the posterior updates those beliefs",
          "More data generally leads to narrower posteriors (less uncertainty)",
          "The full posterior captures uncertainty, not just point estimates",
          "Bayesian credible intervals have a direct interpretation: '95% probability the true value lies here'",
        ],
        equations: [
          "\\[ p(\\theta | D) \\propto p(D | \\theta) \\cdot p(\\theta) \\]",
          "\\[ \\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior} \\]",
        ],
        references: [
          "StatQuest - Bayesian Inference",
          "3Blue1Brown - The more general uncertainty principle",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The full Bayesian inference workflow has three stages: (1) specify a prior p(θ) capturing domain knowledge, (2) define a likelihood p(D|θ) describing how data arises from parameters, and (3) compute or approximate the posterior p(θ|D). For prediction, we integrate over the posterior: p(x̃|D) = ∫ p(x̃|θ)·p(θ|D)dθ, which naturally propagates uncertainty to predictions.",
          "Computing the posterior often requires approximation. The marginal likelihood p(D) = ∫p(D|θ)·p(θ)dθ is typically intractable for complex models. Conjugate priors offer analytical solutions for simple cases—the Beta-Binomial and Gaussian-Gaussian models are canonical examples. For general models, Markov Chain Monte Carlo (MCMC) methods like Metropolis-Hastings and Gibbs sampling draw samples from the posterior without computing the normalizing constant.",
          "Point estimates from the posterior include the MAP (mode), posterior mean, and posterior median. The MAP is most common but can be misleading for multimodal posteriors. The posterior mean minimizes expected squared error; the median minimizes expected absolute error. For prediction, using the full posterior via integration (Bayesian model averaging) almost always outperforms any single point estimate.",
          "Practical implementation tips: always visualize your prior before seeing data (prior predictive checks), check that your posterior makes sense (posterior predictive checks), and assess convergence of MCMC chains using diagnostics like R̂ (R-hat) and effective sample size. Common bugs include improper priors that don't normalize and numerical issues when likelihoods underflow to zero.",
        ],
        keyIdeas: [
          "Conjugate priors yield closed-form posteriors for exponential family models",
          "MCMC samples approximate the posterior when analytical solutions don't exist",
          "Posterior predictive checks validate model fit by simulating data from the posterior",
          "Bayesian model averaging integrates over parameter uncertainty for predictions",
          "Convergence diagnostics (R̂, ESS) are essential for trusting MCMC results",
          "Prior predictive checks catch issues before wasting computation on misspecified models",
        ],
        equations: [
          "\\[ p(x_{new} | D) = \\int p(x_{new} | \\theta) \\, p(\\theta | D) \\, d\\theta \\]",
          "\\[ \\hat{\\theta}_{MAP} = \\arg\\max_\\theta \\left[ \\log p(D | \\theta) + \\log p(\\theta) \\right] \\]",
          "\\[ \\text{Beta-Binomial: } p(\\theta | k, n) = \\text{Beta}(\\alpha_0 + k, \\beta_0 + n - k) \\]",
        ],
        references: [
          "Gelman et al. - Bayesian Data Analysis, 3rd Edition",
          "Bishop - Pattern Recognition and Machine Learning, Chapter 2",
          "Kruschke - Doing Bayesian Data Analysis",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Hierarchical models extend Bayesian inference to multiple levels of uncertainty. If data comes from J groups, we model group-level parameters θⱼ drawn from a hyperprior: θⱼ ~ p(θ|φ), φ ~ p(φ). This induces partial pooling—groups borrow strength from each other while maintaining individuality. The famous '8 schools' example demonstrates how hierarchical models handle varying treatment effects across schools, shrinking extreme estimates toward the grand mean.",
          "Variational inference (VI) reformulates posterior approximation as optimization. We minimize KL(q(θ)‖p(θ|D)) over a tractable family q, equivalently maximizing the Evidence Lower Bound (ELBO). Mean-field VI assumes q factorizes: q(θ) = ∏qⱼ(θⱼ). Modern approaches use amortized inference: an encoder network maps data directly to variational parameters. Stochastic VI enables scaling to massive datasets via minibatch gradients.",
          "Normalizing flows dramatically expand variational family expressiveness. A sequence of invertible transformations maps a simple base distribution to a complex posterior approximation: q_K(θ) = q_0(f_K⁻¹ ∘ ... ∘ f₁⁻¹(θ))·|det(J)|⁻¹. Architectures like RealNVP use affine coupling layers with trivial Jacobian determinants, enabling high-dimensional posteriors for image models and molecular design.",
          "The Bernstein-von Mises theorem provides a frequentist-Bayesian bridge: under regularity conditions, the posterior converges to a Gaussian centered at the maximum likelihood estimator with variance given by the inverse Fisher information. This means Bayesian and frequentist intervals asymptotically agree—though the interpretations differ fundamentally. The theorem fails for non-regular models (e.g., boundary constraints, infinite-dimensional parameters).",
          "Frontier challenges include: Bayesian deep learning where posteriors over millions of weights remain intractable, inference for implicit models where the likelihood is unavailable (using approximate Bayesian computation or likelihood-free inference), and scalable MCMC for modern data sizes. The field is converging on hybrid approaches: variational approximations for speed, occasional MCMC for calibration, and Laplace approximations for cheap uncertainty quantification.",
        ],
        keyIdeas: [
          "Hierarchical models enable partial pooling across groups via hyperpriors",
          "Variational inference trades asymptotic exactness for computational scalability",
          "Normalizing flows provide flexible variational families via invertible transformations",
          "Bernstein-von Mises: posteriors converge to Gaussian around MLE asymptotically",
          "Amortized inference uses neural networks to predict variational parameters",
          "Likelihood-free inference handles simulators without tractable likelihoods",
        ],
        equations: [
          "\\[ p(\\theta_1, \\ldots, \\theta_J, \\phi | D) \\propto p(\\phi) \\prod_{j=1}^{J} p(\\theta_j | \\phi) \\, p(D_j | \\theta_j) \\]",
          "\\[ \\text{ELBO}(q) = \\mathbb{E}_{q(\\theta)}[\\log p(D, \\theta)] - \\mathbb{E}_{q(\\theta)}[\\log q(\\theta)] \\]",
          "\\[ \\theta_{posterior} \\xrightarrow{n \\to \\infty} \\mathcal{N}\\left(\\hat{\\theta}_{MLE}, I(\\hat{\\theta}_{MLE})^{-1}\\right) \\]",
          "\\[ q_K(\\theta) = q_0(z_0) \\prod_{k=1}^{K} \\left| \\det \\frac{\\partial f_k}{\\partial z_{k-1}} \\right|^{-1} \\]",
        ],
        references: [
          "arXiv:1601.00670 - Variational Inference: A Review for Statisticians",
          "arXiv:1806.05967 - Neural Autoregressive Flows",
          "Gelman et al. - Bayesian Data Analysis, Chapter 5 (Hierarchical Models)",
          "arXiv:1808.06214 - Deep Probabilistic Programming with Pyro",
        ],
      },
    },
  ],
};

export default chapter;
