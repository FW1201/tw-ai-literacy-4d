import type { ComponentType } from "react";
import type { AnimationId } from "@/lib/animations";
import { NextTokenPrediction } from "./NextTokenPrediction";
import { KnowledgeCutoff } from "./KnowledgeCutoff";
import { ContextWindow } from "./ContextWindow";
import { Steerability } from "./Steerability";
import { FourDLoops } from "./FourDLoops";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const COMPOSITIONS: Record<AnimationId, ComponentType<any>> = {
  "next-token": NextTokenPrediction,
  "knowledge-cutoff": KnowledgeCutoff,
  "context-window": ContextWindow,
  steerability: Steerability,
  "four-d-loops": FourDLoops,
};
