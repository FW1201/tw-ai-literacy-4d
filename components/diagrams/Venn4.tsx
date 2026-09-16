/**
 * 四機制交疊：一個真實任務同時踩到四個機制。
 * 中央是任務，四角是各機制在這個任務上出的狀況，最後給對應的解法。
 */
export function Venn4({
  task,
  hits,
  fix,
}: {
  task: string;
  hits: { name: string; text: string }[];
  fix: string;
}) {
  return (
    <div>
      <div className="relative grid gap-3 sm:grid-cols-2">
        {hits.map((h, i) => (
          <div
            key={h.name}
            className={`rounded-xl border border-hairline bg-canvas p-5 ${
              [
                // 內側預留 10rem，中央圓（w-72）不會蓋到文字
                "sm:rounded-br-[3rem] sm:pr-40",
                "sm:rounded-bl-[3rem] sm:pl-40 sm:text-right",
                "sm:rounded-tr-[3rem] sm:pr-40",
                "sm:rounded-tl-[3rem] sm:pl-40 sm:text-right",
              ][i]
            }`}
          >
            <p className="caption-upper text-primary-ink">{h.name}</p>
            <p className="body-md mt-1 text-body-strong">{h.text}</p>
          </div>
        ))}

        {/* 中央任務：桌機疊在四格交會處 */}
        <div className="rounded-full bg-primary-strong px-6 py-5 text-center text-on-primary sm:absolute sm:left-1/2 sm:top-1/2 sm:w-72 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:shadow-[0_0_0_8px_var(--color-surface-soft)]">
          <p className="caption text-on-primary">同一個任務</p>
          <p className="title-sm mt-1 text-on-primary">{task}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-4 rounded-lg bg-surface-dark p-5">
        <span className="caption-upper shrink-0 pt-1 text-accent-teal">解法</span>
        <p className="body-md text-on-dark">{fix}</p>
      </div>
    </div>
  );
}
