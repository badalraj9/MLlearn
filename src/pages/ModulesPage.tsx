import { Link } from "react-router-dom";
import { modules } from "@/content/modules";
import { Layers } from "lucide-react";

export default function ModulesPage() {
  return (
    <div className="page-content stagger-in">
      <div className="page-header">
        <div className="page-header-icon">
          <Layers size={16} />
        </div>
        <div>
          <h1 className="page-header-title">Modules</h1>
          <p className="page-header-sub">Choose a track to begin your journey.</p>
        </div>
      </div>
      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Math Foundations</span>
          <span>ML Theory</span>
          <span>Algorithms</span>
          <span>Research Papers</span>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      <div className="card-grid">
        {modules.map((module) => (
          <Link key={module.id} to={`/modules/${module.id}`} className="card">
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
