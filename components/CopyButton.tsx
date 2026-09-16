"use client";

import { useRef, useState } from "react";

type State = "idle" | "copied" | "selected";

const LABEL: Record<State, string> = {
  idle: "複製提示詞",
  copied: "已複製",
  // 瀏覽器擋下剪貼簿權限時，改為把文字選起來——必須明講，否則使用者會以為沒反應
  selected: "已選取，按 ⌘C／Ctrl+C",
};

/**
 * 從同一張卡片裡的隱藏原文 <pre data-prompt-body>（見 PromptBody）讀取文字複製。
 * 文字留在 DOM、不進 JS bundle，這個元件本身只有幾行。
 */
export function CopyButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<State>("idle");

  async function copy() {
    const card = ref.current?.closest("[data-prompt-card]");
    const body = card?.querySelector<HTMLElement>("[data-prompt-body]");
    if (!body?.textContent) return;

    try {
      await navigator.clipboard.writeText(body.textContent);
      setState("copied");
    } catch {
      const range = document.createRange();
      range.selectNodeContents(body);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      setState("selected");
    }
    setTimeout(() => setState("idle"), 2600);
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      className="btn btn-secondary h-9 shrink-0 px-3.5 text-[13px]"
      aria-live="polite"
    >
      {LABEL[state]}
    </button>
  );
}
