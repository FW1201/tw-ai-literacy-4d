import Link from "next/link";
import { Mark } from "./Mark";
import { disclaimer, nav, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-surface-dark py-16">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <Mark size={52} />
              <div>
                <span className="title-md block text-on-dark">{site.brand}</span>
                <span className="font-display block text-[13px] italic text-on-dark-soft">{site.brandNote}</span>
                <span className="caption text-on-dark-soft">整編：{site.author}</span>
              </div>
            </div>
            <p className="body-sm mt-5 max-w-3xl text-on-dark-soft">{disclaimer}</p>
          </div>

          {/* 頁面名稱與導覽列同源，改名只需改 lib/content.ts 的 nav */}
          <nav aria-label="頁尾頁面連結">
            <p className="caption-upper text-on-dark-soft">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-3 text-on-dark transition-colors hover:text-primary"
                  >
                    <span aria-hidden="true" className="font-display lining-nums text-sm text-on-dark-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="body-sm">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6">
          <span className="body-sm text-on-dark-soft">最後更新：{site.updated}</span>
          <a href={site.repo} target="_blank" rel="noreferrer" className="body-sm text-link text-link-on-dark">
            看原始碼和修改紀錄
          </a>
        </div>
      </div>
    </footer>
  );
}
