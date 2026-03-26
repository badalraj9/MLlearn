import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "distributed-training",
  title: "Distributed Training",
  description: "Training across multiple GPUs and machines.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Distributed training splits training across multiple GPUs or machines to handle larger models and datasets. The two main paradigms are data parallelism and model parallelism.",
          "Data parallelism: each GPU has a full copy of the model but processes different batches. Gradients are averaged across GPUs before the optimizer step.",
          "Model parallelism: the model itself is split across GPUs. One GPU might hold layers 1-5, another holds layers 6-10. This is needed when the model doesn't fit in one GPU."
        ],
        keyIdeas: [
          "Data parallelism: replicate model, split data",
          "Model parallelism: split model across GPUs",
          "Gradient synchronization: all-reduce across GPUs",
          "Communication overhead: limits scaling efficiency"
        ],
        equations: [
          "\\[ \\text{All-reduce: } \\bar{g} = \\frac{1}{N} \\sum_{i=1}^{N} g_i \\]",
          "\\[ \\text{Speedup: } S = \\frac{1}{1 + \\frac{C}{P}} \\quad (C = \\text{comm time}, P = \\text{compute time}) \\]",
          "\\[ \\text{Strong scaling: } \\text{fixed problem size} \\]",
          "\\[ \\text{Weak scaling: } \\text{problem grows with resources} \\]"
        ],
        references: [
          "Li et al. (2020) - PyTorch Distributed Training",
          "Ben-Nun & Hoefler (2019) - Demystifying Parallel Training"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * x / (1 + b * x)",
        sliders: [
          { id: "a", label: "Compute", min: 1, max: 10, step: 1, default: 5 },
          { id: "b", label: "Comm cost", min: 0.1, max: 2, step: 0.1, default: 0.5 }
        ],
        xRange: [1, 10],
        yRange: [0, 5]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Distributed Data Parallel (DDP) is the standard for data parallelism in PyTorch. Each GPU runs forward/backward independently, then synchronizes gradients using all-reduce.",
          "Gradient accumulation simulates larger batch sizes by accumulating gradients over multiple micro-batches before the optimizer step. This enables effective large batch training without requiring more GPU memory.",
          "ZeRO (Zero Redundancy Optimizer) partitions optimizer states, gradients, and parameters across GPUs instead of replicating them. This allows training models larger than single-GPU memory."
        ],
        keyIdeas: [
          "DDP: each GPU computes local gradients, then synchronizes",
          "Gradient accumulation: simulate large batches with limited memory",
          "ZeRO: partition optimizer state (ZeRO-1), gradients (ZeRO-2), params (ZeRO-3)",
          "FSDP: Fully Sharded Data Parallel in PyTorch"
        ],
        equations: [
          "\\[ \\text{GigaNL: } \\text{memory per GPU} = \\frac{4 \\times \\text{params}}{N} \\quad (N = \\text{GPUs}, \\text{ZeRO-3}) \\]",
          "\\[ \\text{Effective BS: } B_{eff} = B_{micro} \\times N_{micro} \\times N_{GPU} \\]",
          "\\[ \\text{All-gather: } [x_1, ..., x_N] = \\text{all\_gather}(x_i) \\]"
        ],
        references: [
          "Rajbhandari et al. (2020) - ZeRO",
          "PyTorch FSDP Documentation"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "3D parallelism combines data, tensor (model), and pipeline parallelism. Different parts of the model are on different devices, with different data batches flowing through simultaneously.",
          "Pipeline parallelism divides the model into stages, with each stage on a different GPU. The challenge is 'pipeline bubbles' - idle time when some GPUs wait for others.",
          "Communication optimization includes: bucketing (batch small messages), overlapping compute and communication, and using specialized hardware (NVLink, InfiniBand)."
        ],
        keyIdeas: [
          "3D parallelism: data × tensor × pipeline",
          "Pipeline schedule: interleave forward/backward to reduce bubbles",
          "Virtual Pipeline: multiple microbatches in flight simultaneously",
          "NVLink: high-bandwidth GPU interconnect"
        ],
        equations: [
          "\\[ \\text{Pipeline bubble: } B = (P-1) \\times (F + B) / M \\]",
          "\\[ \\text{Interleaved schedule: } \\text{minimize idle time} \\]",
          "\\[ \\text{NVLink bandwidth: } 600 GB/s \\text{ vs PCIe 32 GB/s} \\]",
          "\\[ \\text{Gradient compression: } 4\\times \\text{or } 8\\times \\text{ smaller communication} \\]"
        ],
        references: [
          "Narayanan et al. (2021) - Efficient Large-Scale Language Model Training",
          "Huang et al. (2019) - GPipe"
        ]
      },
      playground: {
        type: "equation",
        equation: "x / (1 + 0.1*x^2)",
        xRange: [0, 10],
        yRange: [0, 5]
      }
    }
  ]
};

export default chapter;
