# AI Fluency 4D 框架臺灣教育體系應用（Original by Anthropic）

**AI Fluency 4D Framework — 臺灣教育現場之實踐應用**

台灣 K-12 教育現場適用的 AI 素養教學設計指南，6 頁式閱讀教材。線上版：<https://tw-ai-literacy-4d.vercel.app>

<img src="public/brand/logo.png" width="96" alt="站台標誌" />

> 教育部的指引告訴我們哪些事不能做，UNESCO 告訴我們能力要到哪裡。可是打開 AI 的那一刻，老師到底該做什麼？這個網站想回答這一題。

## 內容

| 路徑 | 頁面名稱 | 英文副標 | 說明 |
|------|------|------|------|
| `/` | 首頁 | — | 四層定位：教育部指引 → UNESCO CFT/CFS → 4D 框架 → 學科應用 |
| `/framework` | 定義 AI Fluency | The 4D Framework | 委託、描述、辨識、盡責，兩組循環，對照教育部原則與 UNESCO 能力；概念動畫 1 支 |
| `/how-ai-works` | Generative AI 基本原理 | How Generative AI Works | 接龍式生成、知識、工作記憶、可控性四個機制，含能力光譜、誤解與實際、交疊圖；概念動畫 4 支 |
| `/classroom` | 課堂實踐與思考 | Classroom Practice | 學段側重熱力圖、評量時機、16 筆實踐案例、學生篇改寫 |
| `/prompts` | Prompt Reference | Prompts for Teaching | 60 筆 Claude 教學提示詞，七段結構、搜尋與篩選、一鍵複製 |
| `/sources` | 資料來源 | Sources & Citations | 全部出處，標註各自用在哪一頁 |

## 資料來源

內容整編自 Anthropic **Claude Academy** 的五門公開課程（AI Fluency: Framework & Foundations、AI Capabilities and Limitations、AI Fluency for pK–12 Educators、Teaching AI Fluency、AI Fluency for students），並對齊教育部《高級中等以下學校人工智慧使用和學習指引》（2026-06-05 核定）、UNESCO AI Competency Framework for Teachers / Students（2024）與十二年國教課綱核心素養 B2。

完整逐條出處見網站「資料來源」一節。

> **聲明**：本站為獨立製作的教學參考資源，非 Anthropic 官方產品，亦未獲 Anthropic、UNESCO 或教育部背書。視覺語彙參考公開的 Claude 設計語言，站內標誌為作者吳奇的個人品牌徽章，未使用 Anthropic 商標。

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
