import { useState, type ReactNode } from "react";

interface SideStripProps {
  label: string;
  color?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function SideStrip({
  label,
  color = "var(--accent-primary)",
  children,
  defaultOpen = false,
}: SideStripProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="side-strip"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: open ? "1px solid var(--border)" : "1px solid transparent",
        marginTop: "1rem",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "0.6rem 0",
          border: "none",
          borderLeft: `2px solid ${color}`,
          paddingLeft: "1rem",
          background: "transparent",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.02em",
          color: open ? "var(--text-primary)" : "var(--text-secondary)",
          transition: "all 150ms ease",
          textAlign: "left",
        }}
      >
        <span>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)" }}>
          {open ? "[close]" : "[open]"}
        </span>
      </button>

      {open && (
        <div style={{ padding: "1rem 0 1.5rem 1rem", borderLeft: `2px solid ${color}`, marginLeft: "0" }}>
          {children}
        </div>
      )}
    </div>
  );
}