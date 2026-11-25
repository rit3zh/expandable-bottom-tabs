import { Extrapolation, interpolate } from "react-native-reanimated";

import {
  GOO_NECK_OVERLAP,
  GOO_NECK_STEPS,
  GOO_NECK_WIDTHS,
} from "@/constants/expandable-tab-bar.const";

import type {
  IGooGeometry,
  IRoundedRect,
} from "@/interfaces/expandable-tab-bar.interface";

const resolveGooNeck = (
  geometry: IGooGeometry,
  blob: IRoundedRect,
  progress: number,
): IRoundedRect => {
  "worklet";
  const trigger = geometry.trigger;
  const width =
    trigger.w *
    interpolate(progress, GOO_NECK_STEPS, GOO_NECK_WIDTHS, Extrapolation.CLAMP);
  const top = blob.y + blob.h - GOO_NECK_OVERLAP;
  const bottom = trigger.y + trigger.h / 2;

  return {
    h: Math.max(bottom - top, 0),
    r: width / 2,
    w: width,
    x: trigger.x + (trigger.w - width) / 2,
    y: top,
  };
};

export { resolveGooNeck };
