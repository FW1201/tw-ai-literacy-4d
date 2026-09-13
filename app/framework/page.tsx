import type { Metadata } from "next";
import { Band, PageHeader } from "@/components/Band";
import { ConceptPlayer } from "@/components/ConceptPlayer";
import { fourD, loops } from "@/lib/content";

export const metadata: Metadata = {
  title: "4D 框架｜AI 素養教育 4D 框架",
  description: "委託・描述・辨識・盡責——四個動作、兩組循環，以及它們對應到教育部原則與 UNESCO 能力的哪一格。",
};

export default function FrameworkPage() {
  return (
    <>
      <PageHeader
        eyebrow="4D 框架"
        title="委託・描述・辨識・盡責"
        lead="一句話記住：委派多少、講清楚什麼、看得出哪裡不對、最後誰負責——四個問題問完，一輪 AI 協作才算做完。"
      />

      <Band tone="canvas">
        <div className="grid gap-5 md:grid-cols-2">
          {fourD.map((d) => (
            <article key={d.en} className="rounded-lg bg-surface-card p-8">
              <div className="flex items-baseline gap-3">
                <h2 className="display-sm">{d.zh}</h2>
                <span className="caption text-muted">{d.en}</span>
              </div>
              <p className="title-sm mt-4 text-body-strong">{d.question}</p>
              <p className="body-sm mt-3 text-body">{d.detail}</p>
              <dl className="mt-6 space-y-1.5 border-t border-hairline pt-5">
                <div className="body-sm text-muted">{d.moe}</div>
                <div className="body-sm text-muted">{d.unesco}</div>
              </dl>
            </article>
          ))}
        </div>
      </Band>

      <section className="bg-surface-dark py-16 sm:py-24 lg:py-section">
        <div className="shell">
          <span className="caption-upper text-primary">概念動畫</span>
          <h2 className="display-lg mt-4 max-w-3xl text-on-dark">兩組循環實際怎麼轉</h2>
          <p className="body-md mt-5 max-w-2xl text-on-dark-soft">
            描述↔辨識是快速來回的戰術迭代，委託↔盡責是框住整件事的策略問責。動畫可暫停、可拉時間軸，適合直接投影講解。
          </p>
          <div className="mt-10">
            <ConceptPlayer id="four-d-loops" />
          </div>
        </div>
      </section>

      <Band tone="soft">
        <div className="grid gap-5 md:grid-cols-2">
          {loops.map((loop) => (
            <div key={loop.title} className="rounded-lg border border-hairline bg-canvas p-7">
              <div className="flex items-baseline gap-3">
                <h3 className="title-md">{loop.title}</h3>
                <span className="caption text-muted">{loop.subtitle}</span>
              </div>
              <p className="body-sm mt-2 text-body">{loop.detail}</p>
            </div>
          ))}
        </div>
      </Band>
    </>
  );
}
