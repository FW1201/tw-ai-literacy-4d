import type { Metadata } from "next";
import { Band, Heading, PageHeader } from "@/components/Band";
import { CopyButton } from "@/components/CopyButton";
import { PageNav } from "@/components/PageNav";
import { PromptBody } from "@/components/PromptBody";
import { PromptFilter } from "@/components/PromptFilter";
import { Figure } from "@/components/diagrams/Figure";
import { PromptAnatomy } from "@/components/diagrams/PromptAnatomy";
import { highlights, promptAnatomy } from "@/lib/content";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  FLUENCIES,
  FLUENCY_LABEL,
  PROMPTS,
  type Fluency,
  type PromptCategory,
} from "@/lib/prompts";

const categoryCounts = Object.fromEntries(
  CATEGORIES.map((c) => [c, PROMPTS.filter((p) => p.category === c).length])
) as Record<PromptCategory, number>;

const fluencyCounts = Object.fromEntries(
  FLUENCIES.map((f) => [f, PROMPTS.filter((p) => p.fluency.includes(f)).length])
) as Record<Fluency, number>;

export const metadata: Metadata = {
  title: "提示詞庫｜AI 素養教育 4D 框架",
  description: "60 筆可直接複製使用的 Claude 教學提示詞，依使用情境與 4D 環節分類。",
};

export default function PromptsPage() {
  return (
    <>
      <PageHeader
        eyebrow="提示詞庫"
        title={`可以直接貼進 Claude 的 ${PROMPTS.length} 筆提示詞`}
        lead="每一筆都是完整成品。方括號的地方換成你自己的年級與主題即可。"
        highlights={highlights["/prompts"]}
      />

      <Band tone="card">
        <Heading
          eyebrow="先看懂結構"
          title="每一筆提示詞，都是這七段"
          lead="知道每段在做什麼，改寫時就知道該動哪裡。"
        />
        <div className="mt-10">
          <Figure>
            <PromptAnatomy parts={promptAnatomy} />
          </Figure>
        </div>
      </Band>

      <section id="library" className="bg-surface-soft pb-16 sm:pb-24">
        <div className="z-30 pt-6 pb-2 lg:sticky lg:top-16 lg:pt-4">
          <div className="shell">
            <PromptFilter
              total={PROMPTS.length}
              categoryCounts={categoryCounts}
              fluencyCounts={fluencyCounts}
            />
          </div>
        </div>

        <div data-prompt-list className="shell mt-6 grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PROMPTS.map((p) => (
            <article
              key={p.id}
              data-prompt-card
              data-category={p.category}
              data-fluency={p.fluency.join(",")}
              data-search={`${p.title} ${p.scenario} ${CATEGORY_LABEL[p.category]}`}
              className="flex flex-col rounded-lg border border-hairline bg-canvas p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="badge-pill">{CATEGORY_LABEL[p.category]}</span>
                  {p.fluency.map((f) => (
                    <span key={f} className="badge-coral">
                      {FLUENCY_LABEL[f]}
                    </span>
                  ))}
                </div>
                <CopyButton />
              </div>

              <h2 className="title-lg mt-3">
                {p.title}
                <span className="caption ml-2 font-mono font-normal text-muted">{p.id}</span>
              </h2>
              <p className="body-md mt-2 text-body">{p.scenario.replace(/^[^：]+：/, "")}</p>

              {p.note && (
                <p className="body-sm mt-3 rounded-md bg-surface-soft px-4 py-2.5 text-body">
                  <span className="font-medium text-ink">提醒　</span>
                  {p.note}
                </p>
              )}

              <details className="group mt-4 border-t border-hairline pt-3">
                <summary className="flex cursor-pointer list-none items-center gap-2 marker:content-none">
                  <span className="caption text-primary-ink group-open:hidden">看完整提示詞（七段）▾</span>
                  <span className="caption hidden text-primary-ink group-open:inline">收合 ▴</span>
                </summary>
                <div className="mt-3">
                  <PromptBody prompt={p.prompt} />
                </div>
              </details>

            </article>
          ))}
        </div>

        <div className="shell mt-12">
          <p className="body-sm measure text-muted">
            原始素材出自作者自製的 Gemini EDU Prompt Assistant 瀏覽器擴充，後在 Claude 教育應用手冊專案中改寫為七段式模板；本站收錄教學相關四類，研究查核與 Artifacts／Claude Code 兩類未收錄。
          </p>
        </div>
      </section>

      <PageNav current="/prompts" />
    </>
  );
}
