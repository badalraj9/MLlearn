import { Link } from "react-router-dom";
import StageBadge from "@/components/ui/StageBadge";
import type { ConceptNode } from "@/types";
import { Sparkles } from "lucide-react";

interface ConceptCardProps {
  concept: ConceptNode;
}

export default function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <Link
      to={`/concepts/${concept.slug}`}
      className="card block group"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-start justify-between mb-3">
        <StageBadge stage={concept.stage} />
        {concept.prerequisites.length > 0 && (
          <span className="tag">
            {concept.prerequisites.length} prereq
            {concept.prerequisites.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      <h3
        className="text-lg font-semibold mb-2 transition-colors duration-150"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--text-primary)",
          margin: 0,
          marginBottom: "8px",
        }}
      >
        {concept.title}
      </h3>

      <p
        className="text-sm mb-4 line-clamp-2"
        style={{ color: "var(--text-secondary)" }}
      >
        {concept.content.intuition.slice(0, 120)}...
      </p>

      {/* Aha moment */}
      <div
        className="flex items-start gap-2 text-xs mt-auto pt-3"
        style={{
          borderTop: "1px solid var(--border)",
          color: "var(--text-tertiary)",
        }}
      >
        <Sparkles
          size={14}
          className="mt-0.5 shrink-0"
          style={{ color: "var(--warning)" }}
        />
        <span className="italic">{concept.ahaMoment}</span>
      </div>
    </Link>
  );
}
