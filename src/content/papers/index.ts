import type { Paper } from "@/types";

export const papers: Paper[] = [
  {
    id: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    authors: [
      "Vaswani",
      "Shazeer",
      "Parmar",
      "Uszkoreit",
      "Jones",
      "Gomez",
      "Kaiser",
      "Polosukhin",
    ],
    year: 2017,
    arxivId: "1706.03762",
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    keyContribution:
      "Replaces recurrence entirely with multi-head self-attention for sequence-to-sequence tasks, enabling massive parallelization and superior performance.",
    prerequisites: ["matrix-multiplication", "softmax"],
    readingModes: ["overview", "deep-dive", "math-heavy", "implementation"],
    sections: [
      {
        id: "attn-why-attention",
        title: "Why Replace Recurrence?",
        order: 1,
        type: "introduction",
        content:
          "Recurrent models process sequences one token at a time — the hidden state at position t depends on position t-1. This sequential nature prevents parallelization during training, which becomes a critical bottleneck for long sequences.\n\nAttention mechanisms allow each position to directly look at all other positions in a single step. The key insight of this paper: if attention alone can capture sequential dependencies, why keep recurrence at all?",
        visibleIn: ["overview", "deep-dive"],
        difficulty: "accessible",
      },
      {
        id: "attn-scaled-dot-product",
        title: "Scaled Dot-Product Attention",
        order: 2,
        type: "math",
        content:
          "The core operation: given queries Q, keys K, and values V, compute attention as a weighted sum of values, where the weights come from the compatibility of each query with each key.\n\nBut there's a subtle problem: when the dimension d_k is large, the dot products Q·Kᵀ grow large in magnitude. This pushes the softmax function into regions where it has extremely small gradients — the model can barely learn.\n\nThe fix is elegant: divide by √d_k to normalize the variance of the dot products back to 1.",
        originalExcerpt:
          "We suspect that for large values of d_k, the dot products grow large in magnitude, pushing the softmax function into regions where it has extremely small gradients.",
        mathematics:
          "\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V",
        visibleIn: ["overview", "deep-dive", "math-heavy"],
        difficulty: "moderate",
        interactions: [
          {
            id: "attn-scale-slider",
            type: "slider",
            description:
              "Adjust d_k and watch the softmax output distribution change",
            ahaMoment:
              "Without scaling, large d_k makes softmax nearly one-hot — the model can't learn",
            config: { param: "d_k", range: [1, 512] },
          },
        ],
      },
      {
        id: "attn-multi-head",
        title: "Multi-Head Attention",
        order: 3,
        type: "method",
        content:
          'Instead of performing a single attention function with d_model-dimensional keys, values, and queries, the paper projects them h times with different learned projections.\n\nEach "head" can attend to different aspects of the input — one head might capture syntactic relationships while another captures semantic ones. The outputs are concatenated and linearly projected.\n\nThis costs roughly the same as single-head attention with full dimensionality, because each head operates on d_model/h dimensions.',
        mathematics:
          "\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h)W^O\n\n\\text{where head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)",
        visibleIn: ["deep-dive", "math-heavy"],
        difficulty: "moderate",
      },
      {
        id: "attn-positional-encoding",
        title: "Positional Encoding",
        order: 4,
        type: "method",
        content:
          "Since the Transformer has no recurrence, it has no inherent notion of token order. Positional encodings are added to the input embeddings to inject position information.\n\nThe paper uses sinusoidal functions of different frequencies — this allows the model to learn relative positions because for any fixed offset k, PE(pos+k) can be represented as a linear function of PE(pos).",
        mathematics:
          "PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)\n\nPE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)",
        visibleIn: ["deep-dive", "math-heavy", "implementation"],
        difficulty: "advanced",
      },
      {
        id: "attn-architecture",
        title: "Full Transformer Architecture",
        order: 5,
        type: "method",
        content:
          "The Transformer follows an encoder-decoder structure:\n\n• Encoder: 6 identical layers, each with multi-head self-attention + feed-forward network, with residual connections and layer normalization.\n\n• Decoder: 6 identical layers, each with masked multi-head self-attention (prevents attending to future positions), encoder-decoder attention, and feed-forward network.\n\nThe feed-forward networks apply two linear transformations with a ReLU in between: FFN(x) = max(0, xW₁ + b₁)W₂ + b₂, with inner dimension 2048 vs model dimension 512.",
        visibleIn: ["deep-dive", "implementation"],
        difficulty: "moderate",
      },
    ],
    annotations: [
      {
        id: "attn-rnn-comparison",
        sectionId: "attn-why-attention",
        type: "connection",
        content:
          "The parallelization advantage is massive: training time dropped from weeks to days compared to RNN-based models.",
        relatedConcepts: [],
      },
      {
        id: "attn-sqrt-dk-insight",
        sectionId: "attn-scaled-dot-product",
        type: "insight",
        content:
          "If each component of q and k is ~N(0,1), then q·k has mean 0 and variance d_k. Dividing by √d_k normalizes this back to variance 1.",
        relatedConcepts: [],
      },
      {
        id: "attn-bahdanau",
        sectionId: "attn-scaled-dot-product",
        type: "historical",
        content:
          "Scaling by √d_k also appears implicitly in Bahdanau attention (2014), but was less critical there because d was much smaller.",
      },
      {
        id: "attn-implementation-note",
        sectionId: "attn-multi-head",
        type: "clarification",
        content:
          "In practice, multi-head attention is implemented as a single large matrix multiplication followed by a reshape, not h separate operations.",
      },
    ],
  },
];

export function getPaperById(id: string): Paper | undefined {
  return papers.find((p) => p.id === id);
}
