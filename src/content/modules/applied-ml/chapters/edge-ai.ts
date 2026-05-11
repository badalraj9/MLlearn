import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "edge-ai",
  title: "Edge AI Deployment",
  description: "Running ML models on edge devices and IoT.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Edge AI runs inference on devices like phones, sensors, and embedded systems, enabling low latency and offline operation.",
          "Constraints include limited compute, memory, power, and connectivity.",
          "Model design must balance accuracy with energy and latency budgets.",
        ],
        keyIdeas: [
          "On-device inference reduces latency and improves privacy",
          "Model size and memory bandwidth are key bottlenecks",
          "Quantization and pruning are standard for edge deployment",
          "Latency budgets are often strict (tens of ms)",
          "Edge models must handle noisy real-world inputs",
          "Deployment requires hardware-specific optimization",
        ],
        equations: [
          "\\[ \\text{Energy} = \\text{Power} \\times \\text{Time} \\]",
          "\\[ L_{total} = L_{sensor} + L_{pre} + L_{infer} + L_{post} \\]",
          "\\[ \\text{Model Size} = \\text{params} \\times \\text{bits per param} \\]",
        ],
        references: [
          "Warden and Situnayake - TinyML",
          "Howard et al. (2017) - MobileNets",
          "Sze et al. (2017) - Efficient Processing of Deep Neural Networks",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Edge deployments require careful profiling to understand memory, compute, and power bottlenecks.",
          "Hardware accelerators (NPUs, DSPs) provide speedups but impose operator constraints.",
          "On-device personalization can improve performance while preserving privacy.",
        ],
        keyIdeas: [
          "Operator support dictates model architecture choices",
          "Caching and batching can reduce energy cost",
          "On-device training is limited but possible for adaptation",
          "Model update strategies must be bandwidth-aware",
          "Robustness matters more in noisy edge settings",
          "Compression techniques should be hardware-aligned",
        ],
        equations: [
          "\\[ \\text{MACs} \\approx \\sum_l k_l^2 c_{in} c_{out} h w \\]",
          "\\[ \\text{Battery Drain} = \\frac{\\text{Energy per inference}}{\\text{battery capacity}} \\]",
          "\\[ \\text{Speedup} = \\frac{T_{cpu}}{T_{accelerator}} \\]",
        ],
        references: [
          "Sze et al. (2017) - Efficient Processing of Deep Neural Networks",
          "Lane et al. (2015) - DeepX: Resource-Efficient DL",
          "TensorFlow Lite - Performance Best Practices",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Federated learning enables training across edge devices without centralizing data, improving privacy and coverage.",
          "Edge deployments must address security: model theft, tampering, and adversarial inputs are realistic threats.",
          "Energy-aware optimization and hardware co-design are essential for ultra-low-power devices.",
        ],
        keyIdeas: [
          "Federated learning aggregates gradients, not data",
          "Secure aggregation protects client updates",
          "Adversarial robustness is crucial at the edge",
          "Model watermarking deters theft",
          "Energy-aware NAS optimizes for power",
          "Quantization and sparsity reduce memory access",
        ],
        equations: [
          "\\[ w_{t+1} = \\sum_{k=1}^K \\frac{n_k}{n} w_{t+1}^k \\]",
          "\\[ \\Delta w_k = w_{t+1}^k - w_t \\]",
          "\\[ \\min_{arch} \\; \\mathcal{L}(arch) + \\lambda \\cdot \\text{Energy}(arch) \\]",
        ],
        references: [
          "McMahan et al. (2017) - Communication-Efficient Federated Learning",
          "Bonawitz et al. (2017) - Secure Aggregation",
          "Wu et al. (2019) - FBNet: Hardware-Aware NAS",
        ],
      },
    },
  ],
};

export default chapter;
