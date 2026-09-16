/**
 * 編號步驟條。direction="auto" 時桌機橫向、手機直向；"vertical" 固定直向（卡片內用）。
 * collapseAfter：超過幾步後收進「顯示其餘步驟」。
 */
export function Stepper({
  steps,
  direction = "auto",
  collapseAfter,
}: {
  steps: { title: string; detail?: string }[];
  direction?: "auto" | "vertical";
  collapseAfter?: number;
}) {
  const shown = collapseAfter ? steps.slice(0, collapseAfter) : steps;
  const rest = collapseAfter ? steps.slice(collapseAfter) : [];
  const horizontal = direction === "auto";

  const list = (items: typeof steps, offset: number) => (
    <ol
      start={offset + 1}
      className={
        horizontal
          ? "grid gap-4 md:grid-flow-col md:auto-cols-fr md:gap-0"
          : "space-y-3"
      }
    >
      {items.map((s, i) => {
        const n = offset + i + 1;
        return (
          <li key={s.title} className={horizontal ? "relative md:pr-6" : "flex gap-3"}>
            {horizontal ? (
              <>
                <div className="flex items-center gap-3">
                  <StepDot n={n} />
                  {i < items.length - 1 && (
                    <span aria-hidden="true" className="hidden h-px flex-1 bg-hairline md:block" />
                  )}
                </div>
                <p className="title-sm mt-3">{s.title}</p>
                {s.detail && <p className="body-sm mt-1 text-body">{s.detail}</p>}
              </>
            ) : (
              <>
                <StepDot n={n} />
                <div className="min-w-0 pt-0.5">
                  <p className="title-sm">{s.title}</p>
                  {s.detail && <p className="body-md mt-0.5 text-body">{s.detail}</p>}
                </div>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );

  return (
    <div>
      {list(shown, 0)}
      {rest.length > 0 && (
        <details className="group mt-3">
          <summary className="caption cursor-pointer list-none text-primary-ink marker:content-none">
            <span className="group-open:hidden">顯示其餘 {rest.length} 個步驟 ▾</span>
            <span className="hidden group-open:inline">收合步驟 ▴</span>
          </summary>
          <div className="mt-3">{list(rest, shown.length)}</div>
        </details>
      )}
    </div>
  );
}

function StepDot({ n }: { n: number }) {
  return (
    <span className="font-display lining-nums flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-strong text-base text-on-primary">
      {n}
    </span>
  );
}
