import { useState } from "react";
import type { CodeBlock } from "@/types";

interface CodeToggleProps {
  codeBlock: CodeBlock;
}

export default function CodeToggle({ codeBlock }: CodeToggleProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="code-toggle-container">
      <button
        className={`code-toggle-btn${visible ? " code-toggle-btn--active" : ""}`}
        onClick={() => setVisible(!visible)}
      >
        <span>{visible ? "📖 Theory" : "💻 Code"}</span>
        <span className="code-toggle-lang">{codeBlock.language}</span>
      </button>

      {visible && (
        <div className="code-toggle-panel">
          {codeBlock.description && (
            <p className="code-toggle-desc">{codeBlock.description}</p>
          )}
          <pre className="code-toggle-code">
            <code>{codeBlock.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
