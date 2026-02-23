import { Outlet, useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col font-body"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Skip to content (a11y) */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Top Navigation */}
      <TopNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full max-w-[1000px] mx-auto px-6">
        {/* Breadcrumbs */}
        <Header />

        <main
            id="main-content"
            className="flex-1 animate-page-enter"
            key={location.pathname}
        >
            <Outlet />
        </main>
      </div>
    </div>
  );
}
