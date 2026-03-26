import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "residual-connections",
  title: "Residual Connections",
  description: "Skip connections that enable training of very deep networks.",
  prerequisites: ["backpropagation-derivation", "vanishing-exploding-gradients"],
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Residual connections changed deep learning by making it easier to train very deep networks. Instead of asking a block to learn a full transformation from scratch, we ask it to learn what should be added to the input.",
          "That sounds like a small rewrite, but it changes the optimization problem dramatically. If the best thing a layer can do is mostly preserve what it received, the residual block can achieve that by learning a correction near zero rather than relearning the identity map.",
          "The clean intuition is this: a residual block says, keep the old representation unless you have a good reason to modify it. That makes depth safer because extra layers no longer have to justify their own existence by completely rewriting the signal.",
        ],
        keyIdeas: [
          "A residual block outputs input plus a learned correction.",
          "Learning a residual is often easier than learning the entire mapping.",
          "Skip connections create a direct path for information and gradients.",
          "Depth becomes easier to optimize when the identity map is always available.",
        ],
        equations: [
          "\\[ x_{l+1} = x_l + \\mathcal{F}(x_l, W_l) \\]",
          "\\[ \\frac{\\partial E}{\\partial x_l} = \\frac{\\partial E}{\\partial x_{l+1}} \\left(I + \\frac{\\partial \\mathcal{F}}{\\partial x_l}\\right) \\]",
          "\\[ \\mathcal{F}(x_l, W_l) = 0 \\Rightarrow x_{l+1} = x_l \\]",
        ],
        ahaInsights: [
          "Residual blocks do not force every layer to invent a new representation. They allow layers to make only the changes that matter.",
          "The skip path means a deep network always contains a shallow path through which gradients can flow.",
        ],
        equationSteps: [
          {
            latex: "\\[ x_{l+1} = x_l + \\mathcal{F}(x_l, W_l) \\]",
            explanation: "A residual block returns the input plus a learned residual function.",
          },
          {
            latex: "\\[ \\frac{\\partial x_{l+1}}{\\partial x_l} = I + \\frac{\\partial \\mathcal{F}}{\\partial x_l} \\]",
            explanation: "Differentiate the block with respect to its input. The identity term is what makes residual connections special.",
          },
          {
            latex: "\\[ \\frac{\\partial E}{\\partial x_l} = \\frac{\\partial E}{\\partial x_{l+1}} \\left(I + \\frac{\\partial \\mathcal{F}}{\\partial x_l}\\right) \\]",
            explanation: "Backpropagation now includes a direct gradient path that does not depend on the residual branch being well-conditioned.",
          },
        ],
        quiz: [
          {
            id: "residual-foundation-1",
            question: "Why are residual connections easier to optimize than plain deep stacks?",
            options: [
              "Because the identity map is always available as a fallback path",
              "Because they remove nonlinearities",
              "Because they require fewer parameters in every case",
              "Because they make gradients exactly constant",
            ],
            correctIndex: 0,
            explanation: "Residual blocks can preserve the input directly and only learn the correction.",
          },
          {
            id: "residual-foundation-2",
            question: "What does F(x) represent in a residual block?",
            options: [
              "The learned residual correction",
              "The final loss",
              "The batch-normalized input only",
              "The skip connection itself",
            ],
            correctIndex: 0,
            explanation: "F(x) is the branch that learns what should be added to the identity path.",
          },
        ],
        references: [
          "He et al. (2015) - Deep Residual Learning for Image Recognition",
          "Veit et al. (2016) - Residual Networks Behave Like Ensembles of Relatively Shallow Networks",
        ],
      },
      playground: {
        type: "slider",
        graphFn: "x + a * sin(b * x)",
        sliders: [
          { id: "a", label: "Residual amplitude", min: -2, max: 2, step: 0.1, default: 0.5 },
          { id: "b", label: "Frequency", min: 0.1, max: 3, step: 0.1, default: 1 },
        ],
        xRange: [-5, 5],
        yRange: [-5, 5],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In real architectures, residual connections are more than one formula. ResNet bottlenecks, pre-activation blocks, downsampling shortcuts, and squeeze-and-excitation modules are all practical variations on the same principle.",
          "A useful way to think about ResNets is as collections of paths of different effective lengths. Some information goes through many nonlinear layers, while some bypasses most of them. That makes optimization behave more like training an ensemble of related subnetworks than training one rigid chain.",
          "In practice, residual design also interacts with normalization. Pre-activation ResNets often train better because they preserve cleaner signal and gradient flow through the skip path.",
        ],
        keyIdeas: [
          "Bottleneck blocks reduce cost with 1x1, 3x3, 1x1 structure.",
          "Pre-activation often improves optimization in very deep networks.",
          "Projection shortcuts are needed when tensor shapes change.",
          "Residual design appears far beyond CNNs, including transformers and diffusion U-Nets.",
        ],
        equations: [
          "\\[ x_{l+1} = x_l + W_3 \\sigma(W_2 \\sigma(W_1 x_l)) \\]",
          "\\[ x_{l+1} = P x_l + \\mathcal{F}(x_l) \\quad \\text{when dimensions change} \\]",
          "\\[ y = x \\odot s(x) \\quad \\text{for channel reweighting in SE-style blocks} \\]",
        ],
        ahaInsights: [
          "Residual networks are not only deeper; they are more forgiving when extra layers turn out to be unnecessary.",
          "The skip path is an optimization prior: preserve useful representations unless the residual branch proves an improvement.",
        ],
        quiz: [
          {
            id: "residual-applied-1",
            question: "When do you need a projection shortcut instead of a plain identity shortcut?",
            options: [
              "When the input and output dimensions differ",
              "When the activation is ReLU",
              "When batch size is small",
              "When the loss is cross-entropy",
            ],
            correctIndex: 0,
            explanation: "If shapes do not match, the skip path must be transformed before addition.",
          },
        ],
        references: [
          "He et al. (2016) - Identity Mappings in Deep Residual Networks",
          "Hu et al. (2017) - Squeeze-and-Excitation Networks",
          "Xie et al. (2017) - Aggregated Residual Transformations for Deep Neural Networks",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "At an advanced level, residual networks are best understood as a discretization idea. Each block makes a small update to the representation, which makes the whole network resemble a numerical integration scheme for a differential equation.",
          "This point of view explains why residual architectures connect naturally to neural ODEs, stability theory, and continuous-depth models. Instead of seeing depth as repeated replacement of a representation, we see it as incremental transport through feature space.",
          "It also explains why residual patterns spread everywhere in modern deep learning. Once you think of a layer as a correction step, the architecture becomes easier to scale, easier to regularize, and easier to analyze.",
        ],
        keyIdeas: [
          "Residual networks approximate continuous dynamics with discrete update steps.",
          "Neural ODEs are the continuous-depth limit of residual updates.",
          "Stochastic depth regularizes very deep residual stacks by randomly skipping blocks during training.",
          "Residual structure is now a general design principle, not just a ResNet trick.",
        ],
        equations: [
          "\\[ x_{l+1} = x_l + h f(x_l, \\theta_l) \\]",
          "\\[ \\frac{dx}{dt} = f(x, t, \\theta) \\]",
          "\\[ x_L = x_0 + \\sum_{l=0}^{L-1} \\mathcal{F}(x_l, W_l) \\]",
        ],
        quiz: [
          {
            id: "residual-advanced-1",
            question: "What does the neural ODE perspective reinterpret a residual block as?",
            options: [
              "A discrete step of a continuous dynamical system",
              "A Bayesian posterior update",
              "A matrix factorization constraint",
              "A fixed attention head",
            ],
            correctIndex: 0,
            explanation: "Residual blocks can be viewed as small incremental updates, like numerical integration steps.",
          },
        ],
        references: [
          "Haber and Ruthotto (2017) - Stable Architectures for Deep Neural Networks",
          "Chen et al. (2018) - Neural Ordinary Differential Equations",
          "Huang et al. (2016) - Deep Networks with Stochastic Depth",
        ],
      },
      playground: {
        type: "equation",
        equation: "x + 0.3 * sin(2*x)",
        xRange: [-5, 5],
        yRange: [-5, 5],
      },
    },
  ],
};

export default chapter;
