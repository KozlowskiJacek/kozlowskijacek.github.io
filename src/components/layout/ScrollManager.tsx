import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

/** Jak długo czekamy, aż element kotwicy pojawi się w DOM (np. po doładowaniu leniwej strony). */
const ANCHOR_TIMEOUT_MS = 1500;

/**
 * Zarządza przewijaniem przy nawigacji:
 * - zmiana trasy bez kotwicy → skok na górę strony,
 * - adres z kotwicą (`#sekcja`) → przewinięcie do elementu o tym id
 *   (płynnie w obrębie tej samej strony, od razu po zmianie strony).
 */
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();
  const reduceMotion = useReducedMotion();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const samePage = previousPathname.current === pathname;
    previousPathname.current = pathname;

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    const behavior: ScrollBehavior = samePage && !reduceMotion ? "smooth" : "auto";
    const deadline = performance.now() + ANCHOR_TIMEOUT_MS;
    let frame = 0;

    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
      } else if (performance.now() < deadline) {
        frame = requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
    return () => cancelAnimationFrame(frame);
    // `key` — ponowne kliknięcie tej samej kotwicy też przewija.
  }, [pathname, hash, key, reduceMotion]);

  return null;
};

export default ScrollManager;
