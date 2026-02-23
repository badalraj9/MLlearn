import { useState, useMemo } from "react";

/**
 * Demonstrates how scaling by √d_k affects the softmax distribution.
 * Without scaling, large d_k makes dot products huge → softmax becomes one-hot → vanishing gradients.
 */
export default function AttentionScaleSlider() {
  const [dk, setDk] = useState(64);

  // Simulate 5 attention scores (dot products) that scale with √d_k
  const result = useMemo(() => {
    // Raw dot products scale proportional to √d_k in magnitude
    const rawScores = [1.0, 0.8, 0.3, -0.2, -0.5].map((s) => s * Math.sqrt(dk));

    // Unscaled softmax
    const unscaledMax = Math.max(...rawScores);
    const unscaledExp = rawScores.map((s) => Math.exp(s - unscaledMax));
    const unscaledSum = unscaledExp.reduce((a, b) => a + b, 0);
    const unscaled = unscaledExp.map((e) => e / unscaledSum);

    // Scaled softmax (divide by √d_k)
    const scaledScores = rawScores.map((s) => s / Math.sqrt(dk));
    const scaledMax = Math.max(...scaledScores);
    const scaledExp = scaledScores.map((s) => Math.exp(s - scaledMax));
    const scaledSum = scaledExp.reduce((a, b) => a + b, 0);
    const scaled = scaledExp.map((e) => e / scaledSum);

    // Entropy (measure of how spread the distribution is)
    const entropy = (probs: number[]) =>
      -probs.reduce((s, p) => s + (p > 1e-10 ? p * Math.log2(p) : 0), 0);

    return {
      unscaled,
      scaled,
      entropyUnscaled: entropy(unscaled),
      entropyScaled: entropy(scaled),
    };
  }, [dk]);

  const labels = ["Token 1", "Token 2", "Token 3", "Token 4", "Token 5"];

  return (
    <div>
      {/* Slider */}
      <div className="flex items-center gap-4 mb-6">
        <label
          className="text-sm font-medium whitespace-nowrap"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          d_k = {dk}
        </label>
        <input
          type="range"
          min={1}
          max={512}
          value={dk}
          onChange={(e) => setDk(Number(e.target.value))}
          className="flex-1"
          style={{ accentColor: "var(--accent-primary)" }}
        />
      </div>

      {/* Two distributions side by side */}
      <div className="grid grid-cols-2 gap-6">
        {/* Unscaled */}
        <div>
          <h4
            className="text-xs font-semibold mb-3 uppercase tracking-wide"
            style={{ color: "var(--error)" }}
          >
            Without scaling
          </h4>
          <div className="flex flex-col gap-2">
            {result.unscaled.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="text-xs w-14 shrink-0"
                  style={{
                    color: "var(--text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {labels[i]}
                </span>
                <div
                  className="h-5 rounded-sm transition-all duration-200"
                  style={{
                    width: `${Math.max(p * 100, 1)}%`,
                    backgroundColor: "var(--error)",
                    opacity: 0.4 + p * 0.6,
                  }}
                />
                <span
                  className="text-xs w-12 text-right shrink-0"
                  style={{
                    color: "var(--text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {(p * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>
            Entropy: {result.entropyUnscaled.toFixed(2)} bits
          </p>
        </div>

        {/* Scaled */}
        <div>
          <h4
            className="text-xs font-semibold mb-3 uppercase tracking-wide"
            style={{ color: "var(--success)" }}
          >
            With √d_k scaling
          </h4>
          <div className="flex flex-col gap-2">
            {result.scaled.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="text-xs w-14 shrink-0"
                  style={{
                    color: "var(--text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {labels[i]}
                </span>
                <div
                  className="h-5 rounded-sm transition-all duration-200"
                  style={{
                    width: `${Math.max(p * 100, 1)}%`,
                    backgroundColor: "var(--success)",
                    opacity: 0.4 + p * 0.6,
                  }}
                />
                <span
                  className="text-xs w-12 text-right shrink-0"
                  style={{
                    color: "var(--text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {(p * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>
            Entropy: {result.entropyScaled.toFixed(2)} bits
          </p>
        </div>
      </div>

      {/* Insight callout */}
      <div
        className="mt-6 px-4 py-3 rounded-md text-xs"
        style={{
          backgroundColor: "var(--math-bg)",
          borderLeft: "3px solid var(--warning)",
          color: "var(--text-secondary)",
        }}
      >
        {dk > 100
          ? "⚠️ At high d_k, the unscaled softmax is nearly one-hot — gradients vanish and the model can't learn which tokens to attend to."
          : dk < 10
            ? "✅ At low d_k, both distributions are similar — scaling barely matters."
            : "👀 Notice how the unscaled distribution is sharper — the model is forced to put all weight on one token."}
      </div>
    </div>
  );
}
