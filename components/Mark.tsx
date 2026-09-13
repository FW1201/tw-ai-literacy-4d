/**
 * Original site mark — four quadrant arcs forming an open cycle, standing for
 * the four D's and the two loops between them. Deliberately NOT Anthropic's
 * spike mark: this site is an independent teaching resource, not an Anthropic
 * product, so it carries its own glyph.
 */
export function Mark({ size = 22, color = "var(--color-primary)" }: { size?: number; color?: string }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.2A8.8 8.8 0 0 1 20.8 12" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20.8 12A8.8 8.8 0 0 1 12 20.8" stroke={color} strokeWidth="2.6" strokeLinecap="round" opacity="0.72" />
      <path d="M12 20.8A8.8 8.8 0 0 1 3.2 12" stroke={color} strokeWidth="2.6" strokeLinecap="round" opacity="0.48" />
      <path d="M3.2 12A8.8 8.8 0 0 1 12 3.2" stroke={color} strokeWidth="2.6" strokeLinecap="round" opacity="0.26" />
      <circle cx="12" cy="12" r="2.1" fill={color} />
    </svg>
  );
}
