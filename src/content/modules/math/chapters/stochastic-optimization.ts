import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "stochastic-optimization",
  title: "Stochastic Optimization",
  description: "Optimization with noisy gradients and SGD variants.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Stochastic optimization replaces the exact gradient of the full dataset with a noisy estimate computed from a mini-batch. That makes each update cheaper and allows training to scale to massive datasets.",
          "The key tradeoff is simple: full-batch gradients are accurate but expensive, while stochastic gradients are cheap but noisy. SGD wins in deep learning because cheap noisy steps usually beat expensive precise ones.",
          "That noise is not only a nuisance. It can help the optimizer keep moving instead of settling too quickly into narrow, brittle solutions.",
        ],
        keyIdeas: [
          "SGD uses gradient estimates from mini-batches rather than the whole dataset.",
          "Mini-batch size trades computation against variance.",
          "Learning rate controls both step size and practical stability.",
          "Noisy gradients can help exploration in nonconvex problems.",
          "Full-batch optimization and SGD solve the same objective with very different dynamics.",
        ],
        equations: [
          "\\[ \\theta_{t+1} = \\theta_t - \\eta_t g_t \\]",
          "\\[ \\mathbb{E}[g_t \\mid \\theta_t] = \\nabla f(\\theta_t) \\]",
          "\\[ g_t = \\frac{1}{|B_t|} \\sum_{i \\in B_t} \\nabla \\ell_i(\\theta_t) \\]",
        ],
        ahaInsights: [
          "SGD works not because its gradients are accurate, but because they are accurate enough and cheap enough.",
          "The randomness in SGD changes which solutions are reachable, not just how fast you get there.",
        ],
        equationSteps: [
          {
            latex: "\\[ f(\\theta) = \\frac{1}{n} \\sum_{i=1}^{n} \\ell_i(\\theta) \\]",
            explanation: "Start with the empirical objective as an average over training examples.",
          },
          {
            latex: "\\[ \\nabla f(\\theta) = \\frac{1}{n} \\sum_{i=1}^{n} \\nabla \\ell_i(\\theta) \\]",
            explanation: "The exact gradient averages all example-level gradients, but this is expensive on large datasets.",
          },
          {
            latex: "\\[ g_t = \\frac{1}{|B_t|} \\sum_{i \\in B_t} \\nabla \\ell_i(\\theta_t) \\]",
            explanation: "Replace the full average with a mini-batch average to get a stochastic estimate.",
          },
          {
            latex: "\\[ \\theta_{t+1} = \\theta_t - \\eta_t g_t \\]",
            explanation: "Update parameters using the noisy gradient estimate instead of the exact gradient.",
          },
        ],
        quiz: [
          {
            id: "sgd-foundation-1",
            question: "Why is SGD usually preferred over full-batch gradient descent in deep learning?",
            options: [
              "Each update is much cheaper and scales better to large datasets",
              "It always converges in fewer steps",
              "It removes all local minima",
              "It computes exact Hessians for free",
            ],
            correctIndex: 0,
            explanation: "SGD is attractive because mini-batch updates are cheap enough to make large-scale training feasible.",
          },
          {
            id: "sgd-foundation-2",
            question: "What increases when you use smaller mini-batches?",
            options: [
              "Gradient variance",
              "Exactness of the gradient",
              "Determinism of the update",
              "Numerical rank of the model",
            ],
            correctIndex: 0,
            explanation: "Smaller mini-batches are noisier, so the variance of the gradient estimate increases.",
          },
        ],
        references: [
          "Bottou, Curtis, Nocedal (2018) - Optimization Methods for Large-Scale Machine Learning",
          "Goodfellow, Bengio, Courville - Deep Learning, Chapter 8",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In practice, stochastic optimization is really about training recipes. Learning-rate schedules, momentum, warmup, gradient clipping, and adaptive methods often matter more than the bare SGD update rule.",
          "Momentum helps when gradients point in a consistent direction over many steps. Adaptive optimizers such as Adam rescale coordinates using gradient history, which can speed up early training but may change generalization behavior.",
          "A useful engineering rule is to diagnose optimization in terms of signal-to-noise ratio: too much noise and progress is unstable; too little noise and training may become slow or settle into sharp regions.",
        ],
        keyIdeas: [
          "Momentum smooths updates across iterations.",
          "Adam, RMSProp, and AdaGrad adapt step sizes per parameter.",
          "Warmup stabilizes large models in the first training phase.",
          "Gradient clipping protects against exploding updates.",
          "Batch size and learning rate should be tuned together rather than independently.",
        ],
        equations: [
          "\\[ v_{t+1} = \\beta v_t + (1-\\beta) g_t \\]",
          "\\[ \\theta_{t+1} = \\theta_t - \\eta \\frac{m_t}{\\sqrt{v_t} + \\epsilon} \\]",
          "\\[ \\eta_t = \\eta_0 \\cdot \\min\\left(1, \\frac{t}{T_{warmup}}\\right) \\]",
        ],
        ahaInsights: [
          "Optimization hyperparameters are not cosmetic. They decide what kind of trajectory the model takes through parameter space.",
          "A faster optimizer is not automatically a better optimizer if it reaches solutions that generalize worse.",
        ],
        quiz: [
          {
            id: "sgd-applied-1",
            question: "What is the main purpose of momentum?",
            options: [
              "To accumulate useful gradient directions and reduce oscillation",
              "To compute exact gradients",
              "To eliminate the need for learning rates",
              "To force convexity of the objective",
            ],
            correctIndex: 0,
            explanation: "Momentum smooths updates and helps preserve motion in persistent directions.",
          },
        ],
        references: [
          "Ruder (2016) - An Overview of Gradient Descent Optimization Algorithms",
          "Kingma and Ba (2015) - Adam: A Method for Stochastic Optimization",
          "Goyal et al. (2017) - Accurate, Large Minibatch SGD: Training ImageNet in 1 Hour",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The advanced theory of stochastic optimization often models SGD as a noisy differential equation. This viewpoint explains why learning rate and batch size jointly determine an effective noise scale.",
          "That connection matters because the geometry of the noise influences which minima are favored. Broad minima, flat neighborhoods, and stability-based arguments all enter here, though none fully explains generalization on its own.",
          "Modern theory therefore treats SGD as both an optimizer and an implicit regularizer. It minimizes loss, but it also biases which minimizer the training process reaches.",
        ],
        keyIdeas: [
          "SGD can be approximated by a stochastic differential equation in the small-step regime.",
          "Noise scale depends on both learning rate and batch size.",
          "Generalization arguments often use flatness, stability, or margin-based viewpoints.",
          "Strict-saddle theory explains how noise can help escape unstable critical points.",
        ],
        equations: [
          "\\[ d\\theta_t = -\\nabla f(\\theta_t) \\, dt + \\sqrt{2T} \\, dW_t \\]",
          "\\[ \\text{noise scale} \\propto \\frac{\\eta}{B} \\]",
          "\\[ \\epsilon_{gen} \\leq \\frac{L^2}{n} \\sum_t \\eta_t \\quad \\text{(stability-style bound)} \\]",
        ],
        quiz: [
          {
            id: "sgd-advanced-1",
            question: "In the SDE view of SGD, what two knobs most directly influence the effective noise scale?",
            options: [
              "Learning rate and batch size",
              "Activation function and dropout rate",
              "Width and depth only",
              "Label smoothing and weight decay only",
            ],
            correctIndex: 0,
            explanation: "The effective stochasticity depends strongly on how large each step is and how much averaging happens inside the batch.",
          },
        ],
        references: [
          "Mandt, Hoffman, Blei (2017) - Stochastic Gradient Descent as Approximate Bayesian Inference",
          "Hardt, Recht, Singer (2016) - Train Faster, Generalize Better",
          "Bubeck - Convex Optimization: Algorithms and Complexity",
        ],
      },
    },
  ],
};

export default chapter;
