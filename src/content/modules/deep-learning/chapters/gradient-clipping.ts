import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "gradient-clipping",
  title: "Gradient Clipping",
  description: "Preventing gradient explosion during training.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Gradient clipping prevents gradients from becoming too large during training, which can cause numerical instability and divergent training behavior.",
          "Think of it like a safety valve on a pressure cooker - when pressure (gradients) gets too high, it releases some to prevent explosion (NaN values).",
          "The two main methods are: gradient norm clipping (clip the overall gradient vector) and gradient value clipping (clip individual gradient elements)."
        ],
        keyIdeas: [
          "Norm clipping: scale down if gradient norm exceeds threshold",
          "Value clipping: cap individual gradient values",
          "Prevents NaN from exploding gradients",
          "Common threshold: 1.0 for RNNs, 5.0 for CNNs"
        ],
        equations: [
          "\\[ \\text{Norm clip: } g \\leftarrow \\begin{cases} g \\cdot \\frac{\\threshold}{\\|g\\|} & \\text{if } \\|g\\| > \\threshold \\\\ g & \\text{otherwise} \\end{cases} \\]",
          "\\[ \\text{Value clip: } g_i \\leftarrow \\text{clip}(g_i, -c, c) \\]"
        ],
        references: [
          "Pascanu et al. (2013) - On the difficulty of training RNNs",
          "Goodfellow et al. - Deep Learning, Ch. 8"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "min(a, x)",
        sliders: [
          { id: "a", label: "Clip threshold", min: 0.5, max: 3, step: 0.1, default: 1 }
        ],
        xRange: [0, 5],
        yRange: [0, 3]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Gradient norm clipping is the most common approach. It preserves gradient direction while scaling magnitude, which is more principled than value clipping.",
          "Adaptive clipping adjusts the threshold based on gradient statistics. Gradient Centralization subtracts the mean before computing norm, improving conditioning.",
          "In practice, clipping is often combined with other techniques like gradient accumulation when training with large effective batch sizes."
        ],
        keyIdeas: [
          "Norm clipping: preserves direction, most common",
          "Value clipping: simple but can distort gradient shape",
          "Adaptive threshold: adjust based on training dynamics",
          "Clipping + accumulation: stable large batch training"
        ],
        equations: [
          "\\[ \\text{Adaptive: } \\threshold_t = \\text{EMA}(\\|g\\|, \\threshold_{t-1}) \\]",
          "\\[ \\text{Gradient centralization: } g \\leftarrow g - \\mu(g) \\]",
          "\\[ \\text{EMA gradient: } m_t = \\beta m_{t-1} + (1-\\beta) \\|g_t\\| \\]"
        ],
        references: [
          "Yong et al. (2020) - Gradient Centralization",
          "Chen et al. (2018) - Gradient Clipping for RNNs"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Gradient clipping can be viewed as a form of projected gradient descent, constraining the optimization to a norm ball. This has theoretical connections to adversarial robustness.",
          "Recent research shows that gradient clipping interacts with adaptive optimizers (Adam, etc.) in complex ways. The effective learning rate can become extremely small for some parameters.",
          "Norm-free optimizers avoid clipping entirely by design. They use normalization at the gradient computation level to ensure bounded updates without explicit clipping."
        ],
        keyIdeas: [
          "Projected gradient descent interpretation",
          "Interaction with adaptive optimizers: some params get tiny effective LR",
          "Norm-free optimization: intrinsic gradient normalization",
          "Gradient noise: clipping adds stochasticity that can help exploration"
        ],
        equations: [
          "\\[ \\text{Projected: } \\min_{g: \\|g\\| \\leq c} \\|g - \\nabla f\\|^2 \\]",
          "\\[ \\text{Norm-free: } \\theta_{t+1} = \\theta_t - \\alpha \\frac{g_t}{\\|g_t\\| + \\epsilon} \\]",
          "\\[ \\text{Effective LR with Adam: } \\alpha_t \\approx \\frac{\\alpha}{\\sqrt{v_t} + \\epsilon} \\cdot \\text{clip}(\\cdot) \\]"
        ],
        references: [
          "Zhang et al. (2020) - Why Gradient Clipping",
          "Liu et al. (2020) - On the Variance of Adam"
        ]
      },
      playground: {
        type: "equation",
        equation: "min(1, x) * exp(-x/5)",
        xRange: [0, 10],
        yRange: [0, 1]
      }
    }
  ]
};

export default chapter;
