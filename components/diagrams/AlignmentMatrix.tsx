/** 4D × 教育部原則 × UNESCO CFT 對照表。取代 4D 每張卡上重複的兩行。 */
export function AlignmentMatrix({
  rows,
}: {
  rows: { zh: string; en: string; moe: string; unesco: string }[];
}) {
  const strip = (s: string) => s.replace(/^[^：]+：/, "");
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">4D 框架對照教育部原則與 UNESCO 教師 AI 能力框架</caption>
        <thead>
          <tr className="border-b-2 border-ink/80">
            <th scope="col" className="caption-upper py-3 pr-4 text-muted">4D 環節</th>
            <th scope="col" className="caption-upper py-3 pr-4 text-muted">教育部七項原則</th>
            <th scope="col" className="caption-upper py-3 text-muted">UNESCO AI CFT</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.en} className="border-b border-hairline align-top">
              <th scope="row" className="py-4 pr-4">
                <span className="font-display text-2xl leading-none">{r.zh}</span>
                <span className="caption mt-1 block text-muted">{r.en}</span>
              </th>
              <td className="body-md py-4 pr-4 text-body-strong">{strip(r.moe)}</td>
              <td className="body-sm py-4 text-body">{strip(r.unesco)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
