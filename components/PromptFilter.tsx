"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  FLUENCIES,
  FLUENCY_LABEL,
  type Fluency,
  type PromptCategory,
} from "@/lib/prompts";

/**
 * 篩選器只操作 DOM 的 data-* 屬性，不持有 60 筆提示詞資料——
 * 卡片是 server component 直接渲染成 HTML 的，避免大量文字變成 JS payload。
 */
export function PromptFilter({
  total,
  categoryCounts,
  fluencyCounts,
}: {
  total: number;
  categoryCounts: Record<PromptCategory, number>;
  fluencyCounts: Record<Fluency, number>;
}) {
  const [cat, setCat] = useState<PromptCategory | "all">("all");
  const [flu, setFlu] = useState<Fluency | "all">("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(total);
  const inputId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    const cards = document.querySelectorAll<HTMLElement>("[data-prompt-card]");
    let visible = 0;
    cards.forEach((card) => {
      const okCat = cat === "all" || card.dataset.category === cat;
      const okFlu = flu === "all" || (card.dataset.fluency ?? "").split(",").includes(flu);
      const okQ = !q || (card.dataset.search ?? "").toLowerCase().includes(q);
      const show = okCat && okFlu && okQ;
      card.hidden = !show;
      if (show) visible++;
    });
    setShown(visible);

    // 條件改變後，若結果列表開頭已捲出視窗，把它拉回篩選列正下方——
    // 否則結果變少時，剩下的卡片會藏在黏性篩選列後面，看起來像沒有結果
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const list = document.querySelector<HTMLElement>("[data-prompt-list]");
    const bar = rootRef.current;
    if (!list || !bar) return;
    const barBottom = bar.getBoundingClientRect().bottom;
    if (list.getBoundingClientRect().top < barBottom) {
      window.scrollTo({ top: window.scrollY + list.getBoundingClientRect().top - barBottom - 16 });
    }
  }, [cat, flu, query]);

  const reset = () => {
    setCat("all");
    setFlu("all");
    setQuery("");
  };

  return (
    <div ref={rootRef} className="rounded-lg border border-hairline bg-canvas/95 p-4 shadow-[0_1px_3px_rgba(20,20,19,0.08)] backdrop-blur-sm sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label htmlFor={inputId} className="sr-only">
          搜尋提示詞
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋：例如 差異化、學習單、TOCFL"
          className="h-11 w-full rounded-md border border-hairline bg-canvas px-4 text-base text-ink placeholder:text-muted focus:border-primary-strong lg:w-80"
        />
        <p className="body-sm text-muted lg:ml-auto" aria-live="polite">
          顯示 <span className="lining-nums font-medium text-ink">{shown}</span> / {total} 筆
          {shown !== total && (
            <button type="button" onClick={reset} className="text-link ml-3">
              清除條件
            </button>
          )}
        </p>
      </div>

      <FilterRow label="情境">
        <Chip active={cat === "all"} onClick={() => setCat("all")} count={total}>
          全部
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)} count={categoryCounts[c]}>
            {CATEGORY_LABEL[c]}
          </Chip>
        ))}
      </FilterRow>

      <FilterRow label="4D">
        <Chip active={flu === "all"} onClick={() => setFlu("all")} count={total}>
          全部
        </Chip>
        {/* 只列出實際有資料的環節——這批提示詞沒有單獨練「盡責」的 */}
        {FLUENCIES.filter((f) => fluencyCounts[f] > 0).map((f) => (
          <Chip key={f} active={flu === f} onClick={() => setFlu(f)} count={fluencyCounts[f]}>
            {FLUENCY_LABEL[f]}
          </Chip>
        ))}
        <span className="caption ml-1 self-center text-muted">每一筆都含「辨識」——檢查產出這一步省不掉</span>
      </FilterRow>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="caption-upper w-12 shrink-0 text-muted">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-baseline gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-primary-strong text-on-primary" : "bg-surface-card text-body hover:text-ink"
      }`}
    >
      {children}
      <span className={`lining-nums text-xs ${active ? "text-on-primary" : "text-muted"}`}>
        {count}
      </span>
    </button>
  );
}
