import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "elbo-from-bayes",
  title: "ELBO from Bayes' Rule",
  description: "Deriving the bound from log-evidence decomposition.",
  prerequisites: ["bayes-theorem", "bayesian-inference"],
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The ELBO appears when we want to learn a latent-variable model but cannot compute the exact posterior over latent variables. Instead of optimizing the true log evidence directly, we optimize a tractable lower bound.",
          "The clean intuition is that the ELBO is a compromise. One part rewards reconstructions that explain the data well, and another part keeps the inferred latent distribution from drifting too far from the prior.",
          "What makes the ELBO important is not just that it is a bound. It turns the impossible quantity \\(\\log p(x)\\) into an objective we can actually differentiate and optimize.",
        ],
        keyIdeas: [
          "The ELBO is a lower bound on log evidence.",
          "It appears because the true posterior is often intractable.",
          "The bound contains a reconstruction term and a KL regularization term.",
          "Optimizing the ELBO trains both the encoder and decoder in a VAE.",
        ],
        equations: [
          "\\[ \\log p(x) = \\log \\int p(x,z) \\, dz \\]",
          "\\[ \\text{ELBO} = \\mathbb{E}_{q(z \\mid x)}[\\log p(x,z) - \\log q(z \\mid x)] \\]",
          "\\[ \\log p(x) \\geq \\text{ELBO} \\]",
        ],
        ahaInsights: [
          "The ELBO is not an arbitrary loss. It is what falls out when you insert an approximate posterior into Bayes' rule and rearrange terms.",
          "A good ELBO means the model both explains the data and keeps the latent representation disciplined.",
        ],
        equationSteps: [
          {
            latex: "\\[ \\log p(x) = \\log \\int p(x,z) \\, dz \\]",
            explanation: "Start from the marginal likelihood by integrating out the latent variable.",
          },
          {
            latex: "\\[ \\log p(x) = \\log \\int q(z \\mid x) \\frac{p(x,z)}{q(z \\mid x)} \\, dz \\]",
            explanation: "Multiply and divide by an approximate posterior q(z|x). This changes nothing mathematically but creates a quantity we can manipulate.",
          },
          {
            latex: "\\[ \\log p(x) = \\log \\mathbb{E}_{q(z \\mid x)} \\left[ \\frac{p(x,z)}{q(z \\mid x)} \\right] \\]",
            explanation: "Interpret the integral as an expectation under q.",
          },
          {
            latex: "\\[ \\log p(x) \\geq \\mathbb{E}_{q(z \\mid x)} \\left[ \\log p(x,z) - \\log q(z \\mid x) \\right] \\]",
            explanation: "Apply Jensen's inequality to move the log inside the expectation. The right-hand side is the ELBO.",
          },
        ],
        quiz: [
          {
            id: "elbo-foundation-1",
            question: "Why do we need the ELBO in variational autoencoders?",
            options: [
              "Because the true posterior or marginal likelihood is usually intractable",
              "Because cross-entropy cannot be differentiated",
              "Because latent variables make backprop impossible",
              "Because VAEs cannot use priors",
            ],
            correctIndex: 0,
            explanation: "The ELBO is a tractable objective used when exact Bayesian inference is not feasible.",
          },
        ],
        references: [
          "Kingma & Welling (2013) - Auto-Encoding Variational Bayes",
          "Doersch (2016) - Tutorial on Variational Autoencoders",
        ],
      },
      playground: {
        type: "slider",
        graphFn: "recon - beta * kl",
        sliders: [
          { id: "recon", label: "Reconstruction term", min: -5, max: 5, step: 0.1, default: 2.5 },
          { id: "kl", label: "KL term", min: 0, max: 5, step: 0.1, default: 1 },
          { id: "beta", label: "Beta weight", min: 0, max: 3, step: 0.1, default: 1 },
        ],
        xRange: [0, 5],
        yRange: [-10, 10],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In a VAE, the ELBO usually appears in the familiar form reconstruction minus KL. The reconstruction term encourages the decoder to rebuild the input from the latent code, while the KL term keeps the encoder's posterior close to the prior.",
          "This creates a real tension. If the KL term is too strong, the model may ignore the latent code and collapse toward the prior. If the reconstruction term dominates completely, the latent space can become irregular and hard to sample from.",
          "Practical training often uses KL annealing, beta-VAE weighting, or richer variational families to manage that tradeoff.",
        ],
        keyIdeas: [
          "The ELBO balances fidelity to the data against latent regularity.",
          "Posterior collapse happens when the decoder ignores latent variables.",
          "Beta-VAEs adjust the reconstruction-KL tradeoff explicitly.",
          "Monitoring ELBO subterms separately is more informative than tracking only the total loss.",
        ],
        equations: [
          "\\[ \\text{ELBO} = \\mathbb{E}_{q(z \\mid x)}[\\log p(x \\mid z)] - D_{KL}(q(z \\mid x) \\| p(z)) \\]",
          "\\[ \\mathcal{L}_{\\beta} = \\mathbb{E}_{q(z \\mid x)}[\\log p(x \\mid z)] - \\beta D_{KL}(q(z \\mid x) \\| p(z)) \\]",
          "\\[ \\log p(x) = \\text{ELBO} + D_{KL}(q(z \\mid x) \\| p(z \\mid x)) \\]",
        ],
        ahaInsights: [
          "The KL term is not just a regularizer. It is the price of making latent inference compatible with the prior used for generation.",
          "Posterior collapse is a sign that the decoder can solve the task without paying attention to z.",
        ],
        quiz: [
          {
            id: "elbo-applied-1",
            question: "What usually happens when the KL term is weighted too strongly early in training?",
            options: [
              "The latent variables can become ignored, leading to posterior collapse",
              "The decoder becomes non-differentiable",
              "The prior disappears from the objective",
              "The ELBO stops being a lower bound",
            ],
            correctIndex: 0,
            explanation: "If the KL penalty is too strong, the encoder is pushed too quickly toward the prior and the latent code may carry little information.",
          },
        ],
        references: [
          "Higgins et al. (2017) - beta-VAE",
          "Bowman et al. (2016) - Generating Sentences from a Continuous Space",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "At an advanced level, the ELBO is one objective among many for approximate inference. Tighter bounds, alternative divergences, and richer variational families all change what the model learns and how trainable it becomes.",
          "A tighter bound sounds obviously better, but optimization is not that simple. Better likelihood estimates do not always produce better gradients, better representations, or better generative samples.",
          "This is why modern work studies the ELBO not just as a formula, but as a design choice with consequences for representation learning, sample quality, and inference fidelity.",
        ],
        keyIdeas: [
          "The gap between log evidence and ELBO is the inference error measured by KL.",
          "Tighter bounds such as IWAE can improve likelihood estimates.",
          "Richer variational families reduce approximation bias but can complicate optimization.",
          "Objective design influences whether the latent space is useful, not just whether the likelihood is high.",
        ],
        equations: [
          "\\[ \\log p(x) = \\text{ELBO} + D_{KL}(q(z \\mid x) \\| p(z \\mid x)) \\]",
          "\\[ \\mathcal{L}_{IWAE} = \\mathbb{E}\\left[ \\log \\frac{1}{K} \\sum_{k=1}^{K} \\frac{p(x,z_k)}{q(z_k \\mid x)} \\right] \\]",
          "\\[ I_q(x;z) = \\mathbb{E}_{p(x)} D_{KL}(q(z \\mid x) \\| q(z)) \\]",
        ],
        quiz: [
          {
            id: "elbo-advanced-1",
            question: "What exactly measures the gap between the ELBO and the true log evidence?",
            options: [
              "The KL divergence between q(z|x) and the true posterior p(z|x)",
              "The reconstruction loss alone",
              "The entropy of the prior",
              "The determinant of the Jacobian",
            ],
            correctIndex: 0,
            explanation: "That gap is precisely the divergence between the variational posterior and the true posterior.",
          },
        ],
        references: [
          "Burda, Grosse, Salakhutdinov (2015) - Importance Weighted Autoencoders",
          "Alemi et al. (2018) - Fixing a Broken ELBO",
          "Blei, Kucukelbir, McAuliffe (2017) - Variational Inference: A Review for Statisticians",
        ],
      },
    },
  ],
};

export default chapter;
