import { useParams, Link } from "react-router-dom";
import { modules } from "@/content/modules";
import { useLearningStore } from "@/store";

export default function TopicPage() {
  const { moduleId, levelId, chapterId, topicId } = useParams();
  const module = modules.find((item) => item.id === moduleId);
  const level = module?.levels.find((item) => item.id === levelId);
  const chapter = level?.chapters.find((item) => item.id === chapterId);
  const topic = chapter?.topics.find((item) => item.id === topicId);
  const { completeTopic } = useLearningStore();

  if (!module || !level || !chapter || !topic) {
    return <div className="page-content">Topic not found.</div>;
  }

  return (
    <div className="page-content stagger-in">
      <div className="chapter-ribbon" aria-hidden="true">
        <span>{chapter.title}</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-header-title">{topic.title}</h1>
          <p className="page-header-sub">{topic.summary}</p>
        </div>
      </div>

      <div className="hero-grid">
        <div>
          <div className="section-title">Theory</div>
          <p className="hero-copy">
            This section explains the core idea with intuition and math.
          </p>
          <div className="equation-block">f(x) = ax + b</div>
          <div className="callout">Aha: Adjust coefficients to see slope change.</div>
        </div>
        <div>
          <div className="section-title">Playground</div>
          <div className="card insert-block">
            <p>Interactive widget placeholder</p>
          </div>
        </div>
      </div>

      <div className="section-block">
        <div className="section-title">Assessment</div>
        <div className="card">
          <p>{topic.assessmentPrompt}</p>
          <button className="btn-primary" onClick={() => completeTopic(topic.id)}>
            Complete Topic
          </button>
        </div>
      </div>

      <Link to={`/modules/${module.id}/levels/${level.id}`} className="btn-secondary">
        Back to Chapters
      </Link>
    </div>
  );
}
