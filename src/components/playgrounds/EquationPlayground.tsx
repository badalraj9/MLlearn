import { useState, useCallback } from "react";
import GraphPlayground from "./GraphPlayground";

interface EquationPlaygroundProps {
  initialEquation?: string;
  xRange?: [number, number];
  yRange?: [number, number];
}

function parseEquation(expr: string): (x: number) => number {
  return (x: number) => {
    try {
      let e = expr;
      e = e.replace(/\bx\b/g, `(${x})`);
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

export default function EquationPlayground({
  initialEquation = "x^2",
  xRange = [-5, 5],
  yRange = [-3, 10],
}: EquationPlaygroundProps) {
  const [equation, setEquation] = useState(initialEquation);
  const [error, setError] = useState<string | null>(null);

  const evalFn = useCallback(
    (x: number, _p: Record<string, number>) => {
      try {
        const result = parseEquation(equation)(x);
        if (error) setError(null);
        return result;
      } catch (e) {
        setError("invalid");
        return NaN;
      }
    },
    [equation, error],
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-tertiary)",
          }}
        >
          y =
        </span>
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            borderBottom: error ? "1px solid var(--error)" : "1px solid var(--border)",
            padding: "2px 4px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--text-primary)",
            outline: "none",
          }}
          placeholder="e.g. sin(x) * 2 + cos(x^2)"
          spellCheck={false}
        />
      </div>

      <GraphPlayground
        fn={evalFn}
        params={{}}
        xRange={xRange}
        yRange={yRange}
        label={`y = ${equation}`}
      />

      <div
        style={{
          marginTop: "0.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--text-tertiary)",
          letterSpacing: "0.02em",
        }}
      >
        sin · cos · tan · sqrt · exp · log · abs · pi
      </div>
    </div>
  );
}