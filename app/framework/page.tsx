import type { Metadata } from "next";
import { Band, Heading, PageHeader } from "@/components/Band";
import { ConceptPlayer } from "@/components/ConceptPlayer";
import { PageNav } from "@/components/PageNav";
import { Figure } from "@/components/diagrams/Figure";
import { AlignmentMatrix } from "@/components/diagrams/AlignmentMatrix";
import { fourD, highlights, loops } from "@/lib/content";

export const metadata: Metadata = {
  title: "4D 框架｜AI 素養教育 4D 框架",
  description: "委託・描述・辨識・盡責——四個動作、兩組循環，以及它們對應到教育部原則與 UNESCO 能力的哪一格。",
};

/** 第一句當摘要，其餘收進延伸說明。 */
function splitFirst(text: string) {
  const i = text.indexOf("。");
  if (i < 0 || i === text.length - 1) return { first: text, rest: "" };
  return { first: text.slice(0, i + 1), rest: text.slice(i + 1) };
}

export default function FrameworkPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="4D 框架"
        title="四個動作"
        lead="委託、描述、辨識、盡責——問完這四題，一輪 AI 協作才算做完。"
        highlights={highlights["/framework"]}
      />

      <Band tone="card">
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {fourD.map((d, i) => {
            const { first, rest } = splitFirst(d.detail);
            return (
              <li key={d.en} className="reveal lift flex flex-col rounded-lg border border-transparent bg-canvas p-6">
                <div className="flex items-baseline justify-between">
                  <h2 className="display-md">{d.zh}</h2>
                  <span className="font-display lining-nums text-2xl text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="caption text-muted">{d.en}</p>
                <p className="title-md mt-5 text-ink">{d.question}</p>
                <p className="body-md mt-2 grow text-body">{first}</p>
                {rest && (
                  <details className="mt-4">
                    <summary className="caption cursor-pointer list-none text-primary-ink marker:content-none">
                      延伸說明 ▾
                    </summary>
                    <p className="body-sm mt-2 text-body">{rest}</p>
                  </details>
                )}
              </li>
            );
          })}
        </ol>
      </Band>

      <section className="bg-surface-dark py-16 sm:py-24 lg:py-section">
        <div className="shell">
          <Heading
            onDark
            eyebrow="動畫"
            title="兩組循環"
            lead="可暫停、可拖曳，適合直接投影。"
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <ConceptPlayer id="four-d-loops" />
            <dl className="space-y-4">
              {loops.map((loop, i) => (
                <div key={loop.title} className="rounded-lg bg-surface-dark-soft p-6">
                  <dt className="flex items-baseline gap-3">
                    <span className="caption-upper text-primary">{i === 0 ? "策略問責" : "戰術迭代"}</span>
                  </dt>
                  <dd className="mt-2">
                    <p className="title-lg text-on-dark">{loop.title}</p>
                    <p className="body-md mt-2 text-on-dark-soft">{loop.detail}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Band tone="soft">
        <Heading
          eyebrow="對照"
          title="原則與能力"
          lead="4D 不是新規範，是把既有原則落到動作上。"
        />
        <div className="mt-10">
          <Figure
            source="教育部《高級中等以下學校人工智慧使用和學習指引》（2026）；UNESCO AI Competency Framework for Teachers（2024）"
          >
            <AlignmentMatrix rows={fourD} />
          </Figure>
        </div>
      </Band>

      <PageNav current="/framework" />
    </>
  );
}
