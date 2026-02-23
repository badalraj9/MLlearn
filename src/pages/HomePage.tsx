import { Link } from "react-router-dom";
import { BookOpen, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="page-content stagger-in">
      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Guided Modules</span>
          <span>Interactive Lessons</span>
          <span>Earn &amp; Unlock</span>
        </div>
      </div>
      <section className="hero-grid">
        <div>
          <div className="book-stamp">Interactive Mathematical Learning</div>
          <h1 className="hero-title">
            Every equation is a playground,
            <br />
            every proof is a journey
          </h1>
          <p className="hero-copy">
            Master machine learning mathematics through interactive
            visualizations, explorable proofs, and deconstructed research papers.
          </p>
          <div className="hero-actions">
            <Link to="/modules" className="btn-primary">
              <BookOpen size={18} />
              Start Learning
            </Link>
            <Link to="/papers" className="btn-secondary">
              <FileText size={18} />
              Explore Papers
            </Link>
          </div>
        </div>
        <div className="info-stack">
          <div className="info-card">
            <h3>Guided Modules</h3>
            <p>Math, ML theory, algorithms, and research reading.</p>
          </div>
          <div className="info-card">
            <h3>Interactive Lessons</h3>
            <p>Learn by manipulating graphs, equations, and models.</p>
          </div>
          <div className="info-card">
            <h3>Earn & Unlock</h3>
            <p>Assessments award coins to unlock new chapters.</p>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section-block">
        <div className="section-title">Your Learning Journey</div>
        <div className="card-grid">
          <div className="card">
            <h3>Foundations</h3>
            <p>Mathematical maturity, notation fluency, proof reading.</p>
          </div>
          <div className="card">
            <h3>Core ML</h3>
            <p>Classical algorithms and mathematical foundations.</p>
          </div>
          <div className="card">
            <h3>Deep Learning</h3>
            <p>Neural architectures and training dynamics.</p>
          </div>
          <div className="card">
            <h3>Research</h3>
            <p>Read papers, identify gaps, and extend ideas.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
