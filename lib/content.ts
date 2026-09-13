export const site = {
  title: "AI 素養教育 4D 框架",
  tagline: "把「AI 素養」拆成四個可教、可評量、可在課堂重複練習的動作",
  author: "吳奇（Kevin Wu）",
  updated: "2026-09-13",
  repo: "https://github.com/FW1201/tw-ai-literacy-4d",
};

export const nav = [
  { href: "/framework", label: "4D 框架" },
  { href: "/how-ai-works", label: "AI 怎麼運作" },
  { href: "/classroom", label: "課堂實踐" },
  { href: "/prompts", label: "提示詞庫" },
  { href: "/workshop", label: "研習工作坊" },
  { href: "/sources", label: "資料來源" },
];

/** 首頁入口卡。order 決定排列，accent 決定是否用深色卡（維持 DESIGN.md 的明暗交替節奏）。 */
export const entries = [
  {
    href: "/framework",
    order: "01",
    title: "4D 框架",
    detail: "委託・描述・辨識・盡責。四個動作、兩組循環，以及它們各自對應到教育部原則與 UNESCO 能力的哪一格。",
    meta: "含概念動畫",
  },
  {
    href: "/how-ai-works",
    order: "02",
    title: "AI 怎麼運作",
    detail: "接龍式生成、知識截止、工作記憶、可控性——四個機制的白話版，每個都配一支可以直接投影給學生看的動畫。",
    meta: "含 4 支概念動畫",
  },
  {
    href: "/classroom",
    order: "03",
    title: "課堂實踐",
    detail: "分年段設計原則、三種評量策略、實際可照做的教學案例，以及學生素養篇的在地化對照。",
    meta: "含實踐案例",
  },
  {
    href: "/prompts",
    order: "04",
    title: "提示詞庫",
    detail: "可直接複製使用的 Claude 提示詞，依 4D 環節、使用情境與模式分類，每一筆都附上用完該檢查什麼。",
    meta: "教學四類",
  },
  {
    href: "/workshop",
    order: "05",
    title: "研習工作坊",
    detail: "90 分鐘的教師研習流程、配套文件，以及給校長與教學組長的導入提醒。",
    meta: "含配套文件",
  },
  {
    href: "/sources",
    order: "06",
    title: "資料來源",
    detail: "每一節內容的出處。本站是整編與在地化改寫，不是原創框架。",
    meta: "",
  },
];

export const hero = {
  eyebrow: "台灣 K-12 教育現場整編",
  headline: "原則已經有了。\n那「怎麼做」呢？",
  lead:
    "教育部的指引劃出紅線，UNESCO 的能力框架標示等級——但兩者都沒有告訴老師，實際跟 AI 互動的那一刻，具體要做哪幾件事。這份教材補上中間那一層。",
  primaryCta: { label: "從四層定位開始", href: "#positioning" },
  secondaryCta: { label: "看研習工作坊", href: "#workshop" },
};

export const fourLayers = [
  {
    order: "01",
    label: "法源／原則",
    title: "教育部《高級中等以下學校人工智慧使用和學習指引》",
    detail:
      "2026-06-05 核定。依「人工智慧基本法」七項原則，展開校長／教師／學生／家長四個角色，形成 4×7 的完整矩陣。回答的是「可以做什麼、不可以做什麼」。",
    tone: "cream" as const,
  },
  {
    order: "02",
    label: "能力基準",
    title: "UNESCO AI CFT（教師）／ AI CFS（學生）",
    detail:
      "教師版 5 面向 × 3 層級（Acquire／Deepen／Create）＝ 15 個能力區塊；學生版 4 面向 × 3 等級。回答的是「教師與學生該具備什麼能力、到什麼程度」。",
    tone: "cream" as const,
  },
  {
    order: "03",
    label: "操作方法論",
    title: "4D 框架：委託・描述・辨識・盡責",
    detail:
      "本教材主體。把上面兩層的原則與能力，翻譯成每一次 AI 互動實際要走過的四個檢核動作。回答的是「具體怎麼做」。",
    tone: "coral" as const,
  },
  {
    order: "04",
    label: "學科落地",
    title: "學科活動 × tw-edu Skills × 108 課綱教案",
    detail:
      "既有的 31 個跨學科 AI 活動、差異化與命題工具、108 課綱教案設計五步驟。回答的是「在我這一堂課長什麼樣子」。",
    tone: "cream" as const,
  },
];

