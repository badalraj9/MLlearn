import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "mle",
  title: "Maximum Likelihood Estimation",
  description: "Finding parameters that maximize data probability.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Maximum likelihood estimation (MLE) chooses parameters that make the observed data most probable under the model.",
          "It turns estimation into an optimization problem and is the default for many statistical and ML models.",
          "MLE is intuitive: pick the parameters that best explain what you observed.",
        ],
        keyIdeas: [
          "Likelihood is a function of parameters, not data",
          "Log-likelihood converts products into sums",
          "MLE can be biased but consistent under conditions",
          "Large sample theory gives asymptotic normality",
          "MLE is invariant under reparameterization",
          "Regularization modifies MLE into MAP",
        ],
        equations: [
          "\\[ \\hat{\\theta}_{MLE} = \\arg\\max_{\\theta} \\; p(D \\mid \\theta) \\]",
          "\\[ \\ell(\\theta) = \\sum_{i=1}^n \\log p(x_i \\mid \\theta) \\]",
          "\\[ \\nabla_\\theta \\ell(\\theta) = 0 \\]",
        ],
        references: [
          "Casella and Berger - Statistical Inference, Ch. 7",
          "Bishop - Pattern Recognition and Machine Learning, Ch. 1",
          "Wasserman - All of Statistics",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The Fisher information measures how sharply the likelihood peaks around the true parameter and sets a lower bound on estimator variance.",
          "For exponential family models, MLE often has closed-form solutions or simple iterative updates.",
          "The log-likelihood is usually concave for well-behaved models, which guarantees a global optimum.",
        ],
        keyIdeas: [
          "Fisher information controls estimator variance",
          "Cramer-Rao bound gives a lower bound on variance",
          "Score function is the gradient of log-likelihood",
          "Exponential family models yield tractable MLE",
          "EM algorithm is used when latent variables exist",
          "Likelihood surfaces can be multimodal in complex models",
        ],
        equations: [
          "\\[ I(\\theta) = \\mathbb{E}\\left[ \\left( \\frac{\\partial}{\\partial \\theta} \\log p(X\\mid\\theta) \\right)^2 \\right] \\]",
          "\\[ \\text{Var}(\\hat{\\theta}) \\ge \\frac{1}{I(\\theta)} \\]",
          "\\[ \\mathbb{E}[\\nabla_\\theta \\log p(X\\mid\\theta)] = 0 \\]",
        ],
        references: [
          "Lehmann and Casella - Theory of Point Estimation",
          "Bishop - Pattern Recognition and Machine Learning, Ch. 9",
          "McLachlan and Krishnan - The EM Algorithm",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Asymptotic theory shows MLE is consistent and asymptotically normal under regularity conditions. This justifies confidence intervals and hypothesis tests.",
          "In misspecified models, MLE converges to the parameter minimizing KL divergence to the true distribution.",
          "For high-dimensional models, classical MLE theory can fail and requires new tools like empirical process theory.",
        ],
        keyIdeas: [
          "Asymptotic normality uses Taylor expansion of score",
          "Sandwich covariance accounts for misspecification",
          "MLE is efficient under correct model assumptions",
          "High-dimensional regimes require regularization",
          "Profile likelihood handles nuisance parameters",
          "Information geometry interprets MLE as projection",
        ],
        equations: [
          "\\[ \\sqrt{n}(\\hat{\\theta} - \\theta_0) \\xrightarrow{d} \\mathcal{N}(0, I(\\theta_0)^{-1}) \\]",
          "\\[ \\hat{\\theta} = \\arg\\min_{\\theta} \\; D_{KL}(p_0 \\| p_\\theta) \\]",
          "\\[ \\text{Var}(\\hat{\\theta}) \\approx (J^T W J)^{-1} J^T W \\Sigma W J (J^T W J)^{-1} \\]",
        ],
        references: [
          "van der Vaart - Asymptotic Statistics",
          "White (1982) - Maximum likelihood under model misspecification",
          "Bickel et al. - Efficient and Adaptive Estimation for Semiparametric Models",
        ],
      },
    },
  ],
};

export default chapter;
