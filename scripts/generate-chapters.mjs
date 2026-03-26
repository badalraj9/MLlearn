/**
 * Generates individual chapter files and module index files.
 * Run: node scripts/generate-chapters.mjs
 */
import fs from "fs";
import path from "path";

// ─── Module data (extracted from current files) ───

const modules = [
  {
    id: "math",
    varName: "mathModule",
    title: "Mathematical Foundations",
    description:
      "Linear algebra, calculus, probability, statistics, and optimization essentials.",
    topics: [
      {
        id: "linear-algebra",
        title: "Linear Algebra Core",
        description:
          "Vector spaces, transformations, decompositions, and the geometry of high-dimensional data.",
        chapters: [
          {
            id: "vector-spaces",
            title: "Vector Spaces",
            description:
              "Foundations of linear algebra: subspaces, span, and bases.",
          },
          {
            id: "linear-transformations",
            title: "Linear Transformations",
            description:
              "Mappings between vector spaces that preserve structure.",
          },
          {
            id: "matrix-decomposition",
            title: "Matrix Decomposition (LU, QR)",
            description: "Factoring matrices into structured components.",
          },
          {
            id: "svd",
            title: "SVD",
            description: "Singular Value Decomposition and its applications.",
          },
          {
            id: "spectral-theorem",
            title: "Spectral Theorem",
            description: "Diagonalization of symmetric matrices.",
          },
          {
            id: "positive-definite-matrices",
            title: "Positive Definite Matrices",
            description:
              "Matrices with all positive eigenvalues and their role in optimization.",
          },
          {
            id: "norms-inner-products",
            title: "Norms & Inner Products",
            description:
              "Measuring length, distance, and angles in vector spaces.",
          },
        ],
      },
      {
        id: "calculus",
        title: "Calculus",
        description:
          "Derivatives, gradients, and the mathematics of change in high dimensions.",
        chapters: [
          {
            id: "limits-continuity",
            title: "Limits & Continuity",
            description:
              "The foundation of calculus: approaching values and smooth functions.",
          },
          {
            id: "partial-derivatives",
            title: "Partial Derivatives",
            description:
              "Derivatives of multivariable functions with respect to one variable.",
          },
          {
            id: "gradient-jacobian",
            title: "Gradient & Jacobian",
            description:
              "First-order derivative structures for scalar and vector functions.",
          },
          {
            id: "hessian",
            title: "Hessian",
            description: "Second-order derivatives and curvature of functions.",
          },
          {
            id: "chain-rule-high-dim",
            title: "Chain Rule in High Dimensions",
            description: "Composing derivatives through computational graphs.",
          },
          {
            id: "taylor-expansion",
            title: "Taylor Expansion",
            description: "Polynomial approximation of functions near a point.",
          },
          {
            id: "implicit-differentiation",
            title: "Implicit Differentiation",
            description:
              "Differentiating equations not solved for a single variable.",
          },
        ],
      },
      {
        id: "probability",
        title: "Probability",
        description:
          "Random variables, distributions, and the mathematics of uncertainty.",
        chapters: [
          {
            id: "random-variables",
            title: "Random Variables",
            description:
              "Variables whose values are determined by random outcomes.",
          },
          {
            id: "distributions",
            title: "Distributions (Discrete & Continuous)",
            description: "Probability mass and density functions.",
          },
          {
            id: "joint-conditional",
            title: "Joint & Conditional Probability",
            description:
              "Probabilities over multiple variables and conditioning.",
          },
          {
            id: "bayes-theorem",
            title: "Bayes Theorem",
            description: "Updating beliefs with evidence.",
          },
          {
            id: "expectation-variance",
            title: "Expectation & Variance",
            description: "Expected values and measures of spread.",
          },
          {
            id: "law-of-large-numbers",
            title: "Law of Large Numbers",
            description: "Sample averages converge to expected values.",
          },
          {
            id: "central-limit-theorem",
            title: "Central Limit Theorem",
            description:
              "Sums of random variables approach a normal distribution.",
          },
        ],
      },
      {
        id: "statistics",
        title: "Statistics",
        description:
          "Estimation, inference, and drawing conclusions from data.",
        chapters: [
          {
            id: "estimation-theory",
            title: "Estimation Theory",
            description: "Principles of estimating parameters from data.",
          },
          {
            id: "mle",
            title: "Maximum Likelihood Estimation",
            description: "Finding parameters that maximize data probability.",
          },
          {
            id: "map-estimation",
            title: "MAP Estimation",
            description: "Point estimates with prior beliefs.",
          },
          {
            id: "hypothesis-testing",
            title: "Hypothesis Testing",
            description:
              "Statistical tests for decision-making under uncertainty.",
          },
          {
            id: "confidence-intervals",
            title: "Confidence Intervals",
            description: "Quantifying uncertainty in parameter estimates.",
          },
          {
            id: "bayesian-inference",
            title: "Bayesian Inference",
            description: "Full posterior reasoning over parameters.",
          },
        ],
      },
      {
        id: "optimization",
        title: "Optimization",
        description: "Minimizing and maximizing functions under constraints.",
        chapters: [
          {
            id: "convex-sets",
            title: "Convex Sets",
            description: "Geometry of convex regions and their properties.",
          },
          {
            id: "convex-functions",
            title: "Convex Functions",
            description: "Functions with a single global minimum.",
          },
          {
            id: "lagrange-multipliers",
            title: "Lagrange Multipliers",
            description: "Optimizing with equality constraints.",
          },
          {
            id: "kkt-conditions",
            title: "KKT Conditions",
            description: "Generalized constrained optimization.",
          },
          {
            id: "gradient-methods",
            title: "Gradient Methods",
            description: "First-order optimization algorithms.",
          },
          {
            id: "second-order-methods",
            title: "Second Order Methods",
            description: "Newton's method and curvature-aware optimization.",
          },
          {
            id: "stochastic-optimization",
            title: "Stochastic Optimization",
            description: "Optimization with noisy gradients and SGD variants.",
          },
        ],
      },
      {
        id: "additional-math",
        title: "Additional Math Topics",
        description:
          "Information geometry, graph theory, Markov chains, and numerical methods.",
        chapters: [
          {
            id: "information-geometry",
            title: "Information Geometry",
            description: "Geometric view of probability distributions.",
          },
          {
            id: "graph-theory-basics",
            title: "Graph Theory Basics",
            description: "Nodes, edges, and graph properties.",
          },
          {
            id: "markov-chains",
            title: "Markov Chains",
            description: "State transitions with memoryless property.",
          },
          {
            id: "measure-theory",
            title: "Measure Theory (Optional Advanced)",
            description:
              "Rigorous foundations for probability and integration.",
          },
          {
            id: "numerical-stability",
            title: "Numerical Stability",
            description: "Avoiding catastrophic errors in computation.",
          },
          {
            id: "floating-point-errors",
            title: "Floating Point Errors",
            description: "Precision limits and their impact on algorithms.",
          },
        ],
      },
    ],
  },
  {
    id: "ml-theory",
    varName: "mlTheoryModule",
    title: "ML Theory",
    description:
      "Generalization, capacity, bias-variance, and the theoretical foundations of learning.",
    topics: [
      {
        id: "supervised-learning-framework",
        title: "Supervised Learning Framework",
        description: "The formal setup of learning from labeled examples.",
        chapters: [
          {
            id: "task-performance-experience",
            title: "Task, Performance & Experience",
            description:
              "Mitchell's definition: T, P, E components of learning.",
          },
          {
            id: "loss-functions",
            title: "Loss Functions",
            description:
              "Measuring prediction error: MSE, cross-entropy, hinge loss.",
          },
          {
            id: "empirical-risk-minimization",
            title: "Empirical Risk Minimization",
            description: "Minimizing average loss over training data.",
          },
          {
            id: "bias-variance-tradeoff",
            title: "Bias-Variance Tradeoff",
            description:
              "Decomposing generalization error into bias and variance.",
          },
        ],
      },
      {
        id: "unsupervised-learning-theory",
        title: "Unsupervised Learning Theory",
        description: "Theoretical foundations of learning without labels.",
        chapters: [
          {
            id: "clustering-objectives",
            title: "Clustering Objectives",
            description:
              "K-means, spectral clustering, and their loss landscapes.",
          },
          {
            id: "density-estimation",
            title: "Density Estimation",
            description: "Modeling the underlying data distribution.",
          },
          {
            id: "dimensionality-reduction-theory",
            title: "Dimensionality Reduction Theory",
            description:
              "PCA, manifold learning, and information preservation.",
          },
        ],
      },
      {
        id: "semi-supervised-learning",
        title: "Semi-Supervised Learning",
        description: "Leveraging both labeled and unlabeled data.",
        chapters: [
          {
            id: "consistency-regularization",
            title: "Consistency Regularization",
            description: "Enforcing stable predictions under perturbation.",
          },
          {
            id: "pseudo-labeling",
            title: "Pseudo-Labeling",
            description: "Using model predictions as training targets.",
          },
          {
            id: "manifold-assumptions",
            title: "Manifold Assumptions",
            description:
              "Smoothness and cluster assumptions in semi-supervised methods.",
          },
        ],
      },
      {
        id: "pac-learning",
        title: "PAC Learning",
        description: "Probably Approximately Correct learning framework.",
        chapters: [
          {
            id: "pac-definition",
            title: "PAC Definition & Bounds",
            description: "Formal definition: ε-δ guarantees on learning.",
          },
          {
            id: "sample-complexity",
            title: "Sample Complexity",
            description: "How many examples are needed to learn?",
          },
          {
            id: "vc-dimension",
            title: "VC Dimension",
            description: "Measuring hypothesis class capacity.",
          },
        ],
      },
      {
        id: "structural-risk-minimization",
        title: "Structural Risk Minimization",
        description: "Balancing model complexity with empirical risk.",
        chapters: [
          {
            id: "complexity-penalties",
            title: "Complexity Penalties",
            description:
              "Adding structure-based penalties to risk minimization.",
          },
          {
            id: "model-selection-theory",
            title: "Model Selection Theory",
            description: "AIC, BIC, and MDL principles.",
          },
        ],
      },
      {
        id: "regularization-paths",
        title: "Regularization Paths",
        description: "How regularization strength affects model solutions.",
        chapters: [
          {
            id: "l1-l2-regularization",
            title: "L1 & L2 Regularization",
            description: "Lasso vs Ridge and their geometric interpretations.",
          },
          {
            id: "elastic-net",
            title: "Elastic Net",
            description: "Combining L1 and L2 for grouped sparsity.",
          },
          {
            id: "regularization-as-prior",
            title: "Regularization as Prior",
            description: "Bayesian interpretation of regularization terms.",
          },
        ],
      },
      {
        id: "dropout-theory",
        title: "Dropout Theory",
        description: "Theoretical analysis of dropout as regularization.",
        chapters: [
          {
            id: "dropout-as-ensemble",
            title: "Dropout as Ensemble",
            description:
              "Dropout approximates exponentially many sub-networks.",
          },
          {
            id: "monte-carlo-dropout",
            title: "Monte Carlo Dropout",
            description:
              "Using dropout at inference for uncertainty estimation.",
          },
        ],
      },
      {
        id: "implicit-bias-sgd",
        title: "Implicit Bias of SGD",
        description:
          "How stochastic gradient descent favors certain solutions.",
        chapters: [
          {
            id: "sgd-flat-minima",
            title: "SGD & Flat Minima",
            description: "Why SGD finds wide, generalizable minima.",
          },
          {
            id: "learning-rate-implicit-reg",
            title: "Learning Rate as Implicit Regularizer",
            description: "How step size controls solution complexity.",
          },
          {
            id: "noise-driven-exploration",
            title: "Noise-Driven Exploration",
            description: "Mini-batch noise as implicit regularization.",
          },
        ],
      },
      {
        id: "loss-surface-geometry",
        title: "Loss Surface Geometry",
        description: "The landscape of loss functions in high dimensions.",
        chapters: [
          {
            id: "saddle-points-local-minima",
            title: "Saddle Points & Local Minima",
            description: "Critical points in non-convex optimization.",
          },
          {
            id: "mode-connectivity",
            title: "Mode Connectivity",
            description: "Paths between solutions in parameter space.",
          },
          {
            id: "loss-landscape-visualization",
            title: "Loss Landscape Visualization",
            description:
              "Techniques for visualizing high-dimensional surfaces.",
          },
        ],
      },
      {
        id: "model-complexity",
        title: "Model Complexity",
        description:
          "VC dimension, Rademacher complexity, and capacity measures.",
        chapters: [
          {
            id: "vc-theory",
            title: "VC Theory",
            description:
              "Shattering, growth functions, and generalization bounds.",
          },
          {
            id: "rademacher-complexity",
            title: "Rademacher Complexity",
            description: "Data-dependent measures of model capacity.",
          },
          {
            id: "double-descent",
            title: "Double Descent",
            description: "The modern understanding of over-parameterization.",
          },
        ],
      },
      {
        id: "curse-of-dimensionality",
        title: "Curse of Dimensionality",
        description: "Why high-dimensional spaces behave counter-intuitively.",
        chapters: [
          {
            id: "volume-concentration",
            title: "Volume Concentration",
            description:
              "How volume concentrates near surfaces in high dimensions.",
          },
          {
            id: "distance-concentration",
            title: "Distance Concentration",
            description: "All points become equidistant in high dimensions.",
          },
          {
            id: "blessing-of-dimensionality",
            title: "Blessing of Dimensionality",
            description: "When high dimensions actually help.",
          },
        ],
      },
      {
        id: "no-free-lunch",
        title: "No Free Lunch Theorem",
        description: "No single algorithm dominates across all problems.",
        chapters: [
          {
            id: "nfl-formal-statement",
            title: "Formal Statement",
            description: "The theorem and its proof sketch.",
          },
          {
            id: "nfl-practical-implications",
            title: "Practical Implications",
            description: "What NFL means for algorithm selection.",
          },
        ],
      },
      {
        id: "optimization-generalization-link",
        title: "Optimization Generalization Link",
        description: "How optimization choices impact generalization.",
        chapters: [
          {
            id: "sharpness-aware-minimization",
            title: "Sharpness-Aware Minimization",
            description: "Optimizing for flat loss regions.",
          },
          {
            id: "early-stopping-theory",
            title: "Early Stopping as Regularization",
            description: "Why stopping early prevents overfitting.",
          },
          {
            id: "overparameterization-generalization",
            title: "Overparameterization & Generalization",
            description: "Why more parameters can still generalize.",
          },
        ],
      },
      {
        id: "calibration-theory",
        title: "Calibration Theory",
        description:
          "Ensuring predicted probabilities match actual frequencies.",
        chapters: [
          {
            id: "calibration-curves",
            title: "Calibration Curves",
            description: "Reliability diagrams and expected calibration error.",
          },
          {
            id: "temperature-scaling",
            title: "Temperature Scaling",
            description: "Post-hoc calibration via softmax temperature.",
          },
          {
            id: "platt-scaling",
            title: "Platt Scaling",
            description:
              "Logistic regression on model outputs for calibration.",
          },
        ],
      },
      {
        id: "uncertainty-quantification",
        title: "Uncertainty Quantification",
        description: "Measuring and representing model uncertainty.",
        chapters: [
          {
            id: "aleatoric-vs-epistemic",
            title: "Aleatoric vs Epistemic Uncertainty",
            description: "Data noise vs model uncertainty.",
          },
          {
            id: "bayesian-neural-networks",
            title: "Bayesian Neural Networks",
            description: "Placing distributions over weights.",
          },
          {
            id: "ensemble-uncertainty",
            title: "Ensemble Uncertainty",
            description: "Using prediction disagreement across models.",
          },
          {
            id: "conformal-prediction",
            title: "Conformal Prediction",
            description: "Distribution-free prediction intervals.",
          },
        ],
      },
      {
        id: "robustness-theory",
        title: "Robustness Theory",
        description: "Theoretical foundations of model robustness.",
        chapters: [
          {
            id: "distributional-robustness",
            title: "Distributional Robustness",
            description: "Worst-case performance over distribution shifts.",
          },
          {
            id: "certified-defenses",
            title: "Certified Defenses",
            description: "Provable robustness guarantees.",
          },
          {
            id: "out-of-distribution-detection",
            title: "Out-of-Distribution Detection",
            description: "Identifying inputs that differ from training data.",
          },
        ],
      },
      {
        id: "adversarial-learning-theory",
        title: "Adversarial Learning Theory",
        description: "Formal analysis of adversarial attacks and defenses.",
        chapters: [
          {
            id: "adversarial-examples",
            title: "Adversarial Examples",
            description: "Small perturbations that fool classifiers.",
          },
          {
            id: "attack-taxonomy",
            title: "Attack Taxonomy",
            description: "FGSM, PGD, C&W, and other attack methods.",
          },
          {
            id: "adversarial-training",
            title: "Adversarial Training",
            description: "Training on adversarial examples for robustness.",
          },
          {
            id: "robustness-accuracy-tradeoff",
            title: "Robustness-Accuracy Tradeoff",
            description: "Why robustness often reduces accuracy.",
          },
        ],
      },
    ],
  },
  {
    id: "deep-learning",
    varName: "deepLearningModule",
    title: "Deep Learning",
    description:
      "Neural network architectures, training dynamics, and scaling.",
    topics: [
      {
        id: "core-foundations",
        title: "Core Foundations",
        description:
          "Fundamental theorems, gradient flow, normalization, and connectivity patterns.",
        chapters: [
          {
            id: "universal-approximation",
            title: "Universal Approximation Theorem",
            description: "Why neural networks can represent any function.",
          },
          {
            id: "backpropagation-derivation",
            title: "Backpropagation Derivation",
            description: "The mathematics behind gradient computation.",
          },
          {
            id: "gradient-flow",
            title: "Gradient Flow",
            description: "How gradients propagate through deep networks.",
          },
          {
            id: "vanishing-exploding-gradients",
            title: "Vanishing & Exploding Gradients",
            description:
              "Instability in deep networks and mitigation strategies.",
          },
          {
            id: "batch-vs-layer-norm",
            title: "Batch vs Layer Norm",
            description: "Normalization techniques and their trade-offs.",
          },
          {
            id: "residual-connections",
            title: "Residual Connections",
            description:
              "Skip connections that enable training of very deep networks.",
          },
          {
            id: "skip-connections",
            title: "Skip Connections",
            description:
              "Architectural patterns for information flow across layers.",
          },
        ],
      },
      {
        id: "architectures",
        title: "Architectures",
        description:
          "CNN variants, sequence models, transformers, and emerging designs.",
        chapters: [
          {
            id: "cnn-variants",
            title: "CNN Variants (ResNet, EfficientNet)",
            description: "Evolution of convolutional architectures.",
          },
          {
            id: "sequence-models",
            title: "Sequence Models",
            description: "RNNs, LSTMs, GRUs, and temporal processing.",
          },
          {
            id: "attention-variants",
            title: "Attention Variants",
            description:
              "Self-attention, cross-attention, multi-head, and sparse patterns.",
          },
          {
            id: "vision-transformers",
            title: "Vision Transformers",
            description: "Applying transformer architecture to visual data.",
          },
          {
            id: "diffusion-unets",
            title: "Diffusion U-Nets",
            description:
              "U-Net architectures used in diffusion-based generation.",
          },
          {
            id: "graph-attention-networks",
            title: "Graph Attention Networks",
            description: "Attention mechanisms on graph-structured data.",
          },
          {
            id: "capsule-networks",
            title: "Capsule Networks",
            description: "Encoding part-whole relationships in networks.",
          },
        ],
      },
      {
        id: "training-dynamics",
        title: "Training Dynamics",
        description:
          "Learning rate strategies, gradient control, and precision optimization.",
        chapters: [
          {
            id: "learning-rate-schedules",
            title: "Learning Rate Schedules",
            description: "Cosine, step, exponential, and cyclic schedules.",
          },
          {
            id: "warmup-strategies",
            title: "Warmup Strategies",
            description:
              "Gradual learning rate increase for stable early training.",
          },
          {
            id: "gradient-clipping",
            title: "Gradient Clipping",
            description: "Preventing gradient explosion during training.",
          },
          {
            id: "weight-decay",
            title: "Weight Decay",
            description: "L2 regularization through parameter penalization.",
          },
          {
            id: "label-smoothing",
            title: "Label Smoothing",
            description: "Softening hard labels to improve generalization.",
          },
          {
            id: "mixed-precision-training",
            title: "Mixed Precision Training",
            description:
              "Using FP16/BF16 for faster, memory-efficient training.",
          },
          {
            id: "distributed-training",
            title: "Distributed Training",
            description: "Training across multiple GPUs and machines.",
          },
        ],
      },
      {
        id: "scaling",
        title: "Scaling",
        description:
          "Scaling laws, parallelism strategies, and memory optimization.",
        chapters: [
          {
            id: "parameter-scaling-laws",
            title: "Parameter Scaling Laws",
            description: "How performance scales with model size.",
          },
          {
            id: "data-scaling",
            title: "Data Scaling",
            description: "How performance scales with dataset size.",
          },
          {
            id: "model-parallelism",
            title: "Model Parallelism",
            description: "Splitting models across devices.",
          },
          {
            id: "gradient-accumulation",
            title: "Gradient Accumulation",
            description: "Simulating larger batch sizes with limited memory.",
          },
          {
            id: "memory-optimization",
            title: "Memory Optimization",
            description:
              "Gradient checkpointing, activation recomputation, and offloading.",
          },
        ],
      },
    ],
  },
  {
    id: "generative",
    varName: "generativeModule",
    title: "Generative Models",
    description:
      "Latent spaces, variational inference, GANs, diffusion, and modern generation techniques.",
    topics: [
      {
        id: "latent-space-geometry",
        title: "Latent Space Geometry",
        description:
          "The structure and topology of learned latent representations.",
        chapters: [
          {
            id: "manifold-hypothesis",
            title: "The Manifold Hypothesis",
            description: "Why real data lives on low-dimensional manifolds.",
          },
          {
            id: "latent-interpolation",
            title: "Latent Interpolation",
            description:
              "Walking through latent space to blend representations.",
          },
          {
            id: "disentangled-representations",
            title: "Disentangled Representations",
            description: "Separating independent factors of variation.",
          },
        ],
      },
      {
        id: "variational-inference",
        title: "Variational Inference",
        description:
          "Optimization-based approximation for intractable posteriors.",
        chapters: [
          {
            id: "intractable-posteriors",
            title: "Intractable Posteriors",
            description: "Why exact inference is often impossible.",
          },
          {
            id: "variational-families",
            title: "Variational Families",
            description: "Choosing tractable approximate distributions.",
          },
          {
            id: "amortized-inference",
            title: "Amortized Inference",
            description:
              "Learning an inference network instead of per-example optimization.",
          },
        ],
      },
      {
        id: "kl-divergence",
        title: "KL Divergence",
        description:
          "Measuring the difference between probability distributions.",
        chapters: [
          {
            id: "kl-definition-properties",
            title: "Definition & Properties",
            description:
              "Asymmetry, non-negativity, and information-theoretic meaning.",
          },
          {
            id: "forward-vs-reverse-kl",
            title: "Forward vs Reverse KL",
            description: "Mode-covering vs mode-seeking behavior.",
          },
          {
            id: "kl-in-training",
            title: "KL in Training Objectives",
            description:
              "Role of KL divergence in VAEs, policy gradients, and distillation.",
          },
        ],
      },
      {
        id: "elbo-derivation",
        title: "ELBO Derivation",
        description:
          "The evidence lower bound and its role in variational methods.",
        chapters: [
          {
            id: "elbo-from-bayes",
            title: "ELBO from Bayes' Rule",
            description: "Deriving the bound from log-evidence decomposition.",
          },
          {
            id: "reconstruction-vs-regularization",
            title: "Reconstruction vs Regularization",
            description: "The two competing terms in the ELBO.",
          },
          {
            id: "tighter-bounds",
            title: "Tighter Bounds (IWAE)",
            description: "Importance-weighted autoencoders and beyond.",
          },
        ],
      },
      {
        id: "gan-game-theory",
        title: "GAN Game Theory",
        description: "The minimax framework of generator vs discriminator.",
        chapters: [
          {
            id: "minimax-formulation",
            title: "Minimax Formulation",
            description: "The original GAN objective and Nash equilibrium.",
          },
          {
            id: "training-instability",
            title: "Training Instability",
            description: "Mode collapse, oscillation, and vanishing gradients.",
          },
          {
            id: "gan-convergence",
            title: "GAN Convergence Theory",
            description: "Conditions for convergence and equilibrium analysis.",
          },
        ],
      },
      {
        id: "wasserstein-gan",
        title: "Wasserstein GAN",
        description: "Earth mover's distance for stable GAN training.",
        chapters: [
          {
            id: "earth-movers-distance",
            title: "Earth Mover's Distance",
            description: "Optimal transport as a metric between distributions.",
          },
          {
            id: "lipschitz-constraint",
            title: "Lipschitz Constraint",
            description:
              "Weight clipping and gradient penalty for critic networks.",
          },
          {
            id: "wgan-gp",
            title: "WGAN-GP",
            description: "Gradient penalty for improved Wasserstein training.",
          },
        ],
      },
      {
        id: "score-matching",
        title: "Score Matching",
        description: "Learning the gradient of the log-density.",
        chapters: [
          {
            id: "score-function",
            title: "The Score Function",
            description: "Gradient of log-density.",
          },
          {
            id: "denoising-score-matching",
            title: "Denoising Score Matching",
            description: "Learning scores by denoising corrupted samples.",
          },
          {
            id: "sliced-score-matching",
            title: "Sliced Score Matching",
            description: "Scalable score estimation via random projections.",
          },
        ],
      },
      {
        id: "denoising-diffusion",
        title: "Denoising Diffusion",
        description: "Forward noising and learned denoising processes.",
        chapters: [
          {
            id: "forward-process",
            title: "Forward Noising Process",
            description: "Gradually adding Gaussian noise to data.",
          },
          {
            id: "noise-schedule",
            title: "Noise Schedules",
            description: "Linear, cosine, and learned noise schedules.",
          },
          {
            id: "ddpm-training",
            title: "DDPM Training Objective",
            description: "Simplified loss: predicting noise from noisy inputs.",
          },
        ],
      },
      {
        id: "reverse-diffusion-process",
        title: "Reverse Diffusion Process",
        description: "Iterative denoising from noise to data.",
        chapters: [
          {
            id: "reverse-sde",
            title: "Reverse SDE",
            description: "Stochastic differential equations for generation.",
          },
          {
            id: "ddim-sampling",
            title: "DDIM Sampling",
            description: "Deterministic sampling for faster generation.",
          },
          {
            id: "classifier-free-guidance",
            title: "Classifier-Free Guidance",
            description: "Amplifying conditional signals without a classifier.",
          },
        ],
      },
      {
        id: "flow-matching",
        title: "Flow Matching",
        description: "Continuous normalizing flows via optimal transport.",
        chapters: [
          {
            id: "continuous-normalizing-flows",
            title: "Continuous Normalizing Flows",
            description: "Neural ODEs for density transformation.",
          },
          {
            id: "optimal-transport-paths",
            title: "Optimal Transport Paths",
            description: "Straight-line paths between noise and data.",
          },
          {
            id: "rectified-flows",
            title: "Rectified Flows",
            description: "Simplifying flow paths for faster sampling.",
          },
        ],
      },
      {
        id: "autoregressive-transformers",
        title: "Autoregressive Transformers",
        description: "Token-by-token generation with self-attention.",
        chapters: [
          {
            id: "causal-masking",
            title: "Causal Masking",
            description:
              "Preventing information leakage with masked attention.",
          },
          {
            id: "tokenization-strategies",
            title: "Tokenization Strategies",
            description: "BPE, SentencePiece, and visual tokenizers.",
          },
          {
            id: "sampling-strategies",
            title: "Sampling Strategies",
            description: "Top-k, nucleus, and temperature-based decoding.",
          },
        ],
      },
      {
        id: "text-to-image",
        title: "Text-to-Image Models",
        description: "Cross-modal generation from text prompts to images.",
        chapters: [
          {
            id: "clip-embeddings",
            title: "CLIP Embeddings",
            description: "Joint text-image representations for conditioning.",
          },
          {
            id: "stable-diffusion-architecture",
            title: "Stable Diffusion Architecture",
            description: "Latent diffusion with U-Net and cross-attention.",
          },
          {
            id: "prompt-engineering",
            title: "Prompt Engineering",
            description: "Crafting text prompts for precise generation.",
          },
        ],
      },
      {
        id: "conditional-diffusion",
        title: "Conditional Diffusion",
        description:
          "Guiding diffusion with class labels, text, or other signals.",
        chapters: [
          {
            id: "classifier-guidance",
            title: "Classifier Guidance",
            description: "Using gradient of a classifier to steer generation.",
          },
          {
            id: "conditioning-mechanisms",
            title: "Conditioning Mechanisms",
            description:
              "Cross-attention, AdaIN, and concatenation approaches.",
          },
          {
            id: "controlnet",
            title: "ControlNet",
            description:
              "Adding spatial controls like edges, depth, and poses.",
          },
        ],
      },
      {
        id: "inpainting-editing",
        title: "Inpainting & Editing",
        description: "Modifying parts of generated or existing data.",
        chapters: [
          {
            id: "masked-inpainting",
            title: "Masked Inpainting",
            description: "Filling in missing regions with coherent content.",
          },
          {
            id: "image-to-image",
            title: "Image-to-Image Translation",
            description: "Transforming images from one domain to another.",
          },
          {
            id: "instruction-based-editing",
            title: "Instruction-Based Editing",
            description: "Editing images with natural language instructions.",
          },
        ],
      },
      {
        id: "evaluation-metrics",
        title: "Evaluation Metrics (FID, IS)",
        description: "Quantitative measures for generative model quality.",
        chapters: [
          {
            id: "frechet-inception-distance",
            title: "Frechet Inception Distance",
            description:
              "Comparing feature distributions of real and generated data.",
          },
          {
            id: "inception-score",
            title: "Inception Score (IS)",
            description:
              "Measuring quality and diversity of generated samples.",
          },
          {
            id: "human-evaluation",
            title: "Human Evaluation & Perceptual Metrics",
            description:
              "LPIPS, user studies, and preference-based evaluation.",
          },
        ],
      },
    ],
  },
  {
    id: "applied-ml",
    varName: "appliedMlModule",
    title: "Applied Machine Learning",
    description:
      "Data pipelines, model serving, compression, and real-world domain projects.",
    topics: [
      {
        id: "practical-foundations",
        title: "Practical Foundations",
        description:
          "Data cleaning, feature engineering, and model interpretability.",
        chapters: [
          {
            id: "data-cleaning-pipelines",
            title: "Data Cleaning Pipelines",
            description: "Handling missing values, outliers, and noisy data.",
          },
          {
            id: "feature-selection",
            title: "Feature Selection",
            description: "Identifying the most informative features.",
          },
          {
            id: "imbalanced-data",
            title: "Imbalanced Data Handling",
            description: "Strategies for skewed class distributions.",
          },
          {
            id: "model-interpretability",
            title: "Model Interpretability Tools",
            description: "Understanding model decisions and explanations.",
          },
          {
            id: "shap-lime",
            title: "SHAP & LIME",
            description: "Post-hoc explanation methods for any model.",
          },
        ],
      },
      {
        id: "engineering",
        title: "Engineering",
        description:
          "ML APIs, containerization, CI/CD, and production monitoring.",
        chapters: [
          {
            id: "ml-apis",
            title: "ML APIs",
            description: "Building and consuming machine learning APIs.",
          },
          {
            id: "fastapi-serving",
            title: "FastAPI Model Serving",
            description: "Serving models with FastAPI for real-time inference.",
          },
          {
            id: "docker-ml",
            title: "Docker for ML",
            description: "Containerizing ML environments and models.",
          },
          {
            id: "cicd-ml",
            title: "CI/CD for ML",
            description:
              "Continuous integration and deployment for ML pipelines.",
          },
          {
            id: "monitoring-production",
            title: "Monitoring Models in Production",
            description: "Tracking model performance after deployment.",
          },
          {
            id: "logging-drift",
            title: "Logging & Drift Detection",
            description: "Detecting data and concept drift over time.",
          },
        ],
      },
      {
        id: "performance",
        title: "Performance",
        description:
          "Model compression, quantization, pruning, and knowledge distillation.",
        chapters: [
          {
            id: "model-compression",
            title: "Model Compression",
            description:
              "Reducing model size without significant quality loss.",
          },
          {
            id: "quantization",
            title: "Quantization",
            description: "Reducing precision of weights and activations.",
          },
          {
            id: "pruning",
            title: "Pruning",
            description: "Removing unnecessary parameters from trained models.",
          },
          {
            id: "knowledge-distillation",
            title: "Knowledge Distillation",
            description: "Training smaller models to mimic larger ones.",
          },
        ],
      },
      {
        id: "real-world-domains",
        title: "Real-World Domains",
        description:
          "Domain-specific applications: vision, NLP, recommenders, and more.",
        chapters: [
          {
            id: "cv-projects",
            title: "Computer Vision Projects",
            description:
              "Practical image classification, detection, and segmentation.",
          },
          {
            id: "nlp-projects",
            title: "NLP Projects",
            description:
              "Text classification, NER, summarization, and generation.",
          },
          {
            id: "recommender-systems",
            title: "Recommender Systems",
            description:
              "Collaborative filtering and content-based recommendations.",
          },
          {
            id: "time-series",
            title: "Time Series Forecasting",
            description: "Predicting future values from temporal data.",
          },
          {
            id: "financial-modeling",
            title: "Financial Modeling",
            description:
              "ML applications in finance and quantitative analysis.",
          },
          {
            id: "healthcare-ml",
            title: "Healthcare ML",
            description:
              "Machine learning for medical imaging and diagnostics.",
          },
          {
            id: "edge-ai",
            title: "Edge AI Deployment",
            description: "Running ML models on edge devices and IoT.",
          },
        ],
      },
    ],
  },
];