export const fourD = [
  {
    zh: "委託",
    en: "Delegation",
    question: "這個任務該不該交給 AI、交多少？",
    detail:
      "先確認問題本身、平台能力邊界，再決定委派範圍。委派愈多，事後的檢核就要愈嚴——這是與「盡責」互為一體的判斷。",
    moe: "對應教育部原則：人類自主",
    unesco: "UNESCO CFT：Human-centred mindset（Acquire）",
  },
  {
    zh: "描述",
    en: "Description",
    question: "我會怎麼說明任務、對象與限制？",
    detail:
      "把任務、脈絡、限制、成功標準講清楚。AI 產出的品質幾乎完全取決於這一步——而要求愈具體，反映的是你自己對任務的理解愈深。",
    moe: "對應教育部原則：正確使用、透明與可解釋",
    unesco: "UNESCO CFT：AI foundations and applications（Acquire→Deepen）",
  },
  {
    zh: "辨識",
    en: "Discernment",
    question: "產出裡，我要特別檢查哪裡？",
    detail:
      "批判性檢視 AI 的內容、過程與行為，不照單全收。辨識出問題後回頭修正描述，是最常用的除錯路徑。",
    moe: "對應教育部原則：人工智慧倫理、公平與不歧視",
    unesco: "UNESCO CFT：Ethics of AI（Deepen）",
  },
  {
    zh: "盡責",
    en: "Diligence",
    question: "最後誰負責？怎麼揭露？",
    detail:
      "對產出的內容、使用的過程、最後的發布或繳交三個階段都負起最終責任，包含標註 AI 的使用方式與版本。",
    moe: "對應教育部原則：問責",
    unesco: "UNESCO CFT：Human-centred mindset（Deepen）",
  },
];

export const loops = [
  {
    title: "委託 ↔ 盡責",
    subtitle: "Delegation ↔ Diligence",
    detail: "決定委派多少，跟事後要負多少責任是一體兩面。委派範圍愈大，盡責的檢核標準就要愈高。",
  },
  {
    title: "描述 ↔ 辨識",
    subtitle: "Description ↔ Discernment",
    detail: "描述得愈清楚，愈容易辨識輸出哪裡走偏；辨識出問題後回頭修正描述，形成最常用的迭代迴圈。",
  },
];

export const mechanisms = [
  {
    name: "接龍式生成",
    en: "Next Token Prediction",
    anim: "next-token" as const,
    plain: "AI 是一個字一個字接龍接出來的，不是先想好答案再打字。",
    myth: "AI 講的都是查證過的事實。",
    reality: "AI 只是在接續「聽起來最合理」的下一個字，容易在冷門或需要精確細節的地方編造。",
    prompt: "請 AI 幫你找一句古文的確切出處，你會怎麼查證？",
  },
  {
    name: "知識",
    en: "Knowledge",
    anim: "knowledge-cutoff" as const,
    plain: "AI 懂多少，跟那件事在訓練資料裡有沒有「常出現」有關。",
    myth: "AI 什麼都知道，而且是最新的。",
    reality: "AI 有知識截止日期。冷門、小眾、在地的內容（例如台灣特定法規、校內規定）容易錯或過時。",
    prompt: "問 AI 學校今年的行事曆，為什麼答案不可靠？",
  },
  {
    name: "工作記憶",
    en: "Working Memory",
    anim: "context-window" as const,
    plain: "AI 只記得「這次對話框裡」的內容，換一個新對話就忘光。",
    myth: "AI 記得我們之前聊過的所有事。",
    reality: "脈絡視窗是硬限制，太長的文件中間段落容易被忽略。",
    prompt: "為什麼把一整本課本貼給 AI，它還是會漏看中間的重點？",
  },
  {
    name: "可控性",
    en: "Steerability",
    anim: "steerability" as const,
    plain: "指令愈具體、愈能驗證，AI 愈聽話；愈模糊，AI 愈容易自由發揮。",
    myth: "只要講清楚要求，AI 一定會完全照做。",
    reality: "短而可驗證的指令（「用表格呈現」「限 100 字」）服從度高；抽象指令（「寫得有創意一點」）服從度低。",
    prompt: "同樣要 AI 寫作文，怎麼下指令才能符合你要的字數與格式？",
  },
];

