import {
  BAR_ACCESSORY_GAP,
  BAR_ACCESSORY_PADDING,
  BAR_AVATAR_SIZE,
  BAR_DETAIL_GAP,
  BAR_GAP,
  BAR_HEIGHT,
  BAR_HORIZONTAL_INSET,
  BAR_MIN_BOTTOM,
  BAR_SAFE_AREA_OVERLAP,
  BAR_SEGMENT_INSET,
  BAR_STATUS_BUTTON_SIZE,
} from "@/constants/expandable-tab-bar.const";

import type { IBarLayout } from "@/interfaces/expandable-tab-bar.interface";

const resolveBarLayout = (
  screenWidth: number,
  bottomInset: number,
): IBarLayout => {
  const rowWidth = screenWidth - BAR_HORIZONTAL_INSET * 2;
  const accessoryWidth =
    BAR_ACCESSORY_PADDING * 2 + BAR_AVATAR_SIZE * 2 + BAR_ACCESSORY_GAP;
  const tabStripWidth = rowWidth - BAR_GAP - accessoryWidth;
  const pillWidth = rowWidth - BAR_HEIGHT * 2 - BAR_GAP * 2;
  const workspaceCollapsedX =
    tabStripWidth + BAR_GAP + BAR_ACCESSORY_PADDING;
  const detailWidth =
    pillWidth - BAR_SEGMENT_INSET * 2 - BAR_AVATAR_SIZE - BAR_DETAIL_GAP;

  return {
    accessoryWidth,
    bottom: Math.max(bottomInset - BAR_SAFE_AREA_OVERLAP, BAR_MIN_BOTTOM),
    detailWidth,
    pillWidth,
    profileCollapsedX: workspaceCollapsedX + BAR_AVATAR_SIZE + BAR_ACCESSORY_GAP,
    profileDetailWidth: detailWidth - BAR_STATUS_BUTTON_SIZE - BAR_DETAIL_GAP,
    rowWidth,
    tabStripWidth,
    workspaceCollapsedX,
  };
};

export { resolveBarLayout };
