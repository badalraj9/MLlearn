import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "label-smoothing",
  title: "Label Smoothing",
  description: "Softening hard labels to improve generalization.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Label smoothing converts hard one-hot labels into soft distributions by mixing them with a uniform distribution over all classes. This prevents the model from becoming overconfident.",
          "Instead of learning that an image is exactly 100% 'cat' and 0% everything else, the model learns something like 95% 'cat', 2% 'dog', 1.5% 'car', etc. This better reflects real-world uncertainty.",
          "It acts as a regularizer that improves calibration - predicted probabilities better match actual frequencies. This is especially important for ensemble methods and knowledge distillation."
        ],
        keyIdeas: [
          "Soft labels: y' = (1-ε)y + ε/K where K is number of classes",
          "Prevents overconfidence in predictions",
          "Improves calibration of probabilities",
          "Typical ε = 0.1 (10% smoothing)"
        ],
        equations: [
          "\\[ y_i' = (1 - \\epsilon) y_i + \\frac{\\epsilon}{K} \\]",
          "\\[ \\text{If class k: } y_k' = 1 - \\epsilon + \\frac{\\epsilon}{K} \\]",
          "\\[ \\text{Other classes: } y_j' = \\frac{\\epsilon}{K} \\]",
          "\\[ K = \\text{number of classes} \\]"
        ],
        references: [
          "Szegedy et al. (2016) - Rethinking the Inception Architecture",
          "Pereyra et al. (2017) - Regularizing Neural Networks"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "(1-a) * exp(-(x-b)^2/2) + a / 3",
        sliders: [
          { id: "a", label: "Smoothing ε", min: 0, max: 0.5, step: 0.05, default: 0.1 },
          { id: "b", label: "True class", min: -1, max: 1, step: 1, default: 0 }
        ],
        xRange: [0, 2],
        yRange: [0, 1.5]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Label smoothing helps with knowledge distillation - the teacher model produces soft labels that the student learns from. With smoothing, the teacher assigns non-zero probability to incorrect classes.",
          "It improves generalization by preventing the model from memorizing the training data too precisely. The model learns that multiple patterns can indicate each class.",
          "In practice, label smoothing is often combined with other techniques: data augmentation, dropout, weight decay. The combination provides more robust regularization."
        ],
        keyIdeas: [
          "Knowledge distillation: soft labels from teacher",
          "Prevents overfitting to hard labels",
          "Calibration improvement: predicted probabilities more accurate",
          "Combines well with other regularization"
        ],
        equations: [
          "\\[ \\mathcal{L}_{CE}(y', p) = -\\sum_k y_k' \\log p_k \\]",
          "\\[ \\mathcal{L}_{KD} = \\alpha T^2 \\mathcal{L}_{CE}(y_{soft}, p^T) + (1-\\alpha) \\mathcal{L}_{CE}(y, p) \\]",
          "\\[ p_i^T = \\frac{\\exp(z_i/T)}{\\sum_j \\exp(z_j/T)} \\]"
        ],
        references: [
          "Hinton et al. (2015) - Distilling the Knowledge in a Neural Network",
          "Müller et et al. (2019) - When does label smoothing help?"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Confidence penalty is a related technique that adds -β log(p_max) to the loss, directly penalizing high confidence rather than using a fixed smoothing distribution.",
          "Label smoothing interacts with the learning rate - higher LR often needs more smoothing. The relationship is non-linear and depends on model architecture.",
          "Recent work shows that very high smoothing can actually hurt performance. There's an optimal smoothing amount that depends on the noise level in labels."
        ],
        keyIdeas: [
          "Confidence penalty: penalize overconfidence directly",
          "Optimal ε depends on noise level in data",
          "Interaction with learning rate schedules",
          "Knowledgable: knowing what not to learn"
        ],
        equations: [
          "\\[ \\text{Conf penalty: } \\mathcal{L}_{CP} = \\mathcal{L}_{CE} - \\beta \\mathbb{E}[\\log p_{max}] \\]",
          "\\[ \\text{Optimal ε*: } \\epsilon^* \\approx \\frac{\\text{noise rate}}{1 - \\text{noise rate}} \\]",
          "\\[ \\text{Learn ε: } \\epsilon \\text{ can be made a learnable parameter} \\]"
        ],
        references: [
          "Pereyra et al. (2017) - Regularizing with Label Smoothing",
          "Lukasik et al. (2020) - Label Smoothing and Distillation"
        ]
      },
      playground: {
        type: "equation",
        equation: "0.9*exp(-(x)^2/0.5) + 0.1/3",
        xRange: [-2, 2],
        yRange: [0, 1.5]
      }
    }
  ]
};

export default chapter;
