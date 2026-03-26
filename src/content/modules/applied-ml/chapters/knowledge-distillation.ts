import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "knowledge-distillation",
  title: "Knowledge Distillation",
  description: "Training smaller models to mimic larger ones.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Knowledge distillation transfers performance from a large teacher model to a smaller student model.",
          "The student is trained on soft targets that contain richer information than hard labels.",
          "Distillation is a key technique for deploying high-quality models on limited hardware.",
        ],
        keyIdeas: [
          "Soft targets encode class similarity information",
          "Temperature controls the smoothness of soft targets",
          "Student can match teacher accuracy with fewer parameters",
          "Distillation can combine teacher and ground truth labels",
          "Intermediate feature matching can improve transfer",
          "Self-distillation can improve a model without a larger teacher",
        ],
        equations: [
          "\\[ p_i = \\frac{\\exp(z_i / T)}{\\sum_j \\exp(z_j / T)} \\]",
          "\\[ \\mathcal{L} = (1-\\alpha) \\; \\mathcal{L}_{CE}(y, \\hat{y}) + \\alpha T^2 \\; D_{KL}(p^T \\| p^S) \\]",
          "\\[ D_{KL}(p\\|q) = \\sum_i p_i \\log \\frac{p_i}{q_i} \\]",
        ],
        references: [
          "Hinton et al. (2015) - Distilling the Knowledge in a Neural Network",
          "Gou et al. (2021) - Knowledge Distillation: A Survey",
          "Romero et al. (2015) - FitNets",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Distillation can be applied to logits, intermediate features, attention maps, or representations.",
          "Multi-teacher and ensemble distillation can yield stronger students.",
          "Sequence models often use distillation with data augmentation and label smoothing.",
        ],
        keyIdeas: [
          "Feature matching aligns student and teacher representations",
          "Attention transfer improves spatial focus",
          "Online distillation trains teacher and student together",
          "Task-specific distillation improves downstream performance",
          "Distillation helps reduce inference cost",
          "Data-free distillation uses synthetic inputs",
        ],
        equations: [
          "\\[ \\mathcal{L}_{feat} = \\| \\phi_S(x) - \\phi_T(x) \\|_2^2 \\]",
          "\\[ \\mathcal{L}_{attn} = \\| A_S - A_T \\|_2^2 \\]",
          "\\[ \\mathcal{L} = \\mathcal{L}_{task} + \\lambda \\mathcal{L}_{distill} \\]",
        ],
        references: [
          "Zagoruyko and Komodakis (2017) - Attention Transfer",
          "Furlanello et al. (2018) - Born-Again Neural Networks",
          "Xu et al. (2020) - Knowledge Distillation with Augmented Data",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Distillation can be framed as minimizing a divergence between teacher and student distributions under capacity constraints.",
          "It interacts with calibration and uncertainty; students may be better calibrated than teachers.",
          "In modern LLMs, distillation often uses instruction data and chain-of-thought distillation under careful constraints.",
        ],
        keyIdeas: [
          "Distillation is a form of model compression with regularization",
          "Temperature and loss weighting strongly affect performance",
          "Teacher bias can be inherited by the student",
          "Distillation can be combined with quantization and pruning",
          "Calibration-aware distillation improves confidence estimates",
          "Privacy concerns arise if teacher outputs expose data",
        ],
        equations: [
          "\\[ \\min_{\\theta_S} \\mathbb{E}_x [ D( p_T(\\cdot|x), p_S(\\cdot|x) ) ] \\]",
          "\\[ \\text{ECE} = \\sum_{m=1}^M \\frac{|B_m|}{n} \\left| \\text{acc}(B_m) - \\text{conf}(B_m) \\right| \\]",
          "\\[ \\text{CR} = \\frac{\\text{params}_T}{\\text{params}_S} \\]",
        ],
        references: [
          "Menon et al. (2020) - On the Calibration of Modern Neural Networks",
          "Jiao et al. (2020) - TinyBERT",
          "Li et al. (2022) - Distillation in LLMs (survey)",
        ],
      },
    },
  ],
};

export default chapter;
