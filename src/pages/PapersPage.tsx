import { Link } from "react-router-dom";
import { papers } from "@/content/papers";
import { FileText } from "lucide-react";

export default function PapersPage() {
  return (
    <div className="page-content stagger-in">
      <div className="page-header">
        <div className="page-header-icon">
          <FileText size={16} />
        </div>
        <div>
          <h1 className="page-header-title">Paper Deconstructors</h1>
          <p className="page-header-sub">{papers.length} papers deconstructed for learning</p>
        </div>
      </div>
      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Featured Papers</span>
          <span>Reading Modes</span>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      {papers.length > 0 ? (
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {papers.map((paper) => (
            <div key={paper.id} className="card">
              <h3>{paper.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem" }}>
                {paper.authors} ({paper.year})
              </p>
              <p>{paper.abstract}</p>
              <div className="hero-actions" style={{ marginTop: "10px" }}>
                <Link to={`/papers/${paper.id}`} className="btn-secondary">
                  Overview
                </Link>
                <Link to={`/papers/${paper.id}`} className="btn-secondary">
                  Deep Dive
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <p>No papers yet.</p>
        </div>
      )}
    </div>
  );
}
