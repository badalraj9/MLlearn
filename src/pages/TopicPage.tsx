import { useParams, Link } from "react-router-dom";
import { modules } from "@/content/modules";
import { useLearningStore } from "@/store";
import ProjectCard from "@/components/ProjectCard";

export default function TopicPage() {
  const { moduleId, topicId } = useParams();
  const module = modules.find((item) => item.id === moduleId);
  const topic = module?.topics.find((item) => item.id === topicId);
  const { coins, isChapterTierCompleted, getChaptersDueForReview } =
    useLearningStore();

  if (!module || !topic) {
    return <div className="page-content">Topic not found.</div>;
  }

  // Count completed chapters (all 3 tiers done)
  const completedCount = topic.chapters.filter(
    (ch) =>
      isChapterTierCompleted(ch.id, 1) &&
      isChapterTierCompleted(ch.id, 2) &&
      isChapterTierCompleted(ch.id, 3),
  ).length;

  // Check for chapters due for review
  const dueReviews = getChaptersDueForReview().filter((r) =>
    topic.chapters.some((ch) => ch.id === r.chapterId),
  );

  // Project unlocks when all chapters have at least tier 1 complete
  const allTier1Done = topic.chapters.every((ch) =>
    isChapterTierCompleted(ch.id, 1),
  );

  return (
    <div className="page-content stagger-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">{topic.title}</h1>
          <p className="page-header-sub">{topic.description}</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {dueReviews.length > 0 && (
            <span className="review-due-badge">
              🔄 {dueReviews.length} review{dueReviews.length > 1 ? "s" : ""}{" "}
              due
            </span>
          )}
          <div className="page-header-sub">💰 {coins}</div>
        </div>
      </div>

      {topic.chapters.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Chapters coming soon. Check back later!</p>
        </div>
      ) : (
        <div className="card-grid">
          {topic.chapters.map((chapter) => {
            const t1 = isChapterTierCompleted(chapter.id, 1);
            const t2 = isChapterTierCompleted(chapter.id, 2);
            const t3 = isChapterTierCompleted(chapter.id, 3);
            const isDue = dueReviews.some((r) => r.chapterId === chapter.id);

            return (
              <Link
                key={chapter.id}
                to={`/modules/${module.id}/topics/${topic.id}/chapters/${chapter.id}`}
                className={`card chapter-card${t1 && t2 && t3 ? " chapter-card--complete" : ""}`}
              >
                <h3>
                  {chapter.title}
                  {isDue && <span className="review-dot" title="Review due" />}
                </h3>
                <p>{chapter.description}</p>
                <div className="chapter-card-tiers">
                  <span className={`tier-dot${t1 ? " tier-dot--done" : ""}`}>
                    🌱
                  </span>
                  <span className={`tier-dot${t2 ? " tier-dot--done" : ""}`}>
                    ⚙️
                  </span>
                  <span className={`tier-dot${t3 ? " tier-dot--done" : ""}`}>
                    🔬
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Project Card */}
      {topic.project && (
        <section style={{ marginTop: "2rem" }}>
          <div className="section-title">🚀 Topic Project</div>
          <ProjectCard
            project={topic.project}
            unlocked={allTier1Done}
            completedChapters={
              topic.chapters.filter((ch) => isChapterTierCompleted(ch.id, 1))
                .length
            }
            totalChapters={topic.chapters.length}
          />
        </section>
      )}

      <Link
        to={`/modules/${module.id}`}
        className="btn-secondary"
        style={{ marginTop: "1rem" }}
      >
        ← Back to Topics
      </Link>
    </div>
  );
}
