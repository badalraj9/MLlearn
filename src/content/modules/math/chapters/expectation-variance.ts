import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "expectation-variance",
  title: "Expectation & Variance",
  description: "Measures of center and spread for random variables.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Expectation is the weighted average of all possible outcomes, where each outcome is weighted by its probability. If you roll a fair die infinitely many times and take the average, you get 3.5—not because 3.5 ever appears on a die, but because it's the balance point of the distribution. The expectation E[X] tells you where a random variable is centered, not what specific value you'll observe.",
          "Variance measures how spread out the values are around the expectation. A fair die has variance 35/12 ≈ 2.9 because outcomes range from 1 to 6 with equal probability. A die that always rolls 3.5 would have zero variance—it's perfectly predictable. High variance means outcomes are typically far from the mean; low variance means they cluster tightly. Standard deviation, the square root of variance, has the same units as the original variable.",
          "Together, expectation and variance give you a two-number summary of any distribution. The expectation tells you 'where,' and the variance tells you 'how spread out.' For a normal distribution, this fully specifies the shape—about 68% of values fall within one standard deviation of the mean, 95% within two, and 99.7% within three. These 'empirical rules' make variance intuitive for interpreting data.",
        ],
        keyIdeas: [
          "Expectation = weighted average of outcomes by their probabilities",
          "Variance = average squared distance from the mean",
          "Standard deviation = √variance; same units as the data",
          "E[X] tells you the center; Var(X) tells you the spread",
          "For normal distributions: 68-95-99.7 rule around the mean",
        ],
        equations: [
          "\\[ \\mathbb{E}[X] = \\sum_x x \\cdot P(X = x) \\quad \\text{or} \\quad \\int x \\cdot f(x) \\, dx \\]",
          "\\[ \\text{Var}(X) = \\mathbb{E}[(X - \\mathbb{E}[X])^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 \\]",
          "\\[ \\sigma = \\sqrt{\\text{Var}(X)} \\quad \\text{(Standard deviation)} \\]",
        ],
        references: [
          "3Blue1Brown - Expectation and Variance",
          "Khan Academy - Expected value and variance",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Linearity of expectation is the most powerful computational tool: E[aX + bY] = aE[X] + bE[Y] always, even when X and Y are dependent. This makes complex expectations tractable. If X is the sum of n coin flips, E[X] = n·E[one flip] = n·p, regardless of dependencies between flips. Linearity fails for products: E[XY] ≠ E[X]·E[Y] unless X and Y are uncorrelated.",
          "Variance behaves differently. For independent variables, Var(X + Y) = Var(X) + Var(Y). But for general variables, Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y). The covariance Cov(X, Y) = E[XY] - E[X]·E[Y] measures linear association. Positive covariance means X and Y tend to be large together; negative means one large implies the other small. Correlation ρ = Cov(X,Y)/(σ_X·σ_Y) normalizes covariance to [-1, 1].",
          "The law of total variance decomposes variance into explained and unexplained parts: Var(X) = E[Var(X|Y)] + Var(E[X|Y]). This is fundamental in analysis of variance (ANOVA) and hierarchical models. The first term is average within-group variance; the second is between-group variance. For prediction, this shows how much variance a model using Y can explain.",
          "Computational tricks: compute variance via E[X²] - (E[X])² rather than the definition—it requires two expectations instead of one involving the random variable centered at its mean. For sample variance, use Bessel's correction: s² = (1/(n-1))Σ(Xᵢ - X̄)² is unbiased, while (1/n)Σ(Xᵢ - X̄)² is biased but has lower MSE. In code, use the Welford algorithm for numerically stable online variance computation.",
        ],
        keyIdeas: [
          "Linearity: E[aX + bY] = aE[X] + bE[Y] always holds",
          "Independent: Var(X + Y) = Var(X) + Var(Y); otherwise add 2·Cov(X,Y)",
          "Covariance measures linear association; correlation normalizes to [-1,1]",
          "Law of total variance: Var(X) = E[Var(X|Y)] + Var(E[X|Y])",
          "Compute variance as E[X²] - (E[X])² for efficiency",
          "Bessel's correction (n-1) makes sample variance unbiased",
        ],
        equations: [
          "\\[ \\mathbb{E}[aX + bY] = a\\mathbb{E}[X] + b\\mathbb{E}[Y] \\quad \\text{(Linearity)} \\]",
          "\\[ \\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X, Y) \\]",
          "\\[ \\text{Cov}(X, Y) = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y] \\]",
          "\\[ \\text{Var}(X) = \\mathbb{E}[\\text{Var}(X|Y)] + \\text{Var}(\\mathbb{E}[X|Y]) \\quad \\text{(Total variance)} \\]",
        ],
        references: [
          "Casella & Berger - Statistical Inference, Chapter 2",
          "Wasserman - All of Statistics, Chapter 2",
          "Sheldon Ross - A First Course in Probability",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Higher moments extend expectation and variance: the k-th moment is E[Xᵏ], and the k-th central moment is E[(X - μ)ᵏ]. The third central moment measures skewness (asymmetry); the fourth measures kurtosis (tail heaviness). Moment generating functions M(t) = E[eᵗˣ] generate all moments via derivatives: E[Xᵏ] = M⁽ᵏ⁾(0). The characteristic function φ(t) = E[eⁱᵗˣ] always exists and uniquely determines the distribution.",
          "Concentration inequalities bound the probability of deviations from expectation. Markov's inequality: P(X ≥ a) ≤ E[X]/a for non-negative X. Chebyshev's inequality: P(|X - μ| ≥ kσ) ≤ 1/k² gives distribution-free bounds using only mean and variance. Hoeffding's inequality provides exponential tail bounds for bounded sums: P(|X̄ - μ| ≥ ε) ≤ 2exp(-2nε²/(b-a)²) for Xᵢ ∈ [a,b]. These bounds are foundational for generalization theory and bandit algorithms.",
          "Conditional expectation E[X|Y] is a random variable—the expected value of X given the information in Y. It satisfies the tower property: E[E[X|Y]] = E[X] and E[X|Y,Z] computed iteratively. Geometrically, E[X|Y] is the projection of X onto the σ-algebra generated by Y. This perspective connects probability to functional analysis and justifies least-squares prediction: E[X|Y] minimizes E[(X - g(Y))²] over all functions g.",
          "The covariance matrix Σ for a random vector X ∈ ℝᵈ has entries Σᵢⱼ = Cov(Xᵢ, Xⱼ). It is always positive semidefinite. The variance of any linear combination is Var(aᵀX) = aᵀΣa. Principal Component Analysis finds directions of maximal variance by diagonalizing Σ. The precision matrix Σ⁻¹ encodes conditional independence: (Σ⁻¹)ᵢⱼ = 0 iff Xᵢ ⊥ Xⱼ | {all other variables} for multivariate Gaussians.",
          "Jensen's inequality states that for convex f: f(E[X]) ≤ E[f(X)]. This fundamental inequality explains why E[X²] ≥ (E[X])² (variance non-negative), why geometric mean ≤ arithmetic mean, and why mutual information is non-negative. In optimization, Jensen enables bounding intractable expectations by evaluating functions at expected values—a key tool in variational inference and the EM algorithm.",
        ],
        keyIdeas: [
          "Higher moments: skewness (3rd) and kurtosis (4th) characterize distribution shape",
          "Moment/characteristic functions uniquely determine distributions",
          "Concentration inequalities: Markov, Chebyshev, Hoeffding bound tail probabilities",
          "Conditional expectation is the optimal predictor; satisfies tower property",
          "Covariance matrix diagonalization = PCA; precision matrix encodes conditional independence",
          "Jensen's inequality: f(E[X]) ≤ E[f(X)] for convex f",
        ],
        equations: [
          "\\[ \\text{Chebyshev: } P(|X - \\mu| \\geq k\\sigma) \\leq \\frac{1}{k^2} \\]",
          "\\[ \\text{Hoeffding: } P(|\\bar{X}_n - \\mu| \\geq \\epsilon) \\leq 2\\exp\\left(-\\frac{2n\\epsilon^2}{(b-a)^2}\\right) \\]",
          "\\[ \\mathbb{E}[\\mathbb{E}[X|Y]] = \\mathbb{E}[X] \\quad \\text{(Tower property)} \\]",
          "\\[ \\text{Jensen: } f(\\mathbb{E}[X]) \\leq \\mathbb{E}[f(X)] \\quad \\text{for convex } f \\]",
        ],
        references: [
          "Billingsley - Probability and Measure, Chapters 3-4",
          "Boucheron, Lugosi, Massart - Concentration Inequalities",
          "Cover & Thomas - Elements of Information Theory, Chapter 2",
          "Rao - Linear Statistical Inference, Chapter 8",
        ],
      },
    },
  ],
};

export default chapter;
