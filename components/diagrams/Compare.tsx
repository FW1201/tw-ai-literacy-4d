/**
 * A → B 對照：誤解 → 事實、原情境 → 在地化。
 * 桌機左右排、手機上下排，箭頭跟著轉向。
 */
export function Compare({
  fromLabel,
  toLabel,
  from,
  to,
  tone = "light",
  toColor = "primary",
}: {
  fromLabel: string;
  toLabel: string;
  from: string;
  to: string;
  tone?: "light" | "dark";
  toColor?: "primary" | "teal";
}) {
  const dark = tone === "dark";
  const box = dark ? "bg-surface-dark-elevated" : "border border-hairline bg-canvas";
  const fromLabelCls = dark ? "text-accent-amber" : "text-muted";
  const toLabelCls =
    toColor === "teal" ? "text-accent-teal" : dark ? "text-primary" : "text-primary-ink";
  const text = dark ? "text-on-dark" : "text-body-strong";

  return (
    <div className="grid items-stretch gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.25fr)] md:gap-3">
      <div className={`rounded-md p-4 ${box}`}>
        <p className={`caption ${fromLabelCls}`}>{fromLabel}</p>
        <p className={`body-sm mt-1 ${dark ? "text-on-dark-soft line-through decoration-accent-amber/60" : "text-muted"}`}>
          {from}
        </p>
      </div>
      <div
        aria-hidden="true"
        className={`flex items-center justify-center text-xl ${dark ? "text-on-dark-soft" : "text-muted"}`}
      >
        <span className="md:hidden">↓</span>
        <span className="hidden md:inline">→</span>
      </div>
      <div className={`rounded-md p-4 ${box}`}>
        <p className={`caption ${toLabelCls}`}>{toLabel}</p>
        <p className={`body-md mt-1 ${text}`}>{to}</p>
      </div>
    </div>
  );
}
