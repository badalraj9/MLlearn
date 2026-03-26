import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import IntroPage from "@/pages/IntroPage";
import ModulesPage from "@/pages/ModulesPage";
import ModuleDetailPage from "@/pages/ModuleDetailPage";
import TopicPage from "@/pages/TopicPage";
import ChapterPage from "@/pages/ChapterPage";
import PapersPage from "@/pages/PapersPage";
import ConceptGraphPage from "@/pages/ConceptGraphPage";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import SettingsPage from "@/pages/Settings";
import ProfilePage from "@/pages/Profile";
import PaperDetailPage from "@/pages/PaperDetailPage";
import ConceptsPage from "@/pages/ConceptsPage";
import ConceptDetailPage from "@/pages/ConceptDetailPage";
import { supabase } from "@/lib/supabase";

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
          {/* Auth pages - no layout wrapper */}
          <Route path="/signin" element={<SignInPage supabase={supabase} />} />
          <Route path="/signup" element={<SignUpPage supabase={supabase} />} />
          
          {/* Main app with layout */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<IntroPage />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="modules/:moduleId" element={<ModuleDetailPage />} />
            <Route
              path="modules/:moduleId/topics/:topicId"
              element={<TopicPage />}
            />
            <Route
              path="modules/:moduleId/topics/:topicId/chapters/:chapterId"
              element={<ChapterPage />}
            />
            <Route path="papers" element={<PapersPage />} />
            <Route path="papers/:paperId" element={<PaperDetailPage />} />
            <Route path="concepts" element={<ConceptsPage />} />
            <Route path="concepts/:slug" element={<ConceptDetailPage />} />
            <Route path="graph" element={<ConceptGraphPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MathJaxContext>
  );
}
