import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import AboutSubSite from "./pages/AboutSubSite";
import Header from "./components/Header";
import WebAppsSubSite from "./pages/WebAppsSubSite";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/*" element={<MainPage />}/>
        <Route path="/about" element={<AboutSubSite />}/>
        <Route path="/web_apps" element={<WebAppsSubSite />}/>
      </Routes>
    </Router>
  );
}

export default App;
