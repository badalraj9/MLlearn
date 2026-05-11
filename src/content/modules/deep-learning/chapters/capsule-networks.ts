import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "capsule-networks",
  title: "Capsule Networks",
  description: "Encoding part-whole relationships in networks.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Capsule networks (CapsNets) were introduced to address a key limitation of CNNs: they don't handle pose (position, orientation, scale) well. A cat rotated 90 degrees looks completely different to a CNN but should look the same to us.",
          "A capsule is a group of neurons whose activity vector represents the instantiation parameters of a specific type of entity. When a lower-level capsule agrees on the pose of a higher-level entity, that higher-level capsule becomes active.",
          "The key innovation is dynamic routing - lower-level capsules send their output to higher-level capsules that agree with their prediction. This is a form of attention that learns part-whole relationships."
        ],
        keyIdeas: [
          "Capsule: vector of neurons representing entity instantiation",
          "Routing by agreement: lower capsules route to higher based on prediction match",
          "Equivariance: small change in input leads to small change in output vector",
          "Handles pose: explicitly models position and orientation"
        ],
        equations: [
          "\\[ \\text{Capsule output: } u = \\|W u_i\\| \\cdot \\sigma(W u_i) \\]",
          "\\[ \\hat{u}_{j|i} = W_{ij} u_i \\quad \\text{(prediction from i to j)} \\]",
          "\\[ c_{ij} = \\text{softmax}(b_{ij}) \\quad \\text{(routing coefficients)} \\]"
        ],
        references: [
          "Sabour et al. (2017) - Dynamic Routing Between Capsules",
          "Hinton et al. (2018) - Matrix Capsules with EM Routing"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * sin(b * x + c)",
        sliders: [
          { id: "a", label: "Amplitude", min: 0.1, max: 2, step: 0.1, default: 1 },
          { id: "b", label: "Frequency", min: 0.5, max: 3, step: 0.1, default: 1 },
          { id: "c", label: "Phase", min: 0, max: 6.28, step: 0.1, default: 0 }
        ],
        xRange: [0, 10],
        yRange: [-2, 2]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The original CapsNet uses a convolutional backbone followed by a primary capsule layer and a digit capsule layer. Routing iterations (typically 3) determine how lower capsules contribute to higher ones.",
          "Capsule networks have shown promise in few-shot learning, where the ability to learn part-whole relationships helps generalize from few examples. They've also been applied to image segmentation.",
          "However, CapsNets are computationally more expensive than CNNs and haven't yet scaled to the same level. The routing algorithm is the main computational bottleneck."
        ],
        keyIdeas: [
          "Architecture: Conv → PrimaryCaps → DigitCaps → Reconstruction",
          "Routing: 3 iterations of softmax-based routing",
          "Margin loss: separate loss per digit capsule",
          "Reconstruction: decoder regularizes learning"
        ],
        equations: [
          "\\[ L_c = T_c \\max(0, m^+ - \\|v_c\\|)^2 + \\lambda(1-T_c) \\max(0, \\|v_c\\| - m^-)^2 \\]",
          "\\[ v_j = \\frac{\\|\\hat{u}_{j|i}\\|^2}{1 + \\|\\hat{u}_{j|i}\\|^2} \\frac{\\hat{u}_{j|i}}{\\|\\hat{u}_{j|i}\\|} \\]",
          "\\[ \\text{Squashing function ensures short vectors near 0, long near 1} \\]"
        ],
        references: [
          "Sabour et al. (2017) - Dynamic Routing Between Capsules",
          "LaLonde & Bagci (2022) - CapsNets for Medical Imaging"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "EM (Expectation-Maximization) routing uses a different algorithm based on Gaussian mixture models. It treats each capsule as a cluster center and uses soft clustering to route signals.",
          "Self-attention can be viewed as a form of capsule routing. The query-key-value mechanism is analogous to prediction and agreement in capsule networks.",
          "Recent work explores combining capsules with transformers, using capsule routing for more structured attention. Others apply capsule ideas to other domains like NLP and graph learning."
        ],
        keyIdeas: [
          "EM routing: Gaussian mixture model interpretation",
          "Capsule attention: transformer with routing-inspired attention",
          "3D CapsNets: handling 3D point clouds and meshes",
          "Subspace capsules: clusters in activation space"
        ],
        equations: [
          "\\[ \\text{EM step: } \\beta_{ij} \\leftarrow \\text{log sum-exp}(M_i \\cdot \\hat{u}_{j|i}) \\]",
          "\\[ \\text{Routing by agreement: } b_{ij} \\leftarrow b_{ij} + \\hat{u}_{j|i} \\cdot v_j \\]",
          "\\[ \\text{Capsule transformer: } \\text{Attn}_{cap}(Q, K, V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d}}) V \\]"
        ],
        references: [
          "Hinton et al. (2018) - Matrix Capsules with EM Routing",
          "Kim et al. (2021) - Capsule Graph Neural Networks"
        ]
      },
      playground: {
        type: "equation",
        equation: "sin(x) + 0.5*sin(2.5*x)",
        xRange: [0, 10],
        yRange: [-2, 2]
      }
    }
  ]
};

export default chapter;
