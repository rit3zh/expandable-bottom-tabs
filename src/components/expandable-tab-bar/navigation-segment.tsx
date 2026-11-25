import { SymbolView } from "expo-symbols";
import type { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { GlassSurface } from "@/components/ui/glass-surface";
import { MorphBlur } from "@/components/ui/morph-blur";
import {
  BAR_ACTIVE_ICON_SIZE,
  BAR_COLLAPSE_LABEL,
  BAR_HEIGHT,
  BAR_ICON_MIN_SCALE,
  BAR_MORPH_BLUR_RADIUS,
  BAR_STRIP_MIN_SCALE,
  BAR_TAB_STRIP_INSET,
  TAB_STRIP_HEIGHT,
} from "@/constants/expandable-tab-bar.const";
import { registerComponent } from "@/utils/register-component.util";

import type { INavigationSegment } from "@/interfaces/expandable-tab-bar.interface";
import { TabStrip } from "./tab-strip";

const NavigationSegmentBase: FC<INavigationSegment> = ({
  layout,
  motion,
  mode,
  items,
  activeKey,
  activeIcon,
  palette,
  onSelect,
  onCollapse,
}: INavigationSegment &
  React.ComponentProps<typeof NavigationSegmentBase>): React.ReactNode &
  React.JSX.Element => {
  const isCollapsed = mode === "collapsed";
  const stripWidth = layout.tabStripWidth - BAR_TAB_STRIP_INSET * 2;

  const stripVisibility = useDerivedValue(
    () => 1 - motion.expansion.get(),
  );

  const frameStyle = useAnimatedStyle(
    () => ({
      width: interpolate(
        motion.expansion.get(),
        [0, 1],
        [layout.tabStripWidth, BAR_HEIGHT],
      ),
    }),
  );

  return (
    <Animated.View style={[styles.segment, frameStyle]}>
      <GlassSurface
        isVisible
        isInteractive
        radius={BAR_HEIGHT / 2}
        style={styles.fill}
      >
        <View style={styles.clip}>
          <MorphBlur
            visibility={stripVisibility}
            maxRadius={BAR_MORPH_BLUR_RADIUS}
            minScale={BAR_STRIP_MIN_SCALE}
            style={[
              styles.strip,
              { pointerEvents: isCollapsed ? "auto" : "none", width: stripWidth },
            ]}
          >
            <TabStrip
              width={stripWidth}
              items={items}
              activeKey={activeKey}
              palette={palette}
              onSelect={onSelect}
            />
          </MorphBlur>
          <MorphBlur
            visibility={motion.expansion}
            maxRadius={BAR_MORPH_BLUR_RADIUS}
            minScale={BAR_ICON_MIN_SCALE}
            style={[
              styles.activeIcon,
              { pointerEvents: isCollapsed ? "none" : "auto" },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={BAR_COLLAPSE_LABEL}
              onPress={(): void => onCollapse()}
              style={styles.iconButton}
            >
              <SymbolView
                name={activeIcon}
                size={BAR_ACTIVE_ICON_SIZE}
                tintColor={palette.text}
              />
            </Pressable>
          </MorphBlur>
        </View>
      </GlassSurface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  activeIcon: {
    height: BAR_HEIGHT,
    left: 0,
    position: "absolute",
    top: 0,
    width: BAR_HEIGHT,
  },
  clip: {
    ...StyleSheet.absoluteFill,
    borderRadius: BAR_HEIGHT / 2,
    overflow: "hidden",
  },
  fill: {
    flex: 1,
  },
  iconButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  segment: {
    height: BAR_HEIGHT,
    left: 0,
    position: "absolute",
    top: 0,
  },
  strip: {
    height: TAB_STRIP_HEIGHT,
    left: BAR_TAB_STRIP_INSET,
    position: "absolute",
    top: BAR_TAB_STRIP_INSET,
    transformOrigin: "left",
  },
});

const NavigationSegment = registerComponent(
  "NavigationSegment",
  NavigationSegmentBase,
);

export { NavigationSegment };
