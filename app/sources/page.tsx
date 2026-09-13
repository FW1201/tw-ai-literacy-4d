import type { Metadata } from "next";
import { Band, PageHeader } from "@/components/Band";
import { sources } from "@/lib/content";

export const metadata: Metadata = {
  title: "資料來源｜AI 素養教育 4D 框架",
  description: "本站每一節內容的出處。整編與在地化改寫，不是原創框架。",
};

export default function SourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="資料來源"
        title="每一節內容的出處"
        lead="本站是整編與在地化改寫，不是原創框架。以下列出全部來源，方便查證與延伸閱讀。"
      />

      <Band tone="soft">
        <div className="space-y-10">
          {sources.map((group) => (
            <div key={group.group}>
              <h2 className="title-lg">{group.group}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label} className="rounded-lg border border-hairline bg-canvas p-5">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="title-sm text-link">
                        {item.label}
                      </a>
                    ) : (
                      <span className="title-sm">{item.label}</span>
                    )}
                    <p className="body-sm mt-1.5 text-muted">{item.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Band>
    </>
  );
}
