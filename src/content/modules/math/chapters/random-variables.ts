import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "random-variables",
  title: "Random Variables",
  description: "Variables whose values are determined by random outcomes.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A random variable is a function that assigns a number to each outcome of a random experiment. It turns randomness into something we can compute with.",
          "Random variables can be discrete or continuous, and their behavior is described by a probability distribution.",
          "Understanding random variables is the basis for expectations, variance, and probabilistic modeling in ML.",
        ],
        keyIdeas: [
          "A random variable is a measurable function on a probability space",
          "Distributions summarize the probabilities of values",
          "The CDF gives P(X <= x) and always increases from 0 to 1",
          "PDFs and PMFs describe continuous and discrete cases",
          "Expectation is a weighted average under the distribution",
          "Independence means joint distribution factorizes",
        ],
        equations: [
          "\\[ F_X(x) = P(X \\le x) \\]",
          "\\[ \\mathbb{E}[X] = \\sum_x x \\; P(X=x) \\quad \\text{or} \\quad \\mathbb{E}[X] = \\int x f_X(x) \\, dx \\]",
          "\\[ P(X,Y) = P(X)P(Y) \\quad \\text{if independent} \\]",
        ],
        references: [
          "Ross - A First Course in Probability",
          "Casella and Berger - Statistical Inference, Ch. 1",
          "Grinstead and Snell - Introduction to Probability",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Transformations of random variables use change of variables formulas, which are essential for derived distributions.",
          "Joint, marginal, and conditional distributions capture relationships between variables and are crucial for probabilistic models.",
          "Moment generating functions and characteristic functions provide compact summaries for distributions and simplify proofs.",
        ],
        keyIdeas: [
          "Joint density integrates to 1 over all variables",
          "Marginals are obtained by integrating out variables",
          "Conditional distributions follow Bayes rule",
          "MGFs determine distributions when they exist",
          "Covariance measures linear dependence",
          "Correlation normalizes covariance to a unitless value",
        ],
        equations: [
          "\\[ f_{X}(x) = \\int f_{X,Y}(x,y) \\, dy \\]",
          "\\[ f_{X\\mid Y}(x\\mid y) = \\frac{f_{X,Y}(x,y)}{f_Y(y)} \\]",
          "\\[ \\text{Cov}(X,Y) = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y] \\]",
        ],
        references: [
          "Casella and Berger - Statistical Inference, Ch. 2",
          "DeGroot and Schervish - Probability and Statistics",
          "Papoulis and Pillai - Probability, Random Variables, and Stochastic Processes",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Random variables in high dimensions behave differently: concentration phenomena and tail bounds become central.",
          "Sub-Gaussian and sub-Exponential distributions provide a framework for controlling tails beyond Gaussian assumptions.",
          "These tools underpin generalization guarantees and high-dimensional statistics in ML.",
        ],
        keyIdeas: [
          "Concentration inequalities bound deviations from expectation",
          "Sub-Gaussian tails have exponential decay",
          "MGFs control tail bounds via Chernoff methods",
          "Union bounds handle maxima over many variables",
          "Orlicz norms quantify tail behavior",
          "High-dimensional geometry changes intuition about variance",
        ],
        equations: [
          "\\[ P(|X-\\mathbb{E}X| \\ge t) \\le 2\\exp\\left(-\\frac{t^2}{2\\sigma^2}\\right) \\]",
          "\\[ \\mathbb{E}[e^{\\lambda X}] \\le \\exp\\left(\\frac{\\lambda^2 \\sigma^2}{2}\\right) \\]",
          "\\[ \\|X\\|_{\\psi_2} = \\inf\\{c>0: \\mathbb{E}[e^{X^2/c^2}] \\le 2\\} \\]",
        ],
        references: [
          "Vershynin - High-Dimensional Probability",
          "Boucheron, Lugosi, Massart - Concentration Inequalities",
          "Wainwright - High-Dimensional Statistics",
        ],
      },
    },
  ],
};

export default chapter;
