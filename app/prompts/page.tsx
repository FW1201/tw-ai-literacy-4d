import type { Metadata } from "next";
import { PageHeader } from "@/components/Band";
import { PromptFilter } from "@/components/PromptFilter";
import { CopyButton } from "@/components/CopyButton";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  CLAUDE_PRINCIPLE_LABEL,
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
        title="可以直接貼進 Claude 的 60 筆提示詞"
        lead="每一筆都是完整成品，含角色、任務、脈絡、限制、輸出格式與成功標準；方括號的地方換成你自己的年級與主題即可。標籤標示這筆主要練到 4D 的哪個環節。"
      />

      <section className="bg-surface-soft py-12 sm:py-16">
        <div className="shell">
          <PromptFilter
            total={PROMPTS.length}
            categoryCounts={categoryCounts}
            fluencyCounts={fluencyCounts}
          />

          <div className="mt-8 space-y-4">
            {PROMPTS.map((p) => (
              <article
                key={p.id}
                data-prompt-card
                data-category={p.category}
                data-fluency={p.fluency.join(",")}
                className="rounded-lg border border-hairline bg-canvas p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-xs text-muted-soft">{p.id}</span>
                      <h2 className="title-lg">{p.title}</h2>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="badge-pill">{CATEGORY_LABEL[p.category]}</span>
                      {p.fluency.map((f) => (
                        <span key={f} className="badge-coral">
                          {FLUENCY_LABEL[f]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <CopyButton />
                </div>

                <p className="body-sm mt-5 text-body">{p.scenario}</p>

                <details className="mt-5 group">
                  <summary className="caption cursor-pointer list-none text-primary marker:content-none">
                    展開完整提示詞 ▾
                  </summary>
                  <pre
                    data-prompt-body
                    className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-surface-dark p-5 font-mono text-[13px] leading-relaxed text-on-dark"
                  >
                    {p.prompt}
                  </pre>
                </details>

                {p.note && (
                  <p className="body-sm mt-4 border-t border-hairline pt-4 text-muted">
                    提醒：{p.note}
                  </p>
                )}

                <p className="caption mt-4 text-muted-soft">
                  結構：{p.claudePrinciples.map((k) => CLAUDE_PRINCIPLE_LABEL[k]).join("・")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas py-14">
        <div className="shell max-w-3xl">
          <h2 className="title-lg">關於這批提示詞</h2>
          <p className="body-sm mt-3 text-body">
            原始素材出自作者自製的 Gemini EDU Prompt Assistant 瀏覽器擴充，後續在 Claude 教育應用手冊專案中改寫為 Claude 友善的七段式模板，本站收錄其中教學相關四類。研究查核與 Artifacts／Claude Code 兩類未收錄於此。
          </p>
        </div>
      </section>
    </>
  );
}
