import { useState, type ReactNode } from "react";

interface SideStripProps {
  /** Emoji or icon shown on the collapsed tab */
  icon: string;
  /** Label shown on the collapsed tab */
  label: string;
  /** Color accent for the strip tab */
  color?: string;
  /** Content rendered when expanded */
  children: ReactNode;
  /** Start expanded? */
  defaultOpen?: boolean;
}

/**
 * Collapsible paper-strip panel. Shows as a small themed tab
 * on the right edge; expands into a full panel on click.
 */
export default function SideStrip({
  icon,
  label,
  color = "var(--accent-primary)",
  children,
  defaultOpen = false,
}: SideStripProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`side-strip${open ? " side-strip--open" : ""}`}>
      <button
        className="side-strip-tab"
        onClick={() => setOpen(!open)}
        style={{ borderLeftColor: color }}
        title={open ? `Close ${label}` : `Open ${label}`}
      >
        <span className="side-strip-tab-icon">{icon}</span>
        <span className="side-strip-tab-label">{label}</span>
        <span className="side-strip-tab-arrow">{open ? "▾" : "▸"}</span>
      </button>

      {open && <div className="side-strip-content">{children}</div>}
    </div>
  );
}
