"use client";

import { useEffect, useState } from "react";
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
 * 卡片是 server component 直接渲染成 HTML 的，避免 150KB 文字變成 JS payload。
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
  const [shown, setShown] = useState(total);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-prompt-card]");
    let visible = 0;
    cards.forEach((card) => {
      const okCat = cat === "all" || card.dataset.category === cat;
      const okFlu = flu === "all" || (card.dataset.fluency ?? "").split(",").includes(flu);
      const show = okCat && okFlu;
      card.hidden = !show;
      if (show) visible++;
    });
    setShown(visible);
  }, [cat, flu]);

  return (
    <div className="rounded-lg border border-hairline bg-canvas p-6">
      <FilterRow label="使用情境">
        <Chip active={cat === "all"} onClick={() => setCat("all")} count={total}>
          全部
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)} count={categoryCounts[c]}>
            {CATEGORY_LABEL[c]}
          </Chip>
        ))}
      </FilterRow>

      <FilterRow label="4D 環節">
        <Chip active={flu === "all"} onClick={() => setFlu("all")} count={total}>
          全部
        </Chip>
        {/* 只列出實際有資料的環節——這批提示詞沒有單獨練「盡責」的 */}
        {FLUENCIES.filter((f) => fluencyCounts[f] > 0).map((f) => (
          <Chip key={f} active={flu === f} onClick={() => setFlu(f)} count={fluencyCounts[f]}>
            {FLUENCY_LABEL[f]}
          </Chip>
        ))}
      </FilterRow>

      <div className="mt-5 border-t border-hairline pt-4">
        <p className="body-sm text-muted">
          顯示 <span className="text-ink">{shown}</span> / {total} 筆
        </p>
        <p className="body-sm mt-1.5 text-muted-soft">
          每一筆都標著「辨識」——不管請 AI 做什麼，檢查產出這一步都省不掉。
        </p>
      </div>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="caption-upper w-24 shrink-0 text-muted-soft">{label}</span>
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
      className={`inline-flex items-baseline gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
        active ? "bg-primary text-on-primary" : "bg-surface-card text-body hover:text-ink"
      }`}
    >
      {children}
      <span className={`lining-nums text-xs ${active ? "text-on-primary/70" : "text-muted-soft"}`}>
        {count}
      </span>
    </button>
  );
}
