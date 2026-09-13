import { Nav } from "@/components/Nav";
import { Mark } from "@/components/Mark";
import { LoopDiagram } from "@/components/LoopDiagram";
import {
  assessments,
  disclaimer,
  fourD,
  fourLayers,
  gradeBands,
  governance,
  hero,
  loops,
  mechanisms,
  site,
  sources,
  studentLocalization,
  workshop,
} from "@/lib/content";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Positioning />
        <Framework />
        <Mechanisms />
        <GradeBands />
        <Assessment />
        <Workshop />
        <Students />
        <Governance />
        <Sources />
      </main>
      <Footer />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section className="bg-canvas">
      <div className="shell grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-section">
        <div>
          <span className="badge-pill">{hero.eyebrow}</span>
          <h1 className="display-xl mt-6 whitespace-pre-line">{hero.headline}</h1>
          <p className="body-md mt-6 max-w-xl text-body-strong">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-secondary">
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <LoopDiagram />
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Positioning */
function Positioning() {
  return (
    <Band id="positioning" tone="soft">
      <Heading
        eyebrow="定位"
        title="這不是第四套框架，是補上中間缺的那一層"
        lead="台灣的教育現場已經有法源原則，也有國際能力基準。真正缺的是把兩者翻譯成課堂動作的操作方法論。"
      />
      <ol className="mt-12 space-y-3">
        {fourLayers.map((layer) => (
          <li
            key={layer.order}
            className={
              layer.tone === "coral"
                ? "rounded-lg bg-primary p-6 text-on-primary sm:p-8"
                : "rounded-lg border border-hairline bg-canvas p-6 sm:p-8"
            }
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-8">
              <div className="flex items-baseline gap-3 sm:w-44 sm:shrink-0">
                <span
                  className={`font-display lining-nums text-3xl leading-none ${
                    layer.tone === "coral" ? "text-on-primary/70" : "text-primary"
                  }`}
                >
                  {layer.order}
                </span>
                <span
                  className={`caption-upper ${
                    layer.tone === "coral" ? "text-on-primary/80" : "text-muted"
                  }`}
                >
                  {layer.label}
                </span>
              </div>
              <div>
                <h3 className={`title-md ${layer.tone === "coral" ? "text-on-primary" : ""}`}>
                  {layer.title}
                </h3>
                <p
                  className={`body-sm mt-2 max-w-3xl ${
                    layer.tone === "coral" ? "text-on-primary/90" : "text-body"
                  }`}
                >
                  {layer.detail}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/* ----------------------------------------------------------- Framework */
function Framework() {
  return (
    <Band id="framework" tone="canvas">
      <Heading
        eyebrow="4D 框架"
        title="委託・描述・辨識・盡責"
        lead="一句話記住：委派多少、講清楚什麼、看得出哪裡不對、最後誰負責——四個問題問完，一輪 AI 協作才算做完。"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {fourD.map((d) => (
          <article key={d.en} className="rounded-lg bg-surface-card p-8">
            <div className="flex items-baseline gap-3">
              <h3 className="display-sm">{d.zh}</h3>
              <span className="caption text-muted">{d.en}</span>
            </div>
            <p className="title-sm mt-4 text-body-strong">{d.question}</p>
            <p className="body-sm mt-3 text-body">{d.detail}</p>
            <dl className="mt-6 space-y-1.5 border-t border-hairline pt-5">
              <div className="body-sm text-muted">{d.moe}</div>
              <div className="body-sm text-muted">{d.unesco}</div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {loops.map((loop) => (
          <div key={loop.title} className="rounded-lg border border-hairline p-6">
            <div className="flex items-baseline gap-3">
              <h4 className="title-md">{loop.title}</h4>
              <span className="caption text-muted">{loop.subtitle}</span>
            </div>
            <p className="body-sm mt-2 text-body">{loop.detail}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------- Mechanisms */
function Mechanisms() {
  return (
    <section id="mechanisms" className="bg-surface-dark py-16 sm:py-24 lg:py-section">
      <div className="shell">
        <span className="caption-upper text-primary">能力與限制</span>
        <h2 className="display-lg mt-4 max-w-3xl text-on-dark">AI 為什麼會「一本正經地講錯」</h2>
        <p className="body-md mt-5 max-w-2xl text-on-dark-soft">
          這是「辨識」能力的知識基礎——要看得出哪裡不對，得先有一個「它為什麼會這樣」的心智模型。以下四個機制，課堂上不必背英文名稱，用抓錯活動內化即可。
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {mechanisms.map((m) => (
            <article key={m.en} className="rounded-lg bg-surface-dark-soft p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="title-lg text-on-dark">{m.name}</h3>
                <span className="font-mono text-[13px] text-on-dark-soft">{m.en}</span>
              </div>
              <p className="body-sm mt-3 text-on-dark-soft">{m.plain}</p>

              <div className="mt-6 space-y-3">
                <div className="rounded-md bg-surface-dark-elevated p-4">
                  <p className="caption text-accent-amber">常見誤解</p>
                  <p className="body-sm mt-1.5 text-on-dark">{m.myth}</p>
                </div>
                <div className="rounded-md bg-surface-dark-elevated p-4">
                  <p className="caption text-accent-teal">事實</p>
                  <p className="body-sm mt-1.5 text-on-dark">{m.reality}</p>
                </div>
              </div>

              <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-on-dark-soft">
                <span className="text-primary">課堂提問 </span>
                {m.prompt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- GradeBands */
function GradeBands() {
  return (
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
  );
}

/* ---------------------------------------------------------- Assessment */
function Assessment() {
  return (
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
  );
}

/* ------------------------------------------------------------ Workshop */
function Workshop() {
  return (
    <section id="workshop" className="bg-canvas py-16 sm:py-24 lg:py-section">
      <div className="shell">
        <div className="rounded-lg bg-primary p-8 text-on-primary sm:p-12">
          <span className="caption-upper text-on-primary/80">教師研習工作坊</span>
          <h2 className="display-lg mt-4 max-w-3xl text-on-primary">
            現成的 {workshop.duration}研習流程，帶回學校就能開
          </h2>
          <p className="body-md mt-5 max-w-2xl text-on-primary/90">
            對象 {workshop.audience}；建議 {workshop.size}。結束時每位老師帶走：4D 的操作語言、一張任教學段可用的練習卡、一句下週要實踐的承諾。
          </p>
        </div>

        <ol className="mt-12 space-y-3">
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
                  <h3 className="title-md">{step.title}</h3>
                  <p className="body-sm mt-1.5 max-w-3xl text-body">{step.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-lg bg-surface-card p-8">
          <h3 className="title-lg">配套文件</h3>
          <p className="body-sm mt-2 text-body">
            工作坊套件依 Train the Trainer 的 kit 結構製作，每份文件內頁均標註對應的課程來源。
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {workshop.files.map((f) => (
              <div key={f.name} className="rounded-lg border border-hairline bg-canvas p-5">
                <div className="flex items-center gap-2">
                  <h4 className="title-sm">{f.name}</h4>
                  <span className="font-mono text-[11px] text-muted-soft">{f.format}</span>
                </div>
                <p className="body-sm mt-2 text-body">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Students */
function Students() {
  return (
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
  );
}

/* ---------------------------------------------------------- Governance */
function Governance() {
  return (
    <Band id="governance" tone="canvas">
      <Heading
        eyebrow="校務治理"
        title="給校長與教學組長的四個提醒"
        lead="來源課程原生情境是企業團隊導入多人協作型 AI，與課堂距離較遠，這裡只取四個原則，呼應教育部指引的校務治理段落。"
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {governance.map((g, i) => (
          <article key={g.title} className="rounded-lg bg-surface-card p-6">
            <span className="font-display lining-nums text-3xl leading-none text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="title-md mt-4">{g.title}</h3>
            <p className="body-sm mt-2 text-body">{g.detail}</p>
          </article>
        ))}
      </div>
    </Band>
  );
}

/* ------------------------------------------------------------- Sources */
function Sources() {
  return (
    <Band id="sources" tone="soft">
      <Heading
        eyebrow="資料來源"
        title="每一節內容的出處"
        lead="本站是整編與在地化改寫，不是原創框架。以下列出全部來源，方便查證與延伸閱讀。"
      />
      <div className="mt-12 space-y-10">
        {sources.map((group) => (
          <div key={group.group}>
            <h3 className="title-lg">{group.group}</h3>
            <ul className="mt-5 space-y-3">
              {group.items.map((item) => (
                <li key={item.label} className="rounded-lg border border-hairline bg-canvas p-5">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="title-sm text-link">
                      {item.label}
                    </a>
                  ) : (
                    <span className="title-sm">{item.label}</span>
                  )}
                  <p className="body-sm mt-1.5 text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* -------------------------------------------------------------- Footer */
function Footer() {
  return (
    <footer className="bg-surface-dark py-16">
      <div className="shell">
        <div className="flex items-center gap-2.5">
          <Mark color="var(--color-on-dark)" />
          <span className="title-sm text-on-dark">{site.title}</span>
        </div>
        <p className="body-sm mt-5 max-w-3xl text-on-dark-soft">{disclaimer}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6">
          <span className="body-sm text-on-dark-soft">整編：{site.author}</span>
          <span className="body-sm text-on-dark-soft">最後更新：{site.updated}</span>
          <a href={site.repo} target="_blank" rel="noreferrer" className="body-sm text-link">
            原始碼與內容修訂紀錄
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------- Helpers */
function Band({
  id,
  tone,
  children,
}: {
  id?: string;
  tone: "canvas" | "soft" | "card";
  children: React.ReactNode;
}) {
  const bg =
    tone === "canvas" ? "bg-canvas" : tone === "soft" ? "bg-surface-soft" : "bg-surface-card";
  return (
    <section id={id} className={`${bg} py-16 sm:py-24 lg:py-section`}>
      <div className="shell">{children}</div>
    </section>
  );
}

function Heading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="max-w-3xl">
      <span className="caption-upper text-primary">{eyebrow}</span>
      <h2 className="display-lg mt-4">{title}</h2>
      <p className="body-md mt-5 text-body">{lead}</p>
    </div>
  );
}
