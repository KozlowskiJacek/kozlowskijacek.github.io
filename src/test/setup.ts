import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { MotionGlobalConfig } from "framer-motion";
import i18n from "../lib/i18n";

// Animacje framer-motion kończą się natychmiast (AnimatePresence od razu usuwa elementy).
MotionGlobalConfig.skipAnimations = true;

// jsdom nie ma matchMedia ani IntersectionObserver (framer-motion, reducedMotion="user").
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

if (typeof window.IntersectionObserver === "undefined") {
  class IntersectionObserverStub {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  window.IntersectionObserver = IntersectionObserverStub;
}

beforeEach(async () => {
  // Każdy test startuje po polsku (detektor języka w jsdom wybrałby en-US z navigator).
  await i18n.changeLanguage("pl");
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});
