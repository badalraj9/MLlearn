import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const sectionLabels: Record<string, string> = {
  math: "Foundations",
  "ml-theory": "Theory",
  "deep-learning": "Deep Learning",
  generative: "Generative",
  "deep-research": "Research",
  "applied-ml": "Applied",
};

export default function Header() {
  const location = useLocation();

  if (location.pathname === "/") return null;

  const pathParts = location.pathname.split("/").filter(Boolean);

  if (pathParts.length === 0) return null;

  const getBreadcrumb = () => {
    const parts = pathParts.map((part, index) => {
      const path = "/" + pathParts.slice(0, index + 1).join("/");
      const label = sectionLabels[part] || part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { path, label };
    });
    return parts;
  };

  const breadcrumbs = getBreadcrumb();

  return (
    <header className="page-header" style={{ 
      position: "fixed", 
      top: 24, 
      left: 40,
      zIndex: 50
    }}>
      {breadcrumbs.length > 0 && (
        <nav className="manuscript-margin" aria-label="Location">
          <span className="margin-label">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.path}>
                <Link to={crumb.path}>{crumb.label}</Link>
                {i < breadcrumbs.length - 1 && " / "}
              </span>
            ))}
          </span>
        </nav>
      )}
    </header>
  );
}