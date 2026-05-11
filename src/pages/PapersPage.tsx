import { Link } from "react-router-dom";
import { papers } from "@/content/papers";

export default function PapersPage() {
  return (
    <div className="page-content stagger-in">
      {/* Page Header */}
      <header style={{ marginBottom: "4rem", marginTop: "3rem" }}>
        <h1 style={{ 
          fontFamily: "var(--font-heading)", 
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 400,
          marginBottom: "1rem",
          lineHeight: 1.1
        }}>
          Papers
        </h1>
        <p style={{ 
          fontFamily: "var(--font-body)",
          color: "var(--text-secondary)", 
          maxWidth: "50ch",
          lineHeight: 1.75,
          fontSize: "0.95rem",
          margin: 0
        }}>
          Landmark papers in machine learning, deconstructed with mathematical rigor 
          and guided analysis.
        </p>
      </header>

      {/* Bibliography Section */}
      <section>
        <span style={{ 
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          display: "block",
          marginBottom: "1rem"
        }}>
          Annotated Bibliography
        </span>
        
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {papers.map((paper, i) => (
            <article
              key={paper.id}
              style={{
                padding: "2.5rem 0",
                borderBottom: "1px solid var(--border)"
              }}
            >
              <div style={{ 
                display: "grid",
                gridTemplateColumns: "36px 1fr",
                gap: "1.5rem"
              }}>
                <span style={{ 
                  fontFamily: "var(--font-mono)", 
                  fontSize: "0.7rem",
                  color: "var(--text-tertiary)",
                  paddingTop: "5px"
                }}>
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <div>
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    marginBottom: "0.5rem",
                    color: "var(--text-primary)",
                    lineHeight: 1.3
                  }}>
                    <Link 
                      to={`/papers/${paper.id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {paper.title}
                    </Link>
                  </h2>
                  <p style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem", 
                    color: "var(--text-tertiary)",
                    marginBottom: "0.75rem",
                    marginTop: 0,
                    letterSpacing: "0.02em"
                  }}>
                    {paper.authors} ({paper.year})
                  </p>
                  <p style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem", 
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                    maxWidth: "65ch",
                    margin: 0
                  }}>
                    {paper.abstract}
                  </p>
                  <Link 
                    to={`/papers/${paper.id}`}
                    style={{
                      display: "inline-block",
                      marginTop: "1.25rem",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--border)"
                    }}
                  >
                    Read analysis →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}