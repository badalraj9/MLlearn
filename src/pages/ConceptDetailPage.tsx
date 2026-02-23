import { useParams } from "react-router-dom";
import { getConceptBySlug } from "@/content/concepts";
import StageBadge from "@/components/ui/StageBadge";
import MathBlock from "@/components/math/MathBlock";
import WidgetContainer from "@/components/widgets/WidgetContainer";
import GradientDescentViz from "@/components/widgets/GradientDescentViz";
import BayesMedicalTest from "@/components/widgets/BayesMedicalTest";
import { Sparkles, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useState, type ReactNode } from "react";

// Map interaction IDs to actual widget implementations
const widgetMap: Record<string, ReactNode> = {
  "gd-2d-contour": <GradientDescentViz />,
  "bayes-medical-test": <BayesMedicalTest />,
};

export default function ConceptDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const concept = getConceptBySlug(slug || "");

  if (!concept) {
    return (
      <div className="text-center py-20">
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Concept not found
        </h1>
        <p style={{ color: "var(--text-tertiary)" }}>
          The concept "{slug}" doesn't exist yet.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: "780px" }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <StageBadge stage={concept.stage} />
          {concept.prerequisites.length > 0 && (
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Prerequisites: {concept.prerequisites.join(", ")}
            </span>
          )}
        </div>
        <h1
          className="text-4xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
          }}
        >
          {concept.title}
        </h1>
        <div
          className="flex items-start gap-2 px-4 py-3 rounded-lg"
          style={{ backgroundColor: "var(--accent-subtle)" }}
        >
          <Sparkles
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--warning)" }}
          />
          <div>
            <span
              className="text-xs font-medium"
              style={{ color: "var(--accent-primary)" }}
            >
              Aha Moment
            </span>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              {concept.ahaMoment}
            </p>
          </div>
        </div>
      </div>

      {/* Intuition */}
      <section className="mb-10">
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
          }}
        >
          Intuition
        </h2>
        {concept.content.intuition.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="mb-4"
            style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
          >
            {para}
          </p>
        ))}
      </section>

      {/* Interactive Widgets */}
      {concept.interactions.length > 0 && (
        <section className="mb-10">
          {concept.interactions.map((interaction) => (
            <WidgetContainer
              key={interaction.id}
              title={interaction.description}
              caption={`💡 ${interaction.ahaMoment}`}
            >
              {widgetMap[interaction.id] || (
                <div
                  className="flex items-center justify-center h-full"
                  style={{ color: "var(--text-tertiary)", minHeight: "200px" }}
                >
                  <div className="text-center">
                    <p className="text-sm mb-2">
                      Interactive: {interaction.type}
                    </p>
                    <p className="text-xs italic">Coming soon</p>
                  </div>
                </div>
              )}
            </WidgetContainer>
          ))}
        </section>
      )}

      {/* Mathematics */}
      <section className="mb-10">
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
          }}
        >
          Mathematics
        </h2>
        {concept.content.mathematics.split("\n\n").map((block, i) => {
          // Check if block looks like a LaTeX equation
          if (
            block.includes("=") &&
            !block.startsWith("where") &&
            !block.startsWith("The") &&
            block.length < 100
          ) {
            return <MathBlock key={i} tex={block} isKey={i === 0} />;
          }
          return (
            <p
              key={i}
              className="mb-4"
              style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
            >
              {block}
            </p>
          );
        })}
      </section>

      {/* Problems */}
      {concept.problems.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Problems
          </h2>
          <div className="flex flex-col gap-4">
            {concept.problems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </section>
      )}

      {/* Connections */}
      {concept.content.connections.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Connections
          </h2>
          <div className="flex flex-col gap-3">
            {concept.content.connections.map((conn) => (
              <div
                key={conn.id}
                className="flex items-start gap-3 px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                <Lightbulb
                  size={16}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--accent-primary)" }}
                />
                <div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {conn.id}
                  </span>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {conn.relationship}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// --- Problem Card Component ---

import type { Problem } from "@/types";

function ProblemCard({ problem }: { problem: Problem }) {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div
      className="rounded-lg p-5"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs px-2 py-0.5 rounded-md capitalize"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-tertiary)",
          }}
        >
          {problem.type}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-md capitalize"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-tertiary)",
          }}
        >
          {problem.difficulty}
        </span>
      </div>

      <p
        className="text-sm mb-4"
        style={{ color: "var(--text-primary)", lineHeight: 1.7 }}
      >
        {problem.statement}
      </p>

      {/* Hints */}
      <button
        onClick={() => setShowHints(!showHints)}
        aria-expanded={showHints}
        aria-controls={`hints-${problem.id}`}
        className="flex items-center gap-1 text-xs font-medium mb-2 cursor-pointer"
        style={{ color: "var(--warning)", background: "none", border: "none" }}
      >
        {showHints ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {showHints ? "Hide hints" : `Show hints (${problem.hints.length})`}
      </button>
      {showHints && (
        <div
          id={`hints-${problem.id}`}
          className="mb-4 pl-4 animate-fade-in"
          style={{ borderLeft: "2px solid var(--warning)" }}
        >
          {problem.hints.map((hint, i) => (
            <p
              key={i}
              className="text-sm mb-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {i + 1}. {hint}
            </p>
          ))}
        </div>
      )}

      {/* Solution */}
      <button
        onClick={() => setShowSolution(!showSolution)}
        aria-expanded={showSolution}
        aria-controls={`solution-${problem.id}`}
        className="flex items-center gap-1 text-xs font-medium cursor-pointer"
        style={{ color: "var(--success)", background: "none", border: "none" }}
      >
        {showSolution ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {showSolution ? "Hide solution" : "Show solution"}
      </button>
      {showSolution && (
        <div
          id={`solution-${problem.id}`}
          className="mt-2 p-4 rounded-md animate-fade-in"
          style={{
            backgroundColor: "var(--math-bg)",
            borderLeft: "2px solid var(--success)",
          }}
        >
          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            {problem.solution}
          </p>
        </div>
      )}
    </div>
  );
}
