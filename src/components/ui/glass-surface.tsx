import { BlurView } from "expo-backdrop";
import {
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import {
  GLASS_ANIMATION_SECONDS,
  GLASS_FALLBACK_FADE_MS,
  GLASS_FALLBACK_INTENSITY,
  GLASS_FALLBACK_TINT,
  GLASS_HIDDEN_STYLE,
  GLASS_STYLE,
} from "@/constants/glass-surface.const";
import { registerComponent } from "@/utils/register-component.util";

import type { IGlassSurface } from "@/interfaces/glass-surface.interface";

const GlassSurfaceBase: FC<IGlassSurface> = ({
  isVisible,
  radius,
  isInteractive = false,
  style,
  children,
}: IGlassSurface & React.ComponentProps<typeof GlassSurfaceBase>): React.ReactNode &
  React.JSX.Element => {
  const hasLiquidGlass =
    isLiquidGlassAvailable() && isGlassEffectAPIAvailable();

  if (hasLiquidGlass) {
    return (
      <GlassView
        isInteractive={isInteractive}
        glassEffectStyle={{
          animate: true,
          animationDuration: GLASS_ANIMATION_SECONDS,
          style: isVisible ? GLASS_STYLE : GLASS_HIDDEN_STYLE,
        }}
        style={[{ borderRadius: radius }, style]}
      >
        {children}
      </GlassView>
    );
  }

  return (
    <View style={[{ borderRadius: radius }, style]}>
      <Animated.View
        style={[
          styles.fallback,
          {
            borderRadius: radius,
            opacity: isVisible ? 1 : 0,
            transitionDuration: GLASS_FALLBACK_FADE_MS,
            transitionProperty: "opacity",
          },
        ]}
      >
        <BlurView
          tint={GLASS_FALLBACK_TINT}
          intensity={GLASS_FALLBACK_INTENSITY}
          cornerRadius={radius}
          style={styles.fill}
        />
      </Animated.View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    ...StyleSheet.absoluteFill,
    pointerEvents: "none",
  },
  fill: {
    flex: 1,
  },
});

const GlassSurface = registerComponent("GlassSurface", GlassSurfaceBase);

export { GlassSurface };
