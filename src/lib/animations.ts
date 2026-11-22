import type { Transition, Variants } from "framer-motion";

/*
 * Animacje wejścia: krótkie (0.4–0.6 s), ease-out, z niewielkim przesunięciem.
 * Przy `prefers-reduced-motion: reduce` <MotionConfig reducedMotion="user"> (App.tsx)
 * wyłącza transformacje — zostaje samo, szybkie pojawienie się (opacity).
 */

export type Direction = "top" | "bottom" | "left" | "right";

/** easeOutQuint — szybki start, miękkie wyhamowanie. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const OFFSET = 24;

const transition: Transition = { duration: 0.5, ease: EASE_OUT };

const offsetFor = (direction: Direction) => ({
  x: direction === "left" ? -OFFSET : direction === "right" ? OFFSET : 0,
  y: direction === "top" ? -OFFSET : direction === "bottom" ? OFFSET : 0,
});

/** Pojawienie się z lekkim przesunięciem z podanego kierunku. */
export const fadeIn = (direction: Direction = "bottom", delay = 0): Variants => ({
  hidden: { opacity: 0, ...offsetFor(direction) },
  visible: { opacity: 1, x: 0, y: 0, transition: { ...transition, delay } },
});

/** Alias `fadeIn` — używany na podstronach. */
export const slideIn = fadeIn;

/** Kontener listy: dzieci z wariantem `staggerItem` wchodzą kolejno. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Element listy w `staggerContainer`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

/** Propsy motion.* uruchamiające wariant raz, gdy element wejdzie w viewport. */
export const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
} as const;

/** Jak `reveal`, ale animacja startuje, gdy widać większą część elementu. */
export const revealHalf = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.35 },
} as const;
