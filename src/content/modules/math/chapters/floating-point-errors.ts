import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "floating-point-errors",
  title: "Floating Point Errors",
  description:
    "Understanding precision limits and their impact on numerical algorithms.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Computers can't store most real numbers exactly. When you write 0.1 in Python, the computer stores an approximation—the true binary representation would require infinitely many bits. This isn't a bug; it's a fundamental limitation. Just like you can't write out π completely in decimal, computers can't write out 0.1 completely in binary. The result: tiny errors creep into every calculation.",
          "Floating point numbers are stored in scientific notation: a mantissa times 2 raised to an exponent. A 64-bit double stores about 15-16 significant decimal digits. The gap between adjacent representable numbers grows with magnitude: near 1, the gap is about 10⁻¹⁶; near 10¹⁶, the gap is about 1. This means you can distinguish 1.0 from 1.0 + 10⁻¹⁶, but not 10¹⁶ from 10¹⁶ + 0.5—they're the same floating point number.",
          "These tiny errors can compound dramatically. The classic example: subtracting nearly equal numbers. If x = 1.0000001 and y = 1.0000000, their difference x - y should be 0.0000001, but with floating point errors, you might get 0.00000009999999 or worse. The significant digits you cared about got corrupted. This 'catastrophic cancellation' destroys precision and is the source of many numerical disasters.",
        ],
        keyIdeas: [
          "Most decimal numbers can't be represented exactly in binary floating point",
          "Double precision gives about 15-16 significant decimal digits",
          "The gap between representable numbers grows with magnitude",
          "Subtracting nearly equal numbers destroys precision (catastrophic cancellation)",
          "Tiny errors can compound into large errors through many operations",
        ],
        equations: [
          "\\[ \\text{fl}(x) = x(1 + \\epsilon), \\quad |\\epsilon| \\leq \\epsilon_{machine} \\approx 2.2 \\times 10^{-16} \\]",
          "\\[ \\text{Machine epsilon: gap between 1 and next representable number} \\]",
        ],
        references: [
          "What Every Computer Scientist Should Know About Floating-Point Arithmetic (Goldberg)",
          "Computerphile - Floating Point Numbers",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "IEEE 754 defines the floating point standard: for 64-bit doubles, 1 bit for sign, 11 bits for exponent, and 52 bits for mantissa (with implicit leading 1). Special values include +∞, -∞, NaN (not a number), and denormalized numbers near zero. Understanding these helps debug numerical issues: 0/0 = NaN, 1/0 = ∞, ∞ - ∞ = NaN. NaN propagates through calculations and is unequal to everything, including itself.",
          "Machine epsilon ε_machine ≈ 2.2 × 10⁻¹⁶ for double precision is the relative error bound for a single operation. After n operations, errors can grow to O(n·ε_machine) in the worst case. In practice, errors grow as √n on average due to random sign cancellation. For deep neural networks with millions of operations, accumulated error can reach 10⁻¹⁰ or worse—still usually negligible, but not always.",
          "Common pitfalls and fixes: never test float equality directly (use |a - b| < tolerance instead). Sum small numbers before large ones (Kahan summation preserves precision). Avoid computing eˣ - 1 for small x (use log1p and expm1 functions). For variance, use Welford's online algorithm instead of E[X²] - E[X]² which can be negative due to cancellation. In optimization, normalize gradients to avoid overflow/underflow.",
          "Mixed precision training uses float16 for speed with float32 master weights for accuracy. The challenge: gradients can underflow (too small to represent in float16). Loss scaling multiplies the loss by a large factor before backprop, then divides the gradients back. Modern GPUs have tensor cores that accelerate mixed precision automatically. The memory savings (half the bandwidth) often matter more than raw compute speed.",
        ],
        keyIdeas: [
          "IEEE 754: sign bit, exponent bits, mantissa bits; special values include ∞ and NaN",
          "Machine epsilon bounds relative error; errors accumulate over operations",
          "Never test a == b for floats; use absolute or relative tolerance",
          "Kahan summation and Welford's algorithm preserve precision",
          "Use log1p(x) = log(1+x) and expm1(x) = eˣ - 1 for small x",
          "Mixed precision training requires loss scaling to prevent gradient underflow",
        ],
        equations: [
          "\\[ \\epsilon_{machine} = 2^{-52} \\approx 2.2 \\times 10^{-16} \\quad \\text{(Double precision)} \\]",
          "\\[ \\text{Relative error: } \\frac{|\\text{fl}(x) - x|}{|x|} \\leq \\epsilon_{machine} \\]",
          "\\[ \\text{Kahan sum: } c = (y - t) - \\text{error} \\quad \\text{compensates for lost bits} \\]",
          "\\[ \\text{Welford: } M_n = M_{n-1} + \\frac{x_n - M_{n-1}}{n} \\quad \\text{(Online mean)} \\]",
        ],
        references: [
          "Goldberg - What Every Computer Scientist Should Know About Floating-Point",
          "Higham - Accuracy and Stability of Numerical Algorithms",
          "Micikevicius et al. - Mixed Precision Training (arXiv:1710.03740)",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Forward error analysis bounds the difference between computed and exact results. Backward error analysis asks: for what perturbed input would our computed result be exact? A backward stable algorithm produces the exact answer to a slightly perturbed problem. This perspective explains why algorithms can be accurate even with large forward errors—if the problem itself is ill-conditioned, no algorithm can do well.",
          "The condition number κ(f) = ‖x‖·‖∇f‖/‖f(x)‖ measures sensitivity to input perturbations. For linear systems Ax = b, κ(A) = ‖A‖·‖A⁻¹‖. When κ is large, tiny input changes cause huge output changes—no algorithm can recover. This is why nearly-singular matrices cause numerical chaos: the condition number explodes. Regularization improves conditioning by adding a diagonal term: (AᵀA + λI) has smaller condition number than AᵀA.",
          "Extended precision (float128, arbitrary precision libraries) provides more bits when needed. But precision alone doesn't solve conditioning problems—an ill-conditioned problem with infinite precision still has infinite condition number. BFloat16 (brain float) truncates mantissa to 7 bits for deep learning, accepting more rounding error for dynamic range. The tradeoff: lower precision enables larger models and batch sizes but risks instabilities.",
          "Floating point errors interact with algorithm convergence in subtle ways. In gradient descent, finite precision creates a noise floor—gradients below machine precision are essentially random. Newton's method can fail when the Hessian is numerically singular. The Landau notation O(ε_machine) hides constants that matter in practice: a well-implemented algorithm with error O(ε) beats a poorly-implemented O(√ε) algorithm.",
          "Hardware considerations: GPU tensor cores compute Fused Multiply-Add (FMA) with a single rounding step, reducing error. Accumulators in reduced precision can overflow; the I-BERT paper quantizes attention scores to avoid this. Frameworks like JAX enable automatic differentiation through custom numerical routines while preserving the error guarantees of the original algorithm.",
        ],
        keyIdeas: [
          "Backward stability: computed result is exact for slightly perturbed input",
          "Condition number κ bounds achievable accuracy regardless of algorithm",
          "Regularization improves conditioning; precision doesn't fix ill-conditioning",
          "Gradient noise floor: gradients below machine precision become random",
          "FMA (fused multiply-add) reduces rounding error with single rounding step",
          "BFloat16 trades mantissa bits for exponent range in deep learning",
        ],
        equations: [
          "\\[ \\kappa(f) = \\lim_{\\delta \\to 0} \\sup_{|\\Delta x| \\leq \\delta} \\frac{|\\Delta f|/|f|}{|\\Delta x|/|x|} \\]",
          "\\[ \\kappa(A) = \\|A\\| \\cdot \\|A^{-1}\\| = \\frac{\\sigma_{max}}{\\sigma_{min}} \\]",
          "\\[ \\text{Forward error} \\leq \\kappa \\times \\text{Backward error} \\]",
          "\\[ \\text{FMA: } \\text{fl}(a \\cdot b + c) \\text{ has one rounding, not two} \\]",
        ],
        references: [
          "Trefethen & Bau - Numerical Linear Algebra, Lectures 12-15",
          "Higham - Accuracy and Stability of Numerical Algorithms",
          "Wilkinson - Rounding Errors in Algebraic Processes",
          "arXiv:2101.09862 - I-BERT: Integer-only BERT Quantization",
        ],
      },
    },
  ],
};

export default chapter;
