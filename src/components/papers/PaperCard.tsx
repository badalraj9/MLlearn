import { Link } from "react-router-dom";
import type { Paper } from "@/types";
import { FileText } from "lucide-react";

interface PaperCardProps {
  paper: Paper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <Link
      to={`/papers/${paper.id}`}
      className="card block group"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "var(--accent-subtle)" }}
        >
          <FileText size={20} style={{ color: "var(--accent-primary)" }} />
        </div>
        <div>
          <h3
            className="text-base font-semibold transition-colors duration-150"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {paper.title}
          </h3>
          <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
            {paper.authors.join(", ")} · {paper.year}
            {paper.arxivId && ` · arXiv:${paper.arxivId}`}
          </p>
        </div>
      </div>

      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
        {paper.keyContribution}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {paper.readingModes.map((mode) => (
          <span key={mode} className="tag capitalize">
            {mode.replace("-", " ")}
          </span>
        ))}
      </div>
    </Link>
  );
}
