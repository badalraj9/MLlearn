import { Link } from "react-router-dom";
import { modules } from "@/content/modules";
import { BookOpen } from "lucide-react";

export default function IntroPage() {
  return (
    <div className="page-content stagger-in">
      <div className="page-header">
        <div className="page-header-icon">
          <BookOpen size={16} />
        </div>
        <div>
          <h1 className="page-header-title">What MLearn Contains</h1>
          <p className="page-header-sub">
            A structured, book-like journey through machine learning.
          </p>
        </div>
      </div>
      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Learning Map</span>
          <span>Modules Preview</span>
        </div>
      </div>

      <div className="section-block">
        <div className="info-stack">
          <div className="info-card">
            <h3>Learn in Modules</h3>
            <p>Math, ML theory, algorithms, and research reading.</p>
          </div>
          <div className="info-card">
            <h3>Earn Coins</h3>
            <p>Complete assessments to unlock the next topics.</p>
          </div>
          <div className="info-card">
            <h3>Choose Your Path</h3>
            <p>Spend coins to jump ahead or follow the guided sequence.</p>
          </div>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      <section className="section-block">
        <div className="section-title">Modules</div>
        <div className="card-grid">
          {modules.slice(0, 4).map((module) => (
            <Link key={module.id} to={`/modules/${module.id}`} className="card">
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
