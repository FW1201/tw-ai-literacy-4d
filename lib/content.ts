export const site = {
  title: "AI Fluency 4D 框架臺灣教育體系應用（Original by Anthropic）",
  /** 左上角與頁尾分兩行顯示，完整字串太長會擠掉導覽連結 */
  brand: "AI Fluency 4D 框架臺灣教育體系應用",
  brandNote: "Original by Anthropic",
  tagline: "把 AI 素養拆成四件老師教得來、學生練得起來的事",
  author: "吳奇（Kevin Wu）",
  updated: "2026-09-16",
  repo: "https://github.com/FW1201/tw-ai-literacy-4d",
};

export const nav = [
  { href: "/framework", label: "4D 框架" },
  { href: "/how-ai-works", label: "AI 怎麼運作" },
  { href: "/classroom", label: "課堂實踐" },
  { href: "/prompts", label: "提示詞庫" },
  { href: "/sources", label: "資料來源" },
];

/** 首頁入口卡。order 決定排列，accent 決定是否用深色卡（維持 DESIGN.md 的明暗交替節奏）。 */
export const entries = [
  {
    href: "/framework",
    order: "01",
    title: "4D 框架",
    detail: "委託、描述、辨識、盡責，一次看懂。",
    meta: "含概念動畫",
  },
  {
    href: "/how-ai-works",
    order: "02",
    title: "AI 怎麼運作",
    detail: "AI 為什麼會出錯？用四個例子說清楚，附上課可投影的動畫。",
    meta: "含 4 支概念動畫",
  },
  {
    href: "/classroom",
    order: "03",
    title: "課堂實踐",
    detail: "不同年級怎麼教、作業怎麼評，再加上 16 個現成案例。",
    meta: "含實踐案例",
  },
  {
    href: "/prompts",
    order: "04",
    title: "提示詞庫",
    detail: "挑一筆複製下來，換掉年級和主題就能用。",
    meta: "教學四類",
  },
  {
    href: "/sources",
    order: "05",
    title: "資料來源",
    detail: "每段內容從哪裡來，這裡都查得到。",
    meta: "",
  },
];

export const hero = {
  eyebrow: "台灣 K-12 教育現場整編",
  headline: "AI Fluency 4D Framework\n臺灣教育現場之實踐應用",
  lead:
    "教育部的指引告訴我們哪些事不能做，UNESCO 告訴我們能力要到哪裡。可是打開 AI 的那一刻，老師到底該做什麼？這個網站想回答這一題。",
};

export const fourLayers = [
  {
    order: "01",
    label: "法源／原則",
    short: "哪些事可以做、哪些不行",
    title: "教育部《高級中等以下學校人工智慧使用和學習指引》",
    detail:
      "2026 年 6 月 5 日核定。依《人工智慧基本法》的七項原則，分別寫給校長、老師、學生和家長。它回答的是：哪些事可以做，哪些不行。",
    tone: "cream" as const,
  },
  {
    order: "02",
    label: "能力基準",
    short: "老師和學生要會到什麼程度",
    title: "UNESCO AI CFT（教師）／ AI CFS（學生）",
    detail:
      "教師版有 5 個面向，每個面向分 3 個層次（Acquire／Deepen／Create），共 15 格；學生版是 4 個面向、3 個等級。它回答的是：老師和學生要會到什麼程度。",
    tone: "cream" as const,
  },
  {
    order: "03",
    label: "操作方法論",
    short: "每次用 AI，要做的四件事",
    title: "4D 框架：委託・描述・辨識・盡責",
    detail:
      "這個網站的主角。上面兩層談原則和能力，這一層談的是每次打開 AI 時，實際要做哪四件事。",
    tone: "coral" as const,
  },
  {
    order: "04",
    label: "學科落地",
    short: "放進你自己的那堂課",
    title: "學科活動 × tw-edu Skills × 108 課綱教案",
    detail:
      "包含現有的 31 個跨學科 AI 活動、差異化和命題工具，以及 108 課綱教案的五個設計步驟。它回答的是：放進我的課堂，實際會是什麼樣子。",
    tone: "cream" as const,
  },
];

