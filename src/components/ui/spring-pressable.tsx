import { type FC, useEffect, useRef } from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

import {
  SPRING_PRESS_IN,
  SPRING_PRESS_OUT,
  SPRING_PRESS_SCALE,
  SPRING_PULSE_SCALE,
  SPRING_PULSE_UP,
} from "@/constants/spring-pressable.const";
import { registerComponent } from "@/utils/register-component.util";

import type { ISpringPressable } from "@/interfaces/spring-pressable.interface";

const SpringPressableBase: FC<ISpringPressable> = ({
  pressedScale = SPRING_PRESS_SCALE,
  pulseKey,
  style,
  children,
  ...pressableProps
}: ISpringPressable &
  React.ComponentProps<typeof SpringPressableBase>): React.ReactNode &
  React.JSX.Element => {
  const scale = useSharedValue(1);
  const lastPulseKey = useRef<string | undefined>(
    pulseKey,
  );

  useEffect(() => {
    if (lastPulseKey.current === pulseKey) {
      return;
    }
    lastPulseKey.current = pulseKey;
    scale.set(
      withSequence<number>(
        withSpring(SPRING_PULSE_SCALE, SPRING_PULSE_UP),
        withSpring(1, SPRING_PRESS_OUT),
      ),
    );
  }, [pulseKey, scale]);

  const scaleStyle = useAnimatedStyle(
    () => ({ transform: [{ scale: scale.get() }] }),
  );

  return (
    <Pressable
      {...pressableProps}
      onPressIn={(): void =>
        scale.set(withSpring(pressedScale, SPRING_PRESS_IN))
      }
      onPressOut={(): void => scale.set(withSpring(1, SPRING_PRESS_OUT))}
    >
      <Animated.View style={[style, scaleStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

const SpringPressable = registerComponent(
  "SpringPressable",
  SpringPressableBase,
);

export { SpringPressable };
