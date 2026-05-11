import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "skip-connections",
  title: "Skip Connections",
  description: "Architectural patterns for information flow across layers.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Skip connections (also called shortcut or bypass connections) are architectural elements that connect non-adjacent layers, allowing information to jump over intermediate layers.",
          "They come in several forms: identity skip connections (adding input to output), concatenation skip connections (stacking features), and cross-layer connections (connecting distant layers).",
          "The main benefits are: enabling gradient flow for deeper networks, allowing the network to use both shallow and deep features, and providing alternative paths for information flow."
        ],
        keyIdeas: [
          "Identity skip: y = F(x) + x (addition)",
          "Concatenation skip: y = [F(x), x] (stacking)",
          "Cross-layer: connecting layers far apart in depth",
          "Improves gradient flow in very deep networks"
        ],
        equations: [
          "\\[ \\text{Addition: } y = x + \\mathcal{F}(x) \\]",
          "\\[ \\text{Concatenation: } y = [x; \\mathcal{F}(x)] \\]",
          "\\[ \\text{U-Net skip: } y = \\text{Decoder}(\\text{Encoder}(x)) \\oplus x \\]"
        ],
        references: [
          "Ronneberger et al. (2015) - U-Net",
          "Long et al. (2015) - Fully Convolutional Networks"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "x + a * exp(-(x - b)^2 / 2)",
        sliders: [
          { id: "a", label: "Peak height", min: -2, max: 2, step: 0.1, default: 1 },
          { id: "b", label: "Peak position", min: -3, max: 3, step: 0.1, default: 1 }
        ],
        xRange: [-5, 5],
        yRange: [-3, 5]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "U-Net is the canonical example of skip connections in computer vision. The encoder path captures context, while skip connections preserve spatial information lost during downsampling for precise localization.",
          "DenseNet uses skip connections in a fundamentally different way - every layer receives feature maps from all preceding layers. This creates an implicit deep supervision signal and encourages feature reuse.",
          "Highway networks use gated skip connections where a transform gate controls how much of the output comes from the skip connection versus the transformation. This allows the network to learn when to use the shortcut."
        ],
        keyIdeas: [
          "U-Net: encoder-decoder with skip connections for segmentation",
          "DenseNet: dense connectivity - each layer connects to all subsequent layers",
          "Highway networks: gated bypass for learning when to pass through",
          "Feature reuse: skip connections enable networks to use multi-scale features"
        ],
        equations: [
          "\\[ \\text{U-Net: } c_{i} = \\text{Conv}([e_{i}; d_{i}]) \\]",
          "\\[ \\text{DenseNet: } x_l = H_l([x_0, x_1, ..., x_{l-1}]) \\]",
          "\\[ \\text{Highway: } y = T(x, W_T) \\cdot H(x, W_H) + (1-T(x, W_T)) \\cdot x \\]"
        ],
        references: [
          "Huang et al. (2017) - Densely Connected Convolutional Networks",
          "Srivastava et al. (2015) - Highway Networks"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Theoretically, skip connections can be understood through the lens of dynamical systems - they make optimization easier by creating better-conditioned loss landscapes. The identity path ensures gradients can propagate even when transformations are poor.",
          "Attention-based skip connections (like in Transformers) learn which positions to attend to, providing a learned rather than fixed routing. This is more flexible but computationally heavier.",
          "Recent architectures like ConvNeXt and modern ResNets carefully design skip connections to balance efficiency and performance. The trend is toward simpler, more direct connections."
        ],
        keyIdeas: [
          "Dynamical systems view: residuals as numerical integration",
          "Conditioning: skip connections improve the condition number of the Hessian",
          "Attention-based routing: learned skip weights",
          "Modern design: direct 3x3 convolutions with minimal overhead"
        ],
        equations: [
          "\\[ \\text{Effective depth for gradient: } d_{eff} < d_{actual} \\text{ due to shortcuts} \\]",
          "\\[ \\text{Gradient decomposition: } \\frac{\\partial y}{\\partial x} = I + J_{\\mathcal{F}} \\]",
          "\\[ \\text{Spectral norm bound: } \\|J_{\\mathcal{F}}\\| < 1 \\Rightarrow \\text{stable propagation} \\]"
        ],
        references: [
          "Haber & Ruthotto (2017) - Stable architectures for deep neural networks",
          "Liu et al. (2022) - ConvNeXt: A ConvNet for the 2020s"
        ]
      },
      playground: {
        type: "equation",
        equation: "x + 0.5 * sin(3*x) * exp(-x^2/10)",
        xRange: [-5, 5],
        yRange: [-3, 5]
      }
    }
  ]
};

export default chapter;
