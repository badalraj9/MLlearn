import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "numerical-stability",
  title: "Numerical Stability",
  description: "Avoiding catastrophic errors in computation.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Numerical stability studies how algorithms behave under rounding and finite precision. A stable algorithm gives reliable answers even when arithmetic is imperfect.",
          "In ML, unstable computations can produce NaNs or silently wrong results, especially in deep networks and large matrix operations.",
          "Stability connects to conditioning: some problems are inherently sensitive, while others are well-behaved.",
        ],
        keyIdeas: [
          "Finite precision introduces rounding error",
          "Conditioning measures sensitivity of the true problem",
          "Stability measures sensitivity of the algorithm",
          "Backward stable algorithms solve a nearby problem",
          "Scaling and normalization improve stability",
          "Pivoting and reparameterization reduce error growth",
        ],
        equations: [
          "\\[ \\text{Relative error} \\approx \\kappa(A) \\cdot \\text{relative perturbation} \\]",
          "\\[ \\hat{x} = x + \\delta x \\quad \\text{with} \\quad \\frac{\\|\\delta x\\|}{\\|x\\|} \\le O(\\epsilon_{mach}) \\]",
          "\\[ \\kappa(A) = \\|A\\| \\|A^{-1}\\| \\]",
        ],
        references: [
          "Higham - Accuracy and Stability of Numerical Algorithms",
          "Trefethen and Bau - Numerical Linear Algebra",
          "Golub and Van Loan - Matrix Computations",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Catastrophic cancellation occurs when subtracting nearly equal numbers. Stable formulas avoid this by algebraic reformulation.",
          "Log-sum-exp stabilizes computations of log probabilities and is a standard trick in ML.",
          "Gradient explosion and vanishing are numerical stability issues in deep learning.",
        ],
        keyIdeas: [
          "Avoid subtracting nearly equal quantities",
          "Use log-sum-exp for stable log-likelihoods",
          "Rescale inputs and parameters to improve conditioning",
          "Mixed precision needs loss scaling to avoid underflow",
          "Stable softmax uses a shifted exponent",
          "Batch normalization can improve numerical conditioning",
        ],
        equations: [
          "\\[ \\log \\sum_i e^{x_i} = m + \\log \\sum_i e^{x_i - m}, \\quad m = \\max_i x_i \\]",
          "\\[ \\text{softmax}(x_i) = \\frac{e^{x_i - m}}{\\sum_j e^{x_j - m}} \\]",
          "\\[ \\hat{s} = \\frac{(a-b)(a+b)}{a+b} \\quad \\text{(stable)} \\]",
        ],
        references: [
          "Higham - Accuracy and Stability of Numerical Algorithms",
          "Goodfellow et al. - Deep Learning, Ch. 11",
          "Hubbard - The Floating-Point Guide (concepts)",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Backward error analysis provides a principled way to judge algorithmic reliability. If the algorithm solves a nearby problem, it is often good enough.",
          "Floating point models treat arithmetic as exact on slightly perturbed inputs, enabling rigorous error bounds.",
          "Stability analysis is crucial for large-scale optimization and second-order methods where matrix conditioning dominates.",
        ],
        keyIdeas: [
          "Backward stability is stronger than forward stability",
          "Rounding errors accumulate and can be bounded",
          "Iterative refinement improves solutions using residuals",
          "Preconditioning improves conditioning for linear solves",
          "Condition number governs attainable accuracy",
          "Stable algorithms can still fail on ill-conditioned problems",
        ],
        equations: [
          "\\[ \\text{fl}(a \\circ b) = (a \\circ b)(1+\\delta), \\quad |\\delta| \\le \\epsilon_{mach} \\]",
          "\\[ A\\hat{x} = b + r, \\quad \\|r\\| \\text{ small} \\]",
          "\\[ x_{k+1} = x_k + A^{-1}(b - A x_k) \\]",
        ],
        references: [
          "Higham - Accuracy and Stability of Numerical Algorithms, Ch. 2",
          "Demmel - Applied Numerical Linear Algebra",
          "Golub and Van Loan - Matrix Computations, Ch. 3",
        ],
      },
    },
  ],
};

export default chapter;
