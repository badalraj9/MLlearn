import { Link } from "react-router-dom";
import { modules } from "@/content/modules";

const moduleDescriptions: Record<string, { focus: string; approach: string }> = {
  math: {
    focus: "Linear algebra, calculus, probability, and optimization",
    approach: "Build the mathematical vocabulary for machine learning"
  },
  "ml-theory": {
    focus: "Statistical learning theory, VC dimension, regularization",
    approach: "Understand why machine learning works, not just how"
  },
  "deep-learning": {
    focus: "Neural networks, backpropagation, architectural innovations",
    approach: "From first principles to modern architectures"
  },
  generative: {
    focus: "VAEs, GANs, diffusion models, autoregressive models",
    approach: "The mathematics of synthetic data generation"
  },
  "deep-research": {
    focus: "Attention mechanisms, transformers, advanced architectures",
    approach: "Deconstruct research papers with mathematical rigor"
  },
  "applied-ml": {
    focus: "Model serving, monitoring, deployment pipelines",
    approach: "Engineering mathematics at scale"
  },
};

export default function ModulesPage() {
  return (
    <div className="page-content stagger-in">
      <header style={{ marginBottom: "4rem", marginTop: "3rem" }}>
        <h1 style={{ 
          fontFamily: "var(--font-heading)", 
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 400,
          marginBottom: "1rem",
          lineHeight: 1.1
        }}>
          Chapters
        </h1>
        <p style={{ 
          fontFamily: "var(--font-body)",
          color: "var(--text-secondary)", 
          maxWidth: "45ch",
          lineHeight: 1.75,
          fontSize: "0.95rem",
          margin: 0
        }}>
          A structured path from mathematical foundations to research-level understanding.
        </p>
      </header>

      <section>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {modules.map((module, i) => (
            <Link
              key={module.id}
              to={`/modules/${module.id}`}
              style={{
                display: "grid",
                gridTemplateColumns: "36px 1fr 24px",
                gap: "1.5rem",
                padding: "2rem 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                color: "inherit",
                transition: "opacity 150ms ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.65"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              <span style={{ 
                fontFamily: "var(--font-mono)", 
                fontSize: "0.7rem",
                color: "var(--text-tertiary)",
                paddingTop: "3px"
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 style={{ 
                  fontFamily: "var(--font-heading)", 
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  marginBottom: "0.4rem",
                  marginTop: 0,
                  color: "var(--text-primary)"
                }}>
                  {module.title}
                </h2>
                <p style={{ 
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem", 
                  color: "var(--text-tertiary)",
                  marginBottom: "0.2rem",
                  marginTop: 0
                }}>
                  {moduleDescriptions[module.id]?.focus}
                </p>
                <p style={{ 
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem", 
                  color: "var(--text-tertiary)",
                  fontStyle: "italic",
                  margin: 0
                }}>
                  {moduleDescriptions[module.id]?.approach}
                </p>
              </div>
              <span style={{ 
                color: "var(--text-tertiary)",
                display: "flex",
                alignItems: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem"
              }}>
                {String(module.topics?.length || 0).padStart(2, '0')}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ 
        marginTop: "4rem",
        padding: "2.5rem 0",
        borderTop: "1px solid var(--border)"
      }}>
        <p style={{ 
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem", 
          color: "var(--text-tertiary)",
          textAlign: "center",
          letterSpacing: "0.05em",
          margin: 0
        }}>
          {modules.reduce((acc, m) => acc + (m.topics?.length || 0), 0)} topics across {modules.length} learning paths
        </p>
      </footer>
    </div>
  );
}