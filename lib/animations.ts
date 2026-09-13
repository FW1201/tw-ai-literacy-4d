/**
 * 概念動畫中繼資料。
 * caption 用語沿用 claude-edu-handbook 的 concept-visuals.ts 風格，維持跨專案一致。
 * 實際的 Remotion composition 註冊在 remotion/Root.tsx。
 */
export type AnimationId =
  | "next-token"
  | "knowledge-cutoff"
  | "context-window"
  | "steerability"
  | "four-d-loops";

export interface AnimationMeta {
  id: AnimationId;
  title: string;
  caption: string;
  /** 對應的 4D 環節，顯示在字卡與播放器角落 */
  fluency: string;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
}

export const FPS = 30;

export const ANIMATIONS: Record<AnimationId, AnimationMeta> = {
  "next-token": {
    id: "next-token",
    title: "接龍式生成",
    caption: "每個字都是猜出來的。機率分佈愈平坦，代表模型自己也愈不確定——那正是編造集中的地方。",
    fluency: "辨識 Discernment",
    durationInFrames: 24 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
  "knowledge-cutoff": {
    id: "knowledge-cutoff",
    title: "知識截止與資料密度",
    caption: "常見且久遠的事，模型答得穩；冷門、最新、校內的事，資料本來就不在裡面，要自己給。",
    fluency: "辨識 Discernment",
    durationInFrames: 18 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
  "context-window": {
    id: "context-window",
    title: "脈絡視窗",
    caption: "它只記得框裡的東西。太長的文件中段會被稀釋，換一個新對話則整個清空。",
    fluency: "描述 Description",
    durationInFrames: 20 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
  steerability: {
    id: "steerability",
    title: "可控性",
    caption: "可驗證的限制讓輸出收斂，抽象的形容詞讓輸出發散。這是描述品質的直接後果。",
    fluency: "描述 Description",
    durationInFrames: 18 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
  "four-d-loops": {
    id: "four-d-loops",
    title: "AI Fluency 雙迴圈",
    caption: "委託與盡責管理策略和倫理；描述與辨識管理互動和品質。",
    fluency: "四環節全覽",
    durationInFrames: 20 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
};
