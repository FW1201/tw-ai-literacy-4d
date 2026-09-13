import { interpolate, useCurrentFrame } from "remotion";
import { T } from "@/lib/tokens";
import { Eyebrow, Stage, Takeaway, Title } from "./shared";

/**
 * 脈絡視窗（20s / 600f）
 *   40–200  長文件滑入有邊界的框，超出的部分變暗掉落
 *  200–330  框內中段亮度衰減（lost in the middle），頭尾維持明亮
 *  330–430  畫面清空 →「新對話」標籤
 *  440–600  字卡
 */

const LINES = 26;
const FRAME_TOP = 210;
const FRAME_H = 300;
const LINE_H = 22;

export function ContextWindow() {
  const frame = useCurrentFrame();

  // 文件整體上移，讓前段滑出框外
  const scroll = interpolate(frame, [40, 200], [180, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const middleFade = interpolate(frame, [200, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const clearing = interpolate(frame, [330, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage>
      <Eyebrow>Context window</Eyebrow>
      <Title>它只記得「框裡」的東西</Title>

      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          top: FRAME_TOP,
          display: "flex",
          gap: 26,
        }}
      >
        {/* 左欄：視窗框 + 底部提示 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 視窗框 */}
          <div
            style={{
              position: "relative",
              height: FRAME_H,
              border: `3px solid ${T.primary}`,
              borderRadius: 14,
              overflow: "hidden",
              background: T.surfaceDarkSoft,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: scroll,
                opacity: 1 - clearing,
              }}
            >
              {Array.from({ length: LINES }).map((_, i) => {
                const y = scroll + i * LINE_H;
                // 相對於框的位置：0 = 框頂，1 = 框底
                const rel = (y - 0) / FRAME_H;
                const inFrame = rel >= 0 && rel <= 1;
                // 中段衰減：離頭尾愈遠愈暗
                const middleness = inFrame ? 1 - Math.abs(rel - 0.5) * 2 : 0;
                const opacity = inFrame
                  ? 0.9 - middleFade * middleness * 0.72
                  : 0.1;

                return (
                  <div
                    key={i}
                    style={{
                      height: 10,
                      margin: `0 28px ${LINE_H - 10}px 28px`,
                      borderRadius: 5,
                      background: T.onDark,
                      opacity,
                      width: i % 4 === 3 ? "58%" : i % 3 === 0 ? "82%" : "92%",
                    }}
                  />
                );
              })}
            </div>

            {/* 清空後的新對話 */}
            {clearing > 0.5 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: T.onDarkSoft,
                  fontSize: 30,
                  opacity: (clearing - 0.5) * 2,
                }}
              >
                新對話 — 框內是空的
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 20,
            }}
          >
            <span style={{ color: T.onDarkSoft, opacity: 1 - clearing }}>
              ↑ 超出框的部分，它讀不到
            </span>
            <span style={{ color: T.primary, opacity: clearing }}>
              換一個對話 → 全部清空
            </span>
          </div>
        </div>

        {/* 右側註記欄：標籤放在框外，不壓住內容 */}
        <div style={{ width: 232, flexShrink: 0, paddingTop: 8 }}>
          <Annotation color={T.onDarkSoft} opacity={1 - clearing} y={16}>
            頭尾讀得清楚
          </Annotation>
          <Annotation
            color={T.accentAmber}
            opacity={middleFade * (1 - clearing)}
            y={FRAME_H / 2 - 26}
          >
            中段容易被忽略
          </Annotation>
          <Annotation
            color={T.onDarkSoft}
            opacity={1 - clearing}
            y={FRAME_H - 56}
          >
            頭尾讀得清楚
          </Annotation>
        </div>
      </div>

      {frame >= 440 && (
        <Takeaway enterAt={440}>
          太長的文件，中段會被稀釋；換一個新對話，前面講過的全部歸零。
        </Takeaway>
      )}
    </Stage>
  );
}

/** 框外的側邊註記，用一條短橫線指回框內對應高度。 */
function Annotation({
  color,
  opacity,
  y,
  children,
}: {
  color: string;
  opacity: number;
  y: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity,
        height: 0,
      }}
    >
      <span
        style={{ width: 18, height: 2, background: color, flexShrink: 0 }}
      />
      <span style={{ color, fontSize: 19, whiteSpace: "nowrap" }}>
        {children}
      </span>
    </div>
  );
}
