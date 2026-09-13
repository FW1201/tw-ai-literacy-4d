import type { Metadata } from "next";
import { Band, Heading, PageHeader } from "@/components/Band";
import { assessments, gradeBands, studentLocalization } from "@/lib/content";
import { CASES, MODE_LABEL, TRACK_LABEL } from "@/lib/cases";

export const metadata: Metadata = {
  title: "課堂實踐｜AI 素養教育 4D 框架",
  description: "分年段設計原則、三種評量策略、實際可照做的教學案例，以及學生素養篇的在地化對照。",
};

export default function ClassroomPage() {
  return (
    <>
      <PageHeader
        eyebrow="課堂實踐"
        title="在我這一堂課，長什麼樣子"
        lead="框架講完了，這頁處理落地：不同學段該側重哪個 D、評量怎麼收斂、實際案例怎麼跑，以及學生端的素養要求怎麼在地化。"
      />

      <Band id="grade-bands" tone="canvas">
        <Heading
          eyebrow="分年段設計"
          title="不同學段，側重不同的 D"
          lead="原始教材以美式 pK-12 分級與英語課堂為預設，這裡對應 108 課綱三學段與核心素養 B2 重新編排。"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {gradeBands.map((g) => (
            <article key={g.band} className="flex flex-col rounded-lg border border-hairline bg-canvas p-8">
              <h3 className="display-sm">{g.band}</h3>
              <p className="badge-coral mt-4 self-start">{g.focus}</p>
              <p className="title-sm mt-6">{g.form}</p>
              <p className="body-sm mt-2 grow text-body">{g.example}</p>
              <p className="body-sm mt-6 border-t border-hairline pt-5 text-muted">
                108 課綱對應：{g.curriculum}
              </p>
            </article>
          ))}
        </div>
      </Band>

      <Band id="assessment" tone="card">
        <Heading
          eyebrow="評量整合"
          title="三種評量策略，接回既有的抗 AI 評量原則"
          lead="來源課程是高教取向，這裡只取可轉化的評量策略，接到教師既有的評量規準與抗 AI 評量設計上，而非整套搬運。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {assessments.map((a) => (
            <article key={a.en} className="rounded-lg bg-canvas p-8">
              <p className="caption-upper text-primary">{a.en}</p>
              <h3 className="display-sm mt-3">{a.type}</h3>
              <p className="body-sm mt-4 text-body">{a.detail}</p>
            </article>
          ))}
        </div>
      </Band>

      <Cases />

      <Band id="students" tone="soft">
        <Heading
          eyebrow="學生素養篇"
          title="從大學生涯情境，改寫成台灣升學情境"
          lead="來源課程面向大學生的履歷與面試，對台灣國高中生沒有對應。以下是在地化後的四組對照。"
        />
        <dl className="mt-12 space-y-3">
          {studentLocalization.map((row) => (
            <div
              key={row.origin}
              className="grid gap-3 rounded-lg border border-hairline bg-canvas p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-8 md:p-7"
            >
              <div>
                <p className="caption-upper text-muted-soft">原課程情境</p>
                <dt className="body-sm mt-1.5 text-muted">{row.origin}</dt>
              </div>
              <div>
                <p className="caption-upper text-primary">台灣 K-12 在地化</p>
                <dd className="body-sm mt-1.5 text-body-strong">{row.local}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Band>
    </>
  );
}

/** 實踐案例：情境 → 逐步做法 → 提示詞，按 track 分組。 */
function Cases() {
  const tracks = [...new Set(CASES.map((c) => c.track))];

  return (
    <section id="cases" className="bg-canvas py-16 sm:py-24 lg:py-section">
      <div className="shell">
        <Heading
          eyebrow="實踐案例"
          title="16 個可以照著做的實際案例"
          lead="每個案例都拆成可執行的步驟，並標示它主要練到 4D 的哪些環節。附提示詞的直接複製調整即可用。"
        />

        <div className="mt-12 space-y-12">
          {tracks.map((track) => (
            <div key={track}>
              <h3 className="title-lg border-b border-hairline pb-3">{TRACK_LABEL[track]}</h3>
              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {CASES.filter((c) => c.track === track).map((c) => (
                  <article key={c.id} className="flex flex-col rounded-lg bg-surface-card p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-pill">{c.level}</span>
                      {c.modes.map((m) => (
                        <span key={m} className="caption text-muted">
                          {MODE_LABEL[m]}
                        </span>
                      ))}
                    </div>
                    <h4 className="title-md mt-4">{c.title}</h4>
                    <p className="body-sm mt-2 text-body">{c.summary}</p>

                    <ol className="mt-5 space-y-2.5">
                      {c.steps.map((s, i) => (
                        <li key={s.t} className="flex gap-3">
                          <span className="font-display lining-nums text-lg leading-6 text-primary">
                            {i + 1}
                          </span>
                          <span className="body-sm text-body">
                            <span className="text-ink">{s.t}</span>
                            {" — "}
                            {s.d}
                          </span>
                        </li>
                      ))}
                    </ol>

                    {c.prompt && (
                      <details className="mt-5">
                        <summary className="caption cursor-pointer list-none text-primary marker:content-none">
                          展開提示詞 ▾
                        </summary>
                        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-surface-dark p-4 font-mono text-[13px] leading-relaxed text-on-dark">
                          {c.prompt}
                        </pre>
                      </details>
                    )}

                    {c.ageNote && (
                      <p className="body-sm mt-4 text-muted">年齡提醒：{c.ageNote}</p>
                    )}

                    <p className="caption mt-auto pt-5 text-muted-soft">4D：{c.fluency}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
