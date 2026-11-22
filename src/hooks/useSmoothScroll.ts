import { useReducedMotion } from "framer-motion";

/** Przewija do sekcji o podanym id — płynnie, chyba że użytkownik ogranicza ruch. */
const useSmoothScroll = () => {
  const reduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return scrollTo;
};

export default useSmoothScroll;
