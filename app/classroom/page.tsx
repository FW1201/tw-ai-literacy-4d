import type { Metadata } from "next";
import { Band, Heading, PageHeader } from "@/components/Band";
import { CopyButton } from "@/components/CopyButton";
import { PageNav } from "@/components/PageNav";
import { PromptBody } from "@/components/PromptBody";
import { SectionNav } from "@/components/SectionNav";
import { TrackTabs } from "@/components/TrackTabs";
import { Compare } from "@/components/diagrams/Compare";
import { EmphasisHeatmap } from "@/components/diagrams/EmphasisHeatmap";
import { Figure } from "@/components/diagrams/Figure";
import { Stepper } from "@/components/diagrams/Stepper";
import { assessments, gradeBands, highlights, studentLocalization } from "@/lib/content";
import { CASES, MODE_LABEL, TRACK_LABEL } from "@/lib/cases";

export const metadata: Metadata = {
  title: "課堂實踐與思考｜AI Fluency 4D 框架",
  description: "不同年級怎麼教、作業怎麼評、16 個可以照著做的案例，以及改寫成台灣升學情境的學生篇。",
};

const STAGE_ORDER = ["作業進行中", "作業繳交時", "作業完成後"];
const orderedAssessments = [...assessments].sort(
  (a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage)
);

export default function ClassroomPage() {
  return (
    <>
      <PageHeader
        index="03"
        eyebrow="課堂實踐"
        title="課堂實踐與思考"
        lead="不同年級要多練什麼、作業什麼時候評，再加上可以照著做的案例。"
        highlights={highlights["/classroom"]}
      />
      <SectionNav
        items={[
          { id: "grade-bands", label: "分年段" },
          { id: "assessment", label: "評量" },
          { id: "cases", label: "實踐案例" },
          { id: "students", label: "學生素養" },
        ]}
      />

      <Band id="grade-bands" tone="soft">
        <Heading
          eyebrow="分年段"
          title="學段側重"
          lead="依照 108 課綱的三個學習階段和核心素養 B2 安排。"
        />
        <div className="mt-10">
          <Figure caption="國小先練習看出錯誤；國中練習把話說清楚、再自己檢查；到了高中，要養成負責、主動說明的習慣。">
            <EmphasisHeatmap rows={gradeBands} />
          </Figure>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {gradeBands.map((g) => (
            <article key={g.band} className="lift flex flex-col rounded-lg border border-transparent bg-canvas p-6">
              <h3 className="title-lg">{g.band}</h3>
              <p className="caption mt-1 text-primary-ink">{g.focus}</p>
              <p className="title-sm mt-5">{g.form}</p>
              <p className="body-md mt-1 grow text-body">{g.example}</p>
              <p className="body-sm mt-5 border-t border-hairline pt-4 text-muted">
                B2 對應：{g.curriculum}
              </p>
            </article>
          ))}
        </div>
      </Band>

      <Band id="assessment" tone="canvas">
        <Heading
          eyebrow="評量"
          title="評量時機"
          lead="三種評量方式，各自放在作業的不同階段。"
        />
        <div className="mt-10 rounded-lg border border-hairline p-6 sm:p-8">
          <Stepper
            steps={orderedAssessments.map((a) => ({
              title: `${a.stage}｜${a.type}`,
              detail: a.detail,
            }))}
          />
        </div>
      </Band>

      <Cases />

      <Band id="students" tone="soft">
        <Heading
          eyebrow="學生素養"
          title="在地化改寫"
          lead="原本的課程是寫給大學生的，這裡改成國高中生會遇到的升學情境。"
        />
        <ul className="mt-10 space-y-4">
          {studentLocalization.map((row) => (
            <li key={row.origin}>
              <Compare fromLabel="原課程情境" toLabel="改寫成台灣版" from={row.origin} to={row.local} />
            </li>
          ))}
        </ul>
      </Band>

      <PageNav current="/classroom" />
    </>
  );
}

function Cases() {
  const tracks = [...new Set(CASES.map((c) => c.track))];
  const first = tracks[0];

  return (
    <section id="cases" className="scroll-mt-28 bg-surface-card py-16 sm:py-24 lg:py-section">
      <div className="shell">
        <Heading
          eyebrow="實踐案例"
          title={`${CASES.length} 個案例`}
          lead="先選一個類別，照著步驟做就好；有附提示詞的可以直接複製。"
        />

        <div className="mt-8">
          <TrackTabs
            tracks={tracks.map((t) => ({
              key: t,
              label: TRACK_LABEL[t],
              count: CASES.filter((c) => c.track === t).length,
            }))}
          />
        </div>

        {tracks.map((track) => (
          <div key={track} data-track={track} hidden={track !== first} className="mt-6">
            <div className="grid gap-5 lg:grid-cols-2">
              {CASES.filter((c) => c.track === track).map((c) => (
                <article key={c.id} data-prompt-card className="lift flex flex-col rounded-lg border border-transparent bg-canvas p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-pill">{c.level}</span>
                    {c.modes.map((m) => (
                      <span key={m} className="caption text-muted">
                        {MODE_LABEL[m]}
                      </span>
                    ))}
                    <span className="caption ml-auto text-primary-ink">4D：{c.fluency}</span>
                  </div>
                  <h3 className="title-lg mt-4">{c.title}</h3>
                  <p className="body-md mt-2 text-body">{c.summary}</p>

                  <div className="mt-5">
                    <Stepper
                      direction="vertical"
                      collapseAfter={2}
                      steps={c.steps.map((s) => ({ title: s.t, detail: s.d }))}
                    />
                  </div>

                  {c.ageNote && (
                    <p className="body-sm mt-5 rounded-md bg-surface-soft px-4 py-3 text-body">
                      <span className="font-medium text-ink">年齡提醒　</span>
                      {c.ageNote}
                    </p>
                  )}

                  {c.prompt && (
                    <details className="mt-auto pt-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 marker:content-none">
                        <span className="caption text-primary-ink">展開提示詞 ▾</span>
                      </summary>
                      <div className="mt-3 space-y-3">
                        <PromptBody prompt={c.prompt} />
                        <CopyButton />
                      </div>
                    </details>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
