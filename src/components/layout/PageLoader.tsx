import { useTranslation } from "react-i18next";

/** Lekki wskaźnik ładowania podstrony (fallback dla Suspense). */
const PageLoader = () => {
  const { t } = useTranslation();

  return (
    <div role="status" className="grid min-h-[100svh] place-items-center bg-background">
      <span
        aria-hidden="true"
        className="h-8 w-8 rounded-full border-2 border-border-strong border-t-accent motion-safe:animate-spin"
      />
      <span className="sr-only">{t("pages.loading")}</span>
    </div>
  );
};

export default PageLoader;
