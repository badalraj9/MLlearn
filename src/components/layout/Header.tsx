import { Link, useLocation } from "react-router-dom";

const routeLabels: Record<string, string> = {
  home: "Home",
  modules: "Modules",
  papers: "Papers",
  graph: "Concept Graph",
};

export default function Header() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  if (pathParts.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {pathParts.map((part, index) => {
        const path = "/" + pathParts.slice(0, index + 1).join("/");
        const label =
          routeLabels[part] ||
          part
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        return (
          <span key={path}>
            <span className="breadcrumb-sep">/</span>
            <Link to={path}>{label}</Link>
          </span>
        );
      })}
    </nav>
  );
}
