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
    caption: "每個字都是猜出來的。候選字的機率越接近，代表 AI 自己也越沒把握，編造最常出現在這種時候。",
    fluency: "辨識 Discernment",
    durationInFrames: 24 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
  "knowledge-cutoff": {
    id: "knowledge-cutoff",
    title: "知識截止與資料密度",
    caption: "常見又有年代的事，AI 答得比較穩；冷門、最新或學校內部的事，它根本沒讀過，要由你提供。",
    fluency: "辨識 Discernment",
    durationInFrames: 18 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
  "context-window": {
    id: "context-window",
    title: "脈絡視窗",
    caption: "它只記得框裡的內容。文件太長，中間容易被忽略；開了新對話，前面的內容就不見了。",
    fluency: "描述 Description",
    durationInFrames: 20 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
  steerability: {
    id: "steerability",
    title: "可控性",
    caption: "容易檢查的限制，會讓結果更貼近你要的；抽象的形容詞，會讓結果越跑越散。描述寫得好不好，差別就在這裡。",
    fluency: "描述 Description",
    durationInFrames: 18 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
  "four-d-loops": {
    id: "four-d-loops",
    title: "4D 的兩組循環",
    caption: "委託和盡責，處理的是要不要用、用了誰負責；描述和辨識，處理的是怎麼溝通、結果好不好。",
    fluency: "四個動作一起看",
    durationInFrames: 20 * FPS,
    fps: FPS,
    width: 1280,
    height: 720,
  },
};
