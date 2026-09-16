import { Mark } from "./Mark";
import { disclaimer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-surface-dark py-16">
      <div className="shell">
        <div className="flex items-center gap-2.5">
          <Mark color="var(--color-on-dark)" />
          <span className="title-sm text-on-dark">{site.title}</span>
        </div>
        <p className="body-sm mt-5 max-w-3xl text-on-dark-soft">{disclaimer}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6">
          <span className="body-sm text-on-dark-soft">整編：{site.author}</span>
          <span className="body-sm text-on-dark-soft">最後更新：{site.updated}</span>
          <a href={site.repo} target="_blank" rel="noreferrer" className="body-sm text-link text-link-on-dark">
            原始碼與內容修訂紀錄
          </a>
        </div>
      </div>
    </footer>
  );
}
