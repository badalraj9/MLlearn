import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "ml-apis",
  title: "ML APIs",
  description: "Building and consuming machine learning APIs.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "ML APIs expose models as reliable, versioned services. Good API design prevents data drift, misuse, and breaking changes.",
          "Clear contracts for inputs and outputs are as important as model accuracy.",
          "API design choices affect latency, scalability, and user trust.",
        ],
        keyIdeas: [
          "Define schemas for request and response payloads",
          "Version endpoints to handle model evolution",
          "Idempotency prevents duplicate effects",
          "Auth and rate limiting protect the service",
          "Batching endpoints improve efficiency",
          "Error handling should be consistent and explicit",
        ],
        equations: [
          "\\[ \\text{QPS} = \\frac{\\text{requests}}{\\text{second}} \\]",
          "\\[ \\text{Error Rate} = \\frac{\\text{errors}}{\\text{total requests}} \\]",
          "\\[ \\text{P99} = \\text{percentile}_{0.99}(L) \\]",
        ],
        references: [
          "Google Cloud - ML API Design Guidelines",
          "Fielding - REST Architectural Style",
          "OpenAPI Specification",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Designing for stability means avoiding breaking changes and supporting gradual model upgrades.",
          "Batch and streaming APIs serve different workloads; streaming improves latency but adds operational complexity.",
          "Rate limiting and quotas enforce fair use and capacity planning.",
        ],
        keyIdeas: [
          "Backward compatibility is a contract, not a preference",
          "Schema evolution needs explicit versioning rules",
          "Async and streaming APIs reduce client wait time",
          "Request validation prevents silent model failure",
          "Caching repeated queries lowers cost",
          "Observability is required for support and debugging",
        ],
        equations: [
          "\\[ \\text{Cache Hit Rate} = \\frac{\\text{hits}}{\\text{requests}} \\]",
          "\\[ \\text{Latency} = L_{net} + L_{queue} + L_{infer} \\]",
          "\\[ \\text{Rate Limit} = \\frac{\\text{tokens}}{\\text{window}} \\]",
        ],
        references: [
          "Kleppmann - Designing Data-Intensive Applications",
          "IETF - RFC 7231 (HTTP Semantics)",
          "SRE Book - Monitoring and Alerting",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Multi-model routing enables experimentation, personalization, and fallback strategies when the primary model fails.",
          "Compliance requirements (PII handling, audit logs) often shape API architecture.",
          "Latency budgets must be allocated across feature fetching, inference, and postprocessing.",
        ],
        keyIdeas: [
          "Traffic shaping enables A/B tests and canaries",
          "Feature-store lookups often dominate latency",
          "Fallback models improve availability under load",
          "End-to-end tracing ties predictions to model versions",
          "Data retention policies must be enforced in logs",
          "SLOs guide autoscaling and deployment decisions",
        ],
        equations: [
          "\\[ L_{budget} = L_{features} + L_{infer} + L_{post} \\]",
          "\\[ \\text{Availability} = 1 - \\text{Error Rate} \\]",
          "\\[ \\text{Cost per 1k} = \\frac{\\text{compute cost}}{\\text{requests}/1000} \\]",
        ],
        references: [
          "Google SRE Book - Service Level Objectives",
          "Uber - Michelangelo: ML Platform (system design)",
          "Breck et al. (2017) - The ML Test Score",
        ],
      },
    },
  ],
};

export default chapter;
