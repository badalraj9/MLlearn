import { Link } from "react-router-dom";
import { modules } from "@/content/modules";
import { 
  BookOpen, ArrowRight, Calculator, Brain, Cpu, 
  Zap, Microscope, Target, CheckCircle 
} from "lucide-react";

const moduleIcons: Record<string, React.ReactNode> = {
  math: <Calculator size={18} />,
  "ml-theory": <Brain size={18} />,
  "deep-learning": <Cpu size={18} />,
  generative: <Zap size={18} />,
  "deep-research": <Microscope size={18} />,
  "applied-ml": <Target size={18} />,
};

export default function IntroPage() {
  return (
    <div className="page-content stagger-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-icon">
          <BookOpen size={16} />
        </div>
        <div>
          <h1 className="page-header-title">About MLearn</h1>
          <p className="page-header-sub">
            Curriculum and learning paths.
          </p>
        </div>
      </div>

      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Curriculum</span>
          <span>Beginner Path</span>
          <span>Experienced Path</span>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      {/* Curriculum - Simple List */}
      <section className="section-block">
        <div className="section-title">Curriculum</div>
        <div className="card">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="text-left py-2 font-medium" style={{ color: "var(--text-primary)" }}>Path</th>
                <th className="text-left py-2 font-medium" style={{ color: "var(--text-primary)" }}>Description</th>
                <th className="text-right py-2 font-medium" style={{ color: "var(--text-primary)" }}>Topics</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((mod, idx) => (
                <tr key={mod.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-2 pr-4">
                    <Link 
                      to={`/modules/${mod.id}`}
                      className="flex items-center gap-2 hover:underline"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      {moduleIcons[mod.id] || <BookOpen size={14} />}
                      <span className="font-medium">{mod.title}</span>
                    </Link>
                  </td>
                  <td className="py-2 pr-4" style={{ color: "var(--text-secondary)" }}>
                    {mod.description}
                  </td>
                  <td className="py-2 text-right" style={{ color: "var(--text-tertiary)" }}>
                    {mod.topics?.length || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Beginner Path */}
      <section className="section-block">
        <div className="section-title">Recommended: Beginners</div>
        <div className="card">
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            If you're new to machine learning mathematics, follow this sequence:
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="py-1" style={{ color: "var(--text-primary)" }}>
              <strong>Math Foundations</strong> — Linear algebra, calculus, probability, optimization
            </li>
            <li className="py-1" style={{ color: "var(--text-primary)" }}>
              <strong>ML Theory</strong> — Bias-variance, generalization, loss landscapes
            </li>
            <li className="py-1" style={{ color: "var(--text-primary)" }}>
              <strong>Deep Learning</strong> — Neural networks, backpropagation, optimization
            </li>
            <li className="py-1" style={{ color: "var(--text-primary)" }}>
              <strong>Generative</strong> — VAEs, diffusion models, LLMs
            </li>
          </ol>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Experienced Path */}
      <section className="section-block">
        <div className="section-title">Recommended: Experienced</div>
        <div className="card">
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            If you already know the math fundamentals:
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="py-1" style={{ color: "var(--text-primary)" }}>
              <strong>ML Theory</strong> — Skip straight to core concepts
            </li>
            <li className="py-1" style={{ color: "var(--text-primary)" }}>
              <strong>Deep Learning</strong> — Build neural network intuition
            </li>
            <li className="py-1" style={{ color: "var(--text-primary)" }}>
              <strong>Research</strong> — Paper deconstructions
            </li>
            <li className="py-1" style={{ color: "var(--text-primary)" }}>
              <strong>Applied ML</strong> — Real-world implementations
            </li>
          </ol>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* How It Works - Minimal */}
      <section className="section-block">
        <div className="section-title">How It Works</div>
        <div className="card-grid">
          <div className="card">
            <h3 className="font-medium mb-1">Read & Learn</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Progress through chapters with interactive visualizations and MathJax equations.
            </p>
          </div>
          <div className="card">
            <h3 className="font-medium mb-1">Practice</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Complete exercises and quizzes to reinforce understanding.
            </p>
          </div>
          <div className="card">
            <h3 className="font-medium mb-1">Earn & Unlock</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Complete assessments to earn coins and unlock deeper topics.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* CTA */}
      <section className="section-block text-center">
        <Link to="/modules" className="btn-primary inline-flex items-center gap-2">
          Browse Curriculum
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
