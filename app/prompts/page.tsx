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
  title: "提示詞庫｜AI Fluency 4D 框架",
  description: "60 筆可以直接複製的 Claude 教學提示詞，能依使用情境和 4D 動作篩選。",
};

export default function PromptsPage() {
  return (
    <>
      <PageHeader
        index="04"
        eyebrow="提示詞庫"
        title={`${PROMPTS.length} 筆提示詞`}
        lead="複製下來，把方括號裡的年級和主題換成你的，就能貼進 Claude。"
        highlights={highlights["/prompts"]}
      />

      <Band tone="card">
        <Heading
          eyebrow="結構"
          title="七段組成"
          lead="知道每一段在做什麼，要修改時就知道從哪裡下手。"
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
              className="lift flex flex-col rounded-lg border border-hairline bg-canvas p-5"
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
              {/* 桌機直接顯示情境；手機預設收合（display:none 的那份不進無障礙樹，不會重複朗讀） */}
              <p className="body-md mt-2 hidden text-body md:block">{p.scenario.replace(/^[^：]+：/, "")}</p>
              <details className="group/scn mt-2 md:hidden">
                <summary className="caption cursor-pointer list-none text-muted marker:content-none">
                  <span className="group-open/scn:hidden">情境說明 ▾</span>
                  <span className="hidden group-open/scn:inline">收合情境 ▴</span>
                </summary>
                <p className="body-md mt-1.5 text-body">{p.scenario.replace(/^[^：]+：/, "")}</p>
              </details>

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
            這批提示詞最早來自我做的 Gemini EDU Prompt Assistant 瀏覽器擴充功能，後來在 Claude 教育應用手冊裡改寫成七段式。這裡只放和教學有關的四類，研究查核與 Artifacts／Claude Code 兩類沒有收進來。
          </p>
        </div>
      </section>

      <PageNav current="/prompts" />
    </>
  );
}
