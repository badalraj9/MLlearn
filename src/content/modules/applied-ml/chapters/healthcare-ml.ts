import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "healthcare-ml",
  title: "Healthcare ML",
  description: "Machine learning for medical imaging and diagnostics.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Healthcare ML applies predictive models to clinical data, medical images, and patient histories. The stakes are higher than in many consumer applications because errors can affect diagnosis, treatment, and resource allocation.",
          "The central lesson is that accuracy alone is not enough. A clinically useful model must be calibrated, interpretable enough for review, and robust across hospitals, devices, and patient populations.",
          "Another key difference is label quality. Medical labels may come from noisy billing codes, delayed outcomes, or disagreement among experts, so the dataset itself often encodes uncertainty."
        ],
        keyIdeas: [
          "Clinical utility depends on sensitivity, specificity, calibration, and workflow fit.",
          "Dataset shift is common across hospitals, scanners, and patient demographics.",
          "False negatives and false positives can have very different clinical costs.",
          "Human oversight is usually part of the system rather than something to remove."
        ],
        equations: [
          "\\[ \\text{Sensitivity} = \\frac{TP}{TP + FN} \\]",
          "\\[ \\text{Specificity} = \\frac{TN}{TN + FP} \\]",
          "\\[ \\text{PPV} = \\frac{TP}{TP + FP} \\]"
        ],
        references: [
          "Rajkomar, Dean, Kohane (2019) - Machine Learning in Medicine",
          "Saria & Butte (2018) - Better medicine through machine learning"
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Applied healthcare ML usually starts with a narrow prediction task: readmission risk, sepsis alerts, image triage, or decision support for radiology and pathology. Narrow scope makes validation and clinical review tractable.",
          "Evaluation should mimic the deployment setting. If the model will trigger an alert at triage, then labels, timestamps, and performance metrics must all be computed using only information available at that moment.",
          "Clinical pipelines also need strong handling of missingness, censoring, and protected health information. Data cleaning is not just a preprocessing step; it shapes the validity of the project."
        ],
        keyIdeas: [
          "AUROC can hide poor precision in rare-event settings, so PR curves often matter more.",
          "Time-aware labeling is critical for early warning tasks such as deterioration prediction.",
          "Subgroup evaluation is necessary to uncover performance gaps across populations.",
          "Prospective silent trials are often used before live deployment."
        ],
        equations: [
          "\\[ \\text{Precision} = \\frac{TP}{TP + FP} \\]",
          "\\[ \\text{Recall} = \\frac{TP}{TP + FN} \\]",
          "\\[ \\text{Brier score} = \\frac{1}{N} \\sum_{i=1}^{N} (p_i - y_i)^2 \\]"
        ],
        references: [
          "Esteva et al. (2017) - Dermatologist-level classification of skin cancer with deep neural networks",
          "Tomasev et al. (2019) - A clinically applicable approach to continuous prediction of future acute kidney injury"
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced healthcare ML moves beyond prediction to causal and operational questions: which treatment should be recommended, when should a patient be escalated, and how can a model support clinicians without creating automation bias.",
          "Multimodal systems combine notes, labs, time series, and imaging. These can be powerful, but they increase missing-data complexity and make validation harder because each modality may drift differently over time.",
          "The long-term challenge is trustworthy deployment. Regulatory review, post-market surveillance, fairness analysis, and continuous recalibration are part of the model lifecycle, not paperwork around it."
        ],
        keyIdeas: [
          "Decision-support models should be evaluated for downstream intervention effects, not just prediction quality.",
          "Counterfactual reasoning and causal inference matter when treatment policies change outcomes.",
          "Federated and privacy-preserving learning can help when data sharing is restricted.",
          "Monitoring must track calibration drift, subgroup performance, and alert fatigue."
        ],
        equations: [
          "\\[ \\mathbb{E}[Y \\mid do(T = 1)] - \\mathbb{E}[Y \\mid do(T = 0)] \\]",
          "\\[ \\text{ECE} = \\sum_{m=1}^{M} \\frac{|B_m|}{N} \\left| \\mathrm{acc}(B_m) - \\mathrm{conf}(B_m) \\right| \\]",
          "\\[ p(y \\mid x_{\\text{labs}}, x_{\\text{notes}}, x_{\\text{image}}) \\]"
        ],
        references: [
          "Obermeyer et al. (2019) - Dissecting racial bias in an algorithm used to manage the health of populations",
          "Wiens et al. (2019) - Do no harm: a roadmap for responsible machine learning for health care"
        ],
      },
    },
  ],
};

export default chapter;
