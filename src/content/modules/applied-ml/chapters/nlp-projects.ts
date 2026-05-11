import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "nlp-projects",
  title: "NLP Projects",
  description: "Text classification, NER, summarization, and generation.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "NLP projects convert unstructured text into labels, spans, summaries, or generated responses. Common tasks include sentiment classification, named entity recognition, retrieval, question answering, and summarization.",
          "The first design choice is almost always the unit of meaning: characters, words, subwords, sentences, or whole documents. That choice affects tokenization, context windows, and what the model can represent efficiently.",
          "A strong baseline usually comes from pretrained language models because they already encode syntax, semantics, and broad world knowledge learned from large corpora."
        ],
        keyIdeas: [
          "Tokenization determines how text is segmented before modeling.",
          "Classification, sequence labeling, retrieval, and generation require different label structures.",
          "Domain adaptation matters because clinical, legal, and support text differ sharply from web text.",
          "Evaluation should account for both task quality and failure modes such as hallucination or label leakage."
        ],
        equations: [
          "\\[ p(y \\mid x) = \\text{softmax}(W h_{[CLS]} + b) \\]",
          "\\[ \\text{CrossEntropy} = -\\sum_c y_c \\log \\hat{y}_c \\]",
          "\\[ \\text{F1} = \\frac{2 \\cdot \\text{precision} \\cdot \\text{recall}}{\\text{precision} + \\text{recall}} \\]"
        ],
        references: [
          "Jurafsky & Martin - Speech and Language Processing",
          "Raschka - Build a Large Language Model (From Scratch)"
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Applied NLP work usually starts with a task-specific baseline: TF-IDF plus logistic regression for classification, a BERT-style encoder for labeling, or retrieval plus prompting for knowledge-heavy QA.",
          "Data curation is the hidden bottleneck. Label consistency, document chunking, prompt format, and train-eval leakage across similar documents can dominate model choice.",
          "For production, latency, context length, and grounding strategy matter as much as benchmark scores. Many successful systems are hybrid pipelines with retrieval, reranking, and lightweight task-specific heads."
        ],
        keyIdeas: [
          "Document chunking and retrieval quality strongly shape downstream QA and summarization.",
          "NER and span extraction depend on exact token-to-label alignment.",
          "Prompting is useful, but evaluation should still be systematic and dataset-driven.",
          "Post-processing often includes confidence thresholds, deduplication, or structured validation."
        ],
        equations: [
          "\\[ \\alpha_{ij} = \\text{softmax}\\left(\\frac{q_i k_j^T}{\\sqrt{d}}\\right) \\]",
          "\\[ h_i' = \\sum_j \\alpha_{ij} v_j \\]",
          "\\[ \\text{ROUGE-L} = \\frac{(1 + \\beta^2)PR}{R + \\beta^2 P} \\]"
        ],
        references: [
          "Devlin et al. (2018) - BERT",
          "Lewis et al. (2020) - Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced NLP systems emphasize reasoning quality, alignment to external knowledge, and controllable generation. This is where retrieval-augmented generation, instruction tuning, and structured decoding become central.",
          "The difficulty is that strong surface fluency can mask factual or logical errors. A system that sounds convincing may still be miscalibrated, brittle to prompt changes, or unsafe in domain-specific settings.",
          "Modern NLP projects therefore evaluate not just task metrics, but traceability, groundedness, robustness to adversarial prompts, and the cost-quality tradeoff of larger models."
        ],
        keyIdeas: [
          "Instruction tuning improves task following, but it does not eliminate hallucinations.",
          "Retrieval grounding helps when facts change or source attribution matters.",
          "Long-context systems need strategies for chunk selection, compression, or memory.",
          "Alignment and safety constraints should be evaluated with adversarial probes, not assumptions."
        ],
        equations: [
          "\\[ p(y_{1:T} \\mid x) = \\prod_{t=1}^{T} p(y_t \\mid y_{<t}, x) \\]",
          "\\[ \\hat{y} = \\arg\\max_y \\left[ \\log p_\\theta(y \\mid x, r) + \\lambda s(y, r) \\right] \\]",
          "\\[ \\text{Perplexity} = \\exp\\left(-\\frac{1}{T} \\sum_{t=1}^{T} \\log p(y_t \\mid y_{<t})\\right) \\]"
        ],
        references: [
          "Ouyang et al. (2022) - Training language models to follow instructions with human feedback",
          "Wei et al. (2022) - Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
        ],
      },
    },
  ],
};

export default chapter;
