import { useId, useRef, useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { fadeIn, reveal } from "../../lib/animations";
import type { FaqItem, SectionCopy, ServiceTone } from "../../data/services/types";
import Section from "../ui/Section";
import ServiceSectionHeader from "./ServiceSectionHeader";
import { toneClasses } from "./tone";

type FAQProps = {
  id: string;
  copy: SectionCopy;
  items: FaqItem[];
  tone: ServiceTone;
  bg?: "primary" | "secondary";
};

/** Klawisze nawigacji między nagłówkami akordeonu → indeks docelowy. */
const targetIndex = (key: string, index: number, last: number): number | undefined => {
  switch (key) {
    case "ArrowDown":
      return index === last ? 0 : index + 1;
    case "ArrowUp":
      return index === 0 ? last : index - 1;
    case "Home":
      return 0;
    case "End":
      return last;
    default:
      return undefined;
  }
};

/**
 * Akordeon pytań (wzorzec WAI-ARIA Accordion):
 * Tab / Enter / Spacja — natywnie (przyciski), ↑ / ↓ — poprzednie / następne pytanie,
 * Home / End — pierwsze / ostatnie.
 */
const FAQ = ({ id, copy, items, tone, bg = "primary" }: FAQProps) => {
  const { t } = useTranslation();
  const baseId = useId();
  const classes = toneClasses[tone];
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (itemId: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target = targetIndex(event.key, index, items.length - 1);
    if (target === undefined) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <Section id={id} bg={bg} className="flex-col">
      <ServiceSectionHeader copy={copy} tone={tone} />

      <motion.div
        className="w-full max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-card"
        variants={fadeIn("bottom", 0.1)}
        {...reveal}
      >
        {items.map((item, index) => {
          const open = openIds.has(item.id);
          const buttonId = `${baseId}-q-${item.id}`;
          const panelId = `${baseId}-a-${item.id}`;

          return (
            <div key={item.id}>
              <h3>
                <button
                  ref={(el) => {
                    buttons.current[index] = el;
                  }}
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-display text-body-lg font-semibold text-fg transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-6"
                >
                  {t(item.questionKey)}
                  <FaChevronDown
                    aria-hidden="true"
                    className={`shrink-0 text-small transition-transform duration-300 motion-reduce:transition-none ${classes.text} ${open ? "rotate-180" : ""}`}
                  />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                <p className="px-5 pb-5 text-body text-fg-secondary sm:px-6">{t(item.answerKey)}</p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </Section>
  );
};

export default FAQ;
