const pairs = [
  {
    top: { zh: "委託", en: "Delegation" },
    bottom: { zh: "盡責", en: "Diligence" },
    caption: "交出多少 ↔ 負責多少",
  },
  {
    top: { zh: "描述", en: "Description" },
    bottom: { zh: "辨識", en: "Discernment" },
    caption: "講清楚 ↔ 看得出哪裡不對",
  },
];

export function LoopDiagram() {
  return (
    <div className="rounded-xl bg-surface-dark p-6 sm:p-8">
      <p className="caption-upper text-on-dark-soft">The two loops</p>
      <p className="title-md mt-2 text-on-dark">四個動作，兩組循環</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
        {pairs.map((pair) => (
          <div key={pair.top.zh} className="flex flex-col items-stretch gap-2">
            <Node zh={pair.top.zh} en={pair.top.en} />
            <div className="flex items-center justify-center py-0.5" aria-hidden="true">
              <svg width="14" height="34" viewBox="0 0 14 34" fill="none">
                <path
                  d="M7 5v24"
                  stroke="var(--color-primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                />
                <path d="M3.5 8.5 7 4l3.5 4.5" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 25.5 7 30l3.5-4.5" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <Node zh={pair.bottom.zh} en={pair.bottom.en} />
            <p className="mt-1 text-center text-[12px] leading-snug text-on-dark-soft">{pair.caption}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-on-dark-soft">
        這四件事不必照順序做。交給 AI 的越多，事後就要檢查得越仔細；話說得越清楚，越容易看出結果哪裡不對。
      </p>
    </div>
  );
}

function Node({ zh, en }: { zh: string; en: string }) {
  return (
    <div className="rounded-lg bg-surface-dark-elevated px-3 py-4 text-center">
      <p className="font-display text-2xl leading-none text-on-dark">{zh}</p>
      <p className="mt-1.5 text-[11px] tracking-wide text-on-dark-soft">{en}</p>
    </div>
  );
}
