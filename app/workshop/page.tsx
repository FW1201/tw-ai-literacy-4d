import type { Metadata } from "next";
import { Band, Heading, PageHeader } from "@/components/Band";
import { governance, workshop } from "@/lib/content";

export const metadata: Metadata = {
  title: "研習工作坊｜AI 素養教育 4D 框架",
  description: "90 分鐘的教師研習流程、配套文件，以及給校長與教學組長的導入提醒。",
};

export default function WorkshopPage() {
  return (
    <>
      <PageHeader
        eyebrow="教師研習工作坊"
        title={`現成的 ${workshop.duration}研習流程，帶回學校就能開`}
        lead={`對象 ${workshop.audience}；建議 ${workshop.size}。結束時每位老師帶走：4D 的操作語言、一張任教學段可用的練習卡、一句下週要實踐的承諾。`}
      />

      <Band tone="canvas">
        <ol className="space-y-3">
          {workshop.steps.map((step, i) => (
            <li key={step.title} className="rounded-lg border border-hairline bg-canvas p-6 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="flex items-baseline gap-3 sm:w-36 sm:shrink-0">
                  <span className="font-display lining-nums text-2xl leading-none text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="caption text-muted">{step.time}</span>
                </div>
                <div>
                  <h2 className="title-md">{step.title}</h2>
                  <p className="body-sm mt-1.5 max-w-3xl text-body">{step.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-lg bg-surface-card p-8">
          <h2 className="title-lg">配套文件</h2>
          <p className="body-sm mt-2 text-body">
            工作坊套件依 Train the Trainer 的 kit 結構製作，每份文件內頁均標註對應的課程來源。
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {workshop.files.map((f) => (
              <div key={f.name} className="rounded-lg border border-hairline bg-canvas p-5">
                <div className="flex items-center gap-2">
                  <h3 className="title-sm">{f.name}</h3>
                  <span className="font-mono text-[11px] text-muted-soft">{f.format}</span>
                </div>
                <p className="body-sm mt-2 text-body">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Band>

      <Band tone="soft">
        <Heading
          eyebrow="校務治理"
          title="給校長與教學組長的四個提醒"
          lead="來源課程原生情境是企業團隊導入多人協作型 AI，與課堂距離較遠，這裡只取四個原則，呼應教育部指引的校務治理段落。"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {governance.map((g, i) => (
            <article key={g.title} className="rounded-lg bg-canvas p-6">
              <span className="font-display lining-nums text-3xl leading-none text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="title-md mt-4">{g.title}</h3>
              <p className="body-sm mt-2 text-body">{g.detail}</p>
            </article>
          ))}
        </div>
      </Band>
    </>
  );
}
