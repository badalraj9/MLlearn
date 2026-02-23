import { Link } from "react-router-dom";
import { papers } from "@/content/papers";
import { FileText } from "lucide-react";

export default function PapersPage() {
  const first = papers[0];

  return (
    <div className="page-content stagger-in">
      <div className="page-header">
        <div className="page-header-icon">
          <FileText size={16} />
        </div>
        <div>
          <h1 className="page-header-title">Paper Deconstructors</h1>
          <p className="page-header-sub">1 paper deconstructed for learning</p>
        </div>
      </div>
      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Featured Paper</span>
          <span>Reading Modes</span>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      {first ? (
        <div className="card" style={{ maxWidth: "620px" }}>
          <h3>{first.title}</h3>
          <p>{first.abstract}</p>
          <div className="hero-actions" style={{ marginTop: "10px" }}>
            <Link to={`/papers/${first.id}`} className="btn-secondary">
              Overview
            </Link>
            <Link to={`/papers/${first.id}`} className="btn-secondary">
              Deep Dive
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <p>No papers yet.</p>
        </div>
      )}
    </div>
  );
}
