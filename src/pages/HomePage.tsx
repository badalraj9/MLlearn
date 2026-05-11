import { Link } from "react-router-dom";
import { modules } from "@/content/modules";

export default function HomePage() {
  const totalTopics = modules.reduce((acc, m) => acc + (m.topics?.length || 0), 0);

  return (
    <div className="page-content stagger-in">

      {/* MONUMENTAL HERO - Editorial anchor */}
      <section style={{ 
        marginTop: "6rem",
        marginBottom: "6rem",
        maxWidth: "800px"
      }}>
        <h1 style={{ 
          fontFamily: "var(--font-heading)", 
          fontSize: "clamp(3rem, 8vw, 5.5rem)", 
          fontWeight: 400,
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          marginBottom: "2.5rem"
        }}>
          Machine<br />
          Learning<br />
          Mathematics
        </h1>
        <p style={{ 
          fontFamily: "var(--font-body)", 
          fontSize: "1.1rem", 
          lineHeight: 1.85,
          color: "var(--text-secondary)",
          maxWidth: "48ch",
          marginBottom: "2.5rem"
        }}>
          An environment for understanding the mathematical foundations that underpin 
          modern machine learning — through rigorous proofs, geometric intuition, 
          and research paper deconstruction.
        </p>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link to="/modules" style={{ 
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--text-primary)",
            textDecoration: "none",
            borderBottom: "1px solid var(--text-primary)",
            paddingBottom: "2px"
          }}>
            Begin your journey →
          </Link>
          <Link to="/about" style={{ 
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--text-tertiary)",
            textDecoration: "none"
          }}>
            View curriculum
          </Link>
        </div>
      </section>

      {/* MONUMENTAL CENTERPIECE - Mathematical philosophical quote */}
      <section style={{ 
        margin: "5rem 0 6rem",
        padding: "4rem 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)"
      }}>
        <blockquote style={{ 
          fontFamily: "var(--font-heading)", 
          fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", 
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.4,
          color: "var(--text-primary)",
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto 1.5rem"
        }}>
          "The art of mathematics lies not in knowing the answer — 
          but in understanding why the question matters."
        </blockquote>
        <cite style={{ 
          display: "block",
          marginTop: "1.5rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem", 
          color: "var(--text-tertiary)",
          textAlign: "center",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontStyle: "normal"
        }}>
          On the nature of mathematical understanding
        </cite>
      </section>

      {/* MODULES - Editorial manuscript list */}
      <section style={{ 
        marginBottom: "6rem"
      }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "180px 1fr", 
          gap: "3rem"
        }}>
          <div>
            <span style={{ 
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem", 
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              position: "sticky",
              top: "1rem",
              display: "block"
            }}>
              Chapters
            </span>
          </div>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {modules.slice(0, 6).map((mod, i) => (
              <Link
                key={mod.id}
                to={`/modules/${mod.id}`}
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "28px 1fr 40px", 
                  alignItems: "start", 
                  gap: "1.5rem",
                  padding: "1.75rem 0",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                }}
              >
                <span style={{ 
                  fontFamily: "var(--font-mono)", 
                  fontSize: "0.7rem",
                  color: "var(--text-tertiary)",
                  paddingTop: "4px"
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span style={{ 
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.05rem",
                    fontWeight: 400
                  }}>
                    {mod.title}
                  </span>
                  <p style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem", 
                    color: "var(--text-tertiary)",
                    marginTop: "0.35rem",
                    lineHeight: 1.5,
                    marginBottom: 0
                  }}>
                    {mod.description}
                  </p>
                </div>
                <span style={{ 
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-tertiary)", 
                  fontSize: "0.7rem",
                  textAlign: "right",
                  paddingTop: "4px"
                }}>
                  {mod.topics?.length || 0}
                </span>
              </Link>
            ))}
            <Link to="/modules" style={{ 
              display: "inline-block",
              marginTop: "1.5rem",
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)", 
              fontSize: "0.85rem",
              textDecoration: "none",
              borderBottom: "1px solid var(--border)"
            }}>
              All chapters →
            </Link>
          </div>
        </div>
      </section>

      {/* APPROACH - Scholarly composition */}
      <section style={{ 
        marginBottom: "6rem",
        marginLeft: "-5%",
        marginRight: "-5%",
        padding: "3rem 8%",
        background: "var(--bg-tertiary)"
      }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1.5fr",
          gap: "4rem",
          alignItems: "start"
        }}>
          <div>
            <span style={{ 
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem", 
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              display: "block",
              marginBottom: "1rem"
            }}>
              Method
            </span>
            <h2 style={{ 
              fontFamily: "var(--font-heading)", 
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.2,
              margin: 0
            }}>
              Built for<br />
              understanding
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <article>
              <h3 style={{ 
                fontFamily: "var(--font-heading)", 
                fontSize: "1rem", 
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
                marginTop: 0
              }}>
                Mathematical rigor
              </h3>
              <p style={{ 
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)", 
                fontSize: "0.9rem",
                lineHeight: 1.8,
                margin: 0
              }}>
                Every concept presented with full mathematical detail — definitions, 
                theorems, and proofs — not simplified analogies. The goal is 
                genuine understanding, not familiarity.
              </p>
            </article>
            <article>
              <h3 style={{ 
                fontFamily: "var(--font-heading)", 
                fontSize: "1rem", 
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
                marginTop: 0
              }}>
                Geometric intuition
              </h3>
              <p style={{ 
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)", 
                fontSize: "0.9rem",
                lineHeight: 1.8,
                margin: 0
              }}>
                Abstract concepts clarified through interactive visualizations. 
                Watch gradients flow, see vector spaces transform — understanding 
                why mathematics works, not just how.
              </p>
            </article>
            <article>
              <h3 style={{ 
                fontFamily: "var(--font-heading)", 
                fontSize: "1rem", 
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
                marginTop: 0
              }}>
                Research foundation
              </h3>
              <p style={{ 
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)", 
                fontSize: "0.9rem",
                lineHeight: 1.8,
                margin: 0
              }}>
                Deconstruct landmark papers in machine learning — understanding 
                not just what they claim, but why their mathematical foundations 
                make them work.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CLOSING - Editorial colophon */}
      <section style={{ 
        marginTop: "4rem",
        marginBottom: "8rem"
      }}>
        <p style={{ 
          fontFamily: "var(--font-heading)", 
          fontSize: "clamp(1rem, 2vw, 1.35rem)", 
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
          marginBottom: "2rem",
          maxWidth: "50ch"
        }}>
          {totalTopics} topics across {modules.length} learning paths — 
          from foundational mathematics to research paper analysis.
        </p>
        <Link to="/modules" style={{ 
          fontFamily: "var(--font-body)",
          color: "var(--text-primary)", 
          fontSize: "0.9rem",
          textDecoration: "none",
          borderBottom: "1px solid var(--text-primary)",
          paddingBottom: "2px"
        }}>
          Explore the curriculum →
        </Link>
      </section>

    </div>
  );
}