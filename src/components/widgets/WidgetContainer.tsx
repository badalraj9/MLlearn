import type { ReactNode } from "react";

interface WidgetContainerProps {
  title: string;
  caption?: string;
  children: ReactNode;
  minHeight?: number;
}

export default function WidgetContainer({
  title,
  caption,
  children,
  minHeight = 300,
}: WidgetContainerProps) {
  return (
    <div className="widget-wrap">
      <div
        className="px-5 py-3 text-sm font-medium"
        style={{
          color: "var(--text-primary)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)",
        }}
      >
        {title}
      </div>

      <div className="p-5" style={{ minHeight }}>
        {children}
      </div>

      {caption && (
        <div
          className="px-5 py-2 text-xs italic"
          style={{
            color: "var(--text-tertiary)",
            borderTop: "1px solid var(--border)",
            background: "var(--bg-secondary)",
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
