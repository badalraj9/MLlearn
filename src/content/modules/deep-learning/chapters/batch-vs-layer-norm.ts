import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "batch-vs-layer-norm",
  title: "Batch vs Layer Norm",
  description: "Normalization techniques and their trade-offs.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Normalization techniques stabilize training by making the inputs to each layer have consistent distributions. This prevents the 'covariate shift' problem where layer inputs change dramatically during training.",
          "Think of normalization like standardizing test scores - it puts everything on the same scale so comparisons are meaningful. Neural networks benefit from having inputs at each layer in a reasonable range.",
          "Batch Normalization normalizes across the batch dimension, using batch statistics (mean and variance). Layer Normalization normalizes across features for each sample independently."
        ],
        keyIdeas: [
          "BatchNorm: normalizes over batch dimension, uses running statistics at inference",
          "LayerNorm: normalizes over feature dimension, no running statistics needed",
          "Both make networks less sensitive to initialization and learning rates",
          "Normalization enables higher learning rates and faster convergence"
        ],
        equations: [
          "\\[ \\text{BatchNorm: } \\hat{x} = \\frac{x - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}} \\]",
          "\\[ \\mu_B = \\frac{1}{m} \\sum_{i=1}^{m} x_i, \\quad \\sigma_B^2 = \\frac{1}{m} \\sum_{i=1}^{m} (x_i - \\mu_B)^2 \\]",
          "\\[ \\text{LayerNorm: } \\hat{x} = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}}, \\quad \\mu = \\frac{1}{d} \\sum_{i=1}^{d} x_i \\]"
        ],
        references: [
          "Ioffe & Szegedy (2015) - Batch Normalization",
          "Ba et al. (2016) - Layer Normalization"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * exp(-(x - b)^2 / (2*c^2))",
        sliders: [
          { id: "a", label: "Peak height", min: 0.1, max: 2, step: 0.1, default: 1 },
          { id: "b", label: "Center", min: -3, max: 3, step: 0.1, default: 0 },
          { id: "c", label: "Width", min: 0.1, max: 2, step: 0.1, default: 1 }
        ],
        xRange: [-5, 5],
        yRange: [0, 2]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "BatchNorm works by normalizing activations within each mini-batch, then applying learnable scale and shift parameters (γ and β). During training, it uses batch statistics; at inference, it uses running statistics computed during training.",
          "LayerNorm normalizes across features for each sample independently, making it suitable for RNNs and variable-length sequences. It doesn't depend on batch size and is more stable for small batches.",
          "InstanceNorm normalizes each channel separately, popular in style transfer. GroupNorm divides channels into groups, trading off between LayerNorm and InstanceNorm with better small-batch performance."
        ],
        keyIdeas: [
          "BatchNorm: dependent on batch size, problematic for small batches and distributed training",
          "LayerNorm: independent of batch size, good for RNNs and Transformers",
          "InstanceNorm: per-channel normalization, popular in image generation",
          "GroupNorm: group-wise normalization, good alternative when batch size is limited"
        ],
        equations: [
          "\\[ y = \\gamma \\hat{x} + \\beta \\quad \\text{(learnable scale and shift)} \\]",
          "\\[ \\text{InstanceNorm: } \\hat{x}_{nc} = \\frac{x_{nc} - \\mu_{nc}}{\\sqrt{\\sigma_{nc}^2 + \\epsilon}} \\]",
          "\\[ \\text{GroupNorm: } \\hat{x}_{n(c/g)} = \\frac{x_{n(c/g)} - \\mu_{n(c/g)}}{\\sqrt{\\sigma_{n(c/g)}^2 + \\epsilon}} \\]"
        ],
        references: [
          "Wu & He (2018) - Group Normalization",
          "Ulyanov et al. (2016) - Instance Normalization"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The exact mechanism of BatchNorm's effectiveness is still debated. Theories include reducing internal covariate shift, making the optimization landscape smoother, providing stochastic regularization, and enabling batch-time tradeoffs.",
          "Research shows BatchNorm has an implicit regularization effect - it introduces noise through batch statistics that can prevent overfitting. This is why removing Dropout when using BatchNorm often works well.",
          "Modern architectures often prefer LayerNorm or GroupNorm due to their independence from batch size and better behavior in distributed training settings. Transformer architectures universally use LayerNorm."
        ],
        keyIdeas: [
          "BatchNorm implicit regularization: noise from batch statistics acts as regularizer",
          "Prediction stability: BatchNorm reduces sensitivity to parameter changes",
          "BatchNorm in distributed training: synchronization issues across GPUs",
          "Pre-norm vs post-norm: LayerNorm placement affects Transformer training"
        ],
        equations: [
          "\\[ \\text{Sync BatchNorm: } \\mu = \\frac{1}{N \\cdot B} \\sum_{i=1}^{N} \\sum_{j=1}^{B} x_{ij} \\]",
          "\\[ \\text{Pre-norm: } x_{l+1} = x_l + F(\\text{LayerNorm}(x_l)) \\]",
          "\\[ \\text{Post-norm: } x_{l+1} = \\text{LayerNorm}(x_l + F(x_l)) \\]"
        ],
        references: [
          "Santurkar et al. (2018) - How does batch normalization help optimization?",
          "Xiong et al. (2020) - On Layer Normalization in Transformers"
        ]
      },
      playground: {
        type: "equation",
        equation: "exp(-x^2/8) * cos(x * 2)",
        xRange: [-5, 5],
        yRange: [-1, 1]
      }
    }
  ]
};

export default chapter;
