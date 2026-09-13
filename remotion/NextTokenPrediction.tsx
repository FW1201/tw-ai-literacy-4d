import { interpolate, useCurrentFrame } from "remotion";
import { FONT, T } from "@/lib/tokens";
import { Eyebrow, Stage, Takeaway, Title, useFade } from "./shared";

/**
 * 接龍式生成（24s / 720f）
 * 教學核心不是「AI 會猜字」，而是**機率分佈的形狀**：
 * 尖峰 = 有把握；平坦 = 模型自己也不確定，正是編造集中處。
 *
 *   30–150  第一句逐字出現
 *  150–300  候選機率條（尖峰）→ 選中
 *  330–450  第二句逐字出現
 *  450–600  候選機率條（平坦）→ 全部轉警示色
 *  610–720  字卡
 */

const SCENE_A = { typeStart: 30, barsStart: 150, pickAt: 268, endAt: 320 };
const SCENE_B = { typeStart: 340, barsStart: 450, warnAt: 560, endAt: 600 };

const SENTENCE_A = "台灣的首都是";
const SENTENCE_B = "《赤壁賦》寫於西元";

const CANDIDATES_A = [
  { token: "台北", p: 0.92 },
  { token: "高雄", p: 0.03 },
  { token: "台中", p: 0.02 },
  { token: "其他", p: 0.03 },
];

const CANDIDATES_B = [
  { token: "1082", p: 0.31 },
  { token: "1080", p: 0.27 },
  { token: "1079", p: 0.24 },
  { token: "1083", p: 0.18 },
];

export function NextTokenPrediction() {
  const frame = useCurrentFrame();
  const sceneA = useFade(0, SCENE_A.endAt, 14);
  const sceneB = useFade(SCENE_B.typeStart - 10, undefined, 14);

  return (
    <Stage>
      <Eyebrow>Next token prediction</Eyebrow>
      <Title>每一個字，都是猜出來的</Title>

      {frame < SCENE_B.typeStart && (
        <div style={{ opacity: sceneA }}>
          <Scene
            sentence={SENTENCE_A}
            candidates={CANDIDATES_A}
            typeStart={SCENE_A.typeStart}
            barsStart={SCENE_A.barsStart}
            pickAt={SCENE_A.pickAt}
            tone="confident"
          />
        </div>
      )}

      {frame >= SCENE_B.typeStart && (
        <div style={{ opacity: sceneB }}>
          <Scene
            sentence={SENTENCE_B}
            candidates={CANDIDATES_B}
            typeStart={SCENE_B.typeStart}
            barsStart={SCENE_B.barsStart}
            pickAt={-1}
            warnAt={SCENE_B.warnAt}
            tone="flat"
          />
        </div>
      )}

      {frame >= 610 && (
        <Takeaway enterAt={610}>
          分佈平坦 ＝ 模型自己也不確定 ＝ 編造最容易發生的地方。
        </Takeaway>
      )}
    </Stage>
  );
}

function Scene({
  sentence,
  candidates,
  typeStart,
  barsStart,
  pickAt,
  warnAt,
  tone,
}: {
  sentence: string;
  candidates: { token: string; p: number }[];
  typeStart: number;
  barsStart: number;
  pickAt: number;
  warnAt?: number;
  tone: "confident" | "flat";
}) {
  const frame = useCurrentFrame();
  const perChar = 16;
  const shown = Math.max(
    0,
    Math.min(sentence.length, Math.floor((frame - typeStart) / perChar))
  );
  const picked = pickAt > 0 && frame >= pickAt;
  const warned = warnAt !== undefined && frame >= warnAt;

  return (
    <div style={{ marginTop: 26 }}>
      {/* 句子 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 44,
          color: T.onDark,
          minHeight: 56,
        }}
      >
        <span>{sentence.slice(0, shown)}</span>
        {picked && (
          <span
            style={{
              color: T.primary,
              borderBottom: `3px solid ${T.primary}`,
              paddingBottom: 2,
            }}
          >
            {candidates[0].token}
          </span>
        )}
        {!picked && (
          <span
            style={{
              width: 3,
              height: 44,
              background: T.primary,
              opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0.15,
            }}
          />
        )}
      </div>

      {/* 候選機率條 */}
      <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 11 }}>
        {candidates.map((c, i) => {
          const appear = interpolate(frame, [barsStart + i * 9, barsStart + i * 9 + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const isTop = i === 0;
          const color = warned ? T.accentAmber : isTop && tone === "confident" ? T.primary : T.onDarkSoft;
          const dim = warned ? 1 : isTop ? 1 : 0.45;

          return (
            <div key={c.token} style={{ display: "flex", alignItems: "center", gap: 20, opacity: appear }}>
              <div
                style={{
                  width: 116,
                  fontSize: 26,
                  color: T.onDark,
                  fontFamily: /^[0-9]+$/.test(c.token) ? FONT.mono : FONT.sans,
                  textAlign: "right",
                  opacity: dim,
                }}
              >
                {c.token}
              </div>
              <div style={{ flex: 1, height: 28, background: T.surfaceDarkElevated, borderRadius: 6 }}>
                <div
                  style={{
                    width: `${c.p * 100 * appear}%`,
                    height: "100%",
                    background: color,
                    borderRadius: 6,
                    opacity: dim,
                    boxShadow: warned ? `0 0 22px ${T.accentAmber}55` : "none",
                  }}
                />
              </div>
              <div
                style={{
                  width: 74,
                  fontFamily: FONT.mono,
                  fontSize: 22,
                  color: warned ? T.accentAmber : T.onDarkSoft,
                  opacity: dim,
                }}
              >
                {c.p.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* 分佈判讀 */}
      <div style={{ marginTop: 18, fontSize: 23, height: 30 }}>
        {tone === "confident" && frame >= barsStart + 60 && (
          <span style={{ color: T.accentTeal }}>▲ 有明顯尖峰：模型很有把握</span>
        )}
        {warned && <span style={{ color: T.accentAmber }}>▲ 四個差不多高：模型其實在猜</span>}
      </div>
    </div>
  );
}
