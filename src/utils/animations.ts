import type { Variants } from "framer-motion";

export type FadeDirection = "top" | "bottom" | "left" | "right";

export const fadeInVariants = (direction: FadeDirection): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === "top" ? -80 : direction === "bottom" ? 80 : 0,
    x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 2,
      opacity: { duration: 2, delay: 0.6 },
      delay: 0.2,
      ease: [0.9, 0, 0.2, 1] as const,
    },
  },
});
