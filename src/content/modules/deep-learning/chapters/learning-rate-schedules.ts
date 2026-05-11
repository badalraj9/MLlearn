import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "learning-rate-schedules",
  title: "Learning Rate Schedules",
  description: "Cosine, step, exponential, and cyclic schedules.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Learning rate schedules adjust the step size during training. Starting with a higher learning rate helps escape poor local minima, then decreasing it fine-tunes the solution.",
          "Think of it like finding your way down a mountain in fog. Early on, you take big steps to explore quickly. As you get closer to the bottom, you take smaller steps to avoid overshooting.",
          "Common schedules include: step decay (reduce by factor at specific epochs), exponential decay (continually shrink), and cosine annealing (smooth decrease following cosine curve)."
        ],
        keyIdeas: [
          "Step decay: reduce LR by factor at epochs 30, 60, 90",
          "Exponential: LR = LR₀ × e^(-kt)",
          "Cosine annealing: LR = LR_min + 0.5(LR_max - LR_min)(1 + cos(πt/T))",
          "Warmup: start small, gradually increase to target LR"
        ],
        equations: [
          "\\[ \\text{Step: } \\eta_t = \\eta_0 \\cdot \\gamma^{\\lfloor t / T \\rfloor} \\]",
          "\\[ \\text{Exponential: } \\eta_t = \\eta_0 \\cdot e^{-kt} \\]",
          "\\[ \\text{Cosine: } \\eta_t = \\eta_{min} + \\frac{\\eta_{max} - \\eta_{min}}{2}(1 + \\cos(\\frac{t}{T}\\pi)) \\]"
        ],
        references: [
          "Loshchilov & Hutter (2017) - SGDR: Stochastic Gradient Descent with Warm Restarts",
          "You et al. (2017) - Large Batch Training of Convolutional Networks"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * cos(b * x * 3.14 / c)",
        sliders: [
          { id: "a", label: "Amplitude", min: 0.1, max: 1, step: 0.1, default: 0.5 },
          { id: "b", label: "Cycles", min: 0.5, max: 2, step: 0.1, default: 1 },
          { id: "c", label: "Period", min: 5, max: 20, step: 1, default: 10 }
        ],
        xRange: [0, 20],
        yRange: [-1, 1]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The cosine annealing schedule has become popular because it provides a smooth decrease and occasional 'bounces' at the end if using warm restarts. This helps escape local minima.",
          "Cyclical learning rates (CLR) alternate between bounds, allowing the learning rate to explore more of the loss landscape. This can find flatter minima that generalize better.",
          "Modern practice often combines warmup with cosine decay. The model first warms up (avoiding instability), then smoothly decays to near-zero."
        ],
        keyIdeas: [
          "Cosine with warm restarts: periodic restarts explore new regions",
          "Cyclical: triangular, cosine, or exp cycles between min/max",
          "One-cycle policy: one warmup + one decay in one cycle",
          "Learning rate finder: sweep to find optimal initial LR"
        ],
        equations: [
          "\\[ \\text{Warm restarts: } T_i = T_0 \\cdot 2^i \\quad \\text{(increasing period)} \\]",
          "\\[ \\text{CLR bounds: } \\eta_{min} = \\frac{\\eta_{max}}{4}, \\eta_{max} = \\eta_0 \\cdot 10^{k} \\]",
          "\\[ \\text{One-cycle: } \\eta(t) = \\begin{cases} \\eta_{max} \\frac{t}{T_w} & t < T_w \\\\ \\text{decay} & t \\geq T_w \\end{cases} \\]"
        ],
        references: [
          "Smith (2017) - Cyclical Learning Rates for Training Neural Networks",
          "Smith & Topin (2019) - Super-Convergence"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Adaptive optimizers (Adam, AdamW) have their own learning rate schedules separate from their internal step size adaptation. Decoupling schedule from optimizer dynamics is key.",
          "Learning rate schedules can be viewed as curriculum learning - presenting easier examples first. The schedule controls difficulty by controlling gradient magnitude.",
          "Sharpness-aware minimization (SAM) explicitly optimizes for flat minima, which often correlates with better generalization. This can be combined with aggressive learning rates."
        ],
        keyIdeas: [
          "Decoupled schedules: optimizer handles parameter-specific adaptation",
          "Recap: cosine after linear warmup - current best practice",
          "Square root decay: LR ∝ 1/√t for transformers",
          "Polynomial decay: common for LLMs (decay to 10% of max)"
        ],
        equations: [
          "\\[ \\text{Sqrt: } \\eta_t = \\eta_{max} / \\sqrt{t} \\]",
          "\\[ \\text{Polynomial: } \\eta_t = (\\eta_{max} - \\eta_{min})(1 - t/T)^p + \\eta_{min} \\]",
          "\\[ \\text{LLM: } \\eta_t = \\eta_{max} \\cdot (1 - \\frac{t}{T})^{p} \\quad p \\approx 0.5-1 \\]"
        ],
        references: [
          "Vaswani et al. (2017) - Attention Is All You Need",
          "Chowdhery et al. (2022) - PaLM"
        ]
      },
      playground: {
        type: "equation",
        equation: "cos(x/3) * exp(-x/20)",
        xRange: [0, 30],
        yRange: [-1, 1]
      }
    }
  ]
};

export default chapter;
