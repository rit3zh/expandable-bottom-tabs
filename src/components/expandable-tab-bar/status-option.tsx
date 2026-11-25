import { SymbolView } from "expo-symbols";
import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import {
  MENU_CHECK_ICON,
  MENU_CHECK_SIZE,
  MENU_CHECK_WIDTH,
  MENU_OPTION_GLYPH_SIZE,
  MENU_OPTION_ICON_SIZE,
  MENU_ROW_HEIGHT,
  PRESENCE_APPEARANCES,
} from "@/constants/expandable-tab-bar.const";
import { TYPOGRAPHY_ROUNDED_FAMILY } from "@/constants/typography.const";
import { registerComponent } from "@/utils/register-component.util";

import type {
  IStatusOption,
} from "@/interfaces/expandable-tab-bar.interface";
import { PresenceGlyph } from "./presence-glyph";

const StatusOptionBase: FC<IStatusOption> = ({
  presence,
  isSelected,
  palette,
  onSelect,
}: IStatusOption & React.ComponentProps<typeof StatusOptionBase>): React.ReactNode &
  React.JSX.Element => {
  const appearance = PRESENCE_APPEARANCES[presence];

  return (
    <View
      accessible
      accessibilityRole="button"
      accessibilityLabel={appearance.label}
      accessibilityState={{ selected: isSelected }}
      onAccessibilityTap={(): void => onSelect(presence)}
      style={styles.row}
    >
      <View style={styles.check}>
        {isSelected ? (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <SymbolView
              name={MENU_CHECK_ICON}
              size={MENU_CHECK_SIZE}
              tintColor={palette.text}
              weight="semibold"
            />
          </Animated.View>
        ) : null}
      </View>
      <Text numberOfLines={1} style={[styles.label, { color: palette.text }]}>
        {appearance.label}
      </Text>
      <View style={[styles.icon, { backgroundColor: palette[appearance.tint] }]}>
        <PresenceGlyph
          presence={presence}
          size={MENU_OPTION_GLYPH_SIZE}
          color={palette[appearance.ink]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  check: {
    alignItems: "center",
    width: MENU_CHECK_WIDTH,
  },
  icon: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: MENU_OPTION_ICON_SIZE / 2,
    height: MENU_OPTION_ICON_SIZE,
    justifyContent: "center",
    width: MENU_OPTION_ICON_SIZE,
  },
  label: {
    fontFamily: TYPOGRAPHY_ROUNDED_FAMILY,
    flex: 1,
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: -0.41,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    height: MENU_ROW_HEIGHT,
    paddingLeft: 6,
    paddingRight: 8,
  },
});

const StatusOption = registerComponent("StatusOption", StatusOptionBase);

export { StatusOption };
