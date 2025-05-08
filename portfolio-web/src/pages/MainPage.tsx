import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/HeaderMain";
import Footer from "../components/Footer";
import Home from "./sections/Home";
import About from "./sections/About";
import Services from "./sections/Services";
import Projects from "./sections/Projects";
import TheyTrustedMe from "./sections/TheyTrustedMe";
import Contact from "./sections/Contact";
import MySkills from "./sections/MySkills";

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") return;

    const sectionId = location.pathname.substring(1);
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="font-playfair select-none">
      <Header />
      <Home />
      <About />
      <MySkills />
      <Projects />
      {/* <Services /> */}
      <TheyTrustedMe />
      <Contact />
      <Footer />
    </div>
  );
};

export default MainPage;
