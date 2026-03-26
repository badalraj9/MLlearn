import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "sequence-models",
  title: "Sequence Models",
  description: "RNNs, LSTMs, GRUs, and temporal processing.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Sequence models process data where order matters - text, time series, audio, video. Unlike feedforward networks, they have 'memory' that captures information from previous inputs.",
          "Recurrent Neural Networks (RNNs) process sequences by maintaining a hidden state that's updated at each step. The same weights are used at every time step, allowing the network to handle variable-length sequences.",
          "LSTMs and GRUs were invented to solve the vanishing gradient problem in vanilla RNNs. They use gating mechanisms to control what information to keep, forget, or output."
        ],
        keyIdeas: [
          "RNN: hidden state h_t = f(W·h_{t-1} + U·x_t)",
          "Vanilla RNNs suffer from vanishing/exploding gradients over long sequences",
          "LSTM: Long Short-Term Memory with input, forget, and output gates",
          "GRU: Gated Recurrent Unit - simpler gate structure"
        ],
        equations: [
          "\\[ \\text{RNN: } h_t = \\tanh(W_h h_{t-1} + W_x x_t + b) \\]",
          "\\[ \\text{LSTM: } f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t]) \\]",
          "\\[ c_t = f_t \\odot c_{t-1} + i_t \\odot \\tanh(W_c \\cdot [h_{t-1}, x_t]) \\]"
        ],
        references: [
          "Hochreiter & Schmidhuber (1997) - Long Short-Term Memory",
          "Cho et al. (2014) - Learning Phrase Representations using RNN Encoder-Decoder"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "sin(a * x + b)",
        sliders: [
          { id: "a", label: "Frequency", min: 0.1, max: 3, step: 0.1, default: 1 },
          { id: "b", label: "Phase", min: 0, max: 6.28, step: 0.1, default: 0 }
        ],
        xRange: [0, 20],
        yRange: [-2, 2]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Bidirectional RNNs process sequences in both directions, giving the network context from both past and future. Essential for tasks like named entity recognition where full context matters.",
          "Encoder-decoder architectures (seq2seq) encode an input sequence into a context vector, then decode it to an output sequence. Used for translation, summarization, and question answering.",
          "Attention mechanisms revolutionized seq2seq models by allowing the decoder to look at all encoder states, weighted by relevance. This solved the bottleneck of compressing everything into one context vector."
        ],
        keyIdeas: [
          "Bidirectional: concatenate forward and backward hidden states",
          "Seq2seq: encoder produces context, decoder generates output",
          "Attention: weighted sum of encoder states based on relevance",
          "Teacher forcing: use ground truth as decoder input during training"
        ],
        equations: [
          "\\[ \\vec{h}_t = [\\overrightarrow{h}_t; \\overleftarrow{h}_t] \\]",
          "\\[ \\text{Attention: } a_{ij} = \\frac{\\exp(e_{ij})}{\\sum_k \\exp(e_{ik})} \\]",
          "\\[ c_i = \\sum_j \\alpha_{ij} h_j \\quad \\text{(context from attention)} \\]"
        ],
        references: [
          "Bahdanau et al. (2014) - Neural Machine Translation by Jointly Learning to Align and Translate",
          "Vaswani et al. (2017) - Attention Is All You Need"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Modern architectures like Transformers have largely replaced LSTMs for sequence tasks. They use self-attention to capture dependencies directly, without sequential computation.",
          "State space models (SSMs) like Mamba offer an alternative that combines the benefits of RNNs (linear time inference) with attention-like global context. They're emerging as competitors to Transformers.",
          "Hierarchical RNNs process sequences at multiple time scales, similar to how the brain processes information. This can be more efficient for very long sequences."
        ],
        keyIdeas: [
          "Transformers: self-attention for global context, parallel computation",
          "State space models: continuous-time representations with RNN efficiency",
          "QRNN: quasi-recurrent neural networks combining convolutions and recurrence",
          "Chunking: process sequence in chunks for efficiency"
        ],
        equations: [
          "\\[ \\text{S4/SSM: } h' = A h + B x, \\quad y = C h + D x \\]",
          "\\[ \\text{Linear attention: } \\text{Attn}(Q, K, V) = (\\phi(Q) \\cdot \\phi(K)^T) V \\]",
          "\\[ \\text{Efficiency: } O(N^2) \\to O(N) \\text{ with linear attention or SSMs} \\]"
        ],
        references: [
          "Gu et al. (2022) - Efficiently Modeling Long Sequences with State Space Models",
          "Katharopoulos et al. (2020) - Transformers are RNNs"
        ]
      },
      playground: {
        type: "equation",
        equation: "sin(x/2) + 0.5*sin(3*x)",
        xRange: [0, 20],
        yRange: [-2, 2]
      }
    }
  ]
};

export default chapter;
