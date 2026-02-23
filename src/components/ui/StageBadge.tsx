import type { Stage } from "@/types";

const stageConfig: Record<Stage, { label: string; color: string; bg: string }> =
  {
    foundations: {
      label: "Foundations",
      color: "var(--stage-foundations)",
      bg: "var(--stage-foundations-bg)",
    },
    "core-ml": {
      label: "Core ML",
      color: "var(--stage-core-ml)",
      bg: "var(--stage-core-ml-bg)",
    },
    "deep-learning": {
      label: "Deep Learning",
      color: "var(--stage-deep-learning)",
      bg: "var(--stage-deep-learning-bg)",
    },
    research: {
      label: "Research",
      color: "var(--stage-research)",
      bg: "var(--stage-research-bg)",
    },
  };

export default function StageBadge({ stage }: { stage: Stage }) {
  const config = stageConfig[stage];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid color-mix(in srgb, ${config.color} 20%, transparent)`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}
