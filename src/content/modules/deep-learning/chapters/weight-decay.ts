import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "weight-decay",
  title: "Weight Decay",
  description: "L2 regularization through parameter penalization.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Weight decay adds a penalty term to the loss that discourages large weights. This regularization helps prevent overfitting by keeping the model simpler.",
          "Mathematically, weight decay is equivalent to L2 regularization - adding λ||w||² to the loss. This encourages all weights to be small rather than just some.",
          "The difference from L1 regularization: L2 shrinks weights toward zero but never exactly to zero, while L1 can set some weights to exactly zero (feature selection)."
        ],
        keyIdeas: [
          "L2 regularization: add λ∑wᵢ² to loss",
          "Shrinks weights toward zero but not exactly to zero",
          "Improves generalization, prevents overfitting",
          "Typical values: λ = 0.01 to 0.0001"
        ],
        equations: [
          "\\[ \\mathcal{L}_{new} = \\mathcal{L}_{original} + \\frac{\\lambda}{2} \\|w\\|^2 \\]",
          "\\[ \\text{Gradient: } \\frac{\\partial \\mathcal{L}_{new}}{\\partial w} = \\frac{\\partial \\mathcal{L}_{original}}{\\partial w} + \\lambda w \\]",
          "\\[ w_{new} = w_{old} - \\eta (\\nabla \\mathcal{L}_{original} + \\lambda w_{old}) = (1 - \\eta\\lambda)w_{old} - \\eta\\nabla \\mathcal{L}_{original} \\]"
        ],
        references: [
          "Goodfellow et al. - Deep Learning, Ch. 7",
          "Krogh & Hertz (1992) - A Simple Weight Decay"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * exp(-b * x)",
        sliders: [
          { id: "a", label: "Initial", min: 1, max: 5, step: 0.5, default: 3 },
          { id: "b", label: "Decay rate", min: 0.01, max: 0.2, step: 0.01, default: 0.1 }
        ],
        xRange: [0, 50],
        yRange: [0, 5]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "AdamW (Weight Decay in Adam) decouples weight decay from the adaptive learning rate calculation. In Adam, weight decay must be applied separately from gradient-based updates for proper L2 regularization.",
          "The original Adam implementation applies L2 regularization inside the optimizer state computation, which scales with the adaptive learning rate. AdamW fixes this by applying decay after the gradient update.",
          "Decay can be applied to all parameters or selectively (no decay for biases and normalization layer weights). Layer-wise decay applies different decay rates to different layers."
        ],
        keyIdeas: [
          "AdamW: separate weight decay from gradient update",
          "No decay for biases and normalization parameters",
          "Layer-wise decay: lower decay for embeddings",
          "Decay scheduler: adjust during training"
        ],
        equations: [
          "\\[ \\text{AdamW: } \\theta_t = (1 - \\eta \\lambda) \\theta_{t-1} - \\eta \\cdot \\text{Adam}(\\nabla \\mathcal{L}) \\]",
          "\\[ \\text{Original Adam: } \\theta_t = \\theta_{t-1} - \\eta \\cdot \\text{Adam}(\\nabla \\mathcal{L} + \\lambda \\theta_{t-1}) \\]",
          "\\[ \\text{Layer decay: } \\lambda_l = \\lambda_{base} \\cdot 2^{-l} \\]"
        ],
        references: [
          "Loshchilov & Hutter (2019) - Decoupled Weight Decay Regularization",
          "Brock et al. (2021) - High-Performance Large-Scale Image Recognition"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Sharpness-aware minimization (SAM) can be viewed as an adaptive form of regularization that explicitly seeks flat minima. This often correlates with better generalization than simple weight decay.",
          "Decay interacts with learning rate: with large LR, implicit regularization dominates; with small LR, explicit decay dominates. The ratio η/λ determines which effect dominates.",
          "Recent research explores weight decay schedules - reducing decay as training progresses. This allows early exploration (low decay) followed by fine-tuning (higher decay)."
        ],
        keyIdeas: [
          "SAM: explicitly optimize for flat minima",
          "η/λ ratio determines implicit vs explicit regularization",
          "Decay schedule: reduce decay during training",
          "Weight averaging: SWA, exponential moving averages"
        ],
        equations: [
          "\\[ \\text{SAM: } \\theta_{t+1} = \\theta_t - \\eta \\nabla_{\\theta} \\max_{\\|\\epsilon\\| \\leq \\rho} \\mathcal{L}(\\theta + \\epsilon) \\]",
          "\\[ \\text{Effective decay: } \\lambda_{eff} = \\frac{\\lambda}{\\eta_{adapt}} \\]",
          "\\[ \\text{SWA: } \\bar{\\theta} = \\frac{1}{T} \\sum_{t=T_0}^{T} \\theta_t \\]"
        ],
        references: [
          "Foret et al. (2021) - Sharpness-Aware Minimization",
          "Izmailov et al. (2018) - Averaging Weights Leads to Wider Minima"
        ]
      },
      playground: {
        type: "equation",
        equation: "exp(-0.05*x) * cos(x/3)",
        xRange: [0, 50],
        yRange: [-1, 1]
      }
    }
  ]
};

export default chapter;
