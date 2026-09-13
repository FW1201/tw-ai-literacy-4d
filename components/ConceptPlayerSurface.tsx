"use client";

import { Player } from "@remotion/player";
import { ANIMATIONS, type AnimationId } from "@/lib/animations";
import { COMPOSITIONS } from "@/remotion/registry";

export default function ConceptPlayerSurface({ id }: { id: AnimationId }) {
  const meta = ANIMATIONS[id];
  const Component = COMPOSITIONS[id];

  return (
    <Player
      component={Component}
      durationInFrames={meta.durationInFrames}
      fps={meta.fps}
      compositionWidth={meta.width}
      compositionHeight={meta.height}
      style={{ width: "100%", aspectRatio: "16 / 9" }}
      controls
      autoPlay
      loop
      acknowledgeRemotionLicense
    />
  );
}
