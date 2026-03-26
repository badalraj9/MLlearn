import { useState, useEffect, useCallback, useMemo } from "react";
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

const tiers: { tier: ChapterTier; label: string; icon: string }[] = [
  { tier: 1, label: "Foundation", icon: "🌱" },
  { tier: 2, label: "Applied", icon: "⚙️" },
  { tier: 3, label: "Advanced", icon: "🔬" },
];

/** Estimate reading time from intro + keyIdeas text */
function estimateReadingTime(intro: string[], keyIdeas: string[]): number {
  const wordCount = [...intro, ...keyIdeas].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200)); // ~200 wpm
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
    getCompletionStats,
  } = useLearningStore();

  // Keyboard shortcuts: ← → to switch tiers, 1/2/3 to jump
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

  const stats = useMemo(() => getCompletionStats(), [getCompletionStats]);

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
    ? estimateReadingTime(
        activeLevel.content.intro,
        activeLevel.content.keyIdeas,
      )
    : 0;

  return (
    <div className="chapter-layout">
      {/* Floating Tier Nav */}
      <aside className="tier-nav-floating">
        <div className="tier-nav-group">
          {tiers.map(({ tier, label, icon }) => {
            const tierUnlocked = isChapterTierUnlocked(chapter.id, tier);
            const tierCompleted = isChapterTierCompleted(chapter.id, tier);
            return (
              <button
                key={tier}
                className={`tier-capsule${activeTier === tier ? " tier-capsule--active" : ""}${!tierUnlocked ? " tier-capsule--locked" : ""}${tierCompleted ? " tier-capsule--completed" : ""}`}
                onClick={() => setActiveTier(tier)}
                title={label}
              >
                <div className="tier-capsule-icon">{icon}</div>
                {tierCompleted && <span className="tier-capsule-badge">✓</span>}
                {!tierUnlocked && (
                  <span className="tier-capsule-badge">🔒</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="tier-nav-group tier-nav-meta">
          <div className="tier-capsule tier-capsule--meta" title="Coins">
            <span className="tier-capsule-icon">💰</span>
            <span className="tier-capsule-value">{coins}</span>
          </div>
          <div
            className="tier-capsule tier-capsule--meta"
            title="Completion Stats"
          >
            <span className="tier-capsule-icon">📊</span>
            <span className="tier-capsule-value">
              {stats.completedTiers}/{stats.totalTiers}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="chapter-main page-content stagger-in">
        <div className="page-header">
          <div>
            <h1 className="page-header-title">{chapter.title}</h1>
            <p className="page-header-sub">{chapter.description}</p>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {hasContent && (
              <span className="reading-time-badge">⏱ {readingTime} min</span>
            )}
            <div className="tier-pill">
              {tiers.find((t) => t.tier === activeTier)?.icon}{" "}
              {tiers.find((t) => t.tier === activeTier)?.label}
            </div>
          </div>
        </div>

        {!unlocked ? (
          <div className="chapter-locked-card">
            <div className="chapter-locked-icon">🔒</div>
            <h3>Tier Locked</h3>
            <p>
              {activeTier > 1 &&
              !isChapterTierCompleted(
                chapter.id,
                (activeTier - 1) as ChapterTier,
              )
                ? `Complete the ${tiers[activeTier - 2].label} tier first.`
                : `Unlock this tier for ${activeLevel?.cost ?? 0} coins.`}
            </p>
            {canUnlock && (
              <button
                className="btn-primary"
                onClick={() =>
                  unlockChapterTier(
                    chapter.id,
                    activeTier,
                    activeLevel?.cost ?? 0,
                  )
                }
              >
                Unlock for {activeLevel?.cost ?? 0} coins
              </button>
            )}
          </div>
        ) : !hasContent ? (
          <div className="chapter-empty-card">
            <div className="chapter-empty-icon">📝</div>
            <h3>Content Coming Soon</h3>
            <p>This tier is being prepared. Check back later!</p>
          </div>
        ) : (
          <>
            {/* Theory / Intro */}
            {activeLevel && activeLevel.content.intro.length > 0 && (
              <section className="chapter-section">
                <div className="section-title">Theory</div>
                <div className="chapter-prose">
                  {activeLevel.content.intro.map((line, i) => (
                    <p key={i} className="hero-copy">
                      <MathJax>{line}</MathJax>
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Aha Insights */}
            {activeLevel &&
              activeLevel.content.ahaInsights &&
              activeLevel.content.ahaInsights.length > 0 && (
                <section className="chapter-section">
                  {activeLevel.content.ahaInsights.map((insight, i) => (
                    <div key={i} className="aha-callout">
                      <span className="aha-icon">💡</span>
                      <span>
                        <MathJax>{insight}</MathJax>
                      </span>
                    </div>
                  ))}
                </section>
              )}

            {/* Equation Stepper */}
            {activeLevel &&
              activeLevel.content.equationSteps &&
              activeLevel.content.equationSteps.length > 0 && (
                <section className="chapter-section">
                  <EquationStepper steps={activeLevel.content.equationSteps} />
                </section>
              )}

            {/* Equations */}
            {activeLevel &&
              activeLevel.content.equations &&
              activeLevel.content.equations.length > 0 && (
                <section className="chapter-section">
                  <div className="section-title">Equations</div>
                  {activeLevel.content.equations.map((eq, i) => (
                    <div key={i} className="equation-block">
                      <MathJax>{eq}</MathJax>
                    </div>
                  ))}
                </section>
              )}

            {/* Key Ideas */}
            {activeLevel && activeLevel.content.keyIdeas.length > 0 && (
              <section className="chapter-section">
                <div className="section-title">Key Ideas</div>
                <div className="card insert-block">
                  <ul className="topic-list">
                    {activeLevel.content.keyIdeas.map((idea, i) => (
                      <li key={i}>
                        <MathJax>{idea}</MathJax>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Code Toggle */}
            {activeLevel && activeLevel.codeContent && (
              <section className="chapter-section">
                <CodeToggle codeBlock={activeLevel.codeContent} />
              </section>
            )}

            {/* Playground Widget */}
            {activeLevel && activeLevel.playground && (
              <section className="chapter-section">
                <div className="section-title">Playground</div>
                <PlaygroundRenderer config={activeLevel.playground} />
              </section>
            )}

            {/* Quiz */}
            {activeLevel &&
              activeLevel.content.quiz &&
              activeLevel.content.quiz.length > 0 && (
                <section className="chapter-section">
                  <div className="section-title">Quiz</div>
                  <QuizWidget questions={activeLevel.content.quiz} />
                </section>
              )}

            {/* References */}
            {activeLevel &&
              activeLevel.content.references &&
              activeLevel.content.references.length > 0 && (
                <section className="chapter-section">
                  <div className="section-title">References</div>
                  <div className="callout">
                    {activeLevel.content.references.join(" • ")}
                  </div>
                </section>
              )}

            {/* Side Strip Tools (auto-generated per module) */}
            <ChapterStrips
              moduleId={module.id}
              chapterId={chapter.id}
              activeTier={activeTier}
            />

            {/* Complete Button */}
            {!completed && (
              <button
                className="btn-primary"
                onClick={() => completeChapterTier(chapter.id, activeTier)}
                style={{ marginTop: "1.5rem" }}
              >
                ✅ Complete {tiers.find((t) => t.tier === activeTier)?.label}{" "}
                Tier
              </button>
            )}
            {completed && (
              <div className="callout" style={{ marginTop: "1.5rem" }}>
                ✅ Tier completed!
              </div>
            )}
          </>
        )}

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "1.5rem",
            alignItems: "center",
          }}
        >
          <Link
            to={`/modules/${module.id}/topics/${topic.id}`}
            className="btn-secondary"
          >
            ← Back to Chapters
          </Link>
          <span className="kbd-hint">
            ← → switch tiers · 1 2 3 jump to tier
          </span>
        </div>
      </main>
    </div>
  );
}
