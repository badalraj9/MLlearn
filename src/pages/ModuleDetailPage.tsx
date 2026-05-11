import { useParams, Link } from "react-router-dom";
import { modules } from "@/content/modules";

export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const module = modules.find((item) => item.id === moduleId);

  if (!module) return <div className="page-content">Module not found.</div>;

  return (
    <div className="page-content stagger-in">
      <div className="page-header" style={{ marginBottom: "3rem" }}>
        <div>
          <h1 className="page-header-title">{module.title}</h1>
          <p className="page-header-sub">{module.description}</p>
        </div>
      </div>

      {module.topics.length === 0 ? (
        <div className="chapter-empty-card">
          <div className="chapter-empty-icon" style={{ fontFamily: "var(--font-mono)" }}>§</div>
          <h3>Topics in preparation</h3>
          <p>Check back later for new content.</p>
        </div>
      ) : (
        <div className="section-block section-block--quiet">
          <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2rem" }}>
            {module.topics.length} {module.topics.length === 1 ? "chapter" : "chapters"}
          </p>
          {module.topics.map((topic, idx) => (
            <Link
              key={topic.id}
              to={`/modules/${module.id}/topics/${topic.id}`}
              style={{
                display: "grid",
                gridTemplateColumns: "3rem 1fr",
                gap: "1.5rem",
                padding: "2rem 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-tertiary)", paddingTop: "0.2rem" }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem" }}>{topic.title}</h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>{topic.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
