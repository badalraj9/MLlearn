import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import TopNav from "./TopNav";
import Header from "./Header";

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

  const pageNumber =
    pageNumbers[location.pathname] ??
    (location.pathname.startsWith("/modules") ? "03" : "06");

  useEffect(() => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    if (currentIndex >= 0) {
      prevIndexRef.current = currentIndex;
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-body">
      <div className="monumental-eq monumental-eq--top" aria-hidden="true">
        E = mc^2
      </div>
      <div className="monumental-eq monumental-eq--bottom" aria-hidden="true">
        f(x)
      </div>
      <div className="monumental-eq monumental-eq--corner" aria-hidden="true">
        sum
      </div>

      <div className="math-fragment math-fragment--left" aria-hidden="true">
        J = (1/2m)*sum(y-yhat)^2<br />
        nabla f = grad f<br />
        P(A|B) = P(B|A)P(A)/P(B)<br />
        sigma^2 = var(x)
      </div>
      <div className="math-fragment math-fragment--right" aria-hidden="true">
        E[X] = sum x*P(x)<br />
        d/dx [f(g(x))] = f'g'<br />
        det(A-lambda I) = 0<br />
        softmax(x)_i
      </div>
      <div className="theorem-trace theorem-trace--top-left" aria-hidden="true">
        Cost function<br />
        Gradient descent<br />
        Bayes theorem<br />
        Variance formula
      </div>
      <div className="theorem-trace theorem-trace--bottom-right" aria-hidden="true">
        Chain rule<br />
        Matrix inverse<br />
        KL divergence<br />
        Cross entropy
      </div>
      
      <div className="coordinate-trace" aria-hidden="true" />
      <div className="graph-trace" aria-hidden="true" />
      
      <div className="book-page">
        <TopNav />
        <Header />
        <div className="page-surface">
          <main
            className="page-settle"
            key={location.pathname}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}