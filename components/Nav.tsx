"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "./Mark";
import { nav, site } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 換頁後關閉行動版選單
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-hairline-soft bg-canvas/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group/brand flex items-center gap-3 shrink-0">
          <Mark size={36} />
          <span className="title-sm tracking-tight transition-colors group-hover/brand:text-primary-ink">
            {site.title}
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                data-active={active || undefined}
                className={`nav-link whitespace-nowrap px-3 py-2 text-sm font-medium ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <a href={site.repo} target="_blank" rel="noreferrer" className="btn btn-secondary">
            GitHub
          </a>
          <Link href="/prompts" className="btn btn-primary">
            提示詞庫
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="切換選單"
          className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* 行動版選單：用 grid-rows 0fr→1fr 做高度展開，關閉時 inert 讓鍵盤跳過 */}
      <div
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out xl:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className={`overflow-hidden bg-canvas transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
          <div className="shell flex flex-col gap-1 border-t border-hairline-soft py-4">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3 py-3 rounded-md text-base font-medium ${
                    active ? "bg-surface-card text-ink" : "text-body hover:bg-surface-card"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={site.repo}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-3 rounded-md text-base font-medium text-body hover:bg-surface-card"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
