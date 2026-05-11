import type { Module } from "@/types";
import dataCleaningPipelines from "./chapters/data-cleaning-pipelines";
import featureSelection from "./chapters/feature-selection";
import imbalancedData from "./chapters/imbalanced-data";
import modelInterpretability from "./chapters/model-interpretability";
import shapLime from "./chapters/shap-lime";
import mlApis from "./chapters/ml-apis";
import fastapiServing from "./chapters/fastapi-serving";
import dockerMl from "./chapters/docker-ml";
import cicdMl from "./chapters/cicd-ml";
import monitoringProduction from "./chapters/monitoring-production";
import loggingDrift from "./chapters/logging-drift";
import modelCompression from "./chapters/model-compression";
import quantization from "./chapters/quantization";
import pruning from "./chapters/pruning";
import knowledgeDistillation from "./chapters/knowledge-distillation";
import cvProjects from "./chapters/cv-projects";
import nlpProjects from "./chapters/nlp-projects";
import recommenderSystems from "./chapters/recommender-systems";
import timeSeries from "./chapters/time-series";
import financialModeling from "./chapters/financial-modeling";
import healthcareMl from "./chapters/healthcare-ml";
import edgeAi from "./chapters/edge-ai";

export const appliedMlModule: Module = {
  id: "applied-ml",
  title: "Applied Machine Learning",
  description:
    "Data pipelines, model serving, compression, and real-world domain projects.",
  topics: [
    {
      id: "practical-foundations",
      title: "Practical Foundations",
      description: "Data cleaning, feature engineering, and model interpretability.",
      chapters: [dataCleaningPipelines, featureSelection, imbalancedData, modelInterpretability, shapLime],
    },
    {
      id: "engineering",
      title: "Engineering",
      description: "ML APIs, containerization, CI/CD, and production monitoring.",
      chapters: [mlApis, fastapiServing, dockerMl, cicdMl, monitoringProduction, loggingDrift],
    },
    {
      id: "performance",
      title: "Performance",
      description: "Model compression, quantization, pruning, and knowledge distillation.",
      chapters: [modelCompression, quantization, pruning, knowledgeDistillation],
    },
    {
      id: "real-world-domains",
      title: "Real-World Domains",
      description: "Domain-specific applications: vision, NLP, recommenders, and more.",
      chapters: [cvProjects, nlpProjects, recommenderSystems, timeSeries, financialModeling, healthcareMl, edgeAi],
    }
  ],
};
