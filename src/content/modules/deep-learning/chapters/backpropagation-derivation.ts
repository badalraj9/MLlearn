import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "backpropagation-derivation",
  title: "Backpropagation Derivation",
  description: "The mathematics behind gradient computation.",
  prerequisites: ["partial-derivatives", "chain-rule-high-dim", "gradient-jacobian"],
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Backpropagation is the algorithm that makes neural networks trainable. It tells us how much each weight contributed to the final error, and it does so without recomputing the whole network separately for every parameter.",
          "The central trick is the chain rule. A neural network is a long composition of functions, so if we know how the loss changes with one intermediate quantity, we can reuse that information to compute how the loss changes with earlier quantities.",
          "That reuse is the real insight. Backprop is dynamic programming for derivatives: compute a gradient once at the output, then pass it backward through each layer instead of starting from scratch every time.",
        ],
        keyIdeas: [
          "Backpropagation is reverse-mode automatic differentiation on a neural network.",
          "Gradients flow from the loss back toward earlier layers.",
          "Each layer needs only its local derivative and the upstream gradient.",
          "The computational savings come from reusing intermediate gradient terms.",
        ],
        equations: [
          "\\[ z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)} \\]",
          "\\[ a^{(l)} = \\sigma(z^{(l)}) \\]",
          "\\[ \\frac{\\partial L}{\\partial W^{(l)}} = \\frac{\\partial L}{\\partial z^{(l)}} \\frac{\\partial z^{(l)}}{\\partial W^{(l)}} \\]",
        ],
        ahaInsights: [
          "Backprop is not a special neural-network trick. It is just the chain rule organized efficiently.",
          "The hard part is not taking derivatives. The hard part is avoiding repeated work, and backprop solves exactly that.",
        ],
        equationSteps: [
          {
            latex: "\\[ L = L(a^{(L)}, y) \\]",
            explanation: "Start at the output layer: the loss depends on the network output and the target.",
          },
          {
            latex: "\\[ \\frac{\\partial L}{\\partial z^{(L)}} = \\frac{\\partial L}{\\partial a^{(L)}} \\odot \\sigma'(z^{(L)}) \\]",
            explanation: "Use the chain rule to move from output activations to output pre-activations.",
          },
          {
            latex: "\\[ \\frac{\\partial L}{\\partial a^{(l-1)}} = (W^{(l)})^T \\frac{\\partial L}{\\partial z^{(l)}} \\]",
            explanation: "Propagate the gradient backward through the linear transformation.",
          },
          {
            latex: "\\[ \\frac{\\partial L}{\\partial z^{(l-1)}} = \\frac{\\partial L}{\\partial a^{(l-1)}} \\odot \\sigma'(z^{(l-1)}) \\]",
            explanation: "Pass through the nonlinearity and repeat layer by layer.",
          },
        ],
        quiz: [
          {
            id: "backprop-foundation-1",
            question: "What mathematical rule is backpropagation built on?",
            options: ["The chain rule", "Taylor expansion", "Bayes' rule", "Jensen's inequality"],
            correctIndex: 0,
            explanation: "Backprop works by repeatedly applying the chain rule through the computation graph.",
          },
          {
            id: "backprop-foundation-2",
            question: "Why is backprop efficient?",
            options: [
              "It reuses intermediate gradients instead of recomputing derivatives for every parameter",
              "It avoids matrix multiplication",
              "It only works for linear networks",
              "It computes exact Hessians in one pass",
            ],
            correctIndex: 0,
            explanation: "The efficiency comes from reusing shared sub-derivatives across many parameters.",
          },
        ],
        references: [
          "3Blue1Brown - Gradient descent, how neural networks learn",
          "CS231n - Backpropagation notes",
        ],
      },
      playground: {
        type: "slider",
        graphFn: "a * x^2 + b * x + c",
        sliders: [
          { id: "a", label: "Quadratic coefficient", min: -2, max: 2, step: 0.1, default: 1 },
          { id: "b", label: "Linear coefficient", min: -3, max: 3, step: 0.1, default: 0 },
          { id: "c", label: "Constant", min: -2, max: 2, step: 0.1, default: 0 },
        ],
        xRange: [-5, 5],
        yRange: [-10, 10],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "For a dense layer, the backward pass is easiest to understand by separating the linear map from the activation. The linear part sends activations forward, and its transpose sends gradients backward.",
          "Suppose we have one hidden layer: \\(z^{(1)} = W^{(1)}x + b^{(1)}\\), \\(a^{(1)} = \\sigma(z^{(1)})\\), \\(z^{(2)} = W^{(2)}a^{(1)} + b^{(2)}\\). Backprop first computes the output error, then uses it to compute gradients for the second layer, then reuses that signal to obtain gradients for the first layer.",
          "This is exactly how autodiff frameworks work under the hood. They build a computation graph in the forward pass and then traverse it backward, applying local derivative rules for each node.",
        ],
        keyIdeas: [
          "The transpose of the weight matrix appears naturally in gradient propagation.",
          "Activation derivatives are pointwise gates on the upstream gradient.",
          "Weight gradients are outer products of local error and previous activations.",
          "Reverse-mode autodiff is ideal when the output is scalar and parameters are many.",
        ],
        equations: [
          "\\[ \\delta^{(L)} = \\frac{\\partial L}{\\partial a^{(L)}} \\odot \\sigma'(z^{(L)}) \\]",
          "\\[ \\delta^{(l)} = (W^{(l+1)})^T \\delta^{(l+1)} \\odot \\sigma'(z^{(l)}) \\]",
          "\\[ \\frac{\\partial L}{\\partial W^{(l)}} = \\delta^{(l)} (a^{(l-1)})^T \\]",
        ],
        ahaInsights: [
          "Linear layers push activations forward with W, but they pull gradients backward with W^T.",
          "The gradient with respect to weights is not mysterious: it is just local error times the input that reached that weight.",
        ],
        quiz: [
          {
            id: "backprop-applied-1",
            question: "Why does W^T appear in the backward pass of a linear layer?",
            options: [
              "Because gradients propagate through the linear map via its transpose",
              "Because transposes improve numerical stability",
              "Because activations must be normalized first",
              "Because backprop only works for symmetric matrices",
            ],
            correctIndex: 0,
            explanation: "The derivative of a linear map with respect to its input is the transpose when written in vector form.",
          },
          {
            id: "backprop-applied-2",
            question: "What is the shape intuition behind dL/dW for a dense layer?",
            options: [
              "It is an outer product between the layer error and the previous activations",
              "It is always a scalar",
              "It is the Hessian of the loss",
              "It equals the activations squared",
            ],
            correctIndex: 0,
            explanation: "Each weight connects one previous activation to one current error term, which yields an outer-product structure.",
          },
        ],
        references: [
          "Baydin et al. (2018) - Automatic Differentiation in Machine Learning",
          "Goodfellow, Bengio, Courville - Deep Learning, Chapter 6",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced backpropagation topics mostly revolve around scale: memory, higher-order derivatives, and differentiating through more complicated computation such as recurrence, control flow, or fixed-point layers.",
          "Checkpointing reduces memory by recomputing part of the forward pass during backprop. Higher-order autodiff enables Hessian-vector products, meta-learning, and implicit differentiation for equilibrium models.",
          "The important engineering lesson is that differentiation is a design constraint. Once models become large, the question is not only whether an operation is expressive, but whether it is differentiable efficiently enough to train.",
        ],
        keyIdeas: [
          "Checkpointing trades extra computation for lower memory usage.",
          "Higher-order derivatives power curvature-aware methods and meta-learning.",
          "Implicit differentiation can avoid unrolling very long iterative processes.",
          "Modern autodiff systems treat computation graphs as first-class optimization objects.",
        ],
        equations: [
          "\\[ Hv = \\nabla_x (\\nabla_x L \\cdot v) \\]",
          "\\[ F(z^*, \\theta) = 0 \\Rightarrow \\frac{dz^*}{d\\theta} = -\\left(\\frac{\\partial F}{\\partial z}\\right)^{-1} \\frac{\\partial F}{\\partial \\theta} \\]",
          "\\[ \\text{memory} \\downarrow \\; \\Longleftrightarrow \\; \\text{recomputation} \\uparrow \\]",
        ],
        quiz: [
          {
            id: "backprop-advanced-1",
            question: "What problem does gradient checkpointing primarily address?",
            options: [
              "High memory cost during the backward pass",
              "Lack of nonlinearities",
              "Overfitting from large datasets",
              "Vanishing labels",
            ],
            correctIndex: 0,
            explanation: "Checkpointing stores fewer activations and recomputes some of them later to save memory.",
          },
        ],
        references: [
          "Griewank and Walther - Evaluating Derivatives",
          "Chen et al. (2016) - Training Deep Nets with Sublinear Memory Cost",
          "Martens and Grosse (2015) - Optimizing Neural Networks with Kronecker-factored Approximate Curvature",
        ],
      },
      playground: {
        type: "equation",
        equation: "x^3 - 3*x",
        xRange: [-3, 3],
        yRange: [-5, 5],
      },
    },
  ],
};

export default chapter;
