import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "diffusion-unets",
  title: "Diffusion U-Nets",
  description: "U-Net architectures used in diffusion-based generation.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "U-Nets were originally designed for medical image segmentation but became the backbone of modern diffusion models. Their encoder-decoder structure with skip connections is perfect for predicting noise at various resolutions.",
          "In diffusion models, the U-Net takes a noisy image and predicts the noise to remove. The encoder path extracts features at multiple scales, while the decoder reconstructs the image with guidance from those features.",
          "The skip connections directly connect encoder features to decoder at the same resolution, preserving fine details lost during downsampling. This is crucial for generating high-quality images."
        ],
        keyIdeas: [
          "Encoder-decoder: downsampling path captures context, upsampling path localizes",
          "Skip connections: preserve spatial information across resolutions",
          "Residual blocks: used between skip connections for better gradient flow",
          "Attention: added at bottleneck for global context"
        ],
        equations: [
          "\\[ x_{enc}^{(i)} \\to x_{dec}^{(i)} \\quad \\text{(skip connection at same resolution)} \\]",
          "\\[ \\epsilon_\\theta(x_t, t) \\to \\text{predict noise from noisy input} \\]",
          "\\[ x_{t-1} = \\frac{1}{\\sqrt{\\alpha_t}}(x_t - \\frac{1-\\alpha_t}{\\sqrt{1-\\bar{\\alpha}_t}}\\epsilon_\\theta) + \\sigma_t z \\]"
        ],
        references: [
          "Ronneberger et al. (2015) - U-Net: Convolutional Networks for Biomedical Image Segmentation",
          "Ho et al. (2020) - Denoising Diffusion Probabilistic Models"
        ]
      },
      playground: {
        type: "slider",
        graphFn: "exp(-a * x^2)",
        sliders: [
          { id: "a", label: "Concentration", min: 0.1, max: 2, step: 0.1, default: 1 }
        ],
        xRange: [-3, 3],
        yRange: [0, 1.5]
      }
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Diffusion U-Nets use several key modifications: time embeddings (sinusoidal or learned) to condition on timestep, group normalization for training stability, and attention blocks for global coherence.",
          "The architecture must handle both high and low resolution features effectively. This is achieved through progressively increasing channels in encoder and adding residual blocks at each resolution.",
          "Modern implementations like Stable Diffusion's U-Net run in latent space rather than pixel space, dramatically reducing computation while maintaining quality."
        ],
        keyIdeas: [
          "Time embedding: sinusoidal positional encoding for timestep conditioning",
          "GroupNorm: stable training across batch sizes",
          "Cross-attention: conditioning on text embeddings for text-to-image",
          "Latent diffusion: operate in VAE latent space for efficiency"
        ],
        equations: [
          "\\[ \\gamma(t) = \\text{sin}(t) + \\text{cos}(t) \\quad \\text{(time embedding)} \\]",
          "\\[ \\text{Cross-attn: } A = \\text{softmax}(\\frac{Q K^T}{\\sqrt{d}}) V_{text} \\]",
          "\\[ \\text{Latent: } \\mathcal{L} = \\mathbb{E}_{\\epsilon,x,t}[\\|\\epsilon - \\epsilon_\\theta(z_t, t)\\|^2] \\]"
        ],
        references: [
          "Rombach et al. (2022) - High-Resolution Image Synthesis with Latent Diffusion Models",
          "Peebles & Xie (2023) - Scalable Diffusion Models with Transformers"
        ]
      }
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Diffusion Transformers (DiT) replace the U-Net architecture with a standard transformer, showing that the success of diffusion is not tied to convolutional inductive biases.",
          "Advanced techniques include classifier-free guidance (mixing conditional and unconditional predictions), noise schedule optimization, and adaptive layer normalization.",
          "Current research explores diffusion as a general-purpose generator that can condition on various modalities - audio, video, 3D - using the same underlying architecture."
        ],
        keyIdeas: [
          "DiT: pure transformer architecture for diffusion",
          "Classifier-free guidance: interpolated conditioning for better quality",
          "Rectified flow: straight-line interpolation for faster sampling",
          "Consistency models: single-step generation from diffusion models"
        ],
        equations: [
          "\\[ \\text{DiT: } x_{t-1} = \\text{Transformer}(x_t, \\gamma(t), c) \\]",
          "\\[ \\hat{\\epsilon} = (1+w)\\epsilon_c - w\\epsilon_u \\quad \\text{(guidance)} \\]",
          "\\[ \\text{Rectified flow: } x_1 = x_0 + \\int_0^1 (v(x_t, t) - x_t) dt \\]"
        ],
        references: [
          "Peebles & Xie (2023) - DiT: Scalable Diffusion Models with Transformers",
          "Liu et al. (2022) - Consistency Models"
        ]
      },
      playground: {
        type: "equation",
        equation: "exp(-x^2/8) * (1 + 0.3*sin(3*x))",
        xRange: [-5, 5],
        yRange: [0, 1.5]
      }
    }
  ]
};

export default chapter;
