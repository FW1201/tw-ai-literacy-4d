/**
 * 所有概念圖的統一外框：標題 → 圖 → 圖說 → 來源。
 * 一致性規則見 DESIGN.md「Local overrides / Diagrams」。
 */
export function Figure({
  title,
  caption,
  source,
  tone = "light",
  children,
}: {
  title?: string;
  caption?: string;
  source?: string;
  tone?: "light" | "dark";
  children: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <figure
      className={`reveal rounded-lg p-6 sm:p-8 ${
        dark ? "bg-surface-dark-soft" : "border border-hairline bg-canvas"
      }`}
    >
      {title && (
        <p className={`caption-upper ${dark ? "text-on-dark-soft" : "text-muted"}`}>{title}</p>
      )}
      <div className={title ? "mt-5" : ""}>{children}</div>
      {(caption || source) && (
        <figcaption
          className={`mt-6 border-t pt-4 ${dark ? "border-white/10" : "border-hairline"}`}
        >
          {caption && (
            <p className={`body-sm ${dark ? "text-on-dark-soft" : "text-body"}`}>{caption}</p>
          )}
          {source && (
            <p className={`caption mt-1.5 ${dark ? "text-on-dark-soft" : "text-muted"}`}>
              來源：{source}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/** 視覺隱藏、螢幕閱讀器可讀。 */
export function SrOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
