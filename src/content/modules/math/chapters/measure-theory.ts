import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "measure-theory",
  title: "Measure Theory (Optional Advanced)",
  description: "Rigorous foundations for probability and integration.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Measure theory provides the rigorous foundation for probability. It formalizes the idea of size or volume for very general sets.",
          "A probability space is a measure space where the total measure is 1. Random variables are measurable functions on this space.",
          "While ML often works with densities, measure theory explains when densities exist and how expectations are defined.",
        ],
        keyIdeas: [
          "A sigma-algebra defines which sets are measurable",
          "A measure assigns nonnegative size to measurable sets",
          "Probability measures satisfy P(omega) = 1",
          "Random variables are measurable functions",
          "Integration is defined with respect to a measure",
          "Lebesgue measure generalizes length and volume",
        ],
        equations: [
          "\\[ (\\Omega, \\mathcal{F}, P) \\quad \\text{is a probability space} \\]",
          "\\[ X: (\\Omega, \\mathcal{F}) \\to (\\mathbb{R}, \\mathcal{B}) \\quad \\text{measurable} \\]",
          "\\[ \\mathbb{E}[X] = \\int_{\\Omega} X(\\omega) \\, dP(\\omega) \\]",
        ],
        references: [
          "Billingsley - Probability and Measure",
          "Royden and Fitzpatrick - Real Analysis",
          "Durrett - Probability: Theory and Examples",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Lebesgue integration handles limits of functions far better than Riemann integration. This is essential for convergence in probability.",
          "Absolute continuity explains when a measure has a density with respect to another measure, leading to the Radon-Nikodym derivative.",
          "In ML, likelihoods are densities with respect to a base measure, and expectations are integrals under that measure.",
        ],
        keyIdeas: [
          "Almost everywhere statements allow ignoring measure-zero sets",
          "Dominated convergence enables swapping limits and integrals",
          "Radon-Nikodym theorem defines densities between measures",
          "Change of variables uses Jacobians under measures",
          "Product measures define joint distributions",
          "Fubini and Tonelli justify iterated integrals",
        ],
        equations: [
          "\\[ \\mu \\ll \\nu \\Rightarrow \\exists f = \\frac{d\\mu}{d\\nu} \\text{ such that } \\mu(A) = \\int_A f \\, d\\nu \\]",
          "\\[ \\int f \\, d(\\mu \\times \\nu) = \\int \\left( \\int f(x,y) \\, d\\nu(y) \\right) d\\mu(x) \\]",
          "\\[ \\int f \\, d\\mu = \\int f \\frac{d\\mu}{d\\nu} \\, d\\nu \\]",
        ],
        references: [
          "Royden and Fitzpatrick - Real Analysis, Ch. 11",
          "Billingsley - Probability and Measure, Ch. 3",
          "Cohn - Measure Theory",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Measure-theoretic probability supports advanced topics like stochastic processes, martingales, and conditional expectations.",
          "Conditional expectation is a projection in L2 spaces, which clarifies why it is the optimal predictor under squared loss.",
          "In Bayesian inference, probability measures on function spaces (e.g., Gaussian processes) require measure theory for rigor.",
        ],
        keyIdeas: [
          "Conditional expectation is an L2 orthogonal projection",
          "Martingales generalize fair game processes",
          "Sigma-algebras represent information",
          "Regular conditional probabilities formalize conditioning",
          "Weak convergence of measures supports asymptotics",
          "Probability on function spaces enables stochastic processes",
        ],
        equations: [
          "\\[ \\mathbb{E}[X \\mid \\mathcal{G}] = \\arg\\min_{Y \\in L^2(\\mathcal{G})} \\mathbb{E}[ (X - Y)^2 ] \\]",
          "\\[ \\mathbb{E}[X \\mathbf{1}_G] = \\mathbb{E}[\\mathbb{E}[X \\mid \\mathcal{G}] \\mathbf{1}_G], \\; \\forall G \\in \\mathcal{G} \\]",
          "\\[ X_n \\Rightarrow X \\iff \\int f \\, d\\mu_n \\to \\int f \\, d\\mu \\]",
        ],
        references: [
          "Kallenberg - Foundations of Modern Probability",
          "Durrett - Probability: Theory and Examples, Ch. 4",
          "Williams - Probability with Martingales",
        ],
      },
    },
  ],
};

export default chapter;
