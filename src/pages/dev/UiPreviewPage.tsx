/**
 * Podgląd komponentów design systemu — dostępny tylko w trybie dev pod /dev/ui.
 * Strona nie trafia do buildu produkcyjnego, więc teksty są tu na sztywno (nie idą przez t()).
 */
import { useState, type ReactNode } from "react";
import { FaReact } from "react-icons/fa6";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Tag from "../../components/ui/Tag";
import Container from "../../components/ui/Container";
import Modal from "../../components/ui/Modal";
import SectionHeading from "../../components/ui/SectionHeading";
import YouTubeEmbed from "../../components/ui/YouTubeEmbed";

const swatches = [
  ["background", "bg-background"],
  ["surface", "bg-surface"],
  ["surface-elevated", "bg-surface-elevated"],
  ["border", "bg-border"],
  ["border-strong", "bg-border-strong"],
  ["fg", "bg-fg"],
  ["fg-secondary", "bg-fg-secondary"],
  ["fg-muted", "bg-fg-muted"],
  ["accent", "bg-accent"],
  ["accent-hover", "bg-accent-hover"],
  ["accent-muted", "bg-accent-muted"],
  ["video", "bg-video"],
  ["danger", "bg-danger"],
  ["rating", "bg-rating"],
] as const;

const typeScale = [
  ["display", "text-display font-display"],
  ["h1", "text-h1 font-display"],
  ["h2", "text-h2 font-display"],
  ["h3", "text-h3 font-display"],
  ["body-lg", "text-body-lg"],
  ["body", "text-body"],
  ["small", "text-small"],
] as const;

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-border py-10">
    <h2 className="mb-6 text-small font-medium uppercase tracking-[0.2em] text-fg-muted">{title}</h2>
    {children}
  </section>
);

const UiPreviewPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background py-16 text-fg">
      <Container>
        <SectionHeading as="h1" size="h1" title="Design" accent="system" className="mb-2" />
        <p className="mb-10 text-body-lg text-fg-secondary">Tokens, typography and base components.</p>

        <Block title="Colors">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {swatches.map(([name, cls]) => (
              <div key={name}>
                <div className={`h-16 rounded-xl border border-border ${cls}`} />
                <p className="mt-2 text-small text-fg-secondary">{name}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Typography">
          <div className="space-y-4">
            {typeScale.map(([name, cls]) => (
              <div key={name} className="flex items-baseline gap-6">
                <span className="w-20 shrink-0 text-small text-fg-muted">{name}</span>
                <span className={cls}>Zażółć gęślą jaźń</span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Primary sm</Button>
            <Button>Primary md</Button>
            <Button size="lg">Primary lg</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost link</Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" onClick={() => setOpen(true)}>
              Open modal
            </Button>
          </div>
        </Block>

        <Block title="Headings">
          <div className="space-y-6">
            <SectionHeading title="Moje" accent="projekty" />
            <SectionHeading title="Reklamy i" accent="filmy" tone="video" size="h3" as="h3" />
          </div>
        </Block>

        <Block title="Badge & Tag">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>React</Badge>
            <Badge>TypeScript</Badge>
            <Badge tone="accent">Python</Badge>
            <Badge tone="video">Premiere Pro</Badge>
            <Tag dot="accent">Web</Tag>
            <Tag dot="video">Video</Tag>
            <Tag>Neutral</Tag>
          </div>
        </Block>

        <Block title="Cards">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-h3">Static card</h3>
              <p className="mt-2 text-fg-secondary">Surface elevated, subtle border.</p>
            </Card>
            <Card interactive className="p-6">
              <h3 className="text-h3">Interactive</h3>
              <p className="mt-2 text-fg-secondary">Hover lift + border highlight.</p>
            </Card>
            <Card as="button" interactive className="p-6 text-left">
              <FaReact aria-hidden="true" className="text-4xl text-accent" />
              <h3 className="mt-4 text-h3">Button card</h3>
              <div className="mt-3 flex gap-2">
                <Badge>React</Badge>
                <Badge>Vite</Badge>
              </div>
            </Card>
          </div>
        </Block>

        <Block title="YouTube embed">
          {/* Miniatura → iframe dopiero po kliknięciu. */}
          <div className="max-w-xl">
            <YouTubeEmbed url="https://www.youtube.com/watch?v=aqz-KE-bpKQ" title="Big Buck Bunny" />
          </div>
        </Block>
      </Container>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-h3">Modal</h3>
        <p className="mt-3 text-fg-secondary">Escape, overlay click or the × button closes it.</p>
      </Modal>
    </main>
  );
};

export default UiPreviewPage;
