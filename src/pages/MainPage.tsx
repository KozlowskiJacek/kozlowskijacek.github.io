import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "../sections/Home";
import About from "../sections/About";
import MySkills from "../sections/MySkills";
import Projects from "../sections/Projects";
import TheyTrustedMe from "../sections/TheyTrustedMe";
import Contact from "../sections/Contact";

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
    <>
      <Home />
      <About />
      <MySkills />
      <Projects />
      <TheyTrustedMe />
      <Contact />
    </>
  );
};

export default MainPage;
