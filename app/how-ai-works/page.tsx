import type { Metadata } from "next";
import { Band, Heading, PageHeader } from "@/components/Band";
import { ConceptPlayer } from "@/components/ConceptPlayer";
import { PageNav } from "@/components/PageNav";
import { Compare } from "@/components/diagrams/Compare";
import { Spectrum } from "@/components/diagrams/Spectrum";
import { Venn4 } from "@/components/diagrams/Venn4";
import { collision, highlights, mechanisms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Generative AI 基本原理｜AI Fluency 4D 框架",
  description: "用白話說明 AI 的四個運作方式：接龍式生成、知識、工作記憶、可控性，每一個都附一支可以投影的動畫。",
};

export default function HowAiWorksPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Generative AI 基本原理"
        title="Generative AI 基本原理"
        lead="先弄懂 AI 是怎麼運作的，才看得出它哪裡出錯。看圖和動畫就好，英文名詞不用背。"
        highlights={highlights["/how-ai-works"]}
      />

      {mechanisms.map((m, i) => (
        <section
          key={m.en}
          id={m.anim}
          className={`scroll-mt-20 py-14 sm:py-20 ${i % 2 === 0 ? "bg-surface-dark" : "bg-surface-dark-soft"}`}
        >
          <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
            <div>
              <p className="caption-upper text-primary">機制 {String(i + 1).padStart(2, "0")}</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="display-md text-on-dark">{m.name}</h2>
                <span className="font-mono text-sm text-on-dark-soft">{m.en}</span>
              </div>
              <p className="body-md measure mt-3 text-on-dark">{m.plain}</p>

              <div className="mt-8">
                <Spectrum {...m.spectrum} />
              </div>

              <div className="mt-6">
                <Compare
                  tone="dark"
                  toColor="teal"
                  fromLabel="常見誤解"
                  toLabel="實際上"
                  from={m.myth}
                  to={m.reality}
                />
              </div>

              <div className="mt-6 flex gap-4 rounded-lg border border-primary/40 p-5">
                <span aria-hidden="true" className="font-display text-3xl leading-none text-primary">
                  ?
                </span>
                <div>
                  <p className="caption text-primary">帶進課堂的提問</p>
                  <p className="title-md mt-1 text-on-dark">{m.prompt}</p>
                </div>
              </div>
            </div>

            <div>
              <ConceptPlayer id={m.anim} />
            </div>
          </div>
        </section>
      ))}

      <Band tone="soft">
        <Heading
          eyebrow="放在一起看"
          title="常常一起出現"
          lead="結果怪怪的時候，先想想是哪幾個原因同時出現，再決定怎麼修。"
        />
        <div className="mt-10">
          <Venn4
            task={collision.task}
            fix={collision.fix}
            hits={mechanisms.map((m) => ({
              name: m.name,
              text: collision.hits[m.anim],
            }))}
          />
        </div>
      </Band>

      <PageNav current="/how-ai-works" />
    </>
  );
}
