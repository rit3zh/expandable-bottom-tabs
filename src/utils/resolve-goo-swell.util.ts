import { GOO_SWELL } from "@/constants/expandable-tab-bar.const";

import type { IRoundedRect } from "@/interfaces/expandable-tab-bar.interface";

const resolveGooSwell = (
  trigger: IRoundedRect,
  progress: number,
): IRoundedRect => {
  "worklet";
  const pull = Math.sin(Math.PI * Math.min(Math.max(progress, 0), 1));
  const scale = 1 + GOO_SWELL * pull;
  const width = trigger.w * scale;
  const height = trigger.h * scale;

  return {
    h: height,
    r: trigger.r * scale,
    w: width,
    x: trigger.x - (width - trigger.w) / 2,
    y: trigger.y - (height - trigger.h) / 2,
  };
};

export { resolveGooSwell };
