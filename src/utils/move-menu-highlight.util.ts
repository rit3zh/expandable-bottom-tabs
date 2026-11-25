import {
  MENU_HIGHLIGHT_SPRING,
  MENU_PADDING,
  MENU_ROW_HEIGHT,
} from "@/constants/expandable-tab-bar.const";
import type { IMenuHighlight } from "@/interfaces/expandable-tab-bar.interface";
import { withSpring } from "react-native-reanimated";

const moveMenuHighlight = <T extends IMenuHighlight>(
  highlight: T,
  index: number,
): void => {
  "worklet";
  if (index < 0) {
    highlight.index.set(-1);
    highlight.opacity.set(withSpring(0, MENU_HIGHLIGHT_SPRING));
    return;
  }

  const target = MENU_PADDING + index * MENU_ROW_HEIGHT;

  if (highlight.index.get() < 0) {
    highlight.offset.set(target);
  } else if (highlight.index.get() !== index) {
    highlight.offset.set(withSpring(target, MENU_HIGHLIGHT_SPRING));
  }

  highlight.index.set(index);
  highlight.opacity.set(withSpring(1, MENU_HIGHLIGHT_SPRING));
};

export { moveMenuHighlight };
