import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

interface IGlassSurface {
  readonly isVisible: boolean;
  readonly radius: number;
  readonly isInteractive?: boolean;
  readonly style?: StyleProp<ViewStyle>;
  readonly children?: ReactNode;
}

export { type IGlassSurface };
