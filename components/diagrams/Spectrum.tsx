/**
 * 能力 ←→ 限制 光譜：把「什麼時候可靠、什麼時候不可靠」畫成一條線，標出常見任務的落點。
 * 用在深色底（/how-ai-works 的機制區）。
 * 寬螢幕用浮動標籤＋引線；窄螢幕標籤會互相擋住，改為圓點編號＋下方圖例。
 */
type Task = { label: string; pos: number };

const zone = (pos: number) =>
  pos < 0.4
    ? { dot: "bg-accent-teal", text: "可靠" }
    : pos < 0.7
      ? { dot: "bg-on-dark-soft", text: "看情況" }
      : { dot: "bg-accent-amber", text: "要小心" };

export function Spectrum({ strong, weak, tasks }: { strong: string; weak: string; tasks: Task[] }) {
  return (
    <div>
      <div className="flex justify-between gap-4 text-sm">
        <span className="text-accent-teal">✓ 可靠：{strong}</span>
        <span className="text-right text-accent-amber">! 小心：{weak}</span>
      </div>

      <div className="relative mt-3 h-2 rounded-full bg-linear-to-r from-accent-teal via-on-dark-soft/40 to-accent-amber">
        {/* 窄螢幕：軌道上的編號圓點 */}
        {tasks.map((t, i) => (
          <span
            key={t.label}
            aria-hidden="true"
            className={`absolute top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-medium text-surface-dark sm:hidden ${zone(t.pos).dot}`}
            style={{ left: `${Math.round(t.pos * 100)}%` }}
          >
            {i + 1}
          </span>
        ))}
      </div>

      {/* 窄螢幕：圖例 */}
      <ol className="mt-4 space-y-1.5 sm:hidden">
        {tasks.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2 text-sm text-on-dark">
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-surface-dark ${zone(t.pos).dot}`}
            >
              {i + 1}
            </span>
            {t.label}
            <span className="text-on-dark-soft">— {zone(t.pos).text}</span>
          </li>
        ))}
      </ol>

      {/* 寬螢幕：浮動標籤 + 引線 */}
      <ul className="relative mt-2 hidden h-24 sm:block" aria-label="常見任務的可靠程度">
        {tasks.map((t, i) => {
          const align = t.pos < 0.2 ? "left" : t.pos > 0.8 ? "right" : "center";
          return (
            <li
              key={t.label}
              className="absolute top-0"
              style={{
                left: `${Math.round(t.pos * 100)}%`,
                transform:
                  align === "left"
                    ? "translateX(-6px)"
                    : align === "right"
                      ? "translateX(calc(-100% + 6px))"
                      : "translateX(-50%)",
              }}
            >
              <span
                aria-hidden="true"
                className={`block h-3 w-3 rounded-full ${zone(t.pos).dot} ${
                  align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block w-px bg-on-dark-soft/50 ${
                  align === "right" ? "ml-auto mr-[5.5px]" : align === "center" ? "mx-auto" : "ml-[5.5px]"
                }`}
                style={{ height: 4 + i * 26 }}
              />
              <span className="block whitespace-nowrap rounded bg-surface-dark-elevated px-2 py-1 text-[13px] text-on-dark">
                {t.label}
                <span className="sr-only">（{zone(t.pos).text}）</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
