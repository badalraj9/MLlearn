import type { Chapter } from "@/types";

type Group =
  | "latent"
  | "vi"
  | "kl"
  | "elbo"
  | "gan"
  | "wgan"
  | "score"
  | "diffusion"
  | "reverse"
  | "flow"
  | "ar"
  | "tti"
  | "cond"
  | "edit"
  | "eval";

interface Spec {
  id: string;
  title: string;
  description: string;
  group: Group;
}

interface Template {
  focus: string;
  foundation: string;
  applied: string;
  advanced: string;
  keyIdeas: [string, string, string, string];
  equations: [string, string, string];
  references: [string, string];
}

const templates: Record<Group, Template> = {
  latent: {
    focus: "latent geometry and controllable representations",
    foundation: "These chapters explain how generative models use lower-dimensional codes to organize complex data.",
    applied: "The practical question is whether the latent space supports smooth interpolation, editing, and useful representations.",
    advanced: "The research question is whether the learned geometry reflects meaningful factors or only model artifacts.",
    keyIdeas: [
      "Latent variables summarize hidden structure in data.",
      "Good latent spaces support interpolation and sampling.",
      "Decoder geometry determines how latent movement changes outputs.",
      "Disentanglement is useful only when factors align with meaningful controls.",
    ],
    equations: [
      "\\[ z \\sim p(z), \\quad x \\sim p_\\theta(x \\mid z) \\]",
      "\\[ x' = g_\\theta(z) \\]",
      "\\[ z_{\\alpha} = (1 - \\alpha) z_1 + \\alpha z_2 \\]",
    ],
    references: [
      "Kingma & Welling (2013) - Auto-Encoding Variational Bayes",
      "Bengio, Courville, Vincent (2013) - Representation Learning: A Review and New Perspectives",
    ],
  },
  vi: {
    focus: "approximate posterior inference",
    foundation: "These chapters explain why exact inference is often impossible and how optimization replaces integration.",
    applied: "The applied story is about choosing tractable families and training inference networks efficiently.",
    advanced: "The advanced story is about approximation bias, inference gaps, and richer variational families.",
    keyIdeas: [
      "Variational inference replaces exact posteriors with tractable approximations.",
      "The variational family limits what uncertainty can be represented.",
      "Amortization makes inference fast across many examples.",
      "Optimization quality and family choice both shape the result.",
    ],
    equations: [
      "\\[ q_\\phi(z \\mid x) \\approx p_\\theta(z \\mid x) \\]",
      "\\[ \\text{ELBO} = \\mathbb{E}_{q_\\phi}[\\log p_\\theta(x \\mid z)] - D_{KL}(q_\\phi(z \\mid x) \\| p(z)) \\]",
      "\\[ z = \\mu_\\phi(x) + \\sigma_\\phi(x) \\odot \\epsilon \\]",
    ],
    references: [
      "Blei, Kucukelbir, McAuliffe (2017) - Variational Inference: A Review for Statisticians",
      "Kingma & Welling (2013) - Auto-Encoding Variational Bayes",
    ],
  },
  kl: {
    focus: "distribution comparison and regularization",
    foundation: "These chapters explain how KL divergence compares a target distribution to an approximation.",
    applied: "In practice, KL terms appear inside variational objectives, distillation, and policy regularization.",
    advanced: "The direction of the KL matters because forward and reverse KL prefer different behaviors.",
    keyIdeas: [
      "KL divergence is asymmetric and not a true metric.",
      "Forward and reverse KL behave differently around missing modes.",
      "KL terms can regularize latent spaces and policies.",
      "Poor KL scaling can dominate the rest of training.",
    ],
    equations: [
      "\\[ D_{KL}(p \\| q) = \\mathbb{E}_{p(x)} \\left[ \\log \\frac{p(x)}{q(x)} \\right] \\]",
      "\\[ D_{KL}(p \\| q) \\neq D_{KL}(q \\| p) \\]",
      "\\[ \\mathcal{L} = \\text{Recon} - \\beta D_{KL}(q(z \\mid x) \\| p(z)) \\]",
    ],
    references: [
      "Cover & Thomas - Elements of Information Theory",
      "Murphy - Probabilistic Machine Learning",
    ],
  },
  elbo: {
    focus: "variational bounds and training tradeoffs",
    foundation: "These chapters explain how the ELBO lower-bounds log evidence and decomposes training into reconstruction and regularization.",
    applied: "The applied view tracks how KL and reconstruction terms compete during optimization.",
    advanced: "The advanced view compares ELBO variants, tighter bounds, and representation-quality tradeoffs.",
    keyIdeas: [
      "The ELBO is a tractable lower bound on log likelihood.",
      "Reconstruction and KL terms pull the model in different directions.",
      "Annealing or reweighting can stabilize learning.",
      "Tighter bounds do not always imply easier optimization.",
    ],
    equations: [
      "\\[ \\log p(x) \\geq \\mathbb{E}_{q(z \\mid x)} [\\log p(x, z) - \\log q(z \\mid x)] \\]",
      "\\[ \\log p(x) = \\text{ELBO} + D_{KL}(q(z \\mid x) \\| p(z \\mid x)) \\]",
      "\\[ \\mathcal{L}_{\\beta} = \\mathbb{E}_{q} [\\log p(x \\mid z)] - \\beta D_{KL}(q(z \\mid x) \\| p(z)) \\]",
    ],
    references: [
      "Kingma & Welling (2013) - Auto-Encoding Variational Bayes",
      "Burda, Grosse, Salakhutdinov (2015) - Importance Weighted Autoencoders",
    ],
  },
  gan: {
    focus: "adversarial generation and game dynamics",
    foundation: "These chapters frame generation as a game between a generator and a discriminator.",
    applied: "The practical story is about balancing updates and avoiding instability such as collapse or oscillation.",
    advanced: "The advanced view studies optimization dynamics, equilibrium, and why training can fail even when the objective is well-defined.",
    keyIdeas: [
      "The generator maps noise to samples.",
      "The discriminator supplies a learned training signal.",
      "Mode collapse is a major practical failure mode.",
      "Optimization dynamics matter as much as the formal objective.",
    ],
    equations: [
      "\\[ \\min_G \\max_D \\; \\mathbb{E}_{x \\sim p_{data}} [\\log D(x)] + \\mathbb{E}_{z \\sim p(z)} [\\log(1 - D(G(z)))] \\]",
      "\\[ L_G = -\\mathbb{E}_{z} [\\log D(G(z))] \\]",
      "\\[ V(G, D^*) = -\\log 4 + 2 \\cdot \\mathrm{JSD}(p_{data} \\| p_g) \\]",
    ],
    references: [
      "Goodfellow et al. (2014) - Generative Adversarial Nets",
      "Mescheder, Geiger, Nowozin (2018) - Which Training Methods for GANs do actually Converge?",
    ],
  },
  wgan: {
    focus: "optimal transport objectives for GANs",
    foundation: "These chapters replace JS-style behavior with an earth mover perspective that gives smoother gradients.",
    applied: "The practical question is how to enforce the Lipschitz constraint without destroying critic quality.",
    advanced: "The advanced view connects WGANs to transport geometry and duality.",
    keyIdeas: [
      "Earth mover distance measures transport cost between distributions.",
      "WGAN critics score samples rather than output calibrated probabilities.",
      "Lipschitz control is central to the theory.",
      "Gradient penalty usually works better than weight clipping.",
    ],
    equations: [
      "\\[ W(p, q) = \\sup_{\\|f\\|_L \\leq 1} \\mathbb{E}_{x \\sim p}[f(x)] - \\mathbb{E}_{x \\sim q}[f(x)] \\]",
      "\\[ L_{\\text{WGAN}} = \\mathbb{E}_{x \\sim p_g}[D(x)] - \\mathbb{E}_{x \\sim p_{data}}[D(x)] \\]",
      "\\[ L_{\\text{GP}} = \\lambda \\mathbb{E}_{\\hat{x}} (\\|\\nabla_{\\hat{x}} D(\\hat{x})\\|_2 - 1)^2 \\]",
    ],
    references: [
      "Arjovsky, Chintala, Bottou (2017) - Wasserstein GAN",
      "Gulrajani et al. (2017) - Improved Training of Wasserstein GANs",
    ],
  },
  score: {
    focus: "learning score fields instead of normalized densities",
    foundation: "These chapters explain how the gradient of log density can guide denoising and sampling.",
    applied: "The practical story is about training score estimators across noise levels and using them inside samplers.",
    advanced: "The advanced story connects score matching to Fisher divergence and diffusion-style generation.",
    keyIdeas: [
      "The score is the gradient of the log density.",
      "A score field points toward higher-probability regions.",
      "Noise-conditioned training improves learnability.",
      "Sampling quality depends on both the score network and the sampler.",
    ],
    equations: [
      "\\[ s_\\theta(x) \\approx \\nabla_x \\log p(x) \\]",
      "\\[ x_{t+1} = x_t + \\eta s_\\theta(x_t) + \\sqrt{2\\eta} \\, \\xi_t \\]",
      "\\[ D_F(p \\| q) = \\mathbb{E}_p \\| \\nabla \\log p - \\nabla \\log q \\|^2 \\]",
    ],
    references: [
      "Hyvarinen (2005) - Estimation of Non-Normalized Statistical Models by Score Matching",
      "Song & Ermon (2019) - Generative Modeling by Estimating Gradients of the Data Distribution",
    ],
  },
  diffusion: {
    focus: "forward noising and denoising objectives",
    foundation: "These chapters explain how diffusion models destroy structure gradually, then learn to reverse that corruption.",
    applied: "The practical questions are how to choose noise schedules and which target to predict during training.",
    advanced: "The advanced view links discrete diffusion objectives to continuous-time stochastic dynamics.",
    keyIdeas: [
      "The forward process gradually adds Gaussian noise.",
      "The model learns to predict missing structure from noisy samples.",
      "Scheduler choice affects optimization and sample quality.",
      "Diffusion training can be written as a simple denoising loss.",
    ],
    equations: [
      "\\[ q(x_t \\mid x_{t-1}) = \\mathcal{N}(\\sqrt{1-\\beta_t} x_{t-1}, \\beta_t I) \\]",
      "\\[ x_t = \\sqrt{\\bar{\\alpha}_t} x_0 + \\sqrt{1-\\bar{\\alpha}_t} \\, \\epsilon \\]",
      "\\[ L = \\mathbb{E}_{t, x_0, \\epsilon} \\| \\epsilon - \\epsilon_\\theta(x_t, t) \\|^2 \\]",
    ],
    references: [
      "Ho, Jain, Abbeel (2020) - Denoising Diffusion Probabilistic Models",
      "Nichol & Dhariwal (2021) - Improved Denoising Diffusion Probabilistic Models",
    ],
  },
  reverse: {
    focus: "sampling dynamics and guidance in reverse diffusion",
    foundation: "These chapters explain how a trained denoiser converts pure noise back into data.",
    applied: "The practical story is about sampling speed, deterministic versus stochastic samplers, and guidance strength.",
    advanced: "The advanced story studies reverse-time SDEs and how guidance reshapes the denoising field.",
    keyIdeas: [
      "Sampling starts from noise and iteratively denoises.",
      "Guidance trades diversity for condition fidelity.",
      "DDIM gives faster deterministic trajectories.",
      "Reverse-time dynamics can be described by SDEs.",
    ],
    equations: [
      "\\[ p_\\theta(x_{t-1} \\mid x_t) \\]",
      "\\[ \\hat{\\epsilon}_{cfg} = \\hat{\\epsilon}_{uncond} + w(\\hat{\\epsilon}_{cond} - \\hat{\\epsilon}_{uncond}) \\]",
      "\\[ dx = [f(x,t) - g(t)^2 \\nabla_x \\log p_t(x)] dt + g(t) d\\bar{W}_t \\]",
    ],
    references: [
      "Song et al. (2021) - Score-Based Generative Modeling through Stochastic Differential Equations",
      "Song, Meng, Ermon (2020) - Denoising Diffusion Implicit Models",
    ],
  },
  flow: {
    focus: "continuous transport and velocity fields",
    foundation: "These chapters explain generation as moving samples along a continuous path from noise to data.",
    applied: "The applied question is how to choose transport paths that are easy to learn and cheap to integrate.",
    advanced: "The advanced view connects neural ODEs, optimal transport, and rectified trajectories.",
    keyIdeas: [
      "Flows learn vector fields instead of explicit denoisers.",
      "Path choice shapes optimization difficulty.",
      "Continuous normalizing flows enable likelihood computation.",
      "Rectified paths aim to reduce sampling complexity.",
    ],
    equations: [
      "\\[ \\frac{dx_t}{dt} = v_\\theta(x_t, t) \\]",
      "\\[ \\frac{d}{dt} \\log p_t(x_t) = -\\nabla \\cdot v_\\theta(x_t, t) \\]",
      "\\[ x_t = (1-t)x_0 + tx_1 \\]",
    ],
    references: [
      "Chen et al. (2018) - Neural Ordinary Differential Equations",
      "Lipman et al. (2023) - Flow Matching for Generative Modeling",
    ],
  },
  ar: {
    focus: "token-by-token autoregressive generation",
    foundation: "These chapters explain how sequence models predict one token at a time while blocking access to the future.",
    applied: "The practical question is how masking, tokenization, and decoding choices shape behavior.",
    advanced: "The advanced view studies search, scaling limits, and the computational cost of sequential generation.",
    keyIdeas: [
      "Autoregressive models factorize sequence likelihood into next-token conditionals.",
      "Causal masking prevents future leakage during training.",
      "Tokenization affects both efficiency and semantics.",
      "Decoding heuristics reshape the raw model distribution.",
    ],
    equations: [
      "\\[ p(x_{1:T}) = \\prod_{t=1}^{T} p(x_t \\mid x_{<t}) \\]",
      "\\[ \\alpha_{ij} = \\text{softmax}\\left(\\frac{q_i k_j^T}{\\sqrt{d}} + \\text{mask}_{ij}\\right) \\]",
      "\\[ p_\\tau(x_t \\mid x_{<t}) = \\text{softmax}(z_t / \\tau) \\]",
    ],
    references: [
      "Vaswani et al. (2017) - Attention Is All You Need",
      "Holtzman et al. (2020) - The Curious Case of Neural Text Degeneration",
    ],
  },
  tti: {
    focus: "text-image alignment and multimodal generation",
    foundation: "These chapters explain how language representations steer visual generation.",
    applied: "The applied story is about cross-attention, latent generation, and prompt sensitivity.",
    advanced: "The advanced view studies controllability, compositionality, and alignment quality across modalities.",
    keyIdeas: [
      "Text conditioning links linguistic concepts to visual structure.",
      "Joint text-image embeddings enable cross-modal retrieval and control.",
      "Latent diffusion makes high-resolution synthesis more tractable.",
      "Prompt quality matters, but model priors still dominate ambiguous requests.",
    ],
    equations: [
      "\\[ e_t = f_{text}(c), \\quad e_x = f_{image}(x) \\]",
      "\\[ s(c, x) = e_t^T e_x \\]",
      "\\[ p(x \\mid c) \\]",
    ],
    references: [
      "Radford et al. (2021) - Learning Transferable Visual Models From Natural Language Supervision",
      "Rombach et al. (2022) - High-Resolution Image Synthesis with Latent Diffusion Models",
    ],
  },
  cond: {
    focus: "conditioning signals inside diffusion models",
    foundation: "These chapters explain how side information such as labels, text, edges, or poses can guide diffusion generation.",
    applied: "The practical question is how to inject conditioning strongly enough to matter without destroying diversity.",
    advanced: "The advanced view studies how conditioning changes the effective denoising field and control capacity.",
    keyIdeas: [
      "Conditioning steers the reverse process toward desired outputs.",
      "Guidance may come from classifiers, cross-attention, or control branches.",
      "Spatial controls often need dedicated pathways.",
      "Condition fidelity and sample diversity are in tension.",
    ],
    equations: [
      "\\[ p(x \\mid c) \\]",
      "\\[ \\nabla_x \\log p(x \\mid c) = \\nabla_x \\log p(x) + \\nabla_x \\log p(c \\mid x) \\]",
      "\\[ h' = h + F(h, c) \\]",
    ],
    references: [
      "Dhariwal & Nichol (2021) - Diffusion Models Beat GANs on Image Synthesis",
      "Zhang et al. (2023) - Adding Conditional Control to Text-to-Image Diffusion Models",
    ],
  },
  edit: {
    focus: "editing existing content while preserving structure",
    foundation: "These chapters explain how generative models modify part of an input instead of synthesizing everything from scratch.",
    applied: "The practical issues are masks, preservation losses, and how strongly the model is allowed to deviate from the source.",
    advanced: "The advanced view studies locality, identity preservation, and instruction faithfulness.",
    keyIdeas: [
      "Editing constrains generation with an observed input.",
      "Masks define what can change in inpainting tasks.",
      "Image translation changes domain while preserving core structure.",
      "Instruction-based editing turns language into targeted modifications.",
    ],
    equations: [
      "\\[ p(x_{edit} \\mid x_{src}, m, c) \\]",
      "\\[ x = m \\odot x_{known} + (1-m) \\odot x_{generated} \\]",
      "\\[ L = L_{recon} + \\lambda L_{preserve} + \\gamma L_{edit} \\]",
    ],
    references: [
      "Isola et al. (2017) - Image-to-Image Translation with Conditional Adversarial Networks",
      "Brooks, Holynski, Efros (2023) - InstructPix2Pix",
    ],
  },
  eval: {
    focus: "measuring quality, diversity, and perceptual realism",
    foundation: "These chapters explain why generative evaluation is hard and why no single number captures all failure modes.",
    applied: "The practical story is about mixing automatic metrics with human preference judgments.",
    advanced: "The advanced view studies estimator bias, feature dependence, and the gap between benchmark metrics and user value.",
    keyIdeas: [
      "Quality and diversity must both be measured.",
      "Feature-based metrics compare real and generated data in representation space.",
      "Inception Score ignores the real data distribution directly.",
      "Human review is still necessary for many generative tasks.",
    ],
    equations: [
      "\\[ \\text{FID} = \\|\\mu_r - \\mu_g\\|^2 + \\mathrm{Tr}(\\Sigma_r + \\Sigma_g - 2(\\Sigma_r \\Sigma_g)^{1/2}) \\]",
      "\\[ \\text{IS} = \\exp(\\mathbb{E}_x D_{KL}(p(y \\mid x) \\| p(y))) \\]",
      "\\[ \\text{metric} \\neq \\text{ground truth quality} \\]",
    ],
    references: [
      "Heusel et al. (2017) - GANs Trained by a Two Time-Scale Update Rule Converge to a Local Nash Equilibrium",
      "Salimans et al. (2016) - Improved Techniques for Training GANs",
    ],
  },
};

