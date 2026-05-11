import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "model-interpretability",
  title: "Model Interpretability Tools",
  description: "Understanding model decisions and explanations.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Interpretability explains how a model makes decisions, which builds trust and supports debugging.",
          "Some models are inherently interpretable (linear models, decision trees), while others require post-hoc explanations.",
          "Interpretability is not one thing: global understanding and local explanations answer different questions.",
        ],
        keyIdeas: [
          "Global interpretability explains overall model behavior",
          "Local interpretability explains a single prediction",
          "Simplicity trades off with predictive power",
          "Explanations should be faithful and stable",
          "Interpretability supports fairness and compliance",
          "Evaluation must include human usability",
        ],
        equations: [
          "\\[ \\hat{y} = w^T x + b \\]",
          "\\[ \\text{PDP}(x_j) = \\mathbb{E}_{x_{-j}}[f(x_j, x_{-j})] \\]",
          "\\[ \\text{ICE}_i(x_j) = f(x_j, x_{i,-j}) \\]",
        ],
        references: [
          "Molnar - Interpretable Machine Learning",
          "Rudin (2019) - Stop Explaining Black Box Models",
          "Doshi-Velez and Kim (2017) - A Roadmap for Rigorous ML Interpretability",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Feature importance methods estimate which inputs influence predictions, but can be unstable under correlated features.",
          "Partial dependence and ICE plots reveal how outputs change as a feature varies.",
          "Model-agnostic methods are flexible but must be validated for fidelity.",
        ],
        keyIdeas: [
          "Permutation importance tests feature impact",
          "PDP assumes feature independence, which can mislead",
          "ICE reveals heterogeneous effects across samples",
          "Surrogate models approximate black-box behavior",
          "Explanations should be checked for consistency",
          "Counterfactuals answer what-if questions",
        ],
        equations: [
          "\\[ \\Delta = \\text{metric}_{baseline} - \\text{metric}_{permute} \\]",
          "\\[ f_{sur}(x) \\approx f(x) \\quad (\\text{surrogate}) \\]",
          "\\[ x' = \\arg\\min_{z} \\|z - x\\| \\; \\text{s.t.} \\; f(z) \\ne f(x) \\]",
        ],
        references: [
          "Breiman (2001) - Random Forests (importance)",
          "Goldstein et al. (2015) - Peeking Inside the Black Box",
          "Wachter et al. (2017) - Counterfactual Explanations",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Interpretability interacts with causality: explanations should reflect causal relationships, not just correlations.",
          "Influence functions and representer point methods connect predictions to training data, enabling dataset debugging.",
          "Auditing requires rigorous evaluation of explanation fidelity and stability.",
        ],
        keyIdeas: [
          "Causal explanations are more robust to distribution shift",
          "Influence functions estimate training point impact",
          "Stability measures sensitivity of explanations",
          "Counterfactual fairness evaluates changes under sensitive attributes",
          "Explanation methods can be gamed or misleading",
          "Interpretability should be task and audience specific",
        ],
        equations: [
          "\\[ \\hat{\\theta}_{-i} \\approx \\hat{\\theta} - \\frac{1}{n} H^{-1} \\nabla_\\theta \\ell(z_i, \\hat{\\theta}) \\]",
          "\\[ I(z_i, z_{test}) = -\\nabla_\\theta \\ell(z_{test}, \\hat{\\theta})^T H^{-1} \\nabla_\\theta \\ell(z_i, \\hat{\\theta}) \\]",
          "\\[ \\text{CF} = \\mathbb{E}[f(X_{A \\leftarrow a}) - f(X_{A \\leftarrow a'})] \\]",
        ],
        references: [
          "Koh and Liang (2017) - Influence Functions",
          "Pearl - Causality",
          "Ghorbani et al. (2019) - Interpretability in the Wild",
        ],
      },
    },
  ],
};

export default chapter;
