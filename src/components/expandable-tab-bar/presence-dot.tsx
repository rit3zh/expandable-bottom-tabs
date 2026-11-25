import type { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import {
  PRESENCE_APPEARANCES,
  PRESENCE_DOT_GLYPH_SIZE,
  PRESENCE_DOT_MIN_SCALE,
  PRESENCE_DOT_SIZE,
} from "@/constants/expandable-tab-bar.const";
import { registerComponent } from "@/utils/register-component.util";

import type { IPresenceDot } from "@/interfaces/expandable-tab-bar.interface";
import { PresenceMorph } from "./presence-morph";

const PresenceDotBase: FC<IPresenceDot> = ({
  visibility,
  presence,
  palette,
}: IPresenceDot & React.ComponentProps<typeof PresenceDotBase>): React.ReactNode &
  React.JSX.Element => {
  const dotStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(visibility.get(), [0, 1], [0, 1], Extrapolation.CLAMP),
      transform: [
        {
          scale: interpolate(
            visibility.get(),
            [0, 1],
            [PRESENCE_DOT_MIN_SCALE, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
  );

  return (
    <Animated.View style={[styles.dot, { backgroundColor: palette.ring }, dotStyle]}>
      <PresenceMorph
        presence={presence}
        size={PRESENCE_DOT_GLYPH_SIZE}
        color={palette[PRESENCE_APPEARANCES[presence].ink]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  dot: {
    alignItems: "center",
    borderRadius: PRESENCE_DOT_SIZE / 2,
    bottom: -2,
    height: PRESENCE_DOT_SIZE,
    justifyContent: "center",
    pointerEvents: "none",
    position: "absolute",
    right: -2,
    width: PRESENCE_DOT_SIZE,
  },
});

const PresenceDot = registerComponent("PresenceDot", PresenceDotBase);

export { PresenceDot };
