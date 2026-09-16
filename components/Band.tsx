export type Tone = "canvas" | "soft" | "card" | "dark";

const TONE_BG: Record<Tone, string> = {
  canvas: "bg-canvas",
  soft: "bg-surface-soft",
  card: "bg-surface-card",
  dark: "bg-surface-dark",
};

export function Band({
  id,
  tone,
  children,
}: {
  id?: string;
  tone: Tone;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${TONE_BG[tone]} scroll-mt-28 py-16 sm:py-24 lg:py-section`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  lead,
  onDark = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  onDark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <span className={`caption-upper ${onDark ? "text-primary" : "text-primary-ink"}`}>{eyebrow}</span>
      <h2 className={`display-lg mt-4 ${onDark ? "text-on-dark" : ""}`}>{title}</h2>
      {lead && (
        <p className={`body-md measure mt-5 ${onDark ? "text-on-dark-soft" : "text-body"}`}>{lead}</p>
      )}
    </div>
  );
}

/**
 * 內頁頁首。highlights 是「本頁重點」三點條——每頁都有，讓讀者進頁面第一眼就知道能帶走什麼。
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  highlights,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  highlights?: string[];
}) {
  return (
    <section className="bg-canvas pt-14 pb-10 sm:pt-20 sm:pb-14">
      <div className="shell">
        <span className="caption-upper text-primary-ink">{eyebrow}</span>
        <h1 className="display-lg mt-4 max-w-4xl">{title}</h1>
        <p className="body-md measure mt-5 text-body-strong">{lead}</p>

        {highlights && highlights.length > 0 && (
          <ul className="mt-9 grid gap-3 sm:grid-cols-3" aria-label="本頁重點">
            {highlights.map((h, i) => (
              <li key={h} className="flex gap-3 rounded-lg bg-surface-soft px-5 py-4">
                <span className="font-display lining-nums text-2xl leading-none text-primary-ink">
                  {i + 1}
                </span>
                <span className="body-sm text-body-strong">{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
