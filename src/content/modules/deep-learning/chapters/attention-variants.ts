import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "attention-variants",
  title: "Attention Variants",
  description: "Self-attention, cross-attention, multi-head, and sparse patterns.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Attention allows models to focus on the most relevant parts of the input when making predictions. Unlike hard attention (selecting one position), soft attention computes a weighted average of all positions.",
          "Self-attention computes attention between all positions in a sequence, allowing each position to attend to all others. This captures dependencies regardless of distance - a key advantage over RNNs.",
          "Multi-head attention runs multiple attention operations in parallel, each learning different types of relationships. One head might focus on syntactic structure, another on coreference, etc."
        ],
        keyIdeas: [
          "Soft attention: weighted average of all positions",
          "Self-attention: Q, K, V from same sequence",
          "Cross-attention: Q from decoder, K, V from encoder",
          "Multi-head: parallel attention layers, concatenated outputs"
        ],
        equations: [
          "\\[ \\text{Attention: } \\text{Attn}(Q, K, V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V \\]",
          "\\[ \\text{Self-attention: } Q = XW_Q, K = XW_K, V = XW_V \\]",
          "\\[ \\text{Multi-head: } \\text{MHA}(Q, K, V) = \\text{Concat}(head_1, ..., head_h)W^O \\]"
        ],
        references: [
          "Vaswani et al. (2017) - Attention Is All You Need",
          "Bahdanau et al. (2014) - Neural Machine Translation"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "exp(-a * abs(x - b))",
        sliders: [
          { id: "a", label: "Sharpness", min: 0.1, max: 5, step: 0.1, default: 1 },
          { id: "b", label: "Peak position", min: -3, max: 3, step: 0.1, default: 0 }
        ],
        xRange: [-5, 5],
        yRange: [0, 1]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Scaled dot-product attention divides by √d_k to prevent large dot products that would push softmax into regions with small gradients. This is crucial for training stability.",
          "Causal (masked) attention prevents attending to future positions - essential for autoregressive generation. The mask sets attention scores to -∞ before softmax.",
          "Sparse attention patterns reduce quadratic complexity. Examples: local windows, strided patterns, and fixed random connections. These trade some expressivity for efficiency."
        ],
        keyIdeas: [
          "Scaled attention: divide by √d_k for gradient stability",
          "Causal mask: -∞ for future positions in autoregressive models",
          "Relative position biases: encode position information",
          "Efficient variants: sliding window, strided, fixed"
        ],
        equations: [
          "\\[ \\text{Scaled: } \\frac{QK^T}{\\sqrt{d_k}} \\quad \\text{prevents vanishing gradients} \\]",
          "\\[ \\text{Mask: } M_{ij} = 0 \\text{ if } j > i, \\text{ else } -\\infty \\]",
          "\\[ \\text{Relative position: } B_{ij} = f(R_{i-j}) \\text{ learned bias} \\]"
        ],
        references: [
          "Child et al. (2019) - Generating Long Sequences with Sparse Transformers",
          "Kitaev et al. (2020) - Reformer: The Efficient Transformer"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Linear attention uses kernel feature maps to compute attention in O(N) rather than O(N²). This approximates softmax attention with linear complexity.",
          "FlashAttention optimizes attention computation using IO-awareness and tiling, achieving 2-4x speedup with less memory. It computes softmax in blocks without storing the full attention matrix.",
          "State space models (SSMs) can be viewed as a form of linear attention with structured kernels. They offer similar expressivity to attention with RNN-like inference efficiency."
        ],
        keyIdeas: [
          "Linear attention: φ(Q)φ(K)^T V where φ is a feature map",
          "FlashAttention: IO-aware tiling for memory efficiency",
          "SSM attention: structured implicit attention",
          "Performer: positive random features for unbiased estimation"
        ],
        equations: [
          "\\[ \\text{Linear: } \\text{Attn}_{lin}(Q, K, V) = \\frac{\\phi(Q)(\\phi(K)^T V)}{\\phi(Q)\\phi(K)^T} \\]",
          "\\[ \\text{FlashAttention: } O(N^2 d) \\to O(N^2 d^2 / B) \\text{ memory} \\]",
          "\\[ \\text{Kernel: } k(x, y) = \\exp(-\\frac{\\|x-y\\|^2}{2\\sigma^2}) \\]"
        ],
        references: [
          "Dao et al. (2022) - FlashAttention: Fast and Memory-Efficient Exact Attention",
          "Choromanski et al. (2020) - Rethinking Attention with Performers"
        ]
      },
      playground: {
        type: "equation",
        equation: "exp(-x^2/8) * sin(x * 2)",
        xRange: [-5, 5],
        yRange: [-1, 1]
      }
    }
  ]
};

export default chapter;
