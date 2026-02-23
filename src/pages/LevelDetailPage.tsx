import { useParams, Link } from "react-router-dom";
import { modules } from "@/content/modules";
import { useLearningStore } from "@/store";

const chapterCost = 5;

export default function LevelDetailPage() {
  const { moduleId, levelId } = useParams();
  const module = modules.find((item) => item.id === moduleId);
  const level = module?.levels.find((item) => item.id === levelId);
  const { coins, unlockChapter, isChapterUnlocked, isTopicUnlocked } = useLearningStore();

  if (!module || !level) return <div className="page-content">Level not found.</div>;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">{level.title}</h1>
          <p className="page-header-sub">{level.description}</p>
        </div>
        <div className="page-header-sub">Coins: {coins}</div>
      </div>

      <div className="card-grid">
        {level.chapters.map((chapter) => (
          <div key={chapter.id} className="card">
            <h3>{chapter.title}</h3>
            <p>{chapter.description}</p>
            {isChapterUnlocked(chapter.id) ? (
              <Link
                to={`/modules/${module.id}/levels/${level.id}/chapters/${chapter.id}/topics/${chapter.topics[0]?.id}`}
                className="btn-secondary"
              >
                Open
              </Link>
            ) : (
              <button
                className="btn-primary"
                onClick={() => unlockChapter(chapter.id, chapterCost, chapter.topics[0]?.id)}
              >
                Unlock (5)
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
