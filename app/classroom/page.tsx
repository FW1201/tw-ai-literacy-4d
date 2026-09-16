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
  title: "課堂實踐｜AI 素養教育 4D 框架",
  description: "分年段設計原則、三種評量策略、實際可照做的教學案例，以及學生素養篇的在地化對照。",
};

const STAGE_ORDER = ["作業進行中", "作業繳交時", "作業完成後"];
const orderedAssessments = [...assessments].sort(
  (a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage)
);

export default function ClassroomPage() {
  return (
    <>
      <PageHeader
        eyebrow="課堂實踐"
        title="在我這一堂課，長什麼樣子"
        lead="不同學段側重哪個 D、評量怎麼收斂、案例怎麼跑，以及學生端的素養怎麼在地化。"
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
          eyebrow="分年段設計"
          title="不同學段，側重不同的 D"
          lead="對應 108 課綱三學段與核心素養 B2 重新編排。"
        />
        <div className="mt-10">
          <Figure caption="國小先練「看出錯」，國中練「說清楚、再檢查」，高中把「負責與揭露」變成習慣。">
            <EmphasisHeatmap rows={gradeBands} />
          </Figure>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {gradeBands.map((g) => (
            <article key={g.band} className="flex flex-col rounded-lg bg-canvas p-6">
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
          eyebrow="評量整合"
          title="評量放在作業的哪個時間點"
          lead="三種策略各守一個時間點，接回既有的評量規準與抗 AI 評量設計。"
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
          eyebrow="學生素養篇"
          title="從大學生涯情境，改寫成台灣升學情境"
          lead="來源課程面向大學生的履歷與面試，這裡改寫為國高中生會遇到的情境。"
        />
        <ul className="mt-10 space-y-4">
          {studentLocalization.map((row) => (
            <li key={row.origin}>
              <Compare fromLabel="原課程情境" toLabel="台灣 K-12 在地化" from={row.origin} to={row.local} />
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
          title={`${CASES.length} 個可以照著做的案例`}
          lead="選一個類別，每個案例都拆成步驟；有附提示詞的可以直接複製。"
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
                <article key={c.id} data-prompt-card className="flex flex-col rounded-lg bg-canvas p-6 sm:p-7">
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
