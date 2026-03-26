import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "data-cleaning-pipelines",
  title: "Data Cleaning Pipelines",
  description: "Handling missing values, outliers, and noisy data.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Data cleaning pipelines turn raw data into reliable training inputs. Small quality issues often dominate model performance.",
          "Pipelines should be repeatable, versioned, and validated automatically.",
          "Good cleaning is not just fixing errors; it is encoding domain assumptions explicitly.",
        ],
        keyIdeas: [
          "Validate schemas, ranges, and missingness early",
          "Handle duplicates and inconsistent IDs",
          "Imputation strategies should match data semantics",
          "Outlier handling should be documented and reversible",
          "Data lineage links cleaned data to raw sources",
          "Pipelines must be deterministic and testable",
        ],
        equations: [
          "\\[ \\text{Missing Rate} = \\frac{\\text{missing values}}{\\text{total values}} \\]",
          "\\[ z = \\frac{x - \\mu}{\\sigma} \\]",
          "\\[ x_{imp} = \\frac{1}{n} \\sum_{i=1}^n x_i \\quad (\\text{mean imputation}) \\]",
        ],
        references: [
          "Kelleher et al. - Data Science (data cleaning chapter)",
          "Deequ - Data Quality Validation (Amazon)",
          "Breck et al. (2019) - Data Validation for ML",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Cleaning should be coupled with data tests: distribution checks, constraint checks, and leakage detection.",
          "Feature engineering and cleaning are intertwined; transforms should be logged and reproducible.",
          "Automated pipelines reduce manual errors and improve auditability.",
        ],
        keyIdeas: [
          "Unit tests for data catch schema changes early",
          "Train/serve parity prevents pipeline skew",
          "Time-aware splits avoid leakage",
          "Normalization requires consistent statistics",
          "Deduplication reduces label leakage and overfitting",
          "Human review is needed for ambiguous cases",
        ],
        equations: [
          "\\[ x' = \\frac{x - \\mu_{train}}{\\sigma_{train}} \\]",
          "\\[ \\text{Leakage Risk} \\approx P(\\text{feature uses future data}) \\]",
          "\\[ \\text{Dup Rate} = \\frac{\\text{duplicate rows}}{\\text{total rows}} \\]",
        ],
        references: [
          "Kohavi et al. - Leakage in ML",
          "Polyzotis et al. (2017) - Data Management Challenges in ML",
          "Google - Data Validation in TFX",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Large-scale pipelines must handle streaming data, late arrivals, and backfills without breaking reproducibility.",
          "Data quality metrics should be tied to business outcomes and model risk.",
          "Privacy constraints require careful handling of PII and sensitive attributes.",
        ],
        keyIdeas: [
          "Event time vs processing time affects feature correctness",
          "Backfill logic should be deterministic and logged",
          "Data contracts formalize expectations across teams",
          "Differential privacy can limit data leakage risk",
          "Sampling strategies reduce compute without bias",
          "Automated anomaly detection catches silent failures",
        ],
        equations: [
          "\\[ \\text{Lag} = t_{processing} - t_{event} \\]",
          "\\[ \\epsilon \\text{-DP: } P(M(D) \\in S) \\le e^{\\epsilon} P(M(D') \\in S) \\]",
          "\\[ \\text{Sample Weight} = \\frac{1}{P(\\text{selection})} \\]",
        ],
        references: [
          "Kearns and Roth - The Ethical Algorithm (privacy basics)",
          "Abadi et al. (2016) - Deep Learning with Differential Privacy",
          "Kleppmann - Designing Data-Intensive Applications",
        ],
      },
    },
  ],
};

export default chapter;
