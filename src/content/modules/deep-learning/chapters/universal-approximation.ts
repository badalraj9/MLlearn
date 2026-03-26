import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "universal-approximation",
  title: "Universal Approximation Theorem",
  description: "Why neural networks can represent any function.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The Universal Approximation Theorem is one of the most important theoretical results in deep learning. It tells us that a neural network with just one hidden layer can approximate any continuous function - given enough neurons.",
          "Think of a neural network like a Lego set. Each neuron is a simple building block that can detect a specific pattern. Combine enough of them together, and you can build almost anything - just like combining Lego blocks lets you build complex structures.",
          "The key insight is that this theorem guarantees such approximations exist, but doesn't tell us how to find them through training. It's like knowing a solution exists without knowing what it is."
        ],
        keyIdeas: [
          "A single hidden layer network can approximate any continuous function",
          "The width (number of neurons) matters for the approximation quality",
          "Activation functions must be non-polynomial (like sigmoid, ReLU)",
          "The theorem guarantees existence, not how to learn the weights"
        ],
        equations: [
          "\\[ f(x) \\approx \\sum_{i=1}^{N} w_i \\cdot \\sigma(b_i + v_i \\cdot x) \\]",
          "\\[ \\text{where } \\sigma \\text{ is a non-polynomial activation function} \\]"
        ],
        references: [
          "3Blue1Brown - But what is a neural network?",
          "Michael Nielsen - Neural Networks and Deep Learning"
        ],
        ahaInsights: [
          "The theorem is existence proof - it says a network CAN exist that approximates any function, but training is the hard part of actually FINDING those weights!"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a / (1 + exp(-b * (x - c)))",
        sliders: [
          { id: "a", label: "Amplitude", min: 0.1, max: 3, step: 0.1, default: 1 },
          { id: "b", label: "Steepness", min: 0.1, max: 5, step: 0.1, default: 1 },
          { id: "c", label: "Shift", min: -3, max: 3, step: 0.1, default: 0 }
        ],
        xRange: [-5, 5],
        yRange: [-2, 4]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Formally, the universal approximation theorem states that feedforward networks with a single hidden layer of finite width can approximate continuous functions on compact subsets of ℝⁿ, provided the activation function is non-polynomial.",
          "The theorem has been extended in important ways: width (Universal Approximation Theorem by Lin & Jegelka) showed that ResNet-type networks with width n+1 can approximate any continuous function. Depth matters too - deeper networks can represent certain functions more efficiently.",
          "In practice, we use modern architectures (Transformers, CNNs, RNNs) not because shallow networks can't represent functions, but because they learn representations more efficiently and generalize better."
        ],
        keyIdeas: [
          "Universal approximation holds for various activation functions: sigmoid, tanh, ReLU, GELU",
          "The required width depends on input dimension and target accuracy",
          "Width-based universality: wide shallow networks can approximate anything",
          "Depth-based universality: certain function classes need exponential width in shallow networks but can be represented compactly with depth",
          "In practice, we use deeper networks because they are more parameter efficient and learn hierarchical features"
        ],
        equations: [
          "\\[ \\forall \\epsilon > 0, \\exists N, w_i, b_i, v_i: \\|f(x) - \\sum w_i \\sigma(v_i \\cdot x + b_i)\\|_\\infty < \\epsilon \\]",
          "\\[ \\text{Universal Approximation (Width): } width = n+1 \\text{ suffices for ResNet-style blocks} \\]"
        ],
        references: [
          "Hornik et al. (1989) - Multilayer feedforward networks are universal approximators",
          "Lin & Jegelka (2018) - ResNet with width n+1 is universal approximator",
          "Eldan & Shamir (2015) - The power of depth for feedforward networks"
        ],
        ahaInsights: [
          "Why do we use deep networks if shallow ones can theoretically approximate anything? Because depth gives us compositionality - the ability to build complex functions from simpler ones, which matches how natural data is structured (edges → textures → objects → scenes)."
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The classical universal approximation theorem has several variants: (1) the Stone-Weierstrass theorem approach using sigmoid activations, (2) results for continuous activation functions, (3) width-based universality for ResNet architectures, and (4) approximation rates showing how quickly the approximation error decays with network size.",
          "Recent research has focused on understanding the approximation properties of specific architectures. Transformer networks with attention can approximate any permutation-invariant function. Graph neural networks can approximate functions on graphs under certain conditions.",
          "Open questions remain about the optimal architecture for specific function classes, the relationship between approximation error and generalization, and the role of depth in achieving efficient approximations."
        ],
        keyIdeas: [
          "Approximation rates: for smooth functions, depth can achieve exponential improvement in approximation efficiency compared to shallow networks",
          "Barron's theorem: gives bounds on approximation error for functions with bounded first moments of Fourier transform",
          "Neural Tangent Kernel (NTK) regime: wide networks behave like kernel methods, connecting deep learning to classical approximation theory",
          "Expressiveness of attention: Transformers can approximate any permutation-invariant function with sufficient width",
          "Depth separation: there exist functions that require exponential width for shallow networks but polynomial width for deep networks"
        ],
        equations: [
          "\\[ \\text{Barron's Theorem: } |f(x) - \\hat{f}(x)| \\leq C \\cdot \\frac{\\|\\nabla f\\|_1}{m} \\]",
          "\\[ \\text{Depth-efficiency: } \\text{Deep ReLU networks can represent piecewise linear functions with } O(\\log n) \\text{ regions using } O(n) \\text{ parameters} \\]"
        ],
        references: [
          "Lu et al. (2017) - The universal approximation theorem for width-bounded ReLU networks",
          "Yarotsky (2017) - Error bounds for approximations by deep ReLU networks",
          "Khrulkov et al. (2020) - Expressiveness of Transformers"
        ]
      },
      playground: {
        type: "equation",
        equation: "sin(3*x) * exp(-x^2/5)",
        xRange: [-5, 5],
        yRange: [-2, 2]
      }
    }
  ]
};

export default chapter;
