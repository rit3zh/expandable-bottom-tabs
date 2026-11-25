import { useEffect } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { rect, rrect } from "react-native-skia";

import {
  PRESENCE_COLOR_TIMING,
  PRESENCE_CUTOUTS,
  PRESENCE_MORPH_SPRING,
} from "@/constants/expandable-tab-bar.const";

import type {
  TPresence,
  TPresenceMorph,
} from "@/interfaces/expandable-tab-bar.interface";

const usePresenceMorph = (
  presence: TPresence,
  color: string,
): TPresenceMorph => {
  const target = PRESENCE_CUTOUTS[presence];
  const x = useSharedValue(target.x);
  const y = useSharedValue(target.y);
  const w = useSharedValue(target.w);
  const h = useSharedValue(target.h);
  const r = useSharedValue(target.r);
  const tint = useSharedValue(color);

  useEffect(() => {
    x.set(withSpring(target.x, PRESENCE_MORPH_SPRING));
    y.set(withSpring(target.y, PRESENCE_MORPH_SPRING));
    w.set(withSpring(target.w, PRESENCE_MORPH_SPRING));
    h.set(withSpring(target.h, PRESENCE_MORPH_SPRING));
    r.set(withSpring(target.r, PRESENCE_MORPH_SPRING));
  }, [target, x, y, w, h, r]);

  useEffect(() => {
    tint.set(withTiming(color, PRESENCE_COLOR_TIMING));
  }, [color, tint]);

  const cutout = useDerivedValue(
    () => {
      const radius = Math.max(r.get(), 0);
      return rrect(
        rect(x.get(), y.get(), Math.max(w.get(), 0), Math.max(h.get(), 0)),
        radius,
        radius,
      );
    },
  );

  return { color: tint, cutout };
};

export { usePresenceMorph };
