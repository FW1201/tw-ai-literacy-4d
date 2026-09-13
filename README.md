# AI 素養教育 4D 框架

台灣 K-12 教育現場適用的 AI 素養教學設計指南，單頁式互動教材。

> 教育部的指引劃出紅線，UNESCO 的能力框架標示等級——但兩者都沒有告訴老師，實際跟 AI 互動的那一刻，具體要做哪幾件事。這份教材補上中間那一層。

## 內容

| 區塊 | 說明 |
|------|------|
| 定位 | 四層鏈：教育部指引 → UNESCO CFT/CFS → 4D 框架 → 學科落地 |
| 4D 框架 | 委託 Delegation・描述 Description・辨識 Discernment・盡責 Diligence，含兩組循環 |
| 能力與限制 | 接龍式生成／知識／工作記憶／可控性四機制，附 myth-reality 對照與課堂提問 |
| 分年段設計 | 國小高年級／國中／高中三學段的 4D 側重與 108 課綱 B2 對應 |
| 評量整合 | 結果／過程／反思三種評量策略，接回既有抗 AI 評量設計原則 |
| 研習工作坊 | 90 分鐘教師研習流程與配套文件說明 |
| 學生素養 | 從大學生涯情境改寫為台灣升學情境的四組對照 |
| 校務治理 | 給校長與教學組長的四個導入提醒 |
| 資料來源 | 全部出處逐條列出 |

## 資料來源

內容整編自 Anthropic **Claude Academy** 的七門公開課程（AI Fluency: Framework & Foundations、AI Capabilities and Limitations、AI Fluency for pK–12 Educators、AI Fluency for pK-12 Train the Trainer、Teaching AI Fluency、AI Fluency for students、Building Effective Human Agent Teams），並對齊教育部《高級中等以下學校人工智慧使用和學習指引》（2026-06-05 核定）、UNESCO AI Competency Framework for Teachers / Students（2024）與十二年國教課綱核心素養 B2。

完整逐條出處見網站「資料來源」一節。

> **聲明**：本站為獨立製作的教學參考資源，非 Anthropic 官方產品，亦未獲 Anthropic、UNESCO 或教育部背書。視覺語彙參考公開的 Claude 設計語言，站內品牌標記為本站原創，未使用 Anthropic 商標。

## 設計系統

視覺規範定義於 [`DESIGN.md`](./DESIGN.md)，由 `npx getdesign@latest add claude` 產生。所有色彩、字級、圓角、間距皆以 CSS 變數形式集中在 `app/globals.css` 的 `@theme` 區塊，元件中不直接寫死色碼。

核心語彙：奶油底 `#faf9f5` × 珊瑚橘 `#cc785c` × 深墨 `#181715`，襯線標題（Cormorant Garamond / Noto Serif TC）搭配人文無襯線內文（Inter / Noto Sans TC），96px 區塊節奏，奶油→深色→珊瑚交替的頁面配速。

## 開發

```bash
npm install
npm run dev     # http://localhost:4900
npm run build
```

## 技術

Next.js 16（App Router、Turbopack）· React 19 · TypeScript · Tailwind CSS v4 · 靜態預渲染 · 部署於 Vercel

## 授權

內容為教學用途整編，引用來源均已標註。程式碼部分歡迎教師 fork 改作為自己的教材站。
