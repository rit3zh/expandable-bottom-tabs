import {
  BAR_HEIGHT,
  BAR_STATUS_BUTTON_SIZE,
  GOO_PADDING,
  MENU_GAP,
  MENU_RADIUS,
  MENU_WIDTH,
} from "@/constants/expandable-tab-bar.const";
import type { IGooGeometry } from "@/interfaces/expandable-tab-bar.interface";

const resolveGooGeometry = <T extends number>(panelHeight: T): IGooGeometry => {
  const buttonInset = (BAR_HEIGHT - BAR_STATUS_BUTTON_SIZE) / 2;
  const rowTop = GOO_PADDING + panelHeight + MENU_GAP;

  return {
    height: rowTop + BAR_HEIGHT + GOO_PADDING,
    panel: {
      h: panelHeight,
      r: MENU_RADIUS,
      w: MENU_WIDTH,
      x: GOO_PADDING,
      y: GOO_PADDING,
    },
    trigger: {
      h: BAR_STATUS_BUTTON_SIZE,
      r: BAR_STATUS_BUTTON_SIZE / 2,
      w: BAR_STATUS_BUTTON_SIZE,
      x: GOO_PADDING + MENU_WIDTH - buttonInset - BAR_STATUS_BUTTON_SIZE,
      y: rowTop + buttonInset,
    },
    width: MENU_WIDTH + GOO_PADDING * 2,
  };
};

export { resolveGooGeometry };
