import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TopNav from "./TopNav";
import Header from "./Header";
import LampPull from "./LampPull";

const pageNumbers: Record<string, string> = {
  "/": "01",
  "/modules": "02",
  "/papers": "03",
  "/about": "04",
  "/graph": "05",
};

const pageOrder = ["/", "/modules", "/papers", "/about", "/graph"];

export default function Layout() {
  const location = useLocation();
  const prevIndexRef = useRef<number>(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const pageNumber =
    pageNumbers[location.pathname] ??
    (location.pathname.startsWith("/modules") ? "03" : "06");
  const currentIndex = pageOrder.indexOf(location.pathname);
  const prevPath = currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
  const nextPath =
    currentIndex >= 0 && currentIndex < pageOrder.length - 1
      ? pageOrder[currentIndex + 1]
      : null;

  useEffect(() => {
    if (currentIndex === -1) return;
    const prevIndex = prevIndexRef.current;
    setDirection(currentIndex >= prevIndex ? "forward" : "back");
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  return (
    <div className="min-h-screen font-body">
      <LampPull />
      <div className="book-shell">
        <div className="punch-rail" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="punch-hole-dot" />
          ))}
        </div>
        <div className="book-page">
          <TopNav />
          <Header />
          <div className="page-surface">
            <main
              className={`page-flip page-flip--side page-flip--${direction}`}
              key={location.pathname}
            >
              <Outlet />
            </main>
          </div>
          <div className="page-number" aria-hidden="true">
            Page {pageNumber}
          </div>
          <div className="micro-nav">
            {prevPath ? <Link to={prevPath}>Previous</Link> : <span>Previous</span>}
            {nextPath ? <Link to={nextPath}>Next</Link> : <span>Next</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
