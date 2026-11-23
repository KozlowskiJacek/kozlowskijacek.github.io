/**
 * Wejście SSR używane tylko przy buildzie: `vite build --ssr src/entry-server.tsx`
 * buduje ten moduł do dist-ssr/, a scripts/prerender.mjs renderuje nim każdą trasę do statycznego HTML.
 */
import { StrictMode } from "react";
import { renderToPipeableStream, type PipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import "./lib/i18n";
import { AppRoutes } from "./App";
import { caseStudyPath } from "./data/navigation";
import { publishedProjects } from "./data/projects";
import { indexableRoutes } from "./data/site";

/** Trasy do prerenderingu: strony statyczne + case studies opublikowanych projektów. */
export const routes = [...indexableRoutes, ...publishedProjects.map((project) => caseStudyPath(project.slug))];

export type RenderResult = {
  /** Gotowy strumień HTML — skrypt prerenderingu podpina go pod strumień Node. */
  pipe: PipeableStream["pipe"];
  /** Tagi <head> zebrane przez <Seo /> (dostępne po zakończeniu renderowania). */
  helmet: () => HelmetServerState | undefined;
};

/** Renderuje trasę; resolve dopiero gdy całość (łącznie z leniwymi stronami) jest gotowa — onAllReady. */
export const render = (url: string) =>
  new Promise<RenderResult>((resolve, reject) => {
    const helmetContext: { helmet?: HelmetServerState } = {};
    let failed: unknown = null;

    const stream = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady() {
          if (failed)
            reject(failed instanceof Error ? failed : new Error(`Prerender failed: ${JSON.stringify(failed)}`));
          else resolve({ pipe: stream.pipe, helmet: () => helmetContext.helmet });
        },
        onShellError: reject,
        onError(error) {
          failed = error;
        },
      },
    );
  });
