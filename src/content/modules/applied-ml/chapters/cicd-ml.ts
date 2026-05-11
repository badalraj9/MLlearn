import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "cicd-ml",
  title: "CI/CD for ML",
  description: "Continuous integration and deployment for ML pipelines.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "CI/CD for ML extends software pipelines with data, model, and evaluation stages. It turns experiments into repeatable, auditable releases.",
          "A good pipeline automatically validates code, data, training, and model quality before any deployment.",
          "The goal is safe, fast iteration: small changes, clear gates, and predictable rollbacks.",
        ],
        keyIdeas: [
          "Pipelines must version data, code, and model artifacts together",
          "Automated checks include unit tests, data validation, and model evaluation",
          "Model promotion should be gated by offline and online metrics",
          "Artifacts belong in a registry with lineage and metadata",
          "Deployment strategies include canary, blue-green, and shadow",
          "Rollback and reproducibility are first-class requirements",
        ],
        equations: [
          "\\[ \\text{Error Rate} = \\frac{\\text{failed requests}}{\\text{total requests}} \\]",
          "\\[ \\text{Availability} = \\frac{\\text{uptime}}{\\text{uptime} + \\text{downtime}} \\]",
          "\\[ \\text{Canary Lift} = \\text{metric}_{canary} - \\text{metric}_{baseline} \\]",
        ],
        references: [
          "Sculley et al. (2015) - Hidden Technical Debt in ML Systems",
          "Google - MLOps: Continuous Delivery and Automation Pipelines",
          "Baylor et al. (2017) - TFX: A TensorFlow-Based Production-Scale ML Platform",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "ML pipelines add data checks (schema, missingness, leakage), training checks (reproducibility, determinism), and model checks (performance, bias).",
          "CI handles fast feedback (lint, unit tests, small training runs). CD promotes candidates through staging with gradual traffic shifts.",
          "Automated model cards and changelogs improve traceability and compliance.",
        ],
        keyIdeas: [
          "Data validation catches schema drift before training",
          "Training pipelines should log seeds, configs, and environment",
          "Offline metrics are necessary but not sufficient for release",
          "Staging with shadow traffic reveals integration issues",
          "Feature store and training/serving parity reduce bugs",
          "Pipeline templates reduce copy-paste and standardize quality",
        ],
        equations: [
          "\\[ \\text{Lift} = \\frac{\\text{metric}_{new} - \\text{metric}_{old}}{\\text{metric}_{old}} \\]",
          "\\[ \\text{Precision} = \\frac{TP}{TP + FP} \\]",
          "\\[ \\text{Recall} = \\frac{TP}{TP + FN} \\]",
        ],
        references: [
          "Breck et al. (2019) - Data Validation for ML",
          "Hamman et al. (2018) - ML Metadata and Lineage",
          "Ng (2020) - MLOps: From Model-centric to Data-centric AI",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "At scale, CI/CD must handle governance, approvals, and risk. Automated policy checks enforce compliance without slowing delivery.",
          "Progressive delivery uses online experimentation, guardrails, and automatic rollback based on SLOs.",
          "Advanced pipelines manage multiple models and dependencies, coordinating updates across services.",
        ],
        keyIdeas: [
          "Policy-as-code enables auditable releases",
          "Canary analysis uses statistically robust tests",
          "Automated rollback should trigger on multiple signals",
          "Model registry supports dependency tracking and deprecation",
          "Multi-armed bandits can optimize traffic allocation",
          "Release velocity must balance with operational risk",
        ],
        equations: [
          "\\[ Z = \\frac{\\hat{p}_1 - \\hat{p}_2}{\\sqrt{\\hat{p}(1-\\hat{p})(1/n_1 + 1/n_2)}} \\]",
          "\\[ \\text{SLO Burn Rate} = \\frac{\\text{error budget consumed}}{\\text{time elapsed}} \\]",
          "\\[ \\text{Regret} = \\sum_t (r^* - r_t) \\]",
        ],
        references: [
          "Xie et al. (2021) - AB Testing for ML Systems",
          "Google SRE Book - Service Level Objectives",
          "Kohavi et al. - Trustworthy Online Controlled Experiments",
        ],
      },
    },
  ],
};

export default chapter;
