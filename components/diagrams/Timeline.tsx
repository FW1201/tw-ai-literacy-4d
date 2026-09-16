/**
 * 依比例的時間條。segments 的 weight 決定寬度（例如分鐘數）。
 * 桌機為一條橫向色帶；手機改為直向清單，避免文字被擠壓。
 */
export function Timeline({
  segments,
  unit,
  highlightIndex,
}: {
  segments: { label: string; weight: number; note?: string }[];
  unit?: string;
  highlightIndex?: number;
}) {
  const total = segments.reduce((a, s) => a + s.weight, 0);
  let acc = 0;

  return (
    <div>
      {/* 桌機：比例色帶 */}
      <ol className="hidden overflow-hidden rounded-lg md:flex" aria-label="時間分配">
        {segments.map((s, i) => {
          const start = acc;
          acc += s.weight;
          const strong = i === highlightIndex;
          return (
            <li
              key={s.label}
              style={{ flexGrow: s.weight, flexBasis: 0 }}
              className={`min-w-0 border-r-2 border-canvas px-4 py-4 last:border-r-0 ${
                strong ? "bg-primary-strong text-on-primary" : i % 2 ? "bg-surface-card" : "bg-surface-cream-strong"
              }`}
            >
              <span className={`caption lining-nums block ${strong ? "text-on-primary" : "text-muted"}`}>
                {unit ? `${start}–${start + s.weight} ${unit}` : `第 ${i + 1} 段`}
              </span>
              <span className={`title-sm mt-1 block ${strong ? "text-on-primary" : ""}`}>{s.label}</span>
              {s.note && (
                <span className={`caption mt-1 block ${strong ? "text-on-primary" : "text-muted"}`}>
                  {s.note}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {unit && (
        <div className="caption lining-nums mt-2 hidden justify-between text-muted md:flex">
          <span>0</span>
          <span>
            {total} {unit}
          </span>
        </div>
      )}

      {/* 手機：直向 */}
      <ol className="space-y-2 md:hidden">
        {segments.map((s, i) => (
          <li
            key={s.label}
            className={`flex items-center gap-4 rounded-md px-4 py-3 ${
              i === highlightIndex ? "bg-primary-strong text-on-primary" : "bg-surface-card"
            }`}
          >
            <span
              className="h-2 shrink-0 rounded-full bg-current opacity-50"
              style={{ width: `${Math.max(12, (s.weight / total) * 120)}px` }}
              aria-hidden="true"
            />
            <span className={`title-sm ${i === highlightIndex ? "text-on-primary" : ""}`}>{s.label}</span>
            <span className={`caption lining-nums ml-auto ${i === highlightIndex ? "text-on-primary" : "text-muted"}`}>
              {s.weight}
              {unit}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
