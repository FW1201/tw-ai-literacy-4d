/**
 * 四層堆疊：由上（上位原則）到下（課堂落地）。
 * 每層只顯示「層名＋一句話」，完整說明收在 details 裡。
 */
export function LayerStack({
  layers,
}: {
  layers: {
    order: string;
    label: string;
    short: string;
    title: string;
    detail: string;
    tone: "cream" | "coral";
  }[];
}) {
  return (
    <ol className="relative space-y-2" aria-label="四層定位，由上位原則到課堂落地">
      {layers.map((l, i) => {
        const coral = l.tone === "coral";
        // 越往下越寬，形成倒金字塔的「越來越具體」
        const inset = (layers.length - 1 - i) * 3;
        return (
          <li key={l.order} style={{ marginInline: `${inset}%` }}>
            <details
              className={`group rounded-lg ${
                coral ? "bg-primary-strong text-on-primary" : "border border-hairline bg-canvas"
              }`}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-5 marker:content-none sm:gap-6 sm:px-7">
                <span
                  className={`font-display lining-nums text-3xl leading-none ${
                    coral ? "text-on-primary" : "text-primary"
                  }`}
                >
                  {l.order}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`caption-upper block ${coral ? "text-on-primary" : "text-muted"}`}
                  >
                    {l.label}
                  </span>
                  <span className={`title-md mt-1 block ${coral ? "text-on-primary" : ""}`}>
                    {l.short}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`text-lg transition-transform group-open:rotate-180 ${
                    coral ? "text-on-primary" : "text-muted"
                  }`}
                >
                  ▾
                </span>
              </summary>
              <div
                className={`border-t px-5 pb-5 pt-4 sm:px-7 ${
                  coral ? "border-white/25" : "border-hairline"
                }`}
              >
                <p className={`title-sm ${coral ? "text-on-primary" : ""}`}>{l.title}</p>
                <p className={`body-sm measure mt-1.5 ${coral ? "text-on-primary" : "text-body"}`}>
                  {l.detail}
                </p>
              </div>
            </details>
            {i < layers.length - 1 && (
              <div aria-hidden="true" className="flex justify-center py-0.5 text-muted">
                ↓
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
