import { interpolate, useCurrentFrame } from "remotion";
import { T } from "@/lib/tokens";
import { Eyebrow, Stage, Takeaway, Title } from "./shared";

/**
 * 可控性（18s / 540f）
 * 同一個任務、兩種指令：左邊抽象 → 輸出發散；右邊可驗證 → 輸出收斂。
 *   40–130  兩側指令出現
 *  130–290  左側五個分身漸漸散開；右側收斂成固定格式
 *  290–380  可驗證性量尺對照
 *  400–540  字卡
 *
 * 版面採單一 flow（欄內由上而下：指令 → 輸出 → 結論 → 量尺），
 * 不用絕對定位——先前版本輸出區用 absolute 疊在量尺上造成重疊。
 */

const GHOSTS = [
  { x: 16, y: 0, r: -7 },
  { x: 74, y: 34, r: 5 },
  { x: -6, y: 68, r: -3 },
  { x: 88, y: 102, r: 8 },
  { x: 34, y: 136, r: -5 },
];

const OUTPUT_H = 186;

export function Steerability() {
  const frame = useCurrentFrame();

  const promptsIn = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const conclude = interpolate(frame, [250, 290], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gauge = interpolate(frame, [290, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const spread = interpolate(frame, [150, 290], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage>
      <Eyebrow>Steerability</Eyebrow>
      <Title>同一個任務，兩種下法</Title>

      <div style={{ display: "flex", gap: 44, marginTop: 26, opacity: promptsIn }}>
        {/* 左：抽象指令 */}
        <Column
          prompt="「寫得有創意一點」"
          note="抽象、無法驗證"
          accent={T.onDarkSoft}
          highlighted={false}
          conclusion="每次結果都不一樣，也說不出哪裡不對"
          conclusionColor={T.onDarkSoft}
          conclude={conclude}
          gauge={gauge}
          gaugeValue={0.22}
          gaugeLabel="可驗證性低"
        >
          {GHOSTS.map((g, i) => {
            const appear = interpolate(frame, [130 + i * 16, 130 + i * 16 + 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: g.x * spread,
                  top: g.y * spread,
                  width: 290,
                  height: 34,
                  borderRadius: 8,
                  background: T.onDark,
                  opacity: appear * 0.2,
                  transform: `rotate(${g.r * spread}deg)`,
                }}
              />
            );
          })}
        </Column>

        {/* 右：可驗證指令 */}
        <Column
          prompt="「用表格，限 100 字，每列含：詞語／解釋／例句」"
          note="具體、可逐項核對"
          accent={T.primary}
          highlighted
          conclusion="格式固定，字數可以直接數"
          conclusionColor={T.accentTeal}
          conclude={conclude}
          gauge={gauge}
          gaugeValue={0.93}
          gaugeLabel="可驗證性高"
        >
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
                  top: i * 46,
                  width: 400,
                  height: 34,
                  borderRadius: 8,
                  background: T.primary,
                  opacity: appear * (0.94 - i * 0.14),
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 14,
                  color: T.onPrimary,
                  fontSize: 18,
                }}
              >
                詞語｜解釋｜例句
              </div>
            );
          })}
        </Column>
      </div>

      {frame >= 400 && (
        <Takeaway enterAt={400}>
          能被驗證的限制，才有約束力。「創意一點」無法核對，「限 100 字」可以。
        </Takeaway>
      )}
    </Stage>
  );
}

function Column({
  prompt,
  note,
  accent,
  highlighted,
  conclusion,
  conclusionColor,
  conclude,
  gauge,
  gaugeValue,
  gaugeLabel,
  children,
}: {
  prompt: string;
  note: string;
  accent: string;
  highlighted: boolean;
  conclusion: string;
  conclusionColor: string;
  conclude: number;
  gauge: number;
  gaugeValue: number;
  gaugeLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          background: T.surfaceDarkElevated,
          border: `2px solid ${highlighted ? T.primary : "rgba(255,255,255,0.1)"}`,
          borderRadius: 12,
          padding: "18px 20px",
          minHeight: 96,
          color: T.onDark,
          fontSize: 24,
          lineHeight: 1.4,
          display: "flex",
          alignItems: "center",
        }}
      >
        {prompt}
      </div>
      <div style={{ marginTop: 10, color: accent, fontSize: 20 }}>{note}</div>

      {/* 輸出區：高度固定，內部絕對定位不會外溢 */}
      <div style={{ position: "relative", height: OUTPUT_H, marginTop: 16 }}>{children}</div>

      <div style={{ color: conclusionColor, fontSize: 20, opacity: conclude, minHeight: 28 }}>
        {conclusion}
      </div>

      <div style={{ marginTop: 12, opacity: gauge }}>
        <div style={{ height: 9, background: T.surfaceDarkElevated, borderRadius: 5 }}>
          <div
            style={{
              width: `${gaugeValue * 100 * gauge}%`,
              height: "100%",
              background: accent,
              borderRadius: 5,
            }}
          />
        </div>
        <div style={{ marginTop: 6, color: accent, fontSize: 18 }}>{gaugeLabel}</div>
      </div>
    </div>
  );
}
