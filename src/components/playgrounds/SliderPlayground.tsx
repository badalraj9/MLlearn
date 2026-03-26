import { useState, useCallback } from "react";
import GraphPlayground from "./GraphPlayground";
import type { SliderParam } from "@/types";

interface SliderPlaygroundProps {
  sliders: SliderParam[];
  graphFn?: string;
  xRange?: [number, number];
  yRange?: [number, number];
}

/**
 * Safely evaluates a math expression with variables.
 * Uses simple tokenized evaluation — no eval().
 */
function safeMathEval(
  expr: string,
  vars: Record<string, number>,
): (x: number) => number {
  return (x: number) => {
    try {
      // Replace variable names with values, longest first to avoid partial matches
      let e = expr;
      const allVars: Record<string, number> = { ...vars, x };
      const sortedKeys = Object.keys(allVars).sort(
        (a, b) => b.length - a.length,
      );
      for (const key of sortedKeys) {
        e = e.replace(new RegExp(`\\b${key}\\b`, "g"), `(${allVars[key]})`);
      }
      // Replace math functions
      e = e.replace(/sin\(/g, "Math.sin(");
      e = e.replace(/cos\(/g, "Math.cos(");
      e = e.replace(/tan\(/g, "Math.tan(");
      e = e.replace(/sqrt\(/g, "Math.sqrt(");
      e = e.replace(/abs\(/g, "Math.abs(");
      e = e.replace(/exp\(/g, "Math.exp(");
      e = e.replace(/log\(/g, "Math.log(");
      e = e.replace(/pi/g, `(${Math.PI})`);
      e = e.replace(/\^/g, "**");
      // eslint-disable-next-line no-new-func
      return new Function(`return ${e}`)() as number;
    } catch {
      return NaN;
    }
  };
}

export default function SliderPlayground({
  sliders,
  graphFn,
  xRange,
  yRange,
}: SliderPlaygroundProps) {
  const initial: Record<string, number> = {};
  for (const s of sliders) initial[s.id] = s.default;
  const [params, setParams] = useState(initial);

  const updateParam = useCallback((id: string, value: number) => {
    setParams((prev) => ({ ...prev, [id]: value }));
  }, []);

  const evalFn = useCallback(
    (x: number, p: Record<string, number>) => {
      if (!graphFn) return 0;
      return safeMathEval(graphFn, p)(x);
    },
    [graphFn],
  );

  return (
    <div className="playground-container">
      <div className="playground-header">
        <span className="playground-badge">🌱 Interactive</span>
      </div>

      {graphFn && (
        <GraphPlayground
          fn={evalFn}
          params={params}
          xRange={xRange}
          yRange={yRange}
          label={graphFn}
        />
      )}

      <div className="playground-sliders">
        {sliders.map((s) => (
          <div key={s.id} className="playground-slider-row">
            <label className="playground-slider-label">{s.label}</label>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={params[s.id]}
              onChange={(e) => updateParam(s.id, parseFloat(e.target.value))}
              className="playground-slider-input"
            />
            <span className="playground-slider-value">
              {params[s.id].toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {!graphFn && (
        <div className="playground-output">
          {Object.entries(params).map(([k, v]) => (
            <div key={k} className="playground-output-item">
              <span>{k}</span>
              <strong>{v.toFixed(3)}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
