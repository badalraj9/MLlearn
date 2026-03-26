import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "fastapi-serving",
  title: "FastAPI Model Serving",
  description: "Serving models with FastAPI for real-time inference.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "FastAPI is a modern Python framework for building high-performance ML inference APIs with automatic validation and OpenAPI docs.",
          "It pairs async I/O with Pydantic schemas, making request handling both fast and safe.",
          "The core serving loop typically includes input validation, preprocessing, model inference, and postprocessing.",
        ],
        keyIdeas: [
          "Pydantic models define strict request and response schemas",
          "Async endpoints allow concurrent I/O and batching",
          "Dependency injection keeps code modular",
          "Startup events load models once per worker",
          "Uvicorn and Gunicorn manage workers and processes",
          "Structured logging and tracing are essential for production",
        ],
        equations: [
          "\\[ L_{total} = L_{pre} + L_{infer} + L_{post} \\]",
          "\\[ \\text{QPS} = \\frac{\\text{requests}}{\\text{second}} \\]",
          "\\[ \\text{P95} = \\text{percentile}_{0.95}(L) \\]",
        ],
        references: [
          "FastAPI Docs - Advanced User Guide",
          "Uvicorn Docs - Deployment",
          "Pydantic Docs - Data Validation",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Production serving requires batching, caching, and careful process management to keep latency low and throughput high.",
          "Model loading should happen once per worker to avoid repeated initialization and GPU memory fragmentation.",
          "Request validation prevents model crashes from malformed inputs.",
        ],
        keyIdeas: [
          "Batching amortizes model compute cost",
          "Model warmup reduces first-request latency",
          "Timeouts protect against long-running inference",
          "Circuit breakers prevent cascading failures",
          "Rate limiting controls abuse and capacity",
          "Health checks and readiness probes enable safe rollouts",
        ],
        equations: [
          "\\[ \\text{Throughput} \\approx \\frac{\\text{batch size}}{L_{infer}(b)} \\]",
          "\\[ L_{end} = L_{queue} + L_{service} \\]",
          "\\[ \\rho = \\frac{\\lambda}{\\mu} \\quad (\\text{utilization}) \\]",
        ],
        references: [
          "Kleppmann - Designing Data-Intensive Applications (latency/throughput)",
          "Netflix - Resilience Engineering Patterns",
          "OpenAI - API Reliability Practices (general)",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced serving integrates tracing, structured metrics, and model version routing for experimentation and rollbacks.",
          "GPU inference benefits from batching and pinned memory, but must manage contention across workers.",
          "A/B testing at the API layer enables safe iteration and online evaluation.",
        ],
        keyIdeas: [
          "Model versioning enables safe rollout and rollback",
          "Tracing links requests to model and feature versions",
          "Adaptive batching balances latency and throughput",
          "GPU sharing requires careful memory management",
          "Shadow traffic validates changes without user impact",
          "SLO-driven autoscaling optimizes cost and reliability",
        ],
        equations: [
          "\\[ \\text{Error Budget} = 1 - \\text{SLO} \\]",
          "\\[ \\text{Tail Latency} \\propto \\frac{1}{1-\\rho} \\]",
          "\\[ \\text{Lift} = \\frac{m_{new} - m_{base}}{m_{base}} \\]",
        ],
        references: [
          "Google SRE Book - Monitoring Distributed Systems",
          "OpenTelemetry - Tracing and Metrics",
          "MLPerf Inference - Benchmarking Inference Systems",
        ],
      },
    },
  ],
};

export default chapter;
