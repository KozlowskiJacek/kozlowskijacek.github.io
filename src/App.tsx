import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import WebAppsPage from "./pages/WebAppsPage";
import VideoMarketingPage from "./pages/VideoMarketingPage";
import ScrollToTop from "./components/layout/ScrollToTop";
import Layout from "./components/layout/Layout";
import { aboutNav, mainNav, videoNav, webAppsNav } from "./data/navigation";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
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
  );
};

export default App;
