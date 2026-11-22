import { useEffect, useState } from "react";

/**
 * Zwraca id sekcji, która przecina środek ekranu.
 * Gdy żadna nie przecina — zwraca `fallbackId`.
 */
const useScrollSpy = (ids: string[], fallbackId: string) => {
  const [activeId, setActiveId] = useState(fallbackId);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id));

    const handleScroll = () => {
      const middle = window.innerHeight / 2;
      const current = [...sections].reverse().find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= middle && rect.bottom >= middle;
      });
      setActiveId(current?.id ?? fallbackId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, fallbackId]);

  return [activeId, setActiveId] as const;
};

export default useScrollSpy;
