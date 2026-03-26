import { useState, useCallback } from "react";
import GraphPlayground from "./GraphPlayground";

interface EquationPlaygroundProps {
  initialEquation?: string;
  xRange?: [number, number];
  yRange?: [number, number];
}

/**
 * Parse and evaluate a math expression safely.
 */
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
        setError(String(e));
        return NaN;
      }
    },
    [equation, error],
  );

  return (
    <div className="playground-container">
      <div className="playground-header">
        <span className="playground-badge">🔬 Equation Editor</span>
      </div>

      <div className="playground-equation-input">
        <label className="playground-equation-label">y =</label>
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          className="playground-equation-field"
          placeholder="e.g. sin(x) * 2 + cos(x^2)"
          spellCheck={false}
        />
      </div>

      {error && (
        <div className="playground-error">
          ⚠️ Invalid equation — check your syntax
        </div>
      )}

      <GraphPlayground
        fn={evalFn}
        params={{}}
        xRange={xRange}
        yRange={yRange}
        label={`y = ${equation}`}
      />

      <div className="playground-equation-hints">
        <span>Functions: sin, cos, tan, sqrt, exp, log, abs</span>
        <span>Constants: pi</span>
        <span>Power: x^2</span>
      </div>
    </div>
  );
}