function buildChapter(spec: Spec): Chapter {
  const template = templates[spec.group];

  return {
    id: spec.id,
    title: spec.title,
    description: spec.description,
    levels: [
      {
        tier: 1,
        title: "Foundation",
        cost: 0,
        content: {
          intro: [
            `${spec.title} covers ${spec.description.toLowerCase()}`,
            template.foundation,
            `The main foundation goal is to understand ${template.focus} before worrying about engineering tricks.`,
          ],
          keyIdeas: template.keyIdeas,
          equations: template.equations,
          references: template.references,
        },
      },
      {
        tier: 2,
        title: "Applied",
        cost: 50,
        content: {
          intro: [
            `In applied work, ${spec.title.toLowerCase()} shows up as a concrete modeling or training choice inside generative pipelines.`,
            template.applied,
            `You should be able to connect ${spec.title.toLowerCase()} to actual optimization behavior, controllability, or sample quality.`,
          ],
          keyIdeas: template.keyIdeas,
          equations: template.equations,
          references: template.references,
        },
      },
      {
        tier: 3,
        title: "Advanced",
        cost: 100,
        content: {
          intro: [
            `At an advanced level, ${spec.title.toLowerCase()} is part of a larger design space rather than an isolated trick.`,
            template.advanced,
            `This is where theory, geometry, and scaling tradeoffs matter enough to influence research choices.`,
          ],
          keyIdeas: template.keyIdeas,
          equations: template.equations,
          references: template.references,
        },
      },
    ],
  };
}

