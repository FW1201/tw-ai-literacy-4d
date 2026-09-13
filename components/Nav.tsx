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
    <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-sm border-b border-hairline-soft">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Mark />
          <span className="title-sm tracking-tight">{site.title}</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-surface-card text-ink"
                    : "text-muted hover:text-ink hover:bg-surface-card"
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

      {open && (
        <div className="xl:hidden border-t border-hairline-soft bg-canvas">
          <div className="shell py-4 flex flex-col gap-1">
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
      )}
    </header>
  );
}
