import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "quantization",
  title: "Quantization",
  description: "Reducing precision of weights and activations.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Quantization reduces numerical precision of weights and activations, often from float32 to int8, to speed up inference.",
          "It reduces memory bandwidth and enables deployment on constrained hardware.",
          "Quantization can be applied after training (PTQ) or during training (QAT).",
        ],
        keyIdeas: [
          "PTQ is simple but can reduce accuracy",
          "QAT learns to be robust to quantization noise",
          "Symmetric vs asymmetric quantization affects range",
          "Per-channel quantization improves accuracy",
          "Quantization requires calibration data",
          "Latency benefits depend on hardware support",
        ],
        equations: [
          "\\[ q = \\text{round}(x / s) + z \\]",
          "\\[ x \\approx s (q - z) \\]",
          "\\[ s = \\frac{x_{max} - x_{min}}{q_{max} - q_{min}} \\]",
        ],
        references: [
          "Jacob et al. (2018) - Quantization and Training of NN for Efficient Inference",
          "Krishnamoorthi (2018) - Quantizing Deep Convolutional Networks",
          "NVIDIA - TensorRT Quantization Guide",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Calibration selects quantization scales by matching activation distributions on representative data.",
          "Mixed precision uses higher precision for sensitive layers to preserve accuracy.",
          "Quantization-aware training simulates quantization during training to reduce accuracy loss.",
        ],
        keyIdeas: [
          "Histogram-based calibration improves PTQ",
          "Per-channel weights reduce error in conv layers",
          "Quantization noise can be modeled as uniform",
          "Bias correction can recover accuracy",
          "INT8 is common; INT4 is emerging",
          "Activation outliers can dominate scale selection",
        ],
        equations: [
          "\\[ \\epsilon_{q} \\sim U\\left(-\\frac{s}{2}, \\frac{s}{2}\\right) \\]",
          "\\[ x_{clip} = \\min(\\max(x, x_{min}), x_{max}) \\]",
          "\\[ \\text{MSE} = \\mathbb{E}[(x - \\hat{x})^2] \\]",
        ],
        references: [
          "Nagel et al. (2019) - Data-Free Quantization",
          "Banner et al. (2018) - Post Training 4-bit Quantization",
          "Courbariaux et al. (2016) - BinaryConnect",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Quantization affects model calibration and uncertainty, which matters for safety-critical systems.",
          "Hardware-aware quantization optimizes for specific accelerators and instruction sets.",
          "Quantization interacts with pruning and distillation in compression pipelines.",
        ],
        keyIdeas: [
          "Quantization can shift decision boundaries",
          "Outlier-aware quantization reduces error",
          "Zero-shot quantization uses synthetic calibration",
          "Quantization can be applied to embeddings and attention",
          "End-to-end benchmarking is required for real speedups",
          "Quantization-aware NAS balances accuracy and latency",
        ],
        equations: [
          "\\[ \\Delta f \\approx \\nabla f^T \\Delta x \\]",
          "\\[ \\text{ECE} = \\sum_{m=1}^M \\frac{|B_m|}{n} \\left| \\text{acc}(B_m) - \\text{conf}(B_m) \\right| \\]",
          "\\[ \\min_{arch} \\; \\mathcal{L}(arch) + \\lambda \\cdot \\text{Latency}(arch) \\]",
        ],
        references: [
          "Wang et al. (2019) - HAQ: Hardware-Aware Quantization",
          "Frantar et al. (2022) - GPTQ",
          "Dettmers et al. (2022) - 8-bit Optimizers",
        ],
      },
    },
  ],
};

export default chapter;
