"use client";

import { useSyncExternalStore } from "react";
import { Player } from "@remotion/player";
import { ANIMATIONS, type AnimationId } from "@/lib/animations";
import { COMPOSITIONS } from "@/remotion/registry";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export default function ConceptPlayerSurface({ id }: { id: AnimationId }) {
  const meta = ANIMATIONS[id];
  const Component = COMPOSITIONS[id];
  // 系統設定「減少動態」時不自動播放、不循環，交給使用者自己按播放
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );

  return (
    <Player
      component={Component}
      durationInFrames={meta.durationInFrames}
      fps={meta.fps}
      compositionWidth={meta.width}
      compositionHeight={meta.height}
      style={{ width: "100%", aspectRatio: "16 / 9" }}
      controls
      autoPlay={!reduced}
      loop={!reduced}
      acknowledgeRemotionLicense
    />
  );
}
