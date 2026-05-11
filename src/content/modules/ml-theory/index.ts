import type { Module } from "@/types";
import taskPerformanceExperience from "./chapters/task-performance-experience";
import lossFunctions from "./chapters/loss-functions";
import empiricalRiskMinimization from "./chapters/empirical-risk-minimization";
import biasVarianceTradeoff from "./chapters/bias-variance-tradeoff";
import clusteringObjectives from "./chapters/clustering-objectives";
import densityEstimation from "./chapters/density-estimation";
import dimensionalityReductionTheory from "./chapters/dimensionality-reduction-theory";
import consistencyRegularization from "./chapters/consistency-regularization";
import pseudoLabeling from "./chapters/pseudo-labeling";
import manifoldAssumptions from "./chapters/manifold-assumptions";
import pacDefinition from "./chapters/pac-definition";
import sampleComplexity from "./chapters/sample-complexity";
import vcDimension from "./chapters/vc-dimension";
import complexityPenalties from "./chapters/complexity-penalties";
import modelSelectionTheory from "./chapters/model-selection-theory";
import l1L2Regularization from "./chapters/l1-l2-regularization";
import elasticNet from "./chapters/elastic-net";
import regularizationAsPrior from "./chapters/regularization-as-prior";
import dropoutAsEnsemble from "./chapters/dropout-as-ensemble";
import monteCarloDropout from "./chapters/monte-carlo-dropout";
import sgdFlatMinima from "./chapters/sgd-flat-minima";
import learningRateImplicitReg from "./chapters/learning-rate-implicit-reg";
import noiseDrivenExploration from "./chapters/noise-driven-exploration";
import saddlePointsLocalMinima from "./chapters/saddle-points-local-minima";
import modeConnectivity from "./chapters/mode-connectivity";
import lossLandscapeVisualization from "./chapters/loss-landscape-visualization";
import vcTheory from "./chapters/vc-theory";
import rademacherComplexity from "./chapters/rademacher-complexity";
import doubleDescent from "./chapters/double-descent";
import volumeConcentration from "./chapters/volume-concentration";
import distanceConcentration from "./chapters/distance-concentration";
import blessingOfDimensionality from "./chapters/blessing-of-dimensionality";
import nflFormalStatement from "./chapters/nfl-formal-statement";
import nflPracticalImplications from "./chapters/nfl-practical-implications";
import sharpnessAwareMinimization from "./chapters/sharpness-aware-minimization";
import earlyStoppingTheory from "./chapters/early-stopping-theory";
import overparameterizationGeneralization from "./chapters/overparameterization-generalization";
import calibrationCurves from "./chapters/calibration-curves";
import temperatureScaling from "./chapters/temperature-scaling";
import plattScaling from "./chapters/platt-scaling";
import aleatoricVsEpistemic from "./chapters/aleatoric-vs-epistemic";
import bayesianNeuralNetworks from "./chapters/bayesian-neural-networks";
import ensembleUncertainty from "./chapters/ensemble-uncertainty";
import conformalPrediction from "./chapters/conformal-prediction";
import distributionalRobustness from "./chapters/distributional-robustness";
import certifiedDefenses from "./chapters/certified-defenses";
import outOfDistributionDetection from "./chapters/out-of-distribution-detection";
import adversarialExamples from "./chapters/adversarial-examples";
import attackTaxonomy from "./chapters/attack-taxonomy";
import adversarialTraining from "./chapters/adversarial-training";
import robustnessAccuracyTradeoff from "./chapters/robustness-accuracy-tradeoff";

