import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

// Ta sama konfiguracja co aplikacja (pluginy, presety obrazów, __CV_FILES__) + ustawienia testów.
export default mergeConfig(
  viteConfig({ command: "serve", mode: "test", isSsrBuild: false, isPreview: false }),
  defineConfig({
    test: {
      // Zmienne EmailJS w testach są mockowane — wynik nie zależy od lokalnego .env.
      env: {
        VITE_EMAILJS_SERVICE_ID: "",
        VITE_EMAILJS_TEMPLATE_ID: "",
        VITE_EMAILJS_PUBLIC_KEY: "",
      },
      projects: [
        {
          // Komponenty React w jsdom.
          extends: true,
          test: {
            name: "dom",
            environment: "jsdom",
            setupFiles: ["./src/test/setup.ts"],
            include: ["src/**/*.test.{ts,tsx}"],
          },
        },
        {
          // Skrypty Node (scripts/*.mjs).
          extends: true,
          test: {
            name: "node",
            environment: "node",
            include: ["scripts/**/*.test.mjs"],
          },
        },
      ],
    },
  }),
);
