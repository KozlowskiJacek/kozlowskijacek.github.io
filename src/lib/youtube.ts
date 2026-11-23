/** Wyciąga ID filmu z adresów watch?v=, youtu.be/, embed/, shorts/ i live/. */
export const parseYouTubeId = (url: string): string | null => {
  try {
    const { hostname, pathname, searchParams } = new URL(url);
    const host = hostname.replace(/^(www\.|m\.)/, "");
    let id: string | null = null;

    if (host === "youtu.be") id = pathname.slice(1).split("/")[0];
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      id = searchParams.get("v") ?? pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] ?? null;
    }

    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
};
