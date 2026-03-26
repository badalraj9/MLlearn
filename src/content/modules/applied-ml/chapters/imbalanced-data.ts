import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "imbalanced-data",
  title: "Imbalanced Data Handling",
  description: "Strategies for skewed class distributions.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Imbalanced data occurs when one class is much rarer than others. Standard accuracy becomes misleading.",
          "Models can achieve high accuracy by predicting the majority class, while failing on the minority class.",
          "Handling imbalance requires better metrics, resampling, and cost-sensitive training.",
        ],
        keyIdeas: [
          "Accuracy is unreliable under imbalance",
          "Use precision, recall, F1, and ROC/PR curves",
          "Resampling balances the training distribution",
          "Class weights penalize minority errors more",
          "Decision thresholds should be tuned for the objective",
          "Calibration matters for rare events",
        ],
        equations: [
          "\\[ \\text{Precision} = \\frac{TP}{TP+FP} \\]",
          "\\[ \\text{Recall} = \\frac{TP}{TP+FN} \\]",
          "\\[ F1 = \\frac{2PR}{P+R} \\]",
        ],
        references: [
          "He and Garcia (2009) - Learning from Imbalanced Data",
          "Saito and Rehmsmeier (2015) - Precision-Recall vs ROC",
          "Krawczyk (2016) - Learning from Imbalanced Data Streams",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "SMOTE and other oversampling methods create synthetic minority examples to balance training data.",
          "Undersampling can reduce bias but may discard useful information.",
          "Cost-sensitive loss functions directly encode the business cost of errors.",
        ],
        keyIdeas: [
          "SMOTE interpolates between minority examples",
          "ADASYN focuses on harder minority regions",
          "Undersampling can improve speed but increases variance",
          "Class weighting shifts the decision boundary",
          "Threshold tuning optimizes for precision or recall",
          "PR-AUC is often more informative than ROC-AUC",
        ],
        equations: [
          "\\[ \\mathcal{L} = -\\sum_i w_{y_i} \\log p(y_i \\mid x_i) \\]",
          "\\[ \\text{Balanced Acc} = \\frac{1}{2}(\\text{TPR} + \\text{TNR}) \\]",
          "\\[ \\text{PR-AUC} = \\int_0^1 P(R) \\, dR \\]",
        ],
        references: [
          "Chawla et al. (2002) - SMOTE",
          "Elkan (2001) - The Foundations of Cost-Sensitive Learning",
          "Fernandez et al. (2018) - Learning from Imbalanced Data Sets",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Imbalance with distribution shift requires careful evaluation; a model that performs well offline can fail when prevalence changes.",
          "Bayes optimal decision thresholds depend on class priors and misclassification costs.",
          "Rare-event modeling often needs specialized methods like anomaly detection or one-class classification.",
        ],
        keyIdeas: [
          "Decision threshold depends on class priors and costs",
          "Calibration enables consistent decision-making under shift",
          "One-class methods model only the normal class",
          "Anomaly detection reframes imbalance as density estimation",
          "Active learning can target minority labels efficiently",
          "Evaluation must reflect deployment prevalence",
        ],
        equations: [
          "\\[ \\text{Predict } 1 \\text{ if } \\frac{P(y=1\\mid x)}{P(y=0\\mid x)} > \\frac{C_{10}}{C_{01}} \\cdot \\frac{\\pi_0}{\\pi_1} \\]",
          "\\[ \\hat{p}_{new}(y=1\\mid x) = \\frac{\\alpha \\hat{p}(y=1\\mid x)}{\\alpha \\hat{p}(y=1\\mid x) + (1-\\alpha)(1-\\hat{p}(y=1\\mid x))} \\]",
          "\\[ \\text{Isolation Score} \\propto 2^{-\\frac{E[h(x)]}{c(n)}} \\]",
        ],
        references: [
          "Japkowicz and Stephen (2002) - The Class Imbalance Problem",
          "Chandola, Banerjee, Kumar (2009) - Anomaly Detection: A Survey",
          "Saerens et al. (2002) - Adjusting the Outputs of a Classifier for New Priors",
        ],
      },
    },
  ],
};

export default chapter;
