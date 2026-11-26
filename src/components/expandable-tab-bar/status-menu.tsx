import { type FC, useMemo, useState } from "react";
import {
  type LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";
import {
  GestureDetector,
  type PanGestureEvent,
  usePanGesture,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { MorphBlur } from "@/components/ui/morph-blur";
import {
  GOO_CONTENT_START,
  GOO_PADDING,
  MENU_HIGHLIGHT_MIN_SCALE,
  MENU_HIGHLIGHT_RADIUS,
  MENU_PADDING,
  MENU_ROW_HEIGHT,
  MENU_WIDTH,
  PRESENCE_ORDER,
} from "@/constants/expandable-tab-bar.const";
import { registerComponent } from "@/utils/register-component.util";

import type {
  IStatusMenu,
  TPresence,
} from "@/interfaces/expandable-tab-bar.interface";
import { StatusGoo } from "./status-goo";
import { StatusOption } from "./status-option";
import { moveMenuHighlight } from "@/utils/move-menu-highlight.util";
import { resolveGooGeometry } from "@/utils/resolve-goo-geometry.util";
import { resolveGooRect } from "@/utils/resolve-goo-rect.util";
import { resolveMenuIndex } from "@/utils/resolve-menu-index.util";

const StatusMenuBase: FC<IStatusMenu> = ({
  motion,
  presence,
  isOpen,
  palette,
  onSelect,
}: IStatusMenu & React.ComponentProps<typeof StatusMenuBase>): React.ReactNode &
  React.JSX.Element => {
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const highlightIndex = useSharedValue(-1);
  const highlightOffset = useSharedValue(0);
  const highlightRadius = useSharedValue(MENU_HIGHLIGHT_RADIUS);
  const highlightOpacity = useSharedValue(0);

  const highlight = useMemo(
    () => ({
      index: highlightIndex,
      offset: highlightOffset,
      radius: highlightRadius,
      opacity: highlightOpacity,
    }),
    [
      highlightIndex,
      highlightOffset,
      highlightRadius,
      highlightOpacity,
    ],
  );

  const geometry = useMemo(
    () => resolveGooGeometry(panelHeight),
    [panelHeight],
  );

  const selection = usePanGesture({
    minDistance: 0,
    onBegin: (event: PanGestureEvent): void => {
      "worklet";
      moveMenuHighlight(
        highlight,
        resolveMenuIndex(event.x, event.y, PRESENCE_ORDER.length),
        PRESENCE_ORDER.length,
      );
    },
    onUpdate: (event: PanGestureEvent): void => {
      "worklet";
      moveMenuHighlight(
        highlight,
        resolveMenuIndex(event.x, event.y, PRESENCE_ORDER.length),
        PRESENCE_ORDER.length,
      );
    },
    onFinalize: (event: PanGestureEvent): void => {
      "worklet";
      const index = resolveMenuIndex(
        event.x,
        event.y,
        PRESENCE_ORDER.length,
      );
      moveMenuHighlight(highlight, -1, PRESENCE_ORDER.length);
      if (index >= 0) {
        scheduleOnRN(onSelect, PRESENCE_ORDER[index]);
      }
    },
  });

  const contentVisibility = useDerivedValue(
    () =>
      interpolate(
        motion.menu.get(),
        [GOO_CONTENT_START, 1],
        [0, 1],
        Extrapolation.CLAMP,
      ),
  );

  const clipStyle = useAnimatedStyle(
    () => {
      const shape = resolveGooRect(geometry, motion.menu.get());
      return {
        borderRadius: shape.r,
        height: shape.h,
        left: shape.x,
        top: shape.y,
        width: shape.w,
      };
    },
  );

  const contentStyle = useAnimatedStyle(
    () => {
      const shape = resolveGooRect(geometry, motion.menu.get());
      return {
        left: geometry.panel.x - shape.x,
        top: geometry.panel.y - shape.y,
      };
    },
  );

  const highlightStyle = useAnimatedStyle(
    () => ({
      borderRadius: highlightRadius.get(),
      opacity: highlightOpacity.get(),
      top: highlightOffset.get(),
      transform: [
        {
          scale: interpolate(
            highlightOpacity.get(),
            [0, 1],
            [MENU_HIGHLIGHT_MIN_SCALE, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
  );

  return (
    <View
      style={[
        styles.menu,
        { height: geometry.height, width: geometry.width },
      ]}
    >
      {panelHeight > 0 ? (
        <StatusGoo
          geometry={geometry}
          progress={motion.menu}
          color={palette.surface}
          shadowColor={palette.shadow}
        />
      ) : null}
      <Animated.View
        style={[
          styles.clip,
          clipStyle,
          { pointerEvents: isOpen ? "auto" : "none" },
        ]}
      >
        <GestureDetector gesture={selection}>
          <Animated.View
            onLayout={(event: LayoutChangeEvent): void =>
              setPanelHeight(event.nativeEvent.layout.height)
            }
            style={[styles.content, contentStyle]}
          >
            <MorphBlur
              visibility={contentVisibility}
              contentStyle={styles.options}
            >
              <Animated.View
                style={[
                  styles.highlight,
                  { backgroundColor: palette.fill },
                  highlightStyle,
                ]}
              />
              {PRESENCE_ORDER.map(
                (option: TPresence): React.JSX.Element => (
                  <StatusOption
                    key={option}
                    presence={option}
                    isSelected={option === presence}
                    palette={palette}
                    onSelect={onSelect}
                  />
                ),
              )}
            </MorphBlur>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  clip: {
    overflow: "hidden",
    position: "absolute",
  },
  content: {
    position: "absolute",
    width: MENU_WIDTH,
  },
  highlight: {
    borderCurve: "continuous",
    height: MENU_ROW_HEIGHT,
    left: MENU_PADDING,
    position: "absolute",
    right: MENU_PADDING,
  },
  menu: {
    bottom: -GOO_PADDING,
    pointerEvents: "box-none",
    position: "absolute",
    right: -GOO_PADDING,
  },
  options: {
    padding: MENU_PADDING,
  },
});

const StatusMenu = registerComponent("StatusMenu", StatusMenuBase);

export { StatusMenu };