export const fourD = [
  {
    zh: "委託",
    en: "Delegation",
    question: "這件事要不要交給 AI？交多少？",
    detail:
      "先想清楚問題本身，也弄清楚這個工具做得到什麼，再決定交出去多少。交給 AI 的越多，事後就要檢查得越仔細，所以這一步和「盡責」要一起考慮。",
    moe: "對應教育部原則：人類自主",
    unesco: "UNESCO CFT：Human-centred mindset（Acquire）",
  },
  {
    zh: "描述",
    en: "Description",
    question: "我要怎麼跟 AI 說清楚？",
    detail:
      "要做什麼、給誰看、有哪些限制、怎樣才算做好，一項一項講明白。AI 給的東西好不好，大半取決於這一步。能把要求寫得具體，通常也表示你自己把這件事想透了。",
    moe: "對應教育部原則：正確使用、透明與可解釋",
    unesco: "UNESCO CFT：AI foundations and applications（Acquire→Deepen）",
  },
  {
    zh: "辨識",
    en: "Discernment",
    question: "拿到結果，我要特別看哪裡？",
    detail:
      "別照單全收。內容對不對、它怎麼得出這個答案，都要看一看。發現問題就回頭把說明改清楚，這是最常用的修正方法。",
    moe: "對應教育部原則：人工智慧倫理、公平與不歧視",
    unesco: "UNESCO CFT：Ethics of AI（Deepen）",
  },
  {
    zh: "盡責",
    en: "Diligence",
    question: "最後誰負責？要怎麼說明用了 AI？",
    detail:
      "從內容、使用過程，一直到最後公開或繳交，責任都在自己身上。也要寫清楚哪裡用了 AI、用的是哪個版本。",
    moe: "對應教育部原則：問責",
    unesco: "UNESCO CFT：Human-centred mindset（Deepen）",
  },
];

export const loops = [
  {
    title: "委託 ↔ 盡責",
    subtitle: "Delegation ↔ Diligence",
    detail: "交給 AI 的越多，事後要負的責任就越大，檢查也要跟著更仔細。",
  },
  {
    title: "描述 ↔ 辨識",
    subtitle: "Description ↔ Discernment",
    detail: "話說得越清楚，越容易看出結果哪裡歪掉；看出問題，再回頭把話說清楚。大多數時候，我們就在這兩步之間來回。",
  },
];

