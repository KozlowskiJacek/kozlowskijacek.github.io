// Renderuje scripts/og/og-template.html do public/og/default.png (1200×630)
// przez zainstalowanego Chrome / Edge w trybie headless — bez dodatkowych zależności.
// Użycie: npm run og:render   (inna przeglądarka: CHROME_PATH=/ścieżka/do/chrome npm run og:render)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const browser = candidates.find((path) => existsSync(path));
if (!browser) {
  console.error("Nie znaleziono Chrome/Edge — ustaw CHROME_PATH.");
  process.exit(1);
}

const template = resolve("scripts/og/og-template.html");
const output = resolve("public/og/default.png");
mkdirSync(resolve("public/og"), { recursive: true });

execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--allow-file-access-from-files",
  "--virtual-time-budget=2000",
  "--window-size=1200,630",
  `--screenshot=${output}`,
  pathToFileURL(template).href,
]);

console.log(`✓ ${output}`);
