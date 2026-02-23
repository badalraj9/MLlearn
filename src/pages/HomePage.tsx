import { Link } from "react-router-dom";
import { BookOpen, FileText, Sparkles, Compass, Lock } from "lucide-react";

export default function HomePage() {
  return (
    <div className="page-content home-safe stagger-in">
      <div className="home-hero">
        <h1 className="home-title">MLearn is your book for mastering ML.</h1>
        <p className="home-lede">
          A structured journey through math, theory, algorithms, and research.
          You unlock topics by learning, not by guessing.
        </p>
        <div className="home-actions">
          <Link to="/modules" className="btn-primary">
            <BookOpen size={18} />
            Start the Journey
          </Link>
          <Link to="/papers" className="btn-secondary">
            <FileText size={18} />
            Explore Papers
          </Link>
        </div>
      </div>

      <div className="home-steps">
        <div className="home-step">
          <div className="home-step-icon">
            <Compass size={18} />
          </div>
          <div>
            <h3>Pick a track</h3>
            <p>Math, Core ML, Deep Learning, or Research.</p>
          </div>
        </div>
        <div className="home-step">
          <div className="home-step-icon">
            <Lock size={18} />
          </div>
          <div>
            <h3>Earn and unlock</h3>
            <p>Pass assessments to unlock deeper topics.</p>
          </div>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      <section className="section-block">
        <div className="section-title">What you will unlock</div>
        <div className="card-grid">
          <div className="card">
            <h3>Mathematical Foundations</h3>
            <p>Linear algebra, calculus, probability, optimization.</p>
          </div>
          <div className="card">
            <h3>Core ML Theory</h3>
            <p>Bias-variance, generalization, loss landscapes.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
