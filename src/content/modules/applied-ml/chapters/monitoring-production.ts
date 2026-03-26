import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "monitoring-production",
  title: "Monitoring Models in Production",
  description: "Tracking model performance after deployment.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Monitoring in production ensures models remain accurate, fair, and reliable after deployment.",
          "Unlike traditional software, ML systems can degrade due to data drift and concept drift, even without code changes.",
          "Effective monitoring combines system metrics, data quality checks, and model performance signals.",
        ],
        keyIdeas: [
          "Track latency, throughput, and error rates (system health)",
          "Monitor input distributions for drift",
          "Track prediction distributions for shift",
          "Evaluate online performance with delayed labels",
          "Alerting should be tied to SLOs and error budgets",
          "Dashboards should separate detection from diagnosis",
        ],
        equations: [
          "\\[ \\text{Error Rate} = \\frac{\\text{errors}}{\\text{total requests}} \\]",
          "\\[ D_{KL}(P \\| Q) = \\sum_x P(x) \\log \\frac{P(x)}{Q(x)} \\]",
          "\\[ \\text{PSI} = \\sum_i (p_i - q_i) \\log \\frac{p_i}{q_i} \\]",
        ],
        references: [
          "Breck et al. (2017) - The ML Test Score",
          "Google - MLOps: Monitoring and Observability",
          "NIST - AI Risk Management Framework",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Monitoring pipelines must handle delayed ground truth by using proxy metrics and backfilling when labels arrive.",
          "Population stability, feature drift, and prediction drift are early warning signals before accuracy drops.",
          "Alerting should minimize false positives to avoid alert fatigue.",
        ],
        keyIdeas: [
          "Drift detection can be univariate or multivariate",
          "Data quality checks catch missingness and schema changes",
          "Online evaluation requires careful sampling and bias control",
          "Post-deploy checks compare to baseline or shadow model",
          "Monitoring must log model version and feature version",
          "Feature importance shifts can signal concept drift",
        ],
        equations: [
          "\\[ \\chi^2 = \\sum_i \\frac{(o_i - e_i)^2}{e_i} \\]",
          "\\[ \\text{P95} = \\text{percentile}_{0.95}(L) \\]",
          "\\[ \\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN} \\]",
        ],
        references: [
          "Gama et al. (2014) - A Survey on Concept Drift",
          "Lu et al. (2018) - Learning Under Concept Drift",
          "Amazon - Deployed ML Monitoring Patterns",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced monitoring uses causal analysis and counterfactual evaluation to separate model issues from changes in user behavior.",
          "Drift detectors can be adaptive, changing thresholds based on uncertainty and seasonality.",
          "Operational excellence requires incident response playbooks and automated rollback criteria.",
        ],
        keyIdeas: [
          "Change-point detection spots abrupt distribution shifts",
          "Sequential tests support continuous monitoring",
          "Causal metrics reduce spurious alerts",
          "Adaptive thresholds handle seasonality",
          "Shadow deployments allow side-by-side comparison",
          "Root cause analysis integrates system and data signals",
        ],
        equations: [
          "\\[ S_t = \\max(0, S_{t-1} + x_t - k) \\quad (\\text{CUSUM}) \\]",
          "\\[ \\text{EWMA}_t = \\alpha x_t + (1-\\alpha) \\text{EWMA}_{t-1} \\]",
          "\\[ p = \\min(1, m \\cdot p_{raw}) \\quad (\\text{FDR control}) \\]",
        ],
        references: [
          "Page (1954) - Continuous Inspection Schemes (CUSUM)",
          "Basseville and Nikiforov - Detection of Abrupt Changes",
          "SRE Book - Incident Response",
        ],
      },
    },
  ],
};

export default chapter;
