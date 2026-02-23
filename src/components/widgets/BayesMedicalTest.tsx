import { useState, useMemo } from "react";

/**
 * Interactive Bayes' Theorem calculator.
 * Adjust disease prevalence and test accuracy to see the posterior.
 * Demonstrates the base rate fallacy.
 */
export default function BayesMedicalTest() {
  const [prevalence, setPrevalence] = useState(0.001); // P(disease)
  const [sensitivity, setSensitivity] = useState(0.99); // P(positive | disease) - true positive rate
  const [specificity, setSpecificity] = useState(0.95); // P(negative | no disease) - true negative rate

  const result = useMemo(() => {
    const pDisease = prevalence;
    const pHealthy = 1 - pDisease;

    // P(positive | disease) = sensitivity
    // P(positive | healthy) = 1 - specificity (false positive rate)
    const pPositiveGivenDisease = sensitivity;
    const pPositiveGivenHealthy = 1 - specificity;

    // P(positive) = P(+|D)*P(D) + P(+|H)*P(H)
    const pPositive =
      pPositiveGivenDisease * pDisease + pPositiveGivenHealthy * pHealthy;

    // P(disease | positive) = Bayes
    const posterior = (pPositiveGivenDisease * pDisease) / pPositive;

    // For a population of 10,000
    const pop = 10000;
    const sick = Math.round(pop * pDisease);
    const healthy = pop - sick;
    const truePositives = Math.round(sick * sensitivity);
    const falsePositives = Math.round(healthy * (1 - specificity));
    const totalPositives = truePositives + falsePositives;

    return {
      posterior,
      pPositive,
      truePositives,
      falsePositives,
      totalPositives,
      sick,
      healthy,
    };
  }, [prevalence, sensitivity, specificity]);

  return (
    <div>
      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label
            className="text-xs font-medium block mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            Prevalence: {(prevalence * 100).toFixed(2)}%
          </label>
          <input
            type="range"
            min={0.0001}
            max={0.1}
            step={0.0001}
            value={prevalence}
            onChange={(e) => setPrevalence(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "var(--accent-primary)" }}
          />
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            1 in {Math.round(1 / prevalence).toLocaleString()}
          </span>
        </div>

        <div>
          <label
            className="text-xs font-medium block mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            Sensitivity: {(sensitivity * 100).toFixed(1)}%
          </label>
          <input
            type="range"
            min={0.5}
            max={0.999}
            step={0.001}
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "var(--success)" }}
          />
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            True positive rate
          </span>
        </div>

        <div>
          <label
            className="text-xs font-medium block mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            Specificity: {(specificity * 100).toFixed(1)}%
          </label>
          <input
            type="range"
            min={0.5}
            max={0.999}
            step={0.001}
            value={specificity}
            onChange={(e) => setSpecificity(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "var(--accent-primary)" }}
          />
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            True negative rate
          </span>
        </div>
      </div>

      {/* Big result */}
      <div
        className="text-center py-6 rounded-lg mb-6"
        style={{ backgroundColor: "var(--math-bg)" }}
      >
        <p className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>
          P(disease | positive test)
        </p>
        <p
          className="text-4xl font-bold"
          style={{
            fontFamily: "var(--font-mono)",
            color:
              result.posterior > 0.5
                ? "var(--error)"
                : result.posterior > 0.1
                  ? "var(--warning)"
                  : "var(--success)",
          }}
        >
          {(result.posterior * 100).toFixed(1)}%
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
          {result.posterior < 0.05
            ? "You almost certainly DON'T have it!"
            : result.posterior < 0.5
              ? "Still more likely healthy than sick."
              : "Now the test result is more meaningful."}
        </p>
      </div>

      {/* Population breakdown */}
      <div
        className="text-xs p-4 rounded-lg"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <p
          className="font-medium mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          In a population of 10,000:
        </p>
        <div
          className="grid grid-cols-2 gap-y-1"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>Actually sick:</span>
          <span>{result.sick}</span>
          <span>True positives:</span>
          <span style={{ color: "var(--success)" }}>
            {result.truePositives}
          </span>
          <span>False positives:</span>
          <span style={{ color: "var(--error)" }}>{result.falsePositives}</span>
          <span>Total positive tests:</span>
          <span className="font-medium">{result.totalPositives}</span>
        </div>

        {/* Visual ratio */}
        {result.totalPositives > 0 && (
          <div className="mt-3">
            <div className="flex rounded-sm overflow-hidden h-4">
              <div
                style={{
                  width: `${(result.truePositives / result.totalPositives) * 100}%`,
                  backgroundColor: "var(--success)",
                }}
                title={`True positives: ${result.truePositives}`}
              />
              <div
                style={{
                  width: `${(result.falsePositives / result.totalPositives) * 100}%`,
                  backgroundColor: "var(--error)",
                }}
                title={`False positives: ${result.falsePositives}`}
              />
            </div>
            <div
              className="flex justify-between mt-1 text-xs"
              style={{ color: "var(--text-tertiary)" }}
            >
              <span>True +</span>
              <span>False +</span>
            </div>
          </div>
        )}
      </div>

      {/* Insight */}
      <div
        className="mt-4 px-4 py-3 rounded-md text-xs"
        style={{
          backgroundColor: "var(--math-bg)",
          borderLeft: "3px solid var(--warning)",
          color: "var(--text-secondary)",
        }}
      >
        {prevalence < 0.01
          ? `🎯 Base rate fallacy: Even with ${(sensitivity * 100).toFixed(0)}% accuracy, for a rare disease (1 in ${Math.round(1 / prevalence).toLocaleString()}), most positive results are false positives!`
          : "📊 As prevalence increases, the prior dominates — positive tests become more meaningful."}
      </div>
    </div>
  );
}
