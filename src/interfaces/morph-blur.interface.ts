import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { DerivedValue } from "react-native-reanimated";

interface IMorphBlur {
  readonly visibility: DerivedValue<number>;
  readonly isFading?: boolean;
  readonly minScale?: number;
  readonly maxRadius?: number;
  readonly style?: StyleProp<ViewStyle>;
  readonly contentStyle?: StyleProp<ViewStyle>;
  readonly children?: ReactNode;
}

export { type IMorphBlur };
