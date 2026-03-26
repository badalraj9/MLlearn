import { useState } from "react";

interface EquationStepperProps {
  steps: { latex: string; explanation: string }[];
}

export default function EquationStepper({ steps }: EquationStepperProps) {
  const [current, setCurrent] = useState(0);

  if (steps.length === 0) return null;

  return (
    <div className="equation-stepper">
      <div className="equation-stepper-header">
        <span className="playground-badge">📐 Step-by-Step</span>
        <span className="equation-stepper-count">
          {current + 1} / {steps.length}
        </span>
      </div>

      <div className="equation-stepper-card">
        <div className="equation-block">{steps[current].latex}</div>
        <p className="equation-stepper-explanation">
          {steps[current].explanation}
        </p>
      </div>

      <div className="equation-stepper-nav">
        <button
          className="btn-secondary"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          ← Prev
        </button>
        <div className="equation-stepper-dots">
          {steps.map((_, i) => (
            <button
              key={i}
              className={`equation-stepper-dot${i === current ? " equation-stepper-dot--active" : ""}${i < current ? " equation-stepper-dot--done" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button
          className="btn-secondary"
          disabled={current === steps.length - 1}
          onClick={() => setCurrent((c) => c + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
