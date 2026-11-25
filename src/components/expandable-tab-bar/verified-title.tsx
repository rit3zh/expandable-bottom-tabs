import { SymbolView } from "expo-symbols";
import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  VERIFIED_ICON,
  VERIFIED_ICON_SIZE,
} from "@/constants/expandable-tab-bar.const";
import { TYPOGRAPHY_ROUNDED_FAMILY } from "@/constants/typography.const";
import { registerComponent } from "@/utils/register-component.util";

import type { IVerifiedTitle } from "@/interfaces/expandable-tab-bar.interface";

const VerifiedTitleBase: FC<IVerifiedTitle> = ({
  title,
  isVerified,
  palette,
}: IVerifiedTitle &
  React.ComponentProps<typeof VerifiedTitleBase>): React.ReactNode &
  React.JSX.Element => (
  <View style={styles.row}>
    <Text numberOfLines={1} style={[styles.title, { color: palette.text }]}>
      {title}
    </Text>
    {isVerified ? (
      <SymbolView
        name={VERIFIED_ICON}
        size={VERIFIED_ICON_SIZE}
        tintColor={palette.accent}
      />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  title: {
    fontFamily: TYPOGRAPHY_ROUNDED_FAMILY,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
});

const VerifiedTitle = registerComponent("VerifiedTitle", VerifiedTitleBase);

export { VerifiedTitle };
