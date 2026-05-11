import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "model-parallelism",
  title: "Model Parallelism",
  description: "Splitting models across devices.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Model parallelism splits a neural network across multiple GPUs when the model is too large to fit in a single GPU's memory. Each GPU holds different layers.",
          "The simplest approach is pipeline parallelism: split the model into stages, assign each stage to a GPU, and stream data through the pipeline.",
          "The main challenge is that some GPUs will be idle while waiting for activations from previous or subsequent stages. This 'pipeline bubble' reduces efficiency."
        ],
        keyIdeas: [
          "Pipeline: split layers across GPUs, stream data through",
          "Tensor: split large tensors (e.g., matrix multiplications) across GPUs",
          "Pipeline bubble: idle time between stages",
          "Needed when model doesn't fit in single GPU"
        ],
        equations: [
          "\\[ \\text{Pipeline stages: } S = \\text{layers} / \\text{GPUs} \\]",
          "\\[ \\text{Bubble fraction: } B = \\frac{P-1}{M} \\quad (P = \\text{stages}, M = \\text{microbatches}) \\]",
          "\\[ \\text{Memory per GPU: } M_{GPU} = \\frac{M_{total}}{P} \\times \\text{activation\\ size} \\]"
        ],
        references: [
          "Huang et al. (2019) - GPipe",
          "Narayanan et al. (2019) - PipeDream"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "x * (1 - a/x)",
        sliders: [
          { id: "a", label: "Pipeline stages", min: 2, max: 8, step: 1, default: 4 }
        ],
        xRange: [1, 20],
        yRange: [0, 15]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Interleaved pipeline schedules reduce the bubble by having each GPU work on multiple forward passes in different order. This reduces idle time significantly.",
          "Tensor parallelism splits individual operations across GPUs. For a linear layer Y = XA, we can split A = [A1, A2] and compute Y1 = X A1, Y2 = X A2 in parallel.",
          "In practice, most systems combine data parallelism (for throughput) with model parallelism (for large models). This is 3D parallelism."
        ],
        keyIdeas: [
          "Interleaved schedule: reduces bubble fraction",
          "Tensor parallelism: split operations, not just layers",
          "Column/row parallelism: split weight matrices",
          "3D: data × tensor × pipeline parallelism"
        ],
        equations: [
          "\\[ \\text{Column parallel: } Y = X \\cdot [A_1, A_2] = [XA_1, XA_2] \\]",
          "\\[ \\text{Row parallel: } Y = [XA_1, XA_2] \\cdot \\begin{bmatrix} B_1 \\\\ B_2 \\end{bmatrix} \\]",
          "\\[ \\text{All-reduce for output: } Y = \\text{all\\_reduce}([Y_1, Y_2]) \\]"
        ],
        references: [
          "Shoeybi et al. (2020) - Megatron-LM",
          "Narayanan et al. (2021) - Efficient Large-Scale Language Model Training"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Expert parallelism (MoE) routes different inputs to different 'expert' networks. Only a fraction of the model is active for each input, enabling huge model capacity with manageable compute.",
          "Memory-efficient pipeline techniques include: activation checkpointing (recompute forward pass in backward), asynchronous pipeline execution, and heterogeneous device placement.",
          "Automatic model parallelism tools analyze computational graphs and find optimal placements to minimize communication and balance load."
        ],
        keyIdeas: [
          "Expert parallelism: MoE routing to different experts",
          "Heterogeneous placement: assign layers to devices based on characteristics",
          "Automatic search: find optimal model parallelism strategy",
          "Communication hiding: overlap compute and communication"
        ],
        equations: [
          "\\[ \\text{Routing: } y = \\sum_{i=1}^{N} G(x)_i E_i(x) \\quad G = \\text{softmax}(W x) \\]",
          "\\[ \\text{Expert capacity: } C = \\frac{\\text{batch\\_size} \\times \\text{top\\ k}}{\\text{num\\ experts}} \\]",
          "\\[ \\text{Activation memory: } M_{act} = O(L \\times B \\times H) / \\text{checkpoint} \\]"
        ],
        references: [
          "Fedus et al. (2021) - Switch Transformers",
          "Lepikhin et al. (2021) - GShard"
        ]
      },
      playground: {
        type: "equation",
        equation: "x * 0.8 + 2",
        xRange: [0, 10],
        yRange: [0, 12]
      }
    }
  ]
};

export default chapter;
