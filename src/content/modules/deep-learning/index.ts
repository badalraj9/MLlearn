import type { Module } from "@/types";
import universalApproximation from "./chapters/universal-approximation";
import backpropagationDerivation from "./chapters/backpropagation-derivation";
import gradientFlow from "./chapters/gradient-flow";
import vanishingExplodingGradients from "./chapters/vanishing-exploding-gradients";
import batchVsLayerNorm from "./chapters/batch-vs-layer-norm";
import residualConnections from "./chapters/residual-connections";
import skipConnections from "./chapters/skip-connections";
import cnnVariants from "./chapters/cnn-variants";
import sequenceModels from "./chapters/sequence-models";
import attentionVariants from "./chapters/attention-variants";
import visionTransformers from "./chapters/vision-transformers";
import diffusionUnets from "./chapters/diffusion-unets";
import graphAttentionNetworks from "./chapters/graph-attention-networks";
import capsuleNetworks from "./chapters/capsule-networks";
import learningRateSchedules from "./chapters/learning-rate-schedules";
import warmupStrategies from "./chapters/warmup-strategies";
import gradientClipping from "./chapters/gradient-clipping";
import weightDecay from "./chapters/weight-decay";
import labelSmoothing from "./chapters/label-smoothing";
import mixedPrecisionTraining from "./chapters/mixed-precision-training";
import distributedTraining from "./chapters/distributed-training";
import parameterScalingLaws from "./chapters/parameter-scaling-laws";
import dataScaling from "./chapters/data-scaling";
import modelParallelism from "./chapters/model-parallelism";
import gradientAccumulation from "./chapters/gradient-accumulation";
import memoryOptimization from "./chapters/memory-optimization";

export const deepLearningModule: Module = {
  id: "deep-learning",
  title: "Deep Learning",
  description:
    "Neural network architectures, training dynamics, and scaling.",
  topics: [
    {
      id: "core-foundations",
      title: "Core Foundations",
      description: "Fundamental theorems, gradient flow, normalization, and connectivity patterns.",
      chapters: [universalApproximation, backpropagationDerivation, gradientFlow, vanishingExplodingGradients, batchVsLayerNorm, residualConnections, skipConnections],
    },
    {
      id: "architectures",
      title: "Architectures",
      description: "CNN variants, sequence models, transformers, and emerging designs.",
      chapters: [cnnVariants, sequenceModels, attentionVariants, visionTransformers, diffusionUnets, graphAttentionNetworks, capsuleNetworks],
    },
    {
      id: "training-dynamics",
      title: "Training Dynamics",
      description: "Learning rate strategies, gradient control, and precision optimization.",
      chapters: [learningRateSchedules, warmupStrategies, gradientClipping, weightDecay, labelSmoothing, mixedPrecisionTraining, distributedTraining],
    },
    {
      id: "scaling",
      title: "Scaling",
      description: "Scaling laws, parallelism strategies, and memory optimization.",
      chapters: [parameterScalingLaws, dataScaling, modelParallelism, gradientAccumulation, memoryOptimization],
    }
  ],
};
