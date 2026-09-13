/**
 * 台灣教育現場實踐案例（16 筆）
 *
 * 來源：FW1201/claude-edu-handbook 的 lib/cases.ts，原樣搬入。
 * 每筆都是「情境 → 逐步做法 → 提示詞 → 對應 4D」的完整結構，
 * fluency 欄位即本站的 4D 環節。
 */

/** Claude 的三種使用模式。原檔從 ./modes 匯入，此處內聯以減少相依。 */
export type Mode = "chat" | "cowork" | "code";

export const MODE_LABEL: Record<Mode, string> = {
  chat: "Chat 對話",
  cowork: "Cowork 桌面代理",
  code: "Claude Code",
};

export type CaseTrack = "teacher" | "project" | "agentic" | "admin" | "writing";

export const TRACK_LABEL: Record<CaseTrack, string> = {
  teacher: "教師備課",
  project: "學生專題研究",
  agentic: "Agentic Coding",
  admin: "行政減法",
  writing: "寫作教學",
};

export type Level = "入門" | "進階" | "挑戰";

export interface CaseStep {
  t: string; // 步驟標題
  d: string; // 說明
}

export interface CaseItem {
  id: string;
  track: CaseTrack;
  title: string;
  level: Level;
  modes: Mode[];
  summary: string;
  steps: CaseStep[];
  prompt?: string;
  code?: { title: string; lang?: string; body: string };
  ageNote?: string;
  fluency: string;
  /** 預設（不填）為台灣情境練習；international 為真實國際案例，需搭配 regionNote 說明與台灣情境的差異。 */
  region?: "international";
  regionNote?: string;
}

