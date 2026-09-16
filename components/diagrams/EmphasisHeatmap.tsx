const COLS = [
  { key: "delegation", zh: "委託" },
  { key: "description", zh: "描述" },
  { key: "discernment", zh: "辨識" },
  { key: "diligence", zh: "盡責" },
] as const;

type Key = (typeof COLS)[number]["key"];

const LEVEL_LABEL = ["", "淺嘗", "兼顧", "主軸"];
// 以 primary 的不透明度表示側重程度；3 級改實色＋白字確保對比
const LEVEL_CLS = [
  "",
  "bg-primary/15 text-body-strong",
  "bg-primary/40 text-ink",
  "bg-primary-strong text-on-primary",
];

/** 列＝學段、欄＝4D，深淺＝側重程度。 */
export function EmphasisHeatmap({
  rows,
}: {
  rows: { band: string; emphasis: Record<Key, number> }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-separate border-spacing-1.5 text-center">
        <caption className="sr-only">各學段在 4D 四個環節的側重程度</caption>
        <thead>
          <tr>
            <th scope="col" className="w-28" />
            {COLS.map((c) => (
              <th key={c.key} scope="col" className="font-display pb-1 text-xl font-medium">
                {c.zh}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.band}>
              <th scope="row" className="title-sm pr-3 text-left">
                {r.band}
              </th>
              {COLS.map((c) => {
                const v = r.emphasis[c.key];
                return (
                  <td key={c.key} className={`rounded-md py-4 text-sm font-medium ${LEVEL_CLS[v]}`}>
                    {LEVEL_LABEL[v]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="caption mt-3 text-muted">顏色愈深＝該學段愈需要刻意練習這個環節</p>
    </div>
  );
}
