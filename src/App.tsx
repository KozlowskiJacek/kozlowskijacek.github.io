import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import WebAppsPage from "./pages/WebAppsPage";
import VideoMarketingPage from "./pages/VideoMarketingPage";
import ScrollToTop from "./components/layout/ScrollToTop";
import Layout from "./components/layout/Layout";
import { aboutNav, mainNav, videoNav, webAppsNav } from "./data/navigation";

// Podgląd komponentów tylko w dev — w buildzie produkcyjnym warunek jest stały (false) i moduł znika.
const UiPreviewPage = import.meta.env.DEV ? lazy(() => import("./pages/dev/UiPreviewPage")) : null;

const App = () => {
  return (
    // reducedMotion="user": przy prefers-reduced-motion framer-motion pomija transformacje.
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollToTop />
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
          <Route element={<Layout nav={mainNav} />}>
            <Route path="/*" element={<MainPage />} />
          </Route>
          <Route element={<Layout nav={aboutNav} withFooter={false} />}>
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route element={<Layout nav={webAppsNav} withFooter={false} />}>
            <Route path="/web-apps" element={<WebAppsPage />} />
          </Route>
          <Route element={<Layout nav={videoNav} withFooter={false} />}>
            <Route path="/social-video" element={<VideoMarketingPage />} />
          </Route>
        </Routes>
      </Router>
    </MotionConfig>
  );
};

export default App;
