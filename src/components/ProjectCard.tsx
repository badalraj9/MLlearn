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

  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "1.5rem 0", marginTop: "1rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.15rem" }}>{project.title}</h3>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
          {unlocked ? "unlocked" : "locked"}
        </span>
      </div>

      <p style={{ margin: "0 0 1rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{project.description}</p>

      {!unlocked && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ height: "2px", background: "var(--border)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "var(--accent-primary)", transition: "width 300ms ease" }} />
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
            {completedChapters}/{totalChapters} sections complete
          </span>
        </div>
      )}

      {unlocked && (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "0.5rem" }}>Objectives</p>
            {project.objectives.map((obj, i) => (
              <p key={i} style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "0 0 0.25rem", paddingLeft: "1rem", borderLeft: "1px solid var(--border)" }}>{obj}</p>
            ))}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
            {project.estimatedTime}
          </div>
        </>
      )}
    </div>
  );
}