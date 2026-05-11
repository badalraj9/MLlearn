import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "warmup-strategies",
  title: "Warmup Strategies",
  description: "Gradual learning rate increase for stable early training.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Warmup gradually increases the learning rate from a small value to the target learning rate at the beginning of training. This stabilizes training by preventing large gradient updates on an untrained model.",
          "Early in training, model parameters are random and gradients are noisy. A large learning rate could cause unstable updates that derail learning. Warmup provides a gentle ramp-up.",
          "After warmup, the learning rate typically follows a decay schedule (cosine, step, etc.). This combination of warmup + decay is standard practice."
        ],
        keyIdeas: [
          "Linear warmup: gradual increase from 0 to target LR",
          "Prevents large updates on randomly initialized network",
          "Stabilizes training especially for large models",
          "Typically 500-2000 warmup steps for transformers"
        ],
        equations: [
          "\\[ \\eta_t = \\eta_{max} \\cdot \\frac{t}{T_{warmup}} \\quad \\text{for } t < T_{warmup} \\]",
          "\\[ \\text{After warmup: } \\eta_t = \\text{schedule}(t - T_{warmup}) \\]"
        ],
        references: [
          "Vaswani et al. (2017) - Attention Is All You Need",
          "Goyal et al. (2018) - Accurate, Large Minibatch SGD"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * x / b",
        sliders: [
          { id: "a", label: "Target LR", min: 0.1, max: 1, step: 0.1, default: 1 },
          { id: "b", label: "Warmup steps", min: 5, max: 20, step: 1, default: 10 }
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
          "Constant warmup stays at the warmup LR for a few steps before jumping to the target, then decays. This is simpler but can cause a sudden jump in gradient magnitude.",
          "Exponential warmup provides smoother transitions but is less commonly used. Some practitioners use cosine warmup - continuing the cosine curve through the warmup period.",
          "The optimal warmup length depends on model size and batch size. Larger models and larger batches typically need longer warmup."
        ],
        keyIdeas: [
          "Constant: linear to max, then jump to target",
          "Exponential: smoother approach to target",
          "Hyperparameter: typical 6-10% of training for warmup",
          "Gradual unfreezing: apply warmup concept to layers"
        ],
        equations: [
          "\\[ \\text{Exp: } \\eta_t = \\eta_{max} \\cdot e^{-t/\\tau} \\]",
          "\\[ \\text{Cosine warmup: } \\eta_t = \\eta_{max} \\cdot \\frac{1 + \\cos(\\frac{t}{T_{warmup}}\\pi)}{2} \\]",
          "\\[ \\text{Hyperparameter selection: } T_{warm} \\approx 0.06 \\times T_{total} \\]"
        ],
        references: [
          "You et al. (2017) - Large Batch Training",
          "Popel & Bojar (2018) - Training Tips for Transformer"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Layer-wise learning rate decay applies different learning rates to different layers. Early layers (closer to input) get smaller LR than later layers. This mimics the effect of warmup being applied gradually to deeper layers.",
          "Rescaled warmup accounts for gradient scale differences across layers. Deeper layers often need less warmup because their gradients are naturally larger.",
          "Zeroing warmup steps entirely can work in some cases with proper initialization and normalization layers. This is more of a theoretical observation than practical recommendation."
        ],
        keyIdeas: [
          "Layer-wise LR decay: lower LR for earlier layers",
          "Rescaled warmup: adjust per-layer based on gradient statistics",
          "No warmup possible with proper initialization + normalization",
          "Inverse square root schedule: LR ∝ 1/√t for transformers"
        ],
        equations: [
          "\\[ \\text{Layer decay: } \\eta_l = \\eta_{base} \\cdot \\alpha^{L-l} \\]",
          "\\[ \\text{Inverse square root: } \\eta_t = \\frac{d_{model}^{-0.5} \\cdot \\min(t^{-0.5}, t \\cdot T^{-1.5})}{\\sqrt{t}} \\]",
          "\\[ \\text{Warmup steps: } T_{warm} = 4000 \\text{ for typical transformer} \\]"
        ],
        references: [
          "Xu et al. (2019) - Understanding BERT",
          "Yang et al. (2021) - TensorFlow Transform"
        ]
      },
      playground: {
        type: "equation",
        equation: "x/10 * exp(-x/30)",
        xRange: [0, 50],
        yRange: [0, 1]
      }
    }
  ]
};

export default chapter;
