import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "cnn-variants",
  title: "CNN Variants (ResNet, EfficientNet)",
  description: "Evolution of convolutional architectures.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Convolutional Neural Networks (CNNs) revolutionized computer vision by automatically learning spatial hierarchies of features - from edges to textures to objects.",
          "The key idea is using learnable filters that slide across the image. Each filter detects a specific pattern, and stacking many layers lets the network build up complex feature detectors.",
          "ResNet introduced residual connections that made training very deep networks possible. Instead of learning the full mapping, the network learns a residual (difference) from the input."
        ],
        keyIdeas: [
          "Convolution: sliding window operation with learnable filters",
          "Pooling: spatial downsampling to reduce computation and induce translation invariance",
          "Residual blocks: skip connections enabling 100+ layer networks",
          "Modern CNNs stack many convolutional layers with increasing receptive field"
        ],
        equations: [
          "\\[ (f * x)[i,j] = \\sum_{m} \\sum_{n} f[m,n] \\cdot x[i+m, j+n] \\]",
          "\\[ \\text{Output size: } O = \\lfloor \\frac{I - K + 2P}{S} \\rfloor + 1 \\]",
          "\\[ \\text{Receptive field: } r_l = r_{l-1} + (k_l - 1) \\cdot \\prod_{i=0}^{l-1} s_i \\]"
        ],
        references: [
          "LeCun et al. (1998) - Gradient-based learning applied to document recognition",
          "He et al. (2015) - Deep Residual Learning for Image Recognition"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * exp(-((x - b)^2 + (y - c)^2) / 20)",
        sliders: [
          { id: "a", label: "Peak height", min: 0.1, max: 1, step: 0.1, default: 1 },
          { id: "b", label: "X center", min: -3, max: 3, step: 0.1, default: 0 },
          { id: "c", label: "Y center", min: -3, max: 3, step: 0.1, default: 0 }
        ],
        xRange: [-5, 5],
        yRange: [-5, 5]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "EfficientNets use compound scaling - uniformly scaling depth, width, and resolution. This is more effective than scaling one dimension alone because these factors are interdependent.",
          "Key architectural innovations: squeeze-and-excitation blocks (channel attention), inverted residuals (narrow-broad-narrow), and neural architecture search for finding optimal structures.",
          "In practice, transfer learning from ImageNet-pretrained models is standard. The learned features generalize well across vision tasks."
        ],
        keyIdeas: [
          "EfficientNet compound scaling: depth d, width w, resolution r scaled together",
          "Inverted residuals: 1x1 expand → 3x3 depthwise → 1x1 squeeze",
          "Squeeze-and-Excitation: learn channel importance weights",
          "Transfer learning: fine-tune pretrained features for new tasks"
        ],
        equations: [
          "\\[ \\text{Compound scaling: } d = \\alpha^\\phi, w = \\beta^\\phi, r = \\gamma^\\phi \\]",
          "\\[ \\text{SE: } s = \\sigma(W_2 \\cdot \\text{ReLU}(W_1 \\cdot \\text{GAP}(x))) \\]",
          "\\[ \\text{Inverted residual: } y = x + \\text{Conv}_{1 \\times 1}(\\text{Depthwise}(x)) \\]"
        ],
        references: [
          "Tan & Le (2019) - EfficientNet: Rethinking Model Scaling",
          "Hu et al. (2017) - Squeeze-and-Excitation Networks"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Modern CNN architectures like ConvNeXt modernize ResNet designs with modern training techniques. They achieve competitive performance with Transformers while maintaining CNNs' simplicity.",
          "Neural Architecture Search (NAS) has found highly optimized blocks. Once discovered, these are often improved through manual refinement. The searched architectures encode design patterns that transfer across tasks.",
          "Current research explores the intersection of CNNs and Transformers, with convolutions providing local attention and transformers providing global context."
        ],
        keyIdeas: [
          "ConvNeXt: modernized ResNet with 7 design changes matching Transformers",
          "NAS: automated architecture search with reinforcement learning or gradients",
          "RegNet: simple, regularized design space discovered through search",
          "Conv-Transformer hybrids: combining local and global modeling"
        ],
        equations: [
          "\\[ \\text{ConvNeXt stem: } 4\\times4 \\text{ conv, stride 4} \\]",
          "\\[ \\text{GFLOPs scaling: } \\text{GFLOPs} \\propto d \\cdot w^2 \\cdot r^2 \\]",
          "\\[ \\text{MACs: } \\text{MACs} = H \\cdot W \\cdot C_{in} \\cdot k^2 \\cdot C_{out} \\]"
        ],
        references: [
          "Liu et al. (2022) - ConvNeXt: A ConvNet for the 2020s",
          "Radosavovic et al. (2020) - Designing Network Design Spaces"
        ]
      },
      playground: {
        type: "equation",
        equation: "sin(x) * cos(y) * exp(-(x^2 + y^2) / 20)",
        xRange: [-5, 5],
        yRange: [-5, 5]
      }
    }
  ]
};

export default chapter;
