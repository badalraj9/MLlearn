import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "graph-attention-networks",
  title: "Graph Attention Networks",
  description: "Attention mechanisms on graph-structured data.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Graph Neural Networks (GNNs) process data with irregular structure - molecules, social networks, recommendation graphs. Unlike images or text, graphs have no natural ordering and varying connectivity.",
          "Graph Attention Networks (GAT) apply attention to graph data, allowing nodes to learn how much to attend to their neighbors. This is more flexible than message passing with equal weights.",
          "The attention mechanism learns edge importance from data, making GATs more expressive than plain GNNs. Different edges can carry different amounts of information."
        ],
        keyIdeas: [
          "Graph structure: nodes connected by edges, can be directed or undirected",
          "Message passing: nodes aggregate information from neighbors",
          "Attention: learn edge weights from node features",
          "Inductive learning: can generalize to unseen graph structures"
        ],
        equations: [
          "\\[ \\alpha_{ij} = \\frac{\\exp(\\text{LeakyReLU}(a[Wh_i || Wh_j]))}{\\sum_{k \\in \\mathcal{N}_i} \\exp(\\text{LeakyReLU}(a[Wh_i || Wh_k]))} \\]",
          "\\[ h_i' = \\sigma(\\sum_{j \\in \\mathcal{N}_i} \\alpha_{ij} W h_j) \\]",
          "\\[ \\mathcal{N}_i \\text{ is the neighborhood of node } i \\]"
        ],
        references: [
          "Veličković et al. (2018) - Graph Attention Networks",
          "Wu et al. (2020) - A Comprehensive Survey on Graph Neural Networks"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "exp(-a * x)",
        sliders: [
          { id: "a", label: "Decay rate", min: 0, max: 1, step: 0.05, default: 0.3 }
        ],
        xRange: [0, 10],
        yRange: [0, 1.5]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Multi-head attention uses multiple attention heads in parallel, then concatenates or averages their outputs. Each head can learn different types of relationships between nodes.",
          "Various GNN architectures exist: GCN (graph convolutional networks), GAT (attention), GraphSAGE (sampling neighbors), and GIN (graph isomorphism networks). Each makes different assumptions about graph structure.",
          "Practical applications include molecular property prediction, fraud detection, recommendation systems, and traffic prediction."
        ],
        keyIdeas: [
          "Multi-head: K attention heads, concatenate or average",
          "GraphSAGE: sample and aggregate from neighbors",
          "Message passing neural networks: general framework for GNNs",
          "Pooling: graph-level outputs via readout functions"
        ],
        equations: [
          "\\[ \\text{Multi-head: } h_i' = ||_{k=1}^K \\sigma(\\sum_{j \\in \\mathcal{N}_i} \\alpha_{ij}^k W^k h_j) \\]",
          "\\[ \\text{GraphSAGE: } h_i' = \\sigma(W \\cdot \\text{AGG}(\\{h_j, \\forall j \\in \\mathcal{N}_i\\})) \\]",
          "\\[ \\text{Readout: } h_G = \\text{AGG}(\\{h_i', \\forall i \\in V\\}) \\]"
        ],
        references: [
          "Hamilton et al. (2017) - Inductive Representation Learning on Large Graphs",
          "Xu et al. (2019) - How Powerful are Graph Neural Networks?"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Graph Transformers remove the message passing paradigm entirely, treating graphs as fully connected and using attention to learn structure. This allows modeling long-range dependencies.",
          "Positional encodings for graphs are an active research area. Techniques include Laplacian eigenvectors, random walk encodings, and learnable position embeddings.",
          "Expressiveness of GNNs is tied to the Weisfeiler-Lehman hierarchy. GAT can distinguish more graphs than GCN but is still limited compared to transformers."
        ],
        keyIdeas: [
          "Graph Transformer: global attention over all nodes",
          "Structural encodings: capture graph topology",
          "WL test: measure of GNN expressiveness",
          "Heterogeneous graphs: different node/edge types"
        ],
        equations: [
          "\\[ \\text{Graph Transformer: } h_i' = \\sum_{j \\in V} \\alpha_{ij} V h_j \\]",
          "\\[ \\text{Laplacian PE: } L = U \\Lambda U^T, \\quad PE = U[:, 1:k] \\]",
          "\\[ \\text{WL-1: } \\text{colors}^{(t+1)} = \\text{hash}(\\text{colors}^{(t)}, \\text{neighbors}) \\]"
        ],
        references: [
          "Yun et al. (2019) - Graph Transformer Networks",
          "Dwivedi & Bresson (2021) - A Generalization of Transformer Networks to Graphs"
        ]
      },
      playground: {
        type: "equation",
        equation: "sin(x) * exp(-0.1*x)",
        xRange: [0, 15],
        yRange: [-1, 1]
      }
    }
  ]
};

export default chapter;
