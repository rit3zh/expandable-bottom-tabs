import { Stack } from "expo-router";
import { type FC, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import {
  SCREEN_BOTTOM_CLEARANCE,
  SCREEN_HORIZONTAL_PADDING,
  SCREEN_TOP_SPACING,
  SKELETON_GAP,
  SKELETON_PULSE_DURATION,
  SKELETON_PULSE_MIN_OPACITY,
} from "@/constants/tab-screen.const";
import { usePalette } from "@/hooks/use-palette";
import { registerComponent } from "@/utils/register-component.util";

import type { ITabScreen } from "@/interfaces/tab-screen.interface";
import { SkeletonItem } from "./skeleton-item";

const TabScreenBase: FC<ITabScreen> = ({
  title,
  shape,
  count,
  searchPlaceholder,
}: ITabScreen & React.ComponentProps<typeof TabScreenBase>): React.ReactNode &
  React.JSX.Element => {
  const palette = usePalette();
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(SKELETON_PULSE_MIN_OPACITY, {
        duration: SKELETON_PULSE_DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [pulse]);

  const pulseStyle = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: palette.background }}
      contentContainerStyle={styles.content}
    >
      <Stack.Title large>{title}</Stack.Title>
      {searchPlaceholder ? (
        <Stack.SearchBar placement="stacked" placeholder={searchPlaceholder} />
      ) : null}
      <Animated.View style={[styles.list, pulseStyle]}>
        {Array.from({ length: count }, (_: unknown, index: number) => (
          <SkeletonItem
            key={index}
            shape={shape}
            index={index}
            color={palette.fill}
          />
        ))}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: SCREEN_BOTTOM_CLEARANCE,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingTop: SCREEN_TOP_SPACING,
  },
  list: {
    gap: SKELETON_GAP,
  },
});

const TabScreen = registerComponent("TabScreen", TabScreenBase);

export { TabScreen };
