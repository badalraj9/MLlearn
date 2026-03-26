import type { ProjectConfig } from "@/types";

interface ProjectCardProps {
  project: ProjectConfig;
  unlocked: boolean;
  completedChapters: number;
  totalChapters: number;
}

export default function ProjectCard({
  project,
  unlocked,
  completedChapters,
  totalChapters,
}: ProjectCardProps) {
  const pct =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0;

  const difficultyColors = {
    beginner: "#2E7D32",
    intermediate: "#E65100",
    advanced: "#C62828",
  };

  return (
    <div className={`project-card${unlocked ? "" : " project-card--locked"}`}>
      <div className="project-card-header">
        <h3>
          {unlocked ? "🚀" : "🔒"} {project.title}
        </h3>
        <span
          className="project-card-difficulty"
          style={{ color: difficultyColors[project.difficulty] }}
        >
          {project.difficulty}
        </span>
      </div>

      <p className="project-card-desc">{project.description}</p>

      {!unlocked && (
        <div className="project-card-progress">
          <div className="project-card-bar">
            <div
              className="project-card-bar-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="project-card-bar-label">
            {completedChapters}/{totalChapters} chapters completed
          </span>
        </div>
      )}

      {unlocked && (
        <>
          <div className="project-card-objectives">
            <strong>Objectives:</strong>
            <ul>
              {project.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
          <div className="project-card-meta">
            <span>⏱ {project.estimatedTime}</span>
          </div>
        </>
      )}
    </div>
  );
}
