import { NavLink } from "react-router-dom";

const mainNav = [
  { to: "/", label: "Home" },
  { to: "/modules", label: "Modules" },
  { to: "/papers", label: "Papers" },
  { to: "/about", label: "About" },
];

export default function TopNav() {
  return (
    <nav className="top-nav" aria-label="Primary">
      <div className="nav-dock">
        {mainNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-dock-link ${isActive ? "nav-dock-link--active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}