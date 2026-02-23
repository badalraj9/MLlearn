import { useState } from "react";
import ConceptCard from "@/components/concepts/ConceptCard";
import { concepts } from "@/content/concepts";
import type { Stage } from "@/types";
import { BookOpen } from "lucide-react";

const stages: { value: "all" | Stage; label: string }[] = [
  { value: "all", label: "All" },
  { value: "foundations", label: "Foundations" },
  { value: "core-ml", label: "Core ML" },
  { value: "deep-learning", label: "Deep Learning" },
  { value: "research", label: "Research" },
];

export default function ConceptsPage() {
  const [activeStage, setActiveStage] = useState<"all" | Stage>("all");

  const filtered =
    activeStage === "all"
      ? concepts
      : concepts.filter((c) => c.stage === activeStage);

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1000px" }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--accent-subtle)" }}
          >
            <BookOpen size={20} style={{ color: "var(--accent-primary)" }} />
          </div>
          <div>
            <h1
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Concepts
            </h1>
            <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              {concepts.length} concepts across all stages
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {stages.map((s) => (
          <button
            key={s.value}
            onClick={() => setActiveStage(s.value)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer"
            style={{
              background:
                activeStage === s.value
                  ? "var(--accent-primary)"
                  : "var(--bg-secondary)",
              color: activeStage === s.value ? "#fff" : "var(--text-secondary)",
              border:
                activeStage === s.value
                  ? "1px solid var(--accent-primary)"
                  : "1px solid var(--border)",
              boxShadow:
                activeStage === s.value
                  ? "0 2px 8px rgba(37, 99, 235, 0.25)"
                  : "none",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
        {filtered.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p style={{ color: "var(--text-tertiary)" }}>
            No concepts at this stage yet.
          </p>
        </div>
      )}
    </div>
  );
}
