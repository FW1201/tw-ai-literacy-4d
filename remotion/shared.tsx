import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, T } from "@/lib/tokens";

/**
 * 版面安全區（1280×720）。
 * 底部 180px 留給 Takeaway 字卡——所有內容都必須結束在 CONTENT_BOTTOM 之上，
 * 否則字卡會蓋住它。這是先前五支動畫共同的重疊來源。
 */
export const STAGE_W = 1280;
export const STAGE_H = 720;
export const PAD = 64;
export const TAKEAWAY_BAND = 180;
export const CONTENT_BOTTOM = STAGE_H - TAKEAWAY_BAND; // 540
export const CONTENT_W = STAGE_W - PAD * 2; // 1152

/** 所有動畫共用的舞台：深色底 + 固定內距 + 為字卡保留的底部空間。 */
export function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: T.surfaceDark,
        fontFamily: FONT.sans,
        padding: PAD,
        paddingBottom: TAKEAWAY_BAND,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

/** 左上角的段落標籤。 */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: T.primary,
        fontSize: 20,
        fontWeight: 500,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: T.onDark,
        fontFamily: FONT.display,
        fontSize: 52,
        lineHeight: 1.15,
        marginTop: 12,
        fontVariantNumeric: "lining-nums",
      }}
    >
      {children}
    </div>
  );
}

/**
 * 結尾字卡：從底部淡入，用來收束教學重點。
 * enterAt 是進場的 frame。
 */
export function Takeaway({
  enterAt,
  children,
  tone = "coral",
}: {
  enterAt: number;
  children: React.ReactNode;
  tone?: "coral" | "dark";
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - enterAt, fps, config: { damping: 200 } });
  const y = interpolate(s, [0, 1], [28, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        right: 64,
        bottom: 56,
        opacity: s,
        transform: `translateY(${y}px)`,
        background: tone === "coral" ? T.primary : T.surfaceDarkElevated,
        color: tone === "coral" ? T.onPrimary : T.onDark,
        borderRadius: 12,
        padding: "26px 32px",
        fontSize: 30,
        lineHeight: 1.45,
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}

/** 依 frame 區間做淡入淡出，回傳 0–1 的透明度。 */
export function useFade(inAt: number, outAt?: number, dur = 12) {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [inAt, inAt + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (outAt === undefined) return fadeIn;
  const fadeOut = interpolate(frame, [outAt, outAt + dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(fadeIn, fadeOut);
}
