"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ANIMATIONS, type AnimationId } from "@/lib/animations";

/**
 * Remotion Player 只在使用者點擊後才載入——/how-ai-works 一頁有四支動畫，
 * 全部預載會讓首屏 JS 暴增。未播放前顯示靜態封面。
 */
const PlayerSurface = dynamic(() => import("./ConceptPlayerSurface"), {
  ssr: false,
  loading: () => <div className="aspect-video w-full animate-pulse rounded-lg bg-surface-dark-soft" />,
});

export function ConceptPlayer({ id }: { id: AnimationId }) {
  const meta = ANIMATIONS[id];
  const [active, setActive] = useState(false);

  return (
    <figure className="overflow-hidden rounded-lg bg-surface-dark-soft">
      {active ? (
        <PlayerSurface id={id} />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group relative block aspect-video w-full text-left"
          aria-label={`播放動畫：${meta.title}`}
        >
          <Poster id={id} />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary transition-transform group-hover:scale-105">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true">
                <path d="M3 2.5v19l16-9.5L3 2.5z" fill="var(--color-on-primary)" />
              </svg>
            </span>
          </span>
        </button>
      )}

      <figcaption className="border-t border-white/10 px-5 py-4 sm:px-7 sm:py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="title-md text-on-dark">{meta.title}</h3>
          <span className="caption text-primary">{meta.fluency}</span>
        </div>
        <p className="body-sm mt-2 text-on-dark-soft">{meta.caption}</p>
      </figcaption>
    </figure>
  );
}

/** 靜態封面：每支動畫取一個代表性的靜止構圖，不載入任何 Remotion 程式碼。 */
function Poster({ id }: { id: AnimationId }) {
  const common = "h-full w-full";
  switch (id) {
    case "next-token":
      return (
        <svg viewBox="0 0 640 360" className={common} aria-hidden="true">
          <rect width="640" height="360" fill="var(--color-surface-dark)" />
          <text x="56" y="120" fill="var(--color-on-dark)" fontSize="30" fontFamily="var(--font-sans)">
            台灣的首都是
          </text>
          <rect x="278" y="96" width="3" height="32" fill="var(--color-primary)" />
          {[
            { y: 176, w: 300, label: "台北", v: ".92", o: 1 },
            { y: 214, w: 44, label: "高雄", v: ".03", o: 0.5 },
            { y: 252, w: 30, label: "台中", v: ".02", o: 0.35 },
          ].map((b) => (
            <g key={b.label} opacity={b.o}>
              <text x="56" y={b.y + 15} fill="var(--color-on-dark-soft)" fontSize="16">
                {b.label}
              </text>
              <rect x="120" y={b.y} width={b.w} height="20" rx="4" fill="var(--color-primary)" />
              <text x={130 + b.w} y={b.y + 15} fill="var(--color-on-dark-soft)" fontSize="14">
                {b.v}
              </text>
            </g>
          ))}
        </svg>
      );
    case "knowledge-cutoff":
      return (
        <svg viewBox="0 0 640 360" className={common} aria-hidden="true">
          <rect width="640" height="360" fill="var(--color-surface-dark)" />
          <line x1="56" y1="250" x2="584" y2="250" stroke="var(--color-on-dark-soft)" strokeWidth="2" />
          {Array.from({ length: 26 }).map((_, i) => (
            <circle
              key={i}
              cx={70 + i * 15}
              cy={250 - ((i * 37) % 60) - 12}
              r="5"
              fill="var(--color-accent-teal)"
              opacity={Math.max(0.12, 0.9 - i * 0.032)}
            />
          ))}
          <line x1="470" y1="140" x2="470" y2="280" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="7 6" />
          <text x="482" y="160" fill="var(--color-primary)" fontSize="16">
            知識截止
          </text>
        </svg>
      );
    case "context-window":
      return (
        <svg viewBox="0 0 640 360" className={common} aria-hidden="true">
          <rect width="640" height="360" fill="var(--color-surface-dark)" />
          <rect x="150" y="60" width="340" height="240" rx="10" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" />
          {Array.from({ length: 11 }).map((_, i) => {
            const mid = Math.abs(i - 5) / 5;
            return (
              <rect
                key={i}
                x="178"
                y={82 + i * 20}
                width={i % 3 === 0 ? 232 : 284}
                height="9"
                rx="4"
                fill="var(--color-on-dark)"
                opacity={0.18 + mid * 0.62}
              />
            );
          })}
        </svg>
      );
    case "steerability":
      return (
        <svg viewBox="0 0 640 360" className={common} aria-hidden="true">
          <rect width="640" height="360" fill="var(--color-surface-dark)" />
          <line x1="320" y1="40" x2="320" y2="320" stroke="var(--color-on-dark-soft)" strokeWidth="1" opacity="0.25" />
          {[
            [110, 120],
            [190, 168],
            [92, 210],
            [205, 244],
            [140, 160],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="96" height="26" rx="6" fill="var(--color-on-dark)" opacity="0.22" />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={i} x="400" y={150 + i * 34} width="170" height="26" rx="6" fill="var(--color-primary)" opacity={0.92 - i * 0.12} />
          ))}
        </svg>
      );
    case "four-d-loops":
      return (
        <svg viewBox="0 0 640 360" className={common} aria-hidden="true">
          <rect width="640" height="360" fill="var(--color-surface-dark)" />
          {[
            { x: 150, y: 90, t: "委託" },
            { x: 360, y: 90, t: "描述" },
            { x: 150, y: 200, t: "盡責" },
            { x: 360, y: 200, t: "辨識" },
          ].map((n) => (
            <g key={n.t}>
              <rect x={n.x} y={n.y} width="130" height="70" rx="10" fill="var(--color-surface-dark-elevated)" />
              <text
                x={n.x + 65}
                y={n.y + 45}
                fill="var(--color-on-dark)"
                fontSize="26"
                textAnchor="middle"
                fontFamily="var(--font-display)"
              >
                {n.t}
              </text>
            </g>
          ))}
          {[215, 425].map((x) => (
            <path
              key={x}
              d={`M${x} 168 v26`}
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ))}
        </svg>
      );
  }
}
