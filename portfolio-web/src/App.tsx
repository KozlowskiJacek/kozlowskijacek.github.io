import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import AboutSubSite from "./pages/AboutSubSite";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainPage/>}/>
        <Route path="/about" element={<AboutSubSite/>}/>
      </Routes>
    </Router>
  );
}

export default App;
