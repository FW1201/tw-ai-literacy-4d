import type { Metadata } from "next";
import { Band, Heading, PageHeader } from "@/components/Band";
import { PageNav } from "@/components/PageNav";
import { Figure } from "@/components/diagrams/Figure";
import { Stepper } from "@/components/diagrams/Stepper";
import { Timeline } from "@/components/diagrams/Timeline";
import { governance, highlights, workshop } from "@/lib/content";

export const metadata: Metadata = {
  title: "研習工作坊｜AI 素養教育 4D 框架",
  description: "90 分鐘的教師研習流程、配套文件，以及給校長與教學組長的導入提醒。",
};

const longest = workshop.steps.reduce(
  (best, s, i, arr) => (s.minutes > arr[best].minutes ? i : best),
  0
);

export default function WorkshopPage() {
  return (
    <>
      <PageHeader
        eyebrow="教師研習工作坊"
        title={`現成的 ${workshop.duration}研習，帶回學校就能開`}
        lead={`對象：${workshop.audience}。建議 ${workshop.size}。`}
        highlights={highlights["/workshop"]}
      />

      <Band tone="soft">
        <Heading
          eyebrow="流程"
          title="時間花在哪裡"
          lead="三分之一的時間留給老師自己動手——這是研習有沒有用的關鍵。"
        />
        <div className="mt-10">
          <Figure caption="色帶寬度依實際分鐘數比例繪製；深色段為最長的分組實作。">
            <Timeline
              unit="分"
              highlightIndex={longest}
              segments={workshop.steps.map((s) => ({ label: s.title, weight: s.minutes }))}
            />
          </Figure>
        </div>

        <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {workshop.steps.map((step, i) => (
            <li key={step.title} className="rounded-lg bg-canvas p-5">
              <p className="caption lining-nums text-muted">
                {String(i + 1).padStart(2, "0")}・{step.time}
              </p>
              <h2 className="title-md mt-1">{step.title}</h2>
              <p className="body-sm mt-2 text-body">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="canvas">
        <Heading eyebrow="配套文件" title="三份文件，對應三個角色" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {workshop.files.map((f, i) => (
            <div key={f.name} className="flex gap-4 rounded-lg border border-hairline p-6">
              <span
                aria-hidden="true"
                className="flex h-12 w-10 shrink-0 items-end justify-center rounded-sm bg-surface-card pb-1 font-mono text-[10px] text-muted"
              >
                {f.format}
              </span>
              <div>
                <p className="caption text-primary-ink">
                  {["給主持人", "給全場投影", "給分組老師"][i]}
                </p>
                <h3 className="title-md mt-0.5">{f.name}</h3>
                <p className="body-sm mt-1 text-body">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="body-sm mt-4 text-muted">每份文件內頁均標註對應的課程來源。</p>
      </Band>

      <Band tone="card">
        <Heading
          eyebrow="校務治理"
          title="學校導入的四個步驟"
          lead="依序做，不要跳步——尤其是「漸進釋放」，先小範圍試辦再擴大。"
        />
        <div className="mt-10 rounded-lg bg-canvas p-6 sm:p-8">
          <Stepper steps={governance.map((g) => ({ title: g.title, detail: g.detail }))} />
        </div>
      </Band>

      <PageNav current="/workshop" />
    </>
  );
}
