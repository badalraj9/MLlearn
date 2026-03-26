import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "gradient-flow",
  title: "Gradient Flow",
  description: "How gradients propagate through deep networks.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Gradient flow describes how information (gradients) travels backward through a neural network during training. Understanding this flow is crucial for designing architectures that train effectively.",
          "Imagine water flowing backwards through a series of pipes. The pipes represent network layers, and the water represents gradients. If some pipes are narrow (small derivatives), less water gets through; if they're wide, more flows.",
          "The product of all local derivatives along the backward path determines how much gradient reaches the early layers. This is why very deep networks can be hard to train - gradients can get amplified or diminished exponentially."
        ],
        keyIdeas: [
          "Gradients multiply as they flow backwards through layers",
          "The magnitude of the product of derivatives determines flow strength",
          "Stable gradient flow is essential for training deep networks",
          "Skip connections provide 'highways' for gradient flow"
        ],
        equations: [
          "\\[ \\frac{\\partial L}{\\partial x^{(l-1)}} = \\frac{\\partial L}{\\partial x^{(l)}} \\cdot \\prod_{i=l}^{L} W^{(i)} \\cdot \\sigma' \\]",
          "\\[ \\text{Gradient magnitude } |\\delta^{(l)}| \\approx |\\delta^{(L)}| \\cdot \\prod_{i=l}^{L} |W^{(i)}| \\cdot |\\sigma'| \\]"
        ],
        references: [
          "Goodfellow et al. - Deep Learning, Ch. 8",
          "Sedghi et al. - The Singular Values of Convolutional Layers"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * exp(-b * x)",
        sliders: [
          { id: "a", label: "Initial magnitude", min: 0.1, max: 3, step: 0.1, default: 1 },
          { id: "b", label: "Decay rate", min: 0, max: 1, step: 0.05, default: 0.1 }
        ],
        xRange: [0, 20],
        yRange: [0, 3]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The gradient flow through a network depends on weight initialization, activation functions, and network architecture. Proper initialization ensures that signals (both forward and backward) maintain reasonable magnitudes.",
          "Xavier initialization sets initial weights with variance 2/(n_in + n_out) for sigmoid/tanh, helping gradients flow properly. For ReLU activations, He initialization uses variance 2/n_in to account for the halved variance.",
          "The mean field theory analyzes gradient flow in random networks, showing that deep networks behave like dynamical systems with fixed points determined by initialization scales."
        ],
        keyIdeas: [
          "Xavier/Glorot initialization: variance = 2/(n_in + n_out) for tanh",
          "He initialization: variance = 2/n_in for ReLU",
          "Critical initialization: at the edge of chaos, networks have maximum gradient flow",
          "Mean field theory predicts trainability of random networks"
        ],
        equations: [
          "\\[ \\text{Xavier: } W \\sim \\mathcal{N}(0, \\frac{2}{n_{in} + n_{out}}) \\]",
          "\\[ \\text{He: } W \\sim \\mathcal{N}(0, \\frac{2}{n_{in}}) \\]",
          "\\[ \\text{Signal propagation: } q = \\mathbb{E}[(W x)^2] \\cdot \\mathbb{E}[\\sigma'(z)^2] \\]"
        ],
        references: [
          "Glorot & Bengio (2010) - Understanding the difficulty of training deep feedforward networks",
          "Schoenholz et al. (2016) - Deep information propagation"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced analysis of gradient flow involves studying the Jacobian of the network, spectral norm of weight matrices, and edge of chaos dynamics. The conditioning of the Jacobian affects both gradient flow and representability.",
          "For residual networks, the residual connection ensures gradient flow even when the main path has small derivatives. The effective depth seen by gradients is reduced, making training easier.",
          "Normalization layers (BatchNorm, LayerNorm) explicitly control gradient magnitudes by normalizing activations, which stabilizes flow but can introduce training-inference discrepancies."
        ],
        keyIdeas: [
          "Spectral norm bounds: ‖J‖_2 controls gradient explosion rate",
          "Edge of chaos: maximum information propagation at critical initialization",
          "Residual networks: gradient superpowers enable 1000+ layer training",
          "Jacobian analysis reveals singular values affecting flow and expressivity"
        ],
        equations: [
          "\\[ \\text{Spectral norm: } \\|J\\|_2 = \\sigma_1(W^{(1)}) \\cdot \\ldots \\cdot \\sigma_1(W^{(L)}) \\]",
          "\\[ \\text{Residual block: } x_{l+1} = x_l + f(x_l) \\Rightarrow \\frac{\\partial L}{\\partial x_l} = \\frac{\\partial L}{\\partial x_{L}} + \\frac{\\partial L}{\\partial f} \\]"
        ],
        references: [
          "Pennington et al. (2017) - Resurrecting the sigmoid",
          "Xiao et al. (2018) - Dynamical isometry in ResNets"
        ]
      },
      playground: {
        type: "equation",
        equation: "exp(-0.1*x) * sin(x)",
        xRange: [0, 30],
        yRange: [-1, 1]
      }
    }
  ]
};

export default chapter;
