import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "parameter-scaling-laws",
  title: "Parameter Scaling Laws",
  description: "How performance scales with model size.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Scaling laws describe how model performance changes as we increase model size, data, and compute. They predict that larger models consistently perform better with sufficient data.",
          "The key insight is that performance (measured by loss or perplexity) follows a power law with respect to model size. Doubling model size doesn't double performance but consistently improves it.",
          "These empirical laws guided the development of modern foundation models like GPT, PaLM, and others. They predict that bigger is generally better, within certain constraints."
        ],
        keyIdeas: [
          "Power law: L(N) ∝ N^(-α) where N is model size",
          "Bigger models need more data to realize their potential",
          "Performance improves predictably with scale",
          "Chinchilla scaling: optimal data/model balance"
        ],
        equations: [
          "\\[ L(N) = \\left(\\frac{N_C}{N}\\right)^{\\alpha_N} \\quad \\text{(N = params)} \\]",
          "\\[ L(D) = \\left(\\frac{D_C}{D}\\right)^{\\alpha_D} \\quad \\text{(D = data)} \\]",
          "\\[ L(N, D) = \\left(\\frac{N_C}{N}\\right)^{\\alpha_N} + \\left(\\frac{D_C}{D}\\right)^{\\alpha_D} \\]"
        ],
        references: [
          "Kaplan et al. (2020) - Scaling Laws for Neural Language Models",
          "Brown et al. (2020) - Language Models are Few-Shot Learners"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * x^(-b)",
        sliders: [
          { id: "a", label: "Scale factor", min: 1, max: 10, step: 0.5, default: 3 },
          { id: "b", label: "Exponent", min: 0.1, max: 1, step: 0.05, default: 0.3 }
        ],
        xRange: [1, 100],
        yRange: [0, 5]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The Chinchilla paper showed that the optimal ratio of data to parameters is around 20 tokens per parameter. Before this, many thought bigger models alone were the key.",
          "Scaling laws apply across modalities - the same power law relationship holds for transformers trained on images, audio, and other data types.",
          "Practical implications: when training a model, you can use scaling laws to predict how performance changes with different model/data sizes. This helps allocate compute budget efficiently."
        ],
        keyIdeas: [
          "Chinchilla: ~20 tokens per parameter for optimal compute efficiency",
          "Compute-optimal: balance model size and training tokens",
          "Same power law across modalities",
          "Can predict final loss from early training"
        ],
        equations: [
          "\\[ \\text{Chinchilla: } D \\approx 20 \\times N \\quad (D = \\text{tokens}, N = \\text{params}) \\]",
          "\\[ \\text{Compute: } C \\approx 6 \\times N \\times D \\]",
          "\\[ \\text{Effective compute: } C_{eff} = C_{used} \\times \\text{utilization} \\]"
        ],
        references: [
          "Hoffmann et al. (2022) - Training Compute-Optimal LLMs",
          "Hernandez et al. (2022) - Scaling Laws for Autoregressive Transformers"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The neural scaling exponent (α) tells us how quickly performance improves with scale. Higher α means more efficient scaling. Different tasks have different exponents.",
          "Emergent abilities appear at certain scale thresholds - abilities not present in smaller models suddenly appear. This suggests phase transitions in model capability.",
          "Beyond a point, more compute doesn't help as much - there's a 'saturation' regime. Understanding where your model is on this curve is crucial for efficient resource allocation."
        ],
        keyIdeas: [
          "Neural scaling exponent: α ≈ 0.05-0.5 for different tasks",
          "Emergent abilities: sudden capabilities at scale thresholds",
          "Diminishing returns: saturation at high compute",
          "Task-specific scaling: some tasks benefit more from scale"
        ],
        equations: [
          "\\[ \\alpha = -\\frac{\\partial \\log L}{\\partial \\log N} \\]",
          "\\[ \\text{Emergent threshold: } N^* \\text{ where ability appears} \\]",
          "\\[ \\text{Saturation: } \\frac{\\partial L}{\\partial C} \\to 0 \\text{ at high C} \\]"
        ],
        references: [
          "Wei et al. (2022) - Emergent Abilities of Large Language Models",
          "Ganguli et al. (2022) - Predictability and Surprise"
        ]
      },
      playground: {
        type: "equation",
        equation: "3 * x^(-0.3) + 0.5",
        xRange: [1, 100],
        yRange: [0, 4]
      }
    }
  ]
};

export default chapter;
