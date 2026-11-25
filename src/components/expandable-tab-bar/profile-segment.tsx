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
  BAR_ICON_MIN_SCALE,
  BAR_MORPH_BLUR_RADIUS,
  BAR_PULSE_BLUR_RADIUS,
  BAR_PULSE_MIN_SCALE,
  BAR_SEGMENT_INSET,
  BAR_STATUS_BUTTON_SIZE,
} from "@/constants/expandable-tab-bar.const";
import { TYPOGRAPHY_ROUNDED_FAMILY } from "@/constants/typography.const";
import { registerComponent } from "@/utils/register-component.util";

import type { IProfileSegment } from "@/interfaces/expandable-tab-bar.interface";
import { PresenceCaption } from "./presence-caption";
import { PresenceDot } from "./presence-dot";
import { StatusButton } from "./status-button";

const ProfileSegmentBase: FC<IProfileSegment> = ({
  layout,
  motion,
  mode,
  account,
  presence,
  isMenuOpen,
  palette,
  onPress,
  onToggleMenu,
}: IProfileSegment &
  React.ComponentProps<typeof ProfileSegmentBase>): React.ReactNode &
  React.JSX.Element => {
  const isFocused = mode === "profile";

  const detailVisibility = useDerivedValue(
    () => motion.expansion.get() * motion.focus.get(),
  );

  const dotVisibility = useDerivedValue(
    () => 1 - detailVisibility.get(),
  );

  const frameStyle = useAnimatedStyle(
    () => {
      const expansion = motion.expansion.get();
      const focus = motion.focus.get();
      const expandedLeft = interpolate(
        focus,
        [0, 1],
        [layout.rowWidth - BAR_HEIGHT, BAR_HEIGHT * 2 + BAR_GAP * 2],
      );
      const expandedWidth = interpolate(
        focus,
        [0, 1],
        [BAR_HEIGHT, layout.pillWidth],
      );

      return {
        left: interpolate(
          expansion,
          [0, 1],
          [layout.profileCollapsedX, expandedLeft],
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
          accessibilityLabel={account.name}
          onPress={(): void => onPress()}
          style={styles.fill}
        >
          <View style={styles.clip}>
            <MorphBlur
              visibility={detailVisibility}
              maxRadius={BAR_MORPH_BLUR_RADIUS}
              style={[styles.detail, { width: layout.profileDetailWidth }]}
              contentStyle={styles.detailContent}
            >
              <Text
                numberOfLines={1}
                style={[styles.name, { color: palette.text }]}
              >
                {account.name}
              </Text>
              <PresenceCaption
                presence={presence}
                color={palette.secondaryText}
              />
            </MorphBlur>
            <MorphBlur
              visibility={detailVisibility}
              maxRadius={BAR_MORPH_BLUR_RADIUS}
              minScale={BAR_ICON_MIN_SCALE}
              style={[
                styles.status,
                { pointerEvents: isFocused ? "auto" : "none" },
              ]}
            >
              <StatusButton
                presence={presence}
                isActive={isMenuOpen}
                palette={palette}
                onPress={onToggleMenu}
              />
            </MorphBlur>
          </View>
          <Animated.View style={[styles.avatar, avatarStyle]}>
            <MorphBlur
              visibility={motion.clarity}
              isFading={false}
              maxRadius={BAR_PULSE_BLUR_RADIUS}
              minScale={BAR_PULSE_MIN_SCALE}
            >
              <Avatar size={BAR_AVATAR_SIZE} uri={account.avatar} />
              <PresenceDot
                visibility={dotVisibility}
                presence={presence}
                palette={palette}
              />
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
  name: {
    fontFamily: TYPOGRAPHY_ROUNDED_FAMILY,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  segment: {
    height: BAR_HEIGHT,
    position: "absolute",
    top: 0,
  },
  status: {
    height: BAR_STATUS_BUTTON_SIZE,
    position: "absolute",
    right: (BAR_HEIGHT - BAR_STATUS_BUTTON_SIZE) / 2,
    top: (BAR_HEIGHT - BAR_STATUS_BUTTON_SIZE) / 2,
    width: BAR_STATUS_BUTTON_SIZE,
  },
});

const ProfileSegment = registerComponent("ProfileSegment", ProfileSegmentBase);

export { ProfileSegment };
