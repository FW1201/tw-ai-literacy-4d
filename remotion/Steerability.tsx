import { interpolate, useCurrentFrame } from "remotion";
import { T } from "@/lib/tokens";
import { Eyebrow, Stage, Takeaway, Title } from "./shared";

/**
 * 可控性（18s / 540f）
 * 同一個任務、兩種指令：左邊抽象 → 輸出發散；右邊可驗證 → 輸出收斂。
 *   40–130  兩側指令出現
 *  130–290  左側產生五個發散的分身；右側收斂成單一結果
 *  290–380  下方「可驗證性」量尺對照
 *  400–540  字卡
 */

const GHOSTS = [
  { x: 20, y: 0, r: -7 },
  { x: 92, y: 44, r: 5 },
  { x: -8, y: 92, r: -3 },
  { x: 110, y: 138, r: 8 },
  { x: 44, y: 182, r: -5 },
];

export function Steerability() {
  const frame = useCurrentFrame();

  const promptsIn = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gauge = interpolate(frame, [290, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage>
      <Eyebrow>Steerability</Eyebrow>
      <Title>同一個任務，兩種下法</Title>

      <div style={{ display: "flex", gap: 40, marginTop: 40, opacity: promptsIn }}>
        <Side
          tone="vague"
          prompt="「寫得有創意一點」"
          note="抽象、無法驗證"
          gauge={gauge}
          gaugeValue={0.22}
          gaugeLabel="可驗證性低"
        />
        <Side
          tone="precise"
          prompt="「用表格，限 100 字，每列含：詞語／解釋／例句」"
          note="具體、可逐項核對"
          gauge={gauge}
          gaugeValue={0.93}
          gaugeLabel="可驗證性高"
        />
      </div>

      {/* 輸出區 */}
      <div style={{ position: "absolute", left: 64, right: 64, top: 356, height: 240 }}>
        <div style={{ display: "flex", gap: 40, height: "100%" }}>
          {/* 左：發散 */}
          <div style={{ flex: 1, position: "relative" }}>
            {GHOSTS.map((g, i) => {
              const appear = interpolate(frame, [130 + i * 16, 130 + i * 16 + 26], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const spread = interpolate(frame, [150, 290], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: g.x * spread,
                    top: g.y * spread * 0.92,
                    width: 300,
                    height: 40,
                    borderRadius: 8,
                    background: T.onDark,
                    opacity: appear * 0.2,
                    transform: `rotate(${g.r * spread}deg)`,
                  }}
                />
              );
            })}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                color: T.onDarkSoft,
                fontSize: 22,
                opacity: interpolate(frame, [250, 290], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              每次結果都不一樣，也說不出哪裡不對
            </div>
          </div>

          {/* 右：收斂 */}
          <div style={{ flex: 1, position: "relative" }}>
            {[0, 1, 2].map((i) => {
              const appear = interpolate(frame, [140 + i * 22, 140 + i * 22 + 26], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: i * 52,
                    width: 420,
                    height: 40,
                    borderRadius: 8,
                    background: T.primary,
                    opacity: appear * (0.94 - i * 0.14),
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 16,
                    color: T.onPrimary,
                    fontSize: 19,
                  }}
                >
                  {["詞語｜解釋｜例句", "詞語｜解釋｜例句", "詞語｜解釋｜例句"][i]}
                </div>
              );
            })}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                color: T.accentTeal,
                fontSize: 22,
                opacity: interpolate(frame, [250, 290], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              格式固定，字數可以直接數
            </div>
          </div>
        </div>
      </div>

      {frame >= 400 && (
        <Takeaway enterAt={400}>
          能被驗證的限制，才有約束力。「創意一點」無法核對，「限 100 字」可以。
        </Takeaway>
      )}
    </Stage>
  );
}

function Side({
  tone,
  prompt,
  note,
  gauge,
  gaugeValue,
  gaugeLabel,
}: {
  tone: "vague" | "precise";
  prompt: string;
  note: string;
  gauge: number;
  gaugeValue: number;
  gaugeLabel: string;
}) {
  const accent = tone === "precise" ? T.primary : T.onDarkSoft;
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          background: T.surfaceDarkElevated,
          border: `2px solid ${tone === "precise" ? T.primary : "rgba(255,255,255,0.1)"}`,
          borderRadius: 12,
          padding: "20px 22px",
          minHeight: 108,
          color: T.onDark,
          fontSize: 25,
          lineHeight: 1.4,
        }}
      >
        {prompt}
      </div>
      <div style={{ marginTop: 12, color: accent, fontSize: 21 }}>{note}</div>

      {gauge > 0 && (
        <div style={{ marginTop: 14, opacity: gauge }}>
          <div style={{ height: 10, background: T.surfaceDarkElevated, borderRadius: 5 }}>
            <div
              style={{
                width: `${gaugeValue * 100 * gauge}%`,
                height: "100%",
                background: accent,
                borderRadius: 5,
              }}
            />
          </div>
          <div style={{ marginTop: 7, color: accent, fontSize: 19 }}>{gaugeLabel}</div>
        </div>
      )}
    </div>
  );
}
