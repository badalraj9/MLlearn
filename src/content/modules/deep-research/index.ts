import type { Module } from "@/types";
import scalingLaws from "./chapters/scaling-laws";
import emergentCapabilities from "./chapters/emergent-capabilities";
import limitsOfScaling from "./chapters/limits-of-scaling";
import circuitsFeatures from "./chapters/circuits-features";
import attentionHeadAnalysis from "./chapters/attention-head-analysis";
import limitsOfInterpretability from "./chapters/limits-of-interpretability";
import retrievalBasics from "./chapters/retrieval-basics";
import ragPipelineDesign from "./chapters/rag-pipeline-design";
import failureModesEvaluation from "./chapters/failure-modes-evaluation";
import preferenceData from "./chapters/preference-data";
import rewardModelsPolicyOptimization from "./chapters/reward-models-policy-optimization";
import alignmentFailureModes from "./chapters/alignment-failure-modes";
import latentDynamics from "./chapters/latent-dynamics";
import planningWithModels from "./chapters/planning-with-models";
import modelErrorsCompounding from "./chapters/model-errors-compounding";
import planningToolUse from "./chapters/planning-tool-use";
import memoryFeedbackLoops from "./chapters/memory-feedback-loops";
import agentEvaluationSafety from "./chapters/agent-evaluation-safety";

export const deepResearchModule: Module = {
  id: "deep-research",
  title: "Deep Learning Research",
  description:
    "Frontier themes in scaling, interpretability, alignment, world modeling, and agentic systems.",
  topics: [
    {
      id: "scaling-emergence",
      title: "Scaling & Emergence",
      description:
        "How predictable scaling trends interact with apparently sudden capability jumps.",
      chapters: [scalingLaws, emergentCapabilities, limitsOfScaling],
    },
    {
      id: "mechanistic-interpretability",
      title: "Mechanistic Interpretability",
      description:
        "Reverse-engineering internal features, circuits, and attention behavior in large models.",
      chapters: [circuitsFeatures, attentionHeadAnalysis, limitsOfInterpretability],
    },
    {
      id: "retrieval-augmented",
      title: "Retrieval-Augmented Models",
      description:
        "Combining parametric generation with external retrieval, reranking, and grounding.",
      chapters: [retrievalBasics, ragPipelineDesign, failureModesEvaluation],
    },
    {
      id: "rlhf",
      title: "RLHF",
      description:
        "Preference data, reward modeling, and policy optimization for alignment.",
      chapters: [preferenceData, rewardModelsPolicyOptimization, alignmentFailureModes],
    },
    {
      id: "world-models",
      title: "World Models",
      description:
        "Latent dynamics, model-based planning, and the challenges of long-horizon prediction.",
      chapters: [latentDynamics, planningWithModels, modelErrorsCompounding],
    },
    {
      id: "autonomous-agents",
      title: "Autonomous Agents",
      description:
        "Planning, memory, tool use, and safety in systems that act over extended trajectories.",
      chapters: [planningToolUse, memoryFeedbackLoops, agentEvaluationSafety],
    },
  ],
};
