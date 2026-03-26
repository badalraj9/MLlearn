import { useParams, Link } from "react-router-dom";
import { modules } from "@/content/modules";
import { useLearningStore } from "@/store";

export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const module = modules.find((item) => item.id === moduleId);
  const { isChapterTierCompleted } = useLearningStore();

  if (!module) return <div className="page-content">Module not found.</div>;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">{module.title}</h1>
          <p className="page-header-sub">{module.description}</p>
        </div>
      </div>

      {module.topics.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Topics coming soon. Check back later!</p>
        </div>
      ) : (
        <div className="card-grid">
          {module.topics.map((topic) => {
            const completedCount = topic.chapters.filter((ch) => 
              isChapterTierCompleted(ch.id, 1)
            ).length;
            const progressPercent = Math.round((completedCount / topic.chapters.length) * 100);
            
            return (
              <Link
                key={topic.id}
                to={`/modules/${module.id}/topics/${topic.id}`}
                className="card"
              >
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <div className="mt-3">
                  <p className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>
                    {completedCount} / {topic.chapters.length} chapters
                  </p>
                  <div 
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--bg-tertiary)" }}
                  >
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${progressPercent}%`,
                        background: progressPercent === 100 ? "var(--success)" : "var(--accent-primary)"
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
