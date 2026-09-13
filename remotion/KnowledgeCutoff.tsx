import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T } from "@/lib/tokens";
import { Eyebrow, Stage, Takeaway, Title } from "./shared";

/**
 * 知識截止與資料密度（18s / 540f）
 * 三個查詢依序落下，落點的資料密度決定可靠度。
 *   40–110  時間軸與資料點浮現，截止線畫出
 *  120–220  查詢一：落在密集區 → 綠勾
 *  220–320  查詢二：落在截止線右側空白 → 琥珀警示
 *  320–420  查詢三：落在軸外完全無資料處 → 紅色
 *  430–540  字卡
 */

const AXIS_Y = 430;
const AXIS_L = 110;
const AXIS_R = 1170;
const CUTOFF_X = 880;

const QUERIES = [
  {
    at: 120,
    label: "唐詩三百首",
    x: 300,
    y: AXIS_Y - 120,
    verdict: "資料又多又久 → 答得穩",
    color: T.accentTeal,
    mark: "✓",
  },
  {
    at: 230,
    label: "2026 年新頒的法規",
    x: 990,
    y: AXIS_Y - 90,
    verdict: "在截止線之後 → 它沒讀過，卻仍會自信作答",
    color: T.accentAmber,
    mark: "!",
  },
  {
    at: 340,
    label: "本校 113 學年度行事曆",
    x: 640,
    y: AXIS_Y + 92,
    verdict: "從來不在訓練資料裡 → 必須自己提供",
    color: T.error,
    mark: "✕",
  },
];

export function KnowledgeCutoff() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const axis = interpolate(frame, [40, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cutoff = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const active = [...QUERIES].reverse().find((q) => frame >= q.at);

  return (
    <Stage>
      <Eyebrow>Knowledge</Eyebrow>
      <Title>它讀過什麼，決定它答得準不準</Title>

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1280 720"
      >
        {/* 資料密度：左側密、右側疏 */}
        {Array.from({ length: 54 }).map((_, i) => {
          const x = AXIS_L + 12 + i * 19;
          if (x > CUTOFF_X - 10) return null;
          const density = Math.max(0.08, 0.85 - i * 0.014);
          const h = 14 + ((i * 53) % 58);
          return (
            <circle
              key={i}
              cx={x}
              cy={AXIS_Y - h - 10}
              r={5}
              fill={T.accentTeal}
              opacity={density * axis}
            />
          );
        })}

        {/* 時間軸 */}
        <line
          x1={AXIS_L}
          y1={AXIS_Y}
          x2={AXIS_L + (AXIS_R - AXIS_L) * axis}
          y2={AXIS_Y}
          stroke={T.onDarkSoft}
          strokeWidth={2.5}
        />
        <text x={AXIS_L} y={AXIS_Y + 34} fill={T.onDarkSoft} fontSize={20} opacity={axis}>
          久遠、常見
        </text>
        <text x={AXIS_R} y={AXIS_Y + 34} fill={T.onDarkSoft} fontSize={20} textAnchor="end" opacity={axis}>
          最新
        </text>

        {/* 知識截止線 */}
        <line
          x1={CUTOFF_X}
          y1={AXIS_Y - 240 * cutoff}
          x2={CUTOFF_X}
          y2={AXIS_Y + 150 * cutoff}
          stroke={T.primary}
          strokeWidth={3}
          strokeDasharray="9 7"
        />
        <text x={CUTOFF_X + 14} y={AXIS_Y - 218} fill={T.primary} fontSize={22} opacity={cutoff}>
          知識截止
        </text>

        {/* 查詢落點 */}
        {QUERIES.map((q) => {
          const s = spring({ frame: frame - q.at, fps, config: { damping: 200 } });
          if (s <= 0.001) return null;
          const drop = interpolate(s, [0, 1], [-90, 0]);
          return (
            <g key={q.label} opacity={s} transform={`translate(0, ${drop})`}>
              <circle cx={q.x} cy={q.y} r={13} fill={q.color} />
              <circle cx={q.x} cy={q.y} r={24} fill="none" stroke={q.color} strokeWidth={2} opacity={0.45} />
              <text
                x={q.x}
                y={q.y - 38}
                fill={q.color}
                fontSize={23}
                textAnchor="middle"
                fontWeight={500}
              >
                {q.mark} {q.label}
              </text>
            </g>
          );
        })}
      </svg>

      {active && (
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 170,
            color: active.color,
            fontSize: 27,
            fontWeight: 500,
          }}
        >
          {active.verdict}
        </div>
      )}

      {frame >= 430 && (
        <Takeaway enterAt={430}>
          冷門、最新、只存在於你學校裡的事——資料本來就不在裡面，要自己給。
        </Takeaway>
      )}
    </Stage>
  );
}
