import Link from "next/link";
import { Band, Heading } from "@/components/Band";
import { LoopDiagram } from "@/components/LoopDiagram";
import { entries, fourLayers, hero } from "@/lib/content";

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
          <p className="body-md mt-6 max-w-xl text-body-strong">{hero.lead}</p>
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

function Entries() {
  return (
    <Band tone="canvas">
      <Heading
        eyebrow="從哪裡開始"
        title="六個入口"
        lead="想快速上手就直接進提示詞庫；想弄懂為什麼要這樣用，從 4D 框架與 AI 怎麼運作看起。"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className="group flex flex-col rounded-lg border border-hairline bg-canvas p-7 transition-colors hover:bg-surface-card"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display lining-nums text-3xl leading-none text-primary">
                {entry.order}
              </span>
              {entry.meta && <span className="caption text-muted-soft">{entry.meta}</span>}
            </div>
            <h3 className="title-lg mt-5">{entry.title}</h3>
            <p className="body-sm mt-3 grow text-body">{entry.detail}</p>
            <span className="caption mt-6 text-primary">前往 →</span>
          </Link>
        ))}
      </div>
    </Band>
  );
}
