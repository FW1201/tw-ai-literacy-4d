/**
 * Design token 的 TypeScript 版本。
 *
 * ⚠️ 與 app/globals.css 的 @theme 區塊是兩份來源，修改時兩邊都要改。
 * 需要這一份是因為 Remotion composition 用 inline style 而非 Tailwind class——
 * 這樣動畫在網頁的 Player 與（日後若加裝 CLI）MP4 匯出環境下都能正確上色。
 * 值均取自 DESIGN.md（getdesign "claude" profile）。
 */
export const T = {
  canvas: "#faf9f5",
  surfaceSoft: "#f5f0e8",
  surfaceCard: "#efe9de",
  surfaceCreamStrong: "#e8e0d2",
  surfaceDark: "#181715",
  surfaceDarkElevated: "#252320",
  surfaceDarkSoft: "#1f1e1b",

  primary: "#cc785c",
  primaryActive: "#a9583e",
  primaryInk: "#9c4f36",
  primaryStrong: "#a9583e",
  accentTeal: "#5db8a6",
  accentAmber: "#e8a55a",

  ink: "#141413",
  body: "#3d3d3a",
  muted: "#65625b",
  mutedSoft: "#8e8b82",
  onPrimary: "#ffffff",
  onDark: "#faf9f5",
  onDarkSoft: "#a09d96",

  hairline: "#e6dfd8",

  success: "#5db872",
  warning: "#d4a017",
  error: "#c64545",
} as const;

export const FONT = {
  display: '"Cormorant Garamond", "Noto Serif TC", Georgia, serif',
  sans: 'Inter, "Noto Sans TC", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
} as const;
