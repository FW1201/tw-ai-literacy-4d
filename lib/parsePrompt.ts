export interface PromptSection {
  label: string | null;
  body: string;
}

/**
 * 把提示詞依【段名】切成段落，供分段呈現。
 * 標記前的開場白以 label=null 回傳；完全沒有標記時整段原文當作一段。
 */
export function parsePrompt(raw: string): PromptSection[] {
  const re = /【([^】]+)】\n?/g;
  const sections: PromptSection[] = [];
  let lastLabel: string | null = null;
  let lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(raw))) {
    const body = raw.slice(lastIndex, m.index).trim();
    if (body || lastLabel) sections.push({ label: lastLabel, body });
    lastLabel = m[1];
    lastIndex = re.lastIndex;
  }
  const tail = raw.slice(lastIndex).trim();
  if (tail || lastLabel) sections.push({ label: lastLabel, body: tail });

  return sections.length ? sections : [{ label: null, body: raw }];
}
