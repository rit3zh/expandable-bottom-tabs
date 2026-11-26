import {
  Animation,
  type ChainableAnimationType,
} from "@expo/ui/swift-ui/modifiers";
import type { SFSymbol } from "expo-symbols";
import {
  Extrapolation,
  type ExtrapolationConfig,
  type WithSpringConfig,
  type WithTimingConfig,
} from "react-native-reanimated";

import type {
  IBarState,
  IPresenceAppearance,
  IRoundedRect,
  TPresence,
} from "@/interfaces/expandable-tab-bar.interface";

const BAR_HEIGHT = 62;
const BAR_GAP = 10;
const BAR_HORIZONTAL_INSET = 16;
const BAR_SAFE_AREA_OVERLAP = 12;
const BAR_MIN_BOTTOM = 12;
const BAR_AVATAR_SIZE = 46;
const BAR_SEGMENT_INSET = (BAR_HEIGHT - BAR_AVATAR_SIZE) / 2;
const BAR_ACCESSORY_PADDING = 8;
const BAR_ACCESSORY_GAP = 4;
const BAR_TAB_STRIP_INSET = 4;
const BAR_ACTIVE_ICON_SIZE = 22;
const BAR_DETAIL_GAP = 10;
const BAR_STATUS_BUTTON_SIZE = 40;
const BAR_GLASS_SPACING = 6;
const BAR_SPRING: WithSpringConfig = {
  damping: 20,
  mass: 0.9,
  stiffness: 260,
};
const BAR_MORPH_BLUR_RADIUS = 18;
const BAR_PULSE_BLUR_RADIUS = 14;
const BAR_PULSE_MIN_SCALE = 0.9;
const BAR_STRIP_MIN_SCALE = 0.55;
const BAR_ICON_MIN_SCALE = 0.5;
const BAR_INITIAL_STATE: IBarState = {
  isMenuOpen: false,
  mode: "collapsed",
  presence: "invisible",
};
const BAR_COLLAPSE_LABEL = "Show tabs";
const BAR_DISMISS_LABEL = "Close";
const BAR_ACCESSORY_LABEL = "Open workspace";
const BAR_STATUS_LABEL = "Change status";

const TAB_STRIP_HEIGHT = BAR_HEIGHT - BAR_TAB_STRIP_INSET * 2;
const TAB_ICON_SIZE = 20;
const TAB_ICON_LABEL_GAP = 2;
const TAB_LABEL_FONT_SIZE = 11;
const TAB_FALLBACK_ICON: SFSymbol = "circle.fill";
const TAB_ICONS: Readonly<Record<string, SFSymbol>> = {
  chats: "bubble.left.and.bubble.right.fill",
  "(activity)": "bell.fill",
  members: "person.crop.circle.fill",
};

const PRESENCE_DOT_SIZE = 18;
const PRESENCE_DOT_GLYPH_SIZE = 12;
const PRESENCE_DOT_MIN_SCALE = 0.4;
const PRESENCE_BUTTON_GLYPH_SIZE = 18;
const PRESENCE_TINT_TRANSITION_MS = 280;
const PRESENCE_GLYPH_VIEWBOX = "0 0 16 16";
const PRESENCE_GLYPH_UNITS = 16;
const PRESENCE_GLYPH_RADIUS = 8;
const PRESENCE_MORPH_SPRING: WithSpringConfig = {
  damping: 14,
  mass: 0.6,
  stiffness: 190,
};
const PRESENCE_CAPTION_SIZE = 13;
const PRESENCE_CAPTION_ANIMATION: ChainableAnimationType = Animation.smooth({
  duration: 0.45,
});
const PRESENCE_COLOR_TIMING: WithTimingConfig = { duration: 260 };
const PRESENCE_CUTOUTS: Readonly<Record<TPresence, IRoundedRect>> = {
  busy: { h: 4, r: 2, w: 12, x: 2, y: 6 },
  idle: { h: 16, r: 8, w: 16, x: -4, y: -4 },
  invisible: { h: 8, r: 4, w: 8, x: 4, y: 4 },
  online: { h: 0, r: 0, w: 0, x: 8, y: 8 },
};
const PRESENCE_ORDER: readonly TPresence[] = [
  "online",
  "idle",
  "busy",
  "invisible",
];
const PRESENCE_APPEARANCES: Readonly<Record<TPresence, IPresenceAppearance>> = {
  busy: {
    glyph:
      "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10H12C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6H4Z",
    ink: "busyInk",
    label: "Do Not Disturb",
    tint: "busyTint",
  },
  idle: {
    glyph:
      "M4.00002 12C8.4183 12 12 8.4183 12 4.00002C12 2.82614 11.7472 1.71132 11.293 0.707031C14.0687 1.9623 16 4.75562 16 8.00002C16 12.4183 12.4183 16 8.00002 16C4.75562 16 1.9623 14.0687 0.707031 11.293C1.71132 11.7472 2.82614 12 4.00002 12Z",
    ink: "idleInk",
    label: "Idle",
    tint: "idleTint",
  },
  invisible: {
    glyph:
      "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z",
    ink: "offlineInk",
    label: "Invisible",
    tint: "offlineTint",
  },
  online: {
    glyph: "M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z",
    ink: "onlineInk",
    label: "Online",
    tint: "onlineTint",
  },
};

const VERIFIED_ICON: SFSymbol = "checkmark.seal.fill";
const VERIFIED_ICON_SIZE = 15;

