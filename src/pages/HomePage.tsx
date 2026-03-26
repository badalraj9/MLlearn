import { Link } from "react-router-dom";
import { modules } from "@/content/modules";
import { useLearningStore } from "@/store";
import { 
  BookOpen, ArrowRight, Sparkles, Layers, 
  Calculator, Brain, Cpu, Zap, Microscope, Target,
  ChevronRight
} from "lucide-react";

const moduleIcons: Record<string, React.ReactNode> = {
  math: <Calculator size={18} />,
  "ml-theory": <Brain size={18} />,
  "deep-learning": <Cpu size={18} />,
  generative: <Zap size={18} />,
  "deep-research": <Microscope size={18} />,
  "applied-ml": <Target size={18} />,
};

export default function HomePage() {
  const totalTopics = modules.reduce((acc, m) => acc + (m.topics?.length || 0), 0);
  const { getChaptersDueForReview, completedChapterTiers } = useLearningStore();
  const dueReviews = getChaptersDueForReview();

  const findChapterPath = (chapterId: string) => {
    for (const mod of modules) {
      for (const topic of mod.topics || []) {
        const chapter = topic.chapters.find((c) => c.id === chapterId);
        if (chapter) {
          return { module: mod, topic, chapter };
        }
      }
    }
    return null;
  };

  const lastCompletedChapter = Object.keys(completedChapterTiers)
    .filter((chId) => completedChapterTiers[chId].length > 0)
    .sort((a, b) => {
      const aTime = completedChapterTiers[a].length;
      const bTime = completedChapterTiers[b].length;
      return bTime - aTime;
    })[0];

  const continuePath = lastCompletedChapter ? findChapterPath(lastCompletedChapter) : null;

  return (
    <div className="page-content stagger-in">
      {/* Continue Learning Card */}
      {continuePath && (
        <>
          <section className="section-block">
            <div 
              className="card p-4 flex items-center justify-between"
              style={{ background: "var(--accent-subtle)", borderLeft: "3px solid var(--accent-primary)" }}
            >
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--accent-primary)" }}>
                  Continue Learning
                </p>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {continuePath.chapter.title}
                </p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  {continuePath.module.title} · {continuePath.topic.title}
                </p>
              </div>
              <Link 
                to={`/modules/${continuePath.module.id}/topics/${continuePath.topic.id}/chapters/${continuePath.chapter.id}`}
                className="btn-secondary"
              >
                Resume
              </Link>
            </div>
          </section>
          <div className="section-divider" aria-hidden="true" />
        </>
      )}

      {!continuePath && (
        <>
          <section className="section-block">
            <div 
              className="card p-4 flex items-center justify-between"
              style={{ background: "var(--accent-subtle)", borderLeft: "3px solid var(--accent-primary)" }}
            >
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--accent-primary)" }}>
                  Start Your Journey
                </p>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Math Foundations
                </p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  Build your mathematical foundation for ML
                </p>
              </div>
              <Link to="/modules/math" className="btn-secondary">
                Start here →
              </Link>
            </div>
          </section>
          <div className="section-divider" aria-hidden="true" />
        </>
      )}

      {/* Review Due Section */}
      {dueReviews.length > 0 && (
        <>
          <section className="section-block">
            <div className="section-title">Review Due</div>
            <div className="card-grid">
              {dueReviews.map((review) => {
                const path = findChapterPath(review.chapterId);
                if (!path) return null;
                return (
                  <Link
                    key={review.chapterId}
                    to={`/modules/${path.module.id}/topics/${path.topic.id}/chapters/${path.chapter.id}`}
                    className="card p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {path.chapter.title}
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                        {path.module.title} · Streak: {review.streak}
                      </p>
                    </div>
                    <ArrowRight size={16} style={{ color: "var(--accent-primary)" }} />
                  </Link>
                );
              })}
            </div>
          </section>
          <div className="section-divider" aria-hidden="true" />
        </>
      )}
      {/* Standard Page Header */}
      <div className="page-header">
        <div className="page-header-icon">
          <BookOpen size={16} />
        </div>
        <div>
          <h1 className="page-header-title">Welcome to MLearn</h1>
          <p className="page-header-sub">Master machine learning through mathematics.</p>
        </div>
      </div>

      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Why MLearn?</span>
          <span>Learning Paths</span>
          <span>Get Started</span>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      {/* Hero - More prominent */}
      <section className="section-block">
        <p className="text-lg mb-4" style={{ color: "var(--text-secondary)" }}>
          An interactive learning platform to build deep intuition 
          through visualizations, proofs, and paper deconstructions.
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          <Link to="/modules" className="btn-primary">
            <Sparkles size={16} className="inline mr-1" />
            Start Learning
            <ArrowRight size={16} className="inline ml-1" />
          </Link>
          <Link to="/about" className="btn-secondary">
            View Curriculum
          </Link>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* What Makes It Different */}
      <section className="section-block">
        <div className="section-title">Why MLearn?</div>
        <div className="card-grid">
          <div className="card">
            <Layers size={20} className="mb-3" style={{ color: "var(--accent-primary)" }} />
            <h3 className="font-medium mb-1">Structured Path</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              From math foundations to research papers, each concept builds on the last.
            </p>
          </div>
          <div className="card">
            <Sparkles size={20} className="mb-3" style={{ color: "var(--accent-primary)" }} />
            <h3 className="font-medium mb-1">Interactive</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Visualize concepts with D3.js, explore equations with MathJax.
            </p>
          </div>
          <div className="card">
            <BookOpen size={20} className="mb-3" style={{ color: "var(--accent-primary)" }} />
            <h3 className="font-medium mb-1">Paper-First</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Deconstruct landmark ML papers with guided explanations.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Learning Paths Preview */}
      <section className="section-block">
        <div className="flex items-center justify-between mb-4">
          <div className="section-title mb-0">Learning Paths</div>
          <Link to="/about" className="text-sm flex items-center gap-1" style={{ color: "var(--accent-primary)" }}>
            See all <ChevronRight size={14} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {modules.slice(0, 6).map((mod) => (
            <Link
              key={mod.id}
              to={`/modules/${mod.id}`}
              className="card p-4 hover:shadow-md transition-shadow group"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ background: "var(--accent-subtle)", color: "var(--accent-primary)" }}
              >
                {moduleIcons[mod.id] || <BookOpen size={18} />}
              </div>
              <h3 className="font-medium text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                {mod.title}
              </h3>
              <p className="text-xs line-clamp-2" style={{ color: "var(--text-tertiary)" }}>
                {mod.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Quick Stats */}
      <section className="section-block">
        <div className="card p-5 text-center">
          <p className="text-lg mb-2" style={{ color: "var(--text-primary)" }}>
            <strong>{totalTopics}</strong> topics across <strong>{modules.length}</strong> learning paths
          </p>
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            Start from the beginning or jump to your area of interest.
          </p>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* CTA */}
      <section className="section-block text-center">
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          Ready to build your ML foundation?
        </p>
        <Link to="/modules" className="btn-primary inline-flex items-center gap-2">
          Begin Your Journey
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
