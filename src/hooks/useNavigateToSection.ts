import { useNavigate } from "react-router-dom";
import useSmoothScroll from "./useSmoothScroll";

/** Przejście z podstrony na stronę główną i przewinięcie do wskazanej sekcji. */
const useNavigateToSection = () => {
  const navigate = useNavigate();
  const scrollTo = useSmoothScroll();

  return (id: string) => {
    navigate("/");
    setTimeout(() => scrollTo(id), 100);
  };
};

export default useNavigateToSection;