const MENU_GAP = 12;
const MENU_WIDTH = 228;
const MENU_RADIUS = 26;
const MENU_PADDING = 6;
const MENU_ROW_HEIGHT = 44;
const MENU_OPTION_ICON_SIZE = 28;
const MENU_OPTION_GLYPH_SIZE = 13;
const MENU_CHECK_ICON: SFSymbol = "checkmark";
const MENU_CHECK_SIZE = 13;
const MENU_CHECK_WIDTH = 18;
const MENU_HIGHLIGHT_RADIUS = 6;
const MENU_HIGHLIGHT_EDGE_RADIUS = MENU_RADIUS - MENU_PADDING;
const MENU_HIGHLIGHT_MIN_SCALE = 0.96;
const MENU_HIGHLIGHT_SPRING: WithSpringConfig = {
  damping: 26,
  mass: 0.7,
  stiffness: 380,
};
const MENU_OPEN_SPRING: WithSpringConfig = {
  damping: 15,
  mass: 0.6,
  stiffness: 140,
};
const MENU_CLOSE_SPRING: WithSpringConfig = {
  damping: 22,
  mass: 0.6,
  stiffness: 150,
};

const GOO_PADDING = 40;
const GOO_BLUR = 12;
const GOO_MATRIX = [
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 24, -12,
];
const GOO_REVEAL_END = 0.06;
const GOO_RISE_END = 0.55;
const GOO_DETACH_START = 0.15;
const GOO_DETACH_END = 0.75;
const GOO_SPREAD_START = 0.2;
const GOO_SPREAD_EXTRAPOLATION: ExtrapolationConfig = {
  extrapolateLeft: Extrapolation.CLAMP,
  extrapolateRight: Extrapolation.EXTEND,
};
const GOO_NECK_STEPS = [0, 0.45, 0.85];
const GOO_NECK_WIDTHS = [1, 0.55, 0];
const GOO_NECK_OVERLAP = 14;
const GOO_SWELL = 0.14;
const GOO_CONTENT_START = 0.55;
const GOO_SHADOW_OFFSET = 8;
const GOO_SHADOW_BLUR = 18;

export {
  BAR_ACCESSORY_GAP,
  BAR_ACCESSORY_LABEL,
  BAR_ACCESSORY_PADDING,
  BAR_ACTIVE_ICON_SIZE,
  BAR_AVATAR_SIZE,
  BAR_COLLAPSE_LABEL,
  BAR_DETAIL_GAP,
  BAR_DISMISS_LABEL,
  BAR_GAP,
  BAR_GLASS_SPACING,
  BAR_HEIGHT,
  BAR_HORIZONTAL_INSET,
  BAR_ICON_MIN_SCALE,
  BAR_INITIAL_STATE,
  BAR_MIN_BOTTOM,
  BAR_MORPH_BLUR_RADIUS,
  BAR_PULSE_BLUR_RADIUS,
  BAR_PULSE_MIN_SCALE,
  BAR_SAFE_AREA_OVERLAP,
  BAR_SEGMENT_INSET,
  BAR_SPRING,
  BAR_STATUS_BUTTON_SIZE,
  BAR_STATUS_LABEL,
  BAR_STRIP_MIN_SCALE,
  BAR_TAB_STRIP_INSET,
  GOO_BLUR,
  GOO_CONTENT_START,
  GOO_DETACH_END,
  GOO_DETACH_START,
  GOO_MATRIX,
  GOO_NECK_OVERLAP,
  GOO_NECK_STEPS,
  GOO_NECK_WIDTHS,
  GOO_PADDING,
  GOO_REVEAL_END,
  GOO_RISE_END,
  GOO_SHADOW_BLUR,
  GOO_SHADOW_OFFSET,
  GOO_SPREAD_EXTRAPOLATION,
  GOO_SPREAD_START,
  GOO_SWELL,
  MENU_CHECK_ICON,
  MENU_CHECK_SIZE,
  MENU_CHECK_WIDTH,
  MENU_CLOSE_SPRING,
  MENU_GAP,
  MENU_HIGHLIGHT_EDGE_RADIUS,
  MENU_HIGHLIGHT_MIN_SCALE,
  MENU_HIGHLIGHT_RADIUS,
  MENU_HIGHLIGHT_SPRING,
  MENU_OPEN_SPRING,
  MENU_OPTION_GLYPH_SIZE,
  MENU_OPTION_ICON_SIZE,
  MENU_PADDING,
  MENU_RADIUS,
  MENU_ROW_HEIGHT,
  MENU_WIDTH,
  PRESENCE_APPEARANCES,
  PRESENCE_BUTTON_GLYPH_SIZE,
  PRESENCE_CAPTION_ANIMATION,
  PRESENCE_CAPTION_SIZE,
  PRESENCE_COLOR_TIMING,
  PRESENCE_CUTOUTS,
  PRESENCE_DOT_GLYPH_SIZE,
  PRESENCE_DOT_MIN_SCALE,
  PRESENCE_DOT_SIZE,
  PRESENCE_GLYPH_RADIUS,
  PRESENCE_GLYPH_UNITS,
  PRESENCE_GLYPH_VIEWBOX,
  PRESENCE_MORPH_SPRING,
  PRESENCE_ORDER,
  PRESENCE_TINT_TRANSITION_MS,
  TAB_FALLBACK_ICON,
  TAB_ICONS,
  TAB_ICON_LABEL_GAP,
  TAB_ICON_SIZE,
  TAB_LABEL_FONT_SIZE,
  TAB_STRIP_HEIGHT,
  VERIFIED_ICON,
  VERIFIED_ICON_SIZE,
};
