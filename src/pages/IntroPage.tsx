import { BookOpen } from "lucide-react";

export default function IntroPage() {
  return (
    <div className="page-content stagger-in">
      <div className="page-header">
        <div className="page-header-icon">
          <BookOpen size={16} />
        </div>
        <div>
          <h1 className="page-header-title">About MLearn</h1>
          <p className="page-header-sub">
            A book-first learning studio for machine learning mastery.
          </p>
        </div>
      </div>
      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Vision</span>
          <span>How It Works</span>
          <span>Roadmap</span>
        </div>
      </div>

      <div className="section-block">
        <div className="info-stack">
          <div className="info-card">
            <h3>Vision</h3>
            <p>Teach ML like a guided book: calm, rigorous, and tactile.</p>
          </div>
          <div className="info-card">
            <h3>How It Works</h3>
            <p>Progress through chapters, unlock topics, and learn by doing.</p>
          </div>
          <div className="info-card">
            <h3>Rewards & Unlocks</h3>
            <p>Assessments award coins to access advanced material.</p>
          </div>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      <section className="section-block">
        <div className="section-title">Roadmap</div>
        <div className="card-grid">
          <div className="card">
            <h3>Interactive Lessons</h3>
            <p>Equations, graphs, and simulations per topic.</p>
          </div>
          <div className="card">
            <h3>Adaptive Unlocks</h3>
            <p>Coin-based access based on performance.</p>
          </div>
          <div className="card">
            <h3>Research Reading</h3>
            <p>Paper deconstruction with guided prompts.</p>
          </div>
          <div className="card">
            <h3>Community Paths</h3>
            <p>Shared routes from beginner to research.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
