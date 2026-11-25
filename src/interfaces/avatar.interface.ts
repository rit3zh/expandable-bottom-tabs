import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

type TAvatarFont = "sans" | "serif";

interface IAvatar {
  size: number;
  uri?: string;
  label?: string;
  font?: TAvatarFont;
  backgroundColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export { type IAvatar, type TAvatarFont };
