import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "logging-drift",
  title: "Logging & Drift Detection",
  description: "Detecting data and concept drift over time.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Logging and drift detection ensure you can observe model behavior in the real world and catch issues early.",
          "Logs should capture inputs, features, predictions, and metadata while respecting privacy and security constraints.",
          "Drift detection compares current data to a reference baseline and signals when distributions change.",
        ],
        keyIdeas: [
          "Log model version, feature version, and request context",
          "Sampling can reduce cost while preserving signal",
          "PII should be hashed or removed before logging",
          "Drift can occur in inputs, predictions, or labels",
          "Alerts should separate drift from performance loss",
          "Dashboards should support time slicing and cohort analysis",
        ],
        equations: [
          "\\[ D_{JS}(P,Q) = \\tfrac{1}{2} D_{KL}(P\\|M) + \\tfrac{1}{2} D_{KL}(Q\\|M) \\]",
          "\\[ M = \\tfrac{1}{2}(P+Q) \\]",
          "\\[ \\text{PSI} = \\sum_i (p_i - q_i) \\log \\frac{p_i}{q_i} \\]",
        ],
        references: [
          "Breck et al. (2017) - The ML Test Score",
          "Gama et al. (2014) - A Survey on Concept Drift",
          "Google - Monitoring ML Systems",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Effective logging includes a defined schema, retention policy, and secure access controls.",
          "Drift detectors can be univariate (per feature) or multivariate (joint distributions).",
          "Label delay requires storing predictions and joining with ground truth later.",
        ],
        keyIdeas: [
          "Feature store integration simplifies consistent logging",
          "Sampling strategies should be unbiased for monitoring",
          "Drift thresholds must be calibrated to noise",
          "Schema evolution needs versioned logging formats",
          "Data freshness metrics detect pipeline delays",
          "Backfill is needed when labels arrive late",
        ],
        equations: [
          "\\[ \\text{Lag} = t_{label} - t_{prediction} \\]",
          "\\[ \\chi^2 = \\sum_i \\frac{(o_i - e_i)^2}{e_i} \\]",
          "\\[ \\text{Drift Score} = \\frac{D(P,Q)}{D_{threshold}} \\]",
        ],
        references: [
          "Seldon - Drift Detection in Production",
          "Evidently AI - Data and Model Drift Guides",
          "Amazon - Monitoring ML Models in Production",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced monitoring uses change-point detection and sequential tests to detect shifts quickly with controlled false alarm rates.",
          "Causal analysis can separate genuine model degradation from user behavior changes.",
          "Privacy-preserving logging uses aggregation, differential privacy, or secure enclaves.",
        ],
        keyIdeas: [
          "Sequential tests enable early detection",
          "Change-point models detect abrupt vs gradual drift",
          "Causal metrics reduce spurious alerts",
          "Differential privacy protects sensitive logs",
          "Encrypted logging can meet compliance requirements",
          "Drift-aware retraining schedules reduce overreaction",
        ],
        equations: [
          "\\[ S_t = \\max(0, S_{t-1} + x_t - k) \\quad (\\text{CUSUM}) \\]",
          "\\[ P(M(D) \\in S) \\le e^{\\epsilon} P(M(D') \\in S) \\]",
          "\\[ \\text{FPR} = \\frac{FP}{FP + TN} \\]",
        ],
        references: [
          "Page (1954) - CUSUM Change Detection",
          "Basseville and Nikiforov - Detection of Abrupt Changes",
          "Dwork and Roth - The Algorithmic Foundations of Differential Privacy",
        ],
      },
    },
  ],
};

export default chapter;