export const CASES: CaseItem[] = [
  // ---------------- 教師備課 ----------------
  {
    id: "TC-1",
    track: "teacher",
    title: "一節素養課從零到完整教案",
    level: "入門",
    modes: ["chat"],
    summary:
      "用結構化 Prompt 讓 Claude Chat 產出對應 108 課綱的教案骨架，教師再依班級微調。最單純的入門場景。",
    fluency: "Description · Discernment",
    steps: [
      { t: "設定脈絡", d: "提供年級、科目、主題、學生先備知識與一節課時長。" },
      { t: "結構化委派", d: "要求依「情境引發 → 探究 → 建構 → 反思」四階段輸出，含時間分配與形成性評量。" },
      { t: "教師判讀", d: "檢視引導語是否可直接唸出、評量是否真的測到能力，而非知識記憶。" },
      { t: "保留主體", d: "教師加入自己班級的調整，並自問：『換另一班，我知道怎麼改嗎？』" },
    ],
    prompt:
      "你是熟悉 108 課綱的高中[科目]教師。為[年級]主題[主題]設計一節 50 分鐘素養導向教案，依「情境引發 → 探究 → 建構 → 反思」四階段輸出，每階段含教師引導語、學生任務、時間、形成性評量。最後附備課提醒與常見風險。",
  },
  {
    id: "TC-2",
    track: "teacher",
    title: "把整學期講義變成可查詢知識庫",
    level: "進階",
    modes: ["cowork"],
    summary:
      "Cowork 模式讀取你的雲端講義、課綱、會議紀錄，整合成可問答的知識庫，備課時直接查。",
    fluency: "Delegation · Diligence",
    steps: [
      { t: "連接資料來源", d: "在 Cowork 串接 Google Drive，授權讀取課程資料夾。" },
      { t: "交付整理任務", d: "請 Claude 彙整各週講義重點、建立索引，並標出前後單元的概念關聯。" },
      { t: "查詢式備課", d: "之後可直接問：『第 5 週的概念有哪些學生常見誤解？』" },
      { t: "隱私把關", d: "確認學生個資不在授權範圍；只開放必要資料夾。" },
    ],
    ageNote: "若資料含學生個資，需依校園資料隱私規範處理，建議去識別化。",
  },
  {
    id: "TC-3",
    track: "teacher",
    title: "拍照上傳手寫測驗卷，快速歸納全班錯誤類型",
    level: "進階",
    modes: ["chat"],
    summary:
      "多模態案例：教師直接拍照或掃描一疊手寫測驗卷上傳給 Claude，請它辨識答案、比對正解，並歸納出全班常見的錯誤類型與迷思概念，取代逐份人工統計。",
    fluency: "Description · Discernment",
    steps: [
      { t: "拍照上傳", d: "把測驗卷拍清楚（避免反光、歪斜），去識別化後（遮蓋姓名座號）上傳圖片給 Claude。" },
      { t: "提供正解與評分規準", d: "同時提供正確答案與評分規準，讓 Claude 有比對基準，而不是自己猜測對錯。" },
      { t: "請求歸納錯誤類型", d: "要求 Claude 依題號歸納全班常見的錯誤類型與可能的迷思概念，而非只給對錯統計。" },
      { t: "教師覆核辨識結果", d: "手寫字跡辨識可能有誤，教師須抽查幾份原始卷面，確認 Claude 讀取的答案正確，再採用歸納結果調整教學。" },
    ],
    prompt:
      "以下是[科目][年級]測驗卷的照片（已去識別化，遮蓋姓名座號），正確答案與評分規準為：[正解/規準]。請比對每張卷面的作答與正解，依題號統計全班答對率，並歸納出常見的錯誤類型與可能的迷思概念。若某些字跡難以辨識，請明確標出，不要用猜測的答案計入統計。",
    ageNote: "上傳前務必先遮蓋或裁切姓名、座號等可識別資訊；辨識結果屬教學參考，正式成績仍以教師人工核對為準。",
  },

  // ---------------- 學生專題研究 ----------------
  {
    id: "PJ-1",
    track: "project",
    title: "探究與實作：從模糊興趣到可研究問題",
    level: "入門",
    modes: ["chat"],
    summary:
      "對應 AI Fluency 學生版核心『AI 幫我學會，而非幫我完成』。Claude 只當蘇格拉底式提問者，題目由學生主導。",
    fluency: "Delegation · Discernment",
    steps: [
      { t: "設定引導角色", d: "要求 Claude『不要直接給題目』，改用一次一問的方式引導聚焦。" },
      { t: "收斂問題", d: "釐清核心好奇、可探究性、範圍大小，學生自己說出研究問題。" },
      { t: "主體檢核", d: "老師課堂提問：『換掉 AI，這個題目還是你的嗎？』" },
    ],
    prompt:
      "我想做關於[主題領域]的專題，目前方向模糊。請用蘇格拉底式提問引導我聚焦，一次問一個問題，協助我釐清核心問題、可探究性與範圍。不要直接幫我訂題目。",
    ageNote: "未滿 18 歲學生請在教師中介或 Claude for Education 機構帳號下進行。",
  },
  {
    id: "PJ-2",
    track: "project",
    title: "文獻整理與質性編碼（長脈絡）",
    level: "進階",
    modes: ["chat", "cowork"],
    summary:
      "上傳多篇資料與訪談逐字稿，Claude 產出比較表與初步主題編碼草稿，學生負責判讀與最終決定。",
    fluency: "Description · Discernment",
    steps: [
      { t: "餵入資料", d: "利用 Claude 的長脈絡能力一次讀入多份文獻或逐字稿（實際上限請以官方模型頁面為準）。" },
      { t: "結構化整理", d: "請求『來源／主張／證據／關聯／可信度疑慮』比較表，並標出矛盾處。" },
      { t: "初步編碼", d: "對逐字稿做歸納式開放編碼草稿，附代表性引述與出處行數。" },
      { t: "學生定奪", d: "Claude 須列出不確定／可能過度詮釋處，由學生做最終判斷。" },
    ],
    prompt:
      "以下是我蒐集的多份資料與一份訪談逐字稿。① 製作比較表（來源／主張／證據／與我研究問題的關聯／可信度疑慮），標出矛盾；② 對逐字稿做開放編碼初步草稿，附代表引述與行數。請標出你不確定之處，由我最終判斷。",
  },
  {
    id: "PJ-3",
    track: "project",
    title: "把專題成果做成互動網站並上線分享",
    level: "挑戰",
    modes: ["code"],
    summary:
      "學生專題的高階延伸：用 Claude Code 把研究成果做成互動網頁，推上 GitHub、部署 Vercel，產生可放進學習歷程的作品連結。銜接 Agentic Coding。",
    fluency: "Delegation · Diligence",
    steps: [
      { t: "規劃", d: "用 explore → plan 工作流，先讓 Claude Code 提計畫並定義成功標準。" },
      { t: "實作", d: "生成互動視覺化（如資料圖表、時間軸），本機預覽確認。" },
      { t: "版本控制", d: "用 gh CLI 建 repo 並推送（每個遠端動作先確認）。" },
      { t: "部署", d: "用 vercel CLI 產生 preview 連結，放進學習歷程檔案。" },
    ],
    ageNote: "公開部署屬對外動作；未成年學生作品上線前請經教師審閱，避免揭露個資。",
  },
  {
    id: "PJ-4",
    track: "project",
    title: "跨科專題：用統計方法驗證生物觀察假設",
    level: "進階",
    modes: ["chat"],
    summary:
      "跨科目案例：學生的生物觀察專題（例如植物生長條件）需要用到數學／統計方法驗證假設，Claude 同時扮演統計顧問與生物學術語校對，幫學生把兩科知識接起來，而不是分開問兩次得到不連貫的答案。",
    fluency: "Delegation · Discernment",
    steps: [
      { t: "說明研究情境", d: "同時提供生物觀察的假設、實驗設計與蒐集到的原始數據，讓 Claude 理解跨科脈絡而非只看數字。" },
      { t: "請求對應的統計方法", d: "請 Claude 依樣本數與資料型態建議合適的統計檢定（如 t 檢定、變異數分析），並用生物課學生能理解的方式解釋為什麼選這個方法。" },
      { t: "檢查生物學解讀是否合理", d: "統計顯著不等於生物學上有意義，請 Claude 另外評論這個結果在生物脈絡下的合理性與限制。" },
      { t: "學生跨科驗證", d: "學生分別請教數學老師確認統計方法、生物老師確認結論解讀，AI 的建議只是起點，不是兩科的最終答案來源。" },
    ],
    prompt:
      "我的生物觀察專題假設是：[假設]，實驗設計是：[設計]，蒐集到的原始數據是：[數據]。請（1）建議適合的統計檢定方法並說明為什麼適用這組資料的樣本數與型態；（2）用高中生能理解的方式解釋這個統計方法在做什麼；（3）評論統計結果在生物學脈絡下是否合理，以及有哪些限制或可能的干擾變因我沒有控制到。",
    ageNote: "統計方法與生物學結論建議都需分別經數學老師與生物老師確認，AI 產出僅作為跨科整合的起點。",
  },

  // ---------------- Agentic Coding ----------------
  {
    id: "AG-1",
    track: "agentic",
    title: "三模式設定：Chat / Cowork / Code 各自怎麼開始",
    level: "入門",
    modes: ["chat", "cowork", "code"],
    summary:
      "同一位教師如何依任務選對模式並完成初始設定--這是進入 Agentic Coding 前的地基。",
    fluency: "Delegation",
    steps: [
      { t: "Chat", d: "claude.ai 註冊登入即可；適合備課問答、素材生成。免安裝。" },
      { t: "Cowork", d: "在 Claude 桌面 App 開啟 Cowork，串接 Google Drive／檔案，交付知識庫整理任務。" },
      { t: "Code", d: "終端機安裝 Claude Code，於專案資料夾啟動，進入 explore→plan→code→commit 工作流。" },
    ],
    code: {
      title: "安裝 Claude Code",
      lang: "bash",
      body: `# 1. 安裝（官方建議方式，依平台而定）
curl -fsSL https://claude.ai/install.sh | sh

# 2. 在你的專案資料夾啟動
cd my-teaching-tool
claude

# 3. 第一個 prompt（Claude 會先讀取專案再行動）
> 請先讀懂這個專案的結構，先別改任何東西`,
    },
  },
  {
    id: "AG-2",
    track: "agentic",
    title: "教師備課工具：Claude Code + GitHub 版本控制",
    level: "進階",
    modes: ["code"],
    summary:
      "把自製的互動教具納入 git 版本控制並推上 GitHub，方便迭代、備份與共備分享。",
    fluency: "Delegation · Diligence",
    steps: [
      { t: "explore", d: "讓 Claude Code 先理解專案、確認 .gitignore 排除 node_modules 與機密。" },
      { t: "plan", d: "請它說明將執行哪些 git 與 gh 指令，等你確認。" },
      { t: "code + commit", d: "初始化 git、建立 commit，用 gh 建立 repo 並推送。" },
      { t: "驗證", d: "拿到 repo 連結後，確認檔案無誤、機密未外洩。" },
    ],
    code: {
      title: "Claude Code 會幫你執行（每步先確認）",
      lang: "bash",
      body: `git init && git add -A
git commit -m "feat: 國文閱讀策略互動教具初版"

# 用 GitHub CLI 建立私有 repo 並推送
gh repo create reading-strategy-tool --private --source=. --push

# 完成後 Claude 回報 repo 連結`,
    },
  },
  {
    id: "AG-3",
    track: "agentic",
    title: "一鍵部署：Claude Code + Vercel 產生分享連結",
    level: "挑戰",
    modes: ["code"],
    summary:
      "把教具或學生專題部署成 preview 網址，發給學生即可使用。正式上線前一律人工確認。",
    fluency: "Delegation · Diligence",
    steps: [
      { t: "本機驗證", d: "先讓 Claude Code 跑一次 build，確認可成功建置。" },
      { t: "連結專案", d: "用 vercel CLI 連結並產生 preview 部署。" },
      { t: "取得連結", d: "拿到可分享網址，發給學生。" },
      { t: "守住邊界", d: "preview 沒問題再決定是否上 production；正式部署屬不可逆對外動作。" },
    ],
    code: {
      title: "部署到 Vercel preview",
      lang: "bash",
      body: `npm run build          # 先本機建置確認
npx vercel             # 連結並建立 preview 部署
# → 取得 https://your-tool-xxxx.vercel.app

# 確認 preview 無誤後，才考慮：
# npx vercel --prod    （正式環境，需人工確認）`,
    },
  },

  // ---------------- 行政減法 ----------------
  {
    id: "AD-1",
    track: "admin",
    title: "研習報名與費用速整理",
    level: "入門",
    modes: ["chat"],
    summary:
      "把報名表、講師資訊、行程草稿貼給 Claude，產出一份可直接交付的行政摘要，省去手動彙整的時間。",
    fluency: "Description · Diligence",
    steps: [
      { t: "貼上原始資料", d: "貼上報名表、講師簡介與時程草稿，說明要交付的對象。" },
      { t: "結構化輸出", d: "要求輸出活動重點、參與人數、待辦事項與需人工確認事項。" },
      { t: "標出不確定處", d: "請 Claude 明確標出資料不足或互相矛盾之處，不要自行補齊。" },
      { t: "人工核對", d: "確認日期、姓名、金額無誤後才送出或公告。" },
    ],
    prompt:
      "請根據我提供的報名表、講師簡介與時程草稿，整理成行政摘要：活動重點、參與對象與人數、時程、待辦事項、需要我人工確認的資料。若資料不足或互相矛盾，請明確標示，不要自行補齊。",
    ageNote: "若資料含學生或家長個資，請先去識別化再交給 AI 處理。",
  },
  {
    id: "AD-2",
    track: "admin",
    title: "把整學期行政檔案接上 Cowork 知識庫",
    level: "進階",
    modes: ["cowork"],
    summary:
      "在 Claude 桌面 App 指向行政資料夾，讓 Cowork 跨多份研習企劃、簽到表與經費報表整理成可查詢的彙整報告。",
    fluency: "Delegation · Diligence",
    steps: [
      { t: "指向最小資料夾", d: "在 Cowork 只指向放有研習資料的資料夾，不授權整顆雲端硬碟。" },
      { t: "交付彙整任務", d: "請 Claude 跨檔案彙整經費、簽到與企劃進度，標出缺漏文件。" },
      { t: "設定 Global instructions", d: "把固定的表單格式與用語設成 Global instructions，下次自動套用。" },
      { t: "守住公開邊界", d: "彙整結果若要公開或上呈，先由人工確認資料範圍與用語。" },
    ],
    ageNote: "經費與個資文件屬敏感資料，授權資料夾前務必確認範圍最小化。",
  },

  // ---------------- 寫作教學 ----------------
  {
    id: "WR-1",
    track: "writing",
    title: "從修正者到引導者：作文回饋",
    level: "入門",
    modes: ["chat"],
    summary:
      "AI 評量讓教師從 Corrector 變 Mentor。Claude 只指出現象與方向，不代寫，學生保留修改歷程。",
    fluency: "Discernment · Diligence",
    steps: [
      { t: "輸入作品", d: "貼上學生作文，要求只描述現象、不評分。" },
      { t: "引導式回饋", d: "請 Claude 提 2 個引導問題，讓學生自己發現問題。" },
      { t: "學生主導修改", d: "學生修改後須說明修改理由，附 AI 使用聲明。" },
    ],
    prompt:
      "以下是學生作文：[貼上]。請從結構、論點、語言三面向指出現象（不評分、不改寫），並提出 2 個引導問題讓學生自己發現問題。語氣鼓勵，適合[年齡]學生。",
  },

  // ---------------- 國際真實案例（已標註與台灣情境的差異） ----------------
  {
    id: "INTL-1",
    track: "teacher",
    title: "Northeastern University：機構級 Learning Mode 導入",
    level: "進階",
    modes: ["chat"],
    summary:
      "Northeastern 是 Anthropic Claude for Education 的首個大學設計夥伴，全校 13 校區、5 萬名學生與教職員可使用機構帳號。核心是 Learning Mode：學生提問時 Claude 不直接給答案，先用蘇格拉底式提問引導學生自己拆解問題，教師端則有對應的評量規準協作工具。",
    fluency: "Description · Discernment",
    steps: [
      { t: "機構簽約啟用", d: "校方與 Anthropic 簽訂機構方案後，全校帳號自動可用 Learning Mode，非個別教師或學生自行申請。" },
      { t: "課堂內導入", d: "教師把 Learning Mode 設為預設模式，讓學生在寫作業／解題過程中先被提問、後得到引導，而非直接取得答案。" },
      { t: "教師端規準協作", d: "教師用機構方案內建的工具，依課程學習目標生成與調整評分規準。" },
    ],
    region: "international",
    regionNote:
      "Learning Mode 需要學校或機構整體簽約才會啟用，目前沒有已知的台灣大學或學校與 Anthropic 簽署機構方案；台灣教師若想要類似的「先引導、不直接給答案」效果，需要自己在 prompt 裡明確要求（見本手冊蘇格拉底式提問類 prompt），無法仰賴帳號內建模式自動套用。",
  },
  {
    id: "INTL-2",
    track: "agentic",
    title: "CodePath：用 Claude Code 教大規模程式課程",
    level: "挑戰",
    modes: ["code"],
    summary:
      "CodePath 是美國最大的大學計算機科學課外課程組織，與 Anthropic 合作把 Claude Code 帶入課程，讓學生在真實的 explore → plan → code → commit 流程中學習工程實務，而不是只寫獨立的程式作業片段。",
    fluency: "Delegation · Discernment",
    steps: [
      { t: "Explore 真實 codebase", d: "學生先用 Claude Code 讀懂既有專案結構，而非從零開始的孤立練習題。" },
      { t: "Plan 後才動手", d: "要求 Claude Code 先列出修改計劃，學生確認後才執行，培養先想清楚再動手的工程習慣。" },
      { t: "驗證與 commit", d: "每個改動都要有可驗證的結果與版本紀錄，呼應業界實際的協作流程。" },
    ],
    region: "international",
    regionNote:
      "CodePath 是美國大學課外組織的官方合作，台灣目前沒有對應的大規模課程合作；但 explore → plan → code → commit 的流程本身是 Claude Code 的通用機制，台灣教師可以直接套用在自己的程式教學上（對應本手冊「Claude Code 暖身任務」「Claude Code 統一檔名」等練習）。",
  },
  {
    id: "INTL-3",
    track: "teacher",
    title: "Teach For All：全球教師 AI 培力計畫",
    level: "入門",
    modes: ["chat"],
    summary:
      "Anthropic 與 Teach For All 合作，為 63 個國家、超過 10 萬名教師與校友提供 AI 素養培訓機會，協助教師發展自己的 AI Fluency，再把這些能力帶回課堂。",
    fluency: "Delegation · Diligence",
    steps: [
      { t: "教師先練習 AI Fluency", d: "培訓聚焦教師自己先具備委派判斷、描述協作、辨識評估、盡責使用的能力。" },
      { t: "再設計課堂任務", d: "教師具備能力後，才把對應的 AI 協作方式設計進自己的課程，而非直接把工具丟給學生。" },
    ],
    region: "international",
    regionNote:
      "Teach For All 是全球性教師組織網絡，台灣目前不在已知的 63 國名單中可被直接驗證；但「教師先培養 AI Fluency、再設計課堂任務」的順序，是本手冊 fluency 模組一致建議的做法，與是否有官方培訓計畫無關。",
  },
];

export const TRACKS = Object.keys(TRACK_LABEL) as CaseTrack[];
