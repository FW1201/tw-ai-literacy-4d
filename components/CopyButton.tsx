"use client";

import { useRef, useState } from "react";

/**
 * 從同一張卡片裡的 <pre data-prompt-body> 讀取文字複製。
 * 文字留在 DOM、不進 JS bundle，這個元件本身只有幾行。
 */
export function CopyButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const card = ref.current?.closest("[data-prompt-card]");
    const body = card?.querySelector<HTMLElement>("[data-prompt-body]");
    if (!body?.textContent) return;
    try {
      await navigator.clipboard.writeText(body.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // 瀏覽器拒絕剪貼簿權限時，退而求其次把文字選起來讓使用者自己複製
      const range = document.createRange();
      range.selectNodeContents(body);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  return (
    <button ref={ref} type="button" onClick={copy} className="btn btn-secondary shrink-0">
      {copied ? "已複製" : "複製提示詞"}
    </button>
  );
}
