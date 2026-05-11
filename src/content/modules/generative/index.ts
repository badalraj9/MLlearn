import type { Module } from "@/types";
import manifoldHypothesis from "./chapters/manifold-hypothesis";
import latentInterpolation from "./chapters/latent-interpolation";
import disentangledRepresentations from "./chapters/disentangled-representations";
import intractablePosteriors from "./chapters/intractable-posteriors";
import variationalFamilies from "./chapters/variational-families";
import amortizedInference from "./chapters/amortized-inference";
import klDefinitionProperties from "./chapters/kl-definition-properties";
import forwardVsReverseKl from "./chapters/forward-vs-reverse-kl";
import klInTraining from "./chapters/kl-in-training";
import elboFromBayes from "./chapters/elbo-from-bayes";
import reconstructionVsRegularization from "./chapters/reconstruction-vs-regularization";
import tighterBounds from "./chapters/tighter-bounds";
import minimaxFormulation from "./chapters/minimax-formulation";
import trainingInstability from "./chapters/training-instability";
import ganConvergence from "./chapters/gan-convergence";
import earthMoversDistance from "./chapters/earth-movers-distance";
import lipschitzConstraint from "./chapters/lipschitz-constraint";
import wganGp from "./chapters/wgan-gp";
import scoreFunction from "./chapters/score-function";
import denoisingScoreMatching from "./chapters/denoising-score-matching";
import slicedScoreMatching from "./chapters/sliced-score-matching";
import forwardProcess from "./chapters/forward-process";
import noiseSchedule from "./chapters/noise-schedule";
import ddpmTraining from "./chapters/ddpm-training";
import reverseSde from "./chapters/reverse-sde";
import ddimSampling from "./chapters/ddim-sampling";
import classifierFreeGuidance from "./chapters/classifier-free-guidance";
import continuousNormalizingFlows from "./chapters/continuous-normalizing-flows";
import optimalTransportPaths from "./chapters/optimal-transport-paths";
import rectifiedFlows from "./chapters/rectified-flows";
import causalMasking from "./chapters/causal-masking";
import tokenizationStrategies from "./chapters/tokenization-strategies";
import samplingStrategies from "./chapters/sampling-strategies";
import clipEmbeddings from "./chapters/clip-embeddings";
import stableDiffusionArchitecture from "./chapters/stable-diffusion-architecture";
import promptEngineering from "./chapters/prompt-engineering";
import classifierGuidance from "./chapters/classifier-guidance";
import conditioningMechanisms from "./chapters/conditioning-mechanisms";
import controlnet from "./chapters/controlnet";
import maskedInpainting from "./chapters/masked-inpainting";
import imageToImage from "./chapters/image-to-image";
import instructionBasedEditing from "./chapters/instruction-based-editing";
import frechetInceptionDistance from "./chapters/frechet-inception-distance";
import inceptionScore from "./chapters/inception-score";
import humanEvaluation from "./chapters/human-evaluation";

export const generativeModule: Module = {
  id: "generative",
  title: "Generative Models",
  description:
    "Latent spaces, variational inference, GANs, diffusion, and modern generation techniques.",
  topics: [
    {
      id: "latent-space-geometry",
      title: "Latent Space Geometry",
      description: "The structure and topology of learned latent representations.",
      chapters: [manifoldHypothesis, latentInterpolation, disentangledRepresentations],
    },
    {
      id: "variational-inference",
      title: "Variational Inference",
      description: "Optimization-based approximation for intractable posteriors.",
      chapters: [intractablePosteriors, variationalFamilies, amortizedInference],
    },
    {
      id: "kl-divergence",
      title: "KL Divergence",
      description: "Measuring the difference between probability distributions.",
      chapters: [klDefinitionProperties, forwardVsReverseKl, klInTraining],
    },
    {
      id: "elbo-derivation",
      title: "ELBO Derivation",
      description: "The evidence lower bound and its role in variational methods.",
      chapters: [elboFromBayes, reconstructionVsRegularization, tighterBounds],
    },
    {
      id: "gan-game-theory",
      title: "GAN Game Theory",
      description: "The minimax framework of generator vs discriminator.",
      chapters: [minimaxFormulation, trainingInstability, ganConvergence],
    },
    {
      id: "wasserstein-gan",
      title: "Wasserstein GAN",
      description: "Earth mover's distance for stable GAN training.",
      chapters: [earthMoversDistance, lipschitzConstraint, wganGp],
    },
    {
      id: "score-matching",
      title: "Score Matching",
      description: "Learning the gradient of the log-density.",
      chapters: [scoreFunction, denoisingScoreMatching, slicedScoreMatching],
    },
    {
      id: "denoising-diffusion",
      title: "Denoising Diffusion",
      description: "Forward noising and learned denoising processes.",
      chapters: [forwardProcess, noiseSchedule, ddpmTraining],
    },
    {
      id: "reverse-diffusion-process",
      title: "Reverse Diffusion Process",
      description: "Iterative denoising from noise to data.",
      chapters: [reverseSde, ddimSampling, classifierFreeGuidance],
    },
    {
      id: "flow-matching",
      title: "Flow Matching",
      description: "Continuous normalizing flows via optimal transport.",
      chapters: [continuousNormalizingFlows, optimalTransportPaths, rectifiedFlows],
    },
    {
      id: "autoregressive-transformers",
      title: "Autoregressive Transformers",
      description: "Token-by-token generation with self-attention.",
      chapters: [causalMasking, tokenizationStrategies, samplingStrategies],
    },
    {
      id: "text-to-image",
      title: "Text-to-Image Models",
      description: "Cross-modal generation from text prompts to images.",
      chapters: [clipEmbeddings, stableDiffusionArchitecture, promptEngineering],
    },
    {
      id: "conditional-diffusion",
      title: "Conditional Diffusion",
      description: "Guiding diffusion with class labels, text, or other signals.",
      chapters: [classifierGuidance, conditioningMechanisms, controlnet],
    },
    {
      id: "inpainting-editing",
      title: "Inpainting & Editing",
      description: "Modifying parts of generated or existing data.",
      chapters: [maskedInpainting, imageToImage, instructionBasedEditing],
    },
    {
      id: "evaluation-metrics",
      title: "Evaluation Metrics (FID, IS)",
      description: "Quantitative measures for generative model quality.",
      chapters: [frechetInceptionDistance, inceptionScore, humanEvaluation],
    }
  ],
};
