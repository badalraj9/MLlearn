import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "map-estimation",
  title: "MAP Estimation",
  description: "Point estimates with prior beliefs.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Maximum a posteriori (MAP) estimation picks the parameter value that is most probable after seeing data. It is Bayesian in spirit but yields a single point estimate.",
          "MAP balances the likelihood of the data with a prior belief about parameters. When the prior is flat, MAP reduces to maximum likelihood estimation (MLE).",
          "In practice, MAP is often easier to compute than the full posterior and acts like regularization in optimization.",
        ],
        keyIdeas: [
          "Posterior is proportional to likelihood times prior",
          "MAP chooses the mode of the posterior distribution",
          "With a uniform prior, MAP equals MLE",
          "Gaussian prior yields L2 regularization",
          "Laplace prior yields L1 regularization",
          "MAP can be sensitive to prior choice",
        ],
        equations: [
          "\\[ \\hat{\\theta}_{MAP} = \\arg\\max_{\\theta} \\; p(\\theta \\mid D) \\]",
          "\\[ p(\\theta \\mid D) \\propto p(D \\mid \\theta) \\, p(\\theta) \\]",
          "\\[ \\hat{\\theta}_{MAP} = \\arg\\max_{\\theta} \\left[ \\log p(D \\mid \\theta) + \\log p(\\theta) \\right] \\]",
        ],
        references: [
          "Bishop - Pattern Recognition and Machine Learning, Ch. 2",
          "Murphy - Machine Learning: A Probabilistic Perspective",
          "Gelman et al. - Bayesian Data Analysis",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "MAP is equivalent to penalized likelihood. The negative log prior becomes a regularizer, making Bayesian assumptions explicit in optimization.",
          "For exponential family models with conjugate priors, MAP often has closed form solutions or simple update rules.",
          "MAP differs from the posterior mean. For skewed or multimodal posteriors, the MAP can be misleading, which is why uncertainty estimates still matter.",
        ],
        keyIdeas: [
          "MAP = MLE + regularization term from the prior",
          "Conjugate priors make MAP updates tractable",
          "Posterior mode can differ sharply from posterior mean",
          "In high dimensions, MAP may overfit if prior is weak",
          "Choosing priors is a modeling decision, not a technicality",
          "MAP is invariant to reparameterization only if prior transforms properly",
        ],
        equations: [
          "\\[ \\hat{\\theta}_{MAP} = \\arg\\min_{\\theta} \\left[ -\\log p(D \\mid \\theta) - \\log p(\\theta) \\right] \\]",
          "\\[ \\text{Gaussian prior: } -\\log p(\\theta) \\propto \\|\\theta\\|_2^2 \\]",
          "\\[ \\text{Laplace prior: } -\\log p(\\theta) \\propto \\|\\theta\\|_1 \\]",
        ],
        references: [
          "Blei - Probabilistic Topic Models (appendix on MAP)",
          "Boyd and Vandenberghe - Convex Optimization, Ch. 6",
          "Gelman et al. - Bayesian Data Analysis, Ch. 2",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "MAP connects to the Laplace approximation: if you expand the log posterior around the MAP, you obtain a Gaussian approximation of the posterior.",
          "In hierarchical models, MAP can be unstable when hyperparameters are weakly identified, leading to degenerate estimates. This is a known failure mode in empirical Bayes.",
          "In nonconvex models (like deep nets), MAP corresponds to a local optimum of a complex energy landscape and depends strongly on optimization dynamics.",
        ],
        keyIdeas: [
          "Laplace approximation uses the Hessian at the MAP",
          "Empirical Bayes optimizes hyperparameters via MAP-like objectives",
          "MAP is sensitive to parameterization without proper prior transforms",
          "In multimodal posteriors, MAP picks one mode and ignores others",
          "Posterior geometry (curvature) determines uncertainty near MAP",
          "MAP is a limit of tempered posteriors as temperature goes to zero",
        ],
        equations: [
          "\\[ \\log p(\\theta \\mid D) \\approx \\log p(\\hat{\\theta}_{MAP} \\mid D) - \\tfrac{1}{2}(\\theta-\\hat{\\theta})^T H (\\theta-\\hat{\\theta}) \\]",
          "\\[ H = -\\nabla^2 \\log p(\\theta \\mid D) \\big|_{\\hat{\\theta}_{MAP}} \\]",
          "\\[ p_T(\\theta \\mid D) \\propto p(D \\mid \\theta)^{1/T} p(\\theta)^{1/T} \\]",
        ],
        references: [
          "MacKay - Information Theory, Inference, and Learning Algorithms",
          "Kass and Raftery (1995) - Bayes factors and Laplace approximations",
          "Gelman et al. - Bayesian Data Analysis, Ch. 13",
        ],
      },
    },
  ],
};

export default chapter;
