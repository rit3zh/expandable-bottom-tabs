import { Image } from "expo-image";
import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  AVATAR_DEFAULT_FONT,
  AVATAR_INITIALS_RATIO,
  AVATAR_MARK_FONT_FAMILY,
  AVATAR_MARK_RATIO,
  AVATAR_TRANSITION_MS,
} from "@/constants/avatar.const";
import { registerComponent } from "@/utils/register-component.util";

import type { IAvatar } from "@/interfaces/avatar.interface";

const AvatarBase: FC<IAvatar> = ({
  size,
  uri,
  label,
  font = AVATAR_DEFAULT_FONT,
  backgroundColor,
  color,
  style,
  children,
}: IAvatar & React.ComponentProps<typeof AvatarBase>): React.ReactNode &
  React.JSX.Element => (
  <View
    style={[
      styles.base,
      {
        backgroundColor,
        borderRadius: size / 2,
        height: size,
        width: size,
      },
      style,
    ]}
  >
    {children ?? (uri ? (
      <Image
        source={{ uri }}
        contentFit="cover"
        transition={AVATAR_TRANSITION_MS}
        style={styles.image}
      />
    ) : (
      <Text
        numberOfLines={1}
        style={[
          font === "serif" ? styles.serif : styles.sans,
          {
            color,
            fontSize:
              size *
              (font === "serif" ? AVATAR_MARK_RATIO : AVATAR_INITIALS_RATIO),
          },
        ]}
      >
        {label}
      </Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  sans: {
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  serif: {
    fontFamily: AVATAR_MARK_FONT_FAMILY,
    fontStyle: "italic",
    fontWeight: "800",
    letterSpacing: -0.4,
  },
});

const Avatar = registerComponent("Avatar", AvatarBase);

export { Avatar };
