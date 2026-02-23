import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/home", label: "Home" },
  { to: "/modules", label: "Modules" },
  { to: "/papers", label: "Papers" },
  { to: "/graph", label: "Graph" },
];

export default function TopNav() {
  return (
    <nav className="top-nav" aria-label="Primary">
      <div className="top-nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `top-nav-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
