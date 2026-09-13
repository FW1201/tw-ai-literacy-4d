export function Band({
  id,
  tone,
  children,
}: {
  id?: string;
  tone: "canvas" | "soft" | "card";
  children: React.ReactNode;
}) {
  const bg =
    tone === "canvas" ? "bg-canvas" : tone === "soft" ? "bg-surface-soft" : "bg-surface-card";
  return (
    <section id={id} className={`${bg} py-16 sm:py-24 lg:py-section`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="caption-upper text-primary">{eyebrow}</span>
      <h2 className="display-lg mt-4">{title}</h2>
      <p className="body-md mt-5 text-body">{lead}</p>
    </div>
  );
}

/** 頁首：每個內頁最上方的標題帶，取代單頁時代的 Hero。 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="bg-canvas pt-14 pb-10 sm:pt-20 sm:pb-14">
      <div className="shell max-w-4xl">
        <span className="caption-upper text-primary">{eyebrow}</span>
        <h1 className="display-lg mt-4">{title}</h1>
        <p className="body-md mt-5 text-body-strong">{lead}</p>
      </div>
    </section>
  );
}
