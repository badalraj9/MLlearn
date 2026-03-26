import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "bayes-theorem",
  title: "Bayes' Theorem",
  description: "The mathematical framework for updating beliefs with evidence.",
  prerequisites: ["random-variables", "joint-conditional"],
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Bayes' theorem answers a simple question: once I see evidence, how should I change my belief? The theorem is the mathematical rule for moving from a prior belief to a posterior belief.",
          "The famous intuition problem is the rare-disease test. A positive test sounds convincing, but if the disease is rare, many positives may still be false alarms. Bayes forces you to combine test quality with base rates instead of trusting the evidence in isolation.",
          "The same logic appears in spam filtering, fraud detection, medical diagnosis, and machine learning. A model starts with some prior expectation, sees data, and updates that belief in a disciplined way.",
        ],
        keyIdeas: [
          "Posterior = updated belief after seeing evidence.",
          "Prior = belief before seeing the new evidence.",
          "Likelihood = how compatible the evidence is with a hypothesis.",
          "Evidence = how common the observation is overall, across all competing hypotheses.",
          "Bayes protects you from the base-rate fallacy.",
        ],
        equations: [
          "\\[ P(H \\mid E) = \\frac{P(E \\mid H) P(H)}{P(E)} \\]",
          "\\[ \\text{Posterior} = \\frac{\\text{Likelihood} \\times \\text{Prior}}{\\text{Evidence}} \\]",
          "\\[ P(E) = P(E \\mid H)P(H) + P(E \\mid \\neg H)P(\\neg H) \\]",
        ],
        ahaInsights: [
          "A strong-looking signal does not guarantee a strong conclusion; if the event is rare enough, the prior can dominate.",
          "Bayes is not about adding evidence to a belief. It is about reweighting competing explanations.",
        ],
        equationSteps: [
          {
            latex: "\\[ P(H \\mid E) = \\frac{P(H \\cap E)}{P(E)} \\]",
            explanation: "Start from the definition of conditional probability: probability of H given E equals the joint probability divided by the probability of the evidence.",
          },
          {
            latex: "\\[ P(H \\cap E) = P(E \\mid H) P(H) \\]",
            explanation: "Rewrite the joint probability using the reverse conditional direction.",
          },
          {
            latex: "\\[ P(H \\mid E) = \\frac{P(E \\mid H) P(H)}{P(E)} \\]",
            explanation: "Substitute the joint expression into the first equation. This is Bayes' theorem.",
          },
          {
            latex: "\\[ P(E) = P(E \\mid H)P(H) + P(E \\mid \\neg H)P(\\neg H) \\]",
            explanation: "Expand the denominator using the law of total probability so the theorem becomes numerically usable.",
          },
        ],
        quiz: [
          {
            id: "bayes-foundation-1",
            question: "Which term in Bayes' theorem encodes what you believed before seeing the evidence?",
            options: ["Prior", "Likelihood", "Posterior", "Evidence"],
            correctIndex: 0,
            explanation: "The prior is the belief before the new observation arrives.",
          },
          {
            id: "bayes-foundation-2",
            question: "Why is the denominator P(E) needed?",
            options: [
              "It normalizes the updated beliefs so probabilities remain valid",
              "It removes the prior",
              "It forces the posterior to equal the likelihood",
              "It measures model complexity",
            ],
            correctIndex: 0,
            explanation: "P(E) rescales the numerator so the posterior is a proper probability distribution.",
          },
          {
            id: "bayes-foundation-3",
            question: "If a disease is extremely rare, what common mistake does Bayes help avoid?",
            options: [
              "Ignoring the base rate",
              "Ignoring the likelihood entirely",
              "Assuming priors and posteriors are identical",
              "Treating probabilities as log odds",
            ],
            correctIndex: 0,
            explanation: "Bayes makes you account for the rarity of the event, which is exactly the base-rate issue.",
          },
        ],
        references: [
          "3Blue1Brown - Bayes' Theorem",
          "Khan Academy - Conditional Probability and Bayes",
        ],
      },
      playground: {
        type: "widget",
        widgetId: "bayes-medical-test",
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In machine learning, Bayes appears whenever we estimate hidden quantities from observed data. If \\(\\theta\\) are model parameters and \\(D\\) is data, then Bayes says the posterior over parameters is proportional to likelihood times prior.",
          "This perspective explains regularization. L2 regularization behaves like a Gaussian prior on weights, while L1 behaves like a Laplace prior. The optimization problem and the probabilistic interpretation are two views of the same object.",
          "A concrete example is spam filtering. If an email contains words like 'free', 'winner', and 'urgent', Bayes combines how common those words are in spam with how common spam is overall. The final classification is an update, not a raw score.",
          "In implementation, probabilities are usually multiplied across many features or observations, so practitioners work in log-space to avoid underflow and to convert products into sums.",
        ],
        keyIdeas: [
          "Bayesian inference turns parameter estimation into posterior updating.",
          "MAP estimation is posterior maximization rather than full posterior averaging.",
          "Conjugate priors produce closed-form posteriors in simple models.",
          "Regularization terms can often be interpreted as priors.",
          "Log-space computation is the standard numerical trick in practice.",
        ],
        equations: [
          "\\[ p(\\theta \\mid D) = \\frac{p(D \\mid \\theta) p(\\theta)}{p(D)} \\]",
          "\\[ \\hat{\\theta}_{MAP} = \\arg\\max_\\theta \\left[ \\log p(D \\mid \\theta) + \\log p(\\theta) \\right] \\]",
          "\\[ p(D) = \\int p(D \\mid \\theta) p(\\theta) \\, d\\theta \\]",
        ],
        ahaInsights: [
          "Regularization is not just an optimization hack. In many cases it is a prior in disguise.",
          "MAP uses Bayes, but it still throws away posterior uncertainty by keeping only the mode.",
        ],
        equationSteps: [
          {
            latex: "\\[ p(\\theta \\mid D) \\propto p(D \\mid \\theta)p(\\theta) \\]",
            explanation: "For inference, the normalizing constant is often hard to compute, so we first reason with proportionality.",
          },
          {
            latex: "\\[ \\log p(\\theta \\mid D) = \\log p(D \\mid \\theta) + \\log p(\\theta) - \\log p(D) \\]",
            explanation: "Move to log-space so products become sums and numeric stability improves.",
          },
          {
            latex: "\\[ \\hat{\\theta}_{MAP} = \\arg\\max_\\theta \\left[ \\log p(D \\mid \\theta) + \\log p(\\theta) \\right] \\]",
            explanation: "Because the evidence term does not depend on theta, MAP optimization can ignore it.",
          },
        ],
        quiz: [
          {
            id: "bayes-applied-1",
            question: "What is the main difference between MLE and MAP?",
            options: [
              "MAP includes a prior term while MLE does not",
              "MLE uses probabilities while MAP uses logits",
              "MLE requires conjugacy while MAP does not",
              "MAP can only be used for discrete variables",
            ],
            correctIndex: 0,
            explanation: "MAP adds prior information through log p(theta), while MLE maximizes only the likelihood.",
          },
          {
            id: "bayes-applied-2",
            question: "Why do Bayesian computations often move into log-space?",
            options: [
              "To avoid underflow and turn products into sums",
              "To remove the evidence term",
              "To force conjugate priors",
              "To guarantee convexity",
            ],
            correctIndex: 0,
            explanation: "Likelihood products can become tiny, so log-space is the stable numerical representation.",
          },
        ],
        references: [
          "Bishop - Pattern Recognition and Machine Learning, Chapter 2",
          "Murphy - Machine Learning: A Probabilistic Perspective, Chapter 5",
          "Gelman et al. - Bayesian Data Analysis",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The advanced Bayesian story is not just about a formula. It is about whether you can actually compute or approximate the posterior in high dimensions. That is where variational inference, MCMC, Laplace approximations, and normalizing flows enter.",
          "The marginal likelihood is especially important because it balances fit and complexity automatically. In theory this gives Bayesian model comparison a principled elegance; in practice, it is often the hardest term in the whole framework.",
          "Modern ML uses Bayesian ideas selectively. Ensembles, dropout-based approximations, and probabilistic programming all borrow from Bayesian reasoning, but exact posterior inference in large neural networks remains computationally difficult.",
        ],
        keyIdeas: [
          "The posterior is conceptually clean but often computationally intractable.",
          "Variational inference trades exactness for scalable optimization.",
          "MCMC aims for asymptotically correct samples but can be expensive.",
          "The evidence term supports model comparison but is difficult to estimate reliably.",
          "Large-scale Bayesian deep learning remains an active research area.",
        ],
        equations: [
          "\\[ \\text{ELBO}(q) = \\mathbb{E}_{q(\\theta)}[\\log p(D, \\theta)] - \\mathbb{E}_{q(\\theta)}[\\log q(\\theta)] \\]",
          "\\[ \\log p(D) = \\text{ELBO}(q) + D_{KL}(q(\\theta) \\| p(\\theta \\mid D)) \\]",
          "\\[ H(\\theta, p) = -\\log p(\\theta \\mid D) + \\frac{1}{2} p^T M^{-1} p \\]",
        ],
        ahaInsights: [
          "The cleanest part of Bayes is usually the model statement; the hardest part is the denominator.",
          "Approximate Bayesian inference is not one method. It is a family of compromises between fidelity, speed, and uncertainty quality.",
        ],
        quiz: [
          {
            id: "bayes-advanced-1",
            question: "What does the gap between log p(D) and the ELBO equal?",
            options: [
              "The KL divergence between q(theta) and the true posterior",
              "The Fisher information",
              "The Hessian determinant",
              "The prior entropy",
            ],
            correctIndex: 0,
            explanation: "That gap is exactly the divergence between the variational approximation and the true posterior.",
          },
        ],
        references: [
          "Blei, Kucukelbir, McAuliffe (2017) - Variational Inference: A Review for Statisticians",
          "Neal - MCMC Using Hamiltonian Dynamics",
          "Murphy - Probabilistic Machine Learning",
        ],
      },
    },
  ],
};

export default chapter;
