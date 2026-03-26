import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "joint-conditional",
  title: "Joint & Conditional Probability",
  description: "Probability relationships between multiple random variables.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Joint probability answers: what's the chance that two things happen together? If you flip two coins, P(both heads) = P(first heads AND second heads) = 1/4. The joint probability P(A, B) captures the likelihood of the combination—both events occurring simultaneously. For independent events, P(A, B) = P(A) × P(B); the joint probability is just multiplication.",
          "Conditional probability answers a different question: given that one thing happened, what's the chance of another? If you know the first coin is heads, P(second heads | first heads) = 1/2 for fair coins—the condition tells you nothing new. But if you're drawing cards without replacement, P(second ace | first ace) = 3/51, not 4/52. The condition changes what's possible, reshaping the probability space.",
          "The two are connected by the fundamental formula: P(A, B) = P(A|B) × P(B) = P(B|A) × P(A). Think of it as: the chance of both happening equals the chance of B happening, times the chance of A happening given B. You can decompose joint probabilities either way—through P(A|B) or P(B|A). This flexibility is the foundation of probabilistic reasoning and Bayes' theorem.",
        ],
        keyIdeas: [
          "Joint probability P(A, B): chance of both A and B occurring",
          "Conditional probability P(A|B): chance of A given B has occurred",
          "Independence: P(A, B) = P(A) × P(B); condition doesn't change probability",
          "Chain rule: P(A, B) = P(A|B) × P(B) = P(B|A) × P(A)",
          "Conditioning reshapes the sample space to only include outcomes where condition holds",
        ],
        equations: [
          "\\[ P(A, B) = P(A | B) \\cdot P(B) = P(B | A) \\cdot P(A) \\]",
          "\\[ P(A | B) = \\frac{P(A, B)}{P(B)} \\quad \\text{for } P(B) > 0 \\]",
          "\\[ \\text{Independence: } P(A, B) = P(A) \\cdot P(B) \\iff P(A|B) = P(A) \\]",
        ],
        references: [
          "3Blue1Brown - Conditional Probability",
          "Khan Academy - Conditional probability and independence",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "The chain rule generalizes to many variables: P(X₁, X₂, ..., Xₙ) = P(X₁)P(X₂|X₁)P(X₃|X₁,X₂)...P(Xₙ|X₁,...,Xₙ₋₁). Any ordering works—you can factor a joint distribution by conditioning in any sequence. This is how probabilistic models decompose complex distributions into products of simpler conditional distributions, making high-dimensional problems tractable.",
          "Marginalization extracts information about individual variables: P(A) = Σ_b P(A, B) for discrete, or P(A) = ∫ P(A, B) dB for continuous. The marginal 'integrates out' the other variable, giving you the distribution of A regardless of B. In practice, this often means summing over all possible values of B: if you have a joint table, marginalize by summing rows or columns.",
          "Bayes' theorem follows from the chain rule symmetry: P(A|B) = P(B|A)P(A)/P(B). The denominator P(B) = Σ_a P(B|A=a)P(A=a) is the marginal probability of the evidence. This formula lets you 'flip' conditional probabilities—crucial when P(B|A) is easier to specify than P(A|B). Medical diagnosis: P(disease|symptom) = P(symptom|disease)P(disease)/P(symptom).",
          "Independence vs conditional independence: X and Y are conditionally independent given Z if P(X, Y|Z) = P(X|Z)P(Y|Z). Variables can be marginally dependent but conditionally independent—a famous example: two causes of an effect are dependent (both likely when effect present) but conditionally independent given the effect. This structure underlies causal reasoning and graphical models.",
        ],
        keyIdeas: [
          "Chain rule decomposes joint into product of conditionals: any ordering works",
          "Marginalization sums/integrates out variables: P(A) = Σ_b P(A, B)",
          "Bayes' theorem flips conditionals using marginal probability as normalizer",
          "Conditional independence: P(X,Y|Z) = P(X|Z)P(Y|Z); may differ from marginal independence",
          "Graphical models encode conditional independence structure via graph topology",
          "Marginals don't determine joint without independence assumptions",
        ],
        equations: [
          "\\[ P(X_1, \\ldots, X_n) = \\prod_{i=1}^{n} P(X_i | X_1, \\ldots, X_{i-1}) \\]",
          "\\[ P(X) = \\sum_y P(X, y) = \\int P(X, y) \\, dy \\quad \\text{(Marginalization)} \\]",
          "\\[ P(A | B) = \\frac{P(B | A) \\cdot P(A)}{P(B)} = \\frac{P(B | A) \\cdot P(A)}{\\sum_a P(B | A=a) P(A=a)} \\]",
          "\\[ X \\perp\\!\\!\\!\\perp Y | Z \\iff P(X, Y | Z) = P(X | Z) P(Y | Z) \\]",
        ],
        references: [
          "Casella & Berger - Statistical Inference, Chapter 1",
          "Bishop - Pattern Recognition and Machine Learning, Chapter 8",
          "Koller & Friedman - Probabilistic Graphical Models, Chapter 2",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Conditional probability is defined rigorously using measure theory: P(A|B) = P(A∩B)/P(B) when P(B) > 0. For conditioning on σ-algebras, E[X|G] is the unique G-measurable random variable satisfying ∫_A X dP = ∫_A E[X|G] dP for all A ∈ G. This generalizes to conditional expectation, with the tower property E[E[X|G]] = E[X] enabling iterated conditioning through nested σ-algebras.",
          "d-separation in graphical models provides a graphical criterion for conditional independence. In a DAG, X and Y are d-separated given Z if every path between them is 'blocked'—either a chain or fork with Z in the middle, or a collider with neither Z nor its descendants in the conditioning set. The Bayes ball algorithm operationalizes this for checking conditional independence. Faithfulness assumes the graph captures all independencies.",
          "Copulas separate marginal distributions from dependence structure. By Sklar's theorem, any joint distribution F(x,y) = C(F_X(x), F_Y(y)) where C is a copula—a joint distribution on [0,1]² with uniform marginals. Gaussian copulas capture Gaussian dependence; Clayton and Gumbel copulas model tail dependence. This separation enables flexible multivariate modeling: specify marginals individually, then add dependence via copula.",
          "Exchangeability connects joint distributions to Bayesian inference. A sequence X₁, X₂, ... is exchangeable if P(X₁, ..., Xₙ) is invariant to permutation for all n. De Finetti's theorem: an exchangeable sequence is equivalent to drawing i.i.d. from an unknown distribution with a prior on that distribution. This justifies Bayesian inference as the natural framework for exchangeable data—no 'true parameter' assumption needed.",
          "Sufficient statistics compress data while preserving the joint distribution's parameter dependence. The factorization theorem: T is sufficient for θ iff P(x|θ) = g(T(x), θ)h(x). This means T(X) contains all information about θ. Minimal sufficient statistics achieve maximum compression. The Rao-Blackwell theorem shows that conditioning any estimator on a sufficient statistic improves it—a deep connection between conditioning and estimation.",
        ],
        keyIdeas: [
          "Conditional expectation w.r.t. σ-algebra is the rigorous measure-theoretic formulation",
          "d-separation: graphical criterion for reading conditional independence from DAGs",
          "Sklar's theorem: copulas separate marginals from dependence structure",
          "De Finetti: exchangeability implies latent parameter with prior (justifies Bayes)",
          "Sufficient statistics preserve all parameter information via factorization",
          "Rao-Blackwell: conditioning on sufficient statistics improves estimators",
        ],
        equations: [
          "\\[ \\mathbb{E}[X | \\mathcal{G}] \\text{ is } \\mathcal{G}\\text{-measurable and } \\int_A X \\, dP = \\int_A \\mathbb{E}[X|\\mathcal{G}] \\, dP \\; \\forall A \\in \\mathcal{G} \\]",
          "\\[ F(x, y) = C(F_X(x), F_Y(y)) \\quad \\text{(Sklar's theorem)} \\]",
          "\\[ X_1, X_2, \\ldots \\text{ exchangeable} \\iff X_i | \\theta \\overset{iid}{\\sim} F_\\theta, \\theta \\sim \\pi \\quad \\text{(De Finetti)} \\]",
          "\\[ T \\text{ sufficient} \\iff P(x|\\theta) = g(T(x), \\theta) h(x) \\quad \\text{(Factorization)} \\]",
        ],
        references: [
          "Durrett - Probability: Theory and Examples, Chapter 4",
          "Koller & Friedman - Probabilistic Graphical Models, Chapters 2-3",
          "Nelsen - An Introduction to Copulas",
          "Schervish - Theory of Statistics, Chapter 1",
        ],
      },
    },
  ],
};

export default chapter;
