import type { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { GlassSurface } from "@/components/ui/glass-surface";
import {
  BAR_ACCESSORY_LABEL,
  BAR_GAP,
  BAR_HEIGHT,
} from "@/constants/expandable-tab-bar.const";
import { registerComponent } from "@/utils/register-component.util";

import type { IAccessoryGlass } from "@/interfaces/expandable-tab-bar.interface";

const AccessoryGlassBase: FC<IAccessoryGlass> = ({
  layout,
  motion,
  mode,
  onPress,
}: IAccessoryGlass &
  React.ComponentProps<typeof AccessoryGlassBase>): React.ReactNode &
  React.JSX.Element => {
  const isCollapsed = mode === "collapsed";

  const frameStyle = useAnimatedStyle(
    () => ({
      left: interpolate(
        motion.expansion.get(),
        [0, 1],
        [layout.tabStripWidth + BAR_GAP, BAR_HEIGHT + BAR_GAP],
      ),
      width: interpolate(
        motion.expansion.get(),
        [0, 1],
        [layout.accessoryWidth, layout.rowWidth - BAR_HEIGHT - BAR_GAP],
      ),
    }),
  );

  return (
    <Animated.View
      style={[
        styles.segment,
        frameStyle,
        { pointerEvents: isCollapsed ? "auto" : "none" },
      ]}
    >
      <GlassSurface
        isVisible={isCollapsed}
        isInteractive
        radius={BAR_HEIGHT / 2}
        style={styles.fill}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={BAR_ACCESSORY_LABEL}
          onPress={(): void => onPress()}
          style={styles.fill}
        />
      </GlassSurface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  segment: {
    height: BAR_HEIGHT,
    position: "absolute",
    top: 0,
  },
});

const AccessoryGlass = registerComponent("AccessoryGlass", AccessoryGlassBase);

export { AccessoryGlass };
