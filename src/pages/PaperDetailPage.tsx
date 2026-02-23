import { useParams } from "react-router-dom";
import { getPaperById } from "@/content/papers";
import { useUIStore } from "@/store";
import MathBlock from "@/components/math/MathBlock";
import WidgetContainer from "@/components/widgets/WidgetContainer";
import AttentionScaleSlider from "@/components/widgets/AttentionScaleSlider";
import type { ReactNode } from "react";

// Map interaction IDs to actual widget implementations
const paperWidgetMap: Record<string, ReactNode> = {
  "attn-scale-slider": <AttentionScaleSlider />,
};
import type {
  ReadingMode,
  PaperSection as PaperSectionType,
  Annotation,
} from "@/types";
import {
  MessageCircle,
  Link as LinkIcon,
  AlertTriangle,
  History,
  Lightbulb,
} from "lucide-react";

const modeDescriptions: Record<ReadingMode, string> = {
  overview: "~10 min · Key ideas, skip proofs",
  "deep-dive": "~45 min · Full deconstruction",
  "math-heavy": "~30 min · Focus on derivations",
  implementation: "~20 min · Pseudocode & practical takeaways",
};

const annotationIcons: Record<string, typeof Lightbulb> = {
  insight: Lightbulb,
  clarification: MessageCircle,
  connection: LinkIcon,
  warning: AlertTriangle,
  historical: History,
};

export default function PaperDetailPage() {
  const { id } = useParams<{ id: string }>();
  const paper = getPaperById(id || "");
  const { activeReadingMode, setReadingMode } = useUIStore();

  if (!paper) {
    return (
      <div className="text-center py-20">
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Paper not found
        </h1>
      </div>
    );
  }

  const visibleSections = paper.sections.filter((s) =>
    s.visibleIn.includes(activeReadingMode),
  );

  const getAnnotations = (sectionId: string): Annotation[] =>
    paper.annotations.filter((a) => a.sectionId === sectionId);

  return (
    <div className="animate-fade-in" style={{ maxWidth: "780px" }}>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
          }}
        >
          {paper.title}
        </h1>
        <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>
          {paper.authors.join(", ")} · {paper.year}
          {paper.arxivId && (
            <>
              {" · "}
              <a
                href={`https://arxiv.org/abs/${paper.arxivId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent-primary)" }}
              >
                arXiv:{paper.arxivId}
              </a>
            </>
          )}
        </p>

        {/* Key Contribution */}
        <div
          className="px-4 py-3 rounded-lg mb-6"
          style={{
            backgroundColor: "var(--accent-subtle)",
            borderLeft: "3px solid var(--accent-primary)",
          }}
        >
          <span
            className="text-xs font-medium"
            style={{ color: "var(--accent-primary)" }}
          >
            Key Contribution
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--text-primary)" }}>
            {paper.keyContribution}
          </p>
        </div>

        {/* Prerequisites */}
        {paper.prerequisites.length > 0 && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Prerequisites:
            </span>
            {paper.prerequisites.map((p) => (
              <span
                key={p}
                className="text-xs px-2 py-0.5 rounded-md capitalize"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-secondary)",
                }}
              >
                {p.replace("-", " ")}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Reading Mode Tabs */}
      <div
        className="flex items-center gap-0 mb-8 overflow-x-auto"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {paper.readingModes.map((mode) => (
          <button
            key={mode}
            onClick={() => setReadingMode(mode)}
            className={`reading-tab ${activeReadingMode === mode ? "reading-tab--active" : ""}`}
            title={modeDescriptions[mode]}
          >
            {mode.replace("-", " ")}
          </button>
        ))}
      </div>

      <p
        className="text-xs mb-8 italic"
        style={{ color: "var(--text-tertiary)" }}
      >
        {modeDescriptions[activeReadingMode]}
      </p>

      {/* Sections */}
      <div className="flex flex-col gap-10">
        {visibleSections.map((section) => (
          <SectionRenderer
            key={section.id}
            section={section}
            annotations={getAnnotations(section.id)}
          />
        ))}
      </div>

      {visibleSections.length === 0 && (
        <div className="text-center py-16">
          <p style={{ color: "var(--text-tertiary)" }}>
            No sections available in this reading mode.
          </p>
        </div>
      )}
    </div>
  );
}

// --- Section Renderer ---

function SectionRenderer({
  section,
  annotations,
}: {
  section: PaperSectionType;
  annotations: Annotation[];
}) {
  return (
    <article>
      <div className="flex items-center gap-3 mb-4">
        <h2
          className="text-xl font-semibold"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
          }}
        >
          {section.title}
        </h2>
        <span
          className="text-xs px-2 py-0.5 rounded-md capitalize"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-tertiary)",
          }}
        >
          {section.difficulty}
        </span>
      </div>

      {/* Content */}
      {section.content.split("\n\n").map((para, i) => (
        <p
          key={i}
          className="mb-4"
          style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
        >
          {para}
        </p>
      ))}

      {/* Original Excerpt */}
      {section.originalExcerpt && (
        <blockquote
          className="my-4 px-4 py-3 rounded-md italic text-sm"
          style={{
            borderLeft: "3px solid var(--text-tertiary)",
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-secondary)",
          }}
        >
          <span
            className="text-xs not-italic font-medium"
            style={{ color: "var(--text-tertiary)" }}
          >
            From the paper:
          </span>
          <br />"{section.originalExcerpt}"
        </blockquote>
      )}

      {/* Mathematics */}
      {section.mathematics && <MathBlock tex={section.mathematics} isKey />}

      {/* Section Interactions */}
      {section.interactions?.map((interaction) => (
        <WidgetContainer
          key={interaction.id}
          title={interaction.description}
          caption={`💡 ${interaction.ahaMoment}`}
        >
          {paperWidgetMap[interaction.id] || (
            <div
              className="flex items-center justify-center h-full"
              style={{ color: "var(--text-tertiary)", minHeight: "150px" }}
            >
              <div className="text-center">
                <p className="text-sm mb-2">Interactive: {interaction.type}</p>
                <p className="text-xs italic">Coming soon</p>
              </div>
            </div>
          )}
        </WidgetContainer>
      ))}

      {/* Annotations */}
      {annotations.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {annotations.map((ann) => {
            const Icon = annotationIcons[ann.type] || MessageCircle;
            return (
              <div
                key={ann.id}
                className="flex items-start gap-2 px-4 py-2 rounded-md text-sm"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                <Icon
                  size={14}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--accent-primary)" }}
                />
                <div>
                  <span
                    className="text-xs font-medium capitalize mr-2"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {ann.type}
                  </span>
                  <span style={{ color: "var(--text-secondary)" }}>
                    {ann.content}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
