/**
 * 每次換頁都會重新掛載，用來讓內容區淡入。
 * 不用 View Transition：它會擷取舊頁快照，新舊頁高度不同時畫面會被拉伸。
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
