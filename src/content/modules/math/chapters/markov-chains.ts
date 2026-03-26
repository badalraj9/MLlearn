import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "markov-chains",
  title: "Markov Chains",
  description: "State transitions with memoryless property.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A Markov chain is a random process that jumps between states where the next step depends only on the current state. This memoryless property makes the math tractable and powerful.",
          "The dynamics are encoded in a transition matrix. Repeated multiplication by this matrix tells you how probabilities evolve over time.",
          "Many systems in ML and statistics can be modeled as Markov chains: random walks, PageRank, and MCMC sampling are classic examples.",
        ],
        keyIdeas: [
          "Markov property: future depends only on the present",
          "Transition matrix rows sum to 1",
          "State distribution evolves as p_{t+1} = p_t P",
          "Stationary distribution is a fixed point of P",
          "Irreducibility and aperiodicity imply convergence",
          "Detailed balance implies stationarity in reversible chains",
        ],
        equations: [
          "\\[ P(X_{t+1}=j \\mid X_t=i) = P_{ij} \\]",
          "\\[ p_{t+1} = p_t P \\]",
          "\\[ \\pi = \\pi P \\]",
        ],
        references: [
          "Norris - Markov Chains",
          "Levin, Peres, Wilmer - Markov Chains and Mixing Times",
          "Ross - Introduction to Probability Models",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Convergence speed is governed by the spectral gap of the transition matrix. A large gap means the chain mixes quickly.",
          "For finite state chains, the stationary distribution can be found by solving a linear system or using eigenvectors of P^T.",
          "Reversible chains satisfy detailed balance, which simplifies analysis and is central to MCMC design.",
        ],
        keyIdeas: [
          "Mixing time depends on the second largest eigenvalue magnitude",
          "Spectral gap = 1 - lambda_2 for reversible chains",
          "Detailed balance: pi_i P_{ij} = pi_j P_{ji}",
          "Lazy chains avoid periodicity by adding self-loops",
          "Coupling is a common method to bound mixing time",
          "Ergodic theorem gives long run averages",
        ],
        equations: [
          "\\[ \\gamma = 1 - \\lambda_2 \\]",
          "\\[ \\pi_i P_{ij} = \\pi_j P_{ji} \\]",
          "\\[ \\lim_{t\\to\\infty} p_t = \\pi \\]",
        ],
        references: [
          "Levin, Peres, Wilmer - Markov Chains and Mixing Times, Ch. 12",
          "Sinclair - Algorithms for Random Generation and Counting",
          "Robert and Casella - Monte Carlo Statistical Methods",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Markov chain Monte Carlo builds a chain whose stationary distribution is the target posterior. The main challenge is ensuring fast mixing in high dimensions.",
          "Conductance and bottleneck ratios quantify how easily probability flows between regions. Low conductance implies slow mixing.",
          "Nonreversible chains and lifting can accelerate mixing, but are harder to design and analyze.",
        ],
        keyIdeas: [
          "Conductance lower bounds mixing speed",
          "Metropolis-Hastings enforces detailed balance",
          "Gibbs sampling is a special case of MH",
          "Nonreversible dynamics can reduce autocorrelation",
          "Central limit theorems describe estimator variance",
          "Path coupling simplifies convergence proofs",
        ],
        equations: [
          "\\[ P_{ij} = Q_{ij} \\alpha(i,j), \\quad \\alpha(i,j) = \\min\\left(1, \\frac{\\pi_j Q_{ji}}{\\pi_i Q_{ij}}\\right) \\]",
          "\\[ \\Phi(S) = \\frac{\\sum_{i\\in S, j\\notin S} \\pi_i P_{ij}}{\\pi(S)} \\]",
          "\\[ t_{mix}(\\epsilon) \\le \\frac{1}{\\Phi^2} \\log\\left(\\frac{1}{\\epsilon \\pi_*}\\right) \\]",
        ],
        references: [
          "Tierney (1994) - Markov chains for exploring posterior distributions",
          "Levin, Peres, Wilmer - Markov Chains and Mixing Times",
          "Chen, Lovasz, Pak - Lifting Markov Chains to Speed Up Mixing",
        ],
      },
    },
  ],
};

export default chapter;
