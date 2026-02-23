import PaperCard from "@/components/papers/PaperCard";
import { papers } from "@/content/papers";
import { FileText } from "lucide-react";

export default function PapersPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: "1000px" }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--accent-subtle)" }}
          >
            <FileText size={20} style={{ color: "var(--accent-primary)" }} />
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
              Paper Deconstructors
            </h1>
            <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              {papers.length} paper{papers.length !== 1 ? "s" : ""}{" "}
              deconstructed for learning
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
        {papers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
}
