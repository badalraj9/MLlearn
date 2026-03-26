import type { Chapter } from "@/types";

type Group =
  | "scaling"
  | "interp"
  | "rag"
  | "rlhf"
  | "world"
  | "agents";

interface Spec {
  id: string;
  title: string;
  description: string;
  group: Group;
  angle: string;
}

interface Template {
  foundation: string;
  applied: string;
  advanced: string;
  keyIdeas: [string, string, string, string];
  equations: [string, string, string];
  references: [string, string];
}

const templates: Record<Group, Template> = {
  scaling: {
    foundation:
      "These chapters explain why model, data, and compute scale produce surprisingly regular performance trends in modern deep learning.",
    applied:
      "The practical question is how far scaling helps before bottlenecks shift from raw capability to data quality, evaluation, or inference cost.",
    advanced:
      "The advanced view studies emergence claims critically and asks which capabilities are true phase changes versus smooth extrapolations seen through poor metrics.",
    keyIdeas: [
      "Scaling laws relate performance to model size, data size, and compute.",
      "Emergent behavior is often tied to threshold effects in evaluation or tool use.",
      "Capability growth is not free because cost, latency, and data curation also scale.",
      "The most important research question is where scaling stops being the dominant lever.",
    ],
    equations: [
      "\\[ L(N,D,C) \\approx aN^{-\\alpha} + bD^{-\\beta} + cC^{-\\gamma} + L_\\infty \\]",
      "\\[ \\text{capability} \\uparrow \\text{ as effective scale} \\uparrow \\]",
      "\\[ \\text{compute budget} \\approx \\text{model size} \\times \\text{tokens} \\]",
    ],
    references: [
      "Kaplan et al. (2020) - Scaling Laws for Neural Language Models",
      "Hoffmann et al. (2022) - Training Compute-Optimal Large Language Models",
    ],
  },
  interp: {
    foundation:
      "These chapters explain mechanistic interpretability as the attempt to reverse-engineer learned circuits inside neural networks rather than only probing them behaviorally.",
    applied:
      "The practical question is how to find features, heads, and pathways that are stable enough to support debugging or safety analysis.",
    advanced:
      "The advanced view asks whether local circuit explanations really compose into a faithful account of whole-model behavior.",
    keyIdeas: [
      "Mechanistic interpretability aims to explain internal computation, not just input-output behavior.",
      "Features, superposition, and circuits are central concepts in this area.",
      "Attention heads and MLP neurons can sometimes be linked to specific sub-computations.",
      "Interpretability must balance usefulness, faithfulness, and scalability.",
    ],
    equations: [
      "\\[ h' = h + \\mathrm{Attn}(h) + \\mathrm{MLP}(h) \\]",
      "\\[ a_{ij} = \\mathrm{softmax}\\left(\\frac{q_i k_j^T}{\\sqrt{d}}\\right) \\]",
      "\\[ \\text{feature activation} = w^T h \\]",
    ],
    references: [
      "Olah et al. - Zoom In: An Introduction to Circuits",
      "Elhage et al. (2022) - Toy Models of Superposition",
    ],
  },
  rag: {
    foundation:
      "These chapters explain retrieval-augmented generation as a system that mixes parametric reasoning with external non-parametric memory.",
    applied:
      "The practical challenge is building retrieval pipelines whose documents are relevant, fresh, and well integrated into generation.",
    advanced:
      "The advanced view focuses on failure modes such as retrieval miss, context poisoning, answer copying, and evaluation leakage.",
    keyIdeas: [
      "RAG separates storing world knowledge from generating an answer.",
      "The retrieval system is part of the model behavior, not just plumbing.",
      "Chunking, ranking, and context formatting strongly affect downstream quality.",
      "Evaluation must distinguish reasoning errors from retrieval errors.",
    ],
    equations: [
      "\\[ p(y \\mid x) = \\sum_d p(y \\mid x,d) p(d \\mid x) \\]",
      "\\[ s(q,d) = f(q)^T g(d) \\]",
      "\\[ \\text{answer quality} = f(\\text{retrieval quality}, \\text{generation quality}) \\]",
    ],
    references: [
      "Lewis et al. (2020) - Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      "Gao et al. (2023) - Retrieval-Augmented Generation for Large Language Models: A Survey",
    ],
  },
  rlhf: {
    foundation:
      "These chapters explain RLHF as a pipeline for aligning model behavior with human preference judgments rather than only next-token prediction.",
    applied:
      "The practical challenge is collecting preference data, fitting reward models, and optimizing policies without reward hacking or severe distribution shift.",
    advanced:
      "The advanced view studies when preference optimization improves alignment and when it merely teaches models to imitate superficial signals in the feedback process.",
    keyIdeas: [
      "RLHF introduces human preference signals after pretraining.",
      "Reward models compress pairwise judgments into a trainable objective.",
      "Policy optimization can exploit weaknesses in the reward model.",
      "Alignment quality depends on data quality, policy training, and evaluation.",
    ],
    equations: [
      "\\[ r_\\phi(x,y) \\approx \\text{human preference score} \\]",
      "\\[ \\pi^* = \\arg\\max_\\pi \\mathbb{E}[r_\\phi(x,y)] - \\beta D_{KL}(\\pi \\| \\pi_{ref}) \\]",
      "\\[ P(y_w \\succ y_l) = \\sigma(r_\\phi(x,y_w) - r_\\phi(x,y_l)) \\]",
    ],
    references: [
      "Christiano et al. (2017) - Deep Reinforcement Learning from Human Preferences",
      "Ouyang et al. (2022) - Training Language Models to Follow Instructions with Human Feedback",
    ],
  },
  world: {
    foundation:
      "These chapters explain world models as learned internal models of environment dynamics, hidden state, and future outcomes.",
    applied:
      "The practical question is how to use learned dynamics for planning, imagination, and control without compounding model error.",
    advanced:
      "The advanced view studies when latent predictive structure becomes useful for reasoning and when it remains a brittle simulation shortcut.",
    keyIdeas: [
      "World models compress state, dynamics, and uncertainty into a predictive representation.",
      "Planning becomes possible when future states can be simulated internally.",
      "Model bias accumulates when rollouts drift away from reality.",
      "Latent dynamics quality matters more than simple reconstruction fidelity.",
    ],
    equations: [
      "\\[ z_{t+1} \\sim p(z_{t+1} \\mid z_t, a_t) \\]",
      "\\[ \\hat{r}_t = g(z_t, a_t) \\]",
      "\\[ \\pi^* = \\arg\\max_\\pi \\mathbb{E}\\left[\\sum_t r_t\\right] \\text{ under learned dynamics} \\]",
    ],
    references: [
      "Ha & Schmidhuber (2018) - World Models",
      "Hafner et al. (2023) - Mastering Diverse Domains through World Models",
    ],
  },
  agents: {
    foundation:
      "These chapters explain autonomous agents as systems that plan, call tools, store intermediate state, and act across multiple steps rather than producing one-off responses.",
    applied:
      "The practical challenge is making agents reliable under long horizons, partial observability, tool errors, and memory drift.",
    advanced:
      "The advanced view studies evaluation, controllability, and safety when the model has persistence, tool access, and opportunities to self-amplify mistakes.",
    keyIdeas: [
      "Agents differ from plain chat models because they operate over trajectories, not single completions.",
      "Planning, memory, tool use, and feedback loops are the main design components.",
      "Agent failure often comes from compounding small mistakes across steps.",
      "Evaluation must measure end-to-end task success, not just local answer quality.",
    ],
    equations: [
      "\\[ a_t \\sim \\pi(a_t \\mid s_t, m_t) \\]",
      "\\[ m_{t+1} = u(m_t, o_t, a_t) \\]",
      "\\[ J(\\pi) = \\mathbb{E}\\left[\\sum_{t=1}^{T} r_t\\right] \\]",
    ],
    references: [
      "Yao et al. (2023) - ReAct: Synergizing Reasoning and Acting in Language Models",
      "Xi et al. (2023) - The Rise and Potential of Large Language Model Based Agents: A Survey",
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
            `${spec.title} focuses on ${spec.angle}.`,
            template.foundation,
            `The foundation goal is to understand what problem ${spec.title.toLowerCase()} is trying to solve and why that problem became important in frontier ML research.`,
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
            `In applied terms, ${spec.title.toLowerCase()} matters when researchers turn the idea into a training pipeline, evaluation setup, or system design choice.`,
            template.applied,
            `The practical skill is being able to tell whether failures come from the core idea itself or from how the surrounding system was implemented.`,
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
            `At an advanced level, ${spec.title.toLowerCase()} is best understood through its assumptions, limitations, and open research questions.`,
            template.advanced,
            `The advanced perspective is less about definitions and more about deciding where the current evidence is strong, weak, or actively contested.`,
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
  { id: "scaling-laws", title: "Scaling Laws", description: "Power-law trends linking performance to model, data, and compute scale.", group: "scaling", angle: "how predictable gains from scale can be" },
  { id: "emergent-capabilities", title: "Emergent Capabilities", description: "Abilities that appear abruptly or seem to appear only past certain scales.", group: "scaling", angle: "the debate over abrupt capability jumps in large models" },
  { id: "limits-of-scaling", title: "Limits of Scaling", description: "Where scaling helps, where it saturates, and what bottlenecks remain.", group: "scaling", angle: "the boundaries of scaling as a research strategy" },
  { id: "circuits-features", title: "Circuits & Features", description: "Feature decomposition and circuit-level explanations inside neural networks.", group: "interp", angle: "the building blocks of internal model computation" },
  { id: "attention-head-analysis", title: "Attention Head Analysis", description: "Studying whether attention heads implement reusable computations.", group: "interp", angle: "how interpretable behavior can be localized inside transformer attention" },
  { id: "limits-of-interpretability", title: "Limits of Interpretability", description: "What current interpretability methods can and cannot faithfully explain.", group: "interp", angle: "where mechanistic stories break down or stop scaling" },
  { id: "retrieval-basics", title: "Retrieval Basics", description: "Embeddings, indexing, chunking, and document retrieval for language systems.", group: "rag", angle: "the retrieval layer behind knowledge-grounded generation" },
  { id: "rag-pipeline-design", title: "RAG Pipeline Design", description: "How retrieval, ranking, prompting, and synthesis fit into a working system.", group: "rag", angle: "end-to-end retrieval-augmented system design" },
  { id: "failure-modes-evaluation", title: "Failure Modes & Evaluation", description: "Diagnosing retrieval misses, hallucinations, and grounding failures in RAG.", group: "rag", angle: "how to tell whether a RAG system is actually trustworthy" },
  { id: "preference-data", title: "Preference Data", description: "Collecting and modeling human comparison data for alignment training.", group: "rlhf", angle: "the data layer that makes RLHF possible" },
  { id: "reward-models-policy-optimization", title: "Reward Models & Policy Optimization", description: "From reward estimation to policy updates under KL control.", group: "rlhf", angle: "how preferences become a trainable optimization target" },
  { id: "alignment-failure-modes", title: "Alignment Failure Modes", description: "Reward hacking, sycophancy, over-optimization, and distribution shift in RLHF.", group: "rlhf", angle: "why alignment pipelines can fail even when training looks good" },
  { id: "latent-dynamics", title: "Latent Dynamics", description: "Learning compact state transitions instead of predicting raw observations directly.", group: "world", angle: "state-space modeling for future prediction" },
  { id: "planning-with-models", title: "Planning with Models", description: "Using imagined rollouts or latent simulations to choose actions.", group: "world", angle: "decision making with learned environment models" },
  { id: "model-errors-compounding", title: "Model Errors Compounding", description: "Why small prediction errors explode over long imagined rollouts.", group: "world", angle: "the brittleness of long-horizon model-based reasoning" },
  { id: "planning-tool-use", title: "Planning & Tool Use", description: "Decomposing tasks, choosing actions, and calling external tools in agent systems.", group: "agents", angle: "how agents turn language competence into action sequences" },
  { id: "memory-feedback-loops", title: "Memory & Feedback Loops", description: "Managing context, state, and self-correction across long agent trajectories.", group: "agents", angle: "state persistence and self-revision in autonomous systems" },
  { id: "agent-evaluation-safety", title: "Agent Evaluation & Safety", description: "Measuring task success, reliability, and risk in autonomous agent systems.", group: "agents", angle: "how to evaluate agents when single-turn benchmarks are insufficient" },
];

export const deepResearchChapters: Record<string, Chapter> = Object.fromEntries(
  specs.map((spec) => [spec.id, buildChapter(spec)]),
);
