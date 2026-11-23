import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import MainPage from "./pages/MainPage";
import Layout from "./components/layout/Layout";
import ScrollManager from "./components/layout/ScrollManager";
import LegacyRedirect from "./components/layout/LegacyRedirect";
import { legacyRedirects, paths } from "./data/navigation";

// Strona główna jest w głównym bundlu, podstrony ładują się na żądanie.
const VideoMarketingPage = lazy(() => import("./pages/VideoMarketingPage"));
const WebAppsPage = lazy(() => import("./pages/WebAppsPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const EmployersPage = lazy(() => import("./pages/EmployersPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Podgląd komponentów tylko w dev — w buildzie produkcyjnym warunek jest stały (false) i moduł znika.
const UiPreviewPage = import.meta.env.DEV ? lazy(() => import("./pages/dev/UiPreviewPage")) : null;

const App = () => {
  return (
    // reducedMotion="user": przy prefers-reduced-motion framer-motion pomija transformacje.
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollManager />
        <Routes>
          {UiPreviewPage && (
            <Route
              path="/dev/ui"
              element={
                <Suspense fallback={null}>
                  <UiPreviewPage />
                </Suspense>
              }
            />
          )}
          <Route element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path={paths.servicesVideo} element={<VideoMarketingPage />} />
            <Route path={paths.servicesWeb} element={<WebAppsPage />} />
            <Route path={paths.portfolio} element={<PortfolioPage />} />
            <Route path={paths.caseStudy} element={<CaseStudyPage />} />
            <Route path={paths.employers} element={<EmployersPage />} />
            <Route path={paths.about} element={<AboutPage />} />
            <Route path={paths.contact} element={<ContactPage />} />
            <Route path={paths.privacy} element={<PrivacyPolicyPage />} />
            {legacyRedirects.map(({ from, to }) => (
              <Route key={from} path={from} element={<LegacyRedirect to={to} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </MotionConfig>
  );
};

export default App;
