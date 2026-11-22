import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import AboutSubSite from "./pages/AboutSubSite";
import WebAppsSubSite from "./pages/WebAppsSubSite";
import VideoMarketingSubSite from "./pages/VideoMarketingSubSite";
import AutoScroll from "./components/AutoScroll";
import Layout from "./components/layout/Layout";
import { aboutNav, mainNav, videoNav, webAppsNav } from "./data/navigation";

const App = () => {
  return (
    <Router>
      <AutoScroll />
      <Routes>
        <Route element={<Layout nav={mainNav} />}>
          <Route path="/*" element={<MainPage />} />
        </Route>
        <Route element={<Layout nav={aboutNav} withFooter={false} />}>
          <Route path="/about" element={<AboutSubSite />} />
        </Route>
        <Route element={<Layout nav={webAppsNav} withFooter={false} />}>
          <Route path="/web-apps" element={<WebAppsSubSite />} />
        </Route>
        <Route element={<Layout nav={videoNav} withFooter={false} />}>
          <Route path="/social-video" element={<VideoMarketingSubSite />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
