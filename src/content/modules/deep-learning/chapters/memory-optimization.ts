import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "memory-optimization",
  title: "Memory Optimization",
  description: "Gradient checkpointing, activation recomputation, and offloading.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Memory optimization techniques allow training larger models on limited GPU memory. The key tradeoffs are between memory, compute, and programming complexity.",
          "Gradient checkpointing (activation recomputation) trades compute for memory by not storing intermediate activations. Instead, they're recomputed during the backward pass when needed.",
          "Mixed precision training reduces memory by using FP16/BF16 for most operations. Optimizer states can also be sharded across GPUs."
        ],
        keyIdeas: [
          "Checkpointing: recompute activations, don't store them",
          "Mixed precision: 16-bit floats reduce memory by half",
          "Gradient storage: can use reduced precision or be computed on-the-fly",
          "Memory tradeoff: 2-3x more compute for 2-3x more memory"
        ],
        equations: [
          "\\[ M_{checkpoint} = O(\\sqrt{L}) \\quad \\text{vs } O(L) \\text{ without} \\]",
          "\\[ M_{FP16} = 2 \\text{ bytes} \\quad M_{FP32} = 4 \\text{ bytes} \\]",
          "\\[ \\text{Activation memory: } M_{act} = B \\times S \\times H \\times L \\]"
        ],
        references: [
          "Chen et al. (2016) - Training Deep Nets with Sublinear Memory Cost",
          "PyTorch Checkpoint Documentation"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * sqrt(x)",
        sliders: [
          { id: "a", label: "Scale", min: 1, max: 3, step: 0.5, default: 2 }
        ],
        xRange: [0, 50],
        yRange: [0, 20]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Selective checkpointing only recomputes expensive operations (like attention) while storing cheap ones. This provides better memory/compute tradeoff.",
          "CPU offloading moves optimizer states or gradients to CPU memory when not needed, transferring them to GPU when required. This adds communication overhead but enables larger models.",
          "In practice, combining multiple techniques (checkpointing + mixed precision + gradient accumulation) allows fitting models 10-100x larger than naive training."
        ],
        keyIdeas: [
          "Selective: checkpoint expensive ops only",
          "CPU offload: move data between CPU/GPU",
          "Optimizer offload: Adam states to CPU",
          "Communication hiding: overlap transfer with compute"
        ],
        equations: [
          "\\[ \\text{DeepSpeed: } M_{opt} = \\frac{4 \\times N}{D} \\quad (D = \\text{devices}) \\]",
          "\\[ \\text{Transfer time: } T_{transfer} = \\frac{size}{bandwidth} \\]",
          "\\[ \\text{Overlap: } T_{total} = \\max(T_{compute}, T_{transfer}) \\]"
        ],
        references: [
          "Rajbhandari et al. (2020) - ZeRO",
          "DeepSpeed Documentation"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Mathematical memory optimization uses reversible networks where activations can be computed backwards from outputs. This is mathematically exact, not an approximation.",
          "Parallel checkpointing divides computation into segments, recomputing each independently. The optimal segmentation depends on memory/compute tradeoff.",
          "Emerging techniques include: functional program optimization (treating networks as pure functions), Just-In-Time compilation, and heterogeneous memory systems."
        ],
        keyIdeas: [
          "Reversible networks: mathematically exact recomputation",
          "Parallel checkpointing: optimal segmentation",
          "Functional purity: enable aggressive optimization",
          "JIT compilation: fuse operations, reduce memory"
        ],
        equations: [
          "\\[ \\text{Reversible: } x_i = f_i^{-1}(x_{i+1}, y_i) \\]",
          "\\[ \\text{Optimal segments: } S = \\sqrt{\\frac{M_{target} \\times L}{B \\times S_{act}}} \\]",
          "\\[ \\text{Memory bound: } M = 2 \\times \\text{params} + B \\times \\text{checkpoints} \\]"
        ],
        references: [
          "Jayaram & Carbin (2021) - Reversible Networks",
          "Jain et al. (2020) - Maximizing CNN Accelerator Efficiency"
        ]
      },
      playground: {
        type: "equation",
        equation: "sqrt(x) + 0.5*x",
        xRange: [0, 30],
        yRange: [0, 25]
      }
    }
  ]
};

export default chapter;
