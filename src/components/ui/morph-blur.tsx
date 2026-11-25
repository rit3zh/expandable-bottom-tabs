import type { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

import {
  MORPH_BLUR_MAX_RADIUS,
  MORPH_BLUR_MIN_SCALE,
} from "@/constants/morph-blur.const";
import { registerComponent } from "@/utils/register-component.util";

import { AnimatedGaussianBlurView } from "@/components/ui/animated-gaussian-blur-view";
import type { IMorphBlur } from "@/interfaces/morph-blur.interface";

const MorphBlurBase: FC<IMorphBlur> = ({
  visibility,
  isFading = true,
  minScale = MORPH_BLUR_MIN_SCALE,
  maxRadius = MORPH_BLUR_MAX_RADIUS,
  style,
  contentStyle,
  children,
}: IMorphBlur & React.ComponentProps<typeof MorphBlurBase>): React.ReactNode &
  React.JSX.Element => {
  const layerStyle = useAnimatedStyle(
    () => ({
      opacity: isFading
        ? interpolate(visibility.get(), [0, 1], [0, 1], Extrapolation.CLAMP)
        : 1,
      transform: [
        {
          scale: interpolate(
            visibility.get(),
            [0, 1],
            [minScale, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
  );

  const blurProps = useAnimatedProps(() => ({
    blurRadius: interpolate(
      visibility.get(),
      [0, 1],
      [maxRadius, 0],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <Animated.View style={[style, layerStyle]}>
      <AnimatedGaussianBlurView
        animatedProps={blurProps}
        style={[styles.blur, contentStyle]}
      >
        {children}
      </AnimatedGaussianBlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  blur: {
    flexGrow: 1,
  },
});

const MorphBlur = registerComponent("MorphBlur", MorphBlurBase);

export { MorphBlur };
