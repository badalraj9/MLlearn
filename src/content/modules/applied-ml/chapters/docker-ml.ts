import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "docker-ml",
  title: "Docker for ML",
  description: "Containerizing ML environments and models.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Docker packages your model code, dependencies, and runtime into a portable container. This eliminates environment drift between dev and production.",
          "For ML, containers must handle large dependencies, GPU drivers, and optimized runtimes.",
          "A well-built image is reproducible, small, and fast to start.",
        ],
        keyIdeas: [
          "Dockerfiles define deterministic build steps",
          "Layer caching speeds up rebuilds",
          "Slim base images reduce attack surface and size",
          "Multi-stage builds separate build and runtime",
          "GPU support requires compatible CUDA and drivers",
          "Health checks detect failed containers early",
        ],
        equations: [
          "\\[ \\text{Throughput} = \\frac{\\text{requests}}{\\text{time}} \\]",
          "\\[ \\text{Cold Start Latency} = t_{pull} + t_{init} + t_{model} \\]",
          "\\[ \\text{Utilization} = \\frac{\\text{busy time}}{\\text{total time}} \\]",
        ],
        references: [
          "Docker Docs - Best Practices for Writing Dockerfiles",
          "NVIDIA - CUDA Container Toolkit",
          "Google - Container-Optimized OS and ML Serving Guides",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Container builds should separate dependencies from code to maximize caching. This keeps iteration fast for ML workflows.",
          "Reproducibility improves with pinned versions, locked environments, and explicit system libraries.",
          "Security scanning and minimal permissions reduce risk in production.",
        ],
        keyIdeas: [
          "Pin versions in requirements and OS packages",
          "Use non-root users in containers",
          "Export only the ports you need",
          "Bundle model artifacts via build args or volume mounts",
          "Use init systems to handle signals correctly",
          "Image scanning catches vulnerabilities early",
        ],
        equations: [
          "\\[ \\text{Image Size} = \\sum_{i=1}^L \\text{layer}_i \\]",
          "\\[ \\text{Cache Hit Rate} = \\frac{\\text{cache hits}}{\\text{total builds}} \\]",
          "\\[ \\text{SLA} = 1 - \\text{Error Rate} \\]",
        ],
        references: [
          "OWASP - Container Security Cheat Sheet",
          "Google - Distroless Containers",
          "Kubernetes Docs - Containers and Images",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Production ML uses orchestration (Kubernetes) to scale containers, manage rollouts, and handle failures.",
          "Advanced builds cache model artifacts, compile dependencies, and use optimized inference runtimes (ONNX, TensorRT).",
          "Supply chain security verifies provenance and integrity of container images.",
        ],
        keyIdeas: [
          "Multi-arch images support diverse hardware",
          "Sidecars can handle logging, monitoring, and security",
          "Runtime optimizations reduce latency and cost",
          "Immutable images simplify rollback and debugging",
          "SBOMs improve auditability and compliance",
          "Resource requests and limits prevent noisy neighbor issues",
        ],
        equations: [
          "\\[ \\text{P95 Latency} = \\text{percentile}_{0.95}(L) \\]",
          "\\[ \\text{Cost per 1k} = \\frac{\\text{compute cost}}{\\text{requests}/1000} \\]",
          "\\[ \\text{Saturation} = \\frac{\\text{usage}}{\\text{limit}} \\]",
        ],
        references: [
          "Kubernetes - Production Best Practices",
          "NVIDIA - TensorRT Inference Optimization",
          "SLSA - Supply Chain Levels for Software Artifacts",
        ],
      },
    },
  ],
};

export default chapter;
