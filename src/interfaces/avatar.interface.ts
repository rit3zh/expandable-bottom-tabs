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
}

export { type IAvatar, type TAvatarFont };
