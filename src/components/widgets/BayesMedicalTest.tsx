import { useState, useMemo } from "react";

export default function BayesMedicalTest() {
  const [prevalence, setPrevalence] = useState(0.001);
  const [sensitivity, setSensitivity] = useState(0.99);
  const [specificity, setSpecificity] = useState(0.95);

  const result = useMemo(() => {
    const pDisease = prevalence;
    const pHealthy = 1 - pDisease;
    const pPositiveGivenDisease = sensitivity;
    const pPositiveGivenHealthy = 1 - specificity;
    const pPositive =
      pPositiveGivenDisease * pDisease + pPositiveGivenHealthy * pHealthy;
    const posterior = (pPositiveGivenDisease * pDisease) / pPositive;
    const pop = 10000;
    const sick = Math.round(pop * pDisease);
    const healthy = pop - sick;
    const truePositives = Math.round(sick * sensitivity);
    const falsePositives = Math.round(healthy * (1 - specificity));
    const totalPositives = truePositives + falsePositives;
    return { posterior, pPositive, truePositives, falsePositives, totalPositives, sick, healthy };
  }, [prevalence, sensitivity, specificity]);

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "grid", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", width: "80px" }}>
              P(D)
            </label>
            <input
              type="range" min={0.0001} max={0.1} step={0.0001}
              value={prevalence} onChange={(e) => setPrevalence(Number(e.target.value))}
              style={{ flex: 1, accentColor: "var(--accent-primary)" }}
            />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)", width: "60px", textAlign: "right" }}>
              {(prevalence * 100).toFixed(3)}%
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", width: "80px" }}>
              P(+|D)
            </label>
            <input
              type="range" min={0.5} max={0.999} step={0.001}
              value={sensitivity} onChange={(e) => setSensitivity(Number(e.target.value))}
              style={{ flex: 1, accentColor: "var(--accent-primary)" }}
            />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)", width: "60px", textAlign: "right" }}>
              {(sensitivity * 100).toFixed(1)}%
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", width: "80px" }}>
              P(-|H)
            </label>
            <input
              type="range" min={0.5} max={0.999} step={0.001}
              value={specificity} onChange={(e) => setSpecificity(Number(e.target.value))}
              style={{ flex: 1, accentColor: "var(--accent-primary)" }}
            />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)", width: "60px", textAlign: "right" }}>
              {(specificity * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
          P(D | +)
        </p>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "2.5rem",
          fontWeight: "300",
          color: result.posterior > 0.5 ? "var(--text-primary)" : result.posterior > 0.1 ? "var(--text-secondary)" : "var(--text-secondary)",
          letterSpacing: "-0.02em",
        }}>
          {(result.posterior * 100).toFixed(1)}
          <span style={{ fontSize: "1.2rem", color: "var(--text-tertiary)" }}>%</span>
        </p>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "1rem 0", marginBottom: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "var(--text-tertiary)", marginBottom: "2px" }}>pop.</p>
            <p style={{ color: "var(--text-secondary)" }}>10,000</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "var(--text-tertiary)", marginBottom: "2px" }}>sick</p>
            <p style={{ color: "var(--text-secondary)" }}>{result.sick}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "var(--text-tertiary)", marginBottom: "2px" }}>TP</p>
            <p style={{ color: "var(--text-secondary)" }}>{result.truePositives}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "var(--text-tertiary)", marginBottom: "2px" }}>FP</p>
            <p style={{ color: "var(--text-secondary)" }}>{result.falsePositives}</p>
          </div>
        </div>
      </div>

      {result.totalPositives > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", height: "3px", overflow: "hidden" }}>
            <div style={{ width: `${(result.truePositives / result.totalPositives) * 100}%`, background: "var(--text-tertiary)", opacity: 0.6 }} />
            <div style={{ width: `${(result.falsePositives / result.totalPositives) * 100}%`, background: "var(--text-tertiary)", opacity: 0.2 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-tertiary)" }}>
            <span>{result.truePositives} true+</span>
            <span>{result.falsePositives} false+</span>
          </div>
        </div>
      )}

      <div style={{
        paddingLeft: "0.75rem",
        borderLeft: "1px solid var(--border)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        color: "var(--text-tertiary)",
        fontStyle: "italic",
        lineHeight: 1.6,
      }}>
        P(D|+) = P(+|D)P(D) / P(+) = {(sensitivity * prevalence / result.pPositive).toFixed(4)}
        {prevalence < 0.01 && (
          <span style={{ display: "block", marginTop: "4px" }}>
            base rate: 1 in {Math.round(1 / prevalence).toLocaleString()} — most positives are false
          </span>
        )}
      </div>
    </div>
  );
}