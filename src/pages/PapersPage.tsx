import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { papers as authoredPapers } from "@/content/papers";
import { fetchArXivPapers } from "@/lib/arxiv";
import type { ArXivPaper } from "@/lib/arxiv";

export default function PapersPage() {
  const [arxivPapers, setArxivPapers] = useState<ArXivPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchArXivPapers("cat:cs.LG", 20)
      .then((papers) => {
        if (!cancelled) {
          setArxivPapers(papers);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not fetch recent papers");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visiblePapers = arxivPapers.slice(0, visibleCount);

  return (
    <div className="page-content stagger-in">
      {/* Page Header */}
      <header style={{ marginBottom: "4rem", marginTop: "3rem" }}>
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 400,
          marginBottom: "1rem",
          lineHeight: 1.1,
        }}>
          Papers
        </h1>
        <p style={{
          fontFamily: "var(--font-body)",
          color: "var(--text-secondary)",
          maxWidth: "50ch",
          lineHeight: 1.75,
          fontSize: "0.95rem",
          margin: 0,
        }}>
          Landmark papers in machine learning, deconstructed with mathematical rigor
          and guided analysis.
        </p>
      </header>

      {/* Tier 1 — Live arXiv Feed */}
      <section style={{ marginBottom: "5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: "3rem",
        }}>
          <div>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              position: "sticky",
              top: "1rem",
              display: "block",
            }}>
              Recent Research
              {arxivPapers.length > 0 && (
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  marginTop: "0.5rem",
                  letterSpacing: "0.05em",
                  textTransform: "none",
                  color: "var(--text-tertiary)",
                  opacity: 0.5,
                }}>
                  arXiv cs.LG
                </span>
              )}
            </span>
          </div>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {loading && (
              <div style={{ padding: "2rem 0", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>
                Loading recent papers...
              </div>
            )}

            {error && (
              <div style={{ padding: "2rem 0", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontStyle: "italic" }}>
                {error}
              </div>
            )}

            {!loading && !error && visiblePapers.length === 0 && (
              <div style={{ padding: "2rem 0", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontStyle: "italic" }}>
                No papers found.
              </div>
            )}

            {visiblePapers.map((paper, i) => (
              <div key={paper.id} style={{
                padding: "1.5rem 0",
                borderBottom: "1px solid var(--border)",
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: "1.25rem",
                  alignItems: "start",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--text-tertiary)",
                    paddingTop: "3px",
                    opacity: 0.6,
                  }}>
                    {paper.id}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.95rem",
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      lineHeight: 1.35,
                      marginBottom: "0.35rem",
                      marginTop: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {paper.title}
                    </h2>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.7rem",
                      color: "var(--text-tertiary)",
                      margin: 0,
                      letterSpacing: "0.02em",
                    }}>
                      {paper.authors.slice(0, 4).join(", ")}
                      {paper.authors.length > 4 ? " et al." : ""}
                      {" · "}
                      {paper.published.slice(0, 4)}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginTop: "0.6rem",
                      marginBottom: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {paper.summary}
                    </p>
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "flex-end",
                    paddingTop: "2px",
                  }}>
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        color: "var(--text-tertiary)",
                        textDecoration: "none",
                        borderBottom: "0.5px solid var(--border)",
                        paddingBottom: "1px",
                        whiteSpace: "nowrap",
                        transition: "color 150ms ease",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-tertiary)"}
                    >
                      arXiv →
                    </a>
                    <button
                      disabled
                      style={{
                        background: "none",
                        border: "none",
                        borderBottom: "0.5px solid var(--border)",
                        padding: "0 0 1px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        color: "var(--text-tertiary)",
                        cursor: "default",
                        opacity: 0.35,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Deconstruct
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {visibleCount < arxivPapers.length && (
              <button
                onClick={() => setVisibleCount((c) => c + 10)}
                style={{
                  display: "inline-block",
                  marginTop: "1.25rem",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  padding: "0 0 2px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                Load more →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Tier 3 — Authored Deep Dives */}
      <section>
        <div style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: "3rem",
        }}>
          <div>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              position: "sticky",
              top: "1rem",
              display: "block",
            }}>
              Deep Dives
            </span>
          </div>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {authoredPapers.map((paper, i) => (
              <article key={paper.id} style={{
                padding: "2.5rem 0",
                borderBottom: "1px solid var(--border)",
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "36px 1fr",
                  gap: "1.5rem",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-tertiary)",
                    paddingTop: "5px",
                  }}>
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.1rem",
                      fontWeight: 400,
                      marginBottom: "0.5rem",
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
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
                      letterSpacing: "0.02em",
                    }}>
                      {paper.authors.join(", ")} ({paper.year})
                    </p>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                      maxWidth: "65ch",
                      margin: 0,
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
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      Read analysis →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}