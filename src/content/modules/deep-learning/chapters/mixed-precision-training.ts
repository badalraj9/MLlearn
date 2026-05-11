import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "mixed-precision-training",
  title: "Mixed Precision Training",
  description: "Using FP16/BF16 for faster, memory-efficient training.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Mixed precision training uses lower precision (16-bit floating point) for most operations while keeping some in 32-bit for numerical stability. This reduces memory and increases computation speed.",
          "FP16 (half precision) uses 16 bits: 1 sign, 5 exponent, 10 mantissa. It has a limited range (~6×10^-5 to 65504), which can cause overflow/underflow issues.",
          "BF16 (brain float) uses 16 bits: 1 sign, 8 exponent, 7 mantissa. It has the same range as FP32 but less precision. It's more stable for deep learning."
        ],
        keyIdeas: [
          "FP16: 16-bit floating point, faster but limited range",
          "BF16: 16-bit with 8-bit exponent, more stable",
          "FP32 master weights: maintain full precision for accumulation",
          "Loss scaling: multiply loss to avoid FP16 underflow"
        ],
        equations: [
          "\\[ \\text{FP16: } 1 \\text{ sign} + 5 \\text{ exp} + 10 \\text{ mantissa} \\]",
          "\\[ \\text{BF16: } 1 \\text{ sign} + 8 \\text{ exp} + 7 \\text{ mantissa} \\]",
          "\\[ \\text{Range FP16: } [6\\times10^{-5}, 65504] \\]",
          "\\[ \\text{Range BF16: } [3\\times10^{-38}, 3\\times10^{38}] \\]"
        ],
        references: [
          "Micikevicius et al. (2018) - Mixed Precision Training",
          "NVIDIA Automatic Mixed Precision Guide"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * x",
        sliders: [
          { id: "a", label: "Slope", min: 0.1, max: 2, step: 0.1, default: 1 }
        ],
        xRange: [-2, 2],
        yRange: [-2, 2]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The key to stable mixed precision training is dynamic loss scaling. Start with a large scale factor, and if gradients become NaN/Inf, skip the update and reduce the scale.",
          "Operations that need FP32: gradient accumulation, batch norm statistics, loss computation. Most matrix multiplications can safely use FP16/BF16.",
          "Modern frameworks (PyTorch, TensorFlow) have automatic mixed precision (AMP) that handles most of this automatically. You just wrap your forward pass in a context manager."
        ],
        keyIdeas: [
          "Dynamic loss scaling: automatically adjust scale factor",
          "FP32 for: gradients during accumulation, batch norm, optimizer states",
          "FP16/BF16 for: forward pass, most backward pass",
          "AMP: automatic mixed precision in 2-3 lines of code"
        ],
        equations: [
          "\\[ g_{scaled} = g \\cdot S \\quad (S = \\text{loss scale}) \\]",
          "\\[ \\text{If overflow: } S_{new} = S_{old} / 2 \\quad \\text{skip update} \\]",
          "\\[ \\text{Memory savings: } 50\\% \\text{ typically, up to } 75\\% \\text{ for large models} \\]"
        ],
        references: [
          "NVIDIA Apex Documentation",
          "PyTorch Automatic Mixed Precision"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "TF32 (TensorFloat-32) uses 19 bits internally on Ampere GPUs, giving FP32 range with FP16 precision. It's automatically used for certain operations without code changes.",
          "FP8 (8-bit floating point) is emerging for next-generation training. It uses 4-bit exponent and 3-bit mantissa, with further memory savings.",
          "Quantization-aware training (QAT) simulates low-precision behavior during training, producing models that better survive quantization at inference."
        ],
        keyIdeas: [
          "TF32: automatic on Ampere+, 19-bit internal format",
          "FP8: emerging 8-bit format for training",
          "QAT: train with simulated quantization for better deployment",
          "Stochastic rounding: helps maintain gradients with low precision"
        ],
        equations: [
          "\\[ \\text{TF32: } 1 \\text{ sign} + 8 \\text{ exp} + 10 \\text{ mantissa (stored)} \\]",
          "\\[ \\text{FP8 E4M3: } 4 \\text{ exp} + 3 \\text{ mantissa} \\]",
          "\\[ \\text{FP8 E5M2: } 5 \\text{ exp} + 2 \\text{ mantissa} \\]",
          "\\[ \\text{Stochastic: } \\text{round}(x) = \\lfloor x \\rfloor + \\mathbb{I}[u < x - \\lfloor x \\rfloor] \\]"
        ],
        references: [
          "Narang et al. (2018) - Mixed Precision Training",
          "Micikevicius et al. (2022) - FP8 Formats for Deep Learning"
        ]
      },
      playground: {
        type: "equation",
        equation: "x^2 - 1",
        xRange: [-2, 2],
        yRange: [-2, 3]
      }
    }
  ]
};

export default chapter;
