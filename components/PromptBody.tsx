import { parsePrompt } from "@/lib/parsePrompt";

/**
 * 提示詞分段呈現，取代等寬文字牆。依容器寬度切換：寬時左段名右內容，窄卡（如三欄）時段名在上。
 * 另保留一份視覺隱藏的原文 <pre data-prompt-body>，CopyButton 從這裡複製，確保複製內容與原文完全一致。
 */
export function PromptBody({ prompt }: { prompt: string }) {
  const sections = parsePrompt(prompt);
  const fallback = sections.length === 1 ? "提示詞" : "開場";
  return (
    <div className="@container rounded-md bg-surface-soft">
      <dl className="divide-y divide-hairline">
        {sections.map((s, i) => (
          <div
            key={i}
            className="grid gap-1 px-4 py-3 @md:grid-cols-[7.5rem_minmax(0,1fr)] @md:gap-4 @md:px-5"
          >
            <dt className="caption pt-0.5 text-primary-ink">{s.label ?? fallback}</dt>
            <dd className="body-sm whitespace-pre-line text-body-strong">{s.body}</dd>
          </div>
        ))}
      </dl>
      {/* aria-hidden：上方分段已供螢幕閱讀器讀取，避免重複朗讀 */}
      <pre data-prompt-body aria-hidden="true" className="sr-only">
        {prompt}
      </pre>
    </div>
  );
}