export const mechanisms = [
  {
    name: "接龍式生成",
    en: "Next Token Prediction",
    anim: "next-token" as const,
    spectrum: {
      strong: "常見、有標準說法",
      weak: "冷門、需要精確細節",
      tasks: [
        { label: "摘要一篇課文", pos: 0.15 },
        { label: "改寫成國小版", pos: 0.3 },
        { label: "古文確切出處", pos: 0.85 },
      ],
    },
    plain: "AI 回答時是一個字接一個字往下寫，並沒有先想好整個答案。",
    myth: "AI 說的都查證過。",
    reality: "它只是一直挑「接下來最可能出現」的字。遇到冷門或講究細節的問題，就很容易編出看似合理的內容。",
    prompt: "請 AI 幫你找一句古文的確切出處，你會怎麼查證？",
  },
  {
    name: "知識",
    en: "Knowledge",
    anim: "knowledge-cutoff" as const,
    spectrum: {
      strong: "久遠、常被寫到",
      weak: "最新、小眾、校內",
      tasks: [
        { label: "唐詩的基本背景", pos: 0.12 },
        { label: "近兩年的新政策", pos: 0.72 },
        { label: "本校行事曆", pos: 0.95 },
      ],
    },
    plain: "AI 知道多少，要看這件事在它讀過的資料裡常不常出現。",
    myth: "AI 什麼都知道，而且都是最新的。",
    reality: "AI 的知識停在某個時間點。冷門、小眾或很在地的事，像台灣的特定法規或學校自己的規定，很容易答錯或過時。",
    prompt: "問 AI 學校今年的行事曆，為什麼答案不可靠？",
  },
  {
    name: "工作記憶",
    en: "Working Memory",
    anim: "context-window" as const,
    spectrum: {
      strong: "短、重點在頭尾",
      weak: "長、重點在中段",
      tasks: [
        { label: "一頁學習單", pos: 0.15 },
        { label: "整份段考題本", pos: 0.55 },
        { label: "整本課本的中段細節", pos: 0.9 },
      ],
    },
    plain: "AI 只記得這次對話裡的內容，開一個新對話，之前說過的它就不記得了。",
    myth: "AI 記得我們之前聊過的所有事。",
    reality: "一次對話能放的內容有上限。文件太長時，中間的段落特別容易被忽略。",
    prompt: "為什麼把一整本課本貼給 AI，它還是會漏看中間的重點？",
  },
  {
    name: "可控性",
    en: "Steerability",
    anim: "steerability" as const,
    spectrum: {
      strong: "具體、可驗證",
      weak: "抽象、憑感覺",
      tasks: [
        { label: "限 100 字、用表格", pos: 0.1 },
        { label: "語氣親切一點", pos: 0.55 },
        { label: "寫得有創意一點", pos: 0.9 },
      ],
    },
    plain: "要求越具體、越容易檢查，AI 越照做；說得越模糊，它越會自己發揮。",
    myth: "只要把要求講清楚，AI 就一定會照做。",
    reality: "「用表格呈現」「不超過 100 字」這類容易檢查的要求，AI 大多做得到；「寫得有創意一點」這種說法，它就很難抓到你要的樣子。",
    prompt: "同樣要 AI 寫作文，怎麼下指令才能符合你要的字數與格式？",
  },
];

export const gradeBands = [
  {
    band: "國小高年級",
    emphasis: { delegation: 1, description: 1, discernment: 3, diligence: 1 },
    focus: "以辨識為主，委託稍微碰一下",
    form: "「AI 說錯了什麼」抓錯遊戲",
    example: "給學生一份藏了錯的 AI 解題，請他們找出錯在哪裡，並說出理由。",
    curriculum: "會判斷資訊對不對，養成查證的習慣",
  },
  {
    band: "國中",
    emphasis: { delegation: 1, description: 3, discernment: 3, diligence: 1 },
    focus: "描述和辨識輪流練",
    form: "練習寫提示詞，再和同學互評",
    example: "先把「幫我寫報告」這種模糊的要求改寫成具體的提示詞，再請同學比較兩次結果差在哪裡。",
    curriculum: "能把任務說清楚，也能判斷資訊可不可信、有沒有偏誤",
  },
  {
    band: "高中",
    emphasis: { delegation: 2, description: 2, discernment: 2, diligence: 3 },
    focus: "四項都練，特別要求盡責",
    form: "個人 AI 協作日誌",
    example: "在作業或學習歷程檔案後面附一份協作日誌：請 AI 做了什麼、它給了什麼、自己又改了哪裡。",
    curriculum: "能負責任地使用科技，也說得出自己是怎麼用的",
  },
];

export const assessments = [
  {
    type: "結果導向",
    stage: "作業完成後",
    en: "Outcome-based",
    detail: "看最後的作品有沒有達到學習目標，也請學生說明 AI 用在哪個步驟。",
  },
  {
    type: "過程導向",
    stage: "作業進行中",
    en: "Process-based",
    detail: "請學生交一份 AI 協作日誌：請 AI 做了什麼、它給了什麼、自己改了哪裡。",
  },
  {
    type: "反思導向",
    stage: "作業繳交時",
    en: "Reflection-based",
    detail: "在學習單加一欄：「這次用了 AI，我學到什麼？又有什麼沒學到？」",
  },
];

