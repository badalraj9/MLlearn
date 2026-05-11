import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { MathJax } from "better-react-mathjax";
import { modules } from "@/content/modules";
import { useLearningStore } from "@/store";
import type { ChapterTier } from "@/types";
import PlaygroundRenderer from "@/components/playgrounds/PlaygroundRenderer";
import EquationStepper from "@/components/EquationStepper";
import QuizWidget from "@/components/QuizWidget";
import CodeToggle from "@/components/CodeToggle";
import ChapterStrips from "@/components/ChapterStrips";

const tiers: { tier: ChapterTier; label: string }[] = [
  { tier: 1, label: "I" },
  { tier: 2, label: "II" },
  { tier: 3, label: "III" },
];

function estimateReadingTime(intro: string[], keyIdeas: string[]): number {
  const wordCount = [...intro, ...keyIdeas].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}

export default function ChapterPage() {
  const { moduleId, topicId, chapterId } = useParams();
  const [activeTier, setActiveTier] = useState<ChapterTier>(1);
  const module = modules.find((item) => item.id === moduleId);
  const topic = module?.topics.find((item) => item.id === topicId);
  const chapter = topic?.chapters.find((item) => item.id === chapterId);
  const {
    coins,
    isChapterTierUnlocked,
    unlockChapterTier,
    completeChapterTier,
    isChapterTierCompleted,
  } = useLearningStore();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowRight" && activeTier < 3) {
        setActiveTier((t) => (t + 1) as ChapterTier);
      } else if (e.key === "ArrowLeft" && activeTier > 1) {
        setActiveTier((t) => (t - 1) as ChapterTier);
      } else if (e.key === "1") setActiveTier(1);
      else if (e.key === "2") setActiveTier(2);
      else if (e.key === "3") setActiveTier(3);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeTier]);

  if (!module || !topic || !chapter) {
    return <div className="page-content">Chapter not found.</div>;
  }

  const activeLevel = chapter.levels.find((l) => l.tier === activeTier);
  const unlocked = isChapterTierUnlocked(chapter.id, activeTier);
  const completed = isChapterTierCompleted(chapter.id, activeTier);
  const canUnlock =
    activeTier === 1 ||
    (isChapterTierCompleted(chapter.id, (activeTier - 1) as ChapterTier) &&
      coins >= (activeLevel?.cost ?? 0));

  const hasContent =
    activeLevel &&
    (activeLevel.content.intro.length > 0 ||
      activeLevel.content.keyIdeas.length > 0);

  const readingTime = activeLevel
    ? estimateReadingTime(activeLevel.content.intro, activeLevel.content.keyIdeas)
    : 0;

  return (
    <div className="chapter-layout">
      <aside className="tier-nav-floating">
        <div className="tier-nav-group">
          {tiers.map(({ tier, label }) => {
            const tierUnlocked = isChapterTierUnlocked(chapter.id, tier);
            const tierCompleted = isChapterTierCompleted(chapter.id, tier);
            return (
              <button
                key={tier}
                className={`tier-capsule${activeTier === tier ? " tier-capsule--active" : ""}${!tierUnlocked ? " tier-capsule--locked" : ""}${tierCompleted ? " tier-capsule--completed" : ""}`}
                onClick={() => setActiveTier(tier)}
                title={label}
              >
                <span style={{ fontSize: "0.7rem" }}>{label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <main className="chapter-main page-content stagger-in">
        <div className="page-header" style={{ marginBottom: "3rem" }}>
          <div>
            <h1 className="page-header-title">{chapter.title}</h1>
            <p className="page-header-sub">{chapter.description}</p>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {hasContent && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
                {readingTime} min
              </span>
            )}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
              {tiers.find((t) => t.tier === activeTier)?.label}
            </span>
          </div>
        </div>

        {!unlocked ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: "1rem" }}>
              — {activeLevel?.title || `Section ${activeTier}`} —
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-tertiary)", marginBottom: "1.5rem" }}>
              {activeTier > 1 &&
              !isChapterTierCompleted(chapter.id, (activeTier - 1) as ChapterTier)
                ? `Requires ${tiers[activeTier - 2].label} completion.`
                : `Unlocks for ${activeLevel?.cost ?? 0} coins.`}
            </p>
            {canUnlock && (
              <button
                onClick={() =>
                  unlockChapterTier(chapter.id, activeTier, activeLevel?.cost ?? 0)
                }
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid var(--text-secondary)",
                  padding: "2px 0",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                proceed · {activeLevel?.cost ?? 0} coins
              </button>
            )}
          </div>
        ) : !hasContent ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
              content in preparation
            </p>
          </div>
        ) : (
          <>
            {activeLevel && activeLevel.content.intro.length > 0 && (
              <section style={{ margin: "2rem 0" }}>
                {activeLevel.content.intro.map((line, i) => (
                  <p key={i} style={{ fontSize: "1rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                    <MathJax>{line}</MathJax>
                  </p>
                ))}
              </section>
            )}

            {activeLevel &&
              activeLevel.content.ahaInsights &&
              activeLevel.content.ahaInsights.length > 0 && (
                <section style={{ margin: "2.5rem 0", paddingLeft: "1rem", borderLeft: "1px solid var(--border)" }}>
                  {activeLevel.content.ahaInsights.map((insight, i) => (
                    <p key={i} style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.7 }}>
                      <MathJax inline>{insight}</MathJax>
                    </p>
                  ))}
                </section>
              )}

            {activeLevel &&
              activeLevel.content.equationSteps &&
              activeLevel.content.equationSteps.length > 0 && (
                <section style={{ margin: "2rem 0" }}>
                  <EquationStepper steps={activeLevel.content.equationSteps} />
                </section>
              )}

            {activeLevel &&
              activeLevel.content.equations &&
              activeLevel.content.equations.length > 0 && (
                <section style={{ margin: "3rem 0 2rem" }}>
                  {activeLevel.content.equations.map((eq, i) => (
                    <div key={i} className="equation-block equation-block--standalone">
                      <MathJax>{eq}</MathJax>
                    </div>
                  ))}
                </section>
              )}

            {activeLevel && activeLevel.content.keyIdeas.length > 0 && (
              <section style={{ margin: "2rem 0" }}>
                {activeLevel.content.keyIdeas.map((idea, i) => (
                  <div key={i} style={{
                    display: "grid",
                    gridTemplateColumns: "2rem 1fr",
                    gap: "1rem",
                    padding: "1.25rem 0",
                    borderBottom: "1px solid var(--border)",
                  }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-tertiary)", paddingTop: "2px" }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                      <MathJax>{idea}</MathJax>
                    </span>
                  </div>
                ))}
              </section>
            )}

            {activeLevel && activeLevel.codeContent && (
              <section style={{ margin: "2rem 0" }}>
                <CodeToggle codeBlock={activeLevel.codeContent} />
              </section>
            )}

            {activeLevel && activeLevel.playground && (
              <section style={{ margin: "2.5rem 0" }}>
                <PlaygroundRenderer config={activeLevel.playground} />
              </section>
            )}

            {activeLevel &&
              activeLevel.content.quiz &&
              activeLevel.content.quiz.length > 0 && (
                <section style={{ margin: "2.5rem 0" }}>
                  <QuizWidget questions={activeLevel.content.quiz} />
                </section>
              )}

            {activeLevel &&
              activeLevel.content.references &&
              activeLevel.content.references.length > 0 && (
                <section style={{ margin: "2.5rem 0" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "0.75rem" }}>
                    References
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                    {activeLevel.content.references.join(" · ")}
                  </p>
                </section>
              )}

            <ChapterStrips
              moduleId={module.id}
              chapterId={chapter.id}
              activeTier={activeTier}
            />

            {!completed ? (
              <div style={{ marginTop: "2.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                <button
                  onClick={() => completeChapterTier(chapter.id, activeTier)}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    padding: "2px 0",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--text-tertiary)",
                    cursor: "pointer",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-tertiary)"}
                >
                  continue to next section
                </button>
              </div>
            ) : (
              <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  complete
                </span>
              </div>
            )}
          </>
        )}

        <div style={{ marginTop: "3rem" }}>
          <Link
            to={`/modules/${module.id}/topics/${topic.id}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            back
          </Link>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", marginLeft: "16px", opacity: 0.6 }}>
            {String(activeTier)} / 3 · {String.fromCharCode(8592)}{String.fromCharCode(8594)} navigate
          </span>
        </div>
      </main>
    </div>
  );
}