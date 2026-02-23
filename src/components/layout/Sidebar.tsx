import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUIStore } from "@/store";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/concepts", label: "Concepts", icon: BookOpen },
  { to: "/papers", label: "Papers", icon: FileText },
  { to: "/graph", label: "Concept Graph", icon: GitBranch },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const location = useLocation();

  return (
    <aside
      className="sidebar fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-200 ease-out"
      style={{
        width: sidebarCollapsed
          ? "var(--sidebar-collapsed)"
          : "var(--sidebar-width)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-6"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: "var(--accent-gradient)", color: "white" }}
            >
              M
            </div>
            <h1
              className="text-lg font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Learn
            </h1>
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mx-auto"
            style={{ background: "var(--accent-gradient)", color: "white" }}
          >
            M
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        <ul className="flex flex-col gap-1" style={{ listStyle: "none" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
                  style={{
                    backgroundColor: isActive
                      ? "var(--accent-subtle)"
                      : "transparent",
                    color: isActive
                      ? "var(--accent-primary)"
                      : "var(--text-secondary)",
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor =
                        "var(--bg-tertiary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                  {!sidebarCollapsed && (
                    <span className="text-sm">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center p-3 mx-3 mb-4 rounded-lg transition-colors duration-150 cursor-pointer"
        style={{
          color: "var(--text-tertiary)",
          backgroundColor: "transparent",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </button>
    </aside>
  );
}