// ─── Chapter file template ───

function chapterTemplate(ch) {
  return `import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "${ch.id}",
  title: "${ch.title.replace(/"/g, '\\"')}",
  description: "${ch.description.replace(/"/g, '\\"')}",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [],
        keyIdeas: [],
        equations: [],
        references: [],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [],
        keyIdeas: [],
        equations: [],
        references: [],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [],
        keyIdeas: [],
        equations: [],
        references: [],
      },
    },
  ],
};

export default chapter;
`;
}

// ─── Module index template ───

function moduleIndexTemplate(mod) {
  const imports = [];
  const topicArray = [];

  for (const topic of mod.topics) {
    const chapterImports = [];
    for (const ch of topic.chapters) {
      const varName = toCamelCase(ch.id);
      imports.push(`import ${varName} from "./chapters/${ch.id}";`);
      chapterImports.push(varName);
    }
    topicArray.push(`    {
      id: "${topic.id}",
      title: "${topic.title.replace(/"/g, '\\"')}",
      description: "${topic.description.replace(/"/g, '\\"')}",
      chapters: [${chapterImports.join(", ")}],
    }`);
  }

  return `import type { Module } from "@/types";
${imports.join("\n")}

export const ${mod.varName}: Module = {
  id: "${mod.id}",
  title: "${mod.title.replace(/"/g, '\\"')}",
  description:
    "${mod.description.replace(/"/g, '\\"')}",
  topics: [
${topicArray.join(",\n")}
  ],
};
`;
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// ─── Generate ───

const baseDir = path.join("src", "content", "modules");
let totalChapters = 0;

for (const mod of modules) {
  const chaptersDir = path.join(baseDir, mod.id, "chapters");
  fs.mkdirSync(chaptersDir, { recursive: true });

  for (const topic of mod.topics) {
    for (const ch of topic.chapters) {
      const filePath = path.join(chaptersDir, `${ch.id}.ts`);
      fs.writeFileSync(filePath, chapterTemplate(ch));
      totalChapters++;
    }
  }

  // Write module index
  const indexPath = path.join(baseDir, mod.id, "index.ts");
  fs.writeFileSync(indexPath, moduleIndexTemplate(mod));

  console.log(
    `✅ ${mod.id}: ${mod.topics.reduce((a, t) => a + t.chapters.length, 0)} chapters`,
  );
}

// Write barrel index
const barrelImports = modules.map(
  (m) => `import { ${m.varName} } from "./${m.id}";`,
);
const barrelExport = `import type { Module } from "@/types";
${barrelImports.join("\n")}

export const modules: Module[] = [
${modules.map((m) => `  ${m.varName},`).join("\n")}
];
`;
fs.writeFileSync(path.join(baseDir, "index.ts"), barrelExport);

console.log(
  `\n🎉 Generated ${totalChapters} chapter files across ${modules.length} modules`,
);
