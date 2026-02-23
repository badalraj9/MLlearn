import { MathJax } from "better-react-mathjax";

interface MathBlockProps {
  tex: string;
  display?: boolean;
  isKey?: boolean;
  label?: string;
}

export default function MathBlock({
  tex,
  display = true,
  isKey = false,
  label,
}: MathBlockProps) {
  if (!display) {
    return (
      <span className="math-inline">
        <MathJax inline>{`\\(${tex}\\)`}</MathJax>
      </span>
    );
  }

  return (
    <div className={`math-block ${isKey ? "math-block--key" : ""}`}>
      <MathJax>{`\\[${tex}\\]`}</MathJax>
      {label && <span className="math-label">{label}</span>}
    </div>
  );
}