export const studentLocalization = [
  {
    origin: "AI 輔助履歷／CV 撰寫",
    local: "請 AI 幫忙整理學習歷程反思的草稿，再由學生改寫成自己的話",
  },
  {
    origin: "AI 模擬面試練習",
    local: "請 AI 扮演面試官，練習升學面試和口試的臨場回答",
  },
  {
    origin: "個人 AI 協作政策",
    local: "做一張「我的 AI 使用檢核卡」：這份作業，我請 AI 做了什麼？哪些是我自己做的？",
  },
  {
    origin: "Being the human in the loop",
    local: "教育部指引的學生篇也這樣提醒：不要直接複製貼上，最後的決定要自己負責",
  },
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
        note: "「能力與限制」的四個機制，以及常見誤解和實際情況的對照",
        href: "https://academy.claude.com/courses/ai-capabilities-and-limitations",
      },
      {
        label: "AI Fluency for pK–12 Educators",
        note: "不同年級的情境設計（Anthropic 與 Teach For America 合作）",
        href: "https://academy.claude.com/courses/ai-fluency-for-k-12-educators",
      },
      {
        label: "Teaching AI Fluency",
        note: "三種評量方式（原本寫給大學，本站改寫成中小學版本）",
        href: "https://academy.claude.com/courses/teaching-ai-fluency",
      },
      {
        label: "AI Fluency for students",
        note: "學生篇（原本談大學生求職，本站改寫成中小學升學情境）",
        href: "https://academy.claude.com/courses/ai-fluency-for-students",
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
        note: "本站內容的底稿，放在作者的個人知識庫（LLM Wiki），2026-09-13 整理",
      },
      {
        label: "教師 AI 活動指南（Med Kharbach, 2026）",
        note: "學科活動範例，以及改寫成台灣版本時的參考",
      },
    ],
  },
];

export const disclaimer =
  "這是個人製作的教學參考網站，不是 Anthropic 的官方產品，也沒有得到 Anthropic、UNESCO 或教育部的背書。版面參考了 Claude 公開的設計風格，內容整理自上面列出的公開課程和官方文件，再改寫成適合台灣中小學的版本。";

/** 每頁頁首的「本頁重點」三點條。 */
export const highlights: Record<string, string[]> = {
  "/framework": ["四個動作", "兩組循環", "原則對照"],
  "/how-ai-works": ["四個機制", "強項與弱點", "可投影動畫"],
  "/classroom": ["學段側重", "評量時機", "16 個案例"],
  "/prompts": ["七段結構", "篩選與搜尋", "一鍵複製"],
  "/sources": ["課程與文件", "對應頁面", "非官方聲明"],
};

/** 四個機制在真實任務中相撞的例子（/how-ai-works 結尾的交疊圖）。 */
export const collision = {
  task: "把整本課本貼給 AI，請它依本校進度出一份段考題",
  hits: {
    "next-token": "題目看起來像樣，答案卻可能是編的",
    "knowledge-cutoff": "它不知道你們學校的進度和出題習慣",
    "context-window": "課本中間的內容容易被略過",
    steerability: "「出一份好題目」沒辦法檢查有沒有做到",
  },
  fix: "把課本拆成小段、附上進度表、寫清楚題型和配分，最後自己一題一題核對。",
};

/** 提示詞七段結構的作用說明（/prompts 頁首的解剖圖）。 */
export const promptAnatomy = [
  { part: "角色", role: "請 Claude 用哪種專業身分回答", fluency: "描述" },
  { part: "任務", role: "你要它交出什麼", fluency: "委託" },
  { part: "脈絡", role: "年級、科目，還有你給的材料", fluency: "描述" },
  { part: "必要時先問問題", role: "資料不夠就先問你，不要自己亂猜", fluency: "辨識" },
  { part: "限制", role: "哪些不能做、哪些一定要遵守", fluency: "描述" },
  { part: "輸出格式", role: "要表格、條列，還是限定字數", fluency: "描述" },
  { part: "成功標準", role: "怎樣才算做對，也是你事後核對的清單", fluency: "辨識" },
];
