import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "model-compression",
  title: "Model Compression",
  description: "Reducing model size without significant quality loss.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Model compression reduces memory, compute, and latency while preserving accuracy.",
          "Common techniques include pruning, quantization, distillation, and low-rank factorization.",
          "Compression enables deployment on edge devices and reduces serving cost.",
        ],
        keyIdeas: [
          "Compression trades accuracy for efficiency",
          "Different workloads need different compression strategies",
          "Pruning removes weights or structures",
          "Quantization reduces numerical precision",
          "Distillation transfers knowledge to smaller models",
          "Low-rank factorization reduces matrix size",
        ],
        equations: [
          "\\[ \\text{Compression Ratio} = \\frac{\\text{original size}}{\\text{compressed size}} \\]",
          "\\[ \\text{Sparsity} = 1 - \\frac{\\text{nonzero weights}}{\\text{total weights}} \\]",
          "\\[ A \\approx U_k \\Sigma_k V_k^T \\]",
        ],
        references: [
          "Cheng et al. (2017) - A Survey of Model Compression and Acceleration",
          "Han et al. (2016) - Deep Compression",
          "Hinton et al. (2015) - Distillation",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Compression pipelines often combine multiple techniques: prune, quantize, then distill.",
          "Structured compression is hardware-friendly, while unstructured sparsity needs specialized kernels.",
          "Training-aware methods (QAT, pruning during training) preserve accuracy better than post-training methods.",
        ],
        keyIdeas: [
          "Structured pruning removes channels or blocks",
          "Unstructured sparsity needs sparse kernels",
          "Quantization-aware training adapts to low precision",
          "Knowledge distillation improves compressed model quality",
          "Low-rank layers reduce parameter count",
          "Compression must consider memory bandwidth and cache",
        ],
        equations: [
          "\\[ \\mathcal{L} = \\mathcal{L}_{task} + \\lambda \\|W\\|_0 \\]",
          "\\[ q = \\text{round}(x / s) + z \\quad (\\text{quantization}) \\]",
          "\\[ \\text{Speedup} \\approx \\frac{\\text{FLOPs}_{orig}}{\\text{FLOPs}_{comp}} \\]",
        ],
        references: [
          "Jacob et al. (2018) - Quantization and Training of NN for Efficient Inference",
          "Gale et al. (2019) - State of Sparsity in Deep Learning",
          "Molchanov et al. (2019) - Importance Estimation for Pruning",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Compression must be evaluated end-to-end, including hardware effects and energy use.",
          "Hardware-aware compression optimizes for specific accelerators and latency constraints.",
          "Automated compression uses neural architecture search and reinforcement learning to meet constraints.",
        ],
        keyIdeas: [
          "Latency is not proportional to parameter count",
          "Memory access often dominates compute cost",
          "Hardware-aware NAS balances accuracy and efficiency",
          "Sparsity patterns affect accelerator utilization",
          "Compression can shift error distribution and fairness",
          "Robustness under quantization requires calibration",
        ],
        equations: [
          "\\[ \\text{Energy} = \\sum_i \\text{Ops}_i \\cdot \\text{Energy}_i \\]",
          "\\[ \\min_{arch} \\; \\mathcal{L}(arch) \\; \\text{s.t.} \\; \\text{latency} \\le L_{max} \\]",
          "\\[ \\text{Perf} = \\text{Accuracy} - \\lambda \\cdot \\text{Latency} \\]",
        ],
        references: [
          "Howard et al. (2017) - MobileNets",
          "Tan and Le (2019) - EfficientNet",
          "He et al. (2020) - Once-for-All Networks",
        ],
      },
    },
  ],
};

export default chapter;
