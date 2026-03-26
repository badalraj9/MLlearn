import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "gradient-accumulation",
  title: "Gradient Accumulation",
  description: "Simulating larger batch sizes with limited memory.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Gradient accumulation simulates larger batch sizes by processing data in small chunks (micro-batches) and accumulating gradients before applying the optimizer update.",
          "If you want a batch size of 1024 but can only fit 64 in GPU memory, you can accumulate 16 micro-batches. The gradients are summed (or averaged) before the weight update.",
          "This allows training with effectively unlimited batch sizes without requiring more GPU memory. The final result is mathematically equivalent to training with the full batch."
        ],
        keyIdeas: [
          "Micro-batches: split large batch into smaller chunks",
          "Accumulate gradients: sum over multiple forward/backward passes",
          "Effective batch size: micro_batch × accumulation_steps",
          "Memory efficient: don't need large GPU for large batches"
        ],
        equations: [
          "\\[ g_{accum} = \\sum_{i=1}^{K} g_i \\quad (K = \\text{accumulation steps}) \\]",
          "\\[ B_{eff} = B_{micro} \\times K \\]",
          "\\[ \\theta_{t+1} = \\theta_t - \\eta \\cdot g_{accum} / K \\quad \\text{(average) or } \\cdot g_{accum} \\text{ (sum)} \\]"
        ],
        references: [
          "Mikami et al. (2019) - A Deeper Understanding",
          "PyTorch Gradient Accumulation Tutorial"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * (1 - exp(-b * x))",
        sliders: [
          { id: "a", label: "Max loss", min: 0.5, max: 2, step: 0.1, default: 1 },
          { id: "b", label: "Rate", min: 0.1, max: 1, step: 0.1, default: 0.3 }
        ],
        xRange: [0, 20],
        yRange: [0, 2]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Gradient accumulation is often combined with mixed precision training for maximum efficiency. The FP16 gradients are accumulated in FP32 to avoid precision loss.",
          "In distributed training, each GPU performs gradient accumulation locally, then synchronizes after the accumulation period. This maintains the same effective batch size while enabling larger global batch sizes.",
          "The key hyperparameter is the accumulation steps. Too few steps give noisy gradients; too many slow down training. The optimal depends on batch size, learning rate, and model."
        ],
        keyIdeas: [
          "With mixed precision: accumulate in FP32, update in FP16",
          "Distributed: local accumulation then synchronize",
          "Noise/accuracy tradeoff: larger effective batch = less noise",
          "Learning rate scaling: increase LR with larger effective batch"
        ],
        equations: [
          "\\[ \\text{LR scaling: } \\eta_{eff} = \\eta_{base} \\times \\sqrt{B_{eff}/B_{base}} \\]",
          "\\[ \\text{Noise reduction: } \\sigma_{eff} = \\sigma_{micro} / \\sqrt{K} \\]",
          "\\[ \\text{Steps per epoch: } T_{epoch} = \\frac{N}{B_{eff}} \\]"
        ],
        references: [
          "You et al. (2017) - Large Batch Training",
          "Goyal et al. (2018) - Accurate, Large Minibatch SGD"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Dynamic gradient accumulation adjusts accumulation steps based on training progress. More accumulation early when gradients are noisy, less later for efficiency.",
          "Virtual batch normalization computes batch norm statistics over the effective batch rather than individual micro-batches. This gives better statistics at the cost of extra computation.",
          "Some research shows that accumulated gradients have slightly different properties than true large-batch gradients, affecting generalization. This is the 'sharp minima' concern."
        ],
        keyIdeas: [
          "Dynamic schedule: adapt accumulation steps during training",
          "Virtual batch norm: stats from effective batch",
          "Sharp vs flat minima: large batch may find sharper solutions",
          "Stochastic weight averaging: smooth out gradient noise"
        ],
        equations: [
          "\\[ K(t) = K_{min} + (K_{max} - K_{min}) \\cdot \\exp(-t/\\tau) \\]",
          "\\[ \\mu_{VB} = \\frac{1}{K} \\sum_{i=1}^{K} \\mu_i, \\quad \\sigma_{VB}^2 = \\frac{1}{K} \\sum_{i=1}^{K} (\\sigma_i^2 + (\\mu_i - \\mu_{VB})^2) \\]",
          "\\[ \\text{SWA: } \\bar{\\theta} = \\frac{1}{T} \\sum_{t=t_0}^{T} \\theta_t \\]"
        ],
        references: [
          "Izmailov et al. (2018) - Averaging Weights Leads to Wider Minima",
          "Goyal et al. (2018) - Accurate, Large Minibatch SGD"
        ]
      },
      playground: {
        type: "equation",
        equation: "1 - exp(-0.2*x) + 0.05*sin(x)",
        xRange: [0, 30],
        yRange: [0, 1.5]
      }
    }
  ]
};

export default chapter;
