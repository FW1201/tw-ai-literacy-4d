/** 長頁面的黏性頁內目錄，貼在全站導覽列（64px）下方。純錨點，不需 JS。 */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="本頁目錄"
      className="sticky top-16 z-40 border-y border-hairline-soft bg-canvas/95 backdrop-blur-sm"
    >
      <div className="shell flex gap-1 overflow-x-auto py-2">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-card hover:text-ink"
          >
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
