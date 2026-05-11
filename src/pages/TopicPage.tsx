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

  const completedCount = topic.chapters.filter(
    (ch) =>
      isChapterTierCompleted(ch.id, 1) &&
      isChapterTierCompleted(ch.id, 2) &&
      isChapterTierCompleted(ch.id, 3),
  ).length;

  const dueReviews = getChaptersDueForReview().filter((r) =>
    topic.chapters.some((ch) => ch.id === r.chapterId),
  );

  const allTier1Done = topic.chapters.every((ch) =>
    isChapterTierCompleted(ch.id, 1),
  );

  return (
    <div className="page-content stagger-in">
      <div className="page-header" style={{ marginBottom: "3rem" }}>
        <div>
          <h1 className="page-header-title">{topic.title}</h1>
          <p className="page-header-sub">{topic.description}</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {dueReviews.length > 0 && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
              {dueReviews.length} review{dueReviews.length > 1 ? "s" : ""} due
            </span>
          )}
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>{coins}</div>
        </div>
      </div>

      {topic.chapters.length === 0 ? (
        <div className="chapter-empty-card">
          <div className="chapter-empty-icon" style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem" }}>...</div>
          <h3>Chapters in preparation</h3>
          <p>Check back later for new content.</p>
        </div>
      ) : (
        <div className="section-block section-block--quiet">
          <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2rem" }}>
            {topic.chapters.length} {topic.chapters.length === 1 ? "section" : "sections"}
          </p>
          {topic.chapters.map((chapter, idx) => {
            const t1 = isChapterTierCompleted(chapter.id, 1);
            const t2 = isChapterTierCompleted(chapter.id, 2);
            const t3 = isChapterTierCompleted(chapter.id, 3);
            const isDue = dueReviews.some((r) => r.chapterId === chapter.id);

            return (
              <Link
                key={chapter.id}
                to={`/modules/${module.id}/topics/${topic.id}/chapters/${chapter.id}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr auto",
                  gap: "1.5rem",
                  padding: "2rem 0",
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                  alignItems: "start",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-tertiary)", paddingTop: "0.2rem" }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem" }}>
                    {chapter.title}
                    {isDue && <span style={{ marginLeft: "6px", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>review due</span>}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>{chapter.description}</p>
                </div>
                <div style={{ display: "flex", gap: "8px", paddingTop: "0.2rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: t1 ? "var(--text-secondary)" : "var(--text-tertiary)", opacity: t1 ? 1 : 0.25 }}>I</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: t2 ? "var(--text-secondary)" : "var(--text-tertiary)", opacity: t2 ? 1 : 0.25 }}>II</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: t3 ? "var(--text-secondary)" : "var(--text-tertiary)", opacity: t3 ? 1 : 0.25 }}>III</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {topic.project && (
        <section style={{ marginTop: "2rem" }}>
          <div className="section-title">Project</div>
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
        style={{ marginTop: "1.5rem" }}
      >
        Back
      </Link>
    </div>
  );
}