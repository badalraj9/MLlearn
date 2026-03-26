import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "vision-transformers",
  title: "Vision Transformers",
  description: "Applying transformer architecture to visual data.",
  prerequisites: ["sequence-models", "attention-variants"],
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Vision Transformers treat an image as a sequence of patches. Instead of convolving a small filter across the image, ViT chops the image into fixed-size squares, embeds each patch, and lets self-attention decide which patches should communicate.",
          "The conceptual leap is that images can be processed like token sequences. A 224 by 224 image split into 16 by 16 patches becomes 196 visual tokens, plus optionally a class token for classification.",
          "The price of this flexibility is weaker built-in inductive bias. CNNs naturally encode locality and translation structure, while ViTs have to learn those patterns from data or pretraining.",
        ],
        keyIdeas: [
          "An image is converted into a sequence of patch embeddings.",
          "Self-attention lets every patch attend to every other patch.",
          "Positional embeddings restore spatial order that patch flattening would otherwise lose.",
          "ViTs are flexible but usually need more data or stronger pretraining than CNNs.",
        ],
        equations: [
          "\\[ N = \\frac{H W}{P^2} \\quad \\text{patch tokens for patch size } P \\]",
          "\\[ z_0 = [x_{cls}; x_p^1 E; \\dots; x_p^N E] + E_{pos} \\]",
          "\\[ \\mathrm{Attn}(Q,K,V) = \\mathrm{softmax}\\left(\\frac{QK^T}{\\sqrt{d}}\\right)V \\]",
        ],
        ahaInsights: [
          "A ViT is not 'an image model without convolutions'. It is an attention model whose input tokens happen to come from patches.",
          "Patchification removes local structure by default, which is why positional information and pretraining matter so much.",
        ],
        equationSteps: [
          {
            latex: "\\[ x \\in \\mathbb{R}^{H \\times W \\times C} \\]",
            explanation: "Start with the input image tensor.",
          },
          {
            latex: "\\[ x \\to (x_p^1, \\dots, x_p^N) \\]",
            explanation: "Split the image into N non-overlapping patches.",
          },
          {
            latex: "\\[ x_p^i E \\in \\mathbb{R}^D \\]",
            explanation: "Flatten each patch and project it into an embedding space of dimension D.",
          },
          {
            latex: "\\[ z_0 = [x_{cls}; x_p^1 E; \\dots; x_p^N E] + E_{pos} \\]",
            explanation: "Add a classification token and positional embeddings before sending the sequence into the transformer.",
          },
        ],
        quiz: [
          {
            id: "vit-foundation-1",
            question: "Why are positional embeddings needed in ViTs?",
            options: [
              "Because patch tokens by themselves do not preserve spatial order",
              "Because they reduce parameter count",
              "Because attention only works on square matrices",
              "Because they replace the patch embedding matrix",
            ],
            correctIndex: 0,
            explanation: "Once patches are flattened into a sequence, positional information must be reintroduced explicitly.",
          },
          {
            id: "vit-foundation-2",
            question: "What is a major inductive bias CNNs have that plain ViTs largely lack?",
            options: [
              "Built-in locality and translation structure",
              "The ability to use matrix multiplication",
              "Backpropagation support",
              "Support for classification losses",
            ],
            correctIndex: 0,
            explanation: "CNNs encode local spatial structure directly through convolutions.",
          },
        ],
        references: [
          "Dosovitskiy et al. (2021) - An Image is Worth 16x16 Words",
          "Vaswani et al. (2017) - Attention Is All You Need",
        ],
      },
      playground: {
        type: "widget",
        widgetId: "attention-scale-slider",
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In practice, ViTs became competitive only after better training recipes and pretraining strategies appeared. DeiT showed that careful augmentation and distillation could make ViTs data-efficient enough for ImageNet-scale training.",
          "Self-supervised learning then pushed them much further. Methods like MAE and DINO let ViTs learn strong visual structure without labels, which is especially important because transformers benefit heavily from large-scale pretraining.",
          "The practical comparison with CNNs is not simply 'which one is better'. It is about regime. CNNs are still strong when data is limited and local bias helps; ViTs shine when scale, transfer, and global context matter more.",
        ],
        keyIdeas: [
          "DeiT improved ViT training with distillation and stronger recipes.",
          "MAE learns by reconstructing heavily masked patches.",
          "DINO-style self-distillation produces strong visual representations without labels.",
          "Swin and related models add hierarchy or locality to make attention more efficient.",
        ],
        equations: [
          "\\[ \\mathcal{L}_{MAE} = \\|x - D(f(x \\odot M))\\|^2 \\]",
          "\\[ \\mathcal{L}_{distill} = \\alpha \\mathcal{L}_{label} + (1-\\alpha) \\mathcal{L}_{teacher} \\]",
          "\\[ \\text{windowed attention reduces cost relative to global attention} \\]",
        ],
        ahaInsights: [
          "ViT performance is as much a story about pretraining as it is about architecture.",
          "Many successful vision transformers quietly reintroduce locality after initially removing it.",
        ],
        quiz: [
          {
            id: "vit-applied-1",
            question: "What made ViTs much more practical on moderate-scale vision datasets?",
            options: [
              "Better training recipes and strong pretraining or distillation",
              "Removing positional embeddings",
              "Using only grayscale images",
              "Replacing attention with nearest neighbors only",
            ],
            correctIndex: 0,
            explanation: "Training strategy was a major part of making ViTs effective, not just the architecture itself.",
          },
        ],
        references: [
          "Touvron et al. (2021) - Training data-efficient image transformers",
          "He et al. (2022) - Masked Autoencoders Are Scalable Vision Learners",
          "Caron et al. (2021) - Emerging Properties in Self-Supervised Vision Transformers",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The advanced ViT story is about scaling and foundation models. Once transformers became strong image encoders, they connected naturally to multimodal training, segmentation, detection, and zero-shot transfer.",
          "This led to systems like CLIP, Segment Anything, and large multimodal encoders, where the backbone is not trained for one narrow task but for broad transfer. In that regime, architecture design, data quality, and objective design are tightly coupled.",
          "The deeper research question is which inductive biases should be learned from data and which should still be built in. Modern vision models increasingly mix both approaches instead of choosing only one.",
        ],
        keyIdeas: [
          "Large-scale ViTs became backbone models for multimodal and transfer-heavy systems.",
          "Contrastive training aligns vision and language representations.",
          "Hierarchical and efficient transformer variants reduce the cost of dense visual prediction.",
          "The CNN versus ViT debate has largely shifted into hybrid design space rather than winner-take-all architecture battles.",
        ],
        equations: [
          "\\[ s(I,T) = \\frac{I \\cdot T^T}{\\tau} \\]",
          "\\[ \\mathcal{L}_{contrastive} = -\\log \\frac{\\exp(s(I,T)/\\tau)}{\\sum_{T'} \\exp(s(I,T')/\\tau)} \\]",
          "\\[ \\text{performance} \\uparrow \\text{ with scale, but data and objective quality matter too} \\]",
        ],
        quiz: [
          {
            id: "vit-advanced-1",
            question: "What best explains why ViTs became central to multimodal foundation models?",
            options: [
              "Their token-based representation fits naturally with transformer-style alignment across modalities",
              "They eliminate the need for pretraining",
              "They guarantee better performance than CNNs in every small-data regime",
              "They do not require positional information",
            ],
            correctIndex: 0,
            explanation: "Patch tokens and attention-based representations integrate naturally into multimodal transformer pipelines.",
          },
        ],
        references: [
          "Radford et al. (2021) - Learning Transferable Visual Models From Natural Language Supervision",
          "Kirillov et al. (2023) - Segment Anything",
          "Liu et al. (2021) - Swin Transformer",
        ],
      },
    },
  ],
};

export default chapter;
