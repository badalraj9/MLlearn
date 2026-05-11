import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "feature-selection",
  title: "Feature Selection",
  description: "Identifying the most informative features.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Feature selection chooses a subset of variables to improve generalization, reduce cost, and increase interpretability.",
          "Fewer, better features can reduce variance and simplify models without sacrificing accuracy.",
          "Selection methods include filters, wrappers, and embedded techniques.",
        ],
        keyIdeas: [
          "Filter methods rank features independently of the model",
          "Wrapper methods evaluate subsets using a model",
          "Embedded methods select features during training",
          "Collinearity can make features redundant",
          "Selection reduces overfitting in high dimensions",
          "Domain knowledge often beats purely automatic selection",
        ],
        equations: [
          "\\[ I(X;Y) = \\sum_{x,y} p(x,y) \\log \\frac{p(x,y)}{p(x)p(y)} \\]",
          "\\[ r = \\frac{\\sum (x_i-\\bar{x})(y_i-\\bar{y})}{\\sqrt{\\sum (x_i-\\bar{x})^2 \\sum (y_i-\\bar{y})^2}} \\]",
          "\\[ \\hat{\\beta} = \\arg\\min_{\\beta} \\|y - X\\beta\\|_2^2 + \\lambda \\|\\beta\\|_1 \\]",
        ],
        references: [
          "Guyon and Elisseeff (2003) - An Introduction to Variable and Feature Selection",
          "Hastie, Tibshirani, Friedman - The Elements of Statistical Learning",
          "Bishop - Pattern Recognition and Machine Learning",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Wrapper methods like forward selection or RFE can yield strong performance but are computationally expensive.",
          "Regularized models (L1, Elastic Net) perform embedded feature selection and handle correlated features better.",
          "Stability of selected features across folds is as important as raw performance.",
        ],
        keyIdeas: [
          "Recursive feature elimination iteratively prunes weak features",
          "L1 regularization yields sparse solutions",
          "Elastic Net balances L1 and L2",
          "Permutation importance estimates feature impact",
          "Feature selection should be inside cross-validation",
          "Selection can cause leakage if done before splitting",
        ],
        equations: [
          "\\[ \\hat{\\beta} = \\arg\\min_{\\beta} \\|y-X\\beta\\|_2^2 + \\lambda_1 \\|\\beta\\|_1 + \\lambda_2 \\|\\beta\\|_2^2 \\]",
          "\\[ \\Delta = \\text{metric}_{baseline} - \\text{metric}_{permute} \\]",
          "\\[ \\text{RFE score} = \\arg\\min_k \\; \\text{CV error}(k) \\]",
        ],
        references: [
          "Zou and Hastie (2005) - Elastic Net",
          "Kohavi and John (1997) - Wrappers for Feature Subset Selection",
          "Breiman (2001) - Random Forests (feature importance)",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Feature selection under distribution shift requires robustness; features that correlate in training may fail in production.",
          "Causal feature selection uses invariance across environments to identify stable predictors.",
          "In high dimensions, selection is a multiple testing problem and needs statistical control.",
        ],
        keyIdeas: [
          "Invariant risk minimization targets stable predictors",
          "Stability selection controls false discoveries",
          "Group Lasso selects structured feature groups",
          "Causal graphs can identify spurious correlations",
          "Selection in streaming data requires adaptive methods",
          "Feature selection impacts fairness and bias",
        ],
        equations: [
          "\\[ \\min_{\\theta} \\sum_e R^e(\\theta) + \\lambda \\sum_e \\|\\nabla_{\\theta} R^e(\\theta)\\|^2 \\]",
          "\\[ \\hat{S} = \\{j : \\pi_j \\ge \\pi_{thr}\\} \\quad (\\text{stability selection}) \\]",
          "\\[ \\hat{\\beta} = \\arg\\min_{\\beta} \\|y-X\\beta\\|_2^2 + \\lambda \\sum_g \\|\\beta_g\\|_2 \\]",
        ],
        references: [
          "Meinshausen and BuhImann (2010) - Stability Selection",
          "Arjovsky et al. (2019) - Invariant Risk Minimization",
          "Peters, Janzing, Scholkopf - Elements of Causal Inference",
        ],
      },
    },
  ],
};

export default chapter;