export const mlTheoryModule: Module = {
  id: "ml-theory",
  title: "ML Theory",
  description:
    "Generalization, capacity, bias-variance, and the theoretical foundations of learning.",
  topics: [
    {
      id: "supervised-learning-framework",
      title: "Supervised Learning Framework",
      description: "The formal setup of learning from labeled examples.",
      chapters: [taskPerformanceExperience, lossFunctions, empiricalRiskMinimization, biasVarianceTradeoff],
    },
    {
      id: "unsupervised-learning-theory",
      title: "Unsupervised Learning Theory",
      description: "Theoretical foundations of learning without labels.",
      chapters: [clusteringObjectives, densityEstimation, dimensionalityReductionTheory],
    },
    {
      id: "semi-supervised-learning",
      title: "Semi-Supervised Learning",
      description: "Leveraging both labeled and unlabeled data.",
      chapters: [consistencyRegularization, pseudoLabeling, manifoldAssumptions],
    },
    {
      id: "pac-learning",
      title: "PAC Learning",
      description: "Probably Approximately Correct learning framework.",
      chapters: [pacDefinition, sampleComplexity, vcDimension],
    },
    {
      id: "structural-risk-minimization",
      title: "Structural Risk Minimization",
      description: "Balancing model complexity with empirical risk.",
      chapters: [complexityPenalties, modelSelectionTheory],
    },
    {
      id: "regularization-paths",
      title: "Regularization Paths",
      description: "How regularization strength affects model solutions.",
      chapters: [l1L2Regularization, elasticNet, regularizationAsPrior],
    },
    {
      id: "dropout-theory",
      title: "Dropout Theory",
      description: "Theoretical analysis of dropout as regularization.",
      chapters: [dropoutAsEnsemble, monteCarloDropout],
    },
    {
      id: "implicit-bias-sgd",
      title: "Implicit Bias of SGD",
      description: "How stochastic gradient descent favors certain solutions.",
      chapters: [sgdFlatMinima, learningRateImplicitReg, noiseDrivenExploration],
    },
    {
      id: "loss-surface-geometry",
      title: "Loss Surface Geometry",
      description: "The landscape of loss functions in high dimensions.",
      chapters: [saddlePointsLocalMinima, modeConnectivity, lossLandscapeVisualization],
    },
    {
      id: "model-complexity",
      title: "Model Complexity",
      description: "VC dimension, Rademacher complexity, and capacity measures.",
      chapters: [vcTheory, rademacherComplexity, doubleDescent],
    },
    {
      id: "curse-of-dimensionality",
      title: "Curse of Dimensionality",
      description: "Why high-dimensional spaces behave counter-intuitively.",
      chapters: [volumeConcentration, distanceConcentration, blessingOfDimensionality],
    },
    {
      id: "no-free-lunch",
      title: "No Free Lunch Theorem",
      description: "No single algorithm dominates across all problems.",
      chapters: [nflFormalStatement, nflPracticalImplications],
    },
    {
      id: "optimization-generalization-link",
      title: "Optimization Generalization Link",
      description: "How optimization choices impact generalization.",
      chapters: [sharpnessAwareMinimization, earlyStoppingTheory, overparameterizationGeneralization],
    },
    {
      id: "calibration-theory",
      title: "Calibration Theory",
      description: "Ensuring predicted probabilities match actual frequencies.",
      chapters: [calibrationCurves, temperatureScaling, plattScaling],
    },
    {
      id: "uncertainty-quantification",
      title: "Uncertainty Quantification",
      description: "Measuring and representing model uncertainty.",
      chapters: [aleatoricVsEpistemic, bayesianNeuralNetworks, ensembleUncertainty, conformalPrediction],
    },
    {
      id: "robustness-theory",
      title: "Robustness Theory",
      description: "Theoretical foundations of model robustness.",
      chapters: [distributionalRobustness, certifiedDefenses, outOfDistributionDetection],
    },
    {
      id: "adversarial-learning-theory",
      title: "Adversarial Learning Theory",
      description: "Formal analysis of adversarial attacks and defenses.",
      chapters: [adversarialExamples, attackTaxonomy, adversarialTraining, robustnessAccuracyTradeoff],
    }
  ],
};
