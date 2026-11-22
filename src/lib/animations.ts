import type { Transition, Variants } from "framer-motion";

export type Direction = "top" | "bottom" | "left" | "right";

const OFFSET = 80;

const offsetFor = (direction: Direction) => ({
  x: direction === "left" ? -OFFSET : direction === "right" ? OFFSET : 0,
  y: direction === "top" ? -OFFSET : direction === "bottom" ? OFFSET : 0,
});

/** Wolne wejście z przesunięciem — sekcje strony głównej. */
export const fadeIn = (direction: Direction): Variants => ({
  hidden: {
    opacity: 0,
    ...offsetFor(direction),
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 2,
      opacity: { duration: 2, delay: 0.6 },
      delay: 0.2,
      ease: [0.9, 0, 0.2, 1],
    },
  },
});

const slideTransition: Transition = { duration: 0.8, ease: "easeOut" };

/** Szybkie wejście z przesunięciem w jednej osi — podstrony. */
export const slideIn = (direction: Direction): Variants => {
  const horizontal = direction === "left" || direction === "right";
  const { x, y } = offsetFor(direction);

  return {
    hidden: horizontal
      ? { opacity: 0, x, transition: slideTransition }
      : { opacity: 0, y, transition: slideTransition },
    visible: horizontal
      ? { opacity: 1, x: 0, transition: slideTransition }
      : { opacity: 1, y: 0, transition: slideTransition },
  };
};

/** Propsy motion.* uruchamiające wariant przy wejściu elementu w viewport. */
export const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: false },
} as const;

/** Jak `reveal`, ale animacja startuje, gdy widać połowę elementu. */
export const revealHalf = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: false, amount: 0.5 },
} as const;