export const gradeBands = [
  {
    band: "國小高年級",
    focus: "辨識為主，委託淺嘗",
    form: "「AI 說錯了什麼」抓錯遊戲",
    example: "給一份含錯誤的 AI 解法，讓學生找錯並說明理由。",
    curriculum: "能辨識資訊正確性，養成查證習慣",
  },
  {
    band: "國中",
    focus: "描述＋辨識循環",
    form: "結構化提示詞練習＋同儕互評",
    example: "把模糊任務（「幫我寫報告」）改寫成具體提示詞，再讓同學互評兩種產出的差異。",
    curriculum: "能有效描述任務、判斷資訊可信度與偏誤",
  },
  {
    band: "高中",
    focus: "四項全面，強調盡責",
    form: "個人 AI 協作日誌",
    example: "在作業或學習歷程檔案附上協作日誌：委託了什麼、AI 給了什麼、哪裡被修正。",
    curriculum: "能負責任地使用科技媒體，並說明使用歷程",
  },
];

export const assessments = [
  {
    type: "結果導向",
    en: "Outcome-based",
    detail: "檢視最終作品是否符合學習目標，並要求揭露 AI 用在哪個階段。",
  },
  {
    type: "過程導向",
    en: "Process-based",
    detail: "要求繳交「AI 協作日誌」：委託了什麼、AI 給了什麼、哪裡被修正。",
  },
  {
    type: "反思導向",
    en: "Reflection-based",
    detail: "學習單加入一欄「這次用 AI，我學到什麼／沒學到什麼」。",
  },
];

export const workshop = {
  duration: "90 分鐘",
  audience: "K-12 在職教師，不限學科",
  size: "12–30 人，4–6 人一組",
  steps: [
    {
      time: "10 分",
      title: "開場",
      detail: "從「指引有原則、但沒有操作手把」破題，蒐集每位教師上一次委派 AI 做了什麼。",
    },
    {
      time: "20 分",
      title: "4D 框架導入",
      detail: "用「AI 一本正經講錯」的真實案例暖身，帶出四個機制，再逐一講解 4D 與兩組循環。",
    },
    {
      time: "30 分",
      title: "分組實作",
      detail: "依任教學段分組，用分年段練習卡設計一個下週用得到的迷你活動。",
    },
    {
      time: "20 分",
      title: "共備產出",
      detail: "兩組互換練習卡，用「辨識」角色互相提問，回饋 2–3 點具體修改建議。",
    },
    {
      time: "10 分",
      title: "收斂與承諾",
      detail: "每人寫一句「下週我會在＿＿這堂課，用 4D 的＿＿環節」。",
    },
  ],
  files: [
    { name: "主持人手冊", format: "DOCX", detail: "逐節流程稿：時間、話術、引導問題、常見狀況應對" },
    { name: "簡報", format: "PPTX", detail: "9 頁投影片，含逐頁備忘稿" },
    { name: "分年段練習卡", format: "DOCX", detail: "國小／國中／高中三份工作單" },
  ],
};

