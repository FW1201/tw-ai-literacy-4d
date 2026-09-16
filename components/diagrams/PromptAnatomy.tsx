/** 提示詞七段結構解剖圖：每段做什麼、主要練到哪個 D。 */
export function PromptAnatomy({
  parts,
}: {
  parts: { part: string; role: string; fluency: string }[];
}) {
  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="提示詞的七個段落">
      {parts.map((p, i) => (
        <li
          key={p.part}
          className={`flex flex-col rounded-lg p-4 ${
            i === parts.length - 1 ? "bg-surface-dark text-on-dark lg:col-span-1" : "bg-surface-card"
          }`}
        >
          <div className="flex items-baseline justify-between gap-2">
            <span
              className={`font-display lining-nums text-2xl leading-none ${
                i === parts.length - 1 ? "text-primary" : "text-primary-ink"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`caption rounded-full px-2 py-0.5 ${
                i === parts.length - 1 ? "bg-white/10 text-on-dark" : "bg-canvas text-muted"
              }`}
            >
              {p.fluency}
            </span>
          </div>
          <p className={`title-md mt-3 ${i === parts.length - 1 ? "text-on-dark" : ""}`}>【{p.part}】</p>
          <p className={`body-sm mt-1 ${i === parts.length - 1 ? "text-on-dark-soft" : "text-body"}`}>
            {p.role}
          </p>
        </li>
      ))}
      <li className="flex items-center rounded-lg border border-dashed border-hairline p-4 sm:col-span-2 lg:col-span-1">
        <p className="body-sm text-body">
          最後一段「成功標準」，是你收到回覆後<strong className="font-medium text-ink">用來核對的清單</strong>，
          也就是「辨識」在提示詞裡的位置。
        </p>
      </li>
    </ol>
  );
}
