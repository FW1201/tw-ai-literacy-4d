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
    <div className="reveal max-w-3xl">
      <span className={`caption-upper ${onDark ? "text-primary" : "text-primary-ink"}`}>{eyebrow}</span>
      <h2 className={`display-lg mt-4 ${onDark ? "text-on-dark" : ""}`}>{title}</h2>
      {lead && (
        <p className={`body-md measure mt-5 ${onDark ? "text-on-dark-soft" : "text-body"}`}>{lead}</p>
      )}
    </div>
  );
}

/**
 * 內頁頁首：頁碼＋短標題＋一句導言，下方是「本頁重點」三點條。
 * 頁碼取自導覽列順序，右側以大號淡字重複一次，讓每頁的開頭有一致的節奏。
 */
export function PageHeader({
  index,
  eyebrow,
  title,
  lead,
  highlights,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  highlights?: string[];
}) {
  return (
    <section className="page-header relative overflow-hidden bg-canvas pt-14 pb-10 sm:pt-20 sm:pb-14">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-4 hidden select-none font-display text-[15rem] leading-none text-surface-card lining-nums md:block lg:right-[max(1.5rem,calc(50%-600px+1.5rem))]"
      >
        {index}
      </span>
      <div className="shell relative">
        <span className="rule-grow" aria-hidden="true" />
        <p className="caption-upper mt-5 text-primary-ink">
          <span className="lining-nums">{index}</span>
          <span className="mx-2 text-muted-soft" aria-hidden="true">／</span>
          {eyebrow}
        </p>
        <h1 className="display-xl mt-3 max-w-3xl">{title}</h1>
        <p className="body-md measure mt-5 text-body-strong">{lead}</p>

        {highlights && highlights.length > 0 && (
          <ul className="mt-10 grid gap-3 sm:grid-cols-3" aria-label="本頁重點">
            {highlights.map((h, i) => (
              <li
                key={h}
                style={{ animationDelay: `${160 + i * 80}ms` }}
                className="highlight-in flex items-center gap-3 rounded-lg border border-hairline-soft bg-surface-soft px-5 py-4"
              >
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
