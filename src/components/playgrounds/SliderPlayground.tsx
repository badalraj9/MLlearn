import { useState, useCallback } from "react";
import GraphPlayground from "./GraphPlayground";
import type { SliderParam } from "@/types";

interface SliderPlaygroundProps {
  sliders: SliderParam[];
  graphFn?: string;
  xRange?: [number, number];
  yRange?: [number, number];
}

function safeMathEval(
  expr: string,
  vars: Record<string, number>,
): (x: number) => number {
  return (x: number) => {
    try {
      let e = expr;
      const allVars: Record<string, number> = { ...vars, x };
      const sortedKeys = Object.keys(allVars).sort(
        (a, b) => b.length - a.length,
      );
      for (const key of sortedKeys) {
        e = e.replace(new RegExp(`\\b${key}\\b`, "g"), `(${allVars[key]})`);
      }
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
    <div>
      {graphFn && (
        <GraphPlayground
          fn={evalFn}
          params={params}
          xRange={xRange}
          yRange={yRange}
          label={graphFn}
        />
      )}

      <div style={{ marginTop: "1rem" }}>
        {sliders.map((s) => (
          <div
            key={s.id}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 56px",
              alignItems: "center",
              gap: "12px",
              padding: "4px 0",
            }}
          >
            <label
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                letterSpacing: "0.02em",
              }}
            >
              {s.label}
            </label>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={params[s.id]}
              onChange={(e) => updateParam(s.id, parseFloat(e.target.value))}
              style={{
                accentColor: "var(--accent-primary)",
                width: "100%",
                cursor: "pointer",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-tertiary)",
                textAlign: "right",
              }}
            >
              {params[s.id].toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {!graphFn && (
        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(params).map(([k, v]) => (
            <span
              key={k}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-tertiary)",
              }}
            >
              {k}: {v.toFixed(3)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}