export const studentLocalization = [
  {
    origin: "AI 輔助履歷／CV 撰寫",
    local: "AI 輔助整理學習歷程檔案的反思段落草稿，但需學生本人改寫成自己的語氣",
  },
  {
    origin: "AI 模擬面試練習",
    local: "AI 模擬升學面試／口試問答，練習臨場應答邏輯",
  },
  {
    origin: "個人 AI 協作政策",
    local: "簡化成一張「我的 AI 使用自我檢核卡」：這次作業，我請 AI 做了什麼？我自己做了什麼？",
  },
  {
    origin: "Being the human in the loop",
    local: "對應教育部指引學生篇：不應只是複製貼上系統產出，要為最終決定負責",
  },
];

export const governance = [
  { title: "角色清楚", detail: "導入前先講清楚誰負責選型、誰負責審核內容、誰負責處理學生申訴。" },
  { title: "書面共識", detail: "訂一份簡短的校內 AI 使用共識文件，而非只靠口頭默契。" },
  { title: "漸進釋放", detail: "先在一個年級或科目試辦，再擴大，避免全校同時導入無法收拾。" },
  { title: "適當存取", detail: "比照資料最小化原則，AI 工具不應取得超出教學需求的學生資料。" },
];

export const sources = [
  {
    group: "Claude Academy（Anthropic 官方課程）",
    items: [
      {
        label: "AI Fluency: Framework & Foundations",
        note: "4D 框架定義與兩組循環的來源",
        href: "https://academy.claude.com/courses/ai-fluency-framework-foundations",
      },
      {
        label: "AI Capabilities and Limitations",
        note: "「能力與限制」四機制與 myth／reality 對照",
        href: "https://academy.claude.com/courses/ai-capabilities-and-limitations",
      },
      {
        label: "AI Fluency for pK–12 Educators",
        note: "分年段情境設計概念（Anthropic × Teach For America）",
        href: "https://academy.claude.com/courses/ai-fluency-for-k-12-educators",
      },
      {
        label: "AI Fluency for pK-12 Train the Trainer",
        note: "研習工作坊套件結構（Anthropic × American Federation of Teachers）",
        href: "https://academy.claude.com/courses/ai-fluency-for-pk-12-train-the-trainer",
      },
      {
        label: "Teaching AI Fluency",
        note: "三種評量策略（原為高教取向，本站已在地化改寫）",
        href: "https://academy.claude.com/courses/teaching-ai-fluency",
      },
      {
        label: "AI Fluency for students",
        note: "學生素養篇（原為大學生涯取向，本站改寫為 K-12 升學情境）",
        href: "https://academy.claude.com/courses/ai-fluency-for-students",
      },
      {
        label: "Building Effective Human Agent Teams",
        note: "校務治理四原則（原為企業團隊取向）",
        href: "https://academy.claude.com/courses/building-effective-human-agent-teams",
      },
    ],
  },
  {
    group: "台灣官方與國際框架",
    items: [
      {
        label: "教育部《高級中等以下學校人工智慧使用和學習指引》",
        note: "中華民國115年6月5日臺教資（一）字第1152701618號函核定",
      },
      {
        label: "UNESCO. (2024). AI competency framework for teachers.",
        note: "https://doi.org/10.54675/ZJTE2084",
        href: "https://doi.org/10.54675/ZJTE2084",
      },
      {
        label: "UNESCO. (2024). AI competency framework for students.",
        note: "學生版 4 面向 × 3 等級",
      },
      { label: "十二年國民基本教育課程綱要", note: "核心素養 B2「科技資訊與媒體素養」" },
    ],
  },
  {
    group: "整編與改寫",
    items: [
      {
        label: "AI 素養教育課程模組設計指南",
        note: "本站內容的來源文件，收錄於作者個人知識庫（LLM Wiki），2026-09-13 整編",
      },
      {
        label: "教師 AI 活動指南（Med Kharbach, 2026）",
        note: "學科活動示例與台灣適配筆記的參考來源",
      },
    ],
  },
];

export const disclaimer =
  "本站為獨立製作的教學參考資源，非 Anthropic 官方產品，亦未獲 Anthropic、UNESCO 或教育部背書。視覺語彙參考公開的 Claude 設計語言，內容整編自上列公開課程與官方文件，並依台灣 K-12 教育現場改寫。";
