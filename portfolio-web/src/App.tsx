import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import AboutSubSite from "./pages/AboutSubSite";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/*" element={<MainPage/>}/>
        <Route path="/about" element={<AboutSubSite/>}/>
        <Route path="/web_app" element={<AboutSubSite/>}/>
      </Routes>
    </Router>
  );
}

export default App;
