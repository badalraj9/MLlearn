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

  if (moduleId === "math") {
    if (activeTier <= 2) {
      elements.push(
        <SideStrip
          key="slider"
          label="f(x) = A sin(wx + phi)"
          color="#A0522D"
        >
          <SliderPlayground
            sliders={[
              { id: "a", label: "A =", min: 0.1, max: 5, step: 0.1, default: 1 },
              { id: "freq", label: "w =", min: 0.1, max: 5, step: 0.1, default: 1 },
              { id: "offset", label: "phi =", min: -3, max: 3, step: 0.5, default: 0 },
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
          label="polynomial roots"
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

  if (moduleId === "ml-theory") {
    elements.push(
      <SideStrip key="slider" label="L(t) = a exp(-dt)" color="#2f5b7c">
        <SliderPlayground
          sliders={[
            { id: "a", label: "a =", min: 1, max: 10, step: 0.5, default: 5 },
            { id: "decay", label: "d =", min: 0.05, max: 1, step: 0.05, default: 0.3 },
            { id: "noise", label: "n =", min: 0, max: 2, step: 0.1, default: 0.5 },
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
          label="sigmoid"
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

  if (moduleId === "deep-learning") {
    elements.push(
      <SideStrip
        key="slider"
        label="sigma(x) = 1 / (1 + e^(-kx))"
        color="#6B3FA0"
      >
        <SliderPlayground
          sliders={[
            { id: "steepness", label: "k =", min: 0.1, max: 5, step: 0.1, default: 1 },
            { id: "shift", label: "x_0 =", min: -3, max: 3, step: 0.5, default: 0 },
          ]}
          graphFn="1 / (1 + exp(-steepness * (x - shift)))"
          xRange={[-6, 6]}
          yRange={[-0.2, 1.2]}
        />
      </SideStrip>,
    );
  }

  if (moduleId === "generative") {
    elements.push(
      <SideStrip
        key="slider"
        label="N(x; mu, sigma)"
        color="#C2185B"
      >
        <SliderPlayground
          sliders={[
            { id: "mu", label: "mu =", min: -3, max: 3, step: 0.1, default: 0 },
            { id: "sigma", label: "sigma =", min: 0.3, max: 3, step: 0.1, default: 1 },
          ]}
          graphFn="(1 / (sigma * sqrt(2 * pi))) * exp(-0.5 * ((x - mu) / sigma)^2)"
          xRange={[-6, 6]}
          yRange={[0, 1.5]}
        />
      </SideStrip>,
    );
  }

  if (moduleId === "applied-ml") {
    elements.push(
      <SideStrip
        key="slider"
        label="bias-variance trace"
        color="#2E7D32"
      >
        <SliderPlayground
          sliders={[
            { id: "alpha", label: "fit =", min: 0.01, max: 2, step: 0.01, default: 0.5 },
            { id: "degree", label: "n =", min: 1, max: 4, step: 1, default: 2 },
            { id: "reg", label: "lambda =", min: 0, max: 1, step: 0.05, default: 0.1 },
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