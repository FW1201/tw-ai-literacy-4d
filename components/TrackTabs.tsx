"use client";

import { useEffect, useState } from "react";

/**
 * 案例的 track 頁籤。一次只顯示一條 track——卡片由伺服器渲染，
 * 這裡只切換 [data-track] 的 hidden，資料不進 JS bundle。
 */
export function TrackTabs({
  tracks,
}: {
  tracks: { key: string; label: string; count: number }[];
}) {
  const [active, setActive] = useState(tracks[0]?.key);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-track]").forEach((el) => {
      el.hidden = el.dataset.track !== active;
    });
  }, [active]);

  return (
    <div role="tablist" aria-label="案例類別" className="flex flex-wrap gap-2">
      {tracks.map((t) => {
        const on = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => setActive(t.key)}
            className={`inline-flex items-baseline gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
              on ? "bg-primary-strong text-on-primary" : "bg-canvas text-body hover:text-ink"
            }`}
          >
            {t.label}
            <span className={`lining-nums text-xs ${on ? "text-on-primary" : "text-muted"}`}>
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
