import { NavLink } from "react-router-dom";
import { Home, BookOpen, FileText, GitBranch, Sun, Moon } from "lucide-react";
import { useUIStore } from "@/store";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/concepts", label: "Concepts", icon: BookOpen },
  { to: "/papers", label: "Papers", icon: FileText },
  { to: "/graph", label: "Graph", icon: GitBranch },
];

export default function TopNav() {
  const { darkMode, toggleDarkMode } = useUIStore();

  return (
    <nav className="w-full flex justify-center pt-8 pb-4 bg-[var(--bg-primary)]">
      {/* The "Binder" Strip */}
      <div
        className="flex items-center gap-8 px-10 py-3 relative"
        style={{
          background: "var(--bg-secondary)",
          borderRadius: "16px",
          boxShadow: "0 4px 20px -2px rgba(0,0,0,0.05)",
          border: "1px solid var(--border)"
        }}
      >
        {/* Navigation Items */}
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              group flex flex-col items-center gap-1.5 text-sm font-medium transition-all duration-300
              ${isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"}
            `}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <>
                {/* The "Punch Hole" */}
                <div
                  className={`
                    w-3 h-3 rounded-full border-2 transition-all duration-300
                    ${isActive
                      ? "bg-[var(--accent-primary)] border-[var(--accent-primary)] scale-110"
                      : "bg-[var(--bg-primary)] border-[var(--text-tertiary)] group-hover:border-[var(--text-secondary)]"
                    }
                  `}
                  style={{
                    boxShadow: isActive ? "inset 0 1px 3px rgba(0,0,0,0.2)" : "inset 0 1px 2px rgba(0,0,0,0.1)"
                  }}
                />

                {/* Label */}
                <span className="tracking-wide text-[10px] uppercase font-bold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* Divider */}
        <div className="w-px h-8 bg-[var(--border)] mx-2" />

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex flex-col items-center gap-1.5 group cursor-pointer"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-tertiary)",
          }}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <div
            className={`
              w-3 h-3 rounded-full border-2 transition-all duration-300
              bg-[var(--bg-primary)] border-[var(--text-tertiary)] group-hover:border-[var(--text-secondary)]
            `}
          />
          <div className="text-[10px] uppercase font-bold flex items-center gap-1">
             {darkMode ? <Sun size={10} /> : <Moon size={10} />}
             Theme
          </div>
        </button>
      </div>
    </nav>
  );
}
