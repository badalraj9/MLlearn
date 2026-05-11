import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "law-of-large-numbers",
  title: "Law of Large Numbers",
  description: "Sample averages converge to expected values.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The law of large numbers (LLN) says that averages of many independent samples converge to the expected value.",
          "It is the mathematical justification for using sample means to estimate true quantities.",
          "In ML, LLN underpins empirical risk minimization: as data grows, empirical averages approach population averages.",
        ],
        keyIdeas: [
          "Weak LLN: convergence in probability",
          "Strong LLN: almost sure convergence",
          "Requires independence and identical distribution in the classic form",
          "Explains why Monte Carlo estimates improve with more samples",
          "Variance controls the convergence rate",
          "LLN does not say anything about fluctuations (that is CLT)",
        ],
        equations: [
          "\\[ \\bar{X}_n = \\frac{1}{n} \\sum_{i=1}^n X_i \\]",
          "\\[ \\bar{X}_n \\xrightarrow{P} \\mathbb{E}[X] \\quad (\\text{Weak LLN}) \\]",
          "\\[ P\\left(\\left|\\bar{X}_n - \\mathbb{E}[X]\\right| > \\epsilon\\right) \\to 0 \\]",
        ],
        references: [
          "Ross - A First Course in Probability, Ch. 7",
          "Wasserman - All of Statistics, Ch. 5",
          "Durrett - Probability: Theory and Examples, Ch. 2",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Kolmogorov's strong law gives conditions for almost sure convergence, which is stronger than convergence in probability.",
          "For non-identical variables, versions like the Kolmogorov and Khintchine laws still apply under variance conditions.",
          "In practice, LLN explains the stability of batch estimates as batch size increases.",
        ],
        keyIdeas: [
          "Strong LLN guarantees sample averages converge almost surely",
          "Independence plus finite expectation is often sufficient",
          "Variance summability conditions extend LLN",
          "Chebyshev's inequality provides a simple LLN proof",
          "Bernstein and Hoeffding bounds quantify finite-sample behavior",
          "LLN justifies stochastic gradient estimates",
        ],
        equations: [
          "\\[ P\\left(\\lim_{n\\to\\infty} \\bar{X}_n = \\mathbb{E}[X]\\right) = 1 \\]",
          "\\[ \\sum_{n=1}^\\infty \\frac{\\text{Var}(X_n)}{n^2} < \\infty \\Rightarrow \\bar{X}_n - \\mathbb{E}[X_n] \\to 0 \\]",
          "\\[ P(|\\bar{X}_n - \\mu| > \\epsilon) \\le \\frac{\\sigma^2}{n\\epsilon^2} \\]",
        ],
        references: [
          "Durrett - Probability: Theory and Examples, Ch. 2",
          "Gut - Probability: A Graduate Course",
          "Wainwright - High-Dimensional Statistics, Ch. 2",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Empirical process theory studies uniform laws of large numbers over function classes, which is central to learning theory.",
          "Uniform convergence results explain why minimizing empirical risk yields good generalization when complexity is controlled.",
          "These results use tools like VC dimension and Rademacher complexity to quantify class size.",
        ],
        keyIdeas: [
          "Uniform LLN bounds sup over function classes",
          "Glivenko-Cantelli classes guarantee uniform convergence",
          "VC dimension controls sample complexity",
          "Rademacher complexity provides data-dependent bounds",
          "Symmetrization and concentration are key techniques",
          "Overfitting occurs when complexity overwhelms LLN guarantees",
        ],
        equations: [
          "\\[ \\sup_{f \\in \\mathcal{F}} \\left| \\frac{1}{n}\\sum_{i=1}^n f(X_i) - \\mathbb{E}f(X) \\right| \\to 0 \\]",
          "\\[ \\mathcal{R}_n(\\mathcal{F}) = \\mathbb{E}_{\\sigma} \\left[ \\sup_{f\\in\\mathcal{F}} \\frac{1}{n} \\sum_{i=1}^n \\sigma_i f(X_i) \\right] \\]",
          "\\[ n \\gtrsim \\frac{\\text{VC}(\\mathcal{F}) + \\log(1/\\delta)}{\\epsilon^2} \\]",
        ],
        references: [
          "Vapnik - The Nature of Statistical Learning Theory",
          "Shalev-Shwartz and Ben-David - Understanding Machine Learning",
          "van der Vaart and Wellner - Weak Convergence and Empirical Processes",
        ],
      },
    },
  ],
};

export default chapter;
