import type { Metadata } from "next";
import Link from "next/link";
import { Band, PageHeader } from "@/components/Band";
import { PageNav } from "@/components/PageNav";
import { disclaimer, highlights, nav, sources } from "@/lib/content";

export const metadata: Metadata = {
  title: "資料來源｜AI 素養教育 4D 框架",
  description: "本站每一節內容的出處。整編與在地化改寫，不是原創框架。",
};

/** 來源 → 它支撐的頁面。以來源標籤的關鍵字比對。 */
const USED_ON: [RegExp, string[]][] = [
  [/Framework & Foundations/, ["/framework"]],
  [/Capabilities and Limitations/, ["/how-ai-works"]],
  [/pK–12 Educators/, ["/classroom"]],
  [/Train the Trainer/, ["/workshop"]],
  [/Teaching AI Fluency/, ["/classroom"]],
  [/for students/, ["/classroom"]],
  [/Human Agent Teams/, ["/workshop"]],
  [/教育部/, ["/framework", "/classroom"]],
  [/teachers/, ["/framework"]],
  [/students\./, ["/classroom"]],
  [/課程綱要/, ["/classroom"]],
  [/課程模組設計指南/, ["/framework", "/how-ai-works", "/classroom", "/workshop"]],
  [/Kharbach/, ["/classroom"]],
];

const LABEL = Object.fromEntries(nav.map((n) => [n.href, n.label]));

function usedOn(label: string) {
  return [...new Set(USED_ON.filter(([re]) => re.test(label)).flatMap(([, pages]) => pages))];
}

export default function SourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="資料來源"
        title="每一節內容的出處"
        lead="本站是整編與在地化改寫，不是原創框架。每筆來源都標出它支撐哪一頁。"
        highlights={highlights["/sources"]}
      />

      <Band tone="soft">
        <div className="space-y-12">
          {sources.map((group) => (
            <section key={group.group} aria-labelledby={`g-${group.group}`}>
              <h2 id={`g-${group.group}`} className="title-lg">
                {group.group}
              </h2>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {group.items.map((item) => {
                  const pages = usedOn(item.label);
                  return (
                    <li key={item.label} className="flex flex-col rounded-lg bg-canvas p-5">
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer" className="title-sm text-link">
                          {item.label} ↗
                        </a>
                      ) : (
                        <span className="title-sm">{item.label}</span>
                      )}
                      <p className="body-sm mt-1.5 grow text-body">{item.note}</p>
                      {pages.length > 0 && (
                        <p className="mt-4 flex flex-wrap items-center gap-2 border-t border-hairline pt-3">
                          <span className="caption text-muted">用於</span>
                          {pages.map((p) => (
                            <Link
                              key={p}
                              href={p}
                              className="rounded-full bg-surface-card px-2.5 py-0.5 text-[13px] text-body-strong hover:text-ink"
                            >
                              {LABEL[p]}
                            </Link>
                          ))}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-hairline bg-canvas p-6">
          <p className="caption-upper text-muted">非官方聲明</p>
          <p className="body-md measure mt-2 text-body">{disclaimer}</p>
        </div>
      </Band>

      <PageNav current="/sources" />
    </>
  );
}
