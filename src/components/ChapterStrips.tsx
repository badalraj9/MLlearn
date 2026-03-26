import { useMemo, type ReactElement } from "react";
import SideStrip from "@/components/SideStrip";
import SliderPlayground from "@/components/playgrounds/SliderPlayground";
import EquationPlayground from "@/components/playgrounds/EquationPlayground";
import type { ChapterTier } from "@/types";

interface ChapterStripsProps {
  moduleId: string;
  chapterId: string;
  activeTier: ChapterTier;
}

/**
 * Auto-generates collapsible side strips based on the module type.
 * These work independently of chapter content — no template changes needed.
 */
export default function ChapterStrips({
  moduleId,
  chapterId,
  activeTier,
}: ChapterStripsProps) {
  const strips = useMemo(
    () => getStripsForModule(moduleId, chapterId, activeTier),
    [moduleId, chapterId, activeTier],
  );

  if (strips.length === 0) return null;

  return <div className="side-strips-panel">{strips}</div>;
}

function getStripsForModule(
  moduleId: string,
  _chapterId: string,
  activeTier: ChapterTier,
): ReactElement[] {
  const elements: ReactElement[] = [];

  // ─── Math module ───
  if (moduleId === "math") {
    if (activeTier <= 2) {
      elements.push(
        <SideStrip
          key="slider"
          icon="📊"
          label="Graph Explorer"
          color="#A0522D"
        >
          <SliderPlayground
            sliders={[
              {
                id: "a",
                label: "Amplitude",
                min: 0.1,
                max: 5,
                step: 0.1,
                default: 1,
              },
              {
                id: "freq",
                label: "Frequency",
                min: 0.1,
                max: 5,
                step: 0.1,
                default: 1,
              },
              {
                id: "offset",
                label: "Offset",
                min: -3,
                max: 3,
                step: 0.5,
                default: 0,
              },
            ]}
            graphFn="a * sin(x * freq) + offset"
            xRange={[-6, 6]}
            yRange={[-6, 6]}
          />
        </SideStrip>,
      );
    }
    if (activeTier >= 2) {
      elements.push(
        <SideStrip
          key="equation"
          icon="✏️"
          label="Equation Lab"
          color="#6B3FA0"
        >
          <EquationPlayground
            initialEquation="x^2 - 2*x + 1"
            xRange={[-5, 5]}
            yRange={[-2, 10]}
          />
        </SideStrip>,
      );
    }
  }

  // ─── ML Theory ───
  if (moduleId === "ml-theory") {
    elements.push(
      <SideStrip key="slider" icon="📉" label="Loss Curve Lab" color="#2f5b7c">
        <SliderPlayground
          sliders={[
            {
              id: "a",
              label: "Initial Loss",
              min: 1,
              max: 10,
              step: 0.5,
              default: 5,
            },
            {
              id: "decay",
              label: "Learning Rate",
              min: 0.05,
              max: 1,
              step: 0.05,
              default: 0.3,
            },
            {
              id: "noise",
              label: "Noise",
              min: 0,
              max: 2,
              step: 0.1,
              default: 0.5,
            },
          ]}
          graphFn="a * exp(-decay * x) + noise * sin(x * 5)"
          xRange={[0, 10]}
          yRange={[-1, 10]}
        />
      </SideStrip>,
    );
    if (activeTier >= 2) {
      elements.push(
        <SideStrip
          key="equation"
          icon="✏️"
          label="Decision Boundary"
          color="#6B3FA0"
        >
          <EquationPlayground
            initialEquation="1 / (1 + exp(-x))"
            xRange={[-6, 6]}
            yRange={[-0.2, 1.2]}
          />
        </SideStrip>,
      );
    }
  }

  // ─── Deep Learning ───
  if (moduleId === "deep-learning") {
    elements.push(
      <SideStrip
        key="slider"
        icon="🧠"
        label="Activation Explorer"
        color="#6B3FA0"
      >
        <SliderPlayground
          sliders={[
            {
              id: "steepness",
              label: "Steepness",
              min: 0.1,
              max: 5,
              step: 0.1,
              default: 1,
            },
            {
              id: "shift",
              label: "Shift",
              min: -3,
              max: 3,
              step: 0.5,
              default: 0,
            },
          ]}
          graphFn="1 / (1 + exp(-steepness * (x - shift)))"
          xRange={[-6, 6]}
          yRange={[-0.2, 1.2]}
        />
      </SideStrip>,
    );
  }

  // ─── Generative ───
  if (moduleId === "generative") {
    elements.push(
      <SideStrip
        key="slider"
        icon="🎨"
        label="Distribution Lab"
        color="#C2185B"
      >
        <SliderPlayground
          sliders={[
            {
              id: "mu",
              label: "Mean μ",
              min: -3,
              max: 3,
              step: 0.1,
              default: 0,
            },
            {
              id: "sigma",
              label: "Std σ",
              min: 0.3,
              max: 3,
              step: 0.1,
              default: 1,
            },
          ]}
          graphFn="(1 / (sigma * sqrt(2 * pi))) * exp(-0.5 * ((x - mu) / sigma)^2)"
          xRange={[-6, 6]}
          yRange={[0, 1.5]}
        />
      </SideStrip>,
    );
  }

  // ─── Applied ML ───
  if (moduleId === "applied-ml") {
    elements.push(
      <SideStrip
        key="slider"
        icon="⚡"
        label="Hyperparam Tuner"
        color="#2E7D32"
      >
        <SliderPlayground
          sliders={[
            {
              id: "alpha",
              label: "Fit strength",
              min: 0.01,
              max: 2,
              step: 0.01,
              default: 0.5,
            },
            {
              id: "degree",
              label: "Poly degree",
              min: 1,
              max: 4,
              step: 1,
              default: 2,
            },
            {
              id: "reg",
              label: "Regularization",
              min: 0,
              max: 1,
              step: 0.05,
              default: 0.1,
            },
          ]}
          graphFn="alpha * x^degree + reg * x^2"
          xRange={[-3, 3]}
          yRange={[-5, 10]}
        />
      </SideStrip>,
    );
  }

  return elements;
}
