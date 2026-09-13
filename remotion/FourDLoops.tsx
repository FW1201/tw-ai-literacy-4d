import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, T } from "@/lib/tokens";
import { Eyebrow, Stage, Takeaway, Title } from "./shared";

/**
 * 4D 雙迴圈（20s / 600f）
 *  0–120   四個節點依序點亮
 *  120–330 描述↔辨識 快速來回 3 圈（戰術迭代）
 *  330–450 委託↔盡責 緩慢呼吸一次（策略問責）
 *  450–600 字卡收束
 */

const NODES = [
  { id: "delegation", zh: "委託", en: "Delegation", col: 0, row: 0 },
  { id: "description", zh: "描述", en: "Description", col: 1, row: 0 },
  { id: "diligence", zh: "盡責", en: "Diligence", col: 0, row: 1 },
  { id: "discernment", zh: "辨識", en: "Discernment", col: 1, row: 1 },
] as const;

const NODE_W = 300;
const NODE_H = 150;
const GAP_X = 200;
const GAP_Y = 90;
const ORIGIN_X = 190;
const ORIGIN_Y = 190;

function nodePos(col: number, row: number) {
  return {
    x: ORIGIN_X + col * (NODE_W + GAP_X),
    y: ORIGIN_Y + row * (NODE_H + GAP_Y),
  };
}

export function FourDLoops() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 描述↔辨識：120–330 來回 3 圈
  const tacticalActive = frame >= 120 && frame < 340;
  const tacticalPhase = tacticalActive
    ? (Math.sin(((frame - 120) / 70) * Math.PI * 2) + 1) / 2
    : 0;

  // 委託↔盡責：330–450 緩慢呼吸一次
  const strategicActive = frame >= 330 && frame < 460;
  const strategicPhase = strategicActive
    ? (Math.sin(((frame - 330) / 130) * Math.PI * 2 - Math.PI / 2) + 1) / 2
    : 0;

  return (
    <Stage>
      <Eyebrow>AI Fluency</Eyebrow>
      <Title>四個動作，兩組循環</Title>

      <div style={{ position: "absolute", inset: 0 }}>
        {/* 連線：右側（描述↔辨識）＝戰術迭代 */}
        <Connector
          col={1}
          active={tacticalActive}
          phase={tacticalPhase}
          label="快速迭代"
          labelSide="right"
        />
        {/* 連線：左側（委託↔盡責）＝策略問責 */}
        <Connector
          col={0}
          active={strategicActive}
          phase={strategicPhase}
          label="策略問責"
          labelSide="left"
        />

        {NODES.map((n, i) => {
          const appear = spring({ frame: frame - i * 24, fps, config: { damping: 200 } });
          const inTactical = n.id === "description" || n.id === "discernment";
          const inStrategic = n.id === "delegation" || n.id === "diligence";
          const glow =
            (inTactical && tacticalActive ? 1 : 0) || (inStrategic && strategicActive ? 1 : 0);
          const pos = nodePos(n.col, n.row);

          return (
            <div
              key={n.id}
              style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                width: NODE_W,
                height: NODE_H,
                opacity: appear,
                transform: `scale(${interpolate(appear, [0, 1], [0.9, 1])})`,
                background: glow ? T.surfaceDarkElevated : T.surfaceDarkSoft,
                border: `2px solid ${glow ? T.primary : "rgba(255,255,255,0.08)"}`,
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: glow ? `0 0 40px ${T.primary}40` : "none",
              }}
            >
              <div style={{ fontFamily: FONT.display, fontSize: 56, color: T.onDark, lineHeight: 1 }}>
                {n.zh}
              </div>
              <div style={{ fontSize: 19, color: T.onDarkSoft, marginTop: 10, letterSpacing: "0.04em" }}>
                {n.en}
              </div>
            </div>
          );
        })}
      </div>

      <Takeaway enterAt={455}>
        委託與盡責管理策略和倫理；描述與辨識管理互動和品質。
      </Takeaway>
    </Stage>
  );
}

/** 垂直雙向連線 + 沿線移動的光點，表示迴圈正在轉。 */
function Connector({
  col,
  active,
  phase,
  label,
  labelSide,
}: {
  col: number;
  active: boolean;
  phase: number;
  label: string;
  labelSide: "left" | "right";
}) {
  const top = nodePos(col, 0);
  const x = top.x + NODE_W / 2;
  const y1 = top.y + NODE_H;
  const y2 = nodePos(col, 1).y;
  const dotY = interpolate(phase, [0, 1], [y1 + 6, y2 - 6]);

  return (
    <>
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1280 720"
      >
        <line
          x1={x}
          y1={y1}
          x2={x}
          y2={y2}
          stroke={active ? T.primary : "rgba(255,255,255,0.16)"}
          strokeWidth={active ? 3 : 2}
          strokeDasharray="8 7"
        />
        {active && <circle cx={x} cy={dotY} r={9} fill={T.primary} />}
      </svg>
      {active && (
        <div
          style={{
            position: "absolute",
            top: (y1 + y2) / 2 - 16,
            left: labelSide === "right" ? x + 26 : undefined,
            right: labelSide === "left" ? 1280 - x + 26 : undefined,
            color: T.primary,
            fontSize: 20,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      )}
    </>
  );
}