const specs: Spec[] = [
  { id: "manifold-hypothesis", title: "The Manifold Hypothesis", description: "Why real data lives on low-dimensional manifolds.", group: "latent" },
  { id: "latent-interpolation", title: "Latent Interpolation", description: "Walking through latent space to blend representations.", group: "latent" },
  { id: "disentangled-representations", title: "Disentangled Representations", description: "Separating independent factors of variation.", group: "latent" },
  { id: "intractable-posteriors", title: "Intractable Posteriors", description: "Why exact inference is often impossible.", group: "vi" },
  { id: "variational-families", title: "Variational Families", description: "Choosing tractable approximate distributions.", group: "vi" },
  { id: "amortized-inference", title: "Amortized Inference", description: "Learning an inference network instead of per-example optimization.", group: "vi" },
  { id: "kl-definition-properties", title: "Definition & Properties", description: "Asymmetry, non-negativity, and information-theoretic meaning.", group: "kl" },
  { id: "forward-vs-reverse-kl", title: "Forward vs Reverse KL", description: "Mode-covering vs mode-seeking behavior.", group: "kl" },
  { id: "kl-in-training", title: "KL in Training Objectives", description: "Role of KL divergence in VAEs, policy gradients, and distillation.", group: "kl" },
  { id: "elbo-from-bayes", title: "ELBO from Bayes' Rule", description: "Deriving the bound from log-evidence decomposition.", group: "elbo" },
  { id: "reconstruction-vs-regularization", title: "Reconstruction vs Regularization", description: "The two competing terms in the ELBO.", group: "elbo" },
  { id: "tighter-bounds", title: "Tighter Bounds (IWAE)", description: "Importance-weighted autoencoders and beyond.", group: "elbo" },
  { id: "minimax-formulation", title: "Minimax Formulation", description: "The original GAN objective and Nash equilibrium.", group: "gan" },
  { id: "training-instability", title: "Training Instability", description: "Mode collapse, oscillation, and vanishing gradients.", group: "gan" },
  { id: "gan-convergence", title: "GAN Convergence Theory", description: "Conditions for convergence and equilibrium analysis.", group: "gan" },
  { id: "earth-movers-distance", title: "Earth Mover's Distance", description: "Optimal transport as a metric between distributions.", group: "wgan" },
  { id: "lipschitz-constraint", title: "Lipschitz Constraint", description: "Weight clipping and gradient penalty for critic networks.", group: "wgan" },
  { id: "wgan-gp", title: "WGAN-GP", description: "Gradient penalty for improved Wasserstein training.", group: "wgan" },
  { id: "score-function", title: "The Score Function", description: "Gradient of log-density.", group: "score" },
  { id: "denoising-score-matching", title: "Denoising Score Matching", description: "Learning scores by denoising corrupted samples.", group: "score" },
  { id: "sliced-score-matching", title: "Sliced Score Matching", description: "Scalable score estimation via random projections.", group: "score" },
  { id: "forward-process", title: "Forward Noising Process", description: "Gradually adding Gaussian noise to data.", group: "diffusion" },
  { id: "noise-schedule", title: "Noise Schedules", description: "Linear, cosine, and learned noise schedules.", group: "diffusion" },
  { id: "ddpm-training", title: "DDPM Training Objective", description: "Simplified loss: predicting noise from noisy inputs.", group: "diffusion" },
  { id: "reverse-sde", title: "Reverse SDE", description: "Stochastic differential equations for generation.", group: "reverse" },
  { id: "ddim-sampling", title: "DDIM Sampling", description: "Deterministic sampling for faster generation.", group: "reverse" },
  { id: "classifier-free-guidance", title: "Classifier-Free Guidance", description: "Amplifying conditional signals without a classifier.", group: "reverse" },
  { id: "continuous-normalizing-flows", title: "Continuous Normalizing Flows", description: "Neural ODEs for density transformation.", group: "flow" },
  { id: "optimal-transport-paths", title: "Optimal Transport Paths", description: "Straight-line paths between noise and data.", group: "flow" },
  { id: "rectified-flows", title: "Rectified Flows", description: "Simplifying flow paths for faster sampling.", group: "flow" },
  { id: "causal-masking", title: "Causal Masking", description: "Preventing information leakage with masked attention.", group: "ar" },
  { id: "tokenization-strategies", title: "Tokenization Strategies", description: "BPE, SentencePiece, and visual tokenizers.", group: "ar" },
  { id: "sampling-strategies", title: "Sampling Strategies", description: "Top-k, nucleus, and temperature-based decoding.", group: "ar" },
  { id: "clip-embeddings", title: "CLIP Embeddings", description: "Joint text-image representations for conditioning.", group: "tti" },
  { id: "stable-diffusion-architecture", title: "Stable Diffusion Architecture", description: "Latent diffusion with U-Net and cross-attention.", group: "tti" },
  { id: "prompt-engineering", title: "Prompt Engineering", description: "Crafting text prompts for precise generation.", group: "tti" },
  { id: "classifier-guidance", title: "Classifier Guidance", description: "Using gradient of a classifier to steer generation.", group: "cond" },
  { id: "conditioning-mechanisms", title: "Conditioning Mechanisms", description: "Cross-attention, AdaIN, and concatenation approaches.", group: "cond" },
  { id: "controlnet", title: "ControlNet", description: "Adding spatial controls like edges, depth, and poses.", group: "cond" },
  { id: "masked-inpainting", title: "Masked Inpainting", description: "Filling in missing regions with coherent content.", group: "edit" },
  { id: "image-to-image", title: "Image-to-Image Translation", description: "Transforming images from one domain to another.", group: "edit" },
  { id: "instruction-based-editing", title: "Instruction-Based Editing", description: "Editing images with natural language instructions.", group: "edit" },
  { id: "frechet-inception-distance", title: "Frechet Inception Distance", description: "Comparing feature distributions of real and generated data.", group: "eval" },
  { id: "inception-score", title: "Inception Score (IS)", description: "Measuring quality and diversity of generated samples.", group: "eval" },
  { id: "human-evaluation", title: "Human Evaluation & Perceptual Metrics", description: "LPIPS, user studies, and preference-based evaluation.", group: "eval" },
];

export const generativeChapters: Record<string, Chapter> = Object.fromEntries(
  specs.map((spec) => [spec.id, buildChapter(spec)]),
);
