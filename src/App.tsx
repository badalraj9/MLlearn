import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import IntroPage from "@/pages/IntroPage";
import ModulesPage from "@/pages/ModulesPage";
import ModuleDetailPage from "@/pages/ModuleDetailPage";
import LevelDetailPage from "@/pages/LevelDetailPage";
import TopicPage from "@/pages/TopicPage";
import PapersPage from "@/pages/PapersPage";
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
            <Route path="about" element={<IntroPage />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="modules/:moduleId" element={<ModuleDetailPage />} />
            <Route
              path="modules/:moduleId/levels/:levelId"
              element={<LevelDetailPage />}
            />
            <Route
              path="modules/:moduleId/levels/:levelId/chapters/:chapterId/topics/:topicId"
              element={<TopicPage />}
            />
            <Route path="papers" element={<PapersPage />} />
            <Route path="graph" element={<ConceptGraphPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MathJaxContext>
  );
}
