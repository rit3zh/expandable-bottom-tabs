import { Extrapolation, interpolate } from "react-native-reanimated";

import {
  GOO_DETACH_END,
  GOO_DETACH_START,
  GOO_RISE_END,
  GOO_SPREAD_EXTRAPOLATION,
  GOO_SPREAD_START,
} from "@/constants/expandable-tab-bar.const";

import type {
  IGooGeometry,
  IRoundedRect,
} from "@/interfaces/expandable-tab-bar.interface";

const resolveGooRect = (
  geometry: IGooGeometry,
  progress: number,
): IRoundedRect => {
  "worklet";
  const from = geometry.trigger;
  const to = geometry.panel;

  const top = interpolate(
    progress,
    [0, GOO_RISE_END],
    [from.y, to.y],
    Extrapolation.CLAMP,
  );
  const bottom = interpolate(
    progress,
    [GOO_DETACH_START, GOO_DETACH_END],
    [from.y + from.h, to.y + to.h],
    Extrapolation.CLAMP,
  );
  const left = interpolate(
    progress,
    [GOO_SPREAD_START, 1],
    [from.x, to.x],
    GOO_SPREAD_EXTRAPOLATION,
  );
  const right = interpolate(
    progress,
    [GOO_SPREAD_START, 1],
    [from.x + from.w, to.x + to.w],
    Extrapolation.CLAMP,
  );
  const spread = interpolate(
    progress,
    [GOO_SPREAD_START, 1],
    [0, 1],
    Extrapolation.CLAMP,
  );

  const width = Math.max(right - left, 0);
  const height = Math.max(bottom - top, 0);
  const roundest = Math.min(width, height) / 2;

  return {
    h: height,
    r: Math.min(interpolate(spread, [0, 1], [roundest, to.r]), roundest),
    w: width,
    x: left,
    y: top,
  };
};

export { resolveGooRect };
