import { useLocation, Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useUIStore } from "@/store";

const routeLabels: Record<string, string> = {
  concepts: "Concepts",
  papers: "Papers",
  graph: "Concept Graph",
};

export default function Header() {
  const { darkMode, toggleDarkMode } = useUIStore();
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-3"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--bg-primary) 85%, transparent)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Breadcrumbs */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        {pathParts.map((part, i) => {
          const path = "/" + pathParts.slice(0, i + 1).join("/");
          const isLast = i === pathParts.length - 1;
          const label =
            routeLabels[part] ||
            part
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");

          return (
            <span key={path} className="flex items-center gap-1.5">
              <span style={{ color: "var(--text-tertiary)" }}>/</span>
              {isLast ? (
                <span className="current">{label}</span>
              ) : (
                <Link to={path}>{label}</Link>
              )}
            </span>
          );
        })}
      </nav>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-150 cursor-pointer"
        style={{
          color: "var(--text-secondary)",
          background: "none",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
