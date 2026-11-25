import type { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { Avatar } from "@/components/ui/avatar";
import { GlassSurface } from "@/components/ui/glass-surface";
import { MorphBlur } from "@/components/ui/morph-blur";
import {
  BAR_AVATAR_SIZE,
  BAR_DETAIL_GAP,
  BAR_GAP,
  BAR_HEIGHT,
  BAR_MORPH_BLUR_RADIUS,
  BAR_PULSE_BLUR_RADIUS,
  BAR_PULSE_MIN_SCALE,
  BAR_SEGMENT_INSET,
} from "@/constants/expandable-tab-bar.const";
import { EXPO_LOGO_RATIO } from "@/constants/expo-logo.const";
import { TYPOGRAPHY_ROUNDED_FAMILY } from "@/constants/typography.const";
import { registerComponent } from "@/utils/register-component.util";

import type { IWorkspaceSegment } from "@/interfaces/expandable-tab-bar.interface";
import { VerifiedTitle } from "./verified-title";

const WorkspaceSegmentBase: FC<IWorkspaceSegment> = ({
  layout,
  motion,
  mode,
  workspace,
  palette,
  onPress,
}: IWorkspaceSegment &
  React.ComponentProps<typeof WorkspaceSegmentBase>): React.ReactNode &
  React.JSX.Element => {
  const detailVisibility = useDerivedValue(
    () => motion.expansion.get() * (1 - motion.focus.get()),
  );

  const frameStyle = useAnimatedStyle(
    () => {
      const expansion = motion.expansion.get();
      const expandedWidth = interpolate(
        motion.focus.get(),
        [0, 1],
        [layout.pillWidth, BAR_HEIGHT],
      );

      return {
        left: interpolate(
          expansion,
          [0, 1],
          [layout.workspaceCollapsedX, BAR_HEIGHT + BAR_GAP],
        ),
        width: interpolate(expansion, [0, 1], [BAR_AVATAR_SIZE, expandedWidth]),
      };
    },
  );

  const avatarStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            motion.expansion.get(),
            [0, 1],
            [0, BAR_SEGMENT_INSET],
          ),
        },
      ],
    }),
  );

  return (
    <Animated.View style={[styles.segment, frameStyle]}>
      <GlassSurface
        isVisible={mode !== "collapsed"}
        isInteractive
        radius={BAR_HEIGHT / 2}
        style={styles.fill}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={workspace.name}
          onPress={(): void => onPress()}
          style={styles.fill}
        >
          <View style={styles.clip}>
            <MorphBlur
              visibility={detailVisibility}
              maxRadius={BAR_MORPH_BLUR_RADIUS}
              style={[styles.detail, { width: layout.detailWidth }]}
              contentStyle={styles.detailContent}
            >
              <VerifiedTitle
                title={workspace.name}
                isVerified={workspace.isVerified}
                palette={palette}
              />
              <Text
                numberOfLines={1}
                style={[styles.caption, { color: palette.secondaryText }]}
              >
                {workspace.caption}
              </Text>
            </MorphBlur>
          </View>
          <Animated.View style={[styles.avatar, avatarStyle]}>
            <MorphBlur
              visibility={motion.clarity}
              isFading={false}
              maxRadius={BAR_PULSE_BLUR_RADIUS}
              minScale={BAR_PULSE_MIN_SCALE}
            >
              <Avatar size={BAR_AVATAR_SIZE} backgroundColor={palette.mark}>
                <workspace.logo
                  size={BAR_AVATAR_SIZE * EXPO_LOGO_RATIO}
                  color={palette.text}
                />
              </Avatar>
            </MorphBlur>
          </Animated.View>
        </Pressable>
      </GlassSurface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    left: 0,
    position: "absolute",
    top: BAR_SEGMENT_INSET,
  },
  caption: {
    fontFamily: TYPOGRAPHY_ROUNDED_FAMILY,
    fontSize: 13,
    marginTop: 1,
  },
  clip: {
    ...StyleSheet.absoluteFill,
    borderRadius: BAR_HEIGHT / 2,
    overflow: "hidden",
  },
  detail: {
    height: BAR_HEIGHT,
    left: BAR_SEGMENT_INSET + BAR_AVATAR_SIZE + BAR_DETAIL_GAP,
    position: "absolute",
    top: 0,
  },
  detailContent: {
    justifyContent: "center",
  },
  fill: {
    flex: 1,
  },
  segment: {
    height: BAR_HEIGHT,
    position: "absolute",
    top: 0,
  },
});

const WorkspaceSegment = registerComponent(
  "WorkspaceSegment",
  WorkspaceSegmentBase,
);

export { WorkspaceSegment };
