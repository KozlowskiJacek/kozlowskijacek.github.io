import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import AboutSubSite from "./pages/AboutSubSite";
import WebAppsSubSite from "./pages/WebAppsSubSite";
import VideoMarketingSubSite from "./pages/VideoMarketingSubSite";
import AutoScroll from "./components/AutoScroll";

const App = () => {
  return (
    <Router>
      <AutoScroll />
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/about" element={<AboutSubSite />} />
        <Route path="/web-apps" element={<WebAppsSubSite />} />
        <Route path="/social-video" element={<VideoMarketingSubSite />} />
      </Routes>
    </Router>
  );
};

export default App;
