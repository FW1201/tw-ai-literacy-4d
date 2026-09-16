import Link from "next/link";
import { Band, Heading } from "@/components/Band";
import { LoopDiagram } from "@/components/LoopDiagram";
import { LayerStack } from "@/components/diagrams/LayerStack";
import { entries, fourLayers, hero } from "@/lib/content";

const AUDIENCE: Record<string, string> = {
  "/framework": "第一次認識 4D 的老師",
  "/how-ai-works": "想跟學生說明 AI 的老師",
  "/classroom": "正在設計課程的老師",
  "/prompts": "明天上課就想用 Claude 的老師",
  "/sources": "需要查出處、引用資料的人",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Entries />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-canvas">
      <div className="shell grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-section">
        <div>
          <span className="badge-pill">{hero.eyebrow}</span>
          <h1 className="display-xl mt-6 whitespace-pre-line">{hero.headline}</h1>
          <p className="body-md measure mt-6 text-body-strong">
            {hero.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/framework" className="btn btn-primary">
              從 4D 框架開始
            </Link>
            <Link href="/prompts" className="btn btn-secondary">
              直接看提示詞
            </Link>
          </div>
        </div>
        <LoopDiagram />
      </div>
    </section>
  );
}

function Positioning() {
  return (
    <Band id="positioning" tone="soft">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <Heading
            eyebrow="定位"
            title="補上中間那一層"
            lead="前兩層告訴你能不能做、要做到多好；4D 談的是每次實際用 AI 時，你要做哪些事。"
          />
          <p className="caption mt-6 text-muted">點一下，可以看完整說明</p>
        </div>
        <LayerStack layers={fourLayers} />
      </div>
    </Band>
  );
}

function Entries() {
  return (
    <Band tone="canvas">
      <Heading eyebrow="從哪裡開始" title="五個入口" />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className="lift group flex flex-col rounded-lg border border-hairline bg-canvas p-7"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display lining-nums text-3xl leading-none text-primary-ink">
                {entry.order}
              </span>
              {entry.meta && <span className="caption text-muted">{entry.meta}</span>}
            </div>
            <h3 className="title-lg mt-5">{entry.title}</h3>
            <p className="caption mt-1 text-primary-ink">適合：{AUDIENCE[entry.href]}</p>
            <p className="body-sm mt-3 grow text-body">{entry.detail}</p>
            <span className="caption mt-6 text-primary-ink">
              前往 <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Band>
  );
}
