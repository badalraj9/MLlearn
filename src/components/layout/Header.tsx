import { useLocation, Link } from "react-router-dom";

const routeLabels: Record<string, string> = {
  concepts: "Concepts",
  papers: "Papers",
  graph: "Concept Graph",
};

export default function Header() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  if (pathParts.length === 0) return null; // Don't show on home page if desired, or keep "Home"

  return (
    <header className="flex items-center px-2 py-4 mb-4">
      {/* Breadcrumbs */}
      <nav className="breadcrumb text-sm" aria-label="Breadcrumb">
        <Link
            to="/"
            className="hover:text-[var(--accent-primary)] transition-colors"
            style={{ color: "var(--text-tertiary)" }}
        >
            Home
        </Link>
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
            <span key={path} className="flex items-center gap-2">
              <span style={{ color: "var(--text-tertiary)", opacity: 0.5 }}>/</span>
              {isLast ? (
                <span className="font-medium" style={{ color: "var(--text-primary)" }}>{label}</span>
              ) : (
                <Link
                    to={path}
                    className="hover:text-[var(--accent-primary)] transition-colors"
                    style={{ color: "var(--text-tertiary)" }}
                >
                    {label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </header>
  );
}
