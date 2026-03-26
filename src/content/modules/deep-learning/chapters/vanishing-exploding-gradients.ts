import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "vanishing-exploding-gradients",
  title: "Vanishing & Exploding Gradients",
  description: "Instability in deep networks and mitigation strategies.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Vanishing and exploding gradients are two sides of the same coin - both describe gradient instability in deep networks. When gradients vanish, early layers learn too slowly; when they explode, training becomes unstable.",
          "Think of a chain of friends passing a message backwards. If each friend whispers more quietly than they heard it (vanishing), the original message is lost by the time it reaches the end. If they shout louder (exploding), the message gets garbled.",
          "The problem stems from repeated multiplication of derivatives (or weights) during backpropagation. If these are all less than 1, gradients shrink exponentially. If greater than 1, they grow exponentially."
        ],
        keyIdeas: [
          "Vanishing gradients: early layers receive tiny gradients, learn slowly or not at all",
          "Exploding gradients: gradients become too large, causing unstable training",
          "Sigmoid and tanh are particularly prone to vanishing due to small derivatives",
          "ReLU helps but doesn't fully solve the problem in very deep networks"
        ],
        equations: [
          "\\[ \\text{Vanishing: } |\\delta^{(l)}| \\to 0 \\text{ as } l \\to 0 \\text{ when } |\\sigma'| < 1 \\text{ and } |W| < 1 \\]",
          "\\[ \\text{Exploding: } |\\delta^{(l)}| \\to \\infty \\text{ when } |W| > 1 \\]",
          "\\[ \\sigma'(x) \\in (0, 0.25] \\text{ for sigmoid} \\Rightarrow \\text{inherently contracting} \\]"
        ],
        references: [
          "Hochreiter (1991) - Gradient-based learning for long term dependencies",
          "Bengio et al. (1994) - Learning long-term dependencies with gradient descent"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "a * b^x",
        sliders: [
          { id: "a", label: "Initial value", min: 0.1, max: 2, step: 0.1, default: 1 },
          { id: "b", label: "Growth factor", min: 0.5, max: 1.5, step: 0.05, default: 0.9 }
        ],
        xRange: [0, 20],
        yRange: [0, 10]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Modern deep networks mitigate these issues through careful initialization (Xavier/He), activation functions (ReLU, GELU), normalization layers (BatchNorm, LayerNorm), and architectural innovations (residual connections).",
          "LSTM and GRU networks explicitly address vanishing gradients in RNNs through gating mechanisms. The cell state acts as a 'gradient highway' that preserves gradients over long sequences.",
          "Gradient clipping is a simple but effective defense against exploding gradients. By capping the maximum gradient norm, we prevent numerical instability while allowing training to continue."
        ],
        keyIdeas: [
          "LSTM/GRU: gating mechanisms preserve gradient flow over long sequences",
          "Gradient clipping: clip gradients when ‖g‖ > threshold, typically by normalizing",
          "BatchNorm: normalizes layer inputs, stabilizing gradients",
          "Residual connections: skip connections provide alternative gradient paths"
        ],
        equations: [
          "\\[ g \\leftarrow \\begin{cases} \\frac{g \\cdot \\threshold}{\\|g\\|} & \\text{if } \\|g\\| > \\threshold \\\\ g & \\text{otherwise} \\end{cases} \\]",
          "\\[ \\text{LSTM cell state: } c_t = f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t \\]",
          "\\[ \\text{BatchNorm: } \\hat{x} = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\]"
        ],
        references: [
          "Pascanu et al. (2013) - On the difficulty of training Recurrent Neural Networks",
          "He et al. (2015) - Deep Residual Learning for Image Recognition"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced analysis uses spectral theory to understand gradient flow. The spectral norm of weight matrices determines whether gradients explode or vanish. Initialization at the 'edge of chaos' maximizes information propagation.",
          "Normalized layers (PowerNorm, SwitchNorm, GroupNorm) provide alternatives to BatchNorm with different tradeoffs. Understanding their effect on gradient flow is crucial for modern architectures.",
          "Research shows that modern optimizers (Adam, AdamW) and large learning rates can naturally mitigate vanishing gradients, making training more stable even with poor initialization."
        ],
        keyIdeas: [
          "Spectral analysis: eigenvalues of Jacobian determine long-term gradient behavior",
          "Dynamical isometry: condition number near 1 maximizes gradient signal preservation",
          "Normalized optimizers: gradient centralization improves conditioning",
          "Chaos regime: networks at criticality have optimal gradient flow"
        ],
        equations: [
          "\\[ \\text{Spectral radius: } \\rho(J) = \\max_i |\\lambda_i(J)| \\]",
          "\\[ \\text{Edge of chaos: } \\mathbb{E}[W^T W] = I \\text{ and } \\mathbb{E}[\\sigma'(x)^2] = 1 \\]",
          "\\[ \\text{Gradient centralization: } g \\leftarrow g - \\mu(g) \\text{ where } \\mu \\text{ is mean} \\]"
        ],
        references: [
          "Xiao et al. (2018) - Dynamical isometry and mean field theory",
          "Yoshida & Miyato (2017) - Spectral norm regularization"
        ]
      },
      playground: {
        type: "equation",
        equation: "sin(x) * exp(-0.1*x)",
        xRange: [0, 30],
        yRange: [-1, 1]
      }
    }
  ]
};

export default chapter;
