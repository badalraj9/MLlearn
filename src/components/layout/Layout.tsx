import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useUIStore } from "@/store";

export default function Layout() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Skip to content (a11y) */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <Sidebar />

      <div
        className="transition-all duration-200 ease-out"
        style={{
          marginLeft: sidebarCollapsed
            ? "var(--sidebar-collapsed)"
            : "var(--sidebar-width)",
        }}
      >
        <Header />

        <main id="main-content" className="px-8 py-8 animate-fade-in">
          <div className="mx-auto" style={{ maxWidth: "1200px" }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
