import { useState, useMemo } from "react";

export default function AttentionScaleSlider() {
  const [dk, setDk] = useState(64);

  const result = useMemo(() => {
    const rawScores = [1.0, 0.8, 0.3, -0.2, -0.5].map((s) => s * Math.sqrt(dk));
    const unscaledMax = Math.max(...rawScores);
    const unscaledExp = rawScores.map((s) => Math.exp(s - unscaledMax));
    const unscaledSum = unscaledExp.reduce((a, b) => a + b, 0);
    const unscaled = unscaledExp.map((e) => e / unscaledSum);

    const scaledScores = rawScores.map((s) => s / Math.sqrt(dk));
    const scaledMax = Math.max(...scaledScores);
    const scaledExp = scaledScores.map((s) => Math.exp(s - scaledMax));
    const scaledSum = scaledExp.reduce((a, b) => a + b, 0);
    const scaled = scaledExp.map((e) => e / scaledSum);

    const entropy = (probs: number[]) =>
      -probs.reduce((s, p) => s + (p > 1e-10 ? p * Math.log2(p) : 0), 0);

    return {
      unscaled,
      scaled,
      entropyUnscaled: entropy(unscaled),
      entropyScaled: entropy(scaled),
    };
  }, [dk]);

  const tokens = ["q_1", "q_2", "q_3", "q_4", "q_5"];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1.5rem" }}>
        <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
          d_k = {dk}
        </label>
        <input
          type="range" min={1} max={512} step={1}
          value={dk} onChange={(e) => setDk(Number(e.target.value))}
          style={{ flex: 1, accentColor: "var(--accent-primary)" }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", width: "36px", textAlign: "right" }}>
          sqrt = {Math.sqrt(dk).toFixed(1)}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
            raw attention
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {result.unscaled.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", width: "20px" }}>
                  {tokens[i]}
                </span>
                <div style={{ flex: 1, height: "2px", background: "var(--border)", position: "relative" }}>
                  <div style={{
                    position: "absolute", left: 0, top: 0, height: "100%",
                    width: `${Math.max(p * 100, 1)}%`,
                    background: "var(--text-secondary)",
                    opacity: 0.35 + p * 0.65,
                  }} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", width: "40px", textAlign: "right" }}>
                  {p.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)" }}>
            H = {result.entropyUnscaled.toFixed(2)} bits
          </p>
        </div>

        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
            / sqrt(d_k)
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {result.scaled.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", width: "20px" }}>
                  {tokens[i]}
                </span>
                <div style={{ flex: 1, height: "2px", background: "var(--border)", position: "relative" }}>
                  <div style={{
                    position: "absolute", left: 0, top: 0, height: "100%",
                    width: `${Math.max(p * 100, 1)}%`,
                    background: "var(--text-secondary)",
                    opacity: 0.35 + p * 0.65,
                  }} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)", width: "40px", textAlign: "right" }}>
                  {p.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)" }}>
            H = {result.entropyScaled.toFixed(2)} bits
          </p>
        </div>
      </div>

      <div style={{
        marginTop: "1rem",
        paddingLeft: "0.75rem",
        borderLeft: "1px solid var(--border)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        color: "var(--text-tertiary)",
        fontStyle: "italic",
        lineHeight: 1.6,
      }}>
        {dk > 100
          ? "large d_k: softmax becomes one-hot, gradients vanish"
          : dk < 10
            ? "small d_k: both distributions similar, scaling negligible"
            : "attention collapses without scaling — only one head dominates"}
      </div>
    </div>
  );
}