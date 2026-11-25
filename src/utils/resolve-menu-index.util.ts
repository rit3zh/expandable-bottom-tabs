import {
  MENU_PADDING,
  MENU_ROW_HEIGHT,
  MENU_WIDTH,
} from "@/constants/expandable-tab-bar.const";

const resolveMenuIndex = (x: number, y: number, count: number): number => {
  "worklet";
  if (x < 0 || x > MENU_WIDTH) {
    return -1;
  }
  const index = Math.floor((y - MENU_PADDING) / MENU_ROW_HEIGHT);
  return index >= 0 && index < count ? index : -1;
};

export { resolveMenuIndex };
