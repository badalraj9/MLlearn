import { Link } from "react-router-dom";
import { modules } from "@/content/modules";

export default function IntroPage() {
  return (
    <div className="page-content stagger-in">
      <header style={{ marginBottom: "5rem", marginTop: "3rem" }}>
        <h1 style={{ 
          fontFamily: "var(--font-heading)", 
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 400,
          marginBottom: "1rem",
          lineHeight: 1.1
        }}>
          About
        </h1>
        <p style={{ 
          fontFamily: "var(--font-body)",
          color: "var(--text-secondary)", 
          maxWidth: "50ch",
          lineHeight: 1.8,
          fontSize: "0.95rem",
          margin: 0
        }}>
          An environment for understanding the mathematical foundations of machine learning through rigorous proofs, geometric intuition, and research paper analysis.
        </p>
      </header>

      <section style={{ marginBottom: "4rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "1.5rem" }}>
          Learning Paths
        </p>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {modules.map((mod, idx) => (
            <div
              key={mod.id}
              style={{
                display: "grid",
                gridTemplateColumns: "3rem 1fr auto",
                gap: "1.5rem",
                padding: "1.5rem 0",
                borderBottom: "1px solid var(--border)",
                alignItems: "start",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)", paddingTop: "4px" }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div>
                <Link
                  to={`/modules/${mod.id}`}
                  style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 400, color: "var(--text-primary)", textDecoration: "none" }}
                >
                  {mod.title}
                </Link>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--text-tertiary)", marginTop: "0.25rem", marginBottom: 0 }}>
                  {mod.description}
                </p>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)", paddingTop: "4px" }}>
                {mod.topics?.length || 0}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "4rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "1.5rem" }}>
          Approach
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Sequence: Beginner
            </p>
            <ol style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Mathematical Foundations", "ML Theory", "Deep Learning", "Generative Models"].map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", marginRight: "8px" }}>{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Sequence: Experienced
            </p>
            <ol style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["ML Theory", "Deep Learning", "Research Papers", "Applied ML"].map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", marginRight: "8px" }}>{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "4rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "1.5rem" }}>
          Structure
        </p>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
          {[
            { label: "I. Foundation", desc: "Core definitions, theorems, and first principles" },
            { label: "II. Applied", desc: "Computational implications and practical extensions" },
            { label: "III. Advanced", desc: "Research-grade depth and theoretical generalizations" },
          ].map(({ label, desc }) => (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", padding: "1rem 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)", paddingTop: "2px" }}>{label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: "3rem", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
        <Link
          to="/modules"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-tertiary)",
            textDecoration: "none",
            letterSpacing: "0.04em",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "2px",
          }}
        >
          begin reading
        </Link>
      </div>
    </div>
  );
}