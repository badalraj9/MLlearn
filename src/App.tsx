import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import ConceptsPage from "@/pages/ConceptsPage";
import ConceptDetailPage from "@/pages/ConceptDetailPage";
import PapersPage from "@/pages/PapersPage";
import PaperDetailPage from "@/pages/PaperDetailPage";
import ConceptGraphPage from "@/pages/ConceptGraphPage";

const mathJaxConfig = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
  },
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "pre"],
  },
};

export default function App() {
  return (
    <MathJaxContext config={mathJaxConfig}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="concepts" element={<ConceptsPage />} />
            <Route path="concepts/:slug" element={<ConceptDetailPage />} />
            <Route path="papers" element={<PapersPage />} />
            <Route path="papers/:id" element={<PaperDetailPage />} />
            <Route path="graph" element={<ConceptGraphPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MathJaxContext>
  );
}
