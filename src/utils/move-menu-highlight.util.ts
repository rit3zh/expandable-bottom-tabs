import {
  MENU_HIGHLIGHT_EDGE_RADIUS,
  MENU_HIGHLIGHT_RADIUS,
  MENU_HIGHLIGHT_SPRING,
  MENU_PADDING,
  MENU_ROW_HEIGHT,
} from "@/constants/expandable-tab-bar.const";
import type { IMenuHighlight } from "@/interfaces/expandable-tab-bar.interface";
import { withSpring } from "react-native-reanimated";

const moveMenuHighlight = <T extends IMenuHighlight>(
  highlight: T,
  index: number,
  count: number,
): void => {
  "worklet";
  if (index < 0) {
    highlight.index.set(-1);
    highlight.opacity.set(withSpring(0, MENU_HIGHLIGHT_SPRING));
    return;
  }

  const isEdge = index === 0 || index === count - 1;

  const offset = MENU_PADDING + index * MENU_ROW_HEIGHT;
  // Edge rows round up to stay concentric with the card's corners.
  const radius = isEdge ? MENU_HIGHLIGHT_EDGE_RADIUS : MENU_HIGHLIGHT_RADIUS;

  if (highlight.index.get() < 0) {
    highlight.offset.set(offset);
    highlight.radius.set(radius);
  } else if (highlight.index.get() !== index) {
    highlight.offset.set(withSpring(offset, MENU_HIGHLIGHT_SPRING));
    highlight.radius.set(withSpring(radius, MENU_HIGHLIGHT_SPRING));
  }

  highlight.index.set(index);
  highlight.opacity.set(withSpring(1, MENU_HIGHLIGHT_SPRING));
};

export { moveMenuHighlight };
