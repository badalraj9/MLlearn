import { NavLink } from "react-router-dom";
import { User, Settings } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/modules", label: "Modules" },
  { to: "/papers", label: "Papers" },
  { to: "/about", label: "About" },
  { to: "/graph", label: "Graph" },
];

const userItems = [
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function TopNav() {
  return (
    <nav className="top-nav" aria-label="Primary">
      <div className="top-nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `top-nav-link ${isActive ? "active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="top-nav-links">
        {userItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `top-nav-link ${isActive ? "active" : ""}`}
            title={item.label}
          >
            <item.icon size={18} />
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
