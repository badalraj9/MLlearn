import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "ddpm-training",
  title: "DDPM Training Objective",
  description: "Simplified loss: predicting noise from noisy inputs.",
  prerequisites: ["forward-process", "noise-schedule"],
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "DDPM training looks unusual at first: instead of directly predicting a clean image, the model is trained to predict the noise that was added to it. Surprisingly, that simple target is enough to learn a powerful generative process.",
          "The key setup is that we know exactly how noise was added during the forward process. Because we created the corruption ourselves, we know the target noise and can supervise the denoiser directly.",
          "Intuitively, if a model can correctly infer what noise was injected at every corruption level, it has learned the structure needed to reverse the noising process step by step.",
        ],
        keyIdeas: [
          "Training samples are created by corrupting clean data with known Gaussian noise.",
          "The model learns to predict the injected noise from the noisy input.",
          "Noise prediction is a convenient target because it is analytically available.",
          "Successful noise prediction gives enough information to denoise during sampling.",
        ],
        equations: [
          "\\[ x_t = \\sqrt{\\bar{\\alpha}_t} x_0 + \\sqrt{1-\\bar{\\alpha}_t} \\, \\epsilon \\]",
          "\\[ \\epsilon \\sim \\mathcal{N}(0, I) \\]",
          "\\[ L = \\mathbb{E}_{x_0, t, \\epsilon} \\| \\epsilon - \\epsilon_\\theta(x_t, t) \\|^2 \\]",
        ],
        ahaInsights: [
          "DDPM training is supervised denoising with synthetic labels: we know the exact corruption we applied.",
          "Predicting noise looks indirect, but it is often easier than predicting the clean sample itself.",
        ],
        equationSteps: [
          {
            latex: "\\[ x_0 \\sim p_{data}(x) \\]",
            explanation: "Start with a clean training example.",
          },
          {
            latex: "\\[ x_t = \\sqrt{\\bar{\\alpha}_t} x_0 + \\sqrt{1-\\bar{\\alpha}_t} \\, \\epsilon \\]",
            explanation: "Sample a timestep and corrupt the data by mixing signal with Gaussian noise.",
          },
          {
            latex: "\\[ \\hat{\\epsilon} = \\epsilon_\\theta(x_t, t) \\]",
            explanation: "Ask the network to infer the noise from the noisy sample and timestep.",
          },
          {
            latex: "\\[ L = \\|\\epsilon - \\hat{\\epsilon}\\|^2 \\]",
            explanation: "Train with a simple mean-squared error between true and predicted noise.",
          },
        ],
        quiz: [
          {
            id: "ddpm-foundation-1",
            question: "Why is noise prediction a supervised training target in DDPMs?",
            options: [
              "Because the training pipeline itself sampled the noise and knows its exact value",
              "Because the dataset provides noise labels",
              "Because the model can only output Gaussian vectors",
              "Because denoising objectives never require sampling",
            ],
            correctIndex: 0,
            explanation: "The noise is synthetically generated during training, so the target is known exactly.",
          },
        ],
        references: [
          "Ho, Jain, Abbeel (2020) - Denoising Diffusion Probabilistic Models",
          "Nichol & Dhariwal (2021) - Improved Denoising Diffusion Probabilistic Models",
        ],
      },
      playground: {
        type: "slider",
        graphFn: "sqrt(a) + sqrt(1-a) * n",
        sliders: [
          { id: "a", label: "Signal fraction", min: 0.01, max: 0.99, step: 0.01, default: 0.6 },
          { id: "n", label: "Noise magnitude", min: -3, max: 3, step: 0.1, default: 1 },
        ],
        xRange: [0, 1],
        yRange: [-5, 5],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In practice, the DDPM objective is a weighted variational objective whose most popular simplified form is noise MSE. The simplification matters because it makes training stable, efficient, and easy to implement at scale.",
          "Different parameterizations are possible: predict epsilon, predict x0, or predict v. They are closely related mathematically, but they behave differently in optimization and sampling.",
          "The timestep distribution and noise schedule also matter. If the schedule allocates too much effort to trivial denoising or too little to hard steps, model quality suffers even if the loss looks fine.",
        ],
        keyIdeas: [
          "The epsilon objective is popular because it is simple and works well in practice.",
          "x0 prediction and v prediction change how error is distributed across timesteps.",
          "The noise schedule determines which corruption levels dominate training.",
          "Loss weighting matters because different timesteps have very different difficulty.",
        ],
        equations: [
          "\\[ \\hat{x}_0 = \\frac{x_t - \\sqrt{1-\\bar{\\alpha}_t} \\, \\epsilon_\\theta(x_t,t)}{\\sqrt{\\bar{\\alpha}_t}} \\]",
          "\\[ v = \\sqrt{\\bar{\\alpha}_t} \\, \\epsilon - \\sqrt{1-\\bar{\\alpha}_t} \\, x_0 \\]",
          "\\[ L_t = w_t \\| \\epsilon - \\epsilon_\\theta(x_t,t) \\|^2 \\]",
        ],
        ahaInsights: [
          "The DDPM loss is simple on the surface, but the scheduler and parameterization decide what the network really learns.",
          "A diffusion model is trained on every corruption level at once, which is why timestep conditioning is not optional.",
        ],
        quiz: [
          {
            id: "ddpm-applied-1",
            question: "What is one important reason timestep conditioning is necessary in DDPM training?",
            options: [
              "The model must know how much corruption is present in x_t",
              "It reduces the image resolution",
              "It replaces positional embeddings",
              "It removes the need for a decoder",
            ],
            correctIndex: 0,
            explanation: "Without timestep information, the network cannot know whether it should do mild denoising or nearly full reconstruction.",
          },
        ],
        references: [
          "Salimans & Ho (2022) - Progressive Distillation for Fast Sampling of Diffusion Models",
          "Karras et al. (2022) - Elucidating the Design Space of Diffusion-Based Generative Models",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The advanced view of DDPM training is that the simple noise objective is a carefully chosen proxy for a variational bound. It works not merely because MSE is convenient, but because it aligns well with the structure of the reverse process.",
          "Modern research therefore asks which objective gives the best tradeoff among likelihood, perceptual quality, sampling speed, and stability. That is why alternative parameterizations, loss reweighting, and consistency-style objectives keep appearing.",
          "The broader lesson is that diffusion training is not one fixed recipe. It is a family of surrogate objectives built around the same underlying denoising geometry.",
        ],
        keyIdeas: [
          "The standard DDPM loss is connected to a weighted variational objective.",
          "Different targets imply different error geometry during reverse-time inference.",
          "Training objectives should be judged by sampling behavior, not only by raw training loss.",
          "Modern diffusion research increasingly optimizes for fewer, better denoising steps.",
        ],
        equations: [
          "\\[ L_{VLB} = \\mathbb{E}[D_{KL}(q(x_{t-1} \\mid x_t, x_0) \\| p_\\theta(x_{t-1} \\mid x_t))] + \\cdots \\]",
          "\\[ L_{simple} = \\mathbb{E}\\|\\epsilon - \\epsilon_\\theta(x_t,t)\\|^2 \\]",
          "\\[ \\text{training objective} \\neq \\text{final sample quality objective} \\text{ in a trivial way} \\]",
        ],
        quiz: [
          {
            id: "ddpm-advanced-1",
            question: "Why is the common DDPM objective sometimes called a simplified objective?",
            options: [
              "Because it is a practical surrogate derived from a more detailed variational formulation",
              "Because it ignores timesteps entirely",
              "Because it removes the forward process",
              "Because it uses no latent variables at all",
            ],
            correctIndex: 0,
            explanation: "The popular noise-prediction loss is a simplification of a more elaborate variational derivation.",
          },
        ],
        references: [
          "Ho, Jain, Abbeel (2020) - Denoising Diffusion Probabilistic Models",
          "Kingma et al. (2021) - Variational Diffusion Models",
          "Karras et al. (2022) - Elucidating the Design Space of Diffusion-Based Generative Models",
        ],
      },
    },
  ],
};

export default chapter;
