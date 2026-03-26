import type { Module } from "@/types";
import vectorSpaces from "./chapters/vector-spaces";
import linearTransformations from "./chapters/linear-transformations";
import matrixDecomposition from "./chapters/matrix-decomposition";
import svd from "./chapters/svd";
import spectralTheorem from "./chapters/spectral-theorem";
import positiveDefiniteMatrices from "./chapters/positive-definite-matrices";
import normsInnerProducts from "./chapters/norms-inner-products";
import limitsContinuity from "./chapters/limits-continuity";
import partialDerivatives from "./chapters/partial-derivatives";
import gradientJacobian from "./chapters/gradient-jacobian";
import hessian from "./chapters/hessian";
import chainRuleHighDim from "./chapters/chain-rule-high-dim";
import taylorExpansion from "./chapters/taylor-expansion";
import implicitDifferentiation from "./chapters/implicit-differentiation";
import randomVariables from "./chapters/random-variables";
import distributions from "./chapters/distributions";
import jointConditional from "./chapters/joint-conditional";
import bayesTheorem from "./chapters/bayes-theorem";
import expectationVariance from "./chapters/expectation-variance";
import lawOfLargeNumbers from "./chapters/law-of-large-numbers";
import centralLimitTheorem from "./chapters/central-limit-theorem";
import estimationTheory from "./chapters/estimation-theory";
import mle from "./chapters/mle";
import mapEstimation from "./chapters/map-estimation";
import hypothesisTesting from "./chapters/hypothesis-testing";
import confidenceIntervals from "./chapters/confidence-intervals";
import bayesianInference from "./chapters/bayesian-inference";
import convexSets from "./chapters/convex-sets";
import convexFunctions from "./chapters/convex-functions";
import lagrangeMultipliers from "./chapters/lagrange-multipliers";
import kktConditions from "./chapters/kkt-conditions";
import gradientMethods from "./chapters/gradient-methods";
import secondOrderMethods from "./chapters/second-order-methods";
import stochasticOptimization from "./chapters/stochastic-optimization";
import informationGeometry from "./chapters/information-geometry";
import graphTheoryBasics from "./chapters/graph-theory-basics";
import markovChains from "./chapters/markov-chains";
import measureTheory from "./chapters/measure-theory";
import numericalStability from "./chapters/numerical-stability";
import floatingPointErrors from "./chapters/floating-point-errors";

export const mathModule: Module = {
  id: "math",
  title: "Mathematical Foundations",
  description:
    "Linear algebra, calculus, probability, statistics, and optimization essentials.",
  topics: [
    {
      id: "linear-algebra",
      title: "Linear Algebra Core",
      description: "Vector spaces, transformations, decompositions, and the geometry of high-dimensional data.",
      chapters: [vectorSpaces, linearTransformations, matrixDecomposition, svd, spectralTheorem, positiveDefiniteMatrices, normsInnerProducts],
    },
    {
      id: "calculus",
      title: "Calculus",
      description: "Derivatives, gradients, and the mathematics of change in high dimensions.",
      chapters: [limitsContinuity, partialDerivatives, gradientJacobian, hessian, chainRuleHighDim, taylorExpansion, implicitDifferentiation],
    },
    {
      id: "probability",
      title: "Probability",
      description: "Random variables, distributions, and the mathematics of uncertainty.",
      chapters: [randomVariables, distributions, jointConditional, bayesTheorem, expectationVariance, lawOfLargeNumbers, centralLimitTheorem],
    },
    {
      id: "statistics",
      title: "Statistics",
      description: "Estimation, inference, and drawing conclusions from data.",
      chapters: [estimationTheory, mle, mapEstimation, hypothesisTesting, confidenceIntervals, bayesianInference],
    },
    {
      id: "optimization",
      title: "Optimization",
      description: "Minimizing and maximizing functions under constraints.",
      chapters: [convexSets, convexFunctions, lagrangeMultipliers, kktConditions, gradientMethods, secondOrderMethods, stochasticOptimization],
    },
    {
      id: "additional-math",
      title: "Additional Math Topics",
      description: "Information geometry, graph theory, Markov chains, and numerical methods.",
      chapters: [informationGeometry, graphTheoryBasics, markovChains, measureTheory, numericalStability, floatingPointErrors],
    }
  ],
};
