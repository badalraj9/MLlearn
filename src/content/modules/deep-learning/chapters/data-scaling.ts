import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "data-scaling",
  title: "Data Scaling",
  description: "How performance scales with dataset size.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Data scaling shows that more data generally leads to better performance, following predictable power laws. However, quality matters as much as quantity.",
          "The key insight is that there's often more value in cleaning and curating existing data than in blindly collecting more. Data quality and diversity can matter more than raw size.",
          "Data scaling interacts with model scaling - bigger models can leverage more data efficiently, while smaller models may plateau even with massive datasets."
        ],
        keyIdeas: [
          "Power law: loss decreases as data increases",
          "Quality > quantity: clean, diverse data beats massive noisy data",
          "Model/data balance: both need to scale together",
          "Diminishing returns: eventually more data helps less"
        ],
        equations: [
          "\\[ L(D) \\propto D^{-\\alpha_D} \\]",
          "\\[ \\text{Doubling data: } \\Delta L = L(D) - L(2D) = L(D)(1 - 2^{-\\alpha_D}) \\]",
          "\\[ \\text{For α ≈ 0.2: doubling data → 13% improvement} \\]"
        ],
        references: [
          "Bank & van de Weijer (2021) - On the dataset size scaling",
          "Sun et al. (2017) - Revisiting Unreasonable Effectiveness of Data"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * x^(-b)",
        sliders: [
          { id: "a", label: "Scale", min: 1, max: 5, step: 0.5, default: 2 },
          { id: "b", label: "Exponent", min: 0.1, max: 0.5, step: 0.05, default: 0.2 }
        ],
        xRange: [1, 50],
        yRange: [0, 3]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Data efficiency techniques help get more from less data: data augmentation, self-supervised pretraining, and transfer learning from large pretrained models.",
          "The key to efficient use is finding the right data distribution. Quality over quantity - a smaller, well-chosen dataset often outperforms a massive, noisy one.",
          "Active learning selects the most informative examples to label, reducing annotation cost while maintaining performance."
        ],
        keyIdeas: [
          "Data augmentation: create variations of existing data",
          "Self-supervised: learn from unlabeled data",
          "Transfer learning: adapt pretrained models",
          "Active learning: select most informative samples"
        ],
        equations: [
          "\\[ \\text{Augmentation: } x_{aug} = T(x) \\quad T \\sim \\mathcal{T} \\]",
          "\\[ \\text{Info gain: } I(y|x) = H(y) - H(y|x) \\]",
          "\\[ \\text{Sample efficiency: } \\text{Data}_{eff} = \\text{Data} \\times \\text{Augmentation\\_factor} \\]"
        ],
        references: [
          "Shorten & Khoshgoftaar (2019) - Survey on Image Data Augmentation",
          "Settles (2009) - Active Learning Literature Survey"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Data curriculum learning orders training examples by difficulty. Easy examples first help the model establish good parameters, then harder examples refine it.",
          "Dataset distillation compresses a large dataset into a small set of synthetic examples that train a model nearly as well. This is useful for efficient experimentation.",
          "Scaling laws predict optimal data allocation: as model size increases, the optimal data-to-parameter ratio increases too. The Chinchilla result emphasizes data scaling."
        ],
        keyIdeas: [
          "Curriculum learning: easy → hard progression",
          "Dataset distillation: compress dataset to few synthetic samples",
          "Data weighting: not all samples contribute equally",
          "Optimal data ratio: ~20 tokens per parameter"
        ],
        equations: [
          "\\[ \\text{Difficulty score: } d(x) = \\mathbb{E}[|\\nabla_\\theta \\mathcal{L}(x, \\theta)|] \\]",
          "\\[ \\text{Distillation: } \\min_\\theta \\sum_{x \\in D_{small}} \\mathcal{L}(\\theta, x) \\approx \\min_\\theta \\sum_{x \\in D_{large}} \\mathcal{L}(\\theta, x) \\]",
          "\\[ \\text{Data weighting: } w_i = f(d(x_i), t) \\text{ where } t = \\text{training step} \\]"
        ],
        references: [
          "Hacohen & Weinshall (2019) - On the Power of Curriculum Learning",
          "Wang et al. (2021) - Dataset Distillation"
        ]
      },
      playground: {
        type: "equation",
        equation: "2 * x^(-0.25) + 0.3",
        xRange: [1, 50],
        yRange: [0, 3]
      }
    }
  ]
};

export default chapter;
