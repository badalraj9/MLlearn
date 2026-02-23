import { Link } from "react-router-dom";
import ConceptCard from "@/components/concepts/ConceptCard";
import PaperCard from "@/components/papers/PaperCard";
import { concepts } from "@/content/concepts";
import { papers } from "@/content/papers";
import {
  BookOpen,
  FileText,
  GitBranch,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const stages = [
  {
    title: "Stage 1: Foundations",
    description: "Mathematical maturity, notation fluency, proof reading",
    goal: '"I can read mathematical notation without fear"',
    color: "var(--stage-foundations)",
    bg: "var(--stage-foundations-bg)",
    emoji: "📐",
  },
  {
    title: "Stage 2: Core ML",
    description: "Classical algorithms, mathematical foundations",
    goal: '"I understand why algorithms work, not just how"',
    color: "var(--stage-core-ml)",
    bg: "var(--stage-core-ml-bg)",
    emoji: "⚙️",
  },
  {
    title: "Stage 3: Deep Learning",
    description: "Neural architectures, training dynamics",
    goal: '"I can reason about architecture choices"',
    color: "var(--stage-deep-learning)",
    bg: "var(--stage-deep-learning-bg)",
    emoji: "🧠",
  },
  {
    title: "Stage 4: Research",
    description: "Paper comprehension, novel contributions",
    goal: '"I can read and extend research papers"',
    color: "var(--stage-research)",
    bg: "var(--stage-research-bg)",
    emoji: "🔬",
  },
];

export default function HomePage() {
  const featuredConcepts = concepts.slice(0, 3);
  const featuredPapers = papers.slice(0, 2);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-section">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-medium"
          style={{
            background: "var(--accent-subtle)",
            color: "var(--accent-primary)",
            border:
              "1px solid color-mix(in srgb, var(--accent-primary) 15%, transparent)",
          }}
        >
          <Sparkles size={14} />
          Interactive Mathematical Learning
        </div>

        <h1
          className="text-5xl font-bold mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
          }}
        >
          Every equation is a playground,
          <br />
          <span
            style={{
              background: "var(--accent-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            every proof is a journey
          </span>
        </h1>

        <p
          className="text-lg max-w-xl mx-auto mb-10"
          style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          Master machine learning mathematics through interactive
          visualizations, explorable proofs, and deconstructed research papers.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/concepts" className="btn-primary">
            <BookOpen size={18} />
            Start Learning
          </Link>
          <Link to="/papers" className="btn-secondary">
            <FileText size={18} />
            Explore Papers
          </Link>
        </div>
      </section>

      <div className="section-divider" />

      {/* Learning Journey */}
      <section className="py-8">
        <div className="section-header">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Your Learning Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          {stages.map((stage, i) => (
            <div
              key={i}
              className="stage-card"
              style={{ "--stage-color": stage.color } as React.CSSProperties}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: stage.color,
                  borderRadius: "12px 12px 0 0",
                }}
              />
              <div className="text-2xl mb-3">{stage.emoji}</div>
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: stage.color, fontFamily: "var(--font-body)" }}
              >
                {stage.title}
              </h3>
              <p
                className="text-sm mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                {stage.description}
              </p>
              <p
                className="text-xs italic"
                style={{ color: "var(--text-tertiary)" }}
              >
                {stage.goal}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Anchor Concepts */}
      <section className="py-8">
        <div className="section-header">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Anchor Concepts
          </h2>
          <Link
            to="/concepts"
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--accent-primary)" }}
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {featuredConcepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Papers */}
      <section className="py-8">
        <div className="section-header">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Paper Deconstructors
          </h2>
          <Link
            to="/papers"
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--accent-primary)" }}
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
          {featuredPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Concept Graph CTA */}
      <section className="py-8 text-center">
        <Link
          to="/graph"
          className="card inline-flex items-center gap-4 px-8 py-5 text-left"
          style={{ textDecoration: "none" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--accent-subtle)" }}
          >
            <GitBranch size={24} style={{ color: "var(--accent-primary)" }} />
          </div>
          <div>
            <div
              className="font-semibold text-base"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
              }}
            >
              Explore the Concept Graph
            </div>
            <div
              className="text-sm mt-0.5"
              style={{ color: "var(--text-tertiary)" }}
            >
              See how all concepts connect — prerequisites, applications, and
              research frontiers
            </div>
          </div>
          <ArrowRight
            size={20}
            style={{ color: "var(--accent-primary)" }}
            className="shrink-0"
          />
        </Link>
      </section>
    </div>
  );
}
