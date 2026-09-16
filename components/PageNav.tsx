import Link from "next/link";
import { nav } from "@/lib/content";

/** 內頁底部的上一頁／下一頁，順序依導覽列。 */
export function PageNav({ current }: { current: string }) {
  const i = nav.findIndex((n) => n.href === current);
  const prev = i > 0 ? nav[i - 1] : { href: "/", label: "首頁" };
  const next = i >= 0 && i < nav.length - 1 ? nav[i + 1] : null;

  return (
    <nav aria-label="頁面導覽" className="border-t border-hairline bg-canvas py-10">
      <div className="shell grid gap-4 sm:grid-cols-2">
        <Link
          href={prev.href}
          className="lift group rounded-lg border border-hairline p-5"
        >
          <span className="caption text-muted">← 上一頁</span>
          <span className="title-md mt-1 block">{prev.label}</span>
        </Link>
        {next && (
          <Link
            href={next.href}
            className="lift group rounded-lg border border-hairline p-5 text-right sm:col-start-2"
          >
            <span className="caption text-muted">下一頁 →</span>
            <span className="title-md mt-1 block">{next.label}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
