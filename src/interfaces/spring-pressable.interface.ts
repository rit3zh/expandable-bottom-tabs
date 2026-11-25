import type { ReactNode } from "react";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";

interface ISpringPressable extends Omit<
  PressableProps,
  "children" | "onPressIn" | "onPressOut" | "style"
> {
  readonly pressedScale?: number;
  pulseKey?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export { type ISpringPressable };
