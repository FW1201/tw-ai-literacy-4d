import type { Metadata } from "next";
import { PageHeader } from "@/components/Band";
import { ConceptPlayer } from "@/components/ConceptPlayer";
import { mechanisms } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI 怎麼運作｜AI 素養教育 4D 框架",
  description: "接龍式生成、知識截止、工作記憶、可控性——四個機制的白話版，各配一支可直接投影的概念動畫。",
};

export default function HowAiWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="能力與限制"
        title="AI 為什麼會「一本正經地講錯」"
        lead="這是「辨識」能力的知識基礎——要看得出哪裡不對，得先有一個「它為什麼會這樣」的心智模型。課堂上不必背英文名稱，用動畫與抓錯活動內化即可。"
      />

      {mechanisms.map((m, i) => (
        <section
          key={m.en}
          className={i % 2 === 0 ? "bg-surface-dark py-14 sm:py-20" : "bg-surface-dark-soft py-14 sm:py-20"}
        >
          <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="display-md text-on-dark">{m.name}</h2>
                <span className="font-mono text-sm text-on-dark-soft">{m.en}</span>
              </div>
              <p className="body-md mt-4 text-on-dark-soft">{m.plain}</p>

              <div className="mt-7 space-y-3">
                <div className="rounded-md bg-surface-dark-elevated p-5">
                  <p className="caption text-accent-amber">常見誤解</p>
                  <p className="body-sm mt-1.5 text-on-dark">{m.myth}</p>
                </div>
                <div className="rounded-md bg-surface-dark-elevated p-5">
                  <p className="caption text-accent-teal">事實</p>
                  <p className="body-sm mt-1.5 text-on-dark">{m.reality}</p>
                </div>
              </div>

              <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-on-dark-soft">
                <span className="text-primary">課堂提問 </span>
                {m.prompt}
              </p>
            </div>

            <ConceptPlayer id={m.anim} />
          </div>
        </section>
      ))}

      <section className="bg-canvas py-16 sm:py-24">
        <div className="shell max-w-3xl">
          <h2 className="display-md">四個機制會同時發生</h2>
          <p className="body-md mt-5 text-body">
            真實使用時它們從不單獨出現：一份長文件同時壓到工作記憶，又踩進模型不熟的在地知識；一個模糊指令同時考驗可控性，而接龍機制正伸手去抓「聽起來最合理」的答案。看到非預期的輸出時，先辨認是哪幾個機制在相撞，再對症下藥——這比重新送出一次有用得多。
          </p>
        </div>
      </section>
    </>
  );
}
